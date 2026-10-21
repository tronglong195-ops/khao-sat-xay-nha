import { DEFAULT_FORM } from '../../domain/options';
import type { FormState } from '../../domain/types';

const KEY = 'khaosat:draft:v1';

export interface Draft {
  form: FormState;
  step: number;
}

export function loadDraft(): Draft {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const d = JSON.parse(raw) as Partial<Draft>;
      const step = typeof d.step === 'number' && d.step >= 0 && d.step <= 6 ? d.step : 0;
      return { form: { ...DEFAULT_FORM, ...(d.form ?? {}) }, step };
    }
  } catch {
    // trình duyệt chặn localStorage hoặc dữ liệu hỏng → bắt đầu mới
  }
  return { form: { ...DEFAULT_FORM }, step: 0 };
}

export function saveDraft(d: Draft): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    // bỏ qua: chế độ ẩn danh / hết dung lượng
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // bỏ qua
  }
}
