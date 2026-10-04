import type { LocalizedText } from './paversData';

// USP texts for BOMAG models, taken from BOMAG datasheets, brochures and product presentations.
const loc = (es: string, en: string, de: string, pt: string): LocalizedText => ({ es, en, de, pt });

type CompactionUsps = Record<'usp1' | 'usp2' | 'usp3' | 'usp4' | 'usp5' | 'usp6', LocalizedText>;
type MillingUsps = Record<'usp1' | 'usp2' | 'usp3' | 'usp4' | 'valueProposition', LocalizedText>;

// LTR — BW 120 AD-5: datasheet PRS 880 21 010 (Sa07)
export const BW120_AD5_USPS: CompactionUsps = {
  usp1: loc(
    'Operación sencilla\n* Palanca de marcha multifunción e indicador multifunción con horómetro\n* Intelligent Vibration Control (IVC) y vibración conectable por tambor\n* ECOSTOP: apagado automático al ralentí',
    'Simple operation\n* Multifunction drive lever and multifunction display with hour meter\n* Intelligent Vibration Control (IVC) and vibration switchable per drum\n* ECOSTOP: automatic idle shut-down',
    'Einfache Bedienung\n* Multifunktions-Fahrhebel und Multifunktionsanzeige mit Betriebsstundenzähler\n* Intelligent Vibration Control (IVC) und bandagenweise zuschaltbare Vibration\n* ECOSTOP: automatische Leerlaufabschaltung',
    'Operação simples\n* Alavanca de marcha multifunção e indicador multifunção com horímetro\n* Intelligent Vibration Control (IVC) e vibração acionável por tambor\n* ECOSTOP: desligamento automático em marcha lenta'
  ),
  usp2: loc(
    'Rendimiento de compactación\n* Vibración en ambos tambores: 63/67 Hz, amplitud 0,50 mm, fuerza centrífuga 36/41 kN\n* Asfalto: 20-45 t/h (capas 2-4 cm) hasta 70-120 t/h (capas 10-12 cm)\n* Pendiente superable 40 % sin vibración / 30 % con vibración',
    'Compaction performance\n* Vibration on both drums: 63/67 Hz, 0.50 mm amplitude, 36/41 kN centrifugal force\n* Asphalt: 20-45 t/h (2-4 cm layers) up to 70-120 t/h (10-12 cm layers)\n* Gradeability 40 % without / 30 % with vibration',
    'Verdichtungsleistung\n* Vibration an beiden Bandagen: 63/67 Hz, Amplitude 0,50 mm, Zentrifugalkraft 36/41 kN\n* Asphalt: 20-45 t/h (Schichten 2-4 cm) bis 70-120 t/h (Schichten 10-12 cm)\n* Steigfähigkeit 40 % ohne / 30 % mit Vibration',
    'Desempenho de compactação\n* Vibração nos dois tambores: 63/67 Hz, amplitude 0,50 mm, força centrífuga 36/41 kN\n* Asfalto: 20-45 t/h (camadas 2-4 cm) até 70-120 t/h (camadas 10-12 cm)\n* Rampa superável 40 % sem / 30 % com vibração'
  ),
  usp3: loc(
    'Dirección y articulación\n* Articulación oscilante: ángulo de dirección ±32°, oscilación ±10°\n* Paso de cangrejo 0-50 mm (ajuste hidráulico opcional)\n* Radio interior de giro 2.450 mm',
    'Steering and articulation\n* Oscillating articulation: ±32° steering angle, ±10° oscillation\n* Crab walk 0-50 mm (hydraulic adjustment optional)\n* Inner turning radius 2,450 mm',
    'Lenkung und Knickgelenk\n* Pendelknickgelenk: Lenkwinkel ±32°, Pendelwinkel ±10°\n* Hundegang 0-50 mm (hydraulische Verstellung optional)\n* Innerer Wenderadius 2.450 mm',
    'Direção e articulação\n* Articulação oscilante: ângulo de direção ±32°, oscilação ±10°\n* Deslocamento lateral 0-50 mm (ajuste hidráulico opcional)\n* Raio interno de giro 2.450 mm'
  ),
  usp4: loc(
    'Confort y operación\n* Asiento ajustable (opcional deslizante con doble palanca de marcha)\n* ROPS abatible con cinturón y techo antisolar opcionales\n* Compartimento integrado, toma de 12 V y soporte para tableta\n* Protección antivandalismo y capó con cierre con llave',
    'Comfort and operation\n* Adjustable seat (optional sliding seat with dual drive lever)\n* Foldable ROPS with seat belt and sun canopy optional\n* Integrated storage, 12 V socket and tablet holder\n* Vandalism protection and lockable hood',
    'Komfort und Bedienung\n* Verstellbarer Sitz (optional verschiebbar mit doppeltem Fahrhebel)\n* Klappbarer ROPS mit Gurt und Sonnendach optional\n* Integriertes Ablagefach, 12-V-Steckdose und Tablet-Halter\n* Vandalismusschutz und abschließbare Motorhaube',
    'Conforto e operação\n* Assento ajustável (opcional deslizante com alavanca de marcha dupla)\n* ROPS rebatível com cinto e teto solar opcionais\n* Compartimento integrado, tomada de 12 V e suporte para tablet\n* Proteção antivandalismo e capô com chave'
  ),
  usp5: loc(
    'Medición de compactación\n* ECONOMIZER con indicación de temperatura del asfalto (opcional)\n* Interfaz JOBLINK con adaptador Bluetooth y soporte de antena GPS para BOMAP\n* BOMAG TELEMATIC (opcional)',
    'Compaction measurement\n* ECONOMIZER with asphalt temperature display (optional)\n* JOBLINK interface with Bluetooth adapter and GPS antenna mount for BOMAP\n* BOMAG TELEMATIC (optional)',
    'Verdichtungsmessung\n* ECONOMIZER mit Asphalttemperaturanzeige (optional)\n* JOBLINK-Schnittstelle mit Bluetooth-Adapter und GPS-Antennenhalter für BOMAP\n* BOMAG TELEMATIC (optional)',
    'Medição de compactação\n* ECONOMIZER com indicação de temperatura do asfalto (opcional)\n* Interface JOBLINK com adaptador Bluetooth e suporte de antena GPS para BOMAP\n* BOMAG TELEMATIC (opcional)'
  ),
  usp6: loc(
    'Mantenimiento\n* Capó de material compuesto, fácil acceso al motor\n* 2 rascadores pretensados y replegables por tambor\n* Rociado a presión con regulador de intervalos (tanque 205 l) y aspiración de anticongelante',
    'Maintenance\n* Composite engine hood with easy engine access\n* 2 pre-tensioned, fold-away scrapers per drum\n* Pressure spraying with interval control (205 l tank) and antifreeze suction',
    'Wartung\n* Motorhaube aus Verbundwerkstoff, leichter Zugang zum Motor\n* 2 vorgespannte, hochklappbare Abstreifer je Bandage\n* Druckberieselung mit Intervallschaltung (205-l-Tank) und Frostschutz-Ansaugung',
    'Manutenção\n* Capô de material compósito, fácil acesso ao motor\n* 2 raspadores pré-tensionados e rebatíveis por tambor\n* Aspersão sob pressão com regulador de intervalos (tanque 205 l) e aspiração de anticongelante'
  ),
};

// LTR — BW 100 AD-5: same datasheet as BW 120 AD-5 (PRS 880 21 010, Sa07); only the model-specific figures change.
const bw100 = (text: string) =>
  text
    .replace(/36\/41 kN/g, '30/34 kN')
    .replace(/20-45 t\/h/g, '15-40 t/h')
    .replace(/70-120 t\/h/g, '60-100 t/h')
    .replace(/2\.450 mm/g, '2.550 mm')
    .replace(/2,450 mm/g, '2,550 mm');
export const BW100_AD5_USPS: CompactionUsps = Object.fromEntries(
  Object.entries(BW120_AD5_USPS).map(([key, value]) => [
    key,
    loc(bw100(value.es), bw100(value.en), bw100(value.de), bw100(value.pt)),
  ])
) as CompactionUsps;

// HTR — BW 161 AD-4: brochure "Rodillos tándem articulados de más de 5 t" (PRS 103 017, 03/17)
export const BW161_AD4_USPS: CompactionUsps = {
  usp1: loc(
    'Operación intuitiva\n* Manejo autoexplicativo, simbología clara e interruptores fáciles de identificar\n* ECOMODE: régimen del motor según la carga, hasta 30 % menos combustible\n* ECOSTOP: apagado automático tras un tiempo al ralentí',
    'Intuitive operation\n* Self-explanatory controls, clear symbols and easy-to-identify switches\n* ECOMODE: load-dependent engine speed, up to 30 % less fuel\n* ECOSTOP: automatic shut-down after a set idle time',
    'Intuitive Bedienung\n* Selbsterklärende Bedienung, klare Symbolik und eindeutig erkennbare Schalter\n* ECOMODE: lastabhängige Motordrehzahl, bis zu 30 % weniger Kraftstoff\n* ECOSTOP: automatische Abschaltung nach definierter Leerlaufzeit',
    'Operação intuitiva\n* Comandos autoexplicativos, simbologia clara e interruptores fáceis de identificar\n* ECOMODE: rotação do motor conforme a carga, até 30 % menos combustível\n* ECOSTOP: desligamento automático após tempo em marcha lenta'
  ),
  usp2: loc(
    'Tres sistemas de vibración (único fabricante)\n* Vibración doble de serie: 2 amplitudes, tambores conectables individualmente\n* TanGO (versión ADO): oscilación suave para juntas y puentes, tambor garantizado 6.000 h, 1,1 l/h menos que una oscilación convencional\n* ASPHALT MANAGER (versión AM): amplitud automática según rigidez y espesor de capa',
    'Three vibration systems (only manufacturer)\n* Double vibration as standard: 2 amplitudes, drums switchable individually\n* TanGO (ADO version): gentle oscillation for joints and bridges, drum guaranteed 6,000 h, 1.1 l/h less than conventional oscillation\n* ASPHALT MANAGER (AM version): automatic amplitude according to stiffness and layer thickness',
    'Drei Vibrationssysteme (einziger Hersteller)\n* Doppelvibration serienmäßig: 2 Amplituden, Bandagen einzeln zuschaltbar\n* TanGO (Version ADO): schonende Oszillation für Nähte und Brücken, Bandage mit 6.000 h Garantie, 1,1 l/h weniger als konventionelle Oszillation\n* ASPHALT MANAGER (Version AM): automatische Amplitude nach Steifigkeit und Schichtdicke',
    'Três sistemas de vibração (único fabricante)\n* Vibração dupla de série: 2 amplitudes, tambores acionáveis individualmente\n* TanGO (versão ADO): oscilação suave para juntas e pontes, tambor garantido 6.000 h, 1,1 l/h a menos que uma oscilação convencional\n* ASPHALT MANAGER (versão AM): amplitude automática conforme rigidez e espessura da camada'
  ),
  usp3: loc(
    'Dirección y articulación\n* Dirección articulada con articulación libre de mantenimiento\n* Paso de cangrejo opcional: desplaza los tambores hasta 170 mm a cada lado\n* Bloqueo de la articulación cómodo para el transporte',
    'Steering and articulation\n* Articulated steering with maintenance-free joint\n* Optional crab walk: offsets the drums up to 170 mm to each side\n* Easy-to-use articulation lock for transport',
    'Lenkung und Knickgelenk\n* Knicklenkung mit wartungsfreiem Gelenk\n* Optionaler Hundegang: Bandagenversatz bis 170 mm je Seite\n* Komfortable Knickgelenksicherung für den Transport',
    'Direção e articulação\n* Direção articulada com articulação livre de manutenção\n* Deslocamento lateral opcional: desloca os tambores até 170 mm para cada lado\n* Trava da articulação prática para o transporte'
  ),
  usp4: loc(
    'Confort y operación\n* Cabina amplia y separada del motor: sin calor, ruido ni emisiones\n* Asiento, volante y panel desplazables en todo el ancho de la cabina; asiento gira 75°/15°\n* Ventanilla abatible: vista directa al borde del tambor y al riego\n* 8 faros halógenos y focos LED laterales para trabajo nocturno',
    'Comfort and operation\n* Spacious cab separated from the engine: no heat, noise or exhaust\n* Seat, steering wheel and panel slide across the full cab width; seat swivels 75°/15°\n* Fold-out window: direct view of the drum edge and spraying\n* 8 halogen lights and side LED lights for night work',
    'Komfort und Bedienung\n* Geräumige, vom Motor getrennte Kabine: keine Hitze, kein Lärm, keine Abgase\n* Sitz, Lenkrad und Bedienpult über die gesamte Kabinenbreite verschiebbar; Sitz um 75°/15° drehbar\n* Ausstellbares Fenster: direkte Sicht auf Bandagenkante und Berieselung\n* 8 Halogenscheinwerfer und seitliche LED-Leuchten für Nachtarbeit',
    'Conforto e operação\n* Cabine ampla e separada do motor: sem calor, ruído ou emissões\n* Assento, volante e painel deslizam por toda a largura da cabine; assento gira 75°/15°\n* Janela basculante: visão direta da borda do tambor e da aspersão\n* 8 faróis halógenos e luzes LED laterais para trabalho noturno'
  ),
  usp5: loc(
    'Medición y documentación de compactación\n* ECONOMIZER integrado: indica el final de la compactación y avisa antes de sobrecompactar, sin calibración\n* BCM start / BCM 05 / BCM net: mapas GPS de pasadas, temperatura y E VIB en tiempo real\n* BOMAG TELEMATIC para gestión de flota',
    'Compaction measurement and documentation\n* Integrated ECONOMIZER: shows end of compaction and warns before over-compaction, no calibration\n* BCM start / BCM 05 / BCM net: real-time GPS maps of passes, temperature and E VIB\n* BOMAG TELEMATIC for fleet management',
    'Verdichtungsmessung und -dokumentation\n* Integrierter ECONOMIZER: zeigt das Verdichtungsende und warnt vor Überverdichtung, ohne Kalibrierung\n* BCM start / BCM 05 / BCM net: GPS-Karten von Übergängen, Temperatur und E VIB in Echtzeit\n* BOMAG TELEMATIC für das Flottenmanagement',
    'Medição e documentação da compactação\n* ECONOMIZER integrado: indica o fim da compactação e alerta antes da sobrecompactação, sem calibração\n* BCM start / BCM 05 / BCM net: mapas GPS de passadas, temperatura e E VIB em tempo real\n* BOMAG TELEMATIC para gestão de frota'
  ),
  usp6: loc(
    'Mantenimiento EasyService\n* Sin puntos de engrase: cojinetes sellados con lubricación de por vida\n* Todos los puntos de mantenimiento accesibles desde el suelo; capó de una pieza con amortiguadores de gas\n* Riego con 2 bombas independientes, filtro de combustible de 2 etapas y grifos de purga externos',
    'EasyService maintenance\n* No grease points: sealed bearings with lifetime lubrication\n* All service points accessible from the ground; one-piece hood with gas struts\n* Spraying with 2 independent pumps, 2-stage fuel filter and external drain taps',
    'EasyService-Wartung\n* Keine Schmierstellen: abgedichtete Lager mit Lebensdauerschmierung\n* Alle Wartungspunkte vom Boden aus erreichbar; einteilige Haube mit Gasdruckfedern\n* Berieselung mit 2 unabhängigen Pumpen, 2-stufiger Kraftstofffilter und außenliegende Ablasshähne',
    'Manutenção EasyService\n* Sem pontos de lubrificação: rolamentos selados com lubrificação vitalícia\n* Todos os pontos de manutenção acessíveis do solo; capô inteiriço com amortecedores a gás\n* Aspersão com 2 bombas independentes, filtro de combustível de 2 estágios e drenos externos'
  ),
};

// Milling — BM 1000/35-2, BM 1200/35-2, BM 1300/35-2: BOMAG product overview presentation
export const bm35Usps = (transportT: string, transportTEn: string, fuelLh: string, fuelLhEn: string): MillingUsps => ({
  usp1: loc(
    '260 kW (350 hp), profundidad 0-330 mm\n* Velocidad de tambor variable y alta velocidad de traslado\n* Rendimiento muy estable; tambores estándar, finos y micro (LA22/LA15/LA8)\n* 3×3 picas adicionales en el anillo de borde: corte suave y bordes limpios',
    '260 kW (350 hp), 0-330 mm depth\n* Variable drum speed and high travel speed\n* Very stable performance; standard, fine and micro drums (LA22/LA15/LA8)\n* 3×3 extra picks at the edge ring: smooth cutting and clean edges',
    '260 kW (350 PS), Frästiefe 0-330 mm\n* Variable Walzendrehzahl und hohe Fahrgeschwindigkeit\n* Sehr stabile Leistung; Standard-, Fein- und Mikrofräswalzen (LA22/LA15/LA8)\n* 3×3 zusätzliche Meißel am Kantenring: ruhiger Schnitt und saubere Kanten',
    '260 kW (350 hp), profundidade 0-330 mm\n* Velocidade de tambor variável e alta velocidade de deslocamento\n* Desempenho muito estável; tambores padrão, finos e micro (LA22/LA15/LA8)\n* 3×3 dentes adicionais no anel de borda: corte suave e bordas limpas'
  ),
  usp2: loc(
    `La fresadora de orugas más liviana de la clase 350 hp\n* ${transportT} t de transporte (CE), 1,5 t menos que la generación anterior; lastre removible hasta 1,5 t\n* Placas laterales con carrera de 460 mm: cortes a profundidad completa junto a bordillos\n* Cambio de tambor en menos de 15 min (sistema de cambio rápido opcional)`,
    `Lightest crawler cold planer in the 350 hp class\n* ${transportTEn} t transport weight (CE), 1.5 t less than the predecessor; removable ballast up to 1.5 t\n* Side plates with 460 mm stroke: full-depth cuts along curbs\n* Drum change in under 15 min (optional quick-change system)`,
    `Leichteste Kettenfräse der 350-PS-Klasse\n* ${transportT} t Transportgewicht (CE), 1,5 t weniger als der Vorgänger; abnehmbarer Ballast bis 1,5 t\n* Seitenschilde mit 460 mm Hub: Fräsen in voller Tiefe entlang von Bordsteinen\n* Walzenwechsel in unter 15 min (optionales Schnellwechselsystem)`,
    `A fresadora de esteiras mais leve da classe 350 hp\n* ${transportT} t de transporte (CE), 1,5 t a menos que a geração anterior; lastro removível até 1,5 t\n* Placas laterais com curso de 460 mm: cortes em profundidade total junto a meios-fios\n* Troca de tambor em menos de 15 min (sistema de troca rápida opcional)`
  ),
  usp3: loc(
    `Consumo medido en obra ~${fuelLh} l/h (10 máquinas, 2 años)\n* Portapicas BMS15L: solo 100 Nm de apriete, extracción desde atrás y reparación en campo\n* Garantía de 5 años / 5.000 h en la estructura de la pata giratoria\n* Bomba de agua de 3 vías de serie: autollenado, rociado y lavado`,
    `Measured jobsite consumption ~${fuelLhEn} l/h (10 machines, 2 years)\n* BMS15L tool holder: only 100 Nm tightening torque, extraction from the back and field repair\n* 5-year / 5,000 h warranty on the slewing leg structure\n* 3-way water pump as standard: self-filling, spraying and wash-down`,
    `Gemessener Baustellenverbrauch ~${fuelLh} l/h (10 Maschinen, 2 Jahre)\n* Meißelhalter BMS15L: nur 100 Nm Anzugsmoment, Ausbau von hinten und Reparatur vor Ort\n* 5 Jahre / 5.000 h Garantie auf die Schwenkbeinstruktur\n* 3-Wege-Wasserpumpe serienmäßig: Selbstbefüllung, Berieselung und Reinigung`,
    `Consumo medido em obra ~${fuelLh} l/h (10 máquinas, 2 anos)\n* Porta-dentes BMS15L: apenas 100 Nm de aperto, extração por trás e reparo em campo\n* Garantia de 5 anos / 5.000 h na estrutura da perna giratória\n* Bomba de água de 3 vias de série: autoabastecimento, aspersão e lavagem`
  ),
  usp4: loc(
    'Operación sentada con asiento giratorio 2×45° y plataforma aislada (baja vibración y ruido)\n* Techo regulable en altura con iluminación del puesto\n* BOMAG Easy Level con pantalla gráfica de 7"\n* Ion Dust Shield (opcional): reducción certificada ≥88 % de partículas finas <2,5 µm',
    'Seated operation with 2×45° swivel seat and isolated platform (low vibration and noise)\n* Height-adjustable roof with operator station lighting\n* BOMAG Easy Level with 7" graphic display\n* Ion Dust Shield (optional): certified ≥88 % reduction of fine particles <2.5 µm',
    'Sitzende Bedienung mit 2×45° drehbarem Sitz und entkoppelter Plattform (geringe Vibration und Lärm)\n* Höhenverstellbares Dach mit Fahrstandbeleuchtung\n* BOMAG Easy Level mit 7"-Grafikdisplay\n* Ion Dust Shield (optional): zertifizierte Reduktion von ≥88 % der Feinstaubpartikel <2,5 µm',
    'Operação sentada com assento giratório 2×45° e plataforma isolada (baixa vibração e ruído)\n* Teto ajustável em altura com iluminação do posto\n* BOMAG Easy Level com tela gráfica de 7"\n* Ion Dust Shield (opcional): redução certificada ≥88 % de partículas finas <2,5 µm'
  ),
  valueProposition: loc(
    'La fresadora de montaje trasero más competitiva de la clase 350 hp: liviana, cómoda y eficiente.',
    'The most competitive rear-loading cold planer in the 350 hp class: light, comfortable and efficient.',
    'Die wettbewerbsfähigste Heckladerfräse der 350-PS-Klasse: leicht, komfortabel und effizient.',
    'A fresadora de carregamento traseiro mais competitiva da classe 350 hp: leve, confortável e eficiente.'
  ),
});

// Milling — BM 2000/58: BOMAG product overview presentation ("Simply Easy")
export const BM2000_58_USPS: MillingUsps = {
  usp1: loc(
    '450 kW (610 hp), 2.000 mm, profundidad 0-350 mm\n* Tambores LA23/LA18/LA15 y fino LA6; portapicas BMS15L y velocidad de tambor variable\n* BOMAG Easy Cut: asiste las columnas traseras al entrar en el corte',
    '450 kW (610 hp), 2,000 mm, 0-350 mm depth\n* LA23/LA18/LA15 drums and LA6 fine drum; BMS15L tool holders and variable drum speed\n* BOMAG Easy Cut: assists the rear columns when entering the cut',
    '450 kW (610 PS), 2.000 mm, Frästiefe 0-350 mm\n* Fräswalzen LA23/LA18/LA15 und Feinfräswalze LA6; Meißelhalter BMS15L und variable Walzendrehzahl\n* BOMAG Easy Cut: unterstützt die hinteren Hubsäulen beim Einfräsen',
    '450 kW (610 hp), 2.000 mm, profundidade 0-350 mm\n* Tambores LA23/LA18/LA15 e fino LA6; porta-dentes BMS15L e velocidade de tambor variável\n* BOMAG Easy Cut: auxilia as colunas traseiras ao entrar no corte'
  ),
  usp2: loc(
    'La fresadora de 2 m más compacta y liviana\n* 27 t CE; longitud de transporte <11,75 m (~650 mm más corta)\n* Radio de giro de solo 1,7 m y cinta con giro de ±65°\n* Placas laterales con carrera de 400/500 mm (izq./der.)',
    'The most compact and lightest 2 m cold planer\n* 27 t CE; transport length <11.75 m (~650 mm shorter)\n* Turning radius of only 1.7 m and ±65° conveyor slewing\n* Side plates with 400/500 mm stroke (left/right)',
    'Die kompakteste und leichteste 2-m-Fräse\n* 27 t CE; Transportlänge <11,75 m (~650 mm kürzer)\n* Wenderadius von nur 1,7 m und ±65° Bandschwenkung\n* Seitenschilde mit 400/500 mm Hub (links/rechts)',
    'A fresadora de 2 m mais compacta e leve\n* 27 t CE; comprimento de transporte <11,75 m (~650 mm mais curta)\n* Raio de giro de apenas 1,7 m e correia com giro de ±65°\n* Placas laterais com curso de 400/500 mm (esq./dir.)'
  ),
  usp3: loc(
    'Consumo medido en obra ~29 l/h (8 máquinas)\n* Motor auxiliar opcional de 15,5 kW con tracción de emergencia: saca la máquina de túneles o pistas en 15 min ante una avería\n* Columnas de elevación con sensor fuera de piezas móviles y doble filtración de agua\n* Servicio diario fácil: capó hidráulico y carga de diésel y AdBlue desde el puesto',
    'Measured jobsite consumption ~29 l/h (8 machines)\n* Optional 15.5 kW auxiliary engine with emergency drive: moves the machine out of tunnels or runways within 15 min after a breakdown\n* Lifting columns with sensors outside moving parts and dual water filtration\n* Easy daily service: hydraulic hood and diesel/AdBlue filling from the operator station',
    'Gemessener Baustellenverbrauch ~29 l/h (8 Maschinen)\n* Optionaler 15,5-kW-Hilfsmotor mit Notfahrantrieb: bringt die Maschine bei einem Ausfall in 15 min aus Tunneln oder von Start- und Landebahnen\n* Hubsäulen mit Sensoren außerhalb bewegter Teile und doppelte Wasserfiltration\n* Einfache tägliche Wartung: hydraulische Haube und Betankung von Diesel und AdBlue vom Fahrstand',
    'Consumo medido em obra ~29 l/h (8 máquinas)\n* Motor auxiliar opcional de 15,5 kW com tração de emergência: retira a máquina de túneis ou pistas em 15 min em caso de pane\n* Colunas de elevação com sensor fora de peças móveis e dupla filtragem de água\n* Serviço diário fácil: capô hidráulico e abastecimento de diesel e AdBlue a partir do posto'
  ),
  usp4: loc(
    'Puesto aislado de vibraciones con plataforma extensible 200 mm\n* Panel intuitivo con BOMAG Easy Level (7") y Fast Select\n* Iluminación de serie de 37.700 lm\n* Gran caja de almacenamiento estanca (hasta 32 cajas de picas)',
    'Vibration-isolated operator station with 200 mm extendable platform\n* Intuitive panel with BOMAG Easy Level (7") and Fast Select\n* 37,700 lm lighting as standard\n* Large waterproof storage box (up to 32 pick boxes)',
    'Schwingungsentkoppelter Fahrstand mit 200 mm ausziehbarer Plattform\n* Intuitives Bedienpult mit BOMAG Easy Level (7") und Fast Select\n* 37.700 lm Beleuchtung serienmäßig\n* Große wasserdichte Staubox (bis zu 32 Meißelkisten)',
    'Posto isolado de vibrações com plataforma extensível de 200 mm\n* Painel intuitivo com BOMAG Easy Level (7") e Fast Select\n* Iluminação de série de 37.700 lm\n* Grande caixa de armazenamento estanque (até 32 caixas de dentes)'
  ),
  valueProposition: loc(
    'Simply Easy: la fresadora de 2 m más compacta y liviana de su clase, con visibilidad, facilidad de servicio y robustez.',
    'Simply Easy: the most compact and lightest 2 m cold planer in its class, with visibility, serviceability and robustness.',
    'Simply Easy: die kompakteste und leichteste 2-m-Fräse ihrer Klasse, mit Übersicht, Servicefreundlichkeit und Robustheit.',
    'Simply Easy: a fresadora de 2 m mais compacta e leve da sua classe, com visibilidade, facilidade de manutenção e robustez.'
  ),
};

// Milling — BM 1500/65, BM 2000/65, BM 2200/65: brochure "Serie BM/65" (PRS 107 370, 03/26)
export const bm65Usps = (weightKg: string, weightKgEn: string): MillingUsps => ({
  usp1: loc(
    '640 CV (Stage V / Tier 4f), profundidad 0-350 mm\n* Coordinación de la potencia del motor con la velocidad de fresado; velocidad de avance y de fresado variables\n* Tambores de 6 a 25 mm entre líneas, desde micro-fresado hasta desprendimiento completo\n* BOMAG Easy Cut: regula las columnas traseras al entrar en el corte',
    '640 hp (Stage V / Tier 4f), 0-350 mm depth\n* Engine power matched to milling speed; variable advance and milling speed\n* Drums with 6 to 25 mm line spacing, from micro-milling to full-depth removal\n* BOMAG Easy Cut: controls the rear columns when entering the cut',
    '640 PS (Stufe V / Tier 4f), Frästiefe 0-350 mm\n* Motorleistung auf die Fräsgeschwindigkeit abgestimmt; variable Vorschub- und Fräsgeschwindigkeit\n* Fräswalzen mit 6 bis 25 mm Linienabstand, vom Mikrofräsen bis zum Vollausbau\n* BOMAG Easy Cut: regelt die hinteren Hubsäulen beim Einfräsen',
    '640 cv (Stage V / Tier 4f), profundidade 0-350 mm\n* Potência do motor ajustada à velocidade de fresagem; velocidade de avanço e de fresagem variáveis\n* Tambores de 6 a 25 mm entre linhas, da microfresagem à remoção total\n* BOMAG Easy Cut: regula as colunas traseiras ao entrar no corte'
  ),
  usp2: loc(
    `La máquina más liviana de la clase 650 CV\n* ~${weightKg} t CECE: transporte sin permisos especiales; lastre de fábrica opcional hasta 1.800 kg\n* Radio de giro de 1,7 m (el menor de su clase) y cinta con giro de 130°: rotondas estrechas\n* Cinta plegada 600 mm más corta; placa lateral derecha con altura libre de 500 mm junto a bordillos`,
    `The lightest machine in the 650 hp class\n* ~${weightKgEn} t CECE: transport without special permits; optional factory ballast up to 1,800 kg\n* 1.7 m turning radius (smallest in its class) and 130° conveyor slewing: tight roundabouts\n* Folded conveyor 600 mm shorter; right side plate with 500 mm clearance along curbs`,
    `Die leichteste Maschine der 650-PS-Klasse\n* ~${weightKg} t CECE: Transport ohne Sondergenehmigung; optionaler Werksballast bis 1.800 kg\n* Wenderadius 1,7 m (der kleinste seiner Klasse) und 130° Bandschwenkung: enge Kreisverkehre\n* Eingeklapptes Band 600 mm kürzer; rechter Seitenschild mit 500 mm Freiraum an Bordsteinen`,
    `A máquina mais leve da classe 650 cv\n* ~${weightKg} t CECE: transporte sem licenças especiais; lastro de fábrica opcional até 1.800 kg\n* Raio de giro de 1,7 m (o menor da categoria) e correia com giro de 130°: rotatórias estreitas\n* Correia dobrada 600 mm mais curta; placa lateral direita com altura livre de 500 mm junto a meios-fios`
  ),
  usp3: loc(
    'Portapicas BMS 15 EVO: hasta 50 % más durabilidad que el BMS 15 L\n* Hasta 20 % menos consumo de combustible y desgaste\n* Accionamiento auxiliar opcional con marcha de emergencia: saca la máquina de túneles o aeropuertos si falla el motor principal\n* Doble filtración de agua; filtros, gasóleo y AdBlue accesibles desde el puesto',
    'BMS 15 EVO tool holders: up to 50 % longer life than BMS 15 L\n* Up to 20 % less fuel consumption and wear\n* Optional auxiliary drive with emergency mode: moves the machine out of tunnels or airports if the main engine fails\n* Dual water filtration; filters, diesel and AdBlue accessible from the operator station',
    'Meißelhalter BMS 15 EVO: bis zu 50 % längere Lebensdauer als BMS 15 L\n* Bis zu 20 % weniger Kraftstoffverbrauch und Verschleiß\n* Optionaler Hilfsantrieb mit Notfahrfunktion: bringt die Maschine bei Ausfall des Hauptmotors aus Tunneln oder Flughäfen\n* Doppelte Wasserfiltration; Filter, Diesel und AdBlue vom Fahrstand aus erreichbar',
    'Porta-dentes BMS 15 EVO: até 50 % mais durabilidade que o BMS 15 L\n* Até 20 % menos consumo de combustível e desgaste\n* Acionamento auxiliar opcional com modo de emergência: retira a máquina de túneis ou aeroportos se o motor principal falhar\n* Dupla filtragem de água; filtros, diesel e AdBlue acessíveis a partir do posto'
  ),
  usp4: loc(
    'Puesto totalmente aislado de vibraciones, desplazable hasta 200 mm, con asiento calefactado\n* Dos pantallas de 7" a color, BOMAG Easy Level y Fast Select (cualquier ajuste en máx. 3 pasos)\n* Iluminación de serie de 37.700 lm, la más potente de su clase (+142.750 lm con Advanced Night Package)\n* ION DUST SHIELD (opcional): reduce ≥80 % las partículas finas, sin filtros',
    'Fully vibration-isolated operator station, sliding up to 200 mm, with heated seat\n* Two 7" color displays, BOMAG Easy Level and Fast Select (any setting in max. 3 steps)\n* 37,700 lm standard lighting, the strongest in its class (+142,750 lm with Advanced Night Package)\n* ION DUST SHIELD (optional): reduces fine particles by ≥80 %, no filters',
    'Vollständig schwingungsentkoppelter Fahrstand, bis 200 mm verschiebbar, mit beheiztem Sitz\n* Zwei 7"-Farbdisplays, BOMAG Easy Level und Fast Select (jede Einstellung in max. 3 Schritten)\n* 37.700 lm Serienbeleuchtung, die stärkste ihrer Klasse (+142.750 lm mit Advanced Night Package)\n* ION DUST SHIELD (optional): reduziert Feinstaub um ≥80 %, ohne Filter',
    'Posto totalmente isolado de vibrações, deslizante até 200 mm, com assento aquecido\n* Duas telas coloridas de 7", BOMAG Easy Level e Fast Select (qualquer ajuste em no máx. 3 passos)\n* Iluminação de série de 37.700 lm, a mais potente da categoria (+142.750 lm com Advanced Night Package)\n* ION DUST SHIELD (opcional): reduz ≥80 % das partículas finas, sem filtros'
  ),
  valueProposition: loc(
    'La fresadora más liviana y productiva de la clase 650 CV: maniobrable, sencilla de usar y de bajo costo operativo.',
    'The lightest and most productive cold planer in the 650 hp class: maneuverable, easy to use and low operating cost.',
    'Die leichteste und produktivste Fräse der 650-PS-Klasse: wendig, einfach zu bedienen und mit niedrigen Betriebskosten.',
    'A fresadora mais leve e produtiva da classe 650 cv: manobrável, fácil de usar e de baixo custo operacional.'
  ),
});

// Pavers — BOMAG Paver product overview presentation (BF 350-5 and BF 600-800-3 sections)
type PaverUsps = Record<'usp1' | 'usp2' | 'usp3' | 'usp4' | 'usp5' | 'usp6' | 'usp7' | 'usp8' | 'usp9', LocalizedText>;

const NOT_PUBLISHED_CONSUMPTION = loc(
  'No publicado en la presentación BOMAG (ECOMODE: ~20 % menos consumo frente a una pavimentadora estándar)',
  'Not published in the BOMAG presentation (ECOMODE: ~20 % lower consumption than a standard paver)',
  'In der BOMAG-Präsentation nicht angegeben (ECOMODE: ~20 % weniger Verbrauch als ein Standardfertiger)',
  'Não publicado na apresentação BOMAG (ECOMODE: ~20 % menos consumo que uma vibroacabadora padrão)'
);
const NOT_PUBLISHED_CO2 = loc(
  'No publicado (se calcula con el consumo medido en obra)',
  'Not published (calculated from measured jobsite consumption)',
  'Nicht angegeben (wird aus dem gemessenen Baustellenverbrauch berechnet)',
  'Não publicado (calculado a partir do consumo medido em obra)'
);
const MAGMALIFE_FACTS = {
  es: 'placas de aluminio fundido - calentamiento hasta 30 % más rápido - vida útil >3.000 h - calor homogéneo',
  en: 'cast aluminium heating plates - up to 30 % faster heat-up - lifetime >3,000 h - homogeneous heat',
  de: 'Heizplatten aus Aluminiumguss - bis zu 30 % schnelleres Aufheizen - Lebensdauer >3.000 h - homogene Wärme',
  pt: 'placas de alumínio fundido - aquecimento até 30 % mais rápido - vida útil >3.000 h - calor homogêneo',
};
const ECOMODE_FACTS = (engine: string) => loc(
  `ECOMODE de 3 etapas + hidráulica load-sensing ("Power on demand") - ~20 % menos combustible y menos ruido - ${engine}`,
  `3-stage ECOMODE + load-sensing hydraulics ("Power on demand") - ~20 % less fuel and lower noise - ${engine}`,
  `3-stufiger ECOMODE + Load-Sensing-Hydraulik ("Power on demand") - ~20 % weniger Kraftstoff und weniger Lärm - ${engine}`,
  `ECOMODE de 3 estágios + hidráulica load-sensing ("Power on demand") - ~20 % menos combustível e menos ruído - ${engine}`
);

export const BF350_C5_USPS: PaverUsps = {
  usp1: loc(
    `MAGMALIFE opcional (de serie: resistencias calefactoras) - ${MAGMALIFE_FACTS.es}`,
    `MAGMALIFE optional (standard: heating rods) - ${MAGMALIFE_FACTS.en}`,
    `MAGMALIFE optional (Serie: Heizstäbe) - ${MAGMALIFE_FACTS.de}`,
    `MAGMALIFE opcional (de série: resistências) - ${MAGMALIFE_FACTS.pt}`
  ),
  usp2: NOT_PUBLISHED_CONSUMPTION,
  usp3: ECOMODE_FACTS('Deutz TCD 2.9, 75 kW'),
  usp4: loc(
    'QUICKCOUPLING para un montaje rápido - extensiones mecánicas de 300/500 mm hasta 5,0 m - se transporta con extensiones de 300 mm montadas (2,5 m) sin costo extra',
    'QUICKCOUPLING for fast set-up - 300/500 mm mechanical extensions up to 5.0 m - transport with 300 mm extensions mounted (2.5 m) at no extra cost',
    'QUICKCOUPLING für schnelles Rüsten - mechanische Verbreiterungen 300/500 mm bis 5,0 m - Transport mit montierten 300-mm-Verbreiterungen (2,5 m) ohne Mehrkosten',
    'QUICKCOUPLING para montagem rápida - extensões mecânicas de 300/500 mm até 5,0 m - transporte com extensões de 300 mm montadas (2,5 m) sem custo extra'
  ),
  usp5: loc(
    'Asiento y tablero giratorios y desplazables a izq./der. - techo protege incluso con el asiento afuera - mandos en el apoyabrazos (opcional, versión C) - TruckDock opcional',
    'Seat and dashboard rotate and swing out left/right - roof protects even with the seat swung out - armrest controls (optional, C version) - TruckDock optional',
    'Sitz und Bedienpult dreh- und nach links/rechts ausschwenkbar - Dach schützt auch bei ausgeschwenktem Sitz - Armlehnensteuerung (optional, C-Version) - TruckDock optional',
    'Assento e painel giratórios e deslocáveis para esq./dir. - teto protege mesmo com o assento para fora - comandos no apoio de braço (opcional, versão C) - TruckDock opcional'
  ),
  usp6: loc(
    'Rodillo de empuje oscilante - amortiguación opcional',
    'Oscillating push roller - shock absorption optional',
    'Pendelnde Schubrolle - Dämpfung optional',
    'Rolo de empurre oscilante - amortecimento opcional'
  ),
  usp7: loc(
    'Según el concepto de mando: nivelación "hang-on" (mando central) o controlador integrado (A-PAVE) - sensores opcionales',
    'Depending on the operating concept: hang-on levelling (central panel) or integrated controller (A-PAVE) - sensors optional',
    'Je nach Bedienkonzept: Anbau-Nivellierung (Zentralpult) oder integrierter Regler (A-PAVE) - Sensoren optional',
    'Conforme o conceito de comando: nivelamento "hang-on" (painel central) ou controlador integrado (A-PAVE) - sensores opcionais'
  ),
  usp8: loc(
    'No publicado - placas MAGMALIFE con vida útil >3.000 h (opcional)',
    'Not published - MAGMALIFE plates with >3,000 h lifetime (optional)',
    'Nicht angegeben - MAGMALIFE-Platten mit >3.000 h Lebensdauer (optional)',
    'Não publicado - placas MAGMALIFE com vida útil >3.000 h (opcional)'
  ),
  usp9: NOT_PUBLISHED_CO2,
};

export const bf600800Usps = (maxWidth: string, maxWidthEn: string, pushRollerStd: boolean): PaverUsps => ({
  usp1: loc(
    `MAGMALIFE de serie - ${MAGMALIFE_FACTS.es} - regla con precompactación de hasta 95 % con un solo tamper`,
    `MAGMALIFE as standard - ${MAGMALIFE_FACTS.en} - screed with up to 95 % pre-compaction with a single tamper`,
    `MAGMALIFE serienmäßig - ${MAGMALIFE_FACTS.de} - Bohle mit bis zu 95 % Vorverdichtung mit nur einem Tamper`,
    `MAGMALIFE de série - ${MAGMALIFE_FACTS.pt} - mesa com pré-compactação de até 95 % com um único tamper`
  ),
  usp2: NOT_PUBLISHED_CONSUMPTION,
  usp3: loc(
    'ECOMODE de 3 etapas + hidráulica load-sensing ("Power on demand") - ~20 % menos combustible y menos ruido - bombas dedicadas para traslado, material izq./der. y tamper + vibración',
    '3-stage ECOMODE + load-sensing hydraulics ("Power on demand") - ~20 % less fuel and lower noise - dedicated pumps for drive, material left/right and tamper + vibration',
    '3-stufiger ECOMODE + Load-Sensing-Hydraulik ("Power on demand") - ~20 % weniger Kraftstoff und weniger Lärm - eigene Pumpen für Fahrantrieb, Material links/rechts und Tamper + Vibration',
    'ECOMODE de 3 estágios + hidráulica load-sensing ("Power on demand") - ~20 % menos combustível e menos ruído - bombas dedicadas para tração, material esq./dir. e tamper + vibração'
  ),
  usp4: loc(
    `QUICKCOUPLING - extensiones mecánicas de 250/750/1.250 mm hasta ${maxWidth} m - sistema modular, ampliable después`,
    `QUICKCOUPLING - 250/750/1,250 mm mechanical extensions up to ${maxWidthEn} m - modular system, upgradeable later`,
    `QUICKCOUPLING - mechanische Verbreiterungen 250/750/1.250 mm bis ${maxWidth} m - modulares System, später erweiterbar`,
    `QUICKCOUPLING - extensões mecânicas de 250/750/1.250 mm até ${maxWidth} m - sistema modular, ampliável depois`
  ),
  usp5: loc(
    'Plataforma desplazable a izq./der., asiento y tablero giratorios - mandos en el apoyabrazos (opcional) - panel lateral de regla con pantalla - TruckDock',
    'Platform slides left/right, rotatable seat and dashboard - armrest controls (optional) - screed side panel with display - TruckDock',
    'Fahrerstand nach links/rechts verschiebbar, drehbarer Sitz und Bedienpult - Armlehnensteuerung (optional) - Bohlenaußensteuerstand mit Display - TruckDock',
    'Plataforma deslocável para esq./dir., assento e painel giratórios - comandos no apoio de braço (opcional) - painel lateral da mesa com tela - TruckDock'
  ),
  usp6: pushRollerStd
    ? loc(
        'Rodillo de empuje oscilante con ajuste hidráulico de serie',
        'Oscillating push roller with hydraulic adjustment as standard',
        'Pendelnde Schubrolle mit hydraulischer Verstellung serienmäßig',
        'Rolo de empurre oscilante com ajuste hidráulico de série'
      )
    : loc(
        'Rodillo de empuje oscilante - ajuste hidráulico opcional',
        'Oscillating push roller - hydraulic adjustment optional',
        'Pendelnde Schubrolle - hydraulische Verstellung optional',
        'Rolo de empurre oscilante - ajuste hidráulico opcional'
      ),
  usp7: loc(
    'Controlador de nivelación integrado en los paneles de la regla ESTÁNDAR - Slope & Crown automático - sensores opcionales',
    'Levelling controller integrated in the screed panels STANDARD - automatic Slope & Crown - sensors optional',
    'In die Bohlensteuerstände integrierter Nivellierregler SERIENMÄSSIG - automatisches Slope & Crown - Sensoren optional',
    'Controlador de nivelamento integrado nos painéis da mesa DE SÉRIE - Slope & Crown automático - sensores opcionais'
  ),
  usp8: loc(
    'No publicado - placas MAGMALIFE con vida útil >3.000 h y planchas de alisado de 400 mm (las más largas del mercado)',
    'Not published - MAGMALIFE plates with >3,000 h lifetime and 400 mm wear plates (longest in the market)',
    'Nicht angegeben - MAGMALIFE-Platten mit >3.000 h Lebensdauer und 400 mm Glättbleche (die längsten am Markt)',
    'Não publicado - placas MAGMALIFE com vida útil >3.000 h e chapas de alisamento de 400 mm (as mais longas do mercado)'
  ),
  usp9: NOT_PUBLISHED_CO2,
});
