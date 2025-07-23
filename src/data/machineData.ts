export interface MachineSpec {
  brand: string;
  model: string;
  weight: number;
  engine: string;
  compactionWidth: number;
  power: number;
  amplitude: string;
  staticLinearLoad: number;
  gradeability: number;
  origin: string;
  compactionAssistant: string;
  telemetry: string;
  innovations: string;
  usp: string;
  maxCompactionDepth: number;
  compactionPerformance: string;
  fuelConsumption: number;
  price: number;
  preventiveMaintenance: number;
  correctiveMaintenance: number;
  usageTime: number;
  tco: number;
}

export const sdrMachines: MachineSpec[] = [
  {
    brand: "BOMAG",
    model: "BW211 D5-SL",
    weight: 10630,
    engine: "Cummins 4BT 3.9",
    compactionWidth: 2.1,
    power: 100,
    amplitude: "1,80 / 0,95",
    staticLinearLoad: 28.4,
    gradeability: 45,
    origin: "India",
    compactionAssistant: "BOMAG ECONOMIZER - Sistema visual que permite a los operadores medir el progreso de la compactación en tiempo real. Utiliza una escala LED en la cabina para mostrar el nivel de compactación alcanzado, ayudando a evitar sobrecompactación o subcompactación. (Estandar)",
    telemetry: "Telematics",
    innovations: "Economizer, TERRAMETER (Evib real), VARIOCONTROL, ECOMODE, TELEMATIC",
    usp: "Operación Intuitiva - Un switch para cada función - Símbolos intuitivos facilitan la operación",
    maxCompactionDepth: 60,
    compactionPerformance: "270 - 540",
    fuelConsumption: 11.8,
    price: 57592.78,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 119692.78
  },
  {
    brand: "BOMAG",
    model: "BW211 D5-SL",
    weight: 10630,
    engine: "Cummins 4BTAA 3.9",
    compactionWidth: 2.1,
    power: 110,
    amplitude: "1,80 / 0,95",
    staticLinearLoad: 28.4,
    gradeability: 45,
    origin: "India",
    compactionAssistant: "BOMAG ECONOMIZER - Sistema visual que permite a los operadores medir el progreso de la compactación en tiempo real. Utiliza una escala LED en la cabina para mostrar el nivel de compactación alcanzado, ayudando a evitar sobrecompactación o subcompactación. (Estandar)",
    telemetry: "Telematics",
    innovations: "Economizer, TERRAMETER (Evib real), VARIOCONTROL, ECOMODE, TELEMATIC",
    usp: "Operación Intuitiva - Un switch para cada función - Símbolos intuitivos facilitan la operación",
    maxCompactionDepth: 60,
    compactionPerformance: "270 - 540",
    fuelConsumption: 11.8,
    price: 59374.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 121474.00
  },
  {
    brand: "BOMAG",
    model: "BW211 D5-SL",
    weight: 10630,
    engine: "Deutz BF4M 2012 C",
    compactionWidth: 2.1,
    power: 132,
    amplitude: "1,80 / 0,95",
    staticLinearLoad: 28.4,
    gradeability: 45,
    origin: "China",
    compactionAssistant: "BOMAG ECONOMIZER - Sistema visual que permite a los operadores medir el progreso de la compactación en tiempo real. Utiliza una escala LED en la cabina para mostrar el nivel de compactación alcanzado, ayudando a evitar sobrecompactación o subcompactación. (Estandar)",
    telemetry: "Telematics",
    innovations: "Economizer, TERRAMETER (Evib real), VARIOCONTROL, ECOMODE, TELEMATIC",
    usp: "Operación Intuitiva - Un switch para cada función - Símbolos intuitivos facilitan la operación",
    maxCompactionDepth: 60,
    compactionPerformance: "270 - 540",
    fuelConsumption: 12.4,
    price: 63530.18,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 128330.18
  },
  {
    brand: "HAMM",
    model: "HC110",
    weight: 11765,
    engine: "JDPS 4045PTE",
    compactionWidth: 2.14,
    power: 135.4,
    amplitude: "1,95/0,85",
    staticLinearLoad: 29.81,
    gradeability: 58,
    origin: "Germany",
    compactionAssistant: "No aplica",
    telemetry: "Smart Doc",
    innovations: "EcoStop, SmartCompaction, vibración adaptativa",
    usp: "Conducción y maniobrabilidad - Bloqueo integrado de la articulación pendular - Control de tracción para una óptima transmisión de potencia",
    maxCompactionDepth: 60,
    compactionPerformance: "250 - 400",
    fuelConsumption: 13.6,
    price: 91845.10,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 162045.10
  },
  {
    brand: "DYNAPAC",
    model: "CA25 D-Rhino",
    weight: 10500,
    engine: "Cummins QSF3.8",
    compactionWidth: 2.13,
    power: 130,
    amplitude: "1,8/0,9",
    staticLinearLoad: 26,
    gradeability: 65,
    origin: "Sweden/ Brazil/ China",
    compactionAssistant: "No aplica",
    telemetry: "Dyn@lizer",
    innovations: "Dynapac Compaction meter (DCM), Dyn@lyzer",
    usp: "Controles intuitivos: Palancas simples y panel de instrumentos con indicadores claros, fáciles de operar incluso por personal con poca experiencia.",
    maxCompactionDepth: 55,
    compactionPerformance: "220 - 350",
    fuelConsumption: 13.6,
    price: 90000.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 160200.00
  }
];

export interface CompactionData {
  weightRange: string;
  rock: string;
  gravel: string;
  mixedSoil: string;
  clay: string;
}

export const compactionHeightData: CompactionData[] = [
  { weightRange: "1.5 – 2.5", rock: "-", gravel: "0.20 – 0.30", mixedSoil: "0.20 – 0.25", clay: "0.10 – 0.15" },
  { weightRange: "3.0 – 4.5", rock: "-", gravel: "0.25 – 0.30", mixedSoil: "0.25 – 0.30", clay: "0.15 – 0.20" },
  { weightRange: "7 – 9", rock: "-", gravel: "0.30 – 0.40", mixedSoil: "0.30 – 0.40", clay: "0.15 – 0.20" },
  { weightRange: "10 – 12", rock: "-", gravel: "0.30 – 0.50", mixedSoil: "0.30 – 0.40", clay: "0.20 – 0.30" },
  { weightRange: "2 – 3", rock: "-", gravel: "0.20 – 0.35", mixedSoil: "0.20 – 0.30", clay: "0.15 – 0.20" },
  { weightRange: "6 – 8", rock: "0.30 – 0.50", gravel: "0.30 – 0.40", mixedSoil: "0.25 – 0.35", clay: "0.15 – 0.20" },
  { weightRange: "9 – 12", rock: "0.50 – 0.80", gravel: "0.50 – 0.80", mixedSoil: "0.40 – 0.60", clay: "0.20 – 0.30" },
  { weightRange: "13 – 16", rock: "0.80 – 1.20", gravel: "0.80 – 1.20", mixedSoil: "0.50 – 0.80", clay: "0.20 – 0.35" },
  { weightRange: "19 – 25", rock: "1.00 – 2.00", gravel: "0.80 – 1.50", mixedSoil: "0.60 – 1.00", clay: "0.30 – 0.50" }
];

export const compactionPerformanceData: CompactionData[] = [
  { weightRange: "1.5 – 2.5", rock: "-", gravel: "50 – 150", mixedSoil: "50 – 120", clay: "30 – 70" },
  { weightRange: "3.0 – 4.5", rock: "-", gravel: "70 – 200", mixedSoil: "60 – 150", clay: "40 – 90" },
  { weightRange: "7 – 9", rock: "-", gravel: "120 – 350", mixedSoil: "100 – 250", clay: "80 – 150" },
  { weightRange: "10 – 12", rock: "-", gravel: "200 – 500", mixedSoil: "150 – 300", clay: "100 – 200" },
  { weightRange: "2 – 3", rock: "-", gravel: "60 – 180", mixedSoil: "60 – 180", clay: "40 – 100" },
  { weightRange: "6 – 8", rock: "200 – 500", gravel: "100 – 400", mixedSoil: "100 – 350", clay: "70 – 200" },
  { weightRange: "9 – 12", rock: "400 – 900", gravel: "200 – 700", mixedSoil: "200 – 600", clay: "100 – 300" },
  { weightRange: "13 – 16", rock: "500 – 1400", gravel: "350 – 1000", mixedSoil: "300 – 800", clay: "150 – 400" },
  { weightRange: "19 – 25", rock: "900 – 2200", gravel: "500 – 1600", mixedSoil: "500 – 1200", clay: "300 – 500" },
  { weightRange: "6 – 7", rock: "300 – 600", gravel: "200 – 400", mixedSoil: "150 – 250", clay: "100 – 200" }
];