// Thuật toán chuyển đổi ngày Dương lịch sang Âm lịch (Việt Nam UTC+7, tác giả Hồ Ngọc Đức).
import { canChiOf } from './fengshui';

function jdFromDate(d: number, m: number, y: number): number {
  const a = Math.floor((14 - m) / 12);
  const y1 = y + 4800 - a;
  const m1 = m + 12 * a - 3;
  return d + Math.floor((153 * m1 + 2) / 5) + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) - 32045;
}

function getNewMoonDay(k: number, timeZone: number): number {
  const T = k / 1236.85, T2 = T * T, T3 = T2 * T, dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 += -0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
  C1 += -0.0004 * Math.sin(3 * dr * Mpr) + 0.0104 * Math.sin(2 * dr * F);
  C1 += -0.0051 * Math.sin((M + Mpr) * dr) - 0.0074 * Math.sin((M - Mpr) * dr);
  C1 += 0.0004 * Math.sin((2 * F + M) * dr) - 0.0004 * Math.sin((2 * F - M) * dr);
  C1 += -0.0006 * Math.sin((2 * F + Mpr) * dr) + 0.001 * Math.sin((2 * F - Mpr) * dr);
  C1 += 0.0005 * Math.sin((2 * Mpr + M) * dr);
  return Math.floor(Jd1 + C1 + 0.5 + timeZone / 24);
}

function getSunLongitude(jdn: number, timeZone: number): number {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525, T2 = T * T, dr = Math.PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
  return Math.floor(L / Math.PI * 6);
}

function getLunarMonth11(yy: number, timeZone: number): number {
  let k = Math.floor((jdFromDate(31, 12, yy) - 2415021.0769986) / 29.530588853);
  let off = getSunLongitude(getNewMoonDay(k, timeZone), timeZone);
  while (off >= 9) {
    k--;
    off = getSunLongitude(getNewMoonDay(k, timeZone), timeZone);
  }
  return k;
}

function getLeapMonthOffset(a11: number, timeZone: number): number {
  let k = a11;
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k, timeZone), timeZone);
  do {
    last = arc;
    k++;
    arc = getSunLongitude(getNewMoonDay(k, timeZone), timeZone);
    i++;
  } while (arc !== last && i <= 14);
  return i - 1;
}

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  isLeap: boolean;
  canChiYear: string;
  formatted: string;
}

/** Chuyển đổi ngày Dương lịch sang Âm lịch (múi giờ VN +7) */
export function solarToLunar(dd: number, mm: number, yy: number, timeZone = 7): LunarDate {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = Math.floor((dayNumber - 2415021.0769986) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);
  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear = yy;
  if (a11 >= k) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    a11 = getLunarMonth11(yy, timeZone);
    b11 = getLunarMonth11(yy + 1, timeZone);
  }
  const day = dayNumber - monthStart + 1;
  const diff = k - a11;
  let isLeap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 12) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) isLeap = true;
    }
  }
  if (lunarMonth >= 13) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
  const canChiYear = canChiOf(lunarYear);
  return {
    day,
    month: lunarMonth,
    year: lunarYear,
    isLeap,
    canChiYear,
    formatted: `Ngày ${day}/${lunarMonth}${isLeap ? ' (nhuận)' : ''} năm ${canChiYear} (${lunarYear})`
  };
}

/** Nhận chuỗi ngày yyyy-mm-dd, trả về thông tin âm lịch hoặc null */
export function parseSolarDateToLunar(isoDateStr: string): LunarDate | null {
  if (!isoDateStr) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDateStr.trim());
  if (!m) return null;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10);
  const d = parseInt(m[3], 10);
  if (y < 1920 || y > 2050 || mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return solarToLunar(d, mo, y);
}
