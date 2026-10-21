import { calcEstimate } from './estimate';
import { calcFS, DN, STARS, facingIndex } from './fengshui';
import { dmy, fmt } from './format';
import { STYLES, floorNames } from './options';
import type { DocRow, FormDocument, FormState } from './types';

const pad2 = (n: number) => ('0' + n).slice(-2);

/** Mã hồ sơ KH-YYMMDD-xxx (xxx = 3 số cuối SĐT). */
export function makeCode(phone: string, dt: Date): string {
  return 'KH-' + String(dt.getFullYear()).slice(2) + pad2(dt.getMonth() + 1) + pad2(dt.getDate()) + '-' + (phone.replace(/\D/g, '').slice(-3) || '000');
}

export interface BuildOptions {
  now?: Date;
  fileNames?: string[];
  /** Ghi đè mã hồ sơ (VD: mã đã có hậu tố khi lưu Firestore). */
  code?: string;
}

const R = (k: string, v: string | number | undefined | null): DocRow => ({ k, v: v === undefined || v === null || v === '' ? '—' : String(v) });

/** Dựng nội dung phiếu (mục I–VI) từ dữ liệu form. */
export function buildDocument(s: FormState, opts: BuildOptions = {}): FormDocument {
  const dt = opts.now ?? new Date();
  const files = opts.fileNames ?? [];
  const code = opts.code ?? makeCode(s.phone, dt);
  const fs = calcFS(s.year, s.gender, s.buildYear);
  const fs2 = calcFS(s.year2, s.gender2, s.buildYear);
  const est = calcEstimate(s);
  const { W, D, lot, sxd, sxdIn } = est;
  const fIdx = facingIndex(fs, s.facing);
  const styleName = STYLES.find((x) => x.id === s.style)?.name ?? '';

  const floorRows = floorNames(s).map((nm) => {
    const parts = [(s.floorRooms[nm] || []).join(', ')];
    if (s.floorH[nm]) parts.push('Cao tầng ' + s.floorH[nm] + ' m');
    if (s.floorNote[nm]) parts.push('Ghi chú: ' + s.floorNote[nm]);
    return R('Công năng ' + nm.toLowerCase(), parts.filter(Boolean).join('\n'));
  });

  return {
    code,
    fileName: 'Phieu_khao_sat_' + code + '.docx',
    dateLine: 'Ngày ' + dt.getDate() + ' tháng ' + (dt.getMonth() + 1) + ' năm ' + dt.getFullYear(),
    sections: [
      { title: 'I. THÔNG TIN CHỦ NHÀ', rows: [
        R('Tên gia chủ', s.name), R('Số điện thoại', s.phone), R('Zalo', s.zalo), R('Email', s.email),
        R('Ngày sinh (dương lịch)', dmy(s.dob)), R('Năm sinh âm lịch', fs ? fs.yearText : s.year), R('Vợ/chồng', fs2 ? fs2.yearText : ''),
        R('Địa chỉ liên hệ', s.addr), R('Vấn đề quan tâm nhất', s.concerns.join(', ')),
        R('Mệnh – cung phi', fs ? fs.napam + '; cung ' + fs.cungText + ' – ' + fs.group : ''),
        R('Hướng hợp tuổi', fs ? fs.goodDirs.map((g) => g.star + ': ' + g.dir).join('; ') : ''),
        R('Tuổi làm nhà', fs ? 'Tuổi mụ ' + fs.mu + ' năm ' + fs.by + ' (' + fs.byCanChi + '). ' + fs.verdict : '')
      ] },
      { title: 'II. THÔNG TIN KIẾN TRÚC CÔNG TRÌNH', rows: [
        R('Kiểu công trình', s.type), R('Phong cách kiến trúc', styleName), R('Địa chỉ lô đất', s.siteAddr),
        R('Kích thước lô đất', lot ? fmt(W, 1) + ' × ' + fmt(D, 1) + ' m = ' + fmt(lot, 1) + ' m²' : ''),
        R('Đường trước nhà', s.road ? s.road + ' m' : ''), R('Số mặt tiền', s.fronts),
        R('Hướng mặt tiền', s.facing ? DN[s.facing] + (s.facingDeg ? ' (' + s.facingDeg + ')' : '') + (fIdx >= 0 ? ' – cung ' + STARS[fIdx] : '') : ''),
        R('Hiện trạng', s.status), R('Giấy tờ đã có', s.legal.join(', ')), R('Xin phép xây dựng', s.permit),
        R('Quy mô', s.floors + ' tầng' + (s.mezz === 'Có lửng' ? ' + lửng' : '') + (s.tum === 'Có tum' ? ' + tum' : '') + (s.basement !== 'Không' ? ' + ' + s.basement.toLowerCase() : '')),
        R('Kiểu mái', s.roof),
        R('Diện tích xây dựng ước tính/sàn', sxdIn > 0 ? fmt(sxdIn, 1) + ' m²' : sxd > 0 ? fmt(sxd, 1) + ' m² (tự tính theo mật độ)' : ''),
        R('Diện tích sử dụng ước tính/sàn', s.sudung ? s.sudung + ' m²' : ''), R('Kích thước xây dựng', s.kichthuoc),
        R('Đua ban công', s.balc + (s.balc === 'Có đua ban công' && s.balcDua ? ' ' + s.balcDua + ' m' : '')),
        R('Cos nền tầng 1 so với sân', s.cos),
        R('Thành viên', s.adults + ' người lớn, ' + s.kids + ' trẻ em, ' + s.elders + ' người cao tuổi'),
        R('Số phòng mong muốn', s.beds + ' phòng ngủ, ' + s.wcs + ' WC, ' + s.cars + ' chỗ để ô tô'),
        ...floorRows,
        R('Phòng thờ', s.altar), R('Bếp', s.kitchen), R('Giếng trời', s.well), R('Kinh doanh tầng 1', s.business),
        R('Thang máy', s.lift === 'Có' ? 'Có – ' + s.liftType : s.lift), R('Không gian khác', s.spaces.join(', ')),
        R('Màu sắc yêu cầu', s.colors), R('Mẫu nhà tham khảo', s.refs),
        R('Cửa đi chính', s.doorMain), R('Cửa thông phòng', s.doorRoom), R('Cửa sổ', s.windowT),
        R('Cầu thang bộ', s.stair + '; chiều: ' + s.stairDir.toLowerCase() + '; bản rộng: ' + (s.stairW === 'Kỹ sư đề xuất' ? 'theo phương án' : s.stairW + ' mm')),
        R('Tay vịn cầu thang trong nhà', s.railIn), R('Lan can ngoài trời', s.railOut),
        R('Trần trang trí', s.ceil + (s.ceil !== 'Không làm trần' ? ' – ' + s.ceilScope.toLowerCase() : '')),
        R('Sàn nhà', s.floorMat + (s.floorMat === 'Sàn gạch' ? ' ' + s.tile : '')),
        R('Tường bao / tường ngăn', s.wallOut + ' / ' + s.wallIn), R('Vật liệu khác', s.materials)
      ] },
      { title: 'III. THÔNG TIN KẾT CẤU', rows: [
        R('Địa chất khu đất', s.soil), R('Phương án móng dự kiến', s.found), R('Công trình lân cận', s.neighbor)
      ] },
      { title: 'IV. THÔNG TIN ĐIỆN NƯỚC', rows: [
        R('Nguồn nước đầu vào', s.waterIn + (s.waterPos ? '; đầu chờ: ' + s.waterPos : '')),
        R('Thoát nước', s.waterOut + (s.drainCos ? '; rãnh thấp hơn cos nhà ' + s.drainCos + ' cm' : '')),
        R('Bể nước ngầm', s.tank), R('Bể phốt', s.septic), R('Cột điện', s.pole),
        R('Điều hòa cục bộ', s.ac.length ? s.ac.join(', ') : 'Không'), R('Điều hòa trung tâm', s.vrv),
        R('Năng lượng mặt trời', s.solar), R('Camera an ninh', s.cam), R('Máy phát điện', s.gen),
        R('Hệ thống khác', s.sys.join(', '))
      ] },
      { title: 'V. NGÂN SÁCH & TIẾN ĐỘ', rows: [
        R('Tổng mức đầu tư tối đa', s.budget + ' (gồm cửa, thiết bị, sơn; chưa gồm nội thất)'),
        R('Gói dịch vụ', s.pkg + (s.pkg === 'Trọn gói chìa khóa trao tay' ? ' – hoàn thiện ' + s.level.toLowerCase() : '')),
        R('Thời điểm khởi công', s.start), R('Ngày dự kiến động thổ', dmy(s.dongtho)),
        R('Diện tích sàn tính tiền (sơ bộ)', sxd > 0 ? est.areaText : ''),
        R('Dự toán sơ bộ', sxd > 0 ? est.totalText + ' (đơn giá ' + est.priceText + ', tham khảo)' : '')
      ] },
      { title: 'VI. TỔNG MẶT BẰNG & GHI CHÚ', rows: [
        R('Mô tả tổng mặt bằng', s.siteNote), R('Tệp đính kèm', files.join(', ')),
        R('Ghi chú thêm', s.notes), R('Liên hệ qua', s.contact + ' – ' + s.time.toLowerCase())
      ] }
    ]
  };
}
