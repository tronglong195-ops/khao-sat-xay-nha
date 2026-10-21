import type { FormState } from './types';

/** Bỏ khoảng trắng, dấu chấm, gạch ngang trong SĐT. */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s.\-()]/g, '');
}

export function isValidPhone(phone: string): boolean {
  return /^(0|\+84)\d{9,10}$/.test(normalizePhone(phone));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export interface ValidationError {
  message: string;
  /** Bước (0..6) chứa lỗi */
  step: number;
}

/** Kiểm tra trước khi mở xem trước phiếu. */
export function validateForm(s: FormState): ValidationError | null {
  if (!s.name.trim() || !s.phone.trim()) return { message: 'Vui lòng nhập họ tên và số điện thoại ở bước 1.', step: 0 };
  if (!isValidPhone(s.phone)) return { message: 'Số điện thoại chưa đúng (VD: 0912 345 678 hoặc +84912345678).', step: 0 };
  if (s.email.trim() && !isValidEmail(s.email)) return { message: 'Email chưa đúng định dạng.', step: 0 };
  if (!s.agree) return { message: 'Vui lòng tích đồng ý cho phép xử lý thông tin để kỹ sư liên hệ tư vấn.', step: 6 };
  return null;
}
