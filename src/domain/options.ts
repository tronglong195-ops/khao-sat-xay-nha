import type { FormState, LeadStatus } from './types';

/** Lựa chọn có nhãn/dòng phụ riêng; lựa chọn dạng chuỗi thì nhãn = giá trị. */
export interface Opt<V extends string | number = string> {
  v: V;
  label: string;
  sub?: string;
}
export type OptList<V extends string | number = string> = ReadonlyArray<V | Opt<V>>;

export const DEFAULT_FORM: FormState = {
  name: '', phone: '', zalo: '', email: '', addr: '', dob: '', concerns: [],
  year: '', gender: 'nam', year2: '', gender2: 'nu', buildYear: '2027',
  siteAddr: '', type: 'Nhà phố', w: '', d: '', road: '', fronts: '1 mặt tiền', facing: '', facingDeg: '',
  status: 'Đất trống', legal: ['Sổ đỏ / sổ hồng'], permit: 'Cần xin phép – nhờ công ty làm hồ sơ',
  floors: 4, mezz: 'Không lửng', tum: 'Có tum', basement: 'Không', roof: 'Mái bằng BTCT',
  sxdIn: '', sudung: '', kichthuoc: '', balc: 'Không đua', balcDua: '', cos: '3 bậc',
  adults: 2, kids: 2, elders: 0, beds: 4, wcs: 4, cars: 1,
  floorRooms: { 'Tầng 1': ['Phòng khách', 'Bếp + bàn ăn', 'WC chung'] }, floorNote: {}, floorH: {},
  altar: 'Tầng trên cùng', kitchen: 'Bếp mở liên thông phòng khách', well: 'Có giếng trời',
  business: 'Không', lift: 'Không', liftType: 'Kỹ sư đề xuất', spaces: ['Ban công trồng cây'],
  style: 'hien-dai', colors: '', refs: '', materials: '',
  doorMain: 'Nhôm hệ', doorRoom: 'Nhựa lõi thép', windowT: 'Nhôm hệ',
  stair: 'Bản trượt vuông có chiếu nghỉ', stairDir: 'Kỹ sư đề xuất', stairW: '1000',
  railIn: 'Gỗ – kính', railOut: 'Inox – kính',
  ceil: 'Trần thạch cao', ceilScope: 'Toàn nhà', floorMat: 'Sàn gạch', tile: '800×800 mm',
  wallOut: '220 mm', wallIn: '110 mm',
  soil: 'Đất liền thổ', found: 'Kỹ sư đề xuất', neighbor: '',
  waterIn: 'Nước máy', waterPos: '', waterOut: 'Trước nhà', drainCos: '',
  tank: 'Có – sau nhà', septic: 'Trong nhà', pole: 'Trước nhà',
  ac: ['Phòng ngủ', 'Phòng khách'], vrv: 'Không', solar: 'Để chờ', cam: 'Camera IP', gen: 'Không',
  sys: ['Chuông cổng', 'Cáp quang internet + truyền hình', 'Chống sét'],
  budget: '2,5 – 4 tỷ', pkg: 'Trọn gói chìa khóa trao tay', level: 'Khá', start: '3 – 6 tháng', dongtho: '',
  siteNote: '', contact: 'Zalo', time: 'Buổi tối', notes: '', agree: false
};

export const STEP_LABELS = ['Chủ nhà & tuổi', 'Khu đất', 'Công năng', 'Kiến trúc & vật liệu', 'Kết cấu & điện nước', 'Ngân sách', 'Mặt bằng & gửi'];

export const ROOMS = ['Phòng khách', 'Bếp + bàn ăn', 'Phòng thờ', 'Phòng ngủ', 'Phòng ngủ master', 'WC chung', 'WC master', 'Gara ô tô', 'Kinh doanh', 'Sinh hoạt chung', 'Phòng làm việc', 'Giặt – phơi', 'Sân thượng', 'Kho'];

/** [nhãn, mức trần (tỷ)]; 0 = không có trần. */
export const BUDGETS: ReadonlyArray<readonly [string, number]> = [['Dưới 1,5 tỷ', 1.5], ['1,5 – 2,5 tỷ', 2.5], ['2,5 – 4 tỷ', 4], ['4 – 6 tỷ', 6], ['6 – 10 tỷ', 10], ['Trên 10 tỷ', 0]];

/** [hệ số diện tích móng, là móng cọc] */
export const FOUND: Record<string, readonly [number, boolean]> = {
  'Móng đơn': [0.3, false], 'Móng băng': [0.5, false], 'Móng ép cọc BTCT': [0.35, true], 'Móng cọc khoan nhồi': [0.35, true], 'Kỹ sư đề xuất': [0.5, false]
};
export const ROOF_COEF: Record<string, number> = { 'Mái bằng BTCT': 0.5, 'Mái Thái (BTCT dán ngói)': 0.85, 'Mái Nhật (kèo thép lợp ngói)': 0.7, 'Mái tôn': 0.3 };
export const BASEMENT_COEF: Record<string, number> = { 'Không': 0, 'Bán hầm': 1.5, 'Hầm': 2.0 };

export interface Style {
  id: string;
  name: string;
  desc: string;
  colors: string[];
}
export const STYLES: Style[] = [
  { id: 'hien-dai', name: 'Biệt thự / nhà phố hiện đại', desc: 'Khối vuông vức, kính lớn, lam chắn nắng, ít chi tiết – dễ thi công, tối ưu chi phí.', colors: ['#F2F2F0', '#BFC3C2', '#3A3F42', '#B98E5E'] },
  { id: 'indochine', name: 'Indochine (Đông Dương)', desc: 'Gạch bông, mây tre, cửa chớp, vòm cong nhẹ – hồn Việt, nét Pháp.', colors: ['#F3EBDD', '#2F5D50', '#C9A66B', '#1E1E1E'] },
  { id: 'tan-co-dien', name: 'Tân cổ điển', desc: 'Phào chỉ tiết chế, bố cục đối xứng, sang trọng – hợp biệt thự mặt tiền rộng.', colors: ['#FAF7F0', '#E4D7BF', '#A88B5B', '#5B5047'] },
  { id: 'lau-dai', name: 'Cổ điển / Lâu đài', desc: 'Mái vòm, cột thức, phù điêu, phào chỉ dày – bề thế, cần lô đất lớn và ngân sách cao.', colors: ['#F6F0E4', '#D9C29A', '#8E6E3E', '#3F3A34'] },
  { id: 'nhat', name: 'Mái Nhật / Wabi-sabi', desc: 'Mái dốc, gỗ sáng màu, tiểu cảnh, ánh sáng dịu – tĩnh và ấm.', colors: ['#EFE8DD', '#C6A27A', '#6B6F5A', '#2B2B2B'] },
  { id: 'nhiet-doi', name: 'Nhiệt đới (Tropical)', desc: 'Mái đua sâu, gạch thông gió, nhiều cây xanh – mát tự nhiên, hợp khí hậu Việt Nam.', colors: ['#E9E4D6', '#8A9A5B', '#B5643C', '#3E4A3D'] },
  { id: 'luxury', name: 'Hiện đại sang trọng', desc: 'Đá tự nhiên, kim loại, ánh sáng gián tiếp – điểm nhấn cho biệt thự cao cấp.', colors: ['#F4F1EC', '#1F2326', '#C8B08A', '#8C8F91'] }
];

export const PROCESS = [
  'Kỹ sư gọi lại tư vấn, xem tuổi và hướng chi tiết.',
  'Khảo sát hiện trạng, đo đạc lô đất, kiểm tra quy hoạch và địa chất.',
  'Lên phương án mặt bằng công năng và phối cảnh 3D.',
  'Triển khai hồ sơ kiến trúc – kết cấu – điện nước, hồ sơ xin phép.',
  'Dự toán chi tiết theo BOQ, ký hợp đồng thi công trọn gói.'
];

export const OPTS = {
  concerns: ['Chi phí', 'Thẩm mỹ', 'Phong thủy', 'Nhu cầu sử dụng'],
  gender: [{ v: 'nam', label: 'Nam' }, { v: 'nu', label: 'Nữ' }],
  type: ['Nhà phố', 'Nhà ống', 'Shophouse', 'Biệt thự', 'Nhà vườn', 'Nhà cấp 4', 'Lâu đài', 'Khác'],
  fronts: ['1 mặt tiền', '2 mặt tiền (lô góc)', '3 mặt thoáng'],
  status: ['Đất trống', 'Có nhà cũ cần phá dỡ', 'Cải tạo / nâng tầng'],
  legal: ['Sổ đỏ / sổ hồng', 'Thông tin quy hoạch', 'Giấy phép xây dựng'],
  permit: ['Cần xin phép – nhờ công ty làm hồ sơ', 'Cần xin phép – tự làm', 'Không cần / chưa rõ'],
  floors: [1, 2, 3, 4, 5, 6].map((n) => ({ v: n, label: n + ' tầng' })),
  mezz: ['Không lửng', 'Có lửng'],
  tum: ['Có tum', 'Không tum'],
  basement: ['Không', 'Bán hầm', 'Hầm'],
  roof: ['Mái bằng BTCT', 'Mái Thái (BTCT dán ngói)', 'Mái Nhật (kèo thép lợp ngói)', 'Mái tôn'],
  balc: ['Không đua', 'Có đua ban công'],
  cos: [{ v: '1 bậc', label: '1 bậc', sub: '~15 cm' }, { v: '3 bậc', label: '3 bậc', sub: '~45 cm' }, { v: '5 bậc', label: '5 bậc', sub: '~75 cm' }, { v: 'Khác', label: 'Khác', sub: 'theo khảo sát' }],
  altar: ['Tầng trên cùng', 'Phòng thờ riêng', 'Kết hợp phòng khách', 'Không cần'],
  kitchen: ['Bếp mở liên thông phòng khách', 'Bếp kín riêng', 'Bếp có đảo'],
  well: ['Có giếng trời', 'Không', 'Kỹ sư đề xuất'],
  business: ['Không', 'Cho thuê mặt bằng', 'Tự kinh doanh'],
  lift: ['Không', 'Có', 'Để chờ hố thang'],
  liftType: ['Có phòng máy', 'Không phòng máy (MRL)', 'Thủy lực', 'Kỹ sư đề xuất'],
  spaces: ['Phòng làm việc', 'Phòng gym', 'Phòng giải trí / karaoke', 'Phòng giúp việc', 'Sân vườn', 'Hồ bơi', 'Ban công trồng cây', 'Kho'],
  doorMain: ['Cửa gỗ', 'Thép vân gỗ', 'Nhôm hệ', 'Kính cường lực', 'Khác'],
  doorRoom: ['Cửa gỗ', 'Nhựa lõi thép', 'Nhôm hệ', 'Nhựa vân gỗ', 'Khác'],
  windowT: ['Cửa gỗ', 'Thép vân gỗ', 'Nhôm hệ', 'Khác'],
  stair: ['Bản trượt vuông có chiếu nghỉ', 'Bản cong lượn', 'Bản trượt áp sát tường', 'Khác'],
  stairDir: ['Xuôi kim đồng hồ', 'Ngược kim đồng hồ', 'Kỹ sư đề xuất'],
  stairW: [{ v: '900', label: '900' }, { v: '1000', label: '1000' }, { v: '1100', label: '1100' }, { v: '1200', label: '1200' }, { v: 'Kỹ sư đề xuất', label: 'Theo P/A' }],
  railIn: ['Gỗ – kính', 'Lan can sắt', 'Gỗ con tiện', 'Sắt nghệ thuật', 'Khác'],
  railOut: ['Inox', 'Inox – kính', 'Sắt nghệ thuật', 'Thép / gang đúc', 'Khác'],
  ceil: ['Trần thạch cao', 'Trần gỗ', 'Trần BT đắp phào chỉ', 'Không làm trần'],
  ceilScope: ['Phòng khách', 'Toàn nhà'],
  floorMat: ['Sàn gạch', 'Sàn gỗ', 'Sàn nhựa SPC'],
  tile: ['600×600 mm', '800×800 mm', '600×1200 mm', 'Khác'],
  wall: ['220 mm', '110 mm', 'Khác'],
  soil: ['Đất liền thổ', 'Đất ruộng', 'Đất ao lấp', 'Đất đồi', 'Chưa rõ'],
  found: ['Móng đơn', 'Móng băng', 'Móng ép cọc BTCT', 'Móng cọc khoan nhồi', 'Kỹ sư đề xuất'],
  waterIn: ['Nước máy', 'Nước máy + giếng khoan', 'Giếng khoan'],
  waterOut: ['Trước nhà', 'Sau nhà', 'Hông nhà'],
  tank: ['Có – trước nhà', 'Có – sau nhà', 'Có – vị trí khác', 'Không'],
  septic: ['Trong nhà', 'Ngoài nhà', 'Tận dụng bể cũ', 'Kỹ sư đề xuất'],
  pole: ['Trước nhà', 'Hông nhà', 'Sau nhà', 'Khác'],
  ac: ['Phòng ngủ', 'Phòng khách', 'Phòng bếp', 'Để chờ tất cả các phòng'],
  yesNo: ['Có', 'Không'],
  solar: ['Có', 'Để chờ', 'Không'],
  cam: ['Camera IP', 'Camera Analog', 'Không'],
  sys: ['Chuông cổng', 'Cáp quang internet + truyền hình', 'Chống sét', 'Khóa cửa thông minh', 'Nhà thông minh (smarthome)'],
  budget: BUDGETS.map((b) => b[0]),
  pkg: ['Chỉ thiết kế', 'Thiết kế + thi công phần thô', 'Trọn gói chìa khóa trao tay'],
  start: ['Trong 3 tháng', '3 – 6 tháng', '6 – 12 tháng', 'Chưa xác định'],
  contact: ['Gọi điện', 'Zalo', 'Email'],
  time: ['Giờ hành chính', 'Buổi tối', 'Cuối tuần']
} as const;

export const BUILD_YEARS = ['2026', '2027', '2028'];

export const LEAD_STATUSES: ReadonlyArray<readonly [LeadStatus, string]> = [
  ['moi', 'Mới'], ['da_lien_he', 'Đã liên hệ'], ['hen_khao_sat', 'Hẹn khảo sát'], ['da_khao_sat', 'Đã khảo sát'],
  ['bao_gia', 'Đã gửi báo giá'], ['ky_hd', 'Đã ký HĐ'], ['tu_choi', 'Không thành']
];
export const STATUS_LABEL: Record<LeadStatus, string> = Object.fromEntries(LEAD_STATUSES) as Record<LeadStatus, string>;

/** Danh sách tầng hiển thị: Tầng 1 → (lửng) → Tầng 2..N → (tum). */
export function floorNames(s: Pick<FormState, 'floors' | 'mezz' | 'tum'>): string[] {
  const names = ['Tầng 1'];
  if (s.mezz === 'Có lửng') names.push('Tầng lửng');
  for (let i = 2; i <= s.floors; i++) names.push('Tầng ' + i);
  if (s.tum === 'Có tum') names.push('Tum / sân thượng');
  return names;
}

export function floorHeightPlaceholder(name: string): string {
  return name === 'Tầng 1' ? '3,6 – 3,9' : name === 'Tầng lửng' ? '2,7 – 3,0' : '3,3 – 3,6';
}

/** Gợi ý số phòng ngủ (gồm 1 phòng khách) và WC theo số thành viên. */
export function suggestRooms(adults: number, kids: number, elders: number): { beds: number; wcs: number; text: string } {
  const beds = Math.max(1, Math.ceil(adults / 2)) + Math.ceil(kids / 2) + (elders > 0 ? 1 : 0) + 1;
  const text = 'Gợi ý cho ' + (adults + kids + elders) + ' người: khoảng ' + beds + ' phòng ngủ (gồm 1 phòng khách) và ' + (beds + 1) + ' WC.' +
    (elders > 0 ? ' Có người cao tuổi: nên bố trí phòng ngủ ở tầng 1, WC khép kín, sàn chống trơn, cân nhắc thang máy gia đình.' : '');
  return { beds, wcs: beds + 1, text };
}
