# CLAUDE.md — Web khảo sát nhu cầu xây nhà

## Mục tiêu
Web công khai để khách hàng (chủ nhà) điền phiếu thông tin thiết kế nhà phố/biệt thự; hệ thống tính phong thủy tuổi gia chủ và dự toán sơ bộ, tạo phiếu Word, gửi về email kỹ sư, lưu hồ sơ vào Firestore để quản lý như một CRM nhỏ. Chủ dự án là kỹ sư xây dựng tại Việt Nam — toàn bộ giao diện, nội dung, file Word **bằng tiếng Việt**.

## Công nghệ (cố định)
- React 18 + TypeScript (strict) + Vite
- Firebase JS SDK modular (v10+/v11): Firestore, Auth (Google), App Check (reCAPTCHA v3)
- `docx` (tạo .docx phía trình duyệt), `react-router-dom` với **HashRouter** (GitHub Pages không hỗ trợ SPA fallback)
- CSS: CSS Modules hoặc 1 file token + component CSS. **Không** dùng Tailwind/UI kit nặng; giữ đúng thiết kế trong `reference/`
- Test: Vitest (unit), Playwright (e2e), Firebase Emulator (rules)
- Deploy: GitHub Actions → GitHub Pages

## Cấu trúc thư mục đề xuất
```
src/
  domain/            # nghiệp vụ thuần, KHÔNG import React/Firebase
    fengshui.ts      # can chi, nạp âm, cung phi, bát trạch, Kim Lâu/Hoang Ốc/Tam Tai
    density.ts       # mật độ XD tối đa (QCVN 01:2021/BXD, nội suy)
    estimate.ts      # diện tích tính tiền + dự toán + so ngân sách
    techNotes.ts     # lưu ý kỹ thuật tự động
    document.ts      # dựng nội dung phiếu (sections I–VI) từ FormState
    options.ts       # toàn bộ danh sách lựa chọn + giá trị mặc định
    types.ts         # FormState, Lead, ...
  docx/buildDocx.ts  # FormDocument -> Document (docx)
  services/
    firebase.ts      # init app, db, auth, appCheck
    leads.ts         # createLead, listLeads, updateLead
    notify.ts        # gọi Apps Script (email + Drive)
  features/form/     # 7 bước, Stepper, Sidebar kết quả, Preview, Success
  features/admin/    # Login, LeadList, LeadDetail, CSV export
  components/        # Chip, ChipGroup, MultiChipGroup, Counter, Field, Card, Note...
  styles/tokens.css
tests/e2e/
reference/           # tài liệu tham chiếu — không import vào app, không build
```

## Nguồn chuẩn nghiệp vụ
- `reference/logic/form-logic.js` là **nguồn chuẩn**. Port sang TS giữ nguyên công thức, bảng tra, câu chữ hiển thị. Nếu thấy nghi ngờ sai, **ghi chú và hỏi chủ dự án**, không tự sửa.
- `docs/TEST_CASES.md` phải được biến thành unit test và pass 100%.
- `reference/logic/docx-builder.js` là chuẩn bố cục file Word.

## Quy tắc
- Mọi chuỗi giao diện tiếng Việt có dấu, giữ nguyên câu chữ trong bản mẫu trừ khi được yêu cầu.
- Placeholder công ty: `[TÊN CÔNG TY]`, `[SỐ ĐIỆN THOẠI]`, `[ĐỊA CHỈ VĂN PHÒNG]` → gom vào `src/config/company.ts` để thay 1 chỗ.
- Đơn giá tham khảo (triệu/m²) gom vào `src/config/pricing.ts`: thô 4.2, trọn gói cơ bản 6.3, khá 7.5, cao cấp 9.5, thiết kế 0.18.
- Không commit bí mật. Firebase web config đọc từ `import.meta.env.VITE_FIREBASE_*`. Link Apps Script: `VITE_NOTIFY_URL`.
- Truy cập: chạm ≥ 44 px, `<button>`/`<label>` thật, `aria-pressed` cho chip, tương phản ≥ 4.5:1, không cuộn ngang ở 390 px.
- Không emoji trong giao diện (email do Apps Script thì được).
- Commit nhỏ, thông điệp tiếng Việt hoặc tiếng Anh rõ ràng; không force-push nhánh main.

## Lệnh
- `npm run dev` — chạy local
- `npm test` — Vitest
- `npm run test:e2e` — Playwright
- `npm run build` — build vào `dist/`
- `firebase emulators:start --only firestore,auth` — test rules
- `firebase deploy --only firestore:rules,firestore:indexes`

## Định nghĩa "xong"
Build sạch, test pass, e2e pass, Lighthouse mobile ≥ 90 (Performance/Accessibility), rules đã test bằng emulator, GitHub Pages chạy được form và `/#/admin`.
