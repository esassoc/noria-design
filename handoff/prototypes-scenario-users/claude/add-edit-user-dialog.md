# Add / Edit User dialog

The add / edit-role dialog for a scenario's users. Two modes on one esa-dialog: open("add") shows a User picker + a Scenario Role select under the heading "Add User"; open("edit", userId) shows ONLY the Role select, preset to that user's current role, under "Edit Role - {name}".

## Key decisions
- Composes legos, no hand-rolled dialog / inputs / buttons: esa-dialog (chrome — scrim, Esc, focus trap, close button) + esa-select (User picker + Role) + esa-button (Save primary + Cancel outline, Windows order).
- The wrapper toggles the User field, sets the heading, presets values, then calls the esa-dialog's .show().

## Gotchas
- open() is exposed on the WRAPPER element (#user-dialog), NOT on the <esa-dialog> (#user-dialog-el) — esa-dialog already owns a reactive boolean `open` property (its visibility); shadowing it with a function would break show() / close(). This is the standard spoke pattern for a dialog with an imperative open() API.
- The wrapper is display:contents so it adds no box to the panel's flow.
- In edit mode the User picker (#user-add-field) is hidden — only the Role select shows, preset to the user's current role.

## Done when
- Add User opens the dialog with a User picker + Role select; Edit Role opens it with only the Role select preset; Save closes it (prototype no-op).

## Markup
```html
<div id="user-dialog" class="noria-user-dialog">
  <esa-dialog id="user-dialog-el" heading="Add User" size="md" open="">
    <div class="stack" data-gap="md">
      <div id="user-add-field">
        <esa-select
          id="user-add-select"
          label="User"
          placeholder="Select a user…"
          options='[{"label":"Sofia Reyes","value":"Sofia Reyes"},{"label":"Marcus Bell","value":"Marcus Bell"},{"label":"Hana Okafor","value":"Hana Okafor"},{"label":"Terrence Wu","value":"Terrence Wu"}]'
          required="true"
          size="md"
        ></esa-select>
      </div>
      <esa-select
        id="user-role-select"
        label="Scenario Role"
        placeholder="Select a role…"
        options='[{"label":"Scenario Owner","value":"Scenario Owner"},{"label":"District Manager","value":"District Manager"},{"label":"Patron","value":"Patron"}]'
        required="true"
        size="md"
      ></esa-select>
    </div>
    <div slot="footer" class="cluster" data-justify="end" data-gap="sm">
      <span id="user-save"
        ><span
          class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
        >
          <button class="esa-button__native" type="button">
            <span class="esa-button__label"> Save </span>
          </button>
        </span>
      </span>
      <span id="user-cancel"
        ><span
          class="esa-button esa-button--color-primary esa-button--appearance-outline esa-button--md"
        >
          <button class="esa-button__native" type="button">
            <span class="esa-button__label"> Cancel </span>
          </button>
        </span>
      </span>
    </div>
  </esa-dialog>
</div>
```

## Styles
```css
.noria-user-dialog {
  display: contents;
}
.esa-button {
  --_btn-height: var(--form-height-md, 40px);
  --_btn-padding-x: var(--form-padding-x-md, 16px);
  --_btn-font-size: var(--form-font-size-md, 14px);
  --_btn-radius: var(--form-radius-md, 6px);
  --_accent: var(--color-primary, #43608a);
  --_accent-hover: var(--color-primary-hover, #39506f);
  --_on: var(--color-text-inverse, #ffffff);
  display: inline-block;
}
.esa-button--sm {
  --_btn-height: var(--form-height-sm, 32px);
  --_btn-padding-x: var(--form-padding-x-sm, 12px);
  --_btn-font-size: var(--form-font-size-sm, 12px);
  --_btn-radius: var(--form-radius-sm, 4px);
}
.esa-button__native {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-200, 8px);
  width: 100%;
  height: var(--_btn-height);
  padding-inline: var(--_btn-padding-x);
  border: 1px solid transparent;
  border-radius: var(--_btn-radius);
  font-size: var(--_btn-font-size);
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: var(--font-weight-medium, 500);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--transition-fast, 0.15s ease),
    border-color var(--transition-fast, 0.15s ease);
  -webkit-appearance: none;
  appearance: none;
}
.esa-button--sm .esa-button__native {
  height: auto;
  padding-block: var(--spacing-150, 6px);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent);
  border-color: var(--_accent);
}
.esa-button__label {
  white-space: nowrap;
}
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: transparent;
}
.esa-button--appearance-outline .esa-button__native:hover:not(:disabled),
.esa-button--appearance-dashed .esa-button__native:hover:not(:disabled) {
  background: color-mix(in srgb, var(--_accent) 8%, transparent);
}
.stack {
  --gap: var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.cluster {
  --gap: var(--spacing-300, 0.75rem);
  --align: center;
  --justify: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: var(--justify);
}
```

## Tokens
- `--color-primary`: #235069 _(semantic)_
- `--color-primary-hover`: #214459 _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--font-sans`: "DM Sans", system-ui, sans-serif _(primitive)_
- `--font-weight-medium`: 450 _(primitive)_
- `--form-font-size-md`: clamp(.75rem, .66rem + .44vw, .9375rem) _(component)_
- `--form-font-size-sm`: clamp(.625rem, .56rem + .32vw, .75rem) _(component)_
- `--form-height-md`: 40px _(component)_
- `--form-height-sm`: 32px _(component)_
- `--form-padding-x-md`: .75rem _(component)_
- `--form-padding-x-sm`: .625rem _(component)_
- `--form-radius-md`: .25rem _(component)_
- `--form-radius-sm`: .25rem _(component)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
