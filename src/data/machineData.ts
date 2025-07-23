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
  origin: { es: string; en: string; de: string; pt: string };
  compactionAssistant: { es: string; en: string; de: string; pt: string };
  telemetry?: { es: string; en: string; de: string; pt: string };
  innovations: { es: string; en: string; de: string; pt: string };
  usp: { es: string; en: string; de: string; pt: string };
  maxCompactionDepth?: number;
  compactionPerformance?: string;
  fuelConsumption: number;
  price: number;
  preventiveMaintenance: number;
  correctiveMaintenance: number;
  usageTime: number;
  tco: number;
  tcoTimeline?: Array<{ hours: number; price: number | null; tco: number | null }>;
  // LTR specific fields
  compactionSystem?: string;
  waterTankCapacity?: number;
  articulationJoint?: { es: string; en: string; de: string; pt: string };
  comfortSafety?: { es: string; en: string; de: string; pt: string };
  efficientCompaction?: { es: string; en: string; de: string; pt: string };
  aceTechnology?: { es: string; en: string; de: string; pt: string };
  easyMaintenance?: { es: string; en: string; de: string; pt: string };
  // Add staticTco to MachineSpec
  staticTco?: number;
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
    origin: { es: "India", en: "India", de: "Indien", pt: "Índia" },
    compactionAssistant: {
      es: "BOMAG ECONOMIZER\nSistema visual que permite a los operadores medir el progreso de la compactación en tiempo real. Utiliza una escala LED en la cabina para mostrar el nivel de compactación alcanzado, ayudando a evitar sobrecompactación o subcompactación. (Estandar)",
      en: "BOMAG ECONOMIZER\nVisual system that allows operators to measure compaction progress in real time. Uses an LED scale in the cab to show the achieved compaction level, helping to avoid over- or under-compaction. (Standard)",
      de: "BOMAG ECONOMIZER\nVisuelles System, das es dem Bediener ermöglicht, den Verdichtungsfortschritt in Echtzeit zu messen. Eine LED-Skala in der Kabine zeigt das erreichte Verdichtungsniveau an und hilft, Über- oder Unterverdichtung zu vermeiden. (Standard)",
      pt: "BOMAG ECONOMIZER\nSistema visual que permite aos operadores medir o progresso da compactação em tempo real. Utiliza uma escala de LED na cabine para mostrar o nível de compactação alcançado, ajudando a evitar sobre ou subcompactação. (Padrão)"
    },
    telemetry: { es: "Telematics", en: "Telematics", de: "Telematik", pt: "Telemática" },
    innovations: {
      es: "Economizer, TERRAMETER (Evib real), VARIOCONTROL, ECOMODE, TELEMATIC",
      en: "Economizer, TERRAMETER (Real Evib), VARIOCONTROL, ECOMODE, TELEMATIC",
      de: "Economizer, TERRAMETER (Echtes Evib), VARIOCONTROL, ECOMODE, TELEMATIC",
      pt: "Economizer, TERRAMETER (Evib real), VARIOCONTROL, ECOMODE, TELEMATIC"
    },
    usp: {
      es: "Operación Intuitiva\n* Un switch para cada función\n* Símbolos intuitivos facilitan la operación",
      en: "Intuitive Operation\n* One switch for each function\n* Intuitive symbols make operation easy",
      de: "Intuitive Bedienung\n* Ein Schalter für jede Funktion\n* Intuitive Symbole erleichtern die Bedienung",
      pt: "Operação intuitiva\n* Um interruptor para cada função\n* Símbolos intuitivos facilitam a operação"
    },
    maxCompactionDepth: 60,
    compactionPerformance: "270 - 540",
    fuelConsumption: 11.8,
    price: 57592.78,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 119692.78,
    tcoTimeline: [
      { hours: 0, price: 28000, tco: 119692.78 },
      { hours: 1000, price: 42800, tco: 119692.78 },
      { hours: 1500, price: 50200, tco: 119692.78 },
      { hours: 2000, price: 57600, tco: 119692.78 },
      { hours: 2500, price: 65000, tco: 119692.78 },
      { hours: 3000, price: 72400, tco: 119692.78 }
    ],
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 119692.78
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
    origin: { es: "India", en: "India", de: "Indien", pt: "Índia" },
    compactionAssistant: {
      es: "BOMAG ECONOMIZER - Sistema visual que permite a los operadores medir el progreso de la compactación en tiempo real. Utiliza una escala LED en la cabina para mostrar el nivel de compactación alcanzado, ayudando a evitar sobrecompactación o subcompactación. (Estandar)",
      en: "BOMAG ECONOMIZER - Visual system that allows operators to measure compaction progress in real time. Uses an LED scale in the cab to show the achieved compaction level, helping to avoid over- or under-compaction. (Standard)",
      de: "BOMAG ECONOMIZER - Visuelles System, das es dem Bediener ermöglicht, den Verdichtungsfortschritt in Echtzeit zu messen. Eine LED-Skala in der Kabine zeigt das erreichte Verdichtungsniveau an und hilft, Über- oder Unterverdichtung zu vermeiden. (Standard)",
      pt: "BOMAG ECONOMIZER - Sistema visual que permite aos operadores medir o progresso da compactação em tempo real. Utiliza uma escala de LED na cabine para mostrar o nível de compactação alcançado, ajudando a evitar sobre ou subcompactação. (Padrão)"
    },
    telemetry: { es: "Telematics", en: "Telematics", de: "Telematik", pt: "Telemática" },
    innovations: {
      es: "Economizer, TERRAMETER (Evib real), VARIOCONTROL, ECOMODE, TELEMATIC",
      en: "Economizer, TERRAMETER (Real Evib), VARIOCONTROL, ECOMODE, TELEMATIC",
      de: "Economizer, TERRAMETER (Echtes Evib), VARIOCONTROL, ECOMODE, TELEMATIC",
      pt: "Economizer, TERRAMETER (Evib real), VARIOCONTROL, ECOMODE, TELEMATIC"
    },
    usp: {
      es: "Operación Intuitiva - Un switch para cada función - Símbolos intuitivos facilitan la operación",
      en: "Intuitive Operation - One switch for each function - Intuitive symbols make operation easy",
      de: "Intuitive Bedienung - Ein Schalter für jede Funktion - Intuitive Symbole erleichtern die Bedienung",
      pt: "Operação intuitiva - Um interruptor para cada função - Símbolos intuitivos facilitam a operação"
    },
    maxCompactionDepth: 60,
    compactionPerformance: "270 - 540",
    fuelConsumption: 11.8,
    price: 59374.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 121474.00,
    tcoTimeline: [
      { hours: 0, price: 29630, tco: 121474.00 },
      { hours: 1000, price: 44430, tco: 121474.00 },
      { hours: 1500, price: 51830, tco: 121474.00 },
      { hours: 2000, price: 59230, tco: 121474.00 },
      { hours: 2500, price: 66630, tco: 121474.00 },
      { hours: 3000, price: 74030, tco: 121474.00 }
    ],
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 121474.00
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
    origin: { es: "China", en: "China", de: "China", pt: "China" },
    compactionAssistant: {
      es: "BOMAG ECONOMIZER - Sistema visual que permite a los operadores medir el progreso de la compactación en tiempo real. Utiliza una escala LED en la cabina para mostrar el nivel de compactación alcanzado, ayudando a evitar sobrecompactación o subcompactación. (Estandar)",
      en: "BOMAG ECONOMIZER - Visual system that allows operators to measure compaction progress in real time. Uses an LED scale in the cab to show the achieved compaction level, helping to avoid over- or under-compaction. (Standard)",
      de: "BOMAG ECONOMIZER - Visuelles System, das es dem Bediener ermöglicht, den Verdichtungsfortschritt in Echtzeit zu messen. Eine LED-Skala in der Kabine zeigt das erreichte Verdichtungsniveau an und hilft, Über- oder Unterverdichtung zu vermeiden. (Standard)",
      pt: "BOMAG ECONOMIZER - Sistema visual que permite aos operadores medir o progresso da compactação em tempo real. Utiliza uma escala de LED na cabine para mostrar o nível de compactação alcançado, ajudando a evitar sobre ou subcompactação. (Padrão)"
    },
    telemetry: { es: "Telematics", en: "Telematics", de: "Telematik", pt: "Telemática" },
    innovations: {
      es: "Economizer, TERRAMETER (Evib real), VARIOCONTROL, ECOMODE, TELEMATIC",
      en: "Economizer, TERRAMETER (Real Evib), VARIOCONTROL, ECOMODE, TELEMATIC",
      de: "Economizer, TERRAMETER (Echtes Evib), VARIOCONTROL, ECOMODE, TELEMATIC",
      pt: "Economizer, TERRAMETER (Evib real), VARIOCONTROL, ECOMODE, TELEMATIC"
    },
    usp: {
      es: "Operación Intuitiva - Un switch para cada función - Símbolos intuitivos facilitan la operación",
      en: "Intuitive Operation - One switch for each function - Intuitive symbols make operation easy",
      de: "Intuitive Bedienung - Ein Schalter für jede Funktion - Intuitive Symbole erleichtern die Bedienung",
      pt: "Operação intuitiva - Um interruptor para cada função - Símbolos intuitivos facilitam a operação"
    },
    maxCompactionDepth: 60,
    compactionPerformance: "270 - 540",
    fuelConsumption: 12.4,
    price: 63530.18,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 128330.18,
    tcoTimeline: [
      { hours: 0, price: 29580, tco: 128330.18 },
      { hours: 1000, price: 44980, tco: 128330.18 },
      { hours: 1500, price: 52680, tco: 128330.18 },
      { hours: 2000, price: 60380, tco: 128330.18 },
      { hours: 2500, price: 68080, tco: 128330.18 },
      { hours: 3000, price: 75780, tco: 128330.18 }
    ],
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 128330.18
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
    origin: { es: "Germany", en: "Germany", de: "Deutschland", pt: "Alemanha" },
    compactionAssistant: {
      es: "No aplica",
      en: "No aplica",
      de: "Keine Anwendung",
      pt: "Não aplicável"
    },
    telemetry: { es: "Smart Doc", en: "Smart Doc", de: "Smart Doc", pt: "Smart Doc" },
    innovations: {
      es: "EcoStop, SmartCompaction, vibración adaptativa",
      en: "EcoStop, SmartCompaction, adaptive vibration",
      de: "EcoStop, SmartCompaction, adaptive Vibration",
      pt: "EcoStop, SmartCompaction, vibração adaptativa"
    },
    usp: {
      es: "Conducción y maniobrabilidad - Bloqueo integrado de la articulación pendular - Control de tracción para una óptima transmisión de potencia",
      en: "Conducción y maniobrabilidad - Bloqueo integrado de la articulación pendular - Control de tracción para una óptima transmisión de potencia",
      de: "Conducción y maniobrabilidad - Integrierter Pendelgelenkblock - Kontrolle der Antriebsleistung für optimale Übertragung",
      pt: "Condução e maniabilidade - Bloqueio integrado da articulação pendular - Controlo da tração para uma óptima transmissão de potência"
    },
    maxCompactionDepth: 60,
    compactionPerformance: "250 - 400",
    fuelConsumption: 13.6,
    price: 91845.10,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 162045.10,
    tcoTimeline: [
      { hours: 0, price: 26783, tco: 162045.10 },
      { hours: 1000, price: 43383, tco: 162045.10 },
      { hours: 1500, price: 51683, tco: 162045.10 },
      { hours: 2000, price: 59983, tco: 162045.10 },
      { hours: 2500, price: 68283, tco: 162045.10 },
      { hours: 3000, price: 76583, tco: 162045.10 }
    ],
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 162045.10
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
    origin: { es: "Sweden/ Brazil/ China", en: "Sweden/ Brazil/ China", de: "Schweden/ Brasilien/ China", pt: "Suécia/ Brasil/ China" },
    compactionAssistant: {
      es: "No aplica",
      en: "No aplica",
      de: "Keine Anwendung",
      pt: "Não aplicável"
    },
    telemetry: { es: "Dyn@lizer", en: "Dyn@lizer", de: "Dyn@lizer", pt: "Dyn@lizer" },
    innovations: {
      es: "Dynapac Compaction meter (DCM), Dyn@lyzer",
      en: "Dynapac Compaction meter (DCM), Dyn@lyzer",
      de: "Dynapac Compaction meter (DCM), Dyn@lyzer",
      pt: "Dynapac Compaction meter (DCM), Dyn@lyzer"
    },
    usp: {
      es: "Controles intuitivos: Palancas simples y panel de instrumentos con indicadores claros, fáciles de operar incluso por personal con poca experiencia.",
      en: "Intuitive controls: Simple levers and instrument panel with clear indicators, easy to operate even by personnel with little experience.",
      de: "Intuitive Steuerung: Einfache Hebel und Instrumentenleiste mit klaren Indikatoren, die auch mit wenig Erfahrung bedient werden können.",
      pt: "Controles intuitivos: Palancas simples e painel de instrumentos com indicadores claros, fáceis de operar mesmo por pessoal com pouca experiência."
    },
    maxCompactionDepth: 55,
    compactionPerformance: "220 - 350",
    fuelConsumption: 13.6,
    price: 90000.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 160200.00,
    tcoTimeline: [
      { hours: 0, price: 25500, tco: 160200.00 },
      { hours: 1000, price: 42100, tco: 160200.00 },
      { hours: 1500, price: 50400, tco: 160200.00 },
      { hours: 2000, price: 58700, tco: 160200.00 },
      { hours: 2500, price: 67000, tco: 160200.00 },
      { hours: 3000, price: 75300, tco: 160200.00 }
    ],
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 160200.00
  },
  {
    brand: "CATERPILLAR",
    model: "CS11GC",
    weight: 11235,
    engine: "Cat C4.4",
    compactionWidth: 2.13,
    power: 83.4,
    amplitude: "2,0/1,0",
    staticLinearLoad: 28.9,
    gradeability: 55,
    origin: { es: "China", en: "China", de: "China", pt: "China" },
    compactionAssistant: { es: "CAT Machine Drive Power (MDP)\nEste sistema mide la resistencia del terreno durante la compactación, proporcionando datos en tiempo real sobre la capacidad de trabajo del equipo y las condiciones del suelo. Permite ajustar la intensidad de la compactación para evitar sobrecarga en el motor y mejorar la eficiencia. (Opcional)", en: "CAT Machine Drive Power (MDP)\nThis system measures ground resistance during compaction, providing real-time data on equipment work capacity and soil conditions. Allows adjustment of compaction intensity to avoid engine overload and improve efficiency. (Optional)", de: "CAT Machine Drive Power (MDP)\nDieses System misst den Widerstand des Bodens während der Verdichtung und liefert Echtzeitdaten über die Arbeitskapazität der Ausrüstung und die Bodenbedingungen. Ermöglicht die Anpassung der Verdichtungsintensität, um eine Überlastung des Motors zu vermeiden und die Effizienz zu verbessern. (Optional)", pt: "CAT Machine Drive Power (MDP)\nEste sistema mede a resistência do solo durante a compactação, fornecendo dados em tempo real sobre a capacidade de trabalho do equipamento e as condições do solo. Permite ajustar a intensidade da compactação para evitar sobrecarga do motor e melhorar a eficiência. (Opcional)" },
    telemetry: { es: "Vision Link", en: "Vision Link", de: "Vision Link", pt: "Vision Link" },
    innovations: { es: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", en: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", de: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", pt: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link" },
    usp: { es: "Controles ergonómicos y simples:\n* Palanca de control única para avance, vibración y dirección.\n* Instrumentación digital fácil de leer.", en: "Ergonomic and simple controls:\n* Single control lever for forward, vibration, and steering.\n* Easy-to-read digital instrumentation.", de: "Ergonomische und einfache Steuerung:\n* Ein einziger Steuerhebel für Vorwärtsfahrt, Vibration und Lenkung.\n* Leicht ablesbare digitale Instrumentierung.", pt: "Controles ergonômicos e simples:\n* Alavanca de controle única para avanço, vibração e direção.\n* Instrumentação digital de fácil leitura." },
    maxCompactionDepth: 60,
    compactionPerformance: "200",
    fuelConsumption: 14.5,
    price: 105298.85,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 179548.85,
    tcoTimeline: [
      { hours: 0, price: 23500, tco: 179548.85 },
      { hours: 1000, price: 41000, tco: 179548.85 },
      { hours: 1500, price: 49750, tco: 179548.85 },
      { hours: 2000, price: 58500, tco: 179548.85 },
      { hours: 2500, price: 67250, tco: 179548.85 },
      { hours: 3000, price: 76000, tco: 179548.85 }
    ],
    articulationJoint: { es: "Junta de articulación libre de mantenimiento", en: "Maintenance-free articulation joint", de: "Wartungsfreie Knickgelenke", pt: "Articulação livre de manutenção" },
    comfortSafety: { es: "Plataforma con asiento ajustable, controles a mano, y excelente visibilidad de 360°.\n\nVibración automática (Auto Vibe): El sistema puede activar/desactivar la vibración de forma automática según la velocidad del rodillo o si está detenido, mejorando el control del proces", en: "Platform with adjustable seat, controls at hand, and excellent 360° visibility.\n\nAutomatic vibration (Auto Vibe): The system can automatically activate/deactivate vibration depending on roller speed or if stopped, improving process control.", de: "Plattform mit verstellbarem Sitz, Bedienelementen zur Hand und ausgezeichneter 360°-Sicht.\n\nAutomatische Vibration (Auto Vibe): Das System kann die Vibration je nach Walzengeschwindigkeit oder Stillstand automatisch aktivieren/deaktivieren und so die Prozesskontrolle verbessern.", pt: "Plataforma com assento ajustável, controles à mão e excelente visibilidade de 360°.\n\nVibração automática (Auto Vibe): O sistema pode ativar/desativar a vibração automaticamente dependendo da velocidade do rolo ou se estiver parado, melhorando o controle do processo." },
    efficientCompaction: { es: "* Amplitud más alta del mercado\n* MDP exclusivo de CAT: Mide la resistencia al avance del tambor como un indicador directo del nivel de compactación (ventaja clave frente a modelos tradicionales).", en: "* Highest amplitude on the market\n* Exclusive CAT MDP: Measures drum rolling resistance as a direct indicator of compaction level (key advantage over traditional models).", de: "* Höchste Amplitude auf dem Markt\n* Exklusives CAT MDP: Misst den Widerstand der Walze als direkten Indikator für das Verdichtungsniveau (Schlüsselvorteil gegenüber traditionellen Modellen).", pt: "* Maior amplitude do mercado\n* MDP exclusivo da CAT: Mede a resistência ao avanço do tambor como um indicador direto do nível de compactação (vantagem chave em relação aos modelos tradicionais)." },
    aceTechnology: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    easyMaintenance: { es: "Mantenimiento y Servicio\nDiseño orientado a bajo mantenimiento:\n* Intervalos de mantenimiento extendidos.\n* Reducción de puntos de lubricación gracias al uso de componentes sellados.", en: "Maintenance and Service\nDesign oriented to low maintenance:\n* Extended maintenance intervals.\n* Reduced lubrication points thanks to sealed components.", de: "Wartung und Service\nWartungsarmes Design:\n* Verlängerte Wartungsintervalle.\n* Reduzierte Schmierstellen dank abgedichteter Komponenten.", pt: "Manutenção e Serviço\nDesign orientado para baixa manutenção:\n* Intervalos de manutenção estendidos.\n* Redução dos pontos de lubrificação graças ao uso de componentes selados." }
  },
  {
    brand: "CATERPILLAR",
    model: "V110",
    weight: 11235,
    engine: "Cat C4.4",
    compactionWidth: 2.13,
    power: 83.4,
    amplitude: "2,0/1,0",
    staticLinearLoad: 28.9,
    gradeability: 55,
    origin: { es: "China", en: "China", de: "China", pt: "China" },
    compactionAssistant: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    telemetry: { es: "Vision Link", en: "Vision Link", de: "Vision Link", pt: "Vision Link" },
    innovations: { es: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", en: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", de: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", pt: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link" },
    usp: { es: "Controles ergonómicos y simples:\n* Palanca de control única para avance, vibración y dirección.\n* Instrumentación digital fácil de leer.", en: "Ergonomic and simple controls:\n* Single control lever for forward, vibration, and steering.\n* Easy-to-read digital instrumentation.", de: "Ergonomische und einfache Steuerung:\n* Ein einziger Steuerhebel für Vorwärtsfahrt, Vibration und Lenkung.\n* Leicht ablesbare digitale Instrumentierung.", pt: "Controles ergonômicos e simples:\n* Alavanca de controle única para avanço, vibração e direção.\n* Instrumentação digital de fácil leitura." },
    maxCompactionDepth: 60,
    compactionPerformance: "200",
    fuelConsumption: 14.5,
    price: 105298.85,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 179548.85,
    tcoTimeline: [
      { hours: 0, price: 23500, tco: 179548.85 },
      { hours: 1000, price: 41800, tco: 179548.85 },
      { hours: 1500, price: 50950, tco: 179548.85 },
      { hours: 2000, price: 60100, tco: 179548.85 },
      { hours: 2500, price: 69250, tco: 179548.85 },
      { hours: 3000, price: 78400, tco: 179548.85 }
    ],
    articulationJoint: { es: "Junta de articulación libre de mantenimiento", en: "Maintenance-free articulation joint", de: "Wartungsfreie Knickgelenke", pt: "Articulação livre de manutenção" },
    comfortSafety: { es: "Plataforma con asiento ajustable, controles a mano, y excelente visibilidad de 360°.\n\nVibración automática (Auto Vibe): El sistema puede activar/desactivar la vibración de forma automática según la velocidad del rodillo o si está detenido, mejorando el control del proces", en: "Platform with adjustable seat, controls at hand, and excellent 360° visibility.\n\nAutomatic vibration (Auto Vibe): The system can automatically activate/deactivate vibration depending on roller speed or if stopped, improving process control.", de: "Plattform mit verstellbarem Sitz, Bedienelementen zur Hand und ausgezeichneter 360°-Sicht.\n\nAutomatische Vibration (Auto Vibe): Das System kann die Vibration je nach Walzengeschwindigkeit oder Stillstand automatisch aktivieren/deaktivieren und so die Prozesskontrolle verbessern.", pt: "Plataforma com assento ajustável, controles à mão e excelente visibilidade de 360°.\n\nVibração automática (Auto Vibe): O sistema pode ativar/desativar a vibração automaticamente dependendo da velocidade do rolo ou se estiver parado, melhorando o controle do processo." },
    efficientCompaction: { es: "* Amplitud más alta del mercado\n* MDP exclusivo de CAT: Mide la resistencia al avance del tambor como un indicador directo del nivel de compactación (ventaja clave frente a modelos tradicionales).", en: "* Highest amplitude on the market\n* Exclusive CAT MDP: Measures drum rolling resistance as a direct indicator of compaction level (key advantage over traditional models).", de: "* Höchste Amplitude auf dem Markt\n* Exklusives CAT MDP: Misst den Widerstand der Walze als direkten Indikator für das Verdichtungsniveau (Schlüsselvorteil gegenüber traditionellen Modellen).", pt: "* Maior amplitude do mercado\n* MDP exclusivo da CAT: Mede a resistência ao avanço do tambor como um indicador direto do nível de compactação (vantagem chave em relação aos modelos tradicionais)." },
    aceTechnology: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    easyMaintenance: { es: "Mantenimiento y Servicio\nDiseño orientado a bajo mantenimiento:\n* Intervalos de mantenimiento extendidos.\n* Reducción de puntos de lubricación gracias al uso de componentes sellados.", en: "Maintenance and Service\nDesign oriented to low maintenance:\n* Extended maintenance intervals.\n* Reduced lubrication points thanks to sealed components.", de: "Wartung und Service\nWartungsarmes Design:\n* Verlängerte Wartungsintervalle.\n* Reduzierte Schmierstellen dank abgedichteter Komponenten.", pt: "Manutenção e Serviço\nDesign orientado para baixa manutenção:\n* Intervalos de manutenção estendidos.\n* Redução dos pontos de lubrificação graças ao uso de componentes selados." }
  },
  {
    brand: "HAMM",
    model: "SSR120C-10S",
    weight: 11235,
    engine: "Cat C4.4",
    compactionWidth: 2.13,
    power: 83.4,
    amplitude: "2,0/1,0",
    staticLinearLoad: 28.9,
    gradeability: 55,
    origin: { es: "China", en: "China", de: "China", pt: "China" },
    compactionAssistant: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    telemetry: { es: "Vision Link", en: "Vision Link", de: "Vision Link", pt: "Vision Link" },
    innovations: { es: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", en: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", de: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", pt: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link" },
    usp: { es: "Controles ergonómicos y simples:\n* Palanca de control única para avance, vibración y dirección.\n* Instrumentación digital fácil de leer.", en: "Ergonomic and simple controls:\n* Single control lever for forward, vibration, and steering.\n* Easy-to-read digital instrumentation.", de: "Ergonomische und einfache Steuerung:\n* Ein einziger Steuerhebel für Vorwärtsfahrt, Vibration und Lenkung.\n* Leicht ablesbare digitale Instrumentierung.", pt: "Controles ergonômicos e simples:\n* Alavanca de controle única para avanço, vibração e direção.\n* Instrumentação digital de fácil leitura." },
    maxCompactionDepth: 60,
    compactionPerformance: "200",
    fuelConsumption: 14.5,
    price: 105298.85,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 179548.85,
    tcoTimeline: [
      { hours: 0, price: 23500, tco: 179548.85 },
      { hours: 1000, price: 41800, tco: 179548.85 },
      { hours: 1500, price: 50950, tco: 179548.85 },
      { hours: 2000, price: 60100, tco: 179548.85 },
      { hours: 2500, price: 69250, tco: 179548.85 },
      { hours: 3000, price: 78400, tco: 179548.85 }
    ],
    articulationJoint: { es: "Junta de articulación libre de mantenimiento", en: "Maintenance-free articulation joint", de: "Wartungsfreie Knickgelenke", pt: "Articulação livre de manutenção" },
    comfortSafety: { es: "Plataforma con asiento ajustable, controles a mano, y excelente visibilidad de 360°.\n\nVibración automática (Auto Vibe): El sistema puede activar/desactivar la vibración de forma automática según la velocidad del rodillo o si está detenido, mejorando el control del proces", en: "Platform with adjustable seat, controls at hand, and excellent 360° visibility.\n\nAutomatic vibration (Auto Vibe): The system can automatically activate/deactivate vibration depending on roller speed or if stopped, improving process control.", de: "Plattform mit verstellbarem Sitz, Bedienelementen zur Hand und ausgezeichneter 360°-Sicht.\n\nAutomatische Vibration (Auto Vibe): Das System kann die Vibration je nach Walzengeschwindigkeit oder Stillstand automatisch aktivieren/deaktivieren und so die Prozesskontrolle verbessern.", pt: "Plataforma com assento ajustável, controles à mão e excelente visibilidade de 360°.\n\nVibração automática (Auto Vibe): O sistema pode ativar/desativar a vibração automaticamente dependendo da velocidade do rolo ou se estiver parado, melhorando o controle do processo." },
    efficientCompaction: { es: "* Amplitud más alta del mercado\n* MDP exclusivo de CAT: Mide la resistencia al avance del tambor como un indicador directo del nivel de compactación (ventaja clave frente a modelos tradicionales).", en: "* Highest amplitude on the market\n* Exclusive CAT MDP: Measures drum rolling resistance as a direct indicator of compaction level (key advantage over traditional models).", de: "* Höchste Amplitude auf dem Markt\n* Exklusives CAT MDP: Misst den Widerstand der Walze als direkten Indikator für das Verdichtungsniveau (Schlüsselvorteil gegenüber traditionellen Modellen).", pt: "* Maior amplitude do mercado\n* MDP exclusivo da CAT: Mede a resistência ao avanço do tambor como um indicador direto do nível de compactação (vantagem chave em relação aos modelos tradicionais)." },
    aceTechnology: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    easyMaintenance: { es: "Mantenimiento y Servicio\nDiseño orientado a bajo mantenimiento:\n* Intervalos de mantenimiento extendidos.\n* Reducción de puntos de lubricación gracias al uso de componentes sellados.", en: "Maintenance and Service\nDesign oriented to low maintenance:\n* Extended maintenance intervals.\n* Reduced lubrication points thanks to sealed components.", de: "Wartung und Service\nWartungsarmes Design:\n* Verlängerte Wartungsintervalle.\n* Reduzierte Schmierstellen dank abgedichteter Komponenten.", pt: "Manutenção e Serviço\nDesign orientado para baixa manutenção:\n* Intervalos de manutenção estendidos.\n* Redução dos pontos de lubrificação graças ao uso de componentes selados." }
  },
  {
    brand: "DYNAPAC",
    model: "XS123",
    weight: 11235,
    engine: "Cat C4.4",
    compactionWidth: 2.13,
    power: 83.4,
    amplitude: "2,0/1,0",
    staticLinearLoad: 28.9,
    gradeability: 55,
    origin: { es: "China", en: "China", de: "China", pt: "China" },
    compactionAssistant: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    telemetry: { es: "Vision Link", en: "Vision Link", de: "Vision Link", pt: "Vision Link" },
    innovations: { es: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", en: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", de: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", pt: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link" },
    usp: { es: "Controles ergonómicos y simples:\n* Palanca de control única para avance, vibración y dirección.\n* Instrumentación digital fácil de leer.", en: "Ergonomic and simple controls:\n* Single control lever for forward, vibration, and steering.\n* Easy-to-read digital instrumentation.", de: "Ergonomische und einfache Steuerung:\n* Ein einziger Steuerhebel für Vorwärtsfahrt, Vibration und Lenkung.\n* Leicht ablesbare digitale Instrumentierung.", pt: "Controles ergonômicos e simples:\n* Alavanca de controle única para avanço, vibração e direção.\n* Instrumentação digital de fácil leitura." },
    maxCompactionDepth: 60,
    compactionPerformance: "200",
    fuelConsumption: 14.5,
    price: 105298.85,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 179548.85,
    tcoTimeline: [
      { hours: 0, price: 23500, tco: 179548.85 },
      { hours: 1000, price: 40100, tco: 179548.85 },
      { hours: 1500, price: 48400, tco: 179548.85 },
      { hours: 2000, price: 56700, tco: 179548.85 },
      { hours: 2500, price: 65000, tco: 179548.85 },
      { hours: 3000, price: 73300, tco: 179548.85 }
    ],
    articulationJoint: { es: "Junta de articulación libre de mantenimiento", en: "Maintenance-free articulation joint", de: "Wartungsfreie Knickgelenke", pt: "Articulação livre de manutenção" },
    comfortSafety: { es: "Plataforma con asiento ajustable, controles a mano, y excelente visibilidad de 360°.\n\nVibración automática (Auto Vibe): El sistema puede activar/desactivar la vibración de forma automática según la velocidad del rodillo o si está detenido, mejorando el control del proces", en: "Platform with adjustable seat, controls at hand, and excellent 360° visibility.\n\nAutomatic vibration (Auto Vibe): The system can automatically activate/deactivate vibration depending on roller speed or if stopped, improving process control.", de: "Plattform mit verstellbarem Sitz, Bedienelementen zur Hand und ausgezeichneter 360°-Sicht.\n\nAutomatische Vibration (Auto Vibe): Das System kann die Vibration je nach Walzengeschwindigkeit oder Stillstand automatisch aktivieren/deaktivieren und so die Prozesskontrolle verbessern.", pt: "Plataforma com assento ajustável, controles à mão e excelente visibilidade de 360°.\n\nVibração automática (Auto Vibe): O sistema pode ativar/desativar a vibração automaticamente dependendo da velocidade do rolo ou se estiver parado, melhorando o controle do processo." },
    efficientCompaction: { es: "* Amplitud más alta del mercado\n* MDP exclusivo de CAT: Mide la resistencia al avance del tambor como un indicador directo del nivel de compactación (ventaja clave frente a modelos tradicionales).", en: "* Highest amplitude on the market\n* Exclusive CAT MDP: Measures drum rolling resistance as a direct indicator of compaction level (key advantage over traditional models).", de: "* Höchste Amplitude auf dem Markt\n* Exklusives CAT MDP: Misst den Widerstand der Walze als direkten Indikator für das Verdichtungsniveau (Schlüsselvorteil gegenüber traditionellen Modellen).", pt: "* Maior amplitude do mercado\n* MDP exclusivo da CAT: Mede a resistência ao avanço do tambor como um indicador direto do nível de compactação (vantagem chave em relação aos modelos tradicionais)." },
    aceTechnology: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    easyMaintenance: { es: "Mantenimiento y Servicio\nDiseño orientado a bajo mantenimiento:\n* Intervalos de mantenimiento extendidos.\n* Reducción de puntos de lubricación gracias al uso de componentes sellados.", en: "Maintenance and Service\nDesign oriented to low maintenance:\n* Extended maintenance intervals.\n* Reduced lubrication points thanks to sealed components.", de: "Wartung und Service\nWartungsarmes Design:\n* Verlängerte Wartungsintervalle.\n* Reduzierte Schmierstellen dank abgedichteter Komponenten.", pt: "Manutenção e Serviço\nDesign orientado para baixa manutenção:\n* Intervalos de manutenção estendidos.\n* Redução dos pontos de lubrificação graças ao uso de componentes selados." }
  },
  {
    brand: "DYNAPAC",
    model: "ASC110",
    weight: 11235,
    engine: "Cat C4.4",
    compactionWidth: 2.13,
    power: 83.4,
    amplitude: "2,0/1,0",
    staticLinearLoad: 28.9,
    gradeability: 55,
    origin: { es: "China", en: "China", de: "China", pt: "China" },
    compactionAssistant: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    telemetry: { es: "Vision Link", en: "Vision Link", de: "Vision Link", pt: "Vision Link" },
    innovations: { es: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", en: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", de: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", pt: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link" },
    usp: { es: "Controles ergonómicos y simples:\n* Palanca de control única para avance, vibración y dirección.\n* Instrumentación digital fácil de leer.", en: "Ergonomic and simple controls:\n* Single control lever for forward, vibration, and steering.\n* Easy-to-read digital instrumentation.", de: "Ergonomische und einfache Steuerung:\n* Ein einziger Steuerhebel für Vorwärtsfahrt, Vibration und Lenkung.\n* Leicht ablesbare digitale Instrumentierung.", pt: "Controles ergonômicos e simples:\n* Alavanca de controle única para avanço, vibração e direção.\n* Instrumentação digital de fácil leitura." },
    maxCompactionDepth: 60,
    compactionPerformance: "200",
    fuelConsumption: 14.5,
    price: 105298.85,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 179548.85,
    tcoTimeline: [
      { hours: 0, price: 23500, tco: 179548.85 },
      { hours: 1000, price: 42800, tco: 179548.85 },
      { hours: 1500, price: 52450, tco: 179548.85 },
      { hours: 2000, price: 62100, tco: 179548.85 },
      { hours: 2500, price: 71750, tco: 179548.85 },
      { hours: 3000, price: 81400, tco: 179548.85 }
    ],
    articulationJoint: { es: "Junta de articulación libre de mantenimiento", en: "Maintenance-free articulation joint", de: "Wartungsfreie Knickgelenke", pt: "Articulação livre de manutenção" },
    comfortSafety: { es: "Plataforma con asiento ajustable, controles a mano, y excelente visibilidad de 360°.\n\nVibración automática (Auto Vibe): El sistema puede activar/desactivar la vibración de forma automática según la velocidad del rodillo o si está detenido, mejorando el control del proces", en: "Platform with adjustable seat, controls at hand, and excellent 360° visibility.\n\nAutomatic vibration (Auto Vibe): The system can automatically activate/deactivate vibration depending on roller speed or if stopped, improving process control.", de: "Plattform mit verstellbarem Sitz, Bedienelementen zur Hand und ausgezeichneter 360°-Sicht.\n\nAutomatische Vibration (Auto Vibe): Das System kann die Vibration je nach Walzengeschwindigkeit oder Stillstand automatisch aktivieren/deaktivieren und so die Prozesskontrolle verbessern.", pt: "Plataforma com assento ajustável, controles à mão e excelente visibilidade de 360°.\n\nVibração automática (Auto Vibe): O sistema pode ativar/desativar a vibração automaticamente dependendo da velocidade do rolo ou se estiver parado, melhorando o controle do processo." },
    efficientCompaction: { es: "* Amplitud más alta del mercado\n* MDP exclusivo de CAT: Mide la resistencia al avance del tambor como un indicador directo del nivel de compactación (ventaja clave frente a modelos tradicionales).", en: "* Highest amplitude on the market\n* Exclusive CAT MDP: Measures drum rolling resistance as a direct indicator of compaction level (key advantage over traditional models).", de: "* Höchste Amplitude auf dem Markt\n* Exklusives CAT MDP: Misst den Widerstand der Walze als direkten Indikator für das Verdichtungsniveau (Schlüsselvorteil gegenüber traditionellen Modellen).", pt: "* Maior amplitude do mercado\n* MDP exclusivo da CAT: Mede a resistência ao avanço do tambor como um indicador direto do nível de compactação (vantagem chave em relação aos modelos tradicionais)." },
    aceTechnology: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    easyMaintenance: { es: "Mantenimiento y Servicio\nDiseño orientado a bajo mantenimiento:\n* Intervalos de mantenimiento extendidos.\n* Reducción de puntos de lubricación gracias al uso de componentes sellados.", en: "Maintenance and Service\nDesign oriented to low maintenance:\n* Extended maintenance intervals.\n* Reduced lubrication points thanks to sealed components.", de: "Wartung und Service\nWartungsarmes Design:\n* Verlängerte Wartungsintervalle.\n* Reduzierte Schmierstellen dank abgedichteter Komponenten.", pt: "Manutenção e Serviço\nDesign orientado para baixa manutenção:\n* Intervalos de manutenção estendidos.\n* Redução dos pontos de lubrificação graças ao uso de componentes selados." }
  },
  {
    brand: "DYNAPAC",
    model: "116D",
    weight: 11235,
    engine: "Cat C4.4",
    compactionWidth: 2.13,
    power: 83.4,
    amplitude: "2,0/1,0",
    staticLinearLoad: 28.9,
    gradeability: 55,
    origin: { es: "China", en: "China", de: "China", pt: "China" },
    compactionAssistant: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    telemetry: { es: "Vision Link", en: "Vision Link", de: "Vision Link", pt: "Vision Link" },
    innovations: { es: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", en: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", de: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link", pt: "MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link" },
    usp: { es: "Controles ergonómicos y simples:\n* Palanca de control única para avance, vibración y dirección.\n* Instrumentación digital fácil de leer.", en: "Ergonomic and simple controls:\n* Single control lever for forward, vibration, and steering.\n* Easy-to-read digital instrumentation.", de: "Ergonomische und einfache Steuerung:\n* Ein einziger Steuerhebel für Vorwärtsfahrt, Vibration und Lenkung.\n* Leicht ablesbare digitale Instrumentierung.", pt: "Controles ergonômicos e simples:\n* Alavanca de controle única para avanço, vibração e direção.\n* Instrumentação digital de fácil leitura." },
    maxCompactionDepth: 60,
    compactionPerformance: "200",
    fuelConsumption: 14.5,
    price: 105298.85,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3000,
    tco: 179548.85,
    tcoTimeline: [
      { hours: 0, price: 23500, tco: 179548.85 },
      { hours: 1000, price: 42800, tco: 179548.85 },
      { hours: 1500, price: 52450, tco: 179548.85 },
      { hours: 2000, price: 62100, tco: 179548.85 },
      { hours: 2500, price: 71750, tco: 179548.85 },
      { hours: 3000, price: 81400, tco: 179548.85 }
    ],
    articulationJoint: { es: "Junta de articulación libre de mantenimiento", en: "Maintenance-free articulation joint", de: "Wartungsfreie Knickgelenke", pt: "Articulação livre de manutenção" },
    comfortSafety: { es: "Plataforma con asiento ajustable, controles a mano, y excelente visibilidad de 360°.\n\nVibración automática (Auto Vibe): El sistema puede activar/desactivar la vibración de forma automática según la velocidad del rodillo o si está detenido, mejorando el control del proces", en: "Platform with adjustable seat, controls at hand, and excellent 360° visibility.\n\nAutomatic vibration (Auto Vibe): The system can automatically activate/deactivate vibration depending on roller speed or if stopped, improving process control.", de: "Plattform mit verstellbarem Sitz, Bedienelementen zur Hand und ausgezeichneter 360°-Sicht.\n\nAutomatische Vibration (Auto Vibe): Das System kann die Vibration je nach Walzengeschwindigkeit oder Stillstand automatisch aktivieren/deaktivieren und so die Prozesskontrolle verbessern.", pt: "Plataforma com assento ajustável, controles à mão e excelente visibilidade de 360°.\n\nVibração automática (Auto Vibe): O sistema pode ativar/desativar a vibração automaticamente dependendo da velocidade do rolo ou se estiver parado, melhorando o controle do processo." },
    efficientCompaction: { es: "* Amplitud más alta del mercado\n* MDP exclusivo de CAT: Mide la resistencia al avance del tambor como un indicador directo del nivel de compactación (ventaja clave frente a modelos tradicionales).", en: "* Highest amplitude on the market\n* Exclusive CAT MDP: Measures drum rolling resistance as a direct indicator of compaction level (key advantage over traditional models).", de: "* Höchste Amplitude auf dem Markt\n* Exklusives CAT MDP: Misst den Widerstand der Walze als direkten Indikator für das Verdichtungsniveau (Schlüsselvorteil gegenüber traditionellen Modellen).", pt: "* Maior amplitude do mercado\n* MDP exclusivo da CAT: Mede a resistência ao avanço do tambor como um indicador direto do nível de compactação (vantagem chave em relação aos modelos tradicionais)." },
    aceTechnology: { es: "No aplica", en: "No aplica", de: "Keine Anwendung", pt: "Não aplicável" },
    easyMaintenance: { es: "Mantenimiento y Servicio\nDiseño orientado a bajo mantenimiento:\n* Intervalos de mantenimiento extendidos.\n* Reducción de puntos de lubricación gracias al uso de componentes sellados.", en: "Maintenance and Service\nDesign oriented to low maintenance:\n* Extended maintenance intervals.\n* Reduced lubrication points thanks to sealed components.", de: "Wartung und Service\nWartungsarmes Design:\n* Verlängerte Wartungsintervalle.\n* Reduzierte Schmierstellen dank abgedichteter Komponenten.", pt: "Manutenção e Serviço\nDesign orientado para baixa manutenção:\n* Intervalos de manutenção estendidos.\n* Redução dos pontos de lubrificação graças ao uso de componentes selados." }
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
    origin: { es: "Germany/China", en: "Germany/China", de: "Deutschland/China", pt: "Alemanha/China" },
    compactionAssistant: {
      es: "Economizer - Sensor de rigidez del suelo",
      en: "Economizer - Soil stiffness sensor",
      de: "Economizer - Bodensteifigkeitssensor",
      pt: "Economizer - Sensor de rigidez do solo"
    },
    innovations: {
      es: "Bajos TCO (Servicio/Matenimiento/Reparación/confiabilidad)",
      en: "Low TCO (Service/Maintenance/Repair/Reliability)",
      de: "Niedrige TCO (Service/Wartung/Reparatur/Zuverlässigkeit)",
      pt: "Baixo TCO (Serviço/Manutenção/Reparo/Confiabilidade)"
    },
    usp: {
      es: "Fácil y seguro de operar. Economizer (Opción) Incluye indicador de temperatura",
      en: "Easy and safe to operate. Economizer (Option) Includes temperature indicator",
      de: "Einfach und sicher zu bedienen. Economizer (Option) Enthält Temperaturanzeige",
      pt: "Fácil e seguro de operar. Economizer (Opção) Inclui indicador de temperatura"
    },
    fuelConsumption: 2.6,
    price: 28000.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 1.3,
    usageTime: 3500,
    tco: 49700.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 205,
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 49700.00,
    tcoTimeline: [
      { hours: 0, price: 28000, tco: 49700.00 },
      { hours: 1000, price: 32900, tco: 49700.00 },
      { hours: 1500, price: 35350, tco: 49700.00 },
      { hours: 2000, price: 37800, tco: 49700.00 },
      { hours: 2500, price: 40250, tco: 49700.00 },
      { hours: 3000, price: 42700, tco: 49700.00 },
    ],
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
    origin: { es: "China", en: "China", de: "China", pt: "China" },
    compactionAssistant: {
      es: "CMV (Compaction Meter Value)",
      en: "CMV (Compaction Meter Value)",
      de: "CMV (Compaction Meter Value)",
      pt: "CMV (Valor do Medidor de Compactação)"
    },
    innovations: {
      es: "Rodillo de bajo costo operativo, ideal para flotas de alquiler o trabajos donde la simplicidad y confiabilidad mecánica son prioridad.",
      en: "Low-cost operational roller, ideal for rental fleets or works where mechanical simplicity and reliability are priority.",
      de: "Günstiger Betriebsroller, ideal für Mietflotten oder Arbeiten, bei denen mechanische Einfachheit und Zuverlässigkeit Priorität haben.",
      pt: "Rolador de baixo custo operacional, ideal para frotas de aluguer ou trabalhos onde a simplicidade e confiabilidade mecânica são prioridade."
    },
    usp: {
      es: "Rodillo de bajo costo operativo, ideal para flotas de alquiler o trabajos donde la simplicidad y confiabilidad mecánica son prioridad.",
      en: "Low-cost operational roller, ideal for rental fleets or works where mechanical simplicity and reliability are priority.",
      de: "Günstiger Betriebsroller, ideal für Mietflotten oder Arbeiten, bei denen mechanische Einfachheit und Zuverlässigkeit Priorität haben.",
      pt: "Rolador de baixo custo operacional, ideal para frotas de aluguer ou trabalhos onde a simplicidade e confiabilidade mecânica são prioridade."
    },
    fuelConsumption: 2.3,
    price: 29630.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 3500,
    tco: 52205.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 200,
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 52205.00,
    tcoTimeline: [
      { hours: 0, price: 29630, tco: 52205.00 },
      { hours: 1000, price: 34930, tco: 52205.00 },
      { hours: 1500, price: 37580, tco: 52205.00 },
      { hours: 2000, price: 40230, tco: 52205.00 },
      { hours: 2500, price: 42880, tco: 52205.00 },
      { hours: 3000, price: 45530, tco: 52205.00 },
    ],
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
    origin: { es: "Czech", en: "Czech", de: "Tschechien", pt: "República Tcheca" },
    compactionAssistant: {
      es: "HAMM Compaction Meter: Sensor de aceleración / frecuencia",
      en: "HAMM Compaction Meter: Acceleration / frequency sensor",
      de: "HAMM Compaction Meter: Beschleunigungssensor / Frequenz",
      pt: "HAMM Compaction Meter: Sensor de aceleração / frequência"
    },
    innovations: {
      es: "Máxima maniobrabilidad con doble tambor vibratorio y opción de configuración para zonas urbanas estrechas",
      en: "Maximum maneuverability with double vibratory drum and configuration option for narrow urban areas",
      de: "Maximale Manövrierfähigkeit mit doppeltem Vibrationsbagger und Konfigurationsoption für engste Stadtzonen",
      pt: "Máxima maniabilidade com dois tambor vibratório e opção de configuração para áreas urbanas estreitas"
    },
    usp: {
      es: "Máxima maniobrabilidad con doble tambor vibratorio y opción de configuración para zonas urbanas estrechas",
      en: "Maximum maneuverability with double vibratory drum and configuration option for narrow urban areas",
      de: "Maximale Manövrierfähigkeit mit doppeltem Vibrationsbagger und Konfigurationsoption für engste Stadtzonen",
      pt: "Máxima maniabilidade com dois tambor vibratório e opção de configuração para áreas urbanas estreitas"
    },
    fuelConsumption: 2.8,
    price: 29580.00,
    preventiveMaintenance: 1.5,
    correctiveMaintenance: 1,
    usageTime: 3500,
    tco: 53030.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 180,
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 53030.00,
    tcoTimeline: [
      { hours: 0, price: 29580, tco: 53030.00 },
      { hours: 1000, price: 34880, tco: 53030.00 },
      { hours: 1500, price: 37480, tco: 53030.00 },
      { hours: 2000, price: 40080, tco: 53030.00 },
      { hours: 2500, price: 42680, tco: 53030.00 },
      { hours: 3000, price: 45280, tco: 53030.00 },
    ],
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
    origin: { es: "Brasil", en: "Brasil", de: "Brasil", pt: "Brasil" },
    compactionAssistant: {
      es: "DCA-A Sensor de aceleración / amplitud",
      en: "DCA-A Acceleration / amplitude sensor",
      de: "DCA-A Beschleunigungssensor / Amplitude",
      pt: "DCA-A Sensor de aceleração / amplitude"
    },
    innovations: {
      es: "Chasis compacto con diseño en tándem y opción de sistema DCA para trazabilidad por zonas (en modelos superiores).",
      en: "Compact chassis with tandem design and DCA system for traceability by zones (in superior models).",
      de: "Kompaktes Fahrgestell mit Tandem-Design und DCA-System für Nachverfolgbarkeit nach Zonen (in höheren Modellen).",
      pt: "Chassis compacto com design em tandem e sistema DCA para rastreabilidade por zonas (em modelos superiores)."
    },
    usp: {
      es: "Chasis compacto con diseño en tándem y opción de sistema DCA para trazabilidad por zonas (en modelos superiores).",
      en: "Compact chassis with tandem design and DCA system for traceability by zones (in superior models).",
      de: "Kompaktes Fahrgestell mit Tandem-Design und DCA-System für Nachverfolgbarkeit nach Zonen (in höheren Modellen).",
      pt: "Chassis compacto com design em tandem e sistema DCA para rastreabilidade por zonas (em modelos superiores)."
    },
    fuelConsumption: 2.7,
    price: 26783.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 1.4,
    usageTime: 3500,
    tco: 49358.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 159,
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 49358.00,
    tcoTimeline: [
      { hours: 0, price: 26783, tco: 49358.00 },
      { hours: 1000, price: 31783, tco: 49358.00 },
      { hours: 1500, price: 34283, tco: 49358.00 },
      { hours: 2000, price: 36783, tco: 49358.00 },
      { hours: 2500, price: 39283, tco: 49358.00 },
      { hours: 3000, price: 41783, tco: 49358.00 },
    ],
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
    origin: { es: "Switzerland", en: "Switzerland", de: "Schweiz", pt: "Suíça" },
    compactionAssistant: {
      es: "ACEforce: Sensor de rigidez dinámica",
      en: "ACEforce: Dynamic stiffness sensor",
      de: "ACEforce: Dynamischer Steifigkeitssensor",
      pt: "ACEforce: Sensor de rigidez dinâmica"
    },
    innovations: {
      es: "Tecnología de compactación activa que ajusta automáticamente la vibración según la rigidez del suelo para optimizar el número de pasadas.",
      en: "Active compaction technology that automatically adjusts the vibration according to the soil stiffness to optimize the number of passes.",
      de: "Aktive Verdichtungstechnologie, die die Vibration automatisch an die Bodensteifigkeit anpasst, um die Anzahl der Durchläufe zu optimieren.",
      pt: "Tecnologia de compactação ativa que ajusta automaticamente a vibração de acordo com a rigidez do solo para otimizar o número de passadas."
    },
    usp: {
      es: "Tecnología de compactación activa que ajusta automáticamente la vibración según la rigidez del suelo para optimizar el número de pasadas.",
      en: "Active compaction technology that automatically adjusts the vibration according to the soil stiffness to optimize the number of passes.",
      de: "Aktive Verdichtungstechnologie, die die Vibration automatisch an die Bodensteifigkeit anpasst, um die Anzahl der Durchläufe zu optimieren.",
      pt: "Tecnologia de compactação ativa que ajusta automaticamente a vibração de acordo com a rigidez do solo para otimizar o número de passadas."
    },
    fuelConsumption: 3.2,
    price: 25500.00,
    preventiveMaintenance: 1,
    correctiveMaintenance: 1.3,
    usageTime: 3500,
    tco: 50350.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 110,
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 50350.00,
    tcoTimeline: [
      { hours: 0, price: 25500, tco: 50350.00 },
      { hours: 1000, price: 29500, tco: 50350.00 },
      { hours: 1500, price: 31500, tco: 50350.00 },
      { hours: 2000, price: 33500, tco: 50350.00 },
      { hours: 2500, price: 35500, tco: 50350.00 },
      { hours: 3000, price: 37500, tco: 50350.00 },
    ],
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
    origin: { es: "India", en: "India", de: "Indien", pt: "Índia" },
    compactionAssistant: {
      es: "No aplica",
      en: "No aplica",
      de: "Keine Anwendung",
      pt: "Não aplicável"
    },
    innovations: {
      es: "Diseño robusto, excelente acceso a mantenimiento y componentes estandarizados para máxima disponibilidad en campo.",
      en: "Robust design, excellent access to maintenance and standardized components for maximum availability in the field.",
      de: "Robustes Design, hervorragender Zugang zum Wartungs- und Standardisierungskomponenten für maximale Verfügbarkeit im Feld.",
      pt: "Design robusto, excelente acesso a manutenção e componentes padronizados para máxima disponibilidade em campo."
    },
    usp: {
      es: "Diseño robusto, excelente acceso a mantenimiento y componentes estandarizados para máxima disponibilidad en campo.",
      en: "Robust design, excellent access to maintenance and standardized components for maximum availability in the field.",
      de: "Robustes Design, hervorragender Zugang zum Wartungs- und Standardisierungskomponenten für maximale Verfügbarkeit im Feld.",
      pt: "Design robusto, excelente acesso a manutenção e componentes padronizados para máxima disponibilidade em campo."
    },
    fuelConsumption: 2.7,
    price: 23500.00,
    preventiveMaintenance: 1.5,
    correctiveMaintenance: 2,
    usageTime: 3500,
    tco: 49925.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 197,
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 49925.00,
    tcoTimeline: [
      { hours: 0, price: 23500, tco: 49925.00 },
      { hours: 1000, price: 27500, tco: 49925.00 },
      { hours: 1500, price: 29500, tco: 49925.00 },
      { hours: 2000, price: 31500, tco: 49925.00 },
      { hours: 2500, price: 33500, tco: 49925.00 },
      { hours: 3000, price: 35500, tco: 49925.00 },
    ],
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
    origin: { es: "Germany", en: "Germany", de: "Deutschland", pt: "Alemanha" },
    compactionAssistant: {
      es: "No aplica",
      en: "No aplica",
      de: "Keine Anwendung",
      pt: "Não aplicável"
    },
    innovations: {
      es: "Diseño robusto, excelente acceso a mantenimiento y componentes estandarizados para máxima disponibilidad en campo.",
      en: "Robust design, excellent access to maintenance and standardized components for maximum availability in the field.",
      de: "Robustes Design, hervorragender Zugang zum Wartungs- und Standardisierungskomponenten für maximale Verfügbarkeit im Feld.",
      pt: "Design robusto, excelente acesso a manutenção e componentes padronizados para máxima disponibilidade em campo."
    },
    usp: {
      es: "Diseño robusto, excelente acceso a mantenimiento y componentes estandarizados para máxima disponibilidad en campo.",
      en: "Robust design, excellent access to maintenance and standardized components for maximum availability in the field.",
      de: "Robustes Design, hervorragender Zugang zum Wartungs- und Standardisierungskomponenten für maximale Verfügbarkeit im Feld.",
      pt: "Design robusto, excelente acesso a manutenção e componentes padronizados para máxima disponibilidade em campo."
    },
    fuelConsumption: 2.7,
    price: 23500.00,
    preventiveMaintenance: 1.5,
    correctiveMaintenance: 2,
    usageTime: 3500,
    tco: 49925.00,
    compactionSystem: "Vibratory",
    waterTankCapacity: 197,
    articulationJoint: { es: "Articulación de la rueda", en: "Articulation of the wheel", de: "Kurbelwelle", pt: "Articulação da roda" },
    comfortSafety: { es: "Confort y seguridad", en: "Comfort and safety", de: "Komfort und Sicherheit", pt: "Conforto e segurança" },
    efficientCompaction: { es: "Compactación eficiente", en: "Efficient compaction", de: "Effiziente Verdichtung", pt: "Compactação eficiente" },
    aceTechnology: { es: "Tecnología ACE", en: "ACE Technology", de: "ACE-Technologie", pt: "Tecnologia ACE" },
    easyMaintenance: { es: "Mantenimiento fácil", en: "Easy maintenance", de: "Einfache Wartung", pt: "Manutenção fácil" },
    staticTco: 49925.00,
    tcoTimeline: [
      { hours: 0, price: 23500, tco: 49925.00 },
      { hours: 1000, price: 27500, tco: 49925.00 },
      { hours: 1500, price: 29500, tco: 49925.00 },
      { hours: 2000, price: 31500, tco: 49925.00 },
      { hours: 2500, price: 33500, tco: 49925.00 },
      { hours: 3000, price: 35500, tco: 49925.00 },
    ],
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