// Handoff spec for /prototypes/scenario/report — the Report tab of Scenario
// Details. Sections: the shared scenario header, the filter bar, the Balance Sheet
// flow, and the Transaction Parcels workspace (grid | map split). No dialogs.
import { scenarioHeaderSection } from './_scenario-common.mjs';

/** @type {{ sections: import('./parcel-discovery.mjs') }} */
export default {
  sections: [
    scenarioHeaderSection,
    {
      label: 'Filters',
      selector: '.noria-report-panel__filters',
      intent:
        'The Report filter bar: a bordered gray-50 container holding three facet multi-selects — All Sellers, All Buyers, Transaction Status — with an Export PDF button at the far right.',
      decisions: [
        'Each facet is an esa-select size="sm", multiple, chip-mode; each holds a fixed 13rem box so its selected tokens stay in a stable width.',
        'chip-mode renders selected values INSIDE the field box: one selection shows its chip, 2+ collapse to an "N Options" count whose × clears all — so the box always matches its sibling selects\' height and never wraps.',
        'The Transaction Status facet defaults to "Approved" (data-default), applied through esa-select\'s .value setter after the element upgrades.',
        'The bar is a gray-50 container (border + radius) so the facets read as one control group, and it establishes a stacking context (z-index) above the workspace below.',
      ],
      gotchas: [
        'The filter bar MUST sit in a stacking context above the Transaction Parcels split, or an open dropdown panel renders BEHIND the Leaflet map.',
        'Defaults are a JS accessor (.value), not a value="" attribute — set them after customElements.whenDefined(\'esa-select\').',
      ],
      acceptance: [
        'Three compact facet selects render in one bordered bar with Export PDF at the right; the Status facet starts on "Approved"; picking a second status collapses the token to "2 Options".',
      ],
    },
    {
      label: 'Balance Sheet',
      selector: '.noria-balance',
      intent:
        'A three-band "flow" inside an esa-card: Offers (two opposing proportional bars) · Transactions (a dimensioned value block where width = Volume Transacted, height = Avg Price/ac-ft, and the area = Transaction Price) · Allocation (a donut splitting the transacted volume into Delivery + In-stream). Each band is a DIFFERENT mark — length → area → arc — so the section reads as one instrument, not repeated tiles.',
      decisions: [
        'Three EQUAL columns — grid-template-columns: repeat(3, minmax(0, 1fr)) — separated by full-height hairlines, bands top-aligned so content flows from a common top line.',
        'Offers composes esa-progress-bar (two tracks on a shared scale, the larger side filling the track); the displayed ac-ft number stays raw, decoupled from the fill %.',
        'The Transactions value block and the Allocation donut are the only bespoke marks — no esa- data-viz lego exists (esa-stat is a single value; an esa-donut is filed via /request-lego). This component is their reusable, documented home.',
      ],
      gotchas: [
        'Use minmax(0, 1fr), NOT 1fr — a plain 1fr track has a min-width:auto (min-content) floor, so an unshrinkable band (the value block, a long legend line) would push its track wider than an equal third.',
        'The middle band carries inline padding on BOTH sides while the outer two pad inward only, so its content area is inset slightly more than the outer bands even though the three tracks are equal width.',
        'The donut arc lengths are stroke-dasharray fractions of the circumference; the in-stream (green) arc draws first from 12 o\'clock, the delivery (blue) arc follows it via a dashoffset.',
      ],
      acceptance: [
        'Three equal-width bands render: opposing Offers bars, the Transactions value block, and the Allocation donut + legend; on narrow widths they stack with top separators.',
      ],
    },
    {
      label: 'Transaction Parcels',
      selector: '.noria-report-panel__workspace',
      intent:
        'The Transaction Parcels workspace: an h3 sub-heading over a single toolbar axis — search (left) · Grid / Hybrid / Map toggle (center) · Clear (right) — above a grid | map split. The same parcel rows feed both a bare NoriaDataGrid and a Leaflet map colored by transaction side.',
      decisions: [
        'The toolbar is a 1fr auto 1fr grid so the view toggle stays centered regardless of the search / clear widths; the h3 is smaller than the tab\'s h2 (type-card-title).',
        'The grid runs "bare" (no built-in search / footer chrome) and is driven by the shared toolbar: search sets its quickFilterText, Clear resets it, both resolved LAZILY off the mount\'s __agApi handle so ordering vs. the grid\'s ready event never matters.',
        'Hybrid is an even 50/50 grid | map split at a clamped height in the scroll flow; Grid / Map collapse to one column and hide the other pane. Mirrors noria-parcel-explorer; the map replicates the noria-parcel-map Leaflet pattern.',
        'Markers are colored by side — Sending = Noria blue, Receiving = Noria green — matching the legend.',
      ],
      gotchas: [
        'Drive the bare grid via its __agApi property (or the bubbling ready event), never by hiding DOM rows — search is AG Grid\'s quickFilterText.',
        'circleMarker colors are literals — Leaflet\'s canvas paint ignores CSS custom properties, so the by-side colors are hard-coded hexes that mirror the token values.',
        'The map pane can be zero-width on first paint and when switching INTO Hybrid / Map; it needs an invalidateSize + fitBounds pass (a ResizeObserver + a post-paint re-fit) or it loads tiles for a zero-size viewport.',
        'The map box uses isolation: isolate so Leaflet\'s high pane/control z-indexes never paint over the filter bar\'s open dropdowns.',
      ],
      acceptance: [
        'Search / toggle / clear sit on one axis above the split; typing filters the grid; the toggle switches Grid / Hybrid / Map; markers render colored by sending vs. receiving side.',
      ],
    },
  ],
};
