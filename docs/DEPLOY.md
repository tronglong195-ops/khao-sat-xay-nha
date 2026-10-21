# DEPLOY — GitHub + GitHub Pages

## Repo
- Tên đề xuất: `khao-sat-xay-nha` (chủ dự án xác nhận). Nhánh chính `main`.
- `.gitignore`: `node_modules`, `dist`, `.env*` (trừ `.env.example`), `.firebase`, `firebase-debug.log`.
- Giữ thư mục `reference/` trong repo (tài liệu), loại khỏi build và lint.

## Vite
```ts
// vite.config.ts
export default defineConfig({
  base: '/khao-sat-xay-nha/',     // = '/<tên-repo>/' ; nếu dùng tên miền riêng thì '/'
  plugins: [react()],
  build: { sourcemap: false }
});
```
Router: `HashRouter` (`/#/` và `/#/admin`) để F5 không 404 trên GitHub Pages.

## GitHub Actions — `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm test -- --run
      - run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ vars.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ vars.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ vars.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ vars.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ vars.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ vars.VITE_FIREBASE_APP_ID }}
          VITE_RECAPTCHA_V3_SITE_KEY: ${{ vars.VITE_RECAPTCHA_V3_SITE_KEY }}
          VITE_NOTIFY_URL: ${{ vars.VITE_NOTIFY_URL }}
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
(Claude Code: kiểm tra phiên bản action mới nhất ổn định trước khi dùng.)

## Việc chủ dự án tự làm trên GitHub
1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Secrets and variables → Actions → **Variables**: thêm các `VITE_*` ở trên.
3. (Tùy chọn) Settings → Pages → Custom domain, ví dụ `khaosat.tencongty.vn` → đổi `base` thành `/` và thêm domain vào Firebase Authorized domains + reCAPTCHA.

## Việc chủ dự án tự làm trên Firebase
1. Tạo project, thêm Web app, copy config.
2. Firestore: tạo database (vị trí `asia-southeast1` – Singapore), chế độ production.
3. Authentication → Google → Enable; Authorized domains thêm `<github-user>.github.io`.
4. Tạo document `config/admins` với `emails: [...]`.
5. Cài Firebase CLI, `firebase login`, `firebase deploy --only firestore:rules,firestore:indexes` (Claude Code hướng dẫn/chạy cùng).
6. App Check: đăng ký reCAPTCHA v3 cho domain, dán site key vào biến `VITE_RECAPTCHA_V3_SITE_KEY`.

## Sau khi lên mạng
- Gửi 1 phiếu thử → kiểm tra email, Drive, Firestore, trang admin.
- Tạo mã QR trỏ tới link Pages để in lên danh thiếp, biển công trình.
