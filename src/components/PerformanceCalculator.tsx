import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { compactionHeightData, compactionPerformanceData, CompactionData } from '@/data/machineData';
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

  // Linear interpolation helpers for custom weight estimate
  const parseRange = (rangeStr: string) => {
    const parts = rangeStr.split(' – ').map(w => parseFloat(w.replace(/[^\d.]/g, '')));
    const min = parts[0];
    const max = parts[1] ?? parts[0];
    return { min, max };
  };

  const getInterpolatedValue = (rows: CompactionData[], weight: number, soilKey: keyof CompactionData): number | null => {
    if (!rows.length) return null;
    // Build sorted points by mid value of range
    const points = rows.map(r => {
      const { min, max } = parseRange(r.weightRange);
      const x = (min + max) / 2;
      const y = parseFloat(String(r[soilKey] || '').toString().replace(/[^\d.\-]/g, ''));
      return { x, y: isNaN(y) ? null : y };
    }).filter(p => p.y != null) as { x: number; y: number }[];
    points.sort((a, b) => a.x - b.x);
    if (!points.length) return null;
    if (weight <= points[0].x) return points[0].y;
    if (weight >= points[points.length - 1].x) return points[points.length - 1].y;
    // Find neighbors
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (weight >= a.x && weight <= b.x) {
        const t = (weight - a.x) / (b.x - a.x);
        return a.y + t * (b.y - a.y);
      }
    }
    return points[points.length - 1].y;
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
                  const w = parseFloat(customWeight);
                  if (isNaN(w)) return <div className="text-gray-500">Peso inválido</div>;
                  const height = getInterpolatedValue(compactionHeightData, w, selectedSoil as keyof CompactionData);
                  const perf = getInterpolatedValue(compactionPerformanceData, w, selectedSoil as keyof CompactionData);
                  if (height == null && perf == null) return <div className="text-gray-500">No se encontraron datos para este peso</div>;
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-sm text-gray-600">Altura de capa estimada</h5>
                        <div className="text-xl font-bold text-bomag-orange">
                          {height != null ? `${height.toFixed(2)} m` : '-'}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm text-gray-600">Rendimiento estimado</h5>
                        <div className="text-xl font-bold text-bomag-blue">
                          {perf != null ? `${perf.toFixed(0)} m³/h` : '-'}
                        </div>
                      </div>
                    </div>
                  );
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
                  {compactionPerformanceData.map((row, index) => (
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
      </div>
    </div>
  );
};

export default PerformanceCalculator;