/**
 * Patches sdrFromCsv.json where en/de/pt were copied from Spanish.
 * Run: node scripts/fix_sdr_i18n.cjs
 */
const fs = require('fs');
const path = require('path');

/** @type {Record<string, { en: string; de: string; pt: string }>} */
const TRANSLATIONS = {
  'Dynapac Compaction meter (DCM), Dyn@lyzer': {
    en: 'Dynapac Compaction meter (DCM), Dyn@lyzer',
    de: 'Dynapac Compaction Meter (DCM), Dyn@lyzer',
    pt: 'Medidor de compactação Dynapac (DCM), Dyn@lyzer',
  },
  'CAT Machine Drive Power (MDP)\nEste sistema mide la resistencia del terreno durante la compactación, proporcionando datos en tiempo real sobre la capacidad de trabajo del equipo y las condiciones del suelo. Permite ajustar la intensidad de la compactación para evitar sobrecarga en el motor y mejorar la eficiencia. (Opcional)\nCAT Compaction Meter Value (CMV) Sistema que mide en tiempo real la rigidez del suelo a medida que el tambor vibrante pasa sobre él. El valor se muestra en la cabina, permitiendo a los operadores monitorear el progreso de la compactación.': {
    en: 'CAT Machine Drive Power (MDP)\nThis system measures ground resistance during compaction, providing real-time data on equipment working capacity and soil conditions. It allows adjusting compaction intensity to avoid engine overload and improve efficiency. (Optional)\nCAT Compaction Meter Value (CMV) System that measures soil stiffness in real time as the vibratory drum passes over it. The value is displayed in the cab, allowing operators to monitor compaction progress.',
    de: 'CAT Machine Drive Power (MDP)\nDieses System misst den Bodenwiderstand während der Verdichtung und liefert Echtzeitdaten zur Arbeitskapazität und Bodenbedingungen. Es ermöglicht die Anpassung der Verdichtungsintensität, um Motorüberlastung zu vermeiden und die Effizienz zu verbessern. (Optional)\nCAT Compaction Meter Value (CMV) System zur Echtzeit-Messung der Bodensteifigkeit beim Überfahren mit der Vibrationswalze. Der Wert wird in der Kabine angezeigt.',
    pt: 'CAT Machine Drive Power (MDP)\nEste sistema mede a resistência do terreno durante a compactação, fornecendo dados em tempo real sobre a capacidade de trabalho e condições do solo. Permite ajustar a intensidade da compactação para evitar sobrecarga no motor e melhorar a eficiência. (Opcional)\nCAT Compaction Meter Value (CMV) Sistema que mede em tempo real a rigidez do solo conforme o tambor vibratório passa sobre ele. O valor é exibido na cabine.',
  },
  'MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link': {
    en: 'MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link',
    de: 'MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link',
    pt: 'MDP, CMV, AccuGrade Compaction, Eco-mode, Vision Link',
  },
  'CMV, AccuGrade Compaction, Eco-mode, Vision Link': {
    en: 'CMV, AccuGrade Compaction, Eco-mode, Vision Link',
    de: 'CMV, AccuGrade Compaction, Eco-mode, Vision Link',
    pt: 'CMV, AccuGrade Compaction, Eco-mode, Vision Link',
  },
  'Controles ergonómicos y simples:\n\n* Palanca de control única para avance, vibración y dirección.\n* Instrumentación digital fácil de leer.': {
    en: 'Ergonomic and simple controls:\n\n* Single control lever for travel, vibration and steering.\n* Easy-to-read digital instrumentation.',
    de: 'Ergonomische und einfache Bedienelemente:\n\n* Ein Hebel für Fahren, Vibration und Lenkung.\n* Leicht ablesbare digitale Instrumentierung.',
    pt: 'Controles ergonômicos e simples:\n\n* Alavanca única para avanço, vibração e direção.\n* Instrumentação digital fácil de ler.',
  },
  'Controles ergonómicos y simples:\n\n* Palanca de control única para avance, vibración y dirección.\n* Pantalla integranda en palanca de control.\n* Cambio de velocidad asistida\n* Instrumentación digital fácil de leer.': {
    en: 'Ergonomic and simple controls:\n\n* Single control lever for travel, vibration and steering.\n* Display integrated in control lever.\n* Assisted speed change\n* Easy-to-read digital instrumentation.',
    de: 'Ergonomische und einfache Bedienelemente:\n\n* Ein Hebel für Fahren, Vibration und Lenkung.\n* Display im Bedienhebel integriert.\n* Unterstützter Geschwindigkeitswechsel\n* Leicht ablesbare digitale Instrumentierung.',
    pt: 'Controles ergonômicos e simples:\n\n* Alavanca única para avanço, vibração e direção.\n* Tela integrada na alavanca de controle.\n* Mudança de velocidade assistida\n* Instrumentação digital fácil de ler.',
  },
  'Mayor carga lineal estática\nTambor de alto peso y excelente contacto con el suelo para lograr profundidad efectiva de compactación.': {
    en: 'Higher static linear load\nHeavy drum with excellent ground contact for effective compaction depth.',
    de: 'Höhere statische Linienlast\nSchwere Walze mit ausgezeichnetem Bodenkontakt für effektive Verdichtungstiefe.',
    pt: 'Maior carga linear estática\nTambor pesado com excelente contato com o solo para profundidade efetiva de compactação.',
  },
  'Plataforma con asiento ajustable, controles a mano, y excelente visibilidad de 360°.\n\nVibración automática (Auto Vibe): El sistema puede activar/desactivar la vibración de forma automática según la velocidad del rodillo o si está detenido, mejorando el control del proces': {
    en: 'Platform with adjustable seat, hand controls, and excellent 360° visibility.\n\nAutomatic vibration (Auto Vibe): The system can automatically enable/disable vibration based on roller speed or when stopped, improving process control.',
    de: 'Plattform mit verstellbarem Sitz, Handbedienung und ausgezeichneter 360°-Sicht.\n\nAutomatische Vibration (Auto Vibe): Das System kann die Vibration je nach Walzgeschwindigkeit oder im Stand automatisch ein-/ausschalten.',
    pt: 'Plataforma com assento ajustável, controles à mão e excelente visibilidade 360°.\n\nVibração automática (Auto Vibe): O sistema pode ativar/desativar a vibração automaticamente conforme a velocidade ou parada do rolo.',
  },
  '* Amplitud más alta del mercado\n* MDP exclusivo de CAT: Mide la resistencia al avance del tambor como un indicador directo del nivel de compactación (ventaja clave frente a modelos tradicionales).': {
    en: '* Highest amplitude on the market\n* CAT-exclusive MDP: Measures drum travel resistance as a direct indicator of compaction level (key advantage vs. traditional models).',
    de: '* Höchste Amplitude am Markt\n* CAT-exklusives MDP: Misst den Fahrwiderstand der Walze als direkten Indikator des Verdichtungsgrades.',
    pt: '* Maior amplitude do mercado\n* MDP exclusivo CAT: Mede a resistência ao avanço do tambor como indicador direto do nível de compactação.',
  },
  '* Amplitud más alta del mercado': {
    en: '* Highest amplitude on the market',
    de: '* Höchste Amplitude am Markt',
    pt: '* Maior amplitude do mercado',
  },
  'Mantenimiento y Servicio\nDiseño orientado a bajo mantenimiento:\n* Intervalos de mantenimiento extendidos.\n* Reducción de puntos de lubricación gracias al uso de componentes sellados.': {
    en: 'Maintenance and Service\nLow-maintenance design:\n* Extended maintenance intervals.\n* Fewer lubrication points thanks to sealed components.',
    de: 'Wartung und Service\nWartungsarmes Design:\n* Verlängerte Wartungsintervalle.\n* Weniger Schmierstellen dank abgedichteter Komponenten.',
    pt: 'Manutenção e Serviço\nDesign orientado a baixa manutenção:\n* Intervalos de manutenção estendidos.\n* Menos pontos de lubrificação com componentes selados.',
  },
  'No aplica\nCAT Compaction Meter Value (CMV) Sistema que mide en tiempo real la rigidez del suelo a medida que el tambor vibrante pasa sobre él. El valor se muestra en la cabina, permitiendo a los operadores monitorear el progreso de la compactación.': {
    en: 'Not applicable\nCAT Compaction Meter Value (CMV) System that measures soil stiffness in real time as the vibratory drum passes over it. The value is displayed in the cab, allowing operators to monitor compaction progress.',
    de: 'Nicht zutreffend\nCAT Compaction Meter Value (CMV) System zur Echtzeit-Messung der Bodensteifigkeit beim Überfahren mit der Vibrationswalze.',
    pt: 'Não se aplica\nCAT Compaction Meter Value (CMV) Sistema que mede em tempo real a rigidez do solo conforme o tambor vibratório passa sobre ele.',
  },
  'Diseñado con un sistema de propulsión de doble bomba, las dos bombas suministran un flujo separado y dedicado al motor de accionamiento del tambor y al motor del eje trasero, lo que garantiza una capacidad de ascenso y tracción excepcionales tanto en avance como en retroceso': {
    en: 'Designed with a dual-pump drive system; both pumps supply separate dedicated flow to the drum drive motor and rear axle motor, ensuring exceptional climbing and traction in both forward and reverse.',
    de: 'Mit Doppelpumpen-Antrieb: Beide Pumpen liefern getrennten Fluss für Trommel- und Hinterachsmotor – außergewöhnliche Steig- und Traktionsfähigkeit vorwärts und rückwärts.',
    pt: 'Projetado com sistema de propulsão de dupla bomba; ambas fornecem fluxo dedicado ao motor do tambor e ao eixo traseiro, garantindo excelente capacidade de subida e tração.',
  },
  'ReadyKit básico (en algunas versiones), cabina optimizada': {
    en: 'Basic ReadyKit (on some versions), optimized cab',
    de: 'Basis-ReadyKit (in einigen Versionen), optimierte Kabine',
    pt: 'ReadyKit básico (em algumas versões), cabine otimizada',
  },
  'Controles básicos y mecánicos:\n\n* Fáciles de usar, ideales para operadores con poca capacitación.\n* Palanca de avance/reversa con control de vibración independiente.': {
    en: 'Basic mechanical controls:\n\n* Easy to use, ideal for operators with little training.\n* Forward/reverse lever with independent vibration control.',
    de: 'Einfache mechanische Bedienung:\n\n* Leicht zu bedienen, ideal für wenig geschulte Bediener.\n* Vorwärts/Rückwärtshebel mit unabhängiger Vibrationssteuerung.',
    pt: 'Controles básicos e mecânicos:\n\n* Fáceis de usar, ideais para operadores com pouca capacitação.\n* Alavanca avanço/ré com controle de vibração independente.',
  },
  'Mayor tracción y maniobrabilidad\nGracias a su sistema de doble tracción (Drum Drive), el rodillo compactador New Holland domina fácilmente los terrenos más empinados, mientras que su ángulo de giro de 37 grados proporciona una maniobrabilidad excepcional, simplificando el trabajo en espacios reducidos.': {
    en: 'Greater traction and maneuverability\nThanks to its dual-drive system (Drum Drive), the New Holland roller easily handles steep terrain, while its 37° turning angle provides exceptional maneuverability in tight spaces.',
    de: 'Mehr Traktion und Manövrierfähigkeit\nDank Doppelantrieb (Drum Drive) meistert die New-Holland-Walze steiles Gelände; 37° Lenkwinkel für außergewöhnliche Manövrierfähigkeit.',
    pt: 'Maior tração e manobrabilidade\nCom sistema de dupla tração (Drum Drive), o rolo New Holland domina terrenos íngremes; ângulo de giro de 37° para manobrabilidade excepcional.',
  },
  'Junta de articulación\nOfrece un radio de giro 37° y seguimiento preciso del terreno.': {
    en: 'Articulation joint\nOffers 37° turning radius and precise ground tracking.',
    de: 'Knickgelenk\n37° Lenkwinkel und präzise Geländeanpassung.',
    pt: 'Junta de articulação\nOferece raio de giro de 37° e seguimento preciso do terreno.',
  },
  'Cabina confortable\nUna vez dentro, el ambiente está protegido por la estructura ROPS/FOPS, incluye aire acondicionado y está diseñado para absorber y minimizar las vibraciones generadas durante la operación, asegurando una experiencia de trabajo fluida y sin estrés.': {
    en: 'Comfortable cab\nProtected by ROPS/FOPS structure, includes air conditioning and is designed to absorb and minimize operating vibrations for a smooth, stress-free work experience.',
    de: 'Komfortable Kabine\nROPS/FOPS-Schutz, Klimaanlage und vibrationsdämpfendes Design für ruhiges Arbeiten.',
    pt: 'Cabine confortável\nProtegida por estrutura ROPS/FOPS, com ar condicionado e design que absorve vibrações para trabalho confortável.',
  },
  'Compactación eficiente\nEquipado con dos etapas de vibración para adaptarse a diferentes tipos de suelo, y además con un kit de pata de cabra, garantiza resultados impecables en cualquier tarea.': {
    en: 'Efficient compaction\nEquipped with two vibration stages for different soil types, plus a sheep\'s foot kit, ensuring excellent results on any job.',
    de: 'Effiziente Verdichtung\nZwei Vibrationsstufen für verschiedene Böden plus Schafsfuß-Kit für beste Ergebnisse.',
    pt: 'Compactação eficiente\nDuas etapas de vibração para diferentes solos, mais kit pé de carneiro, garantindo resultados em qualquer tarefa.',
  },
  'Fácil mantenimiento\nCon un diseño de capó y compartimiento del motor de una sola pieza, el acceso al rodillo compactador New Holland es fácil para verificar los componentes esenciales, lo que facilita el trabajo del operador y proporciona mayor seguridad y disponibilidad operativa.': {
    en: 'Easy maintenance\nOne-piece hood and engine compartment design allows easy access to essential components, improving operator safety and machine availability.',
    de: 'Einfache Wartung\nEinteilige Motorhaube und Motorraum für einfachen Zugang zu wichtigen Komponenten.',
    pt: 'Manutenção fácil\nCapô e compartimento do motor em peça única para acesso fácil aos componentes essenciais.',
  },
  'AMMANN ACEforce\n Tecnología de ajuste activo de la vibración, que ajusta continuamente la amplitud y la frecuencia del tambor según las condiciones del terreno. Esto mejora la eficiencia y la uniformidad de la compactación.\nNo aplica': {
    en: 'AMMANN ACEforce\nActive vibration adjustment technology that continuously adjusts drum amplitude and frequency according to ground conditions, improving efficiency and compaction uniformity.\nNot applicable',
    de: 'AMMANN ACEforce\nTechnologie zur aktiven Vibrationsanpassung, die Amplitude und Frequenz kontinuierlich an den Boden anpasst.\nNicht zutreffend',
    pt: 'AMMANN ACEforce\nTecnologia de ajuste ativo da vibração que ajusta continuamente amplitude e frequência conforme o terreno.\nNão se aplica',
  },
  'ECOdrop, telemetría, control automático de vibración': {
    en: 'ECOdrop, telemetry, automatic vibration control',
    de: 'ECOdrop, Telematik, automatische Vibrationssteuerung',
    pt: 'ECOdrop, telemetria, controle automático de vibração',
  },
  'Estación del operador El control intuitivo de la máquina facilita su uso. Las funciones avanzadas garantizan un rendimiento óptimo.': {
    en: 'Operator station Intuitive machine control makes operation easy. Advanced functions ensure optimal performance.',
    de: 'Bedienerplatz Intuitive Maschinensteuerung erleichtert die Bedienung. Erweiterte Funktionen für optimale Leistung.',
    pt: 'Estação do operador Controle intuitivo facilita o uso. Funções avançadas garantem desempenho ótimo.',
  },
  'Alto rendimiento de compactación Compactación más rápida de capas más gruesas en menos pasadas.': {
    en: 'High compaction performance Faster compaction of thicker layers in fewer passes.',
    de: 'Hohe Verdichtungsleistung Schnellere Verdichtung dickerer Schichten in weniger Durchgängen.',
    pt: 'Alto desempenho de compactação Compactação mais rápida de camadas mais espessas em menos passadas.',
  },
  'Articulación central con bloqueo hidráulico y oscilación automática': {
    en: 'Center articulation with hydraulic lock and automatic oscillation',
    de: 'Mittleres Knickgelenk mit hydraulischer Verriegelung und automatischer Schwingung',
    pt: 'Articulação central com bloqueio hidráulico e oscilação automática',
  },
  'Uso cómodo • El diseño sencillo del panel de instrumentos permite un control fácil y seguro • Para a': {
    en: 'Comfortable use • Simple instrument panel design for easy, safe control • For a',
    de: 'Komfortable Nutzung • Einfaches Instrumentenpanel für sichere Bedienung • Für a',
    pt: 'Uso confortável • Painel de instrumentos simples para controle fácil e seguro • Para a',
  },
  'Tecnología ACE * ACEpro ajusta continuamente la frecuencia y amplitud según los valores obtenidos: •': {
    en: 'ACE technology * ACEpro continuously adjusts frequency and amplitude based on measured values: •',
    de: 'ACE-Technologie * ACEpro passt Frequenz und Amplitude kontinuierlich an gemessene Werte an: •',
    pt: 'Tecnologia ACE * ACEpro ajusta continuamente frequência e amplitude conforme valores medidos: •',
  },
  'Diseño de fácil mantenimiento Tiempo de inactividad minimizado gracias a procesos de mantenimiento s': {
    en: 'Easy-maintenance design Minimized downtime thanks to simplified maintenance processes',
    de: 'Wartungsfreundliches Design Minimierte Ausfallzeiten durch vereinfachte Wartung',
    pt: 'Design de fácil manutenção Tempo de inatividade minimizado com processos simplificados',
  },
  'IntelliCompaction  Proporciona un valor de compactación relativa, lo que ayuda a lograr una compacta': {
    en: 'IntelliCompaction Provides a relative compaction value, helping achieve consistent compaction',
    de: 'IntelliCompaction Liefert einen relativen Verdichtungswert für gleichmäßige Verdichtung',
    pt: 'IntelliCompaction Fornece valor relativo de compactação para resultados consistentes',
  },
  'LiveLinks Telematics, CCOMPATRONIC (compaction measurement device)': {
    en: 'LiveLinks Telematics, CCOMPATRONIC (compaction measurement device)',
    de: 'LiveLinks Telematik, CCOMPATRONIC (Verdichtungsmessgerät)',
    pt: 'LiveLinks Telematics, CCOMPATRONIC (dispositivo de medição de compactação)',
  },
  'Calidad de Compactación * Buen rendimiento para suelos compactables en obras viales, rurales o plata': {
    en: 'Compaction quality * Good performance on compactable soils in road, rural or platform works',
    de: 'Verdichtungsqualität * Gute Leistung auf verdichtbarem Boden bei Straßen- und Plattformarbeiten',
    pt: 'Qualidade de compactação * Bom desempenho em solos compactáveis em obras viárias e plataformas',
  },
  'Control y Confort\nCabina abierta o cerrada con controles simples.\n\nPanel analógico, sin diagnóstico digital.\n\nIdeal para operadores con poca experiencia.': {
    en: 'Control and Comfort\nOpen or enclosed cab with simple controls.\n\nAnalog panel, no digital diagnostics.\n\nIdeal for operators with little experience.',
    de: 'Steuerung und Komfort\nOffene oder geschlossene Kabine mit einfachen Bedienelementen.\n\nAnaloges Panel, keine digitale Diagnose.\n\nIdeal für wenig erfahrene Bediener.',
    pt: 'Controle e Conforto\nCabine aberta ou fechada com controles simples.\n\nPainel analógico, sem diagnóstico digital.\n\nIdeal para operadores com pouca experiência.',
  },
  'Mantenimiento y Servicio\n* Motor JCB DieselMax altamente confiable, sin electrónica compleja.\n* Capó': {
    en: 'Maintenance and Service\n* Highly reliable JCB DieselMax engine, no complex electronics.\n* Hood',
    de: 'Wartung und Service\n* Sehr zuverlässiger JCB DieselMax-Motor, keine komplexe Elektronik.\n* Motorhaube',
    pt: 'Manutenção e Serviço\n* Motor JCB DieselMax altamente confiável, sem eletrônica complexa.\n* Capô',
  },
  'Su sistema de operación es muy sencillo: cuenta únicamente con dos palancas de control, una para el acelerador y otra para el control de avance/retroceso y freno': {
    en: 'Its operation system is very simple: only two control levers, one for the throttle and one for forward/reverse and brake.',
    de: 'Sehr einfaches Bediensystem: nur zwei Hebel – einer für Gas, einer für Vorwärts/Rückwärts und Bremse.',
    pt: 'Sistema de operação muito simples: apenas duas alavancas, uma para acelerador e outra para avanço/ré e freio.',
  },
  'Se utilizan ampliamente en trabajos viales, sub-bases, estacionamientos, desarrollos de obra, excavaciones para agua y alcantarillado, así como en terrenos inclinados y superficies irregulare': {
    en: 'Widely used in road works, sub-bases, parking lots, construction sites, water and sewer excavations, as well as on slopes and irregular surfaces.',
    de: 'Weit verbreitet bei Straßenarbeiten, Untergründen, Parkplätzen, Baustellen, Wasser-/Kanalarbeiten sowie an Hängen und unebenen Flächen.',
    pt: 'Amplamente usado em obras viárias, sub-bases, estacionamentos, canteiros, escavações de água e esgoto, terrenos inclinados e superfícies irregulares.',
  },
  'Diseño excéntrico tipo ‘pod’.\nDoble amplitud y frecuencia con bomba y motor de pistón que disminuye las rutinas de mantenimiento': {
    en: 'Eccentric ‘pod’ design.\nDual amplitude and frequency with piston pump and motor that reduces maintenance routines.',
    de: 'Exzenter-„Pod“-Design.\nDoppelamplitude und -frequenz mit Kolbenpumpe und -motor für weniger Wartung.',
    pt: 'Design excêntrico tipo ‘pod’.\nDupla amplitude e frequência com bomba e motor de pistão que reduz rotinas de manutenção.',
  },
  'El sistema opcional de accionamiento del tambor incorpora un motor de alto par en el bastidor delant': {
    en: 'The optional drum drive system incorporates a high-torque motor in the front frame',
    de: 'Das optionale Trommelantriebssystem integriert einen drehmomentstarken Motor im Vorderrahmen',
    pt: 'O sistema opcional de acionamento do tambor incorpora motor de alto torque no chassi dianteiro',
  },
  'Control y Confort Sistema de aire acondicionado y calefacción eficiente con 8 difusores': {
    en: 'Control and Comfort Efficient air conditioning and heating system with 8 diffusers',
    de: 'Steuerung und Komfort Effizientes Klima- und Heizsystem mit 8 Düsen',
    pt: 'Controle e Conforto Sistema eficiente de ar condicionado e aquecimento com 8 difusores',
  },
  'Mantenimiento y Servicio El mantenimiento diario y regular es posible desde el nivel del suelo graci': {
    en: 'Maintenance and Service Daily and regular maintenance is possible from ground level thanks',
    de: 'Wartung und Service Tägliche Wartung vom Boden aus möglich dank',
    pt: 'Manutenção e Serviço Manutenção diária e regular possível ao nível do solo graças',
  },
  'Estación del operador\nEl control intuitivo de la máquina facilita su uso. Las funciones avanzadas garantizan que incluso los principiantes sean productivos y de alto rendimiento.': {
    en: 'Operator station\nIntuitive machine control makes operation easy. Advanced functions ensure even beginners are productive and high-performing.',
    de: 'Bedienerplatz\nIntuitive Maschinensteuerung erleichtert die Bedienung. Erweiterte Funktionen machen auch Anfänger produktiv.',
    pt: 'Estação do operador\nControle intuitivo facilita o uso. Funções avançadas garantem produtividade mesmo para iniciantes.',
  },
  'Alto rendimiento de compactación\nCompactación más rápida de capas más gruesas en menos pasadas.': {
    en: 'High compaction performance\nFaster compaction of thicker layers in fewer passes.',
    de: 'Hohe Verdichtungsleistung\nSchnellere Verdichtung dickerer Schichten in weniger Durchgängen.',
    pt: 'Alto desempenho de compactação\nCompactação mais rápida de camadas mais espessas em menos passadas.',
  },
  'Uso cómodo\n• El diseño sencillo del panel de\ninstrumentos permite un control\nfácil y seguro\n• Para asegurar la máxima\ncomodidad la plataforma del\noperario está montada en\nalojamientos de goma que\namortigua las vibraciones': {
    en: 'Comfortable use\n• Simple instrument panel design for easy, safe control\n• For maximum comfort the operator platform is mounted on rubber bushings that dampen vibrations',
    de: 'Komfortable Nutzung\n• Einfaches Instrumentenpanel für sichere Bedienung\n• Bedienplattform auf Gummilagern zur Vibrationsdämpfung',
    pt: 'Uso confortável\n• Painel de instrumentos simples para controle fácil e seguro\n• Plataforma do operador em alojamentos de borracha que amortecem vibrações',
  },
  'Tecnología ACE\n* ACEpro ajusta continuamente la frecuencia y amplitud según los valores obtenidos:\n• ACEpro elimina los saltos de los tambores\ny por eso minimiza el riesgo de excesiva\ncompactación o deterioro del material\n• ACEforce muestra el proceso de compactación mediante la función de\nguiado del operario': {
    en: 'ACE technology\n* ACEpro continuously adjusts frequency and amplitude based on measured values:\n* ACEpro eliminates drum jumps, minimizing risk of over-compaction or material damage\n* ACEforce shows the compaction process via operator guidance',
    de: 'ACE-Technologie\n* ACEpro passt Frequenz und Amplitude kontinuierlich an\n* ACEpro eliminiert Trommelsprünge und minimiert Überverdichtung\n* ACEforce zeigt den Verdichtungsprozess per Bedienerführung',
    pt: 'Tecnologia ACE\n* ACEpro ajusta continuamente frequência e amplitude\n* ACEpro elimina saltos do tambor, minimizando sobre-compactação\n* ACEforce mostra o processo de compactação via guia do operador',
  },
  'Diseño de fácil mantenimiento\nTiempo de inactividad minimizado\ngracias a procesos de mantenimiento sencillos y un diseño robusto de la máquina y sus componentes.': {
    en: 'Easy-maintenance design\nMinimized downtime thanks to simple maintenance processes and robust machine and component design.',
    de: 'Wartungsfreundliches Design\nMinimierte Ausfallzeiten durch einfache Wartung und robustes Maschinendesign.',
    pt: 'Design de fácil manutenção\nTempo de inatividade minimizado com processos simples e design robusto.',
  },
  'IntelliCompaction  Proporciona un valor de compactación relativa, lo que ayuda a lograr una compactación consistente y uniforme en todo el parche.\nNo aplica': {
    en: 'IntelliCompaction Provides a relative compaction value, helping achieve consistent, uniform compaction across the entire patch.\nNot applicable',
    de: 'IntelliCompaction Liefert einen relativen Verdichtungswert für gleichmäßige Verdichtung.\nNicht zutreffend',
    pt: 'IntelliCompaction Fornece valor relativo de compactação para resultados consistentes e uniformes.\nNão se aplica',
  },
  'Calidad de Compactación\n* Buen rendimiento para suelos compactables en obras viales, rurales o plataformas.\n* Sistema de vibración robusto': {
    en: 'Compaction quality\n* Good performance on compactable soils in road, rural or platform works.\n* Robust vibration system',
    de: 'Verdichtungsqualität\n* Gute Leistung auf verdichtbarem Boden bei Straßen- und Plattformarbeiten.\n* Robustes Vibrationssystem',
    pt: 'Qualidade de compactação\n* Bom desempenho em solos compactáveis em obras viárias e plataformas.\n* Sistema de vibração robusto',
  },
  'Mantenimiento y Servicio\n* Motor JCB DieselMax altamente confiable, sin electrónica compleja.\n* Capó con apertura completa para acceso rápido.\n* Menor necesidad de técnicos especializados.': {
    en: 'Maintenance and Service\n* Highly reliable JCB DieselMax engine, no complex electronics.\n* Full-opening hood for quick access.\n* Less need for specialized technicians.',
    de: 'Wartung und Service\n* Sehr zuverlässiger JCB DieselMax-Motor, keine komplexe Elektronik.\n* Voll öffnende Motorhaube für schnellen Zugang.\n* Weniger Bedarf an Spezialtechnikern.',
    pt: 'Manutenção e Serviço\n* Motor JCB DieselMax altamente confiável, sem eletrônica complexa.\n* Capô de abertura completa para acesso rápido.\n* Menor necessidade de técnicos especializados.',
  },
  'El sistema opcional de accionamiento del tambor incorpora un motor de alto par en el bastidor delantero, lo que proporciona una excelente capacidad de ascenso (36%) y tracción optimizada.': {
    en: 'The optional drum drive system incorporates a high-torque motor in the front frame, providing excellent climbing ability (36%) and optimized traction.',
    de: 'Das optionale Trommelantriebssystem integriert einen drehmomentstarken Motor im Vorderrahmen – excellente Steigfähigkeit (36 %) und optimierte Traktion.',
    pt: 'O sistema opcional de acionamento do tambor incorpora motor de alto torque no chassi dianteiro, com excelente capacidade de subida (36%) e tração otimizada.',
  },
  'Control y Confort\nSistema de aire acondicionado y calefacción eficiente con 8 difusores': {
    en: 'Control and Comfort\nEfficient air conditioning and heating system with 8 diffusers',
    de: 'Steuerung und Komfort\nEffizientes Klima- und Heizsystem mit 8 Düsen',
    pt: 'Controle e Conforto\nSistema eficiente de ar condicionado e aquecimento com 8 difusores',
  },
  'Mantenimiento y Servicio\nEl mantenimiento diario y regular es posible desde el nivel del suelo gracias al capó abatible de una sola pieza. La reducción de tiempos de inactividad y de costos operativos se traduce en mayor productividad y mejor rentabilidad.': {
    en: 'Maintenance and Service\nDaily and regular maintenance is possible from ground level thanks to the one-piece tilting hood. Reduced downtime and operating costs mean higher productivity and profitability.',
    de: 'Wartung und Service\nTägliche Wartung vom Boden aus dank einteiliger Kippmotorhaube. Weniger Ausfallzeiten und Betriebskosten – höhere Produktivität.',
    pt: 'Manutenção e Serviço\nManutenção diária ao nível do solo graças ao capô basculante de peça única. Menos paradas e custos operacionais – maior produtividade.',
  },
};

const FIELDS = [
  'compactionAssistant',
  'telemetry',
  'innovations',
  'usp',
  'usp1',
  'usp2',
  'usp3',
  'usp4',
  'usp5',
  'usp6',
];

const jsonPath = path.join(__dirname, '../src/data/sdrFromCsv.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let patched = 0;
for (const machine of data) {
  for (const field of FIELDS) {
    const value = machine[field];
    if (!value || typeof value !== 'object' || !value.es) continue;
    const translation = TRANSLATIONS[value.es];
    if (!translation) continue;
    if (value.en === translation.en && value.de === translation.de && value.pt === translation.pt) continue;
    Object.assign(value, translation);
    patched++;
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n');
console.log(`Patched ${patched} localized fields in sdrFromCsv.json`);
