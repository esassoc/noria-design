# Offer dialog

The create / edit Offer modal for the Offers tab — a single reusable esa-dialog driven imperatively by the panel: openOffer({ mode, participantId }) to create, openOfferEdit(offer) to edit. It presets the Party, shows the water-type Type select only in sell mode, and live-computes a Total Price / In-Stream Benefit box on every price / volume / type change.

## Key decisions
- Composes legos: esa-dialog (chrome / scrim / focus-trap / Esc), esa-select (Party + Type), esa-text-field (Price + Volume), esa-button (footer Save / Cancel in Windows order).
- bcn-lego-checked, two bits of scoped chrome the legos don't provide: (1) the $/unit ADORNMENT row — the "$" and "per ac-ft" / "ac-ft" affixes composed as text beside the field via a flex row; (2) the COMPUTED box (Total Price / In-Stream Benefit) — a quiet brand-tinted summary tile.
- All math comes from the data layer's helpers — no bespoke calculation in the component.

## Gotchas
- The Type select is wrapped in #offer-type-wrap, hidden unless mode is "sell" — a buy offer has no water-type pick.
- The computed box recomputes on every price / volume / type input; keep it wired to those change events, not just a submit.
- This dialog's affixes predate the esa-text-field prefix/suffix affixes and are composed as sibling text; a fresh build could instead use the field's own affix props.

## Done when
- Opening in buy mode presets the party and hides Type; sell mode shows Type; editing price/volume updates the computed Total Price / In-Stream Benefit box live.

## Markup
```html
<esa-dialog id="offer-dialog" size="md" heading="Offer to Buy" data-scenario-id="42">
  <div class="stack" data-gap="md">
    <!-- SOURCE -->
    <section class="stack" data-gap="sm">
      <div class="stack" data-gap="3xs">
        <span class="type-label">Source</span>
        <span class="type-caption">Who is offering and what type of water.</span>
      </div>
      <esa-select
        id="offer-party"
        label="Party"
        placeholder="Select a party"
        required="true"
        show-color-dot="true"
        size="md"
      ></esa-select>
      <div id="offer-type-wrap" hidden="">
        <esa-select
          id="offer-type"
          label="Type"
          placeholder="Select a water type"
          options='[{"label":"Fallowed Water","value":"1"},{"label":"Land Conversion Water","value":"2"}]'
          size="md"
        ></esa-select>
      </div>
    </section>
    <!-- TERMS -->
    <section class="stack" data-gap="sm">
      <div class="stack" data-gap="3xs">
        <span class="type-label">Terms</span>
        <span class="type-caption">Set the price and volume for your offer.</span>
      </div>
      <div class="stack" data-gap="2xs">
        <span class="type-label">Price</span>
        <div class="noria-offer-dialog__adorn">
          <span class="noria-offer-dialog__affix type-body" aria-hidden="true">$</span>
          <esa-text-field
            id="offer-price"
            type="number"
            placeholder="0"
            class="noria-offer-dialog__field"
            size="md"
          ></esa-text-field>
          <span class="noria-offer-dialog__affix type-body-small">per ac-ft</span>
        </div>
      </div>
      <div class="stack" data-gap="2xs">
        <span class="type-label">Volume</span>
        <div class="noria-offer-dialog__adorn">
          <esa-text-field
            id="offer-volume"
            type="number"
            placeholder="0"
            class="noria-offer-dialog__field"
            size="md"
          ></esa-text-field>
          <span class="noria-offer-dialog__affix type-body-small">ac-ft</span>
        </div>
      </div>
    </section>
    <!-- COMPUTED -->
    <div class="noria-offer-dialog__computed stack" data-gap="2xs">
      <div class="repel">
        <span class="type-body noria-offer-dialog__computed-label">Total Price</span>
        <span id="offer-total" class="type-body">-</span>
      </div>
      <div class="repel" id="offer-benefit-row" hidden="">
        <span class="type-body noria-offer-dialog__computed-label"
          >In-Stream Benefit</span
        >
        <span id="offer-benefit" class="type-body">-</span>
      </div>
    </div>
  </div>
  <div slot="footer" class="cluster" data-justify="end" data-gap="xs">
    <span id="offer-save"
      ><span
        class="esa-button esa-button--color-primary esa-button--appearance-fill esa-button--md"
      >
        <button class="esa-button__native" type="button">
          <span class="esa-button__label"> Save </span>
        </button>
      </span>
    </span>
    <span id="offer-cancel"
      ><span
        class="esa-button esa-button--color-ghost esa-button--appearance-outline esa-button--md"
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
.esa-button--color-ghost .esa-button__native {
  background: transparent;
  color: var(--color-text-primary, #171717);
  border-color: transparent;
}
.esa-button--color-ghost.esa-button--appearance-outline .esa-button__native,
.esa-button--color-ghost.esa-button--appearance-dashed .esa-button__native {
  border-color: var(--color-border, #e5e5e5);
}
.noria-offer-dialog__adorn {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
}
.noria-offer-dialog__affix {
  flex: none;
  color: var(--color-text-secondary);
  white-space: nowrap;
}
.noria-offer-dialog__field {
  flex: 1;
  min-inline-size: 0;
}
.noria-offer-dialog__computed {
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-100);
  padding: var(--spacing-300) var(--spacing-400);
}
.noria-offer-dialog__computed-label {
  font-weight: var(--font-weight-semibold);
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
.type-label {
  font-size: var(--type-size-100);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
}
.type-caption {
  font-size: var(--type-size-100);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
}
.type-body {
  font-size: var(--type-size-200);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-normal);
}
```

## Tokens
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-primary`: #235069 _(semantic)_
- `--color-primary-border`: #c9e1ee _(semantic)_
- `--color-primary-hover`: #214459 _(semantic)_
- `--color-primary-subtle`: #f3f8fc _(semantic)_
- `--color-text-inverse`: #ffffff _(semantic)_
- `--color-text-primary`: #171717 _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
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
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--transition-fast`: .15s ease _(primitive)_
- `--type-size-100`: clamp(.625rem, .56rem + .32vw, .75rem) _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
