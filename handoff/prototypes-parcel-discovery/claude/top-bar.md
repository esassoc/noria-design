# Top bar

The fixed application top bar for the Deschutes Water Bank. Left: the sidebar toggle and a QA-environment badge. Right: a utility/admin icon cluster (Support Desk, Manage, Platform Admin) and the account menu. The brand wordmark deliberately lives in the side nav, not here.

## Key decisions
- Three-column grid (auto · 1fr · auto): left cluster, flexible spacer, right cluster.
- Subtle neutral-blue chrome via color-mix(in srgb, primary 6%, surface) — reads as a cool off-white, never a brand fill.
- Manage and the account menu are lightweight in-shell dropdowns sharing ONE topbar-menu pattern (trigger + absolutely-positioned panel); a single wireMenu(trigger, panel, menu) drives both.
- Admin actions are icon-only buttons with title tooltips; Manage adds a chevron and opens Counties / Districts / OpenET Integration.
- No separators between the three admin icons — one divider only sets the account apart.

## Gotchas
- The QA badge glyph and its "QA" label must share one color — let the icon inherit currentColor from the badge, do not give it its own.
- The bar is position:fixed at z-index 1100; the body is padded by its height (--_topbar-h) so content clears it.
- Opening one dropdown closes the other: the triggers do NOT stopPropagation, so each menu's outside-click handler closes it when the other trigger is clicked.

## Done when
- Manage opens a menu of Counties / Districts / OpenET Integration; the account button opens Profile / Settings / Sign out.
- Esc and outside-click close any open menu; opening one menu closes the other.

## Markup
```html
<header class="topbar">
  <!-- Left: sidebar toggle + QA badge -->
  <div class="topbar__left">
    <button
      type="button"
      class="sidebar-toggle"
      id="sidebar-toggle"
      aria-label="Collapse sidebar"
      aria-expanded="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="sidebar-toggle__icon"
      >
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M9 3v18"></path>
      </svg>
    </button>
    <span class="qa-warning" title="QA Environment">
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
            d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
          ></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
      </span>
      QA
    </span>
  </div>
  <!-- Center: spacer (1fr) -->
  <div class="topbar__center"></div>
  <!-- Right: utilities + admin (no separators) · account (Help + News live in the sidenav) -->
  <!-- bcn-lego-checked: Manage + account are lightweight in-shell dropdown menus
           (trigger + panel), mirroring this shell's existing user-menu pattern;
           esa-dropdown-menu would re-introduce its own theming/anchoring into the
           bespoke topbar. -->
  <div class="topbar__right">
    <!-- Support Desk -->
    <a href="#support" class="icon-button" aria-label="Support Desk" title="Support Desk">
      <span class="esa-icon esa-icon--md" aria-hidden="true">
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
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <path d="M12 17h.01"></path>
        </svg>
      </span>
    </a>
    <!-- Manage — a database menu (Counties / Districts / OpenET Integration) -->
    <div class="topbar-menu" id="manage-menu">
      <button
        type="button"
        class="icon-button icon-button--menu"
        id="manage-trigger"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Manage"
        title="Manage"
      >
        <span class="esa-icon esa-icon--md" aria-hidden="true">
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
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
            <path d="M3 12A9 3 0 0 0 21 12"></path>
          </svg>
        </span>
        <span class="esa-icon esa-icon--xs" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </span>
      </button>
      <div class="topbar-menu__panel" id="manage-panel" hidden="">
        <a href="#counties" class="topbar-menu__item">Counties</a>
        <a href="#districts" class="topbar-menu__item">Districts</a>
        <a href="#openet" class="topbar-menu__item">OpenET Integration</a>
      </div>
    </div>
    <!-- Platform Admin -->
    <a
      href="#platform-admin"
      class="icon-button"
      aria-label="Platform Admin"
      title="Platform Admin"
    >
      <span class="esa-icon esa-icon--md" aria-hidden="true">
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
          <path
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          ></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </span>
    </a>
    <span class="topbar-divider" aria-hidden="true"></span>
    <!-- Account -->
    <div class="topbar-menu" id="user-menu">
      <button
        type="button"
        class="user-trigger"
        id="user-trigger"
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <span class="user-trigger__name">Andrew Lovseth</span>
        <span class="esa-icon esa-icon--xs" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </span>
      </button>
      <div class="topbar-menu__panel" id="user-panel" hidden="">
        <a href="#profile" class="topbar-menu__item">
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span>Profile</span>
        </a>
        <a href="#settings" class="topbar-menu__item">
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
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
              ></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </span>
          <span>Settings</span>
        </a>
        <button type="button" class="topbar-menu__item topbar-menu__item--danger">
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
          </span>
          <span>Sign out</span>
        </button>
      </div>
    </div>
  </div>
</header>
```

## Styles
```css
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
.topbar {
  --_topbar-bg: color-mix(
    in srgb,
    var(--color-primary, #235069) 6%,
    var(--color-surface, #fff)
  );
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--_topbar-h, 56px);
  background: var(--_topbar-bg);
  border-bottom: 1px solid var(--_chrome-border);
  z-index: 1100;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 var(--spacing-400, 1rem);
}
.topbar__left {
  display: flex;
  align-items: center;
  gap: var(--spacing-300, 0.75rem);
  min-width: 0;
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
.qa-warning {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100, 0.25rem);
  padding: var(--spacing-100, 0.25rem) var(--spacing-200, 0.5rem);
  border-radius: var(--radius-100, 0.25rem);
  background: var(--color-warning-subtle, #fef3c7);
  color: var(--color-warning-strong, #b45309);
  font-size: 0.8125rem;
  font-weight: var(--font-weight-semibold, 600);
  white-space: nowrap;
}
.topbar__center {
  min-width: 0;
}
.topbar__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-150, 0.375rem);
}
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-100, 4px);
  background: transparent;
  color: var(--color-text-tertiary, #525252);
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}
.topbar-menu {
  position: relative;
}
.icon-button--menu {
  width: auto;
  gap: var(--spacing-050, 0.125rem);
  padding-inline: var(--spacing-200, 0.5rem);
}
.topbar-menu__panel {
  position: absolute;
  top: calc(100% + var(--spacing-200, 0.5rem));
  right: 0;
  min-width: 200px;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-100, 4px);
  border: 1px solid var(--_chrome-border);
  box-shadow: 0 4px 24px #0000001f;
  z-index: 1200;
  padding: var(--spacing-200, 0.5rem);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-050, 0.125rem);
}
.topbar-menu__panel[hidden] {
  display: none;
}
.topbar-divider {
  width: 1px;
  height: 20px;
  margin-inline: var(--spacing-100, 0.25rem);
  background: var(--_chrome-border);
  flex-shrink: 0;
}
.user-trigger {
  display: flex;
  align-items: center;
  gap: var(--spacing-250, 0.625rem);
  padding: var(--spacing-100, 0.25rem) var(--spacing-200, 0.5rem);
  border: none;
  border-radius: var(--radius-100, 4px);
  background: transparent;
  cursor: pointer;
  transition: background 0.15s ease;
}
.user-trigger__name {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-text-primary, #171717);
  line-height: 1.25;
  white-space: nowrap;
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
```

## Tokens
- `--color-primary`: #235069 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-text-muted`: #737373 _(semantic)_
- `--color-text-primary`: #171717 _(semantic)_
- `--color-text-tertiary`: #404040 _(semantic)_
- `--color-warning-strong`: #b45309 _(semantic)_
- `--color-warning-subtle`: #fffbeb _(semantic)_
- `--font-weight-semibold`: 550 _(primitive)_
- `--icon-size-md`: 20px _(primitive)_
- `--icon-size-medium`: 20px _(component)_
- `--icon-size-sm`: 16px _(primitive)_
- `--icon-size-small`: 16px _(component)_
- `--icon-size-xs`: 14px _(primitive)_
- `--radius-100`: .25rem _(primitive)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-150`: .375rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
