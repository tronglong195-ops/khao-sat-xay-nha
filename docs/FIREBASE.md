# FIREBASE — cấu trúc dữ liệu, bảo mật, gói cước

## Gói cước (kiểm tra 10/2026)
- **Phương án A — mặc định, gói Spark (miễn phí, không cần thẻ):** Firestore + Authentication + Hosting tĩnh trên GitHub Pages. Email và lưu file Word/ảnh dùng **Apps Script + Google Drive** (`reference/apps-script/Code.gs`).
  - Hạn mức Firestore Spark: 1 GiB lưu trữ, 50.000 lượt đọc/ngày, 20.000 lượt ghi/ngày — dư sức cho form khảo sát.
  - Gmail cá nhân qua Apps Script: 100 người nhận/ngày (mỗi khách tốn 2 nếu gửi bản sao cho khách).
- **Phương án B — gói Blaze (gắn thẻ, dùng ít vẫn 0đ):** Cloud Storage for Firebase (lưu Word/ảnh) + Cloud Functions trigger `onDocumentCreated('leads/{id}')` gửi mail bằng Nodemailer (Gmail App Password hoặc SMTP doanh nghiệp) hoặc extension *Trigger Email from Firestore*.
  - Lưu ý: Cloud Storage for Firebase **không còn trên Spark từ 02/02/2026**; mọi Firebase Extension đều yêu cầu Blaze.
  - Nếu chọn B: đặt Budget alert 50.000đ trong Google Cloud Billing.

> Claude Code: triển khai Phương án A. Viết `services/notify.ts` theo interface để sau này đổi sang B không phải sửa UI.

## Firestore

### Collection `leads/{leadId}`
```ts
{
  code: string,                 // KH-YYMMDD-xxx[-XXXX]
  createdAt: Timestamp,         // serverTimestamp()
  status: 'moi'|'da_lien_he'|'hen_khao_sat'|'da_khao_sat'|'bao_gia'|'ky_hd'|'tu_choi',
  // tóm tắt để lọc/hiển thị danh sách
  name: string, phone: string, email: string, contact: string, time: string,
  type: string, floors: number, budget: string, pkg: string,
  siteAddr: string, estimateText: string, estimateTy: number|null,
  fengShui: { yearText: string, cung: string, group: string, verdict: string } | null,
  // dữ liệu đầy đủ
  form: FormState (không gồm files),     // để sinh lại Word
  sections: { title: string, rows: { k: string, v: string }[] }[],
  fileNames: string[],
  notify: { status: 'sent'|'failed', folderUrl?: string, docUrl?: string, error?: string },
  source: { userAgent: string, referrer: string, appVersion: string },
  // chỉ admin ghi
  adminNote?: string,
  statusLog?: { status: string, at: Timestamp, by: string }[],
  updatedAt?: Timestamp
}
```
Kích thước 1 bản ghi ~ 20–40 KB (giới hạn Firestore 1 MiB).

### Collection `config/admins`
`{ emails: ['tronglong195@gmail.com', ...] }` — chỉ sửa trên Console.

### `firestore.rules` (khung — Claude Code hoàn thiện và test bằng Emulator)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.token.email_verified == true
        && request.auth.token.email in get(/databases/$(db)/documents/config/admins).data.emails;
    }
    match /leads/{id} {
      allow create: if request.resource.data.keys().hasOnly([
          'code','createdAt','status','name','phone','email','contact','time','type','floors','budget','pkg',
          'siteAddr','estimateText','estimateTy','fengShui','form','sections','fileNames','notify','source'])
        && request.resource.data.status == 'moi'
        && request.resource.data.createdAt == request.time
        && request.resource.data.name is string && request.resource.data.name.size() > 0 && request.resource.data.name.size() < 120
        && request.resource.data.phone is string && request.resource.data.phone.matches('^(0|\\+84)[0-9]{9,10}$')
        && request.resource.data.notify.status in ['sent','failed'];
      allow read, update, delete: if isAdmin();
    }
    match /config/{doc} { allow read: if isAdmin(); allow write: if false; }
  }
}
```
Index: `leads` theo `status ASC, createdAt DESC`.

## Authentication
- Bật **Google** provider.
- Authorized domains: thêm `<github-user>.github.io` (và tên miền riêng nếu có).

## App Check (chống spam bot)
- Bật App Check với **reCAPTCHA v3** (site key cho domain GitHub Pages) → bật Enforce cho Firestore sau khi thử ổn.
- Dev: dùng debug token (`self.FIREBASE_APPCHECK_DEBUG_TOKEN = true` chỉ khi `import.meta.env.DEV`).

## Biến môi trường (Vite)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_RECAPTCHA_V3_SITE_KEY=
VITE_NOTIFY_URL=            # link Apps Script .../exec
```
Firebase web config **không phải bí mật** (bảo vệ bằng Rules + App Check) nhưng vẫn để ở GitHub Repository Variables cho gọn, không hard-code.

## Apps Script (Phương án A)
`reference/apps-script/Code.gs` — dán vào Google Sheet → Apps Script, chạy `kiemTraCapQuyen` một lần, Triển khai → Ứng dụng web (Thực thi: Tôi; Truy cập: Bất kỳ ai). Trả về `{ ok, code, folderUrl, docUrl }`. Có cờ `GHI_SHEET` để tắt ghi Google Sheet khi đã có Firestore.
