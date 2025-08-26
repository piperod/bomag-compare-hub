import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sdrMachines, ltrMachines, MachineSpec } from '@/data/machineData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import placeholder from '/public/placeholder.svg';

interface MachineComparisonProps {
  selectedLine: string;
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
    correctiveMaintenance: 2
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
    correctiveMaintenance: 2
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
    correctiveMaintenance: 2
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
    correctiveMaintenance: 2
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
    correctiveMaintenance: 2
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

const MachineComparison = ({ selectedLine }: MachineComparisonProps) => {
  const { t, language } = useLanguage();
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
  // Add state for editable TCO at time 0
  const [editableTCO, setEditableTCO] = useState<{ [key: number]: number }>({});
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

  const machines = selectedLine === 'sdr' ? sdrMachines : selectedLine === 'ltr' ? ltrMachines : selectedLine === 'htr' ? htrMachines : [];
  const machinesSorted = React.useMemo(() => {
    const arr = [...machines];
    arr.sort((a, b) => {
      const aScore = a.brand === 'BOMAG' ? 0 : 1;
      const bScore = b.brand === 'BOMAG' ? 0 : 1;
      if (aScore !== bScore) return aScore - bScore;
      return 0;
    });
    return arr;
  }, [machines]);

  // Reset selected machines and editableTCO when product line changes
  useEffect(() => {
    setSelectedMachines([]);
    setEditableTCO({});
  }, [selectedLine]);

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

  const toggleMachineSelection = (machineId: string) => {
    setSelectedMachines(prev => 
      prev.includes(machineId) 
        ? prev.filter(id => id !== machineId)
        : [...prev, machineId]
    );
  };

  const getSelectedMachineData = () => {
    return machines.filter((_, index) => selectedMachines.includes(index.toString()));
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-bomag-gray">
          {selectedLine.toUpperCase()} - {t('detailComparison')}
        </h3>
        <div className="text-sm text-gray-600">
          {selectedMachines.length} máquinas seleccionadas para comparar
        </div>
      </div>

      {/* Machine Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {machinesSorted.map((machine, index) => (
          <Card key={index} className="relative">
            <CardHeader className="pb-2">
              <div className="flex flex-col items-center justify-between">
                <img src={getImagePath(machine.model, selectedLine)} alt={machine.model} className="w-full h-32 object-contain mb-2" />
                <div className="flex items-center justify-between w-full">
                  <Badge className={`${getBrandColor(machine.brand)} text-white`}>
                    {machine.brand}
                  </Badge>
                  <Checkbox
                    checked={selectedMachines.includes(index.toString())}
                    onCheckedChange={() => toggleMachineSelection(index.toString())}
                  />
                </div>
                {machine.brand === 'BOMAG' && (machine as any).materialNumber && (
                  <div className="w-full text-[10px] text-gray-500 mt-1 text-right">
                    Material: {(machine as any).materialNumber}
                  </div>
                )}
              </div>
              <CardTitle className="text-lg">{machine.model}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('weight')}:</span>
                  <span className="font-medium">{machine.weight.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('power')}:</span>
                  <span className="font-medium">{machine.power} HP</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedMachines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('compare')} - {selectedMachines.length} Máquinas</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="comprehensive" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="comprehensive">Comparación Completa</TabsTrigger>
                {(selectedLine === 'sdr' || selectedLine === 'ltr') && machines.some(m => m.tcoTimeline) && (
                  <TabsTrigger value="tco-timeline">TCO Progresivo</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="comprehensive" className="mt-4 space-y-8">
                {/* Basic Specifications Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Especificaciones Básicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left">Especificación</th>
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
                          
                          return basicSpecs;
                        })().map((spec) => (
                          <tr key={spec.key} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                              {spec.label}
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center">
                                {spec.key === 'weight' 
                                  ? (machine.weight as number).toLocaleString()
                                  : typeof machine[spec.key] === 'object'
                                    ? machine[spec.key][language] || '-'
                                    : String(machine[spec.key as keyof typeof machine] || '-')
                                }
                              </td>
                            ))}
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
                          <th className="border border-gray-300 p-2 text-left">Rendimiento</th>
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
                          // Performance specs vary by product line
                          const performanceSpecs = [
                            { key: 'fuelConsumption', label: t('fuelConsumption'), unit: 'L/h' }
                          ];
                          
                          // SDR-specific performance fields
                          if (selectedLine === 'sdr') {
                            performanceSpecs.unshift(
                              { key: 'maxCompactionDepth', label: t('maxCompactionDepth'), unit: 'cm' },
                              { key: 'compactionPerformance', label: t('compactionPerformance'), unit: 'm³/h' }
                            );
                          }
                          
                          return performanceSpecs;
                        })().map((spec) => (
                          <tr key={spec.key} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                              {spec.label}
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center">
                                {machine[spec.key as keyof MachineSpec] || '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                        {/* Calculated performance rows based on volume */}
                        {surfaceVolumeM3 > 0 && (
                          <>
                            <tr className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                                {t('timeEstimated')}
                              </td>
                              {getSelectedMachineData().map((machine, index) => {
                                const perfRaw = machine.compactionPerformance || '';
                                const perfAvg = parseCompactionPerformance(perfRaw);
                                const hours = perfAvg > 0 ? surfaceVolumeM3 / perfAvg : 0;
                                return (
                                  <td key={index} className="border border-gray-300 p-2 text-center font-semibold">
                                    {hours > 0 ? hours.toFixed(2) : '-'}
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                                {t('costBasedOnEstimatedTime')}
                              </td>
                              {getSelectedMachineData().map((machine, index) => {
                                const perfRaw = machine.compactionPerformance || '';
                                const perfAvg = parseCompactionPerformance(perfRaw);
                                const hours = perfAvg > 0 ? surfaceVolumeM3 / perfAvg : 0;
                                // Cost/hour approximation using fuel + maint only (no operator): fuelConsumption*fuelPrice + pm + cm
                                const pm = machine.preventiveMaintenance ?? 0;
                                const cm = machine.correctiveMaintenance ?? 0;
                                const fuel = machine.fuelConsumption ?? 0;
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
                  {/* Volume Calculator Section */}
                  <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-700">Calculadora de Volumen</h4>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="surface-volume-detail" className="text-sm text-gray-600">Volumen (m³)</Label>
                          <Input
                            id="surface-volume-detail"
                            type="number"
                            className="h-8 w-28 text-right"
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
                        <Button className="bg-bomag-yellow text-black hover:bg-bomag-orange/90" disabled>Calcular Rendimiento</Button>
                      </div>
                    </div>
                    {surfaceVolumeM3 > 0 && (
                      <div className="mt-3 text-sm text-gray-600">
                        <p>Con un volumen de <strong>{surfaceVolumeM3} m³</strong>, las máquinas seleccionadas mostrarán sus tiempos estimados y costos en la tabla superior.</p>
                      </div>
                    )}
                  </div>
                </div>

                              {/* Costs Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Costos</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left">Costos</th>
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
                          { key: 'price', label: t('price'), format: formatCurrency },
                          { key: 'preventiveMaintenance', label: t('preventiveMaintenance'), format: (v: number) => `$${v}` },
                          { key: 'correctiveMaintenance', label: t('correctiveMaintenance'), format: (v: number) => `$${v}` }
                        ].map((spec) => (
                          <tr key={spec.key} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                              {spec.label}
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center font-medium">
                                {spec.format(machine[spec.key as keyof MachineSpec] as number)}
                              </td>
                            ))}
                          </tr>
                        ))}
                        {/* Fuel Price Row */}
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                            <div className="flex items-center gap-2">
                              <span>Diesel (USD/L)</span>
                              <Input
                                type="number"
                                className="h-6 w-20 text-right"
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
                            const price = machine.price ?? 0;
                            const fuelConsumption = machine.fuelConsumption ?? 0;
                            const usageTime = machine.usageTime ?? 0;
                            const preventiveMaintenance = machine.preventiveMaintenance ?? 0;
                            const correctiveMaintenance = machine.correctiveMaintenance ?? 0;
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

                {/* USP Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Propuestas de Valor Único (USP)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-bomag-light-gray">
                          <th className="border border-gray-300 p-2 text-left">USP</th>
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
                          { key: 'usp3', label: 'USP 3 - Confort y Seguridad' },
                          { key: 'usp4', label: 'USP 4 - Compactación Eficiente' },
                          { key: 'usp5', label: 'USP 5 - Mantenimiento' }
                        ].map((spec) => (
                          <tr key={spec.key} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                              {spec.label}
                            </td>
                            {getSelectedMachineData().map((machine, index) => (
                              <td key={index} className="border border-gray-300 p-2 text-center">
                                {machine[spec.key as keyof MachineSpec] && typeof machine[spec.key as keyof MachineSpec] === 'object'
                                  ? (machine[spec.key as keyof MachineSpec] as any)[language] || '-'
                                  : '-'
                                }
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {(selectedLine === 'sdr' || selectedLine === 'ltr') && machines.some(m => m.tcoTimeline) && (
                <TabsContent value="tco-timeline" className="mt-4">
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
                            const tco0 = editableTCO[index] !== undefined
                              ? editableTCO[index]
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
                                const tco0 = editableTCO[index] !== undefined
                                  ? editableTCO[index]
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
                                          setEditableTCO(prev => ({ ...prev, [index]: isNaN(value) ? 0 : value }));
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