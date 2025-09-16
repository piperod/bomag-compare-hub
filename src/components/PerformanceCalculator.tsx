import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { compactionHeightData, compactionPerformanceData, CompactionData } from '@/data/machineData';
import { correctedPerformanceData, interpolatePerformance, getPerformanceRange, getWeightRanges, SoilType } from '@/data/correctedPerformanceData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PerformanceCalculator = () => {
  const { t } = useLanguage();
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [selectedSoil, setSelectedSoil] = useState<string>('');
  const [customWeight, setCustomWeight] = useState<string>('');

  const soilTypes = [
    { key: 'rock', label: t('rock') },
    { key: 'gravel', label: t('gravel') },
    { key: 'mixedSoil', label: t('mixedSoil') },
    { key: 'clay', label: t('clay') }
  ];

  const getPerformanceData = (data: CompactionData[], weight: string, soil: string) => {
    const weightData = data.find(item => item.weightRange === weight);
    if (!weightData) return '-';
    return weightData[soil as keyof CompactionData] || '-';
  };

  const getRecommendationForCustomWeight = (weight: number) => {
    // Find the closest weight range for custom input
    const weightRanges = compactionHeightData.map(item => {
      const range = item.weightRange.split(' – ').map(w => parseFloat(w.replace(/[^\d.]/g, '')));
      return {
        range: item.weightRange,
        min: range[0],
        max: range[1] || range[0],
        data: item
      };
    });

    const matchingRange = weightRanges.find(r => weight >= r.min && weight <= r.max);
    return matchingRange?.data || null;
  };

  const getInterpolatedPerformance = (weight: number, soilType: string): number | null => {
    return interpolatePerformance(weight, soilType as SoilType);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🧮</span>
            <span>{t('calculator')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="weight-select">{t('operatingWeight')}</Label>
              <Select value={selectedWeight} onValueChange={setSelectedWeight}>
                <SelectTrigger id="weight-select">
                  <SelectValue placeholder="Seleccionar rango de peso" />
                </SelectTrigger>
                <SelectContent>
                  {compactionHeightData.map((item, index) => (
                    <SelectItem key={index} value={item.weightRange}>
                      {item.weightRange} t
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="soil-select">{t('soilType')}</Label>
              <Select value={selectedSoil} onValueChange={setSelectedSoil}>
                <SelectTrigger id="soil-select">
                  <SelectValue placeholder="Seleccionar tipo de suelo" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.key} value={soil.key}>
                      {soil.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="custom-weight">Peso personalizado (t)</Label>
              <Input
                id="custom-weight"
                type="number"
                value={customWeight}
                onChange={(e) => setCustomWeight(e.target.value)}
                placeholder="Ej: 11.5"
              />
            </div>
          </div>

          {(selectedWeight && selectedSoil) && (
            <Card className="bg-bomag-light-gray">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-bomag-gray mb-2">
                      Altura de capa compactada
                    </h4>
                    <div className="text-2xl font-bold text-bomag-orange">
                      {getPerformanceData(compactionHeightData, selectedWeight, selectedSoil)} m
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-bomag-gray mb-2">
                      Rendimiento de compactación
                    </h4>
                    <div className="text-2xl font-bold text-bomag-blue">
                      {getPerformanceData(compactionPerformanceData, selectedWeight, selectedSoil)} m³/h
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {customWeight && selectedSoil && (
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-bomag-gray mb-4">
                  Recomendación para {customWeight}t
                </h4>
                {(() => {
                  const weight = parseFloat(customWeight);
                  const recommendation = getRecommendationForCustomWeight(weight);
                  const interpolatedPerf = getInterpolatedPerformance(weight, selectedSoil);
                  
                  if (recommendation || interpolatedPerf) {
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm text-gray-600">
                            Altura de capa {recommendation ? `(basado en rango ${recommendation.weightRange}t)` : '(estimado)'}
                          </h5>
                          <div className="text-xl font-bold text-bomag-orange">
                            {recommendation ? recommendation[selectedSoil as keyof CompactionData] : 'N/A'} m
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm text-gray-600">
                            Rendimiento de compactación
                          </h5>
                          <div className="text-xl font-bold text-bomag-blue">
                            {interpolatedPerf ? `${interpolatedPerf} m³/h` : 'N/A'}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return <div className="text-gray-500">No se encontraron datos para este peso</div>;
                })()}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('compactionHeight')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-bomag-light-gray">
                    <th className="border border-gray-300 p-2">{t('operatingWeight')}</th>
                    <th className="border border-gray-300 p-2">{t('rock')}</th>
                    <th className="border border-gray-300 p-2">{t('gravel')}</th>
                    <th className="border border-gray-300 p-2">{t('mixedSoil')}</th>
                    <th className="border border-gray-300 p-2">{t('clay')}</th>
                  </tr>
                </thead>
                <tbody>
                  {compactionHeightData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 font-medium">{row.weightRange}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.rock}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.gravel}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.mixedSoil}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.clay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('compactionOutput')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-bomag-light-gray">
                    <th className="border border-gray-300 p-2">{t('operatingWeight')}</th>
                    <th className="border border-gray-300 p-2">{t('rock')}</th>
                    <th className="border border-gray-300 p-2">{t('gravel')}</th>
                    <th className="border border-gray-300 p-2">{t('mixedSoil')}</th>
                    <th className="border border-gray-300 p-2">{t('clay')}</th>
                  </tr>
                </thead>
                <tbody>
                  {correctedPerformanceData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 font-medium">{row.weightMin} - {row.weightMax}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        {row.rock ? `${row.rock.min} - ${row.rock.max}` : '-'}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">{row.gravel.min} - {row.gravel.max}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.mixedSoil.min} - {row.mixedSoil.max}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.clay.min} - {row.clay.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceCalculator;