import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import de from '@/locales/de.json';
import pt from '@/locales/pt.json';

export type Language = 'es' | 'en' | 'de' | 'pt';

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

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

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
