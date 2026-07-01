# Edit Details dialog

The "Edit Scenario Details" modal opened from the Overview Details card. A short form — scenario name, type, reporting period, description — over a Save / Cancel footer. Prototype: Save console.logs and closes; nothing persists.

## Key decisions
- Purely composed from legos: esa-dialog (chrome, scrim, Esc, focus trap) wrapping esa-text-field / esa-select / esa-textarea.
- Footer actions are esa-buttons in the house Windows order — primary Save sits LEFT of Cancel, both right-aligned.
- Opened imperatively: the Overview panel calls this dialog's .show() (id edit-details-dialog).

## Gotchas
- esa-select's selected value is a JS accessor (.value), NOT an attribute-bound prop — preset defaults through the data-default + .value pattern after the element upgrades, not via a value="" attribute.

## Done when
- The Details Edit button opens a modal with the name/type/period/description fields prefilled; Save closes it (prototype no-op), Esc / scrim / Cancel dismiss it.

## Markup
```html
<esa-dialog id="edit-details-dialog" heading="Edit Scenario Details" size="md" open="">
  <div class="stack" data-gap="md">
    <esa-text-field
      label="Scenario Name"
      value="Deschutes 2026 Wholesale Exchange"
      required=""
      size="md"
    ></esa-text-field>
    <esa-select
      label="Reporting Period"
      options='[{"label":"2026 Water Year","value":"2026 Water Year"},{"label":"2025 Water Year","value":"2025 Water Year"},{"label":"2024 Water Year","value":"2024 Water Year"}]'
      data-default="2026 Water Year"
      size="md"
    ></esa-select>
    <esa-select
      label="Type"
      options='[{"label":"Wholesale to Wholesale","value":"Wholesale to Wholesale"},{"label":"Wholesale to Patron","value":"Wholesale to Patron"},{"label":"Patron to Patron","value":"Patron to Patron"}]'
      data-default="Wholesale to Wholesale"
      size="md"
    ></esa-select>
    <esa-textarea
      label="Description"
      value="Wholesale water exchange modeling North Unit, Central Oregon, and Three Sisters transfers for the 2026 water year."
      rows="4"
      size="md"
    ></esa-textarea>
  </div>
  <div slot="footer" class="cluster" data-justify="end" data-gap="sm">
    <span data-dialog-save="">
      <span
        class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Save </span>
        </button>
      </span>
    </span>
    <span data-dialog-cancel="">
      <span
        class="esa-button esa-button--color-primary esa-button--appearance-outline esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Cancel </span>
        </button>
      </span>
    </span>
  </div>
</esa-dialog>
```

## Styles
```css
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
.esa-button--color-ghost .esa-button__native {
  background: transparent;
  color: var(--color-text-primary, #171717);
  border-color: transparent;
}
.esa-button__label {
  white-space: nowrap;
}
.esa-button--appearance-fill .esa-button__native:hover:not(:disabled) {
  background: var(--_accent-hover);
}
.esa-button--color-ghost .esa-button__native:hover:not(:disabled),
.esa-button--color-ghost.esa-button--active .esa-button__native {
  background: var(--color-surface-sunken, #efefef);
}
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent);
  border-color: var(--_accent);
}
```

## Tokens
- `--color-primary`: #235069 _(semantic)_
- `--color-primary-hover`: #214459 _(semantic)_
- `--color-surface-sunken`: #efefef _(semantic)_
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
