import { LocalizedText, PaverMachineSpec } from './paversData';

type UspKey = 'usp1' | 'usp2' | 'usp3' | 'usp4' | 'usp5' | 'usp6' | 'usp7' | 'usp8' | 'usp9';
type UspOverrides = Partial<Record<UspKey, Pick<LocalizedText, 'en' | 'de' | 'pt'>>>;

const PAVER_USP_I18N: Record<string, UspOverrides> = {
  'CATERPILLAR|AP655': {
    usp1: {
      en: 'Standard electric - ~15 min - Life 1,000–1,500 h - Annual replacement ~€8,000',
      de: 'Elektrisch Standard - ~15 Min. - Lebensdauer 1.000–1.500 h - Jährlicher Wechsel ~8.000 €',
      pt: 'Elétrico padrão - ~15 min - Vida útil 1.000–1.500 h - Recambio anual ~8.000 €',
    },
    usp2: {
      en: 'Not published in spec sheet',
      de: 'Nicht im technischen Datenblatt veröffentlicht',
      pt: 'Não publicado na ficha técnica',
    },
    usp3: {
      en: 'Eco-mode: engine rpm reduction',
      de: 'Eco-Mode: Motor-Drehzahlreduktion',
      pt: 'Eco-mode: redução de rpm do motor',
    },
    usp4: {
      en: 'Manual / conventional hydraulic',
      de: 'Manuell / konventionelle Hydraulik',
      pt: 'Manual / hidráulico convencional',
    },
    usp5: {
      en: 'Dual rotating station (backup)',
      de: 'Doppelte Drehstation (Backup)',
      pt: 'Estação dupla giratória (backup)',
    },
    usp6: {
      en: 'Adjustable (standard)',
      de: 'Verstellbar (Standard)',
      pt: 'Ajustáveis (padrão)',
    },
    usp7: {
      en: 'Cat Grade Control = OPTIONAL (additional cost)',
      de: 'Cat Grade Control = OPTIONAL (Mehrkosten)',
      pt: 'Cat Grade Control = OPCIONAL (custo adicional)',
    },
    usp8: {
      en: '~€24,000 total over 3 years\n(annual replacement ~€8,000)',
      de: '~24.000 € gesamt in 3 Jahren\n(jährlicher Wechsel ~8.000 €)',
      pt: '~24.000 € total em 3 anos\n(recambio anual ~8.000 €)',
    },
    usp9: {
      en: '~366 kg CO₂ estimated (+55% vs BOMAG)',
      de: '~366 kg CO₂ geschätzt (+55% vs BOMAG)',
      pt: '~366 kg CO₂ estimado (+55% vs BOMAG)',
    },
  },
  'BOMAG|BF600 C-3': {
    usp1: {
      en: '50% faster - 50% less fuel in setup - Life 3,000–5,000 h - Savings ~€16,000 over 3 years',
      de: '50% schneller - 50% weniger Kraftstoff im Setup - Lebensdauer 3.000–5.000 h - Ersparnis ~16.000 € in 3 Jahren',
      pt: '50% mais rápido - 50% menos combustível no setup - Vida útil 3.000–5.000 h - Economia ~16.000 € em 3 anos',
    },
    usp2: {
      en: '8.9 l/h average measured\n235 kg CO₂ / 10h shift',
      de: '8,9 l/h Durchschnitt gemessen\n235 kg CO₂ / 10h-Schicht',
      pt: '8,9 l/h média medida\n235 kg CO₂ / jornada 10h',
    },
    usp3: {
      en: 'Active hydraulic pump regulation based on real demand - Savings up to 17%',
      de: 'Aktive Regulierung der Hydraulikpumpen nach tatsächlichem Bedarf - Ersparnis bis 17%',
      pt: 'Regulação ativa das bombas hidráulicas conforme demanda real - Economia até 17%',
    },
    usp4: {
      en: 'No bolts - no tools - min. re-equipment time - BOMAG EXCLUSIVE',
      de: 'Keine Schrauben - kein Werkzeug - min. Umrüstzeit - EXKLUSIV BOMAG',
      pt: 'Sem parafusos - sem ferramentas - mín. tempo de reequipamento - EXCLUSIVO BOMAG',
    },
    usp5: {
      en: 'Seat + console slideable to the side - direct view of screed and edge - STANDARD',
      de: 'Sitz + Konsole seitlich verschiebbar - direkte Sicht auf Verdichter und Kante - STANDARD',
      pt: 'Assento + console deslizáveis para o lateral - visão direta da régua e borda - PADRÃO',
    },
    usp6: {
      en: 'Damped + hydraulic support',
      de: 'Gedämpft + hydraulische Abstützung',
      pt: 'Amortecidos + apoio hidráulico',
    },
    usp7: {
      en: 'Integrated controller + slope sensor STANDARD (lateral)',
      de: 'Integrierter Regler + Neigungssensor STANDARD (seitlich)',
      pt: 'Controlador integrado + sensor de inclinação PADRÃO (lateral)',
    },
    usp8: {
      en: '~€8,000 total over 3 years\n(replacement every 2–3 years)',
      de: '~8.000 € gesamt in 3 Jahren\n(Wechsel alle 2–3 Jahre)',
      pt: '~8.000 € total em 3 anos\n(recambio a cada 2–3 anos)',
    },
    usp9: {
      en: '235 kg CO₂ (90.5 L diesel)',
      de: '235 kg CO₂ (90,5 L Diesel)',
      pt: '235 kg CO₂ (90,5 L diesel)',
    },
  },
  'VÖGELE|Super 1800-3': {
    usp1: {
      en: 'Electric direct generator - Annual replacement ~€8,000',
      de: 'Elektrischer Direktgenerator - Jährlicher Wechsel ~8.000 €',
      pt: 'Elétrico gerador direto - Recambio anual ~8.000 €',
    },
    usp2: {
      en: 'Not published in spec sheet',
      de: 'Nicht im technischen Datenblatt veröffentlicht',
      pt: 'Não publicado na ficha técnica',
    },
    usp3: {
      en: 'EcoPlus: 4 mechanisms - up to 25% savings',
      de: 'EcoPlus: 4 Mechanismen - bis zu 25% Ersparnis',
      pt: 'EcoPlus: 4 mecanismos - até 25% de economia',
    },
    usp4: {
      en: 'Standard mechanical + hydraulic sections (SB300)',
      de: 'Mechanisch Standard + hydr. Segmente (SB300)',
      pt: 'Mecânicas padrão + trechos hidr. (SB300)',
    },
    usp5: {
      en: 'Sliding platform with console',
      de: 'Verschiebbare Plattform mit Konsole',
      pt: 'Plataforma deslizante com console',
    },
    usp6: {
      en: 'Oscillating std. - PaveDock elastic (optional)',
      de: 'Schwingend Std. - PaveDock elastisch (optional)',
      pt: 'Oscilantes padrão - PaveDock elástico (opcional)',
    },
    usp7: {
      en: 'Niveltronic Plus — integrated standard',
      de: 'Niveltronic Plus — integriert Standard',
      pt: 'Niveltronic Plus — integrado padrão',
    },
    usp8: {
      en: '~€24,000 total over 3 years\n(annual replacement ~€8,000)',
      de: '~24.000 € gesamt in 3 Jahren\n(jährlicher Wechsel ~8.000 €)',
      pt: '~24.000 € total em 3 anos\n(recambio anual ~8.000 €)',
    },
    usp9: {
      en: 'Not published',
      de: 'Nicht veröffentlicht',
      pt: 'Não publicado',
    },
  },
  'DYNAPAC|SD2500CS': {
    usp1: {
      en: 'Electric or gas (no engine) - Annual replacement ~€8,000',
      de: 'Elektrisch oder Gas (ohne Motor) - Jährlicher Wechsel ~8.000 €',
      pt: 'Elétrica ou gás (sem motor) - Recambio anual ~8.000 €',
    },
    usp2: {
      en: '10.5 l/h published in spec sheet\n~273 kg CO₂ / estimated shift',
      de: '10,5 l/h laut Datenblatt\n~273 kg CO₂ / geschätzte Schicht',
      pt: '10,5 l/h publicado na ficha\n~273 kg CO₂ / jornada estimada',
    },
    usp3: {
      en: 'VarioSpeed: automatic adaptive rpm',
      de: 'VarioSpeed: automatische adaptive Drehzahl',
      pt: 'VarioSpeed: rpm adaptativo automático',
    },
    usp4: {
      en: 'Modular V-Series / R-Series system',
      de: 'Modulares V-Series / R-Series System',
      pt: 'Sistema modular V-Series / R-Series',
    },
    usp5: {
      en: 'Sliding cab \'Weather House\'',
      de: 'Verschiebbare Kabine \'Weather House\'',
      pt: 'Cabine deslizante \'Weather House\'',
    },
    usp6: {
      en: 'Fixed pivoting std. - hydraulic damped (optional)',
      de: 'Fest schwenkbar Std. - hydraulisch gedämpft (optional)',
      pt: 'Fixo pivotante padrão - hidráulico amortecido (opcional)',
    },
    usp7: {
      en: 'MOBA integrated standard + 3D (optional)',
      de: 'MOBA integriert Standard + 3D (optional)',
      pt: 'MOBA integrado padrão + 3D (opcional)',
    },
    usp8: {
      en: '~€24,000 total over 3 years\n(annual replacement ~€8,000)',
      de: '~24.000 € gesamt in 3 Jahren\n(jährlicher Wechsel ~8.000 €)',
      pt: '~24.000 € total em 3 anos\n(recambio anual ~8.000 €)',
    },
    usp9: {
      en: '~273 kg CO₂ estimated (10.5 l/h × 26 kg)',
      de: '~273 kg CO₂ geschätzt (10,5 l/h × 26 kg)',
      pt: '~273 kg CO₂ estimado (10,5 l/h × 26 kg)',
    },
  },
};

function machineKey(m: PaverMachineSpec): string {
  return `${m.brand}|${m.model}`;
}

export function applyPaverI18n(machines: PaverMachineSpec[]): PaverMachineSpec[] {
  return machines.map((machine) => {
    const overrides = PAVER_USP_I18N[machineKey(machine)];
    if (!overrides) return machine;

    const updated = { ...machine };
    (Object.keys(overrides) as UspKey[]).forEach((uspKey) => {
      const patch = overrides[uspKey];
      if (patch) {
        updated[uspKey] = { ...machine[uspKey], ...patch };
      }
    });
    return updated;
  });
}
