# Scenario header

The page header on every Scenario Details tab: a breadcrumb trail, then a tight identity UNIT (a primary-blue glyph + the scenario name + a searchable scenario switcher, with a custom meta row directly beneath), then a horizontal tab strip linking the five tabs. Identity + meta read as one block; breadcrumbs above and tabs below sit at a wider gap so they never crowd it.

## Key decisions
- A .stack spine at data-gap="2xl" separates the three bands (breadcrumbs · identity+meta · tabs); the identity and meta nest in their own tight data-gap="sm" stack so they read as one unit.
- Identity lockup matches the Parcel Discovery page header (noria-page-title): a blue glyph beside a Google Sans Flex 500 title, BOTH in the same primary blue (#235069) so icon and title read as one unit.
- Meta row = four bespoke facets, each expressing the SHAPE of its datum: Type as a transfer flow (A → B), Reporting Period as a calendar glyph + text, Participants as an overlapping party-color facepile (keyed on each participant colorHex, like noria-party-dot) + count, and Price Band as a floor–track–ceiling lockup.
- All four facets share ONE type contract — 14px / medium (500) / primary ink, with a single muted glyph tone — so nothing reads heavier than its neighbor.
- The tab strip is a route-linked underline bar: cross-page <a href> links (one per tab route), the active tab marked by primary-blue text + a 2px underline that overlaps the container hairline (no layout shift vs. inactive).
- Composed legos: esa-breadcrumbs (trail), esa-combobox (searchable switcher, text trigger), esa-icon (identity glyph + tab glyphs).

## Gotchas
- The tabs are CROSS-PAGE routes, not esa-tab-layout panels — esa-tab-layout switches client panels in place (activeIndex), which is the wrong model here. No esa- lego renders a route-linked underline bar, so this small scoped strip mirrors esa-tab-layout's "underline" appearance instead.
- Keep the four meta facets on their one shared type contract; do not let any one facet (e.g. the price band or a longer Type string) grow heavier or larger than the others.
- Tab glyphs (layers, receipt-text, chart-pie) and the identity/scenario glyph are NOT in esa-icon's built-in registry — pass the inner SVG explicitly via the paths prop.
- The scenario switcher is a prototype stub: on change it console.logs and resets its value in a microtask so the trigger keeps its "Switch scenario" placeholder instead of latching onto the picked name.
- The facepile dots overlap via a negative margin and carry a 2px surface-colored border so each reads as a distinct token against its neighbor.

## Done when
- Breadcrumbs → identity (glyph + name in the SAME blue) + meta facets → tab strip render top to bottom, with the identity+meta visually tighter than the gaps above and below.
- The current tab is underlined in primary blue and carries aria-current="page"; every tab links to its own route.
- All four meta facets render at one visual weight; the switcher opens a searchable list of the other scenarios.

## Markup
```html
<header class="scenario-header stack" data-gap="2xl">
  <nav class="esa-breadcrumbs esa-breadcrumbs--sm" aria-label="Breadcrumb">
    <ol class="esa-breadcrumbs__list">
      <li class="esa-breadcrumbs__item">
        <a href="/noria-design/" class="esa-breadcrumbs__link">
          <span class="esa-breadcrumbs__icon"
            ><svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path
                d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              ></path></svg
          ></span>
          Home
        </a>
        <svg
          class="esa-breadcrumbs__separator"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </li>
      <li class="esa-breadcrumbs__item">
        <a href="/noria-design/prototypes/scenarios" class="esa-breadcrumbs__link">
          Scenarios
        </a>
        <svg
          class="esa-breadcrumbs__separator"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </li>
      <li class="esa-breadcrumbs__item" aria-current="page">
        <span class="esa-breadcrumbs__current"> Deschutes 2026 Wholesale Exchange </span>
      </li>
    </ol>
  </nav>
  <!-- Identity + meta read as ONE unit (tight inner gap). -->
  <div class="scenario-header__lede stack" data-gap="sm">
    <div class="cluster scenario-header__identity" data-gap="md" data-align="center">
      <div class="cluster" data-gap="sm" data-align="center">
        <span class="scenario-header__glyph"
          ><span class="esa-icon esa-icon--md" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
            >
              <path d="M12 16v5"></path>
              <path d="M16 14.639V21"></path>
              <path d="M20 10.656V21"></path>
              <path
                d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"
              ></path>
              <path d="M4 18.463V21"></path>
              <path d="M8 14.656V21"></path>
            </svg>
          </span>
        </span>
        <h1 class="scenario-header__h1">Deschutes 2026 Wholesale Exchange</h1>
      </div>
      <esa-combobox
        class="scenario-header__switcher"
        data-scenario-switcher="true"
        mode="select"
        trigger-style="text"
        size="sm"
        placeholder="Switch scenario"
        results-count="3"
      ></esa-combobox>
    </div>
    <div class="scenario-header__meta">
      <!-- Type — a transfer: A → B -->
      <div class="scenario-header__facet sh-flow">
        <span class="sh-facet-icon"
          ><svg
            class="sh-ico"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M8 3 4 7l4 4"></path>
            <path d="M4 7h16"></path>
            <path d="m16 21 4-4-4-4"></path>
            <path d="M20 17H4"></path></svg
        ></span>
        <span class="sh-facet-txt">Wholesale</span>
        <span class="sh-facet-icon"
          ><svg
            class="sh-ico"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path></svg></span
        ><span class="sh-facet-txt">Wholesale</span>
      </div>
      <span class="sh-divider" aria-hidden="true"></span>
      <!-- Reporting Period — calendar glyph + text -->
      <div class="scenario-header__facet sh-caldate">
        <span class="sh-facet-icon"
          ><svg
            class="sh-ico"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path></svg
        ></span>
        <span class="sh-facet-txt">2026 Water Year</span>
      </div>
      <span class="sh-divider" aria-hidden="true"></span>
      <!-- Participants — overlapping party-color facepile + count -->
      <div class="scenario-header__facet sh-facepile">
        <span class="sh-facepile__dots">
          <span
            class="sh-facepile__dot"
            style="background: #7d4fa3"
            title="North Unit"
          ></span
          ><span
            class="sh-facepile__dot"
            style="background: #2e3a66"
            title="Central Oregon"
          ></span
          ><span
            class="sh-facepile__dot"
            style="background: #e07e2f"
            title="Three Sisters"
          ></span>
        </span>
        <span class="sh-facet-txt">3 participants</span>
      </div>
      <span class="sh-divider" aria-hidden="true"></span>
      <!-- Price Band — label + floor–track–ceiling -->
      <div class="scenario-header__facet sh-priceband">
        <span class="sh-priceband__label">Price Band</span>
        <span class="sh-priceband__track">
          <span class="sh-pb-val">$50</span> <span class="sh-pb-bar"></span>
          <span class="sh-pb-val">$200</span>
        </span>
      </div>
    </div>
  </div>
  <nav class="scenario-header__tabs" aria-label="Scenario sections">
    <a href="/noria-design/prototypes/scenario/overview" class="scenario-header__tab">
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
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </svg>
      </span>
      Overview </a
    ><a
      href="/noria-design/prototypes/scenario/offers"
      class="scenario-header__tab is-active"
      aria-current="page"
    >
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
            d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"
          ></path>
          <path
            d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"
          ></path>
          <path
            d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"
          ></path>
        </svg>
      </span>
      Offers </a
    ><a
      href="/noria-design/prototypes/scenario/transactions"
      class="scenario-header__tab"
    >
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
            d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"
          ></path>
          <path d="M14 8H8"></path>
          <path d="M16 12H8"></path>
          <path d="M13 16H8"></path>
        </svg>
      </span>
      Transactions </a
    ><a href="/noria-design/prototypes/scenario/report" class="scenario-header__tab">
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
            d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
          ></path>
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
        </svg>
      </span>
      Report </a
    ><a href="/noria-design/prototypes/scenario/users" class="scenario-header__tab">
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </span>
      User Management
    </a>
  </nav>
  <script type="application/json" data-scenario-switcher-items="">
    [
      { "value": "37", "label": "North Unit Drought Contingency" },
      { "value": "31", "label": "Central Oregon Patron Pilot" },
      { "value": "24", "label": "2025 Water Year — Final" }
    ]
  </script>
</header>
```

## Styles
```css
.scenario-header__glyph {
  display: inline-flex;
  color: var(--color-primary, #235069);
}
.scenario-header__glyph svg {
  width: 26px;
  height: 26px;
}
.scenario-header__h1 {
  margin: 0;
  font-family:
    Google Sans Flex,
    sans-serif;
  font-size: var(--type-size-600, 1.875rem);
  font-weight: 500;
  line-height: 1.1;
  color: var(--color-primary, #235069);
}
.scenario-header__switcher {
  min-width: 20rem;
}
.scenario-header__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-200, 8px) var(--spacing-400, 16px);
}
.scenario-header__facet {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-200, 8px);
}
.sh-facet-icon {
  display: inline-flex;
  color: var(--color-text-muted, #737373);
}
.sh-facet-icon .sh-ico {
  width: 16px;
  height: 16px;
}
.sh-facet-txt {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-text-primary, #171717);
}
.sh-divider {
  width: 1px;
  align-self: stretch;
  min-height: 20px;
  background: var(--color-border, #e5e5e5);
  flex: none;
}
.sh-facepile {
  gap: var(--spacing-300, 10px);
}
.sh-facepile__dots {
  display: inline-flex;
}
.sh-facepile__dot {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full, 999px);
  border: 2px solid var(--color-surface, #fff);
}
.sh-facepile__dot + .sh-facepile__dot {
  margin-left: -6px;
}
.sh-priceband {
  gap: var(--spacing-300, 10px);
}
.sh-priceband__label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-text-secondary, #525252);
}
.sh-priceband__track {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-200, 8px);
}
.sh-pb-val {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-text-primary, #171717);
  font-variant-numeric: tabular-nums;
}
.sh-pb-bar {
  position: relative;
  width: 84px;
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--noria-blue-300, #99c8e0),
    var(--color-primary, #235069)
  );
}
.sh-pb-bar:before,
.sh-pb-bar:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--color-primary, #235069);
  transform: translateY(-50%);
}
.sh-pb-bar:before {
  left: -1px;
}
.sh-pb-bar:after {
  right: -1px;
}
.scenario-header__tabs {
  display: flex;
  gap: var(--spacing-100, 4px);
  border-bottom: 1px solid var(--color-border, #e5e5e5);
  overflow-x: auto;
}
.scenario-header__tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-200, 8px);
  height: 44px;
  padding-inline: var(--spacing-400, 16px);
  font-size: var(--type-size-200, 1rem);
  color: var(--color-text-secondary, #525252);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease;
}
.scenario-header__tab.is-active {
  color: var(--color-primary, #235069);
  font-weight: var(--font-weight-medium, 500);
}
.scenario-header__tab.is-active:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--color-primary, #235069);
  border-radius: 2px;
}
.esa-breadcrumbs {
  --_crumb-font-size: var(--type-size-200, 0.875rem);
  --_crumb-link-color: var(--breadcrumbs-link-color, #43608a);
  --_crumb-link-hover: var(--breadcrumbs-link-hover, #39506f);
  --_crumb-current-color: var(--color-text-primary, #171717);
  --_crumb-separator-color: var(--breadcrumbs-separator-color, #737373);
  --_crumb-gap: var(--spacing-200, 8px);
  display: block;
}
.esa-breadcrumbs--sm {
  --_crumb-font-size: var(--type-size-150, 0.75rem);
}
.esa-breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--_crumb-gap);
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--_crumb-font-size);
}
.esa-breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: var(--_crumb-gap);
}
.esa-breadcrumbs__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  color: var(--_crumb-link-color);
  text-decoration: none;
}
.esa-breadcrumbs__icon {
  display: inline-flex;
  align-items: center;
}
.esa-breadcrumbs__separator {
  flex-shrink: 0;
  color: var(--_crumb-separator-color);
}
.esa-breadcrumbs__current {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 4px);
  color: var(--_crumb-current-color);
  font-weight: var(--font-weight-medium, 500);
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
```

## Tokens
- `--breadcrumbs-link-color`: #525252 _(component)_
- `--breadcrumbs-link-hover`: #171717 _(component)_
- `--breadcrumbs-separator-color`: #a3a3a3 _(component)_
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-primary`: #235069 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-text-muted`: #737373 _(semantic)_
- `--color-text-primary`: #171717 _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--color-text-tertiary`: #404040 _(semantic)_
- `--font-weight-medium`: 450 _(primitive)_
- `--gap`: 3rem _(component)_
- `--icon-size-md`: 20px _(primitive)_
- `--icon-size-medium`: 20px _(component)_
- `--icon-size-sm`: 16px _(primitive)_
- `--icon-size-small`: 16px _(component)_
- `--icon-size-xs`: 14px _(primitive)_
- `--noria-blue-300`: #99c8e0 _(component)_
- `--radius-full`: 9999px _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--type-size-150`: clamp(.6875rem, .61rem + .38vw, .875rem) _(primitive)_
- `--type-size-200`: clamp(.75rem, .66rem + .44vw, .9375rem) _(primitive)_
- `--type-size-600`: clamp(1.375rem, 1.2rem + .88vw, 1.875rem) _(primitive)_
