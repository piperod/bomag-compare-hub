/**
 * Models added from "Comparison - BOMAG TCO Master (EN).xlsx" (TCO_Master export of 2026-09-02,
 * plus WIRTGEN brochures and the VOLVO CE / DYNAPAC product-range files merged 2026-09-14).
 *
 * Only models that were NOT already in the app are listed here; existing models are untouched.
 * VOLVO / DYNAPAC / WIRTGEN rows come from brochures without pricing, so their TCO inputs
 * (price, maintenance, fuel, residual value) are 0 by design and stay editable in the
 * Financial Analysis tab — the same model used for SDR and Pavers.
 */
import type { MachineSpec } from './machineData';
import type { MillingMachineSpec } from './millingData';
import type { LocalizedText, PaverFinancialData, PaverMachineSpec } from './paversData';

const loc = (es: string, en: string, de: string, pt: string): LocalizedText => ({ es, en, de, pt });
const same = (s: string): LocalizedText => ({ es: s, en: s, de: s, pt: s });
const NONE = same('-');
const EMPTY = same('');

const ORIGIN = {
  sweden: loc('Suecia', 'Sweden', 'Schweden', 'Suécia'),
  brazil: loc('Brasil', 'Brazil', 'Brasilien', 'Brasil'),
  india: loc('India', 'India', 'Indien', 'Índia'),
  china: loc('China', 'China', 'China', 'China'),
  usa: loc('EE. UU.', 'USA', 'USA', 'EUA'),
};

const STEEL_DRUM = loc('Rodillo de tambor liso', 'Steel drum roller', 'Glattmantelwalze', 'Rolo de tambor liso');
const PADFOOT = loc('Tambor pata de cabra', 'Padfoot drum', 'Schaffußbandage', 'Tambor pé de carneiro');
const COMBINATION_ROLLER = loc(
  'Rodillo combinado (1 tambor de acero + 1 eje de neumáticos)',
  'Combination roller (1 steel drum + 1 rubber-tired drum)',
  'Kombiwalze (1 Stahlbandage + 1 Gummiradachse)',
  'Rolo combinado (1 tambor de aço + 1 eixo de pneus)'
);
const WHEEL_ARTICULATION = loc(
  'Articulación de la rueda',
  'Articulation of the wheel',
  'Radgelenk',
  'Articulação da roda'
);

// ---------------------------------------------------------------------------
// SDR — Single Drum Rollers (12 DYNAPAC models)
// ---------------------------------------------------------------------------

type SdrRow = {
  model: string;
  weight: number;
  engine: string;
  compactionWidth: number;
  power: number;
  origin: LocalizedText;
  innovations?: LocalizedText;
  amplitude?: string;
  staticLinearLoad?: number;
  gradeability?: number;
  compactionAssistant?: LocalizedText;
};

const sdrRow = (r: SdrRow): MachineSpec => ({
  brand: 'DYNAPAC',
  model: r.model,
  weight: r.weight,
  engine: r.engine,
  compactionWidth: r.compactionWidth,
  power: r.power,
  amplitude: r.amplitude ?? '-',
  staticLinearLoad: r.staticLinearLoad ?? 0,
  ...(r.gradeability ? { gradeability: r.gradeability } : {}),
  origin: r.origin,
  compactionAssistant: r.compactionAssistant ?? NONE,
  telemetry: NONE,
  innovations: r.innovations ?? NONE,
  usp: EMPTY,
  fuelConsumption: 0,
  price: 0,
  preventiveMaintenance: 0,
  correctiveMaintenance: 0,
  usageTime: 3000,
  tco: 0,
});

const SEISMIC_SOIL = loc(
  'SEISMIC (disponible): ajusta automáticamente la frecuencia de vibración a la frecuencia natural del material',
  'SEISMIC (available): automatically adjusts the vibration frequency to the natural frequency of the material',
  'SEISMIC (verfügbar): passt die Vibrationsfrequenz automatisch an die Eigenfrequenz des Materials an',
  'SEISMIC (disponível): ajusta automaticamente a frequência de vibração à frequência natural do material'
);

const CA5000D_SPECS = {
  model: 'CA5000D', weight: 16000, compactionWidth: 2.13, origin: ORIGIN.sweden,
  amplitude: '2,1 / 0,8', staticLinearLoad: 50, gradeability: 49, compactionAssistant: SEISMIC_SOIL,
  innovations: loc(
    'Motor Cummins B4.5 Stage V/T4F (149 kW / 200 hp) o Deutz TCD2012L06 Tier 3 (128 kW / 174 hp) · Fuerza centrífuga 330/140 kN · Frecuencia 29/30 Hz · Oscilación ±9° · Tanque de combustible 255 l · Con cabina 16.200 kg',
    'Cummins B4.5 Stage V/T4F (149 kW / 200 hp) or Deutz TCD2012L06 Tier 3 (128 kW / 174 hp) engine · Centrifugal force 330/140 kN · Frequency 29/30 Hz · Oscillation ±9° · Fuel tank 255 l · With cab 16,200 kg',
    'Motor Cummins B4.5 Stufe V/T4F (149 kW / 200 PS) oder Deutz TCD2012L06 Tier 3 (128 kW / 174 PS) · Zentrifugalkraft 330/140 kN · Frequenz 29/30 Hz · Pendelung ±9° · Kraftstofftank 255 l · Mit Kabine 16.200 kg',
    'Motor Cummins B4.5 Stage V/T4F (149 kW / 200 hp) ou Deutz TCD2012L06 Tier 3 (128 kW / 174 hp) · Força centrífuga 330/140 kN · Frequência 29/30 Hz · Oscilação ±9° · Tanque de combustível 255 l · Com cabine 16.200 kg'
  ),
};

const CA6500D_SPECS = {
  model: 'CA6500D', weight: 20700, compactionWidth: 2.13, origin: ORIGIN.sweden,
  amplitude: '2,1 / 0,8', staticLinearLoad: 65, gradeability: 45, compactionAssistant: SEISMIC_SOIL,
  innovations: loc(
    'Motor Cummins B4.5 Stage V/T4F (149 kW / 200 hp) o Deutz TCD2012L06 Tier 3 (150 kW / 204 hp) · Fuerza centrífuga 360/150 kN · Frecuencia 29/30 Hz · Oscilación ±9° · Tanque de combustible 255 l · Con cabina 20.900 kg',
    'Cummins B4.5 Stage V/T4F (149 kW / 200 hp) or Deutz TCD2012L06 Tier 3 (150 kW / 204 hp) engine · Centrifugal force 360/150 kN · Frequency 29/30 Hz · Oscillation ±9° · Fuel tank 255 l · With cab 20,900 kg',
    'Motor Cummins B4.5 Stufe V/T4F (149 kW / 200 PS) oder Deutz TCD2012L06 Tier 3 (150 kW / 204 PS) · Zentrifugalkraft 360/150 kN · Frequenz 29/30 Hz · Pendelung ±9° · Kraftstofftank 255 l · Mit Kabine 20.900 kg',
    'Motor Cummins B4.5 Stage V/T4F (149 kW / 200 hp) ou Deutz TCD2012L06 Tier 3 (150 kW / 204 hp) · Força centrífuga 360/150 kN · Frequência 29/30 Hz · Oscilação ±9° · Tanque de combustível 255 l · Com cabine 20.900 kg'
  ),
};

export const sdrMasterAdditions: MachineSpec[] = [
  sdrRow({ model: 'CS1400', weight: 7400, engine: 'Deutz TD 3.6 L4 IIIB/T4f', compactionWidth: 2.1, power: 73.8, origin: ORIGIN.sweden, innovations: STEEL_DRUM }),
  sdrRow({ model: 'CS1400N', weight: 8390, engine: 'Deutz TD 3.6 L4 IIIB/T4f', compactionWidth: 2.1, power: 73.8, origin: ORIGIN.sweden, innovations: STEEL_DRUM }),
  sdrRow({
    model: 'CT3000',
    weight: 22500,
    engine: 'Cummins QSB 6.7 (Tier 3 or 4F)',
    compactionWidth: 3.49,
    power: 260.2,
    origin: ORIGIN.brazil,
    innovations: loc(
      'Compactador de pata de cabra / apisonador',
      'Tamping/padfoot compactor',
      'Stampffuß-/Schaffußverdichter',
      'Compactador pé de carneiro / apiloador'
    ),
  }),
  // Completed from the DYNAPAC CA1300D datasheet (rce_ca1300d_en, 2021-05-21).
  sdrRow({
    model: 'CA1300D', weight: 4800, engine: 'Kubota V3307 CR-TE4 (Stage IIIB/Tier 4)', compactionWidth: 1.37, power: 73.8, origin: ORIGIN.sweden,
    amplitude: '1,7', staticLinearLoad: 13, gradeability: 55,
    innovations: loc(
      'Fuerza centrífuga 89 kN · Frecuencia 35 Hz · Oscilación ±9° · Tanque de combustible 117 l · Peso máx. 5.300 kg',
      'Centrifugal force 89 kN · Frequency 35 Hz · Oscillation ±9° · Fuel tank 117 l · Max. mass 5,300 kg',
      'Zentrifugalkraft 89 kN · Frequenz 35 Hz · Pendelung ±9° · Kraftstofftank 117 l · Max. Gewicht 5.300 kg',
      'Força centrífuga 89 kN · Frequência 35 Hz · Oscilação ±9° · Tanque de combustível 117 l · Peso máx. 5.300 kg'
    ),
  }),
  sdrRow({ model: 'CA2500D', weight: 10100, engine: 'Cummins QSF3.8 (IV/T4 final)', compactionWidth: 2.13, power: 119.4, origin: ORIGIN.sweden }),
  // Completed from the DYNAPAC CA25D Rhino datasheet (dynapac_ca25d_sa-es, 2025-03-07), Cummins QSF3.8 Tier 3 version.
  sdrRow({
    model: 'CA25D',
    weight: 10400,
    engine: 'Cummins QSF3.8 (IIIA/T3)',
    compactionWidth: 2.13,
    power: 130.1,
    origin: ORIGIN.india,
    amplitude: '1,8 / 0,9',
    staticLinearLoad: 26,
    gradeability: 41,
    innovations: loc(
      'Línea regional (vs. CA2500D fabricado en Suecia) · CA25D Rhino · Fuerza centrífuga 250/123 kN · Frecuencia 33 Hz · Oscilación ±9° · Tanque de combustible 280 l · Pendiente 34/41 % (tambor liso) y 52/55 % (pata de cabra) · Motores alternativos: Cummins F3.8 Stage V (150 hp) y Cummins 4BT3.9 Tier 1 (102 hp)',
      'Regional line (vs. Sweden-made CA2500D) · CA25D Rhino · Centrifugal force 250/123 kN · Frequency 33 Hz · Oscillation ±9° · Fuel tank 280 l · Gradeability 34/41 % (smooth drum) and 52/55 % (padfoot) · Alternative engines: Cummins F3.8 Stage V (150 hp) and Cummins 4BT3.9 Tier 1 (102 hp)',
      'Regionale Linie (vs. in Schweden gefertigte CA2500D) · CA25D Rhino · Zentrifugalkraft 250/123 kN · Frequenz 33 Hz · Pendelung ±9° · Kraftstofftank 280 l · Steigfähigkeit 34/41 % (Glattbandage) und 52/55 % (Schaffuß) · Alternative Motoren: Cummins F3.8 Stufe V (150 PS) und Cummins 4BT3.9 Tier 1 (102 PS)',
      'Linha regional (vs. CA2500D fabricado na Suécia) · CA25D Rhino · Força centrífuga 250/123 kN · Frequência 33 Hz · Oscilação ±9° · Tanque de combustível 280 l · Rampa 34/41 % (tambor liso) e 52/55 % (pé de carneiro) · Motores alternativos: Cummins F3.8 Stage V (150 hp) e Cummins 4BT3.9 Tier 1 (102 hp)'
    ),
  }),
  // Completed from the DYNAPAC CA3500D datasheet (dynapac_ca3500d_en, 2025-03-10). The master file listed
  // "Cummins QSF3.8 (IV/T4 final)" with 130 hp; the datasheet gives 130 hp for the Cummins QSB4.5 (IIIA/Tier 3)
  // engine, and 135 hp for the alternative Cummins F3.8 (Stage V/T4F).
  sdrRow({
    model: 'CA3500D', weight: 11900, engine: 'Cummins QSB4.5 (IIIA/T3)', compactionWidth: 2.13, power: 130, origin: ORIGIN.sweden,
    amplitude: '1,9 / 0,9', staticLinearLoad: 36, gradeability: 55,
    compactionAssistant: SEISMIC_SOIL,
    innovations: loc(
      'Motor Cummins QSB4.5 Tier 3 (97 kW / 130 hp) u opcional Cummins F3.8 Stage V/T4F (100 kW / 135 hp) · Fuerza centrífuga 280/170 kN · Frecuencia 31/34 Hz · Oscilación ±9° · Tanque de combustible 255 l · Con cabina 12.100 kg',
      'Cummins QSB4.5 Tier 3 engine (97 kW / 130 hp) or optional Cummins F3.8 Stage V/T4F (100 kW / 135 hp) · Centrifugal force 280/170 kN · Frequency 31/34 Hz · Oscillation ±9° · Fuel tank 255 l · With cab 12,100 kg',
      'Motor Cummins QSB4.5 Tier 3 (97 kW / 130 PS) oder optional Cummins F3.8 Stufe V/T4F (100 kW / 135 PS) · Zentrifugalkraft 280/170 kN · Frequenz 31/34 Hz · Pendelung ±9° · Kraftstofftank 255 l · Mit Kabine 12.100 kg',
      'Motor Cummins QSB4.5 Tier 3 (97 kW / 130 hp) ou opcional Cummins F3.8 Stage V/T4F (100 kW / 135 hp) · Força centrífuga 280/170 kN · Frequência 31/34 Hz · Oscilação ±9° · Tanque de combustível 255 l · Com cabine 12.100 kg'
    ),
  }),
  // CA5000D / CA6500D completed from the DYNAPAC datasheets (dynapac_ca5000d_en 2025-08-06, dynapac_ca6500d_en 2022-12-12).
  // Both list a Cummins B4.5 Stage V/T4F engine and a Deutz TCD2012L06 Stage IIIA/Tier 3 engine, so each engine is its own row.
  sdrRow({ ...CA5000D_SPECS, engine: 'Cummins B4.5 (Stage V/T4 final)', power: 199.8 }),
  sdrRow({ ...CA5000D_SPECS, engine: 'Deutz TCD2012L06 (IIIA/T3)', power: 174 }),
  sdrRow({ ...CA6500D_SPECS, engine: 'Cummins B4.5 (Stage V/T4 final)', power: 199.8 }),
  sdrRow({ ...CA6500D_SPECS, engine: 'Deutz TCD2012L06 (IIIA/T3)', power: 204 }),
  sdrRow({ model: 'CA2500PD', weight: 11000, engine: 'Cummins F3.8 (V)', compactionWidth: 2.13, power: 134.1, origin: ORIGIN.sweden, innovations: PADFOOT }),
  sdrRow({ model: 'CA4000PD', weight: 13100, engine: 'Cummins QSB4.5 (Stage IIIA/T3)', compactionWidth: 2.13, power: 171.7, origin: ORIGIN.sweden, innovations: PADFOOT }),
  sdrRow({ model: 'CA5500PD', weight: 18000, engine: 'Cummins B4.5 (Stage V/T4 final)', compactionWidth: 2.13, power: 199.8, origin: ORIGIN.sweden, innovations: PADFOOT }),
];

// ---------------------------------------------------------------------------
// LTR — Light Tandem Rollers (7 DYNAPAC + 1 VOLVO)
// ---------------------------------------------------------------------------

type LtrRow = {
  brand: string;
  model: string;
  weight: number;
  engine: string;
  compactionWidth: number;
  power: number;
  origin: LocalizedText;
  amplitude?: string;
  staticLinearLoad?: number;
  waterTankCapacity?: number;
  gradeability?: number;
  innovations?: LocalizedText;
  articulated?: boolean;
};

const ltrRow = (r: LtrRow): MachineSpec => ({
  brand: r.brand,
  model: r.model,
  weight: r.weight,
  engine: r.engine,
  compactionWidth: r.compactionWidth,
  power: r.power,
  amplitude: r.amplitude ?? '-',
  staticLinearLoad: r.staticLinearLoad ?? 0,
  ...(r.gradeability ? { gradeability: r.gradeability } : {}),
  origin: r.origin,
  compactionAssistant: NONE,
  innovations: r.innovations ?? NONE,
  usp: EMPTY,
  fuelConsumption: 0,
  price: 0,
  preventiveMaintenance: 0,
  correctiveMaintenance: 0,
  usageTime: 3500,
  tco: 0,
  compactionSystem: 'Vibratory',
  ...(r.waterTankCapacity ? { waterTankCapacity: r.waterTankCapacity } : {}),
  ...(r.articulated ? { articulationJoint: WHEEL_ARTICULATION } : {}),
});

export const ltrMasterAdditions: MachineSpec[] = [
  // Completed from the DYNAPAC CC900G datasheet (dynapac_cc900g_en, 2024-05-09).
  // Static linear load: 6.1 kg/cm front / 7.9 kg/cm rear (rear value shown).
  ltrRow({
    brand: 'DYNAPAC', model: 'CC900G', weight: 1250, engine: 'Honda GX630RH QYD', compactionWidth: 0.9, power: 19,
    origin: ORIGIN.china, amplitude: '0.4', staticLinearLoad: 7.9, waterTankCapacity: 190, gradeability: 35,
    innovations: loc(
      'Motor a gasolina de 4 tiempos · Fuerza centrífuga 16,7 kN a 70 Hz · Oscilación vertical ±6° · Tanque de combustible 23 l',
      '4-stroke gasoline engine · Centrifugal force 16.7 kN at 70 Hz · Vertical oscillation ±6° · Fuel tank 23 l',
      '4-Takt-Benzinmotor · Zentrifugalkraft 16,7 kN bei 70 Hz · Vertikale Pendelung ±6° · Kraftstofftank 23 l',
      'Motor a gasolina de 4 tempos · Força centrífuga 16,7 kN a 70 Hz · Oscilação vertical ±6° · Tanque de combustível 23 l'
    ),
  }),
  ltrRow({ brand: 'DYNAPAC', model: 'CC1000', weight: 1685, engine: 'Kubota D1105', compactionWidth: 1, power: 24.1, origin: ORIGIN.sweden }),
  ltrRow({ brand: 'DYNAPAC', model: 'CC1200 VI', weight: 2600, engine: 'Kubota D1703-M (IIIA)', compactionWidth: 1.2, power: 34.9, origin: ORIGIN.china }),
  ltrRow({
    brand: 'DYNAPAC', model: 'CC1300', weight: 3900, engine: 'Kubota V2203-M (IIIA)', compactionWidth: 1.3, power: 46.9,
    origin: ORIGIN.sweden, amplitude: '0.5', staticLinearLoad: 15, waterTankCapacity: 298, articulated: true,
  }),
  ltrRow({
    brand: 'DYNAPAC', model: 'CC1400 VI', weight: 4300, engine: 'Kubota V2203-M (IIIA)', compactionWidth: 1.38, power: 46.9,
    origin: ORIGIN.sweden, amplitude: '0.5', staticLinearLoad: 15.6, waterTankCapacity: 298, articulated: true,
  }),
  ltrRow({
    brand: 'DYNAPAC', model: 'CC1000C VI', weight: 1685, engine: 'Kubota D1105', compactionWidth: 1, power: 24.1,
    origin: ORIGIN.sweden, amplitude: '0.51', staticLinearLoad: 7.9, waterTankCapacity: 197, articulated: true,
    innovations: COMBINATION_ROLLER,
  }),
  ltrRow({
    brand: 'DYNAPAC', model: 'CC1400C VI', weight: 4300, engine: 'Kubota V2203-M (IIIA)', compactionWidth: 1.38, power: 46.9,
    origin: ORIGIN.sweden, amplitude: '0.5', staticLinearLoad: 15.1, waterTankCapacity: 298, articulated: true,
    innovations: COMBINATION_ROLLER,
  }),
  ltrRow({
    brand: 'VOLVO', model: 'DD15', weight: 1529, engine: 'Kubota D722', compactionWidth: 0.9, power: 16.6,
    origin: ORIGIN.usa, amplitude: '0.37', staticLinearLoad: 8.4, waterTankCapacity: 197, articulated: true,
  }),
];

// ---------------------------------------------------------------------------
// HTR — Heavy Tandem Rollers (6 DYNAPAC)
// ---------------------------------------------------------------------------

export type HtrMachineSpec = MachineSpec & {
  asphaltManager: LocalizedText;
  vibrationSystems: LocalizedText;
  maintenanceJoint: LocalizedText;
};

type HtrRow = {
  model: string;
  weight: number;
  engine: string;
  compactionWidth: number;
  power: number;
  origin?: LocalizedText;
  innovations?: LocalizedText;
};

const htrRow = (r: HtrRow): HtrMachineSpec => ({
  brand: 'DYNAPAC',
  model: r.model,
  weight: r.weight,
  engine: r.engine,
  compactionWidth: r.compactionWidth,
  power: r.power,
  amplitude: '-',
  staticLinearLoad: 0,
  origin: r.origin ?? NONE,
  compactionAssistant: NONE,
  asphaltManager: NONE,
  telemetry: NONE,
  innovations: r.innovations ?? NONE,
  vibrationSystems: NONE,
  maintenanceJoint: NONE,
  usp: r.innovations ?? EMPTY,
  fuelConsumption: 0,
  price: 0,
  preventiveMaintenance: 0,
  correctiveMaintenance: 0,
  usageTime: 2000,
  tco: 0,
});

export const htrMasterAdditions: HtrMachineSpec[] = [
  htrRow({ model: 'CC2200', weight: 7600, engine: 'Cummins QSB 3.3 IIIA/T3', compactionWidth: 1.5, power: 99.2, origin: ORIGIN.india }),
  htrRow({ model: 'CC3300', weight: 9000, engine: 'Deutz TCD 3.6 HT T4f', compactionWidth: 1.73, power: 73.8, origin: ORIGIN.sweden }),
  htrRow({ model: 'CC4200', weight: 10200, engine: 'Water cooled turbo Diesel', compactionWidth: 1.73, power: 110, origin: ORIGIN.brazil }),
  htrRow({ model: 'CC5200', weight: 11300, engine: 'Cummins QSB 4.5 IIIB/T4i', compactionWidth: 1.95, power: 130.1, origin: ORIGIN.china }),
  htrRow({ model: 'CC6200', weight: 12400, engine: 'Cummins QSB 4.5 IIIB/T4i', compactionWidth: 2.13, power: 159.6, origin: ORIGIN.china }),
  htrRow({ model: 'CC5200C VI', weight: 10310, engine: 'Cummins QSF3.8 IV/T4f', compactionWidth: 1.95, power: 130.1, innovations: COMBINATION_ROLLER }),
];

// ---------------------------------------------------------------------------
// PTR — Pneumatic Tired Rollers (new product line: BOMAG, HAMM, DYNAPAC, VOLVO)
// BOMAG BW 24/27/28 RH and HAMM HP 180 come from their datasheets; DYNAPAC/VOLVO from the TCO master file.
// ---------------------------------------------------------------------------

const FIVE_FRONT_FOUR_REAR = loc('5 delanteras, 4 traseras', '5 front, 4 rear', '5 vorne, 4 hinten', '5 dianteiras, 4 traseiras');

type PtrRow = {
  brand: string;
  model: string;
  weight: number;
  engine?: string;
  rollingWidth: number;
  power: number;
  numberOfWheels: LocalizedText;
  origin?: LocalizedText;
  gradeability?: number;
  innovations?: LocalizedText;
};

const ptrRow = (r: PtrRow): MachineSpec => ({
  brand: r.brand,
  model: r.model,
  weight: r.weight,
  engine: r.engine ?? '-',
  compactionWidth: r.rollingWidth,
  power: r.power,
  amplitude: '-',
  staticLinearLoad: 0,
  ...(r.gradeability ? { gradeability: r.gradeability } : {}),
  origin: r.origin ?? NONE,
  compactionAssistant: NONE,
  innovations: r.innovations ?? NONE,
  usp: EMPTY,
  numberOfWheels: r.numberOfWheels,
  fuelConsumption: 0,
  price: 0,
  preventiveMaintenance: 0,
  correctiveMaintenance: 0,
  usageTime: 3000,
  tco: 0,
});

const FOUR_FRONT_FOUR_REAR = loc('4 delanteras, 4 traseras', '4 front, 4 rear', '4 vorne, 4 hinten', '4 dianteiras, 4 traseiras');

const bomagRhNotes = (maxKg: string, maxKgEn: string, speed: string, fuel: string, water: string) => loc(
  `Peso máx. con lastre ${maxKg} kg · Velocidad ${speed} km/h · Tanque de combustible ${fuel} l · Tanque de agua ${water} l · Neumáticos 11,00-20 · Rociado a presión`,
  `Max. ballasted weight ${maxKgEn} kg · Speed ${speed} km/h · Fuel tank ${fuel} l · Water tank ${water} l · Tyres 11.00-20 · Pressure spraying`,
  `Max. Gewicht mit Ballast ${maxKg} kg · Geschwindigkeit ${speed} km/h · Kraftstofftank ${fuel} l · Wassertank ${water} l · Reifen 11,00-20 · Druckberieselung`,
  `Peso máx. com lastro ${maxKg} kg · Velocidade ${speed} km/h · Tanque de combustível ${fuel} l · Tanque de água ${water} l · Pneus 11,00-20 · Aspersão sob pressão`
);

export const ptrMachines: MachineSpec[] = [
  // BOMAG datasheets PRS53800010 Sa06 (BW 24 RH / BW 27 RH) and PRS53842010 Sa05 (BW 28 RH)
  ptrRow({
    brand: 'BOMAG', model: 'BW 24 RH', weight: 8800, engine: 'Deutz TCD 2012 L04 2V (Stage IIIa/Tier 3)', rollingWidth: 2.04,
    power: 100.4, numberOfWheels: FOUR_FRONT_FOUR_REAR, gradeability: 30,
    innovations: bomagRhNotes('24.000', '24,000', '0-20', '250', '400'),
  }),
  ptrRow({
    brand: 'BOMAG', model: 'BW 27 RH', weight: 8800, engine: 'Deutz TCD 2012 L04 2V (Stage IIIa/Tier 3)', rollingWidth: 2.04,
    power: 134.1, numberOfWheels: FOUR_FRONT_FOUR_REAR, gradeability: 27,
    innovations: bomagRhNotes('27.000', '27,000', '0-20', '250', '400'),
  }),
  ptrRow({
    brand: 'BOMAG', model: 'BW 28 RH', weight: 8600, engine: 'Deutz TCD 2012 L04 2V (Stage IIIa/Tier 3)', rollingWidth: 2.05,
    power: 123, numberOfWheels: FOUR_FRONT_FOUR_REAR, gradeability: 27,
    innovations: loc(
      'Peso máx. con lastre 28.000 kg · Velocidad 0-19 km/h · Tanque de combustible 200 l · Tanque de agua 340 l · Neumáticos 11,00-20 · BOMAG ECOMODE de serie',
      'Max. ballasted weight 28,000 kg · Speed 0-19 km/h · Fuel tank 200 l · Water tank 340 l · Tyres 11.00-20 · BOMAG ECOMODE standard',
      'Max. Gewicht mit Ballast 28.000 kg · Geschwindigkeit 0-19 km/h · Kraftstofftank 200 l · Wassertank 340 l · Reifen 11,00-20 · BOMAG ECOMODE serienmäßig',
      'Peso máx. com lastro 28.000 kg · Velocidade 0-19 km/h · Tanque de combustível 200 l · Tanque de água 340 l · Pneus 11,00-20 · BOMAG ECOMODE de série'
    ),
  }),
  // HAMM HP 180 (H248) datasheet, 2026
  ptrRow({
    brand: 'HAMM', model: 'HP 180', weight: 8505, engine: 'Deutz TCD 2012 L04 2V (Tier 3 / MAR-1)', rollingWidth: 2.08,
    power: 119.3, numberOfWheels: FOUR_FRONT_FOUR_REAR, gradeability: 25,
    innovations: loc(
      'Peso máx. con lastre 17.170 kg · Velocidad 0-19 km/h · Tanque de combustible 235 l · Tanque de agua 650 l · Neumáticos 11.00-R20 · Pendiente 25/35 % (con/sin lastre) · Modo ECO · HAMMTRONIC',
      'Max. ballasted weight 17,170 kg · Speed 0-19 km/h · Fuel tank 235 l · Water tank 650 l · Tyres 11.00-R20 · Gradeability 25/35 % (with/without ballast) · ECO mode · HAMMTRONIC',
      'Max. Gewicht mit Ballast 17.170 kg · Geschwindigkeit 0-19 km/h · Kraftstofftank 235 l · Wassertank 650 l · Reifen 11.00-R20 · Steigfähigkeit 25/35 % (mit/ohne Ballast) · ECO-Modus · HAMMTRONIC',
      'Peso máx. com lastro 17.170 kg · Velocidade 0-19 km/h · Tanque de combustível 235 l · Tanque de água 650 l · Pneus 11.00-R20 · Rampa 25/35 % (com/sem lastro) · Modo ECO · HAMMTRONIC'
    ),
  }),
  ptrRow({ brand: 'DYNAPAC', model: 'CP1200', weight: 5550, engine: 'Cummins QSF 2.8 (Stage IIIB/Tier 4 final)', rollingWidth: 1.76, power: 73.8, numberOfWheels: FIVE_FRONT_FOUR_REAR, origin: ORIGIN.brazil }),
  ptrRow({ brand: 'DYNAPAC', model: 'CP2100', weight: 10400, engine: 'Cummins QSF 3.8 (Stage IV/Tier 4 final)', rollingWidth: 1.8, power: 119.4, numberOfWheels: FIVE_FRONT_FOUR_REAR, origin: ORIGIN.brazil }),
  ptrRow({ brand: 'DYNAPAC', model: 'CP2700', weight: 12400, engine: 'Cummins QSF 3.8 (Stage IV/Tier 4 final)', rollingWidth: 2.3, power: 119.4, numberOfWheels: FIVE_FRONT_FOUR_REAR, origin: ORIGIN.brazil }),
  ptrRow({ brand: 'DYNAPAC', model: 'CP275', weight: 14000, engine: 'Cummins 4BTAA3.9-C125', rollingWidth: 2.37, power: 124.7, numberOfWheels: FIVE_FRONT_FOUR_REAR, origin: ORIGIN.china }),
  ptrRow({ brand: 'VOLVO', model: 'PTR125', weight: 12625, rollingWidth: 1.73, power: 84.5, numberOfWheels: same('4 + 5') }),
  ptrRow({ brand: 'VOLVO', model: 'PTR220', weight: 24000, rollingWidth: 1.98, power: 99.2, numberOfWheels: same('4 + 5') }),
  ptrRow({ brand: 'VOLVO', model: 'PTR240R', weight: 24000, rollingWidth: 1.99, power: 132.8, numberOfWheels: same('4 + 5') }),
];

// ---------------------------------------------------------------------------
// MILLING — Cold milling machines (8 BOMAG + 5 WIRTGEN)
// Spec strings use Spanish as source language (translated by localizeMillingText).
// ---------------------------------------------------------------------------

const CUT_LA15_EVO = loc(
  'Tambor de fresado LA15, sistema de portapicas intercambiables BOMAG BMS 15 EVO; motor TIER 3',
  'Milling drum LA15, BOMAG BMS 15 EVO exchange holder system; TIER 3 engine',
  'Fräswalze LA15, BOMAG BMS 15 EVO Wechselhaltersystem; TIER-3-Motor',
  'Tambor de fresagem LA15, sistema de porta-ferramentas intercambiáveis BOMAG BMS 15 EVO; motor TIER 3'
);
const cutWithSideProtection = (drum: string) =>
  loc(
    `Tambor de fresado ${drum} con protección lateral contra desgaste, portapicas intercambiable BOMAG BMS 15 EVO; motor TIER 3`,
    `Milling drum ${drum} w/ side wear protection, BOMAG BMS 15 EVO exchangeable toolholder; TIER 3 engine`,
    `Fräswalze ${drum} mit seitlichem Verschleißschutz, BOMAG BMS 15 EVO Wechselhalter; TIER-3-Motor`,
    `Tambor de fresagem ${drum} com proteção lateral contra desgaste, porta-ferramentas intercambiável BOMAG BMS 15 EVO; motor TIER 3`
  );
const cutHt22Tier3 = (drum: string) =>
  loc(
    `Sistema de portapicas de cambio rápido HT22 PLUS, tambor ${drum}; motor EU Stage 3a / US Tier 3`,
    `HT22 PLUS quick-change toolholder system, ${drum} drum; EU Stage 3a / US Tier 3 engine`,
    `HT22 PLUS Schnellwechselhaltersystem, Fräswalze ${drum}; Motor EU Stufe 3a / US Tier 3`,
    `Sistema de porta-ferramentas de troca rápida HT22 PLUS, tambor ${drum}; motor EU Stage 3a / US Tier 3`
  );
const cutHt22Tier4 = (drum: string) =>
  loc(
    `Sistema de portapicas de cambio rápido HT22 PLUS, tambor ${drum}; motor EU Stage 5 / US EPA Tier 4f con DEF/AdBlue`,
    `HT22 PLUS quick-change toolholder system, ${drum} drum; EU Stage 5 / US EPA Tier 4f engine with DEF/AdBlue`,
    `HT22 PLUS Schnellwechselhaltersystem, Fräswalze ${drum}; Motor EU Stufe 5 / US EPA Tier 4f mit DEF/AdBlue`,
    `Sistema de porta-ferramentas de troca rápida HT22 PLUS, tambor ${drum}; motor EU Stage 5 / US EPA Tier 4f com DEF/AdBlue`
  );

const APP_MID_URBAN = loc(
  'Fresado urbano de tamaño medio y mantenimiento vial general (Tier 3)',
  'Mid-size urban milling and general-purpose road maintenance (Tier 3)',
  'Mittelgroße Fräsarbeiten in der Stadt und allgemeine Straßeninstandhaltung (Tier 3)',
  'Fresagem urbana de porte médio e manutenção viária geral (Tier 3)'
);
const APP_LARGE = loc(
  'Fresado a gran escala en profundidad total y rehabilitación vial mayor (Tier 3)',
  'Large-scale full-depth milling and major road rehabilitation (Tier 3)',
  'Großflächiges Vollausbau-Fräsen und umfassende Straßensanierung (Tier 3)',
  'Fresagem em grande escala de profundidade total e grande reabilitação viária (Tier 3)'
);
const APP_LARGE_STD = loc(
  'Fresado a gran escala en profundidad total, configuración de potencia estándar (Tier 3)',
  'Large-scale full-depth milling, standard-power configuration (Tier 3)',
  'Großflächiges Vollausbau-Fräsen, Standard-Leistungskonfiguration (Tier 3)',
  'Fresagem em grande escala de profundidade total, configuração de potência padrão (Tier 3)'
);
const APP_LARGE_HIGH = loc(
  'Fresado a gran escala en profundidad total, configuración de alta potencia (Tier 3)',
  'Large-scale full-depth milling, high-power configuration (Tier 3)',
  'Großflächiges Vollausbau-Fräsen, Hochleistungskonfiguration (Tier 3)',
  'Fresagem em grande escala de profundidade total, configuração de alta potência (Tier 3)'
);
const APP_RENTAL = loc(
  'Flotas de alquiler y fresado general en obras que aceptan emisiones EU Stage 3a / US Tier 3',
  'Rental fleets and general-purpose milling on jobsites that accept EU Stage 3a / US Tier 3 emissions',
  'Mietflotten und allgemeine Fräsarbeiten auf Baustellen, die Emissionen nach EU Stufe 3a / US Tier 3 zulassen',
  'Frotas de locação e fresagem geral em obras que aceitam emissões EU Stage 3a / US Tier 3'
);
const APP_REGULATED = loc(
  'Obras urbanas y con regulación ambiental que exigen emisiones EU Stage 5 / US EPA Tier 4f',
  'Urban and environmentally regulated jobsites requiring EU Stage 5 / US EPA Tier 4f emissions',
  'Städtische und umweltregulierte Baustellen mit Anforderung EU Stufe 5 / US EPA Tier 4f',
  'Obras urbanas e com regulação ambiental que exigem emissões EU Stage 5 / US EPA Tier 4f'
);
const APP_W200F = loc(
  'Remoción a gran escala en profundidad total y rehabilitación estructural; fresadora grande compacta y rentable',
  'Large-scale full-depth removal and structural rehabilitation; cost-efficient compact large milling machine',
  'Großflächiger Vollausbau und strukturelle Sanierung; kosteneffiziente kompakte Großfräse',
  'Remoção em grande escala de profundidade total e reabilitação estrutural; fresadora grande compacta e econômica'
);

type MillingRow = Omit<
  MillingMachineSpec,
  'energyEfficiency' | 'usp1' | 'usp2' | 'usp3' | 'usp4' | 'valueProposition'
>;

const millingRow = (r: MillingRow): MillingMachineSpec => ({
  energyEfficiency: NONE,
  usp1: EMPTY,
  usp2: EMPTY,
  usp3: EMPTY,
  usp4: EMPTY,
  valueProposition: NONE,
  price: 0,
  preventiveMaintenance: 0,
  correctiveMaintenance: 0,
  usageTime: 3000,
  tco: 0,
  ...r,
});

const BM_35_COMMON = {
  brand: 'BOMAG',
  engine: '240 kW - MTU (Mercedes) Series 1000 6R',
  enginePower: '240 kW - MTU (Mercedes) Series 1000 6R',
  maxDepth: '0-330 mm',
  drumDiameter: '980 mm',
  workingSpeed: '0-50 m/min',
  travelSpeed: '0-7,5 km/h',
  transportCapacity: '180 m3/h (teórica)',
  conveyorBeltWidth: '650/600 mm (interior/exterior)',
  waterTank: '1.400 L',
  minTurningRadius: '-',
  cuttingSystem: CUT_LA15_EVO,
  idealApplication: APP_MID_URBAN,
  fuelConsumption: 0,
  transportCapacityM3h: 180,
  workingSpeedMmin: 50,
  hasBms15l: true,
  wearReductionPercent: 20,
};

const BM_65_COMMON = {
  brand: 'BOMAG',
  maxDepth: '0-350 mm',
  drumDiameter: '1.020 mm',
  workingSpeed: '0-100 m/min',
  travelSpeed: '0-6 km/h',
  transportCapacity: '485 m3/h (teórica)',
  conveyorBeltWidth: '850/850 mm (interior/exterior)',
  waterTank: '3.250 L',
  minTurningRadius: '-',
  fuelConsumption: 0,
  transportCapacityM3h: 485,
  workingSpeedMmin: 100,
  hasBms15l: true,
  wearReductionPercent: 20,
};
const X15_470 = '470 kW - Cummins X15';

const WIRTGEN_SMALL_COMMON = {
  brand: 'WIRTGEN',
  maxDepth: '0-300 mm',
  drumDiameter: '930 mm',
  workingSpeed: '0-33 m/min (2 km/h)',
  travelSpeed: '0-125 m/min (7,5 km/h)',
  transportCapacity: '125 m3/h (teórica)',
  conveyorBeltWidth: '500 mm',
  waterTank: '825 L',
  transportCapacityM3h: 125,
  workingSpeedMmin: 33,
  hasBms15l: false,
};

export const millingMasterAdditions: MillingMachineSpec[] = [
  millingRow({
    ...BM_35_COMMON,
    model: 'BM 1000/35-2',
    millingWidth: '1.000 mm',
    operatingWeight: '20.400 kg (CECE) / 24.000 kg (máx., incl. opciones)',
  }),
  millingRow({
    ...BM_35_COMMON,
    model: 'BM 1200/35-2',
    millingWidth: '1.200 mm',
    operatingWeight: '21.400 kg (CECE) / 25.000 kg (máx., incl. opciones)',
  }),
  millingRow({
    ...BM_35_COMMON,
    model: 'BM 1300/35-2',
    millingWidth: '1.300 mm',
    operatingWeight: '21.900 kg (CECE) / 25.500 kg (máx., incl. opciones)',
  }),
  millingRow({
    ...BM_65_COMMON,
    model: 'BM 1500/65',
    engine: X15_470,
    enginePower: X15_470,
    millingWidth: '1.500 mm',
    operatingWeight: '26.660 kg (CECE) / 33.060 kg (máx., incl. opciones)',
    cuttingSystem: cutWithSideProtection('LA15'),
    idealApplication: APP_LARGE,
  }),
  millingRow({
    ...BM_65_COMMON,
    model: 'BM 2000/65',
    engine: X15_470,
    enginePower: X15_470,
    millingWidth: '2.000 mm',
    operatingWeight: '26.660 kg (CECE) / 33.060 kg (máx., incl. opciones)',
    cuttingSystem: cutWithSideProtection('LA15'),
    idealApplication: APP_LARGE,
  }),
  millingRow({
    ...BM_65_COMMON,
    model: 'BM 2200/65',
    engine: X15_470,
    enginePower: X15_470,
    millingWidth: '2.200 mm',
    operatingWeight: '27.010 kg (CECE) / 33.460 kg (máx., incl. opciones)',
    cuttingSystem: cutWithSideProtection('LA15'),
    idealApplication: APP_LARGE,
  }),
  millingRow({
    ...BM_65_COMMON,
    model: 'BM 2000/58',
    engine: '449 kW - Cummins X15',
    enginePower: '449 kW - Cummins X15',
    millingWidth: '2.000 mm',
    operatingWeight: '27.000 kg (CECE) / 33.400 kg (máx., incl. opciones)',
    cuttingSystem: cutWithSideProtection('LA18'),
    idealApplication: APP_LARGE_STD,
  }),
  millingRow({
    ...BM_65_COMMON,
    model: 'BM 2000/68',
    engine: X15_470,
    enginePower: X15_470,
    millingWidth: '2.000 mm',
    operatingWeight: '27.000 kg (CECE) / 33.400 kg (máx., incl. opciones)',
    cuttingSystem: cutWithSideProtection('LA18'),
    idealApplication: APP_LARGE_HIGH,
  }),
  millingRow({
    ...WIRTGEN_SMALL_COMMON,
    model: 'W 100 R',
    engine: 'Deutz TCD 2012 L06 2V',
    enginePower: '155 kW / 208 HP',
    millingWidth: '1.000 mm (estándar)',
    operatingWeight: '14.700 kg (CE)',
    minTurningRadius: '2,8 m',
    cuttingSystem: cutHt22Tier3('FB1000'),
    idealApplication: APP_RENTAL,
    fuelConsumption: 17,
    turningRadiusM: 2.8,
  }),
  millingRow({
    ...WIRTGEN_SMALL_COMMON,
    model: 'W 120 R',
    engine: 'Deutz TCD 2012 L06 2V',
    enginePower: '155 kW / 208 HP',
    millingWidth: '1.200 mm (estándar)',
    operatingWeight: '15.350 kg (CE)',
    minTurningRadius: '2,8 m',
    cuttingSystem: cutHt22Tier3('FB1200'),
    idealApplication: APP_RENTAL,
    fuelConsumption: 17,
    turningRadiusM: 2.8,
  }),
  millingRow({
    ...WIRTGEN_SMALL_COMMON,
    model: 'W 100 Ri',
    engine: 'Deutz TCD 6.1 L6',
    enginePower: '160 kW / 215 HP',
    millingWidth: '1.000 mm (600 mm opcional)',
    operatingWeight: '14.850 kg (CE)',
    minTurningRadius: '2,8-3,2 m (según tambor)',
    cuttingSystem: cutHt22Tier4('FB600/FB1000'),
    idealApplication: APP_REGULATED,
    fuelConsumption: 18,
    turningRadiusM: 2.8,
  }),
  millingRow({
    ...WIRTGEN_SMALL_COMMON,
    model: 'W 120 Ri',
    engine: 'Deutz TCD 6.1 L6',
    enginePower: '160 kW / 215 HP',
    millingWidth: '1.200 mm (estándar)',
    operatingWeight: '15.500 kg (CE)',
    minTurningRadius: '2,8 m',
    cuttingSystem: cutHt22Tier4('FB1200'),
    idealApplication: APP_REGULATED,
    fuelConsumption: 18,
    turningRadiusM: 2.8,
  }),
  millingRow({
    brand: 'WIRTGEN',
    model: 'W 200 F',
    engine: 'Cummins QSX15',
    enginePower: '447 kW / 599 HP (nominal) - 455 kW / 610 HP (máx.)',
    millingWidth: '2.000 mm (2.200 mm opcional)',
    maxDepth: '0-330 mm',
    drumDiameter: '1.020 mm (con herramientas)',
    workingSpeed: '0-100 m/min (6 km/h, traslado/fresado combinado)',
    travelSpeed: '0-100 m/min (6 km/h, traslado/fresado combinado)',
    transportCapacity: '375 m3/h (teórica)',
    conveyorBeltWidth: '850 mm (primaria y de descarga)',
    waterTank: '3.270 L',
    operatingWeight: '28.200 kg (CE)',
    minTurningRadius: '2,15 m (FB2000/FB2200)',
    cuttingSystem: loc(
      'Portapicas HT22 PLUS, unidad de tambor de fresado de cambio rápido MCS BASIC (FB2000/FB2200)',
      'HT22 PLUS toolholder, MCS BASIC quick-change milling drum unit (FB2000/FB2200)',
      'HT22 PLUS Halter, MCS BASIC Schnellwechsel-Fräswalzeneinheit (FB2000/FB2200)',
      'Porta-ferramentas HT22 PLUS, unidade de tambor de fresagem de troca rápida MCS BASIC (FB2000/FB2200)'
    ),
    idealApplication: APP_W200F,
    fuelConsumption: 40,
    transportCapacityM3h: 375,
    workingSpeedMmin: 100,
    turningRadiusM: 2.15,
    hasBms15l: false,
  }),
];

// ---------------------------------------------------------------------------
// PAVERS — Asphalt pavers (4 BOMAG + 8 DYNAPAC + 3 VOLVO)
// Spec strings use Spanish as source language (translated by localizePaverText).
// ---------------------------------------------------------------------------

const NO_FINANCIAL: PaverFinancialData = {
  avgFuelConsumption: '—',
  fuelDataSource: '—',
  fuelConsumption10h: '—',
  co2Per10hShift: '—',
  fuelSavingsPerDay: '—',
  co2SavingsPerDay: '—',
  heatingType: '—',
  heatingTime: '—',
  heatingElementLife: '—',
  wearPlateLife: '—',
  replacementCycle: '—',
  replacementCostYear1: '—',
  replacementCostYear2: '—',
  replacementCostYear3: '—',
  totalReplacements3Years: '—',
  savingsVsBomag3Years: '—',
  co2SetupHeating: '—',
};

type PaverRow = Partial<PaverMachineSpec> & Pick<PaverMachineSpec, 'brand' | 'model' | 'nominalPower'>;

const paverRow = (r: PaverRow): PaverMachineSpec => ({
  engine: r.engine ?? r.nominalPower,
  engineManufacturer: '-',
  emissionStandard: '-',
  fuelSavingMode: '-',
  fuelTankCapacity: '-',
  maxProduction: '-',
  pavingSpeed: '-',
  travelSpeed: '-',
  maxLayerThickness: '-',
  minWorkingWidth: '-',
  baseWidthRetracted: '-',
  extendedBaseWidth: '-',
  maxWidthWithExtensions: '-',
  hopperCapacity: '-',
  augerDiameter: '-',
  conveyors: '-',
  pushRollers: '-',
  screedTypes: '-',
  screedHeating: '-',
  tamperVibrationFreq: '-',
  quickExtensionSystem: '-',
  smoothingPlateDepth: '-',
  operatingWeight: '-',
  transportLength: '-',
  transportWidth: '-',
  transportHeight: '-',
  operationSystem: '-',
  gradeControl: '-',
  telematics: '-',
  asphaltFumeExtraction: '-',
  centralizedLubrication: '-',
  usp1: NONE,
  usp2: NONE,
  usp3: NONE,
  usp4: NONE,
  usp5: NONE,
  usp6: NONE,
  usp7: NONE,
  usp8: NONE,
  usp9: NONE,
  financial: NO_FINANCIAL,
  price: 0,
  usageTime: 3000,
  tco: 0,
  ...r,
});

const SCREED_TV = '(tamper + vibración)';
const BOMAG_ELECTRIC_HEATING = 'Eléctrica (placas de aluminio MAGMALIFE opcionales)';
const GRADE_ULTRASONIC_OR_MECHANICAL = 'Opcional (sensores ultrasónicos o mecánicos de altura y pendiente transversal)';

export const paverMasterAdditions: PaverMachineSpec[] = [
  paverRow({
    brand: 'DYNAPAC', model: 'F80W', sizeCategory: 'COMPACTA (≤3,5 m)',
    nominalPower: '6,3 kW / 8,4 hp', minWorkingWidth: '0,84 - 1,65 m', operatingWeight: '1.150 kg',
  }),
  paverRow({
    brand: 'DYNAPAC', model: 'F1200C', sizeCategory: 'COMPACTA (≤350 t/h)',
    engine: 'Deutz TD 2.9 L04 (4 cil.)', engineManufacturer: 'Deutz TD 2.9 L04 (4 cil.)',
    nominalPower: '54 kW / 72,4 hp', maxProduction: '300 t/h', minWorkingWidth: '1,2 - 3,1 m',
    hopperCapacity: '5,5 t (~2,3 m3)', screedTypes: 'Regla V (vibración / tamper + vibración)', operatingWeight: '5.800 kg',
  }),
  paverRow({
    brand: 'DYNAPAC', model: 'F1800C', sizeCategory: 'COMPACTA (≤350 t/h)',
    engine: 'Deutz TD 2.9 L04 (4 cil.)', engineManufacturer: 'Deutz TD 2.9 L04 (4 cil.)',
    nominalPower: '54 kW / 72,4 hp', maxProduction: '350 t/h', minWorkingWidth: '1,8 - 4,7 m',
    hopperCapacity: '10,5 t', screedTypes: 'Regla vibratoria (calefacción a gas o eléctrica)', operatingWeight: '10.500 kg',
  }),
  paverRow({
    brand: 'VOLVO', model: 'P28200 ABG', sizeCategory: 'COMPACTA (≤350 t/h)',
    nominalPower: '55 kW / 73,8 hp', maxProduction: '300 t/h',
  }),
  // BF 350 C-5 / BF 700 C-3 / BF 700 C-3 L / BF 800 C-3 completed from the BOMAG datasheets
  // (PRS89135010 Sa01, PRS89247010 Sa04, PRS88424010 Sa01, PRS89341010 Sa05). Equipment marked ☑ there is standard.
  paverRow({
    brand: 'BOMAG', model: 'BF 350 C-5', sizeCategory: 'MEDIANA (3,6-6 m)',
    engine: '75 kW / 100 hp', engineManufacturer: 'Deutz TCD 2.9 L04 (4 cil.)', emissionStandard: 'Stage IIIa',
    nominalPower: '75 kW / 100 hp', fuelSavingMode: 'ECOMODE (estándar)', fuelTankCapacity: '110 L',
    pavingSpeed: 'Hasta 32 m/min', travelSpeed: '4,5 km/h', maxLayerThickness: '250 mm',
    minWorkingWidth: '0,70 m mín. (con patines reductores) - 5,0 m máx.',
    baseWidthRetracted: '1,7 m (S 340-5)', extendedBaseWidth: '3,4 m (S 340-5)', maxWidthWithExtensions: '5,0 m',
    hopperCapacity: '4,8 m3', augerDiameter: '280 mm - 100 rpm', conveyors: '2 - reversibles, ctrl indep.\n55 rpm',
    pushRollers: 'Con amortiguación (opcional)',
    screedTypes: `S 340-5 V / S 340-5 TV ${SCREED_TV}`, screedHeating: BOMAG_ELECTRIC_HEATING,
    tamperVibrationFreq: 'Tamper 10–30 Hz (TV) / Vibr. 15–50 Hz', smoothingPlateDepth: '330 mm - Espesor 10 mm',
    operatingWeight: '10.150 kg (c/S340-5 V) / 10.300 kg (c/S340-5 TV)',
    transportLength: '5.050 mm', transportWidth: '1.925 mm', transportHeight: '3.000 mm',
    operationSystem: 'EASY-PAVE / A-PAVE / A-PAVE+\nAsiento SIDEVIEW giratorio/deslizable',
    gradeControl: 'Opcional (sensores ultrasónicos de altura y pendiente transversal)',
    telematics: 'BOMAG TELEMATIC (opcional)', asphaltFumeExtraction: 'Aspiración de vapores (opcional)',
    centralizedLubrication: 'Lubricación central (opcional)',
    hasMagmalife: false, hasEcomode: true,
  }),
  paverRow({
    brand: 'DYNAPAC', model: 'FC1600C', sizeCategory: 'MEDIANA (351-700 t/h)',
    nominalPower: '74 kW / 99,2 hp', maxProduction: '600 t/h', minWorkingWidth: '2,6 - 5,5 m', operatingWeight: '8.400 kg',
  }),
  paverRow({
    brand: 'VOLVO', model: 'P68200 ABG', sizeCategory: 'MEDIANA (351-700 t/h)',
    engine: 'Volvo D6E COM IIIA / EPA Tier 3', engineManufacturer: 'Volvo D6E COM IIIA / EPA Tier 3',
    emissionStandard: 'Stage IIIA / EPA Tier 3', nominalPower: '140 kW / 187,7 hp', maxProduction: '700 t/h',
    minWorkingWidth: '2,5 - 5,0 m estándar, hasta 9-10 m con extensiones', screedTypes: 'Regla Volvo Variomatic',
  }),
  paverRow({
    brand: 'BOMAG', model: 'BF 700 C-3', sizeCategory: 'GRANDE (6,1-9 m)',
    engine: '128 kW / 172 hp', engineManufacturer: 'Deutz TCD 2012 L06 (6 cil.)', emissionStandard: 'Stage IIIa / Tier 3',
    nominalPower: '128 kW / 172 hp', fuelSavingMode: 'ECOMODE (estándar)', fuelTankCapacity: '285 L',
    pavingSpeed: 'Hasta 25 m/min', travelSpeed: '4 km/h', maxLayerThickness: '300 mm',
    minWorkingWidth: '1,65 m (S500) / 2,10 m (S600) mín. - 9,0 m máx.',
    baseWidthRetracted: '2,55 m (S500) / 3,0 m (S600)', extendedBaseWidth: '5,0 m (S500) / 6,0 m (S600)', maxWidthWithExtensions: '9,0 m',
    hopperCapacity: '7,0 m3', augerDiameter: '400 mm - 100 rpm', conveyors: '2 - reversibles, ctrl indep.\n64 rpm',
    pushRollers: 'Con amortiguación (opcional)',
    screedTypes: `S 500 / S 600 ${SCREED_TV}`,
    screedHeating: 'MAGMALIFE - placas calefactoras de aluminio fundido (estándar)',
    tamperVibrationFreq: 'Tamper 0–29 Hz / Vibr. 20–58 Hz', smoothingPlateDepth: '400 mm - Espesor 15 mm',
    operatingWeight: '21.300 kg (c/S500) / 21.800 kg (c/S600)',
    transportLength: '6.540 mm', transportWidth: '2.550 mm (S500) / 3.000 mm (S600)', transportHeight: '3.061 mm',
    operationSystem: 'A-PAVE pantalla gráfica\nAsiento SIDEVIEW giratorio/deslizable',
    gradeControl: 'Controlador de nivelación integrado (estándar)\nSensores ultrasónicos o mecánicos (opcional)',
    telematics: 'BOMAG TELEMATIC + JOBLINK (opcional)', asphaltFumeExtraction: 'Aspiración de vapores (opcional)',
    centralizedLubrication: 'Lubricación central (opcional)',
    hasMagmalife: true, hasEcomode: true, setupFuelLiters: 3.5, heatingMinutes: 30,
  }),
  paverRow({
    brand: 'BOMAG', model: 'BF 700 C-3 L', sizeCategory: 'GRANDE (6,1-9 m)',
    engine: '128 kW / 172 hp', engineManufacturer: 'Deutz TCD 2012 L06 (6 cil.)', emissionStandard: 'Stage IIIa / Tier 3',
    nominalPower: '128 kW / 172 hp', fuelSavingMode: 'ECOMODE (estándar)', fuelTankCapacity: '285 L',
    pavingSpeed: 'Hasta 25 m/min', travelSpeed: '4 km/h', maxLayerThickness: '300 mm',
    minWorkingWidth: '1,65 m (S500) / 2,10 m (S600) mín. - 9,0 m máx.',
    baseWidthRetracted: '2,55 m (S500) / 3,0 m (S600)', extendedBaseWidth: '5,0 m (S500) / 6,0 m (S600)', maxWidthWithExtensions: '9,0 m',
    hopperCapacity: '7,7 m3', augerDiameter: '400 mm - 100 rpm', conveyors: '2 - reversibles, ctrl indep.\n64 rpm',
    pushRollers: 'Con amortiguación (opcional)',
    screedTypes: `S 500 / S 600 ${SCREED_TV}`,
    screedHeating: 'MAGMALIFE - placas calefactoras de aluminio fundido (estándar)',
    tamperVibrationFreq: 'Tamper 0–29 Hz / Vibr. 20–58 Hz', smoothingPlateDepth: '400 mm - Espesor 15 mm',
    operatingWeight: '21.450 kg (c/S500) / 21.950 kg (c/S600)',
    transportLength: '6.790 mm', transportWidth: '2.550 mm (S500) / 3.000 mm (S600)', transportHeight: '3.061 mm',
    operationSystem: 'A-PAVE pantalla gráfica\nAsiento SIDEVIEW giratorio/deslizable',
    gradeControl: 'Controlador de nivelación integrado (estándar)\nSensores ultrasónicos o mecánicos (opcional)',
    telematics: 'BOMAG TELEMATIC + JOBLINK (opcional)', asphaltFumeExtraction: 'Aspiración de vapores (opcional)',
    centralizedLubrication: 'Lubricación central (opcional)',
    hasMagmalife: true, hasEcomode: true, setupFuelLiters: 3.5, heatingMinutes: 30,
  }),
  paverRow({
    brand: 'DYNAPAC', model: 'F1000W', sizeCategory: 'GRANDE (6,1-9 m)',
    nominalPower: '162 kW / 217,2 hp', minWorkingWidth: '3,05 - 7,93 m', operatingWeight: '15.150 kg',
  }),
  paverRow({
    brand: 'DYNAPAC', model: 'F2500WS', sizeCategory: 'GRANDE (6,1-9 m)',
    nominalPower: '129 kW / 173,0 hp', minWorkingWidth: '2,55 - 8,8 m',
    screedTypes: 'Regla Vario V5100/V6000 (calefacción a gas o eléctrica)', operatingWeight: '16.500 kg',
  }),
  paverRow({
    brand: 'BOMAG', model: 'BF 800 C-3', sizeCategory: 'EXTRA GRANDE (>9 m)',
    engine: '135 kW / 181 hp', engineManufacturer: 'Deutz TCD 2012 L06 (6 cil.)', emissionStandard: 'Stage IIIa / Tier 3',
    nominalPower: '135 kW / 181 hp', fuelSavingMode: 'ECOMODE (estándar)', fuelTankCapacity: '285 L',
    pavingSpeed: 'Hasta 25 m/min', travelSpeed: '4 km/h', maxLayerThickness: '300 mm',
    minWorkingWidth: '1,65 m (S500) / 2,10 m (S600) mín. - 10,0 m máx.',
    baseWidthRetracted: '2,55 m (S500) / 3,0 m (S600)', extendedBaseWidth: '5,0 m (S500) / 6,0 m (S600)', maxWidthWithExtensions: '9,0 m (S500) / 10,0 m (S600)',
    hopperCapacity: '7,2 m3', augerDiameter: '400 mm - 104 rpm', conveyors: '2 - reversibles, ctrl indep.\n64 rpm',
    pushRollers: 'Con amortiguación (opcional)',
    screedTypes: `S 500 / S 600 ${SCREED_TV}`,
    screedHeating: 'MAGMALIFE - placas calefactoras de aluminio fundido (estándar)',
    tamperVibrationFreq: 'Tamper 0–29 Hz / Vibr. 20–58 Hz', smoothingPlateDepth: '400 mm - Espesor 15 mm',
    operatingWeight: '23.000 kg (c/S500) / 23.500 kg (c/S600)',
    transportLength: '6.800 mm', transportWidth: '2.550 mm (S500) / 3.000 mm (S600)', transportHeight: '3.020 mm',
    operationSystem: 'A-PAVE pantalla gráfica\nAsiento SIDEVIEW giratorio/deslizable',
    gradeControl: 'Controlador de nivelación integrado (estándar)\nSensores ultrasónicos o mecánicos (opcional)',
    telematics: 'BOMAG TELEMATIC + JOBLINK (opcional)', asphaltFumeExtraction: 'Aspiración de vapores (opcional)',
    centralizedLubrication: 'Lubricación central (opcional)',
    hasMagmalife: true, hasEcomode: true, setupFuelLiters: 3.5, heatingMinutes: 30,
  }),
  paverRow({
    brand: 'DYNAPAC', model: 'SD2500CS', sizeCategory: 'EXTRA GRANDE (>9 m)',
    engine: 'Cummins QSB 6.7 series', engineManufacturer: 'Cummins QSB 6.7',
    nominalPower: '142 kW / 190,4 hp', minWorkingWidth: '2,55 - 10,0 m', operatingWeight: '18.500 kg',
  }),
  paverRow({
    brand: 'DYNAPAC', model: 'SD2550CS', sizeCategory: 'EXTRA GRANDE (>9 m)',
    engine: 'Cummins QSB 6.7 series', engineManufacturer: 'Cummins QSB 6.7',
    nominalPower: '194 kW / 260,2 hp', minWorkingWidth: '2,55 - 14,0 m', operatingWeight: '20.000 kg',
  }),
  paverRow({
    brand: 'VOLVO', model: 'ABG9820', sizeCategory: 'EXTRA GRANDE (>1.000 t/h)',
    nominalPower: '273 kW / 366,1 hp', maxProduction: '1.500 t/h', minWorkingWidth: 'Hasta 16,0 m máx.', hopperCapacity: '17,5 t',
  }),
];

/** Size category (search) for pavers that were already in the app. */
export const paverSizeCategoryByModel: Record<string, string> = {
  'BOMAG|BF600 C-3': 'MEDIANA (351-700 t/h)',
  'VÖGELE|Super 1800-3': 'MEDIANA (351-700 t/h)',
  'DYNAPAC|SD2500CS': 'GRANDE (701-1.000 t/h)',
  'CATERPILLAR|AP655': 'EXTRA GRANDE (>1.000 t/h)',
};

/**
 * Appends `additions` to `base` keeping brand groups together: each new model is inserted
 * right after the last model of the same brand, or at the end when the brand is new.
 * The relative order of `base` is never changed.
 */
export function mergeByBrand<T extends { brand: string }>(base: T[], additions: T[]): T[] {
  const result = [...base];
  for (const item of additions) {
    let lastSameBrand = -1;
    result.forEach((m, i) => {
      if (m.brand === item.brand) lastSameBrand = i;
    });
    if (lastSameBrand === -1) result.push(item);
    else result.splice(lastSameBrand + 1, 0, item);
  }
  return result;
}
