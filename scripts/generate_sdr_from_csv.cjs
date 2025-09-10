// Minimal CSV -> JSON converter for SDR_raw_v3.csv structure
// Reads bomag-compare-hub/SDR_raw_v3.csv and writes src/data/sdrFromCsv.json
// See comments for assumptions.

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '..', 'SDR_raw_v3.csv');
const OUT_PATH = path.join(__dirname, '..', 'src', 'data', 'sdrFromCsv.json');

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
        if (text[i + 1] === '"') { // escaped quote
          field += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        field += ch;
        i++;
        continue;
      }
    } else {
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
        if (ch === '\r' && text[i + 1] === '\n') {
          i += 2;
        } else {
          i++;
        }
        row.push(field);
        rows.push(row);
        field = '';
        row = [];
        continue;
      }
      field += ch;
      i++;
    }
  }
  if (field.length > 0 || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function toNumber(raw) {
  if (raw == null) return null;
  const s = String(raw)
    .replace(/\$/g, '')
    .replace(/\s/g, '')
    .replace(/,/g, '') // remove thousands separator commas
    .replace(/[^0-9.\-]/g, '');
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function main() {
  const csv = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(csv);
  // trim
  for (const r of rows) {
    for (let j = 0; j < r.length; j++) {
      if (typeof r[j] === 'string') r[j] = r[j].trim();
    }
  }

  const brandRow = rows.find(r => r[0] && r[0].toLowerCase().startsWith('marca'));
  const modelRow = rows.find(r => r[0] && r[0].toLowerCase().startsWith('máquina')) || rows.find(r => r[0] && r[0].toLowerCase().startsWith('modelo'));
  const modelValuesRow = rows.find(r => r[0] && r[0].toLowerCase().startsWith('modelo'));
  const modelsRow = modelValuesRow || modelRow;
  if (!brandRow || !modelsRow) {
    console.error('Missing MARCA or Modelo rows');
    process.exit(1);
  }
  const colCount = Math.max(brandRow.length, modelsRow.length);
  const cols = [];
  for (let c = 1; c < colCount; c++) {
    const brand = (brandRow[c] || '').trim();
    const model = (modelsRow[c] || '').trim();
    if (!brand && !model) continue;
    cols.push({ index: c, brand, model });
  }

  const getRow = (prefix) => rows.find(r => (r[0] || '').toLowerCase().startsWith(prefix.toLowerCase()));
  const getRowExact = (exact) => rows.find(r => (r[0] || '').trim().toLowerCase() === exact.toLowerCase());

  const peso = getRow('Peso');
  const matNum = getRow('Número de material');
  const motor = getRow('Motor');
  const width = getRow('Ancho de compactación');
  const power = getRow('Potencia');
  const amplitude = getRow('Amplitud');
  const sll = getRow('Carga Lineal Estática');
  const grade = getRow('Gradeabilidad');
  const origin = getRow('País de origen');
  const assistant1 = getRowExact('Asistente de compactación');
  const assistant1Idx = rows.indexOf(assistant1);
  const assistant2 = assistant1Idx >= 0 && rows[assistant1Idx + 1] && !rows[assistant1Idx + 1][0] ? rows[assistant1Idx + 1] : null;
  const telemetry = getRowExact('Telemetría');
  const innovations = getRow('Tecnologías Innovadoras');
  const usp1 = getRowExact('USP 1');
  const usp2 = getRowExact('USP 2');
  const usp3 = getRowExact('USP 3');
  const usp4 = getRowExact('USP 4');
  const usp5 = getRowExact('USP 5');
  const usp6 = getRowExact('USP 6');
  const maxDepth = getRow('Profundidad de compactación');
  const perf = getRow('Rendimiento en compactación');
  const fuel = getRow('Consumo de combustible');
  const price = getRow('Precio CIF');
  const pm = getRow('Mantenimiento preventivo');
  const cm = getRow('Mantenimiento correctivo');
  const usage = getRow('Tiempo de uso');
  const tco = getRowExact('TCO (USD)');

  const result = [];
  for (const col of cols) {
    const c = col.index;
    const numOrZero = (row) => (row && toNumber(row[c]) != null ? toNumber(row[c]) : 0);
    const strOrDash = (row) => (row && row[c] ? row[c] : '-');

    const weightKg = numOrZero(peso);
    const widthM = numOrZero(width);
    const powerHp = numOrZero(power);
    const sllVal = numOrZero(sll);
    const gradeVal = numOrZero(grade) || undefined;
    const maxDepthVal = numOrZero(maxDepth) || undefined;

    const amplitudeVal = strOrDash(amplitude).replace(/\s+/g, ' ').trim();
    const originVal = strOrDash(origin);

    const a1 = strOrDash(assistant1);
    const a2 = assistant2 ? strOrDash(assistant2) : '';
    const assistantEs = [a1, a2].filter(Boolean).join('\n');

    const telemetryEs = strOrDash(telemetry);
    const innovationsEs = strOrDash(innovations);

    const makeLangObj = (es) => ({ es, en: es, de: es, pt: es });

    const item = {
      brand: col.brand || '-',
      model: col.model || '-',
      materialNumber: matNum && matNum[c] ? matNum[c] : undefined,
      weight: weightKg || 0,
      engine: strOrDash(motor),
      compactionWidth: widthM || 0,
      power: powerHp || 0,
      amplitude: amplitudeVal || '-',
      staticLinearLoad: sllVal || 0,
      gradeability: gradeVal,
      origin: makeLangObj(originVal),
      compactionAssistant: makeLangObj(assistantEs || 'No aplica'),
      telemetry: makeLangObj(telemetryEs || 'No aplica'),
      innovations: makeLangObj(innovationsEs || '-'),
      usp: makeLangObj(''),
      usp1: makeLangObj(strOrDash(usp1)),
      usp2: makeLangObj(strOrDash(usp2)),
      usp3: makeLangObj(strOrDash(usp3)),
      usp4: makeLangObj(strOrDash(usp4)),
      usp5: makeLangObj(strOrDash(usp5)),
      usp6: makeLangObj(strOrDash(usp6)),
      maxCompactionDepth: maxDepthVal,
      compactionPerformance: strOrDash(perf),
      fuelConsumption: numOrZero(fuel) || 0,
      price: numOrZero(price) || 0,
      preventiveMaintenance: numOrZero(pm) || 0,
      correctiveMaintenance: numOrZero(cm) || 0,
      usageTime: numOrZero(usage) || 0,
      tco: numOrZero(tco) || 0,
    };
    // Brand-specific cleanup for DYNAPAC USPs to match expected structure
    if (item.brand.toUpperCase() === 'DYNAPAC' && /CA(25|35)\s*D-?Rhino/i.test(item.model)) {
      const dcm = (item.usp5 && item.usp5.es) ? item.usp5.es.trim() : '';
      const maintenanceEs = 'Mantenimiento y Servicio\nDiseño de fácil acceso: El capó del motor se abre completamente, permitiendo un acceso rápido a los puntos de mantenimiento diario (filtros, niveles, correas).';
      // If USP5 looks like the DCM sentence, append it to USP4 and move maintenance to USP5
      if (/^El DCM utiliza/.test(dcm)) {
        const merged = (item.usp4.es ? (item.usp4.es + '\n') : '') + dcm;
        item.usp4 = { es: merged, en: merged, de: merged, pt: merged };
        // Clear USP5 to avoid duplication and place maintenance in USP6
        item.usp5 = { es: '', en: '', de: '', pt: '' };
        item.usp6 = { es: maintenanceEs, en: maintenanceEs, de: maintenanceEs, pt: maintenanceEs };
      }
    }
    result.push(item);
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), 'utf8');
  console.log(`Wrote ${result.length} machines to ${OUT_PATH}`);
}

main();
