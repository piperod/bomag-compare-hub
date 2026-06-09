import type { Language } from '@/contexts/LanguageContext';

type NonEsLang = Exclude<Language, 'es'>;

/** Longest-first phrase replacements for paver spec and financial strings (source: Spanish). */
const PHRASE_REPLACEMENTS: Array<[string, Record<NonEsLang, string>]> = [
  [
    'No publicado en ficha técnica',
    {
      en: 'Not published in spec sheet',
      de: 'Nicht im technischen Datenblatt veröffentlicht',
      pt: 'Não publicado na ficha técnica',
    },
  ],
  [
    '8,9 l/h ✓ MEDIDO EN CAMPO',
    {
      en: '8.9 l/h ✓ MEASURED IN FIELD',
      de: '8,9 l/h ✓ IM FELD GEMESSEN',
      pt: '8,9 l/h ✓ MEDIDO EM CAMPO',
    },
  ],
  [
    'Medición campo 03/2019–04/2021',
    {
      en: 'Field measurement 03/2019–04/2021',
      de: 'Feldmessung 03/2019–04/2021',
      pt: 'Medição de campo 03/2019–04/2021',
    },
  ],
  [
    '51 L menos que competidor\n16 L menos que Dynapac',
    {
      en: '51 L less than competitor\n16 L less than Dynapac',
      de: '51 L weniger als Wettbewerber\n16 L weniger als Dynapac',
      pt: '51 L a menos que concorrente\n16 L a menos que Dynapac',
    },
  ],
  [
    '131 kg menos que competidor\n38 kg menos que Dynapac',
    {
      en: '131 kg less than competitor\n38 kg less than Dynapac',
      de: '131 kg weniger als Wettbewerber\n38 kg weniger als Dynapac',
      pt: '131 kg a menos que concorrente\n38 kg a menos que Dynapac',
    },
  ],
  [
    'MAGMALIFE — bloques aluminio fundido',
    {
      en: 'MAGMALIFE — cast aluminum blocks',
      de: 'MAGMALIFE — Aluminium-Gussblöcke',
      pt: 'MAGMALIFE — blocos de alumínio fundido',
    },
  ],
  [
    'Ficha técnica oficial',
    {
      en: 'Official spec sheet',
      de: 'Offizielles Datenblatt',
      pt: 'Ficha técnica oficial',
    },
  ],
  [
    '10,5 l/h (en ficha oficial)',
    {
      en: '10.5 l/h (in official spec sheet)',
      de: '10,5 l/h (laut offiziellem Datenblatt)',
      pt: '10,5 l/h (na ficha oficial)',
    },
  ],
  [
    'Eléctrica - generador 70 kW\n~15 min calentamiento',
    {
      en: 'Electric - 70 kW generator\n~15 min heating',
      de: 'Elektrisch - 70 kW Generator\n~15 Min. Aufheizen',
      pt: 'Elétrica - gerador 70 kW\n~15 min aquecimento',
    },
  ],
  [
    'Eléctrica - generador directo\nrefrigerado por aceite',
    {
      en: 'Electric - direct generator\noil-cooled',
      de: 'Elektrisch - Direktgenerator\nölgekühlt',
      pt: 'Elétrica - gerador direto\nrefrigerado a óleo',
    },
  ],
  [
    'Eléctrica o Gas (opción única)\nGenerador 33 kVA',
    {
      en: 'Electric or gas (single option)\n33 kVA generator',
      de: 'Elektrisch oder Gas (Einzelauswahl)\n33 kVA Generator',
      pt: 'Elétrica ou gás (opção única)\nGerador 33 kVA',
    },
  ],
  [
    'Oscilantes estándar\nPaveDock elástico (opcional)',
    {
      en: 'Oscillating standard\nPaveDock elastic (optional)',
      de: 'Schwingend Standard\nPaveDock elastisch (optional)',
      pt: 'Oscilantes padrão\nPaveDock elástico (opcional)',
    },
  ],
  [
    'Fijo pivotable (std.)\nHidráulico amortiguado (opc.)',
    {
      en: 'Fixed pivoting (std.)\nHydraulic damped (opt.)',
      de: 'Fest schwenkbar (Std.)\nHydraulisch gedämpft (opt.)',
      pt: 'Fixo pivotante (padrão)\nHidráulico amortecido (opc.)',
    },
  ],
  [
    'QUICK COUPLING - sin tornillos\n(EXCLUSIVO BOMAG)',
    {
      en: 'QUICK COUPLING - no bolts\n(BOMAG EXCLUSIVE)',
      de: 'QUICK COUPLING - ohne Schrauben\n(EXKLUSIV BOMAG)',
      pt: 'QUICK COUPLING - sem parafusos\n(EXCLUSIVO BOMAG)',
    },
  ],
  [
    'A-PAVE pantalla gráfica\nAsiento SIDEVIEW giratorio/deslizable',
    {
      en: 'A-PAVE graphic display\nSIDEVIEW rotating/sliding seat',
      de: 'A-PAVE Grafikdisplay\nSIDEVIEW Dreh-/Schiebesitz',
      pt: 'A-PAVE tela gráfica\nAssento SIDEVIEW giratório/deslizante',
    },
  ],
  [
    'Controlador integrado + sensor\npendiente (ESTÁNDAR LATERAL)',
    {
      en: 'Integrated controller + sensor\nslope (LATERAL STANDARD)',
      de: 'Integrierter Regler + Sensor\nNeigung (SEITLICH STANDARD)',
      pt: 'Controlador integrado + sensor\nde inclinação (PADRÃO LATERAL)',
    },
  ],
  [
    'Pantallas táctiles dobles\nPave Start Assistant',
    {
      en: 'Dual touchscreens\nPave Start Assistant',
      de: 'Doppelte Touchscreens\nPave Start Assistant',
      pt: 'Telas tácteis duplas\nPave Start Assistant',
    },
  ],
  [
    'MAGMALIFE - bloques aluminio\n50% más rápido · 3.000–5.000 h vida',
    {
      en: 'MAGMALIFE - aluminum blocks\n50% faster · 3,000–5,000 h life',
      de: 'MAGMALIFE - Aluminiumblöcke\n50% schneller · 3.000–5.000 h Lebensdauer',
      pt: 'MAGMALIFE - blocos de alumínio\n50% mais rápido · 3.000–5.000 h vida útil',
    },
  ],
  [
    'S500 / S600\n(tamper + vibración)',
    {
      en: 'S500 / S600\n(tamper + vibration)',
      de: 'S500 / S600\n(Tamper + Vibration)',
      pt: 'S500 / S600\n(tamper + vibração)',
    },
  ],
  [
    '2 cintas - sistema 4 bombas',
    {
      en: '2 belts - 4-pump system',
      de: '2 Bänder - 4-Pumpen-System',
      pt: '2 esteiras - sistema 4 bombas',
    },
  ],
  [
    '2 - reversibles, ctrl indep.\n64 rpm',
    {
      en: '2 - reversible, indep. ctrl.\n64 rpm',
      de: '2 - reversibel, unabh. Steuerung\n64 rpm',
      pt: '2 - reversíveis, ctrl. indep.\n64 rpm',
    },
  ],
  [
    '2 - hasta 33 m/min variable\nreversibles',
    {
      en: '2 - up to 33 m/min variable\nreversible',
      de: '2 - bis 33 m/min variabel\nreversibel',
      pt: '2 - até 33 m/min variável\nreversíveis',
    },
  ],
  [
    '2 dual - 2×655 mm\ncontrol proporcional',
    {
      en: '2 dual - 2×655 mm\nproportional control',
      de: '2 dual - 2×655 mm\nProportionalsteuerung',
      pt: '2 duplas - 2×655 mm\ncontrole proporcional',
    },
  ],
  [
    'Sistema ventilación (desviación)',
    {
      en: 'Ventilation system (diversion)',
      de: 'Belüftungssystem (Abführung)',
      pt: 'Sistema de ventilação (desvio)',
    },
  ],
  [
    'Acceso remoto puntos clave',
    {
      en: 'Remote access to key points',
      de: 'Fernzugriff auf Schlüsselpunkte',
      pt: 'Acesso remoto a pontos-chave',
    },
  ],
  [
    'Aspiración vapores - estándar',
    {
      en: 'Fume extraction - standard',
      de: 'Dampfabsaugung - Standard',
      pt: 'Aspiração de vapores - padrão',
    },
  ],
  [
    'Equipo lubric. central estándar',
    {
      en: 'Central lubrication system standard',
      de: 'Zentralschmierung Standard',
      pt: 'Lubrificação central padrão',
    },
  ],
  [
    'Lubricación central automática',
    {
      en: 'Automatic central lubrication',
      de: 'Automatische Zentralschmierung',
      pt: 'Lubrificação central automática',
    },
  ],
  [
    'Sistema lubric. inteligente',
    {
      en: 'Smart lubrication system',
      de: 'Intelligentes Schmiersystem',
      pt: 'Sistema de lubrificação inteligente',
    },
  ],
  [
    'Certificado NIOSH 94% efectividad',
    {
      en: 'NIOSH certified 94% effectiveness',
      de: 'NIOSH-zertifiziert 94% Wirksamkeit',
      pt: 'Certificado NIOSH 94% eficácia',
    },
  ],
  [
    'Mecánica + tramos hidr. (SB300)',
    {
      en: 'Mechanical + hydraulic sections (SB300)',
      de: 'Mechanisch + hydr. Segmente (SB300)',
      pt: 'Mecânica + trechos hidr. (SB300)',
    },
  ],
  [
    'Mecánicas estándar + tramos hidr. (SB300)',
    {
      en: 'Standard mechanical + hydraulic sections (SB300)',
      de: 'Mechanisch Standard + hydr. Segmente (SB300)',
      pt: 'Mecânicas padrão + trechos hidr. (SB300)',
    },
  ],
  [
    'Plataforma deslizable con consola',
    {
      en: 'Sliding platform with console',
      de: 'Verschiebbare Plattform mit Konsole',
      pt: 'Plataforma deslizante com console',
    },
  ],
  [
    'Cabina deslizable \'Weather House\'',
    {
      en: 'Sliding cab \'Weather House\'',
      de: 'Verschiebbare Kabine \'Weather House\'',
      pt: 'Cabine deslizante \'Weather House\'',
    },
  ],
  [
    'Variable - high compaction\nTHE screed disponible',
    {
      en: 'Variable - high compaction\nTHE screed available',
      de: 'Variabel - hohe Verdichtung\nTHE-Verdichter verfügbar',
      pt: 'Variável - alta compactação\nRégua THE disponível',
    },
  ],
  [
    'Modular V/R-Series',
    {
      en: 'Modular V/R-Series',
      de: 'Modular V/R-Series',
      pt: 'Modular V/R-Series',
    },
  ],
  [
    'Eco-mode + control auto rpm',
    {
      en: 'Eco-mode + auto rpm control',
      de: 'Eco-Mode + automatische Drehzahlregelung',
      pt: 'Eco-mode + controle auto rpm',
    },
  ],
  [
    'Variable (ajuste táctil)',
    {
      en: 'Variable (touch adjustment)',
      de: 'Variabel (Tastanpassung)',
      pt: 'Variável (ajuste táctil)',
    },
  ],
  [
    'Manual / hidráulica (opcional)',
    {
      en: 'Manual / hydraulic (optional)',
      de: 'Manuell / hydraulisch (optional)',
      pt: 'Manual / hidráulica (opcional)',
    },
  ],
  [
    'Amortiguados + apoyo hidráulico',
    {
      en: 'Damped + hydraulic support',
      de: 'Gedämpft + hydraulische Abstützung',
      pt: 'Amortecidos + apoio hidráulico',
    },
  ],
  [
    'Ajustables (estándar)',
    {
      en: 'Adjustable (standard)',
      de: 'Verstellbar (Standard)',
      pt: 'Ajustáveis (padrão)',
    },
  ],
  [
    'Cat Grade Control (OPCIONAL)',
    {
      en: 'Cat Grade Control (OPTIONAL)',
      de: 'Cat Grade Control (OPTIONAL)',
      pt: 'Cat Grade Control (OPCIONAL)',
    },
  ],
  [
    'Niveltronic Plus (integrado std.)',
    {
      en: 'Niveltronic Plus (integrated std.)',
      de: 'Niveltronic Plus (integriert Std.)',
      pt: 'Niveltronic Plus (integrado padrão)',
    },
  ],
  [
    'MOBA integrado (estándar)\n3D nivelación (opcional)',
    {
      en: 'MOBA integrated (standard)\n3D grading (optional)',
      de: 'MOBA integriert (Standard)\n3D-Nivellierung (optional)',
      pt: 'MOBA integrado (padrão)\nNivelamento 3D (opcional)',
    },
  ],
  [
    'PaveDock Assistant\n(comunicación camiones)',
    {
      en: 'PaveDock Assistant\n(truck communication)',
      de: 'PaveDock Assistant\n(LKW-Kommunikation)',
      pt: 'PaveDock Assistant\n(comunicação com caminhões)',
    },
  ],
  [
    'Product Link Elite\n(satélite / celular)',
    {
      en: 'Product Link Elite\n(satellite / cellular)',
      de: 'Product Link Elite\n(Satellit / Mobilfunk)',
      pt: 'Product Link Elite\n(satélite / celular)',
    },
  ],
  [
    '400 mm - hasta 84 rpm',
    {
      en: '400 mm - up to 84 rpm',
      de: '400 mm - bis 84 rpm',
      pt: '400 mm - até 84 rpm',
    },
  ],
  [
    '400 mm - Espesor 15 mm',
    {
      en: '400 mm - Thickness 15 mm',
      de: '400 mm - Dicke 15 mm',
      pt: '400 mm - Espessura 15 mm',
    },
  ],
  [
    '19.400 kg (AB500 hasta 5m)\n25.150 kg (AB500 hasta 8,5m)',
    {
      en: '19,400 kg (AB500 up to 5m)\n25,150 kg (AB500 up to 8.5m)',
      de: '19.400 kg (AB500 bis 5m)\n25.150 kg (AB500 bis 8,5m)',
      pt: '19.400 kg (AB500 até 5m)\n25.150 kg (AB500 até 8,5m)',
    },
  ],
  [
    '19.000 kg (c/regla std.)',
    {
      en: '19,000 kg (with std. screed)',
      de: '19.000 kg (mit Std.-Verdichter)',
      pt: '19.000 kg (c/régua padrão)',
    },
  ],
  [
    '~24.000 € total en 3 años\n(recambio anual ~8.000 €)',
    {
      en: '~€24,000 total over 3 years\n(annual replacement ~€8,000)',
      de: '~24.000 € gesamt in 3 Jahren\n(jährlicher Wechsel ~8.000 €)',
      pt: '~24.000 € total em 3 anos\n(recambio anual ~8.000 €)',
    },
  ],
  [
    '~8.000 € total en 3 años\n(recambio cada 2–3 años)',
    {
      en: '~€8,000 total over 3 years\n(replacement every 2–3 years)',
      de: '~8.000 € gesamt in 3 Jahren\n(Wechsel alle 2–3 Jahre)',
      pt: '~8.000 € total em 3 anos\n(recambio a cada 2–3 anos)',
    },
  ],
  [
    '~366 kg CO₂ estimado (+55% vs BOMAG)',
    {
      en: '~366 kg CO₂ estimated (+55% vs BOMAG)',
      de: '~366 kg CO₂ geschätzt (+55% vs BOMAG)',
      pt: '~366 kg CO₂ estimado (+55% vs BOMAG)',
    },
  ],
  [
    '~273 kg CO₂ estimado (10,5 l/h × 26 kg)',
    {
      en: '~273 kg CO₂ estimated (10.5 l/h × 26 kg)',
      de: '~273 kg CO₂ geschätzt (10,5 l/h × 26 kg)',
      pt: '~273 kg CO₂ estimado (10,5 l/h × 26 kg)',
    },
  ],
  [
    '~273 kg estimado',
    {
      en: '~273 kg estimated',
      de: '~273 kg geschätzt',
      pt: '~273 kg estimado',
    },
  ],
  [
    '27 kg (10,5 L) — eléctr.',
    {
      en: '27 kg (10.5 L) — electric',
      de: '27 kg (10,5 L) — elektr.',
      pt: '27 kg (10,5 L) — elétr.',
    },
  ],
  [
    '~30 min (50% más rápido)',
    {
      en: '~30 min (50% faster)',
      de: '~30 Min. (50% schneller)',
      pt: '~30 min (50% mais rápido)',
    },
  ],
  [
    '~30–60 min (gas: sin motor)',
    {
      en: '~30–60 min (gas: no engine)',
      de: '~30–60 Min. (Gas: ohne Motor)',
      pt: '~30–60 min (gás: sem motor)',
    },
  ],
  [
    'Cada 2–3 años',
    {
      en: 'Every 2–3 years',
      de: 'Alle 2–3 Jahre',
      pt: 'A cada 2–3 anos',
    },
  ],
  [
    'Eléctrico o Gas (opción)',
    {
      en: 'Electric or gas (option)',
      de: 'Elektrisch oder Gas (Option)',
      pt: 'Elétrica ou gás (opção)',
    },
  ],
  [
    'Eléctrico generador directo',
    {
      en: 'Electric direct generator',
      de: 'Elektrischer Direktgenerator',
      pt: 'Elétrico gerador direto',
    },
  ],
  [
    'Eléctrico estándar',
    {
      en: 'Standard electric',
      de: 'Elektrisch Standard',
      pt: 'Elétrico padrão',
    },
  ],
  [
    'No especificado',
    {
      en: 'Not specified',
      de: 'Nicht angegeben',
      pt: 'Não especificado',
    },
  ],
  [
    'No publicado',
    {
      en: 'Not published',
      de: 'Nicht veröffentlicht',
      pt: 'Não publicado',
    },
  ],
  [
    'estimado',
    {
      en: 'estimated',
      de: 'geschätzt',
      pt: 'estimado',
    },
  ],
  [
    'Anual',
    {
      en: 'Annual',
      de: 'Jährlich',
      pt: 'Anual',
    },
  ],
  [
    'N/D',
    {
      en: 'N/A',
      de: 'k. A.',
      pt: 'N/D',
    },
  ],
  [
    '(con reducciones)',
    {
      en: '(with reductions)',
      de: '(mit Verbreiterungen)',
      pt: '(com reduções)',
    },
  ],
  [
    '(con zapatas)',
    {
      en: '(with extensions)',
      de: '(mit Verbreiterungen)',
      pt: '(com sapatas)',
    },
  ],
  [
    'estándar',
    {
      en: 'standard',
      de: 'Standard',
      pt: 'padrão',
    },
  ],
  [
    'ESTÁNDAR',
    {
      en: 'STANDARD',
      de: 'STANDARD',
      pt: 'PADRÃO',
    },
  ],
  [
    'opcional',
    {
      en: 'optional',
      de: 'optional',
      pt: 'opcional',
    },
  ],
  [
    'OPCIONAL',
    {
      en: 'OPTIONAL',
      de: 'OPTIONAL',
      pt: 'OPCIONAL',
    },
  ],
  [
    'Hasta ',
    {
      en: 'Up to ',
      de: 'Bis ',
      pt: 'Até ',
    },
  ],
];

export function localizePaverText(text: string, lang: Language): string {
  if (!text || lang === 'es') return text;

  let result = text;
  for (const [phrase, translations] of PHRASE_REPLACEMENTS) {
    if (result.includes(phrase)) {
      result = result.split(phrase).join(translations[lang]);
    }
  }
  return result;
}
