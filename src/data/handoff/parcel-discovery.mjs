// Handoff spec for the /prototypes/parcel-discovery prototype — the authored
// counterpart to the auto-derived manifest. It declares EXACTLY which regions are
// inspectable sections (by selector, at any depth), plus the design guidance a
// developer (or Claude) needs to re-implement each one faithfully. This is the
// canonical reference for the FIRST implementation of the Parcel Discovery Tool.
//
// Consumed only by the build-time generator (scripts/gen-handoff.mjs), never by
// the browser — so it's .mjs (native node import).
//
// Each section becomes one tab in the runtime inspector: top bar, side nav, and
// every component part of the page.

/**
 * @typedef {Object} HandoffSection
 * @property {string} label       Tab label in the inspector.
 * @property {string} selector    What to slice out as this section (first match).
 * @property {string} [intent]    What this is and why it exists.
 * @property {string[]} [decisions] Key design/implementation decisions.
 * @property {string[]} [gotchas]   Traps to avoid when re-implementing.
 * @property {string[]} [acceptance] "Done when…" checks.
 */

/** @type {{ sections: HandoffSection[] }} */
export default {
  sections: [
    {
      label: 'Top bar',
      selector: '.topbar',
      intent:
        'The fixed application top bar for the Deschutes Water Bank. Left: the sidebar toggle and a QA-environment badge. Right: a utility/admin icon cluster (Support Desk, Manage, Platform Admin) and the account menu. The brand wordmark deliberately lives in the side nav, not here.',
      decisions: [
        'Three-column grid (auto · 1fr · auto): left cluster, flexible spacer, right cluster.',
        'Subtle neutral-blue chrome via color-mix(in srgb, primary 6%, surface) — reads as a cool off-white, never a brand fill.',
        'Manage and the account menu are lightweight in-shell dropdowns sharing ONE topbar-menu pattern (trigger + absolutely-positioned panel); a single wireMenu(trigger, panel, menu) drives both.',
        'Admin actions are icon-only buttons with title tooltips; Manage adds a chevron and opens Counties / Districts / OpenET Integration.',
        'No separators between the three admin icons — one divider only sets the account apart.',
      ],
      gotchas: [
        'The QA badge glyph and its "QA" label must share one color — let the icon inherit currentColor from the badge, do not give it its own.',
        'The bar is position:fixed at z-index 1100; the body is padded by its height (--_topbar-h) so content clears it.',
        'Opening one dropdown closes the other: the triggers do NOT stopPropagation, so each menu\'s outside-click handler closes it when the other trigger is clicked.',
      ],
      acceptance: [
        'Manage opens a menu of Counties / Districts / OpenET Integration; the account button opens Profile / Settings / Sign out.',
        'Esc and outside-click close any open menu; opening one menu closes the other.',
      ],
    },
    {
      label: 'Side nav',
      selector: '.side-nav',
      intent:
        'The collapsible left navigation. The brand lockup (mountain + water mark beside the "Deschutes Water Bank" wordmark) links home. Primary destinations (Parcel Discovery Tool, Scenarios) sit above a divider; secondary utilities (News, Help) below it.',
      decisions: [
        '280px expanded / 72px collapsed rail, animated with a width transition.',
        'Active item = blue tint (--noria-blue-100) + semibold + primary text. No colored left-border indicator.',
        'Same blue-tinted neutral as the top bar, one value-step lighter, so the rail sits just under the bar.',
        'Two SVGs for the logo: a full mark+wordmark lockup (expanded) and a separate viewBox-cropped mark (collapsed), toggled by the .collapsed class.',
      ],
      gotchas: [
        'Do not scale one logo SVG between states — swap between the full lockup and the cropped mark; the collapsed mark is capped at max-width:40px so it never spills the 72px rail.',
        'Labels are hidden (display:none), not removed, when collapsed — the icons stay.',
      ],
      acceptance: [
        'Toggle collapses the rail to a 72px icon-only column and back.',
        'The active route is highlighted; the logo links to home.',
      ],
    },
    {
      label: 'Page header',
      selector: '.noria-page-title',
      intent:
        'The prototype screen\'s title lockup: a primary-blue compass glyph beside the page title, with a one-line lede beneath. A small, reusable spoke component (noria-page-title) used across prototype screens.',
      decisions: [
        'Title is Google Sans Flex at weight 500, in primary blue (#235069) — the SAME blue as the glyph, so icon and title read as one unit.',
        'The icon composes the esa-icon lego (compass paths passed explicitly); the lede uses the secondary text color.',
        'Props: title, optional lede, optional icon — nothing page-specific is baked in.',
      ],
      gotchas: [
        'The shared blue between glyph and title is intentional; do not revert the title to the default near-black text color.',
      ],
      acceptance: ['Title + lede render; the icon and title are the same blue.'],
    },
    {
      label: 'Filters',
      selector: '.noria-parcel-controls',
      intent:
        'The single filter card pinned over the workspace. Row 1: three single-select dropdowns — Reporting Period, Months, Water Measurement Type. Row 2: a far-left grid search and a centered Grid / Hybrid / Map view toggle.',
      decisions: [
        'Each filter is an esa-select (simple single-select) — NOT esa-filter-dropdown, which is a multi-select facet filter (checkboxes + "Clear all") and clamps its trigger label at 200px, truncating long values like "2026 Water Year".',
        'The field name rides in each select\'s placeholder; the two defaulted selects show their value, the undefaulted one shows its field name.',
        'Defaults are applied through esa-select\'s public value setter; searchable is turned off for a plain pick-one (no typeahead).',
        'Months run in water-year order (Oct→Sep); Water Measurement Type is OpenET Evapotranspiration / Precipitation.',
      ],
      gotchas: [
        'esa-select is display:block with a 100%-width input, so each needs an explicit box width — sized per content so values never clip.',
        'The card must establish a stacking context ABOVE the workspace split (z-index) or open dropdown panels render behind the Leaflet map.',
      ],
      acceptance: [
        'All three dropdowns show their full value with no ellipsis and no checkboxes.',
        'Search filters the grid; the toggle switches Grid / Hybrid / Map.',
      ],
    },
    {
      label: 'Parcel grid',
      selector: '.noria-parcel-grid',
      intent:
        'The tabular half of the workspace — every candidate parcel as a row (APN, Irrigation District, County), each value a link. Lives in a 50/50 split beside the map in the Hybrid view.',
      decisions: [
        'AG Grid Community v36 via the Theming API (themeQuartz.withParams, ModuleRegistry.registerModules([AllCommunityModule])) — no legacy CSS import.',
        'Search drives AG Grid\'s built-in quickFilterText, NOT DOM row hiding.',
        'The grid announces its api to the page via a bubbling `noria-grid-ready` event (with a `#…__agApi` fallback handle), so the toolbar search/clear can reach it without the page owning grid internals.',
        'Cells render as links via a cellRenderer; odd rows get a faint tint.',
      ],
      gotchas: [
        'Capture the grid api from the `noria-grid-ready` event OR the mount\'s `__agApi` property — do not assume the grid initialized after your listener attached.',
        'The pane uses overflow:hidden + a 4px radius to keep the AG Grid frame inside the rounded card.',
      ],
      acceptance: ['Rows render; typing in the toolbar search filters them; columns sort.'],
    },
    {
      label: 'Parcel map',
      selector: '.noria-parcel-map',
      intent:
        'The spatial half of the workspace — an Esri World Topographic basemap over the Crook County / Ochoco area of the Deschutes basin, with every parcel plotted as a Noria-blue circle marker.',
      decisions: [
        'Leaflet with the Esri World_Topo_Map tile service ({z}/{y}/{x}); circle markers (primary-blue stroke, lighter blue fill).',
        'Server-rendered parcels reach the client through a JSON data island (the client script cannot read Astro.props); fitBounds tightens to whatever subset was passed.',
        'A ResizeObserver calls invalidateSize so the map stays correctly sized through sidebar collapse and split-view changes.',
      ],
      gotchas: [
        'Leaflet sets high z-indexes on its panes/controls (up to ~1000); the map box uses `isolation: isolate` to confine them so they never paint over the page\'s dropdown panels.',
        'circleMarker colors are literals — Leaflet\'s canvas paint ignores CSS custom properties.',
      ],
      acceptance: [
        'Basemap + markers render and fit the parcels in view.',
        'The map resizes cleanly; its controls never cover an open dropdown.',
      ],
    },
  ],
};
