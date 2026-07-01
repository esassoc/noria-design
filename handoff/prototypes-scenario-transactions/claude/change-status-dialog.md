# Change Status dialog

The small "Change Transaction Status" modal used by the Transactions grid. A single Status select over a Save / Cancel footer, opened from a row's "Change Status" action preset to that transaction's current status.

## Key decisions
- Composes purely legos: esa-dialog (size="sm", chrome / Esc / scrim / focus-trap) + esa-select (Status) + esa-button (footer).
- Footer follows the house Windows order — primary Save sits LEFT of Cancel, both right-aligned.
- The panel drives it: on a grid "Change Status" action it calls open(txId, currentStatus), which presets the select and shows the dialog.

## Gotchas
- open() is exposed on the WRAPPER element (id="noria-change-status"), NOT on the esa-dialog — esa-dialog already owns a reactive boolean `open` property (its visibility), so attaching a method there would clobber its state. This is the standard pattern for spoke dialogs with an imperative API.

## Done when
- A grid "Change Status" action opens a small modal with the Status select preset to the row's current status; Save closes it (prototype no-op).

## Markup
```html
<div id="noria-change-status" class="noria-change-status">
  <esa-dialog size="sm" heading="Change Transaction Status">
    <div class="stack" data-gap="md">
      <esa-select
        id="noria-change-status-select"
        label="Status"
        required="true"
        options='[{"label":"Pending","value":"Pending"},{"label":"Approved","value":"Approved"},{"label":"Closed","value":"Closed"},{"label":"Rejected","value":"Rejected"}]'
        size="md"
      ></esa-select>
    </div>
    <div slot="footer" class="cluster" data-justify="end" data-gap="xs">
      <span id="noria-change-status-save">
        <span
          class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
        >
          <button class="esa-button__native" type="button">
            <span class="esa-button__label"> Save </span>
          </button>
        </span>
      </span>
      <span id="noria-change-status-cancel">
        <span
          class="esa-button esa-button--color-ghost esa-button--appearance-outline esa-button--md"
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
.esa-button--appearance-fill .esa-button__native {
  background: var(--_accent);
  color: var(--_on);
  border-color: transparent;
}
.esa-button__label {
  white-space: nowrap;
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent);
  border-color: var(--_accent);
}
.esa-button--color-ghost .esa-button__native {
  background: transparent;
  color: var(--color-text-primary, #171717);
  border-color: transparent;
}
.esa-button--color-ghost.esa-button--appearance-outline .esa-button__native,
.esa-button--color-ghost.esa-button--appearance-dashed .esa-button__native {
  border-color: var(--color-border, #e5e5e5);
}
.esa-button--appearance-fill .esa-button__native:hover:not(:disabled) {
  background: var(--_accent-hover);
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
.noria-change-status {
  display: contents;
}
```

## Tokens
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-primary`: #235069 _(semantic)_
- `--color-primary-hover`: #214459 _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-primary`: #171717 _(semantic)_
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
