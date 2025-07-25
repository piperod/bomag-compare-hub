import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sdrMachines, ltrMachines } from '@/data/machineData';
import React from 'react';
import { Card } from '@/components/ui/card';
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
  { key: 'fuelConsumption', labelKey: 'fuelConsumption', format: v => v + ' L/h' },
  { key: 'price', labelKey: 'price', format: v => '$' + v.toLocaleString() },
  { key: 'preventiveMaintenance', labelKey: 'preventiveMaintenance', format: v => '$' + v },
  { key: 'correctiveMaintenance', labelKey: 'correctiveMaintenance', format: v => '$' + v },
  { key: 'usageTime', labelKey: 'usageTime', format: v => v + ' h' },
  { key: 'tco', labelKey: 'tco', format: v => '$' + v.toLocaleString() },
];

function getImagePath(model: string, line: string) {
  const base = import.meta.env.BASE_URL;
  const folder = line === 'SDR' ? 'SDR' : line === 'LTR' ? 'LTR' : line === 'HTR' ? 'HTR' : '';
  if (!folder) return base + 'placeholder.svg';
  const images = {
    SDR: [
      '116D.jpg','ASC110.jpg','XS123.jpg','SSR120C-10S.jpg','V110.jpg','CS11GC.jpg','HC110.jpg','CA25_D.jpg','CA25DRhino.jpg','BW211_D5_SL.jpg'
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
  return match ? `${base}images/${folder}/${match}` : `${base}placeholder.svg`;
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
  const [visibleMachines, setVisibleMachines] = useState(machines.map((_, i) => i));
  const [visibleFields, setVisibleFields] = useState(summaryFields.map((_, i) => i));
  // Add state for editable fields per machine
  const [editableFields, setEditableFields] = useState<{ [key: number]: { price?: number; preventiveMaintenance?: number; correctiveMaintenance?: number; usageTime?: number } }>({});
  const [editableTCO, setEditableTCO] = useState<{ [key: number]: number }>({});

  React.useEffect(() => {
    setVisibleMachines(machines.map((_, i) => i));
    setVisibleFields(summaryFields.map((_, i) => i));
    setEditableFields({});
    setEditableTCO({});
  }, [selectedLine, machines.length]);

  // Defensive: filter out indices that are out of bounds
  const safeVisibleMachines = visibleMachines.filter(i => machines[i]);

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
                        <img src={getImagePath(machines[idx].model, machines[idx].line || selectedLine.toUpperCase())} alt={machines[idx].model} className="h-16 object-contain mb-1" />
                        <div className="font-bold">{machines[idx].brand}</div>
                        <div className="text-xs">{machines[idx].model}</div>
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
                        if (["price", "preventiveMaintenance", "correctiveMaintenance", "usageTime"].includes(field.key)) {
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
                          // TCO = price + usageTime * (fuelConsumption + preventiveMaintenance + correctiveMaintenance)
                          const price = getFieldValue(mIdx, "price") ?? 0;
                          const usageTime = getFieldValue(mIdx, "usageTime") ?? 0;
                          const fuel = machines[mIdx].fuelConsumption ?? 0;
                          const pm = getFieldValue(mIdx, "preventiveMaintenance") ?? 0;
                          const cm = getFieldValue(mIdx, "correctiveMaintenance") ?? 0;
                          const tco = price + usageTime * (fuel + pm + cm);
                          // Gather all TCOs for this row
                          const tcos = safeVisibleMachines.map(idx => {
                            const p = getFieldValue(idx, "price") ?? 0;
                            const ut = getFieldValue(idx, "usageTime") ?? 0;
                            const f = machines[idx].fuelConsumption ?? 0;
                            const pM = getFieldValue(idx, "preventiveMaintenance") ?? 0;
                            const cM = getFieldValue(idx, "correctiveMaintenance") ?? 0;
                            return p + ut * (f + pM + cM);
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
                        let value = machines[mIdx][field.key];
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
        {/* TCO Timeline Table */}
        {safeVisibleMachines.length > 0 && machines.some(m => m.tcoTimeline) && (
          <Card className="p-4 mt-8">
            <h3 className="text-lg font-bold mb-2">{t('tcoTimeline') || 'TCO Timeline'}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-bomag-light-gray">
                    <th className="border border-gray-300 p-2 text-left sticky left-0 bg-bomag-light-gray z-10">Horas</th>
                    {safeVisibleMachines.map(idx => (
                      <th key={idx} className="border border-gray-300 p-2 text-center min-w-40">
                        <div className="font-bold">{machines[idx].brand}</div>
                        <div className="text-xs">{machines[idx].model}</div>
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
                      const fuel = machines[idx].fuelConsumption ?? 0;
                      let tco = 0;
                      if (hours === 0) {
                        tco = editableTCO[idx] !== undefined ? editableTCO[idx] : price + 0 * (fuel + pm + cm);
                      } else {
                        tco = price + hours * (fuel + pm + cm);
                      }
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
                          const fuel = machines[idx].fuelConsumption ?? 0;
                          let tco = 0;
                          if (hours === 0) {
                            tco = editableTCO[idx] !== undefined ? editableTCO[idx] : price + 0 * (fuel + pm + cm);
                          } else {
                            tco = price + hours * (fuel + pm + cm);
                          }
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