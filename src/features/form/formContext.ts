import { createContext, useContext } from 'react';
import type { FormState } from '../../domain/types';

export interface FormCtx {
  f: FormState;
  set: (patch: Partial<FormState>) => void;
}

export const FormContext = createContext<FormCtx | null>(null);

export function useForm(): FormCtx {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm ngoài FormContext');
  return ctx;
}

/** Khóa của FormState có giá trị chuỗi/số (dùng cho chip chọn một & ô nhập). */
export type ScalarKey = { [K in keyof FormState]: FormState[K] extends string | number ? K : never }[keyof FormState];
export type TextKey = { [K in keyof FormState]: FormState[K] extends string ? K : never }[keyof FormState];
export type ListKey = { [K in keyof FormState]: FormState[K] extends string[] ? K : never }[keyof FormState];
