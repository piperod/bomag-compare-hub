import type { MillingMachineSpec } from '@/data/millingData';
import type { PaverFinancialData, PaverMachineSpec } from '@/data/paversData';
import {
  parseEuroAmount,
  parseLitersPerHour,
  parsePaverScreedWearPerHour,
} from '@/utils/financialFields';
import { parseSpecNumbers } from '@/utils/paverCompetitiveAdvantage';

export const MILLING_BMS15L_WEAR_REDUCTION = 0.2;
export const PAVER_ECOMODE_FUEL_SAVINGS = 0.17;
export const PAVER_HOURS_PER_SHIFT = 10;
export const PAVER_COMPETITOR_SETUP_FUEL_L = 10.5;
export const PAVER_MAGMALIFE_SETUP_FUEL_L = 3.5;
/** Competitor screed replacements ~24,000 € / 3 years when MAGMALIFE is off. */
export const PAVER_COMPETITOR_WEAR_3Y_EUR = '~24.000 €';

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
  hasFuelSavingMode: boolean;
  setupFuelLiters: number;
  heatingMinutes: number;
  screedWearPerHour: number;
  competitorScreedWearPerHour: number;
  heatingType: string;
  heatingElementLife: string;
  wearPlateLife: string;
}

function isBomag(brand: string): boolean {
  return brand.toUpperCase().includes('BOMAG');
}

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

export function getPaverUspDefaults(machine: PaverMachineSpec): PaverUspDefaults {
  const hasMagmalife =
    machine.hasMagmalife ??
    (/magmalife/i.test(machine.screedHeating) || /magmalife/i.test(machine.financial.heatingType));
  const hasEcomode =
    machine.hasEcomode ?? (/ecomode/i.test(machine.fuelSavingMode) && isBomag(machine.brand));
  const hasFuelSavingMode =
    hasEcomode || /ecoplus|variospeed|eco-mode|ecomode/i.test(machine.fuelSavingMode);
  const screedWearPerHour =
    parsePaverScreedWearPerHour(machine.financial) ||
    (hasMagmalife
      ? parsePaverScreedWearPerHour({ ...machine.financial, totalReplacements3Years: '~8.000 €' })
      : parsePaverScreedWearPerHour({
          ...machine.financial,
          totalReplacements3Years: PAVER_COMPETITOR_WEAR_3Y_EUR,
        }));
  const competitorScreedWearPerHour = parsePaverScreedWearPerHour({
    ...machine.financial,
    totalReplacements3Years: PAVER_COMPETITOR_WEAR_3Y_EUR,
  });

  return {
    hasMagmalife,
    hasEcomode,
    hasFuelSavingMode,
    setupFuelLiters: machine.setupFuelLiters ?? parseSetupFuelLiters(machine.financial.co2SetupHeating),
    heatingMinutes: machine.heatingMinutes ?? parseHeatingMinutes(machine.financial.heatingTime),
    screedWearPerHour,
    competitorScreedWearPerHour,
    heatingType: machine.financial.heatingType,
    heatingElementLife: machine.financial.heatingElementLife,
    wearPlateLife: machine.financial.wearPlateLife,
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
  if (/eco-mode|eco mode/i.test(machine.fuelSavingMode)) return 0.9;
  return 1;
}

/**
 * Screed wear parts cost ($/h). With MAGMALIFE uses machine financial total;
 * without it, uses competitor-level replacement cost (~24k € / 3 years).
 */
export function getPaverScreedWearPerHour(
  machine: PaverMachineSpec,
  magmalifeEnabled: boolean,
  editedWear?: number
): number {
  if (editedWear !== undefined) return editedWear;
  const defaults = getPaverUspDefaults(machine);
  if (magmalifeEnabled && defaults.hasMagmalife) {
    return defaults.screedWearPerHour;
  }
  if (defaults.hasMagmalife && !magmalifeEnabled) {
    return defaults.competitorScreedWearPerHour;
  }
  return defaults.screedWearPerHour || defaults.competitorScreedWearPerHour;
}

/** @deprecated Use getPaverScreedWearPerHour */
export function getPaverWearCostPerHour(
  machine: PaverMachineSpec,
  magmalifeEnabled: boolean,
  editedWear?: number
): number {
  return getPaverScreedWearPerHour(machine, magmalifeEnabled, editedWear);
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

export function getPaverFuelSourceLabel(financial: PaverFinancialData): string {
  return financial.fuelDataSource || '—';
}

/** Operating fuel L/h from financial block (no USP multiplier). */
export function getPaverBaseFuelFromFinancial(machine: PaverMachineSpec): number {
  if (machine.fuelConsumption != null && machine.fuelConsumption > 0) return machine.fuelConsumption;
  const fromAvg = parseLitersPerHour(machine.financial.avgFuelConsumption);
  if (fromAvg > 0) return fromAvg;
  const tenHour = parseFloat(String(machine.financial.fuelConsumption10h).replace(',', '.'));
  if (!Number.isNaN(tenHour) && tenHour > 0) return tenHour / 10;
  return 0;
}

export function getPaverSetupFuelForMagmalife(
  machine: PaverMachineSpec,
  magmalifeEnabled: boolean
): number {
  const defaults = getPaverUspDefaults(machine);
  if (magmalifeEnabled && defaults.hasMagmalife) {
    return defaults.setupFuelLiters || PAVER_MAGMALIFE_SETUP_FUEL_L;
  }
  if (defaults.hasMagmalife && !magmalifeEnabled) {
    return PAVER_COMPETITOR_SETUP_FUEL_L;
  }
  return defaults.setupFuelLiters || PAVER_COMPETITOR_SETUP_FUEL_L;
}

export { parseEuroAmount, parseLitersPerHour, parsePaverScreedWearPerHour };
