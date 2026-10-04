import type { Language } from '@/contexts/LanguageContext';

type NonEsLang = Exclude<Language, 'es'>;

const PHRASE_REPLACEMENTS: Array<[string, Record<NonEsLang, string>]> = [
  // Phrases used by models added from the BOMAG TCO master file
  ['(30.330 kg transporte)', { en: '(30,330 kg transport)', de: '(30.330 kg Transport)', pt: '(30.330 kg transporte)' }],
  ['(29.430 kg transporte)', { en: '(29,430 kg transport)', de: '(29.430 kg Transport)', pt: '(29.430 kg transporte)' }],
  ['(30.000 kg transporte)', { en: '(30,000 kg transport)', de: '(30.000 kg Transport)', pt: '(30.000 kg transporte)' }],
  ['(máx.; 14.600 kg transporte)', { en: '(max; 14,600 kg transport)', de: '(max.; 14.600 kg Transport)', pt: '(máx.; 14.600 kg transporte)' }],
  ['(31.000 kg CE; 28.500 kg transporte)', { en: '(31,000 kg CE; 28,500 kg transport)', de: '(31.000 kg CE; 28.500 kg Transport)', pt: '(31.000 kg CE; 28.500 kg transporte)' }],
  [' bruta)', { en: ' gross)', de: ' brutto)', pt: ' bruta)' }],
  ['(radio de fresado)', { en: '(milling radius)', de: '(Fräsradius)', pt: '(raio de fresagem)' }],
  ['(máx., incl. opciones)', { en: '(max, incl. options)', de: '(max., inkl. Optionen)', pt: '(máx., incl. opcionais)' }],
  ['(primaria y de descarga)', { en: '(primary and discharge)', de: '(Aufnahme- und Abwurfband)', pt: '(primária e de descarga)' }],
  ['traslado/fresado combinado', { en: 'combined travel/milling', de: 'Fahren/Fräsen kombiniert', pt: 'deslocamento/fresagem combinados' }],
  ['(interior/exterior)', { en: '(inner/outer)', de: '(innen/außen)', pt: '(interna/externa)' }],
  ['(con herramientas)', { en: '(with tools)', de: '(mit Werkzeugen)', pt: '(com ferramentas)' }],
  ['(según tambor)', { en: '(per drum)', de: '(je nach Walze)', pt: '(conforme tambor)' }],
  ['(teórica)', { en: '(theoretical)', de: '(theoretisch)', pt: '(teórica)' }],
  ['(estándar)', { en: '(standard)', de: '(Standard)', pt: '(padrão)' }],
  ['(nominal)', { en: '(rated)', de: '(Nenn)', pt: '(nominal)' }],
  ['(máx.)', { en: '(max)', de: '(max.)', pt: '(máx.)' }],
  [' opcional)', { en: ' optional)', de: ' optional)', pt: ' opcional)' }],
  ['15.750 kg (más pesa)', { en: '15,750 kg (heavier)', de: '15.750 kg (schwerer)', pt: '15.750 kg (mais pesada)' }],
  ['Hasta 20%', { en: 'Up to 20%', de: 'Bis zu 20 %', pt: 'Até 20%' }],
  ['Hasta ', { en: 'Up to ', de: 'Bis ', pt: 'Até ' }],
  ['No aplica', { en: 'Not applicable', de: 'Nicht zutreffend', pt: 'Não se aplica' }],
  ['más pesa', { en: 'heavier', de: 'schwerer', pt: 'mais pesada' }],
];

export function localizeMillingText(text: string, lang: Language): string {
  if (!text || lang === 'es') return text;
  let result = text;
  for (const [phrase, translations] of PHRASE_REPLACEMENTS) {
    if (result.includes(phrase)) {
      result = result.split(phrase).join(translations[lang]);
    }
  }
  return result;
}
