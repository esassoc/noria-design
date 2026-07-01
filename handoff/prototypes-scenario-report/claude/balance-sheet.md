# Balance Sheet

A three-band "flow" inside an esa-card: Offers (two opposing proportional bars) · Transactions (a dimensioned value block where width = Volume Transacted, height = Avg Price/ac-ft, and the area = Transaction Price) · Allocation (a donut splitting the transacted volume into Delivery + In-stream). Each band is a DIFFERENT mark — length → area → arc — so the section reads as one instrument, not repeated tiles.

## Key decisions
- Three EQUAL columns — grid-template-columns: repeat(3, minmax(0, 1fr)) — separated by full-height hairlines, bands top-aligned so content flows from a common top line.
- Offers composes esa-progress-bar (two tracks on a shared scale, the larger side filling the track); the displayed ac-ft number stays raw, decoupled from the fill %.
- The Transactions value block and the Allocation donut are the only bespoke marks — no esa- data-viz lego exists (esa-stat is a single value; an esa-donut is filed via /request-lego). This component is their reusable, documented home.

## Gotchas
- Use minmax(0, 1fr), NOT 1fr — a plain 1fr track has a min-width:auto (min-content) floor, so an unshrinkable band (the value block, a long legend line) would push its track wider than an equal third.
- The middle band carries inline padding on BOTH sides while the outer two pad inward only, so its content area is inset slightly more than the outer bands even though the three tracks are equal width.
- The donut arc lengths are stroke-dasharray fractions of the circumference; the in-stream (green) arc draws first from 12 o'clock, the delivery (blue) arc follows it via a dashoffset.

## Done when
- Three equal-width bands render: opposing Offers bars, the Transactions value block, and the Allocation donut + legend; on narrow widths they stack with top separators.

## Markup
```html
<div class="noria-balance">
  <!-- Offers — two opposing quantities on a shared scale. -->
  <div class="noria-balance__band">
    <p class="noria-balance__cap">Offers</p>
    <div class="noria-balance__bars">
      <div class="noria-balance__track noria-balance__track--sell">
        <div class="noria-balance__barhead">
          <span class="noria-balance__barlbl">Offers to Sell</span>
          <span class="noria-balance__barval"
            >260<span class="noria-balance__u">ac-ft</span></span
          >
        </div>
        <div
          class="esa-progress-bar esa-progress-bar--sm esa-progress-bar--primary"
          role="progressbar"
          aria-valuenow="81.25"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Progress"
        >
          <div class="esa-progress-bar__track">
            <div class="esa-progress-bar__fill" style="width: 81.25%"></div>
          </div>
        </div>
      </div>
      <div class="noria-balance__track noria-balance__track--buy">
        <div class="noria-balance__barhead">
          <span class="noria-balance__barlbl">Offers to Buy</span>
          <span class="noria-balance__barval"
            >320<span class="noria-balance__u">ac-ft</span></span
          >
        </div>
        <div
          class="esa-progress-bar esa-progress-bar--sm esa-progress-bar--primary"
          role="progressbar"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Progress"
        >
          <div class="esa-progress-bar__track">
            <div class="esa-progress-bar__fill" style="width: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Transactions — a dimensioned value block: Volume × Avg Price = Transaction Price. -->
  <div class="noria-balance__band">
    <p class="noria-balance__cap">Transactions</p>
    <div class="noria-balance__measured">
      <div class="noria-balance__avglbl">
        <div class="noria-balance__mname">Avg Price</div>
        <div class="noria-balance__mval">
          $107.14<span class="noria-balance__u">/ac-ft</span>
        </div>
      </div>
      <div class="noria-balance__avgdim">
        <div class="noria-balance__vdim">
          <span class="noria-balance__vcap"></span
          ><span class="noria-balance__vline"></span
          ><span class="noria-balance__vcap"></span>
        </div>
      </div>
      <div class="noria-balance__block">
        <div class="noria-balance__total">$15,000</div>
        <div class="noria-balance__blockcap">Transaction Price · total</div>
      </div>
      <div class="noria-balance__voldim">
        <div class="noria-balance__hdim">
          <span class="noria-balance__hcap"></span
          ><span class="noria-balance__hline"></span
          ><span class="noria-balance__hcap"></span>
        </div>
      </div>
      <div class="noria-balance__vollbl">
        <div class="noria-balance__mval">
          140<span class="noria-balance__u">ac-ft</span>
        </div>
        <div class="noria-balance__mname">Volume Transacted</div>
      </div>
    </div>
  </div>
  <!-- Allocation — the transacted volume split into Delivery + In-stream. -->
  <div class="noria-balance__band">
    <p class="noria-balance__cap">Allocation</p>
    <div class="noria-balance__alloc">
      <div class="noria-balance__donut">
        <svg width="92" height="92" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--color-gray-100)"
            stroke-width="13"
          ></circle>
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--noria-blue-700)"
            stroke-width="13"
            stroke-dasharray="226.1946710584651 263.89378290154264"
            stroke-dashoffset="-37.69911184307752"
            transform="rotate(-90 50 50)"
          ></circle>
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--noria-green-500)"
            stroke-width="13"
            stroke-dasharray="37.69911184307752 263.89378290154264"
            stroke-dashoffset="0"
            transform="rotate(-90 50 50)"
            stroke-linecap="butt"
          ></circle>
        </svg>
        <div class="noria-balance__donutlbl">
          <span class="noria-balance__donutc">140</span>
          <span class="noria-balance__donutu">ac-ft</span>
        </div>
      </div>
      <div class="noria-balance__legend">
        <div class="noria-balance__legrow">
          <span class="noria-balance__sw noria-balance__sw--del"></span>
          <span class="noria-balance__legtext">
            <span class="noria-balance__legtop"
              ><span class="noria-balance__pct">86%</span>
              <span class="noria-balance__legl">Approved for Delivery</span></span
            >
            <span class="noria-balance__legq">120 ac-ft</span>
          </span>
        </div>
        <div class="noria-balance__legrow">
          <span class="noria-balance__sw noria-balance__sw--eco"></span>
          <span class="noria-balance__legtext">
            <span class="noria-balance__legtop"
              ><span class="noria-balance__pct">14%</span>
              <span class="noria-balance__legl">In-stream Benefit</span></span
            >
            <span class="noria-balance__legq">20 ac-ft</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Styles
```css
.noria-balance {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
}
.noria-balance__band {
  padding-inline: var(--spacing-650);
}
.noria-balance__band:first-child {
  padding-left: 0;
}
.noria-balance__cap {
  margin: 0 0 var(--spacing-400);
  font-size: 0.9375rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}
.noria-balance__bars {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
  --progress-bar-height-sm: 6px;
}
.noria-balance__track--sell {
  --progress-bar-fill-bg: var(--noria-blue-400);
}
.noria-balance__barhead {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--spacing-150);
}
.noria-balance__barlbl {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}
.noria-balance__barval {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}
.noria-balance__u {
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  margin-left: 0.2em;
}
.esa-progress-bar {
  --_progress-height: var(--progress-bar-height-md, 8px);
  --_progress-radius: var(--progress-bar-radius, var(--radius-full, 9999px));
  --_progress-track-bg: var(
    --progress-bar-track-bg,
    var(--color-surface-sunken, #efefef)
  );
  --_progress-fill-bg: var(--progress-bar-fill-bg, var(--color-primary, #43608a));
  --_progress-font-size: 13px;
  display: block;
  width: 100%;
}
.esa-progress-bar--sm {
  --_progress-height: var(--progress-bar-height-sm, 4px);
  --_progress-font-size: 11px;
}
.esa-progress-bar__track {
  position: relative;
  height: var(--_progress-height);
  border-radius: var(--_progress-radius);
  background: var(--_progress-track-bg);
  overflow: hidden;
}
.esa-progress-bar__fill {
  height: 100%;
  border-radius: var(--_progress-radius);
  background: var(--_progress-fill-bg);
  transition: width 0.3s ease;
}
.noria-balance__track--buy {
  --progress-bar-fill-bg: var(--noria-blue-600);
}
.noria-balance__band + .noria-balance__band {
  border-left: 1px solid var(--color-border);
}
.noria-balance__measured {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas: "avglbl avgdim block" ".      .      voldim" ".      .      vollbl";
  column-gap: var(--spacing-250);
  row-gap: var(--spacing-200);
  align-items: stretch;
}
.noria-balance__avglbl {
  grid-area: avglbl;
  align-self: center;
  text-align: right;
}
.noria-balance__mname {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}
.noria-balance__mval {
  font-size: 1.0625rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}
.noria-balance__avgdim {
  grid-area: avgdim;
}
.noria-balance__vdim {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.noria-balance__vcap {
  width: 7px;
  height: 1px;
  background: var(--color-gray-400);
  flex: none;
}
.noria-balance__vline {
  width: 1px;
  flex: 1;
  background: var(--color-gray-400);
}
.noria-balance__block {
  grid-area: block;
  height: 78px;
  background: var(--noria-blue-600);
  border-radius: var(--radius-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
}
.noria-balance__total {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.noria-balance__blockcap {
  font-size: 0.75rem;
  color: #ffffffd9;
  margin-top: var(--spacing-100);
}
.noria-balance__voldim {
  grid-area: voldim;
  padding-top: var(--spacing-100);
}
.noria-balance__hdim {
  display: flex;
  align-items: center;
  width: 100%;
}
.noria-balance__hcap {
  height: 7px;
  width: 1px;
  background: var(--color-gray-400);
  flex: none;
}
.noria-balance__hline {
  height: 1px;
  flex: 1;
  background: var(--color-gray-400);
}
.noria-balance__vollbl {
  grid-area: vollbl;
  text-align: center;
}
.noria-balance__band:last-child {
  padding-right: 0;
}
.noria-balance__alloc {
  display: flex;
  align-items: center;
  gap: var(--spacing-400);
}
.noria-balance__donut {
  width: 92px;
  height: 92px;
  flex: none;
  position: relative;
}
.noria-balance__donutlbl {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.noria-balance__donutc {
  font-size: 1.0625rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}
.noria-balance__donutu {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
}
.noria-balance__legend {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-250);
}
.noria-balance__legrow {
  display: flex;
  gap: var(--spacing-200);
  align-items: flex-start;
}
.noria-balance__sw {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex: none;
  margin-top: 5px;
}
.noria-balance__sw--del {
  background: var(--noria-blue-700);
}
.noria-balance__legtext {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.noria-balance__legtop {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.35em;
}
.noria-balance__pct {
  font-size: 1rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}
.noria-balance__legl {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}
.noria-balance__legq {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.noria-balance__sw--eco {
  background: var(--noria-green-500);
}
```

## Tokens
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-gray-400`: #a3a3a3 _(primitive)_
- `--color-primary`: #235069 _(semantic)_
- `--color-surface-sunken`: #efefef _(semantic)_
- `--color-text-muted`: #737373 _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--font-weight-bold`: 650 _(primitive)_
- `--font-weight-medium`: 450 _(primitive)_
- `--font-weight-semibold`: 550 _(primitive)_
- `--noria-blue-400`: #75b6d4 _(component)_
- `--noria-blue-600`: #2d759c _(component)_
- `--noria-blue-700`: #265e7e _(component)_
- `--noria-green-500`: #859b44 _(component)_
- `--progress-bar-fill-bg`: #235069 _(component)_
- `--progress-bar-height-md`: 8px _(component)_
- `--progress-bar-height-sm`: 4px _(component)_
- `--progress-bar-radius`: 9999px _(component)_
- `--progress-bar-track-bg`: #efefef _(component)_
- `--radius-100`: .25rem _(primitive)_
- `--radius-full`: 9999px _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
- `--spacing-650`: 2.5rem _(primitive)_
