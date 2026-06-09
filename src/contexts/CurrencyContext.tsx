import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/** Currencies shown in the header selector (amounts are stored in USD internally). */
export const DISPLAY_CURRENCIES = [
  'USD',
  'EUR',
  'IDR',
  'KRW',
  'THB',
  'VND',
  'MYR',
] as const;
export type DisplayCurrency = (typeof DISPLAY_CURRENCIES)[number];

const STORAGE_KEY = 'displayCurrency';

/** Fallback rates: units of local currency per 1 USD (same shape as open.er-api.com). */
const FALLBACK_RATES_PER_USD: Record<DisplayCurrency, number> = {
  USD: 1,
  EUR: 0.92,
  IDR: 16_500,
  KRW: 1_380,
  THB: 33.5,
  VND: 25_500,
  MYR: 4.45,
};

const LOCALE_BY_CURRENCY: Record<DisplayCurrency, string> = {
  USD: 'en-US',
  EUR: 'de-DE',
  IDR: 'id-ID',
  KRW: 'ko-KR',
  THB: 'th-TH',
  VND: 'vi-VN',
  MYR: 'en-MY',
};

const ZERO_DECIMAL: ReadonlySet<DisplayCurrency> = new Set([
  'IDR',
  'KRW',
  'VND',
]);

type FormatOptions = {
  /** For values like price per liter */
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
};

/** Rounding for editable fields: values in state/localStorage stay USD. */
export type MoneyInputKind = 'aggregate' | 'fuelPerLiter' | 'hourlyRate';

function decimalsForInput(kind: MoneyInputKind, currency: DisplayCurrency): number {
  if (ZERO_DECIMAL.has(currency)) return 0;
  if (kind === 'fuelPerLiter') return 4;
  if (kind === 'hourlyRate') return 2;
  return 2;
}

type CurrencyContextValue = {
  currency: DisplayCurrency;
  setCurrency: (c: DisplayCurrency) => void;
  /** True when selected currency uses no fractional units in inputs (e.g. KRW). */
  isZeroDecimal: boolean;
  /** Multiply USD amount by this to get the selected currency (for display). */
  rateToSelected: number;
  /** True after first fetch attempt (live or fallback). */
  ratesReady: boolean;
  convertFromUsd: (usd: number) => number;
  /** Amount in selected currency for a numeric input (from stored USD). */
  usdToInputNumber: (usd: number, kind?: MoneyInputKind) => number;
  /** Convert a number typed in the selected currency back to USD for storage/calculations. */
  inputNumberToUsd: (displayAmount: number, kind?: MoneyInputKind) => number;
  formatFromUsd: (usd: number, options?: FormatOptions) => string;
  /** Diesel price / L (stored in USD/L, shown in selected currency with enough decimals). */
  formatFuelPerLiterFromUsd: (usdPerLiter: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readStoredCurrency(): DisplayCurrency {
  if (typeof window === 'undefined') return 'USD';
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw && DISPLAY_CURRENCIES.includes(raw as DisplayCurrency)) {
    return raw as DisplayCurrency;
  }
  return 'USD';
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<DisplayCurrency>(() =>
    typeof window !== 'undefined' ? readStoredCurrency() : 'USD'
  );
  const [ratesPerUsd, setRatesPerUsd] =
    useState<Record<DisplayCurrency, number>>(FALLBACK_RATES_PER_USD);
  const [ratesReady, setRatesReady] = useState(false);

  const setCurrency = useCallback((c: DisplayCurrency) => {
    setCurrencyState(c);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, c);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!res.ok) throw new Error('rates http');
        const data = (await res.json()) as {
          result?: string;
          conversion_rates?: Record<string, number>;
        };
        if (data.result !== 'success' || !data.conversion_rates) {
          throw new Error('rates shape');
        }
        const r = data.conversion_rates;
        const next: Record<DisplayCurrency, number> = { ...FALLBACK_RATES_PER_USD };
        for (const code of DISPLAY_CURRENCIES) {
          if (code === 'USD') next.USD = 1;
          else {
            const v = r[code];
            if (typeof v === 'number' && v > 0) next[code] = v;
          }
        }
        if (!cancelled) {
          setRatesPerUsd(next);
          setRatesReady(true);
        }
      } catch {
        if (!cancelled) {
          setRatesPerUsd(FALLBACK_RATES_PER_USD);
          setRatesReady(true);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const rateToSelected = ratesPerUsd[currency] ?? 1;
  const safeRate = Math.max(rateToSelected, 1e-12);
  const isZeroDecimal = ZERO_DECIMAL.has(currency);

  const convertFromUsd = useCallback(
    (usd: number) => usd * rateToSelected,
    [rateToSelected]
  );

  const usdToInputNumber = useCallback(
    (usd: number, kind: MoneyInputKind = 'aggregate') => {
      const u = Number.isFinite(usd) ? usd : 0;
      const d = u * safeRate;
      const dec = decimalsForInput(kind, currency);
      if (dec === 0) return Math.round(d);
      return Math.round(d * 10 ** dec) / 10 ** dec;
    },
    [currency, safeRate]
  );

  const inputNumberToUsd = useCallback(
    (displayAmount: number, kind: MoneyInputKind = 'aggregate') => {
      if (!Number.isFinite(displayAmount)) return 0;
      const dec = decimalsForInput(kind, currency);
      const d = dec === 0 ? Math.round(displayAmount) : displayAmount;
      return d / safeRate;
    },
    [currency, safeRate]
  );

  const formatFromUsd = useCallback(
    (usd: number, options?: FormatOptions) => {
      const amount = usd * rateToSelected;
      const locale = LOCALE_BY_CURRENCY[currency];
      const z = ZERO_DECIMAL.has(currency);
      const minF = options?.minimumFractionDigits ?? (z ? 0 : 0);
      const maxF = options?.maximumFractionDigits ?? (z ? 0 : 0);
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: minF,
        maximumFractionDigits: maxF,
      }).format(amount);
    },
    [currency, rateToSelected]
  );

  const formatFuelPerLiterFromUsd = useCallback(
    (usdPerLiter: number) => {
      const amount = usdPerLiter * rateToSelected;
      const locale = LOCALE_BY_CURRENCY[currency];
      if (ZERO_DECIMAL.has(currency)) {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount);
      }
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }).format(amount);
    },
    [currency, rateToSelected]
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      isZeroDecimal,
      rateToSelected,
      ratesReady,
      convertFromUsd,
      usdToInputNumber,
      inputNumberToUsd,
      formatFromUsd,
      formatFuelPerLiterFromUsd,
    }),
    [
      currency,
      setCurrency,
      isZeroDecimal,
      rateToSelected,
      ratesReady,
      convertFromUsd,
      usdToInputNumber,
      inputNumberToUsd,
      formatFromUsd,
      formatFuelPerLiterFromUsd,
    ]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return ctx;
}

/** Optional helper when context is not available (e.g. tests). */
export function formatUsdPlain(usd: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usd);
}
