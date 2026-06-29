# Filters

The single filter card pinned over the workspace. Row 1: three single-select dropdowns — Reporting Period, Months, Water Measurement Type. Row 2: a far-left grid search and a centered Grid / Hybrid / Map view toggle.

## Key decisions
- Each filter is an esa-select (simple single-select) — NOT esa-filter-dropdown, which is a multi-select facet filter (checkboxes + "Clear all") and clamps its trigger label at 200px, truncating long values like "2026 Water Year".
- The field name rides in each select's placeholder; the two defaulted selects show their value, the undefaulted one shows its field name.
- Defaults are applied through esa-select's public value setter; searchable is turned off for a plain pick-one (no typeahead).
- Months run in water-year order (Oct→Sep); Water Measurement Type is OpenET Evapotranspiration / Precipitation.

## Gotchas
- esa-select is display:block with a 100%-width input, so each needs an explicit box width — sized per content so values never clip.
- The card must establish a stacking context ABOVE the workspace split (z-index) or open dropdown panels render behind the Leaflet map.

## Done when
- All three dropdowns show their full value with no ellipsis and no checkboxes.
- Search filters the grid; the toggle switches Grid / Hybrid / Map.

## Markup
```html
<div class="noria-parcel-controls">
  <div class="noria-parcel-controls__row noria-parcel-controls__row--filters">
    <esa-select
      class="noria-parcel-controls__filter"
      placeholder="Reporting Period"
      size="sm"
      options='[{"label":"2026 Water Year","value":"2026 Water Year"},{"label":"2025 Water Year","value":"2025 Water Year"},{"label":"2024 Water Year","value":"2024 Water Year"},{"label":"2023 Water Year","value":"2023 Water Year"},{"label":"2022 Water Year","value":"2022 Water Year"}]'
      data-default="2026 Water Year"
    ></esa-select>
    <esa-select
      class="noria-parcel-controls__filter noria-parcel-controls__filter--months"
      placeholder="Months"
      size="sm"
      options='[{"label":"All Months","value":"All Months"},{"label":"Oct","value":"Oct"},{"label":"Nov","value":"Nov"},{"label":"Dec","value":"Dec"},{"label":"Jan","value":"Jan"},{"label":"Feb","value":"Feb"},{"label":"Mar","value":"Mar"},{"label":"Apr","value":"Apr"},{"label":"May","value":"May"},{"label":"Jun","value":"Jun"},{"label":"Jul","value":"Jul"},{"label":"Aug","value":"Aug"},{"label":"Sep","value":"Sep"}]'
      data-default="All Months"
    ></esa-select>
    <esa-select
      id="filter-measurement"
      class="noria-parcel-controls__filter noria-parcel-controls__filter--measurement"
      placeholder="Water Measurement Type"
      size="sm"
      options='[{"label":"OpenET Evapotranspiration","value":"evapotranspiration"},{"label":"OpenET Precipitation","value":"precipitation"}]'
    ></esa-select>
    <span id="parcel-clear" class="noria-parcel-controls__clear">
      <button
        class="esa-filter-clear-button"
        type="button"
        data-esa-filter-clear=""
        aria-label="Clear all filters"
      >
        <svg
          class="esa-filter-clear-button__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"></path>
          <path d="m22 3-5 5"></path>
          <path d="m17 3 5 5"></path></svg
        ><span class="esa-filter-clear-button__label">Clear Filters</span>
      </button>
      <script type="module">
        document.querySelectorAll("[data-esa-filter-clear]").forEach((e) => {
          e.addEventListener("click", () => {
            e.dispatchEvent(
              new CustomEvent("esa-filter-clear", { bubbles: !0, composed: !0 }),
            );
          });
        });
      </script>
    </span>
  </div>
  <div class="noria-parcel-controls__row noria-parcel-controls__row--view">
    <esa-text-field
      id="parcel-search"
      class="noria-parcel-controls__search"
      placeholder="Search grid…"
      size="sm"
    ></esa-text-field>
    <esa-button-toggle
      id="parcel-view-toggle"
      class="noria-parcel-controls__toggle"
      size="sm"
    ></esa-button-toggle>
    <div class="noria-parcel-controls__spacer" aria-hidden="true"></div>
  </div>
</div>
```

## Styles
```css
.noria-parcel-controls {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-100);
}
.noria-parcel-explorer > .noria-parcel-controls {
  position: relative;
  z-index: 2;
}
.noria-parcel-controls__row {
  padding: var(--spacing-250) var(--spacing-400);
}
.noria-parcel-controls__row--filters {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  flex-wrap: nowrap;
}
.noria-parcel-controls__filter {
  flex: 0 0 auto;
  inline-size: 14rem;
}
.noria-parcel-controls__filter--months {
  inline-size: 11rem;
}
.noria-parcel-controls__filter--measurement {
  inline-size: 18rem;
}
.noria-parcel-controls__clear {
  margin-left: auto;
  display: inline-flex;
}
.esa-filter-clear-button {
  --_clear-text: var(--filter-clear-color, var(--color-primary, #43608a));
  --_clear-text-hover: var(
    --filter-clear-color-hover,
    var(--color-primary-hover, #39506f)
  );
  --_clear-font-size: var(--type-size-150, 0.875rem);
  --_clear-icon-size: 18px;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 0.25rem);
  padding: var(--spacing-100, 0.25rem) var(--spacing-200, 0.5rem);
  border: none;
  border-radius: var(--radius-100, 0.25rem);
  background: transparent;
  color: var(--_clear-text);
  font-family: var(--font-sans, inherit);
  font-size: var(--_clear-font-size);
  font-weight: var(--font-weight-medium, 450);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition:
    color var(--transition-fast, 0.15s ease),
    background var(--transition-fast, 0.15s ease);
}
.esa-filter-clear-button__icon {
  width: var(--_clear-icon-size);
  height: var(--_clear-icon-size);
  flex: none;
}
.esa-filter-clear-button__label {
  white-space: nowrap;
}
.noria-parcel-controls__row--view {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--spacing-300);
}
.noria-parcel-controls__row + .noria-parcel-controls__row {
  border-top: 1px solid var(--color-border);
}
.noria-parcel-controls__search {
  justify-self: start;
  inline-size: clamp(12rem, 22vw, 18rem);
}
.noria-parcel-controls__toggle {
  justify-self: center;
}
```

## Tokens
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-primary`: #235069 _(semantic)_
- `--color-primary-hover`: #214459 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--filter-clear-color`: #737373 _(component)_
- `--filter-clear-color-hover`: #ef4444 _(component)_
- `--font-sans`: "DM Sans", system-ui, sans-serif _(primitive)_
- `--font-weight-medium`: 450 _(primitive)_
- `--radius-100`: .25rem _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
