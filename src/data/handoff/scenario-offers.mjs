// Handoff spec for /prototypes/scenario/offers — the Offers tab of Scenario
// Details. Sections: the shared scenario header, the Offers panel, and the
// create/edit Offer dialog (captured in its default state — it opens via a
// participant-picker dropdown, not a single trigger, so no apply recipe).
import { scenarioHeaderSection } from './_scenario-common.mjs';

/** @type {{ sections: import('./parcel-discovery.mjs') }} */
export default {
  sections: [
    scenarioHeaderSection,
    {
      label: 'Offers panel',
      selector: '.noria-offers-panel',
      intent:
        'The Offers tab body: an h2 "Offers" over a right-aligned toolbar of two "Make an Offer to Buy / Sell +" split-menus, above the full offers data grid. Each grid row is one offer (status, party, water type, volume, price, created), with an Actions menu (Edit · Delete · Close) per open offer.',
      decisions: [
        'The two toolbar actions are esa-button + esa-dropdown-menu split-menus: pick a participant from the menu → open the offer dialog in that buy/sell mode with the participant preset.',
        'The table is a NoriaDataGrid (full chrome: search header, download, record-count footer); it announces row-action clicks as a bubbling `noria-grid-action` event the panel routes to the dialog / a log.',
        'Buttons are size="sm"; the grid runs autoHeight so it grows to its rows and the whole page scrolls as one (no internal grid scroll).',
      ],
      gotchas: [
        'esa-dropdown-menu items carry only { label, action } — the action is the participant id. A party dot can\'t ride inside a lego menu item, so the menu is plain text; identity color appears once the offer lands in the grid.',
        'Buyer / seller menus are the participant list filtered to buyers / sellers; an empty side shows a single disabled "No buyers/sellers in this scenario" item.',
      ],
      acceptance: [
        'Both split-menus list participants; picking one opens the offer dialog in the matching mode; the grid renders offers with a per-row Actions menu.',
      ],
    },
    {
      label: 'Offer dialog',
      selector: '#offer-dialog',
      intent:
        'The create / edit Offer modal for the Offers tab — a single reusable esa-dialog driven imperatively by the panel: openOffer({ mode, participantId }) to create, openOfferEdit(offer) to edit. It presets the Party, shows the water-type Type select only in sell mode, and live-computes a Total Price / In-Stream Benefit box on every price / volume / type change.',
      decisions: [
        'Composes legos: esa-dialog (chrome / scrim / focus-trap / Esc), esa-select (Party + Type), esa-text-field (Price + Volume), esa-button (footer Save / Cancel in Windows order).',
        'bcn-lego-checked, two bits of scoped chrome the legos don\'t provide: (1) the $/unit ADORNMENT row — the "$" and "per ac-ft" / "ac-ft" affixes composed as text beside the field via a flex row; (2) the COMPUTED box (Total Price / In-Stream Benefit) — a quiet brand-tinted summary tile.',
        'All math comes from the data layer\'s helpers — no bespoke calculation in the component.',
      ],
      gotchas: [
        'The Type select is wrapped in #offer-type-wrap, hidden unless mode is "sell" — a buy offer has no water-type pick.',
        'The computed box recomputes on every price / volume / type input; keep it wired to those change events, not just a submit.',
        'This dialog\'s affixes predate the esa-text-field prefix/suffix affixes and are composed as sibling text; a fresh build could instead use the field\'s own affix props.',
      ],
      acceptance: [
        'Opening in buy mode presets the party and hides Type; sell mode shows Type; editing price/volume updates the computed Total Price / In-Stream Benefit box live.',
      ],
    },
  ],
};
