# Overview panel

The Overview tab body: two esa-cards side by side (a responsive .grid) — a read-only "Details" card and a read-only "Configure" summary (participants + their roles, price bounds, water types). Each card's ghost Edit button opens the matching edit dialog. Under an h2 "Overview" section title.

## Key decisions
- Each card renders a key-value definition list (noria-kv): short scalar fields are inline rows (label left, value right); complex fields (Description, the participants list, the water-type list) are "block" rows (label above, content below) — all split by the same neutral hairline divider.
- Composes legos: esa-card (card chrome), esa-button (ghost Edit triggers), noria-party-dot (participant identity), plus the two edit dialogs. Values read straight from the Scenario prop via the scenario.ts helpers.
- The .grid uses --grid-min: 22rem so the two cards drop to one column on narrow widths.
- Tab rhythm: an h2 section title with a 16px gap down to the cards (half the 32px inter-section rhythm).

## Gotchas
- The value column is capped at max-width:60% and right-aligned, so a long value never overbears its short label — it leaves a gap in the middle instead of colliding with the label.
- Multi-line value lists (participants, water types) stay right-aligned even when they wrap to several lines.
- The cards are read-only summaries — all editing happens in the two dialogs, opened via each card's ghost Edit button.

## Done when
- Both cards render as label/value definition lists split by hairlines; the two cards sit side by side and collapse to one column when narrow.
- Each card's Edit button opens its dialog (Details / Configure).

## Markup
```html
<section class="noria-overview-panel">
  <h2 class="type-section-title">Overview</h2>
  <div class="grid noria-overview__cards" data-gap="md">
    <!-- Details -->
    <div class="esa-card">
      <div class="esa-card__header">
        <div class="esa-card__header-content">
          <div class="esa-card__titles"><h3 class="esa-card__title">Details</h3></div>
        </div>
        <div class="esa-card__actions">
          <span id="edit-details-trigger">
            <span
              class="esa-button esa-button--color-ghost esa-button--appearance-fill esa-button--sm"
            >
              <button class="esa-button__native" type="button">
                <span class="esa-icon esa-icon--sm" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    focusable="false"
                  >
                    <path
                      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                    ></path>
                    <path d="m15 5 4 4"></path>
                  </svg>
                </span>
                <span class="esa-button__label"> Edit </span>
              </button>
            </span>
          </span>
        </div>
      </div>
      <div class="esa-card__body">
        <dl class="noria-kv">
          <div class="noria-kv__row">
            <dt>Scenario Name</dt>
            <dd>Deschutes 2026 Wholesale Exchange</dd>
          </div>
          <div class="noria-kv__row">
            <dt>Type</dt>
            <dd>Wholesale to Wholesale</dd>
          </div>
          <div class="noria-kv__row">
            <dt>Reporting Period</dt>
            <dd>2026 Water Year</dd>
          </div>
          <div class="noria-kv__row">
            <dt>Description</dt>
            <dd class="noria-kv__prose">
              Wholesale water exchange modeling North Unit, Central Oregon, and Three
              Sisters transfers for the 2026 water year.
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <!-- Configure -->
    <div class="esa-card">
      <div class="esa-card__header">
        <div class="esa-card__header-content">
          <div class="esa-card__titles"><h3 class="esa-card__title">Configure</h3></div>
        </div>
        <div class="esa-card__actions">
          <span id="edit-configure-trigger">
            <span
              class="esa-button esa-button--color-ghost esa-button--appearance-fill esa-button--sm"
            >
              <button class="esa-button__native" type="button">
                <span class="esa-icon esa-icon--sm" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    focusable="false"
                  >
                    <path
                      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                    ></path>
                    <path d="m15 5 4 4"></path>
                  </svg>
                </span>
                <span class="esa-button__label"> Edit </span>
              </button>
            </span>
          </span>
        </div>
      </div>
      <div class="esa-card__body">
        <dl class="noria-kv">
          <div class="noria-kv__row">
            <dt>Participants</dt>
            <dd>
              <div class="noria-kv__list">
                <div class="cluster" data-gap="xs" data-align="center">
                  <span class="noria-party" data-size="md">
                    <span class="noria-party__dot" style="background: #7d4fa3"></span>
                    <span class="noria-party__name type-body">North Unit</span>
                  </span>
                  <span class="type-body-small noria-muted"
                    >(Wholesale Buyer, Wholesale Seller)</span
                  >
                </div>
                <div class="cluster" data-gap="xs" data-align="center">
                  <span class="noria-party" data-size="md">
                    <span class="noria-party__dot" style="background: #2e3a66"></span>
                    <span class="noria-party__name type-body">Central Oregon</span>
                  </span>
                  <span class="type-body-small noria-muted"
                    >(Wholesale Buyer, Wholesale Seller)</span
                  >
                </div>
                <div class="cluster" data-gap="xs" data-align="center">
                  <span class="noria-party" data-size="md">
                    <span class="noria-party__dot" style="background: #e07e2f"></span>
                    <span class="noria-party__name type-body">Three Sisters</span>
                  </span>
                  <span class="type-body-small noria-muted"
                    >(Wholesale Buyer, Wholesale Seller)</span
                  >
                </div>
              </div>
            </dd>
          </div>
          <div class="noria-kv__row">
            <dt>Price Floor</dt>
            <dd>$50.00</dd>
          </div>
          <div class="noria-kv__row">
            <dt>Price Ceiling</dt>
            <dd>$200.00</dd>
          </div>
          <div class="noria-kv__row">
            <dt>Water Types</dt>
            <dd>
              <div class="noria-kv__list">
                <span> Fallowed Water (25% Instream Flow Set Aside) </span
                ><span> Land Conversion Water (0% Instream Flow Set Aside) </span>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</section>
```

## Styles
```css
.noria-overview-panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400, 16px);
  padding-block-start: var(--spacing-400, 16px);
}
.noria-overview__cards {
  --grid-min: 22rem;
}
.esa-card {
  --_card-bg: var(--card-bg, var(--color-surface, #ffffff));
  --_card-border: var(--card-border-color, var(--color-border, #e5e5e5));
  --_card-radius: var(--card-radius, var(--radius-300, 0.5rem));
  --_card-padding: var(--card-padding, var(--spacing-500, 1.5rem));
  --_card-header-bg: var(--card-header-bg, transparent);
  --_card-header-color: var(--card-header-color, var(--color-text-primary, #171717));
  --_card-header-border: var(
    --card-header-border-color,
    var(--color-border-light, #efefef)
  );
  display: block;
  background: var(--_card-bg);
  border: 1px solid var(--_card-border);
  border-radius: var(--_card-radius);
  overflow: hidden;
}
.esa-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-400, 1rem) var(--_card-padding);
  background: var(--_card-header-bg);
  color: var(--_card-header-color);
  border-bottom: 1px solid var(--_card-header-border);
  min-height: 56px;
}
.esa-card__header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-300, 0.75rem);
}
.esa-card__titles {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-050, 0.125rem);
}
.esa-card__title {
  font-size: var(--type-size-250, 1.0625rem);
  font-weight: 600;
  margin: 0;
  color: inherit;
  font-family: var(--font-sans, "DM Sans", sans-serif);
}
.esa-card__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-200, 0.5rem);
}
.esa-card__body {
  padding: var(--_card-padding);
}
.noria-kv {
  margin: 0;
}
.noria-kv__row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-400, 16px);
  padding: var(--spacing-300, 12px) 0;
  border-bottom: 1px solid var(--color-border, #e5e5e5);
}
.noria-kv__row:first-child {
  padding-top: 0;
}
.noria-kv__row dt {
  flex: none;
  color: var(--color-text-secondary, #525252);
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium, 450);
}
.noria-kv__row dd {
  max-width: 60%;
  margin: 0;
  text-align: right;
  color: var(--color-text-primary, #171717);
  font-size: 0.9375rem;
  font-weight: var(--font-weight-medium, 450);
}
.noria-kv__row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}
.noria-kv__prose {
  font-weight: var(--font-weight-regular, 350);
  line-height: 1.5;
}
.noria-kv__list {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-100, 4px);
  text-align: right;
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
.noria-muted {
  color: var(--color-text-secondary);
}
.noria-configure__row .noria-party__name {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold, 550);
}
.esa-icon {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  line-height: 1;
  color: inherit;
}
.esa-icon--sm {
  --_icon-size: var(--icon-size-sm, var(--icon-size-small, 16px));
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-icon--md {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
}
.esa-icon--xs {
  --_icon-size: var(--icon-size-xs, 14px);
}
.user-trigger > .esa-icon:last-child {
  flex-shrink: 0;
  color: var(--color-text-muted, #737373);
}
.nav-sublink .esa-icon {
  flex-shrink: 0;
  color: var(--color-text-tertiary, #525252);
  transition: color 0.15s ease;
}
.nav-sublink.active .esa-icon {
  color: var(--_nav-active-color, #235069);
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
.type-section-title {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--type-size-500);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
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
```

## Tokens
- `--card-bg`: #ffffff _(component)_
- `--card-border-color`: #e5e5e5 _(component)_
- `--card-header-bg`: transparent _(component)_
- `--card-header-border-color`: #efefef _(component)_
- `--card-header-color`: #171717 _(component)_
- `--card-padding`: 1.5rem _(component)_
- `--card-radius`: .25rem _(component)_
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-border-light`: #efefef _(semantic)_
- `--color-primary`: #235069 _(semantic)_
- `--color-primary-hover`: #214459 _(semantic)_
- `--color-secondary`: #2d759c _(semantic)_
- `--color-secondary-hover`: #265e7e _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-muted`: #737373 _(semantic)_
- `--color-text-primary`: #171717 _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--color-text-tertiary`: #404040 _(semantic)_
- `--font-display`: "DM Sans", system-ui, sans-serif _(primitive)_
- `--font-sans`: "DM Sans", system-ui, sans-serif _(primitive)_
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
- `--icon-size-md`: 20px _(primitive)_
- `--icon-size-medium`: 20px _(component)_
- `--icon-size-sm`: 16px _(primitive)_
- `--icon-size-small`: 16px _(component)_
- `--icon-size-xs`: 14px _(primitive)_
- `--letter-spacing-normal`: .01em _(primitive)_
- `--letter-spacing-tight`: -.01em _(primitive)_
- `--line-height-normal`: 1.6 _(primitive)_
- `--line-height-relaxed`: 1.8 _(primitive)_
- `--line-height-tight`: 1.3 _(primitive)_
- `--radius-300`: .25rem _(primitive)_
- `--radius-full`: 9999px _(primitive)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
- `--type-size-250`: clamp(.8125rem, .71rem + .5vw, 1.0625rem) _(primitive)_
- `--type-size-500`: clamp(1.125rem, .98rem + .72vw, 1.5rem) _(primitive)_
