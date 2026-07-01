// The spoke's prototype registry — the single source of truth that drives the
// home page index table. Add a row here when you ship a new prototype.
//
// The template ships with an EMPTY registry: the home page renders the layers
// (Design System / Pattern Library) immediately, and the prototypes list stays
// empty until this spoke builds its first working screen. Add entries here as
// prototypes land (each route lives under src/pages/prototypes/<slug>.astro).

export type PrototypeStatus = 'live' | 'in-progress' | 'planned' | 'archived';

export interface Prototype {
  /** URL-safe id. */
  slug: string;
  title: string;
  description: string;
  /** Internal route, root-relative and base-less — wrap with withBase() at render. */
  route: string;
  /** ISO date (YYYY-MM-DD) the prototype was first built. */
  createdAt: string;
  /** Tracking ticket id, e.g. a Jira key. Optional. */
  ticket?: string;
  status: PrototypeStatus;
}

export const prototypes: Prototype[] = [
  {
    slug: 'scenario',
    title: 'Scenario Details',
    description:
      'The full scenario workspace — Overview, Offers, Transactions, Report, and User Management — for a Deschutes wholesale water exchange, inside the Deschutes Water Bank app shell.',
    route: '/prototypes/scenario/overview',
    createdAt: '2026-07-01',
    status: 'live',
  },
  {
    slug: 'parcel-discovery',
    title: 'Parcel Discovery Tool',
    description:
      'Every parcel that could participate in the Deschutes River Water Bank, explorable as a grid, a map, or both — inside the Deschutes Water Bank app shell.',
    route: '/prototypes/parcel-discovery',
    createdAt: '2026-06-29',
    status: 'live',
  },
];

/** Newest first — the order the index table renders. */
export const prototypesByNewest = (): Prototype[] =>
  [...prototypes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

/** One curated handoff bundle target. */
export interface HandoffTarget {
  /** Spec file basename: src/data/handoff/<slug>.mjs. */
  slug: string;
  /** Route to capture; the bundle folder is this path dashified (see gen-handoff). */
  route: string;
}

// Curated-handoff capture targets — DECOUPLED from the home-index `prototypes`
// list above. A multi-tab prototype like Scenario Details is ONE index card but
// MANY handoff bundles (one per tab route), so the two lists can't be the same.
// gen-handoff reads these compact `{ slug, route }` objects; each needs a matching
// spec at src/data/handoff/<slug>.mjs or it's skipped.
export const handoffTargets: HandoffTarget[] = [
  { slug: 'parcel-discovery', route: '/prototypes/parcel-discovery' },
  { slug: 'scenario-overview', route: '/prototypes/scenario/overview' },
  { slug: 'scenario-offers', route: '/prototypes/scenario/offers' },
  { slug: 'scenario-transactions', route: '/prototypes/scenario/transactions' },
  { slug: 'scenario-report', route: '/prototypes/scenario/report' },
  { slug: 'scenario-users', route: '/prototypes/scenario/users' },
];
