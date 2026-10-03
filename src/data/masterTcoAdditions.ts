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
  brand?: string;
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
  brand: r.brand ?? 'DYNAPAC',
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
  // XCMG XS113: xcmg.com product page
  sdrRow({
    brand: 'XCMG', model: 'XS113', weight: 10800, engine: 'Cummins (EU Stage II)', compactionWidth: 2.13, power: 124.7,
    origin: ORIGIN.china, gradeability: 45,
    innovations: loc(
      'Frecuencia 30/35 Hz · Velocidad 0–5,4 / 0–10,8 km/h · Doble tracción hidráulica · Dimensiones 5.940 × 2.300 × 3.150 mm',
      'Frequency 30/35 Hz · Speed 0–5.4 / 0–10.8 km/h · Full hydraulic dual drive · Dimensions 5,940 × 2,300 × 3,150 mm',
      'Frequenz 30/35 Hz · Geschwindigkeit 0–5,4 / 0–10,8 km/h · Vollhydraulischer Doppelantrieb · Abmessungen 5.940 × 2.300 × 3.150 mm',
      'Frequência 30/35 Hz · Velocidade 0–5,4 / 0–10,8 km/h · Tração dupla totalmente hidráulica · Dimensões 5.940 × 2.300 × 3.150 mm'
    ),
  }),
  // LiuGong CLG6611E: liugong.com product page (no drum width published, so it is left blank)
  sdrRow({
    brand: 'LIUGONG', model: 'CLG6611E', weight: 11450, engine: 'Cummins 4BTAA3.9-C125 (Stage II)', compactionWidth: 0, power: 124.7,
    origin: ORIGIN.china, amplitude: '2,0 / 1,2', staticLinearLoad: 30.9, gradeability: 45,
    innovations: loc(
      'Fuerza centrífuga 300/210 kN · Frecuencia 32/34 Hz · Carga en tambor 6.450 kg · Diámetro de tambor 1.555 mm · Velocidad 5,4/8,9 km/h · Radio de giro exterior 6.500 mm · Rodamientos de vibración de más de 5.000 h',
      'Centrifugal force 300/210 kN · Frequency 32/34 Hz · Mass on drum 6,450 kg · Drum diameter 1,555 mm · Speed 5.4/8.9 km/h · Outer turning radius 6,500 mm · Vibration bearings over 5,000 h',
      'Zentrifugalkraft 300/210 kN · Frequenz 32/34 Hz · Bandagenlast 6.450 kg · Bandagendurchmesser 1.555 mm · Geschwindigkeit 5,4/8,9 km/h · Wenderadius außen 6.500 mm · Vibrationslager über 5.000 h',
      'Força centrífuga 300/210 kN · Frequência 32/34 Hz · Carga no tambor 6.450 kg · Diâmetro do tambor 1.555 mm · Velocidade 5,4/8,9 km/h · Raio de giro externo 6.500 mm · Rolamentos de vibração acima de 5.000 h'
    ),
  }),
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
  // HAMM HP 280 (H249) datasheet, 2026
  ptrRow({
    brand: 'HAMM', model: 'HP 280', weight: 9480, engine: 'Deutz TCD 2012 L04 2V (Tier 3 / MAR-1)', rollingWidth: 2.08,
    power: 119.3, numberOfWheels: FOUR_FRONT_FOUR_REAR, gradeability: 25,
    innovations: loc(
      'Peso máx. con lastre 27.950 kg · Velocidad 0-19 km/h · Tanque de combustible 235 l · Tanque de agua 650 l · Neumáticos 11.00-R20 · Pendiente 25/35 % (con/sin lastre) · Modo ECO · HAMMTRONIC',
      'Max. ballasted weight 27,950 kg · Speed 0-19 km/h · Fuel tank 235 l · Water tank 650 l · Tyres 11.00-R20 · Gradeability 25/35 % (with/without ballast) · ECO mode · HAMMTRONIC',
      'Max. Gewicht mit Ballast 27.950 kg · Geschwindigkeit 0-19 km/h · Kraftstofftank 235 l · Wassertank 650 l · Reifen 11.00-R20 · Steigfähigkeit 25/35 % (mit/ohne Ballast) · ECO-Modus · HAMMTRONIC',
      'Peso máx. com lastro 27.950 kg · Velocidade 0-19 km/h · Tanque de combustível 235 l · Tanque de água 650 l · Pneus 11.00-R20 · Rampa 25/35 % (com/sem lastro) · Modo ECO · HAMMTRONIC'
    ),
  }),
  // Dynapac CP1200 datasheet 2025-11 (Stage IIIA / Tier 3 engine version)
  ptrRow({
    brand: 'DYNAPAC', model: 'CP1200', weight: 5580, engine: 'Kubota V3307 (Stage IIIA/Tier 3)', rollingWidth: 1.76, power: 74,
    numberOfWheels: FIVE_FRONT_FOUR_REAR, gradeability: 28, origin: ORIGIN.brazil,
    innovations: loc(
      'Peso máx. con lastre 12.100 kg · Peso con cabina 5.850 kg · Velocidad 0-18 km/h · Tanque de combustible 215 l · Tanque de agua 410 l · Neumáticos 7.50-15, 14 lonas · Oscilación de ruedas ±3° · Unidad de mando deslizante y giratoria',
      'Max. ballasted weight 12,100 kg · Weight with cab 5,850 kg · Speed 0-18 km/h · Fuel tank 215 l · Water tank 410 l · Tyres 7.50-15, 14 ply · Wheel oscillation ±3° · Sliding and swivelling operator unit',
      'Max. Gewicht mit Ballast 12.100 kg · Gewicht mit Kabine 5.850 kg · Geschwindigkeit 0-18 km/h · Kraftstofftank 215 l · Wassertank 410 l · Reifen 7.50-15, 14 PR · Radpendelung ±3° · Verschieb- und drehbarer Fahrerstand',
      'Peso máx. com lastro 12.100 kg · Peso com cabine 5.850 kg · Velocidade 0-18 km/h · Tanque de combustível 215 l · Tanque de água 410 l · Pneus 7.50-15, 14 lonas · Oscilação das rodas ±3° · Posto do operador deslizante e giratório'
    ),
  }),
  ptrRow({ brand: 'DYNAPAC', model: 'CP2100', weight: 10400, engine: 'Cummins QSF 3.8 (Stage IV/Tier 4 final)', rollingWidth: 1.8, power: 119.4, numberOfWheels: FIVE_FRONT_FOUR_REAR, origin: ORIGIN.brazil }),
  // Dynapac CP2700 datasheet 2020-05 (Stage IIIA / Tier 3 engine version)
  ptrRow({
    brand: 'DYNAPAC', model: 'CP2700', weight: 12400, engine: 'Cummins QSB 4.5 (Stage IIIA/Tier 3)', rollingWidth: 2.3, power: 110,
    numberOfWheels: FIVE_FRONT_FOUR_REAR, origin: ORIGIN.brazil,
    innovations: loc(
      'Peso con lastre: arena húmeda 19.500 kg · máx. 27.000 kg · Carga por rueda 1.361-3.000 kg · Velocidad 0-20 km/h · Tanque de combustible 210 l · Tanque de agua 415 l · Neumáticos 13/80 R20 · Radio de giro exterior 9.046 mm',
      'Ballasted weight: wet sand 19,500 kg · max. 27,000 kg · Wheel load 1,361-3,000 kg · Speed 0-20 km/h · Fuel tank 210 l · Water tank 415 l · Tyres 13/80 R20 · Outer turning radius 9,046 mm',
      'Gewicht mit Ballast: Nasssand 19.500 kg · max. 27.000 kg · Radlast 1.361-3.000 kg · Geschwindigkeit 0-20 km/h · Kraftstofftank 210 l · Wassertank 415 l · Reifen 13/80 R20 · Wenderadius außen 9.046 mm',
      'Peso com lastro: areia úmida 19.500 kg · máx. 27.000 kg · Carga por roda 1.361-3.000 kg · Velocidade 0-20 km/h · Tanque de combustível 210 l · Tanque de água 415 l · Pneus 13/80 R20 · Raio de giro externo 9.046 mm'
    ),
  }),
  ptrRow({ brand: 'DYNAPAC', model: 'CP275', weight: 14000, engine: 'Cummins 4BTAA3.9-C125', rollingWidth: 2.37, power: 124.7, numberOfWheels: FIVE_FRONT_FOUR_REAR, origin: ORIGIN.china }),
  // Volvo PT125R T3 specification sheet VOE 33 B 100 4028 (2009)
  ptrRow({
    brand: 'VOLVO', model: 'PTR125', weight: 4326, engine: 'Kubota V3600-T-E3B (Tier 3)', rollingWidth: 1.73, power: 84.5,
    numberOfWheels: loc('4 delanteras, 5 traseras', '4 front, 5 rear', '4 vorne, 5 hinten', '4 dianteiras, 5 traseiras'), gradeability: 31,
    innovations: loc(
      'Peso con lastre: agua 7.708 kg · arena húmeda 11.242 kg · máx. 12.625 kg · Velocidad 0-24,8 km/h · Tanque de combustible 102 l · Tanque de agua 379 l · Neumáticos 7.50-15, 14 lonas · Oscilación ±3°',
      'Ballasted weight: water 7,708 kg · wet sand 11,242 kg · max. 12,625 kg · Speed 0-24.8 km/h · Fuel tank 102 l · Water tank 379 l · Tyres 7.50-15, 14 ply · Oscillation ±3°',
      'Gewicht mit Ballast: Wasser 7.708 kg · Nasssand 11.242 kg · max. 12.625 kg · Geschwindigkeit 0-24,8 km/h · Kraftstofftank 102 l · Wassertank 379 l · Reifen 7.50-15, 14 PR · Pendelung ±3°',
      'Peso com lastro: água 7.708 kg · areia úmida 11.242 kg · máx. 12.625 kg · Velocidade 0-24,8 km/h · Tanque de combustível 102 l · Tanque de água 379 l · Pneus 7.50-15, 14 lonas · Oscilação ±3°'
    ),
  }),
  // Volvo PT220 T3 brochure 20047062_E (2018)
  ptrRow({
    brand: 'VOLVO', model: 'PTR220', weight: 10020, engine: 'Volvo D5D A3 (Tier 3 / Bharat Stage III)', rollingWidth: 1.98, power: 135,
    numberOfWheels: FOUR_FRONT_FOUR_REAR, gradeability: 23,
    innovations: loc(
      'Peso máx. con lastre 21.000 kg (24.000 kg con lastre de fábrica) · Velocidad 0-15 km/h · Tanque de combustible 200 l · Tanque de agua 550 l · Neumáticos 11,0-20, 18 PR · Traslape 50 mm · Nivelación isostática delantera',
      'Max. ballasted weight 21,000 kg (24,000 kg with factory ballast) · Speed 0-15 km/h · Fuel tank 200 l · Water tank 550 l · Tyres 11.0-20, 18 PR · Overlap 50 mm · Isostatic front levelling',
      'Max. Gewicht mit Ballast 21.000 kg (24.000 kg mit Werksballast) · Geschwindigkeit 0-15 km/h · Kraftstofftank 200 l · Wassertank 550 l · Reifen 11,0-20, 18 PR · Überlappung 50 mm · Isostatische Vorderachse',
      'Peso máx. com lastro 21.000 kg (24.000 kg com lastro de fábrica) · Velocidade 0-15 km/h · Tanque de combustível 200 l · Tanque de água 550 l · Pneus 11,0-20, 18 PR · Sobreposição 50 mm · Nivelamento isostático dianteiro'
    ),
  }),
  ptrRow({ brand: 'VOLVO', model: 'PTR240R', weight: 24000, rollingWidth: 1.99, power: 132.8, numberOfWheels: same('4 + 5') }),
  // Cat CW16: cat.com es_MX product specs (Mexico market, Cat C3.6) + datasheet QEHQ1965-02 (2022)
  ptrRow({
    brand: 'CATERPILLAR', model: 'CW16', weight: 5200, engine: 'Cat C4.4 (Tier 3 / Stage IIIA)', rollingWidth: 1.75,
    power: 100.5, numberOfWheels: loc('9 (opción 11)', '9 (11 optional)', '9 (11 optional)', '9 (opção 11)'),
    innovations: loc(
      'Peso con lastre máx. 15.000 kg · Velocidad 0-19 km/h · Tanque de combustible 146 l · Tanque de agua 348 l · Ancho 1.754 mm (1.728 mm radial; 2,10 m con 11 ruedas) · Radio de giro interior/exterior 3.761/6.455 mm · Oscilación rueda delantera · Estación de operación giratoria · Transmisión de velocidad variable · Eco-mode',
      'Max. ballasted weight 15,000 kg · Speed 0-19 km/h · Fuel tank 146 l · Water tank 348 l · Width 1,754 mm (1,728 mm radial; 2.10 m with 11 wheels) · Inner/outer turning radius 3,761/6,455 mm · Front wheel oscillation · Rotating operator station · Variable speed transmission · Eco-mode',
      'Max. Gewicht mit Ballast 15.000 kg · Geschwindigkeit 0-19 km/h · Kraftstofftank 146 l · Wassertank 348 l · Breite 1.754 mm (1.728 mm radial; 2,10 m mit 11 Rädern) · Wenderadius innen/außen 3.761/6.455 mm · Pendelnde Vorderräder · Drehbarer Fahrerstand · Stufenloses Getriebe · Eco-mode',
      'Peso máx. com lastro 15.000 kg · Velocidade 0-19 km/h · Tanque de combustível 146 l · Tanque de água 348 l · Largura 1.754 mm (1.728 mm radial; 2,10 m com 11 rodas) · Raio de giro interno/externo 3.761/6.455 mm · Oscilação da roda dianteira · Posto do operador giratório · Transmissão de velocidade variável · Eco-mode'
    ),
  }),
  // Cat CW34: datasheet QEHQ3333-01 (2026, Brazil MAR-1 / Tier 3 version) + cat.com es_MX product specs
  ptrRow({
    brand: 'CATERPILLAR', model: 'CW34', weight: 10000, engine: 'Cat C4.4 (Tier 3 / MAR-1)', rollingWidth: 2.09,
    power: 129, numberOfWheels: FOUR_FRONT_FOUR_REAR,
    innovations: loc(
      'Peso con lastre: agua 13.000 kg · arena húmeda 16.000 kg · máx. 27.000 kg · Carga por rueda 1.250-3.380 kg · Velocidad 0-19 km/h (3 rangos) · Tanque de combustible 270 l · Tanque de agua 380 l · Neumáticos 13/80 R20 · Radio de giro interior/exterior 6,1/8,7 m · Eco-mode · Oscilación en todas las ruedas · VisionLink',
      'Ballasted weight: water 13,000 kg · wet sand 16,000 kg · max. 27,000 kg · Wheel load 1,250-3,380 kg · Speed 0-19 km/h (3 ranges) · Fuel tank 270 l · Water tank 380 l · Tyres 13/80 R20 · Inner/outer turning radius 6.1/8.7 m · Eco-mode · All-wheel oscillation · VisionLink',
      'Gewicht mit Ballast: Wasser 13.000 kg · Nasssand 16.000 kg · max. 27.000 kg · Radlast 1.250-3.380 kg · Geschwindigkeit 0-19 km/h (3 Bereiche) · Kraftstofftank 270 l · Wassertank 380 l · Reifen 13/80 R20 · Wenderadius innen/außen 6,1/8,7 m · Eco-mode · Pendelung aller Räder · VisionLink',
      'Peso com lastro: água 13.000 kg · areia úmida 16.000 kg · máx. 27.000 kg · Carga por roda 1.250-3.380 kg · Velocidade 0-19 km/h (3 faixas) · Tanque de combustível 270 l · Tanque de água 380 l · Pneus 13/80 R20 · Raio de giro interno/externo 6,1/8,7 m · Eco-mode · Oscilação em todas as rodas · VisionLink'
    ),
  }),
  // Ammann AP 240 datasheet MSS-1183-04-EN (Stage IIIA / Tier 3)
  ptrRow({
    brand: 'AMMANN', model: 'AP 240', weight: 9690, engine: 'Cummins QSB 3.3-C99 (Stage IIIA/Tier 3)', rollingWidth: 1.99,
    power: 99, numberOfWheels: FOUR_FRONT_FOUR_REAR, gradeability: 25,
    innovations: loc(
      'Peso máx. con lastre 24.000 kg · Velocidad 0-19 km/h · Tanque de combustible 250 l · Tanque de agua 460 l · Neumáticos 11x20" · Inflado central "Air on Run" · Ammann Traction Control · ECOdrop',
      'Max. ballasted weight 24,000 kg · Speed 0-19 km/h · Fuel tank 250 l · Water tank 460 l · Tyres 11x20" · "Air on Run" central inflation · Ammann Traction Control · ECOdrop',
      'Max. Gewicht mit Ballast 24.000 kg · Geschwindigkeit 0-19 km/h · Kraftstofftank 250 l · Wassertank 460 l · Reifen 11x20" · Zentrale Reifenfüllung "Air on Run" · Ammann Traction Control · ECOdrop',
      'Peso máx. com lastro 24.000 kg · Velocidade 0-19 km/h · Tanque de combustível 250 l · Tanque de água 460 l · Pneus 11x20" · Calibragem central "Air on Run" · Ammann Traction Control · ECOdrop'
    ),
  }),
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
    // Dynapac F1800C datasheet 2025-10
    brand: 'DYNAPAC', model: 'F1800C', sizeCategory: 'COMPACTA (≤350 t/h)',
    engine: '54 kW / 72,4 hp', engineManufacturer: 'Deutz TD 2.9 L4 (4 cil.)', emissionStandard: 'Tier 3 (54 kW) / Stage V (55,4 kW)',
    nominalPower: '54 kW / 72,4 hp', fuelTankCapacity: '86 L', maxProduction: '350 t/h',
    pavingSpeed: 'Hasta 25 m/min', travelSpeed: '4 km/h', maxLayerThickness: '200 mm',
    minWorkingWidth: '0,70 m (con zapata reductora) - 4,7 m máx.',
    baseWidthRetracted: '1,75 m (V3500)', extendedBaseWidth: '3,50 m (V3500)', maxWidthWithExtensions: '4,70 m',
    hopperCapacity: '10,5 t', augerDiameter: '320 mm', conveyors: '2 - 700 mm, reversibles\ncontrol proporcional',
    screedTypes: 'V3500 V / VE / TV / TVE', screedHeating: 'Gas o eléctrica',
    operatingWeight: '10.500 kg (c/regla std.)',
    transportLength: '4.990 mm', transportWidth: '1.800 mm', transportHeight: '2.920 mm',
    operationSystem: 'Controles convencionales',
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
  // Cat AP455: cat.com product specifications (Tier 3 / Stage IIIA engine version)
  paverRow({
    brand: 'CATERPILLAR', model: 'AP455', sizeCategory: 'MEDIANA (3,6-6 m)',
    engine: '90 kW / 120,7 hp', engineManufacturer: 'Cat C3.6 (4 cil.)',
    emissionStandard: 'UN ECE R96 Stage IIIA (equivalente EPA Tier 3 / EU Stage IIIA)',
    nominalPower: '90 kW / 120,7 hp', fuelTankCapacity: '200 L', maxProduction: '774 t/h',
    pavingSpeed: 'Hasta 61 m/min', travelSpeed: '11 km/h',
    minWorkingWidth: '2,4 m (SE47 VT)', baseWidthRetracted: '2,4 m (SE47 VT)', maxWidthWithExtensions: '6,0 m (SE47 VT)',
    pushRollers: 'Rodillo de empuje ajustable', screedTypes: 'SE47 VT',
    operatingWeight: '14.929 kg (c/SE47 VT) / 11.604 kg (tractor)',
    transportLength: '5.600 mm', transportWidth: '2.550 mm', transportHeight: '2.900 mm',
    operationSystem: 'Consola simple y deslizante', gradeControl: 'Cat Grade Control (opcional)',
    telematics: 'Product Link Elite',
  }),
  // Cat AP555: cat.com product specifications (Tier 3 / Stage IIIA engine version)
  paverRow({
    brand: 'CATERPILLAR', model: 'AP555', sizeCategory: 'GRANDE (6,1-9 m)',
    engine: '106 kW / 142 hp', engineManufacturer: 'Cat C4.4 (4 cil.)',
    emissionStandard: 'UN ECE R96 Stage IIIA (equivalente EPA Tier 3 / EU Stage IIIA)',
    nominalPower: '106 kW / 142 hp', fuelTankCapacity: '200 L', maxProduction: '1.000 t/h',
    pavingSpeed: 'Hasta 25 m/min', travelSpeed: '11 km/h',
    minWorkingWidth: '2,4 m (SE47 VT) / 2,55 m (SE50 VT)', baseWidthRetracted: '2,4 m (SE47 VT) / 2,55 m (SE50 VT)',
    maxWidthWithExtensions: '6,0 m (SE47 VT) / 7,64 m (SE50 VT)',
    pushRollers: 'Rodillo de empuje ajustable', screedTypes: 'SE47 VT / SE50 VT',
    operatingWeight: '15.993 kg (c/SE50 VT) / 15.914 kg (c/SE47 VT)\n12.589 kg (tractor)',
    transportLength: '5.700 mm', transportWidth: '2.550 mm', transportHeight: '2.900 mm',
    operationSystem: 'Consola simple y deslizante', gradeControl: 'Cat Grade Control (opcional)',
    telematics: 'Product Link Elite',
  }),
  // SANY paver flyers / datasheets (China III emission level, equivalent to EPA Tier 3 / EU Stage IIIA)
  paverRow({
    brand: 'SANY', model: 'SAP45C-10', sizeCategory: 'COMPACTA (≤350 t/h)',
    engine: '97 kW / 130 hp', engineManufacturer: 'Dongfeng Cummins QSB4.5 (4 cil.)', emissionStandard: 'China III (equivalente EPA Tier 3 / EU Stage IIIA)',
    nominalPower: '97 kW / 130 hp', maxProduction: '320 t/h', pavingSpeed: 'Hasta 32 m/min', travelSpeed: '3,5 km/h', maxLayerThickness: '250 mm',
    minWorkingWidth: '1,7 m', baseWidthRetracted: '1,7 m', extendedBaseWidth: '3,1 m', maxWidthWithExtensions: '4,5 m',
    hopperCapacity: '6 m3', screedHeating: 'Eléctrica', tamperVibrationFreq: 'Vibr. 0–25 Hz (amplitud 4 mm)',
  }),
  paverRow({
    brand: 'SANY', model: 'SAP60C-10', sizeCategory: 'MEDIANA (351-700 t/h)',
    engine: '119 kW / 160 hp', engineManufacturer: 'DCEC QSB4.5-C160 (4 cil.)', emissionStandard: 'China III (equivalente EPA Tier 3 / EU Stage IIIA)',
    nominalPower: '119 kW / 160 hp', maxProduction: '450 t/h', pavingSpeed: 'Hasta 20 m/min', travelSpeed: '3 km/h', maxLayerThickness: '250 mm',
    minWorkingWidth: '2,0 m', baseWidthRetracted: '2,0 m', extendedBaseWidth: '3,7 m', maxWidthWithExtensions: '6,0 m',
    hopperCapacity: '6 m3', screedHeating: 'Eléctrica', tamperVibrationFreq: 'Tamper 0–25 Hz / Vibr. 0–40 Hz',
    transportLength: '6.210 mm', transportWidth: '2.360 mm', transportHeight: '3.080 mm',
  }),
  paverRow({
    brand: 'SANY', model: 'SAP60C-10T', sizeCategory: 'MEDIANA (351-700 t/h)',
    engine: '120 kW / 161 hp', engineManufacturer: 'Isuzu 4HK1 (4 cil.)', emissionStandard: 'China III (equivalente EPA Tier 3 / EU Stage IIIA)',
    nominalPower: '120 kW / 161 hp', maxProduction: '500 t/h', pavingSpeed: 'Hasta 25 m/min', travelSpeed: '15 km/h (sobre ruedas)', maxLayerThickness: '300 mm',
    minWorkingWidth: '2,3 m', baseWidthRetracted: '2,3 m', maxWidthWithExtensions: '6,0 m',
    hopperCapacity: '6 m3', screedHeating: 'Eléctrica', tamperVibrationFreq: 'Vibr. 0–1500 rpm (amplitud 4 mm)',
    transportLength: '7.090 mm', transportWidth: '2.600 mm', transportHeight: '3.220 mm',
  }),
  paverRow({
    brand: 'SANY', model: 'SAP90C-10S', sizeCategory: 'EXTRA GRANDE (>9 m)',
    engine: '158 kW / 212 hp', engineManufacturer: 'Cummins QSB6.7 (6 cil.)', emissionStandard: 'China III (equivalente EPA Tier 3 / EU Stage IIIA)',
    nominalPower: '158 kW / 212 hp', fuelTankCapacity: '360 L', maxProduction: '900 t/h', pavingSpeed: 'Hasta 24 m/min', travelSpeed: '3 km/h',
    maxLayerThickness: '350 mm', minWorkingWidth: '3,0 m', baseWidthRetracted: '3,0 m', extendedBaseWidth: '5,7 m', maxWidthWithExtensions: '9,2 m',
    hopperCapacity: '16 t', augerDiameter: '480 / 400 mm - hasta 105 rpm', conveyors: '2 - hasta 32 m/min, ctrl indep.\nreversibles',
    screedHeating: 'Eléctrica - generador 35 kW', tamperVibrationFreq: 'Tamper 25 Hz / Vibr. 50 Hz',
    operatingWeight: '20.500 kg (tractor + regla básica)',
    transportLength: '7.150 mm', transportWidth: '3.100 mm', transportHeight: '3.200 mm',
    operationSystem: 'Asistente de conducción (cámara)', gradeControl: 'MOBA analógico (std.)',
  }),
  paverRow({
    brand: 'SANY', model: 'SSP90C-8', sizeCategory: 'EXTRA GRANDE (>9 m)',
    engine: '180 kW / 241 hp', engineManufacturer: 'SANY D07S3-245E0 (6 cil.)', emissionStandard: 'China III (equivalente EPA Tier 3 / EU Stage IIIA)',
    nominalPower: '180 kW / 241 hp', maxProduction: '900 t/h', pavingSpeed: 'Hasta 16 m/min', travelSpeed: '2,4 km/h', maxLayerThickness: '500 mm',
    minWorkingWidth: '3,0 m', baseWidthRetracted: '3,0 m (SE570)', extendedBaseWidth: '5,7 m (SE570)', maxWidthWithExtensions: '9,2 m',
    hopperCapacity: '8,5 m3', screedTypes: 'SANY SE570', screedHeating: 'Eléctrica', tamperVibrationFreq: 'Tamper 0–25 Hz / Vibr. 0–50 Hz',
    transportLength: '7.250 mm', transportWidth: '3.135 mm', transportHeight: '3.330 mm', gradeControl: 'MOBA (control + sensor)',
  }),
  // VÖGELE datasheets / brochures (Tier 3 / Stage IIIA engine versions)
  paverRow({
    brand: 'VÖGELE', model: 'Super 1300-3', sizeCategory: 'COMPACTA (≤350 t/h)',
    engine: '74,4 kW / 99,8 hp', engineManufacturer: 'Deutz TCD 3.6 L4 (4 cil.)',
    emissionStandard: 'EU Fase 3a / EPA Tier 3', nominalPower: '74,4 kW / 99,8 hp', fuelSavingMode: 'Modo ECO (68,7 kW a 1600 rpm)',
    fuelTankCapacity: '110 L', maxProduction: '350 t/h', pavingSpeed: 'Hasta 30 m/min', travelSpeed: '4,5 km/h', maxLayerThickness: '250 mm',
    minWorkingWidth: '0,75 m (con zapata reductora) - 5,0 m máx.', baseWidthRetracted: '1,8 m (AB340)', extendedBaseWidth: '3,4 m (AB340)',
    maxWidthWithExtensions: '4,2 m (AB340 V) / 5,0 m (AB340 TV)', hopperCapacity: '10 t',
    augerDiameter: '300 mm - hasta 85 rpm', conveyors: '2 - hasta 29 m/min variable\nreversibles',
    pushRollers: 'Oscilantes estándar', screedTypes: 'AB340 V / TV', screedHeating: 'Eléctrica - generador',
    operatingWeight: '10.750 kg (AB340 TV hasta 3,4m)\n11.400 kg (AB340 TV hasta 5m)',
    transportLength: '4.950 mm (AB340 TV)', transportWidth: '1.850 mm', transportHeight: '3.100 mm',
    operationSystem: 'ErgoPlus 3', gradeControl: 'Niveltronic Plus (integrado std.)',
    telematics: 'WITOS / PaveDock Assistant (opcional)',
  }),
  paverRow({
    brand: 'VÖGELE', model: 'Super 1400', sizeCategory: 'MEDIANA (351-700 t/h)',
    engine: '101 kW / 135 hp', engineManufacturer: 'John Deere 4045 PTE (4 cil.)', emissionStandard: 'EU Fase 3a / EPA Tier 3',
    nominalPower: '101 kW / 135 hp', fuelSavingMode: 'Modo ECO (94 kW a 1800 rpm)', fuelTankCapacity: '220 L',
    maxProduction: '600 t/h', pavingSpeed: 'Hasta 24 m/min', travelSpeed: '4,5 km/h', maxLayerThickness: '300 mm',
    minWorkingWidth: '2,55 m (AB480)', baseWidthRetracted: '2,55 m (AB480) / 3,0 m (AB570)',
    extendedBaseWidth: '4,8 m (AB480) / 5,7 m (AB570)', maxWidthWithExtensions: '6,3 m (AB480) / 6,2 m (AB570)',
    hopperCapacity: '13 t', augerDiameter: '400 mm - hasta 65 rpm', conveyors: '2 - 25 m/min',
    pushRollers: 'Oscilantes estándar', screedTypes: 'AB480 / AB570 TV', screedHeating: 'Eléctrica - generador',
    operatingWeight: '16.500 kg (AB480 hasta 4,8m)\n18.260 kg (AB480 hasta 6,3m)',
    transportLength: '6.040 mm (AB480 TV)', transportWidth: '2.550 mm', transportHeight: '3.093 mm',
    operationSystem: 'ErgoBasic', gradeControl: 'Niveltronic Basic', centralizedLubrication: 'Puntos de lubricación centralizados',
  }),
  paverRow({
    brand: 'VÖGELE', model: 'Super 1600-3', sizeCategory: 'MEDIANA (351-700 t/h)',
    engine: '116 kW / 156 hp', engineManufacturer: 'Cummins QSB4.5-C155 (4 cil.)', emissionStandard: 'EU Fase 3a / EPA Tier 3',
    nominalPower: '116 kW / 156 hp', fuelSavingMode: 'EcoPlus', fuelTankCapacity: '220 L',
    maxProduction: '600 t/h', pavingSpeed: 'Hasta 25 m/min', travelSpeed: '4,5 km/h', maxLayerThickness: '300 mm',
    minWorkingWidth: '2,55 m (AB500)', baseWidthRetracted: '2,55 m (AB500) / 3,0 m (AB600)',
    extendedBaseWidth: '5,0 m (AB500) / 6,0 m (AB600)', maxWidthWithExtensions: '6,5 m / 7,5 m (opcional)',
    hopperCapacity: '13 t', augerDiameter: '400 mm - hasta 84 rpm', conveyors: '2 - hasta 34 m/min variable\nreversibles',
    pushRollers: 'Oscilantes estándar\nPaveDock elástico (opcional)', screedTypes: 'AB500 / AB600 TV', screedHeating: 'Eléctrica - generador',
    operatingWeight: '18.750 kg (AB500 hasta 5m)\n22.400 kg (AB500 hasta 8,5m)',
    transportLength: '5.690 mm (AB500/600 TV)', transportWidth: '2.550 mm', transportHeight: '2.950 mm',
    operationSystem: 'ErgoPlus 3 - gran pantalla color\nAutoSet Plus', gradeControl: 'Niveltronic Plus (integrado std.)',
    telematics: 'WITOS FleetView + PaveDock Assistant', centralizedLubrication: 'Lubricación central automática',
  }),
  paverRow({
    brand: 'VÖGELE', model: 'Super 1900-3 G', sizeCategory: 'EXTRA GRANDE (>9 m)',
    engine: '158 kW / 212 hp', engineManufacturer: 'Cummins QSB6.7-C215 (6 cil.)', emissionStandard: 'EU Fase 3a / EPA Tier 3',
    nominalPower: '158 kW / 212 hp', fuelSavingMode: 'Modo ECO', fuelTankCapacity: '350 L',
    maxProduction: '1.000 t/h', pavingSpeed: 'Hasta 24 m/min', travelSpeed: '4,5 km/h', maxLayerThickness: '500 mm (SB300 HD)',
    minWorkingWidth: '2,55 m (AB480/AB500)', baseWidthRetracted: '2,55 m (AB480/AB500) / 3,0 m (AB570/AB600/SB300 HD)',
    extendedBaseWidth: '4,8 m (AB480) / 5,0 m (AB500)\n5,7 m (AB570) / 6,0 m (AB600)',
    maxWidthWithExtensions: '10,0 m (AB600) / 9,5 m (SB300 HD)',
    hopperCapacity: '15 t', augerDiameter: '420 mm - hasta 79 rpm', conveyors: '2 - hasta 31 m/min variable\nreversibles',
    pushRollers: 'Oscilantes estándar', screedTypes: 'AB480/500/570/600 TV\nSB300 HD (támper)', screedHeating: 'Eléctrica - generador',
    operatingWeight: '18.525 - 20.995 kg (según regla)',
    transportLength: '6.710 mm (AB TV)', transportWidth: '2.550 mm', transportHeight: '3.120 mm',
    operationSystem: 'ErgoBasic', gradeControl: 'Niveltronic Basic', centralizedLubrication: 'Lubricación central automática',
  }),
  // Dynapac FC1600C datasheet 2017-03
  paverRow({
    brand: 'DYNAPAC', model: 'FC1600C', sizeCategory: 'MEDIANA (351-700 t/h)',
    engine: '74 kW / 99 hp', engineManufacturer: 'Cummins QSB 3.3', emissionStandard: 'EPA Tier 3 / EU Stage IIIA',
    nominalPower: '74 kW / 99,2 hp', fuelTankCapacity: '83 L', maxProduction: '600 t/h',
    pavingSpeed: '2,5 km/h', travelSpeed: '5 km/h', maxLayerThickness: '150 mm',
    minWorkingWidth: '0,30 m (con zapata reductora) - 5,5 m máx.',
    baseWidthRetracted: '2,45 m (VF0816C)', extendedBaseWidth: '4,70 m (VF0816C)', maxWidthWithExtensions: '5,50 m',
    hopperCapacity: '7,3 t', augerDiameter: '230 mm', conveyors: '2 - 610 mm',
    screedTypes: 'Dynapac VF0816C (vibración)', screedHeating: 'Eléctrica - generador 16 kW',
    operatingWeight: '8.400 kg (c/regla std.) / 6.400 kg (tractor)',
    transportLength: '4.190 mm', transportWidth: '2.590 mm', transportHeight: '1.800 mm',
    gradeControl: 'Sistema de nivelación (opcional)', telematics: 'FleetLink',
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
    // Dynapac F2500WS datasheet 2025-04
    brand: 'DYNAPAC', model: 'F2500WS', sizeCategory: 'GRANDE (6,1-9 m)',
    engine: '129 kW / 173 hp', engineManufacturer: 'Cummins QSB 6.7-C173', emissionStandard: 'Stage IIIA / Tier 3',
    nominalPower: '129 kW / 173,0 hp', fuelTankCapacity: '315 L', maxProduction: '650 t/h', maxLayerThickness: '300 mm',
    minWorkingWidth: '2,05 m (con zapata reductora) - 6,7 m máx.',
    baseWidthRetracted: '2,55 m (V5100) / 3,0 m (V6000)', extendedBaseWidth: '5,1 m (V5100) / 6,0 m (V6000)',
    maxWidthWithExtensions: '6,6 m (V5100) / 6,7 m (V6000)',
    hopperCapacity: '6,0 m3', augerDiameter: '380 mm', conveyors: '2 - 580 mm, ctrl indep.',
    screedTypes: 'V5100 TV / TVE\nV6000 TV / TVE', screedHeating: 'Gas o eléctrica',
    operatingWeight: '17.500 kg (c/regla std.)',
    transportLength: '6.100 mm', transportWidth: '2.550 mm', transportHeight: '3.100 mm',
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
  // Dynapac SD-Series highway paver portfolio (Stage IIIA engine versions)
  // Completed from the Dynapac SD2500CS datasheet (2026-02, Stage IIIA engine version); hopper volume from the SD2500CS Protac datasheet
  paverRow({
    brand: 'DYNAPAC', model: 'SD2500CS', sizeCategory: 'EXTRA GRANDE (>9 m)',
    engine: '142 kW / 190 hp', engineManufacturer: 'Cummins QSB 6.7-C190', emissionStandard: 'EU Stage IIIA / Tier 3',
    nominalPower: '142 kW / 190,4 hp', fuelTankCapacity: '337 L', maxProduction: '800 t/h',
    pavingSpeed: 'Hasta 28 m/min', travelSpeed: '4 km/h', maxLayerThickness: '310 mm',
    minWorkingWidth: '2,05 m (con zapata reductora) - 10,0 m máx.', baseWidthRetracted: '2,55 m (V5100) / 3,0 m (V6000/R300)',
    extendedBaseWidth: '5,1 m (V5100) / 6,0 m (V6000)', maxWidthWithExtensions: '10,0 m',
    hopperCapacity: '12 t (6 m3)', augerDiameter: '380 mm', conveyors: '2 - 2×655 mm, reversibles\ncontrol proporcional',
    pushRollers: 'Fijo pivotable (std.)\nHidráulico amortiguado (opc.)',
    screedTypes: 'V5100 / V6000 TV, TVE, THE\nR300', screedHeating: 'Eléctrica - generador 33 kVA',
    operatingWeight: '19.000 kg',
    transportLength: '6.150 mm', transportWidth: '2.550 mm', transportHeight: '3.100 mm',
    financial: { ...NO_FINANCIAL, avgFuelConsumption: '10,5 l/h', fuelDataSource: 'Ficha técnica oficial', fuelConsumption10h: '105' },
  }),
  paverRow({
    brand: 'DYNAPAC', model: 'SD2550C', sizeCategory: 'EXTRA GRANDE (>9 m)',
    engine: '164 kW / 220 hp', engineManufacturer: 'Cummins QSB6.7-C220', emissionStandard: 'EU Stage IIIA / Tier 3',
    nominalPower: '164 kW / 220 hp', fuelTankCapacity: '353 L', maxProduction: '900 t/h', travelSpeed: '4 km/h',
    minWorkingWidth: '2,55 - 12,0 m', maxWidthWithExtensions: '12,0 m', augerDiameter: '430 mm',
    operatingWeight: '20.000 kg',
  }),
  paverRow({
    brand: 'DYNAPAC', model: 'SD2550CS', sizeCategory: 'EXTRA GRANDE (>9 m)',
    engine: '194 kW / 260 hp', engineManufacturer: 'Cummins QSB6.7-C260', emissionStandard: 'EU Stage IIIA / Tier 3',
    nominalPower: '194 kW / 260,2 hp', fuelTankCapacity: '322 L', maxProduction: '1.100 t/h', travelSpeed: '4 km/h',
    minWorkingWidth: '2,55 - 14,0 m', maxWidthWithExtensions: '14,0 m', augerDiameter: '500 mm',
    operatingWeight: '20.000 kg',
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
