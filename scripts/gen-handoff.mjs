#!/usr/bin/env node
// Generate curated handoff bundles for spoke prototypes.
//
// One source of truth: src/data/prototypes.ts lists each prototype's slug + route.
// For every route that has an authored spec (src/data/handoff/<slug>.mjs) we run a
// CURATED capture — the spec's declared regions (by selector, at any depth) plus
// design guidance — producing the "smart" manifest the runtime inspector reads,
// with one inspectable tab per region. Routes without a spec are skipped.
//
//   npm run handoff
//
// Capture runs against `preview` (production output) per the handoff README — the
// dev server injects a toolbar + unminified CSS that would pollute the bundle.
import { readFileSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import { captureCurated } from './lib/capture-curated.mjs';

const PORT = Number(process.env.HANDOFF_PORT ?? 4321);
const BASE = '/noria-design/'; // production base — MUST match astro.config.mjs
const ORIGIN = `http://localhost:${PORT}`;
const root = (p) => fileURLToPath(new URL('../' + p, import.meta.url));

// Reuse the hub's token-tier machinery (file-URL import bypasses the package
// exports map, which doesn't expose ./src/*).
const HUB_SRC = new URL('../node_modules/@esa/handoff/src/', import.meta.url);
const { buildTierIndex, classifyTokens } = await import(new URL('tokens.mjs', HUB_SRC).href);
const tierIndex = await buildTierIndex(root('node_modules/@esa/tokens'));

// Routes from the registry (parse, not import — keeps this dep-free). Keep only
// the ones with an authored spec.
const registry = readFileSync(root('src/data/prototypes.ts'), 'utf8');
const slugs = [...registry.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const routes = [...registry.matchAll(/route:\s*'([^']+)'/g)].map((m) => m[1]);
const targets = slugs
  .map((slug, i) => ({ slug, route: routes[i] }))
  .filter((t) => existsSync(root(`src/data/handoff/${t.slug}.mjs`)));
if (!targets.length) {
  console.error('gen-handoff — no prototypes with a spec in src/data/handoff/. Nothing to do.');
  process.exit(1);
}

// The bundle folder MUST equal the runtime inspector's routeSlug(): the route path
// with the production base stripped, segments joined by '-'. The inspector strips
// import.meta.env.BASE_URL first, so e.g. /prototypes/parcel-discovery resolves to
// "prototypes-parcel-discovery" — NOT the registry's short slug.
const bundleSlug = (route) => route.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const run = (cmd, args, extraEnv = {}) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', env: { ...process.env, ...extraEnv } });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} → exit ${r.status}`);
};
async function waitForServer(url, tries = 100) {
  for (let i = 0; i < tries; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(200);
  }
  throw new Error(`preview never became ready at ${url}`);
}

// Pull the design-guidance keys off a spec section into a compact object.
function guideOf(spec) {
  const g = {};
  for (const k of ['intent', 'decisions', 'gotchas', 'acceptance']) if (spec[k]) g[k] = spec[k];
  return Object.keys(g).length ? g : undefined;
}

// A self-contained, fetchable spec per section for "Copy for Claude".
function specMarkdown(s) {
  const lines = [`# ${s.label}`, ''];
  if (s.guide?.intent) lines.push(s.guide.intent, '');
  const bullets = (title, arr) => {
    if (!arr?.length) return;
    lines.push(`## ${title}`, ...arr.map((x) => `- ${x}`), '');
  };
  bullets('Key decisions', s.guide?.decisions);
  bullets('Gotchas', s.guide?.gotchas);
  bullets('Done when', s.guide?.acceptance);
  lines.push('## Markup', '```html', s.html, '```', '');
  if (s.css) lines.push('## Styles', '```css', s.css, '```', '');
  if (s.tokens?.length)
    lines.push('## Tokens', ...s.tokens.map((t) => `- \`${t.name}\`: ${t.value} _(${t.tier})_`), '');
  return lines.join('\n');
}

function writeCuratedBundle(slug, url, theme, sections) {
  const outDir = root(`public/handoff/${slug}`);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(`${outDir}/claude`, { recursive: true });
  const manifestSections = sections.map((s) => {
    const fileSlug = slugify(s.label);
    writeFileSync(`${outDir}/claude/${fileSlug}.md`, specMarkdown(s));
    return {
      label: s.label,
      tag: s.tag,
      selector: s.selector, // lets the inspector highlight the live region
      apply: s.apply, // optional state recipe the inspector can replay
      html: s.html,
      css: s.css,
      guide: s.guide,
      tokens: s.tokens,
      claudePath: `claude/${fileSlug}.md`,
      repoPath: `public/handoff/${slug}/claude/${fileSlug}.md`,
    };
  });
  const manifest = { name: slug, url, theme, generatedFrom: 'spec', sections: manifestSections };
  writeFileSync(`${outDir}/manifest.json`, JSON.stringify(manifest, null, 2));
  console.log(`  wrote ${manifestSections.length} section(s) → public/handoff/${slug}/`);
}

// ------------------------------------------------------------------------------
console.log(`gen-handoff — ${targets.length} route(s): ${targets.map((t) => t.slug).join(', ')}`);
run('npx', ['astro', 'build'], { NODE_ENV: 'production' });

const preview = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: 'ignore',
});

try {
  await waitForServer(`${ORIGIN}${BASE}`);
  for (const { slug, route } of targets) {
    const url = `${ORIGIN}${BASE}${route.replace(/^\/+|\/+$/g, '')}/`;
    const spec = (await import(pathToFileURL(root(`src/data/handoff/${slug}.mjs`)).href)).default;
    console.log(`\ngen-handoff — capturing ${slug} (curated)  →  ${url}`);
    const { theme, sections } = await captureCurated(url, spec.sections, tierIndex, classifyTokens);
    // Merge authored guidance onto each captured section by label.
    const byLabel = new Map(spec.sections.map((s) => [s.label, s]));
    for (const s of sections) {
      const spc = byLabel.get(s.label) || {};
      s.selector = spc.selector;
      s.apply = spc.apply;
      s.guide = guideOf(spc);
    }
    writeCuratedBundle(bundleSlug(route), url, theme, sections);
  }
} finally {
  preview.kill();
}

console.log('\ngen-handoff — done. Bundles in public/handoff/. Run `npm run deploy` to publish.');
