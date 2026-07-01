# Page header

The prototype screen's title lockup: a primary-blue compass glyph beside the page title, with a one-line lede beneath. A small, reusable spoke component (noria-page-title) used across prototype screens.

## Key decisions
- Title is Google Sans Flex at weight 500, in primary blue (#235069) — the SAME blue as the glyph, so icon and title read as one unit.
- The icon composes the esa-icon lego (compass paths passed explicitly); the lede uses the secondary text color.
- Props: title, optional lede, optional icon — nothing page-specific is baked in.

## Gotchas
- The shared blue between glyph and title is intentional; do not revert the title to the default near-black text color.

## Done when
- Title + lede render; the icon and title are the same blue.

## Markup
```html
<header class="noria-page-title">
  <div class="noria-page-title__bar">
    <span class="noria-page-title__icon"
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
          <circle cx="12" cy="12" r="10"></circle>
          <polygon
            points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
          ></polygon>
        </svg>
      </span>
    </span>
    <h1 class="noria-page-title__h1">Parcel Discovery Tool</h1>
  </div>
  <p class="noria-page-title__lede">
    A list of all parcels that could potentially participate in the Deschutes River Water
    Bank.
  </p>
</header>
```

## Styles
```css
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
.noria-page-title__bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-300, 12px);
}
.noria-page-title__icon {
  display: inline-flex;
  color: var(--color-primary, #235069);
}
.noria-page-title__icon svg {
  width: 28px;
  height: 28px;
}
.noria-page-title__h1 {
  margin: 0;
  font-family:
    Google Sans Flex,
    sans-serif;
  font-size: var(--type-size-600, 1.875rem);
  font-weight: 500;
  line-height: 1.1;
  color: var(--color-primary, #235069);
}
.noria-page-title__lede {
  margin: var(--spacing-200, 8px) 0 0;
  font-size: var(--type-size-300, 1.125rem);
  line-height: 1.4;
  color: var(--color-text-secondary, #525252);
}
```

## Tokens
- `--color-primary`: #235069 _(semantic)_
- `--color-text-muted`: #737373 _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--color-text-tertiary`: #404040 _(semantic)_
- `--icon-size-md`: 20px _(primitive)_
- `--icon-size-medium`: 20px _(component)_
- `--icon-size-sm`: 16px _(primitive)_
- `--icon-size-small`: 16px _(component)_
- `--icon-size-xs`: 14px _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--type-size-300`: clamp(.875rem, .77rem + .52vw, 1.125rem) _(primitive)_
- `--type-size-600`: clamp(1.375rem, 1.2rem + .88vw, 1.875rem) _(primitive)_
