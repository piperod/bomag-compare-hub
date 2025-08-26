import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sdrMachines, ltrMachines } from '@/data/machineData';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LanguageProvider } from '@/contexts/LanguageContext';

const machineLines = [
  { key: 'sdr', label: 'SDR', machines: sdrMachines },
  { key: 'ltr', label: 'LTR', machines: ltrMachines },
  // Add HTR if you have it in data
];

const summaryFields = [
  { key: 'brand', labelKey: 'brand' },
  { key: 'model', labelKey: 'model' },
  { key: 'line', labelKey: 'productLine' },
  { key: 'weight', labelKey: 'weight', format: v => v + ' kg' },
  { key: 'engine', labelKey: 'engine' },
  { key: 'materialNumber', labelKey: 'materialNumber' },
  { key: 'compactionWidth', labelKey: 'compactionWidth', format: v => v + ' m' },
  { key: 'power', labelKey: 'power', format: v => v + ' HP' },
  { key: 'amplitude', labelKey: 'amplitude' },
  { key: 'staticLinearLoad', labelKey: 'staticLinearLoad', format: v => v + ' Kg/cm' },
  { key: 'gradeability', labelKey: 'gradeability', format: v => v + ' %' },
  { key: 'origin', labelKey: 'origin', multilanguage: true },
  { key: 'compactionAssistant', labelKey: 'compactionAssistant', multilanguage: true },
  { key: 'telemetry', labelKey: 'telemetry', multilanguage: true },
  { key: 'innovations', labelKey: 'innovations', multilanguage: true },
  { key: 'usp', labelKey: 'usp', multilanguage: true },
  { key: 'maxCompactionDepth', labelKey: 'maxCompactionDepth', format: v => v ? v + ' cm' : '-' },
  { key: 'compactionPerformance', labelKey: 'compactionPerformance' },
  // Editable diesel price per machine (USD per liter)
  { key: 'dieselPrice', labelKey: 'dieselPrice', format: v => '$' + v },
  { key: 'fuelConsumption', labelKey: 'fuelConsumption', format: v => v + ' L/h' },
  { key: 'price', labelKey: 'price', format: v => '$' + v.toLocaleString() },
  { key: 'preventiveMaintenance', labelKey: 'preventiveMaintenance', format: v => '$' + v },
  { key: 'correctiveMaintenance', labelKey: 'correctiveMaintenance', format: v => '$' + v },
  { key: 'usageTime', labelKey: 'usageTime', format: v => v + ' h' },
  { key: 'tco', labelKey: 'tco', format: v => '$' + v.toLocaleString() },
  // Calculated fields appended later: timeEstimated and costByTime
];

function getImagePath(model: string, line: string) {
  const base = import.meta.env.BASE_URL;
  const folder = line === 'SDR' ? 'SDR' : line === 'LTR' ? 'LTR' : line === 'HTR' ? 'HTR' : '';
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
}

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

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export default function SummaryPage() {
  return (
    <LanguageProvider>
      <Summary />
    </LanguageProvider>
  );
}

function Summary() {
  const { t, language } = useLanguage();
  const [selectedLine, setSelectedLine] = useState('sdr');
  const machines = machineLines.find(l => l.key === selectedLine)?.machines || [];
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
  const [visibleMachines, setVisibleMachines] = useState(machinesSorted.map((_, i) => i));
  const [visibleFields, setVisibleFields] = useState(summaryFields.map((_, i) => i));
  // Add state for editable fields per machine
  const [editableFields, setEditableFields] = useState<{ [key: number]: { price?: number; preventiveMaintenance?: number; correctiveMaintenance?: number; usageTime?: number } }>({});
  const [editableTCO, setEditableTCO] = useState<{ [key: number]: number }>({});
  const [surfaceVolumeM3, setSurfaceVolumeM3] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('surfaceVolumeM3');
      const num = saved ? parseFloat(saved) : 0;
      return isNaN(num) ? 0 : num;
    }
    return 0;
  });
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [lengthM, setLengthM] = useState<string>('');
  const [widthM, setWidthM] = useState<string>('');
  const [heightM, setHeightM] = useState<string>('');

  React.useEffect(() => {
    setVisibleMachines(machinesSorted.map((_, i) => i));
    setVisibleFields(summaryFields.map((_, i) => i));
    // Prefill dieselPrice with 1.2 so the inputs show a value
    const initFields: { [key: number]: { [k: string]: number } } = {};
    machinesSorted.forEach((_, i) => {
      initFields[i] = { dieselPrice: 1.2 };
    });
    setEditableFields(initFields);
    setEditableTCO({});
  }, [selectedLine, machinesSorted.length]);

  React.useEffect(() => {
    const handler = () => {
      const saved = localStorage.getItem('surfaceVolumeM3');
      const num = saved ? parseFloat(saved) : 0;
      setSurfaceVolumeM3(isNaN(num) ? 0 : num);
    };
    handler();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Defensive: filter out indices that are out of bounds
  const safeVisibleMachines = visibleMachines.filter(i => machinesSorted[i]);

  const removeMachine = (idx: number) => {
    setVisibleMachines(v => v.filter(i => i !== idx));
  };
  const removeField = (idx: number) => {
    setVisibleFields(v => v.filter(i => i !== idx));
  };
  const restoreAll = () => {
    setVisibleMachines(machines.map((_, i) => i));
    setVisibleFields(summaryFields.map((_, i) => i));
  };

  // Helper to get the current value (edited or original)
  const getFieldValue = (mIdx: number, key: string) => {
    if (editableFields[mIdx] && editableFields[mIdx][key] !== undefined) {
      return editableFields[mIdx][key];
    }
    return machines[mIdx][key];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{t('globalSummary')}</h2>
            <button onClick={restoreAll} className="bg-bomag-yellow text-black px-3 py-1 rounded font-semibold shadow hover:bg-bomag-orange/80">{t('restoreAll') || 'Restore All'}</button>
          </div>
          <Tabs defaultValue={selectedLine} onValueChange={setSelectedLine} className="mb-4">
            <TabsList>
              {machineLines.map(line => (
                <TabsTrigger key={line.key} value={line.key}>{line.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-bomag-light-gray">
                  <th className="border border-gray-300 p-2 text-left sticky left-0 bg-bomag-light-gray z-10">{t('specifications')}</th>
                  {safeVisibleMachines.map(idx => (
                    <th key={idx} className="border border-gray-300 p-2 text-center min-w-40 relative">
                      <button onClick={() => removeMachine(idx)} className="absolute top-1 right-1 text-lg text-gray-400 hover:text-red-500 font-bold z-20" title="Remove">×</button>
                      <div className="flex flex-col items-center">
                        <img src={getImagePath(machinesSorted[idx].model, machinesSorted[idx].line || selectedLine.toUpperCase())} alt={machinesSorted[idx].model} className="h-16 object-contain mb-1" />
                        <div className="font-bold">{machinesSorted[idx].brand}</div>
                        <div className="text-xs">{machinesSorted[idx].model}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleFields.map(fIdx => {
                  const field = summaryFields[fIdx];
                  return (
                    <tr key={field.key} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 font-medium bg-gray-50 sticky left-0 bg-bomag-light-gray z-10 relative">
                        {t(field.labelKey)}
                        <button onClick={() => removeField(fIdx)} className="absolute top-1 right-1 text-lg text-gray-400 hover:text-red-500 font-bold z-20" title="Remove">×</button>
                      </td>
                      {safeVisibleMachines.map(mIdx => {
                        // Editable fields
                        if (["price", "preventiveMaintenance", "correctiveMaintenance", "usageTime", "dieselPrice"].includes(field.key)) {
                          const val = getFieldValue(mIdx, field.key);
                          return (
                            <td key={mIdx} className="border border-gray-300 p-2 text-center">
                              <input
                                type="number"
                                className="border rounded px-2 py-1 w-20 text-right"
                                value={val === undefined || val === null ? '' : val}
                                onChange={e => {
                                  const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                  setEditableFields(prev => ({
                                    ...prev,
                                    [mIdx]: {
                                      ...prev[mIdx],
                                      [field.key]: isNaN(value) ? 0 : value
                                    }
                                  }));
                                }}
                              />
                            </td>
                          );
                        }
                        // TCO field: show calculated value
                        if (field.key === "tco") {
                          // TCO = price + usageTime * fuelConsumption * dieselPrice + usageTime * (preventiveMaintenance + correctiveMaintenance)
                          const price = getFieldValue(mIdx, "price") ?? 0;
                          const usageTime = getFieldValue(mIdx, "usageTime") ?? 0;
                          const fuel = machinesSorted[mIdx].fuelConsumption ?? 0;
                          const dieselPrice = getFieldValue(mIdx, "dieselPrice") ?? 1.2;
                          const pm = getFieldValue(mIdx, "preventiveMaintenance") ?? 0;
                          const cm = getFieldValue(mIdx, "correctiveMaintenance") ?? 0;
                          const tco = price + usageTime * (fuel * dieselPrice + pm + cm);
                          // Gather all TCOs for this row
                          const tcos = safeVisibleMachines.map(idx => {
                            const p = getFieldValue(idx, "price") ?? 0;
                            const ut = getFieldValue(idx, "usageTime") ?? 0;
                            const f = machinesSorted[idx].fuelConsumption ?? 0;
                            const dp = getFieldValue(idx, "dieselPrice") ?? 1.2;
                            const pM = getFieldValue(idx, "preventiveMaintenance") ?? 0;
                            const cM = getFieldValue(idx, "correctiveMaintenance") ?? 0;
                            return p + ut * (f * dp + pM + cM);
                          });
                          const min = Math.min(...tcos);
                          const max = Math.max(...tcos);
                          return (
                            <td key={mIdx} className="border border-gray-300 p-2 text-center font-bold bg-yellow-50">
                              <span style={{ background: getPriceColor(tco, min, max), borderRadius: 4, padding: '2px 4px' }}>{formatCurrency(tco)}</span>
                            </td>
                          );
                        }
                        // Default rendering
                        let value = machinesSorted[mIdx][field.key];
                        if (field.multilanguage && value && typeof value === 'object') {
                          value = value[language] || value['es'] || '-';
                        }
                        if (field.format && value !== undefined && value !== null) {
                          value = field.format(value);
                        }
                        return <td key={mIdx} className="border border-gray-300 p-2 text-center whitespace-pre-line">{value || '-'}</td>;
                      })}
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        </Card>
        {/* Performance Comparison by Volume Section */}
        {safeVisibleMachines.length > 0 && (
          <Card className="p-4 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Comparación de rendimiento por volumen</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="surface-volume" className="text-xs text-gray-600">Volumen (m³)</Label>
                  <Input
                    id="surface-volume"
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
                <Dialog open={isCalcOpen} onOpenChange={setIsCalcOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-bomag-yellow text-black hover:bg-bomag-orange/90">Calcular Rendimiento</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Calcular volumen de superficie</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="length-m">Largo (m)</Label>
                        <Input id="length-m" type="number" value={lengthM} onChange={(e) => setLengthM(e.target.value)} placeholder="Ej: 100" />
                      </div>
                      <div>
                        <Label htmlFor="width-m">Ancho (m)</Label>
                        <Input id="width-m" type="number" value={widthM} onChange={(e) => setWidthM(e.target.value)} placeholder="Ej: 50" />
                      </div>
                      <div>
                        <Label htmlFor="height-m">Altura (m)</Label>
                        <Input id="height-m" type="number" value={heightM} onChange={(e) => setHeightM(e.target.value)} placeholder="Ej: 0.3" />
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">Resultado (m³): <span className="font-semibold">{(() => {
                      const L = parseFloat(lengthM);
                      const W = parseFloat(widthM);
                      const H = parseFloat(heightM);
                      const vol = !isNaN(L) && !isNaN(W) && !isNaN(H) ? L * W * H : 0;
                      return vol.toFixed(2);
                    })()}</span></div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="secondary"
                        onClick={() => setIsCalcOpen(false)}
                      >Cerrar</Button>
                      <Button
                        onClick={() => {
                          const L = parseFloat(lengthM);
                          const W = parseFloat(widthM);
                          const H = parseFloat(heightM);
                          const vol = !isNaN(L) && !isNaN(W) && !isNaN(H) ? L * W * H : 0;
                          const val = isFinite(vol) ? parseFloat(vol.toFixed(2)) : 0;
                          setSurfaceVolumeM3(val);
                          if (typeof window !== 'undefined') {
                            localStorage.setItem('surfaceVolumeM3', String(val));
                          }
                          setIsCalcOpen(false);
                        }}
                        className="bg-bomag-yellow text-black hover:bg-bomag-orange/90"
                      >Calcular</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-bomag-light-gray">
                    <th className="border border-gray-300 p-2 text-left sticky left-0 bg-bomag-light-gray z-10">Rendimiento</th>
                    {safeVisibleMachines.map(idx => (
                      <th key={idx} className="border border-gray-300 p-2 text-center min-w-40">
                        <div className="font-bold">{machinesSorted[idx].brand}</div>
                        <div className="text-xs">{machinesSorted[idx].model}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 font-medium bg-gray-50 sticky left-0 bg-bomag-light-gray z-10">
                      {t('timeEstimated')}
                    </td>
                    {safeVisibleMachines.map(mIdx => {
                      const machine = machinesSorted[mIdx];
                      // compactionPerformance like "220 - 350" or "200"
                      const perfRaw = machine.compactionPerformance || '';
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
                      const hours = perfAvg > 0 && surfaceVolumeM3 > 0 ? surfaceVolumeM3 / perfAvg : 0;
                      return (
                        <td key={mIdx} className="border border-gray-300 p-2 text-center font-semibold">{hours > 0 ? hours.toFixed(2) : '-'}</td>
                      );
                    })}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 font-medium bg-gray-50 sticky left-0 bg-bomag-light-gray z-10">
                      {t('costBasedOnEstimatedTime')}
                    </td>
                    {safeVisibleMachines.map(mIdx => {
                      const machine = machinesSorted[mIdx];
                      const perfRaw = machine.compactionPerformance || '';
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
                      const hours = perfAvg > 0 && surfaceVolumeM3 > 0 ? surfaceVolumeM3 / perfAvg : 0;
                      // Cost/hour approximation using fuel + maint only (no operator): fuelConsumption*dieselPrice + pm + cm
                      const dieselPrice = (editableFields[mIdx]?.dieselPrice ?? 1.2) as number;
                      const pm = (editableFields[mIdx]?.preventiveMaintenance ?? machinesSorted[mIdx].preventiveMaintenance ?? 0) as number;
                      const cm = (editableFields[mIdx]?.correctiveMaintenance ?? machinesSorted[mIdx].correctiveMaintenance ?? 0) as number;
                      const fuel = machine.fuelConsumption ?? 0;
                      const costPerHour = fuel * dieselPrice + pm + cm;
                      const totalCost = hours * costPerHour;
                      return (
                        <td key={mIdx} className="border border-gray-300 p-2 text-center font-bold bg-yellow-50">{hours > 0 ? formatCurrency(totalCost) : '-'}</td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}
        {/* TCO Timeline Table */}
        {safeVisibleMachines.length > 0 && machinesSorted.some(m => m.tcoTimeline) && (
          <Card className="p-4 mt-8">
            <h3 className="text-lg font-bold mb-2">{t('tcoTimeline') || 'TCO Timeline'}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-bomag-light-gray">
                    <th className="border border-gray-300 p-2 text-left sticky left-0 bg-bomag-light-gray z-10">Horas</th>
                    {safeVisibleMachines.map(idx => (
                      <th key={idx} className="border border-gray-300 p-2 text-center min-w-40">
                        <div className="font-bold">{machinesSorted[idx].brand}</div>
                        <div className="text-xs">{machinesSorted[idx].model}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[0, 1000, 1500, 2000, 2500, 3000].map(hours => {
                    // Gather all TCOs for this row
                    const tcos = safeVisibleMachines.map(idx => {
                      const price = getFieldValue(idx, "price") ?? 0;
                      const pm = getFieldValue(idx, "preventiveMaintenance") ?? 0;
                      const cm = getFieldValue(idx, "correctiveMaintenance") ?? 0;
                      const usageTime = getFieldValue(idx, "usageTime") ?? 0;
                      const fuel = machinesSorted[idx].fuelConsumption ?? 0;
                      const dp = getFieldValue(idx, "dieselPrice") ?? 1.2;
                      const fuelCost = hours * fuel * dp;
                      const variableCost = hours * (pm + cm);
                      const base0 = editableTCO[idx] !== undefined ? editableTCO[idx] : price;
                      const tco = (hours === 0) ? base0 : price + fuelCost + variableCost;
                      return tco;
                    });
                    const min = Math.min(...tcos);
                    const max = Math.max(...tcos);
                    return (
                      <tr key={hours} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2 font-medium bg-gray-50 sticky left-0 bg-bomag-light-gray z-10">{hours}</td>
                        {safeVisibleMachines.map((idx, i) => {
                          // Use edited values for price, pm, cm, usageTime
                          const price = getFieldValue(idx, "price") ?? 0;
                          const pm = getFieldValue(idx, "preventiveMaintenance") ?? 0;
                          const cm = getFieldValue(idx, "correctiveMaintenance") ?? 0;
                          const usageTime = getFieldValue(idx, "usageTime") ?? 0;
                          const fuel = machinesSorted[idx].fuelConsumption ?? 0;
                          const dp = getFieldValue(idx, "dieselPrice") ?? 1.2;
                          const fuelCost = hours * fuel * dp;
                          const variableCost = hours * (pm + cm);
                          const base0 = editableTCO[idx] !== undefined ? editableTCO[idx] : price;
                          const tco = (hours === 0) ? base0 : price + fuelCost + variableCost;
                          return (
                            <td key={idx} className="border border-gray-300 p-2 text-center">
                              {hours === 0 ? (
                                <input
                                  type="number"
                                  className="border rounded px-2 py-1 w-24 text-right"
                                  value={tco}
                                  onChange={e => {
                                    const value = parseFloat(e.target.value);
                                    setEditableTCO(prev => ({ ...prev, [idx]: isNaN(value) ? 0 : value }));
                                  }}
                                />
                              ) : (
                                <div>
                                  <div style={{ background: getPriceColor(tco, min, max), borderRadius: 4, padding: '2px 4px', display: 'inline-block' }}>
                                    {t('tco') || 'TCO'}: {formatCurrency(tco)}
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
          </Card>
        )}
      </div>
    </div>
  );
} 