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

const EUR_TO_USD = 1.08;
const DEFAULT_OPERATION_HOURS = 3000;
const WEAR_ANALYSIS_HOURS_PER_YEAR = 2000;

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

function parsePaverFuelConsumption(financial: PaverFinancialData): number {
  const fromAvg = parseLitersPerHour(financial.avgFuelConsumption);
  if (fromAvg > 0) return fromAvg;
  const tenHour = parseFloat(String(financial.fuelConsumption10h).replace(',', '.'));
  if (!Number.isNaN(tenHour) && tenHour > 0) return tenHour / 10;
  return 0;
}

function parsePaverWearCostPerHour(financial: PaverFinancialData): number {
  const total3Years = parseEuroAmount(financial.totalReplacements3Years);
  if (total3Years <= 0) return 0;
  const totalHours = 3 * WEAR_ANALYSIS_HOURS_PER_YEAR;
  return total3Years / totalHours;
}

function isRollerSpec(machine: ComparableMachine): machine is MachineSpec {
  return 'compactionWidth' in machine && typeof (machine as MachineSpec).fuelConsumption === 'number';
}

function isMillingSpec(machine: ComparableMachine): machine is MillingMachineSpec {
  return 'millingWidth' in machine;
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
  const wearPerHour = parsePaverWearCostPerHour(paver.financial);
  return {
    price: paver.price ?? 0,
    fuelConsumption: paver.fuelConsumption ?? parsePaverFuelConsumption(paver.financial),
    preventiveMaintenance: paver.preventiveMaintenance ?? wearPerHour,
    correctiveMaintenance: paver.correctiveMaintenance ?? 5,
    usageTime: paver.usageTime ?? DEFAULT_OPERATION_HOURS,
    tco: paver.tco ?? 0,
  };
}
