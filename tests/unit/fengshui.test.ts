import { describe, expect, it } from 'vitest';
import { calcFS, canChiOf, coupleText, facingNote } from '../../src/domain/fengshui';

describe('1. Can chi & nạp âm', () => {
  const cases: [number, string, string][] = [
    [1960, 'Canh Tý', 'Bích Thượng Thổ (Thổ)'],
    [1975, 'Ất Mão', 'Đại Khê Thủy (Thủy)'],
    [1984, 'Giáp Tý', 'Hải Trung Kim (Kim)'],
    [1985, 'Ất Sửu', 'Hải Trung Kim (Kim)'],
    [1988, 'Mậu Thìn', 'Đại Lâm Mộc (Mộc)'],
    [1989, 'Kỷ Tỵ', 'Đại Lâm Mộc (Mộc)'],
    [1990, 'Canh Ngọ', 'Lộ Bàng Thổ (Thổ)'],
    [1995, 'Ất Hợi', 'Sơn Đầu Hỏa (Hỏa)'],
    [2000, 'Canh Thìn', 'Bạch Lạp Kim (Kim)'],
    [2001, 'Tân Tỵ', 'Bạch Lạp Kim (Kim)']
  ];
  it.each(cases)('%i → %s, %s', (y, canChi, napam) => {
    expect(canChiOf(y)).toBe(canChi);
    const fs = calcFS(String(y), 'nam', '2027')!;
    expect(fs.canChi).toBe(canChi);
    expect(fs.napam).toBe(napam);
  });

  it('can chi năm động thổ', () => {
    expect(canChiOf(2026)).toBe('Bính Ngọ');
    expect(canChiOf(2027)).toBe('Đinh Mùi');
    expect(canChiOf(2028)).toBe('Mậu Thân');
  });

  it('năm ngoài 1920–2012 trả null', () => {
    expect(calcFS('1919', 'nam', '2027')).toBeNull();
    expect(calcFS('2013', 'nam', '2027')).toBeNull();
    expect(calcFS('', 'nam', '2027')).toBeNull();
    expect(calcFS('abc', 'nu', '2027')).toBeNull();
  });
});

describe('2. Cung phi (Bát trạch)', () => {
  const cases: [number, 'nam' | 'nu', string, string, string, string, string, string][] = [
    [1984, 'nam', 'Đoài Kim', 'Tây tứ mệnh', 'Tây Bắc', 'Tây Nam', 'Đông Bắc', 'Tây'],
    [1984, 'nu', 'Cấn Thổ', 'Tây tứ mệnh', 'Tây Nam', 'Tây Bắc', 'Tây', 'Đông Bắc'],
    [1985, 'nam', 'Càn Kim', 'Tây tứ mệnh', 'Tây', 'Đông Bắc', 'Tây Nam', 'Tây Bắc'],
    [1985, 'nu', 'Ly Hỏa', 'Đông tứ mệnh', 'Đông', 'Đông Nam', 'Bắc', 'Nam'],
    [1989, 'nam', 'Khôn Thổ', 'Tây tứ mệnh', 'Đông Bắc', 'Tây', 'Tây Bắc', 'Tây Nam'],
    [1989, 'nu', 'Tốn Mộc', 'Đông tứ mệnh', 'Bắc', 'Nam', 'Đông', 'Đông Nam'],
    [1990, 'nam', 'Khảm Thủy', 'Đông tứ mệnh', 'Đông Nam', 'Đông', 'Nam', 'Bắc'],
    [1990, 'nu', 'Cấn Thổ', 'Tây tứ mệnh', 'Tây Nam', 'Tây Bắc', 'Tây', 'Đông Bắc'],
    [1995, 'nam', 'Khôn Thổ', 'Tây tứ mệnh', 'Đông Bắc', 'Tây', 'Tây Bắc', 'Tây Nam'],
    [1995, 'nu', 'Khảm Thủy', 'Đông tứ mệnh', 'Đông Nam', 'Đông', 'Nam', 'Bắc'],
    [2000, 'nam', 'Ly Hỏa', 'Đông tứ mệnh', 'Đông', 'Đông Nam', 'Bắc', 'Nam'],
    [2000, 'nu', 'Càn Kim', 'Tây tứ mệnh', 'Tây', 'Đông Bắc', 'Tây Nam', 'Tây Bắc']
  ];
  it.each(cases)('%i %s → %s', (y, g, cung, group, sk, ty, dn, pv) => {
    const fs = calcFS(String(y), g, '2027')!;
    expect(fs.cungText).toBe(cung);
    expect(fs.group).toBe(group);
    expect(fs.goodDirs).toEqual([
      { star: 'Sinh Khí', dir: sk }, { star: 'Thiên Y', dir: ty }, { star: 'Diên Niên', dir: dn }, { star: 'Phục Vị', dir: pv }
    ]);
  });
});

describe('3. Tuổi làm nhà (Kim Lâu / Hoang Ốc / Tam Tai)', () => {
  const cases: [number, number, number, string, string, string][] = [
    [1985, 2027, 43, 'Không phạm', 'Nhất Cát', 'Không phạm'],
    [1984, 2027, 44, 'Phạm Kim Lâu Lục Súc', 'Nhì Nghi', 'Không phạm'],
    [1990, 2027, 38, 'Không phạm', 'Ngũ Thọ Tử', 'Không phạm'],
    [1988, 2026, 39, 'Phạm Kim Lâu Thê', 'Lục Hoang Ốc', 'Không phạm'],
    [1975, 2027, 53, 'Phạm Kim Lâu Lục Súc', 'Nhì Nghi', 'Phạm'],
    [1995, 2028, 34, 'Không phạm', 'Nhất Cát', 'Không phạm'],
    [1980, 2027, 48, 'Phạm Kim Lâu Thê', 'Lục Hoang Ốc', 'Không phạm'],
    [1993, 2026, 34, 'Không phạm', 'Nhất Cát', 'Không phạm']
  ];
  it.each(cases)('sinh %i làm %i → tuổi mụ %i', (y, by, mu, kl, ho, tt) => {
    const fs = calcFS(String(y), 'nam', String(by))!;
    expect(fs.mu).toBe(mu);
    expect(fs.klText).toBe(kl);
    expect(fs.hoText).toBe(ho);
    expect(fs.ttText).toBe(tt);
  });

  it('kết luận đẹp tuổi / phạm', () => {
    expect(calcFS('1985', 'nam', '2027')!.verdict).toBe('Năm 2027 gia chủ đẹp tuổi làm nhà: không phạm Kim Lâu, Hoang Ốc, Tam Tai.');
    const bad = calcFS('1975', 'nam', '2027')!;
    expect(bad.verdictBad).toBe(true);
    expect(bad.verdict).toBe('Năm 2027 gia chủ phạm Kim Lâu Lục Súc, Tam Tai. Nên mượn tuổi người hợp (nam giới, đẹp tuổi) đứng ra động thổ – cất nóc, hoặc cân nhắc lùi năm khởi công.');
  });

  it('nhận xét hướng & vợ chồng', () => {
    const fs = calcFS('1985', 'nam', '2027');
    expect(facingNote(fs, 'T')).toEqual({ bad: false, text: 'Hướng Tây là cung Sinh Khí – hướng tốt với gia chủ.' });
    expect(facingNote(fs, 'DN')?.bad).toBe(true);
    expect(facingNote(fs, '')).toBeNull();
    expect(coupleText(fs, calcFS('1985', 'nu', '2027'))).toContain('Khác nhóm mệnh');
    expect(coupleText(fs, calcFS('1984', 'nam', '2027'))).toContain('Cùng nhóm mệnh');
  });
});
