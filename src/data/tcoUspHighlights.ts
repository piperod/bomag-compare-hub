import type { LocalizedText } from './paversData';

// Key BOMAG USPs per product line, ordered by their impact on the total cost of ownership (TCO).
// Shown at the top of the financial analysis so every cost comparison against a competitor
// starts from the BOMAG arguments. `inModel` marks the levers the TCO calculation already applies.
const loc = (es: string, en: string, de: string, pt: string): LocalizedText => ({ es, en, de, pt });

export type TcoDriver = 'fuel' | 'wear' | 'maintenance' | 'productivity' | 'uptime' | 'transport' | 'capex' | 'resale' | 'co2';

export type TcoUspHighlight = {
  driver: TcoDriver;
  title: LocalizedText;
  impact: LocalizedText;
  detail: LocalizedText;
  models: string;
  inModel: boolean;
  source: string;
};

export type TcoLine = 'sdr' | 'ltr' | 'htr' | 'ptr' | 'milling' | 'pavers';

export const TCO_USP_HIGHLIGHTS: Record<TcoLine, TcoUspHighlight[]> = {
  sdr: [
    {
      driver: 'productivity',
      title: loc('ECONOMIZER / TERRAMETER', 'ECONOMIZER / TERRAMETER', 'ECONOMIZER / TERRAMETER', 'ECONOMIZER / TERRAMETER'),
      impact: loc('+25 % rendimiento', '+25 % output', '+25 % Leistung', '+25 % rendimento'),
      detail: loc(
        'Medición de compactación en tiempo real: evita pasadas innecesarias y reduce horas, combustible y desgaste por m³.',
        'Real-time compaction measurement: avoids unnecessary passes and cuts hours, fuel and wear per m³.',
        'Verdichtungsmessung in Echtzeit: vermeidet unnötige Übergänge und senkt Stunden, Kraftstoff und Verschleiß pro m³.',
        'Medição de compactação em tempo real: evita passadas desnecessárias e reduz horas, combustível e desgaste por m³.'
      ),
      models: 'BW 211–220 D-5',
      inModel: true,
      source: 'Manual de aplicación BOMAG (multiplicador ×1,25)',
    },
    {
      driver: 'maintenance',
      title: loc('Articulación libre de mantenimiento', 'Maintenance-free articulation joint', 'Wartungsfreies Knickgelenk', 'Articulação livre de manutenção'),
      impact: loc('0 engrases', '0 greasing', '0 Abschmieren', '0 lubrificações'),
      detail: loc(
        'La competencia engrasa cada 50 h con 0,5 h de máquina parada: mano de obra, grasa y productividad perdida.',
        'Competitors grease every 50 h with 0.5 h downtime: labour, grease and lost productivity.',
        'Wettbewerber schmieren alle 50 h mit 0,5 h Stillstand: Arbeitszeit, Fett und Produktivitätsverlust.',
        'A concorrência lubrifica a cada 50 h com 0,5 h de máquina parada: mão de obra, graxa e produtividade perdida.'
      ),
      models: 'BW 211–220 D-5',
      inModel: true,
      source: 'Tabla BOMAG de mantenimiento de articulación',
    },
    {
      driver: 'productivity',
      title: loc('Amplitud alta (2,2 mm)', 'High amplitude (2.2 mm)', 'Hohe Amplitude (2,2 mm)', 'Amplitude alta (2,2 mm)'),
      impact: loc('Capas más gruesas', 'Thicker layers', 'Dickere Schichten', 'Camadas mais espessas'),
      detail: loc(
        'Mayor profundidad de compactación por pasada: más m³ por hora con el mismo consumo.',
        'Greater compaction depth per pass: more m³ per hour at the same consumption.',
        'Größere Verdichtungstiefe pro Übergang: mehr m³ pro Stunde bei gleichem Verbrauch.',
        'Maior profundidade de compactação por passada: mais m³ por hora com o mesmo consumo.'
      ),
      models: 'BW 211–220 D-5',
      inModel: true,
      source: 'Fichas técnicas BW D-5',
    },
    {
      driver: 'fuel',
      title: loc('ECOMODE', 'ECOMODE', 'ECOMODE', 'ECOMODE'),
      impact: loc('Menor consumo', 'Lower consumption', 'Geringerer Verbrauch', 'Menor consumo'),
      detail: loc(
        'Régimen del motor según la carga real. El ahorro no está cuantificado en las fichas SDR: usar el consumo medido en obra.',
        'Engine speed matched to the real load. Savings are not quantified in the SDR datasheets: use measured jobsite consumption.',
        'Motordrehzahl nach tatsächlicher Last. Die Einsparung ist in den SDR-Datenblättern nicht beziffert: gemessenen Baustellenverbrauch verwenden.',
        'Rotação do motor conforme a carga real. A economia não está quantificada nas fichas SDR: usar o consumo medido em obra.'
      ),
      models: 'BW 211–220 D-5',
      inModel: false,
      source: 'Fichas técnicas BW D-5',
    },
  ],
  ltr: [
    {
      driver: 'fuel',
      title: loc('ECOSTOP', 'ECOSTOP', 'ECOSTOP', 'ECOSTOP'),
      impact: loc('Sin ralentí', 'No idling', 'Kein Leerlauf', 'Sem marcha lenta'),
      detail: loc(
        'Apagado automático al ralentí: menos combustible y menos horas de motor, que además mejoran el valor de reventa.',
        'Automatic idle shut-down: less fuel and fewer engine hours, which also improves resale value.',
        'Automatische Leerlaufabschaltung: weniger Kraftstoff und Motorstunden, was auch den Wiederverkaufswert verbessert.',
        'Desligamento automático em marcha lenta: menos combustível e menos horas de motor, o que também melhora o valor de revenda.'
      ),
      models: 'BW 120 AD-5',
      inModel: false,
      source: 'Ficha técnica BW 100/120 AD-5',
    },
    {
      driver: 'productivity',
      title: loc('Vibración en ambos tambores + IVC', 'Vibration on both drums + IVC', 'Vibration an beiden Bandagen + IVC', 'Vibração nos dois tambores + IVC'),
      impact: loc('70-120 t/h', '70-120 t/h', '70-120 t/h', '70-120 t/h'),
      detail: loc(
        'Fuerza centrífuga 36/41 kN: de 20-45 t/h (capas de 2-4 cm) a 70-120 t/h (capas de 10-12 cm) de asfalto.',
        '36/41 kN centrifugal force: from 20-45 t/h (2-4 cm layers) to 70-120 t/h (10-12 cm layers) of asphalt.',
        'Zentrifugalkraft 36/41 kN: von 20-45 t/h (2-4 cm Schichten) bis 70-120 t/h (10-12 cm Schichten) Asphalt.',
        'Força centrífuga 36/41 kN: de 20-45 t/h (camadas de 2-4 cm) a 70-120 t/h (camadas de 10-12 cm) de asfalto.'
      ),
      models: 'BW 120 AD-5',
      inModel: false,
      source: 'Ficha técnica BW 100/120 AD-5',
    },
    {
      driver: 'maintenance',
      title: loc('Mantenimiento sencillo', 'Simple maintenance', 'Einfache Wartung', 'Manutenção simples'),
      impact: loc('Menos horas de taller', 'Fewer workshop hours', 'Weniger Werkstattstunden', 'Menos horas de oficina'),
      detail: loc(
        'Capó de material compuesto con acceso directo al motor, 2 rascadores pretensados por tambor y aspiración de anticongelante.',
        'Composite hood with direct engine access, 2 pre-tensioned scrapers per drum and antifreeze suction.',
        'Verbundwerkstoff-Haube mit direktem Motorzugang, 2 vorgespannte Abstreifer je Bandage und Frostschutz-Ansaugung.',
        'Capô de material compósito com acesso direto ao motor, 2 raspadores pré-tensionados por tambor e aspiração de anticongelante.'
      ),
      models: 'BW 120 AD-5',
      inModel: false,
      source: 'Ficha técnica BW 100/120 AD-5',
    },
    {
      driver: 'productivity',
      title: loc('ECONOMIZER + JOBLINK / BOMAP', 'ECONOMIZER + JOBLINK / BOMAP', 'ECONOMIZER + JOBLINK / BOMAP', 'ECONOMIZER + JOBLINK / BOMAP'),
      impact: loc('Menos pasadas', 'Fewer passes', 'Weniger Übergänge', 'Menos passadas'),
      detail: loc(
        'ECONOMIZER con temperatura del asfalto y documentación GPS (opcionales): compactar solo lo necesario.',
        'ECONOMIZER with asphalt temperature and GPS documentation (optional): compact only what is needed.',
        'ECONOMIZER mit Asphalttemperatur und GPS-Dokumentation (optional): nur so viel verdichten wie nötig.',
        'ECONOMIZER com temperatura do asfalto e documentação GPS (opcionais): compactar só o necessário.'
      ),
      models: 'BW 120 AD-5',
      inModel: false,
      source: 'Ficha técnica BW 100/120 AD-5',
    },
  ],
  htr: [
    {
      driver: 'fuel',
      title: loc('ECOMODE', 'ECOMODE', 'ECOMODE', 'ECOMODE'),
      impact: loc('Hasta -30 % combustible', 'Up to -30 % fuel', 'Bis zu -30 % Kraftstoff', 'Até -30 % combustível'),
      detail: loc(
        'Régimen del motor según la carga con frecuencia de vibración constante: miles de litros de ahorro al año.',
        'Load-dependent engine speed with constant vibration frequency: thousands of litres saved per year.',
        'Lastabhängige Motordrehzahl bei konstanter Vibrationsfrequenz: Tausende Liter Ersparnis pro Jahr.',
        'Rotação do motor conforme a carga com frequência de vibração constante: milhares de litros economizados por ano.'
      ),
      models: 'BW 161 AD-4',
      inModel: false,
      source: 'Folleto rodillos tándem >5 t (PRS 103 017)',
    },
    {
      driver: 'wear',
      title: loc('Oscilación TanGO', 'TanGO oscillation', 'TanGO-Oszillation', 'Oscilação TanGO'),
      impact: loc('-1,1 l/h · tambor 6.000 h', '-1.1 l/h · 6,000 h drum', '-1,1 l/h · 6.000 h Bandage', '-1,1 l/h · tambor 6.000 h'),
      detail: loc(
        'Consume 1,1 l/h menos que una oscilación convencional y el tambor tiene garantía de 6.000 h de servicio.',
        'Uses 1.1 l/h less than conventional oscillation and the drum is guaranteed for 6,000 operating hours.',
        'Verbraucht 1,1 l/h weniger als eine konventionelle Oszillation, die Bandage hat 6.000 h Garantie.',
        'Consome 1,1 l/h a menos que uma oscilação convencional e o tambor tem garantia de 6.000 h de serviço.'
      ),
      models: 'BW 161 ADO-4',
      inModel: false,
      source: 'Folleto rodillos tándem >5 t (PRS 103 017)',
    },
    {
      driver: 'maintenance',
      title: loc('Sin puntos de engrase', 'No grease points', 'Keine Schmierstellen', 'Sem pontos de lubrificação'),
      impact: loc('0 engrases', '0 greasing', '0 Abschmieren', '0 lubrificações'),
      detail: loc(
        'Cojinetes sellados con lubricación de por vida y puntos de servicio accesibles desde el suelo (EasyService).',
        'Sealed bearings with lifetime lubrication and service points accessible from the ground (EasyService).',
        'Abgedichtete Lager mit Lebensdauerschmierung und vom Boden erreichbare Wartungspunkte (EasyService).',
        'Rolamentos selados com lubrificação vitalícia e pontos de serviço acessíveis do solo (EasyService).'
      ),
      models: 'BW 161 AD-4',
      inModel: false,
      source: 'Folleto rodillos tándem >5 t (PRS 103 017)',
    },
    {
      driver: 'productivity',
      title: loc('ECONOMIZER / ASPHALT MANAGER', 'ECONOMIZER / ASPHALT MANAGER', 'ECONOMIZER / ASPHALT MANAGER', 'ECONOMIZER / ASPHALT MANAGER'),
      impact: loc('Menos pasadas', 'Fewer passes', 'Weniger Übergänge', 'Menos passadas'),
      detail: loc(
        'Indica el final de la compactación y ajusta la amplitud automáticamente: ahorro de tiempo y combustible, con documentación BCM.',
        'Shows the end of compaction and adjusts the amplitude automatically: saves time and fuel, with BCM documentation.',
        'Zeigt das Verdichtungsende und passt die Amplitude automatisch an: spart Zeit und Kraftstoff, mit BCM-Dokumentation.',
        'Indica o fim da compactação e ajusta a amplitude automaticamente: economia de tempo e combustível, com documentação BCM.'
      ),
      models: 'BW 161 AD-4 / AM',
      inModel: false,
      source: 'Folleto rodillos tándem >5 t (PRS 103 017)',
    },
    {
      driver: 'resale',
      title: loc('ECOSTOP', 'ECOSTOP', 'ECOSTOP', 'ECOSTOP'),
      impact: loc('Menos horas de motor', 'Fewer engine hours', 'Weniger Motorstunden', 'Menos horas de motor'),
      detail: loc(
        'Apaga el motor tras un tiempo al ralentí: menos desgaste y horómetro más bajo, con mejor valor de reventa.',
        'Shuts the engine down after a set idle time: less wear and a lower hour meter, for better resale value.',
        'Schaltet den Motor nach definierter Leerlaufzeit ab: weniger Verschleiß, weniger Betriebsstunden, besserer Wiederverkaufswert.',
        'Desliga o motor após um tempo em marcha lenta: menos desgaste e horímetro mais baixo, com melhor valor de revenda.'
      ),
      models: 'BW 161 AD-4',
      inModel: false,
      source: 'Folleto rodillos tándem >5 t (PRS 103 017)',
    },
  ],
  ptr: [
    {
      driver: 'productivity',
      title: loc('Rango de lastre amplio', 'Wide ballast range', 'Großer Ballastbereich', 'Faixa de lastro ampla'),
      impact: loc('Hasta 24/27/28 t', 'Up to 24/27/28 t', 'Bis 24/27/28 t', 'Até 24/27/28 t'),
      detail: loc(
        'Una misma máquina cubre desde ~8,8 t hasta 24-28 t con lastre: menos equipos para distintas aplicaciones.',
        'One machine covers from ~8.8 t up to 24-28 t with ballast: fewer machines for different applications.',
        'Eine Maschine deckt ~8,8 t bis 24-28 t mit Ballast ab: weniger Maschinen für verschiedene Anwendungen.',
        'Uma mesma máquina cobre de ~8,8 t até 24-28 t com lastro: menos equipamentos para aplicações diferentes.'
      ),
      models: 'BW 24 RH / BW 27 RH / BW 28 RH',
      inModel: false,
      source: 'Fichas técnicas BW RH',
    },
    {
      driver: 'fuel',
      title: loc('BOMAG ECOMODE', 'BOMAG ECOMODE', 'BOMAG ECOMODE', 'BOMAG ECOMODE'),
      impact: loc('Menor consumo', 'Lower consumption', 'Geringerer Verbrauch', 'Menor consumo'),
      detail: loc(
        'ECOMODE de serie en la BW 28 RH. Falta el consumo medido en obra para cuantificar el ahorro frente a la competencia.',
        'ECOMODE as standard on the BW 28 RH. Measured jobsite consumption is still needed to quantify savings against competitors.',
        'ECOMODE serienmäßig bei der BW 28 RH. Für die Bezifferung fehlt noch der gemessene Baustellenverbrauch.',
        'ECOMODE de série na BW 28 RH. Falta o consumo medido em obra para quantificar a economia frente à concorrência.'
      ),
      models: 'BW 28 RH',
      inModel: false,
      source: 'Ficha técnica BW 28 RH',
    },
    {
      driver: 'transport',
      title: loc('Traslado rápido entre obras', 'Fast relocation between jobsites', 'Schnelles Umsetzen zwischen Baustellen', 'Deslocamento rápido entre obras'),
      impact: loc('Hasta 19-20 km/h', 'Up to 19-20 km/h', 'Bis 19-20 km/h', 'Até 19-20 km/h'),
      detail: loc(
        'Velocidad de traslado de hasta 19-20 km/h: menos necesidad de cama baja en obras cercanas.',
        'Travel speed of up to 19-20 km/h: less need for a low-bed trailer between nearby jobsites.',
        'Fahrgeschwindigkeit bis 19-20 km/h: seltener Tieflader zwischen nahen Baustellen nötig.',
        'Velocidade de deslocamento de até 19-20 km/h: menos necessidade de prancha entre obras próximas.'
      ),
      models: 'BW 24 RH / BW 27 RH / BW 28 RH',
      inModel: false,
      source: 'Fichas técnicas BW RH',
    },
  ],
  milling: [
    {
      driver: 'wear',
      title: loc('Portapicas BMS15L / BMS 15 EVO', 'BMS15L / BMS 15 EVO tool holders', 'Meißelhalter BMS15L / BMS 15 EVO', 'Porta-dentes BMS15L / BMS 15 EVO'),
      impact: loc('-20 % desgaste', '-20 % wear', '-20 % Verschleiß', '-20 % desgaste'),
      detail: loc(
        'Hasta 20 % menos desgaste de herramientas; la versión EVO (serie BM/65) dura hasta 50 % más que la BMS15L. Solo 100 Nm de apriete.',
        'Up to 20 % less tool wear; the EVO version (BM/65 series) lasts up to 50 % longer than BMS15L. Only 100 Nm tightening torque.',
        'Bis zu 20 % weniger Werkzeugverschleiß; die EVO-Version (Serie BM/65) hält bis zu 50 % länger als BMS15L. Nur 100 Nm Anzugsmoment.',
        'Até 20 % menos desgaste de ferramentas; a versão EVO (série BM/65) dura até 50 % mais que a BMS15L. Apenas 100 Nm de aperto.'
      ),
      models: 'BM 1000/20, BM /35-2, BM 2000/58, BM /65',
      inModel: true,
      source: 'Presentaciones BM 1000/20, BM /35-2, BM 2000/58 y folleto BM/65',
    },
    {
      driver: 'fuel',
      title: loc('Consumo medido en obra', 'Measured jobsite consumption', 'Gemessener Baustellenverbrauch', 'Consumo medido em obra'),
      impact: loc('17-29 l/h', '17-29 l/h', '17-29 l/h', '17-29 l/h'),
      detail: loc(
        'BM 1000/35-2 ~18,5 · BM 1200/35-2 ~18,8 · BM 1300/35-2 ~17,3 · BM 2000/58 ~29 l/h (flotas medidas durante 2 años). Serie BM/65: hasta 20 % menos combustible.',
        'BM 1000/35-2 ~18.5 · BM 1200/35-2 ~18.8 · BM 1300/35-2 ~17.3 · BM 2000/58 ~29 l/h (fleets measured over 2 years). BM/65 series: up to 20 % less fuel.',
        'BM 1000/35-2 ~18,5 · BM 1200/35-2 ~18,8 · BM 1300/35-2 ~17,3 · BM 2000/58 ~29 l/h (Flotten über 2 Jahre gemessen). Serie BM/65: bis zu 20 % weniger Kraftstoff.',
        'BM 1000/35-2 ~18,5 · BM 1200/35-2 ~18,8 · BM 1300/35-2 ~17,3 · BM 2000/58 ~29 l/h (frotas medidas por 2 anos). Série BM/65: até 20 % menos combustível.'
      ),
      models: 'BM /35-2, BM 2000/58, BM /65',
      inModel: true,
      source: 'Presentaciones BM /35-2 y BM 2000/58; folleto BM/65',
    },
    {
      driver: 'productivity',
      title: loc('Radio de giro mínimo', 'Minimum turning radius', 'Minimaler Wenderadius', 'Raio de giro mínimo'),
      impact: loc('1,7 m (clase 2 m)', '1.7 m (2 m class)', '1,7 m (2-m-Klasse)', '1,7 m (classe 2 m)'),
      detail: loc(
        'BM 2000/58 y serie BM/65: el menor radio de su clase y cinta con giro de hasta 130°, menos maniobras en rotondas y esquinas.',
        'BM 2000/58 and BM/65 series: the smallest radius in their class and conveyor slewing up to 130°, fewer manoeuvres at roundabouts and corners.',
        'BM 2000/58 und Serie BM/65: kleinster Radius ihrer Klasse und Bandschwenkung bis 130°, weniger Rangieren in Kreisverkehren und Ecken.',
        'BM 2000/58 e série BM/65: o menor raio da categoria e correia com giro de até 130°, menos manobras em rotatórias e esquinas.'
      ),
      models: 'BM 2000/58, BM /65',
      inModel: true,
      source: 'Presentación BM 2000/58; folleto BM/65',
    },
    {
      driver: 'transport',
      title: loc('Máquinas más livianas de su clase', 'Lightest machines in their class', 'Leichteste Maschinen ihrer Klasse', 'Máquinas mais leves da categoria'),
      impact: loc('<20 t / 27 t', '<20 t / 27 t', '<20 t / 27 t', '<20 t / 27 t'),
      detail: loc(
        'BM /35-2: 19,8 t de transporte (la más liviana de 350 hp). BM/65: 27 t CECE, transporte sin permisos especiales: menor costo de cama baja.',
        'BM /35-2: 19.8 t transport weight (lightest 350 hp machine). BM/65: 27 t CECE, transport without special permits: lower low-bed cost.',
        'BM /35-2: 19,8 t Transportgewicht (leichteste 350-PS-Maschine). BM/65: 27 t CECE, Transport ohne Sondergenehmigung: geringere Tiefladerkosten.',
        'BM /35-2: 19,8 t de transporte (a mais leve de 350 hp). BM/65: 27 t CECE, transporte sem licenças especiais: menor custo de prancha.'
      ),
      models: 'BM /35-2, BM /65',
      inModel: false,
      source: 'Presentación BM /35-2; folleto BM/65',
    },
    {
      driver: 'uptime',
      title: loc('Disponibilidad garantizada', 'Guaranteed availability', 'Gesicherte Verfügbarkeit', 'Disponibilidade garantida'),
      impact: loc('5 años / 5.000 h', '5 years / 5,000 h', '5 Jahre / 5.000 h', '5 anos / 5.000 h'),
      detail: loc(
        'Garantía de 5 años o 5.000 h en la pata giratoria (BM /35-2), cambio de tambor en menos de 15 min y motor auxiliar con tracción de emergencia (BM 2000/58, BM/65).',
        '5-year / 5,000 h warranty on the slewing leg (BM /35-2), drum change in under 15 min and auxiliary engine with emergency drive (BM 2000/58, BM/65).',
        '5 Jahre / 5.000 h Garantie auf das Schwenkbein (BM /35-2), Walzenwechsel in unter 15 min und Hilfsmotor mit Notfahrantrieb (BM 2000/58, BM/65).',
        'Garantia de 5 anos ou 5.000 h na perna giratória (BM /35-2), troca de tambor em menos de 15 min e motor auxiliar com tração de emergência (BM 2000/58, BM/65).'
      ),
      models: 'BM /35-2, BM 2000/58, BM /65',
      inModel: false,
      source: 'Presentaciones BM /35-2 y BM 2000/58; folleto BM/65',
    },
  ],
  pavers: [
    {
      driver: 'wear',
      title: loc('Calentamiento MAGMALIFE', 'MAGMALIFE heating', 'MAGMALIFE-Beheizung', 'Aquecimento MAGMALIFE'),
      impact: loc('~50 % más rápido · >3.000 h', '~50 % faster · >3,000 h', '~50 % schneller · >3.000 h', '~50 % mais rápido · >3.000 h'),
      detail: loc(
        'Placas de aluminio fundido: ~3,5 l de combustible de calentamiento por jornada frente a ~10,5 l, y vida útil de más de 3.000 h.',
        'Cast aluminium plates: ~3.5 l of heating fuel per shift instead of ~10.5 l, and a lifetime of over 3,000 h.',
        'Aluminiumguss-Platten: ~3,5 l Aufheizkraftstoff pro Schicht statt ~10,5 l und über 3.000 h Lebensdauer.',
        'Placas de alumínio fundido: ~3,5 l de combustível de aquecimento por jornada contra ~10,5 l, e vida útil de mais de 3.000 h.'
      ),
      models: 'BF 600-800 C-3 (de serie), BF 350-5 (opcional)',
      inModel: true,
      source: 'Datos de campo BOMAG; presentación de pavimentadoras',
    },
    {
      driver: 'fuel',
      title: loc('ECOMODE', 'ECOMODE', 'ECOMODE', 'ECOMODE'),
      impact: loc('-17 a -20 % combustible', '-17 to -20 % fuel', '-17 bis -20 % Kraftstoff', '-17 a -20 % combustível'),
      detail: loc(
        'Hidráulica load-sensing y régimen de 3 etapas: hasta 17 % de ahorro medido en campo (~20 % según la presentación) y menos ruido.',
        'Load-sensing hydraulics and 3-stage engine speed: up to 17 % savings measured in the field (~20 % per the presentation) and less noise.',
        'Load-Sensing-Hydraulik und 3-stufige Drehzahl: bis zu 17 % im Feld gemessene Einsparung (~20 % laut Präsentation) und weniger Lärm.',
        'Hidráulica load-sensing e rotação em 3 estágios: até 17 % de economia medida em campo (~20 % segundo a apresentação) e menos ruído.'
      ),
      models: 'Toda la gama BF',
      inModel: true,
      source: 'Datos de campo BOMAG 2019-2021; presentación de pavimentadoras',
    },
    {
      driver: 'wear',
      title: loc('Piezas de desgaste de la regla', 'Screed wear parts', 'Bohlen-Verschleißteile', 'Peças de desgaste da mesa'),
      impact: loc('~8.000 € en 3 años', '~€8,000 in 3 years', '~8.000 € in 3 Jahren', '~8.000 € em 3 anos'),
      detail: loc(
        'Dato medido para la BF600 C-3. Las planchas de alisado de 400 mm (las más largas del mercado) alargan el recambio.',
        'Measured for the BF600 C-3. The 400 mm wear plates (longest on the market) extend replacement intervals.',
        'Für die BF600 C-3 gemessen. Die 400-mm-Glättbleche (die längsten am Markt) verlängern das Wechselintervall.',
        'Dado medido para a BF600 C-3. As chapas de alisamento de 400 mm (as mais longas do mercado) prolongam a troca.'
      ),
      models: 'BF 600-800 C-3',
      inModel: true,
      source: 'Datos BOMAG BF600 C-3',
    },
    {
      driver: 'capex',
      title: loc('Nivelación incluida', 'Levelling included', 'Nivellierung inklusive', 'Nivelamento incluído'),
      impact: loc('Sin costo extra', 'No extra cost', 'Ohne Aufpreis', 'Sem custo extra'),
      detail: loc(
        'Controlador de nivelación integrado de serie en los paneles de la regla (BF 600-800): la competencia suele cobrarlo aparte.',
        'Levelling controller integrated as standard in the screed panels (BF 600-800): competitors often charge for it separately.',
        'Nivellierregler serienmäßig in den Bohlensteuerständen integriert (BF 600-800): Wettbewerber berechnen ihn oft extra.',
        'Controlador de nivelamento integrado de série nos painéis da mesa (BF 600-800): a concorrência costuma cobrá-lo à parte.'
      ),
      models: 'BF 600-800 C-3',
      inModel: false,
      source: 'Presentación de pavimentadoras; fichas técnicas BF C-3',
    },
    {
      driver: 'uptime',
      title: loc('QUICKCOUPLING', 'QUICKCOUPLING', 'QUICKCOUPLING', 'QUICKCOUPLING'),
      impact: loc('Montaje sin herramientas', 'Tool-free set-up', 'Werkzeugloses Rüsten', 'Montagem sem ferramentas'),
      detail: loc(
        'Extensiones de regla sin tornillos ni herramientas (exclusivo BOMAG): menos tiempo de montaje y más horas productivas por jornada.',
        'Screed extensions without bolts or tools (BOMAG exclusive): less set-up time and more productive hours per shift.',
        'Bohlenverbreiterungen ohne Schrauben und Werkzeug (BOMAG-exklusiv): weniger Rüstzeit, mehr produktive Stunden pro Schicht.',
        'Extensões da mesa sem parafusos nem ferramentas (exclusivo BOMAG): menos tempo de montagem e mais horas produtivas por jornada.'
      ),
      models: 'Toda la gama BF',
      inModel: false,
      source: 'Presentación de pavimentadoras',
    },
    {
      driver: 'co2',
      title: loc('Huella de CO₂', 'CO₂ footprint', 'CO₂-Fußabdruck', 'Pegada de CO₂'),
      impact: loc('235 kg CO₂ / jornada', '235 kg CO₂ / shift', '235 kg CO₂ / Schicht', '235 kg CO₂ / jornada'),
      detail: loc(
        'BF600 C-3: 90,5 l de diésel por jornada de 10 h. Útil en licitaciones con criterios ambientales.',
        'BF600 C-3: 90.5 l of diesel per 10 h shift. Useful in tenders with environmental criteria.',
        'BF600 C-3: 90,5 l Diesel pro 10-h-Schicht. Nützlich bei Ausschreibungen mit Umweltkriterien.',
        'BF600 C-3: 90,5 l de diesel por jornada de 10 h. Útil em licitações com critérios ambientais.'
      ),
      models: 'BF600 C-3',
      inModel: true,
      source: 'Datos de campo BOMAG BF600 C-3',
    },
  ],
};
