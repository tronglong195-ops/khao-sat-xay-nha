import { PRICING, type Pricing } from '../config/pricing';
import { covOf } from './density';
import { fmt, numOf } from './format';
import { BASEMENT_COEF, BUDGETS, FOUND, ROOF_COEF } from './options';
import type { FormState } from './types';

type EstimateInput = Pick<FormState, 'w' | 'd' | 'sxdIn' | 'floors' | 'mezz' | 'tum' | 'basement' | 'roof' | 'found' | 'balc' | 'balcDua' | 'pkg' | 'level' | 'budget'>;

export interface Estimate {
  W: number;
  D: number;
  lot: number;
  cov: number;
  sxdIn: number;
  /** Diện tích xây dựng / sàn dùng để tính */
  sxd: number;
  parts: { k: string; a: number }[];
  area: number;
  price: number;
  totalTy: number;
  hasLot: boolean;
  // chuỗi hiển thị
  lotText: string;
  covText: string;
  sxdLabel: string;
  sxdText: string;
  partRows: { k: string; v: string }[];
  areaText: string;
  priceText: string;
  totalText: string;
  budgetText: string;
  budgetBad: boolean;
  excl: string;
}

export function levelPrices(p: Pricing = PRICING): Record<string, number> {
  return { 'Cơ bản': p.coBan, 'Khá': p.kha, 'Cao cấp': p.caoCap };
}

export function calcEstimate(s: EstimateInput, p: Pricing = PRICING): Estimate {
  const W = numOf(s.w), D = numOf(s.d), sxdIn = numOf(s.sxdIn);
  const lot = W * D, cov = covOf(lot);
  const sxd = sxdIn > 0 ? sxdIn : lot * cov;
  const roofC = ROOF_COEF[s.roof] || 0.5;
  const bC = BASEMENT_COEF[s.basement] || 0;
  const fd = FOUND[s.found] || [0.5, false];

  const parts = [
    { k: s.found === 'Kỹ sư đề xuất' ? 'Móng (tạm tính 50%)' : s.found + ' (' + Math.round(fd[0] * 100) + '%)', a: sxd * fd[0] },
    { k: 'Sàn ' + s.floors + ' tầng (100%)', a: sxd * s.floors }
  ];
  if (s.mezz === 'Có lửng') parts.push({ k: 'Tầng lửng (≈ 60% sàn)', a: sxd * 0.6 });
  const dua = numOf(s.balcDua);
  if (s.balc === 'Có đua ban công' && dua > 0 && W > 0 && s.floors > 1) {
    parts.push({ k: 'Ban công đua ' + fmt(dua, 1) + ' m × ' + (s.floors - 1) + ' tầng', a: W * dua * (s.floors - 1) });
  }
  if (s.tum === 'Có tum') parts.push({ k: 'Tum thang (≈ 50% sàn)', a: sxd * 0.5 });
  parts.push({ k: s.roof + ' (' + Math.round(roofC * 100) + '%)', a: sxd * roofC });
  if (bC) parts.push({ k: s.basement + ' (' + Math.round(bC * 100) + '%)', a: sxd * bC });
  const area = parts.reduce((t, x) => t + x.a, 0);

  const price = s.pkg === 'Chỉ thiết kế' ? p.design : s.pkg === 'Thiết kế + thi công phần thô' ? p.tho : levelPrices(p)[s.level];
  const totalTy = (area * price) / 1000;
  let bMax = 0;
  BUDGETS.forEach((b) => { if (b[0] === s.budget) bMax = b[1]; });

  let budgetText: string, budgetBad: boolean;
  if (s.pkg === 'Chỉ thiết kế') {
    budgetText = 'Chi phí thiết kế. Dự toán thi công sẽ lập kèm hồ sơ thiết kế.';
    budgetBad = false;
  } else if (!bMax || totalTy <= bMax) {
    budgetText = 'Phù hợp ngân sách ' + s.budget + '.';
    budgetBad = false;
  } else {
    budgetText = 'Vượt ngân sách ' + s.budget + ' khoảng ' + Math.round((totalTy / bMax - 1) * 100) + '%. Có thể giảm 1 tầng, bỏ tum/hầm/lửng hoặc hạ mức hoàn thiện.';
    budgetBad = true;
  }
  const totalText = s.pkg === 'Chỉ thiết kế'
    ? fmt(area * price, 0) + ' triệu'
    : totalTy >= 1 ? '≈ ' + fmt(totalTy, 2) + ' tỷ' : '≈ ' + fmt(area * price, 0) + ' triệu';
  const excl = 'Chưa gồm: ' + (fd[1] ? 'chi phí ép/khoan cọc (tính theo md cọc), ' : 'cọc (nếu địa chất yếu phải chuyển móng cọc), ') +
    'nội thất rời, thiết bị điện lạnh, phí xin phép, phá dỡ nhà cũ. Con số chính xác chỉ có sau khảo sát và bóc khối lượng từ hồ sơ thiết kế.';

  return {
    W, D, lot, cov, sxdIn, sxd, parts, area, price, totalTy, hasLot: sxd > 0,
    lotText: lot > 0 ? fmt(lot, 1) + ' m²' : '—',
    covText: lot > 0 ? fmt(cov * 100, 0) + '%' : '—',
    sxdLabel: sxdIn > 0 ? 'Diện tích xây dựng / sàn (gia chủ nhập)' : 'Diện tích xây dựng / sàn (theo mật độ)',
    sxdText: fmt(sxd, 1) + ' m²',
    partRows: parts.map((x) => ({ k: x.k, v: fmt(x.a, 1) + ' m²' })),
    areaText: fmt(area, 1) + ' m²',
    priceText: fmt(price, 2) + ' tr/m²',
    totalText, budgetText, budgetBad, excl
  };
}
