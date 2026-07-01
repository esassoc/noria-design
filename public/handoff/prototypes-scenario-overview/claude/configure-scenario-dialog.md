# Configure Scenario dialog

The "Configure Scenario" modal opened from the Overview Configure card. Ports the production modal's shape: a two-column body — Price Floor | Price Ceiling, then Districts | Conservation Buyers (each a Select-All section of party-dot + name + role checkboxes), then Water Types set-asides across the bottom.

## Key decisions
- esa-dialog widened via --dialog-width-lg (64rem) so the two-column body has room; size="lg".
- Reads the FULL water-bank roster (all districts + conservation buyers), NOT just this scenario's active participants — the active three come pre-checked.
- Price bounds + each water type's set-aside use esa-text-field with segmented affixes — a "$" prefix on prices, a "%" suffix on set-asides (gray affix background + hairline border).
- Water types sit in a gray-50 box (border + radius) with the set-aside label inline, so each reads as one streamlined horizontal control; district rows are denser (tighter padding, size="sm" checkboxes).
- Composes legos: esa-dialog + esa-text-field + esa-button (Select All + footer) + noria-party-dot + esa-checkbox pairs.

## Gotchas
- Select-All and Save are client stubs in the prototype — no persistence.
- The roster is the full district + conservation-buyer list; do not filter it to the scenario's active participants (those are just the pre-checked subset).
- Form labels and water-type / district names run smaller + heavier than default (14px / semibold) to match the prod density — driven by the spoke's --form-label-font-size / --form-label-font-weight hooks.

## Done when
- The Configure Edit button opens a wide two-column modal; prices show a $ prefix and set-asides a % suffix; the active participants are pre-checked; Save closes it (prototype no-op).

## Markup
```html
<esa-dialog
  id="edit-configure-dialog"
  class="noria-configure"
  heading="Configure Scenario"
  size="lg"
  open=""
>
  <div class="stack" data-gap="lg">
    <!-- Price bounds -->
    <div class="noria-configure__cols">
      <esa-text-field
        label="Price Floor"
        prefix="$"
        type="number"
        placeholder="Enter price floor"
        value="50"
        size="md"
      ></esa-text-field>
      <esa-text-field
        label="Price Ceiling"
        prefix="$"
        type="number"
        placeholder="Enter price ceiling"
        value="200"
        size="md"
      ></esa-text-field>
    </div>
    <!-- Districts | Conservation Buyers -->
    <div class="noria-configure__cols">
      <!-- Districts -->
      <section class="stack noria-configure__section" data-gap="sm">
        <div class="repel" data-align="center">
          <h3 class="noria-configure__section-title">Districts</h3>
          <span data-select-all="">
            <span
              class="esa-button esa-button--color-secondary esa-button--appearance-fill esa-button--sm"
            >
              <button class="esa-button__native" type="button">
                <span class="esa-button__label"> Select All </span>
              </button>
            </span>
          </span>
        </div>
        <div class="stack" data-gap="2xs">
          <div class="repel noria-configure__row" data-align="center">
            <span class="noria-party" data-size="md">
              <span class="noria-party__dot" style="background: #1f3a4d"></span>
              <span class="noria-party__name type-body">Arnold</span>
            </span>
            <div class="cluster" data-gap="md" data-align="center">
              <esa-checkbox size="sm" label="Buyer"></esa-checkbox>
              <esa-checkbox size="sm" label="Seller"></esa-checkbox>
            </div>
          </div>
          <div class="repel noria-configure__row" data-align="center">
            <span class="noria-party" data-size="md">
              <span class="noria-party__dot" style="background: #2e3a66"></span>
              <span class="noria-party__name type-body">Central Oregon</span>
            </span>
            <div class="cluster" data-gap="md" data-align="center">
              <esa-checkbox size="sm" label="Buyer" checked=""></esa-checkbox>
              <esa-checkbox size="sm" label="Seller" checked=""></esa-checkbox>
            </div>
          </div>
          <div class="repel noria-configure__row" data-align="center">
            <span class="noria-party" data-size="md">
              <span class="noria-party__dot" style="background: #5b5b8f"></span>
              <span class="noria-party__name type-body">Lone Pine</span>
            </span>
            <div class="cluster" data-gap="md" data-align="center">
              <esa-checkbox size="sm" label="Buyer"></esa-checkbox>
              <esa-checkbox size="sm" label="Seller"></esa-checkbox>
            </div>
          </div>
          <div class="repel noria-configure__row" data-align="center">
            <span class="noria-party" data-size="md">
              <span class="noria-party__dot" style="background: #7d4fa3"></span>
              <span class="noria-party__name type-body">North Unit</span>
            </span>
            <div class="cluster" data-gap="md" data-align="center">
              <esa-checkbox size="sm" label="Buyer" checked=""></esa-checkbox>
              <esa-checkbox size="sm" label="Seller" checked=""></esa-checkbox>
            </div>
          </div>
          <div class="repel noria-configure__row" data-align="center">
            <span class="noria-party" data-size="md">
              <span class="noria-party__dot" style="background: #b83e75"></span>
              <span class="noria-party__name type-body">Ochoco</span>
            </span>
            <div class="cluster" data-gap="md" data-align="center">
              <esa-checkbox size="sm" label="Buyer"></esa-checkbox>
              <esa-checkbox size="sm" label="Seller"></esa-checkbox>
            </div>
          </div>
          <div class="repel noria-configure__row" data-align="center">
            <span class="noria-party" data-size="md">
              <span class="noria-party__dot" style="background: #e05545"></span>
              <span class="noria-party__name type-body">Swalley</span>
            </span>
            <div class="cluster" data-gap="md" data-align="center">
              <esa-checkbox size="sm" label="Buyer"></esa-checkbox>
              <esa-checkbox size="sm" label="Seller"></esa-checkbox>
            </div>
          </div>
          <div class="repel noria-configure__row" data-align="center">
            <span class="noria-party" data-size="md">
              <span class="noria-party__dot" style="background: #e07e2f"></span>
              <span class="noria-party__name type-body">Three Sisters</span>
            </span>
            <div class="cluster" data-gap="md" data-align="center">
              <esa-checkbox size="sm" label="Buyer" checked=""></esa-checkbox>
              <esa-checkbox size="sm" label="Seller" checked=""></esa-checkbox>
            </div>
          </div>
          <div class="repel noria-configure__row" data-align="center">
            <span class="noria-party" data-size="md">
              <span class="noria-party__dot" style="background: #e8a01f"></span>
              <span class="noria-party__name type-body">Tumalo</span>
            </span>
            <div class="cluster" data-gap="md" data-align="center">
              <esa-checkbox size="sm" label="Buyer"></esa-checkbox>
              <esa-checkbox size="sm" label="Seller"></esa-checkbox>
            </div>
          </div>
        </div>
      </section>
      <!-- Conservation Buyers -->
      <section class="stack noria-configure__section" data-gap="sm">
        <div class="repel" data-align="center">
          <h3 class="noria-configure__section-title">Conservation Buyers</h3>
          <span data-select-all="">
            <span
              class="esa-button esa-button--color-secondary esa-button--appearance-fill esa-button--sm"
            >
              <button class="esa-button__native" type="button">
                <span class="esa-button__label"> Select All </span>
              </button>
            </span>
          </span>
        </div>
        <div class="stack" data-gap="2xs">
          <div class="repel noria-configure__row" data-align="center">
            <span class="noria-party" data-size="md">
              <span class="noria-party__dot" style="background: #2b2f3a"></span>
              <span class="noria-party__name type-body">Deschutes River Conservancy</span>
            </span>
            <esa-checkbox size="sm" label="Buyer"></esa-checkbox>
          </div>
        </div>
      </section>
    </div>
    <!-- Water Types: each row streamlines the type name + an inline set-aside field -->
    <section class="stack" data-gap="sm">
      <h3 class="noria-configure__section-title">Water Types</h3>
      <div class="noria-configure__cols">
        <div
          class="repel noria-configure__row noria-configure__water"
          data-align="center"
        >
          <span class="noria-configure__row-label">Fallowed Water</span>
          <div class="cluster" data-gap="sm" data-align="center">
            <span class="noria-configure__row-label">Set Aside</span>
            <esa-text-field
              class="noria-configure__setaside"
              suffix="%"
              type="number"
              value="25"
              size="md"
            ></esa-text-field>
          </div>
        </div>
        <div
          class="repel noria-configure__row noria-configure__water"
          data-align="center"
        >
          <span class="noria-configure__row-label">Land Conversion Water</span>
          <div class="cluster" data-gap="sm" data-align="center">
            <span class="noria-configure__row-label">Set Aside</span>
            <esa-text-field
              class="noria-configure__setaside"
              suffix="%"
              type="number"
              value="0"
              size="md"
            ></esa-text-field>
          </div>
        </div>
      </div>
    </section>
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
.esa-button--appearance-outline .esa-button__native,
.esa-button--appearance-dashed .esa-button__native {
  background: transparent;
  color: var(--_accent);
  border-color: var(--_accent);
}
.esa-button--color-secondary {
  --_accent: var(--color-secondary, #5787b9);
  --_accent-hover: var(--color-secondary-hover, #43608a);
}
.esa-button--appearance-fill .esa-button__native:hover:not(:disabled) {
  background: var(--_accent-hover);
}
.esa-button--color-ghost .esa-button__native:hover:not(:disabled),
.esa-button--color-ghost.esa-button--active .esa-button__native {
  background: var(--color-surface-sunken, #efefef);
}
.noria-party {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-200, 8px);
  min-width: 0;
}
.noria-party__dot {
  flex: none;
  inline-size: 12px;
  block-size: 12px;
  border-radius: var(--radius-full, 999px);
}
.noria-party__name {
  color: var(--color-text, #171717);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.noria-configure__cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-400, 16px);
  align-items: start;
}
.noria-configure__section-title {
  margin: 0;
  font-size: 1rem;
  font-weight: var(--font-weight-bold, 650);
  line-height: var(--line-height-tight, 1.3);
  color: var(--color-text-primary, #171717);
}
.noria-configure__row {
  gap: var(--spacing-200, 8px);
  padding: var(--spacing-200, 8px) var(--spacing-300, 12px);
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e5e5);
  border-radius: var(--radius-200, 8px);
}
.noria-configure__row .noria-party__name {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold, 550);
}
.noria-configure__water {
  background: var(--color-gray-50, #fafafa);
}
.noria-configure__row-label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold, 550);
  color: var(--color-text-primary, #171717);
}
.noria-configure__setaside {
  flex: 0 0 7rem;
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
.type-body {
  font-size: var(--type-size-200);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-normal);
}
.type-body-small {
  font-size: var(--type-size-150);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
}
.repel {
  --gap: var(--spacing-400, 1rem);
  --align: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: space-between;
}
```

## Tokens
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-gray-50`: #fafafa _(primitive)_
- `--color-primary`: #235069 _(semantic)_
- `--color-primary-hover`: #214459 _(semantic)_
- `--color-secondary`: #2d759c _(semantic)_
- `--color-secondary-hover`: #265e7e _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-surface-sunken`: #efefef _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-primary`: #171717 _(semantic)_
- `--font-sans`: "DM Sans", system-ui, sans-serif _(primitive)_
- `--font-weight-bold`: 650 _(primitive)_
- `--font-weight-medium`: 450 _(primitive)_
- `--font-weight-regular`: 350 _(primitive)_
- `--font-weight-semibold`: 550 _(primitive)_
- `--form-font-size-md`: clamp(.75rem, .66rem + .44vw, .9375rem) _(component)_
- `--form-font-size-sm`: clamp(.625rem, .56rem + .32vw, .75rem) _(component)_
- `--form-height-md`: 40px _(component)_
- `--form-height-sm`: 32px _(component)_
- `--form-padding-x-md`: .75rem _(component)_
- `--form-padding-x-sm`: .625rem _(component)_
- `--form-radius-md`: .25rem _(component)_
- `--form-radius-sm`: .25rem _(component)_
- `--letter-spacing-normal`: .01em _(primitive)_
- `--line-height-normal`: 1.6 _(primitive)_
- `--line-height-relaxed`: 1.8 _(primitive)_
- `--line-height-tight`: 1.3 _(primitive)_
- `--radius-200`: .25rem _(primitive)_
- `--radius-full`: 9999px _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
