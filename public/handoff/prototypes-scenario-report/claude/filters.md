# Filters

The Report filter bar: a bordered gray-50 container holding three facet multi-selects — All Sellers, All Buyers, Transaction Status — with an Export PDF button at the far right.

## Key decisions
- Each facet is an esa-select size="sm", multiple, chip-mode; each holds a fixed 13rem box so its selected tokens stay in a stable width.
- chip-mode renders selected values INSIDE the field box: one selection shows its chip, 2+ collapse to an "N Options" count whose × clears all — so the box always matches its sibling selects' height and never wraps.
- The Transaction Status facet defaults to "Approved" (data-default), applied through esa-select's .value setter after the element upgrades.
- The bar is a gray-50 container (border + radius) so the facets read as one control group, and it establishes a stacking context (z-index) above the workspace below.

## Gotchas
- The filter bar MUST sit in a stacking context above the Transaction Parcels split, or an open dropdown panel renders BEHIND the Leaflet map.
- Defaults are a JS accessor (.value), not a value="" attribute — set them after customElements.whenDefined('esa-select').

## Done when
- Three compact facet selects render in one bordered bar with Export PDF at the right; the Status facet starts on "Approved"; picking a second status collapses the token to "2 Options".

## Markup
```html
<div class="noria-report-panel__filters">
  <div class="repel" data-gap="md">
    <div class="cluster noria-report-panel__facets" data-gap="sm">
      <esa-select
        class="noria-report-panel__filter"
        size="sm"
        placeholder="All Sellers"
        multiple="true"
        chip-mode="true"
        options='[{"label":"North Unit","value":"1","colorHex":"#7d4fa3"},{"label":"Central Oregon","value":"2","colorHex":"#2e3a66"},{"label":"Three Sisters","value":"3","colorHex":"#e07e2f"}]'
      ></esa-select>
      <esa-select
        class="noria-report-panel__filter"
        size="sm"
        placeholder="All Buyers"
        multiple="true"
        chip-mode="true"
        options='[{"label":"North Unit","value":"1","colorHex":"#7d4fa3"},{"label":"Central Oregon","value":"2","colorHex":"#2e3a66"},{"label":"Three Sisters","value":"3","colorHex":"#e07e2f"}]'
      ></esa-select>
      <esa-select
        class="noria-report-panel__filter"
        size="sm"
        placeholder="Transaction Status"
        multiple="true"
        chip-mode="true"
        data-default="Approved"
        options='[{"label":"Pending","value":"Pending"},{"label":"Approved","value":"Approved"},{"label":"Closed","value":"Closed"},{"label":"Rejected","value":"Rejected"}]'
      ></esa-select>
    </div>
    <span id="report-export-pdf">
      <span
        class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--sm"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Export PDF </span>
        </button>
      </span>
    </span>
  </div>
</div>
```

## Styles
```css
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
.repel {
  --gap: var(--spacing-400, 1rem);
  --align: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: space-between;
}
.noria-report-panel__filters,
.noria-report-panel__balance,
.noria-report-panel__workspace {
  flex: 0 0 auto;
}
.noria-report-panel__filters {
  position: relative;
  z-index: 2;
  padding: var(--spacing-300, 12px) var(--spacing-400, 16px);
  background: var(--color-gray-50, #fafafa);
  border: 1px solid var(--color-border, #e5e5e5);
  border-radius: var(--radius-200, 8px);
}
.noria-report-panel__facets {
  align-items: flex-end;
}
.noria-report-panel__filter {
  inline-size: 13rem;
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
.esa-button__label {
  white-space: nowrap;
}
```

## Tokens
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-gray-50`: #fafafa _(primitive)_
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
- `--radius-200`: .25rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
