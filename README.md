# Phiếu khảo sát nhu cầu xây nhà

Web công khai để chủ nhà điền phiếu thông tin thiết kế nhà phố/biệt thự (7 bước): tính phong thủy tuổi gia chủ, dự toán sơ bộ, xem trước và tải phiếu Word, gửi về email kỹ sư (Apps Script + Google Drive) và lưu hồ sơ vào Firestore. Trang quản trị `/#/admin` quản lý khách như một CRM nhỏ.

React 18 + TypeScript + Vite · Firebase (Firestore, Auth Google, App Check) · `docx` · GitHub Pages.

- Form khách: `https://tronglong195-ops.github.io/khao-sat-xay-nha/`
- Quản trị: `https://tronglong195-ops.github.io/khao-sat-xay-nha/#/admin`

## Lệnh

```bash
npm install
npm run dev          # chạy máy cá nhân: http://localhost:5173/khao-sat-xay-nha/
npm test             # unit test (toàn bộ docs/TEST_CASES.md)
npm run test:e2e     # Playwright (Windows dùng Microsoft Edge có sẵn)
npm run test:rules   # test Firestore rules bằng Emulator (cần Java 21; thư mục chứa repo không được có dấu tiếng Việt — CI trên GitHub luôn chạy bước này)
npm run build        # build vào dist/
```

## Thay thông tin công ty, đơn giá

- Tên công ty, hotline, địa chỉ: `src/config/company.ts` (điền `hotlineDigits` để bật nút gọi / “Chat Zalo với kỹ sư”). Tiêu đề trang: `index.html`.
- Đơn giá tham khảo (triệu/m²): `src/config/pricing.ts`.
- Nghiệp vụ (phong thủy, mật độ, dự toán, nội dung phiếu): `src/domain/` — port nguyên văn từ `reference/logic/form-logic.js`.

## Cài đặt lần đầu (chủ dự án làm)

### 1. GitHub
1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Secrets and variables → Actions → tab **Variables**: thêm `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_RECAPTCHA_V3_SITE_KEY` (nếu dùng App Check), `VITE_NOTIFY_URL` (link Apps Script `/exec`).
3. Actions → “Deploy to GitHub Pages” → **Run workflow** (hoặc push lên `main`).

### 2. Firebase (gói Spark miễn phí)
1. Tạo project → thêm Web app → copy config vào các biến ở trên.
2. Firestore: tạo database (`asia-southeast1`), chế độ production.
3. Authentication → Sign-in method → **Google** → Enable. Settings → Authorized domains → thêm `tronglong195-ops.github.io`.
4. Firestore → tạo document `config/admins` với trường `emails` (kiểu array) = `["tronglong195@gmail.com"]`.
5. Đẩy rules + index:
   ```bash
   npx firebase-tools login
   ```
   ```bash
   npx firebase-tools deploy --only firestore:rules,firestore:indexes --project <project-id>
   ```
6. (Tùy chọn) App Check: đăng ký reCAPTCHA v3 cho domain GitHub Pages, dán site key vào `VITE_RECAPTCHA_V3_SITE_KEY`, chạy thử ổn rồi bật Enforce cho Firestore.

### 3. Apps Script (email + lưu Drive)
Dán `reference/apps-script/Code.gs` vào Google Sheet → Tiện ích mở rộng → Apps Script, sửa phần CẤU HÌNH (tên công ty, hotline, `ADMIN_URL`), chạy `kiemTraCapQuyen` một lần, rồi Triển khai → Ứng dụng web (Thực thi: Tôi · Truy cập: Bất kỳ ai). Copy link `/exec` vào biến `VITE_NOTIFY_URL`.

## Luồng gửi
Tạo Word → gọi Apps Script (email kèm Word + thư mục Drive) → ghi Firestore `leads/{mã hồ sơ}` kể cả khi Apps Script lỗi (`notify.status = 'failed'`). Thành công khi ít nhất một trong hai nơi nhận được; cả hai lỗi thì giữ form, cho “Thử lại” và tải Word gửi qua Zalo. Mã hồ sơ `KH-YYMMDD-xxx`; trùng mã thì thêm hậu tố 4 ký tự.

Tài liệu gốc: `docs/SPEC.md`, `docs/FIREBASE.md`, `docs/DEPLOY.md`, `docs/TEST_CASES.md`, `docs/BAN_GIAO.md`.
