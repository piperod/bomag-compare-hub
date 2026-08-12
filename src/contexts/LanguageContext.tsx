import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import de from '@/locales/de.json';
import pt from '@/locales/pt.json';

export type Language = 'es' | 'en' | 'de' | 'pt';

export const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'pt', label: 'Português' },
];

const STORAGE_KEY = 'bomag-language';

export interface LocaleSpec {
  basicSpecificationRowsCommon?: string[];
  basicSpecificationRowsSdr?: string[];
  basicSpecificationRowsLtr?: string[];
  basicSpecificationRowsHtr?: string[];
  basicSpecificationRowsMilling?: Array<{ key: string; labelKey: string }>;
  paverSpecSections?: Array<{ titleKey: string; rows: Array<{ key: string; labelKey: string }> }>;
  uspRows?: Array<{ key: string; labelKey: string }>;
  millingUspRows?: Array<{ key: string; labelKey: string }>;
  [key: string]: unknown;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  locale: LocaleSpec;
}

const localeData: Record<Language, LocaleSpec> = {
  es: es as LocaleSpec,
  en: en as LocaleSpec,
  de: de as LocaleSpec,
  pt: pt as LocaleSpec,
};

const translations: Record<Language, Record<string, string>> = {
  es: es as Record<string, string>,
  en: en as Record<string, string>,
  de: de as Record<string, string>,
  pt: pt as Record<string, string>,
};

function isLanguage(value: string): value is Language {
  return value === 'es' || value === 'en' || value === 'de' || value === 'pt';
}

function detectInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isLanguage(saved)) return saved;
    } catch {
      // ignore
    }
    const browser = (navigator.language || navigator.languages?.[0] || 'en').toLowerCase();
    if (browser.startsWith('de')) return 'de';
    if (browser.startsWith('pt')) return 'pt';
    if (browser.startsWith('es')) return 'es';
    if (browser.startsWith('en')) return 'en';
  }
  return 'en';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string, vars?: Record<string, string | number>): string => {
    const raw = translations[language][key] ?? key;
    if (!vars) return raw;
    return Object.entries(vars).reduce((acc, [k, v]) => {
      return acc.replaceAll(`{{${k}}}`, String(v));
    }, raw);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, locale: localeData[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
