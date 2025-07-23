import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sdrMachines, MachineSpec } from '@/data/machineData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MachineComparisonProps {
  selectedLine: string;
}

const MachineComparison = ({ selectedLine }: MachineComparisonProps) => {
  const { t } = useLanguage();
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
  
  const machines = selectedLine === 'sdr' ? sdrMachines : [];

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
      'JCB': 'bg-yellow-600'
    };
    return colors[brand as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-bomag-gray">
          {selectedLine.toUpperCase()} - {t('specifications')}
        </h3>
        <div className="text-sm text-gray-600">
          {selectedMachines.length} máquinas seleccionadas para comparar
        </div>
      </div>

      {/* Machine Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {machines.map((machine, index) => (
          <Card key={index} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge className={`${getBrandColor(machine.brand)} text-white`}>
                  {machine.brand}
                </Badge>
                <Checkbox
                  checked={selectedMachines.includes(index.toString())}
                  onCheckedChange={() => toggleMachineSelection(index.toString())}
                />
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
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('price')}:</span>
                  <span className="font-medium text-bomag-orange">{formatCurrency(machine.price)}</span>
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
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="performance">{t('performance')}</TabsTrigger>
                <TabsTrigger value="costs">Costos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="mt-4">
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
                       {[
                         { key: 'weight', label: t('weight'), unit: 'kg' },
                         { key: 'engine', label: t('engine'), unit: '' },
                         { key: 'compactionWidth', label: t('compactionWidth'), unit: 'm' },
                         { key: 'power', label: t('power'), unit: 'HP' },
                         { key: 'amplitude', label: t('amplitude'), unit: 'mm' },
                         { key: 'staticLinearLoad', label: t('staticLinearLoad'), unit: 'Kg/cm' },
                         { key: 'gradeability', label: t('gradeability'), unit: '%' },
                         { key: 'origin', label: t('origin'), unit: '' }
                       ].map((spec) => (
                         <tr key={spec.key} className="hover:bg-gray-50">
                           <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                             {spec.label} {spec.unit && `(${spec.unit})`}
                           </td>
                           {getSelectedMachineData().map((machine, index) => (
                             <td key={index} className="border border-gray-300 p-2 text-center">
                               {spec.key === 'weight' 
                                 ? (machine.weight as number).toLocaleString()
                                 : String(machine[spec.key as keyof MachineSpec])
                               }
                             </td>
                           ))}
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="mt-4">
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
                      {[
                        { key: 'maxCompactionDepth', label: t('maxCompactionDepth'), unit: 'cm' },
                        { key: 'compactionPerformance', label: t('compactionPerformance'), unit: 'm³/h' },
                        { key: 'fuelConsumption', label: t('fuelConsumption'), unit: 'L/h' }
                      ].map((spec) => (
                        <tr key={spec.key} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                            {spec.label} ({spec.unit})
                          </td>
                          {getSelectedMachineData().map((machine, index) => (
                            <td key={index} className="border border-gray-300 p-2 text-center">
                              {machine[spec.key as keyof MachineSpec]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="costs" className="mt-4">
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
                        { key: 'correctiveMaintenance', label: t('correctiveMaintenance'), format: (v: number) => `$${v}` },
                        { key: 'tco', label: t('tco'), format: formatCurrency }
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
                    </tbody>
                  </table>
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