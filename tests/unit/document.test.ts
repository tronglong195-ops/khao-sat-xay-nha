import JSZip from 'jszip';
import { Packer } from 'docx';
import { describe, expect, it } from 'vitest';
import { buildDocx } from '../../src/docx/buildDocx';
import { buildDocument, makeCode } from '../../src/domain/document';
import { DEFAULT_FORM, floorNames } from '../../src/domain/options';
import { techNotes } from '../../src/domain/techNotes';
import { validateForm } from '../../src/domain/validate';
import type { FormState } from '../../src/domain/types';

const NOW = new Date(2026, 9, 21, 10, 0, 0);
const form = (patch: Partial<FormState> = {}): FormState => ({ ...DEFAULT_FORM, name: 'Nguyễn Văn Thử', phone: '0912345678', year: '1985', w: '5', d: '20', ...patch });
const rowKeys = (s: FormState) => buildDocument(s, { now: NOW }).sections.flatMap((x) => x.rows.map((r) => r.k));

describe('Phiếu thông tin', () => {
  it('mã hồ sơ và tên file', () => {
    expect(makeCode('0912 345 678', NOW)).toBe('KH-261021-678');
    expect(makeCode('', NOW)).toBe('KH-261021-000');
    const doc = buildDocument(form(), { now: NOW });
    expect(doc.code).toBe('KH-261021-678');
    expect(doc.fileName).toBe('Phieu_khao_sat_KH-261021-678.docx');
    expect(doc.dateLine).toBe('Ngày 21 tháng 10 năm 2026');
    expect(doc.sections.map((s) => s.title)).toEqual([
      'I. THÔNG TIN CHỦ NHÀ', 'II. THÔNG TIN KIẾN TRÚC CÔNG TRÌNH', 'III. THÔNG TIN KẾT CẤU',
      'IV. THÔNG TIN ĐIỆN NƯỚC', 'V. NGÂN SÁCH & TIẾN ĐỘ', 'VI. TỔNG MẶT BẰNG & GHI CHÚ'
    ]);
  });

  it('ô trống hiện "—", dự toán có trong mục V', () => {
    const doc = buildDocument(form(), { now: NOW, fileNames: ['a.jpg', 'b.pdf'] });
    const all = Object.fromEntries(doc.sections.flatMap((s) => s.rows.map((r) => [r.k, r.v])));
    expect(all['Zalo']).toBe('—');
    expect(all['Năm sinh âm lịch']).toBe('1985 – Ất Sửu (nam)');
    expect(all['Kích thước lô đất']).toBe('5,0 × 20,0 m = 100,0 m²');
    expect(all['Dự toán sơ bộ']).toBe('≈ 3,71 tỷ (đơn giá 7,50 tr/m², tham khảo)');
    expect(all['Tệp đính kèm']).toBe('a.jpg, b.pdf');
    expect(all['Liên hệ qua']).toBe('Zalo – buổi tối');
  });

  it('đổi 4 → 2 tầng: dữ liệu tầng 3–4 giữ trong state nhưng không vào phiếu', () => {
    const s = form({ floors: 2, floorRooms: { 'Tầng 1': ['Phòng khách'], 'Tầng 3': ['Kho'], 'Tầng 4': ['Kho'] } });
    expect(floorNames(s)).toEqual(['Tầng 1', 'Tầng 2', 'Tum / sân thượng']);
    const keys = rowKeys(s);
    expect(keys).toContain('Công năng tầng 2');
    expect(keys).not.toContain('Công năng tầng 3');
    expect(keys).not.toContain('Công năng tầng 4');
  });

  it('có lửng: khung Tầng lửng ngay sau Tầng 1 và có dòng trong phiếu', () => {
    const s = form({ mezz: 'Có lửng' });
    expect(floorNames(s).slice(0, 2)).toEqual(['Tầng 1', 'Tầng lửng']);
    expect(rowKeys(s)).toContain('Công năng tầng lửng');
  });

  it('công năng tầng nhiều dòng', () => {
    const s = form({ floorH: { 'Tầng 1': '3,9' }, floorNote: { 'Tầng 1': 'gara 2 xe' } });
    const row = buildDocument(s, { now: NOW }).sections[1].rows.find((r) => r.k === 'Công năng tầng 1');
    expect(row?.v).toBe('Phòng khách, Bếp + bàn ăn, WC chung\nCao tầng 3,9 m\nGhi chú: gara 2 xe');
  });
});

describe('Lưu ý kỹ thuật', () => {
  it('mặc định: bể phốt trong nhà + năng lượng mặt trời', () => {
    expect(techNotes(DEFAULT_FORM).map((n) => n.t.slice(0, 20))).toEqual(['Bể phốt trong nhà: đ', 'Năng lượng mặt trời:']);
  });
  it('nền yếu + móng băng, cos 1 bậc, 5 tầng không thang máy, thang 900, rãnh 20 cm', () => {
    const n = techNotes({ ...DEFAULT_FORM, soil: 'Đất ao lấp', found: 'Móng băng', cos: '1 bậc', floors: 5, stairW: '900', drainCos: '20', septic: 'Ngoài nhà', solar: 'Không' });
    expect(n).toHaveLength(6);
    expect(n.every((x) => x.bad)).toBe(true);
    expect(n[0].t).toContain('Nền đất yếu (đất ao lấp)');
  });
  it('không có gì → câu mặc định', () => {
    expect(techNotes({ ...DEFAULT_FORM, septic: 'Ngoài nhà', solar: 'Không' })).toEqual([{ t: 'Chưa có lưu ý đặc biệt – kỹ sư sẽ xác nhận khi khảo sát hiện trạng.', bad: false }]);
  });
});

describe('Kiểm tra trước khi xem trước', () => {
  it('bắt buộc tên, SĐT hợp lệ, email đúng, đồng ý', () => {
    expect(validateForm({ ...DEFAULT_FORM })?.step).toBe(0);
    expect(validateForm(form({ phone: '12345' }))?.step).toBe(0);
    expect(validateForm(form({ email: 'abc' }))?.step).toBe(0);
    expect(validateForm(form())?.step).toBe(6);
    expect(validateForm(form({ agree: true, phone: '+84 912.345.678' }))).toBeNull();
  });
});

describe('File Word', () => {
  it('A4, lề trái 30 mm, phải 20 mm, 8 bảng, Times New Roman', async () => {
    const doc = buildDocument(form(), { now: NOW });
    const buf = await Packer.toBuffer(buildDocx(doc, 'Nguyễn Văn Thử'));
    const zip = await JSZip.loadAsync(buf);
    const xml = await zip.file('word/document.xml')!.async('string');
    expect(xml).toMatch(/<w:pgSz w:w="11906" w:h="16838"/);
    expect(xml).toMatch(/w:left="1701"/);
    expect(xml).toMatch(/w:right="1134"/);
    expect(xml).toMatch(/w:top="1134"/);
    expect((xml.match(/<w:tbl>/g) || []).length).toBe(8);
    expect(xml).toContain('PHIẾU THÔNG TIN THIẾT KẾ NHÀ');
    expect(xml).toContain('Times New Roman');
  });
});
