import { assertFails, assertSucceeds, initializeTestEnvironment, type RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, getDoc, getDocs, collection, serverTimestamp, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';

let env: RulesTestEnvironment;
const ADMIN = 'admin@example.com';

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-khao-sat',
    firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 }
  });
});
afterAll(async () => { await env?.cleanup(); });
beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'config/admins'), { emails: [ADMIN] });
  });
});

const lead = (patch: Record<string, unknown> = {}) => ({
  code: 'KH-261021-678', createdAt: serverTimestamp(), status: 'moi', name: 'Nguyễn Văn Thử', phone: '0912345678',
  email: '', contact: 'Zalo', time: 'Buổi tối', type: 'Nhà phố', floors: 4, budget: '2,5 – 4 tỷ', pkg: 'Trọn gói chìa khóa trao tay',
  siteAddr: '', estimateText: '≈ 3,71 tỷ', estimateTy: 3.713, fengShui: null, form: { name: 'Nguyễn Văn Thử' },
  sections: [1, 2, 3, 4, 5, 6].map((i) => ({ title: 'S' + i, rows: [] })), fileNames: [], notify: { status: 'failed', error: 'x' },
  source: { userAgent: 'test', referrer: '', appVersion: '1.0.0' }, ...patch
});

const anon = () => env.unauthenticatedContext().firestore();
const admin = () => env.authenticatedContext('a1', { email: ADMIN, email_verified: true }).firestore();
const stranger = () => env.authenticatedContext('u1', { email: 'x@example.com', email_verified: true }).firestore();

describe('leads — khách vãng lai', () => {
  it('được tạo hồ sơ hợp lệ', async () => {
    await assertSucceeds(setDoc(doc(anon(), 'leads/KH-261021-678'), lead()));
  });
  it('không đọc / liệt kê được hồ sơ', async () => {
    await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'leads/KH-261021-678'), lead({ createdAt: new Date() })); });
    await assertFails(getDoc(doc(anon(), 'leads/KH-261021-678')));
    await assertFails(getDocs(collection(anon(), 'leads')));
    await assertFails(getDocs(collection(stranger(), 'leads')));
  });
  it('không ghi đè được hồ sơ đã có (mã trùng)', async () => {
    await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'leads/KH-261021-678'), lead({ createdAt: new Date() })); });
    await assertFails(setDoc(doc(anon(), 'leads/KH-261021-678'), lead()));
    await assertSucceeds(setDoc(doc(anon(), 'leads/KH-261021-678-A3F9'), lead({ code: 'KH-261021-678-A3F9' })));
  });
  it('chặn dữ liệu sai', async () => {
    await assertFails(setDoc(doc(anon(), 'leads/KH-261021-678'), lead({ status: 'ky_hd' })));
    await assertFails(setDoc(doc(anon(), 'leads/KH-261021-678'), lead({ phone: '123' })));
    await assertFails(setDoc(doc(anon(), 'leads/KH-261021-678'), lead({ name: '' })));
    await assertFails(setDoc(doc(anon(), 'leads/KH-261021-678'), lead({ createdAt: new Date(2020, 0, 1) })));
    await assertFails(setDoc(doc(anon(), 'leads/KH-261021-678'), lead({ adminNote: 'hack' })));
    await assertFails(setDoc(doc(anon(), 'leads/KH-261021-678'), lead({ notify: { status: 'ok' } })));
    await assertFails(setDoc(doc(anon(), 'leads/KHAC'), lead()));
  });
  it('không đọc được danh sách admin', async () => {
    await assertFails(getDoc(doc(anon(), 'config/admins')));
    await assertFails(getDoc(doc(stranger(), 'config/admins')));
  });
});

describe('leads — quản trị', () => {
  beforeEach(async () => {
    await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'leads/KH-261021-678'), lead({ createdAt: new Date() })); });
  });
  it('admin đọc, liệt kê, đổi trạng thái, ghi chú', async () => {
    await assertSucceeds(getDoc(doc(admin(), 'config/admins')));
    await assertSucceeds(getDocs(collection(admin(), 'leads')));
    await assertSucceeds(updateDoc(doc(admin(), 'leads/KH-261021-678'), { status: 'da_lien_he', adminNote: 'đã gọi', updatedAt: serverTimestamp() }));
  });
  it('admin không sửa được dữ liệu khách', async () => {
    await assertFails(updateDoc(doc(admin(), 'leads/KH-261021-678'), { name: 'Khác' }));
    await assertFails(updateDoc(doc(admin(), 'leads/KH-261021-678'), { status: 'bay_ba' }));
  });
  it('người ngoài không sửa / xóa được', async () => {
    await assertFails(updateDoc(doc(stranger(), 'leads/KH-261021-678'), { status: 'da_lien_he' }));
    await assertFails(deleteDoc(doc(anon(), 'leads/KH-261021-678')));
    await assertSucceeds(deleteDoc(doc(admin(), 'leads/KH-261021-678')));
  });
  it('email chưa xác minh không phải admin', async () => {
    const unverified = env.authenticatedContext('a2', { email: ADMIN, email_verified: false }).firestore();
    await assertFails(getDocs(collection(unverified, 'leads')));
  });
});
