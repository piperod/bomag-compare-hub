/**
 * Paver specifications from Comparativo_Pavimentadoras_BOMAG.xlsb.
 * Regenerate: node scripts/generate_pavers_from_xlsx.cjs
 */
import { applyPaverI18n } from './paversI18n';

export interface LocalizedText {
  es: string;
  en: string;
  de: string;
  pt: string;
}

export interface PaverFinancialData {
  avgFuelConsumption: string;
  fuelDataSource: string;
  fuelConsumption10h: string;
  co2Per10hShift: string;
  fuelSavingsPerDay: string;
  co2SavingsPerDay: string;
  heatingType: string;
  heatingTime: string;
  heatingElementLife: string;
  wearPlateLife: string;
  replacementCycle: string;
  replacementCostYear1: string;
  replacementCostYear2: string;
  replacementCostYear3: string;
  totalReplacements3Years: string;
  savingsVsBomag3Years: string;
  co2SetupHeating: string;
}

export interface PaverMachineSpec {
  brand: string;
  model: string;
  engine: string;
  engineManufacturer: string;
  nominalPower: string;
  emissionStandard: string;
  fuelSavingMode: string;
  fuelTankCapacity: string;
  maxProduction: string;
  pavingSpeed: string;
  travelSpeed: string;
  maxLayerThickness: string;
  minWorkingWidth: string;
  baseWidthRetracted: string;
  extendedBaseWidth: string;
  maxWidthWithExtensions: string;
  hopperCapacity: string;
  augerDiameter: string;
  conveyors: string;
  pushRollers: string;
  screedTypes: string;
  screedHeating: string;
  tamperVibrationFreq: string;
  quickExtensionSystem: string;
  smoothingPlateDepth: string;
  operatingWeight: string;
  transportLength: string;
  transportWidth: string;
  transportHeight: string;
  operationSystem: string;
  gradeControl: string;
  telematics: string;
  asphaltFumeExtraction: string;
  centralizedLubrication: string;
  usp1: LocalizedText;
  usp2: LocalizedText;
  usp3: LocalizedText;
  usp4: LocalizedText;
  usp5: LocalizedText;
  usp6: LocalizedText;
  usp7: LocalizedText;
  usp8: LocalizedText;
  usp9: LocalizedText;
  financial: PaverFinancialData;
}

const rawPaversMachines: PaverMachineSpec[] = [
  {
    "brand": "CATERPILLAR",
    "model": "AP655",
    "engineManufacturer": "Cat C4.4 (4 cil.) / opt C7.1 (6 cil.)",
    "nominalPower": "129 kW / 173 hp",
    "emissionStandard": "EPA Tier 4 Final / EU Stage V",
    "fuelSavingMode": "Eco-mode + control auto rpm",
    "fuelTankCapacity": "278 L",
    "maxProduction": "1.300 t/h",
    "pavingSpeed": "Hasta 25 m/min",
    "travelSpeed": "14,5 km/h",
    "maxLayerThickness": "305 mm",
    "minWorkingWidth": "2,44 m (SE47)",
    "baseWidthRetracted": "2,55 m (SE50) / 3,0 m (SE60)",
    "extendedBaseWidth": "5,0 m (SE50) / 6,0 m (SE60)",
    "maxWidthWithExtensions": "8,0 m (SE50VT)\n10,0 m (SE60VT XW)",
    "hopperCapacity": "11–12 t",
    "augerDiameter": "406 mm (16\")",
    "conveyors": "2 cintas - sistema 4 bombas",
    "pushRollers": "Ajustables (estándar)",
    "screedTypes": "SE47FM / SE50 V,VT\nSE60 FM,V,VT,VT XW",
    "screedHeating": "Eléctrica - generador 70 kW\n~15 min calentamiento",
    "tamperVibrationFreq": "Variable (ajuste táctil)",
    "quickExtensionSystem": "Manual / hidráulica (opcional)",
    "smoothingPlateDepth": "No especificado",
    "operatingWeight": "19.530 kg (c/SE50VT)\n21.052 kg (c/SE60VT XW)",
    "transportLength": "6.666 mm (c/SE50VT)",
    "transportWidth": "2.550–2.762 mm",
    "transportHeight": "3.056 mm",
    "operationSystem": "Pantallas táctiles dobles\nPave Start Assistant",
    "gradeControl": "Cat Grade Control (OPCIONAL)",
    "telematics": "Product Link Elite\n(satélite / celular)",
    "asphaltFumeExtraction": "Sistema ventilación (desviación)",
    "centralizedLubrication": "Acceso remoto puntos clave",
    "engine": "129 kW / 173 hp",
    "usp1": {
      "es": "Eléctrico estándar - ~15 min - Vida 1.000–1.500 h - Recambio anual ~8.000 €",
      "en": "Eléctrico estándar - ~15 min - Vida 1.000–1.500 h - Recambio anual ~8.000 €",
      "de": "Eléctrico estándar - ~15 min - Vida 1.000–1.500 h - Recambio anual ~8.000 €",
      "pt": "Eléctrico estándar - ~15 min - Vida 1.000–1.500 h - Recambio anual ~8.000 €"
    },
    "usp2": {
      "es": "No publicado en ficha técnica",
      "en": "No publicado en ficha técnica",
      "de": "No publicado en ficha técnica",
      "pt": "No publicado en ficha técnica"
    },
    "usp3": {
      "es": "Eco-mode: reducción rpm motor",
      "en": "Eco-mode: reducción rpm motor",
      "de": "Eco-mode: reducción rpm motor",
      "pt": "Eco-mode: reducción rpm motor"
    },
    "usp4": {
      "es": "Manual / hidráulico convencional",
      "en": "Manual / hidráulico convencional",
      "de": "Manual / hidráulico convencional",
      "pt": "Manual / hidráulico convencional"
    },
    "usp5": {
      "es": "Doble estación giratoria (backup)",
      "en": "Doble estación giratoria (backup)",
      "de": "Doble estación giratoria (backup)",
      "pt": "Doble estación giratoria (backup)"
    },
    "usp6": {
      "es": "Ajustables (estándar)",
      "en": "Ajustables (estándar)",
      "de": "Ajustables (estándar)",
      "pt": "Ajustables (estándar)"
    },
    "usp7": {
      "es": "Cat Grade Control = OPCIONAL (costo adicional)",
      "en": "Cat Grade Control = OPCIONAL (costo adicional)",
      "de": "Cat Grade Control = OPCIONAL (costo adicional)",
      "pt": "Cat Grade Control = OPCIONAL (costo adicional)"
    },
    "usp8": {
      "es": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)",
      "en": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)",
      "de": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)",
      "pt": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)"
    },
    "usp9": {
      "es": "~366 kg CO₂ estimado (+55% vs BOMAG)",
      "en": "~366 kg CO₂ estimado (+55% vs BOMAG)",
      "de": "~366 kg CO₂ estimado (+55% vs BOMAG)",
      "pt": "~366 kg CO₂ estimado (+55% vs BOMAG)"
    },
    "financial": {
      "avgFuelConsumption": "No publicado",
      "fuelDataSource": "—",
      "fuelConsumption10h": "N/D",
      "co2Per10hShift": "~366 kg (+55% vs BOMAG)",
      "fuelSavingsPerDay": "—",
      "co2SavingsPerDay": "—",
      "heatingType": "Eléctrico estándar",
      "heatingTime": "~60 min",
      "heatingElementLife": "1.000 – 1.500 h",
      "wearPlateLife": "1.000 – 2.000 h",
      "replacementCycle": "Anual",
      "replacementCostYear1": "~8.000 €",
      "replacementCostYear2": "~8.000 €",
      "replacementCostYear3": "~8.000 €",
      "totalReplacements3Years": "~24.000 €",
      "savingsVsBomag3Years": "16.000 €",
      "co2SetupHeating": "27 kg (10,5 L)"
    }
  },
  {
    "brand": "BOMAG",
    "model": "BF600 C-3",
    "engineManufacturer": "Deutz TCD 2012 L06 (6 cil.)",
    "nominalPower": "116 kW / 156 hp",
    "emissionStandard": "Stage IIIa / Tier 3",
    "fuelSavingMode": "ECOMODE",
    "fuelTankCapacity": "285 L",
    "maxProduction": "600 t/h",
    "pavingSpeed": "Hasta 25 m/min",
    "travelSpeed": "4 km/h",
    "maxLayerThickness": "300 mm",
    "minWorkingWidth": "1,65 m (con reducciones) (S500)",
    "baseWidthRetracted": "2,5 m (S500) / 3,0 m (S600)",
    "extendedBaseWidth": "5,0 m (S500) / 6,0 m (S600)",
    "maxWidthWithExtensions": "8,0 m (S500) / 9,0 m (S600)\n[Quick Coupling]",
    "hopperCapacity": "11 t",
    "augerDiameter": "350 mm - 100 rpm",
    "conveyors": "2 - reversibles, ctrl indep.\n64 rpm",
    "pushRollers": "Amortiguados + apoyo hidráulico",
    "screedTypes": "S500 / S600\n(tamper + vibración)",
    "screedHeating": "MAGMALIFE - bloques aluminio\n50% más rápido · 3.000–5.000 h vida",
    "tamperVibrationFreq": "Tamper 0–29 Hz / Vibr. 20–58 Hz",
    "quickExtensionSystem": "QUICK COUPLING - sin tornillos\n(EXCLUSIVO BOMAG)",
    "smoothingPlateDepth": "400 mm - Espesor 15 mm",
    "operatingWeight": "21.000 kg (c/S500)\n21.500 kg (c/S600)",
    "transportLength": "6.360 mm",
    "transportWidth": "2.550 mm (S500) / 3.000 mm (S600)",
    "transportHeight": "3.061 mm",
    "operationSystem": "A-PAVE pantalla gráfica\nAsiento SIDEVIEW giratorio/deslizable",
    "gradeControl": "Controlador integrado + sensor\npendiente (ESTÁNDAR LATERAL)",
    "telematics": "BOMAG TELEMATIC\n+ JOBLINK data interface",
    "asphaltFumeExtraction": "Aspiración vapores - estándar",
    "centralizedLubrication": "Equipo lubric. central estándar",
    "engine": "116 kW / 156 hp",
    "usp1": {
      "es": "50% más rápido - 50% menos combustible en setup - Vida 3.000–5.000 h - Ahorro ~16.000 € en 3 años",
      "en": "50% más rápido - 50% menos combustible en setup - Vida 3.000–5.000 h - Ahorro ~16.000 € en 3 años",
      "de": "50% más rápido - 50% menos combustible en setup - Vida 3.000–5.000 h - Ahorro ~16.000 € en 3 años",
      "pt": "50% más rápido - 50% menos combustible en setup - Vida 3.000–5.000 h - Ahorro ~16.000 € en 3 años"
    },
    "usp2": {
      "es": "8,9 l/h promedio medido\n235 kg CO₂ / jornada 10h",
      "en": "8,9 l/h promedio medido\n235 kg CO₂ / jornada 10h",
      "de": "8,9 l/h promedio medido\n235 kg CO₂ / jornada 10h",
      "pt": "8,9 l/h promedio medido\n235 kg CO₂ / jornada 10h"
    },
    "usp3": {
      "es": "Regulación activa bombas hidráulicas según demanda real - Ahorro hasta 17%",
      "en": "Regulación activa bombas hidráulicas según demanda real - Ahorro hasta 17%",
      "de": "Regulación activa bombas hidráulicas según demanda real - Ahorro hasta 17%",
      "pt": "Regulación activa bombas hidráulicas según demanda real - Ahorro hasta 17%"
    },
    "usp4": {
      "es": "Sin tornillos - sin herramientas - mín. tiempo de acople - EXCLUSIVO BOMAG",
      "en": "Sin tornillos - sin herramientas - mín. tiempo de acople - EXCLUSIVO BOMAG",
      "de": "Sin tornillos - sin herramientas - mín. tiempo de acople - EXCLUSIVO BOMAG",
      "pt": "Sin tornillos - sin herramientas - mín. tiempo de acople - EXCLUSIVO BOMAG"
    },
    "usp5": {
      "es": "Asiento + consola deslizables al lateral - visión directa regla y borde - ESTÁNDAR",
      "en": "Asiento + consola deslizables al lateral - visión directa regla y borde - ESTÁNDAR",
      "de": "Asiento + consola deslizables al lateral - visión directa regla y borde - ESTÁNDAR",
      "pt": "Asiento + consola deslizables al lateral - visión directa regla y borde - ESTÁNDAR"
    },
    "usp6": {
      "es": "Amortiguados + apoyo hidráulico",
      "en": "Amortiguados + apoyo hidráulico",
      "de": "Amortiguados + apoyo hidráulico",
      "pt": "Amortiguados + apoyo hidráulico"
    },
    "usp7": {
      "es": "Controlador integrado + sensor pendiente ESTÁNDAR (lateral)",
      "en": "Controlador integrado + sensor pendiente ESTÁNDAR (lateral)",
      "de": "Controlador integrado + sensor pendiente ESTÁNDAR (lateral)",
      "pt": "Controlador integrado + sensor pendiente ESTÁNDAR (lateral)"
    },
    "usp8": {
      "es": "~8.000 € total en 3 años\n(recambio cada 2–3 años)",
      "en": "~8.000 € total en 3 años\n(recambio cada 2–3 años)",
      "de": "~8.000 € total en 3 años\n(recambio cada 2–3 años)",
      "pt": "~8.000 € total en 3 años\n(recambio cada 2–3 años)"
    },
    "usp9": {
      "es": "235 kg CO₂ (90,5 L diesel)",
      "en": "235 kg CO₂ (90,5 L diesel)",
      "de": "235 kg CO₂ (90,5 L diesel)",
      "pt": "235 kg CO₂ (90,5 L diesel)"
    },
    "financial": {
      "avgFuelConsumption": "8,9 l/h ✓ MEDIDO EN CAMPO",
      "fuelDataSource": "Medición campo 03/2019–04/2021",
      "fuelConsumption10h": "89",
      "co2Per10hShift": "235 kg (90,5 L × 2,6)",
      "fuelSavingsPerDay": "51 L menos que competidor\n16 L menos que Dynapac",
      "co2SavingsPerDay": "131 kg menos que competidor\n38 kg menos que Dynapac",
      "heatingType": "MAGMALIFE — bloques aluminio fundido",
      "heatingTime": "~30 min (50% más rápido)",
      "heatingElementLife": "3.000 – 5.000 h",
      "wearPlateLife": "2.000 – 3.000 h",
      "replacementCycle": "Cada 2–3 años",
      "replacementCostYear1": "/",
      "replacementCostYear2": "~8.000 €",
      "replacementCostYear3": "/",
      "totalReplacements3Years": "~8.000 € ✓",
      "savingsVsBomag3Years": "—",
      "co2SetupHeating": "9 kg (3,5 L) ✓"
    }
  },
  {
    "brand": "VÖGELE",
    "model": "Super 1800-3",
    "engineManufacturer": "Cummins QSB6.7-C170 (6 cil.)",
    "nominalPower": "127 kW / 170 hp",
    "emissionStandard": "EU Fase 3a / EPA Tier 3",
    "fuelSavingMode": "EcoPlus",
    "fuelTankCapacity": "300 L",
    "maxProduction": "700 t/h",
    "pavingSpeed": "Hasta 24 m/min",
    "travelSpeed": "4,5 km/h",
    "maxLayerThickness": "300 mm",
    "minWorkingWidth": "2,55 m (AB500)",
    "baseWidthRetracted": "2,55 m (AB500) / 3,0 m (AB600/SB300)",
    "extendedBaseWidth": "5,0 m (AB500) / 6,0 m (AB600)",
    "maxWidthWithExtensions": "8,5 m (AB500) / 9,0 m (AB600)\n10,0 m (SB300)",
    "hopperCapacity": "13 t",
    "augerDiameter": "400 mm - hasta 84 rpm",
    "conveyors": "2 - hasta 33 m/min variable\nreversibles",
    "pushRollers": "Oscilantes estándar\nPaveDock elástico (opcional)",
    "screedTypes": "AB500/AB600 TV,TP1,TP2,TP2+\nSB300 TV,TP1,TP2",
    "screedHeating": "Eléctrica - generador directo\nrefrigerado por aceite",
    "tamperVibrationFreq": "Variable (SmartWheel)",
    "quickExtensionSystem": "Mecánica + tramos hidr. (SB300)",
    "smoothingPlateDepth": "No especificado",
    "operatingWeight": "19.400 kg (AB500 hasta 5m)\n25.150 kg (AB500 hasta 8,5m)",
    "transportLength": "6.040 mm (AB500 TV)",
    "transportWidth": "2.550 mm",
    "transportHeight": "3.100 mm",
    "operationSystem": "ErgoPlus 3 - gran pantalla color\nAutoSet Plus",
    "gradeControl": "Niveltronic Plus (integrado std.)",
    "telematics": "PaveDock Assistant\n(comunicación camiones)",
    "asphaltFumeExtraction": "No especificado",
    "centralizedLubrication": "Lubricación central automática",
    "engine": "127 kW / 170 hp",
    "usp1": {
      "es": "Eléctrico generador directo - Recambio anual ~8.000 €",
      "en": "Eléctrico generador directo - Recambio anual ~8.000 €",
      "de": "Eléctrico generador directo - Recambio anual ~8.000 €",
      "pt": "Eléctrico generador directo - Recambio anual ~8.000 €"
    },
    "usp2": {
      "es": "No publicado en ficha técnica",
      "en": "No publicado en ficha técnica",
      "de": "No publicado en ficha técnica",
      "pt": "No publicado en ficha técnica"
    },
    "usp3": {
      "es": "EcoPlus: 4 mecanismos - hasta 25% ahorro",
      "en": "EcoPlus: 4 mecanismos - hasta 25% ahorro",
      "de": "EcoPlus: 4 mecanismos - hasta 25% ahorro",
      "pt": "EcoPlus: 4 mecanismos - hasta 25% ahorro"
    },
    "usp4": {
      "es": "Mecánicas estándar + tramos hidr. (SB300)",
      "en": "Mecánicas estándar + tramos hidr. (SB300)",
      "de": "Mecánicas estándar + tramos hidr. (SB300)",
      "pt": "Mecánicas estándar + tramos hidr. (SB300)"
    },
    "usp5": {
      "es": "Plataforma deslizable con consola",
      "en": "Plataforma deslizable con consola",
      "de": "Plataforma deslizable con consola",
      "pt": "Plataforma deslizable con consola"
    },
    "usp6": {
      "es": "Oscilantes std - PaveDock elástico (opcional)",
      "en": "Oscilantes std - PaveDock elástico (opcional)",
      "de": "Oscilantes std - PaveDock elástico (opcional)",
      "pt": "Oscilantes std - PaveDock elástico (opcional)"
    },
    "usp7": {
      "es": "Niveltronic Plus — integrado estándar",
      "en": "Niveltronic Plus — integrado estándar",
      "de": "Niveltronic Plus — integrado estándar",
      "pt": "Niveltronic Plus — integrado estándar"
    },
    "usp8": {
      "es": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)",
      "en": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)",
      "de": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)",
      "pt": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)"
    },
    "usp9": {
      "es": "No publicado",
      "en": "No publicado",
      "de": "No publicado",
      "pt": "No publicado"
    },
    "financial": {
      "avgFuelConsumption": "No publicado",
      "fuelDataSource": "—",
      "fuelConsumption10h": "N/D",
      "co2Per10hShift": "No publicado",
      "fuelSavingsPerDay": "—",
      "co2SavingsPerDay": "—",
      "heatingType": "Eléctrico generador directo",
      "heatingTime": "~60 min",
      "heatingElementLife": "1.000 – 1.500 h",
      "wearPlateLife": "1.000 – 2.000 h",
      "replacementCycle": "Anual",
      "replacementCostYear1": "~8.000 €",
      "replacementCostYear2": "~8.000 €",
      "replacementCostYear3": "~8.000 €",
      "totalReplacements3Years": "~24.000 €",
      "savingsVsBomag3Years": "16.000 €",
      "co2SetupHeating": "27 kg (10,5 L)"
    }
  },
  {
    "brand": "DYNAPAC",
    "model": "SD2500CS",
    "engineManufacturer": "Cummins QSB 6.7-C200 (6 cil.)",
    "nominalPower": "149 kW / 200 hp",
    "emissionStandard": "EU Stage V / EPA Tier 4f",
    "fuelSavingMode": "VarioSpeed",
    "fuelTankCapacity": "362 L",
    "maxProduction": "800 t/h",
    "pavingSpeed": "Hasta 28 m/min",
    "travelSpeed": "4 km/h",
    "maxLayerThickness": "310 mm",
    "minWorkingWidth": "2,05 m (con zapatas)",
    "baseWidthRetracted": "2,55 m (V5100) / 3,0 m (V6000/R300)",
    "extendedBaseWidth": "5,1 m (V5100) / 6,0 m (V6000)",
    "maxWidthWithExtensions": "8,8 m (V5100) / 9,7 m (V6000)\n10,0 m (R300)",
    "hopperCapacity": "12–15 t",
    "augerDiameter": "380 mm",
    "conveyors": "2 dual - 2×655 mm\ncontrol proporcional",
    "pushRollers": "Fijo pivotable (std.)\nHidráulico amortiguado (opc.)",
    "screedTypes": "V5100/V6000 TV,TVE,THE\nR300 TV,TVE / R300 HEE",
    "screedHeating": "Eléctrica o Gas (opción única)\nGenerador 33 kVA",
    "tamperVibrationFreq": "Variable - high compaction\nTHE screed disponible",
    "quickExtensionSystem": "Modular V/R-Series",
    "smoothingPlateDepth": "No especificado",
    "operatingWeight": "19.000 kg (c/regla std.)",
    "transportLength": "6.150 mm",
    "transportWidth": "2.550 mm",
    "transportHeight": "3.100 mm",
    "operationSystem": "PaveManager 2.0 - digital\nSetAssist / TruckAssist",
    "gradeControl": "MOBA integrado (estándar)\n3D nivelación (opcional)",
    "telematics": "Dyn@Link + MatManager\n+ MatWiser (web reporting)",
    "asphaltFumeExtraction": "Certificado NIOSH 94% efectividad",
    "centralizedLubrication": "Sistema lubric. inteligente",
    "engine": "149 kW / 200 hp",
    "usp1": {
      "es": "Eléctrico o Gas (sin motor) - Recambio anual ~8.000 €",
      "en": "Eléctrico o Gas (sin motor) - Recambio anual ~8.000 €",
      "de": "Eléctrico o Gas (sin motor) - Recambio anual ~8.000 €",
      "pt": "Eléctrico o Gas (sin motor) - Recambio anual ~8.000 €"
    },
    "usp2": {
      "es": "10,5 l/h publicado en ficha\n~273 kg CO₂ / jornada estimado",
      "en": "10,5 l/h publicado en ficha\n~273 kg CO₂ / jornada estimado",
      "de": "10,5 l/h publicado en ficha\n~273 kg CO₂ / jornada estimado",
      "pt": "10,5 l/h publicado en ficha\n~273 kg CO₂ / jornada estimado"
    },
    "usp3": {
      "es": "VarioSpeed: rpm adaptativo automático",
      "en": "VarioSpeed: rpm adaptativo automático",
      "de": "VarioSpeed: rpm adaptativo automático",
      "pt": "VarioSpeed: rpm adaptativo automático"
    },
    "usp4": {
      "es": "Sistema modular V-Series / R-Series",
      "en": "Sistema modular V-Series / R-Series",
      "de": "Sistema modular V-Series / R-Series",
      "pt": "Sistema modular V-Series / R-Series"
    },
    "usp5": {
      "es": "Cabina deslizable 'Weather House'",
      "en": "Cabina deslizable 'Weather House'",
      "de": "Cabina deslizable 'Weather House'",
      "pt": "Cabina deslizable 'Weather House'"
    },
    "usp6": {
      "es": "Fijo pivotable std - hidráulico amort. (opcional)",
      "en": "Fijo pivotable std - hidráulico amort. (opcional)",
      "de": "Fijo pivotable std - hidráulico amort. (opcional)",
      "pt": "Fijo pivotable std - hidráulico amort. (opcional)"
    },
    "usp7": {
      "es": "MOBA integrado estándar + 3D (opcional)",
      "en": "MOBA integrado estándar + 3D (opcional)",
      "de": "MOBA integrado estándar + 3D (opcional)",
      "pt": "MOBA integrado estándar + 3D (opcional)"
    },
    "usp8": {
      "es": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)",
      "en": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)",
      "de": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)",
      "pt": "~24.000 € total en 3 años\n(recambio anual ~8.000 €)"
    },
    "usp9": {
      "es": "~273 kg CO₂ estimado (10,5 l/h × 26 kg)",
      "en": "~273 kg CO₂ estimado (10,5 l/h × 26 kg)",
      "de": "~273 kg CO₂ estimado (10,5 l/h × 26 kg)",
      "pt": "~273 kg CO₂ estimado (10,5 l/h × 26 kg)"
    },
    "financial": {
      "avgFuelConsumption": "10,5 l/h (en ficha oficial)",
      "fuelDataSource": "Ficha técnica oficial",
      "fuelConsumption10h": "105",
      "co2Per10hShift": "~273 kg estimado",
      "fuelSavingsPerDay": "—",
      "co2SavingsPerDay": "—",
      "heatingType": "Eléctrico o Gas (opción)",
      "heatingTime": "~30–60 min (gas: sin motor)",
      "heatingElementLife": "1.000 – 1.500 h",
      "wearPlateLife": "1.000 – 2.000 h",
      "replacementCycle": "Anual",
      "replacementCostYear1": "~8.000 €",
      "replacementCostYear2": "~8.000 €",
      "replacementCostYear3": "~8.000 €",
      "totalReplacements3Years": "~24.000 €",
      "savingsVsBomag3Years": "16.000 €",
      "co2SetupHeating": "27 kg (10,5 L) — eléctr."
    }
  }
];

export const paversMachines = applyPaverI18n(rawPaversMachines);
