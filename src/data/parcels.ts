// Mock parcel registry for the Parcel Discovery Tool prototype.
//
// INVENTED DATA — not derived from any client document. APNs, acreages, and
// water-measurement values are generated deterministically (a seeded LCG, so the
// build is reproducible and never calls Math.random/new Date). Coordinates are
// scattered around the Crook County / Ochoco area of the Deschutes basin so the
// map shows a believable cluster. Irrigation-district names are public Deschutes
// basin entities used here as plausible categories.
//
// This is the single source of truth the Parcel Discovery sections share:
// noria-parcel-grid renders rows from it, noria-parcel-map plots it, and the
// controls card narrows it. Keep the Parcel shape stable — components import it.

export interface Parcel {
  /** Assessor's Parcel Number — 13-digit, formatted like the live grid. */
  apn: string;
  irrigationDistrict: string;
  county: string;
  /** Irrigated acreage. */
  acres: number;
  /** Map position. */
  lat: number;
  lng: number;
  /** Annual OpenET evapotranspiration — a heat-map measurement type. */
  evapotranspiration: number;
  /** Annual OpenET precipitation — the other heat-map measurement type. */
  precipitation: number;
}

/** The water-measurement types the heat-map dropdown offers (OpenET layers). */
export const MEASUREMENT_TYPES = [
  { value: 'evapotranspiration', label: 'OpenET Evapotranspiration' },
  { value: 'precipitation', label: 'OpenET Precipitation' },
] as const;

/** Reporting periods the filter offers (water years), newest first. */
export const REPORTING_PERIODS = [
  '2026 Water Year',
  '2025 Water Year',
  '2024 Water Year',
  '2023 Water Year',
  '2022 Water Year',
] as const;

/** District → its county, so a parcel's county follows from its district. */
const DISTRICT_COUNTY: Record<string, string> = {
  Ochoco: 'Crook',
  'Lone Pine': 'Crook',
  'North Unit': 'Jefferson',
  'Central Oregon': 'Deschutes',
  'Three Sisters': 'Deschutes',
};
const DISTRICTS = Object.keys(DISTRICT_COUNTY);

// District map anchors (lat,lng) — parcels jitter around their district's anchor.
const DISTRICT_ANCHOR: Record<string, [number, number]> = {
  Ochoco: [44.305, -120.74],
  'Lone Pine': [44.27, -120.62],
  'North Unit': [44.63, -121.13],
  'Central Oregon': [44.27, -121.17],
  'Three Sisters': [44.1, -121.27],
};

// Deterministic pseudo-random in [0,1) — a tiny LCG so values are stable across
// builds without Math.random (which is unavailable to the workflow/build anyway).
function lcg(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildParcels(count: number): Parcel[] {
  const rand = lcg(1316280);
  const out: Parcel[] = [];
  for (let i = 0; i < count; i++) {
    const district = DISTRICTS[Math.floor(rand() * DISTRICTS.length)];
    const county = DISTRICT_COUNTY[district];
    const [aLat, aLng] = DISTRICT_ANCHOR[district];

    // 13-digit APN: township/range block + a per-parcel tail.
    const block = 1316000 + Math.floor(rand() * 4000) * 10;
    const tail = String(100 + Math.floor(rand() * 800)).padStart(6, '0');
    const apn = `${block}${tail}`;

    const acres = Math.round((8 + rand() * 240) * 10) / 10;
    // OpenET ET roughly scales with acreage; precipitation runs a bit higher.
    const evapotranspiration = Math.round(acres * (1.6 + rand() * 0.8) * 10) / 10;
    const precipitation = Math.round(evapotranspiration * (1.4 + rand() * 0.6) * 10) / 10;

    out.push({
      apn,
      irrigationDistrict: district,
      county,
      acres,
      lat: aLat + (rand() - 0.5) * 0.18,
      lng: aLng + (rand() - 0.5) * 0.22,
      evapotranspiration,
      precipitation,
    });
  }
  // Stable order: by district then APN (mirrors the grid's default sort).
  return out.sort(
    (a, b) => a.irrigationDistrict.localeCompare(b.irrigationDistrict) || a.apn.localeCompare(b.apn),
  );
}

export const parcels: Parcel[] = buildParcels(64);
