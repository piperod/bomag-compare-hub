/**
 * Reads 3_Single Drum (≥10t) from BOMAG competitor Excel and merges with
 * existing SDR_raw_v3.csv + sdrFromCsv.json rich content.
 * Writes SDR_raw_v4.csv and src/data/sdrFromCsv.json
 */
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const XLSX_PATH = process.argv[2] || path.join(__dirname, '..', 'SDR_Competitor_v3_2026.xlsx');
const LEGACY_CSV = path.join(__dirname, '..', 'SDR_raw_v3.csv');
const LEGACY_JSON = path.join(__dirname, '..', 'src', 'data', 'sdrFromCsv.json');
const OUT_CSV = path.join(__dirname, '..', 'SDR_raw_v4.csv');
const OUT_JSON = path.join(__dirname, '..', 'src', 'data', 'sdrFromCsv.json');

const SHEET_NAME = '3_Single Drum (≥10t)';

function parseCSV(text) {
  const rows = [];
  let i = 0;
  let field = '';
  let row = [];
  let inQuotes = false;
  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ',') {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i += 2;
      else i++;
      row.push(field);
      rows.push(row);
      field = '';
      row = [];
      continue;
    }
    field += ch;
    i++;
  }
  if (field.length > 0 || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function normKey(brand, model) {
  return `${brand}${model}`.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function normalizeBrand(brand) {
  const b = String(brand || '').trim();
  if (/dynapac\s*redline/i.test(b)) return 'DYNAPAC REDLINE';
  return b.toUpperCase();
}

function normalizeModel(brand, model, engineModel = '') {
  let m = String(model || '').trim();
  // BOMAG: "BW 211 D-5 SL" -> "BW211 D5-SL"
  m = m.replace(/^BW\s+(\d+)\s+D-?5\s+(SL|PL)$/i, 'BW$1 D5-$2');
  m = m.replace(/^BW\s+(\d+)\s+D5\s+(SL|PL)$/i, 'BW$1 D5-$2');
  // Dynapac Rhino
  m = m.replace(/^CA25D\s*Rhino$/i, 'CA25 D-Rhino');
  // Caterpillar GC
  m = m.replace(/^CS(\d+)\s+GC$/i, 'CS$1GC');
  // Hamm
  m = m.replace(/^HC\s+(\d+)$/i, 'HC$1');
  m = m.replace(/^H\s+(\d+)i$/i, 'H$1i');
  // Shantui
  m = m.replace(/^SD16$/i, 'SR16');
  m = m.replace(/^SD22$/i, 'SR22');
  // Sakai - keep as-is (SV521D)
  // Disambiguate duplicate BOMAG BW213 by engine
  if (/^BW213 D5-SL$/i.test(m) && /TCD/i.test(engineModel)) {
    m = 'BW213 D5-SL TCD';
  }
  return m;
}

function toNumber(raw) {
  if (raw == null || raw === '') return null;
  const s = String(raw)
    .replace(/\$/g, '')
    .replace(/\s/g, '')
    .replace(/,/g, '')
    .replace(/[^0-9.\-]/g, '');
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function formatNumber(n) {
  if (n == null || n === '') return '';
  const num = typeof n === 'number' ? n : toNumber(n);
  if (num == null) return '';
  if (Number.isInteger(num)) return String(num);
  return String(num);
}

function formatWeight(n) {
  if (n == null) return '';
  return Number(n).toLocaleString('en-US');
}

function csvEscape(val) {
  const s = val == null ? '' : String(val);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function makeLangObj(es) {
  return { es: es || '', en: es || '', de: es || '', pt: es || '' };
}

const LANGS = ['es', 'en', 'de', 'pt'];

// Localized labels for auto-generated spec content
const L = {
  notApplicable: { es: 'No aplica', en: 'Not applicable', de: 'Nicht zutreffend', pt: 'Não aplicável' },
  centrifugalForce: { es: 'Fuerza centrífuga', en: 'Centrifugal force', de: 'Fliehkraft', pt: 'Força centrífuga' },
  vibrationFreq: { es: 'Frecuencia de vibración', en: 'Vibration frequency', de: 'Vibrationsfrequenz', pt: 'Frequência de vibração' },
  maxSpeed: { es: 'Vel. máx.', en: 'Max. speed', de: 'Max. Geschwindigkeit', pt: 'Vel. máx.' },
  technicalSpecs: { es: 'Especificaciones técnicas', en: 'Technical specifications', de: 'Technische Daten', pt: 'Especificações técnicas' },
  engine: { es: 'Motor', en: 'Engine', de: 'Motor', pt: 'Motor' },
  operatingWeight: { es: 'Peso operativo', en: 'Operating weight', de: 'Betriebsgewicht', pt: 'Peso operacional' },
  compactionPerformance: { es: 'Rendimiento de compactación', en: 'Compaction performance', de: 'Verdichtungsleistung', pt: 'Desempenho de compactação' },
  amplitude: { es: 'Amplitud', en: 'Amplitude', de: 'Amplitude', pt: 'Amplitude' },
  staticLinearLoad: { es: 'Carga lineal estática', en: 'Static linear load', de: 'Statische Linienlast', pt: 'Carga linear estática' },
};

function notApplicableLang() {
  return { ...L.notApplicable };
}

function emptyLang() {
  return { es: '', en: '', de: '', pt: '' };
}

function buildInnovationsLang() {
  // Only explicit innovation data from legacy CSV/JSON — never auto-fill from specs.
  return emptyLang();
}

function buildUsp1Lang(row) {
  const obj = {};
  for (const lang of LANGS) {
    const parts = [];
    if (row.engine) parts.push(`${L.engine[lang]} ${row.engine}`);
    if (row.power) parts.push(`${row.power} HP`);
    if (row.weight) parts.push(`${L.operatingWeight[lang]} ${formatWeight(row.weight)} kg`);
    obj[lang] = parts.length ? `${L.technicalSpecs[lang]}\n* ${parts.join('\n* ')}` : '';
  }
  return obj;
}

function buildUsp2Lang(row) {
  const obj = {};
  for (const lang of LANGS) {
    const parts = [];
    if (row.amplitude) parts.push(`${L.amplitude[lang]} ${row.amplitude} mm`);
    if (row.centrifugal) parts.push(`${L.centrifugalForce[lang]} ${row.centrifugal} kN`);
    if (row.staticLinearLoad) parts.push(`${L.staticLinearLoad[lang]} ${row.staticLinearLoad} kg/cm`);
    obj[lang] = parts.length ? `${L.compactionPerformance[lang]}\n* ${parts.join('\n* ')}` : '';
  }
  return obj;
}

// Spanish-only versions kept for CSV column output
function buildInnovations() {
  return '';
}
function buildUsp1(row) {
  return buildUsp1Lang(row).es;
}
function buildUsp2(row) {
  return buildUsp2Lang(row).es;
}

function parseLegacyCsv(rows) {
  const brandRow = rows.find((r) => r[0] && r[0].toLowerCase().startsWith('marca'));
  const modelsRow = rows.find((r) => r[0] && r[0].toLowerCase().startsWith('modelo'));
  if (!brandRow || !modelsRow) return [];

  const getRow = (prefix) => rows.find((r) => (r[0] || '').toLowerCase().startsWith(prefix.toLowerCase()));
  const getRowExact = (exact) => rows.find((r) => (r[0] || '').trim().toLowerCase() === exact.toLowerCase());

  const assistant1 = getRowExact('Asistente de compactación');
  const assistant1Idx = rows.indexOf(assistant1);
  const assistant2 =
    assistant1Idx >= 0 && rows[assistant1Idx + 1] && !rows[assistant1Idx + 1][0]
      ? rows[assistant1Idx + 1]
      : null;

  const fieldRows = {
    peso: getRow('Peso'),
    matNum: getRow('Número de material'),
    motor: getRow('Motor'),
    width: getRow('Ancho de compactación'),
    power: getRow('Potencia'),
    amplitude: getRow('Amplitud'),
    sll: getRow('Carga Lineal Estática'),
    grade: getRow('Gradeabilidad'),
    origin: getRow('País de origen'),
    telemetry: getRowExact('Telemetría'),
    innovations: getRow('Tecnologías Innovadoras'),
    usp1: getRowExact('USP 1'),
    usp2: getRowExact('USP 2'),
    usp3: getRowExact('USP 3'),
    usp4: getRowExact('USP 4'),
    usp5: getRowExact('USP 5'),
    usp6: getRowExact('USP 6'),
    maxDepth: getRow('Profundidad de compactación'),
    perf: getRow('Rendimiento en compactación'),
    fuel: getRow('Consumo de combustible'),
    price: getRow('Precio CIF'),
    pm: getRow('Mantenimiento preventivo'),
    cm: getRow('Mantenimiento correctivo'),
    usage: getRow('Tiempo de uso'),
    tco: getRowExact('TCO (USD)'),
  };

  const cols = [];
  for (let c = 1; c < modelsRow.length; c++) {
    const brand = (brandRow[c] || '').trim();
    const model = (modelsRow[c] || '').trim();
    if (!brand && !model) continue;
    const val = (row) => (row && row[c] ? row[c] : '');
    const a1 = val(assistant1);
    const a2 = assistant2 ? val(assistant2) : '';
    cols.push({
      brand,
      model,
      key: normKey(brand, model),
      peso: val(fieldRows.peso),
      matNum: val(fieldRows.matNum),
      motor: val(fieldRows.motor),
      width: val(fieldRows.width),
      power: val(fieldRows.power),
      amplitude: val(fieldRows.amplitude),
      sll: val(fieldRows.sll),
      grade: val(fieldRows.grade),
      origin: val(fieldRows.origin),
      assistant1: a1,
      assistant2: a2,
      telemetry: val(fieldRows.telemetry),
      innovations: val(fieldRows.innovations),
      usp1: val(fieldRows.usp1),
      usp2: val(fieldRows.usp2),
      usp3: val(fieldRows.usp3),
      usp4: val(fieldRows.usp4),
      usp5: val(fieldRows.usp5),
      usp6: val(fieldRows.usp6),
      maxDepth: val(fieldRows.maxDepth),
      perf: val(fieldRows.perf),
      fuel: val(fieldRows.fuel),
      price: val(fieldRows.price),
      pm: val(fieldRows.pm),
      cm: val(fieldRows.cm),
      usage: val(fieldRows.usage),
      tco: val(fieldRows.tco),
    });
  }
  return cols;
}

function indexLegacyJson(machines) {
  const map = new Map();
  for (const m of machines) {
    map.set(normKey(m.brand, m.model), m);
  }
  return map;
}

function findLegacyMatch(brand, model, legacyCsvByKey, legacyJsonByKey) {
  const key = normKey(brand, model);
  if (legacyJsonByKey.has(key)) return { source: 'json', data: legacyJsonByKey.get(key) };
  if (legacyCsvByKey.has(key)) return { source: 'csv', data: legacyCsvByKey.get(key) };

  const aliases = {
    DYNAPACCA3500D: 'DYNAPACCA35DRHINO',
    XCMGXS113E: 'XCMGXS123',
    SANYSRR120C10: 'SANYSRR120C10S',
    HAMMHC119: 'HAMMHC110',
    JCBVM115: 'JCB116D',
    BOMAGBW213D5SLTCD: 'BOMAGBW213D5SL',
  };
  const aliasKey = aliases[key];
  if (aliasKey) {
    if (legacyJsonByKey.has(aliasKey)) return { source: 'json', data: legacyJsonByKey.get(aliasKey) };
    if (legacyCsvByKey.has(aliasKey)) return { source: 'csv', data: legacyCsvByKey.get(aliasKey) };
  }

  return null;
}

function findLegacyContentFallback(brand, model, legacyJsonByKey, legacyCsvByKey) {
  const key = normKey(brand, model);
  if (!key.startsWith('BOMAGBW')) return null;
  if (/BW211/.test(model)) return legacyJsonByKey.get('BOMAGBW211D5SL') || legacyCsvByKey.get('BOMAGBW211D5SL');
  if (/BW212/.test(model)) return legacyJsonByKey.get('BOMAGBW212D5SL') || legacyCsvByKey.get('BOMAGBW212D5SL');
  if (/BW213/.test(model)) return legacyJsonByKey.get('BOMAGBW213D5SL') || legacyCsvByKey.get('BOMAGBW213D5SL');
  if (/BW21[6-9]|BW22/.test(model)) return legacyJsonByKey.get('BOMAGBW213D5SL') || legacyCsvByKey.get('BOMAGBW213D5SL');
  return null;
}

function readExcelMachines() {
  const wb = XLSX.readFile(XLSX_PATH);
  const ws = wb.Sheets[SHEET_NAME];
  if (!ws) throw new Error(`Sheet not found: ${SHEET_NAME}`);
  const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  const headers = data[1];
  const idx = (name) => headers.indexOf(name);

  return data.slice(2).filter((r) => r[idx('Brand')] && r[idx('Model')]).map((r) => {
    const brand = normalizeBrand(r[idx('Brand')]);
    const engineMake = String(r[idx('Engine Make')] || '').trim();
    const engineModel = String(r[idx('Engine Model')] || '').trim();
    const engine = [engineMake, engineModel].filter(Boolean).join(' ');
    const model = normalizeModel(brand, r[idx('Model')], engineModel);
    const weight = toNumber(r[idx('Op. Weight (kg)')]);
    const drumMm = toNumber(r[idx('Drum Width (mm)')]);
    const width = drumMm != null ? Math.round((drumMm / 1000) * 100) / 100 : null;
    const power = toNumber(r[idx('Power (HP)')]) || toNumber(r[idx('Power (kW)')]);
    const amplitude = String(r[idx('Amplitude I/II (mm)')] || '').replace(/\s+/g, ' ').trim();
    const staticLinearLoad = toNumber(r[idx('Static Linear Load (kg/cm)')]);
    const notes = String(r[idx('Market / Notes')] || '').trim();

    return {
      brand,
      model,
      key: normKey(brand, model),
      weight,
      engine,
      width,
      power,
      amplitude,
      staticLinearLoad,
      emission: String(r[idx('Emission Std')] || '').trim(),
      centrifugal: String(r[idx('Centrifugal Force (kN)')] || '').trim(),
      vibFreq: String(r[idx('Vib. Freq I/II (Hz)')] || '').trim(),
      maxSpeed: String(r[idx('Max Speed (km/h)')] || '').trim(),
      notes,
      origin: notes.includes('MEA') ? 'India' : '',
    };
  });
}

function mergeMachine(excelRow, legacyMatch, contentFallback) {
  const legacy = legacyMatch?.data;
  const fromJson = legacyMatch?.source === 'json';
  const content = fromJson ? legacy : contentFallback;

  const assistantEs = fromJson
    ? legacy.compactionAssistant?.es
    : content?.compactionAssistant?.es
      ? content.compactionAssistant.es
      : legacy
        ? [legacy.assistant1, legacy.assistant2].filter(Boolean).join('\n')
        : 'No aplica';

  const csvCol = {
    brand: excelRow.brand,
    model: excelRow.model,
    peso: formatWeight(excelRow.weight),
    matNum: fromJson ? legacy.materialNumber || '' : legacy?.matNum || '',
    motor: excelRow.engine,
    width: excelRow.width != null ? String(excelRow.width) : '',
    power: formatNumber(excelRow.power),
    amplitude: excelRow.amplitude || '-',
    sll: formatNumber(excelRow.staticLinearLoad),
    grade: fromJson
      ? formatNumber(legacy.gradeability)
      : legacy?.grade || '',
    origin: fromJson
      ? legacy.origin?.es || excelRow.origin || '-'
      : legacy?.origin || excelRow.origin || '-',
    assistant1: assistantEs ? assistantEs.split('\n')[0] : 'No aplica',
    assistant2: assistantEs && assistantEs.includes('\n') ? assistantEs.split('\n').slice(1).join('\n') : '',
    telemetry: fromJson
      ? legacy.telemetry?.es || ''
      : content?.telemetry?.es || legacy?.telemetry || '',
    innovations: fromJson
      ? legacy.innovations?.es || ''
      : content?.innovations?.es || legacy?.innovations || '',
    usp1: fromJson
      ? legacy.usp1?.es || buildUsp1(excelRow)
      : content?.usp1?.es || legacy?.usp1 || buildUsp1(excelRow),
    usp2: fromJson
      ? legacy.usp2?.es || buildUsp2(excelRow)
      : content?.usp2?.es || legacy?.usp2 || buildUsp2(excelRow),
    usp3: fromJson ? legacy.usp3?.es || '' : content?.usp3?.es || legacy?.usp3 || '',
    usp4: fromJson ? legacy.usp4?.es || '' : content?.usp4?.es || legacy?.usp4 || '',
    usp5: fromJson ? legacy.usp5?.es || '' : content?.usp5?.es || legacy?.usp5 || '',
    usp6: fromJson ? legacy.usp6?.es || '' : content?.usp6?.es || legacy?.usp6 || '',
    maxDepth: fromJson ? formatNumber(legacy.maxCompactionDepth) : legacy?.maxDepth || '',
    perf: fromJson ? legacy.compactionPerformance || '' : legacy?.perf || '',
    fuel: fromJson ? formatNumber(legacy.fuelConsumption) : legacy?.fuel || '',
    price: fromJson ? formatNumber(legacy.price) : legacy?.price || '',
    pm: fromJson ? formatNumber(legacy.preventiveMaintenance) || '1' : legacy?.pm || '1',
    cm: fromJson ? formatNumber(legacy.correctiveMaintenance) || '2' : legacy?.cm || '2',
    usage: fromJson ? formatNumber(legacy.usageTime) || '3000' : legacy?.usage || '3000',
    tco: fromJson ? formatNumber(legacy.tco) : legacy?.tco || '',
  };

  const jsonItem = {
    brand: excelRow.brand,
    model: excelRow.model,
    materialNumber: csvCol.matNum || undefined,
    weight: excelRow.weight || 0,
    engine: excelRow.engine || '-',
    compactionWidth: excelRow.width || 0,
    power: excelRow.power || 0,
    amplitude: excelRow.amplitude || '-',
    staticLinearLoad: excelRow.staticLinearLoad || 0,
    gradeability: toNumber(csvCol.grade) || undefined,
    origin: fromJson && legacy.origin ? legacy.origin : makeLangObj(csvCol.origin || '-'),
    compactionAssistant:
      fromJson && legacy.compactionAssistant
        ? legacy.compactionAssistant
        : content?.compactionAssistant ||
          (csvCol.assistant1.trim().toLowerCase() === 'no aplica'
            ? notApplicableLang()
            : makeLangObj(csvCol.assistant1 + (csvCol.assistant2 ? '\n' + csvCol.assistant2 : ''))),
    telemetry:
      fromJson && legacy.telemetry
        ? legacy.telemetry
        : content?.telemetry || makeLangObj(csvCol.telemetry || '-'),
    innovations:
      fromJson && legacy.innovations
        ? legacy.innovations
        : content?.innovations || emptyLang(),
    usp: fromJson && legacy.usp ? legacy.usp : content?.usp || makeLangObj(''),
    usp1: fromJson && legacy.usp1 ? legacy.usp1 : content?.usp1 || buildUsp1Lang(excelRow),
    usp2: fromJson && legacy.usp2 ? legacy.usp2 : content?.usp2 || buildUsp2Lang(excelRow),
    usp3: fromJson && legacy.usp3 ? legacy.usp3 : content?.usp3 || makeLangObj(csvCol.usp3),
    usp4: fromJson && legacy.usp4 ? legacy.usp4 : content?.usp4 || makeLangObj(csvCol.usp4),
    usp5: fromJson && legacy.usp5 ? legacy.usp5 : content?.usp5 || makeLangObj(csvCol.usp5),
    usp6: fromJson && legacy.usp6 ? legacy.usp6 : content?.usp6 || makeLangObj(csvCol.usp6),
    maxCompactionDepth: toNumber(csvCol.maxDepth) || undefined,
    compactionPerformance: csvCol.perf || '-',
    fuelConsumption: toNumber(csvCol.fuel) || 0,
    price: toNumber(csvCol.price) || 0,
    preventiveMaintenance: toNumber(csvCol.pm) || 1,
    correctiveMaintenance: toNumber(csvCol.cm) || 2,
    usageTime: toNumber(csvCol.usage) || 3000,
    tco: toNumber(csvCol.tco) || 0,
  };

  return { csvCol, jsonItem };
}

function writeCsv(columns) {
  const row = (label, getter) => [label, ...columns.map(getter)];
  const lines = [];

  lines.push(row('MARCA', (c) => c.brand).map(csvEscape).join(','));
  lines.push(row('Máquina', () => '').map(csvEscape).join(','));
  lines.push(row('Modelo', (c) => c.model).map(csvEscape).join(','));
  lines.push(row('Peso (Kg)', (c) => c.peso).map(csvEscape).join(','));
  lines.push(row('Número de material', (c) => c.matNum).map(csvEscape).join(','));
  lines.push(row('Motor', (c) => c.motor).map(csvEscape).join(','));
  lines.push(row('Ancho de compactación (m)', (c) => c.width).map(csvEscape).join(','));
  lines.push(row('Potencia (HP)', (c) => c.power).map(csvEscape).join(','));
  lines.push(row('Amplitud (mm)', (c) => c.amplitude).map(csvEscape).join(','));
  lines.push(row('Carga Lineal Estática (Kg/cm)', (c) => c.sll).map(csvEscape).join(','));
  lines.push(row('Gradeabilidad (%)', (c) => c.grade).map(csvEscape).join(','));
  lines.push(row('País de origen', (c) => c.origin).map(csvEscape).join(','));

  // Assistant rows (two-line pattern from v3)
  lines.push(row('Asistente de compactación', (c) => c.assistant1).map(csvEscape).join(','));
  lines.push(['', ...columns.map((c) => c.assistant2)].map(csvEscape).join(','));

  lines.push(row('Telemetría', (c) => c.telemetry).map(csvEscape).join(','));
  lines.push(row('Tecnologías Innovadoras', (c) => c.innovations).map(csvEscape).join(','));
  lines.push(row('USP 1', (c) => c.usp1).map(csvEscape).join(','));
  lines.push(row('USP 2', (c) => c.usp2).map(csvEscape).join(','));
  lines.push(row('USP 3', (c) => c.usp3).map(csvEscape).join(','));
  lines.push(row('USP 4', (c) => c.usp4).map(csvEscape).join(','));
  lines.push(row('USP 5', (c) => c.usp5).map(csvEscape).join(','));
  lines.push(row('USP 6', (c) => c.usp6).map(csvEscape).join(','));
  lines.push(row('Profundidad de compactación máx (cm) Grava/Arena', (c) => c.maxDepth).map(csvEscape).join(','));
  lines.push(row('Rendimiento en compactación (m3/h)', (c) => c.perf).map(csvEscape).join(','));
  lines.push(row('Consumo de combustible (L/h) Carga 70%', (c) => c.fuel).map(csvEscape).join(','));
  lines.push(row('Valor galón Diesel (USD)', () => '1.2').map(csvEscape).join(','));
  lines.push(row('Precio CIF (USD)', (c) => (c.price ? ` $  ${Number(c.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ` : '')).map(csvEscape).join(','));
  lines.push(row('Mantenimiento preventivo (USD/h)', (c) => c.pm).map(csvEscape).join(','));
  lines.push(row('Mantenimiento correctivo (USD/h)', (c) => c.cm).map(csvEscape).join(','));
  lines.push(row('Tiempo de uso (h)', (c) => c.usage).map(csvEscape).join(','));
  lines.push(row('TCO (USD)', (c) => (c.tco ? ` $  ${Number(c.tco).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ` : '')).map(csvEscape).join(','));

  fs.writeFileSync(OUT_CSV, lines.join('\n') + '\n', 'utf8');
}

function main() {
  if (!fs.existsSync(XLSX_PATH)) {
    console.error(`Excel file not found: ${XLSX_PATH}`);
    process.exit(1);
  }

  const legacyCsvRows = parseCSV(fs.readFileSync(LEGACY_CSV, 'utf8'));
  const legacyCsvCols = parseLegacyCsv(legacyCsvRows);
  const legacyCsvByKey = new Map(legacyCsvCols.map((c) => [c.key, c]));

  const legacyJson = JSON.parse(fs.readFileSync(LEGACY_JSON, 'utf8'));
  const legacyJsonByKey = indexLegacyJson(legacyJson);

  const excelMachines = readExcelMachines();
  const csvColumns = [];
  const jsonItems = [];

  const includedKeys = new Set();

  for (const excelRow of excelMachines) {
    const match = findLegacyMatch(excelRow.brand, excelRow.model, legacyCsvByKey, legacyJsonByKey);
    const contentFallback = findLegacyContentFallback(
      excelRow.brand,
      excelRow.model,
      legacyJsonByKey,
      legacyCsvByKey
    );
    const merged = mergeMachine(excelRow, match, contentFallback);
    csvColumns.push(merged.csvCol);
    jsonItems.push(merged.jsonItem);
    includedKeys.add(normKey(excelRow.brand, excelRow.model));
  }

  // Keep legacy-only models that are not present in the Excel sheet
  // (aliases map newer Excel models onto older catalog names; don't drop the originals).
  let preserved = 0;
  for (const [key, legacy] of legacyJsonByKey.entries()) {
    if (includedKeys.has(key)) continue;
    jsonItems.push({
      ...legacy,
      materialNumber: legacy.materialNumber || '',
    });
    includedKeys.add(key);
    preserved += 1;
  }

  writeCsv(csvColumns);
  fs.writeFileSync(OUT_JSON, JSON.stringify(jsonItems, null, 2) + '\n', 'utf8');

  console.log(`Processed ${excelMachines.length} SDR machines from ${SHEET_NAME}`);
  console.log(`Preserved ${preserved} legacy-only models not in Excel`);
  console.log(`Total in output: ${jsonItems.length}`);
  console.log(`Wrote ${OUT_CSV}`);
  console.log(`Wrote ${OUT_JSON}`);

  const matched = excelMachines.filter((m) => findLegacyMatch(m.brand, m.model, legacyCsvByKey, legacyJsonByKey));
  console.log(`Merged legacy rich data for ${matched.length} models`);
  console.log(`New models without legacy match: ${excelMachines.length - matched.length}`);
}

main();
