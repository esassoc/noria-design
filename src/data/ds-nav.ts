// Single source of truth for the design-system sidebar + breadcrumbs.
// Types come from @esa/docs so this data is structurally compatible with DocsShell.
//
// The `foundations` group below is GENERIC — every spoke documents the same five
// token-driven foundation pages, so keep it as-is. `componentGroups` is the
// per-spoke catalog: /spoke-init populates it by mirroring the source app's
// catalog (e.g. an Angular ui-catalog) or by curating the esa-* components this
// spoke actually uses. The single scaffold entry below shows the shape.
import type { NavItem, NavGroup } from '@esa/docs/nav';
export type { NavItem, NavGroup };

export const foundations: NavGroup = {
  label: 'Foundations',
  items: [
    { label: 'Color', href: '/design-system/foundations/color' },
    { label: 'Typography', href: '/design-system/foundations/typography' },
    { label: 'Spacing', href: '/design-system/foundations/spacing' },
    { label: 'Radius', href: '/design-system/foundations/radius' },
    { label: 'Iconography', href: '/design-system/foundations/iconography' },
  ],
};

const c = (label: string, name: string): NavItem => ({
  label,
  href: `/design-system/components/${name}`,
});

// Noria's curated catalog. The live Noria app has no formal ui-* component
// catalog to mirror, so this is a curated subset of the @esa/ecology kit the
// spoke actually composes — the controls a water-banking platform leans on
// (forms, data grids, dialogs, maps). Each item has a matching page under
// src/pages/design-system/components/<slug>.astro.
export const componentGroups: NavGroup[] = [
  {
    label: 'Actions',
    items: [
      c('Button', 'esa-button'),
      c('Button Group', 'esa-button-group'),
      c('Button Toggle', 'esa-button-toggle'),
      c('Icon Button', 'esa-icon-button'),
    ],
  },
  {
    label: 'Form Inputs',
    items: [
      c('Form Field', 'esa-form-field'),
      c('Text Field', 'esa-text-field'),
      c('Textarea', 'esa-textarea'),
      c('Select', 'esa-select'),
      c('Combobox', 'esa-combobox'),
      c('Checkbox', 'esa-checkbox'),
      c('Radio Group', 'esa-radio-group'),
      c('Switch Toggle', 'esa-switch-toggle'),
      c('Date Picker', 'esa-date-picker'),
    ],
  },
  {
    label: 'Data Display',
    items: [
      c('Card', 'esa-card'),
      c('Badge', 'esa-badge'),
      c('Pill', 'esa-pill'),
      c('Grid', 'esa-grid'),
      c('Pagination', 'esa-pagination'),
      c('Empty State', 'esa-empty-state'),
    ],
  },
  {
    label: 'Feedback',
    items: [
      c('Alert Box', 'esa-alert-box'),
      c('Snackbar', 'esa-snackbar-container'),
      c('Loading Spinner', 'esa-loading-spinner'),
      c('Tooltip', 'esa-tooltip'),
    ],
  },
  {
    label: 'Navigation',
    items: [
      c('Breadcrumbs', 'esa-breadcrumbs'),
      c('Tabs', 'esa-tab-layout'),
      c('Sidebar Nav', 'esa-sidebar-nav'),
    ],
  },
  {
    label: 'Overlays',
    items: [
      c('Dialog', 'esa-dialog'),
      c('Side Dialog', 'esa-side-dialog'),
      c('Confirm Dialog', 'esa-confirm-dialog'),
      c('Dropdown Menu', 'esa-dropdown-menu'),
    ],
  },
  {
    label: 'Maps',
    items: [
      c('Map', 'esa-map'),
    ],
  },
];

export const allGroups: NavGroup[] = [foundations, ...componentGroups];
