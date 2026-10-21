import type { ReactNode } from 'react';
import type { Opt, OptList } from '../domain/options';

function norm<V extends string | number>(o: V | Opt<V>): Opt<V> {
  return typeof o === 'object' ? o : { v: o, label: String(o) };
}

interface ChipGroupProps<V extends string | number> {
  label: string;
  options: OptList<V>;
  value: V;
  onChange: (v: V) => void;
  className?: string;
}

/** Nhóm chip chọn một. */
export function ChipGroup<V extends string | number>({ label, options, value, onChange, className }: ChipGroupProps<V>) {
  return (
    <div className={'chips' + (className ? ' ' + className : '')} role="group" aria-label={label}>
      {options.map((raw) => {
        const o = norm(raw);
        const on = o.v === value;
        return (
          <button key={String(o.v)} type="button" className={'chip' + (on ? ' on' : '')} aria-pressed={on} onClick={() => onChange(o.v)}>
            {o.label}
            {o.sub ? <span className="sub">{o.sub}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

interface MultiChipGroupProps {
  label: string;
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
}

/** Nhóm chip chọn nhiều. */
export function MultiChipGroup({ label, options, value, onChange }: MultiChipGroupProps) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button key={o} type="button" className={'chip' + (on ? ' on' : '')} aria-pressed={on}
            onClick={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

interface CounterProps {
  label: string;
  note: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

export function Counter({ label, note, value, onChange, min = 0, max = 20 }: CounterProps) {
  return (
    <div className="ctr">
      <span className="ctr-l">
        <span className="ctr-t">{label}</span>
        <span className="sub">{note}</span>
      </span>
      <span className="ctr-c">
        <button type="button" className="ctr-b" aria-label={'Giảm ' + label.toLowerCase()} onClick={() => onChange(Math.max(min, value - 1))}>−</button>
        <span className="ctr-v" aria-live="polite">{value}</span>
        <button type="button" className="ctr-b" aria-label={'Tăng ' + label.toLowerCase()} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
      </span>
    </div>
  );
}

/** Tiêu đề nhỏ + nội dung. */
export function Sec({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="sec">
      <h3 className="sec-h">{title}</h3>
      {children}
    </div>
  );
}

export function Note({ bad, children, role }: { bad?: boolean; children: ReactNode; role?: string }) {
  return <p className={'note ' + (bad ? 'bad' : 'good')} role={role}>{children}</p>;
}

export function Row({ k, children, strong }: { k: ReactNode; children: ReactNode; strong?: boolean }) {
  return (
    <div className="row">
      <span className={'k' + (strong ? ' k-strong' : '')}>{k}</span>
      <span className="v">{children}</span>
    </div>
  );
}

export function Tag({ bad, children }: { bad?: boolean; children: ReactNode }) {
  return <span className={'tag ' + (bad ? 'bad' : 'good')}>{children}</span>;
}
