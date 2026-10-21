# Câu lệnh dán vào Claude Code

> Mở terminal tại thư mục gốc repo (đã giải nén bộ bàn giao), chạy `claude`, rồi dán toàn bộ khối dưới đây.

---

Đọc kỹ `CLAUDE.md`, `docs/SPEC.md`, `docs/FIREBASE.md`, `docs/DEPLOY.md`, `docs/TEST_CASES.md` và thư mục `reference/` trước khi viết code. Mở `reference/prototype/index.html` và các ảnh trong `reference/screenshots/` để nắm giao diện.

Nhiệm vụ: xây dựng web "Phiếu khảo sát nhu cầu xây nhà" bằng **React 18 + TypeScript + Vite + Firebase (Firestore, Auth)**, deploy lên **GitHub Pages** bằng GitHub Actions, đúng đặc tả.

Làm theo thứ tự, mỗi giai đoạn xong thì chạy test, commit và báo tôi ngắn gọn trước khi sang giai đoạn sau:

1. **Khởi tạo**: Vite React TS, ESLint, Vitest, cấu trúc thư mục như `CLAUDE.md`. Đặt `reference/` ngoài thư mục build.
2. **Nghiệp vụ thuần (`src/domain/`)**: port `reference/logic/form-logic.js` sang TypeScript — phong thủy, mật độ QCVN, dự toán, lưu ý kỹ thuật, nội dung phiếu. Viết unit test theo **toàn bộ** `docs/TEST_CASES.md`; tất cả phải pass. Không tự "sửa" công thức.
3. **Form 7 bước (`/`)**: giao diện bám sát bản thiết kế, responsive (390 px không cuộn ngang), lưu nháp vào localStorage, khung kết quả bên phải (phong thủy, dự toán, lưu ý kỹ thuật).
4. **Xem trước + file Word**: màn xem trước A4 và tải `.docx` bằng thư viện `docx` theo `reference/logic/docx-builder.js` (khổ A4, lề 30/20/20/20 mm, Times New Roman).
5. **Gửi**: gọi Apps Script (email + Drive) rồi ghi Firestore theo đúng trình tự trong `docs/SPEC.md` mục 7 — không bao giờ để mất khách.
6. **Trang quản trị (`/#/admin`)**: đăng nhập Google, chỉ email admin; danh sách, lọc trạng thái, chi tiết, tải lại Word, đổi trạng thái, ghi chú nội bộ, xuất CSV.
7. **Firebase**: `firestore.rules`, `firestore.indexes.json`, `firebase.json`; test rules bằng Emulator; hướng dẫn tôi chạy `firebase deploy --only firestore`.
8. **Deploy**: workflow `.github/workflows/deploy.yml`, cấu hình `base` của Vite theo tên repo, HashRouter; push lên GitHub và kiểm tra Pages chạy.

Những thứ cần hỏi tôi khi tới bước tương ứng (đừng tự bịa): Firebase web config, danh sách email admin, link Apps Script `/exec`, tên repo GitHub, tên công ty – hotline – địa chỉ (tạm dùng placeholder `[TÊN CÔNG TY]`…). Không commit bí mật; Firebase web config đưa vào GitHub Repository Variables.

Khi xong: chạy `npm run build`, `npm test`, Playwright e2e (điền form → xem trước → tải Word → gửi với Apps Script giả lập) và báo tôi link GitHub Pages cùng danh sách việc tôi cần tự làm trên Firebase Console.
