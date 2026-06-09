import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { CompareTable } from '@/components/CompareTable';

const STORAGE_KEYS = {
  technicianRate: 'aj_technicianRate',
  machineIdleRate: 'aj_machineIdleRate',
  greaseCostPerIntervention: 'aj_greaseCostPerIntervention',
} as const;

export default function ArticulationJointCostAnalysis({
  show,
  operationTime,
  competitorHasMaintenanceFreeJoint,
  bomagHasMaintenanceFreeJoint,
}: {
  show: boolean;
  operationTime: number;
  competitorHasMaintenanceFreeJoint: boolean;
  bomagHasMaintenanceFreeJoint: boolean;
}) {
  const { t } = useLanguage();
  const {
    formatFromUsd,
    currency,
    isZeroDecimal,
    usdToInputNumber,
    inputNumberToUsd,
  } = useCurrency();
  const ccy = { currency };

  const [technicianRate, setTechnicianRate] = useState<number>(() => {
    if (typeof window === 'undefined') return 35;
    const raw = localStorage.getItem(STORAGE_KEYS.technicianRate);
    const num = raw ? parseFloat(raw) : 35;
    return isNaN(num) ? 35 : num;
  });
  const [machineIdleRate, setMachineIdleRate] = useState<number>(() => {
    if (typeof window === 'undefined') return 120;
    const raw = localStorage.getItem(STORAGE_KEYS.machineIdleRate);
    const num = raw ? parseFloat(raw) : 120;
    return isNaN(num) ? 120 : num;
  });
  const [greaseCostPerIntervention, setGreaseCostPerIntervention] = useState<number>(() => {
    if (typeof window === 'undefined') return 15;
    const raw = localStorage.getItem(STORAGE_KEYS.greaseCostPerIntervention);
    const num = raw ? parseFloat(raw) : 15;
    return isNaN(num) ? 15 : num;
  });

  const fmtHourly = (usd: number) =>
    formatFromUsd(usd, {
      minimumFractionDigits: 0,
      maximumFractionDigits: isZeroDecimal ? 0 : 2,
    });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.technicianRate, String(technicianRate));
  }, [technicianRate]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.machineIdleRate, String(machineIdleRate));
  }, [machineIdleRate]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.greaseCostPerIntervention, String(greaseCostPerIntervention));
  }, [greaseCostPerIntervention]);

  // Reference assumptions from the provided BOMAG table:
  // - Competitor greasing: every 50 hours (or weekly) => we model with 50 h interval.
  // - Time required per greasing: 30 minutes => 0.5 h downtime per intervention.
  const computeCosts = (hasMaintenanceFreeJoint: boolean) => {
    if (hasMaintenanceFreeJoint) {
      return {
        unproductiveHours: 0,
        laborCost: 0,
        suppliesCost: 0,
        productivityLostCost: 0,
        totalCost: 0,
      };
    }

    const interventions = operationTime / 50;
    const unproductiveHours = interventions * 0.5;
    const laborCost = unproductiveHours * technicianRate;
    const suppliesCost = interventions * greaseCostPerIntervention;
    const productivityLostCost = unproductiveHours * machineIdleRate;
    const totalCost = laborCost + suppliesCost + productivityLostCost;

    return { unproductiveHours, laborCost, suppliesCost, productivityLostCost, totalCost };
  };

  const competitor = computeCosts(competitorHasMaintenanceFreeJoint);
  const bomag = computeCosts(bomagHasMaintenanceFreeJoint);

  const savingsTotal = competitor.totalCost - bomag.totalCost;

  if (!show) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-lg font-semibold text-gray-700">{t('articulationJointTitle')}</h4>
        <span className="shrink-0 rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-900 border border-green-300">
          {t('maintenanceFreePill')}
        </span>
      </div>

      {/* Parameters */}
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="space-y-5">
            <div>
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {t('operationParameters')}
              </div>
              <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="min-w-[220px] text-sm font-semibold text-gray-700">
                      {t('operationTimeToAnalyze')}
                    </Label>
                    <div className="w-20 text-right text-sm font-bold tabular-nums text-gray-900">
                      {Math.round(operationTime).toLocaleString()} h
                    </div>
                  </div>

                <div className="flex items-center gap-4">
                  <Label className="min-w-[220px] text-sm font-semibold text-gray-700">
                    {t('technicianRateLabel', ccy)}
                  </Label>
                  <div className="flex-1">
                    <Slider
                      value={[usdToInputNumber(technicianRate, 'hourlyRate')]}
                      min={0}
                      max={usdToInputNumber(200, 'hourlyRate')}
                      step={isZeroDecimal ? 1 : 1}
                      onValueChange={(v) =>
                        setTechnicianRate(inputNumberToUsd(v[0] ?? 0, 'hourlyRate'))
                      }
                    />
                  </div>
                  <div className="w-20 text-right text-sm font-bold tabular-nums text-gray-900">
                    {fmtHourly(technicianRate)}/h
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label className="min-w-[220px] text-sm font-semibold text-gray-700">
                    {t('machineIdleRateLabel', ccy)}
                  </Label>
                  <div className="flex-1">
                    <Slider
                      value={[usdToInputNumber(machineIdleRate, 'hourlyRate')]}
                      min={0}
                      max={usdToInputNumber(300, 'hourlyRate')}
                      step={isZeroDecimal ? 1 : 5}
                      onValueChange={(v) =>
                        setMachineIdleRate(inputNumberToUsd(v[0] ?? 0, 'hourlyRate'))
                      }
                    />
                  </div>
                  <div className="w-20 text-right text-sm font-bold tabular-nums text-gray-900">
                    {fmtHourly(machineIdleRate)}/h
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label className="min-w-[220px] text-sm font-semibold text-gray-700">
                    {t('greaseCostPerInterventionLabel', ccy)}
                  </Label>
                  <div className="flex-1">
                    <Slider
                      value={[usdToInputNumber(greaseCostPerIntervention, 'aggregate')]}
                      min={0}
                      max={usdToInputNumber(100, 'aggregate')}
                      step={isZeroDecimal ? 1 : 1}
                      onValueChange={(v) =>
                        setGreaseCostPerIntervention(inputNumberToUsd(v[0] ?? 0, 'aggregate'))
                      }
                    />
                  </div>
                  <div className="w-20 text-right text-sm font-bold tabular-nums text-gray-900">
                    {formatFromUsd(greaseCostPerIntervention, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: isZeroDecimal ? 0 : 2,
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-red-500 tabular-nums">
                  {Math.round(competitor.unproductiveHours)} h
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {t('unproductiveHoursCompetitor')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500 tabular-nums">
                  {formatFromUsd(competitor.totalCost)}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {t('competitorTotalCost')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-bomag-blue tabular-nums">
                  {formatFromUsd(savingsTotal)}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {t('bomagSavingsPeriod')}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown */}
      <Card>
        <CardContent className="p-6">
          <h5 className="text-md font-semibold text-gray-700 mb-4">
            {t('costBreakdownTitle')}
          </h5>
          <div className="overflow-x-auto">
            <CompareTable columnCount={4}>
              <thead>
                <tr className="text-sm text-gray-500">
                  <th className="text-left font-semibold pb-2">{t('costComponent')}</th>
                  <th className="text-center font-semibold pb-2">{t('competitorColumn')}</th>
                  <th className="text-center font-semibold pb-2">{t('bomagColumn')}</th>
                  <th className="text-center font-semibold pb-2">{t('savingsColumn')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 text-left font-medium">{t('laborRow')}</td>
                  <td className="text-center py-3">
                    <span className="inline-block rounded-full bg-red-200 px-3 py-1 font-semibold text-red-900 tabular-nums">
                      {formatFromUsd(competitor.laborCost)}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className="inline-block rounded-full bg-green-200 px-3 py-1 font-semibold text-green-900 tabular-nums">
                      {formatFromUsd(bomag.laborCost)}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-semibold tabular-nums ${
                        competitor.laborCost - bomag.laborCost >= 0 ? 'bg-blue-200 text-blue-900' : 'bg-red-200 text-red-900'
                      }`}
                    >
                      {formatFromUsd(competitor.laborCost - bomag.laborCost)}
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-3 text-left font-medium">{t('suppliesRow')}</td>
                  <td className="text-center py-3">
                    <span className="inline-block rounded-full bg-red-200 px-3 py-1 font-semibold text-red-900 tabular-nums">
                      {formatFromUsd(competitor.suppliesCost)}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className="inline-block rounded-full bg-green-200 px-3 py-1 font-semibold text-green-900 tabular-nums">
                      {formatFromUsd(bomag.suppliesCost)}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-semibold tabular-nums ${
                        competitor.suppliesCost - bomag.suppliesCost >= 0 ? 'bg-blue-200 text-blue-900' : 'bg-red-200 text-red-900'
                      }`}
                    >
                      {formatFromUsd(competitor.suppliesCost - bomag.suppliesCost)}
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-3 text-left font-medium">{t('productivityLostRow')}</td>
                  <td className="text-center py-3">
                    <span className="inline-block rounded-full bg-red-200 px-3 py-1 font-semibold text-red-900 tabular-nums">
                      {formatFromUsd(competitor.productivityLostCost)}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className="inline-block rounded-full bg-green-200 px-3 py-1 font-semibold text-green-900 tabular-nums">
                      {formatFromUsd(bomag.productivityLostCost)}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-semibold tabular-nums ${
                        competitor.productivityLostCost - bomag.productivityLostCost >= 0
                          ? 'bg-blue-200 text-blue-900'
                          : 'bg-red-200 text-red-900'
                      }`}
                    >
                      {formatFromUsd(competitor.productivityLostCost - bomag.productivityLostCost)}
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-3 text-left font-bold">{t('totalJointRow')}</td>
                  <td className="text-center py-3">
                    <span className="inline-block rounded-full bg-red-200 px-3 py-1 font-bold text-red-900 tabular-nums">
                      {formatFromUsd(competitor.totalCost)}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className="inline-block rounded-full bg-green-200 px-3 py-1 font-bold text-green-900 tabular-nums">
                      {formatFromUsd(bomag.totalCost)}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-bold tabular-nums ${
                        savingsTotal >= 0 ? 'bg-blue-200 text-blue-900' : 'bg-red-200 text-red-900'
                      }`}
                    >
                      {formatFromUsd(savingsTotal)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </CompareTable>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

