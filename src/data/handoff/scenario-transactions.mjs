// Handoff spec for /prototypes/scenario/transactions — the Transactions tab of
// Scenario Details. Sections: the shared scenario header, the Transactions panel,
// the full create/edit wizard (captured OPEN via apply), and the small change-
// status dialog (captured in its default state — it opens from a grid row action).
import { scenarioHeaderSection } from './_scenario-common.mjs';

/** @type {{ sections: import('./parcel-discovery.mjs') }} */
export default {
  sections: [
    scenarioHeaderSection,
    {
      label: 'Transactions panel',
      selector: '.noria-transactions-panel',
      intent:
        'The Transactions tab body: an h2 "Transactions" over a "Create Transaction +" toolbar, above the transactions data grid. Each row is a transaction (# · status badge · buyer & seller party dots · water type · volume · price · sending / receiving parcels), with a per-row Actions menu whose items depend on status.',
      decisions: [
        'The table is a NoriaDataGrid; number columns right-align, buyer/seller render as party dots, status as a quiet badge, the id as a hash.',
        'Row actions vary by status: a Pending row offers Edit · Change Status · Delete; any other status offers View · Change Status. The grid emits a bubbling `noria-grid-action` the panel routes to the right modal.',
        'Toolbar "Create Transaction +" is a size="sm" primary esa-button; the grid runs autoHeight so it grows to its rows and the page scrolls as one.',
      ],
      gotchas: [
        'The panel only reacts to its own gridId ("transactions") on the shared `noria-grid-action` event — several grids on the page bubble the same event.',
        'Delete is a prototype log; Edit/View open the wizard, Change Status opens the small status dialog.',
      ],
      acceptance: [
        'Rows render with party dots + status badges; a Pending row\'s Actions menu shows Edit/Change Status/Delete, a settled row shows View/Change Status; Create Transaction opens the wizard.',
      ],
    },
    {
      label: 'Create Transaction wizard',
      selector: '#noria-tx-wizard',
      apply: [{ click: '#tx-create-btn' }],
      intent:
        'The full create / edit / view transaction wizard — a fixed-width esa-dialog with a left workflow rail and a four-step body: (1) Linked Offers · Parties · Terms, (2) Sending Info, (3) Receiving Info, (4) Summary. Steps 2 and 3 pair a parcel panel with a map for selecting parcels and placing a point of diversion.',
      decisions: [
        'A fixed-width dialog — --dialog-width: min(1600px, 92vw) — NOT fullscreen, with a block-size held CONSTANT across all four steps so the work surface never jumps as the user advances (short steps just leave whitespace).',
        'Body is a .sidebar primitive: a fixed-width rail (numbered steps) beside flexing step content; steps 2–4 set --sidebar-content-min so the map / recap panes keep a real width.',
        'Group labels use proper type roles (type-body / type-body-large), never ornamental micro-uppercase overlines.',
        'Composes legos: esa-dialog + esa-select (offers / parties / water type) + esa-text-field (price / volume / PoD labels) + esa-button-toggle (parcel select vs. place-point-of-diversion mode) + a Leaflet map for parcel picking.',
      ],
      gotchas: [
        'Keep the dialog block-size fixed across steps — a per-step auto height makes the modal resize on every Next/Back, which reads as jank.',
        'Opened imperatively via the wrapper (#noria-tx-wizard): openCreate() / openEdit(txId) / openView(txId) — the panel calls these off grid actions.',
        'The step maps live in flex panes that may be zero-width on first paint; they need an invalidateSize / fitBounds pass when their step becomes visible.',
      ],
      acceptance: [
        'Create Transaction opens a wide fixed-width dialog at step 1; the four steps advance without the dialog changing height; the sending/receiving maps let you select parcels; Summary recaps the entry.',
      ],
    },
    {
      label: 'Change Status dialog',
      selector: '#noria-change-status',
      intent:
        'The small "Change Transaction Status" modal used by the Transactions grid. A single Status select over a Save / Cancel footer, opened from a row\'s "Change Status" action preset to that transaction\'s current status.',
      decisions: [
        'Composes purely legos: esa-dialog (size="sm", chrome / Esc / scrim / focus-trap) + esa-select (Status) + esa-button (footer).',
        'Footer follows the house Windows order — primary Save sits LEFT of Cancel, both right-aligned.',
        'The panel drives it: on a grid "Change Status" action it calls open(txId, currentStatus), which presets the select and shows the dialog.',
      ],
      gotchas: [
        'open() is exposed on the WRAPPER element (id="noria-change-status"), NOT on the esa-dialog — esa-dialog already owns a reactive boolean `open` property (its visibility), so attaching a method there would clobber its state. This is the standard pattern for spoke dialogs with an imperative API.',
      ],
      acceptance: [
        'A grid "Change Status" action opens a small modal with the Status select preset to the row\'s current status; Save closes it (prototype no-op).',
      ],
    },
  ],
};
