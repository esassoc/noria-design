// Mock scenario registry for the Scenario Details prototype.
//
// INVENTED DATA — not derived from any client document or QA screenshot. The
// scenario, participants, offers, transactions, users, and parcels are fictional
// but domain-credible: real public Deschutes-basin irrigation districts as
// participants, plausible water volumes/prices in the right units, deterministic
// coordinates near each district. No Math.random / new Date — stable every build.
//
// This is the single source of truth the Scenario Details sections share: every
// tab panel, grid, dialog, and map reads from here. Keep the shapes stable —
// components import them.

// ─────────────────────────────────────────────────────────────────────────────
// Enums (mirror the prod lookup tables)
// ─────────────────────────────────────────────────────────────────────────────

export const ScenarioType = {
  WholesaleToWholesale: 'Wholesale to Wholesale',
  WholesaleToPatron: 'Wholesale to Patron',
  PatronToPatron: 'Patron to Patron',
} as const;

export const OfferStatus = { Open: 'Open', Closed: 'Closed' } as const;
export const OfferType = { Buy: 'Buy', Sell: 'Sell' } as const;
export const TransactionStatus = {
  Pending: 'Pending',
  Approved: 'Approved',
  Closed: 'Closed',
  Rejected: 'Rejected',
} as const;
export const ParcelType = { Sending: 'Sending', Receiving: 'Receiving' } as const;
export const ScenarioRole = {
  ScenarioOwner: 'Scenario Owner',
  DistrictManager: 'District Manager',
  Patron: 'Patron',
} as const;

export type OfferStatusName = (typeof OfferStatus)[keyof typeof OfferStatus];
export type OfferTypeName = (typeof OfferType)[keyof typeof OfferType];
export type TransactionStatusName = (typeof TransactionStatus)[keyof typeof TransactionStatus];

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface Participant {
  id: number;
  name: string;
  /** Per-participant "party color" dot. */
  colorHex: string;
  county: string;
  isWholesaleBuyer: boolean;
  isWholesaleSeller: boolean;
  /** Map anchor for this participant's district (parcels cluster near it). */
  anchor: [number, number];
}

export interface WaterType {
  id: number;
  name: string;
  description: string;
  /** FRACTION 0–1. UI multiplies ×100 for the "% Instream Flow Set Aside". */
  instreamFlowSetAside: number;
}

export interface Parcel {
  id: number;
  /** Assessor's Parcel Number — 13-digit. */
  apn: string;
  districtName: string;
  countyName: string;
  lat: number;
  lng: number;
}

export interface Offer {
  id: number;
  type: OfferTypeName;
  status: OfferStatusName;
  participantId: number;
  /** Sell offers carry a water type; Buy offers do not. */
  waterTypeId: number | null;
  volume: number; // ac-ft
  price: number; // $/ac-ft
  created: string; // MM/DD/YYYY
}

export interface PointOfDiversion {
  lat: number;
  lng: number;
  label: string;
}

export interface Transaction {
  id: number;
  status: TransactionStatusName;
  buyerId: number;
  sellerId: number;
  waterTypeId: number;
  price: number; // confirmed $/ac-ft
  volume: number; // confirmed ac-ft
  buyingOfferId: number | null;
  sellingOfferId: number | null;
  sendingParcelIds: number[];
  receivingParcelIds: number[];
  sellingPOD: PointOfDiversion | null;
  buyingPOD: PointOfDiversion | null;
  created: string;
}

export interface ScenarioUser {
  id: number;
  fullName: string;
  email: string;
  role: (typeof ScenarioRole)[keyof typeof ScenarioRole];
}

export interface Scenario {
  id: number;
  name: string;
  type: (typeof ScenarioType)[keyof typeof ScenarioType];
  reportingPeriod: string;
  description: string;
  priceFloor: number | null;
  priceCeiling: number | null;
  participants: Participant[];
  waterTypes: WaterType[];
}

// ─────────────────────────────────────────────────────────────────────────────
// The data
// ─────────────────────────────────────────────────────────────────────────────

// Party colors match the prod "district color" ramp (navy → indigo → violet →
// magenta → red → orange → amber, ordered by hue). The 3 active participants use
// their district colors so dots read consistently app-wide.
export const participants: Participant[] = [
  { id: 1, name: 'North Unit', colorHex: '#7d4fa3', county: 'Jefferson', isWholesaleBuyer: true, isWholesaleSeller: true, anchor: [44.63, -121.13] },
  { id: 2, name: 'Central Oregon', colorHex: '#2e3a66', county: 'Deschutes', isWholesaleBuyer: true, isWholesaleSeller: true, anchor: [44.27, -121.17] },
  { id: 3, name: 'Three Sisters', colorHex: '#e07e2f', county: 'Deschutes', isWholesaleBuyer: true, isWholesaleSeller: true, anchor: [44.1, -121.27] },
];

// ── District & conservation-buyer roster (Configure Scenario modal) ───────────
// The FULL water-bank roster the Configure modal offers, not just this scenario's
// active participants. Colors match prod; the 3 active districts (North Unit,
// Central Oregon, Three Sisters) are pre-selected as Buyer+Seller. Alphabetical,
// mirroring the prod modal order.
export interface District {
  id: number;
  name: string;
  colorHex: string;
  isBuyer: boolean;
  isSeller: boolean;
}
export const districts: District[] = [
  { id: 11, name: 'Arnold', colorHex: '#1f3a4d', isBuyer: false, isSeller: false },
  { id: 2, name: 'Central Oregon', colorHex: '#2e3a66', isBuyer: true, isSeller: true },
  { id: 12, name: 'Lone Pine', colorHex: '#5b5b8f', isBuyer: false, isSeller: false },
  { id: 1, name: 'North Unit', colorHex: '#7d4fa3', isBuyer: true, isSeller: true },
  { id: 13, name: 'Ochoco', colorHex: '#b83e75', isBuyer: false, isSeller: false },
  { id: 14, name: 'Swalley', colorHex: '#e05545', isBuyer: false, isSeller: false },
  { id: 3, name: 'Three Sisters', colorHex: '#e07e2f', isBuyer: true, isSeller: true },
  { id: 15, name: 'Tumalo', colorHex: '#e8a01f', isBuyer: false, isSeller: false },
];

export interface ConservationBuyer {
  id: number;
  name: string;
  colorHex: string;
  isBuyer: boolean;
}
export const conservationBuyers: ConservationBuyer[] = [
  { id: 51, name: 'Deschutes River Conservancy', colorHex: '#2b2f3a', isBuyer: false },
];

export const waterTypes: WaterType[] = [
  { id: 1, name: 'Fallowed Water', description: 'Water derived from temporary fallowing of irrigated land.', instreamFlowSetAside: 0.25 },
  { id: 2, name: 'Land Conversion Water', description: 'Water derived from permanent land conversion preserving the water right.', instreamFlowSetAside: 0 },
];

export const scenario: Scenario = {
  id: 42,
  name: 'Deschutes 2026 Wholesale Exchange',
  type: ScenarioType.WholesaleToWholesale,
  reportingPeriod: '2026 Water Year',
  description:
    'Wholesale water exchange modeling North Unit, Central Oregon, and Three Sisters transfers for the 2026 water year.',
  priceFloor: 50,
  priceCeiling: 200,
  participants,
  waterTypes,
};

/** Other scenarios, for the header switcher dropdown (names only need to be real). */
export const otherScenarios = [
  { id: 42, name: 'Deschutes 2026 Wholesale Exchange' },
  { id: 37, name: 'North Unit Drought Contingency' },
  { id: 31, name: 'Central Oregon Patron Pilot' },
  { id: 24, name: '2025 Water Year — Final' },
];

// Parcels — a couple per participant district, clustered near each anchor.
export const parcels: Parcel[] = [
  { id: 101, apn: '0913270000100', districtName: 'North Unit', countyName: 'Jefferson', lat: 44.641, lng: -121.142 },
  { id: 102, apn: '0914320000400', districtName: 'North Unit', countyName: 'Jefferson', lat: 44.625, lng: -121.118 },
  { id: 103, apn: '1013110000400', districtName: 'North Unit', countyName: 'Jefferson', lat: 44.618, lng: -121.151 },
  { id: 201, apn: '1313210000700', districtName: 'Central Oregon', countyName: 'Deschutes', lat: 44.278, lng: -121.181 },
  { id: 202, apn: '1313210000600', districtName: 'Central Oregon', countyName: 'Deschutes', lat: 44.263, lng: -121.159 },
  { id: 203, apn: '1213200000801', districtName: 'Central Oregon', countyName: 'Deschutes', lat: 44.281, lng: -121.196 },
  { id: 301, apn: '1013140000300', districtName: 'Three Sisters', countyName: 'Deschutes', lat: 44.109, lng: -121.281 },
  { id: 302, apn: '1213190000600', districtName: 'Three Sisters', countyName: 'Deschutes', lat: 44.092, lng: -121.263 },
];

export const offers: Offer[] = [
  { id: 1, type: OfferType.Buy, status: OfferStatus.Closed, participantId: 1, waterTypeId: null, volume: 100, price: 80, created: '05/28/2026' },
  { id: 2, type: OfferType.Sell, status: OfferStatus.Open, participantId: 3, waterTypeId: 1, volume: 80, price: 125, created: '05/29/2026' },
  { id: 3, type: OfferType.Buy, status: OfferStatus.Open, participantId: 2, waterTypeId: null, volume: 200, price: 115, created: '05/30/2026' },
  { id: 4, type: OfferType.Sell, status: OfferStatus.Open, participantId: 1, waterTypeId: 2, volume: 60, price: 90, created: '06/01/2026' },
  { id: 5, type: OfferType.Sell, status: OfferStatus.Closed, participantId: 2, waterTypeId: 1, volume: 150, price: 100, created: '06/02/2026' },
  { id: 6, type: OfferType.Buy, status: OfferStatus.Open, participantId: 1, waterTypeId: null, volume: 120, price: 105, created: '06/02/2026' },
  { id: 7, type: OfferType.Sell, status: OfferStatus.Open, participantId: 2, waterTypeId: 1, volume: 120, price: 110, created: '06/03/2026' },
  { id: 8, type: OfferType.Buy, status: OfferStatus.Closed, participantId: 3, waterTypeId: null, volume: 75, price: 95, created: '06/03/2026' },
];

export const transactions: Transaction[] = [
  {
    id: 1, status: TransactionStatus.Closed, buyerId: 2, sellerId: 1, waterTypeId: 1, price: 85, volume: 100,
    buyingOfferId: null, sellingOfferId: null, sendingParcelIds: [101], receivingParcelIds: [201],
    sellingPOD: { lat: 44.639, lng: -121.139, label: 'NU Lateral 14 headgate' }, buyingPOD: null, created: '06/04/2026',
  },
  {
    id: 2, status: TransactionStatus.Rejected, buyerId: 1, sellerId: 2, waterTypeId: 1, price: 100, volume: 150,
    buyingOfferId: null, sellingOfferId: 5, sendingParcelIds: [202], receivingParcelIds: [102],
    sellingPOD: null, buyingPOD: null, created: '06/05/2026',
  },
  {
    id: 3, status: TransactionStatus.Approved, buyerId: 3, sellerId: 1, waterTypeId: 2, price: 90, volume: 60,
    buyingOfferId: null, sellingOfferId: 4, sendingParcelIds: [103], receivingParcelIds: [301],
    sellingPOD: { lat: 44.617, lng: -121.149, label: 'Well #3' }, buyingPOD: null, created: '06/06/2026',
  },
  {
    id: 4, status: TransactionStatus.Approved, buyerId: 2, sellerId: 3, waterTypeId: 1, price: 120, volume: 80,
    buyingOfferId: null, sellingOfferId: 2, sendingParcelIds: [301, 302], receivingParcelIds: [203],
    sellingPOD: null, buyingPOD: null, created: '06/07/2026',
  },
  {
    id: 5, status: TransactionStatus.Pending, buyerId: 1, sellerId: 2, waterTypeId: 1, price: 110, volume: 120,
    buyingOfferId: 6, sellingOfferId: 7, sendingParcelIds: [201], receivingParcelIds: [102],
    sellingPOD: null, buyingPOD: null, created: '06/08/2026',
  },
];

export const scenarioUsers: ScenarioUser[] = [
  { id: 1, fullName: 'Andrew Lovseth', email: 'andrew.lovseth@example.org', role: ScenarioRole.ScenarioOwner },
  { id: 2, fullName: 'Marlene Ostbye', email: 'm.ostbye@example.org', role: ScenarioRole.DistrictManager },
  { id: 3, fullName: 'Dale Crawford', email: 'd.crawford@example.org', role: ScenarioRole.Patron },
  { id: 4, fullName: 'Priya Nathan', email: 'p.nathan@example.org', role: ScenarioRole.Patron },
];

// ─────────────────────────────────────────────────────────────────────────────
// Lookups & helpers
// ─────────────────────────────────────────────────────────────────────────────

export const participantById = (id: number): Participant | undefined =>
  participants.find((p) => p.id === id);
export const waterTypeById = (id: number | null): WaterType | undefined =>
  id == null ? undefined : waterTypes.find((w) => w.id === id);
export const parcelById = (id: number): Parcel | undefined => parcels.find((p) => p.id === id);
export const offerById = (id: number | null): Offer | undefined =>
  id == null ? undefined : offers.find((o) => o.id === id);

/** $X,XXX.XX (dp=2 default; pass 0 for whole dollars). */
export function usd(n: number, dp = 2): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: dp, maximumFractionDigits: dp });
}
/** Plain number with fixed decimals + grouping (e.g. volume). */
export function num(n: number, dp = 2): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

/** Total = price × volume (whole dollars); '-' when either is missing/negative. */
export function totalPrice(price: number, volume: number): string {
  if (!(price >= 0) || !(volume >= 0) || (price === 0 && volume === 0)) return '-';
  return usd(price * volume, 0);
}
/** In-stream benefit = volume × setAside; '-' when setAside ≤ 0. */
export function instreamBenefit(volume: number, setAside: number): string {
  if (!(setAside > 0) || !(volume >= 0)) return '-';
  return `${num(volume * setAside, 2)} ac-ft (${Math.round(setAside * 100)}% of total volume)`;
}

/** esa-badge {variant,label} for a status — quiet 4px badge, semantic color. */
export function offerStatusBadge(status: OfferStatusName): { label: string; variant: string } {
  return { label: status, variant: status === OfferStatus.Open ? 'info' : 'secondary' };
}
export function transactionStatusBadge(status: TransactionStatusName): { label: string; variant: string } {
  const map: Record<TransactionStatusName, string> = {
    Pending: 'warning', Approved: 'success', Closed: 'secondary', Rejected: 'danger',
  };
  return { label: status, variant: map[status] };
}

// ── select option builders ───────────────────────────────────────────────────
export const buyerOptions = participants.filter((p) => p.isWholesaleBuyer)
  .map((p) => ({ label: p.name, value: String(p.id), colorHex: p.colorHex }));
export const sellerOptions = participants.filter((p) => p.isWholesaleSeller)
  .map((p) => ({ label: p.name, value: String(p.id), colorHex: p.colorHex }));
export const waterTypeOptions = waterTypes.map((w) => ({ label: w.name, value: String(w.id) }));
export const reportingPeriodOptions = ['2026 Water Year', '2025 Water Year', '2024 Water Year']
  .map((p) => ({ label: p, value: p }));
export const scenarioTypeOptions = Object.values(ScenarioType).map((t) => ({ label: t, value: t }));
export const transactionStatusOptions = Object.values(TransactionStatus).map((s) => ({ label: s, value: s }));
export const scenarioRoleOptions = Object.values(ScenarioRole).map((r) => ({ label: r, value: r }));

// ── report balance sheet ─────────────────────────────────────────────────────
export interface ReportFilters { sellerIds?: number[]; buyerIds?: number[]; statuses?: TransactionStatusName[]; }
export interface BalanceSheet {
  offersToSell: number; offersToBuy: number; volumeTransacted: number;
  transactionPrice: number; avgPrice: number | null; instreamBenefit: number; approvedForDelivery: number;
}

/** Compute the 7 balance-sheet stats under the given filters (defaults: status Approved). */
export function balanceSheet(filters: ReportFilters = {}): BalanceSheet {
  const statuses = filters.statuses ?? [TransactionStatus.Approved];
  const sellerIds = filters.sellerIds ?? [];
  const buyerIds = filters.buyerIds ?? [];

  const openSell = offers.filter((o) => o.type === OfferType.Sell && o.status === OfferStatus.Open
    && (sellerIds.length === 0 || sellerIds.includes(o.participantId)));
  const openBuy = offers.filter((o) => o.type === OfferType.Buy && o.status === OfferStatus.Open
    && (buyerIds.length === 0 || buyerIds.includes(o.participantId)));

  const tx = transactions.filter((t) => statuses.includes(t.status)
    && (sellerIds.length === 0 || sellerIds.includes(t.sellerId))
    && (buyerIds.length === 0 || buyerIds.includes(t.buyerId)));

  const offersToSell = openSell.reduce((s, o) => s + o.volume, 0);
  const offersToBuy = openBuy.reduce((s, o) => s + o.volume, 0);
  const volumeTransacted = tx.reduce((s, t) => s + t.volume, 0);
  const transactionPrice = tx.reduce((s, t) => s + t.price * t.volume, 0);
  const instream = tx.reduce((s, t) => s + t.volume * (waterTypeById(t.waterTypeId)?.instreamFlowSetAside ?? 0), 0);
  const approvedForDelivery = tx.reduce((s, t) => s + t.volume * (1 - (waterTypeById(t.waterTypeId)?.instreamFlowSetAside ?? 0)), 0);

  return {
    offersToSell, offersToBuy, volumeTransacted, transactionPrice,
    avgPrice: volumeTransacted > 0 ? transactionPrice / volumeTransacted : null,
    instreamBenefit: instream, approvedForDelivery,
  };
}

/** Flatten transactions → one row per sending/receiving parcel (Report parcel grid). */
export interface TxParcelRow {
  id: string; transactionId: number; type: string; apn: string; district: string;
  buyer: string; seller: string; volume: number; price: number;
  sellingPOD: string; buyingPOD: string; lat: number; lng: number; parcelType: string;
}
export function transactionParcelRows(filters: ReportFilters = {}): TxParcelRow[] {
  const statuses = filters.statuses ?? [TransactionStatus.Approved];
  const sellerIds = filters.sellerIds ?? [];
  const buyerIds = filters.buyerIds ?? [];
  const rows: TxParcelRow[] = [];
  for (const t of transactions) {
    if (!statuses.includes(t.status)) continue;
    if (sellerIds.length && !sellerIds.includes(t.sellerId)) continue;
    if (buyerIds.length && !buyerIds.includes(t.buyerId)) continue;
    const buyer = participantById(t.buyerId)!; const seller = participantById(t.sellerId)!;
    const add = (pid: number, kind: string) => {
      const p = parcelById(pid); if (!p) return;
      rows.push({
        id: `${t.id}-${kind}-${pid}`, transactionId: t.id, type: kind, apn: p.apn, district: p.districtName,
        buyer: buyer.name, seller: seller.name, volume: t.volume, price: t.price,
        sellingPOD: t.sellingPOD?.label ?? 'N/A', buyingPOD: t.buyingPOD?.label ?? 'N/A',
        lat: p.lat, lng: p.lng, parcelType: kind,
      });
    };
    t.sendingParcelIds.forEach((pid) => add(pid, ParcelType.Sending));
    t.receivingParcelIds.forEach((pid) => add(pid, ParcelType.Receiving));
  }
  return rows;
}
