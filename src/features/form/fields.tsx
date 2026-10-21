// Trường gắn thẳng với FormState qua context — mỗi trường là component cấp module để ô nhập không mất focus.
import type { HTMLInputTypeAttribute } from 'react';
import { ChipGroup, MultiChipGroup, Sec } from '../../components/ui';
import type { OptList } from '../../domain/options';
import type { FormState } from '../../domain/types';
import { useForm, type ListKey, type ScalarKey, type TextKey } from './formContext';

interface OneProps {
  k: ScalarKey;
  title: string;
  opts: OptList<string> | OptList<number>;
  aria?: string;
  className?: string;
  /** Không bọc tiêu đề (dùng cho nhóm phụ ngay dưới nhóm chính) */
  bare?: boolean;
}

/** Chip chọn một kèm tiêu đề. */
export function One({ k, title, opts, aria, className, bare }: OneProps) {
  const { f, set } = useForm();
  const group = (
    <ChipGroup<string | number> label={aria ?? title} options={opts as OptList<string | number>} value={f[k]} className={className}
      onChange={(v) => set({ [k]: v } as Partial<FormState>)} />
  );
  return bare ? group : <Sec title={title}>{group}</Sec>;
}

/** Chip chọn nhiều kèm tiêu đề. */
export function Many({ k, title, opts, aria }: { k: ListKey; title: string; opts: readonly string[]; aria?: string }) {
  const { f, set } = useForm();
  return (
    <Sec title={title}>
      <MultiChipGroup label={aria ?? title} options={opts} value={f[k]} onChange={(v) => set({ [k]: v } as Partial<FormState>)} />
    </Sec>
  );
}

interface InputProps {
  k: TextKey;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url';
  autoComplete?: string;
  step?: string;
  min?: string;
  max?: string;
  /** Chỉ có aria-label, không hiện nhãn */
  hiddenLabel?: boolean;
}

/** Ô nhập có nhãn. */
export function Input({ k, label, type = 'text', hiddenLabel, ...rest }: InputProps) {
  const { f, set } = useForm();
  const input = (
    <input className="in" type={type} value={f[k]} aria-label={hiddenLabel ? label : undefined}
      onChange={(e) => set({ [k]: e.target.value } as Partial<FormState>)} {...rest} />
  );
  if (hiddenLabel) return input;
  return (
    <label className="fld">
      <span className="lb">{label}</span>
      {input}
    </label>
  );
}

export function TextArea({ k, label, placeholder }: { k: TextKey; label: string; placeholder?: string }) {
  const { f, set } = useForm();
  return (
    <label className="fld">
      <span className="lb">{label}</span>
      <textarea className="in" value={f[k]} placeholder={placeholder} onChange={(e) => set({ [k]: e.target.value } as Partial<FormState>)} />
    </label>
  );
}
