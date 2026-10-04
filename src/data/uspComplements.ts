import type { Language } from '@/contexts/LanguageContext';
import type { LocalizedText } from './paversData';
import { localizePaverText } from '@/utils/paverSpecText';

/**
 * Fills the empty USP fields of every product line. Existing USP texts are never replaced.
 *
 * 1. Family texts written from the brochures and datasheets of each model family.
 * 2. Data-driven fallbacks built from the model's own documented specs; when a topic is not
 *    covered by any document, the USP says so instead of inventing a claim.
 */

export type UspLine = 'sdr' | 'ltr' | 'htr' | 'ptr' | 'milling' | 'pavers';
type UspKey = 'usp1' | 'usp2' | 'usp3' | 'usp4' | 'usp5' | 'usp6' | 'usp7' | 'usp8' | 'usp9';
type UspSet = Partial<Record<UspKey, LocalizedText>>;
type AnyMachine = Record<string, unknown> & { brand: string; model: string };

const loc = (es: string, en: string, de: string, pt: string): LocalizedText => ({ es, en, de, pt });
const map = (fn: (lang: Language) => string): LocalizedText =>
  loc(fn('es'), fn('en'), fn('de'), fn('pt'));

/** "Title\n* bullet\n* bullet" in the four languages, the format used by the existing USPs. */
const usp = (title: LocalizedText, ...bullets: LocalizedText[]): LocalizedText =>
  map((l) => [title[l], ...bullets.map((b) => `* ${b[l]}`)].join('\n'));

const text = (v: unknown, lang: Language): string => {
  if (!v) return '';
  if (typeof v === 'string') return v.trim();
  if (typeof v === 'object') return String((v as Record<string, string>)[lang] ?? (v as Record<string, string>).es ?? '').trim();
  return String(v);
};

const isEmpty = (v: unknown): boolean => {
  if (v === undefined || v === null) return true;
  if (typeof v === 'object') {
    return !Object.values(v as Record<string, unknown>).some((x) => typeof x === 'string' && x.trim() && x.trim() !== '-');
  }
  const s = String(v).trim();
  return !s || s === '-';
};

const num = (n: number, lang: Language): string =>
  n.toLocaleString(lang === 'en' ? 'en-US' : 'de-DE', { maximumFractionDigits: 2 });

const NOT_PUBLISHED = loc(
  'No publicado en la ficha técnica disponible',
  'Not published in the available datasheet',
  'Im verfügbaren Datenblatt nicht angegeben',
  'Não publicado na ficha técnica disponível'
);

const NO_MEASUREMENT = loc(
  'Sistemas de compactación\n* Sin sistema de medición de compactación en la información disponible',
  'Compaction systems\n* No compaction measurement system in the available information',
  'Verdichtungssysteme\n* Kein Verdichtungsmesssystem in den verfügbaren Informationen',
  'Sistemas de compactação\n* Sem sistema de medição de compactação nas informações disponíveis'
);

// ---------------------------------------------------------------------------------------------
// Titles shared by the compaction lines (SDR / LTR / HTR / PTR)
// ---------------------------------------------------------------------------------------------
const T = {
  operation: loc('Operación', 'Operation', 'Bedienung', 'Operação'),
  performance: loc('Rendimiento de compactación', 'Compaction performance', 'Verdichtungsleistung', 'Desempenho de compactação'),
  steering: loc('Dirección y articulación', 'Steering and articulation', 'Lenkung und Knickgelenk', 'Direção e articulação'),
  comfort: loc('Confort y operación', 'Comfort and operation', 'Komfort und Bedienung', 'Conforto e operação'),
  systems: loc('Sistemas de compactación', 'Compaction systems', 'Verdichtungssysteme', 'Sistemas de compactação'),
  maintenance: loc('Mantenimiento', 'Maintenance', 'Wartung', 'Manutenção'),
  specs: loc('Especificaciones técnicas', 'Technical specifications', 'Technische Daten', 'Especificações técnicas'),
  ballast: loc('Lastre y presión de contacto', 'Ballast and contact pressure', 'Ballast und Kontaktdruck', 'Lastro e pressão de contato'),
  antiStick: loc('Antiadherencia y riego', 'Anti-stick and spraying', 'Antihaft und Berieselung', 'Antiaderência e aspersão'),
};

// ---------------------------------------------------------------------------------------------
// Family texts from brochures and datasheets
// ---------------------------------------------------------------------------------------------
type Family = { line: UspLine; match: (m: AnyMachine) => boolean; usps: UspSet };
const is = (brand: string, re: RegExp) => (m: AnyMachine) => m.brand === brand && re.test(m.model);

const FAMILIES: Family[] = [
  // ---------------------------------------------------------------- SDR
  {
    // Dynapac CA1300D / CA2500D / CA3500D / CA5000D / CA6500D / CA25D datasheets
    line: 'sdr',
    match: is('DYNAPAC', /^CA\d+\s?(D|PD)\b|^CA\d+ D-Rhino/),
    usps: {
      usp1: usp(T.operation,
        loc('Dirección hidrostática articulada', 'Hydrostatic articulated steering', 'Hydrostatische Knicklenkung', 'Direção hidrostática articulada'),
        loc('Control de tracción y doble velocidad disponibles (Dual Speed / Traction Control)', 'Traction control and dual speed available (Dual Speed / Traction Control)', 'Traktionskontrolle und zwei Geschwindigkeiten verfügbar (Dual Speed / Traction Control)', 'Controle de tração e dupla velocidade disponíveis (Dual Speed / Traction Control)')),
      usp3: usp(T.steering,
        loc('Oscilación vertical ±9° (±6° en modelos ligeros)', 'Vertical oscillation ±9° (±6° on light models)', 'Vertikale Pendelung ±9° (±6° bei leichten Modellen)', 'Oscilação vertical ±9° (±6° nos modelos leves)'),
        loc('Ángulo de dirección ±38° (±33° CA1300D)', 'Steering angle ±38° (±33° CA1300D)', 'Lenkwinkel ±38° (±33° CA1300D)', 'Ângulo de direção ±38° (±33° CA1300D)')),
      usp4: usp(T.comfort,
        loc('Cabina ROPS/FOPS presurizada e insonorizada con climatizador (opcional)', 'Pressurised, sound-insulated ROPS/FOPS cab with climate control (optional)', 'Druckbelüftete, schallgedämmte ROPS/FOPS-Kabine mit Klimaanlage (optional)', 'Cabine ROPS/FOPS pressurizada e isolada acusticamente com climatização (opcional)'),
        loc('85 dB(A) en el oído del operador (cabina, CA25D)', '85 dB(A) at the operator ear (cab, CA25D)', '85 dB(A) am Fahrerohr (Kabine, CA25D)', '85 dB(A) no ouvido do operador (cabine, CA25D)')),
      usp6: usp(T.maintenance,
        loc('Kits de servicio Dynapac de 50 / 500 / 1.000 / 2.000 h', 'Dynapac service kits for 50 / 500 / 1,000 / 2,000 h', 'Dynapac-Servicekits für 50 / 500 / 1.000 / 2.000 h', 'Kits de serviço Dynapac de 50 / 500 / 1.000 / 2.000 h'),
        loc('Monitoreo remoto Dyn@link (opcional)', 'Dyn@link remote monitoring (optional)', 'Dyn@link-Fernüberwachung (optional)', 'Monitoramento remoto Dyn@link (opcional)')),
    },
  },
  {
    // Volvo SD110 brochure (Tier 3)
    line: 'sdr',
    match: is('VOLVO', /^SD110$/),
    usps: {
      usp1: usp(T.operation,
        loc('Transmisión hidrostática de dos velocidades (trabajo y traslado)', 'Two-speed hydrostatic drive (work and travel)', 'Hydrostatischer Zweigang-Antrieb (Arbeit und Transport)', 'Transmissão hidrostática de duas velocidades (trabalho e deslocamento)'),
        loc('Amplitud alta/baja y frecuencia 0-30 Hz ajustables desde la consola', 'High/low amplitude and 0-30 Hz frequency adjustable from the console', 'Hohe/niedrige Amplitude und Frequenz 0-30 Hz vom Bedienpult einstellbar', 'Amplitude alta/baixa e frequência 0-30 Hz ajustáveis no console')),
      usp3: usp(T.steering,
        loc('Articulación del bastidor ±40°', 'Frame articulation ±40°', 'Rahmenknickung ±40°', 'Articulação do chassi ±40°'),
        loc('Oscilación ±17° para mantener el tambor sobre la superficie', '±17° oscillation keeps the drum on the surface', '±17° Pendelung hält die Bandage auf dem Boden', 'Oscilação ±17° mantém o tambor sobre a superfície')),
      usp4: usp(T.comfort,
        loc('Visibilidad a 1 m alrededor de la máquina', 'Visibility to within 1 m around the machine', 'Sicht bis auf 1 m um die Maschine', 'Visibilidade a 1 m ao redor da máquina'),
        loc('ROPS/FOPS con cinturón de seguridad', 'ROPS/FOPS with seat belt', 'ROPS/FOPS mit Sicherheitsgurt', 'ROPS/FOPS com cinto de segurança')),
    },
  },
  {
    // Cat CS11 brochure (MAR-1 / Tier 3)
    line: 'sdr',
    match: is('CATERPILLAR', /^CS11$/),
    usps: {
      usp1: usp(T.operation,
        loc('Propulsión de doble bomba (tambor y eje trasero) para tracción en pendiente', 'Dual-pump propel (drum and rear axle) for traction on grades', 'Doppelpumpen-Fahrantrieb (Bandage und Hinterachse) für Traktion am Hang', 'Propulsão de bomba dupla (tambor e eixo traseiro) para tração em rampas'),
        loc('Modo económico y parada automática en vacío', 'Economy mode and automatic idle shutdown', 'Sparmodus und automatische Leerlaufabschaltung', 'Modo econômico e desligamento automático em marcha lenta')),
      usp3: usp(T.steering,
        loc('Enganche sin mantenimiento con cojinetes sellados de por vida', 'Maintenance-free hitch with lifetime-sealed bearings', 'Wartungsfreies Knickgelenk mit lebensdauergeschmierten Lagern', 'Articulação sem manutenção com rolamentos selados vitalícios')),
      usp4: usp(T.comfort,
        loc('Asiento giratorio con consola y pantalla integradas', 'Swivel seat with integrated console and display', 'Drehsitz mit integrierter Konsole und Anzeige', 'Assento giratório com console e tela integrados'),
        loc('Cámara trasera con pantalla táctil; techo de serie, cabina ROPS/FOPS opcional', 'Rear-view camera with touch screen; standard canopy, optional ROPS/FOPS cab', 'Rückfahrkamera mit Touchscreen; Sonnendach serienmäßig, ROPS/FOPS-Kabine optional', 'Câmera traseira com tela touch; teto de série, cabine ROPS/FOPS opcional')),
      usp5: usp(T.systems,
        loc('Cat Compact (opcional): MDP (potencia de tracción) y CMV (acelerómetro)', 'Cat Compact (optional): MDP (machine drive power) and CMV (accelerometer)', 'Cat Compact (optional): MDP (Antriebsleistung) und CMV (Beschleunigungssensor)', 'Cat Compact (opcional): MDP (potência de tração) e CMV (acelerômetro)'),
        loc('Vibración automática; frecuencia variable opcional', 'Automatic vibration; variable frequency optional', 'Automatische Vibration; variable Frequenz optional', 'Vibração automática; frequência variável opcional')),
      usp6: usp(T.maintenance,
        loc('Intervalos: aceite de motor 500 h, caja excéntrica e hidráulico 3.000 h, refrigerante 12.000 h', 'Intervals: engine oil 500 h, eccentric case and hydraulic 3,000 h, coolant 12,000 h', 'Intervalle: Motoröl 500 h, Erregergehäuse und Hydraulik 3.000 h, Kühlmittel 12.000 h', 'Intervalos: óleo do motor 500 h, caixa excêntrica e hidráulico 3.000 h, arrefecimento 12.000 h'),
        loc('Acceso a nivel del suelo; VisionLink', 'Ground-level access; VisionLink', 'Zugang vom Boden; VisionLink', 'Acesso no nível do solo; VisionLink')),
    },
  },
  {
    // SEM 512 Specalog 06/2023 (Tier II)
    line: 'sdr',
    match: is('SEM', /^512$/),
    usps: {
      usp1: usp(T.operation,
        loc('Transmisión hidrostática con accionamiento de eje trasero y tambor', 'Hydrostatic drive on rear axle and drum', 'Hydrostatischer Antrieb an Hinterachse und Bandage', 'Transmissão hidrostática no eixo traseiro e tambor'),
        loc('Velocidades 0-5,5 / 0-12 km/h', 'Speeds 0-5.5 / 0-12 km/h', 'Geschwindigkeiten 0-5,5 / 0-12 km/h', 'Velocidades 0-5,5 / 0-12 km/h')),
      usp3: usp(T.steering,
        loc('Ángulo de dirección ±33°, oscilación ±10°', 'Steering angle ±33°, oscillation ±10°', 'Lenkwinkel ±33°, Pendelung ±10°', 'Ângulo de direção ±33°, oscilação ±10°'),
        loc('Radio de giro interior 5.990 mm', 'Inner turning radius 5,990 mm', 'Innerer Wenderadius 5.990 mm', 'Raio de giro interno 5.990 mm')),
      usp6: usp(T.maintenance,
        loc('Hidráulica 20 % más eficiente que un sistema de centro abierto', 'Hydraulics 20 % more efficient than an open-centre system', 'Hydraulik 20 % effizienter als ein Open-Center-System', 'Hidráulica 20 % mais eficiente que um sistema de centro aberto'),
        loc('Tanque hidráulico más pequeño: menor costo de mantenimiento', 'Smaller hydraulic tank: lower maintenance cost', 'Kleinerer Hydrauliktank: geringere Wartungskosten', 'Tanque hidráulico menor: menor custo de manutenção')),
    },
  },
  {
    // Ammann ARS 110.1 datasheet (Stage IIIA / Tier 3)
    line: 'sdr',
    match: is('AMMANN', /^ARS 110/),
    usps: {
      usp1: usp(T.operation,
        loc('Sin eje trasero: centro de gravedad bajo y gran versatilidad', 'No rear axle: low centre of gravity and high versatility', 'Ohne Hinterachse: tiefer Schwerpunkt und hohe Vielseitigkeit', 'Sem eixo traseiro: centro de gravidade baixo e grande versatilidade'),
        loc('Bloqueo de diferencial entre ruedas; ATC (control de tracción) opcional', 'Differential lock between wheels; ATC (traction control) optional', 'Differenzialsperre zwischen den Rädern; ATC (Traktionskontrolle) optional', 'Bloqueio de diferencial entre rodas; ATC (controle de tração) opcional')),
      usp4: usp(T.comfort,
        loc('Plataforma y cabina espaciosas y silenciosas con visibilidad de 360°', 'Spacious, quiet platform and cab with 360° visibility', 'Geräumige, leise Plattform und Kabine mit 360°-Sicht', 'Plataforma e cabine espaçosas e silenciosas com visibilidade de 360°'),
        loc('Asiento ajustable con apoyabrazos y columna de dirección regulable', 'Adjustable seat with armrests and adjustable steering column', 'Verstellbarer Sitz mit Armlehnen und verstellbare Lenksäule', 'Assento ajustável com apoio de braços e coluna de direção regulável')),
      usp5: usp(T.systems,
        loc('Sistema de medición de compactación ACE (opcional)', 'ACE compaction measurement system (optional)', 'ACE-Verdichtungsmesssystem (optional)', 'Sistema de medição de compactação ACE (opcional)'),
        loc('Preinstalación telemática ServiceLink', 'ServiceLink telematics pre-installation', 'ServiceLink-Telematik-Vorrüstung', 'Pré-instalação telemática ServiceLink')),
      usp6: usp(T.maintenance,
        loc('Intervalos prolongados y puntos de drenaje centralizados', 'Extended intervals and centralised drain points', 'Verlängerte Intervalle und zentrale Ablasspunkte', 'Intervalos prolongados e pontos de drenagem centralizados'),
        loc('Kits de mantenimiento 500 / 1.000 / 2.000 h; ECOdrop', 'Maintenance kits 500 / 1,000 / 2,000 h; ECOdrop', 'Wartungskits 500 / 1.000 / 2.000 h; ECOdrop', 'Kits de manutenção 500 / 1.000 / 2.000 h; ECOdrop')),
    },
  },
  {
    // SANY SSR200C-8H flyer (China III)
    line: 'sdr',
    match: is('SANY', /^SSR200C-8H$/),
    usps: {
      usp2: usp(T.performance,
        loc('10 % más fuerza de excitación que su categoría: +16,7 % de producción (según SANY)', '10 % more excitation force than its class: +16.7 % output (per SANY)', '10 % mehr Erregerkraft als die Klasse: +16,7 % Leistung (laut SANY)', '10 % mais força de excitação que a categoria: +16,7 % de produção (segundo a SANY)'),
        loc('Fuerza centrífuga 380/275 kN, carga lineal estática 593 N/cm', 'Centrifugal force 380/275 kN, static linear load 593 N/cm', 'Zentrifugalkraft 380/275 kN, statische Linienlast 593 N/cm', 'Força centrífuga 380/275 kN, carga linear estática 593 N/cm')),
      usp4: usp(T.comfort,
        loc('Cabina sobre soportes amortiguadores con control de temperatura', 'Cab on damping mounts with temperature control', 'Kabine auf Dämpfungslagern mit Temperaturregelung', 'Cabine sobre coxins amortecedores com controle de temperatura'),
        loc('Menor esfuerzo en los mandos', 'Reduced control forces', 'Geringere Bedienkräfte', 'Menor esforço nos comandos')),
      usp6: usp(T.maintenance,
        loc('Lubricación tipo rueda de agua en rodamientos vibratorios: vida hasta 5.000 h', 'Water-wheel lubrication of vibration bearings: life up to 5,000 h', 'Schöpfradschmierung der Vibrationslager: Lebensdauer bis 5.000 h', 'Lubrificação tipo roda d’água nos rolamentos vibratórios: vida até 5.000 h'),
        loc('Doble filtración de aire de admisión y triple filtración hidráulica', 'Double intake air filtration and triple hydraulic filtration', 'Doppelte Ansaugluft- und dreifache Hydraulikfiltration', 'Dupla filtragem do ar de admissão e tripla filtragem hidráulica')),
    },
  },
  {
    // HAMM HC 200 (H257) datasheet (Tier 3)
    line: 'sdr',
    match: is('HAMM', /^HC ?200$/),
    usps: {
      usp1: usp(T.operation,
        loc('Concepto de mando Easy Drive', 'Easy Drive operating concept', 'Bedienkonzept Easy Drive', 'Conceito de comando Easy Drive'),
        loc('HAMMTRONIC: asistencia al conductor y gestión de la máquina; control de tracción automático', 'HAMMTRONIC: driver assistance and machine management; automatic traction control', 'HAMMTRONIC: Fahrerassistenz und Maschinenmanagement; automatische Traktionskontrolle', 'HAMMTRONIC: assistência ao operador e gestão da máquina; controle de tração automático')),
      usp3: usp(T.steering,
        loc('Ángulo de dirección ±35°', 'Steering angle ±35°', 'Lenkwinkel ±35°', 'Ângulo de direção ±35°')),
      usp4: usp(T.comfort,
        loc('Plataforma aislada de vibraciones; cabina ROPS/FOPS con calefacción', 'Vibration-isolated platform; heated ROPS/FOPS cab', 'Schwingungsentkoppelter Fahrerstand; beheizte ROPS/FOPS-Kabine', 'Plataforma isolada de vibrações; cabine ROPS/FOPS com aquecimento'),
        loc('Sistema de cámaras y apoyabrazos', 'Camera system and armrest', 'Kamerasystem und Armlehne', 'Sistema de câmeras e apoio de braço')),
      usp5: usp(T.systems,
        loc('Digital ready: interfaz Bluetooth para Smart Doc', 'Digital ready: Bluetooth interface for Smart Doc', 'Digital ready: Bluetooth-Schnittstelle für Smart Doc', 'Digital ready: interface Bluetooth para Smart Doc')),
      usp6: usp(T.maintenance,
        loc('Capó del motor con apertura eléctrica', 'Engine hood with electric release', 'Motorhaube mit elektrischer Entriegelung', 'Capô do motor com abertura elétrica')),
    },
  },
  // ---------------------------------------------------------------- LTR
  {
    // Dynapac CC900G datasheet
    line: 'ltr',
    match: is('DYNAPAC', /^CC900G$/),
    usps: {
      usp3: usp(T.steering,
        loc('Oscilación vertical ±6°, ángulo de dirección ±34°', 'Vertical oscillation ±6°, steering angle ±34°', 'Vertikale Pendelung ±6°, Lenkwinkel ±34°', 'Oscilação vertical ±6°, ângulo de direção ±34°')),
    },
  },
  // ---------------------------------------------------------------- HTR
  {
    // HAMM HD+ 90 VO (H258) datasheet
    line: 'htr',
    match: is('HAMM', /^HD\+ 90 VO$/),
    usps: {
      usp1: usp(T.operation,
        loc('Unidad de mando y asiento con giro y desplazamiento', 'Rotating and sliding control unit and seat', 'Dreh- und verschiebbare Bedieneinheit mit Sitz', 'Unidade de comando e assento giratórios e deslizantes'),
        loc('Manejo intuitivo independiente del idioma (HAMMTRONIC)', 'Intuitive, language-independent operation (HAMMTRONIC)', 'Intuitive, sprachunabhängige Bedienung (HAMMTRONIC)', 'Operação intuitiva independente do idioma (HAMMTRONIC)')),
      usp2: usp(T.performance,
        loc('Tambor delantero con vibración 42/50 Hz, 75/60 kN', 'Front vibration drum 42/50 Hz, 75/60 kN', 'Vorne Vibration 42/50 Hz, 75/60 kN', 'Tambor dianteiro com vibração 42/50 Hz, 75/60 kN'),
        loc('Tambor trasero con oscilación 39 Hz, 128 kN, amplitud tangencial 1,25 mm', 'Rear oscillation drum 39 Hz, 128 kN, tangential amplitude 1.25 mm', 'Hinten Oszillation 39 Hz, 128 kN, Tangentialamplitude 1,25 mm', 'Tambor traseiro com oscilação 39 Hz, 128 kN, amplitude tangencial 1,25 mm')),
      usp3: usp(T.steering,
        loc('Dirección articulada, ángulo ±30°, oscilación ±10°', 'Articulated steering, ±30° angle, ±10° oscillation', 'Knicklenkung, ±30° Lenkwinkel, ±10° Pendelung', 'Direção articulada, ângulo ±30°, oscilação ±10°'),
        loc('Desplazamiento de trazada 170 mm para cantos de bordillo', '170 mm crab steering offset for curb edges', '170 mm Hundegang für Bordsteinkanten', 'Deslocamento de trilha de 170 mm para bordas de meio-fio')),
      usp4: usp(T.comfort,
        loc('Asiento con suspensión, apoyabrazos y tablero inclinable', 'Suspended seat, armrests and tilting dashboard', 'Gefederter Sitz, Armlehnen und neigbares Armaturenbrett', 'Assento com suspensão, apoio de braços e painel inclinável'),
        loc('Buena visibilidad de la máquina y la obra; desplazamiento de carril para subir y bajar con comodidad', 'Good view of the machine and jobsite; lane offset for comfortable access', 'Gute Sicht auf Maschine und Baustelle; Spurversatz für bequemen Ein- und Ausstieg', 'Boa visibilidade da máquina e da obra; deslocamento de trilha para subir e descer com conforto')),
      usp5: usp(T.systems,
        loc('Compactómetro HCM y medición de temperatura HTM (opcionales)', 'HCM compaction meter and HTM temperature measurement (optional)', 'HCM-Verdichtungsmesser und HTM-Temperaturmessung (optional)', 'Compactômetro HCM e medição de temperatura HTM (opcionais)'),
        loc('Interfaz de datos de proceso para sistemas de terceros (opcional)', 'Process data interface for third-party systems (optional)', 'Prozessdatenschnittstelle für Fremdsysteme (optional)', 'Interface de dados de processo para sistemas de terceiros (opcional)')),
      usp6: usp(T.maintenance,
        loc('3 filtros de agua, depósitos llenables por ambos lados y desagüe central', '3 water filters, tanks fillable from both sides and central drain', '3 Wasserfilter, beidseitig befüllbare Tanks und zentraler Ablass', '3 filtros de água, tanques abastecíveis pelos dois lados e dreno central')),
    },
  },
  // ---------------------------------------------------------------- PTR
  {
    // BOMAG BW 28 RH datasheet PRS53842010 and brochure PRS 106 348
    line: 'ptr',
    match: is('BOMAG', /^BW 28 RH$/),
    usps: {
      usp1: usp(T.operation,
        loc('Concepto de manejo BOMAG uniforme en toda la gama', 'Uniform BOMAG operating concept across the range', 'Einheitliches BOMAG-Bedienkonzept über die ganze Baureihe', 'Conceito de operação BOMAG uniforme em toda a linha'),
        loc('Apoyabrazos multifuncional con joystick; pedal de freno en todo el ancho del puesto', 'Multifunction armrest with joystick; brake pedal across the full platform width', 'Multifunktionsarmlehne mit Joystick; Bremswippe über die ganze Fahrerstandbreite', 'Apoio de braço multifuncional com joystick; pedal de freio em toda a largura do posto')),
      usp2: usp(T.ballast,
        loc('Peso de 8,6 a 28 t con placas de hormigón/acero de cambio rápido y cámara de lastre de 3 m³', 'Weight from 8.6 to 28 t with quick-change concrete/steel plates and a 3 m³ ballast chamber', 'Gewicht von 8,6 bis 28 t mit Schnellwechsel-Beton-/Stahlplatten und 3-m³-Ballastkammer', 'Peso de 8,6 a 28 t com placas de concreto/aço de troca rápida e câmara de lastro de 3 m³'),
        loc('Inflado automático 2-8 bar (opcional); ECOMODE: hasta 30 % menos combustible', 'Automatic inflation 2-8 bar (optional); ECOMODE: up to 30 % less fuel', 'Reifendruckregelung 2-8 bar (optional); ECOMODE: bis zu 30 % weniger Kraftstoff', 'Calibragem automática 2-8 bar (opcional); ECOMODE: até 30 % menos combustível')),
      usp3: usp(T.steering,
        loc('Eje delantero pendular triple: reparte el peso entre todas las ruedas', 'Triple pendulum front axle: spreads the weight over all wheels', 'Dreifach-Pendelvorderachse: verteilt das Gewicht auf alle Räder', 'Eixo dianteiro pendular triplo: distribui o peso entre todas as rodas'),
        loc('Regulación de límite de carga en pendientes', 'Load-limit control on gradients', 'Grenzlastregelung an Steigungen', 'Regulação de limite de carga em rampas')),
      usp4: usp(T.comfort,
        loc('Chasis "tiburón martillo": vista libre de ruedas y bordes exteriores', '"Hammerhead" chassis: clear view of the tyres and outer edges', '"Hammerhai"-Chassis: freie Sicht auf Reifen und Außenkanten', 'Chassi "tubarão-martelo": visão livre das rodas e bordas externas'),
        loc('Cabina amplia con asiento de giro libre', 'Spacious cab with freely rotating seat', 'Geräumige Kabine mit frei drehbarem Sitz', 'Cabine ampla com assento de giro livre')),
      usp5: usp(T.antiStick,
        loc('Tobera por rueda con 6 intervalos de riego preseleccionables', 'One nozzle per tyre with 6 preselectable spraying intervals', 'Eine Düse pro Reifen mit 6 vorwählbaren Berieselungsintervallen', 'Um bico por pneu com 6 intervalos de aspersão pré-selecionáveis'),
        loc('Esteras de coco, cepillos y faldones térmicos opcionales', 'Coconut mats, brushes and thermal aprons optional', 'Kokosmatten, Bürsten und Thermoschürzen optional', 'Esteiras de coco, escovas e saias térmicas opcionais')),
      usp6: usp(T.maintenance,
        loc('BOMAG EasyService: todos los puntos de mantenimiento accesibles desde el suelo', 'BOMAG EasyService: all service points accessible from the ground', 'BOMAG EasyService: alle Wartungspunkte vom Boden erreichbar', 'BOMAG EasyService: todos os pontos de manutenção acessíveis do solo'),
        loc('Amplias posibilidades de diagnóstico', 'Extensive diagnostics', 'Umfangreiche Diagnosemöglichkeiten', 'Amplas possibilidades de diagnóstico')),
    },
  },
  {
    // BOMAG BW 24 RH / BW 27 RH datasheet PRS53800010
    line: 'ptr',
    match: is('BOMAG', /^BW 2[47] RH$/),
    usps: {
      usp1: usp(T.operation,
        loc('Puesto de conducción con dos volantes y asiento desplazable lateralmente', 'Operator station with two steering wheels and laterally sliding seat', 'Fahrerstand mit zwei Lenkrädern und seitlich verschiebbarem Sitz', 'Posto com dois volantes e assento deslizante lateralmente')),
      usp2: usp(T.ballast,
        loc('Lastre de acero de 1.600 / 3.200 / 4.800 kg', 'Steel ballast of 1,600 / 3,200 / 4,800 kg', 'Stahlballast 1.600 / 3.200 / 4.800 kg', 'Lastro de aço de 1.600 / 3.200 / 4.800 kg'),
        loc('Infla-neumáticos central (opcional)', 'Central tyre inflation (optional)', 'Zentrale Reifenfüllanlage (optional)', 'Calibragem central de pneus (opcional)')),
      usp3: usp(T.steering,
        loc('Oscilación de los neumáticos delanteros 4°', 'Front tyre oscillation 4°', 'Pendelung der Vorderreifen 4°', 'Oscilação dos pneus dianteiros 4°')),
      usp4: usp(T.comfort,
        loc('ROPS/FOPS o cabina ROPS con calefacción o climatizador (opcionales)', 'ROPS/FOPS or ROPS cab with heating or air conditioning (optional)', 'ROPS/FOPS oder ROPS-Kabine mit Heizung oder Klimaanlage (optional)', 'ROPS/FOPS ou cabine ROPS com aquecimento ou ar-condicionado (opcionais)')),
      usp5: usp(T.antiStick,
        loc('Rociado de agua a presión y rascador por rueda', 'Pressurised water spraying and one scraper per wheel', 'Druckwasserberieselung und Abstreifer je Rad', 'Aspersão de água sob pressão e raspador por roda'),
        loc('Rascadores de fibra de coco o cepillo pretensados; BOMAG TELEMATIC opcional', 'Pre-tensioned coconut or brush scrapers; BOMAG TELEMATIC optional', 'Vorgespannte Kokos- oder Bürstenabstreifer; BOMAG TELEMATIC optional', 'Raspadores de fibra de coco ou escova pré-tensionados; BOMAG TELEMATIC opcional')),
    },
  },
  {
    // HAMM HP 180 (H248) / HP 280 (H249) datasheets
    line: 'ptr',
    match: is('HAMM', /^HP [12]80$/),
    usps: {
      usp1: usp(T.operation,
        loc('Unidad de mando y asiento con giro y desplazamiento', 'Rotating and sliding control unit and seat', 'Dreh- und verschiebbare Bedieneinheit mit Sitz', 'Unidade de comando e assento giratórios e deslizantes'),
        loc('Tablero de instrumentos inclinable y modo ECO', 'Tilting dashboard and ECO mode', 'Neigbares Armaturenbrett und ECO-Modus', 'Painel inclinável e modo ECO')),
      usp2: usp(T.ballast,
        loc('Compensación de nivel en los pares de ruedas delanteros', 'Level compensation on the front wheel pairs', 'Niveauausgleich an den vorderen Radpaaren', 'Compensação de nível nos pares de rodas dianteiros'),
        loc('Dispositivo de inflado de neumáticos (opcional)', 'Tyre inflation system (optional)', 'Reifenfüllanlage (optional)', 'Dispositivo de calibragem dos pneus (opcional)')),
      usp3: usp(T.steering,
        loc('Dirección de 2 puntos; oscilación ±2° (HP 180)', '2-point steering; ±2° oscillation (HP 180)', '2-Punkt-Lenkung; ±2° Pendelung (HP 180)', 'Direção de 2 pontos; oscilação ±2° (HP 180)')),
      usp4: usp(T.comfort,
        loc('Columna de dirección con bajada cómoda (opcional)', 'Steering column with comfortable lowering (optional)', 'Lenksäule mit Komfortabsenkung (optional)', 'Coluna de direção com rebaixamento confortável (opcional)')),
      usp5: usp(T.antiStick,
        loc('Rociado de agua con regulación según la velocidad', 'Water spraying controlled by travel speed', 'Wasserberieselung geschwindigkeitsabhängig geregelt', 'Aspersão de água regulada conforme a velocidade'),
        loc('Faldones térmicos y medición de temperatura HTM (opcionales)', 'Thermal aprons and HTM temperature measurement (optional)', 'Thermoschürzen und HTM-Temperaturmessung (optional)', 'Saias térmicas e medição de temperatura HTM (opcionais)')),
      usp6: usp(T.maintenance,
        loc('Desagüe central', 'Central drain', 'Zentraler Ablass', 'Dreno central')),
    },
  },
  {
    // Dynapac CP1200 datasheet
    line: 'ptr',
    match: is('DYNAPAC', /^CP1200$/),
    usps: {
      usp2: usp(T.ballast,
        loc('Lastre de acero flexible: hasta 12.100 kg (8 o 12 bloques)', 'Flexible steel ballast: up to 12,100 kg (8 or 12 blocks)', 'Flexibler Stahlballast: bis 12.100 kg (8 oder 12 Blöcke)', 'Lastro de aço flexível: até 12.100 kg (8 ou 12 blocos)')),
      usp3: usp(T.steering,
        loc('Oscilación de ruedas ±3°', 'Wheel oscillation ±3°', 'Radpendelung ±3°', 'Oscilação das rodas ±3°')),
      usp4: usp(T.comfort,
        loc('Asiento con suspensión y apoyabrazos; toldo, ROPS/FOPS o cabina', 'Suspended seat with armrest; canopy, ROPS/FOPS or cab', 'Gefederter Sitz mit Armlehne; Dach, ROPS/FOPS oder Kabine', 'Assento com suspensão e apoio de braço; toldo, ROPS/FOPS ou cabine')),
      usp5: usp(T.antiStick,
        loc('Riego presurizado con bomba eléctrica, tanque de 410 l y una tobera por neumático', 'Pressurised spraying with electric pump, 410 l tank and one nozzle per tyre', 'Druckberieselung mit Elektropumpe, 410-l-Tank und einer Düse pro Reifen', 'Aspersão pressurizada com bomba elétrica, tanque de 410 l e um bico por pneu')),
    },
  },
  {
    // Dynapac CP2700 datasheet
    line: 'ptr',
    match: is('DYNAPAC', /^CP2700$/),
    usps: {
      usp2: usp(T.ballast,
        loc('Lastre hasta 27.000 kg (cámara de 3 m³)', 'Ballast up to 27,000 kg (3 m³ chamber)', 'Ballast bis 27.000 kg (3-m³-Kammer)', 'Lastro até 27.000 kg (câmara de 3 m³)'),
        loc('Presión de inflado 250-850 kPa', 'Inflation pressure 250-850 kPa', 'Reifendruck 250-850 kPa', 'Pressão de calibragem 250-850 kPa')),
    },
  },
  {
    // Volvo PT125R brochure
    line: 'ptr',
    match: is('VOLVO', /^PTR?125/),
    usps: {
      usp2: usp(T.ballast,
        loc('9 ruedas (4 delanteras + 5 traseras) solapadas para cubrir todo el ancho', '9 overlapping wheels (4 front + 5 rear) covering the full width', '9 überlappende Räder (4 vorne + 5 hinten) über die ganze Breite', '9 rodas sobrepostas (4 dianteiras + 5 traseiras) cobrindo toda a largura')),
      usp3: usp(T.steering,
        loc('Cada pareja de ruedas delanteras oscila ±3°', 'Each front wheel pair oscillates ±3°', 'Jedes vordere Radpaar pendelt ±3°', 'Cada par de rodas dianteiras oscila ±3°')),
      usp4: usp(T.comfort,
        loc('ROPS abatible para transporte con cinturón', 'Foldable ROPS for transport with seat belt', 'Klappbarer ROPS für den Transport mit Gurt', 'ROPS rebatível para transporte com cinto')),
      usp5: usp(T.antiStick,
        loc('Riego presurizado de 379 l con bomba de membrana y boquilla por neumático', '379 l pressurised spraying with diaphragm pump and one nozzle per tyre', '379-l-Druckberieselung mit Membranpumpe und Düse pro Reifen', 'Aspersão pressurizada de 379 l com bomba de diafragma e bico por pneu'),
        loc('Esteras de fibra de coco', 'Coconut fibre mats', 'Kokosfasermatten', 'Esteiras de fibra de coco')),
    },
  },
  {
    // Volvo PT220 brochure (Tier 3)
    line: 'ptr',
    match: is('VOLVO', /^PTR?220/),
    usps: {
      usp1: usp(T.operation,
        loc('Accionamiento hidrostático: cambios suaves de dirección sin marcar la superficie', 'Hydrostatic drive: smooth direction changes without marking the mat', 'Hydrostatischer Antrieb: weiche Richtungswechsel ohne Markierungen', 'Acionamento hidrostático: mudanças suaves de direção sem marcar a superfície'),
        loc('Motor Volvo D5 Tier 3: menor consumo y nivel sonoro', 'Volvo D5 Tier 3 engine: lower consumption and noise', 'Volvo-D5-Motor Tier 3: geringerer Verbrauch und Lärm', 'Motor Volvo D5 Tier 3: menor consumo e ruído')),
      usp2: usp(T.ballast,
        loc('8 neumáticos solapados 50 mm para cobertura total', '8 tyres overlapping by 50 mm for full coverage', '8 Reifen mit 50 mm Überlappung für volle Abdeckung', '8 pneus sobrepostos em 50 mm para cobertura total')),
      usp3: usp(T.steering,
        loc('Nivelación isostática del par delantero de neumáticos', 'Isostatic levelling of the front tyre pair', 'Isostatischer Niveauausgleich des vorderen Reifenpaars', 'Nivelamento isostático do par dianteiro de pneus')),
      usp4: usp(T.comfort,
        loc('ROPS certificado ISO con parasol y cinturón', 'ISO-certified ROPS with sun canopy and seat belt', 'ISO-zertifizierter ROPS mit Sonnendach und Gurt', 'ROPS certificado ISO com para-sol e cinto')),
    },
  },
  {
    // Cat CW16 product sheet
    line: 'ptr',
    match: is('CATERPILLAR', /^CW16$/),
    usps: {
      usp1: usp(T.operation,
        loc('Propulsión hidrostática de dos velocidades hasta 19 km/h con rueda libre para ahorrar combustible', 'Two-speed hydrostatic propel up to 19 km/h with coasting to save fuel', 'Hydrostatischer Zweigang-Fahrantrieb bis 19 km/h mit Rollfunktion zum Kraftstoffsparen', 'Propulsão hidrostática de duas velocidades até 19 km/h com roda livre para economizar combustível'),
        loc('Eco-mode y control electrónico de propulsión', 'Eco-mode and electronic propel control', 'Eco-Modus und elektronische Fahrsteuerung', 'Eco-mode e controle eletrônico de propulsão')),
      usp2: usp(T.ballast,
        loc('9 ruedas (opción de 11); lastre de acero, arena o agua hasta 15 t', '9 wheels (11 optional); steel, sand or water ballast up to 15 t', '9 Räder (11 optional); Stahl-, Sand- oder Wasserballast bis 15 t', '9 rodas (11 opcional); lastro de aço, areia ou água até 15 t')),
      usp3: usp(T.steering,
        loc('Ruedas delanteras oscilantes en todo el ancho de la máquina', 'Oscillating front wheels across the full machine width', 'Pendelnde Vorderräder über die ganze Maschinenbreite', 'Rodas dianteiras oscilantes em toda a largura da máquina')),
      usp4: usp(T.comfort,
        loc('Puesto de mando giratorio con pantalla LCD y teclado táctil; ROPS o toldo', 'Rotating operator station with LCD display and touch pad; ROPS or canopy', 'Drehbarer Fahrerstand mit LCD-Anzeige und Touchpad; ROPS oder Dach', 'Posto giratório com tela LCD e teclado touch; ROPS ou toldo')),
      usp5: usp(T.antiStick,
        loc('Riego presurizado con rascadores o esteras de coco', 'Pressurised spraying with scrapers or coconut mats', 'Druckberieselung mit Abstreifern oder Kokosmatten', 'Aspersão pressurizada com raspadores ou esteiras de coco'),
        loc('Faldones de retención de calor opcionales', 'Optional heat-retention aprons', 'Optionale Wärmeschürzen', 'Saias de retenção de calor opcionais')),
    },
  },
  {
    // Cat CW34 brochure
    line: 'ptr',
    match: is('CATERPILLAR', /^CW34$/),
    usps: {
      usp1: usp(T.operation,
        loc('Eco-mode a 1.900 rpm; propulsión de dos velocidades hasta 19 km/h con rueda libre', 'Eco-mode at 1,900 rpm; two-speed propel up to 19 km/h with coasting', 'Eco-Modus bei 1.900 U/min; Zweigang-Fahrantrieb bis 19 km/h mit Rollfunktion', 'Eco-mode a 1.900 rpm; propulsão de duas velocidades até 19 km/h com roda livre'),
        loc('Pedal de desaceleración y gestión de bordes (rueda de corte o bisel)', 'Deceleration pedal and edge management (cut-off or bevel wheel)', 'Verzögerungspedal und Kantenbearbeitung (Schneid- oder Fasenrad)', 'Pedal de desaceleração e gestão de bordas (roda de corte ou chanfro)')),
      usp2: usp(T.ballast,
        loc('10-27 t con lastre modular de acero (6,5 t) y cámara estanca de 3.000 l', '10-27 t with modular steel ballast (6.5 t) and a 3,000 l watertight chamber', '10-27 t mit modularem Stahlballast (6,5 t) und 3.000-l-Kammer', '10-27 t com lastro modular de aço (6,5 t) e câmara estanque de 3.000 l'),
        loc('Air-on-the-run opcional para equilibrar la presión de los neumáticos', 'Optional air-on-the-run to balance tyre pressures', 'Optionales Air-on-the-run für ausgeglichenen Reifendruck', 'Air-on-the-run opcional para equilibrar a pressão dos pneus')),
      usp3: usp(T.steering,
        loc('Juegos de ruedas delantero y trasero oscilantes con suspensión vertical', 'Front and rear wheel sets oscillate with vertical suspension', 'Vordere und hintere Radsätze pendeln mit vertikaler Federung', 'Conjuntos de rodas dianteiro e traseiro oscilantes com suspensão vertical')),
      usp4: usp(T.comfort,
        loc('Puesto que gira 90° a cada lado; pantalla configurable', 'Operator station rotates 90° to either side; configurable display', 'Fahrerstand je 90° drehbar; konfigurierbare Anzeige', 'Posto gira 90° para cada lado; tela configurável')),
      usp5: usp(T.antiStick,
        loc('Riego de 380 l con triple filtración; sistema de emulsión de 40 l opcional', '380 l spraying with triple filtration; optional 40 l emulsion system', '380-l-Berieselung mit Dreifachfilterung; optionales 40-l-Emulsionssystem', 'Aspersão de 380 l com tripla filtragem; sistema de emulsão de 40 l opcional'),
        loc('VisionLink para gestión de flota', 'VisionLink fleet management', 'VisionLink-Flottenmanagement', 'VisionLink para gestão de frota')),
    },
  },
  {
    // Ammann AP 240 datasheet (Stage IIIA / Tier 3)
    line: 'ptr',
    match: is('AMMANN', /^AP 240$/),
    usps: {
      usp1: usp(T.operation,
        loc('2 puestos de operador; tracción hidrodinámica con caja powershift de 3 marchas', '2 operator positions; hydrodynamic drive with 3-gear powershift box', '2 Fahrerplätze; hydrodynamischer Antrieb mit 3-Gang-Lastschaltgetriebe', '2 postos de operador; tração hidrodinâmica com caixa powershift de 3 marchas'),
        loc('Ammann Traction Control (opcional)', 'Ammann Traction Control (optional)', 'Ammann Traction Control (optional)', 'Ammann Traction Control (opcional)')),
      usp2: usp(T.ballast,
        loc('Ajuste de peso según la obra: bloques de lastre de 1 a 8 t', 'Weight adjusted to the jobsite: ballast blocks from 1 to 8 t', 'Gewicht je nach Baustelle: Ballastblöcke von 1 bis 8 t', 'Ajuste de peso conforme a obra: blocos de lastro de 1 a 8 t'),
        loc('Inflado central "Air on Run" (opcional)', '"Air on Run" central inflation (optional)', 'Zentrale Reifenfüllung "Air on Run" (optional)', 'Calibragem central "Air on Run" (opcional)')),
      usp3: usp(T.steering,
        loc('Eje delantero isostático con oscilación: contacto constante con el suelo', 'Isostatic oscillating front axle: constant ground contact', 'Isostatische Pendelvorderachse: konstanter Bodenkontakt', 'Eixo dianteiro isostático com oscilação: contato constante com o solo')),
      usp4: usp(T.comfort,
        loc('Plataforma y cabina espaciosas y silenciosas con visibilidad de 360°', 'Spacious, quiet platform and cab with 360° visibility', 'Geräumige, leise Plattform und Kabine mit 360°-Sicht', 'Plataforma e cabine espaçosas e silenciosas com visibilidade de 360°')),
      usp6: usp(T.maintenance,
        loc('Acceso fácil al motor, puntos de prueba externos y diagnóstico rápido', 'Easy engine access, external test points and quick diagnostics', 'Einfacher Motorzugang, externe Messpunkte und schnelle Diagnose', 'Acesso fácil ao motor, pontos de teste externos e diagnóstico rápido'),
        loc('Kits de mantenimiento 250 / 500 / 1.000 h; ECOdrop', 'Maintenance kits 250 / 500 / 1,000 h; ECOdrop', 'Wartungskits 250 / 500 / 1.000 h; ECOdrop', 'Kits de manutenção 250 / 500 / 1.000 h; ECOdrop')),
    },
  },
  {
    // SANY SPR160C-8 flyer
    line: 'ptr',
    match: is('SANY', /^SPR160C-8$/),
    usps: {
      usp1: usp(T.operation,
        loc('Accionamiento hidrostático continuo: arranques y paradas suaves', 'Continuously variable hydrostatic drive: smooth starts and stops', 'Stufenloser hydrostatischer Antrieb: sanftes Anfahren und Anhalten', 'Acionamento hidrostático contínuo: partidas e paradas suaves'),
        loc('Freno hidráulico: distancia de frenado 50 % menor (según SANY)', 'Hydraulic brake: 50 % shorter braking distance (per SANY)', 'Hydraulische Bremse: 50 % kürzerer Bremsweg (laut SANY)', 'Freio hidráulico: distância de frenagem 50 % menor (segundo a SANY)')),
      usp2: usp(T.ballast,
        loc('Inflado centralizado ajustable desde la cabina, 200-800 kPa (opcional)', 'Centralised inflation adjustable from the cab, 200-800 kPa (optional)', 'Zentrale Reifenfüllung von der Kabine einstellbar, 200-800 kPa (optional)', 'Calibragem centralizada ajustável da cabine, 200-800 kPa (opcional)')),
      usp5: usp(T.antiStick,
        loc('Rociado automático de aceite neumático: evita la adherencia del asfalto (opcional)', 'Automatic pneumatic oil spraying: prevents asphalt sticking (optional)', 'Automatische pneumatische Ölsprühung: verhindert Asphaltanhaftung (optional)', 'Aspersão automática de óleo pneumática: evita aderência do asfalto (opcional)')),
    },
  },
  // ---------------------------------------------------------------- Milling
  {
    // Wirtgen W 100 HR / W 130 HR brochure
    line: 'milling',
    match: is('WIRTGEN', /^W 1[03]0 HR$/),
    usps: {
      usp1: loc(
        'Carga trasera de hasta 92 m³/h, 3 velocidades del tambor y control de carga automático; fresa paquetes completos de hasta 200 mm.',
        'Rear loading of up to 92 m³/h, 3 drum speeds and automatic load control; mills complete packages of up to 200 mm.',
        'Heckverladung bis 92 m³/h, 3 Walzendrehzahlen und automatische Lastregelung; fräst komplette Pakete bis 200 mm.',
        'Carga traseira de até 92 m³/h, 3 velocidades do tambor e controle de carga automático; fresa pacotes completos de até 200 mm.'
      ),
      usp2: loc(
        'Radios de fresado muy pequeños, rueda trasera pivotante para fresar al ras del bordillo y tracción en todas las ruedas.',
        'Very small milling radii, pivoting rear wheel for flush-to-curb milling and all-wheel drive.',
        'Sehr kleine Fräsradien, schwenkbares Hinterrad für bündiges Fräsen am Bordstein und Allradantrieb.',
        'Raios de fresagem muito pequenos, roda traseira articulada para fresar rente ao meio-fio e tração em todas as rodas.'
      ),
      usp3: loc(
        'Portapicas HT22 muy resistente al desgaste, dispositivo de giro del tambor para cambiar picas y agua ajustable para bajo consumo.',
        'Highly wear-resistant HT22 tool holders, drum turning device for pick changes and adjustable water for low consumption.',
        'Sehr verschleißfeste HT22-Meißelhalter, Walzendrehvorrichtung zum Meißelwechsel und einstellbare Wassermenge.',
        'Porta-dentes HT22 muito resistentes ao desgaste, dispositivo de giro do tambor para troca de dentes e água ajustável.'
      ),
      usp4: loc(
        'Joystick multifuncional, display en color en el apoyabrazos, nivelación LEVEL PRO PLUS y sensor RAPID SLOPE opcionales.',
        'Multifunction joystick, colour display in the armrest, optional LEVEL PRO PLUS levelling and RAPID SLOPE sensor.',
        'Multifunktionsjoystick, Farbdisplay in der Armlehne, optionale LEVEL-PRO-PLUS-Nivellierung und RAPID-SLOPE-Sensor.',
        'Joystick multifuncional, display colorido no apoio de braço, nivelamento LEVEL PRO PLUS e sensor RAPID SLOPE opcionais.'
      ),
    },
  },
  {
    // Cat PM620 / PM622 brochure QSH92684
    line: 'milling',
    match: is('CATERPILLAR', /^PM62[02]$/),
    usps: {
      usp1: loc(
        'Motor Cat C18 de 470 kW, 3 velocidades del rotor, control automático de carga y cinta con aumento temporal de velocidad.',
        'Cat C18 470 kW engine, 3 rotor speeds, automatic load control and conveyor with temporary speed boost.',
        'Cat-C18-Motor mit 470 kW, 3 Rotordrehzahlen, automatische Lastregelung und Band mit kurzzeitiger Geschwindigkeitserhöhung.',
        'Motor Cat C18 de 470 kW, 3 velocidades do rotor, controle automático de carga e correia com aumento temporário de velocidade.'
      ),
      usp2: loc(
        'Cuatro modos de dirección, cadenas basadas en los tractores Cat D3/D4 y control de tracción automático.',
        'Four steering modes, tracks based on Cat D3/D4 dozers and automatic traction control.',
        'Vier Lenkmodi, Laufwerke auf Basis der Cat-D3/D4-Raupen und automatische Traktionskontrolle.',
        'Quatro modos de direção, esteiras baseadas nos tratores Cat D3/D4 e controle de tração automático.'
      ),
      usp3: loc(
        'Rotores System K con portaherramientas sin pernos; puntas de diamante hasta 80 veces más duraderas y hasta 15 % de ahorro de combustible.',
        'System K rotors with boltless tool holders; diamond tips last up to 80 times longer and save up to 15 % fuel.',
        'System-K-Rotoren mit schraubenlosen Meißelhaltern; Diamantmeißel halten bis zu 80-mal länger und sparen bis zu 15 % Kraftstoff.',
        'Rotores System K com porta-ferramentas sem parafusos; pontas de diamante até 80 vezes mais duráveis e até 15 % de economia de combustível.'
      ),
      usp4: loc(
        'Cat GRADE con Grade and Slope, techo eléctrico que se pliega en 10 s, cámaras remotas y consolas regulables en altura.',
        'Cat GRADE with Grade and Slope, electric canopy that folds in 10 s, remote cameras and height-adjustable consoles.',
        'Cat GRADE mit Grade and Slope, elektrisches Dach, das in 10 s einklappt, Fernkameras und höhenverstellbare Konsolen.',
        'Cat GRADE com Grade and Slope, teto elétrico que dobra em 10 s, câmeras remotas e consoles reguláveis em altura.'
      ),
    },
  },
  {
    // SANY SCM1000C-8S flyer
    line: 'milling',
    match: is('SANY', /^SCM1000C-8S$/),
    usps: {
      usp1: loc(
        'Motor de 180 kW con tambor de accionamiento mecánico (20 % más eficiente que el hidráulico); 280 mm en una sola pasada.',
        '180 kW engine with mechanically driven drum (20 % more efficient than hydraulic); 280 mm in a single pass.',
        '180-kW-Motor mit mechanisch angetriebener Walze (20 % effizienter als hydraulisch); 280 mm in einem Übergang.',
        'Motor de 180 kW com tambor de acionamento mecânico (20 % mais eficiente que o hidráulico); 280 mm em uma única passada.'
      ),
      usp2: loc(
        'Radio de fresado ≤1,2 m y vía delantera ensanchada para cargar en plataforma sin grúa.',
        'Milling radius ≤1.2 m and widened front track for loading onto a flatbed without a crane.',
        'Fräsradius ≤1,2 m und verbreiterte Vorderspur zum Verladen ohne Kran.',
        'Raio de fresagem ≤1,2 m e bitola dianteira alargada para carregar na prancha sem guindaste.'
      ),
      usp3: loc(
        'Portaherramientas con aleación antidesgaste ≥2.000 h, neumáticos >1.000 h y régimen automático para ahorrar combustible.',
        'Tool holders with wear-resistant alloy ≥2,000 h, tyres >1,000 h and automatic engine speed control to save fuel.',
        'Meißelhalter mit verschleißfester Legierung ≥2.000 h, Reifen >1.000 h und automatische Drehzahlregelung zum Kraftstoffsparen.',
        'Porta-ferramentas com liga antidesgaste ≥2.000 h, pneus >1.000 h e rotação automática para economizar combustível.'
      ),
      usp4: loc(
        'Nivelación automática SYMC de serie, riego inteligente y descarga a 4,5 m para camiones de 8 ruedas.',
        'Standard SYMC automatic levelling, intelligent spraying and 4.5 m discharge for 8-wheel trucks.',
        'SYMC-Nivellierautomatik serienmäßig, intelligente Berieselung und 4,5 m Abwurfhöhe für 8-Rad-Lkw.',
        'Nivelamento automático SYMC de série, aspersão inteligente e descarga a 4,5 m para caminhões de 8 rodas.'
      ),
    },
  },
  {
    // SANY SCM2000C-10 flyer
    line: 'milling',
    match: is('SANY', /^SCM2000C-10$/),
    usps: {
      usp1: loc(
        'Motor Cummins de alta potencia, cinta de hasta 6 m/s y traslado de hasta 100 m/min.',
        'High-power Cummins engine, conveyor up to 6 m/s and travel up to 100 m/min.',
        'Leistungsstarker Cummins-Motor, Band bis 6 m/s und Fahrt bis 100 m/min.',
        'Motor Cummins de alta potência, correia de até 6 m/s e deslocamento de até 100 m/min.'
      ),
      usp2: loc(
        'Vista panorámica de 360° y asistencia de conducción opcionales; altura de descarga de 5 m.',
        'Optional 360° view and driving assistance; 5 m discharge height.',
        'Optionale 360°-Sicht und Fahrassistenz; Abwurfhöhe 5 m.',
        'Visão panorâmica de 360° e assistência à condução opcionais; altura de descarga de 5 m.'
      ),
      usp3: loc(
        'Ahorro automático con tecnología adaptativa a la carga, manguitos de aleación con 50 % más vida y agua ajustada a la carga (+30 % de autonomía).',
        'Automatic savings with load-adaptive technology, alloy sleeves with 50 % longer life and load-adjusted water (+30 % autonomy).',
        'Automatische Einsparung durch lastadaptive Technik, Legierungshülsen mit 50 % längerer Lebensdauer und lastabhängige Wassermenge (+30 % Reichweite).',
        'Economia automática com tecnologia adaptativa à carga, luvas de liga com 50 % mais vida e água ajustada à carga (+30 % de autonomia).'
      ),
      usp4: loc(
        'Arranque y parada remotos, corte automático, fresado con un botón, dos pantallas táctiles de 10" y lubricación automática.',
        'Remote start/stop, automatic cutting, one-button milling, two 10" touch screens and automatic lubrication.',
        'Fern-Start/Stopp, automatisches Einfräsen, Fräsen per Knopfdruck, zwei 10"-Touchscreens und Zentralschmierung.',
        'Partida e parada remotas, corte automático, fresagem com um botão, duas telas touch de 10" e lubrificação automática.'
      ),
    },
  },
  // ---------------------------------------------------------------- Pavers
  {
    // BOMAG paver presentation: BF 800-1 section (MAGMALIFE and ECOMODE listed as standard)
    line: 'pavers',
    match: is('BOMAG', /^BF 800 [CP]-1$/),
    usps: {
      usp1: loc('MAGMALIFE de serie - placas de aluminio fundido - vida >3.000 h - calentamiento hasta 30 % más rápido', 'MAGMALIFE as standard - cast aluminium plates - lifetime >3,000 h - up to 30 % faster heat-up', 'MAGMALIFE serienmäßig - Aluminiumguss-Platten - Lebensdauer >3.000 h - bis zu 30 % schnelleres Aufheizen', 'MAGMALIFE de série - placas de alumínio fundido - vida >3.000 h - aquecimento até 30 % mais rápido'),
      usp3: loc('ECOMODE de 3 etapas + hidráulica load-sensing - ~20 % menos combustible', '3-stage ECOMODE + load-sensing hydraulics - ~20 % less fuel', '3-stufiger ECOMODE + Load-Sensing-Hydraulik - ~20 % weniger Kraftstoff', 'ECOMODE de 3 estágios + hidráulica load-sensing - ~20 % menos combustível'),
      usp4: loc('QUICKCOUPLING - extensiones mecánicas 250/750/1.250 mm, sistema modular', 'QUICKCOUPLING - 250/750/1,250 mm mechanical extensions, modular system', 'QUICKCOUPLING - mechanische Verbreiterungen 250/750/1.250 mm, modulares System', 'QUICKCOUPLING - extensões mecânicas de 250/750/1.250 mm, sistema modular'),
      usp5: loc('Plataforma desplazable, asiento y tablero giratorios - mando ciego en el control de la regla', 'Sliding platform, rotating seat and dashboard - blind operation on the screed control', 'Verschiebbarer Fahrerstand, drehbarer Sitz und Bedienpult - Blindbedienung am Bohlensteuerstand', 'Plataforma deslizante, assento e painel giratórios - operação às cegas no controle da mesa'),
      usp6: loc('Rodillo de empuje oscilante y giratorio', 'Oscillating, rotatable push roller', 'Pendelnde, drehbare Schubrolle', 'Rolo de empurre oscilante e giratório'),
      usp7: loc('Sistemas de nivelación opcionales', 'Levelling systems optional', 'Nivelliersysteme optional', 'Sistemas de nivelamento opcionais'),
      usp8: loc('No publicado - planchas de alisado de 400 mm (las más largas del mercado)', 'Not published - 400 mm wear plates (longest on the market)', 'Nicht angegeben - 400-mm-Glättbleche (die längsten am Markt)', 'Não publicado - chapas de alisamento de 400 mm (as mais longas do mercado)'),
    },
  },
  {
    // BOMAG paver presentation: BF 800/900 C-2 L section
    line: 'pavers',
    match: is('BOMAG', /^BF [89]00 C-2 L$/),
    usps: {
      usp1: loc('MAGMALIFE - hasta 65 % menos costo (vida ~doble, >3.000 h) - calentamiento en 20-30 min (~50 % más rápido)', 'MAGMALIFE - up to 65 % lower cost (~double life, >3,000 h) - heat-up in 20-30 min (~50 % faster)', 'MAGMALIFE - bis zu 65 % geringere Kosten (~doppelte Lebensdauer, >3.000 h) - Aufheizen in 20-30 min (~50 % schneller)', 'MAGMALIFE - até 65 % menos custo (vida ~dobro, >3.000 h) - aquecimento em 20-30 min (~50 % mais rápido)'),
      usp3: loc('ECOMODE de 3 etapas - ~20 % menos combustible (Deutz TCD 6.1)', '3-stage ECOMODE - ~20 % less fuel (Deutz TCD 6.1)', '3-stufiger ECOMODE - ~20 % weniger Kraftstoff (Deutz TCD 6.1)', 'ECOMODE de 3 estágios - ~20 % menos combustível (Deutz TCD 6.1)'),
      usp4: loc('Extensión mecánica sin herramientas (perno y gancho en V) con acople rápido de tamper y vibración', 'Tool-free mechanical extension (bolt and V-hook) with quick coupling for tamper and vibration', 'Werkzeuglose mechanische Verbreiterung (Bolzen und V-Haken) mit Schnellkupplung für Tamper und Vibration', 'Extensão mecânica sem ferramentas (pino e gancho em V) com acoplamento rápido de tamper e vibração'),
      usp5: loc('Concepto de 2 asientos con tablero deslizable - 1 función = 1 interruptor, sin submenús', '2-seat concept with sliding dashboard - 1 function = 1 switch, no sub-menus', '2-Sitz-Konzept mit verschiebbarem Bedienpult - 1 Funktion = 1 Schalter, keine Untermenüs', 'Conceito de 2 assentos com painel deslizante - 1 função = 1 interruptor, sem submenus'),
      usp7: loc('Sistema de nivelación como panel adicional', 'Levelling system as add-on panel', 'Nivelliersystem als Zusatzpult', 'Sistema de nivelamento como painel adicional'),
      usp8: loc('No publicado - planchas de 400 mm y la regla más pesada del mercado (4,4/4,9 t)', 'Not published - 400 mm wear plates and the heaviest screed on the market (4.4/4.9 t)', 'Nicht angegeben - 400-mm-Glättbleche und die schwerste Bohle am Markt (4,4/4,9 t)', 'Não publicado - chapas de 400 mm e a mesa mais pesada do mercado (4,4/4,9 t)'),
    },
  },
  {
    // SANY SAP45C-10 flyer
    line: 'pavers',
    match: is('SANY', /^SAP45C-10$/),
    usps: {
      usp1: loc('Eléctrica - generador con bomba y motor independientes; control automático de temperatura de la plancha', 'Electric - generator with independent pump and motor; automatic screed plate temperature control', 'Elektrisch - Generator mit eigener Pumpe und Motor; automatische Temperaturregelung der Bohlenplatte', 'Elétrica - gerador com bomba e motor independentes; controle automático de temperatura da placa'),
      usp3: loc('Hidráulica load-sensing (caudal según la carga) - menor consumo; ruido <85 dB(A)', 'Load-sensing hydraulics (flow follows the load) - lower consumption; noise <85 dB(A)', 'Load-Sensing-Hydraulik (Volumenstrom nach Last) - geringerer Verbrauch; Lärm <85 dB(A)', 'Hidráulica load-sensing (vazão conforme a carga) - menor consumo; ruído <85 dB(A)'),
      usp4: loc('Extensión/retracción simétrica con un botón (1,7-3,1 m), hasta 4,5 m', 'One-button symmetrical extension/retraction (1.7-3.1 m), up to 4.5 m', 'Symmetrisches Aus-/Einfahren per Knopfdruck (1,7-3,1 m), bis 4,5 m', 'Extensão/retração simétrica com um botão (1,7-3,1 m), até 4,5 m'),
      usp7: loc('Opcional: viga SANY o MOBA (2 controladores + 6 sensores ultrasónicos) o nivel digital SANY', 'Optional: SANY or MOBA beam (2 controllers + 6 ultrasonic sensors) or SANY digital level', 'Optional: SANY- oder MOBA-Balken (2 Regler + 6 Ultraschallsensoren) oder digitale SANY-Nivellierung', 'Opcional: viga SANY ou MOBA (2 controladores + 6 sensores ultrassônicos) ou nível digital SANY'),
    },
  },
  {
    // SANY SAP60C-10 flyer
    line: 'pavers',
    match: is('SANY', /^SAP60C-10$/),
    usps: {
      usp1: loc('Eléctrica - calienta durante el traslado para reducir la espera', 'Electric - heats while travelling to cut waiting time', 'Elektrisch - heizt während der Fahrt, um Wartezeit zu sparen', 'Elétrica - aquece durante o deslocamento para reduzir a espera'),
      usp3: loc('Accionamiento adaptativo y sistema load-sensing - menor consumo de combustible', 'Adaptive drive and load-sensing system - lower fuel consumption', 'Adaptiver Antrieb und Load-Sensing-System - geringerer Kraftstoffverbrauch', 'Acionamento adaptativo e sistema load-sensing - menor consumo de combustível'),
      usp4: loc('Regla telescópica simétrica 2-3,7 m, hasta 6 m', 'Symmetrical telescopic screed 2-3.7 m, up to 6 m', 'Symmetrische Ausziehbohle 2-3,7 m, bis 6 m', 'Mesa telescópica simétrica 2-3,7 m, até 6 m'),
      usp5: loc('Pantalla táctil HD de 10"; sensibilidad de dirección en 3 niveles', '10" HD touch screen; 3-level steering sensitivity', '10"-HD-Touchscreen; Lenkempfindlichkeit in 3 Stufen', 'Tela touch HD de 10"; sensibilidade de direção em 3 níveis'),
      usp7: loc('Controlador de 3ª generación: respuesta de nivelación 40 % más rápida', '3rd-generation controller: 40 % faster levelling response', 'Regler der 3. Generation: 40 % schnellere Nivellierreaktion', 'Controlador de 3ª geração: resposta de nivelamento 40 % mais rápida'),
    },
  },
  {
    // SANY SAP90C-10S flyer
    line: 'pavers',
    match: is('SANY', /^SAP90C-10S$/),
    usps: {
      usp1: loc('Eléctrica - generador de frecuencia variable de 35 kW: 100 °C en 20 min', 'Electric - 35 kW variable-frequency generator: 100 °C in 20 min', 'Elektrisch - 35-kW-Generator mit variabler Frequenz: 100 °C in 20 min', 'Elétrica - gerador de frequência variável de 35 kW: 100 °C em 20 min'),
      usp4: loc('Regla principal hasta 5,7 m y 9,2 m máx.; camisa telescópica triple de 170 mm', 'Main screed up to 5.7 m and 9.2 m max.; 170 mm triple telescopic sleeve', 'Grundbohle bis 5,7 m und max. 9,2 m; dreifache 170-mm-Teleskophülse', 'Mesa principal até 5,7 m e 9,2 m máx.; camisa telescópica tripla de 170 mm'),
      usp5: loc('Asistente con cámara: sigue bordes automáticamente (≤3 cm) y ahorra 1-2 ayudantes', 'Camera assistant: automatic edge following (≤3 cm), saves 1-2 helpers', 'Kameraassistent: automatische Kantenführung (≤3 cm), spart 1-2 Helfer', 'Assistente com câmera: segue bordas automaticamente (≤3 cm) e economiza 1-2 ajudantes'),
      usp7: loc('MOBA analógico de serie; ajuste electrónico de altura y bombeo con un toque', 'Analogue MOBA as standard; one-touch electronic height and camber adjustment', 'Analoges MOBA serienmäßig; elektronische Höhen- und Profilverstellung per Knopfdruck', 'MOBA analógico de série; ajuste eletrônico de altura e abaulamento com um toque'),
    },
  },
  {
    // SANY SSP90C-8 flyer
    line: 'pavers',
    match: is('SANY', /^SSP90C-8$/),
    usps: {
      usp4: loc('Regla atornillada SE570: 9,5 m montados por 2 personas en 2 h', 'Bolt-on SE570 screed: 9.5 m assembled by 2 people in 2 h', 'Anschraubbohle SE570: 9,5 m von 2 Personen in 2 h montiert', 'Mesa aparafusada SE570: 9,5 m montados por 2 pessoas em 2 h'),
    },
  },
  {
    // Dynapac SD2500CS datasheet (2026-02) and SD highway paver brochure
    line: 'pavers',
    match: is('DYNAPAC', /^SD2500CS$/),
    usps: {
      usp2: loc('10,5 l/h promedio (ficha técnica Dynapac)', '10.5 l/h average (Dynapac datasheet)', '10,5 l/h im Mittel (Dynapac-Datenblatt)', '10,5 l/h em média (ficha técnica Dynapac)'),
      usp3: loc('EcoMode con régimen ajustable sin escalones; VarioSpeed opcional', 'EcoMode with stepless engine speed setting; VarioSpeed optional', 'EcoMode mit stufenloser Drehzahleinstellung; VarioSpeed optional', 'EcoMode com rotação ajustável sem escalonamento; VarioSpeed opcional'),
      usp5: loc('Plataforma extensible 500 mm a cada lado con asientos confort deslizables', 'Platform extendable 500 mm on each side with sliding comfort seats', 'Fahrerstand je Seite um 500 mm erweiterbar, mit verschiebbaren Komfortsitzen', 'Plataforma extensível 500 mm de cada lado com assentos conforto deslizantes'),
      usp7: loc('Nivelación MOBA integrada de serie, preparada para 3D', 'Integrated MOBA levelling as standard, 3D-ready', 'Integrierte MOBA-Nivellierung serienmäßig, 3D-fähig', 'Nivelamento MOBA integrado de série, preparado para 3D'),
      usp9: loc('~273 kg CO₂ por jornada de 10 h (calculado con 10,5 l/h)', '~273 kg CO₂ per 10 h shift (calculated from 10.5 l/h)', '~273 kg CO₂ pro 10-h-Schicht (berechnet aus 10,5 l/h)', '~273 kg CO₂ por jornada de 10 h (calculado com 10,5 l/h)'),
    },
  },
  {
    // Dynapac FC1600C datasheet
    line: 'pavers',
    match: is('DYNAPAC', /^FC1600C$/),
    usps: {
      usp5: loc('Doble consola de operador con electricidad convencional', 'Dual operator console with conventional electrics', 'Doppelter Fahrerstand mit konventioneller Elektrik', 'Console de operador duplo com elétrica convencional'),
    },
  },
];

// ---------------------------------------------------------------------------------------------
// Data-driven fallbacks
// ---------------------------------------------------------------------------------------------
const segments = (v: unknown, lang: Language, count: number): string[] =>
  text(v, lang).split(/\s·\s|\n/).map((s) => s.trim()).filter((s) => s && s !== '-').slice(0, count);

const compactionFallback = (m: AnyMachine, key: UspKey, line: UspLine): LocalizedText | undefined => {
  if (key === 'usp1') {
    const power = Number(m.power) || 0;
    const weight = Number(m.weight) || 0;
    return map((l) => {
      const lines = [T.specs[l]];
      if (!isEmpty(m.engine)) lines.push(`* ${({ es: 'Motor', en: 'Engine', de: 'Motor', pt: 'Motor' })[l]} ${text(m.engine, l)}`);
      if (power) lines.push(`* ${num(power, l)} HP`);
      if (weight) lines.push(`* ${({ es: 'Peso operativo', en: 'Operating weight', de: 'Betriebsgewicht', pt: 'Peso operacional' })[l]} ${num(weight, l)} kg`);
      return lines.join('\n');
    });
  }
  if (key === 'usp2') {
    return map((l) => {
      const lines = [line === 'ptr' ? T.ballast[l] : T.performance[l]];
      if (line !== 'ptr' && !isEmpty(m.amplitude)) {
        lines.push(`* ${({ es: 'Amplitud', en: 'Amplitude', de: 'Amplitude', pt: 'Amplitude' })[l]} ${String(m.amplitude).replace(/\s*\/\s*/g, ' / ').replace(/ \/ $/, '').replace(/(\d),(\d)/g, l === 'en' ? '$1.$2' : '$1,$2').replace(/(\d)\.(\d)/g, l === 'en' ? '$1.$2' : '$1,$2')} mm`);
      }
      const sll = Number(m.staticLinearLoad) || 0;
      if (line !== 'ptr' && sll) {
        lines.push(`* ${({ es: 'Carga lineal estática', en: 'Static linear load', de: 'Statische Linienlast', pt: 'Carga linear estática' })[l]} ${num(sll, l)} kg/cm`);
      }
      const width = Number(m.compactionWidth) || 0;
      if (width) {
        const label = line === 'ptr'
          ? ({ es: 'Ancho de rodadura', en: 'Rolling width', de: 'Walzbreite', pt: 'Largura de rolagem' })[l]
          : ({ es: 'Ancho de compactación', en: 'Compaction width', de: 'Verdichtungsbreite', pt: 'Largura de compactação' })[l];
        lines.push(`* ${label} ${num(width, l)} m`);
      }
      if (line === 'ptr' && !isEmpty(m.numberOfWheels)) lines.push(`* ${text(m.numberOfWheels, l)}`);
      for (const s of segments(m.innovations, l, 2)) lines.push(`* ${s}`);
      return lines.length > 1 ? lines.join('\n') : NOT_PUBLISHED[l];
    });
  }
  if (key === 'usp5') {
    const assistant = map((l) => text(m.compactionAssistant, l).split('\n').map((s) => s.trim()).filter((s) => s && s !== '-' && !/^(no aplica|not applicable|no applicable|nicht anwendbar|não aplicável|não se aplica)$/i.test(s))[0] ?? '');
    const telemetry = map((l) => {
      const t = text(m.telemetry, l);
      return !t || t === '-' || /^(no|nein|não|no aplica)$/i.test(t) ? '' : t;
    });
    if (!assistant.es && !telemetry.es) return line === 'ptr' ? NOT_PUBLISHED : NO_MEASUREMENT;
    return map((l) => [T.systems[l], ...[assistant[l], telemetry[l]].filter(Boolean).map((s) => `* ${s}`)].join('\n'));
  }
  return NOT_PUBLISHED;
};

const millingFallback = (m: AnyMachine, key: UspKey): LocalizedText | undefined => {
  const parts = (l: Language, items: Array<[Record<Language, string>, unknown]>) =>
    items.filter(([, v]) => !isEmpty(v)).map(([label, v]) => `${label[l]} ${text(v, l)}`).join(' · ');
  if (key === 'usp1') {
    const out = map((l) => parts(l, [
      [{ es: 'Ancho', en: 'Width', de: 'Breite', pt: 'Largura' }, m.millingWidth],
      [{ es: 'Profundidad', en: 'Depth', de: 'Frästiefe', pt: 'Profundidade' }, m.maxDepth],
      [{ es: 'Motor', en: 'Engine', de: 'Motor', pt: 'Motor' }, m.enginePower],
      [{ es: 'Capacidad de carga', en: 'Loading capacity', de: 'Ladeleistung', pt: 'Capacidade de carga' }, m.transportCapacity],
    ]));
    return out.es ? out : NOT_PUBLISHED;
  }
  if (key === 'usp2') {
    if (isEmpty(m.minTurningRadius)) return NOT_PUBLISHED;
    return map((l) => `${({ es: 'Radio de giro mínimo', en: 'Minimum turning radius', de: 'Minimaler Wenderadius', pt: 'Raio de giro mínimo' })[l]} ${text(m.minTurningRadius, l)}`);
  }
  if (key === 'usp3') return isEmpty(m.cuttingSystem) ? NOT_PUBLISHED : map((l) => text(m.cuttingSystem, l));
  return NOT_PUBLISHED;
};

// Paver USP rows compare BOMAG levers; each one maps to the documented spec field it is about.
const PAVER_FIELD_BY_USP: Partial<Record<UspKey, string>> = {
  usp1: 'screedHeating',
  usp3: 'fuelSavingMode',
  usp4: 'quickExtensionSystem',
  usp5: 'operationSystem',
  usp6: 'pushRollers',
  usp7: 'gradeControl',
};

const paverFallback = (m: AnyMachine, key: UspKey): LocalizedText => {
  const field = PAVER_FIELD_BY_USP[key];
  let value = field ? m[field] : undefined;
  if (key === 'usp4' && isEmpty(value) && !isEmpty(m.maxWidthWithExtensions)) {
    const max = text(m.maxWidthWithExtensions, 'es');
    return map((l) => `${({ es: 'Ancho máximo con extensiones', en: 'Maximum width with extensions', de: 'Maximale Breite mit Verbreiterungen', pt: 'Largura máxima com extensões' })[l]} ${l === 'es' ? max : localizePaverText(max, l)}`);
  }
  if (isEmpty(value)) return NOT_PUBLISHED;
  const es = text(value, 'es');
  return map((l) => (l === 'es' ? es : localizePaverText(es, l)));
};

// ---------------------------------------------------------------------------------------------
const USP_KEYS: Record<UspLine, UspKey[]> = {
  sdr: ['usp1', 'usp2', 'usp3', 'usp4', 'usp5', 'usp6'],
  ltr: ['usp1', 'usp2', 'usp3', 'usp4', 'usp5', 'usp6'],
  htr: ['usp1', 'usp2', 'usp3', 'usp4', 'usp5', 'usp6'],
  ptr: ['usp1', 'usp2', 'usp3', 'usp4', 'usp5', 'usp6'],
  milling: ['usp1', 'usp2', 'usp3', 'usp4'],
  pavers: ['usp1', 'usp2', 'usp3', 'usp4', 'usp5', 'usp6', 'usp7', 'usp8', 'usp9'],
};

/** Returns the list with every empty USP filled; existing USP texts are kept as they are. */
export function complementUsps<T>(line: UspLine, machines: T[]): T[] {
  return machines.map((machine) => {
    const m = machine as unknown as AnyMachine;
    const family = FAMILIES.find((f) => f.line === line && f.match(m));
    let changed: Record<string, unknown> | null = null;
    for (const key of USP_KEYS[line]) {
      if (!isEmpty(m[key])) continue;
      const value =
        family?.usps[key] ??
        (line === 'milling' ? millingFallback(m, key) : line === 'pavers' ? paverFallback(m, key) : compactionFallback(m, key, line));
      if (!value) continue;
      changed = changed ?? { ...m };
      changed[key] = value;
    }
    return (changed ?? machine) as T;
  });
}

