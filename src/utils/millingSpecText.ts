import type { Language } from '@/contexts/LanguageContext';

type NonEsLang = Exclude<Language, 'es'>;

const PHRASE_REPLACEMENTS: Array<[string, Record<NonEsLang, string>]> = [
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
