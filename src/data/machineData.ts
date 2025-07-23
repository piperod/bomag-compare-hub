export interface MachineSpec {
  brand: string;
  model: string;
  weight: number;
  engine: string;
  compactionWidth: number;
  power: number;
  amplitude: string;
  staticLinearLoad: number;
  gradeability?: number;
  origin: string;
  compactionAssistant: string;
  telemetry?: string;
  innovations: string;
  usp: string;
  maxCompactionDepth?: number;
  compactionPerformance?: string;
  fuelConsumption: number;
  price: number;
  preventiveMaintenance: number;
  correctiveMaintenance: number;
  usageTime: number;
  tco: number;
  // LTR specific fields
  compactionSystem?: string;
  waterTankCapacity?: number;
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

export const ltrMachines: MachineSpec[] = [
  {
    brand: "BOMAG",
    model: "BW120 AD 5",
    weight: 2700,
    engine: "Kubota D1703",
    compactionWidth: 1.2,
    power: 32.6,
    amplitude: "0.5",
    staticLinearLoad: 11.3,
    origin: "Germany/China",
    compactionAssistant: "Economizer - Sensor de rigidez del suelo",
    innovations: "Bajos TCO (Servicio/Matenimiento/Reparación/confiabilidad)",
    usp: "Fácil y seguro de operar. Economizer (Opción) Incluye indicador de temperatura",
    fuelConsumption: 2.6,
    price: 28000.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 1.3,
    usageTime: 3500,
    tco: 49700.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 205
  },
  {
    brand: "CATERPILLAR",
    model: "CB2.7GC",
    weight: 2698,
    engine: "CAT C1.7T",
    compactionWidth: 1.3,
    power: 24.6,
    amplitude: "0.52",
    staticLinearLoad: 13.7,
    origin: "China",
    compactionAssistant: "CMV (Compaction Meter Value)",
    innovations: "Rodillo de bajo costo operativo, ideal para flotas de alquiler o trabajos donde la simplicidad y confiabilidad mecánica son prioridad.",
    usp: "Rodillo de bajo costo operativo, ideal para flotas de alquiler o trabajos donde la simplicidad y confiabilidad mecánica son prioridad.",
    fuelConsumption: 2.3,
    price: 29630.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3500,
    tco: 52205.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 200
  },
  {
    brand: "HAMM",
    model: "HD12 VV",
    weight: 2695,
    engine: "Kubota D1503",
    compactionWidth: 1.25,
    power: 30.7,
    amplitude: "0.52",
    staticLinearLoad: 11.2,
    origin: "Czech",
    compactionAssistant: "HAMM Compaction Meter: Sensor de aceleración / frecuencia",
    innovations: "Máxima maniobrabilidad con doble tambor vibratorio y opción de configuración para zonas urbanas estrechas",
    usp: "Máxima maniobrabilidad con doble tambor vibratorio y opción de configuración para zonas urbanas estrechas",
    fuelConsumption: 2.8,
    price: 29580.00,
    preventiveMaintenance: 1.5,
    correctiveMaintenance: 1,
    usageTime: 3500,
    tco: 53030.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 180
  },
  {
    brand: "DYNAPAC",
    model: "CC1200",
    weight: 2600,
    engine: "Kubota D1703-M",
    compactionWidth: 1.2,
    power: 35,
    amplitude: "0.508",
    staticLinearLoad: 10.5,
    origin: "Brasil",
    compactionAssistant: "DCA-A Sensor de aceleración / amplitud",
    innovations: "Chasis compacto con diseño en tándem y opción de sistema DCA para trazabilidad por zonas (en modelos superiores).",
    usp: "Chasis compacto con diseño en tándem y opción de sistema DCA para trazabilidad por zonas (en modelos superiores).",
    fuelConsumption: 2.7,
    price: 26783.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 1.4,
    usageTime: 3500,
    tco: 49358.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 159
  },
  {
    brand: "AMMANN",
    model: "ARX 26",
    weight: 2460,
    engine: "Yanmar 3TNV88F",
    compactionWidth: 1.2,
    power: 27.3,
    amplitude: "0.6",
    staticLinearLoad: 10.3,
    origin: "Switzerland",
    compactionAssistant: "ACEforce: Sensor de rigidez dinámica",
    innovations: "Tecnología de compactación activa que ajusta automáticamente la vibración según la rigidez del suelo para optimizar el número de pasadas.",
    usp: "Tecnología de compactación activa que ajusta automáticamente la vibración según la rigidez del suelo para optimizar el número de pasadas.",
    fuelConsumption: 3.2,
    price: 25500.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 1.3,
    usageTime: 3500,
    tco: 50350.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 110
  },
  {
    brand: "JCB",
    model: "CT260",
    weight: 2740,
    engine: "Kubota D1703-M",
    compactionWidth: 1.2,
    power: 24.4,
    amplitude: "0.51",
    staticLinearLoad: 10.5,
    origin: "India",
    compactionAssistant: "No aplica",
    innovations: "Diseño robusto, excelente acceso a mantenimiento y componentes estandarizados para máxima disponibilidad en campo.",
    usp: "Diseño robusto, excelente acceso a mantenimiento y componentes estandarizados para máxima disponibilidad en campo.",
    fuelConsumption: 2.7,
    price: 23500.00,
    preventiveMaintenance: 1.5,
    correctiveMaintenance: 2,
    usageTime: 3500,
    tco: 49925.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 197
  },
  {
    brand: "WACKER NEUSON",
    model: "RD27",
    weight: 2695,
    engine: "Kubota D1903-M",
    compactionWidth: 1.2,
    power: 30.7,
    amplitude: "0.51",
    staticLinearLoad: 10.5,
    origin: "Germany",
    compactionAssistant: "No aplica",
    innovations: "Diseño robusto, excelente acceso a mantenimiento y componentes estandarizados para máxima disponibilidad en campo.",
    usp: "Diseño robusto, excelente acceso a mantenimiento y componentes estandarizados para máxima disponibilidad en campo.",
    fuelConsumption: 2.7,
    price: 23500.00,
    preventiveMaintenance: 1.5,
    correctiveMaintenance: 2,
    usageTime: 3500,
    tco: 49925.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 197
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