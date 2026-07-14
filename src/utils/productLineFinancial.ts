import type { MillingMachineSpec } from '@/data/millingData';
import type { PaverFinancialData, PaverMachineSpec } from '@/data/paversData';
import { parseEuroAmount, parseLitersPerHour } from '@/utils/financialFields';
import { parseSpecNumbers } from '@/utils/paverCompetitiveAdvantage';

export const MILLING_BMS15L_WEAR_REDUCTION = 0.2;
export const PAVER_ECOMODE_FUEL_SAVINGS = 0.17;
export const PAVER_HOURS_PER_SHIFT = 10;
export const PAVER_COMPETITOR_SETUP_FUEL_L = 10.5;

export interface MillingProductivityDefaults {
  transportCapacityM3h: number;
  workingSpeedMmin: number;
  turningRadiusM: number | null;
  hasBms15l: boolean;
  toolWearCostPerHour: number;
}

export interface PaverUspDefaults {
  hasMagmalife: boolean;
  hasEcomode: boolean;
  setupFuelLiters: number;
  heatingMinutes: number;
  wearCostPerHour: number;
}

function isBomag(brand: string): boolean {
  return brand.toUpperCase().includes('BOMAG');
}

/** Parse "92 m³/h" or "0-40 m/min" (returns max of range) */
export function parseMillingTransportCapacity(value: string): number {
  const nums = parseSpecNumbers(value);
  if (!nums.length) return 0;
  return nums[0];
}

export function parseMillingWorkingSpeed(value: string): number {
  const nums = parseSpecNumbers(value);
  if (!nums.length) return 0;
  return Math.max(...nums);
}

export function parseMillingTurningRadius(value: string): number | null {
  if (!value || /no declarado|not declared|nicht angegeben/i.test(value)) return null;
  const nums = parseSpecNumbers(value);
  return nums.length ? Math.min(...nums) : null;
}

/** Parse "9 kg (3,5 L) ✓" or "27 kg (10,5 L)" */
export function parseSetupFuelLiters(text: string): number {
  if (!text) return PAVER_COMPETITOR_SETUP_FUEL_L;
  const paren = text.match(/\(([\d.,]+)\s*L\)/i);
  if (paren) {
    const v = parseFloat(paren[1].replace(',', '.'));
    if (!Number.isNaN(v)) return v;
  }
  const nums = parseSpecNumbers(text);
  const literCandidate = nums.find((n) => n > 0 && n < 50);
  return literCandidate ?? PAVER_COMPETITOR_SETUP_FUEL_L;
}

/** Parse "~30 min" or "~60 min" */
export function parseHeatingMinutes(text: string): number {
  if (!text) return 60;
  const nums = parseSpecNumbers(text);
  return nums.length ? nums[0] : 60;
}

export function getMillingProductivityDefaults(machine: MillingMachineSpec): MillingProductivityDefaults {
  const hasBms15l = machine.hasBms15l ?? isBomag(machine.brand);
  return {
    transportCapacityM3h:
      machine.transportCapacityM3h ?? parseMillingTransportCapacity(machine.transportCapacity),
    workingSpeedMmin: machine.workingSpeedMmin ?? parseMillingWorkingSpeed(machine.workingSpeed),
    turningRadiusM:
      machine.turningRadiusM ?? parseMillingTurningRadius(machine.minTurningRadius),
    hasBms15l,
    toolWearCostPerHour: machine.toolWearCostPerHour ?? (hasBms15l ? 15 : 18),
  };
}

function parsePaverWearCostPerHour(financial: PaverFinancialData): number {
  const total3Years = parseEuroAmount(financial.totalReplacements3Years);
  if (total3Years <= 0) return 0;
  return total3Years / (3 * 2000);
}

export function getPaverUspDefaults(machine: PaverMachineSpec): PaverUspDefaults {
  const hasMagmalife =
    machine.hasMagmalife ??
    (/magmalife/i.test(machine.screedHeating) || /magmalife/i.test(machine.financial.heatingType));
  const hasEcomode =
    machine.hasEcomode ?? (/ecomode/i.test(machine.fuelSavingMode) && isBomag(machine.brand));
  const competitorWear = parsePaverWearCostPerHour({
    ...machine.financial,
    totalReplacements3Years: '~24.000 €',
  });

  return {
    hasMagmalife,
    hasEcomode,
    setupFuelLiters: machine.setupFuelLiters ?? parseSetupFuelLiters(machine.financial.co2SetupHeating),
    heatingMinutes: machine.heatingMinutes ?? parseHeatingMinutes(machine.financial.heatingTime),
    wearCostPerHour:
      machine.preventiveMaintenance ??
      (hasMagmalife
        ? parsePaverWearCostPerHour(machine.financial)
        : competitorWear || parsePaverWearCostPerHour(machine.financial)),
  };
}

export function getMillingWearMultiplier(
  machine: MillingMachineSpec,
  bms15lEnabled: boolean
): number {
  const defaults = getMillingProductivityDefaults(machine);
  if (!defaults.hasBms15l || !bms15lEnabled) return 1;
  const pct = machine.wearReductionPercent ?? MILLING_BMS15L_WEAR_REDUCTION * 100;
  return 1 - pct / 100;
}

export function getPaverFuelMultiplier(
  machine: PaverMachineSpec,
  ecomodeEnabled: boolean
): number {
  if (!ecomodeEnabled) return 1;
  const defaults = getPaverUspDefaults(machine);
  if (defaults.hasEcomode) return 1 - PAVER_ECOMODE_FUEL_SAVINGS;
  if (/ecoplus/i.test(machine.fuelSavingMode)) return 0.75;
  if (/variospeed/i.test(machine.fuelSavingMode)) return 0.9;
  return 1;
}

export function getPaverWearCostPerHour(
  machine: PaverMachineSpec,
  magmalifeEnabled: boolean,
  editedWear?: number
): number {
  if (editedWear !== undefined) return editedWear;
  const defaults = getPaverUspDefaults(machine);
  if (magmalifeEnabled && defaults.hasMagmalife) {
    return parsePaverWearCostPerHour(machine.financial);
  }
  const competitorWear = parsePaverWearCostPerHour({
    ...machine.financial,
    totalReplacements3Years: machine.financial.savingsVsBomag3Years
      ? '~24.000 €'
      : machine.financial.totalReplacements3Years,
  });
  return competitorWear > 0 ? competitorWear : defaults.wearCostPerHour;
}

export function getMillingJobHours(volumeM3: number, transportCapacityM3h: number): number | null {
  if (volumeM3 <= 0 || transportCapacityM3h <= 0) return null;
  return volumeM3 / transportCapacityM3h;
}

export function getPaverSetupHeatingCost(
  operationHours: number,
  setupFuelLiters: number,
  fuelPriceUsd: number
): number {
  const shifts = operationHours / PAVER_HOURS_PER_SHIFT;
  return shifts * setupFuelLiters * fuelPriceUsd;
}

export function getPaverCo2PerShiftKg(financial: PaverFinancialData): number | null {
  const text = financial.co2Per10hShift;
  if (!text || /no publicado|n\/d/i.test(text)) return null;
  const nums = parseSpecNumbers(text);
  return nums.length ? nums[0] : null;
}
