import { describe, expect, it } from 'vitest';
import { covOf } from '../../src/domain/density';
import { calcEstimate } from '../../src/domain/estimate';
import { DEFAULT_FORM, suggestRooms } from '../../src/domain/options';
import type { FormState } from '../../src/domain/types';

describe('4. Mật độ xây dựng tối đa', () => {
  const cases: [number, number][] = [
    [50, 100], [90, 100], [95, 95], [100, 90], [150, 80], [200, 70], [250, 65],
    [300, 60], [400, 55], [500, 50], [750, 45], [1000, 40], [1200, 40]
  ];
  it.each(cases)('%i m² → %i%%', (lot, pct) => {
    expect(Math.round(covOf(lot) * 1000) / 10).toBe(pct);
  });
});

const est = (patch: Partial<FormState>) => calcEstimate({ ...DEFAULT_FORM, ...patch });
const rows = (e: ReturnType<typeof calcEstimate>) => [[e.sxdLabel, e.sxdText], ...e.partRows.map((r) => [r.k, r.v])];

describe('5. Dự toán sơ bộ', () => {
  it('E1 — Nhà phố 5×20, 4 tầng + tum, mái bằng, trọn gói Khá', () => {
    const e = est({ w: '5', d: '20', floors: 4, tum: 'Có tum', roof: 'Mái bằng BTCT', found: 'Kỹ sư đề xuất', pkg: 'Trọn gói chìa khóa trao tay', level: 'Khá', budget: '2,5 – 4 tỷ' });
    expect(rows(e)).toEqual([
      ['Diện tích xây dựng / sàn (theo mật độ)', '90,0 m²'],
      ['Móng (tạm tính 50%)', '45,0 m²'],
      ['Sàn 4 tầng (100%)', '360,0 m²'],
      ['Tum thang (≈ 50% sàn)', '45,0 m²'],
      ['Mái bằng BTCT (50%)', '45,0 m²']
    ]);
    expect(e.areaText).toBe('495,0 m²');
    expect(e.priceText).toBe('7,50 tr/m²');
    expect(e.totalText).toBe('≈ 3,71 tỷ');
    expect(e.budgetText).toBe('Phù hợp ngân sách 2,5 – 4 tỷ.');
    expect(e.budgetBad).toBe(false);
  });

  it('E2 — 5×20, 3 tầng + lửng, mái Thái, ép cọc, đua 1,2 m, Cơ bản', () => {
    const e = est({ w: '5', d: '20', floors: 3, mezz: 'Có lửng', tum: 'Không tum', roof: 'Mái Thái (BTCT dán ngói)', found: 'Móng ép cọc BTCT', balc: 'Có đua ban công', balcDua: '1.2', level: 'Cơ bản', budget: '1,5 – 2,5 tỷ' });
    expect(rows(e)).toEqual([
      ['Diện tích xây dựng / sàn (theo mật độ)', '90,0 m²'],
      ['Móng ép cọc BTCT (35%)', '31,5 m²'],
      ['Sàn 3 tầng (100%)', '270,0 m²'],
      ['Tầng lửng (≈ 60% sàn)', '54,0 m²'],
      ['Ban công đua 1,2 m × 2 tầng', '12,0 m²'],
      ['Mái Thái (BTCT dán ngói) (85%)', '76,5 m²']
    ]);
    expect(e.areaText).toBe('444,0 m²');
    expect(e.priceText).toBe('6,30 tr/m²');
    expect(e.totalText).toBe('≈ 2,80 tỷ');
    expect(e.budgetText).toBe('Vượt ngân sách 1,5 – 2,5 tỷ khoảng 12%. Có thể giảm 1 tầng, bỏ tum/hầm/lửng hoặc hạ mức hoàn thiện.');
    expect(e.excl).toContain('chi phí ép/khoan cọc');
  });

  it('E3 — Biệt thự 10×20, 2 tầng, bán hầm, mái Nhật, móng băng, Cao cấp', () => {
    const e = est({ w: '10', d: '20', floors: 2, tum: 'Không tum', basement: 'Bán hầm', roof: 'Mái Nhật (kèo thép lợp ngói)', found: 'Móng băng', level: 'Cao cấp', budget: '2,5 – 4 tỷ' });
    expect(rows(e)).toEqual([
      ['Diện tích xây dựng / sàn (theo mật độ)', '140,0 m²'],
      ['Móng băng (50%)', '70,0 m²'],
      ['Sàn 2 tầng (100%)', '280,0 m²'],
      ['Mái Nhật (kèo thép lợp ngói) (70%)', '98,0 m²'],
      ['Bán hầm (150%)', '210,0 m²']
    ]);
    expect(e.areaText).toBe('658,0 m²');
    expect(e.priceText).toBe('9,50 tr/m²');
    expect(e.totalText).toBe('≈ 6,25 tỷ');
    expect(e.budgetText).toBe('Vượt ngân sách 2,5 – 4 tỷ khoảng 56%. Có thể giảm 1 tầng, bỏ tum/hầm/lửng hoặc hạ mức hoàn thiện.');
  });

  it('E4 — Gia chủ nhập DTXD 120 m², 3 tầng + tum, móng đơn, phần thô', () => {
    const e = est({ w: '', d: '', sxdIn: '120', floors: 3, tum: 'Có tum', found: 'Móng đơn', pkg: 'Thiết kế + thi công phần thô', budget: 'Dưới 1,5 tỷ' });
    expect(rows(e)).toEqual([
      ['Diện tích xây dựng / sàn (gia chủ nhập)', '120,0 m²'],
      ['Móng đơn (30%)', '36,0 m²'],
      ['Sàn 3 tầng (100%)', '360,0 m²'],
      ['Tum thang (≈ 50% sàn)', '60,0 m²'],
      ['Mái bằng BTCT (50%)', '60,0 m²']
    ]);
    expect(e.areaText).toBe('516,0 m²');
    expect(e.priceText).toBe('4,20 tr/m²');
    expect(e.totalText).toBe('≈ 2,17 tỷ');
    expect(e.budgetText).toBe('Vượt ngân sách Dưới 1,5 tỷ khoảng 44%. Có thể giảm 1 tầng, bỏ tum/hầm/lửng hoặc hạ mức hoàn thiện.');
  });

  it('E5 — 5×20, 4 tầng + tum, chỉ thiết kế', () => {
    const e = est({ w: '5', d: '20', floors: 4, tum: 'Có tum', pkg: 'Chỉ thiết kế' });
    expect(e.areaText).toBe('495,0 m²');
    expect(e.priceText).toBe('0,18 tr/m²');
    expect(e.totalText).toBe('89 triệu');
    expect(e.budgetText).toBe('Chi phí thiết kế. Dự toán thi công sẽ lập kèm hồ sơ thiết kế.');
  });

  it('chưa có lô đất → không có bảng tính', () => {
    expect(est({}).hasLot).toBe(false);
  });
});

describe('6. Gợi ý số phòng', () => {
  const cases: [number, number, number, number, number][] = [
    [2, 2, 0, 3, 4], [2, 1, 2, 4, 5], [4, 3, 1, 6, 7], [1, 0, 0, 2, 3]
  ];
  it.each(cases)('%i lớn, %i trẻ, %i già → %i PN, %i WC', (a, k, e, beds, wcs) => {
    const r = suggestRooms(a, k, e);
    expect(r.beds).toBe(beds);
    expect(r.wcs).toBe(wcs);
  });
});
