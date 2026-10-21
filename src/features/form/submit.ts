// Luồng gửi: tạo Word → Apps Script (email + Drive) → Firestore. Thành công nếu ít nhất một nơi nhận được.
import { calcEstimate } from '../../domain/estimate';
import { calcFS } from '../../domain/fengshui';
import { normalizePhone } from '../../domain/validate';
import type { FormDocument, FormState } from '../../domain/types';
import { encodeFiles } from '../../services/files';
import { notifier, type NotifyResult } from '../../services/notify';

export interface SubmitResult {
  ok: boolean;
  code: string;
  notifyOk: boolean;
  savedOk: boolean;
  error?: string;
}

const errMsg = (e: unknown) => (e instanceof Error ? e.message : String(e));

export async function makeDocxBlob(doc: FormDocument, ownerName: string): Promise<Blob> {
  const m = await import('../../docx/buildDocx');
  return m.docxToBlob(m.buildDocx(doc, ownerName));
}

export async function submitLead(form: FormState, doc: FormDocument, files: File[]): Promise<SubmitResult> {
  const m = await import('../../docx/buildDocx');
  const docx = await m.docxToBase64(m.buildDocx(doc, form.name));
  const encoded = await encodeFiles(files);
  const est = calcEstimate(form);
  const fs = calcFS(form.year, form.gender, form.buildYear);
  const estimateText = est.hasLot ? est.totalText : '';

  let notifyRes: NotifyResult | null = null;
  let notifyErr = '';
  try {
    notifyRes = await notifier.send({
      code: doc.code, fileName: doc.fileName, name: form.name, phone: form.phone, email: form.email,
      contact: form.contact, time: form.time, type: form.type, floors: form.floors, budget: form.budget,
      siteAddr: form.siteAddr, estimate: estimateText,
      rows: doc.sections.flatMap((s) => s.rows.map((r): [string, string, string] => [s.title, r.k, r.v])),
      docx, files: encoded
    });
  } catch (e) {
    notifyErr = errMsg(e);
  }

  let code = doc.code;
  let savedOk = false;
  let saveErr = '';
  try {
    const { createLead } = await import('../../services/leads');
    code = await createLead({
      code: doc.code,
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      email: form.email.trim(),
      contact: form.contact, time: form.time, type: form.type, floors: form.floors,
      budget: form.budget, pkg: form.pkg, siteAddr: form.siteAddr,
      estimateText, estimateTy: est.hasLot ? Math.round(est.totalTy * 1000) / 1000 : null,
      fengShui: fs ? { yearText: fs.yearText, cung: fs.cungText, group: fs.group, verdict: fs.verdict } : null,
      form, sections: doc.sections, fileNames: files.map((f) => f.name),
      notify: notifyRes
        ? { status: 'sent', ...(notifyRes.folderUrl ? { folderUrl: notifyRes.folderUrl } : {}), ...(notifyRes.docUrl ? { docUrl: notifyRes.docUrl } : {}) }
        : { status: 'failed', error: notifyErr.slice(0, 500) },
      source: { userAgent: navigator.userAgent.slice(0, 300), referrer: document.referrer.slice(0, 300), appVersion: __APP_VERSION__ }
    });
    savedOk = true;
  } catch (e) {
    saveErr = errMsg(e);
  }

  const notifyOk = notifyRes !== null;
  return {
    ok: notifyOk || savedOk, code, notifyOk, savedOk,
    error: notifyOk || savedOk ? undefined : 'Email: ' + notifyErr + ' · Lưu hồ sơ: ' + saveErr
  };
}
