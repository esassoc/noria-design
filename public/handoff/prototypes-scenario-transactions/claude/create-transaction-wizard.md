# Create Transaction wizard

The full create / edit / view transaction wizard — a fixed-width esa-dialog with a left workflow rail and a four-step body: (1) Linked Offers · Parties · Terms, (2) Sending Info, (3) Receiving Info, (4) Summary. Steps 2 and 3 pair a parcel panel with a map for selecting parcels and placing a point of diversion.

## Key decisions
- A fixed-width dialog — --dialog-width: min(1600px, 92vw) — NOT fullscreen, with a block-size held CONSTANT across all four steps so the work surface never jumps as the user advances (short steps just leave whitespace).
- Body is a .sidebar primitive: a fixed-width rail (numbered steps) beside flexing step content; steps 2–4 set --sidebar-content-min so the map / recap panes keep a real width.
- Group labels use proper type roles (type-body / type-body-large), never ornamental micro-uppercase overlines.
- Composes legos: esa-dialog + esa-select (offers / parties / water type) + esa-text-field (price / volume / PoD labels) + esa-button-toggle (parcel select vs. place-point-of-diversion mode) + a Leaflet map for parcel picking.

## Gotchas
- Keep the dialog block-size fixed across steps — a per-step auto height makes the modal resize on every Next/Back, which reads as jank.
- Opened imperatively via the wrapper (#noria-tx-wizard): openCreate() / openEdit(txId) / openView(txId) — the panel calls these off grid actions.
- The step maps live in flex panes that may be zero-width on first paint; they need an invalidateSize / fitBounds pass when their step becomes visible.

## Done when
- Create Transaction opens a wide fixed-width dialog at step 1; the four steps advance without the dialog changing height; the sending/receiving maps let you select parcels; Summary recaps the entry.

## Markup
```html
<div id="noria-tx-wizard" class="noria-transaction-wizard">
  <esa-dialog
    heading="Create Transaction"
    style="--dialog-width: min(1600px, 92vw)"
    size="md"
    open=""
  >
    <div class="wiz sidebar" data-gap="lg" style="--sidebar-width: 15rem">
      <!-- LEFT: workflow rail -->
      <nav class="wiz__rail" aria-label="Transaction workflow">
        <p class="type-body wiz__rail-title">Transaction Workflow</p>
        <ol class="wiz__steps">
          <li>
            <button type="button" class="wiz__step" data-goto="1" aria-current="step">
              <span class="wiz__chip">1</span
              ><span class="wiz__step-label">Parties &amp; Terms</span>
            </button>
          </li>
          <li>
            <button type="button" class="wiz__step" data-goto="2">
              <span class="wiz__chip">2</span
              ><span class="wiz__step-label">Sending Info</span>
            </button>
          </li>
          <li>
            <button type="button" class="wiz__step" data-goto="3">
              <span class="wiz__chip">3</span
              ><span class="wiz__step-label">Receiving Info</span>
            </button>
          </li>
          <li>
            <button type="button" class="wiz__step" data-goto="4">
              <span class="wiz__chip">4</span><span class="wiz__step-label">Summary</span>
            </button>
          </li>
        </ol>
      </nav>
      <!-- RIGHT: active step -->
      <div class="wiz__main">
        <!-- STEP 1 — Parties & Terms -->
        <section class="wiz__panel" data-step="1">
          <div class="stack" data-gap="lg">
            <div class="stack" data-gap="sm">
              <p class="type-body-large wiz__group">Linked Offers</p>
              <p class="type-caption wiz__group-hint">
                Optionally link the open offers this transaction settles.
              </p>
              <div class="grid" style="--grid-min: 16rem">
                <esa-select
                  id="wiz-buying-offer"
                  label="Buying Offer"
                  options='[{"label":"N/A","value":""},{"label":"#3 - Central Oregon (115 $/ac-ft, 200 ac-ft)","value":"3"},{"label":"#6 - North Unit (105 $/ac-ft, 120 ac-ft)","value":"6"}]'
                  size="md"
                ></esa-select>
                <esa-select
                  id="wiz-selling-offer"
                  label="Selling Offer"
                  options='[{"label":"N/A","value":""},{"label":"#2 - Three Sisters (125 $/ac-ft, 80 ac-ft)","value":"2"},{"label":"#4 - North Unit (90 $/ac-ft, 60 ac-ft)","value":"4"},{"label":"#7 - Central Oregon (110 $/ac-ft, 120 ac-ft)","value":"7"}]'
                  size="md"
                ></esa-select>
              </div>
            </div>
            <div class="stack" data-gap="sm">
              <p class="type-body-large wiz__group">Parties</p>
              <div class="grid" style="--grid-min: 16rem">
                <esa-select
                  id="wiz-buyer"
                  label="Buyer"
                  required="true"
                  options='[{"label":"North Unit","value":"1","colorHex":"#7d4fa3"},{"label":"Central Oregon","value":"2","colorHex":"#2e3a66"},{"label":"Three Sisters","value":"3","colorHex":"#e07e2f"}]'
                  size="md"
                ></esa-select>
                <esa-select
                  id="wiz-seller"
                  label="Seller"
                  required="true"
                  options='[{"label":"North Unit","value":"1","colorHex":"#7d4fa3"},{"label":"Central Oregon","value":"2","colorHex":"#2e3a66"},{"label":"Three Sisters","value":"3","colorHex":"#e07e2f"}]'
                  size="md"
                ></esa-select>
              </div>
            </div>
            <div class="stack" data-gap="sm">
              <p class="type-body-large wiz__group">Terms</p>
              <div class="grid" style="--grid-min: 14rem">
                <esa-select
                  id="wiz-water-type"
                  label="Water Type"
                  options='[{"label":"Fallowed Water","value":"1"},{"label":"Land Conversion Water","value":"2"}]'
                  size="md"
                ></esa-select>
                <esa-text-field
                  id="wiz-price"
                  label="Confirmed Price ($)"
                  type="number"
                  help-text="per ac-ft"
                  placeholder="0"
                  size="md"
                ></esa-text-field>
                <esa-text-field
                  id="wiz-volume"
                  label="Confirmed Volume"
                  type="number"
                  help-text="ac-ft"
                  placeholder="0"
                  size="md"
                ></esa-text-field>
              </div>
            </div>
            <div class="wiz__computed">
              <div class="repel">
                <span class="type-body wiz__computed-label">Total Price</span>
                <span class="type-body" id="wiz-total">-</span>
              </div>
              <div class="repel">
                <span class="type-body wiz__computed-label">In-Stream Benefit</span>
                <span class="type-body" id="wiz-instream">-</span>
              </div>
            </div>
          </div>
        </section>
        <!-- STEP 2 — Sending Info -->
        <section class="wiz__panel" data-step="2" hidden="">
          <div
            class="sidebar"
            data-gap="lg"
            style="--sidebar-width: 22rem; --sidebar-content-min: 20rem"
          >
            <div class="wiz__parcel-panel stack" data-gap="md">
              <esa-button-toggle id="wiz-send-mode" size="sm"></esa-button-toggle>
              <esa-text-field
                id="wiz-send-search"
                placeholder="Search by APN…"
                size="sm"
              ></esa-text-field>
              <div class="stack" data-gap="sm">
                <div class="cluster" data-gap="xs">
                  <span class="type-body wiz__sublabel">Selected Parcels</span>
                  <span class="wiz__count" id="wiz-send-count">0</span>
                </div>
                <ul class="wiz__parcel-list" id="wiz-send-list"></ul>
                <p class="type-caption wiz__empty" id="wiz-send-empty">
                  No parcels selected. Click a parcel on the map to add it.
                </p>
              </div>
              <div class="stack" data-gap="sm">
                <span class="type-body wiz__sublabel">Selling Point of Diversion</span>
                <p class="type-caption" id="wiz-send-pod-hint">
                  Switch to “Place Point of Diversion” and click the map to set a
                  location.
                </p>
                <esa-text-field
                  id="wiz-send-pod-label"
                  label="Label (optional)"
                  size="sm"
                  placeholder="e.g. Lateral 14 headgate"
                ></esa-text-field>
              </div>
            </div>
            <div class="wiz__map">
              <div class="wiz__map-mount" id="wiz-send-map"></div>
            </div>
          </div>
        </section>
        <!-- STEP 3 — Receiving Info -->
        <section class="wiz__panel" data-step="3" hidden="">
          <div
            class="sidebar"
            data-gap="lg"
            style="--sidebar-width: 22rem; --sidebar-content-min: 20rem"
          >
            <div class="wiz__parcel-panel stack" data-gap="md">
              <esa-button-toggle id="wiz-recv-mode" size="sm"></esa-button-toggle>
              <esa-text-field
                id="wiz-recv-search"
                placeholder="Search by APN…"
                size="sm"
              ></esa-text-field>
              <div class="stack" data-gap="sm">
                <div class="cluster" data-gap="xs">
                  <span class="type-body wiz__sublabel">Selected Parcels</span>
                  <span class="wiz__count" id="wiz-recv-count">0</span>
                </div>
                <ul class="wiz__parcel-list" id="wiz-recv-list"></ul>
                <p class="type-caption wiz__empty" id="wiz-recv-empty">
                  No parcels selected. Click a parcel on the map to add it.
                </p>
              </div>
              <div class="stack" data-gap="sm">
                <span class="type-body wiz__sublabel">Buying Point of Diversion</span>
                <p class="type-caption" id="wiz-recv-pod-hint">
                  Switch to “Place Point of Diversion” and click the map to set a
                  location.
                </p>
                <esa-text-field
                  id="wiz-recv-pod-label"
                  label="Label (optional)"
                  size="sm"
                  placeholder="e.g. North canal turnout"
                ></esa-text-field>
              </div>
            </div>
            <div class="wiz__map">
              <div class="wiz__map-mount" id="wiz-recv-map"></div>
            </div>
          </div>
        </section>
        <!-- STEP 4 — Summary -->
        <section class="wiz__panel" data-step="4" hidden="">
          <div
            class="sidebar"
            data-gap="lg"
            style="--sidebar-width: 26rem; --sidebar-content-min: 20rem"
          >
            <div class="wiz__recap stack" data-gap="lg">
              <div class="stack" data-gap="sm">
                <p class="type-body-large wiz__group">Parties &amp; Terms</p>
                <dl class="wiz__dl" id="wiz-recap-terms"></dl>
              </div>
              <div class="stack" data-gap="sm" id="wiz-recap-offers-wrap" hidden="">
                <p class="type-body-large wiz__group">Linked Offers</p>
                <dl class="wiz__dl" id="wiz-recap-offers"></dl>
              </div>
              <div class="stack" data-gap="sm">
                <p class="type-body-large wiz__group">Sending Parcels</p>
                <ul class="wiz__parcel-list" id="wiz-recap-send"></ul>
              </div>
              <div class="stack" data-gap="sm">
                <p class="type-body-large wiz__group">Receiving Parcels</p>
                <ul class="wiz__parcel-list" id="wiz-recap-recv"></ul>
              </div>
            </div>
            <div class="wiz__map">
              <div class="wiz__map-mount" id="wiz-summary-map"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- Footer: Back far-left; Next/Save (primary) left of Cancel, right-aligned.
         View mode collapses to Close only. -->
    <div slot="footer" class="repel wiz__footer">
      <div class="wiz__footer-left">
        <span id="wiz-back" hidden=""
          ><span
            class="esa-button esa-button--color-ghost esa-button--appearance-outline esa-button--md"
          >
            <button class="esa-button__native" type="button">
              <span class="esa-button__label"> Back </span>
            </button>
          </span>
        </span>
      </div>
      <div class="cluster" data-justify="end" data-gap="xs">
        <span id="wiz-next"
          ><span
            class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
          >
            <button class="esa-button__native" type="button">
              <span class="esa-button__label"> Next </span>
            </button>
          </span>
        </span>
        <span id="wiz-save" hidden=""
          ><span
            class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
          >
            <button class="esa-button__native" type="button">
              <span class="esa-button__label"> Save </span>
            </button>
          </span>
        </span>
        <span id="wiz-cancel"
          ><span
            class="esa-button esa-button--color-ghost esa-button--appearance-outline esa-button--md"
          >
            <button class="esa-button__native" type="button">
              <span class="esa-button__label"> Cancel </span>
            </button>
          </span>
        </span>
        <span id="wiz-close" hidden=""
          ><span
            class="esa-button esa-button--color-ghost esa-button--appearance-outline esa-button--md"
          >
            <button class="esa-button__native" type="button">
              <span class="esa-button__label"> Close </span>
            </button>
          </span>
        </span>
      </div>
    </div>
  </esa-dialog>
</div>
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
.repel {
  --gap: var(--spacing-400, 1rem);
  --align: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: var(--align);
  justify-content: space-between;
}
.type-body-small {
  font-size: var(--type-size-150);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
}
.sidebar {
  --gap: var(--spacing-500, 1.5rem);
  --sidebar-width: 18rem;
  --sidebar-content-min: 60%;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
}
.sidebar > :first-child {
  flex-basis: var(--sidebar-width);
  flex-grow: 1;
}
.type-body {
  font-size: var(--type-size-200);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-normal);
}
.sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--sidebar-content-min);
}
.type-body-large {
  font-size: var(--type-size-300);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-normal);
}
.type-caption {
  font-size: var(--type-size-100);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
}
.grid {
  --gap: var(--spacing-400, 1rem);
  --grid-min: 16rem;
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
}
.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: var(--radius-100, 0.25rem);
  background: transparent;
  color: var(--color-text-tertiary, #525252);
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}
.sidebar-toggle__icon {
  transition: transform 0.15s ease;
}
.sidebar-header {
  flex-shrink: 0;
  padding: var(--spacing-300, 0.75rem) var(--spacing-400, 1rem);
  transition: padding 0.2s ease-in-out;
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
.noria-transaction-wizard {
  display: contents;
}
.wiz {
  min-height: 0;
  block-size: 62vh;
}
.wiz__rail {
  border-right: 1px solid var(--color-border, #e5e5e5);
  padding-right: var(--spacing-400, 16px);
}
.wiz__rail-title {
  margin: 0 0 var(--spacing-300, 12px);
  color: var(--color-text-secondary, #525252);
  font-weight: var(--font-weight-semibold, 600);
}
.wiz__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100, 4px);
}
.wiz__step {
  display: flex;
  align-items: center;
  gap: var(--spacing-250, 10px);
  inline-size: 100%;
  text-align: left;
  padding: var(--spacing-200, 8px) var(--spacing-250, 10px);
  border: 0;
  border-radius: var(--radius-100, 4px);
  background: transparent;
  color: var(--color-text-secondary, #525252);
  font-family: inherit;
  font-size: var(--type-size-200, 15px);
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}
.wiz__step[aria-current="step"] {
  background: var(--color-primary-subtle, #f3f8fc);
  color: var(--color-primary, #235069);
  font-weight: var(--font-weight-semibold, 600);
}
.wiz__chip {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 1.75rem;
  block-size: 1.75rem;
  border-radius: var(--radius-full, 999px);
  border: 1px solid var(--color-border-strong, #d4d4d4);
  background: var(--color-surface, #fff);
  font-size: var(--type-size-150, 13px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-text-secondary, #525252);
}
.wiz__step[aria-current="step"] .wiz__chip {
  background: var(--color-primary, #235069);
  border-color: var(--color-primary, #235069);
  color: #fff;
}
.wiz__step-label {
  min-width: 0;
}
.wiz__main {
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.wiz__panel:not([hidden]) {
  flex: 1 1 auto;
  min-block-size: 0;
  display: flex;
  flex-direction: column;
}
.wiz__group {
  color: var(--color-text-primary, #171717);
  font-weight: var(--font-weight-semibold, 600);
}
.wiz__group-hint {
  margin: 0;
  color: var(--color-text-secondary, #525252);
}
.wiz__computed {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-200, 8px);
  background: var(--color-primary-subtle, #f3f8fc);
  border: 1px solid var(--color-primary-border, #c9e1ee);
  border-radius: var(--radius-100, 4px);
  padding: var(--spacing-300, 12px) var(--spacing-400, 16px);
}
.wiz__computed-label {
  font-weight: var(--font-weight-semibold, 600);
}
.wiz__footer {
  align-items: center;
}
.wiz__footer-left {
  display: inline-flex;
}
```

## Tokens
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-border-strong`: #d4d4d4 _(semantic)_
- `--color-primary`: #235069 _(semantic)_
- `--color-primary-border`: #c9e1ee _(semantic)_
- `--color-primary-hover`: #214459 _(semantic)_
- `--color-primary-subtle`: #f3f8fc _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-primary`: #171717 _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--color-text-tertiary`: #404040 _(semantic)_
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
- `--letter-spacing-normal`: .01em _(primitive)_
- `--line-height-normal`: 1.6 _(primitive)_
- `--line-height-relaxed`: 1.8 _(primitive)_
- `--radius-100`: .25rem _(primitive)_
- `--radius-full`: 9999px _(primitive)_
- `--sidebar-width`: 280px _(semantic)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-500`: 1.5rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
- `--type-size-100`: clamp(.625rem, .56rem + .32vw, .75rem) _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
- `--type-size-300`: clamp(.875rem, .77rem + .52vw, 1.125rem) _(primitive)_
