import { STATUS_LABEL } from '../../domain/options';
import type { Lead } from '../../services/leads';

const cell = (v: unknown) => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n\r;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};

export function fmtDate(lead: Pick<Lead, 'createdAt'>): string {
  const d = lead.createdAt?.toDate();
  if (!d) return '';
  const p = (n: number) => ('0' + n).slice(-2);
  return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
}

/** CSV UTF-8 có BOM để Excel đọc đúng tiếng Việt. */
export function leadsToCsv(leads: Lead[]): string {
  const head = ['Ngày gửi', 'Mã hồ sơ', 'Tên', 'SĐT', 'Email', 'Liên hệ qua', 'Thời gian', 'Kiểu nhà', 'Số tầng', 'Ngân sách', 'Gói', 'Địa chỉ lô đất', 'Dự toán', 'Trạng thái', 'Thông báo', 'Thư mục Drive', 'Ghi chú nội bộ'];
  const rows = leads.map((l) => [
    fmtDate(l), l.code, l.name, l.phone, l.email, l.contact, l.time, l.type, l.floors, l.budget, l.pkg, l.siteAddr,
    l.estimateText, STATUS_LABEL[l.status] ?? l.status, l.notify?.status === 'sent' ? 'Email OK' : 'Lỗi email', l.notify?.folderUrl ?? '', l.adminNote ?? ''
  ]);
  return '﻿' + [head, ...rows].map((r) => r.map(cell).join(',')).join('\r\n');
}
