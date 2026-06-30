const norm = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

const sdrImageByModel: Record<string, string> = {
  bw211d5sl: 'BW211 D5-SL.png',
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
  ca25drhino: 'CA25DRhino.jpg',
  ca2500d: 'CA2500D.png',
  ca3500d: 'CA3500D.png',
  ca4500d: 'CA4500D.png',
  drs120d: 'DRS120D.png',
  sv521d: 'SV521D.png',
  sv621d: 'SV621D.png',
  sv700d: 'SV700D.png',
  sv9001: 'SV900-1.png',
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
};

const paverImageByModel: Record<string, string> = {
  ap655: 'AP655.png',
  bf600c3: 'BF600-C-3.png',
  super18003: 'Super-1800-3.png',
  sd2500cs: 'SD2500CS.png',
};

const millingImageByModel: Record<string, string> = {
  bm100020: 'BM1000-20.png',
  xm1005h: 'XM1005H.png',
  scm1000c8: 'SCM1000C-8.png',
};

const ltrImages = [
  'RD27.png', 'CT260.jpg', 'ARX26.jpg', 'CC1200.jpg', 'HD12VV.png', 'CB2.7GC.jpg', 'BW120 AD-5.jpg',
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
    : '';

  if (!folder) return `${base}placeholder.svg`;

  const modelNorm = norm(model);

  if (folder === 'SDR' && sdrImageByModel[modelNorm]) {
    return `${base}images/${folder}/${sdrImageByModel[modelNorm]}`;
  }

  if (folder === 'Pavers' && paverImageByModel[modelNorm]) {
    return `${base}images/${folder}/${paverImageByModel[modelNorm]}`;
  }

  if (folder === 'Milling' && millingImageByModel[modelNorm]) {
    return `${base}images/${folder}/${millingImageByModel[modelNorm]}`;
  }

  const folderImages = folder === 'LTR' ? ltrImages : folder === 'HTR' ? htrImages : [];
  const match = folderImages.find((img) => norm(img).includes(modelNorm));
  if (match) return `${base}images/${folder}/${match}`;

  if (folder === 'SDR') return `${base}images/${folder}/BW211 D5-SL.png`;
  if (folder === 'Pavers') return `${base}images/${folder}/BF600-C-3.png`;

  return `${base}placeholder.svg`;
}
