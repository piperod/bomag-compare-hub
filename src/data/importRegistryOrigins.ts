/**
 * País de origen de los equipos NUEVOS según el "registro de importaciones"
 * (Reporte_Bomag_391_2024_2026_3.xlsx: importaciones LATAM 2024–2026, ESTADO MERCADERIA = New).
 * Países ordenados por unidades importadas; solo se listan los que representan ≥10 % de las unidades del modelo.
 * Se usa únicamente para completar modelos sin origen: nunca reemplaza un origen ya cargado.
 */
import type { LocalizedText } from './paversData';

export const IMPORT_REGISTRY_ORIGINS: Record<string, LocalizedText> = {
  'HAMM|HC200': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 38 uds.
  'LIUGONG|CLG6612E': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 41 uds.
  'SEM|512': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 74 uds.
  'CATERPILLAR|CS11': { es: 'Brasil', en: 'Brazil', de: 'Brasilien', pt: 'Brasil' }, // 65 uds.
  'AMMANN|ARS 110.1': { es: 'India', en: 'India', de: 'Indien', pt: 'Índia' }, // 44 uds.
  'SANY|SSR200C-8H': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 55 uds.
  'VOLVO|SD110': { es: 'Brasil', en: 'Brazil', de: 'Brasilien', pt: 'Brasil' }, // 45 uds. (SD110B)
  'XCMG|XS113': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 75 uds.
  'LIUGONG|CLG6611E': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 94 uds.
  'SANY|SAP60C-10': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 39 uds. (SAP60C / SAP60C-10)
  'SANY|SSP90C-8': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 12 uds.
  'BOMAG|BW211 D-5 SL': { es: 'China / India', en: 'China / India', de: 'China / Indien', pt: 'China / Índia' }, // 121 uds.
  'BOMAG|BW212 D-5 SL': { es: 'Alemania / China', en: 'Germany / China', de: 'Deutschland / China', pt: 'Alemanha / China' }, // 11 uds.
  'BOMAG|BW216 D-5 SL': { es: 'Alemania / China', en: 'Germany / China', de: 'Deutschland / China', pt: 'Alemanha / China' }, // 14 uds.
  'BOMAG|BW219 D-5 PL': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 7 uds.
  'BOMAG|BW220 D-5 PL': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 26 uds.
  'SAKAI|SV521D': { es: 'Indonesia / Japón', en: 'Indonesia / Japan', de: 'Indonesien / Japan', pt: 'Indonésia / Japão' }, // 28 uds.
  'SAKAI|SV621D': { es: 'Japón / Indonesia', en: 'Japan / Indonesia', de: 'Japan / Indonesien', pt: 'Japão / Indonésia' }, // 10 uds.
  'DYNAPAC|CA25 D-Rhino': { es: 'India / Brasil', en: 'India / Brazil', de: 'Indien / Brasilien', pt: 'Índia / Brasil' }, // 82 uds.
  'DYNAPAC|CA35 D-Rhino': { es: 'India / Brasil', en: 'India / Brazil', de: 'Indien / Brasilien', pt: 'Índia / Brasil' }, // 63 uds.
  'HAMM|HC110': { es: 'Alemania / India', en: 'Germany / India', de: 'Deutschland / Indien', pt: 'Alemanha / Índia' }, // 182 uds.
  'HAMM|HC119': { es: 'India / Alemania', en: 'India / Germany', de: 'Indien / Deutschland', pt: 'Índia / Alemanha' }, // 43 uds.
  'CATERPILLAR|CS10GC': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 200 uds.
  'CATERPILLAR|CS11GC': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 415 uds.
  'CATERPILLAR|CS12': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 46 uds.
  'CATERPILLAR|CS13GC': { es: 'China / Brasil', en: 'China / Brazil', de: 'China / Brasilien', pt: 'China / Brasil' }, // 12 uds.
  'XCMG|XS113E': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 8 uds.
  'XCMG|XS123': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 56 uds.
  'XCMG|XS143J': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 3 uds.
  'XCMG|XS203J': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 1 uds.
  'SANY|SSR120C-8': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 11 uds.
  'SANY|SSR120C-10': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 100 uds.
  'SANY|SSR120C-10S': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 68 uds.
  'SHANTUI|SR22': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 4 uds.
  'JCB|116D': { es: 'India', en: 'India', de: 'Indien', pt: 'Índia' }, // 304 uds.
  'NEW HOLLAND|V110': { es: 'India', en: 'India', de: 'Indien', pt: 'Índia' }, // 36 uds.
  'AMMANN|ASC110': { es: 'República Checa / Suiza', en: 'Czech Republic / Switzerland', de: 'Tschechien / Schweiz', pt: 'República Tcheca / Suíça' }, // 8 uds.
  'SEM|510': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 32 uds.
  'CASE|1107EX': { es: 'India', en: 'India', de: 'Indien', pt: 'Índia' }, // 146 uds.
  'BOMAG|BW120 AD-5': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 84 uds.
  'CATERPILLAR|CB2.7GC': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 86 uds.
  'HAMM|HD12 VV': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 64 uds.
  'DYNAPAC|CC1200': { es: 'Suecia / China', en: 'Sweden / China', de: 'Schweden / China', pt: 'Suécia / China' }, // 39 uds.
  'DYNAPAC|CC900G': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 8 uds.
  'DYNAPAC|CC1000': { es: 'Suecia', en: 'Sweden', de: 'Schweden', pt: 'Suécia' }, // 2 uds.
  'DYNAPAC|CC1200 VI': { es: 'Suecia / China', en: 'Sweden / China', de: 'Schweden / China', pt: 'Suécia / China' }, // 24 uds.
  'DYNAPAC|CC1300': { es: 'Suecia', en: 'Sweden', de: 'Schweden', pt: 'Suécia' }, // 19 uds.
  'DYNAPAC|CC1400 VI': { es: 'China / Suecia', en: 'China / Sweden', de: 'China / Schweden', pt: 'China / Suécia' }, // 2 uds.
  'DYNAPAC|CC1400C VI': { es: 'Suecia / China', en: 'Sweden / China', de: 'Schweden / China', pt: 'Suécia / China' }, // 4 uds.
  'AMMANN|ARX 26': { es: 'República Checa', en: 'Czech Republic', de: 'Tschechien', pt: 'República Tcheca' }, // 23 uds.
  'JCB|CT260': { es: 'India', en: 'India', de: 'Indien', pt: 'Índia' }, // 68 uds.
  'WACKER NEUSON|RD27': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 57 uds.
  'DYNAPAC|CC2200': { es: 'India', en: 'India', de: 'Indien', pt: 'Índia' }, // 1 uds.
  'DYNAPAC|CC4200': { es: 'Brasil / China', en: 'Brazil / China', de: 'Brasilien / China', pt: 'Brasil / China' }, // 18 uds.
  'DYNAPAC|CC5200': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 2 uds.
  'BOMAG|BW 24 RH': { es: 'China / Alemania', en: 'China / Germany', de: 'China / Deutschland', pt: 'China / Alemanha' }, // 34 uds.
  'BOMAG|BW 27 RH': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 11 uds.
  'BOMAG|BW 28 RH': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 28 uds.
  'HAMM|HP 180': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 9 uds.
  'HAMM|HP 280': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 75 uds.
  'DYNAPAC|CP1200': { es: 'Brasil', en: 'Brazil', de: 'Brasilien', pt: 'Brasil' }, // 8 uds.
  'DYNAPAC|CP2100': { es: 'Brasil', en: 'Brazil', de: 'Brasilien', pt: 'Brasil' }, // 2 uds.
  'DYNAPAC|CP2700': { es: 'Brasil', en: 'Brazil', de: 'Brasilien', pt: 'Brasil' }, // 16 uds.
  'DYNAPAC|CP275': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 2 uds.
  'CATERPILLAR|CW16': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 18 uds.
  'CATERPILLAR|CW34': { es: 'Brasil / China', en: 'Brazil / China', de: 'Brasilien / China', pt: 'Brasil / China' }, // 33 uds.
  'AMMANN|AP 240': { es: 'República Checa', en: 'Czech Republic', de: 'Tschechien', pt: 'República Tcheca' }, // 24 uds.
  'BOMAG|BM 1000/20': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 4 uds.
  'BOMAG|BM 1300/35-2': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 7 uds.
  'BOMAG|BM 2000/65': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 2 uds.
  'BOMAG|BM 2000/58': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 18 uds.
  'SANY|SCM1000C-8': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 1 uds.
  'XCMG|XM1005H': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 1 uds.
  'WIRTGEN|W 100 R': { es: 'Alemania / Brasil', en: 'Germany / Brazil', de: 'Deutschland / Brasilien', pt: 'Alemanha / Brasil' }, // 10 uds.
  'WIRTGEN|W 120 R': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 1 uds.
  'WIRTGEN|W 100 Ri': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 3 uds.
  'WIRTGEN|W 200 F': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 23 uds.
  'CATERPILLAR|AP655': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 26 uds.
  'CATERPILLAR|AP455': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 3 uds.
  'CATERPILLAR|AP555': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 1 uds.
  'BOMAG|BF600 C-3': { es: 'Italia', en: 'Italy', de: 'Italien', pt: 'Itália' }, // 20 uds.
  'BOMAG|BF 350 C-5': { es: 'Italia', en: 'Italy', de: 'Italien', pt: 'Itália' }, // 1 uds.
  'BOMAG|BF 700 C-3': { es: 'Italia / Alemania', en: 'Italy / Germany', de: 'Italien / Deutschland', pt: 'Itália / Alemanha' }, // 10 uds.
  'VÖGELE|Super 1800-3': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 28 uds.
  'VÖGELE|Super 1300-3': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 8 uds.
  'VÖGELE|Super 1400': { es: 'India', en: 'India', de: 'Indien', pt: 'Índia' }, // 44 uds.
  'VÖGELE|Super 1600-3': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 24 uds.
  'VÖGELE|Super 1900-3 G': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 1 uds.
  'DYNAPAC|SD2500CS': { es: 'Alemania / China', en: 'Germany / China', de: 'Deutschland / China', pt: 'Alemanha / China' }, // 29 uds.
  'DYNAPAC|F1800C': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 11 uds.
  'DYNAPAC|F2500WS': { es: 'China', en: 'China', de: 'China', pt: 'China' }, // 5 uds.
  'BOMAG|BW161 AD-4': { es: 'China / Alemania', en: 'China / Germany', de: 'China / Deutschland', pt: 'China / Alemanha' }, // 17 uds.
  'AMMANN|AV110X': { es: 'República Checa', en: 'Czech Republic', de: 'Tschechien', pt: 'República Tcheca' }, // 1 uds.
  'CATERPILLAR|CB10': { es: 'Brasil / China', en: 'Brazil / China', de: 'Brasilien / China', pt: 'Brasil / China' }, // 34 uds.
  'HAMM|HD90 VV': { es: 'Alemania', en: 'Germany', de: 'Deutschland', pt: 'Alemanha' }, // 5 uds.
};

const isMissing = (origin: unknown): boolean => {
  if (origin == null) return true;
  const text = typeof origin === 'string' ? origin : (origin as LocalizedText).es;
  return !text || /^[-–—\s]*$/.test(text);
};

/** Fills `origin` from the import registry only where the model has no origin yet. */
export function withImportRegistryOrigin<T extends { brand: string; model: string; origin?: unknown }>(machines: T[]): T[] {
  return machines.map((machine) => {
    const fromRegistry = IMPORT_REGISTRY_ORIGINS[`${machine.brand}|${machine.model}`];
    return fromRegistry && isMissing(machine.origin) ? { ...machine, origin: fromRegistry } : machine;
  });
}
