/**
 * Milling machine specifications (cold milling machines).
 * Criteria and USP labels follow the comparison table structure.
 */
export interface MillingMachineSpec {
  brand: string;
  model: string;
  engine: string; // for getMachineId and display
  millingWidth: string;
  maxDepth: string;
  enginePower: string;
  drumDiameter: string;
  workingSpeed: string;
  travelSpeed: string;
  transportCapacity: string;
  conveyorBeltWidth: string;
  waterTank: string;
  operatingWeight: string;
  minTurningRadius: string;
  cuttingSystem: { es: string; en: string; de: string; pt: string };
  energyEfficiency: { es: string; en: string; de: string; pt: string };
  usp1: { es: string; en: string; de: string; pt: string };
  usp2: { es: string; en: string; de: string; pt: string };
  usp3: { es: string; en: string; de: string; pt: string };
  usp4: { es: string; en: string; de: string; pt: string };
  idealApplication: { es: string; en: string; de: string; pt: string };
  valueProposition: { es: string; en: string; de: string; pt: string };
  /** Interactive financial analysis defaults (USD, L/h, USD/h) */
  price?: number;
  fuelConsumption?: number;
  preventiveMaintenance?: number;
  correctiveMaintenance?: number;
  usageTime?: number;
  tco?: number;
  /** USP-driven productivity & TCO variables */
  transportCapacityM3h?: number;
  workingSpeedMmin?: number;
  turningRadiusM?: number;
  hasBms15l?: boolean;
  wearReductionPercent?: number;
  toolWearCostPerHour?: number;
}

export const millingMachines: MillingMachineSpec[] = [
  {
    brand: 'BOMAG',
    model: 'BM 1000/20',
    engine: '164 kW – Cummins QSB 6.7',
    millingWidth: '1.000 mm',
    maxDepth: '210 mm',
    enginePower: '164 kW – Cummins QSB 6.7',
    drumDiameter: '860 mm',
    workingSpeed: '0-40 m/min',
    travelSpeed: '8 km/h',
    transportCapacity: '92 m³/h',
    conveyorBeltWidth: '400 mm',
    waterTank: '700 L',
    operatingWeight: '11.800-13.600 kg',
    minTurningRadius: '0,38 m',
    cuttingSystem: {
      es: 'BMS15L con porta-herramientas de cambio rápido (1 tornillo). Menor desgaste y mayor eficiencia energética.',
      en: 'BMS15L with quick-change tool holder (1 bolt). Less wear and higher energy efficiency.',
      de: 'BMS15L mit Schnellwechsel-Werkzeughalter (1 Schraube). Geringerer Verschleiß und höhere Energieeffizienz.',
      pt: 'BMS15L com suporte de ferramentas de troca rápida (1 parafuso). Menor desgaste e maior eficiência energética.'
    },
    energyEfficiency: {
      es: 'Diseño optimizado que reduce desgaste hasta 20% y mejora consumo.',
      en: 'Optimized design that reduces wear by up to 20% and improves consumption.',
      de: 'Optimiertes Design, das den Verschleiß um bis zu 20 % reduziert und den Verbrauch verbessert.',
      pt: 'Design otimizado que reduz o desgaste em até 20% e melhora o consumo.'
    },
    usp1: {
      es: 'Alta eficiencia potencia-rendimiento. Mayor capacidad de transporte.',
      en: 'High power-performance efficiency. Greater transport capacity.',
      de: 'Hohe Leistungs-Effizienz. Größere Transportkapazität.',
      pt: 'Alta eficiência potência-desempenho. Maior capacidade de transporte.'
    },
    usp2: {
      es: 'Mejor radio de giro. Ideal para entornos urbanos y espacios reducidos.',
      en: 'Better turning radius. Ideal for urban environments and tight spaces.',
      de: 'Besserer Wenderadius. Ideal für urbane Umgebungen und beengte Räume.',
      pt: 'Melhor raio de giro. Ideal para ambientes urbanos e espaços reduzidos.'
    },
    usp3: {
      es: 'Hasta 20% menor desgaste. Cambio rápido de herramientas. Mejor costo total de propiedad.',
      en: 'Up to 20% less wear. Quick tool change. Better total cost of ownership.',
      de: 'Bis zu 20 % weniger Verschleiß. Schneller Werkzeugwechsel. Geringere Gesamtbetriebskosten.',
      pt: 'Até 20% menos desgaste. Troca rápida de ferramentas. Melhor custo total de propriedade.'
    },
    usp4: {
      es: 'Panel ergonómico. Mejor protección contra polvo y vibración. Ideal para jornadas largas.',
      en: 'Ergonomic panel. Better protection against dust and vibration. Ideal for long shifts.',
      de: 'Ergonomisches Panel. Besserer Schutz vor Staub und Vibration. Ideal für lange Schichten.',
      pt: 'Painel ergonômico. Melhor proteção contra poeira e vibração. Ideal para jornadas longas.'
    },
    idealApplication: {
      es: 'Obras urbanas, mantenimiento vial, trabajos de precisión y alta rotación operativa.',
      en: 'Urban works, road maintenance, precision work and high operational turnover.',
      de: 'Stadtarbeiten, Straßeninstandhaltung, Präzisionsarbeiten und hohe Betriebsumschlag.',
      pt: 'Obras urbanas, manutenção viária, trabalhos de precisão e alta rotação operacional.'
    },
    valueProposition: {
      es: 'Especialista en eficiencia, versatilidad y mejor TCO.',
      en: 'Specialist in efficiency, versatility and better TCO.',
      de: 'Spezialist für Effizienz, Vielseitigkeit und besseren TCO.',
      pt: 'Especialista em eficiência, versatilidade e melhor TCO.'
    },
    price: 0,
    fuelConsumption: 16,
    preventiveMaintenance: 12,
    correctiveMaintenance: 8,
    usageTime: 3000,
    tco: 0,
    transportCapacityM3h: 92,
    workingSpeedMmin: 40,
    turningRadiusM: 0.38,
    hasBms15l: true,
    wearReductionPercent: 20,
    toolWearCostPerHour: 15
  },
  {
    brand: 'SANY',
    model: 'SCM1000C-8',
    engine: '180 kW – Motor SAN',
    millingWidth: '1.000 mm',
    maxDepth: '280 mm',
    enginePower: '180 kW – Motor SAN',
    drumDiameter: '930 mm',
    workingSpeed: '35 m/min',
    travelSpeed: '8 km/h',
    transportCapacity: '-',
    conveyorBeltWidth: '500 mm',
    waterTank: '800 L',
    operatingWeight: '15.750 kg (más pesa)',
    minTurningRadius: '1,2 m',
    cuttingSystem: {
      es: 'Tambor de mayor diámetro orientado a trabajos profundos.',
      en: 'Larger diameter drum oriented to deep milling work.',
      de: 'Trommel mit größerem Durchmesser für Tieffräsarbeiten.',
      pt: 'Tambor de maior diâmetro orientado a trabalhos profundos.'
    },
    energyEfficiency: {
      es: 'Mayor potencia implica mayor demanda energética.',
      en: 'Higher power implies higher energy demand.',
      de: 'Höhere Leistung bedeutet höheren Energiebedarf.',
      pt: 'Maior potência implica maior demanda energética.'
    },
    usp1: {
      es: 'Mayor potencia y profundidad para fresado estructural pesado.',
      en: 'Higher power and depth for heavy structural milling.',
      de: 'Höhere Leistung und Tiefe für schweres Strukturfräsen.',
      pt: 'Maior potência e profundidade para fresagem estrutural pesada.'
    },
    usp2: {
      es: 'Mayor estabilidad, menor agilidad.',
      en: 'Greater stability, less agility.',
      de: 'Größere Stabilität, geringere Agilität.',
      pt: 'Maior estabilidade, menor agilidade.'
    },
    usp3: {
      es: 'Potencia elevada puede aumentar consumo y desgaste.',
      en: 'High power may increase consumption and wear.',
      de: 'Hohe Leistung kann Verbrauch und Verschleiß erhöhen.',
      pt: 'Potência elevada pode aumentar consumo e desgaste.'
    },
    usp4: {
      es: 'Cabina amplia y robusta.',
      en: 'Spacious and robust cab.',
      de: 'Geräumige und robuste Kabine.',
      pt: 'Cabine ampla e robusta.'
    },
    idealApplication: {
      es: 'Proyectos estructurales, grandes profundidades y alta carga productiva.',
      en: 'Structural projects, great depths and high productive load.',
      de: 'Strukturprojekte, große Tiefen und hohe Produktionslast.',
      pt: 'Projetos estruturais, grandes profundidades e alta carga produtiva.'
    },
    valueProposition: {
      es: 'Especialista en potencia y fresado profundo.',
      en: 'Specialist in power and deep milling.',
      de: 'Spezialist für Leistung und Tiefenfräsen.',
      pt: 'Especialista em potência e fresagem profunda.'
    },
    price: 0,
    fuelConsumption: 22,
    preventiveMaintenance: 10,
    correctiveMaintenance: 10,
    usageTime: 3000,
    tco: 0,
    transportCapacityM3h: 0,
    workingSpeedMmin: 35,
    turningRadiusM: 1.2,
    hasBms15l: false,
    toolWearCostPerHour: 20
  },
  {
    brand: 'XCMG',
    model: 'XM1005H',
    engine: '164 kW – Cummins QSB6.7',
    millingWidth: '1.000 mm',
    maxDepth: '220 mm',
    enginePower: '164 kW – Cummins QSB6.7',
    drumDiameter: '860 mm',
    workingSpeed: '50 m/min',
    travelSpeed: '8,5 km/h',
    transportCapacity: '84 m³/h',
    conveyorBeltWidth: '400 mm',
    waterTank: '850 L',
    operatingWeight: '13.900-14.100 kg',
    minTurningRadius: 'No declarado',
    cuttingSystem: {
      es: 'Configuración estándar con motor Cummins confiable.',
      en: 'Standard configuration with reliable Cummins engine.',
      de: 'Standardkonfiguration mit zuverlässigem Cummins-Motor.',
      pt: 'Configuração padrão com motor Cummins confiável.'
    },
    energyEfficiency: {
      es: 'Consumo competitivo dentro del segmento.',
      en: 'Competitive consumption within the segment.',
      de: 'Wettbewerbsfähiger Verbrauch innerhalb des Segments.',
      pt: 'Consumo competitivo dentro do segmento.'
    },
    usp1: {
      es: 'Buen desempeño general con alta velocidad operativa.',
      en: 'Good overall performance with high operating speed.',
      de: 'Gute Gesamtleistung mit hoher Betriebsgeschwindigkeit.',
      pt: 'Bom desempenho geral com alta velocidade operacional.'
    },
    usp2: {
      es: 'Maniobrabilidad intermedia.',
      en: 'Intermediate maneuverability.',
      de: 'Mittlere Manövrierfähigkeit.',
      pt: 'Manobrabilidade intermediária.'
    },
    usp3: {
      es: 'Motor Cummins facilita soporte y repuestos.',
      en: 'Cummins engine facilitates support and spare parts.',
      de: 'Cummins-Motor erleichtert Support und Ersatzteile.',
      pt: 'Motor Cummins facilita suporte e peças de reposição.'
    },
    usp4: {
      es: 'Diseño funcional estándar.',
      en: 'Standard functional design.',
      de: 'Standard-Funktionsdesign.',
      pt: 'Design funcional padrão.'
    },
    idealApplication: {
      es: 'Empresas que buscan equilibrio costo-beneficio.',
      en: 'Companies seeking cost-benefit balance.',
      de: 'Unternehmen, die Kosten-Nutzen-Gleichgewicht suchen.',
      pt: 'Empresas que buscam equilíbrio custo-benefício.'
    },
    valueProposition: {
      es: 'Alternativa competitiva balanceada en precio y rendimiento.',
      en: 'Competitive alternative balanced in price and performance.',
      de: 'Wettbewerbsfähige Alternative mit ausgewogenem Preis-Leistungs-Verhältnis.',
      pt: 'Alternativa competitiva equilibrada em preço e desempenho.'
    },
    price: 0,
    fuelConsumption: 18,
    preventiveMaintenance: 10,
    correctiveMaintenance: 8,
    usageTime: 3000,
    tco: 0,
    transportCapacityM3h: 84,
    workingSpeedMmin: 50,
    turningRadiusM: null,
    hasBms15l: false,
    toolWearCostPerHour: 17
  }
];

/** Single row of the preventive maintenance table (BM 1000/20) */
export interface PreventiveMaintenanceRow {
  revision: { es: string; en: string; de: string; pt: string };
  maintenance: { es: string; en: string; de: string; pt: string };
  period: string;
  description: { es: string; en: string; de: string; pt: string };
  sapCode: string;
  quantityPerMachine: string;
  unit: string;
  publicPrice: number;
  totalPrice: number | null;
}

/** Preventive maintenance routine and costs for BOMAG BM 1000/20 */
export const bm100020PreventiveMaintenance: PreventiveMaintenanceRow[] = [
  {
    revision: { es: 'Cada 250 h de servicio', en: 'Every 250 service hours', de: 'Alle 250 Betriebsstunden', pt: 'A cada 250 horas de serviço' },
    maintenance: { es: 'Cambiar el aceite del motor', en: 'Change engine oil', de: 'Motoröl wechseln', pt: 'Mudar o óleo do motor' },
    period: '250 H',
    description: { es: 'Aceite del motor', en: 'Engine oil', de: 'Motoröl', pt: 'Óleo do Motor' },
    sapCode: '54011173',
    quantityPerMachine: '16',
    unit: 'l',
    publicPrice: 80,
    totalPrice: null
  },
  {
    revision: { es: 'Cada 250 h de servicio', en: 'Every 250 service hours', de: 'Alle 250 Betriebsstunden', pt: 'A cada 250 horas de serviço' },
    maintenance: { es: 'Reemplazar filtro de aceite', en: 'Replace oil filter', de: 'Ölfilter ersetzen', pt: 'Substituir filtro de óleo' },
    period: '250 H',
    description: { es: 'Filtro de aceite', en: 'Oil filter', de: 'Ölfilter', pt: 'Filtro de óleo' },
    sapCode: '31782392',
    quantityPerMachine: '1',
    unit: 'PC',
    publicPrice: 120,
    totalPrice: null
  },
  {
    revision: { es: 'Cada 500 h de servicio', en: 'Every 500 service hours', de: 'Alle 500 Betriebsstunden', pt: 'A cada 500 horas de serviço' },
    maintenance: { es: 'Cambiar aceite de la transmisión (reductores de ruedas) ISO VG 220', en: 'Change transmission oil (wheel reducers) ISO VG 220', de: 'Getriebeöl wechseln (Radreduktoren) ISO VG 220', pt: 'Mudança do óleo da transmissão de marcha (Redutores da rodas) (ISO VG 220)' },
    period: '500 H',
    description: { es: 'Aceite de engranaje ISO VG 220', en: 'Gear oil ISO VG 220', de: 'Getriebeöl ISO VG 220', pt: 'Óleo de engrenagem ISO VG 220' },
    sapCode: '86821150',
    quantityPerMachine: '4 x 0,9',
    unit: 'l',
    publicPrice: 45,
    totalPrice: null
  },
  {
    revision: { es: 'Cada 500 h de servicio', en: 'Every 500 service hours', de: 'Alle 500 Betriebsstunden', pt: 'A cada 500 horas de serviço' },
    maintenance: { es: 'Cambiar aceite del engranaje de fresado (ISO VG 220)', en: 'Change milling gear oil (ISO VG 220)', de: 'Fräsgetriebeöl wechseln (ISO VG 220)', pt: 'Mudar o óleo da engrenagem de fresagem (ISO VG 220)' },
    period: '500 H',
    description: { es: 'Aceite de engranaje ISO VG 220', en: 'Gear oil ISO VG 220', de: 'Getriebeöl ISO VG 220', pt: 'Óleo de engrenagem ISO VG 220' },
    sapCode: '86821150',
    quantityPerMachine: '1',
    unit: 'l',
    publicPrice: 52,
    totalPrice: null
  },
  {
    revision: { es: 'Cada 500 h de servicio', en: 'Every 500 service hours', de: 'Alle 500 Betriebsstunden', pt: 'A cada 500 horas de serviço' },
    maintenance: { es: 'Reemplazar filtro de combustible, purgar aire del sistema', en: 'Replace fuel filter, purge air from fuel system', de: 'Kraftstofffilter ersetzen, Luft aus dem Kraftstoffsystem ablassen', pt: 'Substituir o filtro de combustível, purgar o ar do sistema de combustível' },
    period: '500 H',
    description: { es: 'Filtro de combustible', en: 'Fuel filter', de: 'Kraftstofffilter', pt: 'Filtro de combustível' },
    sapCode: '31782401',
    quantityPerMachine: '1',
    unit: 'PC',
    publicPrice: 253.24,
    totalPrice: null
  },
  {
    revision: { es: 'Cada 1000 h de servicio', en: 'Every 1000 service hours', de: 'Alle 1000 Betriebsstunden', pt: 'A cada 1000 horas de serviço' },
    maintenance: { es: 'Reemplazar elemento del filtro de aire (si es necesario)', en: 'Replace air filter element (if necessary)', de: 'Luftfilterelement ersetzen (falls erforderlich)', pt: 'Substituir o elemento do filtro de ar (se necessário)' },
    period: '1000 H',
    description: { es: 'Elemento del filtro de aire', en: 'Air filter element', de: 'Luftfilterelement', pt: 'Elemento do filtro, ar' },
    sapCode: '31800152',
    quantityPerMachine: '1',
    unit: 'PC',
    publicPrice: 185,
    totalPrice: null
  },
  {
    revision: { es: 'Cada 1000 h de servicio', en: 'Every 1000 service hours', de: 'Alle 1000 Betriebsstunden', pt: 'A cada 1000 horas de serviço' },
    maintenance: { es: 'Reemplazar cartucho de seguridad (si es necesario)', en: 'Replace safety cartridge (if necessary)', de: 'Sicherheitspatrone ersetzen (falls erforderlich)', pt: 'Substituir o cartucho de segurança (se necessário)' },
    period: '1000 H',
    description: { es: 'Cartucho de seguridad', en: 'Safety cartridge', de: 'Sicherheitspatrone', pt: 'Cartucho de segurança' },
    sapCode: '31782399',
    quantityPerMachine: '1',
    unit: 'PC',
    publicPrice: 628,
    totalPrice: null
  },
  {
    revision: { es: 'Cada 1500 h de servicio', en: 'Every 1500 service hours', de: 'Alle 1500 Betriebsstunden', pt: 'A cada 1500 horas de serviço' },
    maintenance: { es: 'Reemplazar correa trapezoidal estriada', en: 'Replace ribbed V-belt', de: 'Rippenkeilriemen ersetzen', pt: 'Substituir correia trapezoidal estriada' },
    period: '1500 H',
    description: { es: 'Correa en V', en: 'V-belt', de: 'Keilriemen', pt: 'Correia em V' },
    sapCode: '54011201',
    quantityPerMachine: '1',
    unit: 'PC',
    publicPrice: 95,
    totalPrice: null
  },
  {
    revision: { es: 'Cada 2000 h de servicio', en: 'Every 2000 service hours', de: 'Alle 2000 Betriebsstunden', pt: 'A cada 2000 horas de serviço' },
    maintenance: { es: 'Reemplazar líquido de refrigeración', en: 'Replace coolant', de: 'Kühlflüssigkeit ersetzen', pt: 'Substituir líquido de refrigeração' },
    period: '2000 H',
    description: { es: 'Líquido de refrigeración', en: 'Coolant', de: 'Kühlflüssigkeit', pt: 'Líquido de refrigeração' },
    sapCode: '86821152',
    quantityPerMachine: '24',
    unit: 'l',
    publicPrice: 12,
    totalPrice: null
  },
  {
    revision: { es: 'Cada 4500 h de servicio', en: 'Every 4500 service hours', de: 'Alle 4500 Betriebsstunden', pt: 'A cada 4500 horas de serviço' },
    maintenance: { es: 'Reemplazar aceite hidráulico', en: 'Replace hydraulic oil', de: 'Hydrauliköl ersetzen', pt: 'Substituir óleo hidráulico' },
    period: '4500 H',
    description: { es: 'Aceite hidráulico (ISO), HVLP 46', en: 'Hydraulic oil (ISO), HVLP 46', de: 'Hydrauliköl (ISO), HVLP 46', pt: 'Óleo hidráulico (ISO), HVLP 46' },
    sapCode: '86821151',
    quantityPerMachine: '120',
    unit: 'l',
    publicPrice: 8.5,
    totalPrice: null
  }
];
