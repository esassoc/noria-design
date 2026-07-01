// Handoff spec for /prototypes/scenario/users — the User Management tab of
// Scenario Details. Sections: the shared scenario header, the User Management
// panel, and the add / edit-role dialog (captured OPEN in "add" mode via apply).
import { scenarioHeaderSection } from './_scenario-common.mjs';

/** @type {{ sections: import('./parcel-discovery.mjs') }} */
export default {
  sections: [
    scenarioHeaderSection,
    {
      label: 'User Management panel',
      selector: '.noria-users-panel',
      intent:
        'The User Management tab body: an h2 "User Management" over an "Add User +" toolbar, above the users data grid. Each row is a scenario user (name · email · role) with an Actions menu (Edit Role · Remove).',
      decisions: [
        'The table is a NoriaDataGrid (search + download + record-count chrome built in); it emits a bubbling `noria-grid-action` the panel routes to the dialog / a log.',
        'The "Add User +" toolbar action is an outline, size="sm" esa-button; the grid runs autoHeight so it grows to its rows and the page scrolls as one.',
        'Role is a set-filtered column; name and email flex to fill.',
      ],
      gotchas: [
        'The panel only reacts to its own gridId ("users") on the shared `noria-grid-action` event.',
        'Remove is a prototype log (no persistence); Edit Role opens the dialog in edit mode for that user.',
      ],
      acceptance: [
        'Users render with a per-row Actions menu; Add User opens the dialog in add mode; Edit Role opens it in edit mode preset to that user.',
      ],
    },
    {
      label: 'Add / Edit User dialog',
      selector: '#user-dialog',
      apply: [{ click: '#add-user-btn' }],
      intent:
        'The add / edit-role dialog for a scenario\'s users. Two modes on one esa-dialog: open("add") shows a User picker + a Scenario Role select under the heading "Add User"; open("edit", userId) shows ONLY the Role select, preset to that user\'s current role, under "Edit Role - {name}".',
      decisions: [
        'Composes legos, no hand-rolled dialog / inputs / buttons: esa-dialog (chrome — scrim, Esc, focus trap, close button) + esa-select (User picker + Role) + esa-button (Save primary + Cancel outline, Windows order).',
        'The wrapper toggles the User field, sets the heading, presets values, then calls the esa-dialog\'s .show().',
      ],
      gotchas: [
        'open() is exposed on the WRAPPER element (#user-dialog), NOT on the <esa-dialog> (#user-dialog-el) — esa-dialog already owns a reactive boolean `open` property (its visibility); shadowing it with a function would break show() / close(). This is the standard spoke pattern for a dialog with an imperative open() API.',
        'The wrapper is display:contents so it adds no box to the panel\'s flow.',
        'In edit mode the User picker (#user-add-field) is hidden — only the Role select shows, preset to the user\'s current role.',
      ],
      acceptance: [
        'Add User opens the dialog with a User picker + Role select; Edit Role opens it with only the Role select preset; Save closes it (prototype no-op).',
      ],
    },
  ],
};
