import type { MachineSpec } from '@/data/machineData';
import type { MillingMachineSpec } from '@/data/millingData';
import type { PaverFinancialData, PaverMachineSpec } from '@/data/paversData';

export type ComparableMachine = MachineSpec | MillingMachineSpec | PaverMachineSpec;

export interface MachineFinancialDefaults {
  price: number;
  fuelConsumption: number;
  preventiveMaintenance: number;
  correctiveMaintenance: number;
  usageTime: number;
  tco: number;
}

export const EUR_TO_USD = 1.08;
const DEFAULT_OPERATION_HOURS = 3000;
/** Screed wear analysis assumes ~1,000 operating hours per year (paver product data). */
export const PAVER_WEAR_HOURS_PER_YEAR = 1000;

/** Parse values like "8,9 l/h" or "10.5 l/h (en ficha oficial)" */
export function parseLitersPerHour(text: string): number {
  if (!text || text === '—' || text === 'N/D') return 0;
  const lower = text.toLowerCase();
  if (lower.includes('no publicado') || lower.includes('n/d')) return 0;
  const normalized = text.replace(',', '.');
  const match = normalized.match(/([\d.]+)\s*l\s*\/\s*h/i);
  if (match) return parseFloat(match[1]) || 0;
  return 0;
}

/** Parse euro amounts like "~8.000 €" or "~24.000 € ✓" */
export function parseEuroAmount(text: string): number {
  if (!text || text === '—' || text === '/' || text.trim() === '') return 0;
  const digits = text.replace(/[^\d.,]/g, '');
  if (!digits) return 0;
  const cleaned = digits.includes(',')
    ? digits.replace(/\./g, '').replace(',', '.')
    : digits.replace(/,/g, '');
  const value = parseFloat(cleaned);
  return Number.isNaN(value) ? 0 : value * EUR_TO_USD;
}

export function parsePaverFuelConsumption(financial: PaverFinancialData): number {
  const fromAvg = parseLitersPerHour(financial.avgFuelConsumption);
  if (fromAvg > 0) return fromAvg;
  const tenHour = parseFloat(String(financial.fuelConsumption10h).replace(',', '.'));
  if (!Number.isNaN(tenHour) && tenHour > 0) return tenHour / 10;
  // Estimate from CO₂ when fuel is unpublished: kg CO₂ / 2.6 ≈ liters per 10h shift
  const co2Match = String(financial.co2Per10hShift).replace(',', '.').match(/([\d.]+)\s*kg/i);
  if (co2Match) {
    const co2 = parseFloat(co2Match[1]);
    if (!Number.isNaN(co2) && co2 > 0) return co2 / 2.6 / 10;
  }
  return 0;
}

/** Hourly USD cost of screed wear parts from 3-year replacement total (@1,000 h/year). */
export function parsePaverScreedWearPerHour(financial: PaverFinancialData): number {
  const total3Years = parseEuroAmount(financial.totalReplacements3Years);
  if (total3Years <= 0) return 0;
  return total3Years / (3 * PAVER_WEAR_HOURS_PER_YEAR);
}

function isRollerSpec(machine: ComparableMachine): machine is MachineSpec {
  return 'compactionWidth' in machine && typeof (machine as MachineSpec).fuelConsumption === 'number';
}

function isMillingSpec(machine: ComparableMachine): machine is MillingMachineSpec {
  return 'millingWidth' in machine;
}

function isBomagBrand(brand: string): boolean {
  return brand.toUpperCase().includes('BOMAG');
}

export function getMachineFinancialDefaults(machine: ComparableMachine): MachineFinancialDefaults {
  if (isRollerSpec(machine)) {
    return {
      price: machine.price || 0,
      fuelConsumption: machine.fuelConsumption || 0,
      preventiveMaintenance: machine.preventiveMaintenance || 0,
      correctiveMaintenance: machine.correctiveMaintenance || 0,
      usageTime: machine.usageTime || DEFAULT_OPERATION_HOURS,
      tco: machine.tco || 0,
    };
  }

  if (isMillingSpec(machine)) {
    return {
      price: machine.price ?? 0,
      fuelConsumption: machine.fuelConsumption ?? 0,
      preventiveMaintenance: machine.preventiveMaintenance ?? 0,
      correctiveMaintenance: machine.correctiveMaintenance ?? 0,
      usageTime: machine.usageTime ?? DEFAULT_OPERATION_HOURS,
      tco: machine.tco ?? 0,
    };
  }

  const paver = machine as PaverMachineSpec;
  const bomag = isBomagBrand(paver.brand);
  return {
    price: paver.price ?? 0,
    fuelConsumption: paver.fuelConsumption ?? parsePaverFuelConsumption(paver.financial),
    // Service maintenance — separate from screed wear (MAGMALIFE USP 8)
    preventiveMaintenance: paver.preventiveMaintenance ?? (bomag ? 8 : 10),
    correctiveMaintenance: paver.correctiveMaintenance ?? (bomag ? 4 : 6),
    usageTime: paver.usageTime ?? DEFAULT_OPERATION_HOURS,
    tco: paver.tco ?? 0,
  };
}
