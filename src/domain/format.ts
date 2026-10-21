/** Định dạng số kiểu Việt Nam: 3,71 · 1.234,5 */
export function fmt(n: number, d: number): string {
  return Number(n).toLocaleString('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d });
}

/** Đọc số từ ô nhập (chấp nhận dấu phẩy thập phân), rỗng/sai → 0. */
export function numOf(v: string | number | undefined | null): number {
  return parseFloat(String(v || '').replace(',', '.')) || 0;
}

/** yyyy-mm-dd → dd/mm/yyyy */
export function dmy(iso: string): string {
  return iso ? iso.split('-').reverse().join('/') : '';
}

/** Chuyển đường dẫn asset tương đối thành URL đầy đủ theo BASE_URL (hỗ trợ GitHub Pages) */
export function assetUrl(path: string): string {
  if (!path || path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env?.BASE_URL ?? '/';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanBase + cleanPath;
}
