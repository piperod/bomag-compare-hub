import { BadgeDollarSign, Calculator, Cog, Fuel, Leaf, Lightbulb, Timer, TrendingUp, Truck, Wallet, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TCO_USP_HIGHLIGHTS, type TcoDriver, type TcoLine } from '@/data/tcoUspHighlights';
import { pickLocalizedWithFallback } from '@/utils/localizedText';

const DRIVER_ICON: Record<TcoDriver, LucideIcon> = {
  fuel: Fuel,
  wear: Cog,
  maintenance: Wrench,
  productivity: TrendingUp,
  uptime: Timer,
  transport: Truck,
  capex: Wallet,
  resale: BadgeDollarSign,
  co2: Leaf,
};

const DRIVER_LABEL_KEY: Record<TcoDriver, string> = {
  fuel: 'tcoDriverFuel',
  wear: 'tcoDriverWear',
  maintenance: 'tcoDriverMaintenance',
  productivity: 'tcoDriverProductivity',
  uptime: 'tcoDriverUptime',
  transport: 'tcoDriverTransport',
  capex: 'tcoDriverCapex',
  resale: 'tcoDriverResale',
  co2: 'tcoDriverCo2',
};

interface BomagTcoHighlightsProps {
  line: string;
}

/** Key BOMAG USPs of the product line, framed as TCO levers against the competition. */
export function BomagTcoHighlights({ line }: BomagTcoHighlightsProps) {
  const { t, language } = useLanguage();
  const highlights = TCO_USP_HIGHLIGHTS[line as TcoLine];
  if (!highlights?.length) return null;

  return (
    <section className="rounded-lg border border-orange-200 bg-orange-50/60 p-4">
      <h4 className="text-lg font-semibold text-gray-800">{t('tcoUspTitle')}</h4>
      <p className="mt-1 text-sm text-gray-600">{t('tcoUspSubtitle')}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {highlights.map((h, index) => {
          const Icon = DRIVER_ICON[h.driver];
          return (
            <article key={index} className="flex flex-col rounded-md border border-gray-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <Icon className="h-4 w-4 text-bomag-orange" aria-hidden />
                  {t(DRIVER_LABEL_KEY[h.driver])}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    h.inModel ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}
                  title={h.inModel ? t('tcoUspInModelHint') : t('tcoUspArgumentHint')}
                >
                  {h.inModel ? <Calculator className="h-3 w-3" aria-hidden /> : <Lightbulb className="h-3 w-3" aria-hidden />}
                  {h.inModel ? t('tcoUspInModel') : t('tcoUspArgument')}
                </span>
              </div>
              <div className="mt-2 text-base font-semibold text-gray-900">{pickLocalizedWithFallback(h.title, language)}</div>
              <div className="mt-1 text-lg font-bold text-bomag-orange">{pickLocalizedWithFallback(h.impact, language)}</div>
              <p className="mt-1 flex-1 text-sm text-gray-700">{pickLocalizedWithFallback(h.detail, language)}</p>
              <div className="mt-2 text-xs text-gray-500" title={h.source}>
                {h.models}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default BomagTcoHighlights;
