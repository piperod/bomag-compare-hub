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
