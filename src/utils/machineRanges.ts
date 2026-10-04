/**
 * Size classes used to group and filter the machine selection grid:
 * compaction rollers by operating weight, milling machines by milling width,
 * pavers by maximum paving width.
 */

export type RangeUnit = 't' | 'm';

export interface MachineRange {
  key: string;
  /** Inclusive lower bound (in `unit`); undefined = open. */
  min?: number;
  /** Exclusive upper bound (in `unit`); undefined = open. */
  max?: number;
  /** Bounds shown in the label when they differ from the classification bounds. */
  lo?: number;
  hi?: number;
}

export interface LineRanges {
  /** Locale key of the criterion label (e.g. "Operating weight"). */
  criterionKey: string;
  unit: RangeUnit;
  ranges: MachineRange[];
}

export const UNKNOWN_RANGE = 'unknown';

const LINE_RANGES: Record<string, LineRanges> = {
  sdr: {
    criterionKey: 'rangeByWeight',
    unit: 't',
    ranges: [
      { key: 'lt10', max: 10 },
      { key: '10-12', min: 10, max: 12 },
      { key: '12-15', min: 12, max: 15 },
      { key: '15-20', min: 15, max: 20 },
      { key: 'ge20', min: 20 },
    ],
  },
  ltr: {
    criterionKey: 'rangeByWeight',
    unit: 't',
    ranges: [
      { key: 'lt2', max: 2 },
      { key: '2-3', min: 2, max: 3 },
      { key: 'ge3', min: 3 },
    ],
  },
  htr: {
    criterionKey: 'rangeByWeight',
    unit: 't',
    ranges: [
      { key: 'lt9', max: 9 },
      { key: '9-11', min: 9, max: 11 },
      { key: 'ge11', min: 11 },
    ],
  },
  ptr: {
    criterionKey: 'rangeByWeight',
    unit: 't',
    ranges: [
      { key: 'lt9', max: 9 },
      { key: '9-12', min: 9, max: 12 },
      { key: 'ge12', min: 12 },
    ],
  },
  milling: {
    criterionKey: 'rangeByMillingWidth',
    unit: 'm',
    ranges: [
      { key: 'le1', max: 1.05, hi: 1 },
      { key: '1-1.5', min: 1.05, max: 1.75, lo: 1, hi: 1.5 },
      { key: 'ge2', min: 1.75, lo: 2 },
    ],
  },
  pavers: {
    criterionKey: 'rangeByPavingWidth',
    unit: 'm',
    ranges: [
      { key: 'le5', max: 5.05, hi: 5 },
      { key: '5-7.5', min: 5.05, max: 7.55, lo: 5, hi: 7.5 },
      { key: 'gt7.5', min: 7.55, lo: 7.5 },
    ],
  },
};

export function getLineRanges(line: string): LineRanges | null {
  return LINE_RANGES[line] ?? null;
}

/** "1.000 mm (estándar)" -> 1.0 (m). */
function parseMillingWidthM(text: unknown): number | null {
  const match = String(text ?? '').match(/(\d[\d.]*)\s*mm/);
  if (!match) return null;
  const mm = parseInt(match[1].replace(/\./g, ''), 10);
  return Number.isFinite(mm) && mm > 0 ? mm / 1000 : null;
}

/** Largest "<n> m" value: "8,5 m (AB500) / 9,0 m (AB600)\n10,0 m (SB300)" -> 10. */
function parseMaxMeters(text: unknown): number | null {
  const values = [...String(text ?? '').matchAll(/(\d+(?:[.,]\d+)?)\s*m\b/g)]
    .map((m) => parseFloat(m[1].replace(',', '.')))
    .filter((v) => Number.isFinite(v) && v > 0);
  return values.length ? Math.max(...values) : null;
}

/** Value used to classify the machine, in the line's unit (t or m). */
export function getRangeValue(machine: unknown, line: string): number | null {
  const m = machine as Record<string, unknown>;
  if (line === 'milling') return parseMillingWidthM(m.millingWidth);
  if (line === 'pavers') return parseMaxMeters(m.maxWidthWithExtensions) ?? parseMaxMeters(m.minWorkingWidth);
  const kg = Number(m.weight);
  return Number.isFinite(kg) && kg > 0 ? kg / 1000 : null;
}

export function getRangeKey(machine: unknown, line: string): string {
  const config = getLineRanges(line);
  const value = getRangeValue(machine, line);
  if (!config || value == null) return UNKNOWN_RANGE;
  const range = config.ranges.find(
    (r) => (r.min == null || value >= r.min) && (r.max == null || value < r.max)
  );
  return range?.key ?? UNKNOWN_RANGE;
}

/** Human label of a range, e.g. "10–12 t", "< 10 t", "≥ 2,0 m". */
export function formatRangeLabel(range: MachineRange, unit: RangeUnit, locale: string): string {
  const lo = range.lo ?? range.min;
  const hi = range.hi ?? range.max;
  const fmt = (v: number) =>
    v.toLocaleString(locale, { minimumFractionDigits: unit === 'm' ? 1 : 0, maximumFractionDigits: 1 });
  if (lo == null && hi != null) return `${unit === 'm' ? '≤' : '<'} ${fmt(hi)} ${unit}`;
  if (hi == null && lo != null) return `${range.key.startsWith('gt') ? '>' : '≥'} ${fmt(lo)} ${unit}`;
  return `${fmt(lo ?? 0)}–${fmt(hi ?? 0)} ${unit}`;
}
