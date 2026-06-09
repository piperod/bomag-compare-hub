/**
 * Reads Comparativo_Pavimentadoras_BOMAG.xlsb (or .xlsx) and writes src/data/paversData.ts
 *
 * Usage: node scripts/generate_pavers_from_xlsx.cjs [path-to-xlsb]
 */
const fs = require('fs');
const path = require('path');

const defaultXlsx = path.join(
  process.env.HOME || '',
  'Documents/Bomag/Comparativo_Pavimentadoras_BOMAG.xlsb'
);
const xlsxPath = process.argv[2] || defaultXlsx;
const outPath = path.join(__dirname, '../src/data/paversData.ts');

function loc(text) {
  const s = text != null ? String(text).trim() : '-';
  return { es: s, en: s, de: s, pt: s };
}

function cellStr(val) {
  if (val == null) return '-';
  return String(val).trim() || '-';
}

async function main() {
  let XLSX;
  try {
    XLSX = require('xlsx');
  } catch {
    console.error('Install xlsx: npm install --save-dev xlsx');
    process.exit(1);
  }
  if (!fs.existsSync(xlsxPath)) {
    console.error('File not found:', xlsxPath);
    process.exit(1);
  }
  const wb = XLSX.readFile(xlsxPath);

  const specSheet = wb.Sheets['Especificaciones Técnicas'] || wb.Sheets['Pavers'];
  if (!specSheet) {
    console.error('Spec sheet not found. Sheets:', wb.SheetNames.join(', '));
    process.exit(1);
  }

  const rows = XLSX.utils.sheet_to_json(specSheet, { header: 1, defval: null });
  const brands = rows[1]?.slice(1, 5) || [];
  const models = rows[2]?.slice(1, 5) || [];

  const KEY_MAP = {
    'Motor / fabricante': 'engineManufacturer',
    'Potencia nominal': 'nominalPower',
    'Norma de emisiones': 'emissionStandard',
    'Modo ahorro combustible': 'fuelSavingMode',
    'Tanque de combustible (L)': 'fuelTankCapacity',
    'Producción máxima (t/h)': 'maxProduction',
    'Velocidad de pavimentación': 'pavingSpeed',
    'Velocidad de traslado': 'travelSpeed',
    'Espesor máximo de capa': 'maxLayerThickness',
    'Ancho mínimo de trabajo': 'minWorkingWidth',
    'Ancho base (retractado)': 'baseWidthRetracted',
    'Ancho básico extendido': 'extendedBaseWidth',
    'Ancho máx. con extensiones': 'maxWidthWithExtensions',
    'Capacidad de tolva': 'hopperCapacity',
    'Diámetro sinfín': 'augerDiameter',
    'Cintas transportadoras': 'conveyors',
    'Rodillos de empuje': 'pushRollers',
    'Tipos de regla disponibles': 'screedTypes',
    'Calefacción de regla': 'screedHeating',
    'Freq. tamper / vibración': 'tamperVibrationFreq',
    'Sistema ampliac. rápida': 'quickExtensionSystem',
    'Profundidad chapa alisado': 'smoothingPlateDepth',
    'Peso operativo': 'operatingWeight',
    'Longitud de transporte': 'transportLength',
    'Ancho de transporte': 'transportWidth',
    'Altura de transporte': 'transportHeight',
    'Sistema de operación': 'operationSystem',
    'Control de nivelación': 'gradeControl',
    'Telemática / conectividad': 'telematics',
    'Extracción de vapores asfalto': 'asphaltFumeExtraction',
    'Lubricación centralizada': 'centralizedLubrication',
  };

  const machines = [];
  for (let col = 1; col <= 4; col++) {
    const m = { brand: String(brands[col - 1] || ''), model: String(models[col - 1] || '') };
    for (const row of rows) {
      const label = row[0] != null ? String(row[0]).trim() : '';
      if (!KEY_MAP[label]) continue;
      const val = row[col];
      m[KEY_MAP[label]] = val != null ? String(val).trim() : '-';
    }
    m.engine = (m.nominalPower || m.model).split('\n')[0];
    machines.push(m);
  }

  // USP sheet — columns: BOMAG, CAT, Vögele, Dynapac (Excel order)
  const uspSheet = wb.Sheets['Propuestas de Valor Único (USP)'];
  if (uspSheet) {
    const uspRows = XLSX.utils.sheet_to_json(uspSheet, { header: 1, defval: null });
    const excelBrandOrder = ['BOMAG', 'CATERPILLAR', 'VÖGELE', 'DYNAPAC'];
    const brandNorm = (b) => String(b).toUpperCase().replace('Ö', 'O').replace('Ü', 'U');
    for (let uspIdx = 2; uspIdx <= 10; uspIdx++) {
      const row = uspRows[uspIdx];
      if (!row) continue;
      const uspKey = `usp${uspIdx - 1}`;
      for (let col = 0; col < 4; col++) {
        const machine = machines.find(
          (m) => brandNorm(m.brand).includes(brandNorm(excelBrandOrder[col]).slice(0, 4))
        );
        if (machine) {
          machine[uspKey] = loc(row[col + 2]);
        }
      }
    }
  }

  // Combustible y Desgaste — columns: BOMAG, CAT, Vögele, Dynapac
  const finSheet = wb.Sheets['Combustible y Desgaste'];
  const FIN_FUEL_KEYS = [
    'avgFuelConsumption',
    'fuelDataSource',
    'fuelConsumption10h',
    'co2Per10hShift',
    'fuelSavingsPerDay',
    'co2SavingsPerDay',
  ];
  const FIN_WEAR_KEYS = [
    'heatingType',
    'heatingTime',
    'heatingElementLife',
    'wearPlateLife',
    'replacementCycle',
    'replacementCostYear1',
    'replacementCostYear2',
    'replacementCostYear3',
    'totalReplacements3Years',
    'savingsVsBomag3Years',
    'co2SetupHeating',
  ];
  if (finSheet) {
    const finRows = XLSX.utils.sheet_to_json(finSheet, { header: 1, defval: null });
    const excelBrandOrder = ['BOMAG', 'CATERPILLAR', 'VÖGELE', 'DYNAPAC'];
    const brandNorm = (b) => String(b).toUpperCase().replace('Ö', 'O').replace('Ü', 'U');
    for (const m of machines) {
      m.financial = {};
    }
    for (let i = 0; i < FIN_FUEL_KEYS.length; i++) {
      const row = finRows[3 + i];
      if (!row) continue;
      for (let col = 0; col < 4; col++) {
        const machine = machines.find(
          (m) => brandNorm(m.brand).includes(brandNorm(excelBrandOrder[col]).slice(0, 4))
        );
        if (machine) {
          machine.financial[FIN_FUEL_KEYS[i]] = cellStr(row[col + 1]);
        }
      }
    }
    for (let i = 0; i < FIN_WEAR_KEYS.length; i++) {
      const row = finRows[12 + i];
      if (!row) continue;
      for (let col = 0; col < 4; col++) {
        const machine = machines.find(
          (m) => brandNorm(m.brand).includes(brandNorm(excelBrandOrder[col]).slice(0, 4))
        );
        if (machine) {
          machine.financial[FIN_WEAR_KEYS[i]] = cellStr(row[col + 1]);
        }
      }
    }
  }

  const header = `/**
 * Paver specifications from Comparativo_Pavimentadoras_BOMAG.xlsb.
 * Regenerate: node scripts/generate_pavers_from_xlsx.cjs
 */
export interface LocalizedText {
  es: string;
  en: string;
  de: string;
  pt: string;
}

export interface PaverFinancialData {
  avgFuelConsumption: string;
  fuelDataSource: string;
  fuelConsumption10h: string;
  co2Per10hShift: string;
  fuelSavingsPerDay: string;
  co2SavingsPerDay: string;
  heatingType: string;
  heatingTime: string;
  heatingElementLife: string;
  wearPlateLife: string;
  replacementCycle: string;
  replacementCostYear1: string;
  replacementCostYear2: string;
  replacementCostYear3: string;
  totalReplacements3Years: string;
  savingsVsBomag3Years: string;
  co2SetupHeating: string;
}

export interface PaverMachineSpec {
  brand: string;
  model: string;
  engine: string;
  engineManufacturer: string;
  nominalPower: string;
  emissionStandard: string;
  fuelSavingMode: string;
  fuelTankCapacity: string;
  maxProduction: string;
  pavingSpeed: string;
  travelSpeed: string;
  maxLayerThickness: string;
  minWorkingWidth: string;
  baseWidthRetracted: string;
  extendedBaseWidth: string;
  maxWidthWithExtensions: string;
  hopperCapacity: string;
  augerDiameter: string;
  conveyors: string;
  pushRollers: string;
  screedTypes: string;
  screedHeating: string;
  tamperVibrationFreq: string;
  quickExtensionSystem: string;
  smoothingPlateDepth: string;
  operatingWeight: string;
  transportLength: string;
  transportWidth: string;
  transportHeight: string;
  operationSystem: string;
  gradeControl: string;
  telematics: string;
  asphaltFumeExtraction: string;
  centralizedLubrication: string;
  usp1: LocalizedText;
  usp2: LocalizedText;
  usp3: LocalizedText;
  usp4: LocalizedText;
  usp5: LocalizedText;
  usp6: LocalizedText;
  usp7: LocalizedText;
  usp8: LocalizedText;
  usp9: LocalizedText;
  financial: PaverFinancialData;
}

export const paversMachines: PaverMachineSpec[] = `;

  fs.writeFileSync(outPath, header + JSON.stringify(machines, null, 2) + ';\n', 'utf8');
  console.log('Wrote', outPath, `(${machines.length} machines)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
