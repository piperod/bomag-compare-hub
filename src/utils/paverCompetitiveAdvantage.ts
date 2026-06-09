import { PaverMachineSpec } from '@/data/paversData';

type CompareDir = 'higher' | 'lower';

/** Numeric specs: BOMAG highlighted when best among selected machines */
const PAVER_NUMERIC_RULES: Partial<Record<keyof PaverMachineSpec, CompareDir>> = {
  maxProduction: 'higher',
  pavingSpeed: 'higher',
  maxLayerThickness: 'higher',
  minWorkingWidth: 'lower',
  hopperCapacity: 'higher',
  fuelTankCapacity: 'higher',
  smoothingPlateDepth: 'higher',
  transportLength: 'lower',
};

/** Qualitative specs with documented BOMAG USP advantage */
const PAVER_QUALITATIVE_ADVANTAGES: (keyof PaverMachineSpec)[] = [
  'fuelSavingMode',
  'quickExtensionSystem',
  'screedHeating',
  'pushRollers',
  'gradeControl',
  'operationSystem',
  'centralizedLubrication',
];

function isBomag(brand: string): boolean {
  return brand.toUpperCase().includes('BOMAG');
}

function hasCompetitor(machines: PaverMachineSpec[]): boolean {
  return machines.some((m) => !isBomag(m.brand));
}

export function parseSpecNumbers(value: string): number[] {
  if (!value || value === '-') return [];
  if (/no especificado|not specified|nicht angegeben|não especificado|n\/d|^—$/i.test(value.trim())) return [];

  let s = value;
  s = s.replace(/(\d)\.(\d{3})(?!\d)/g, '$1$2');
  s = s.replace(/,/g, '.');
  const matches = s.match(/\d+(?:\.\d+)?/g);
  if (!matches) return [];
  return matches.map((n) => parseFloat(n)).filter((n) => !Number.isNaN(n));
}

function scoreValue(value: string, dir: CompareDir): number | null {
  const nums = parseSpecNumbers(value);
  if (!nums.length) return null;
  return dir === 'higher' ? Math.max(...nums) : Math.min(...nums);
}

function qualitativeBomagAdvantage(
  specKey: keyof PaverMachineSpec,
  machine: PaverMachineSpec,
  machines: PaverMachineSpec[]
): boolean {
  if (!isBomag(machine.brand) || !hasCompetitor(machines)) return false;

  const value = String(machine[specKey] ?? '');

  if (specKey === 'gradeControl') {
    return machines.some(
      (m) =>
        !isBomag(m.brand) &&
        (/opcional|optional/i.test(String(m.gradeControl)) ||
          /costo adicional|additional cost|mehrkosten|custo adicional/i.test(String(m.gradeControl)))
    );
  }

  if (specKey === 'asphaltFumeExtraction') {
    const bomagHas = value.length > 0 && !/no especificado|not specified|nicht angegeben|não especificado/i.test(value);
    const competitorMissing = machines.some(
      (m) => !isBomag(m.brand) && /no especificado|not specified|nicht angegeben|não especificado/i.test(String(m.asphaltFumeExtraction))
    );
    return bomagHas && competitorMissing;
  }

  if (specKey === 'quickExtensionSystem') {
    return /quick coupling|exclusivo bomag|sin tornillos/i.test(value);
  }

  if (specKey === 'screedHeating') {
    return /magmalife/i.test(value);
  }

  if (specKey === 'operationSystem') {
    return /sideview/i.test(value);
  }

  if (specKey === 'fuelSavingMode') {
    return /ecomode/i.test(value);
  }

  return PAVER_QUALITATIVE_ADVANTAGES.includes(specKey);
}

function numericBomagAdvantage(
  specKey: keyof PaverMachineSpec,
  machine: PaverMachineSpec,
  machines: PaverMachineSpec[]
): boolean {
  const dir = PAVER_NUMERIC_RULES[specKey];
  if (!dir || !isBomag(machine.brand) || !hasCompetitor(machines)) return false;

  const scored = machines
    .map((m) => ({
      brand: m.brand,
      score: scoreValue(String(m[specKey] ?? ''), dir),
    }))
    .filter((s) => s.score !== null) as Array<{ brand: string; score: number }>;

  const bomagScore = scoreValue(String(machine[specKey] ?? ''), dir);
  if (bomagScore === null) return false;

  if (scored.length === 1 && isBomag(scored[0].brand)) {
    const competitorMissing = machines.some(
      (m) =>
        !isBomag(m.brand) &&
        scoreValue(String(m[specKey] ?? ''), dir) === null
    );
    return competitorMissing && isBomag(machine.brand);
  }

  if (scored.length < 2) return false;

  const best =
    dir === 'higher'
      ? Math.max(...scored.map((s) => s.score))
      : Math.min(...scored.map((s) => s.score));

  if (bomagScore !== best) return false;

  const hasWorseCompetitor = scored.some(
    (s) => !isBomag(s.brand) && s.score !== best
  );

  return hasWorseCompetitor;
}

export function paverHasCompetitiveAdvantage(
  specKey: string,
  machine: PaverMachineSpec,
  machines: PaverMachineSpec[]
): boolean {
  const key = specKey as keyof PaverMachineSpec;

  if (PAVER_NUMERIC_RULES[key]) {
    return numericBomagAdvantage(key, machine, machines as PaverMachineSpec[]);
  }

  if (
    PAVER_QUALITATIVE_ADVANTAGES.includes(key) ||
    key === 'asphaltFumeExtraction'
  ) {
    return qualitativeBomagAdvantage(key, machine, machines as PaverMachineSpec[]);
  }

  return false;
}
