import { expect, test, type Page } from '@playwright/test';
import JSZip from 'jszip';
import { readFile } from 'node:fs/promises';

const NOTIFY = 'https://script.google.com/macros/s/E2E/exec';

async function fresh(page: Page) {
  await page.goto('./');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

const next = (page: Page) => page.getByRole('button', { name: 'Tiếp tục →' }).click();
const field = (page: Page, label: string) => page.getByLabel(label, { exact: true });

async function fillBasics(page: Page) {
  await field(page, 'Tên gia chủ (đầy đủ) *').pressSequentially('Nguyễn Văn Thử');
  await expect(field(page, 'Tên gia chủ (đầy đủ) *')).toHaveValue('Nguyễn Văn Thử');
  await field(page, 'Số điện thoại *').fill('0912 345 678');
  await field(page, 'Email').fill('khach@example.com');
  await page.getByPlaceholder('VD: 1985').fill('1985');
  await next(page);
  await field(page, 'Chiều rộng mặt tiền (m)').fill('5');
  await field(page, 'Chiều sâu lô đất (m)').fill('20');
  await page.getByRole('group', { name: 'Hướng nhà' }).getByRole('button', { name: /Đông Nam/ }).click();
}

async function toLastStepAndPreview(page: Page) {
  await page.getByRole('button', { name: /Mặt bằng & gửi/ }).click();
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Xem trước phiếu Word →' }).click();
  await expect(page.getByRole('heading', { name: 'Xem trước phiếu thông tin' })).toBeVisible();
}

test('điền form → xem trước → tải Word → gửi (Apps Script OK)', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await fresh(page);
  await fillBasics(page);

  const side = page.getByRole('complementary', { name: 'Kết quả sơ bộ' });
  await expect(side).toContainText('1985 – Ất Sửu (nam)');
  await expect(side).toContainText('Càn Kim');
  await expect(side).toContainText('Hướng Đông Nam là cung Họa Hại');
  await expect(side).toContainText('≈ 3,71 tỷ');

  await toLastStepAndPreview(page);
  const paper = page.getByRole('article', { name: 'Xem trước phiếu Word' });
  await expect(paper).toContainText('PHIẾU THÔNG TIN THIẾT KẾ NHÀ');
  await expect(paper).toContainText('Nguyễn Văn Thử');
  await expect(paper).toContainText('Đông Nam – cung Họa Hại');
  await expect(paper).toContainText('≈ 3,71 tỷ (đơn giá 7,50 tr/m², tham khảo)');

  const [dl] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Tải file Word (.docx)' }).click()]);
  expect(dl.suggestedFilename()).toMatch(/^Phieu_khao_sat_KH-\d{6}-678\.docx$/);
  const zip = await JSZip.loadAsync(await readFile((await dl.path())!));
  const xml = await zip.file('word/document.xml')!.async('string');
  expect((xml.match(/<w:tbl>/g) || []).length).toBe(8);
  expect(xml).toContain('Nguyễn Văn Thử');

  let body: Record<string, unknown> = {};
  await page.route(NOTIFY, async (route) => {
    body = JSON.parse(route.request().postData() ?? '{}');
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, folderUrl: 'https://drive/x', docUrl: 'https://drive/y' }) });
  });
  await page.getByRole('button', { name: 'Xác nhận & gửi cho kỹ sư' }).click();
  await expect(page.getByText('Đã gửi thành công')).toBeVisible();
  await expect(page.getByRole('main')).toContainText(/Mã hồ sơ của anh\/chị là KH-\d{6}-678/);
  expect(body.name).toBe('Nguyễn Văn Thử');
  expect(String(body.docx).length).toBeGreaterThan(1000);
  expect(Array.isArray(body.rows) && (body.rows as unknown[]).length).toBeGreaterThan(50);
  expect(await page.evaluate(() => localStorage.getItem('khaosat:draft:v1'))).toBeNull();
  expect(errors).toEqual([]);
});

test('Apps Script lỗi 500 và không có Firestore → giữ form, báo lỗi, có nút Thử lại', async ({ page }) => {
  await fresh(page);
  await fillBasics(page);
  await toLastStepAndPreview(page);
  await page.route(NOTIFY, (route) => route.fulfill({ status: 500, body: 'error' }));
  await page.getByRole('button', { name: 'Xác nhận & gửi cho kỹ sư' }).click();
  await expect(page.getByRole('alert')).toContainText('Chưa gửi được phiếu');
  await expect(page.getByRole('button', { name: 'Thử lại' })).toBeVisible();
  await expect(page.getByRole('article', { name: 'Xem trước phiếu Word' })).toBeVisible();
});

test('kiểm tra bắt buộc: thiếu tên/SĐT → báo lỗi và nút về bước có lỗi', async ({ page }) => {
  await fresh(page);
  await page.getByRole('button', { name: /Mặt bằng & gửi/ }).click();
  await page.getByRole('button', { name: 'Xem trước phiếu Word →' }).click();
  await expect(page.getByRole('alert')).toContainText('Vui lòng nhập họ tên và số điện thoại ở bước 1.');
  await page.getByRole('button', { name: 'Về bước có lỗi' }).click();
  await expect(page.getByRole('heading', { name: '1. Thông tin chủ nhà & tuổi làm nhà' })).toBeVisible();
});

test('đổi số tầng và tầng lửng cập nhật khung công năng', async ({ page }) => {
  await fresh(page);
  await page.getByRole('button', { name: /Công năng/ }).first().click();
  const boxes = () => page.locator('.box h4').allTextContents();
  expect(await boxes()).toEqual(['Tầng 1', 'Tầng 2', 'Tầng 3', 'Tầng 4', 'Tum / sân thượng']);
  await page.getByRole('group', { name: 'Số tầng' }).getByRole('button', { name: '2 tầng' }).click();
  expect(await boxes()).toEqual(['Tầng 1', 'Tầng 2', 'Tum / sân thượng']);
  await page.getByRole('group', { name: 'Tầng lửng' }).getByRole('button', { name: 'Có lửng' }).click();
  expect(await boxes()).toEqual(['Tầng 1', 'Tầng lửng', 'Tầng 2', 'Tum / sân thượng']);
});

test('nháp được lưu khi tải lại trang', async ({ page }) => {
  await fresh(page);
  await field(page, 'Tên gia chủ (đầy đủ) *').fill('Trần Thị Nháp');
  await page.waitForTimeout(600);
  await page.reload();
  await expect(field(page, 'Tên gia chủ (đầy đủ) *')).toHaveValue('Trần Thị Nháp');
});

test.describe('mobile 390 px', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test('không cuộn ngang ở mọi bước và màn xem trước', async ({ page }) => {
    await fresh(page);
    await fillBasics(page);
    const sw = () => page.evaluate(() => document.documentElement.scrollWidth);
    for (let i = 0; i < 7; i++) {
      await page.getByRole('navigation', { name: 'Các bước khảo sát' }).getByRole('button').nth(i).click();
      expect(await sw(), 'bước ' + (i + 1)).toBe(390);
    }
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Xem trước phiếu Word →' }).click();
    await expect(page.getByRole('article', { name: 'Xem trước phiếu Word' })).toBeVisible();
    expect(await sw()).toBe(390);
  });
});

test('trang quản trị mở được qua /#/admin', async ({ page }) => {
  await page.goto('./#/admin');
  await expect(page.getByRole('heading', { name: 'Chưa kết nối Firebase' })).toBeVisible();
});
