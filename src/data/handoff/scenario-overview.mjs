// Handoff spec for /prototypes/scenario/overview — the Overview tab of Scenario
// Details. Sections: the shared scenario header, the two-card Overview panel, and
// the two edit dialogs its cards open (each captured OPEN via an apply recipe).
//
// Consumed only by the build-time generator (scripts/gen-handoff.mjs).
import { scenarioHeaderSection } from './_scenario-common.mjs';

/** @type {{ sections: import('./parcel-discovery.mjs') }} */
export default {
  sections: [
    scenarioHeaderSection,
    {
      label: 'Overview panel',
      selector: '.noria-overview-panel',
      intent:
        'The Overview tab body: two esa-cards side by side (a responsive .grid) — a read-only "Details" card and a read-only "Configure" summary (participants + their roles, price bounds, water types). Each card\'s ghost Edit button opens the matching edit dialog. Under an h2 "Overview" section title.',
      decisions: [
        'Each card renders a key-value definition list (noria-kv): short scalar fields are inline rows (label left, value right); complex fields (Description, the participants list, the water-type list) are "block" rows (label above, content below) — all split by the same neutral hairline divider.',
        'Composes legos: esa-card (card chrome), esa-button (ghost Edit triggers), noria-party-dot (participant identity), plus the two edit dialogs. Values read straight from the Scenario prop via the scenario.ts helpers.',
        'The .grid uses --grid-min: 22rem so the two cards drop to one column on narrow widths.',
        'Tab rhythm: an h2 section title with a 16px gap down to the cards (half the 32px inter-section rhythm).',
      ],
      gotchas: [
        'The value column is capped at max-width:60% and right-aligned, so a long value never overbears its short label — it leaves a gap in the middle instead of colliding with the label.',
        'Multi-line value lists (participants, water types) stay right-aligned even when they wrap to several lines.',
        'The cards are read-only summaries — all editing happens in the two dialogs, opened via each card\'s ghost Edit button.',
      ],
      acceptance: [
        'Both cards render as label/value definition lists split by hairlines; the two cards sit side by side and collapse to one column when narrow.',
        'Each card\'s Edit button opens its dialog (Details / Configure).',
      ],
    },
    {
      label: 'Edit Details dialog',
      selector: '#edit-details-dialog',
      apply: [{ click: '#edit-details-trigger' }],
      intent:
        'The "Edit Scenario Details" modal opened from the Overview Details card. A short form — scenario name, type, reporting period, description — over a Save / Cancel footer. Prototype: Save console.logs and closes; nothing persists.',
      decisions: [
        'Purely composed from legos: esa-dialog (chrome, scrim, Esc, focus trap) wrapping esa-text-field / esa-select / esa-textarea.',
        'Footer actions are esa-buttons in the house Windows order — primary Save sits LEFT of Cancel, both right-aligned.',
        'Opened imperatively: the Overview panel calls this dialog\'s .show() (id edit-details-dialog).',
      ],
      gotchas: [
        'esa-select\'s selected value is a JS accessor (.value), NOT an attribute-bound prop — preset defaults through the data-default + .value pattern after the element upgrades, not via a value="" attribute.',
      ],
      acceptance: [
        'The Details Edit button opens a modal with the name/type/period/description fields prefilled; Save closes it (prototype no-op), Esc / scrim / Cancel dismiss it.',
      ],
    },
    {
      label: 'Configure Scenario dialog',
      selector: '#edit-configure-dialog',
      apply: [{ click: '#edit-configure-trigger' }],
      intent:
        'The "Configure Scenario" modal opened from the Overview Configure card. Ports the production modal\'s shape: a two-column body — Price Floor | Price Ceiling, then Districts | Conservation Buyers (each a Select-All section of party-dot + name + role checkboxes), then Water Types set-asides across the bottom.',
      decisions: [
        'esa-dialog widened via --dialog-width-lg (64rem) so the two-column body has room; size="lg".',
        'Reads the FULL water-bank roster (all districts + conservation buyers), NOT just this scenario\'s active participants — the active three come pre-checked.',
        'Price bounds + each water type\'s set-aside use esa-text-field with segmented affixes — a "$" prefix on prices, a "%" suffix on set-asides (gray affix background + hairline border).',
        'Water types sit in a gray-50 box (border + radius) with the set-aside label inline, so each reads as one streamlined horizontal control; district rows are denser (tighter padding, size="sm" checkboxes).',
        'Composes legos: esa-dialog + esa-text-field + esa-button (Select All + footer) + noria-party-dot + esa-checkbox pairs.',
      ],
      gotchas: [
        'Select-All and Save are client stubs in the prototype — no persistence.',
        'The roster is the full district + conservation-buyer list; do not filter it to the scenario\'s active participants (those are just the pre-checked subset).',
        'Form labels and water-type / district names run smaller + heavier than default (14px / semibold) to match the prod density — driven by the spoke\'s --form-label-font-size / --form-label-font-weight hooks.',
      ],
      acceptance: [
        'The Configure Edit button opens a wide two-column modal; prices show a $ prefix and set-asides a % suffix; the active participants are pre-checked; Save closes it (prototype no-op).',
      ],
    },
  ],
};
