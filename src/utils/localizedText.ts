import type { Language } from '@/contexts/LanguageContext';
import type { LocalizedText } from '@/data/paversData';

export function pickLocalized(text: LocalizedText | string | undefined | null, lang: Language): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[lang] || text.es || text.en || '';
}

/** Prefer requested language; fall back through es → en when a locale is empty. */
export function pickLocalizedWithFallback(
  text: LocalizedText | string | undefined | null,
  lang: Language
): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  const primary = text[lang]?.trim();
  if (primary) return primary;
  return text.es?.trim() || text.en?.trim() || text.de?.trim() || text.pt?.trim() || '';
}
