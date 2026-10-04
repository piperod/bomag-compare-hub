const norm = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

const sdrImageByModel: Record<string, string> = {
  bw211d5sl: 'BW211 D5-SL.png',
  clg6611e: 'CLG6611E.jpg',
  hc200: 'HC200.jpg',
  clg6612e: 'CLG6612E.jpg',
  bw212d5sl: 'BW211 D5-SL.png',
  bw213d5sl: 'BW211 D5-SL.png',
  bw213d5sltcd: 'BW211 D5-SL.png',
  bw216d5sl: 'BW211 D5-SL.png',
  bw219d5pl: 'BW211 D5-SL.png',
  bw220d5pl: 'BW211 D5-SL.png',
  hc119: 'HC119.png',
  hc110: 'HC110.png',
  h13i: 'H13i.png',
  h16i: 'H16i.png',
  h18i: 'H18i.png',
  h25i: 'H25i.png',
  cs11gc: 'CS11GC.jpg',
  cs13gc: 'CS13GC.png',
  cs10gc: 'CS10GC.jpg',
  cs12: 'CS12.jpg',
  ca25drhino: 'CA25D.jpg',
  ca35drhino: 'CA35D-Rhino.png',
  ca2500d: 'CA2500D.png',
  ca3500d: 'CA3500D.jpg',
  ca4500d: 'CA4500D.png',
  drs120d: 'DRS120D.png',
  sv521d: 'SV521D.png',
  sv621d: 'SV621D.png',
  sv700d: 'SV700D.png',
  sv9001: 'SV900-1.png',
  xs113: 'XS113.jpg',
  '512': 'SEM512.jpg',
  cs11: 'CS11.jpg',
  ars1101: 'ARS110.1.jpg',
  ssr200c8h: 'SSR200C-8H.jpg',
  sd110: 'SD110.jpg',
  xs113e: 'XS113E.png',
  xs123: 'XS123.jpg',
  xs143j: 'XS143J.png',
  xs162j: 'XS163J.png',
  xs163j: 'XS163J.png',
  xs182: 'XS182.png',
  xs203j: 'XS203J.png',
  ssr120c8: 'SSR120C-8.png',
  ssr120c10: 'SSR120C-10.png',
  ssr120c10s: 'SSR120C-10S.jpg',
  sr16: 'SR16.png',
  sr22: 'SR22.png',
  vm115: 'VM115.png',
  vm137: 'VM137.png',
  '116d': '116D.jpg',
  asc110: 'ASC110.png',
  v110: 'V110.jpg',
  '510': '510.jpg',
  '1107ex': '1107EX.png',
  ca1300d: 'CA1300D.jpg',
  ca5000d: 'CA5000D.jpg',
  ca6500d: 'CA6500D.jpg',
};

/** SDR models from the TCO master file that have no photo yet (avoid showing a BOMAG photo for them). */
const sdrModelsWithoutImage = new Set([
  'cs1400', 'cs1400n', 'ct3000', 'ca2500pd', 'ca4000pd', 'ca5500pd',
]);

const paverImageByModel: Record<string, string> = {
  ap655: 'AP655.jpg',
  ap455: 'AP455.jpg',
  ap555: 'AP555.jpg',
  sap45c10: 'SAP45C-10.jpg',
  sap60c10: 'SAP60C-10.jpg',
  sap60c10t: 'SAP60C-10T.jpg',
  sap90c10s: 'SAP90C-10S.jpg',
  ssp90c8: 'SSP90C-8.jpg',
  bf600c3: 'BF600-C-3.png',
  super18003: 'Super-1800-3.jpg',
  super13003: 'Super-1300-3.jpg',
  super1400: 'Super-1400.jpg',
  super16003: 'Super-1600-3.jpg',
  super19003g: 'Super-1900-3-G.jpg',
  sd2500cs: 'SD2500CS.jpg',
  bf350c5: 'BF350-C-5.jpg',
  bf700c3: 'BF700-C-3.jpg',
  bf700c3l: 'BF700-C-3-L.jpg',
  bf800c3: 'BF800-C-3.jpg',
  fc1600c: 'FC1600C.jpg',
  f1800c: 'F1800C.jpg',
  f2500ws: 'F2500WS.jpg',
  sd2550c: 'SD2500CS.jpg',
  sd2550cs: 'SD2500CS.jpg',
};

/** Paver models from the TCO master file that have no photo yet. */
const paverModelsWithoutImage = new Set([
  'f80w', 'f1200c', 'p28200abg', 'p68200abg', 'f1000w', 'abg9820',
]);

const millingImageByModel: Record<string, string> = {
  bm100020: 'BM1000-20.png',
  xm1005h: 'XM1005H.png',
  scm1000c8: 'SCM1000C-8.png',
  w100r: 'W100-W120-R-Ri.jpg',
  w120r: 'W100-W120-R-Ri.jpg',
  w100ri: 'W100-W120-R-Ri.jpg',
  w120ri: 'W100-W120-R-Ri.jpg',
  w200f: 'W200F.jpg',
  pm620: 'PM620.jpg',
  w100hr: 'W100-W130-HR.jpg',
  w130hr: 'W100-W130-HR.jpg',
};

const ptrImageByModel: Record<string, string> = {
  bw24rh: 'BW24-27RH.jpg',
  bw27rh: 'BW24-27RH.jpg',
  bw28rh: 'BW28RH.jpg',
  hp180: 'HP180.jpg',
  hp280: 'HP280.jpg',
  cw16: 'CW16.jpg',
  cw34: 'CW34.jpg',
  ap240: 'AP240.jpg',
  cp1200: 'CP1200.jpg',
  cp2700: 'CP2700.jpg',
  ptr125: 'PTR125.jpg',
  ptr220: 'PTR220.jpg',
};

const ltrImages = [
  'RD27.png', 'CC900G.jpg', 'CT260.jpg', 'ARX26.jpg', 'CC1200.jpg', 'HD12VV.png', 'CB2.7GC.jpg', 'BW120 AD-5.jpg',
];

const htrImages = [
  'HD90 VV.jpg', 'CC4200.jpg', 'CB10.jpg', 'AV110X.jpg', 'BW161-AD-4.jpg', 'BW161AD4.jpg',
];

export function getMachineImagePath(model: string, line: string): string {
  const base = import.meta.env.BASE_URL;
  const lineNorm = line.toLowerCase();
  const folder =
    lineNorm === 'sdr' ? 'SDR'
    : lineNorm === 'ltr' ? 'LTR'
    : lineNorm === 'htr' ? 'HTR'
    : lineNorm === 'milling' ? 'Milling'
    : lineNorm === 'pavers' ? 'Pavers'
    : lineNorm === 'ptr' ? 'PTR'
    : '';

  if (!folder) return `${base}placeholder.svg`;

  const modelNorm = norm(model);

  if (folder === 'SDR' && sdrImageByModel[modelNorm]) {
    return `${base}images/${folder}/${sdrImageByModel[modelNorm]}`;
  }

  if (folder === 'Pavers' && paverImageByModel[modelNorm]) {
    return `${base}images/${folder}/${paverImageByModel[modelNorm]}`;
  }

  if (folder === 'PTR' && ptrImageByModel[modelNorm]) {
    return `${base}images/${folder}/${ptrImageByModel[modelNorm]}`;
  }

  if (folder === 'Milling' && millingImageByModel[modelNorm]) {
    return `${base}images/${folder}/${millingImageByModel[modelNorm]}`;
  }

  const folderImages = folder === 'LTR' ? ltrImages : folder === 'HTR' ? htrImages : [];
  const match = folderImages.find((img) => norm(img).includes(modelNorm));
  if (match) return `${base}images/${folder}/${match}`;

  if (folder === 'SDR' && sdrModelsWithoutImage.has(modelNorm)) return `${base}placeholder.svg`;
  if (folder === 'Pavers' && paverModelsWithoutImage.has(modelNorm)) return `${base}placeholder.svg`;
  if (folder === 'SDR') return `${base}images/${folder}/BW211 D5-SL.png`;
  if (folder === 'Pavers') return `${base}images/${folder}/BF600-C-3.png`;

  return `${base}placeholder.svg`;
}
