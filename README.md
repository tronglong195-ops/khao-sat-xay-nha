# 🏡 ỨNG DỤNG KHẢO SÁT NHU CẦU XÂY NHÀ & TƯ VẤN THIẾT KẾ KIẾN TRÚC

> **Nền tảng khảo sát nhu cầu xây nhà chuyên nghiệp, tự động tính phong thủy Bát Trạch, dự toán chi phí sơ bộ, gợi ý phối cảnh 3D công trình thực tế tại Việt Nam, xuất hồ sơ Word (.docx) và quản lý khách hàng (CRM).**

[![Deploy to GitHub Pages](https://github.com/tronglong195-ops/khao-sat-xay-nha/actions/workflows/deploy.yml/badge.svg)](https://github.com/tronglong195-ops/khao-sat-xay-nha/actions/workflows/deploy.yml)
[![Tests](https://img.shields.io/badge/Unit%20Tests-83%20passed-brightgreen.svg)](https://github.com/tronglong195-ops/khao-sat-xay-nha)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%7C%20Auth-orange.svg)](https://firebase.google.com/)

---

## 🌐 LINK TRUY CẬP ONLINE

| Phân hệ | Đường dẫn Firebase Hosting (Chính thức) | Đường dẫn GitHub Pages (Dự phòng) | Mô tả |
| :--- | :--- | :--- | :--- |
| 📋 **Khảo sát khách hàng** | **[https://khao-sat-xay-nha.web.app/](https://khao-sat-xay-nha.web.app/)** | [https://tronglong195-ops.github.io/khao-sat-xay-nha/](https://tronglong195-ops.github.io/khao-sat-xay-nha/) | Giao diện 7 bước dành cho gia chủ điền thông tin |
| 🔐 **Quản trị CRM Kỹ sư** | **[https://khao-sat-xay-nha.web.app/#/admin](https://khao-sat-xay-nha.web.app/#/admin)** | [https://tronglong195-ops.github.io/khao-sat-xay-nha/#/admin](https://tronglong195-ops.github.io/khao-sat-xay-nha/#/admin) | Quản lý hồ sơ, lọc trạng thái, ghi chú & tải Word |

---

## ✨ CÁC TÍNH NĂNG NỔI BẬT

### 1. 🧭 Phong thủy Bát Trạch & La bàn số cảm biến điện thoại
- **Thuật toán Bát Trạch chính xác**: Tự động tính Cung phi, Ngũ hành, Nhóm mệnh (Đông Tứ Mệnh / Tây Tứ Mệnh), sao chiếu 8 hướng (Sinh Khí, Thiên Y, Diên Niên, Phục Vị vs Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại).
- **Chuyển đổi Dương lịch ➔ Âm lịch**: Tự động tính ngày/tháng/năm Âm lịch và Can Chi theo thuật toán Hồ Ngọc Đức khi gia chủ chọn ngày sinh.
- **La bàn Vector SVG tương tác 100%**: Co giãn sắc nét trên mọi dòng smartphone.
- **📱 La bàn cảm biến từ trường thực tế**: Bấm *"Bật la bàn cảm biến"*, cầm điện thoại xoay về phía lô đất, kim la bàn sẽ tự động xoay theo thời gian thực và lấy góc độ chính xác (VD: `135° Đông Nam`).

### 2. 🏛️ Slider phối cảnh 3D công trình thực tế tại Việt Nam
- **Nhảy động theo Kiểu công trình (Bước 2)**: 
  - *Nhà phố*: 4 tầng mặt tiền 5m hiện đại tại Hưng Yên, nhà phố 3 tầng có gara tại Thái Nguyên, nhà phố 3 tầng Bình Dương...
  - *Nhà ống*: Nhà ống 3 tầng có gara, nhà ống tân cổ điển Quảng Ninh, nhà ống giếng trời thoáng sáng...
  - *Shophouse*: 5 tầng kinh doanh Hải Phòng, 6 tầng 3 mặt tiền, shophouse thương mại...
  - *Biệt thự*: Biệt thự mái chéo Hà Nội, biệt thự tân cổ điển Phú Mỹ Hưng (TP.HCM)...
  - *Nhà vườn*: Biệt thự vườn mái Thái Đồng Tháp, nhà vườn 2 tầng Vĩnh Phúc, nhà 1 tầng 130m² (3PN)...
  - *Nhà cấp 4*: Mái Thái chữ L nông thôn, nhà cấp 4 hiện đại chống ẩm mốc...
  - *Lâu đài / Dinh thự*: Lâu đài 3 tầng Hà Nội, lâu đài cổ điển Thái Bình, lâu đài Ninh Bình...
- **Nhảy động theo Phong cách kiến trúc (Bước 4)**:
  - 7 phong cách: *Hiện đại*, *Indochine Đông Dương*, *Tân cổ điển*, *Cổ điển / Lâu đài*, *Mái Nhật Wabi-sabi*, *Nhiệt đới Tropical*, *Hiện đại sang trọng Luxury*.
- **Trải nghiệm vuốt chạm 2 bên**: Hỗ trợ vuốt ngang mượt mà trên điện thoại (`scroll-snap`), nút `‹` `›` trên máy tính và thanh chọn góc nhanh.
- **Lưu ý tưởng & Liên kết Pinterest**: Nút *"⭐ Lưu góc này vào ý tưởng"* tự động ghi nhận vào mục mẫu nhà tham khảo; nút *"📌 Xem trên Pinterest ↗"* mở trực tiếp bộ sưu tập từ khóa kiến trúc chuẩn.

### 3. 🧱 Bộ sưu tập vật liệu hoàn thiện thịnh hành (Bước 4)
- Minh họa ứng dụng thực tế 8 dòng vật liệu cao cấp tại Việt Nam: Đá tự nhiên Granite/Marble ốp mặt tiền, Hệ nhôm kính Low-E cản nhiệt, Gỗ nhựa ngoài trời Composite & Lam chắn nắng, Gạch bông gió mỹ thuật, Gạch men khổ lớn 80×80 / 60×120, Trần thạch cao giật cấp LED viền, Lan can kính cường lực 12mm, Đá thạch anh nhân tạo Vicostone...
- Nút bấm *"Chọn vật liệu này"* tự động điền nhanh vào hồ sơ khảo sát.

### 4. 💡 Cẩm nang 220 lưu ý kỹ thuật xây nhà ngẫu nhiên
- Kho 220 mẹo kỹ thuật xây nhà thực chiến chia theo 7 giai đoạn: Pháp lý & móng, kết cấu, chống thấm, điện nước, vật liệu hoàn thiện, hợp đồng thi công...
- Hiển thị ngẫu nhiên theo đúng bước đang làm việc, có nút bấm đổi lưu ý khác và popup tra cứu toàn bộ 220 lưu ý.

### 5. 💰 Dự toán chi phí sơ bộ & Phân rã tự động
- Thanh phân bổ chi phí trực quan: Móng & Phần thô (50-55%), Hoàn thiện cơ bản (30-35%), Thiết bị vệ sinh & chiếu sáng (10-15%).
- Tính toán nhanh diện tích sàn tối đa theo mật độ quy hoạch (QCVN 01:2021/BXD).

### 6. 📄 Xuất hồ sơ biên bản Word (.docx) & Tải ngay
- Sinh tài liệu Word chuyên nghiệp ngay trên trình duyệt với bảng biểu chuẩn ISO, thông tin gia chủ, cung mệnh phong thủy, quy mô, công năng và vật liệu.

### 7. 📤 Hệ thống nộp hồ sơ kép (Dual-Pipeline Submission)
- **Kênh 1**: Lưu trữ hồ sơ vào Cloud Firestore với bảo mật theo Firestore Security Rules.
- **Kênh 2**: Gửi email tự động kèm file Word đính kèm và lưu trữ file lên Google Drive thông qua Google Apps Script.
- **Kênh 3**: Tự động bắn thông báo tức thì về Telegram Bot của kỹ sư quản lý.
- **Chia sẻ Zalo & Mã QR**: Tự động tạo mã QR quét hồ sơ và nút chia sẻ trực tiếp sang Zalo.

---

## 🛠️ HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

### Yêu cầu môi trường
- **Node.js**: Phiên bản 18 trở lên (khuyên dùng Node.js 20 hoặc 22 LTS).
- **Trình duyệt**: Chrome, Edge, Safari, Firefox phiên bản mới nhất.

### 1. Cài đặt thư viện
```bash
git clone https://github.com/tronglong195-ops/khao-sat-xay-nha.git
cd khao-sat-xay-nha
npm install
```

### 2. Chạy môi trường phát triển (Local Dev)
```bash
npm run dev
```
Truy cập tại: `http://localhost:5173/khao-sat-xay-nha/`

### 3. Kiểm thử tự động (Testing & Linting)
```bash
npm test             # Chạy toàn bộ 83 unit tests (Vitest)
npm run lint         # Kiểm tra chuẩn cú pháp ESLint
npm run test:e2e     # Kiểm thử luồng End-to-End (Playwright)
```

### 4. Biên dịch đóng gói sản phẩm (Production Build)
```bash
npm run build
```
Mã nguồn sau khi biên dịch nằm trong thư mục `dist/`.

---

## ⚙️ CẤU HÌNH HỆ THỐNG

| Tệp tin cấu hình | Mục đích |
| :--- | :--- |
| `src/config/company.ts` | Tên công ty, thương hiệu, hotline, hotline hiển thị, Zalo, địa chỉ |
| `src/config/pricing.ts` | Đơn giá xây thô, hoàn thiện cơ bản, hoàn thiện cao cấp (triệu/m²) |
| `src/domain/fengshui.ts` | Bát trạch, ngũ hành, can chi, tam tai, hoang ốc, kim lâu |
| `src/domain/buildingPerspectives.ts` | Dữ liệu hình ảnh phối cảnh 3D các công trình thực tế Việt Nam |
| `src/domain/stylePerspectives.ts` | Dữ liệu hình ảnh phối cảnh 3D theo 7 phong cách kiến trúc |
| `src/domain/materialShowcase.ts` | Dữ liệu 8 loại vật liệu hoàn thiện thịnh hành |
| `src/domain/constructionTips.ts` | Thư viện 220 lưu ý kỹ thuật xây nhà thực chiến |
| `reference/apps-script/Code.gs` | Kịch bản Google Apps Script gửi email, lưu Drive & Telegram Bot |

---

## 🚀 QUY TRÌNH DEPLOY LÊN GITHUB PAGES

Dự án được cấu hình sẵn **GitHub Actions CI/CD** tự động hóa hoàn toàn:
1. Mỗi khi có lệnh `git push origin main`, workflow `.github/workflows/deploy.yml` sẽ tự động:
   - Cài đặt dependencies (`npm ci`).
   - Kiểm tra linter (`npm run lint`).
   - Chạy 83 unit test (`npm test -- --run`).
   - Biên dịch dự án (`npm run build`).
   - Đẩy thư mục `dist/` sang nhánh `gh-pages`.
2. Trang web sẽ tự động cập nhật online tại:  
   👉 **[https://tronglong195-ops.github.io/khao-sat-xay-nha/](https://tronglong195-ops.github.io/khao-sat-xay-nha/)**

---

## 👨‍💻 BẢN QUYỀN & THÔNG TIN LIÊN HỆ

- **Đơn vị phát triển**: DS DESIGN
- **Hotline / Zalo**: `0900 000 000`
- **Địa chỉ**: Hà Nội, Việt Nam
- **Website**: [https://tronglong195-ops.github.io/khao-sat-xay-nha/](https://tronglong195-ops.github.io/khao-sat-xay-nha/)
