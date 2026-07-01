// Shared handoff sections for the Scenario Details prototype tabs.
//
// Every scenario tab page (Overview / Offers / Transactions / Report / User
// Management) renders the SAME NoriaScenarioHeader, so its handoff section is
// authored ONCE here and imported into each per-tab spec — keeping the five specs
// DRY and the guidance identical across tabs. This file is a helper, not a target:
// it is not listed in prototypes.ts `handoffTargets`, so gen-handoff never treats
// it as its own bundle.

/** @typedef {import('./parcel-discovery.mjs')} */

/** The stacked page header shared by all five scenario tabs. */
export const scenarioHeaderSection = {
  label: 'Scenario header',
  selector: '.scenario-header',
  intent:
    'The page header on every Scenario Details tab: a breadcrumb trail, then a tight identity UNIT (a primary-blue glyph + the scenario name + a searchable scenario switcher, with a custom meta row directly beneath), then a horizontal tab strip linking the five tabs. Identity + meta read as one block; breadcrumbs above and tabs below sit at a wider gap so they never crowd it.',
  decisions: [
    'A .stack spine at data-gap="2xl" separates the three bands (breadcrumbs · identity+meta · tabs); the identity and meta nest in their own tight data-gap="sm" stack so they read as one unit.',
    'Identity lockup matches the Parcel Discovery page header (noria-page-title): a blue glyph beside a Google Sans Flex 500 title, BOTH in the same primary blue (#235069) so icon and title read as one unit.',
    'Meta row = four bespoke facets, each expressing the SHAPE of its datum: Type as a transfer flow (A → B), Reporting Period as a calendar glyph + text, Participants as an overlapping party-color facepile (keyed on each participant colorHex, like noria-party-dot) + count, and Price Band as a floor–track–ceiling lockup.',
    'All four facets share ONE type contract — 14px / medium (500) / primary ink, with a single muted glyph tone — so nothing reads heavier than its neighbor.',
    'The tab strip is a route-linked underline bar: cross-page <a href> links (one per tab route), the active tab marked by primary-blue text + a 2px underline that overlaps the container hairline (no layout shift vs. inactive).',
    'Composed legos: esa-breadcrumbs (trail), esa-combobox (searchable switcher, text trigger), esa-icon (identity glyph + tab glyphs).',
  ],
  gotchas: [
    'The tabs are CROSS-PAGE routes, not esa-tab-layout panels — esa-tab-layout switches client panels in place (activeIndex), which is the wrong model here. No esa- lego renders a route-linked underline bar, so this small scoped strip mirrors esa-tab-layout\'s "underline" appearance instead.',
    'Keep the four meta facets on their one shared type contract; do not let any one facet (e.g. the price band or a longer Type string) grow heavier or larger than the others.',
    'Tab glyphs (layers, receipt-text, chart-pie) and the identity/scenario glyph are NOT in esa-icon\'s built-in registry — pass the inner SVG explicitly via the paths prop.',
    'The scenario switcher is a prototype stub: on change it console.logs and resets its value in a microtask so the trigger keeps its "Switch scenario" placeholder instead of latching onto the picked name.',
    'The facepile dots overlap via a negative margin and carry a 2px surface-colored border so each reads as a distinct token against its neighbor.',
  ],
  acceptance: [
    'Breadcrumbs → identity (glyph + name in the SAME blue) + meta facets → tab strip render top to bottom, with the identity+meta visually tighter than the gaps above and below.',
    'The current tab is underlined in primary blue and carries aria-current="page"; every tab links to its own route.',
    'All four meta facets render at one visual weight; the switcher opens a searchable list of the other scenarios.',
  ],
};
