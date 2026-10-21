# ĐẶC TẢ CHỨC NĂNG — Web khảo sát nhu cầu xây nhà

Phiên bản 1.0 · Nguồn: bản thiết kế canvas + phiếu giấy "FILE THÔNG TIN THIẾT KẾ NHÀ" của chủ dự án.
Bản mẫu chạy được: `reference/prototype/index.html`. Nguồn chuẩn nghiệp vụ: `reference/logic/form-logic.js`.

---

## 1. Tổng quan

| Trang | Đường dẫn | Ai dùng |
|---|---|---|
| Form khảo sát 7 bước + xem trước + gửi | `/#/` | Khách hàng (công khai, không đăng nhập) |
| Trang quản trị hồ sơ khách | `/#/admin` | Kỹ sư/admin (đăng nhập Google, whitelist email) |

Bố cục form (desktop ≥ 1024 px): Header tối → Hero → thanh 7 bước (stepper) → 2 cột: **thẻ form chính** (trái, co giãn) + **cột kết quả** (phải, ~340 px: Phong thủy gia chủ, Dự toán sơ bộ, Lưu ý kỹ thuật, Sau khi gửi thông tin) → footer. Mobile: xếp dọc, stepper xuống dòng, cột kết quả nằm dưới form.

### Hệ màu & chữ (token)
| Token | Giá trị | Dùng |
|---|---|---|
| `--bg` | `#F3F1EC` | nền trang |
| `--surface` | `#FFFFFF` | thẻ |
| `--ink` | `#1B1F1D` | chữ chính, header |
| `--muted` | `#5A625E` | chữ phụ |
| `--line` | `#DAD6CE` / `#E2DED6` / `#EEEBE5` | viền |
| `--accent` | `#1E5A4C` | chip chọn, nút chính, nhấn |
| `--accent-soft` | `#E3EEE9` | nền ghi chú tốt |
| `--warn` | `#8A3F0C` trên `#FBEDE2` | ghi chú cảnh báo |
| Font | **Be Vietnam Pro** 400/500/600/700 (Google Fonts) | giao diện |
| Font phiếu Word/xem trước | Times New Roman | phiếu |

Thành phần: Chip chọn 1 (`aria-pressed`, bo tròn 999px, chọn = nền accent chữ trắng, có dòng phụ nhỏ tùy chọn), Chip chọn nhiều, Counter (− số +, nút 44×44), Field (label + input), Card, Note (good/bad), StyleCard (dải 4 màu + tên + mô tả), FloorBox (công năng từng tầng).

---

## 2. Trạng thái form (FormState) & giá trị mặc định

Lưu nháp tự động vào `localStorage` (key `khaosat:draft:v1`, bọc try/catch), có nút "Xóa nháp, điền lại" ở cuối form. Không lưu `files` (File object).

```ts
step: 0..6
// Bước 1
name, phone, zalo, email, addr: string = ''
dob: string (yyyy-mm-dd) = ''
concerns: string[] = []
year: string = ''            // năm sinh ÂM LỊCH gia chủ
gender: 'nam'|'nu' = 'nam'
year2: string = ''; gender2: 'nam'|'nu' = 'nu'
buildYear: '2026'|'2027'|'2028' = '2027'
// Bước 2
siteAddr = ''; type = 'Nhà phố'; w = ''; d = ''; road = ''
fronts = '1 mặt tiền'; facing: ''|'B'|'DB'|'D'|'DN'|'N'|'TN'|'T'|'TB' = ''; facingDeg = ''
status = 'Đất trống'; legal: string[] = ['Sổ đỏ / sổ hồng']; permit = 'Cần xin phép – nhờ công ty làm hồ sơ'
// Bước 3
floors: 1..6 = 4; mezz = 'Không lửng'; tum = 'Có tum'; basement = 'Không'; roof = 'Mái bằng BTCT'
sxdIn = ''; sudung = ''; kichthuoc = ''; balc = 'Không đua'; balcDua = ''; cos = '3 bậc'
adults = 2; kids = 2; elders = 0; beds = 4; wcs = 4; cars = 1   // counter 0..20
floorRooms: Record<floorName, string[]> = { 'Tầng 1': ['Phòng khách','Bếp + bàn ăn','WC chung'] }
floorNote: Record<floorName,string> = {}; floorH: Record<floorName,string> = {}
altar = 'Tầng trên cùng'; kitchen = 'Bếp mở liên thông phòng khách'; well = 'Có giếng trời'
business = 'Không'; lift = 'Không'; liftType = 'Kỹ sư đề xuất'; spaces = ['Ban công trồng cây']
// Bước 4
style = 'hien-dai'; colors = ''; refs = ''; materials = ''
doorMain = 'Nhôm hệ'; doorRoom = 'Nhựa lõi thép'; windowT = 'Nhôm hệ'
stair = 'Bản trượt vuông có chiếu nghỉ'; stairDir = 'Kỹ sư đề xuất'; stairW = '1000'
railIn = 'Gỗ – kính'; railOut = 'Inox – kính'
ceil = 'Trần thạch cao'; ceilScope = 'Toàn nhà'; floorMat = 'Sàn gạch'; tile = '800×800 mm'
wallOut = '220 mm'; wallIn = '110 mm'
// Bước 5
soil = 'Đất liền thổ'; found = 'Kỹ sư đề xuất'; neighbor = ''
waterIn = 'Nước máy'; waterPos = ''; waterOut = 'Trước nhà'; drainCos = ''
tank = 'Có – sau nhà'; septic = 'Trong nhà'; pole = 'Trước nhà'
ac = ['Phòng ngủ','Phòng khách']; vrv = 'Không'; solar = 'Để chờ'; cam = 'Camera IP'; gen = 'Không'
sys = ['Chuông cổng','Cáp quang internet + truyền hình','Chống sét']
// Bước 6
budget = '2,5 – 4 tỷ'; pkg = 'Trọn gói chìa khóa trao tay'; level = 'Khá'; start = '3 – 6 tháng'; dongtho = ''
// Bước 7
siteNote = ''; files: File[] (không lưu nháp); contact = 'Zalo'; time = 'Buổi tối'; notes = ''; agree = false
```

---

## 3. Các bước & trường (đúng thứ tự hiển thị)

Ký hiệu: **[1]** chọn một (chip), **[n]** chọn nhiều, **[txt]** ô nhập, **[num]** số, **[date]** ngày, **[cnt]** counter.

### Bước 1 — Chủ nhà & tuổi
Tiêu đề: "1. Thông tin chủ nhà & tuổi làm nhà".
- Tên gia chủ (đầy đủ) * [txt] · Số điện thoại * [txt tel] · Zalo (nếu khác số trên) [txt] · Email [email]
- Địa chỉ liên hệ hiện tại [txt]
- Điều anh/chị quan tâm nhất [n]: Chi phí · Thẩm mỹ · Phong thủy · Nhu cầu sử dụng
- Gia chủ: Ngày sinh (dương lịch) [date] · Năm sinh âm lịch [num 1920–2012] · Giới tính [1] Nam/Nữ
  - Gợi ý: "Sinh trước Tết Nguyên đán thì năm âm lịch là năm liền trước (VD: sinh 20/01/1985 dương lịch → năm Giáp Tý 1984)."
- Vợ/chồng (không bắt buộc): Năm sinh âm lịch [num] · Giới tính [1]
- Năm dự kiến động thổ [1]: Năm 2026/2027/2028, dòng phụ = can chi của năm (Bính Ngọ / Đinh Mùi / Mậu Thân)

### Bước 2 — Khu đất
- Địa chỉ lô đất xây dựng [txt]
- Kiểu công trình [1]: Nhà phố · Nhà ống · Shophouse · Biệt thự · Nhà vườn · Nhà cấp 4 · Lâu đài · Khác
- Chiều rộng mặt tiền (m) [num] · Chiều sâu lô đất (m) [num] · Đường trước nhà rộng (m) [num]
- Số mặt tiếp giáp đường [1]: 1 mặt tiền · 2 mặt tiền (lô góc) · 3 mặt thoáng
- Hướng mặt tiền [1] 8 hướng (Bắc, Đông Bắc, Đông, Đông Nam, Nam, Tây Nam, Tây, Tây Bắc). **Dòng phụ dưới mỗi hướng = tên cung Bát trạch theo tuổi gia chủ** (khi đã nhập năm sinh). Ô "Số độ cụ thể" [txt].
- Hiện trạng [1]: Đất trống · Có nhà cũ cần phá dỡ · Cải tạo / nâng tầng
- Giấy tờ đã có [n]: Sổ đỏ / sổ hồng · Thông tin quy hoạch · Giấy phép xây dựng
- Xin phép xây dựng [1]: Cần xin phép – nhờ công ty làm hồ sơ · Cần xin phép – tự làm · Không cần / chưa rõ

### Bước 3 — Công năng
- Số tầng nổi [1]: 1–6 tầng · Tầng lửng [1]: Không lửng/Có lửng · Tum [1]: Có tum/Không tum · Tầng hầm [1]: Không/Bán hầm/Hầm
- Kiểu mái [1]: Mái bằng BTCT · Mái Thái (BTCT dán ngói) · Mái Nhật (kèo thép lợp ngói) · Mái tôn
- Diện tích xây dựng ước tính/sàn (m²) [num] — placeholder "Tự tính: X" khi có lô đất · Diện tích sử dụng/sàn [num] · Kích thước xây dựng [txt]
- Đua ban công [1]: Không đua/Có đua ban công → nếu có: Đua ra khoảng (m) [num]
- Cos nền tầng 1 cao hơn mặt sân/đường [1]: 1 bậc (~15 cm) · 3 bậc (~45 cm) · 5 bậc (~75 cm) · Khác (theo khảo sát)
- Thành viên & số phòng [cnt]: Người lớn · Trẻ em · Người cao tuổi · Phòng ngủ · WC · Chỗ để ô tô + **ghi chú gợi ý** (xem 4.6)
- **Công năng & chiều cao từng tầng**: danh sách tầng sinh động = `Tầng 1` → (`Tầng lửng` nếu có) → `Tầng 2..N` → (`Tum / sân thượng` nếu có). Mỗi tầng 1 khung: chip [n] 14 phòng (Phòng khách, Bếp + bàn ăn, Phòng thờ, Phòng ngủ, Phòng ngủ master, WC chung, WC master, Gara ô tô, Kinh doanh, Sinh hoạt chung, Phòng làm việc, Giặt – phơi, Sân thượng, Kho) + "Cao tầng (m)" [num, placeholder 3,6–3,9 tầng 1 / 2,7–3,0 lửng / 3,3–3,6 khác] + ghi chú [txt].
- Phòng thờ [1]: Tầng trên cùng · Phòng thờ riêng · Kết hợp phòng khách · Không cần — kèm gợi ý phong thủy ban thờ
- Bếp [1]: Bếp mở liên thông phòng khách · Bếp kín riêng · Bếp có đảo
- Giếng trời [1]: Có giếng trời · Không · Kỹ sư đề xuất · Tầng 1 kinh doanh [1]: Không · Cho thuê mặt bằng · Tự kinh doanh
- Thang máy [1]: Không · Có · Để chờ hố thang → nếu Có: loại [1] Có phòng máy · Không phòng máy (MRL) · Thủy lực · Kỹ sư đề xuất
- Không gian khác [n]: Phòng làm việc · Phòng gym · Phòng giải trí / karaoke · Phòng giúp việc · Sân vườn · Hồ bơi · Ban công trồng cây · Kho

### Bước 4 — Kiến trúc & vật liệu
- Phong cách [1] — 7 thẻ (id, tên, mô tả, 4 màu): xem `STYLES` trong `form-logic.js`
- Màu sắc yêu cầu [txt] · Link mẫu nhà gia chủ thích [url] · Ghi chú màu hợp mệnh (4.2)
- Cửa đi chính [1]: Cửa gỗ · Thép vân gỗ · Nhôm hệ · Kính cường lực · Khác
- Cửa thông phòng [1]: Cửa gỗ · Nhựa lõi thép · Nhôm hệ · Nhựa vân gỗ · Khác
- Cửa sổ [1]: Cửa gỗ · Thép vân gỗ · Nhôm hệ · Khác
- Hình dạng cầu thang [1]: Bản trượt vuông có chiếu nghỉ · Bản cong lượn · Bản trượt áp sát tường · Khác
- Chiều đi lên [1]: Xuôi kim đồng hồ · Ngược kim đồng hồ · Kỹ sư đề xuất · Bản thang [1]: 900 · 1000 · 1100 · 1200 · Theo P/A
- Tay vịn trong nhà [1]: Gỗ – kính · Lan can sắt · Gỗ con tiện · Sắt nghệ thuật · Khác
- Lan can ngoài trời [1]: Inox · Inox – kính · Sắt nghệ thuật · Thép / gang đúc · Khác
- Trần [1]: Trần thạch cao · Trần gỗ · Trần BT đắp phào chỉ · Không làm trần → nếu có trần: phạm vi [1] Phòng khách/Toàn nhà
- Sàn [1]: Sàn gạch · Sàn gỗ · Sàn nhựa SPC → nếu gạch: [1] 600×600 · 800×800 · 600×1200 mm · Khác
- Tường bao [1] / Tường ngăn [1]: 220 mm · 110 mm · Khác (+ gợi ý)
- Vật liệu khác [txt]

### Bước 5 — Kết cấu & điện nước
- Địa chất [1]: Đất liền thổ · Đất ruộng · Đất ao lấp · Đất đồi · Chưa rõ
- Phương án móng [1]: Móng đơn · Móng băng · Móng ép cọc BTCT · Móng cọc khoan nhồi · Kỹ sư đề xuất · Công trình lân cận [txt]
- Nguồn nước [1]: Nước máy · Nước máy + giếng khoan · Giếng khoan + Vị trí đầu chờ [txt]
- Thoát nước ra [1]: Trước nhà · Sau nhà · Hông nhà · Cos rãnh thấp hơn cos nhà (cm) [num]
- Bể nước ngầm [1]: Có – trước nhà · Có – sau nhà · Có – vị trí khác · Không
- Bể phốt [1]: Trong nhà · Ngoài nhà · Tận dụng bể cũ · Kỹ sư đề xuất
- Cột điện [1]: Trước nhà · Hông nhà · Sau nhà · Khác
- Điều hòa cục bộ [n]: Phòng ngủ · Phòng khách · Phòng bếp · Để chờ tất cả các phòng
- Điều hòa trung tâm [1] Có/Không · Năng lượng mặt trời [1] Có/Để chờ/Không · Camera [1] Camera IP/Camera Analog/Không · Máy phát [1] Có/Không
- Hệ thống khác [n]: Chuông cổng · Cáp quang internet + truyền hình · Chống sét · Khóa cửa thông minh · Nhà thông minh (smarthome)

### Bước 6 — Ngân sách & tiến độ
- Tổng mức đầu tư tối đa [1]: Dưới 1,5 tỷ · 1,5 – 2,5 tỷ · 2,5 – 4 tỷ · 4 – 6 tỷ · 6 – 10 tỷ · Trên 10 tỷ (ghi chú: gồm cửa, thiết bị, sơn; chưa gồm nội thất)
- Gói dịch vụ [1]: Chỉ thiết kế · Thiết kế + thi công phần thô · Trọn gói chìa khóa trao tay
- Mức hoàn thiện [1] (chỉ hiện khi Trọn gói): Cơ bản / Khá / Cao cấp, dòng phụ = đơn giá
- Thời điểm khởi công [1]: Trong 3 tháng · 3 – 6 tháng · 6 – 12 tháng · Chưa xác định · Ngày dự kiến động thổ [date]
- **Bảng tính diện tích sàn tính tiền** (xem 4.4) + dòng "Chưa gồm…"

### Bước 7 — Mặt bằng & gửi
- Tải lên sơ đồ hiện trạng/ảnh sổ đỏ/ảnh lô đất: `accept="image/*,application/pdf" multiple`, hiển thị tên tệp; ảnh nén còn cạnh dài 1600 px JPEG 0.82; PDF ≤ 10 MB; tối đa 8 tệp
- Mô tả tổng mặt bằng [textarea]
- Liên hệ qua [1]: Gọi điện · Zalo · Email · Thời gian [1]: Giờ hành chính · Buổi tối · Cuối tuần
- Ghi chú thêm [textarea]
- Checkbox đồng ý xử lý dữ liệu cá nhân (bắt buộc)
- Nút "Xem trước phiếu Word →" — kiểm tra: tên + SĐT bắt buộc (SĐT VN hợp lệ: `^(0|\+84)\d{9,10}$` sau khi bỏ khoảng trắng/dấu chấm), email đúng định dạng nếu có, đã tích đồng ý. Lỗi → thông báo đỏ + nút "Về bước có lỗi".

Điều hướng: nút "← Quay lại"/"Tiếp tục →"; bấm số bước trên stepper để nhảy; đổi bước thì cuộn lên đầu thẻ form.

---

## 4. Logic tự động (port y nguyên `form-logic.js`)

### 4.1 Phong thủy (hàm `calcFS(year, gender, buildYear)`)
- Hợp lệ khi 1920 ≤ năm ≤ 2012, ngược lại `null` (khung phải hiện hướng dẫn).
- Can chi: `i60 = (y − 4) mod 60`; Can = CAN[i60 mod 10], Chi = CHI[i60 mod 12].
- Nạp âm: NAPAM[floor(i60/2)] (30 mệnh); hành = từ cuối của tên nạp âm.
- Cung phi: `r = y mod 9`. Nam: `c = (11 − r) mod 9`, 0→9, **5→2 (Khôn)**. Nữ: `c = (r + 4) mod 9`, 0→9, **5→8 (Cấn)**.
  Cung 1 Khảm Thủy, 2 Khôn Thổ, 3 Chấn Mộc, 4 Tốn Mộc, 6 Càn Kim, 7 Đoài Kim, 8 Cấn Thổ, 9 Ly Hỏa. Đông tứ mệnh = {1,3,4,9}.
- Bát trạch: bảng `CUNG[c][2]` cho 8 hướng theo thứ tự sao: Sinh Khí, Thiên Y, Diên Niên, Phục Vị (tốt) · Họa Hại, Lục Sát, Ngũ Quỷ, Tuyệt Mệnh (xấu).
- Tuổi mụ năm làm nhà `mu = buildYear − y + 1`.
  - Kim Lâu: `mu mod 9` ∈ {1 Thân, 3 Thê, 6 Tử, 8 Lục Súc}.
  - Hoang Ốc: `idx = (floor(mu/10) − 1 + mu mod 10) mod 6` → [Nhất Cát, Nhì Nghi, **Tam Địa Sát**, Tứ Tấn Tài, **Ngũ Thọ Tử**, **Lục Hoang Ốc**] (in đậm = xấu).
  - Tam Tai theo nhóm chi năm sinh `chi mod 4`: 0 (Thân-Tý-Thìn)→năm Dần,Mão,Thìn · 1 (Tỵ-Dậu-Sửu)→Hợi,Tý,Sửu · 2 (Dần-Ngọ-Tuất)→Thân,Dậu,Tuất · 3 (Hợi-Mão-Mùi)→Tỵ,Ngọ,Mùi.
  - Kết luận: phạm bất kỳ → khuyên mượn tuổi / lùi năm; không phạm → "đẹp tuổi làm nhà".
- Hướng đã chọn → tên sao + nhận xét tốt/xấu (câu chữ trong logic).
- Vợ/chồng: cùng nhóm Đông/Tây → câu "Cùng nhóm mệnh…", khác nhóm → câu "Khác nhóm mệnh…".

### 4.2 Màu hợp mệnh
Bảng `COLORS` theo hành (Kim/Mộc/Thủy/Hỏa/Thổ) — hiện ở bước 4.

### 4.3 Mật độ xây dựng tối đa (tham khảo QCVN 01:2021/BXD)
Nội suy tuyến tính theo diện tích lô: ≤90 m² → 100%; 100 → 90%; 200 → 70%; 300 → 60%; 500 → 50%; ≥1000 → 40%.
Ghi rõ "tham khảo, còn phụ thuộc quy hoạch chi tiết".

### 4.4 Dự toán sơ bộ
- `lot = W × D`; `sxd = sxdIn > 0 ? sxdIn : lot × mậtđộ`.
- Hệ số móng: Móng đơn 30% · Móng băng 50% · Ép cọc BTCT 35% · Cọc khoan nhồi 35% · Kỹ sư đề xuất 50%. Móng cọc → dòng "Chưa gồm" ghi rõ chưa gồm chi phí ép/khoan cọc.
- Hạng mục: Móng · Sàn N tầng (100%) · Tầng lửng (60% sàn, nếu có) · Ban công đua `W × đua × (N−1)` (nếu có, N>1) · Tum 50% sàn (nếu có) · Mái: bằng 50% / Thái 85% / Nhật 70% / tôn 30% · Hầm: bán hầm 150% / hầm 200%.
- Đơn giá: Chỉ thiết kế = phí TK; Thô = đơn giá thô; Trọn gói = theo mức hoàn thiện.
- Hiển thị ≥ 1 tỷ: "≈ x,xx tỷ"; < 1 tỷ: "≈ x triệu"; định dạng số `vi-VN`.
- So ngân sách: vượt mức trần của khoảng ngân sách → % vượt + gợi ý giảm; "Trên 10 tỷ" không có trần.

### 4.5 Lưu ý kỹ thuật (thẻ bên phải) — điều kiện → câu chữ trong `form-logic.js`
Nền yếu (ruộng/ao lấp) · nền yếu + móng đơn/băng · đất đồi · cos 1 bậc · ≥5 tầng không thang máy · bản thang 900 với ≥4 tầng hoặc có người già · bể phốt trong nhà · rãnh thoát < 30 cm · có/để chờ năng lượng mặt trời · không có gì → câu mặc định.

### 4.6 Gợi ý số phòng
`PN = max(1, ceil(adults/2)) + ceil(kids/2) + (elders>0 ? 1 : 0) + 1 (phòng khách)`, `WC = PN + 1`; có người cao tuổi → thêm câu về phòng tầng 1, WC khép kín, thang máy.

---

## 5. Phiếu thông tin (xem trước + file Word)

Hàm `buildDocument(state) → FormDocument { code, fileName, dateLine, sections[{title, rows[{k,v}]}] }` dùng chung cho: màn xem trước, file .docx, Firestore, email.
- Mã hồ sơ: `KH-YYMMDD-xxx` (xxx = 3 số cuối SĐT). Khi ghi Firestore thêm hậu tố 4 ký tự ngẫu nhiên nếu trùng: `KH-261021-678-A3F9`.
- Ô trống hiển thị "—". Dòng nhiều ý xuống dòng bằng `\n`.
- 6 mục: I. THÔNG TIN CHỦ NHÀ · II. THÔNG TIN KIẾN TRÚC CÔNG TRÌNH (gồm "Công năng tầng …" cho từng tầng) · III. THÔNG TIN KẾT CẤU · IV. THÔNG TIN ĐIỆN NƯỚC · V. NGÂN SÁCH & TIẾN ĐỘ · VI. TỔNG MẶT BẰNG & GHI CHÚ — đúng danh sách dòng trong `form-logic.js` (biến `doc`).
- File Word: A4, lề trái 30 mm, phải/trên/dưới 20 mm, Times New Roman 13 pt (bảng 12 pt), đầu trang 2 cột (công ty | mã hồ sơ + ngày), tiêu đề "PHIẾU THÔNG TIN THIẾT KẾ NHÀ", bảng 2 cột 34%/66% viền đen mảnh, dòng không tách trang, khối ký "CHỦ NHÀ" / "ĐẠI DIỆN [TÊN CÔNG TY]". Mẫu: `reference/samples/Mau_Phieu_khao_sat.docx`.
- Màn xem trước: trang giấy trắng giả A4 (max-width 794 px, đổ bóng) trên nền xám; mobile cho cuộn ngang trong khung, trang không cuộn ngang. Nút: "← Sửa lại thông tin" · "Tải file Word (.docx)" · "Xác nhận & gửi cho kỹ sư".

---

## 6. Trang quản trị `/#/admin`

- Đăng nhập Google (popup; mobile dùng redirect). Chỉ email trong whitelist (Firestore rules + kiểm tra UI). Không phải admin → báo "Tài khoản không có quyền".
- **Danh sách**: bảng (mobile: thẻ) — Ngày gửi · Mã · Tên · SĐT (bấm gọi) · Kiểu nhà · Số tầng · Ngân sách · Dự toán · Trạng thái · Thông báo (email OK/lỗi). Sắp xếp mới nhất; lọc theo trạng thái; tìm theo tên/SĐT/mã; phân trang 25.
- **Trạng thái** (pipeline): `moi` Mới · `da_lien_he` Đã liên hệ · `hen_khao_sat` Hẹn khảo sát · `da_khao_sat` Đã khảo sát · `bao_gia` Đã gửi báo giá · `ky_hd` Đã ký HĐ · `tu_choi` Không thành. Đếm số hồ sơ mỗi trạng thái ở đầu trang.
- **Chi tiết**: hiển thị phiếu (cùng component xem trước), nút Gọi / Zalo (`https://zalo.me/<sđt>`) / Email, link thư mục Drive & file Word (từ Apps Script), nút "Tải lại Word" (sinh lại từ `form` đã lưu), đổi trạng thái, ghi chú nội bộ (`adminNote`), lịch sử thay đổi trạng thái (`statusLog`).
- **Xuất CSV** (UTF-8 có BOM để Excel đọc tiếng Việt) theo bộ lọc hiện tại.

---

## 7. Luồng gửi — không bao giờ mất khách

Khi bấm "Xác nhận & gửi":
1. Khóa nút, hiện "Đang tạo file Word và gửi…".
2. Sinh `.docx` (base64) + nén ảnh.
3. **Gọi Apps Script** (`VITE_NOTIFY_URL`, POST `text/plain;charset=utf-8`, body JSON như `reference/apps-script/Code.gs` mong đợi: `code, fileName, name, phone, email, contact, time, type, floors, budget, siteAddr, estimate, rows[[mục, nhãn, giá trị]], docx, files[{name,type,data}]`), timeout 30 s. Kết quả `{ ok, folderUrl, docUrl }`.
4. **Ghi Firestore** `leads/{auto-id}` (kể cả khi bước 3 lỗi): `notify.status = 'sent' | 'failed'`, kèm `folderUrl/docUrl` nếu có, `notify.error` nếu lỗi.
5. Thành công nếu **bước 3 hoặc bước 4** thành công → màn "Đã gửi thành công" + mã hồ sơ + nút "Chat Zalo với kỹ sư" (`zalo.me/<hotline>`). Xóa nháp localStorage.
6. Nếu **cả hai** lỗi → giữ nguyên form, báo lỗi, khuyên tải file Word gửi qua Zalo/hotline, nút "Thử lại".
7. Chống gửi trùng: chặn bấm lại khi đang gửi; honeypot ẩn `website` (có giá trị → giả vờ thành công, không gửi).

---

## 8. Yêu cầu phi chức năng
- Mobile-first; 390 px không cuộn ngang; chạm ≥ 44 px; tương phản AA.
- Lighthouse mobile ≥ 90 Performance & Accessibility; bundle form ≤ 350 KB gzip (lazy-load `docx` và trang admin).
- SEO cơ bản: title, description, Open Graph (ảnh chia sẻ Zalo/Facebook), favicon ngôi nhà.
- Bảo vệ dữ liệu cá nhân: chỉ admin đọc được `leads`; câu đồng ý xử lý dữ liệu ở bước 7.
- Không có localStorage/sessionStorage cho dữ liệu nhạy cảm ngoài bản nháp của chính người điền.

## 9. Tiêu chí nghiệm thu
1. Toàn bộ `docs/TEST_CASES.md` pass.
2. Điền đủ 7 bước trên mobile 390 px và desktop 1360 px không lỗi console.
3. Xem trước khớp file Word tải về (cùng nội dung, cùng thứ tự).
4. Gửi thật: email về hộp thư admin có file Word đính kèm, Drive có thư mục hồ sơ, Firestore có bản ghi, admin thấy hồ sơ.
5. Tắt mạng tới Apps Script (sai URL) → vẫn có bản ghi Firestore `notify.status='failed'`.
6. Người không đăng nhập không đọc được `leads` (test rules).
7. GitHub Pages: `/` và `/#/admin` chạy, F5 không 404.
