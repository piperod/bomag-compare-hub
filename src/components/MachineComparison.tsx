import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sdrMachines, ltrMachines, MachineSpec } from '@/data/machineData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import placeholder from '/public/placeholder.svg';

interface MachineComparisonProps {
  selectedLine: string;
  selectedMachines: string[];
  setSelectedMachines: (machines: string[] | ((prev: string[]) => string[])) => void;
  editableTCO: { [key: string]: number };
  setEditableTCO: (tco: { [key: string]: number } | ((prev: { [key: string]: number }) => { [key: string]: number })) => void;
  editablePrice: { [key: string]: number };
  setEditablePrice: (price: { [key: string]: number } | ((prev: { [key: string]: number }) => { [key: string]: number })) => void;
  editablePreventiveMaintenance: { [key: string]: number };
  setEditablePreventiveMaintenance: (maintenance: { [key: string]: number } | ((prev: { [key: string]: number }) => { [key: string]: number })) => void;
  editableCorrectiveMaintenance: { [key: string]: number };
  setEditableCorrectiveMaintenance: (maintenance: { [key: string]: number } | ((prev: { [key: string]: number }) => { [key: string]: number })) => void;
}

// HTR machine data (hardcoded, Spanish labels)
const htrMachines = [
  {
    brand: 'BOMAG',
    model: 'BW161-AD-4',
    weight: 9700,
    engine: 'Deutz TCD L04 2V',
    compactionWidth: 1.68,
    power: 114,
    amplitude: '0,94/0,42',
    staticLinearLoad: 30.1,
    gradeability: 35,
    origin: { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' },
    compactionAssistant: {
      es: 'BOMAG ECONOMIZER\nSistema visual que permite a los operadores medir el progreso de la compactación en tiempo real. Utiliza una escala LED en la cabina para mostrar el nivel de compactación alcanzado, ayudando a evitar sobrecompacción o subcompactación.',
      en: 'BOMAG ECONOMIZER\nVisual system that allows operators to measure compaction progress in real time. Uses an LED scale in the cab to show the achieved compaction level, helping to avoid over- or under-compaction.',
      de: 'BOMAG ECONOMIZER\nVisuelles System, das es dem Bediener ermöglicht, den Verdichtungsfortschritt in Echtzeit zu messen. Eine LED-Skala in der Kabine zeigt das erreichte Verdichtungsniveau an und hilft, Über- oder Unterverdichtung zu vermeiden.',
      pt: 'BOMAG ECONOMIZER\nSistema visual que permite aos operadores medir o progresso da compactação em tempo real. Utiliza uma escala de LED na cabine para mostrar o nível de compactação alcançado, ajudando a evitar sobre ou subcompactação.'
    },
    asphaltManager: {
      es: 'BOMAG ASPHALT MANAGER\nNingún otro sistema es tan flexible como la AM: con la amplitud de salida variable, puede ser potente o sensible. Se aplica el nivel de fuerza adecuado en la dirección correcta en cualquier aplicación: Adaptación del tambor de vibración hasta oscilación. Medición del Evib en MN/m2',
      en: 'BOMAG ASPHALT MANAGER\nNo other system is as flexible as AM: with variable output amplitude, it can be powerful or sensitive. The right force level is applied in the right direction for any application: Vibration drum adapts up to oscillation. Evib measurement in MN/m2.',
      de: 'BOMAG ASPHALT MANAGER\nKein anderes System ist so flexibel wie AM: Mit variabler Ausgangsamplitude kann es kraftvoll oder sensibel sein. Die richtige Kraft wird in die richtige Richtung für jede Anwendung aufgebracht: Anpassung der Vibrationswalze bis zur Oszillation. Evib-Messung in MN/m2.',
      pt: 'BOMAG ASPHALT MANAGER\nNenhum outro sistema é tão flexível quanto o AM: com amplitude de saída variável, pode ser potente ou sensível. O nível de força adequado é aplicado na direção certa em qualquer aplicação: Adaptação do tambor vibratório até a oscilação. Medição do Evib em MN/m2.'
    },
    telemetry: { es: 'Telematic, BOMAP', en: 'Telematic, BOMAP', de: 'Telematic, BOMAP', pt: 'Telematic, BOMAP' },
    innovations: {
      es: 'TANGO, ASPHALT MANAGER, ECONOMIZER ECOMODE, TELEMATIC',
      en: 'TANGO, ASPHALT MANAGER, ECONOMIZER ECOMODE, TELEMATIC',
      de: 'TANGO, ASPHALT MANAGER, ECONOMIZER ECOMODE, TELEMATIC',
      pt: 'TANGO, ASPHALT MANAGER, ECONOMIZER ECOMODE, TELEMATIC'
    },
    vibrationSystems: {
      es: '3 sistemas de vibración\nSolo los rodillos tándem BOMAG le ofrecen tres sistemas de vibración. Con doble vibración, TanGO y ASPHALT MANAGER, tiene tres tecnologías para elegir.',
      en: '3 vibration systems\nOnly BOMAG tandem rollers offer you three vibration systems. With double vibration, TanGO, and ASPHALT MANAGER, you have three technologies to choose from.',
      de: '3 Vibrationssysteme\nNur BOMAG Tandemwalzen bieten Ihnen drei Vibrationssysteme. Mit Doppelvibration, TanGO und ASPHALT MANAGER stehen drei Technologien zur Auswahl.',
      pt: '3 sistemas de vibração\nApenas os rolos tandem BOMAG oferecem três sistemas de vibração. Com vibração dupla, TanGO e ASPHALT MANAGER, você tem três tecnologias para escolher.'
    },
    maintenanceJoint: {
      es: 'Junta de articulación libre de mantenimiento',
      en: 'Maintenance-free articulation joint',
      de: 'Wartungsfreie Knickgelenke',
      pt: 'Articulação livre de manutenção'
    },
    fuelConsumption: 11.8,
    price: 28000,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 2000,
    tco: 50000,
    usp: { es: 'TANGO, ASPHALT MANAGER, ECONOMIZER ECOMODE, TELEMATIC', en: 'TANGO, ASPHALT MANAGER, ECONOMIZER ECOMODE, TELEMATIC', de: 'TANGO, ASPHALT MANAGER, ECONOMIZER ECOMODE, TELEMATIC', pt: 'TANGO, ASPHALT MANAGER, ECONOMIZER ECOMODE, TELEMATIC' },
    maxCompactionDepth: 0.3,
    compactionPerformance: '150-200',
    tcoTimeline: [
      { hours: 0, price: 28000, tco: 28000 },
      { hours: 1000, price: null, tco: 35000 },
      { hours: 2000, price: null, tco: 42000 }
    ]
  },
  {
    brand: 'AMMANN',
    model: 'AV110X',
    weight: 10400,
    engine: 'Cummins QSB3.3-C99',
    compactionWidth: 1.7,
    power: 99,
    amplitude: '0,7/0,35',
    staticLinearLoad: 30.9,
    gradeability: 30,
    origin: { es: 'República Checa', en: 'Czech Republic', de: 'Tschechische Republik', pt: 'República Tcheca' },
    compactionAssistant: {
      es: 'No aplica',
      en: 'No applicable',
      de: 'Nicht anwendbar',
      pt: 'Não aplicável'
    },
    asphaltManager: {
      es: 'No aplica',
      en: 'No applicable',
      de: 'Nicht anwendbar',
      pt: 'Não aplicável'
    },
    telemetry: { es: 'Dyn@Link', en: 'Dyn@Link', de: 'Dyn@Link', pt: 'Dyn@Link' },
    innovations: {
      es: 'Junta con oscilación, diagnóstico abordo',
      en: 'Oscillation joint, on-board diagnosis',
      de: 'Schwenkgelenk, Borddiagnose',
      pt: 'Articulação com oscilação, diagnóstico a bordo'
    },
    vibrationSystems: {
      es: 'Alta visibilidad, compactación potente y cómoda',
      en: 'High visibility, powerful and comfortable compaction',
      de: 'Hohe Sichtbarkeit, kraftvolle und bequeme Verdichtung',
      pt: 'Alta visibilidade, compactação potente e confortável'
    },
    maintenanceJoint: {
      es: 'No aplica',
      en: 'No applicable',
      de: 'Nicht anwendbar',
      pt: 'Não aplicável'
    },
    fuelConsumption: 11.8,
    price: 28000,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 2000,
    tco: 50000,
    usp: { es: 'Junta con oscilación, diagnóstico abordo', en: 'Oscillation joint, on-board diagnosis', de: 'Schwenkgelenk, Borddiagnose', pt: 'Articulação com oscilação, diagnóstico a bordo' },
    maxCompactionDepth: 0.3,
    compactionPerformance: '140-180',
    tcoTimeline: [
      { hours: 0, price: 28000, tco: 28000 },
      { hours: 1000, price: null, tco: 35000 },
      { hours: 2000, price: null, tco: 42000 }
    ]
  },
  {
    brand: 'CATERPILLAR',
    model: 'CB10',
    weight: 9500,
    engine: 'CAT C4.4',
    compactionWidth: 1.7,
    power: 130,
    amplitude: '0,84/0,18',
    staticLinearLoad: 28.5,
    gradeability: 31,
    origin: { es: 'China', en: 'China', de: 'China', pt: 'China' },
    compactionAssistant: {
      es: 'CMV + PassCount\nUtiliza sensores de aceleración en el tambor vibratorio para medir la respuesta del suelo/asfalto a las vibraciones del rodillo. Proporciona una lectura relativa de la calidad de compactación.',
      en: 'CMV + PassCount\nUses acceleration sensors on the vibratory drum to measure the response of the soil/asphalt to the roller vibrations. Provides a relative reading of compaction quality.',
      de: 'CMV + PassCount\nVerwendet Beschleunigungssensoren am Vibrationskörper, um die Reaktion des Bodens/Asphalts auf die Rollervibrationen zu messen. Stellt eine relative Lesung der Verdichtungsqualität bereit.',
      pt: 'CMV + PassCount\nUtiliza sensores de aceleração no tambor vibratório para medir a resposta do solo/asfalto às vibrações do rolo. Fornece uma leitura relativa da qualidade de compactação.'
    },
    asphaltManager: {
      es: 'No aplica',
      en: 'No applicable',
      de: 'Nicht anwendbar',
      pt: 'Não aplicável'
    },
    telemetry: { es: 'Vision Link', en: 'Vision Link', de: 'Vision Link', pt: 'Vision Link' },
    innovations: {
      es: 'Versa Vibe™, 360° visión, Oscilación',
      en: 'Versa Vibe™, 360° vision, Oscillation',
      de: 'Versa Vibe™, 360° Sicht, Oszillation',
      pt: 'Versa Vibe™, 360° visão, Oscilação'
    },
    vibrationSystems: {
      es: 'Sistema VersaVibe™\nTecnología que permite a los compactadores tándem trabajar con cuatro configuraciones distintas de vibración, adaptándose a diferentes condiciones de asfalto y objetivos de compactación.',
      en: 'VersaVibe™ technology\nAllows tandem compactors to work with four different vibration configurations, adapting to different asphalt conditions and compaction objectives.',
      de: 'VersaVibe™-Technologie\nErmöglicht es dem Verdichter, mit vier verschiedenen Vibrationskonfigurationen zu arbeiten, die sich an unterschiedliche Asphalte und Verdichtungsziele anpassen.',
      pt: 'Sistema VersaVibe™\nTecnologia que permite compactadores tandem trabalharem com quatro configurações distintas de vibração, adaptando-se a diferentes condições de asfalto e objetivos de compactação.'
    },
    maintenanceJoint: {
      es: 'No aplica',
      en: 'No applicable',
      de: 'Nicht anwendbar',
      pt: 'Não aplicável'
    },
    fuelConsumption: 11.8,
    price: 28000,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 2000,
    tco: 50000,
    usp: { es: 'Versa Vibe™, 360° visión, Oscilación', en: 'Versa Vibe™, 360° vision, Oscillation', de: 'Versa Vibe™, 360° Sicht, Oszillation', pt: 'Versa Vibe™, 360° visão, Oscilação' },
    maxCompactionDepth: 0.3,
    compactionPerformance: '160-210',
    tcoTimeline: [
      { hours: 0, price: 28000, tco: 28000 },
      { hours: 1000, price: null, tco: 35000 },
      { hours: 2000, price: null, tco: 42000 }
    ]
  },
  {
    brand: 'DYNAPAC',
    model: 'CC4200',
    weight: 10400,
    engine: 'Cummins QSB4.5',
    compactionWidth: 1.73,
    power: 110,
    amplitude: '0,8/0,3',
    staticLinearLoad: 31,
    gradeability: 45,
    origin: { es: 'Brasil', en: 'Brazil', de: 'Brasil', pt: 'Brasil' },
    compactionAssistant: {
      es: 'No aplica',
      en: 'No applicable',
      de: 'Nicht anwendbar',
      pt: 'Não aplicável'
    },
    asphaltManager: {
      es: 'No aplica',
      en: 'No applicable',
      de: 'Nicht anwendbar',
      pt: 'Não aplicável'
    },
    telemetry: { es: 'No', en: 'No', de: 'Nein', pt: 'Não' },
    innovations: {
      es: 'Oscilación, cabina deslizante',
      en: 'Oscillation, sliding cabin',
      de: 'Oszillation, schwenkbare Kabine',
      pt: 'Oscilação, cabine deslizante'
    },
    vibrationSystems: {
      es: 'Alta fuerza centrífuga y amplitud, gran tanque de agua',
      en: 'High centrifugal force and amplitude, large water tank',
      de: 'Hohe Zentrifugalkraft und Amplitude, großer Wasserbehälter',
      pt: 'Alta força centrífuga e amplitude, grande tanque de água'
    },
    maintenanceJoint: {
      es: 'Junta de articulación libre de mantenimiento',
      en: 'Maintenance-free articulation joint',
      de: 'Wartungsfreie Knickgelenke',
      pt: 'Articulação livre de manutenção'
    },
    fuelConsumption: 11.8,
    price: 28000,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 2000,
    tco: 50000,
    usp: { es: 'Oscilación, cabina deslizante', en: 'Oscillation, sliding cabin', de: 'Oszillation, schwenkbare Kabine', pt: 'Oscilação, cabine deslizante' },
    maxCompactionDepth: 0.3,
    compactionPerformance: '150-190',
    tcoTimeline: [
      { hours: 0, price: 28000, tco: 28000 },
      { hours: 1000, price: null, tco: 35000 },
      { hours: 2000, price: null, tco: 42000 }
    ]
  },
  {
    brand: 'HAMM',
    model: 'HD90 VV',
    weight: 9190,
    engine: 'Deutz TCD L04 2V',
    compactionWidth: 1.68,
    power: 134,
    amplitude: '0,66/0,37',
    staticLinearLoad: 27.6,
    gradeability: 40,
    origin: { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' },
    compactionAssistant: {
      es: 'HCM (HAMM Compaction)\nSe basa en sensores que evalúan la rigidez del material compactado en tiempo real, usando datos dinámicos del tambor vibratorio. Valores adimensionales',
      en: 'HCM (HAMM Compaction)\nIs based on sensors that evaluate the rigidity of the compacted material in real time, using dynamic data from the vibratory drum. Dimensional values',
      de: 'HCM (HAMM Compaction)\nBasierend auf Sensoren, die die Steifigkeit des verdichteten Materials in Echtzeit bewerten, indem sie dynamische Daten vom Vibrationskörper verwenden. Dimensionale Werte',
      pt: 'HCM (HAMM Compaction)\nBaseia-se em sensores que avaliam a rigidez do material compactado em tempo real, usando dados dinâmicos do tambor vibratório. Valores adimensionais'
    },
    asphaltManager: {
      es: 'No aplica',
      en: 'No applicable',
      de: 'Nicht anwendbar',
      pt: 'Não aplicável'
    },
    telemetry: { es: 'John Deere Operations Center', en: 'John Deere Operations Center', de: 'John Deere Operations Center', pt: 'John Deere Operations Center' },
    innovations: {
      es: 'VIO, HAMMTRONIC, Easy Drive',
      en: 'VIO, HAMMTRONIC, Easy Drive',
      de: 'VIO, HAMMTRONIC, Easy Drive',
      pt: 'VIO, HAMMTRONIC, Easy Drive'
    },
    vibrationSystems: {
      es: 'VIO , tecnología  que permite a un solo tambor trabajar tanto con vibración vertical como con oscilación horizontal, según las condiciones del material o del entorno.',
      en: 'VIO , technology that allows a single drum to work with both vertical and horizontal vibration, depending on the material or environment conditions.',
      de: 'VIO , Technologie, die es einem einzelnen Trommeln ermöglicht, sowohl vertikale als auch horizontale Schwingung zu arbeiten, je nach Material oder Umgebungsbedingungen.',
      pt: 'VIO , tecnologia que permite a um único tambor trabalhar tanto com vibração vertical como com oscilação horizontal, dependendo das condições do material ou do ambiente.'
    },
    maintenanceJoint: {
      es: 'La articulación ajustable oscila para garantizar un contacto constante entre los tambores y la superficie',
      en: 'The adjustable articulation oscillates to ensure constant contact between the drums and the surface',
      de: 'Die einstellbare Gelenk schwingt, um einen stetigen Kontakt zwischen den Trommeln und der Oberfläche zu gewährleisten',
      pt: 'A articulação ajustável oscila para garantir um contato constante entre os tambores e a superfície'
    },
    fuelConsumption: 11.8,
    price: 28000,
    preventiveMaintenance: 1,
    correctiveMaintenance: 2,
    usageTime: 2000,
    tco: 50000,
    usp: { es: 'VIO, HAMMTRONIC, Easy Drive', en: 'VIO, HAMMTRONIC, Easy Drive', de: 'VIO, HAMMTRONIC, Easy Drive', pt: 'VIO, HAMMTRONIC, Easy Drive' },
    maxCompactionDepth: 0.3,
    compactionPerformance: '170-220',
    tcoTimeline: [
      { hours: 0, price: 28000, tco: 28000 },
      { hours: 1000, price: null, tco: 35000 },
      { hours: 2000, price: null, tco: 42000 }
    ]
  },
];

const base = import.meta.env.BASE_URL;
const getImagePath = (model: string, line: string) => {
  const folder = line === 'sdr' ? 'SDR' : line === 'ltr' ? 'LTR' : line === 'htr' ? 'HTR' : '';
  if (!folder) return base + 'placeholder.svg';
  const images = {
    SDR: [
      // Prefer PNGs when available
      'BW211 D5-SL.png',
      'ASC110.png',
      '1107EX.png',
      'HC110.png',
      'CA35D-Rhino.png',
      // JPG fallbacks and additional images
      '116D.jpg','XS123.jpg','SSR120C-10S.jpg','V110.jpg','CS11GC.jpg','CS12.jpg','CS10GC.jpg','CA25_D.jpg','CA25DRhino.jpg','BW211_D5_SL.jpg','510.jpg'
    ],
    LTR: [
      'RD27.png','CT260.jpg','ARX26.jpg','CC1200.jpg','HD12VV.png','CB2.7GC.jpg','BW120 AD-5.jpg'
    ],
    HTR: [
      'HD90 VV.jpg','CC4200.jpg','CB10.jpg','AV110X.jpg','BW161-AD-4.jpg','BW161AD4.jpg'
    ]
  };
  const norm = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const modelNorm = norm(model);
  // Special case for CA25 D-Rhino
  if (modelNorm === 'ca25drhino' && images[folder].includes('CA25DRhino.jpg')) {
    return `${base}images/${folder}/CA25DRhino.jpg`;
  }
  const match = images[folder].find(img => norm(img).includes(modelNorm));
  if (match) return `${base}images/${folder}/${match}`;
  // BOMAG SDR fallback image when specific model is missing
  if (folder === 'SDR') return `${base}images/${folder}/BW211 D5-SL.png`;
  return `${base}placeholder.svg`;
};

// Add a helper to interpolate color
function getPriceColor(value: number, min: number, max: number) {
  if (min === max) return '#fde047'; // yellow if all equal
  const percent = (value - min) / (max - min);
  if (percent <= 0.5) {
    // Green to Yellow
    const ratio = percent / 0.5;
    return `rgb(${76 + (253-76)*ratio}, ${222 + (224-222)*ratio}, ${128 + (71-128)*ratio})`;
  } else {
    // Yellow to Red
    const ratio = (percent - 0.5) / 0.5;
    return `rgb(${253 + (248-253)*ratio}, ${224 + (113-224)*ratio}, ${71 + (113-71)*ratio})`;
  }
}

// Stable machine id independent of search/filter order
const getMachineId = (machine: MachineSpec) => {
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
  return `${normalize(machine.brand)}__${normalize(machine.model)}__${normalize(machine.engine)}`;
};

const MachineComparison = ({ 
  selectedLine, 
  selectedMachines, 
  setSelectedMachines, 
  editableTCO, 
  setEditableTCO,
  editablePrice,
  setEditablePrice,
  editablePreventiveMaintenance,
  setEditablePreventiveMaintenance,
  editableCorrectiveMaintenance,
  setEditableCorrectiveMaintenance
}: MachineComparisonProps) => {
  const { t, language } = useLanguage();
  // Modal state for volume calculator
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [lengthM, setLengthM] = useState<number>(0);
  const [widthM, setWidthM] = useState<number>(0);
  const [heightM, setHeightM] = useState<number>(0);
  // Surface volume calculator state
  const [surfaceVolumeM3, setSurfaceVolumeM3] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('surfaceVolumeM3');
      const num = saved ? parseFloat(saved) : 0;
      return isNaN(num) ? 0 : num;
    }
    return 0;
  });
  // Fuel price state
  const [fuelPrice, setFuelPrice] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fuelPriceUSD');
      const num = saved ? parseFloat(saved) : 1.2;
      return isNaN(num) ? 1.2 : num;
    }
    return 1.2;
  });

  // Editable compaction performance state
  const [editableCompactionPerformance, setEditableCompactionPerformance] = useState<{ [key: string]: number }>({});
  
  // Editable fuel consumption state
  const [editableFuelConsumption, setEditableFuelConsumption] = useState<{ [key: string]: number }>({});
  
  // Work efficiency state (percentage)
  const [workEfficiency, setWorkEfficiency] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('workEfficiency');
      return saved ? parseFloat(saved) : 100;
    }
    return 100;
  });

  // Search state
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Show only selected machines in the grid
  const [showOnlySelected, setShowOnlySelected] = useState<boolean>(false);

  // When opening the volume calculator, restrict grid to selected machines
  // When calculator opens in-page, keep only selected visible and scroll into view
  useEffect(() => {
    setShowOnlySelected(isCalcOpen);
  }, [isCalcOpen]);
  const calcSectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isCalcOpen && calcSectionRef.current) {
      calcSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isCalcOpen]);

  const machines = selectedLine === 'sdr' ? sdrMachines : selectedLine === 'ltr' ? ltrMachines : selectedLine === 'htr' ? htrMachines : [];
  const machinesSorted = React.useMemo(() => {
    let arr = [...machines];

    // Filter by search term if provided
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      const filtered = arr.filter(machine => 
        machine.brand.toLowerCase().includes(searchLower) ||
        machine.model.toLowerCase().includes(searchLower) ||
        machine.engine.toLowerCase().includes(searchLower)
      );

      // Always include already selected machines even if they don't match the search
      const selectedSet = new Set(selectedMachines);
      const selectedMachinesList = arr.filter(m => selectedSet.has(getMachineId(m)));

      // Merge and de-duplicate by stable id
      const byId: { [k: string]: typeof arr[number] } = {};
      [...filtered, ...selectedMachinesList].forEach(m => {
        byId[getMachineId(m)] = m;
      });
      arr = Object.values(byId);
    }

    // When enabled, restrict grid to selected machines only
    if (showOnlySelected) {
      const selectedSet = new Set(selectedMachines);
      arr = arr.filter(m => selectedSet.has(getMachineId(m)));
    }

    // Sort: BOMAG first, then others
    arr.sort((a, b) => {
      const aScore = a.brand === 'BOMAG' ? 0 : 1;
      const bScore = b.brand === 'BOMAG' ? 0 : 1;
      if (aScore !== bScore) return aScore - bScore;
      return 0;
    });

    return arr;
  }, [machines, searchTerm, selectedMachines, showOnlySelected]);

  // Reset selected machines and editable states when product line changes
  useEffect(() => {
    setSelectedMachines([]);
    setEditableTCO({});
    setEditablePrice({});
    setEditablePreventiveMaintenance({});
    setEditableCorrectiveMaintenance({});
  }, [selectedLine]);

  // Persist editable values to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('editableTCO', JSON.stringify(editableTCO));
    }
  }, [editableTCO]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('editablePrice', JSON.stringify(editablePrice));
    }
  }, [editablePrice]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('editablePreventiveMaintenance', JSON.stringify(editablePreventiveMaintenance));
    }
  }, [editablePreventiveMaintenance]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('editableCorrectiveMaintenance', JSON.stringify(editableCorrectiveMaintenance));
    }
  }, [editableCorrectiveMaintenance]);

  // Listen for volume and fuel price changes from localStorage
  useEffect(() => {
    const handler = () => {
      const savedVolume = localStorage.getItem('surfaceVolumeM3');
      const numVolume = savedVolume ? parseFloat(savedVolume) : 0;
      setSurfaceVolumeM3(isNaN(numVolume) ? 0 : numVolume);
      
      const savedFuel = localStorage.getItem('fuelPriceUSD');
      const numFuel = savedFuel ? parseFloat(savedFuel) : 1.2;
      setFuelPrice(isNaN(numFuel) ? 1.2 : numFuel);
    };
    handler();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const toggleMachineSelection = (machine: MachineSpec) => {
    const machineId = getMachineId(machine);
    setSelectedMachines(prev => 
      prev.includes(machineId) 
        ? prev.filter(id => id !== machineId)
        : [...prev, machineId]
    );
  };

  const calculateVolume = () => {
    const volume = lengthM * widthM * heightM;
    setSurfaceVolumeM3(volume);
    if (typeof window !== 'undefined') {
      localStorage.setItem('surfaceVolumeM3', String(volume));
    }
    setIsCalcOpen(false);
  };

  // Get effective compaction performance (original or edited) with work efficiency applied
  const getEffectiveCompactionPerformance = (machine: MachineSpec) => {
    const machineId = getMachineId(machine);
    const originalPerf = parseCompactionPerformance(machine.compactionPerformance || '');
    const editedPerf = editableCompactionPerformance[machineId];
    const basePerf = editedPerf !== undefined ? editedPerf : originalPerf;
    return basePerf * (workEfficiency / 100);
  };

  // Get effective fuel consumption (original or edited)
  const getEffectiveFuelConsumption = (machine: MachineSpec) => {
    const machineId = getMachineId(machine);
    const originalFuel = machine.fuelConsumption || 0;
    const editedFuel = editableFuelConsumption[machineId];
    return editedFuel !== undefined ? editedFuel : originalFuel;
  };

  // Get effective price (original or edited)
  const getEffectivePrice = (machine: MachineSpec) => {
    const machineId = getMachineId(machine);
    const originalPrice = machine.price || 0;
    const editedPrice = editablePrice[machineId];
    return editedPrice !== undefined ? editedPrice : originalPrice;
  };

  // Get effective preventive maintenance (original or edited)
  const getEffectivePreventiveMaintenance = (machine: MachineSpec) => {
    const machineId = getMachineId(machine);
    const originalMaintenance = machine.preventiveMaintenance || 0;
    const editedMaintenance = editablePreventiveMaintenance[machineId];
    return editedMaintenance !== undefined ? editedMaintenance : originalMaintenance;
  };

  // Get effective corrective maintenance (original or edited)
  const getEffectiveCorrectiveMaintenance = (machine: MachineSpec) => {
    const machineId = getMachineId(machine);
    const originalMaintenance = machine.correctiveMaintenance || 0;
    const editedMaintenance = editableCorrectiveMaintenance[machineId];
    return editedMaintenance !== undefined ? editedMaintenance : originalMaintenance;
  };

  const getSelectedMachineData = () => {
    return machinesSorted.filter((machine) => {
      const machineId = getMachineId(machine);
      return selectedMachines.includes(machineId);
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Helper function to parse compaction performance
  const parseCompactionPerformance = (perfRaw: string) => {
    let perfAvg = 0;
    if (typeof perfRaw === 'string') {
      const parts = perfRaw.split('-').map(s => parseFloat(s.trim()));
      if (parts.length === 2 && parts.every(n => !isNaN(n))) {
        perfAvg = (parts[0] + parts[1]) / 2;
      } else {
        const single = parseFloat(perfRaw.trim());
        perfAvg = isNaN(single) ? 0 : single;
      }
    }
    return perfAvg;
  };

  const getBrandColor = (brand: string) => {
    const colors = {
      'BOMAG': 'bg-bomag-orange',
      'HAMM': 'bg-bomag-blue', 
      'DYNAPAC': 'bg-yellow-500',
      'CATERPILLAR': 'bg-yellow-400',
      'NEW HOLLAND': 'bg-blue-600',
      'SANY': 'bg-red-500',
      'XCMG': 'bg-orange-500',
      'AMMANN': 'bg-green-600',
      'JCB': 'bg-yellow-600',
      'WACKER NEUSON': 'bg-red-600'
    };
    return colors[brand as keyof typeof colors] || 'bg-gray-500';
  };

  // Normalize multiline text: collapse duplicate bullets and use a single bullet mark
  const formatMultiline = (text: string) => {
    if (!text) return text;
    return text
      .split('\n')
      .map(line => {
        const trimmed = line.replace(/^\s+|\s+$/g, '');
        // Normalize common bullet starters
        const bulletMatch = /^([*•\-]\s*)+/.exec(trimmed);
        if (bulletMatch) {
          const content = trimmed.replace(/^([*•\-]\s*)+/, '').trim();
          return `• ${content}`;
        }
        return trimmed;
      })
      .join('\n');
  };

  // -------- USP helpers --------
  const getLocalizedText = (obj: any) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || '';
  };

  const splitToBullets = (text: string): string[] => {
    if (!text) return [];
    // Split by newlines first, then by commas, trim and dedupe
    const parts = text
      .split(/\n+/)
      .flatMap(l => l.split(/[,•;]+/))
      .map(s => s.trim())
      .filter(Boolean);
    // de-duplicate while preserving order
    const seen: Record<string, boolean> = {};
    return parts.filter(p => (seen[p.toLowerCase()] ? false : (seen[p.toLowerCase()] = true)));
  };

  const buildUspBullets = (machine: MachineSpec, category: 'operation' | 'performance' | 'comfort' | 'efficient' | 'maintenance'): string[] => {
    const bullets: string[] = [];
    const pushText = (field?: any) => splitToBullets(getLocalizedText(field)).forEach(x => bullets.push(x));

    switch (category) {
      case 'operation':
        pushText((machine as any).asphaltManager);
        pushText(machine.telemetry);
        pushText((machine as any).articulationJoint);
        // Common operation notes sometimes live in innovations (e.g., cabina deslizante)
        pushText(machine.innovations);
        break;
      case 'performance':
        pushText((machine as any).vibrationSystems);
        pushText(machine.innovations);
        // Include LTR-specific performance features
        pushText((machine as any).aceTechnology);
        pushText((machine as any).compactionSystem);
        break;
      case 'comfort':
        pushText((machine as any).comfortSafety);
        // Some comfort items are inside innovations (e.g., Easy Drive, alta visibilidad)
        pushText(machine.innovations);
        break;
      case 'efficient':
        pushText(machine.compactionAssistant);
        pushText((machine as any).asphaltManager);
        pushText((machine as any).vibrationSystems);
        pushText((machine as any).efficientCompaction);
        break;
      case 'maintenance':
        pushText((machine as any).easyMaintenance);
        pushText((machine as any).maintenanceJoint);
        break;
    }

    return bullets;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-bomag-gray">
          {selectedLine.toUpperCase()} - {t('detailComparison')}
        </h3>
        <div className="text-sm text-gray-600">
          {selectedMachines.length} máquinas seleccionadas para comparar
        </div>
        <div className="flex items-center gap-2"></div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar máquinas por marca, modelo o motor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {/* Toggle: Only selected */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
          <Checkbox
            checked={showOnlySelected}
            onCheckedChange={(v) => setShowOnlySelected(Boolean(v))}
          />
          <span>Solo máquinas seleccionadas</span>
        </div>
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-600">
            Mostrando {machinesSorted.length} máquina(s) que coinciden con "{searchTerm}"
          </div>
        )}
      </div>

      {/* Machine Selection Grid */}
      {machinesSorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {machinesSorted.map((machine, index) => (
          <Card
            key={index}
            className={`relative ${selectedMachines.includes(getMachineId(machine)) ? 'border-2 border-yellow-400' : ''}`}
          >
            <CardHeader className="pb-2">
              <div className="flex flex-col items-center justify-between">
                <img src={getImagePath(machine.model, selectedLine)} alt={machine.model} className="w-full h-32 object-contain mb-2" />
                {selectedMachines.includes(getMachineId(machine)) && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-bomag-yellow text-black border border-black/10">Seleccionada</Badge>
                  </div>
                )}
                <div className="flex items-center justify-between w-full">
                  <Badge className={`${getBrandColor(machine.brand)} text-white`}>
                    {machine.brand}
                  </Badge>
                  <Checkbox
                    checked={selectedMachines.includes(getMachineId(machine))}
                    onCheckedChange={() => toggleMachineSelection(machine)}
                  />
                </div>
                {machine.brand === 'BOMAG' && (machine as any).materialNumber && (
                  <div className="w-full text-[10px] text-gray-500 mt-1 text-right">
                    Material: {(machine as any).materialNumber}
                  </div>
                )}
              </div>
              <CardTitle className="text-lg font-semibold">{machine.model}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">{t('weight')}:</span>
                  <span className="font-medium">{machine.weight.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">{t('power')}:</span>
                  <span className="font-medium">{machine.power} HP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">{t('compactionWidth')}:</span>
                  <span className="font-medium">{machine.compactionWidth} m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">{t('amplitude')}:</span>
                  <span className="font-medium text-left">{formatMultiline(String(machine.amplitude || '-'))}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600 font-semibold">Telemetría:</span>
                  <span className="font-medium whitespace-pre-line text-left">
                    {typeof (machine as any).telemetry === 'object'
                      ? formatMultiline(((machine as any).telemetry?.[language]) || '-')
                      : formatMultiline(String((machine as any).telemetry || '-'))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No se encontraron máquinas</div>
          <div className="text-gray-400 text-sm">
            {searchTerm ? `No hay máquinas que coincidan con "${searchTerm}"` : 'No hay máquinas disponibles'}
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-bomag-blue hover:text-bomag-orange underline"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      )}

      {/* Comparison Table */}
      {selectedMachines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('compare')} - {selectedMachines.length} Máquinas</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="specs">Especificaciones</TabsTrigger>
                <TabsTrigger value="financial">Análisis Financiero</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="mt-4 space-y-8">
                {/* Basic Specifications Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Especificaciones Básicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left font-semibold">Especificación</th>
                          {getSelectedMachineData().map((machine, index) => (
                            <th key={index} className="border border-gray-300 p-2 text-center min-w-32">
                              <div className="text-sm font-bold">{machine.brand}</div>
                              <div className="text-xs">{machine.model}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          // Basic specs for all machines
                          const basicSpecs = [
                            { key: 'weight', label: t('weight'), unit: 'kg' },
                            { key: 'engine', label: t('engine'), unit: '' },
                            { key: 'compactionWidth', label: t('compactionWidth'), unit: 'm' },
                            { key: 'power', label: t('power'), unit: 'HP' },
                            { key: 'amplitude', label: t('amplitude'), unit: 'mm' },
                            { key: 'staticLinearLoad', label: t('staticLinearLoad'), unit: 'Kg/cm' },
                            { key: 'origin', label: t('origin'), unit: '' }
                          ];
                          
                          // Add gradeability only for SDR machines
                          if (selectedLine === 'sdr' || selectedLine === 'htr') {
                            basicSpecs.splice(6, 0, { key: 'gradeability', label: t('gradeability'), unit: '%' });
                          }
                          
                          // Add LTR-specific fields
                          if (selectedLine === 'ltr') {
                            basicSpecs.push(
                              { key: 'compactionSystem', label: 'Sistema de compactación', unit: '' },
                              { key: 'waterTankCapacity', label: 'Capacidad tanque agua (L)', unit: '' }
                            );
                          }

                          // Add HTR-specific fields
                          if (selectedLine === 'htr') {
                            basicSpecs.push(
                              { key: 'compactionAssistant', label: 'Asistente de compactación', unit: '' },
                              { key: 'asphaltManager', label: 'BOMAG ASPHALT MANAGER', unit: '' },
                              { key: 'telemetry', label: 'Telemetría', unit: '' },
                              { key: 'innovations', label: 'Tecnologías Innovadoras', unit: '' },
                              { key: 'vibrationSystems', label: 'Sistemas de vibración / Notas', unit: '' },
                              { key: 'maintenanceJoint', label: 'Junta de articulación libre de mantenimiento', unit: '' },
                            );
                          }

                          // Add SDR-specific fields from CSV-derived data
                          if (selectedLine === 'sdr') {
                            basicSpecs.push(
                              { key: 'compactionAssistant', label: 'Asistente de compactación', unit: '' },
                              { key: 'telemetry', label: 'Telemetría', unit: '' },
                              { key: 'innovations', label: 'Tecnologías Innovadoras', unit: '' },
                            );
                          }
                          
                          return basicSpecs;
                        })().map((spec) => (
                          <tr key={spec.key} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {spec.label}
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const value: any = machine[spec.key as keyof typeof machine];
                              const isObj = typeof value === 'object' && value !== null;
                              const strVal = !isObj ? String(value ?? '-') : '';
                              const isLong = !isObj && (strVal.includes('\n') || strVal.length > 40);
                              const cellAlign = isObj || isLong ? 'text-left' : 'text-center';
                              return (
                                <td key={index} className={`border border-gray-300 p-2 ${cellAlign}`}>
                                  {spec.key === 'weight' ? (
                                    (machine.weight as number).toLocaleString()
                                  ) : isObj ? (
                                    <div className="whitespace-pre-line">
                                      {formatMultiline(value[language] || '-')}
                                    </div>
                                  ) : (
                                    <div className={isLong ? 'whitespace-pre-line' : ''}>
                                      {formatMultiline(strVal || '-')}
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>


                              {/* Performance Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Rendimiento</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left font-semibold">Rendimiento</th>
                          {getSelectedMachineData().map((machine, index) => (
                            <th key={index} className="border border-gray-300 p-2 text-center">
                              <div className="text-sm font-bold">{machine.brand}</div>
                              <div className="text-xs">{machine.model}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Max Compaction Depth (SDR only) */}
                        {selectedLine === 'sdr' && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t('maxCompactionDepth')}
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center">
                                {machine.maxCompactionDepth || '-'}
                              </td>
                            ))}
                          </tr>
                        )}
                        
                        {/* Editable Compaction Performance (SDR only) */}
                        {selectedLine === 'sdr' && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t('compactionPerformance')}
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const machineId = getMachineId(machine);
                              const originalPerf = parseCompactionPerformance(machine.compactionPerformance || '');
                              const editedPerf = editableCompactionPerformance[machineId];
                              const currentPerf = editedPerf !== undefined ? editedPerf : originalPerf;
                              
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center">
                                  <div className="flex justify-center">
                                    <Input
                                      type="number"
                                      className="w-20 h-8 text-center text-sm"
                                      value={currentPerf || ''}
                                      onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        setEditableCompactionPerformance(prev => ({
                                          ...prev,
                                          [machineId]: isNaN(value) ? originalPerf : value
                                        }));
                                      }}
                                      placeholder={originalPerf.toString()}
                                    />
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        )}
                        
                        {/* Work Efficiency */}
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                            Eficiencia de obra (%) <span className="text-xs text-gray-500">(0-100%)</span>
                          </td>
                          {getSelectedMachineData().map((machine, index) => (
                            <td key={index} className="border border-gray-300 p-2 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Input
                                  type="number"
                                  className="w-20 h-8 text-center text-sm"
                                  value={workEfficiency}
                                  onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    const newValue = isNaN(value) ? 100 : Math.max(0, Math.min(100, value)); // Limit between 0-100%
                                    setWorkEfficiency(newValue);
                                    if (typeof window !== 'undefined') {
                                      localStorage.setItem('workEfficiency', String(newValue));
                                    }
                                  }}
                                  placeholder="100"
                                  min="0"
                                  max="100"
                                />
                                <span className="text-xs text-gray-500">%</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        
                        {/* Fuel Consumption */}
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                            {t('fuelConsumption')} <span className="text-red-500">*</span>
                          </td>
                          {getSelectedMachineData().map((machine, index) => {
                            const machineId = getMachineId(machine);
                            const originalFuel = machine.fuelConsumption || 0;
                            const editedFuel = editableFuelConsumption[machineId];
                            const currentFuel = editedFuel !== undefined ? editedFuel : originalFuel;
                            
                            return (
                              <td key={index} className="border border-gray-300 p-2 text-center">
                                <div className="flex justify-center">
                                  <Input
                                    type="number"
                                    className="w-20 h-8 text-center text-sm"
                                    value={currentFuel || ''}
                                    onChange={(e) => {
                                      const value = parseFloat(e.target.value);
                                      setEditableFuelConsumption(prev => ({
                                        ...prev,
                                        [machineId]: isNaN(value) ? originalFuel : value
                                      }));
                                    }}
                                    placeholder={originalFuel.toString()}
                                    min="0"
                                    step="0.1"
                                  />
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Footnote for fuel consumption */}
                  <div className="mt-3 text-xs text-gray-600 italic">
                    <span className="text-red-500">*</span> Los valores sugeridos son tomados de fuentes no oficiales de los fabricantes de los motores. Estos valores corresponden a información encontrada online, considerando una carga de motor del 70%.
                  </div>
                </div>


                {/* USP Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Propuestas de Valor Único (USP)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left font-semibold">USP</th>
                          {getSelectedMachineData().map((machine, index) => (
                            <th key={index} className="border border-gray-300 p-2 text-center">
                              <div className="text-sm font-bold">{machine.brand}</div>
                              <div className="text-xs">{machine.model}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: 'usp1', label: 'USP 1 - Operación' },
                          { key: 'usp2', label: 'USP 2 - Rendimiento' },
                          { key: 'usp3', label: 'USP 3 - Dirección y Articulación' },
                          { key: 'usp4', label: 'USP 4 - Confort y Operación' },
                          { key: 'usp5', label: 'USP 5 - Sistemas/Medición de compactación' },
                          { key: 'usp6', label: 'USP 6 - Mantenimiento' }
                        ].map((spec) => (
                          <tr key={spec.key} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {spec.label}
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-left">
                                {machine[spec.key as keyof MachineSpec] && typeof machine[spec.key as keyof MachineSpec] === 'object' ? (
                                  <div className="whitespace-pre-line">
                                    {formatMultiline((machine[spec.key as keyof MachineSpec] as any)[language] || '-')}
                                  </div>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="mt-4 space-y-8">
                  {/* Performance Calculation Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Cálculo de Rendimiento</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-bomag-light-gray">
                            <th className="border border-gray-300 p-2 text-left font-semibold">Parámetro</th>
                            {getSelectedMachineData().map((machine, index) => (
                              <th key={index} className="border border-gray-300 p-2 text-center min-w-32">
                                <div className="text-sm font-bold">{machine.brand}</div>
                                <div className="text-xs">{machine.model}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Volume input row */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              <div className="flex items-center justify-center gap-2">
                                <span>Volumen (m³)</span>
                                <Input
                                  type="number"
                                  className="h-6 w-20 text-center"
                                  value={surfaceVolumeM3 || ''}
                                  onChange={(e) => {
                                    const v = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                    const val = isNaN(v) ? 0 : v;
                                    setSurfaceVolumeM3(val);
                                    if (typeof window !== 'undefined') {
                                      localStorage.setItem('surfaceVolumeM3', String(val));
                                    }
                                  }}
                                  placeholder="0"
                                />
                              </div>
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                {surfaceVolumeM3 > 0 ? surfaceVolumeM3.toFixed(2) : '-'}
                              </td>
                            ))}
                          </tr>
                          {/* Work efficiency row */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              <div className="flex items-center justify-center gap-2">
                                <span>Eficiencia de trabajo (%)</span>
                                <Input
                                  type="number"
                                  className="h-6 w-16 text-center"
                                  value={workEfficiency}
                                  onChange={(e) => {
                                    const v = e.target.value === '' ? 100 : parseFloat(e.target.value);
                                    const val = isNaN(v) ? 100 : Math.max(0, Math.min(100, v));
                                    setWorkEfficiency(val);
                                    if (typeof window !== 'undefined') {
                                      localStorage.setItem('workEfficiency', String(val));
                                    }
                                  }}
                                  placeholder="100"
                                />
                              </div>
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                {workEfficiency}%
                              </td>
                            ))}
                          </tr>
                          {/* Calculated performance rows based on volume */}
                          {surfaceVolumeM3 > 0 && (
                            <>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                  {t('timeEstimated')}
                                </td>
                                {getSelectedMachineData().map((machine, index) => {
                                  const effectivePerf = getEffectiveCompactionPerformance(machine);
                                  const hours = effectivePerf > 0 ? surfaceVolumeM3 / effectivePerf : 0;
                                  return (
                                    <td key={index} className="border border-gray-300 p-2 text-center font-semibold">
                                      {hours > 0 ? hours.toFixed(2) : '-'}
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                  {t('costBasedOnEstimatedTime')}
                                </td>
                                {getSelectedMachineData().map((machine, index) => {
                                  const effectivePerf = getEffectiveCompactionPerformance(machine);
                                  const hours = effectivePerf > 0 ? surfaceVolumeM3 / effectivePerf : 0;
                                  // Cost/hour approximation using fuel + maint only (no operator): fuelConsumption*fuelPrice + pm + cm
                                  const pm = getEffectivePreventiveMaintenance(machine);
                                  const cm = getEffectiveCorrectiveMaintenance(machine);
                                  const fuel = getEffectiveFuelConsumption(machine);
                                  const costPerHour = fuel * fuelPrice + pm + cm;
                                  const totalCost = hours * costPerHour;
                                  return (
                                    <td key={index} className="border border-gray-300 p-2 text-center font-bold bg-yellow-50">
                                      {hours > 0 ? formatCurrency(totalCost) : '-'}
                                    </td>
                                  );
                                })}
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Costs Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Costos</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left font-semibold">Costos</th>
                            {getSelectedMachineData().map((machine, index) => (
                              <th key={index} className="border border-gray-300 p-2 text-center">
                                <div className="text-sm font-bold">{machine.brand}</div>
                                <div className="text-xs">{machine.model}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Price Row - Editable */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t('price')}
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const machineId = getMachineId(machine);
                              const effectivePrice = getEffectivePrice(machine);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium bg-yellow-50">
                                  <div className="flex justify-center">
                                    <Input
                                      type="number"
                                      className="border rounded px-2 py-1 w-24 text-center bg-yellow-50"
                                      value={effectivePrice}
                                      onChange={e => {
                                        const value = parseFloat(e.target.value);
                                        setEditablePrice(prev => ({ ...prev, [machineId]: isNaN(value) ? 0 : value }));
                                      }}
                                    />
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          {/* Preventive Maintenance Row - Editable */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t('preventiveMaintenance')}
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const machineId = getMachineId(machine);
                              const effectiveMaintenance = getEffectivePreventiveMaintenance(machine);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium bg-yellow-50">
                                  <div className="flex justify-center">
                                    <Input
                                      type="number"
                                      className="border rounded px-2 py-1 w-20 text-center bg-yellow-50"
                                      value={effectiveMaintenance}
                                      onChange={e => {
                                        const value = parseFloat(e.target.value);
                                        setEditablePreventiveMaintenance(prev => ({ ...prev, [machineId]: isNaN(value) ? 0 : value }));
                                      }}
                                    />
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          {/* Corrective Maintenance Row - Editable */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t('correctiveMaintenance')}
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const machineId = getMachineId(machine);
                              const effectiveMaintenance = getEffectiveCorrectiveMaintenance(machine);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium bg-yellow-50">
                                  <div className="flex justify-center">
                                    <Input
                                      type="number"
                                      className="border rounded px-2 py-1 w-20 text-center bg-yellow-50"
                                      value={effectiveMaintenance}
                                      onChange={e => {
                                        const value = parseFloat(e.target.value);
                                        setEditableCorrectiveMaintenance(prev => ({ ...prev, [machineId]: isNaN(value) ? 0 : value }));
                                      }}
                                    />
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          {/* Fuel Price Row */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              <div className="flex items-center justify-center gap-2">
                                <span>Diesel (USD/L)</span>
                                <Input
                                  type="number"
                                  className="h-6 w-20 text-center"
                                  value={fuelPrice}
                                  onChange={(e) => {
                                    const v = e.target.value === '' ? 1.2 : parseFloat(e.target.value);
                                    const val = isNaN(v) ? 1.2 : v;
                                    setFuelPrice(val);
                                    if (typeof window !== 'undefined') {
                                      localStorage.setItem('fuelPriceUSD', String(val));
                                    }
                                  }}
                                  placeholder="1.2"
                                />
                              </div>
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                ${fuelPrice.toFixed(2)}
                              </td>
                            ))}
                          </tr>
                          {/* Fuel Cost Calculation Row */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                              Costo de combustible
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const fuelConsumption = machine.fuelConsumption ?? 0;
                              const usageTime = machine.usageTime ?? 0;
                              const fuelCost = fuelConsumption * usageTime * fuelPrice;
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                  {formatCurrency(fuelCost)}
                                </td>
                              );
                            })}
                          </tr>
                          {/* TCO Row */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                              {t('tco')}
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const price = getEffectivePrice(machine);
                              const fuelConsumption = getEffectiveFuelConsumption(machine);
                              const usageTime = machine.usageTime ?? 0;
                              const preventiveMaintenance = getEffectivePreventiveMaintenance(machine);
                              const correctiveMaintenance = getEffectiveCorrectiveMaintenance(machine);
                              const fuelCost = fuelConsumption * usageTime * fuelPrice;
                              const maintenanceCost = usageTime * (preventiveMaintenance + correctiveMaintenance);
                              const tco = price + fuelCost + maintenanceCost;
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-bold bg-yellow-50">
                                  {formatCurrency(tco)}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* TCO Timeline Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">TCO Progresivo</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-bomag-light-gray">
                            <th className="border border-gray-300 p-2 text-left">Horas</th>
                            {getSelectedMachineData().map((machine, index) => (
                              <th key={index} className="border border-gray-300 p-2 text-center min-w-32">
                                <div className="text-sm font-bold">{machine.brand}</div>
                                <div className="text-xs">{machine.model}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                      <tbody>
                        {[0, 1000, 1500, 2000, 2500, 3000].map(hours => {
                          // Gather all TCOs for this row
                          const tcos = getSelectedMachineData().map((machine, index) => {
                            const machineId = getMachineId(machine);
                            const tco0 = editableTCO[machineId] !== undefined
                              ? editableTCO[machineId]
                              : machine.tcoTimeline?.find(e => e.hours === 0)?.tco ?? 0;
                            let tco = tco0;
                            if (hours > 0) {
                              tco = tco0
                                + hours * (machine.fuelConsumption ?? 0) * fuelPrice
                                + hours * (machine.preventiveMaintenance ?? 0)
                                + hours * (machine.correctiveMaintenance ?? 0);
                            }
                            return tco;
                          });
                          const min = Math.min(...tcos);
                          const max = Math.max(...tcos);
                          return (
                            <tr key={hours} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2 font-medium bg-gray-50">{hours}</td>
                              {getSelectedMachineData().map((machine, index) => {
                                const machineId = getMachineId(machine);
                                const tco0 = editableTCO[machineId] !== undefined
                                  ? editableTCO[machineId]
                                  : machine.tcoTimeline?.find(e => e.hours === 0)?.tco ?? 0;
                                let tco = tco0;
                                if (hours > 0) {
                                  tco = tco0
                                    + hours * (machine.fuelConsumption ?? 0) * fuelPrice
                                    + hours * (machine.preventiveMaintenance ?? 0)
                                    + hours * (machine.correctiveMaintenance ?? 0);
                                }
                                return (
                                  <td key={index} className="border border-gray-300 p-2 text-center">
                                    {hours === 0 ? (
                                      <input
                                        type="number"
                                        className="border rounded px-2 py-1 w-24 text-right"
                                        value={tco0}
                                        onChange={e => {
                                          const value = parseFloat(e.target.value);
                                          setEditableTCO(prev => ({ ...prev, [machineId]: isNaN(value) ? 0 : value }));
                                        }}
                                      />
                                    ) : (
                                      <div>
                                        <div style={{ background: getPriceColor(tco, min, max), borderRadius: 4, padding: '2px 4px', display: 'inline-block' }}>
                                          TCO: {formatCurrency(tco)}
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  </div>
                </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MachineComparison;
