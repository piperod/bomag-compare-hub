import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { sdrMachines, ltrMachines, MachineSpec } from '@/data/machineData';
import { millingMachines, MillingMachineSpec, bm100020PreventiveMaintenance } from '@/data/millingData';
import { paversMachines, PaverMachineSpec } from '@/data/paversData';
import { CompareTable } from '@/components/CompareTable';
import { BomagAdvantageBadge } from '@/components/BomagAdvantageBadge';
import { paverHasCompetitiveAdvantage } from '@/utils/paverCompetitiveAdvantage';
import { pickLocalized, pickLocalizedWithFallback } from '@/utils/localizedText';
import { localizePaverText } from '@/utils/paverSpecText';
import { localizeMillingText } from '@/utils/millingSpecText';
import { interpolatePerformance, SoilType } from '@/data/correctedPerformanceData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getMachineImagePath } from '@/utils/machineImages';
import { ComparableMachine, getMachineFinancialDefaults } from '@/utils/financialFields';
import {
  getMillingJobHours,
  getMillingProductivityDefaults,
  getMillingWearMultiplier,
  getPaverCo2PerShiftKg,
  getPaverFuelMultiplier,
  getPaverSetupHeatingCost,
  getPaverUspDefaults,
  getPaverWearCostPerHour,
  PAVER_COMPETITOR_SETUP_FUEL_L,
} from '@/utils/productLineFinancial';
import ArticulationJointCostAnalysis from '@/components/ArticulationJointCostAnalysis';

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
  editableRemainingValue: { [key: string]: number };
  setEditableRemainingValue: (value: { [key: string]: number } | ((prev: { [key: string]: number }) => { [key: string]: number })) => void;
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
      pt: 'BOMAG ECONOMIZER\nSistema visual que permite que os operadores meçam o progresso da compactação em tempo real. Utiliza uma escala de LED na cabine para mostrar o nível de compactação alcançado, ajudando a evitar sobre ou subcompactação.'
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
const getImagePath = getMachineImagePath;

function CardSpecRow({
  label,
  value,
  tall = false,
}: {
  label: string;
  value: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start gap-x-2 border-b border-gray-100 px-0.5 last:border-b-0 ${
        tall ? 'min-h-[4.75rem] py-2' : 'min-h-[3rem] py-1.5'
      }`}
    >
      <span className="text-sm leading-snug text-gray-600 font-semibold">{label}</span>
      <span className="text-sm leading-snug font-medium text-right whitespace-pre-line">{value}</span>
    </div>
  );
}

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
const getMachineId = (machine: MachineSpec | MillingMachineSpec | PaverMachineSpec) => {
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
  return `${normalize(machine.brand)}__${normalize(machine.model)}__${normalize((machine as any).engine ?? '')}`;
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
  setEditableCorrectiveMaintenance,
  editableRemainingValue,
  setEditableRemainingValue
}: MachineComparisonProps) => {
  const { t, language, locale } = useLanguage();
  const paverText = (value: string) => localizePaverText(value, language);
  const millingText = (value: string) => localizeMillingText(value, language);
  const {
    currency,
    isZeroDecimal,
    formatFromUsd,
    formatFuelPerLiterFromUsd,
    usdToInputNumber,
    inputNumberToUsd,
  } = useCurrency();
  const ccy = { currency };
  const showFinancialTab = true;
  const isCompactionLine = selectedLine === 'sdr' || selectedLine === 'ltr' || selectedLine === 'htr';
  const uspRowsList: Array<{ key: string; labelKey: string }> = selectedLine === 'milling'
    ? ((locale.millingUspRows as Array<{ key: string; labelKey: string }> | undefined) ?? [
        { key: 'usp1', labelKey: 'millingUsp1' }, { key: 'usp2', labelKey: 'millingUsp2' }, { key: 'usp3', labelKey: 'millingUsp3' }, { key: 'usp4', labelKey: 'millingUsp4' }
      ])
    : selectedLine === 'pavers'
    ? ((locale.paverUspRows as Array<{ key: string; labelKey: string }> | undefined) ?? [])
    : ((locale.uspRows as Array<{ key: string; labelKey: string }> | undefined) ?? [
        { key: 'usp1', labelKey: 'usp1' }, { key: 'usp2', labelKey: 'usp2' }, { key: 'usp3', labelKey: 'uspTable3' }, { key: 'usp4', labelKey: 'uspTable4' }, { key: 'usp5', labelKey: 'uspTable5' }, { key: 'usp6', labelKey: 'uspTable6' }
      ]);
  // Modal state for volume calculator
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [lengthM, setLengthM] = useState<number>(0);
  const [widthM, setWidthM] = useState<number>(0);
  const [heightM, setHeightM] = useState<number>(0);
  // Volume calculator modal state
  const [isVolumeCalcOpen, setIsVolumeCalcOpen] = useState(false);
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

  // Operation time state (hours)
  const [operationTime, setOperationTime] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('operationTimeHours');
      const num = saved ? parseFloat(saved) : 3000;
      return isNaN(num) ? 3000 : num;
    }
    return 3000;
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

  // Soil type for performance calculation
  const [selectedSoilType, setSelectedSoilType] = useState<SoilType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedSoilType');
      return (saved as SoilType) || 'mixedSoil';
    }
    return 'mixedSoil';
  });

  // BOMAG technology multiplier state (Economizer/Terrameter)
  const [bomagTechEnabled, setBomagTechEnabled] = useState<{ [key: string]: boolean }>({});

  // Maintenance-free articulation joint USP selection (SDR only)
  const [articulationJointUSPEnabled, setArticulationJointUSPEnabled] = useState<{ [key: string]: boolean }>({});
  const [showArticulationVariables, setShowArticulationVariables] = useState<boolean>(false);

  // Milling USP state (productivity, BMS15L)
  const [millingVolumeM3, setMillingVolumeM3] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('millingVolumeM3');
      const num = saved ? parseFloat(saved) : 0;
      return Number.isNaN(num) ? 0 : num;
    }
    return 0;
  });
  const [editableTransportCapacity, setEditableTransportCapacity] = useState<{ [key: string]: number }>({});
  const [bms15lEnabled, setBms15lEnabled] = useState<{ [key: string]: boolean }>({});
  const [editableToolWearCost, setEditableToolWearCost] = useState<{ [key: string]: number }>({});

  // Paver USP state (MAGMALIFE, ECOMODE, setup heating)
  const [ecomodeEnabled, setEcomodeEnabled] = useState<{ [key: string]: boolean }>({});
  const [magmalifeEnabled, setMagmalifeEnabled] = useState<{ [key: string]: boolean }>({});
  const [editableSetupFuel, setEditableSetupFuel] = useState<{ [key: string]: number }>({});

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

  const machines = selectedLine === 'sdr' ? sdrMachines : selectedLine === 'ltr' ? ltrMachines : selectedLine === 'htr' ? htrMachines : selectedLine === 'milling' ? millingMachines : selectedLine === 'pavers' ? paversMachines : [];
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
    setArticulationJointUSPEnabled({});
    setShowArticulationVariables(false);
  }, [selectedLine]);

  // Initialize articulation joint USP defaults for selected models
  useEffect(() => {
    if (selectedLine !== 'sdr') return;
    setArticulationJointUSPEnabled((prev) => {
      const next = { ...prev };
      const selectedSet = new Set(selectedMachines);
      Object.keys(next).forEach((id) => {
        if (!selectedSet.has(id)) delete next[id];
      });

      selectedSet.forEach((id) => {
        if (next[id] === undefined) {
          const machine = machinesSorted.find((m) => getMachineId(m) === id);
          next[id] = machine?.brand === 'BOMAG';
        }
      });
      return next;
    });
  }, [selectedMachines, selectedLine, machinesSorted]);

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

  // Listen for volume, fuel price, and operation time changes from localStorage
  useEffect(() => {
    const handler = () => {
      const savedVolume = localStorage.getItem('surfaceVolumeM3');
      const numVolume = savedVolume ? parseFloat(savedVolume) : 0;
      setSurfaceVolumeM3(isNaN(numVolume) ? 0 : numVolume);
      
      const savedFuel = localStorage.getItem('fuelPriceUSD');
      const numFuel = savedFuel ? parseFloat(savedFuel) : 1.2;
      setFuelPrice(isNaN(numFuel) ? 1.2 : numFuel);

      const savedOperationTime = localStorage.getItem('operationTimeHours');
      const numOperationTime = savedOperationTime ? parseFloat(savedOperationTime) : 3000;
      setOperationTime(isNaN(numOperationTime) ? 3000 : numOperationTime);
    };
    handler();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Persist soil type selection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSoilType', selectedSoilType);
    }
  }, [selectedSoilType]);

  // Reset compaction performance when soil type changes to show new interpolated values
  useEffect(() => {
    setEditableCompactionPerformance({});
  }, [selectedSoilType]);

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

  // Get effective compaction performance (original or edited) - without work efficiency applied
  const getEffectiveCompactionPerformance = (machine: MachineSpec) => {
    const machineId = getMachineId(machine);
    const editedPerf = editableCompactionPerformance[machineId];
    
    let basePerformance: number;
    
    // If user has manually edited the performance, use that
    if (editedPerf !== undefined) {
      basePerformance = editedPerf;
    } else {
      // Otherwise, use corrected interpolation based on machine weight
      const weightInTons = machine.weight / 1000; // Convert kg to tons
      
      // Use selected soil type for machine performance calculation
      const interpolatedPerf = interpolatePerformance(weightInTons, selectedSoilType);
      
      if (interpolatedPerf !== null) {
        basePerformance = interpolatedPerf;
      } else {
        // Fallback to original parsing if interpolation fails
        basePerformance = parseCompactionPerformance(machine.compactionPerformance || '');
      }
    }
    
    // Apply BOMAG technology multiplier if enabled
    const isBomag = machine.brand === 'BOMAG';
    const techEnabled = bomagTechEnabled[machineId] || false;
    const multiplier = isBomag && techEnabled ? 1.25 : 1.0;
    
    return basePerformance * multiplier;
  };

  const isMillingMachine = (machine: ComparableMachine): machine is MillingMachineSpec =>
    'millingWidth' in machine;

  const isPaverMachine = (machine: ComparableMachine): machine is PaverMachineSpec =>
    'financial' in machine && 'maxProduction' in machine;

  // Get effective fuel consumption (original or edited, with product-line USP multipliers)
  const getEffectiveFuelConsumption = (machine: ComparableMachine) => {
    const machineId = getMachineId(machine);
    const originalFuel = getMachineFinancialDefaults(machine).fuelConsumption;
    const editedFuel = editableFuelConsumption[machineId];
    let fuel = editedFuel !== undefined ? editedFuel : originalFuel;
    if (selectedLine === 'pavers' && isPaverMachine(machine)) {
      const ecomode = ecomodeEnabled[machineId] ?? getPaverUspDefaults(machine).hasEcomode;
      fuel *= getPaverFuelMultiplier(machine, ecomode);
    }
    return fuel;
  };

  // Get effective price (original or edited)
  const getEffectivePrice = (machine: ComparableMachine) => {
    const machineId = getMachineId(machine);
    const originalPrice = getMachineFinancialDefaults(machine).price;
    const editedPrice = editablePrice[machineId];
    return editedPrice !== undefined ? editedPrice : originalPrice;
  };

  // Get effective preventive maintenance (original or edited, with USP adjustments)
  const getEffectivePreventiveMaintenance = (machine: ComparableMachine) => {
    const machineId = getMachineId(machine);
    const editedMaintenance = editablePreventiveMaintenance[machineId];
    if (selectedLine === 'pavers' && isPaverMachine(machine)) {
      const magmalife = magmalifeEnabled[machineId] ?? getPaverUspDefaults(machine).hasMagmalife;
      return getPaverWearCostPerHour(machine, magmalife, editedMaintenance);
    }
    const originalMaintenance = getMachineFinancialDefaults(machine).preventiveMaintenance;
    const base = editedMaintenance !== undefined ? editedMaintenance : originalMaintenance;
    if (selectedLine === 'milling' && isMillingMachine(machine)) {
      const bms15l = bms15lEnabled[machineId] ?? getMillingProductivityDefaults(machine).hasBms15l;
      return base * getMillingWearMultiplier(machine, bms15l);
    }
    return base;
  };

  // Get effective corrective maintenance (original or edited)
  const getEffectiveCorrectiveMaintenance = (machine: ComparableMachine) => {
    const machineId = getMachineId(machine);
    const originalMaintenance = getMachineFinancialDefaults(machine).correctiveMaintenance;
    const editedMaintenance = editableCorrectiveMaintenance[machineId];
    const base = editedMaintenance !== undefined ? editedMaintenance : originalMaintenance;
    if (selectedLine === 'milling' && isMillingMachine(machine)) {
      const bms15l = bms15lEnabled[machineId] ?? getMillingProductivityDefaults(machine).hasBms15l;
      return base * getMillingWearMultiplier(machine, bms15l);
    }
    return base;
  };

  // Estimated resale / residual value — single user-entered amount (USD), deducted from TCO
  const getEffectiveRemainingValue = (machine: ComparableMachine) => {
    const machineId = getMachineId(machine);
    return editableRemainingValue[machineId] ?? 0;
  };

  // Articulation joint greasing cost for a machine over `hours` of operation.
  // Returns 0 if the machine has the maintenance-free joint USP enabled.
  const getArticulationJointCost = (machine: ComparableMachine, hours: number): number => {
    if (selectedLine !== 'sdr') return 0;
    const machineId = getMachineId(machine);
    const hasFreeJoint = articulationJointUSPEnabled[machineId] ?? (machine.brand === 'BOMAG');
    if (hasFreeJoint) return 0;
    const ajTech = parseFloat(localStorage.getItem('aj_technicianRate') || '35') || 35;
    const ajIdle = parseFloat(localStorage.getItem('aj_machineIdleRate') || '120') || 120;
    const ajGrease = parseFloat(localStorage.getItem('aj_greaseCostPerIntervention') || '15') || 15;
    const interventions = hours / 50;
    const unproductiveHours = interventions * 0.5;
    return unproductiveHours * ajTech + interventions * ajGrease + unproductiveHours * ajIdle;
  };

  const getEffectiveTransportCapacity = (machine: MillingMachineSpec) => {
    const machineId = getMachineId(machine);
    const edited = editableTransportCapacity[machineId];
    if (edited !== undefined) return edited;
    return getMillingProductivityDefaults(machine).transportCapacityM3h;
  };

  const getEffectiveToolWearCost = (machine: MillingMachineSpec) => {
    const machineId = getMachineId(machine);
    const edited = editableToolWearCost[machineId];
    if (edited !== undefined) return edited;
    return getMillingProductivityDefaults(machine).toolWearCostPerHour;
  };

  const getEffectiveSetupFuel = (machine: PaverMachineSpec) => {
    const machineId = getMachineId(machine);
    const edited = editableSetupFuel[machineId];
    if (edited !== undefined) return edited;
    const defaults = getPaverUspDefaults(machine);
    const magmalife = magmalifeEnabled[machineId] ?? defaults.hasMagmalife;
    if (magmalife && defaults.hasMagmalife) return defaults.setupFuelLiters;
    return PAVER_COMPETITOR_SETUP_FUEL_L;
  };

  const computeTcoComponents = (machine: ComparableMachine, hours: number) => {
    const machineId = getMachineId(machine);
    const price = getEffectivePrice(machine);
    const remainingValue = getEffectiveRemainingValue(machine);
    const fuel = getEffectiveFuelConsumption(machine);
    const preventive = getEffectivePreventiveMaintenance(machine);
    const corrective = getEffectiveCorrectiveMaintenance(machine);
    let toolWearCost = 0;
    let setupHeatingCost = 0;
    const jointCost = getArticulationJointCost(machine, hours);

    if (selectedLine === 'milling' && isMillingMachine(machine)) {
      const bms15l = bms15lEnabled[machineId] ?? getMillingProductivityDefaults(machine).hasBms15l;
      const wearMult = getMillingWearMultiplier(machine, bms15l);
      const toolRate = getEffectiveToolWearCost(machine) * wearMult;
      toolWearCost = toolRate * hours;
    }

    if (selectedLine === 'pavers' && isPaverMachine(machine)) {
      setupHeatingCost = getPaverSetupHeatingCost(hours, getEffectiveSetupFuel(machine), fuelPrice);
    }

    const fuelCost = fuel * hours * fuelPrice;
    const maintenanceCost = hours * (preventive + corrective);
    const tco = price + fuelCost + maintenanceCost + jointCost + toolWearCost + setupHeatingCost - remainingValue;

    return {
      price,
      fuel,
      fuelCost,
      preventive,
      corrective,
      maintenanceCost,
      toolWearCost,
      setupHeatingCost,
      jointCost,
      tco,
      remainingValue,
    };
  };

  const getSelectedMachineData = () => {
    return machinesSorted.filter((machine) => {
      const machineId = getMachineId(machine);
      return selectedMachines.includes(machineId);
    });
  };

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
      'WACKER NEUSON': 'bg-red-600',
      'Vögele': 'bg-indigo-600',
      'Dynapac': 'bg-yellow-500',
      'Caterpillar': 'bg-yellow-400'
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
    return pickLocalizedWithFallback(obj, language);
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

  const selectedMachineData = getSelectedMachineData();
  const compareSpecCols = 1 + selectedMachineData.length;
  const compareCostCols = 2 + selectedMachineData.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-bomag-gray">
          {selectedLine.toUpperCase()} - {t('detailComparison')}
        </h3>
        <div className="text-sm text-gray-600">
          {selectedMachines.length} {t('machinesSelectedToCompare')}
        </div>
        <div className="flex items-center gap-2"></div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder={t('searchMachinesPlaceholder')}
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
          <span>{t('onlySelectedMachines')}</span>
        </div>
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-600">
            {t('showingMatches', { count: machinesSorted.length, term: searchTerm })}
          </div>
        )}
      </div>

      {/* Machine Selection Grid */}
      {machinesSorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 items-stretch">
          {machinesSorted.map((machine, index) => (
          <Card
            key={index}
            className={`relative flex h-full flex-col ${selectedMachines.includes(getMachineId(machine)) ? 'border-2 border-yellow-400' : ''}`}
          >
            <CardHeader className="pb-2">
              <div className="flex flex-col items-center justify-between">
                <img src={getImagePath(machine.model, selectedLine)} alt={machine.model} className="w-full h-32 object-contain mb-2" />
                {selectedMachines.includes(getMachineId(machine)) && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-bomag-yellow text-black border border-black/10">{t('selected')}</Badge>
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
                    {t('material')}: {(machine as any).materialNumber}
                  </div>
                )}
              </div>
              <CardTitle className="text-xl font-semibold">{machine.model}</CardTitle>
            </CardHeader>
            <CardContent className="mt-auto flex flex-1 flex-col pt-0">
              <div className="mt-auto">
                {selectedLine === 'milling' ? (
                  <>
                    <CardSpecRow label={t('millingWidth')} value={(machine as MillingMachineSpec).millingWidth} />
                    <CardSpecRow label={t('maxDepth')} value={(machine as MillingMachineSpec).maxDepth} />
                    <CardSpecRow label={t('enginePower')} value={formatMultiline((machine as MillingMachineSpec).enginePower)} />
                    <CardSpecRow label={t('operatingWeight')} value={millingText((machine as MillingMachineSpec).operatingWeight)} tall />
                  </>
                ) : selectedLine === 'pavers' ? (
                  <>
                    <CardSpecRow label={t('paverCardNominalPower')} value={formatMultiline((machine as PaverMachineSpec).nominalPower)} />
                    <CardSpecRow label={t('paverCardMaxProduction')} value={paverText((machine as PaverMachineSpec).maxProduction)} />
                    <CardSpecRow label={t('paverCardOperatingWeight')} value={formatMultiline(paverText((machine as PaverMachineSpec).operatingWeight))} tall />
                    <CardSpecRow label={t('paverCardMinWorkingWidth')} value={paverText((machine as PaverMachineSpec).minWorkingWidth)} />
                  </>
                ) : (
                  <>
                    <CardSpecRow label={t('weight')} value={`${(machine as MachineSpec).weight.toLocaleString()} kg`} />
                    <CardSpecRow label={t('power')} value={`${(machine as MachineSpec).power} HP`} />
                    <CardSpecRow label={t('compactionWidth')} value={`${(machine as MachineSpec).compactionWidth} m`} />
                    <CardSpecRow label={t('amplitude')} value={formatMultiline(String((machine as MachineSpec).amplitude || '-'))} />
                    <CardSpecRow
                      label={t('telemetry')}
                      value={
                        typeof (machine as any).telemetry === 'object'
                          ? formatMultiline(pickLocalizedWithFallback((machine as any).telemetry, language) || '-')
                          : formatMultiline(String((machine as any).telemetry || '-'))
                      }
                      tall
                    />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">{t('noMachinesFound')}</div>
          <div className="text-gray-400 text-sm">
            {searchTerm ? t('noMachinesMatching', { term: searchTerm }) : t('noMachinesAvailable')}
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-bomag-blue hover:text-bomag-orange underline"
            >
              {t('clearSearch')}
            </button>
          )}
        </div>
      )}

      {/* Comparison Table */}
      {selectedMachines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('compare')} - {selectedMachines.length} {t('machines')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className={`grid w-full ${showFinancialTab ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <TabsTrigger value="specs">{t('specifications')}</TabsTrigger>
                {showFinancialTab && (
                  <TabsTrigger value="financial">{t('financialAnalysis')}</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="specs" className="mt-4 space-y-8">
                {/* Basic Specifications Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('basicSpecifications')}</h4>
                  {selectedLine === 'pavers' ? (
                    <>
                    {(locale.paverSpecSections ?? []).map((section, sIdx) => (
                      <div key={sIdx} className={sIdx > 0 ? 'mt-6' : ''}>
                        <h5 className="text-md font-semibold text-gray-600 mb-3">{t(section.titleKey)}</h5>
                        <div className="overflow-x-auto">
                          <CompareTable columnCount={compareSpecCols}>
                            <thead>
                              <tr className="bg-bomag-light-gray">
                                <th className="border border-gray-300 p-2 text-left font-semibold">{t('specification')}</th>
                                {getSelectedMachineData().map((machine, index) => (
                                  <th key={index} className="border border-gray-300 p-2 text-center">
                                    <div className="text-sm font-bold">{machine.brand}</div>
                                    <div className="text-xs">{machine.model}</div>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.rows.map((spec) => (
                                <tr key={spec.key} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 p-2 font-semibold bg-gray-50">{t(spec.labelKey)}</td>
                                  {selectedMachineData.map((machine, index) => {
                                    const value = (machine as PaverMachineSpec)[spec.key as keyof PaverMachineSpec];
                                    const strVal = paverText(String(value ?? '-'));
                                    const showAdvantage = paverHasCompetitiveAdvantage(
                                      spec.key,
                                      machine as PaverMachineSpec,
                                      selectedMachineData as PaverMachineSpec[]
                                    );
                                    return (
                                      <td key={index} className="border border-gray-300 p-2">
                                        <div className="flex items-center justify-center gap-1 whitespace-pre-line">
                                          <span>{formatMultiline(strVal)}</span>
                                          {showAdvantage && (
                                            <BomagAdvantageBadge title={t('bomagCompetitiveAdvantage')} />
                                          )}
                                        </div>
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </CompareTable>
                        </div>
                      </div>
                    ))}
                    <p className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-600">
                      <BomagAdvantageBadge title={t('bomagCompetitiveAdvantage')} />
                      <span>{t('bomagAdvantageLegend')}</span>
                    </p>
                    </>
                  ) : (
                  <div className="overflow-x-auto">
                    <CompareTable columnCount={compareSpecCols}>
                      <thead>
                        <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left font-semibold">{t('specification')}</th>
                          {getSelectedMachineData().map((machine, index) => (
                            <th key={index} className="border border-gray-300 p-2 text-center">
                              <div className="text-sm font-bold">{machine.brand}</div>
                              <div className="text-xs">{machine.model}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          if (selectedLine === 'milling') {
                            const rows = (locale.basicSpecificationRowsMilling ?? []) as Array<{ key: string; labelKey: string }>;
                            return rows.map(r => ({ key: r.key, label: t(r.labelKey), unit: '' }));
                          }
                          const commonRows = (locale.basicSpecificationRowsCommon ?? ['weight', 'engine', 'compactionWidth', 'power', 'amplitude', 'staticLinearLoad', 'origin']) as string[];
                          const getLabel = (key: string) => {
                            if (key === 'waterTankCapacity') return `${t('waterTankCapacity')} (L)`;
                            if (key === 'asphaltManager') return t('asphaltManagerLabel');
                            return t(key);
                          };
                          const basicSpecs: { key: string; label: string; unit: string }[] = commonRows.map(key => ({ key, label: getLabel(key), unit: key === 'weight' ? 'kg' : key === 'compactionWidth' ? 'm' : key === 'amplitude' ? 'mm' : key === 'staticLinearLoad' ? 'Kg/cm' : key === 'gradeability' ? '%' : '' }));
                          if (selectedLine === 'sdr' || selectedLine === 'htr') {
                            basicSpecs.splice(6, 0, { key: 'gradeability', label: t('gradeability'), unit: '%' });
                          }
                          const lineRows = selectedLine === 'sdr' ? (locale.basicSpecificationRowsSdr ?? []) : selectedLine === 'ltr' ? (locale.basicSpecificationRowsLtr ?? []) : (locale.basicSpecificationRowsHtr ?? []);
                          (lineRows as string[]).forEach(key => basicSpecs.push({ key, label: getLabel(key), unit: key === 'waterTankCapacity' ? 'L' : '' }));
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
                                  {spec.key === 'weight' && typeof (machine as any).weight === 'number' ? (
                                    ((machine as any).weight as number).toLocaleString()
                                  ) : isObj ? (
                                    <div className="whitespace-pre-line">
                                      {(() => {
                                        const localized =
                                          selectedLine === 'milling'
                                            ? millingText(pickLocalizedWithFallback(value, language))
                                            : pickLocalizedWithFallback(value, language);
                                        return localized ? formatMultiline(localized) : '';
                                      })()}
                                    </div>
                                  ) : (
                                    <div className={isLong ? 'whitespace-pre-line' : ''}>
                                      {formatMultiline(
                                        selectedLine === 'milling' ? millingText(strVal || '-') : strVal || '-'
                                      )}
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </CompareTable>
                  </div>
                  )}
                </div>


                {/* USP Section */}
                {uspRowsList.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('uspSectionTitle')}</h4>
                  <div className="overflow-x-auto">
                    <CompareTable columnCount={compareSpecCols}>
                      <thead>
                        <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left font-semibold">{t('usp')}</th>
                          {getSelectedMachineData().map((machine, index) => (
                            <th key={index} className="border border-gray-300 p-2 text-center">
                              <div className="text-sm font-bold">{machine.brand}</div>
                              <div className="text-xs">{machine.model}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {uspRowsList.map((spec) => (
                          <tr key={spec.key} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t(spec.labelKey)}
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-left">
                                {machine[spec.key as keyof MachineSpec] && typeof machine[spec.key as keyof MachineSpec] === 'object' ? (
                                  <div className="whitespace-pre-line">
                                    {formatMultiline(
                                      selectedLine === 'milling'
                                        ? millingText(pickLocalizedWithFallback((machine[spec.key as keyof MachineSpec] as any), language) || '-')
                                        : pickLocalizedWithFallback((machine[spec.key as keyof MachineSpec] as any), language) || '-'
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </CompareTable>
                  </div>
                </div>
                )}

                {/* Preventive maintenance routine and costs (Milling only) */}
                {selectedLine === 'milling' && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">{t('preventiveMaintenanceRoutineAndCosts')}</h4>
                    <div className="mb-4">
                      <h5 className="text-md font-semibold text-gray-600 mb-3">{t('bm100020')}</h5>
                      <div className="overflow-x-auto">
                        <CompareTable columnCount={9}>
                          <thead>
                            <tr className="bg-bomag-light-gray">
                              <th className="border border-gray-300 p-2 text-left font-semibold">{t('pmRevision')}</th>
                              <th className="border border-gray-300 p-2 text-left font-semibold">{t('pmMaintenance')}</th>
                              <th className="border border-gray-300 p-2 text-center font-semibold">{t('pmPeriod')}</th>
                              <th className="border border-gray-300 p-2 text-left font-semibold">{t('pmDescription')}</th>
                              <th className="border border-gray-300 p-2 text-center font-semibold">{t('pmSapCode')}</th>
                              <th className="border border-gray-300 p-2 text-center font-semibold">{t('pmQuantityPerMachine')}</th>
                              <th className="border border-gray-300 p-2 text-center font-semibold">{t('pmUnit')}</th>
                              <th className="border border-gray-300 p-2 text-right font-semibold">{t('pmPublicPrice')}</th>
                              <th className="border border-gray-300 p-2 text-right font-semibold">{t('pmTotalPrice')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bm100020PreventiveMaintenance.map((row, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-left">{row.revision[language] ?? row.revision.en}</td>
                                <td className="border border-gray-300 p-2 text-left">{row.maintenance[language] ?? row.maintenance.en}</td>
                                <td className="border border-gray-300 p-2 text-center">{row.period}</td>
                                <td className="border border-gray-300 p-2 text-left">{row.description[language] ?? row.description.en}</td>
                                <td className="border border-gray-300 p-2 text-center">{row.sapCode}</td>
                                <td className="border border-gray-300 p-2 text-center">{row.quantityPerMachine}</td>
                                <td className="border border-gray-300 p-2 text-center">{row.unit}</td>
                                <td className="border border-gray-300 p-2 text-right">{row.publicPrice != null ? formatFromUsd(row.publicPrice, { minimumFractionDigits: isZeroDecimal ? 0 : 2, maximumFractionDigits: isZeroDecimal ? 0 : 2 }) : '-'}</td>
                                <td className="border border-gray-300 p-2 text-right">{row.totalPrice != null ? formatFromUsd(row.totalPrice, { minimumFractionDigits: isZeroDecimal ? 0 : 2, maximumFractionDigits: isZeroDecimal ? 0 : 2 }) : '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </CompareTable>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {showFinancialTab && (
              <TabsContent value="financial" className="mt-4 space-y-8">
                {selectedLine === 'pavers' && (
                  <>
                    {(locale.paverFinancialFuelRows as Array<{ key: string; labelKey: string }> | undefined)?.length ? (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('paverFinancialFuelSection')}</h4>
                        <div className="overflow-x-auto">
                          <CompareTable columnCount={compareSpecCols}>
                            <thead>
                              <tr className="bg-bomag-light-gray">
                                <th className="border border-gray-300 p-2 text-left font-semibold">{t('specification')}</th>
                                {getSelectedMachineData().map((machine, index) => (
                                  <th key={index} className="border border-gray-300 p-2 text-center">
                                    <div className="text-sm font-bold">{machine.brand}</div>
                                    <div className="text-xs">{machine.model}</div>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(locale.paverFinancialFuelRows as Array<{ key: string; labelKey: string }>).map((row) => (
                                <tr key={row.key} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 p-2 font-semibold bg-gray-50">{t(row.labelKey)}</td>
                                  {getSelectedMachineData().map((machine, index) => {
                                    const value = (machine as PaverMachineSpec).financial?.[row.key as keyof PaverMachineSpec['financial']] ?? '-';
                                    const strVal = paverText(String(value));
                                    return (
                                      <td key={index} className="border border-gray-300 p-2">
                                        <div className="whitespace-pre-line">{formatMultiline(strVal)}</div>
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </CompareTable>
                        </div>
                      </div>
                    ) : null}
                    {(locale.paverFinancialWearRows as Array<{ key: string; labelKey: string }> | undefined)?.length ? (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('paverFinancialWearSection')}</h4>
                        <div className="overflow-x-auto">
                          <CompareTable columnCount={compareSpecCols}>
                            <thead>
                              <tr className="bg-bomag-light-gray">
                                <th className="border border-gray-300 p-2 text-left font-semibold">{t('specification')}</th>
                                {getSelectedMachineData().map((machine, index) => (
                                  <th key={index} className="border border-gray-300 p-2 text-center">
                                    <div className="text-sm font-bold">{machine.brand}</div>
                                    <div className="text-xs">{machine.model}</div>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(locale.paverFinancialWearRows as Array<{ key: string; labelKey: string }>).map((row) => (
                                <tr key={row.key} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 p-2 font-semibold bg-gray-50">{t(row.labelKey)}</td>
                                  {getSelectedMachineData().map((machine, index) => {
                                    const value = (machine as PaverMachineSpec).financial?.[row.key as keyof PaverMachineSpec['financial']] ?? '-';
                                    const strVal = paverText(String(value));
                                    return (
                                      <td key={index} className="border border-gray-300 p-2">
                                        <div className="whitespace-pre-line">{formatMultiline(strVal)}</div>
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </CompareTable>
                        </div>
                      </div>
                    ) : null}
                  </>
                )}

                {isCompactionLine && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('performanceCalculation')}</h4>
                    <div className="overflow-x-auto">
                      <CompareTable columnCount={compareSpecCols}>
                        <thead>
                          <tr className="bg-bomag-light-gray">
                            <th className="border border-gray-300 p-2 text-left font-semibold">{t('parameter')}</th>
                            {getSelectedMachineData().map((machine, index) => (
                              <th key={index} className="border border-gray-300 p-2 text-center">
                                <div className="text-sm font-bold">{machine.brand}</div>
                                <div className="text-xs">{machine.model}</div>
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Soil type selector row */}
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                            <div className="flex items-center justify-center gap-2">
                              <span>{t('soilType')}</span>
                              <select
                                className="h-6 text-xs border rounded px-1"
                                value={selectedSoilType}
                                onChange={(e) => setSelectedSoilType(e.target.value as SoilType)}
                              >
                                <option value="rock">{t('rock')}</option>
                                <option value="gravel">{t('gravel')}</option>
                                <option value="mixedSoil">{t('mixedSoil')}</option>
                                <option value="clay">{t('clay')}</option>
                              </select>
                            </div>
                          </td>
                          {getSelectedMachineData().map((machine, index) => (
                            <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                              {selectedSoilType === 'rock' ? t('rock') : 
                               selectedSoilType === 'gravel' ? t('gravel') :
                               selectedSoilType === 'mixedSoil' ? t('mixedSoil') : t('clay')}
                            </td>
                          ))}
                        </tr>
                        
                        {/* Max Compaction Depth (SDR only) */}
                        {selectedLine === 'sdr' && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t('maxCompactionDepth')} <span className="text-blue-500">**</span>
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                {machine.maxCompactionDepth || '-'}
                              </td>
                            ))}
                          </tr>
                        )}
                        
                        {/* Editable Compaction Performance (SDR only) */}
                        {selectedLine === 'sdr' && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t('compactionPerformance')} <span className="text-red-500">*</span>
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const machineId = getMachineId(machine);
                              // Get base performance without multiplier for editing
                              const weightInTons = machine.weight / 1000;
                              const interpolatedPerf = interpolatePerformance(weightInTons, selectedSoilType) || 
                                                     parseCompactionPerformance(machine.compactionPerformance || '');
                              const editedPerf = editableCompactionPerformance[machineId];
                              const basePerf = editedPerf !== undefined ? editedPerf : interpolatedPerf;
                              
                              // Show effective performance with multiplier
                              const isBomag = machine.brand === 'BOMAG';
                              const techEnabled = bomagTechEnabled[machineId] || false;
                              const multiplier = isBomag && techEnabled ? 1.25 : 1.0;
                              const effectivePerf = basePerf * multiplier;
                              
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center">
                                  <div className="flex flex-col items-center gap-1">
                                    <Input
                                      type="number"
                                      className="w-20 h-8 text-center text-sm"
                                      value={basePerf || ''}
                                      onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        setEditableCompactionPerformance(prev => ({
                                          ...prev,
                                          [machineId]: isNaN(value) ? interpolatedPerf : value
                                        }));
                                      }}
                                      placeholder={interpolatedPerf.toString()}
                                    />
                                    {isBomag && techEnabled && (
                                      <div className="text-xs text-green-600 font-semibold">
                                        = {effectivePerf.toFixed(0)} m³/h
                                      </div>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        )}
                        
                        {/* BOMAG Technology Multiplier (Economizer/Terrameter) */}
                        {selectedLine === 'sdr' && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t('economizerQuestion')}
                              <div className="text-xs text-gray-500 mt-1">{t('economizerMultiplier')}</div>
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const machineId = getMachineId(machine);
                              const isBomag = machine.brand === 'BOMAG';
                              
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center">
                                  {isBomag ? (
                                    <div className="flex items-center justify-center">
                                      <Checkbox
                                        checked={bomagTechEnabled[machineId] || false}
                                        onCheckedChange={(checked) => {
                                          setBomagTechEnabled(prev => ({
                                            ...prev,
                                            [machineId]: Boolean(checked)
                                          }));
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        )}

                        {/* Fuel Consumption */}
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                            {t('fuelConsumption')} <span className="text-green-500">***</span>
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

                        {/* Fuel Price Row */}
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                            <div className="flex items-center justify-start gap-2">
                              <span>{t('dieselPriceLabel', ccy)}</span>
                              <Input
                                type="number"
                                className="h-6 w-20 text-center"
                                value={usdToInputNumber(fuelPrice, 'fuelPerLiter')}
                                onChange={(e) => {
                                  const raw = e.target.value;
                                  const v = raw === '' ? NaN : parseFloat(raw);
                                  const usd = Number.isNaN(v) ? 1.2 : inputNumberToUsd(v, 'fuelPerLiter');
                                  const val = Math.max(0, usd);
                                  setFuelPrice(val);
                                  if (typeof window !== 'undefined') {
                                    localStorage.setItem('fuelPriceUSD', String(val));
                                  }
                                }}
                                placeholder={String(usdToInputNumber(1.2, 'fuelPerLiter'))}
                              />
                            </div>
                          </td>
                          {getSelectedMachineData().map((machine, index) => (
                            <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                              {formatFuelPerLiterFromUsd(fuelPrice)}
                            </td>
                          ))}
                        </tr>

                        {/* Work Efficiency */}
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

                        {/* Volume input row */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              <div className="flex items-center justify-center gap-2">
                                <span>{t('volumeM3')}</span>
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
                                <Dialog open={isVolumeCalcOpen} onOpenChange={setIsVolumeCalcOpen}>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                                      📐
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>{t('volumeCalculator')}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <Label htmlFor="length">{t('roadLength')}</Label>
                                        <Input
                                          id="length"
                                          type="number"
                                          value={lengthM || ''}
                                          onChange={(e) => setLengthM(parseFloat(e.target.value) || 0)}
                                          placeholder="0"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="width">{t('roadWidth')}</Label>
                                        <Input
                                          id="width"
                                          type="number"
                                          value={widthM || ''}
                                          onChange={(e) => setWidthM(parseFloat(e.target.value) || 0)}
                                          placeholder="0"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="thickness">{t('layerThickness')}</Label>
                                        <Input
                                          id="thickness"
                                          type="number"
                                          step="0.01"
                                          value={heightM || ''}
                                          onChange={(e) => setHeightM(parseFloat(e.target.value) || 0)}
                                          placeholder="0.00"
                                        />
                                      </div>
                                      <div className="bg-gray-50 p-3 rounded">
                                        <div className="text-sm text-gray-600">{t('calculatedVolume')}</div>
                                        <div className="text-xl font-bold text-bomag-blue">
                                          {(lengthM * widthM * heightM).toFixed(2)} m³
                                        </div>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button 
                                          onClick={() => {
                                            const volume = lengthM * widthM * heightM;
                                            setSurfaceVolumeM3(volume);
                                            if (typeof window !== 'undefined') {
                                              localStorage.setItem('surfaceVolumeM3', String(volume));
                                            }
                                            setIsVolumeCalcOpen(false);
                                          }}
                                          className="flex-1"
                                        >
                                          {t('useThisVolume')}
                                        </Button>
                                        <Button 
                                          variant="outline" 
                                          onClick={() => setIsVolumeCalcOpen(false)}
                                        >
                                          {t('cancel')}
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                {surfaceVolumeM3 > 0 ? surfaceVolumeM3.toFixed(2) : '-'}
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
                                  // Apply work efficiency: lower efficiency means longer time (divide by efficiency)
                                  const adjustedPerf = effectivePerf * (workEfficiency / 100);
                                  const hours = adjustedPerf > 0 ? surfaceVolumeM3 / adjustedPerf : 0;
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
                                  // Apply work efficiency: lower efficiency means longer time (divide by efficiency)
                                  const adjustedPerf = effectivePerf * (workEfficiency / 100);
                                  const hours = adjustedPerf > 0 ? surfaceVolumeM3 / adjustedPerf : 0;
                                  // Cost/hour approximation using fuel + maint only (no operator): fuelConsumption*fuelPrice + pm + cm
                                  const pm = getEffectivePreventiveMaintenance(machine);
                                  const cm = getEffectiveCorrectiveMaintenance(machine);
                                  const fuel = getEffectiveFuelConsumption(machine);
                                  const costPerHour = fuel * fuelPrice + pm + cm;
                                  const totalCost = hours * costPerHour;
                                  return (
                                    <td key={index} className="border border-gray-300 p-2 text-center font-bold bg-yellow-50">
                                      {hours > 0 ? formatFromUsd(totalCost) : '-'}
                                    </td>
                                  );
                                })}
                              </tr>
                            </>
                          )}
                        </tbody>
                      </CompareTable>
                    </div>
                    
                    {/* Footnotes */}
                    <div className="mt-3 text-xs text-gray-600 italic space-y-1">
                      <div>
                        <span className="text-red-500">*</span> <strong>{t('performance')}:</strong> {t('footnotePerformance')}
                      </div>
                      <div>
                        <span className="text-blue-500">**</span> <strong>{t('compactionLayerLabel')}:</strong> {t('footnoteCompactionLayer')}
                      </div>
                      <div>
                        <span className="text-green-500">***</span> <strong>{t('fuelConsumption')}:</strong> {t('footnoteFuelConsumption')}
                      </div>
                    </div>
                  </div>
                )}

                {selectedLine === 'milling' && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('millingPerformanceCalculation')}</h4>
                    <div className="overflow-x-auto">
                      <CompareTable columnCount={compareSpecCols}>
                        <thead>
                          <tr className="bg-bomag-light-gray">
                            <th className="border border-gray-300 p-2 text-left font-semibold">{t('parameter')}</th>
                            {getSelectedMachineData().map((machine, index) => (
                              <th key={index} className="border border-gray-300 p-2 text-center">
                                <div className="text-sm font-bold">{machine.brand}</div>
                                <div className="text-xs">{machine.model}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">{t('millingUsp1Productivity')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const m = machine as MillingMachineSpec;
                              const machineId = getMachineId(m);
                              const capacity = getEffectiveTransportCapacity(m);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    className="w-24 h-8 text-center mx-auto"
                                    value={capacity || ''}
                                    onChange={(e) => {
                                      const v = parseFloat(e.target.value);
                                      setEditableTransportCapacity((prev) => ({
                                        ...prev,
                                        [machineId]: Number.isNaN(v) ? 0 : v,
                                      }));
                                    }}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">{t('millingWorkingSpeed')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const defaults = getMillingProductivityDefaults(machine as MillingMachineSpec);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                  {defaults.workingSpeedMmin > 0 ? `${defaults.workingSpeedMmin} m/min` : '—'}
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">{t('millingUsp2Maneuverability')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const defaults = getMillingProductivityDefaults(machine as MillingMachineSpec);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                  {defaults.turningRadiusM != null ? `${defaults.turningRadiusM} m` : '—'}
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-sky-50/80 bg-sky-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-sky-100">
                              <div className="flex items-center gap-2">
                                <span>{t('millingVolumeToRemove')}</span>
                                <Input
                                  type="number"
                                  className="h-6 w-24 text-center bg-white"
                                  value={millingVolumeM3 || ''}
                                  onChange={(e) => {
                                    const v = parseFloat(e.target.value) || 0;
                                    setMillingVolumeM3(v);
                                    if (typeof window !== 'undefined') {
                                      localStorage.setItem('millingVolumeM3', String(v));
                                    }
                                  }}
                                  placeholder="0"
                                />
                              </div>
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const m = machine as MillingMachineSpec;
                              const hours = getMillingJobHours(millingVolumeM3, getEffectiveTransportCapacity(m));
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium bg-sky-50">
                                  {hours != null ? `${hours.toFixed(1)} h` : '—'}
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-green-50/50">
                            <td className="border border-gray-300 p-2 font-semibold bg-green-50">{t('millingBms15lQuestion')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const m = machine as MillingMachineSpec;
                              const machineId = getMachineId(m);
                              const defaults = getMillingProductivityDefaults(m);
                              if (!defaults.hasBms15l) {
                                return <td key={index} className="border border-gray-300 p-2 text-center text-gray-400">—</td>;
                              }
                              const checked = bms15lEnabled[machineId] ?? true;
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center">
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={(v) =>
                                      setBms15lEnabled((prev) => ({ ...prev, [machineId]: Boolean(v) }))
                                    }
                                  />
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-green-50/50">
                            <td className="border border-gray-300 p-2 font-semibold bg-green-50">{t('millingToolWearCost', ccy)}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const m = machine as MillingMachineSpec;
                              const machineId = getMachineId(m);
                              const bms15l = bms15lEnabled[machineId] ?? getMillingProductivityDefaults(m).hasBms15l;
                              const rate = getEffectiveToolWearCost(m) * getMillingWearMultiplier(m, bms15l);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center bg-yellow-50">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    className="w-20 h-8 text-center mx-auto bg-yellow-50"
                                    value={usdToInputNumber(rate, 'hourlyRate')}
                                    onChange={(e) => {
                                      const v = parseFloat(e.target.value);
                                      const base = Number.isNaN(v) ? 0 : inputNumberToUsd(v, 'hourlyRate');
                                      const mult = getMillingWearMultiplier(m, bms15l);
                                      setEditableToolWearCost((prev) => ({
                                        ...prev,
                                        [machineId]: mult > 0 ? base / mult : base,
                                      }));
                                    }}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </CompareTable>
                    </div>
                    <div className="mt-3 text-xs text-gray-600 italic space-y-1">
                      <div>{t('millingFootnoteProductivity')}</div>
                      <div>{t('millingFootnoteBms15l')}</div>
                    </div>
                  </div>
                )}

                {selectedLine === 'pavers' && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('paverPerformanceCalculation')}</h4>
                    <div className="overflow-x-auto">
                      <CompareTable columnCount={compareSpecCols}>
                        <thead>
                          <tr className="bg-bomag-light-gray">
                            <th className="border border-gray-300 p-2 text-left font-semibold">{t('parameter')}</th>
                            {getSelectedMachineData().map((machine, index) => (
                              <th key={index} className="border border-gray-300 p-2 text-center">
                                <div className="text-sm font-bold">{machine.brand}</div>
                                <div className="text-xs">{machine.model}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-green-50/50">
                            <td className="border border-gray-300 p-2 font-semibold bg-green-50">{t('paverMagmalifeQuestion')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const p = machine as PaverMachineSpec;
                              const machineId = getMachineId(p);
                              const defaults = getPaverUspDefaults(p);
                              if (!defaults.hasMagmalife && !/magmalife/i.test(p.screedHeating)) {
                                return <td key={index} className="border border-gray-300 p-2 text-center text-gray-400">—</td>;
                              }
                              const checked = magmalifeEnabled[machineId] ?? defaults.hasMagmalife;
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center">
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={(v) =>
                                      setMagmalifeEnabled((prev) => ({ ...prev, [machineId]: Boolean(v) }))
                                    }
                                  />
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-green-50/50">
                            <td className="border border-gray-300 p-2 font-semibold bg-green-50">{t('paverEcomodeQuestion')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const p = machine as PaverMachineSpec;
                              const machineId = getMachineId(p);
                              const defaults = getPaverUspDefaults(p);
                              const hasFuelSaving = defaults.hasEcomode || /ecomode|ecoplus|variospeed/i.test(p.fuelSavingMode);
                              if (!hasFuelSaving) {
                                return <td key={index} className="border border-gray-300 p-2 text-center text-gray-400">—</td>;
                              }
                              const checked = ecomodeEnabled[machineId] ?? defaults.hasEcomode;
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center">
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={(v) =>
                                      setEcomodeEnabled((prev) => ({ ...prev, [machineId]: Boolean(v) }))
                                    }
                                  />
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-orange-50/50">
                            <td className="border border-gray-300 p-2 font-semibold bg-orange-50">{t('paverSetupFuelPerShift')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const p = machine as PaverMachineSpec;
                              const machineId = getMachineId(p);
                              const setupL = getEffectiveSetupFuel(p);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    className="w-20 h-8 text-center mx-auto"
                                    value={setupL}
                                    onChange={(e) => {
                                      const v = parseFloat(e.target.value);
                                      setEditableSetupFuel((prev) => ({
                                        ...prev,
                                        [machineId]: Number.isNaN(v) ? 0 : v,
                                      }));
                                    }}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-orange-50/50">
                            <td className="border border-gray-300 p-2 font-semibold bg-orange-50">{t('paverHeatingTime')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const defaults = getPaverUspDefaults(machine as PaverMachineSpec);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                  {defaults.heatingMinutes > 0 ? `~${defaults.heatingMinutes} min` : '—'}
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-orange-50/50">
                            <td className="border border-gray-300 p-2 font-semibold bg-orange-50">{t('paverFuelWithEcomode')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const p = machine as PaverMachineSpec;
                              const machineId = getMachineId(p);
                              const base = getEffectiveFuelConsumption(p);
                              const ecomode = ecomodeEnabled[machineId] ?? getPaverUspDefaults(p).hasEcomode;
                              const effective = base * getPaverFuelMultiplier(p, ecomode);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                  {effective > 0 ? `${effective.toFixed(1)} L/h` : '—'}
                                </td>
                              );
                            })}
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">{t('paverCo2PerShift')}</td>
                            {getSelectedMachineData().map((machine, index) => {
                              const co2 = getPaverCo2PerShiftKg((machine as PaverMachineSpec).financial);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                  {co2 != null ? `${co2} kg` : '—'}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </CompareTable>
                    </div>
                    <div className="mt-3 text-xs text-gray-600 italic space-y-1">
                      <div>{t('paverFootnoteMagmalife')}</div>
                      <div>{t('paverFootnoteEcomode')}</div>
                    </div>
                  </div>
                )}

                  {/* Costs Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('costs')}</h4>
                    <div className="overflow-x-auto">
                      <CompareTable columnCount={compareCostCols}>
                        <thead>
                          <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left font-semibold">#</th>
                          <th className="border border-gray-300 p-2 text-left font-semibold">{t('costs')}</th>
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
                            <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500">1</td>
                            <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                              {t('price', ccy)}
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
                                      value={usdToInputNumber(effectivePrice, 'aggregate')}
                                      onChange={e => {
                                        const raw = e.target.value;
                                        const v = raw === '' ? NaN : parseFloat(raw);
                                        setEditablePrice(prev => ({
                                          ...prev,
                                          [machineId]: Number.isNaN(v) ? 0 : inputNumberToUsd(v, 'aggregate'),
                                        }));
                                      }}
                                    />
                                  </div>
                                </td>
                              );
                            })}
                          </tr>

                          {/* Operation Time Row - "Tiempo de operación a analizar" */}
                          <tr className="hover:bg-sky-50/80 bg-sky-50">
                            <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500 bg-sky-100">2</td>
                            <td className="border border-gray-300 p-2 font-semibold bg-sky-100">
                              <div className="flex items-center justify-start gap-2">
                                <span>{t('operationTimeToAnalyze')}</span>
                                <Input
                                  type="number"
                                  className="h-6 w-20 text-center bg-white"
                                  value={operationTime}
                                  onChange={(e) => {
                                    const v = e.target.value === '' ? 3000 : parseFloat(e.target.value);
                                    const val = isNaN(v) ? 3000 : v;
                                    setOperationTime(val);
                                    if (typeof window !== 'undefined') {
                                      localStorage.setItem('operationTimeHours', String(val));
                                    }
                                  }}
                                  placeholder="3000"
                                />
                              </div>
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center font-medium bg-sky-50">
                                {operationTime.toLocaleString()} h
                              </td>
                            ))}
                          </tr>

                          {/* Category: Combustible */}
                          <tr>
                            <td colSpan={getSelectedMachineData().length + 2} className="border border-gray-300 p-2 font-bold text-sm bg-orange-100 text-orange-900">
                              {t('fuelCategory')}
                            </td>
                          </tr>

                          {/* Fuel Consumption Row */}
                          <tr className="hover:bg-orange-50/50">
                            <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500 bg-orange-50">3</td>
                            <td className="border border-gray-300 p-2 font-medium bg-orange-50">
                              {t('fuelConsumption')} {!isCompactionLine ? null : <span className="text-green-500">***</span>}{' '}
                              <span className="text-xs text-gray-500">(L/h)</span>
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const machineId = getMachineId(machine);
                              const currentFuel = getEffectiveFuelConsumption(machine);

                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium bg-blue-50">
                                  {isCompactionLine ? (
                                    `${currentFuel.toFixed(1)} L/h`
                                  ) : (
                                    <div className="flex justify-center">
                                      <Input
                                        type="number"
                                        step="0.1"
                                        className="border rounded px-2 py-1 w-20 text-center bg-blue-50"
                                        value={currentFuel}
                                        onChange={e => {
                                          const raw = e.target.value;
                                          const v = raw === '' ? NaN : parseFloat(raw);
                                          setEditableFuelConsumption(prev => ({
                                            ...prev,
                                            [machineId]: Number.isNaN(v) ? 0 : v,
                                          }));
                                        }}
                                      />
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                          {/* Fuel Price Row */}
                          <tr className="hover:bg-orange-50/50">
                            <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500 bg-orange-50">4</td>
                            <td className="border border-gray-300 p-2 font-semibold bg-orange-50">
                              <div className="flex items-center justify-start gap-2">
                                <span>{t('dieselPriceLabel', ccy)}</span>
                                <Input
                                  type="number"
                                  className="h-6 w-20 text-center"
                                  value={usdToInputNumber(fuelPrice, 'fuelPerLiter')}
                                  onChange={(e) => {
                                    const raw = e.target.value;
                                    const v = raw === '' ? NaN : parseFloat(raw);
                                    const usd = Number.isNaN(v) ? 1.2 : inputNumberToUsd(v, 'fuelPerLiter');
                                    const val = Math.max(0, usd);
                                    setFuelPrice(val);
                                    if (typeof window !== 'undefined') {
                                      localStorage.setItem('fuelPriceUSD', String(val));
                                    }
                                  }}
                                  placeholder={String(usdToInputNumber(1.2, 'fuelPerLiter'))}
                                />
                              </div>
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                {formatFuelPerLiterFromUsd(fuelPrice)}
                              </td>
                            ))}
                          </tr>

                          {/* Fuel Cost Calculation Row */}
                          <tr className="hover:bg-orange-50/50">
                            <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500 bg-orange-50">5</td>
                            <td className="border border-gray-300 p-2 font-medium bg-orange-50">
                              {t('fuelCostLabel')}
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const fuelConsumption = getEffectiveFuelConsumption(machine);
                              const fuelCost = fuelConsumption * operationTime * fuelPrice;
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                  {formatFromUsd(fuelCost)}
                                </td>
                              );
                            })}
                          </tr>

                          {/* Product-line extra costs (milling tool wear / paver setup heating) */}
                          {(selectedLine === 'milling' || selectedLine === 'pavers') && (
                            <tr className="hover:bg-amber-50/50">
                              <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500 bg-amber-50">5b</td>
                              <td className="border border-gray-300 p-2 font-medium bg-amber-50">
                                {selectedLine === 'milling' ? t('millingToolWearCost', ccy) : t('paverSetupHeatingCost')}
                              </td>
                              {getSelectedMachineData().map((machine, index) => {
                                const parts = computeTcoComponents(machine, operationTime);
                                const extra =
                                  selectedLine === 'milling' ? parts.toolWearCost : parts.setupHeatingCost;
                                return (
                                  <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                    {formatFromUsd(extra)}
                                  </td>
                                );
                              })}
                            </tr>
                          )}

                          {/* Category: Mantenimiento */}
                          <tr>
                            <td colSpan={getSelectedMachineData().length + 2} className="border border-gray-300 p-2 font-bold text-sm bg-green-100 text-green-900">
                              {t('maintenanceCategory')}
                            </td>
                          </tr>

                          {/* Preventive Maintenance Row - Editable */}
                          <tr className="hover:bg-green-50/50">
                            <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500 bg-green-50">6</td>
                            <td className="border border-gray-300 p-2 font-semibold bg-green-50">
                              {selectedLine === 'pavers' ? t('paverWearPartsCost', ccy) : t('preventiveMaintenance', ccy)}
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
                                      value={usdToInputNumber(effectiveMaintenance, 'hourlyRate')}
                                      onChange={e => {
                                        const raw = e.target.value;
                                        const v = raw === '' ? NaN : parseFloat(raw);
                                        setEditablePreventiveMaintenance(prev => ({
                                          ...prev,
                                          [machineId]: Number.isNaN(v) ? 0 : inputNumberToUsd(v, 'hourlyRate'),
                                        }));
                                      }}
                                    />
                                  </div>
                                </td>
                              );
                            })}
                          </tr>

                          {/* Maintenance-free articulation joint USP selection (SDR only) */}
                          {selectedLine === 'sdr' &&
                            getSelectedMachineData().some((m) => (m as any).brand === 'BOMAG') && (
                              <tr className="hover:bg-green-50/50">
                                <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500 bg-green-50">7</td>
                                <td className="border border-gray-300 p-2 font-semibold bg-green-50">
                                  {t('maintenanceJointUSPQuestion')}
                                </td>
                                {getSelectedMachineData().map((machine, index) => {
                                  const machineId = getMachineId(machine);
                                  const checked = articulationJointUSPEnabled[machineId] ?? (machine.brand === 'BOMAG');
                                  return (
                                    <td key={index} className="border border-gray-300 p-2 text-center">
                                      <div className="flex items-center justify-center">
                                        <Checkbox
                                          checked={checked}
                                          onCheckedChange={(checkedValue) => {
                                            setArticulationJointUSPEnabled((prev) => ({
                                              ...prev,
                                              [machineId]: Boolean(checkedValue),
                                            }));
                                          }}
                                        />
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            )}

                          {/* Articulation joint savings summary + toggle */}
                          {selectedLine === 'sdr' &&
                            getSelectedMachineData().some((m) => (m as any).brand === 'BOMAG') && (
                              <tr className="hover:bg-green-50/50">
                                <td
                                  colSpan={getSelectedMachineData().length + 2}
                                  className="border border-gray-300 p-2 bg-green-50"
                                >
                                  {(() => {
                                    const selected = getSelectedMachineData();
                                    const bomagMachine = selected.find((m) => m.brand === 'BOMAG');
                                    const competitorMachine = selected.find((m) => m.brand !== 'BOMAG');
                                    const bomagId = bomagMachine ? getMachineId(bomagMachine) : null;
                                    const competitorId = competitorMachine ? getMachineId(competitorMachine) : null;
                                    const bomagHas = bomagId ? (articulationJointUSPEnabled[bomagId] ?? true) : false;
                                    const competitorHas = competitorId ? Boolean(articulationJointUSPEnabled[competitorId]) : false;

                                    const ajTech = parseFloat(localStorage.getItem('aj_technicianRate') || '35') || 35;
                                    const ajIdle = parseFloat(localStorage.getItem('aj_machineIdleRate') || '120') || 120;
                                    const ajGrease = parseFloat(localStorage.getItem('aj_greaseCostPerIntervention') || '15') || 15;
                                    const computeJointCost = (hasFree: boolean) => {
                                      if (hasFree) return 0;
                                      const interventions = operationTime / 50;
                                      const unproductiveHours = interventions * 0.5;
                                      return unproductiveHours * ajTech + interventions * ajGrease + unproductiveHours * ajIdle;
                                    };
                                    const savings = computeJointCost(competitorHas) - computeJointCost(bomagHas);

                                    return (
                                      <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                          {savings > 0 && (
                                            <span className="inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-bold text-blue-900 tabular-nums">
                                              {t('bomagSavingsPeriod')}: {formatFromUsd(savings)}
                                            </span>
                                          )}
                                          {savings === 0 && (
                                            <span className="text-sm text-gray-500">
                                              {t('bomagSavingsPeriod')}: {formatFromUsd(0)}
                                            </span>
                                          )}
                                        </div>
                                        <button
                                          type="button"
                                          className="text-bomag-blue hover:underline text-sm font-medium shrink-0"
                                          onClick={() => setShowArticulationVariables((prev) => !prev)}
                                        >
                                          {showArticulationVariables
                                            ? t('hideArticulationVariables')
                                            : t('showArticulationVariables')}
                                        </button>
                                      </div>
                                    );
                                  })()}
                                </td>
                              </tr>
                            )}

                          {/* Preventive maintenance - Articulation joint USP (SDR BOMAG) */}
                          {selectedLine === 'sdr' &&
                            getSelectedMachineData().some((m) => (m as any).brand === 'BOMAG') &&
                            showArticulationVariables && (
                              <tr className="hover:bg-green-50/50">
                                <td
                                  colSpan={getSelectedMachineData().length + 2}
                                  className="border border-gray-300 p-0"
                                >
                                  <div className="p-4">
                                    {(() => {
                                      const selected = getSelectedMachineData();
                                      const bomagMachine = selected.find((m) => m.brand === 'BOMAG');
                                      const competitorMachine = selected.find((m) => m.brand !== 'BOMAG');

                                      const bomagId = bomagMachine ? getMachineId(bomagMachine) : null;
                                      const competitorId = competitorMachine ? getMachineId(competitorMachine) : null;

                                      const bomagHas = bomagId ? (articulationJointUSPEnabled[bomagId] ?? true) : false;
                                      const competitorHas = competitorId ? Boolean(articulationJointUSPEnabled[competitorId]) : false;

                                      return (
                                        <ArticulationJointCostAnalysis
                                          show={true}
                                          operationTime={operationTime}
                                          bomagHasMaintenanceFreeJoint={bomagHas}
                                          competitorHasMaintenanceFreeJoint={competitorHas}
                                        />
                                      );
                                    })()}
                                  </div>
                                </td>
                              </tr>
                            )}

                          {/* Corrective Maintenance Row - Editable */}
                          <tr className="hover:bg-green-50/50">
                            <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500 bg-green-50">8</td>
                            <td className="border border-gray-300 p-2 font-semibold bg-green-50">
                              {t('correctiveMaintenance', ccy)}
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
                                      value={usdToInputNumber(effectiveMaintenance, 'hourlyRate')}
                                      onChange={e => {
                                        const raw = e.target.value;
                                        const v = raw === '' ? NaN : parseFloat(raw);
                                        setEditableCorrectiveMaintenance(prev => ({
                                          ...prev,
                                          [machineId]: Number.isNaN(v) ? 0 : inputNumberToUsd(v, 'hourlyRate'),
                                        }));
                                      }}
                                    />
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          {/* Category: Resale value — manual estimate */}
                          <tr>
                            <td colSpan={getSelectedMachineData().length + 2} className="border border-gray-300 p-2 bg-purple-100">
                              <div className="font-bold text-sm text-purple-900">{t('resaleCategory')}</div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={getSelectedMachineData().length + 2} className="border border-gray-300 p-2 bg-purple-50/80">
                              <p className="text-xs text-purple-900 leading-relaxed">{t('resaleValueHint', ccy)}</p>
                            </td>
                          </tr>
                          <tr className="hover:bg-purple-50/50">
                            <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500 bg-purple-50">9</td>
                            <td className="border border-gray-300 p-2 font-semibold bg-purple-50">
                              {t('manualResaleValue', ccy)}
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const machineId = getMachineId(machine);
                              const value = editableRemainingValue[machineId] ?? 0;
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-medium bg-yellow-50">
                                  <div className="flex justify-center">
                                    <Input
                                      type="number"
                                      className="border rounded px-2 py-1 w-28 text-center bg-yellow-50"
                                      value={usdToInputNumber(value, 'aggregate')}
                                      onChange={e => {
                                        const raw = e.target.value;
                                        const v = raw === '' ? NaN : parseFloat(raw);
                                        setEditableRemainingValue(prev => ({
                                          ...prev,
                                          [machineId]: Number.isNaN(v) ? 0 : inputNumberToUsd(v, 'aggregate'),
                                        }));
                                      }}
                                      placeholder="0"
                                    />
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          {/* TCO Row (includes deduction for resale estimate) */}
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 text-center text-xs font-bold text-gray-500"></td>
                            <td className="border border-gray-300 p-2 font-bold bg-gray-100">
                              {t('tco', ccy)}
                            </td>
                            {getSelectedMachineData().map((machine, index) => {
                              const parts = computeTcoComponents(machine, operationTime);
                              return (
                                <td key={index} className="border border-gray-300 p-2 text-center font-bold bg-yellow-50">
                                  {formatFromUsd(parts.tco)}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </CompareTable>
                    </div>
                  </div>

                  {/* TCO Timeline Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('tcoProgressive')}</h4>
                    <div className="overflow-x-auto">
                      <CompareTable columnCount={compareSpecCols}>
                        <thead>
                          <tr className="bg-bomag-light-gray">
                            <th className="border border-gray-300 p-2 text-left">{t('hoursLabel')}</th>
                            {getSelectedMachineData().map((machine, index) => (
                              <th key={index} className="border border-gray-300 p-2 text-center">
                                <div className="text-sm font-bold">{machine.brand}</div>
                                <div className="text-xs">{machine.model}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                      <tbody>
                        {[0, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map(hours => {
                          const tcos = getSelectedMachineData().map((machine) => {
                            const machineId = getMachineId(machine);
                            const tco0 = editableTCO[machineId] !== undefined
                              ? editableTCO[machineId]
                              : getEffectivePrice(machine);
                            if (hours === 0) return tco0 - getEffectiveRemainingValue(machine);
                            const parts = computeTcoComponents(machine, hours);
                            const base = editableTCO[machineId] !== undefined ? editableTCO[machineId] : parts.price;
                            return base + parts.fuelCost + parts.maintenanceCost + parts.jointCost + parts.toolWearCost + parts.setupHeatingCost - parts.remainingValue;
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
                                  : getEffectivePrice(machine);
                                let tco = tco0 - getEffectiveRemainingValue(machine);
                                if (hours > 0) {
                                  const parts = computeTcoComponents(machine, hours);
                                  const base = editableTCO[machineId] !== undefined ? editableTCO[machineId] : parts.price;
                                  tco = base + parts.fuelCost + parts.maintenanceCost + parts.jointCost + parts.toolWearCost + parts.setupHeatingCost - parts.remainingValue;
                                }
                                return (
                                  <td key={index} className="border border-gray-300 p-2 text-center">
                                    {hours === 0 ? (
                                      <input
                                        type="number"
                                        className="border rounded px-2 py-1 w-24 text-right"
                                        value={usdToInputNumber(tco0, 'aggregate')}
                                        onChange={e => {
                                          const raw = e.target.value;
                                          const v = raw === '' ? NaN : parseFloat(raw);
                                          setEditableTCO(prev => ({
                                            ...prev,
                                            [machineId]: Number.isNaN(v) ? 0 : inputNumberToUsd(v, 'aggregate'),
                                          }));
                                        }}
                                      />
                                    ) : (
                                      <div>
                                        <div style={{ background: getPriceColor(tco, min, max), borderRadius: 4, padding: '2px 4px', display: 'inline-block' }}>
                                          TCO: {formatFromUsd(tco)}
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
                    </CompareTable>
                  </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MachineComparison;
