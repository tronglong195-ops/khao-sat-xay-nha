import { describe, expect, it } from 'vitest';
import { parseSolarDateToLunar, solarToLunar } from '../../src/domain/lunar';

describe('Chuyển đổi Dương lịch sang Âm lịch (Hồ Ngọc Đức)', () => {
  it('hàm solarToLunar tính chính xác', () => {
    const l = solarToLunar(20, 1, 1985);
    expect(l.year).toBe(1984);
    expect(l.canChiYear).toBe('Giáp Tý');
  });

  it('xử lý các ngày sinh trước Tết Nguyên đán', () => {
    // 20/01/1985 Dương lịch là ngày 30/12 năm Giáp Tý (1984)
    const l1 = parseSolarDateToLunar('1985-01-20');
    expect(l1).not.toBeNull();
    expect(l1?.year).toBe(1984);
    expect(l1?.canChiYear).toBe('Giáp Tý');
    expect(l1?.month).toBe(12);
    expect(l1?.day).toBe(30);

    // 21/02/1985 Dương lịch là mùng 2 Tết Ất Sửu (1985)
    const l2 = parseSolarDateToLunar('1985-02-21');
    expect(l2?.year).toBe(1985);
    expect(l2?.canChiYear).toBe('Ất Sửu');
  });

  it('xử lý Tết Giáp Thìn 2024', () => {
    // 10/02/2024 là mùng 1 Tết Giáp Thìn
    const tet = parseSolarDateToLunar('2024-02-10');
    expect(tet?.year).toBe(2024);
    expect(tet?.canChiYear).toBe('Giáp Thìn');
    expect(tet?.day).toBe(1);
    expect(tet?.month).toBe(1);

    // 09/02/2024 là 30 Tết Quý Mão
    const giaoThua = parseSolarDateToLunar('2024-02-09');
    expect(giaoThua?.year).toBe(2023);
    expect(giaoThua?.canChiYear).toBe('Quý Mão');
  });

  it('xử lý chuỗi không hợp lệ', () => {
    expect(parseSolarDateToLunar('')).toBeNull();
    expect(parseSolarDateToLunar('invalid')).toBeNull();
    expect(parseSolarDateToLunar('1900-01-01')).toBeNull();
  });
});
