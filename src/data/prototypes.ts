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
