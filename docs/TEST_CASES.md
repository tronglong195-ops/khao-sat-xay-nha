# CA KIỂM TRA BẮT BUỘC (unit test — phải pass 100%)

Đáp số dưới đây sinh ra từ `reference/logic/form-logic.js` (bản đã chạy). Port sang TS phải cho cùng kết quả.

## 1. Can chi & nạp âm
| Năm | Can chi | Nạp âm (hành) |
|---|---|---|
| 1960 | Canh Tý | Bích Thượng Thổ (Thổ) |
| 1975 | Ất Mão | Đại Khê Thủy (Thủy) |
| 1984 | Giáp Tý | Hải Trung Kim (Kim) |
| 1985 | Ất Sửu | Hải Trung Kim (Kim) |
| 1988 | Mậu Thìn | Đại Lâm Mộc (Mộc) |
| 1989 | Kỷ Tỵ | Đại Lâm Mộc (Mộc) |
| 1990 | Canh Ngọ | Lộ Bàng Thổ (Thổ) |
| 1995 | Ất Hợi | Sơn Đầu Hỏa (Hỏa) |
| 2000 | Canh Thìn | Bạch Lạp Kim (Kim) |
| 2001 | Tân Tỵ | Bạch Lạp Kim (Kim) |

## 2. Cung phi (Bát trạch)
| Năm | Giới tính | Cung | Nhóm | Sinh Khí | Thiên Y | Diên Niên | Phục Vị |
|---|---|---|---|---|---|---|---|
| 1984 | Nam | Đoài Kim | Tây tứ mệnh | Tây Bắc | Tây Nam | Đông Bắc | Tây |
| 1984 | Nữ | Cấn Thổ | Tây tứ mệnh | Tây Nam | Tây Bắc | Tây | Đông Bắc |
| 1985 | Nam | Càn Kim | Tây tứ mệnh | Tây | Đông Bắc | Tây Nam | Tây Bắc |
| 1985 | Nữ | Ly Hỏa | Đông tứ mệnh | Đông | Đông Nam | Bắc | Nam |
| 1989 | Nam | Khôn Thổ | Tây tứ mệnh | Đông Bắc | Tây | Tây Bắc | Tây Nam |
| 1989 | Nữ | Tốn Mộc | Đông tứ mệnh | Bắc | Nam | Đông | Đông Nam |
| 1990 | Nam | Khảm Thủy | Đông tứ mệnh | Đông Nam | Đông | Nam | Bắc |
| 1990 | Nữ | Cấn Thổ | Tây tứ mệnh | Tây Nam | Tây Bắc | Tây | Đông Bắc |
| 1995 | Nam | Khôn Thổ | Tây tứ mệnh | Đông Bắc | Tây | Tây Bắc | Tây Nam |
| 1995 | Nữ | Khảm Thủy | Đông tứ mệnh | Đông Nam | Đông | Nam | Bắc |
| 2000 | Nam | Ly Hỏa | Đông tứ mệnh | Đông | Đông Nam | Bắc | Nam |
| 2000 | Nữ | Càn Kim | Tây tứ mệnh | Tây | Đông Bắc | Tây Nam | Tây Bắc |

## 3. Tuổi làm nhà (Kim Lâu / Hoang Ốc / Tam Tai)
| Năm sinh | Năm làm | Tuổi mụ | Kim Lâu | Hoang Ốc | Tam Tai |
|---|---|---|---|---|---|
| 1985 | 2027 (Đinh Mùi) | 43 | Không phạm | Nhất Cát | Không phạm |
| 1984 | 2027 (Đinh Mùi) | 44 | Phạm Kim Lâu Lục Súc | Nhì Nghi | Không phạm |
| 1990 | 2027 (Đinh Mùi) | 38 | Không phạm | Ngũ Thọ Tử | Không phạm |
| 1988 | 2026 (Bính Ngọ) | 39 | Phạm Kim Lâu Thê | Lục Hoang Ốc | Không phạm |
| 1975 | 2027 (Đinh Mùi) | 53 | Phạm Kim Lâu Lục Súc | Nhì Nghi | Phạm |
| 1995 | 2028 (Mậu Thân) | 34 | Không phạm | Nhất Cát | Không phạm |
| 1980 | 2027 (Đinh Mùi) | 48 | Phạm Kim Lâu Thê | Lục Hoang Ốc | Không phạm |
| 1993 | 2026 (Bính Ngọ) | 34 | Không phạm | Nhất Cát | Không phạm |

## 4. Mật độ xây dựng tối đa (nội suy)
| Diện tích lô (m²) | Mật độ |
|---|---|
| 50 | 100% |
| 90 | 100% |
| 95 | 95% |
| 100 | 90% |
| 150 | 80% |
| 200 | 70% |
| 250 | 65% |
| 300 | 60% |
| 400 | 55% |
| 500 | 50% |
| 750 | 45% |
| 1000 | 40% |
| 1200 | 40% |

## 5. Dự toán sơ bộ
### E1 — Nhà phố 5×20, 4 tầng + tum, mái bằng, trọn gói Khá
Đầu vào: `w="5", d="20", floors=4, tum="Có tum", roof="Mái bằng BTCT", found="Kỹ sư đề xuất", pkg="Trọn gói chìa khóa trao tay", level="Khá", budget="2,5 – 4 tỷ"` (các trường khác giữ mặc định)

| Hạng mục | Diện tích |
|---|---|
| Diện tích xây dựng / sàn (theo mật độ) | 90,0 m² |
| Móng (tạm tính 50%) | 45,0 m² |
| Sàn 4 tầng (100%) | 360,0 m² |
| Tum thang (≈ 50% sàn) | 45,0 m² |
| Mái bằng BTCT (50%) | 45,0 m² |
| **Tổng diện tích tính tiền** | **495,0 m²** |
| Đơn giá | 7,50 tr/m² |
| **Dự toán** | **≈ 3,71 tỷ** |

So ngân sách: "Phù hợp ngân sách 2,5 – 4 tỷ."

### E2 — 5×20, 3 tầng + lửng, không tum, mái Thái, ép cọc, đua 1,2 m, Cơ bản
Đầu vào: `w="5", d="20", floors=3, mezz="Có lửng", tum="Không tum", roof="Mái Thái (BTCT dán ngói)", found="Móng ép cọc BTCT", balc="Có đua ban công", balcDua="1.2", level="Cơ bản", budget="1,5 – 2,5 tỷ"` (các trường khác giữ mặc định)

| Hạng mục | Diện tích |
|---|---|
| Diện tích xây dựng / sàn (theo mật độ) | 90,0 m² |
| Móng ép cọc BTCT (35%) | 31,5 m² |
| Sàn 3 tầng (100%) | 270,0 m² |
| Tầng lửng (≈ 60% sàn) | 54,0 m² |
| Ban công đua 1,2 m × 2 tầng | 12,0 m² |
| Mái Thái (BTCT dán ngói) (85%) | 76,5 m² |
| **Tổng diện tích tính tiền** | **444,0 m²** |
| Đơn giá | 6,30 tr/m² |
| **Dự toán** | **≈ 2,80 tỷ** |

So ngân sách: "Vượt ngân sách 1,5 – 2,5 tỷ khoảng 12%. Có thể giảm 1 tầng, bỏ tum/hầm/lửng hoặc hạ mức hoàn thiện."

### E3 — Biệt thự 10×20, 2 tầng, bán hầm, mái Nhật, móng băng, Cao cấp
Đầu vào: `w="10", d="20", floors=2, tum="Không tum", basement="Bán hầm", roof="Mái Nhật (kèo thép lợp ngói)", found="Móng băng", level="Cao cấp", budget="2,5 – 4 tỷ"` (các trường khác giữ mặc định)

| Hạng mục | Diện tích |
|---|---|
| Diện tích xây dựng / sàn (theo mật độ) | 140,0 m² |
| Móng băng (50%) | 70,0 m² |
| Sàn 2 tầng (100%) | 280,0 m² |
| Mái Nhật (kèo thép lợp ngói) (70%) | 98,0 m² |
| Bán hầm (150%) | 210,0 m² |
| **Tổng diện tích tính tiền** | **658,0 m²** |
| Đơn giá | 9,50 tr/m² |
| **Dự toán** | **≈ 6,25 tỷ** |

So ngân sách: "Vượt ngân sách 2,5 – 4 tỷ khoảng 56%. Có thể giảm 1 tầng, bỏ tum/hầm/lửng hoặc hạ mức hoàn thiện."

### E4 — Gia chủ nhập DTXD 120 m², 3 tầng + tum, móng đơn, thi công phần thô
Đầu vào: `w="", d="", sxdIn="120", floors=3, tum="Có tum", found="Móng đơn", pkg="Thiết kế + thi công phần thô", budget="Dưới 1,5 tỷ"` (các trường khác giữ mặc định)

| Hạng mục | Diện tích |
|---|---|
| Diện tích xây dựng / sàn (gia chủ nhập) | 120,0 m² |
| Móng đơn (30%) | 36,0 m² |
| Sàn 3 tầng (100%) | 360,0 m² |
| Tum thang (≈ 50% sàn) | 60,0 m² |
| Mái bằng BTCT (50%) | 60,0 m² |
| **Tổng diện tích tính tiền** | **516,0 m²** |
| Đơn giá | 4,20 tr/m² |
| **Dự toán** | **≈ 2,17 tỷ** |

So ngân sách: "Vượt ngân sách Dưới 1,5 tỷ khoảng 44%. Có thể giảm 1 tầng, bỏ tum/hầm/lửng hoặc hạ mức hoàn thiện."

### E5 — 5×20, 4 tầng + tum, chỉ thiết kế
Đầu vào: `w="5", d="20", floors=4, tum="Có tum", pkg="Chỉ thiết kế"` (các trường khác giữ mặc định)

| Hạng mục | Diện tích |
|---|---|
| Diện tích xây dựng / sàn (theo mật độ) | 90,0 m² |
| Móng (tạm tính 50%) | 45,0 m² |
| Sàn 4 tầng (100%) | 360,0 m² |
| Tum thang (≈ 50% sàn) | 45,0 m² |
| Mái bằng BTCT (50%) | 45,0 m² |
| **Tổng diện tích tính tiền** | **495,0 m²** |
| Đơn giá | 0,18 tr/m² |
| **Dự toán** | **89 triệu** |

So ngân sách: "Chi phí thiết kế. Dự toán thi công sẽ lập kèm hồ sơ thiết kế."


## 6. Gợi ý số phòng
| Người lớn | Trẻ em | Người cao tuổi | PN gợi ý | WC gợi ý |
|---|---|---|---|---|
| 2 | 2 | 0 | 3 | 4 |
| 2 | 1 | 2 | 4 | 5 |
| 4 | 3 | 1 | 6 | 7 |
| 1 | 0 | 0 | 2 | 3 |

## 7. Kiểm tra giao diện / e2e
- Gõ từng ký tự vào ô "Tên gia chủ" không mất focus (React controlled input).
- Đổi số tầng 4 → 2: danh sách khung công năng còn Tầng 1, Tầng 2 (+ lửng/tum nếu bật); dữ liệu tầng 3–4 vẫn giữ trong state nhưng **không** xuất hiện trong phiếu.
- Chọn "Có lửng" → khung "Tầng lửng" xuất hiện ngay sau Tầng 1; phiếu có dòng "Công năng tầng lửng".
- Ở 390 px: `document.documentElement.scrollWidth === 390` ở mọi bước và màn xem trước.
- File .docx tải về mở được bằng python-docx/LibreOffice: khổ 210×297 mm, lề trái 30 mm, phải 20 mm, 8 bảng (1 đầu trang + 6 mục + 1 khối ký).
- Gửi với Apps Script trả lỗi 500 → vẫn tạo bản ghi Firestore `notify.status = 'failed'` và hiện màn thành công.
