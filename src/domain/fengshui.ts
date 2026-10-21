import type { DirCode, Gender } from './types';

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
export const NAPAM = ['Hải Trung Kim', 'Lư Trung Hỏa', 'Đại Lâm Mộc', 'Lộ Bàng Thổ', 'Kiếm Phong Kim', 'Sơn Đầu Hỏa', 'Giản Hạ Thủy', 'Thành Đầu Thổ', 'Bạch Lạp Kim', 'Dương Liễu Mộc', 'Tuyền Trung Thủy', 'Ốc Thượng Thổ', 'Tích Lịch Hỏa', 'Tùng Bách Mộc', 'Trường Lưu Thủy', 'Sa Trung Kim', 'Sơn Hạ Hỏa', 'Bình Địa Mộc', 'Bích Thượng Thổ', 'Kim Bạch Kim', 'Phú Đăng Hỏa', 'Thiên Hà Thủy', 'Đại Trạch Thổ', 'Thoa Xuyến Kim', 'Tang Đố Mộc', 'Đại Khê Thủy', 'Sa Trung Thổ', 'Thiên Thượng Hỏa', 'Thạch Lựu Mộc', 'Đại Hải Thủy'];
export const DIRS: ReadonlyArray<readonly [DirCode, string]> = [['B', 'Bắc'], ['DB', 'Đông Bắc'], ['D', 'Đông'], ['DN', 'Đông Nam'], ['N', 'Nam'], ['TN', 'Tây Nam'], ['T', 'Tây'], ['TB', 'Tây Bắc']];
export const DN = Object.fromEntries(DIRS) as Record<DirCode, string>;
export const STARS = ['Sinh Khí', 'Thiên Y', 'Diên Niên', 'Phục Vị', 'Họa Hại', 'Lục Sát', 'Ngũ Quỷ', 'Tuyệt Mệnh'];
/** cung → [tên, hành, 8 hướng theo thứ tự STARS] */
export const CUNG: Record<number, readonly [string, string, readonly DirCode[]]> = {
  1: ['Khảm', 'Thủy', ['DN', 'D', 'N', 'B', 'T', 'TB', 'DB', 'TN']],
  2: ['Khôn', 'Thổ', ['DB', 'T', 'TB', 'TN', 'D', 'N', 'DN', 'B']],
  3: ['Chấn', 'Mộc', ['N', 'B', 'DN', 'D', 'TN', 'DB', 'TB', 'T']],
  4: ['Tốn', 'Mộc', ['B', 'N', 'D', 'DN', 'TB', 'T', 'TN', 'DB']],
  6: ['Càn', 'Kim', ['T', 'DB', 'TN', 'TB', 'DN', 'B', 'D', 'N']],
  7: ['Đoài', 'Kim', ['TB', 'TN', 'DB', 'T', 'B', 'DN', 'N', 'D']],
  8: ['Cấn', 'Thổ', ['TN', 'TB', 'T', 'DB', 'N', 'D', 'B', 'DN']],
  9: ['Ly', 'Hỏa', ['D', 'DN', 'B', 'N', 'DB', 'TN', 'T', 'TB']]
};
const EAST = [1, 3, 4, 9];
export const COLORS: Record<string, string> = {
  'Kim': 'Trắng, ghi, xám bạc, vàng ánh kim; vàng – nâu đất (Thổ sinh Kim). Hạn chế đỏ, hồng (Hỏa khắc Kim).',
  'Mộc': 'Xanh lá, màu gỗ tự nhiên; đen – xanh dương (Thủy sinh Mộc). Hạn chế trắng, ghi (Kim khắc Mộc).',
  'Thủy': 'Đen, xanh dương, xanh than; trắng – ghi (Kim sinh Thủy). Hạn chế vàng đất, nâu (Thổ khắc Thủy).',
  'Hỏa': 'Đỏ, cam, hồng, tím; xanh lá – gỗ (Mộc sinh Hỏa). Hạn chế đen, xanh dương (Thủy khắc Hỏa).',
  'Thổ': 'Vàng, nâu đất, be; đỏ – cam – hồng (Hỏa sinh Thổ). Hạn chế xanh lá (Mộc khắc Thổ).'
};
const HOANG = ['Nhất Cát', 'Nhì Nghi', 'Tam Địa Sát', 'Tứ Tấn Tài', 'Ngũ Thọ Tử', 'Lục Hoang Ốc'];
const KIMLAU: Record<number, string> = { 1: 'Kim Lâu Thân', 3: 'Kim Lâu Thê', 6: 'Kim Lâu Tử', 8: 'Kim Lâu Lục Súc' };
const TAMTAI: Record<number, number[]> = { 0: [2, 3, 4], 1: [11, 0, 1], 2: [8, 9, 10], 3: [5, 6, 7] };

export function canChiOf(y: number): string {
  const i = (((y - 4) % 60) + 60) % 60;
  return CAN[i % 10] + ' ' + CHI[i % 12];
}

export interface FengShui {
  y: number;
  by: number;
  /** Tuổi mụ năm làm nhà */
  mu: number;
  hanh: string;
  cungNo: number;
  cung: string;
  cungHanh: string;
  /** 8 hướng theo thứ tự STARS */
  s: readonly DirCode[];
  canChi: string;
  byCanChi: string;
  yearText: string;
  napam: string;
  cungText: string;
  group: string;
  goodDirs: { star: string; dir: string }[];
  klText: string;
  klBad: boolean;
  hoText: string;
  hoBad: boolean;
  ttText: string;
  ttBad: boolean;
  verdict: string;
  verdictBad: boolean;
}

/** Phong thủy theo năm sinh âm lịch (1920–2012), giới tính và năm làm nhà. Ngoài khoảng → null. */
export function calcFS(yStr: string, g: Gender, byStr: string): FengShui | null {
  const y = parseInt(yStr, 10);
  if (!(y >= 1920 && y <= 2012)) return null;
  const by = parseInt(byStr, 10) || 2027;
  const i60 = (((y - 4) % 60) + 60) % 60;
  const chiI = i60 % 12;
  const napam = NAPAM[Math.floor(i60 / 2)];
  const hanh = napam.split(' ').pop() as string;
  const r = y % 9;
  let c: number;
  if (g === 'nu') {
    c = (r + 4) % 9;
    if (c === 0) c = 9;
    if (c === 5) c = 8;
  } else {
    c = (11 - r) % 9;
    if (c === 0) c = 9;
    if (c === 5) c = 2;
  }
  const cu = CUNG[c];
  const mu = by - y + 1;
  const kl = KIMLAU[mu % 9] || '';
  const hoI = (Math.floor(mu / 10) - 1 + (mu % 10)) % 6;
  const hoBad = hoI === 2 || hoI === 4 || hoI === 5;
  const byChi = (((by - 4) % 12) + 12) % 12;
  const tt = TAMTAI[chiI % 4].indexOf(byChi) >= 0;
  const faults: string[] = [];
  if (kl) faults.push(kl);
  if (hoBad) faults.push(HOANG[hoI]);
  if (tt) faults.push('Tam Tai');
  return {
    y, by, mu, hanh, cungNo: c, cung: cu[0], cungHanh: cu[1], s: cu[2],
    canChi: canChiOf(y), byCanChi: canChiOf(by),
    yearText: y + ' – ' + canChiOf(y) + (g === 'nu' ? ' (nữ)' : ' (nam)'),
    napam: napam + ' (' + hanh + ')',
    cungText: cu[0] + ' ' + cu[1],
    group: EAST.indexOf(c) >= 0 ? 'Đông tứ mệnh' : 'Tây tứ mệnh',
    goodDirs: [0, 1, 2, 3].map((i) => ({ star: STARS[i], dir: DN[cu[2][i]] })),
    klText: kl ? 'Phạm ' + kl : 'Không phạm', klBad: !!kl,
    hoText: HOANG[hoI], hoBad,
    ttText: tt ? 'Phạm' : 'Không phạm', ttBad: tt,
    verdict: faults.length
      ? 'Năm ' + by + ' gia chủ phạm ' + faults.join(', ') + '. Nên mượn tuổi người hợp (nam giới, đẹp tuổi) đứng ra động thổ – cất nóc, hoặc cân nhắc lùi năm khởi công.'
      : 'Năm ' + by + ' gia chủ đẹp tuổi làm nhà: không phạm Kim Lâu, Hoang Ốc, Tam Tai.',
    verdictBad: faults.length > 0
  };
}

/** Sao Bát trạch của một hướng theo tuổi gia chủ (-1 nếu chưa có). */
export function facingIndex(fs: FengShui | null, facing: DirCode | ''): number {
  return fs && facing ? fs.s.indexOf(facing) : -1;
}

export function facingNote(fs: FengShui | null, facing: DirCode | ''): { text: string; bad: boolean } | null {
  const idx = facingIndex(fs, facing);
  if (idx < 0 || !facing) return null;
  const good = idx < 4;
  return {
    bad: !good,
    text: 'Hướng ' + DN[facing] + ' là cung ' + STARS[idx] + (good
      ? ' – hướng tốt với gia chủ.'
      : ' – hướng xấu với gia chủ. Kiến trúc sư sẽ xử lý bằng cách xoay cửa chính, bố trí sảnh – cổng theo hướng tốt và đặt bếp “tọa hung hướng cát”.')
  };
}

export function facingHint(fs: FengShui | null): string {
  return fs
    ? 'Dòng chữ nhỏ dưới mỗi hướng là cung Bát trạch theo tuổi gia chủ (' + fs.cung + ' – ' + fs.group + ').'
    : 'Nhập năm sinh ở bước 1 để xem hướng nào hợp tuổi.';
}

export function coupleText(fs: FengShui | null, fs2: FengShui | null): string {
  if (!fs || !fs2) return '';
  return 'Vợ/chồng: ' + fs2.yearText + ', cung ' + fs2.cungText + ' – ' + fs2.group + '. ' + (fs.group === fs2.group
    ? 'Cùng nhóm mệnh nên hướng nhà, hướng bếp dễ hợp cả hai.'
    : 'Khác nhóm mệnh: hướng nhà theo gia chủ, phòng ngủ và hướng giường bố trí bổ trợ cho người còn lại.');
}

export function colorHint(fs: FengShui | null): string {
  return fs ? 'Màu hợp mệnh ' + fs.hanh + ' của gia chủ: ' + COLORS[fs.hanh] : 'Nhập năm sinh ở bước 1 để xem màu hợp mệnh gia chủ.';
}
