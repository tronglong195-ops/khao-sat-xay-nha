import {
  arrayUnion, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc
} from 'firebase/firestore';
import type { DocSection, FormState, LeadStatus } from '../domain/types';
import { db } from './firebase';

export interface LeadNotify {
  status: 'sent' | 'failed';
  folderUrl?: string;
  docUrl?: string;
  error?: string;
}

export interface LeadInput {
  code: string;
  name: string;
  phone: string;
  email: string;
  contact: string;
  time: string;
  type: string;
  floors: number;
  budget: string;
  pkg: string;
  siteAddr: string;
  estimateText: string;
  estimateTy: number | null;
  fengShui: { yearText: string; cung: string; group: string; verdict: string } | null;
  form: FormState;
  sections: DocSection[];
  fileNames: string[];
  notify: LeadNotify;
  source: { userAgent: string; referrer: string; appVersion: string };
}

export interface Lead extends LeadInput {
  id: string;
  createdAt: Timestamp | null;
  status: LeadStatus;
  adminNote?: string;
  statusLog?: { status: LeadStatus; at: Timestamp; by: string }[];
  updatedAt?: Timestamp;
}

const randSuffix = () => Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, '0');

/**
 * Ghi hồ sơ mới vào leads/{mã hồ sơ}. Khách không đọc được leads nên nếu mã đã tồn tại,
 * lệnh ghi bị từ chối (rules coi là update) → thử lại với hậu tố 4 ký tự ngẫu nhiên.
 * Trả về mã hồ sơ thực tế đã lưu.
 */
export async function createLead(input: LeadInput): Promise<string> {
  let code = input.code;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await setDoc(doc(db(), 'leads', code), { ...input, code, status: 'moi', createdAt: serverTimestamp() });
      return code;
    } catch (e) {
      if ((e as { code?: string }).code !== 'permission-denied' || attempt === 2) throw e;
      code = input.code + '-' + randSuffix();
    }
  }
  return code;
}

export interface AdminCheckResult {
  ok: boolean;
  code?: string;
  message?: string;
  emails?: string[];
}

export async function checkAdminDetails(email: string | null | undefined): Promise<AdminCheckResult> {
  if (!email) return { ok: false, message: 'Chưa có email tài khoản đăng nhập.' };
  try {
    const snap = await getDoc(doc(db(), 'config', 'admins'));
    if (!snap.exists()) {
      return {
        ok: false,
        code: 'not-found',
        message: 'Chưa tìm thấy document "config/admins" trong Cloud Firestore.'
      };
    }
    const rawEmails = (snap.data()?.emails ?? []) as string[];
    const normalized = rawEmails.map((e) => String(e).toLowerCase().trim());
    if (normalized.includes(email.toLowerCase().trim())) {
      return { ok: true, emails: rawEmails };
    }
    return {
      ok: false,
      code: 'not-in-list',
      message: `Email "${email}" chưa nằm trong mảng emails của document "config/admins".`,
      emails: rawEmails
    };
  } catch (err) {
    const code = (err as { code?: string })?.code || 'unknown';
    return {
      ok: false,
      code,
      message: `Không thể kiểm tra quyền quản trị từ Firestore (${code}): ${(err as Error)?.message || String(err)}`
    };
  }
}

export async function isAdmin(email: string | null | undefined): Promise<boolean> {
  const res = await checkAdminDetails(email);
  return res.ok;
}

export async function listLeads(max = 1000): Promise<Lead[]> {
  const snap = await getDocs(query(collection(db(), 'leads'), orderBy('createdAt', 'desc'), limit(max)));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Lead, 'id'>) }));
}

export async function updateLeadStatus(id: string, status: LeadStatus, by: string): Promise<void> {
  await updateDoc(doc(db(), 'leads', id), {
    status,
    statusLog: arrayUnion({ status, at: Timestamp.now(), by }),
    updatedAt: serverTimestamp()
  });
}

export async function updateLeadNote(id: string, adminNote: string): Promise<void> {
  await updateDoc(doc(db(), 'leads', id), { adminNote, updatedAt: serverTimestamp() });
}
