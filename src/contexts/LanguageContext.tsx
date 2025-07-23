import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'es' | 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    title: 'Comparador de Productos BOMAG',
    productLines: 'Líneas de Productos',
    sdr: 'SDR - Rodillo de Tambor Simple',
    ltr: 'LTR - Rodillo Tandem Ligero',
    htr: 'HTR - Rodillo Tandem Pesado',
    compare: 'Comparar',
    specifications: 'Especificaciones',
    performance: 'Rendimiento',
    calculator: 'Calculadora de Rendimiento',
    brand: 'Marca',
    model: 'Modelo',
    weight: 'Peso (Kg)',
    engine: 'Motor',
    compactionWidth: 'Ancho de compactación (m)',
    power: 'Potencia (HP)',
    amplitude: 'Amplitud (mm)',
    staticLinearLoad: 'Carga Lineal Estática (Kg/cm)',
    gradeability: 'Gradeabilidad (%)',
    origin: 'País de origen',
    compactionAssistant: 'Asistente de compactación',
    telemetry: 'Telemetría',
    innovations: 'Tecnologías Innovadoras',
    usp: 'USP',
    maxCompactionDepth: 'Profundidad de compactación máx (cm)',
    compactionPerformance: 'Rendimiento en compactación (m³/h)',
    fuelConsumption: 'Consumo de combustible (L/h)',
    price: 'Precio CIF (USD)',
    preventiveMaintenance: 'Mantenimiento preventivo (USD/h)',
    correctiveMaintenance: 'Mantenimiento correctivo (USD/h)',
    usageTime: 'Tiempo de uso (h)',
    tco: 'TCO (USD)',
    soilType: 'Tipo de Suelo',
    operatingWeight: 'Peso Operativo (t)',
    rock: 'Roca',
    gravel: 'Grava, arena',
    mixedSoil: 'Suelo mixto',
    clay: 'Limo, arcilla',
    compactionHeight: 'Altura de capa compactada según tipo de suelo y peso operativo',
    compactionOutput: 'Rendimiento de compactación según tipo de suelo y peso operativo'
  },
  en: {
    title: 'BOMAG Product Comparator',
    productLines: 'Product Lines',
    sdr: 'SDR - Single Drum Roller',
    ltr: 'LTR - Light Tandem Roller',
    htr: 'HTR - Heavy Tandem Roller',
    compare: 'Compare',
    specifications: 'Specifications',
    performance: 'Performance',
    calculator: 'Performance Calculator',
    brand: 'Brand',
    model: 'Model',
    weight: 'Weight (Kg)',
    engine: 'Engine',
    compactionWidth: 'Compaction Width (m)',
    power: 'Power (HP)',
    amplitude: 'Amplitude (mm)',
    staticLinearLoad: 'Static Linear Load (Kg/cm)',
    gradeability: 'Gradeability (%)',
    origin: 'Country of origin',
    compactionAssistant: 'Compaction Assistant',
    telemetry: 'Telemetry',
    innovations: 'Innovative Technologies',
    usp: 'USP',
    maxCompactionDepth: 'Max compaction depth (cm)',
    compactionPerformance: 'Compaction performance (m³/h)',
    fuelConsumption: 'Fuel consumption (L/h)',
    price: 'CIF Price (USD)',
    preventiveMaintenance: 'Preventive maintenance (USD/h)',
    correctiveMaintenance: 'Corrective maintenance (USD/h)',
    usageTime: 'Usage time (h)',
    tco: 'TCO (USD)',
    soilType: 'Soil Type',
    operatingWeight: 'Operating Weight (t)',
    rock: 'Rock',
    gravel: 'Gravel, sand',
    mixedSoil: 'Mixed soil',
    clay: 'Silt, clay',
    compactionHeight: 'Compacted layer height by soil type and operating weight',
    compactionOutput: 'Compaction output by soil type and operating weight'
  },
  de: {
    title: 'BOMAG Produktvergleich',
    productLines: 'Produktlinien',
    sdr: 'SDR - Einzylinderwalze',
    ltr: 'LTR - Leichte Tandemwalze',
    htr: 'HTR - Schwere Tandemwalze',
    compare: 'Vergleichen',
    specifications: 'Spezifikationen',
    performance: 'Leistung',
    calculator: 'Leistungsrechner',
    brand: 'Marke',
    model: 'Modell',
    weight: 'Gewicht (Kg)',
    engine: 'Motor',
    compactionWidth: 'Verdichtungsbreite (m)',
    power: 'Leistung (HP)',
    amplitude: 'Amplitude (mm)',
    staticLinearLoad: 'Statische Linienlast (Kg/cm)',
    gradeability: 'Steigfähigkeit (%)',
    origin: 'Herkunftsland',
    compactionAssistant: 'Verdichtungsassistent',
    telemetry: 'Telemetrie',
    innovations: 'Innovative Technologien',
    usp: 'USP',
    maxCompactionDepth: 'Max. Verdichtungstiefe (cm)',
    compactionPerformance: 'Verdichtungsleistung (m³/h)',
    fuelConsumption: 'Kraftstoffverbrauch (L/h)',
    price: 'CIF-Preis (USD)',
    preventiveMaintenance: 'Vorbeugende Wartung (USD/h)',
    correctiveMaintenance: 'Korrektive Wartung (USD/h)',
    usageTime: 'Nutzungszeit (h)',
    tco: 'TCO (USD)',
    soilType: 'Bodenart',
    operatingWeight: 'Betriebsgewicht (t)',
    rock: 'Felsen',
    gravel: 'Kies, Sand',
    mixedSoil: 'Mischboden',
    clay: 'Schluff, Ton',
    compactionHeight: 'Verdichtete Schichthöhe nach Bodenart und Betriebsgewicht',
    compactionOutput: 'Verdichtungsleistung nach Bodenart und Betriebsgewicht'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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