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
      '116D.jpg','ASC110.jpg','XS123.jpg','SSR120C-10S.jpg','V110.jpg','CS11GC.jpg','HC110.jpg','CA25_D.jpg','BW211_D5_SL.jpg'
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
  const match = images[folder].find(img => norm(img).includes(modelNorm));
  return match ? `${base}images/${folder}/${match}` : `${base}placeholder.svg`;
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

  // Reset visible machines when line changes
  React.useEffect(() => {
    setVisibleMachines(machines.map((_, i) => i));
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
      </div>
    </div>
  );
} 