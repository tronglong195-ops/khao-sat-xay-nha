// Gửi email + lưu Drive. Mặc định qua Apps Script (gói Spark miễn phí); đổi sang Cloud Functions chỉ cần thay Notifier.

export interface NotifyPayload {
  code: string;
  fileName: string;
  name: string;
  phone: string;
  email: string;
  contact: string;
  time: string;
  type: string;
  floors: number;
  budget: string;
  siteAddr: string;
  estimate: string;
  /** [mục, nhãn, giá trị] */
  rows: [string, string, string][];
  /** file Word base64 */
  docx: string;
  files: { name: string; type: string; data: string }[];
}

export interface NotifyResult {
  folderUrl?: string;
  docUrl?: string;
}

export interface Notifier {
  send(payload: NotifyPayload): Promise<NotifyResult>;
}

const TIMEOUT_MS = 30_000;

export class AppsScriptNotifier implements Notifier {
  constructor(private url: string | undefined) {}

  async send(payload: NotifyPayload): Promise<NotifyResult> {
    if (!this.url) throw new Error('Chưa cấu hình VITE_NOTIFY_URL');
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      // text/plain để tránh preflight CORS với Apps Script
      const res = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
        redirect: 'follow'
      });
      if (!res.ok) throw new Error('Apps Script trả lỗi HTTP ' + res.status);
      const data = (await res.json()) as { ok?: boolean; error?: string; folderUrl?: string; docUrl?: string };
      if (!data.ok) throw new Error(data.error || 'Apps Script báo lỗi');
      return { folderUrl: data.folderUrl, docUrl: data.docUrl };
    } catch (e) {
      if ((e as Error).name === 'AbortError') throw new Error('Quá 30 giây không phản hồi');
      throw e;
    } finally {
      clearTimeout(timer);
    }
  }
}

export const notifier: Notifier = new AppsScriptNotifier(import.meta.env.VITE_NOTIFY_URL);
