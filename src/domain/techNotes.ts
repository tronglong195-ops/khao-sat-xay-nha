import { numOf } from './format';
import type { FormState } from './types';

export interface TechNote {
  t: string;
  bad: boolean;
}

type NoteInput = Pick<FormState, 'soil' | 'found' | 'cos' | 'floors' | 'lift' | 'stairW' | 'elders' | 'septic' | 'drainCos' | 'solar'>;

/** Lưu ý kỹ thuật tự động theo lựa chọn của gia chủ. */
export function techNotes(s: NoteInput): TechNote[] {
  const tn: TechNote[] = [];
  if (s.soil === 'Đất ruộng' || s.soil === 'Đất ao lấp') {
    tn.push({ t: 'Nền đất yếu (' + s.soil.toLowerCase() + '): cần khoan khảo sát địa chất; nhà từ 3 tầng thường phải dùng móng cọc BTCT. Ao lấp phải vét bùn, đắp cát đầm chặt từng lớp trước khi thi công.', bad: true });
    if (s.found === 'Móng đơn' || s.found === 'Móng băng') tn.push({ t: s.found + ' trên nền yếu có nguy cơ lún lệch, nứt tường – nên để kỹ sư kiểm tra lại phương án móng.', bad: true });
  }
  if (s.soil === 'Đất đồi') tn.push({ t: 'Đất đồi: kiểm tra độ dốc, kè chống trượt và thoát nước mặt; có thể gặp đá phải khoan phá.', bad: true });
  if (s.cos === '1 bậc') tn.push({ t: 'Cos nền 1 bậc (~15 cm) dễ ngập khi đường nâng cốt sau này; nhà phố thường chọn từ 3 bậc (~45 cm).', bad: true });
  if (s.floors >= 5 && s.lift === 'Không') tn.push({ t: 'Nhà từ 5 tầng nên để sẵn hố thang máy để sau này lắp, tránh đục phá kết cấu.', bad: true });
  if (s.stairW === '900' && (s.floors >= 4 || s.elders > 0)) tn.push({ t: 'Bản thang 900 mm hơi hẹp cho nhà nhiều tầng hoặc có người cao tuổi – nên cân nhắc 1000–1100 mm.', bad: true });
  if (s.septic === 'Trong nhà') tn.push({ t: 'Bể phốt trong nhà: đặt dưới gara/WC tầng 1, có ống thông hơi lên mái, nắp thăm ngoài khu sinh hoạt.', bad: false });
  if (s.drainCos && numOf(s.drainCos) < 30) tn.push({ t: 'Rãnh thoát thấp hơn cos nhà dưới 30 cm: độ dốc ống thoát hạn chế, cần nâng cos nền hoặc bố trí hố ga – bơm.', bad: true });
  if (s.solar !== 'Không') tn.push({ t: 'Năng lượng mặt trời: để sẵn ống luồn, vị trí bồn/pin trên mái và tính thêm tải trọng mái.', bad: false });
  if (!tn.length) tn.push({ t: 'Chưa có lưu ý đặc biệt – kỹ sư sẽ xác nhận khi khảo sát hiện trạng.', bad: false });
  return tn;
}
