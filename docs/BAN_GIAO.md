# Bộ bàn giao: Web khảo sát nhu cầu xây nhà (React + Firebase + GitHub Pages)

Bộ này dùng để giao cho **Claude Code** viết lại toàn bộ web form khảo sát khách hàng (thiết kế – thi công nhà phố, biệt thự trọn gói) bằng **React + Firebase**, đẩy lên **GitHub** và chạy trên **GitHub Pages**.

Mọi nghiệp vụ đã được chạy thử trong bản mẫu (`reference/prototype/index.html`): form 7 bước, phong thủy, dự toán, xem trước và tạo file Word, gửi email. Claude Code chỉ cần **dựng lại cho chuẩn, có cơ sở dữ liệu và trang quản trị**, không phải nghĩ lại nghiệp vụ.

## Trong bộ có gì

| File | Dùng để |
|---|---|
| `PROMPT_CLAUDE_CODE.md` | **Câu lệnh dán vào Claude Code** để bắt đầu |
| `CLAUDE.md` | Quy tắc dự án — Claude Code tự đọc mỗi phiên |
| `docs/SPEC.md` | Đặc tả chức năng: 7 bước, từng trường, logic, phiếu Word, trang quản trị, tiêu chí nghiệm thu |
| `docs/FIREBASE.md` | Cấu trúc Firestore, Security Rules, đăng nhập admin, App Check, gói cước |
| `docs/DEPLOY.md` | GitHub Actions → GitHub Pages, biến môi trường |
| `docs/TEST_CASES.md` | Các ca kiểm tra bắt buộc (phong thủy, dự toán…) có đáp số |
| `reference/design/Main.dc.html` | Bản thiết kế gốc trên canvas (giao diện + logic) |
| `reference/prototype/index.html` | Bản mẫu chạy được — mở trực tiếp bằng trình duyệt để xem |
| `reference/logic/form-logic.js` | **Nguồn chuẩn của nghiệp vụ** (phong thủy, mật độ, dự toán, nội dung phiếu) |
| `reference/logic/docx-builder.js` | Bộ tạo file Word A4 đã chạy đúng |
| `reference/apps-script/Code.gs` | Apps Script gửi email kèm Word + lưu Drive (miễn phí) |
| `reference/samples/Mau_Phieu_khao_sat.docx` | File Word mẫu đầu ra |
| `reference/screenshots/*.png` | Ảnh chụp giao diện desktop, mobile, xem trước, gửi thành công |

## Cách dùng (khoảng 15 phút chuẩn bị)

1. **Tạo repo GitHub** (ví dụ `khao-sat-xay-nha`), clone về máy.
2. **Giải nén bộ này vào thư mục gốc repo** (để `CLAUDE.md` nằm ở gốc).
3. **Tạo dự án Firebase** tại console.firebase.google.com → bật **Firestore** và **Authentication → Google**. Xem `docs/FIREBASE.md`.
4. Mở terminal tại thư mục repo, chạy `claude`, dán nội dung `PROMPT_CLAUDE_CODE.md`.
5. Khi Claude Code hỏi: cung cấp Firebase config (Project settings → Your apps → Web app), email admin, link Apps Script `/exec`.
6. Claude Code sẽ code, chạy test, đẩy lên GitHub; GitHub Actions tự build và đăng lên Pages.

## Quyết định kiến trúc đã chốt (đọc trước khi chạy)

- **Không cần thẻ thanh toán (gói Spark miễn phí)** — mặc định:
  Firestore lưu hồ sơ khách + trang quản trị; file Word tạo ngay trên trình duyệt; **email + lưu ảnh/Word vào Google Drive do Apps Script đảm nhiệm** (miễn phí, đã có sẵn).
- **Lý do không dùng Firebase Storage / Cloud Functions / Trigger Email:** các dịch vụ này đòi gói **Blaze** (gắn thẻ thanh toán). Cloud Storage for Firebase không còn trên gói Spark từ 02/02/2026; extension Trigger Email bắt buộc Blaze. Blaze vẫn có hạn mức miễn phí (dùng ít thì hóa đơn 0đ) — nếu sau này muốn gom hết về Firebase, `docs/FIREBASE.md` mục "Phương án B" đã mô tả sẵn.
- **GitHub Pages là web tĩnh** → không có server; mọi bí mật (mật khẩu email, token) **không được** nằm trong code React.
