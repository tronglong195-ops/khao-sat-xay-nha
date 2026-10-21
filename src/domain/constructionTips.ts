export interface ConstructionTip {
  id: number;
  step: number; // 0..6 (tương ứng với Bước 1 đến Bước 7)
  category: 'Pháp lý & Chuẩn bị' | 'Khảo sát & Đất nền' | 'Công năng & Không gian' | 'Kiến trúc & Hoàn thiện' | 'Kết cấu & Bê tông' | 'Cơ điện & Cấp thoát nước' | 'Chống thấm' | 'Chi phí & Quản lý' | 'Nghiệm thu & An toàn';
  title: string;
  content: string;
  tag?: 'Quan trọng' | 'Kinh nghiệm' | 'Tiêu chuẩn' | 'Mẹo hay';
}

export const CONSTRUCTION_TIPS: ConstructionTip[] = [
  // ==========================================
  // BƯỚC 1: PHÁP LÝ, CHUẨN BỊ & PHONG THỦY (ID: 1 - 32)
  // ==========================================
  {
    id: 1, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Khảo sát nhà liền kề trước khi phá dỡ',
    content: 'Luôn lập biên bản kiểm tra, chụp ảnh và quay video toàn bộ vết nứt, hiện trạng nhà hàng xóm liền kề có chữ ký xác nhận của hai bên trước khi thi công móng.',
    tag: 'Quan trọng'
  },
  {
    id: 2, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Xin chỉ giới xây dựng và lộ giới đỏ',
    content: 'Kiểm tra kỹ khoảng lùi bắt buộc theo quy hoạch đô thị tại phòng quản lý đô thị quận/huyện, tránh xây lấn chỉ giới dẫn đến bị phạt và đình chỉ công trình.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 3, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Điện nước tạm phục vụ thi công',
    content: 'Cần làm thủ tục xin cấp điện 3 pha thi công và nước sạch trước ngày khởi công ít nhất 2 tuần để không bị gián đoạn tiến độ máy ép cọc, trộn hồ.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 4, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Treo biển báo giấy phép xây dựng',
    content: 'Theo luật xây dựng, biển thông tin công trình (chủ đầu tư, đơn vị thi công, số GPXD) phải được treo công khai tại mặt tiền trong suốt quá trình xây dựng.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 5, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Hợp đồng bảo hiểm công trình',
    content: 'Nên mua bảo hiểm trách nhiệm bên thứ ba cho công trình nhà phố liền kề để bảo vệ rủi ro nếu có nứt lún nhà bên cạnh.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 6, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Lựa chọn người đứng tuổi động thổ',
    content: 'Người đứng tuổi làm nhà tốt nhất là nam giới trụ cột, không phạm Tam Tai, Hoang Ốc, Kim Lâu. Nếu mượn tuổi, người mượn nên lớn tuổi và có gia đạo êm ấm.',
    tag: 'Mẹo hay'
  },
  {
    id: 7, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Hạ cốt nền nhà cũ an toàn',
    content: 'Khi phá dỡ nhà cũ có tầng hầm hoặc móng sâu, phải có biện pháp chống văng chống cừ vách đất cẩn thận để tránh sập sạt đất nhà bên.',
    tag: 'Quan trọng'
  },
  {
    id: 8, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Bãi tập kết phế thải xây dựng',
    content: 'Quy định rõ trong hợp đồng nhà thầu phải vận chuyển xà bần, đất bùn thải đổ đúng nơi quy định của địa phương, tránh bị xử phạt vệ sinh môi trường.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 9, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Đo đạc trích lục mốc ranh địa chính',
    content: 'Thuê công ty đo đạc bắn máy toàn đạc điện tử xác định 4 góc mốc ranh đất theo tọa độ VN-2000 trước khi ép cọc, tránh việc xây đè lên đất nhà khác.',
    tag: 'Quan trọng'
  },
  {
    id: 10, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Thông báo khởi công cho UBND phường',
    content: 'Gửi văn bản thông báo ngày khởi công kèm bản sao GPXD cho UBND phường/xã trước 3 ngày để đăng ký đội ngũ giám sát trật tự xây dựng.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 11, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Bảo quản bản vẽ thiết kế tại công trường',
    content: 'Luôn lưu 01 bộ hồ sơ bản vẽ xin phép và 01 bộ bản vẽ thi công có dấu phê duyệt tại lán trại để xuất trình khi thanh tra kiểm tra.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 12, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Lưới bao che chắn bụi và vật rơi',
    content: 'Toàn bộ mặt tiền và các phía giáp nhà dân phải được quây lưới hứng vật rơi 2 lớp để bảo đảm an toàn tính mạng cho người đi đường.',
    tag: 'Quan trọng'
  },
  {
    id: 13, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Thỏa thuận sử dụng vỉa hè, lòng đường',
    content: 'Nếu ngõ hẹp cần đỗ xe bồn hoặc xe tải xuống vật liệu, nên xin giấy phép tạm thời chiếm dụng lòng đường/vỉa hè hoặc thỏa thuận khung giờ với tổ dân phố.',
    tag: 'Mẹo hay'
  },
  {
    id: 14, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Lắp camera giám sát công trường 24/7',
    content: 'Lắp tối thiểu 1-2 mắt camera IP hướng vào khu vực thi công và kho vật tư để giám sát tiến độ và tránh thất thoát xi măng, sắt thép.',
    tag: 'Mẹo hay'
  },
  {
    id: 15, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Kiểm tra họng cứu hỏa và dây điện cao thế',
    content: 'Khoảng cách an toàn tối thiểu từ ban công, giàn giáo tới đường dây điện trung/cao thế là từ 2m đến 4m tùy cấp điện áp để tránh phóng điện.',
    tag: 'Quan trọng'
  },
  {
    id: 16, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Hồ sơ năng lực nhà thầu thi công',
    content: 'Đơn vị thi công phải có chứng chỉ năng lực hoạt động xây dựng phù hợp cấp công trình và thợ chính phải có chứng chỉ nghề an toàn lao động.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 17, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Biên bản nghiệm thu từng giai đoạn (Milestones)',
    content: 'Quy định hợp đồng thanh toán dựa trên biên bản nghiệm thu ký 3 bên (Chủ nhà - Giám sát - Nhà thầu) cho từng hạng mục hoàn thành.',
    tag: 'Quan trọng'
  },
  {
    id: 18, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Xem hướng ban thờ theo Bát Trạch',
    content: 'Hướng ban thờ nguyên tắc là "tọa cát hướng cát" (đặt ở cung tốt và nhìn về hướng tốt theo mệnh gia chủ), kiêng kỵ nhìn thẳng vào nhà vệ sinh.',
    tag: 'Mẹo hay'
  },
  {
    id: 19, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Kiểm tra đường cống thoát nước ngõ',
    content: 'Kiểm tra độ sâu của nắp hố ga thoát nước chung của ngõ trước khi thiết kế cốt nền tầng 1, tránh nhà thấp hơn mực nước ngập khi triều cường.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 20, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Đăng ký tạm trú cho công nhân',
    content: 'Nhà thầu phải nộp danh sách công nhân ngủ lại công trường cho công an khu vực để đăng ký tạm trú, tránh bị kiểm tra hành chính ban đêm.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 21, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Khảo sát cây xanh công cộng trước nhà',
    content: 'Nếu trước đất có cây xanh đô thị hoặc cột đèn chiếu sáng trùng vị trí cổng chính, cần làm thủ tục xin di dời trước ngày thi công.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 22, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Dự phòng rủi ro thời tiết mùa mưa',
    content: 'Lên kế hoạch đào móng và đổ bê tông ngầm vào các tháng khô ráo để tránh ngập sạt lở hố móng và nước mưa làm rửa trôi mác bê tông.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 23, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Lập sổ nhật ký công trình hàng ngày',
    content: 'Yêu cầu chỉ huy trưởng ghi sổ nhật ký công trình: thời tiết, nhân lực, công việc thực hiện, khối lượng vật tư nhập kho và các sự cố phát sinh.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 24, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Vị trí bồn nước ngầm tránh bể phốt',
    content: 'Bể nước sạch ngầm tuyệt đối không được xây chung tường ngăn với bể phốt, khoảng cách tối thiểu giữa 2 bể là 1 mét để đảm bảo vệ sinh nguồn nước.',
    tag: 'Quan trọng'
  },
  {
    id: 25, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Khu vực rửa xe bồn bê tông',
    content: 'Bố trí hố gom xả nước rửa máng xe bồn bê tông, tuyệt đối không xả bê tông thừa trực tiếp vào cống thoát nước ngõ gây tắc cống.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 26, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Bảo quản xi măng và sắt thép đúng cách',
    content: 'Xi măng phải kê trên pallet cao tối thiểu 20cm cách tường 30cm, không xếp chồng quá 10 bao. Thép cây phải kê cao và phủ bạt che mưa tránh rỉ sét.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 27, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Quy định giờ giấc làm việc tránh ồn ào',
    content: 'Thỏa thuận giờ làm việc của công nhân (thường từ 7h-11h30 và 13h30-17h30) để giữ gìn mối quan hệ hòa nhã với hàng xóm láng giềng.',
    tag: 'Mẹo hay'
  },
  {
    id: 28, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Quy định xử phạt an toàn lao động',
    content: 'Hợp đồng phải có chế tài xử phạt nếu công nhân không đội mũ bảo hộ, không thắt dây an toàn khi làm việc trên giàn giáo cao.',
    tag: 'Quan trọng'
  },
  {
    id: 29, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Thỏa thuận neo giàn giáo vào tường nhà bên',
    content: 'Nếu cần gá giàn giáo sang không gian nhà bên cạnh, phải xin phép chủ nhà bằng văn bản hoặc lời nói rõ ràng để tránh mâu thuẫn.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 30, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Chống thất thoát nước sạch thi công',
    content: 'Lắp phao cơ tự ngắt cho téc nước và đồng hồ nước riêng cho đội thợ để kiểm soát lượng nước sử dụng trong suốt quá trình xây tô.',
    tag: 'Mẹo hay'
  },
  {
    id: 31, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Kê khai thuế xây dựng nhà ở tư nhân',
    content: 'Làm rõ trong hợp đồng bên nào (chủ nhà hay nhà thầu) chịu trách nhiệm nộp thuế môn bài và thuế thu nhập cá nhân xây dựng vãng lai.',
    tag: 'Quan trọng'
  },
  {
    id: 32, step: 0, category: 'Pháp lý & Chuẩn bị',
    title: 'Xem hướng bếp "tọa hung hướng cát"',
    content: 'Theo phong thủy Bát Trạch, bếp nấu nên đặt tại cung xấu của ngôi nhà để thiêu đốt điềm hung, miệng bếp quay về hướng tốt theo cung mệnh gia chủ.',
    tag: 'Mẹo hay'
  },

  // ==========================================
  // BƯỚC 2: KHU ĐẤT, TRẮC ĐỊA & MÓNG (ID: 33 - 65)
  // ==========================================
  {
    id: 33, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Khoan khảo sát địa chất từ 3 tầng trở lên',
    content: 'Nhà từ 3 tầng trên nền đất yếu cần khoan tối thiểu 1-2 hố khoan sâu từ 15-25m để xác định chính xác tầng đất tốt chịu tải trọng cọc.',
    tag: 'Quan trọng'
  },
  {
    id: 34, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Gia cố cừ Larsen hoặc cừ tràm chống sạt',
    content: 'Khi đào hóng móng sâu cạnh nhà cũ móng nông, bắt buộc phải ép cừ Larsen hoặc cừ thép C200 để giữ vách đất, tránh làm lún sụp móng nhà bên.',
    tag: 'Quan trọng'
  },
  {
    id: 35, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Kiểm tra độ chênh cốt cao độ mặt đường',
    content: 'Đo độ dốc của mặt đường trước nhà bằng máy thủy bình để chọn cốt sàn tầng 1 cao hơn điểm cao nhất của mặt đường ít nhất 30-45cm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 36, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Lực ép cọc Pmax và Pmin',
    content: 'Khi ép cọc BTCT 250x250, lực ép đầu cọc phải đạt giá trị Pmin (thường 40-50 tấn) và dừng lại ở Pmax (60-80 tấn) theo chỉ định kết cấu.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 37, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Độ nghiêng của cọc ép cho phép',
    content: 'Độ nghiêng của tim cọc ép không được vượt quá 1% so với phương thẳng đứng để đảm bảo cọc chịu lực nén đúng tâm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 38, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Đập đầu cọc BTCT đúng kỹ thuật',
    content: 'Đập đầu cọc phải chừa lại thép chủ cọc ngàm vào đài móng tối thiểu 30-40d (thường 40-50cm) và không được làm nứt thân cọc bên dưới.',
    tag: 'Quan trọng'
  },
  {
    id: 39, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Lớp bê tông lót móng dày 100mm',
    content: 'Đáy móng phải đổ lớp bê tông lót mác M100 dày tối thiểu 10cm trên nền đất đầm chặt, tuyệt đối không kê thép móng trực tiếp lên gạch vỡ.',
    tag: 'Quan trọng'
  },
  {
    id: 40, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Khoảng cách giữa các tim cọc',
    content: 'Khoảng cách tâm giữa các cọc ép trong cùng một đài móng không được nhỏ hơn 3 lần đường kính cọc (3d) để tránh ứng suất giao thoa chèn đất.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 41, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Xử lý giếng khoan cũ hoặc hầm phân cũ',
    content: 'Nếu khu đất có giếng khoan cũ hoặc bể phốt cũ, phải hút sạch bùn, cạy nắp và đổ cát đầm chặt từng lớp dày 20cm để chống sụt lún rỗng ngầm.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 42, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Kiểm tra đường ống cống ngầm cắt ngang',
    content: 'Đào thăm dò cẩn thận bằng tay trước khi dùng máy xúc móng để tránh múc vỡ đường ống cấp nước hoặc cáp ngầm đi qua khu đất.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 43, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Độ sâu chôn móng tối thiểu',
    content: 'Đáy đài móng nông (móng băng/đơn) phải chôn sâu hơn lớp đất hữu cơ bề mặt, tối thiểu cách mặt đất tự nhiên 1.2m đến 1.5m.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 44, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Hệ giằng móng (đà kiềng) liên kết chặt',
    content: 'Đà kiềng giằng móng phải liên tục theo cả hai phương dọc và ngang nhà để chống lún lệch và giữ chân cột vững chắc khi có động đất.',
    tag: 'Quan trọng'
  },
  {
    id: 45, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Biện pháp thoát nước hố móng mùa mưa',
    content: 'Đào hố thu nước (hố rãnh gom) ở góc hố móng và trang bị sẵn 2 máy bơm chìm tự động để bơm cạn nước ngầm trước khi đổ bê tông lót.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 46, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Mối nối hàn đầu cọc ép',
    content: 'Mối nối các đoạn cọc phải hàn kín 4 mặt bằng que hàn đúng tiêu chuẩn, chiều dài đường hàn liên tục và không có bọt khí xỉ hàn.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 47, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Nền đất ruộng, ao lấp xử lý cát đệm',
    content: 'Nền đất yếu ao hồ phải múc bỏ toàn bộ lớp bùn đen hữu cơ, sau đó trải vải địa kỹ thuật và đắp cát vàng đầm cóc chặt hệ số K >= 0.95.',
    tag: 'Quan trọng'
  },
  {
    id: 48, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Khoảng lùi sân trước theo quy hoạch',
    content: 'Nhà phố mặt tiền đường lớn thường quy định lùi sân trước từ 2.4m đến 3m so với lộ giới đỏ, không được xây tường bao kiên cố quá 2.4m.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 49, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Bảo vệ mốc trắc địa trong suốt thi công',
    content: 'Gửi mốc cao độ chuẩn (+-0.000) và mốc tim trục vào tường nhà đối diện hoặc cột điện kiên cố để kiểm tra lại bất cứ lúc nào.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 50, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Độ dốc rãnh thoát nước móng',
    content: 'Các rãnh thu nước tạm xung quanh hố móng phải có độ dốc tối thiểu 1.5% về phía hố ga tập trung.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 51, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Kiểm tra đường ranh đất xéo hoặc nở hậu',
    content: 'Đất xéo hình bình hành hoặc thóp hậu cần xử lý nắn các góc vuông cho phòng ngủ và phòng khách, dồn góc méo vào giếng trời hoặc sân sau.',
    tag: 'Mẹo hay'
  },
  {
    id: 52, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Thử tĩnh cọc thí nghiệm trước khi ép đại trà',
    content: 'Với công trình từ 5 tầng có quy mô lớn, nên nén tĩnh 1 cọc thử để xác định chính xác sức chịu tải thực tế trước khi ép hàng loạt.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 53, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Sát nách nhà cổ móng gạch',
    content: 'Nếu nhà liền kề là nhà cấp 4 cũ móng gạch nông, tuyệt đối không dùng búa rung đóng cọc mà phải dùng phương pháp ép tĩnh chậm hoặc cọc khoan nhồi.',
    tag: 'Quan trọng'
  },
  {
    id: 54, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Tầng đất đồi dốc có nguy cơ trượt',
    content: 'Đất đồi dốc phải có tường chắn đất BTCT có lỗ thoát nước ngầm (lỗ rọ đá) để tránh tích nước tạo áp lực thủy tĩnh làm đổ tường chắn.',
    tag: 'Quan trọng'
  },
  {
    id: 55, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Thời gian bảo dưỡng đài móng bê tông',
    content: 'Sau khi đổ bê tông đài móng, phải tưới nước giữ ẩm liên tục 3 ngày đầu và chỉ được tháo ván khuôn thành sau ít nhất 48 giờ.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 56, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Chống mối mọt nền móng công trình',
    content: 'Phun thuốc chống mối sinh học lên toàn bộ mặt đất nền và hào xung quanh móng trước khi đổ bê tông lót sàn tầng 1.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 57, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Độ dày lớp bê tông bảo vệ cốt thép móng',
    content: 'Chiều dày lớp bê tông bảo vệ thép đài móng tối thiểu phải đạt 50mm (nếu có lót) hoặc 70mm (nếu không lót) để chống rỉ thép do nước ngầm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 58, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Gia cố thép đai cột tại vị trí chân móng',
    content: 'Đoạn chân cột ngàm vào đài móng phải tăng cường đai thép dày hơn (khoảng cách đai a = 100mm) để chống lực cắt lớn khi động đất.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 59, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Độ ẩm cát lấp hố móng',
    content: 'Cát hoặc đất lấp lại hố móng phải tưới ẩm vừa đủ và dùng máy đầm cóc đầm từng lớp dày 20-25cm, không lấp đổ ào ạt gây rỗng sụt lún sau này.',
    tag: 'Quan trọng'
  },
  {
    id: 60, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Chèn khe lún giữa hai nhà liền kề',
    content: 'Giữa tường nhà mới và nhà bên cạnh phải chừa khe hở tối thiểu 2-3cm có chèn xốp EPS và dán tôn úp nóc trên mái để nước không thấm vào khe.',
    tag: 'Quan trọng'
  },
  {
    id: 61, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Tránh đào móng sâu hơn móng hàng xóm',
    content: 'Nếu móng nhà mình sâu hơn đáy móng nhà hàng xóm, phải có biện pháp giữ chân móng cũ bằng hệ giằng neo dầm thép (văng chống).',
    tag: 'Quan trọng'
  },
  {
    id: 62, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Xác định cấp mác bê tông đài móng',
    content: 'Đài móng nhà phố từ 3-5 tầng nên dùng bê tông thương phẩm mác M250 (hoặc C20) có phụ gia chống thấm B6 để tăng tuổi thọ công trình.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 63, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Vị trí đặt hố pít thang máy',
    content: 'Đáy hố pít thang máy sâu hơn mặt sàn tầng 1 từ 1.2m đến 1.4m, phải đổ bê tông đáy và vách dày 200mm liền khối có quét chống thấm tinh thể thẩm thấu.',
    tag: 'Quan trọng'
  },
  {
    id: 64, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Lấy mẫu thí nghiệm nén bê tông móng',
    content: 'Mỗi mẻ đổ bê tông móng từ 20-50m3 phải đúc tối thiểu 1 tổ mẫu (3 viên khối vuông 150x150mm) để nén kiểm tra cường độ 7 ngày và 28 ngày.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 65, step: 1, category: 'Khảo sát & Đất nền',
    title: 'Kiểm tra hiện tượng trồi đất khi ép cọc',
    content: 'Khi ép nhiều cọc ở cự ly gần trên đất sét dẻo, đất có thể bị đùn trồi làm nứt sân nhà hàng xóm. Cần khoan mồi rút bớt đất nếu cần thiết.',
    tag: 'Kinh nghiệm'
  },

  // ==========================================
  // BƯỚC 3: CÔNG NĂNG, MẶT BẰNG & KHÔNG GIAN (ID: 66 - 100)
  // ==========================================
  {
    id: 66, step: 2, category: 'Công năng & Không gian',
    title: 'Chiều cao thông thủy trần phòng khách',
    content: 'Tầng 1 phòng khách nên có chiều cao sàn đến sàn từ 3.6m đến 3.9m để không gian thoáng đãng, sau khi đóng trần thạch cao còn lọt lòng 2.9m - 3.2m.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 67, step: 2, category: 'Công năng & Không gian',
    title: 'Chiều cao bậc cầu thang chuẩn nhân trắc học',
    content: 'Chiều cao cổ bậc cầu thang chuẩn từ 15cm đến 17cm, bề rộng mặt bậc từ 25cm đến 28cm để bước chân không bị mỏi, đặc biệt cho trẻ em và người già.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 68, step: 2, category: 'Công năng & Không gian',
    title: 'Số bậc cầu thang theo cung Sinh - Lão - Bệnh - Tử',
    content: 'Số bậc từ sàn tầng này lên sàn tầng kia thường tính theo công thức 4n + 1 (ví dụ 17 bậc, 21 bậc, 25 bậc) để rơi vào cung Sinh tốt lành.',
    tag: 'Mẹo hay'
  },
  {
    id: 69, step: 2, category: 'Công năng & Không gian',
    title: 'Độ dốc ram dốc tầng hầm ô tô',
    content: 'Độ dốc ram dốc xuống hầm theo tiêu chuẩn không được vượt quá 15% - 20% và phải có rãnh cắt nước chống trượt để xe không bị quẹt gầm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 70, step: 2, category: 'Công năng & Không gian',
    title: 'Diện tích giếng trời tối thiểu lấy sáng',
    content: 'Giếng trời nhà ống sâu trên 15m nên có diện tích tối thiểu từ 4m2 đến 6m2 để tạo luồng đối lưu hút gió tươi mát từ dưới lên nóc mái.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 71, step: 2, category: 'Công năng & Không gian',
    title: 'Bố trí phòng ngủ người cao tuổi ở tầng 1',
    content: 'Gia đình có ông bà lớn tuổi nên bố trí 1 phòng ngủ tại tầng trệt có nhà vệ sinh cửa rộng, sàn không giật cấp để tránh nguy cơ trượt ngã.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 72, step: 2, category: 'Công năng & Không gian',
    title: 'Khoảng cách tam giác công năng trong bếp',
    content: 'Tam giác bếp gồm: Tủ lạnh - Chậu rửa - Bếp nấu phải có tổng chu vi từ 3.6m đến 6.5m để người nấu thao tác nhanh nhất, không bị vướng chéo.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 73, step: 2, category: 'Công năng & Không gian',
    title: 'Kích thước lọt lòng cửa chính theo thước Lỗ Ban',
    content: 'Kích thước thông thủy cửa chính 4 cánh hoặc 2 cánh nên chọn theo cung đỏ của thước Lỗ Ban 52.2cm (thước thông thủy nhà cửa).',
    tag: 'Mẹo hay'
  },
  {
    id: 74, step: 2, category: 'Công năng & Không gian',
    title: 'WC không đè lên phòng thờ hoặc bếp',
    content: 'Trong thiết kế mặt bằng tầng trên, tuyệt đối tránh bố trí bồn cầu hoặc hộp kỹ thuật nằm ngay phía trên ban thờ hoặc vị trí bếp nấu tầng dưới.',
    tag: 'Quan trọng'
  },
  {
    id: 75, step: 2, category: 'Công năng & Không gian',
    title: 'Khoảng cách giữa hai mép giường ngủ và tường',
    content: 'Lối đi hai bên giường ngủ tối thiểu rộng 60-70cm để thuận tiện thay ga nệm và mở cánh tủ quần áo.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 76, step: 2, category: 'Công năng & Không gian',
    title: 'Độ dốc thoát nước sàn nhà vệ sinh',
    content: 'Sàn WC phải đánh dốc từ 1.5% đến 2% về phía phễu thu sàn (ga thoát sàn) để nước thoát nhanh, không bị ứ đọng vũng.',
    tag: 'Quan trọng'
  },
  {
    id: 77, step: 2, category: 'Công năng & Không gian',
    title: 'Bố trí cửa sổ mở lấy sáng tự nhiên',
    content: 'Diện tích mở cửa sổ đón gió lấy sáng nên chiếm tối thiểu 15-20% diện tích sàn của phòng đó để phòng không bị ẩm mốc thiếu khí.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 78, step: 2, category: 'Công năng & Không gian',
    title: 'Chiều cao tay vịn lan can cầu thang',
    content: 'Tay vịn cầu thang phải cao từ 90cm đến 100cm tính từ mũi bậc; lan can ban công tầng cao phải cao tối thiểu 1.1m đến 1.4m có song dọc không cho trẻ leo trèo.',
    tag: 'Quan trọng'
  },
  {
    id: 79, step: 2, category: 'Công năng & Không gian',
    title: 'Khu vực giặt phơi nên có mái che lấy sáng',
    content: 'Sân phơi nên dùng tấm polycarbonate hoặc kính dán an toàn có lam gió để quần áo mau khô kể cả trời mưa gió.',
    tag: 'Mẹo hay'
  },
  {
    id: 80, step: 2, category: 'Công năng & Không gian',
    title: 'Kích thước hố thang máy gia đình',
    content: 'Thang máy mini 350-450kg cần kích thước thông thủy hố thang khoảng 1500x1500mm, chiều cao tầng trên cùng (OH) tối thiểu 3.8m đến 4.2m.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 81, step: 2, category: 'Công năng & Không gian',
    title: 'Ngăn mùi nhà vệ sinh bằng bẫy nước P-trap',
    content: 'Mọi phễu thoát sàn và chậu rửa mặt lavabo bắt buộc phải có xiphong uốn bẫy nước chữ P để chặn khí gas hôi từ hầm cầu xông ngược lên.',
    tag: 'Quan trọng'
  },
  {
    id: 82, step: 2, category: 'Công năng & Không gian',
    title: 'Chiều cao trần tầng lửng',
    content: 'Tầng lửng nên có chiều cao từ sàn lửng đến trần từ 2.6m đến 2.8m để vừa vặn, không bị tù túng ngột ngạt.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 83, step: 2, category: 'Công năng & Không gian',
    title: 'Phòng ngủ master cách âm tiếng ồn',
    content: 'Tường ngăn phòng ngủ master giáp đường lớn nên xây tường đôi 220mm hoặc ốp tấm tiêu âm, cửa sổ dùng kính hộp 2 lớp cách âm chân không.',
    tag: 'Mẹo hay'
  },
  {
    id: 84, step: 2, category: 'Công năng & Không gian',
    title: 'Vị trí đặt máy bơm tăng áp',
    content: 'Máy bơm tăng áp nước sinh hoạt nên đặt trên mái kèm đệm cao su giảm chấn và nón che chống ồn để không rung sàn phòng ngủ.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 85, step: 2, category: 'Công năng & Không gian',
    title: 'Khoang đỗ xe ô tô trong nhà',
    content: 'Kích thước gara trong nhà tối thiểu cho xe sedan/SUV là rộng 3.2m x dài 5.5m, sàn phải ốp gạch chịu tải và dễ xịt rửa dầu mỡ.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 86, step: 2, category: 'Công năng & Không gian',
    title: 'Cửa phòng vệ sinh không đối diện cửa phòng ngủ',
    content: 'Theo phong thủy và thẩm mỹ, cửa WC không nên mở thẳng vào đầu giường hoặc đối diện chính diện cửa ra vào phòng ngủ.',
    tag: 'Mẹo hay'
  },
  {
    id: 87, step: 2, category: 'Công năng & Không gian',
    title: 'Độ đua ban công theo quy định lộ giới',
    content: 'Độ vươn ban công phụ thuộc lộ giới đường: đường dưới 7m không được đua; đường từ 7-12m được đua 0.9m; từ 12-15m được đua 1.2m.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 88, step: 2, category: 'Công năng & Không gian',
    title: 'Khe thoáng kỹ thuật sau nhà',
    content: 'Nên bớt lại 1m đến 1.5m đất sân sau làm sân ướt và khe thông gió, giúp các phòng phía sau nhà phố luôn có cửa sổ mở ra khí trời.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 89, step: 2, category: 'Công năng & Không gian',
    title: 'Đèn cảm ứng tự động cầu thang và hành lang',
    content: 'Lắp cảm biến hồng ngoại tại chân cầu thang và hành lang để tự bật đèn ban đêm khi có người già hoặc trẻ nhỏ thức dậy đi vệ sinh.',
    tag: 'Mẹo hay'
  },
  {
    id: 90, step: 2, category: 'Công năng & Không gian',
    title: 'Chiều cao mặt bàn bếp và tủ bếp',
    content: 'Mặt bàn bếp nấu tiêu chuẩn cao từ 81cm đến 86cm (vừa tầm tay phụ nữ Việt Nam), đáy tủ treo trên cao cách mặt bàn từ 60cm đến 65cm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 91, step: 2, category: 'Công năng & Không gian',
    title: 'Cửa thông gió cưỡng bức trong nhà vệ sinh',
    content: 'WC nếu không có cửa sổ mở trực tiếp ra giếng trời bắt buộc phải có quạt hút mùi âm trần thổi vào hộp gen kỹ thuật lên mái.',
    tag: 'Quan trọng'
  },
  {
    id: 92, step: 2, category: 'Công năng & Không gian',
    title: 'Phân chia khu khô và khu ướt trong WC',
    content: 'Dùng vách kính tắm đứng ngăn khu vực vòi sen và bồn cầu để sàn nhà vệ sinh luôn khô ráo, không bị ướt chân dép.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 93, step: 2, category: 'Công năng & Không gian',
    title: 'Chiếu nghỉ cầu thang không nên chia bậc rẽ quạt',
    content: 'Chiếu nghỉ cầu thang nên là một mặt phẳng vuông vức, tránh chia 2 hay 3 bậc tam giác (bậc rẻ quạt) vì rất dễ hụt chân ngã.',
    tag: 'Quan trọng'
  },
  {
    id: 94, step: 2, category: 'Công năng & Không gian',
    title: 'Hệ thống rèm cửa 2 lớp chống nắng hướng Tây',
    content: 'Nhà hướng Tây nên thiết kế hộc rèm âm trần sâu 18-20cm để lắp rèm vải cản sáng 100% kèm rèm voan trang trí.',
    tag: 'Mẹo hay'
  },
  {
    id: 95, step: 2, category: 'Công năng & Không gian',
    title: 'Kho chứa đồ gầm cầu thang',
    content: 'Tận dụng toàn bộ gầm cầu thang tầng trệt làm tủ giày dép hoặc kho để máy hút bụi, vali du lịch giúp nhà cửa gọn gàng.',
    tag: 'Mẹo hay'
  },
  {
    id: 96, step: 2, category: 'Công năng & Không gian',
    title: 'Thiết kế ổ cắm điện cho robot hút bụi',
    content: 'Bố trí sẵn ổ cắm điện cách sàn 30cm ở góc khuất phòng khách hoặc gầm tủ để đặt trạm sạc cho robot hút bụi tự động.',
    tag: 'Mẹo hay'
  },
  {
    id: 97, step: 2, category: 'Công năng & Không gian',
    title: 'Góc làm việc tại nhà (Home Office)',
    content: 'Bàn làm việc nên đặt vuông góc với cửa sổ để nhận ánh sáng tự nhiên bên hông, tránh ánh sáng chiếu trực diện gây lóa màn hình máy tính.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 98, step: 2, category: 'Công năng & Không gian',
    title: 'Thùng rác âm tủ bếp',
    content: 'Thiết kế khoang lắp thùng rác ray kéo gắn liền cánh tủ dưới bồn rửa để thao tác gọt rửa bỏ rác sạch sẽ không bốc mùi.',
    tag: 'Mẹo hay'
  },
  {
    id: 99, step: 2, category: 'Công năng & Không gian',
    title: 'Sân thượng trồng cây có vòi xịt nước',
    content: 'Để sẵn 1 vòi nước cấp và 1 ổ cắm điện ngoài trời chống nước trên sân thượng để lắp hệ thống tưới cây tự động.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 100, step: 2, category: 'Công năng & Không gian',
    title: 'Độ cao bồn cầu vệ sinh',
    content: 'Chiều cao bồn cầu tiêu chuẩn từ sàn đến mặt bệ ngồi là 40cm, đối với người cao tuổi hoặc khuyết tật nên chọn loại 43-45cm.',
    tag: 'Tiêu chuẩn'
  },

  // ==========================================
  // BƯỚC 4: KIẾN TRÚC & HOÀN THIỆN (ID: 101 - 135)
  // ==========================================
  {
    id: 101, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Chống thấm sàn vệ sinh và ban công 3 lớp',
    content: 'Sàn khu ướt phải quét màng chống thấm polyme đàn hồi (như Sikatop Seal 107) tối thiểu 2-3 lớp, quét vén chân tường cao 30-50cm và ngâm thử nước 48h.',
    tag: 'Quan trọng'
  },
  {
    id: 102, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Chọn gạch men chống trơn R10-R11 cho phòng tắm',
    content: 'Gạch lát sàn nhà vệ sinh phải có bề mặt nhám sần, hệ số chống trơn trượt từ R10 trở lên để chống trượt ngã khi có xà phòng.',
    tag: 'Quan trọng'
  },
  {
    id: 103, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Kính dán an toàn 2 lớp cho mặt tiền',
    content: 'Cửa nhôm kính mặt ngoài nhà nên dùng kính dán an toàn 8.38mm hoặc kính hộp cách âm cách nhiệt để không bị vỡ rơi mảnh nguy hiểm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 104, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Sơn lót kháng kiềm ngoại thất bắt buộc',
    content: 'Sơn ngoài trời phải lăn tối thiểu 1 lớp sơn lót kháng kiềm chất lượng cao trước khi lăn 2 lớp sơn màu phủ để tường không bị ố vàng, bong tróc.',
    tag: 'Quan trọng'
  },
  {
    id: 105, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Độ dốc mái ngói Thái và mái Nhật',
    content: 'Mái ngói Thái cần độ dốc từ 30° đến 35° để thoát nước mưa cực nhanh; mái Nhật độ dốc từ 25° đến 30° tạo dáng mềm mại trang nhã.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 106, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Trần thạch cao chống ẩm tấm xanh cho nhà vệ sinh',
    content: 'Khu vực bếp và phòng vệ sinh bắt buộc dùng tấm thạch cao chịu ẩm (tấm màu xanh lá) hoặc tấm Calcium Silicate để không bị mục rữa.',
    tag: 'Quan trọng'
  },
  {
    id: 107, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Ke nêm cân bằng khi ốp lát gạch khổ lớn',
    content: 'Khi lát gạch 800x800mm hoặc 600x1200mm, bắt buộc thợ phải dùng ke chữ thập và nêm cân bằng để mạch gạch phẳng tuyệt đối, không bị gồ ghề.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 108, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Chèn silicon chống thấm khung cửa sổ',
    content: 'Khoảng hở giữa khung nhôm cửa sổ và tường gạch phải bơm bọt xốp nở PU Foam và miết keo silicon ngoại thất chịu tia UV chống nước mưa tạt.',
    tag: 'Quan trọng'
  },
  {
    id: 109, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Bản lề và phụ kiện cửa inox 304',
    content: 'Phụ kiện cửa sổ, cửa đi tiếp xúc thời tiết phải dùng chuẩn Inox 304 chống rỉ sét muối mặn, tránh dùng inox 201 mau hoen rỉ kẹt cửa.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 110, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Đóng lưới mắt cáo chống nứt tường tại đường ống điện',
    content: 'Toàn bộ rãnh đục ống điện nước âm tường và vị trí tiếp giáp giữa cột bê tông với tường gạch phải đóng lưới thép mắt cáo trước khi trát vữa.',
    tag: 'Quan trọng'
  },
  {
    id: 111, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Bảo dưỡng vữa trát tường sau khi tô',
    content: 'Tường trát xong sau 24h phải tưới nước bảo dưỡng liên tục 2-3 ngày để xi măng thủy hóa không bị nứt chân chim và bột rộp vữa.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 112, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Gờ chỉ ngắt nước (chỉ nước) dưới ban công',
    content: 'Đáy ban công và lanh-tô cửa sổ bên ngoài phải đắp gờ chỉ ngắt nước dạng rãnh âm để nước mưa không chảy ngược vào chân cửa sổ.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 113, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Độ phẳng trần thạch cao trước khi bả matit',
    content: 'Khung xương trần thạch cao phải bắn ty ren cách nhau tối đa 80cm và bắt vít liên kết tấm cách mép 10-15cm để trần không bị võng lượn sóng.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 114, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Dùng keo chà ron gốc Epoxy chống ố đen',
    content: 'Mạch gạch sàn nhà tắm nên chít keo chà ron gốc Epoxy 2 thành phần chống thấm chống mốc, thay cho bột chét xi măng trắng dễ bong đen.',
    tag: 'Mẹo hay'
  },
  {
    id: 115, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Lớp xốp cách nhiệt dưới mái tôn hoặc sân thượng',
    content: 'Dưới mái tôn hoặc dưới lớp gạch chống nóng sân thượng nên chèn lớp xốp XPS dày 30-50mm để giảm nhiệt truyền xuống phòng ngủ tầng trên.',
    tag: 'Mẹo hay'
  },
  {
    id: 116, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Màu sơn hợp mệnh ngũ hành',
    content: 'Màu sơn chủ đạo mặt tiền nên chọn gam màu tương sinh hoặc tương hợp theo mệnh gia chủ, kết hợp 1-2 màu trung tính (trắng, ghi) để không lỗi mốt.',
    tag: 'Mẹo hay'
  },
  {
    id: 117, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Nẹp nhôm V bảo vệ góc tường',
    content: 'Các góc cột vuông trong nhà nên gắn nẹp chỉ góc bằng nhôm hoặc đồng khi trát bả để góc tường vuông nét và chống sứt mẻ khi va quẹt đồ đạc.',
    tag: 'Mẹo hay'
  },
  {
    id: 118, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Cửa nhựa Composite cách âm cho phòng ngủ',
    content: 'Cửa thông phòng nên dùng cửa gỗ nhựa Composite chống mối mọt 100%, có gioăng cao su giảm chấn đóng mở êm ái cách âm rất tốt.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 119, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Đá tự nhiên ốp mặt tiền chống bay màu',
    content: 'Mặt tiền nên ốp đá Granite tự nhiên hoặc đá Marble nhân tạo chịu nhiệt, tránh dùng gạch men giá rẻ dễ bị ố mốc và bong rớt sau vài năm.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 120, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Lam chắn nắng nhôm hoặc gỗ nhựa hướng Tây',
    content: 'Mặt tiền hướng Tây nên bố trí hệ lam chắn nắng đứng hoặc ngang bằng nhôm hình elip hoặc gỗ nhựa ngoài trời để cản 70% bức xạ nhiệt.',
    tag: 'Mẹo hay'
  },
  {
    id: 121, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Khe co giãn cho sàn gạch diện tích lớn',
    content: 'Sân thượng hoặc phòng có diện tích lát gạch trên 30m2 phải để khe co giãn viền chân tường từ 5-10mm để gạch không bị nổ phồng khi trời nắng gắt.',
    tag: 'Quan trọng'
  },
  {
    id: 122, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Độ bóng của sơn nội thất',
    content: 'Nên dùng sơn bóng nhẹ (semi-gloss) hoặc sơn lau chùi hiệu quả cho phòng khách và bếp để dễ lau vết bút màu của trẻ con hoặc dầu mỡ bám.',
    tag: 'Mẹo hay'
  },
  {
    id: 123, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Kiểm tra độ ẩm tường trước khi sơn bả',
    content: 'Độ ẩm tường gạch trước khi sơn bả matit phải dưới 16% (đo bằng máy Protimeter). Không được sơn khi tường còn ẩm vì sẽ làm bong rộp màng sơn.',
    tag: 'Quan trọng'
  },
  {
    id: 124, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Chống thấm cổ ống xuyên sàn',
    content: 'Mọi ống thoát nước đâm xuyên qua sàn bê tông phải được đục vát chữ V, quấn thanh trương nở cao su và đổ bù vữa tự chảy không co ngót Sika Grout.',
    tag: 'Quan trọng'
  },
  {
    id: 125, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Lắp khóa cửa thông minh (Smart Lock)',
    content: 'Cửa chính nên lắp khóa vân tay kết hợp mã số và thẻ từ có kết nối điện thoại để quản lý mở cửa từ xa và không lo quên chìa khóa.',
    tag: 'Mẹo hay'
  },
  {
    id: 126, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Vách kính cường lực phòng tắm dày 10mm',
    content: 'Vách tắm đứng phải dùng kính cường lực 10mm có mài cạnh xiết bóng và dán phim an toàn chống nổ vỡ mảnh vụn.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 127, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Mặt đá bếp đá Vicostone hoặc Granite đen',
    content: 'Đá mặt bếp nên chọn đá thạch anh nhân tạo (Vicostone) hoặc đá hoa cương đen Ấn Độ/Kim Sa vì khả năng chống ố ngấm dầu mỡ và chống xước tốt.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 128, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Cửa sổ lùa hay cửa sổ mở quay?',
    content: 'Cửa sổ mở hất (bật) ra ngoài 45 độ giúp thông gió ngay cả khi trời mưa mà không bị tạt nước, an toàn hơn cửa mở quay khi có gió giật.',
    tag: 'Mẹo hay'
  },
  {
    id: 129, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Sơn chống rỉ cho sắt thép ngoài trời',
    content: 'Khung sắt chuồng cọp, lan can sắt ngoài trời phải sơn 1 lớp chống rỉ Epoxy 2 thành phần trước khi sơn phủ màu để sắt không bị mục rỗng bên trong.',
    tag: 'Quan trọng'
  },
  {
    id: 130, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Phào chỉ thạch cao hay nhựa PU?',
    content: 'Nhà phong cách Tân cổ điển nên dùng phào chỉ nhựa PU/PS chống cong vênh ẩm mốc, sắc nét và nhẹ hơn phào xi măng hoặc thạch cao truyền thống.',
    tag: 'Mẹo hay'
  },
  {
    id: 131, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Thảm cỏ nhân tạo sân thượng cần thoát nước tốt',
    content: 'Trải cỏ nhân tạo trên sân thượng phải kê tấm vỉ thoát nước nhựa (drainage cell) bên dưới để nước mưa không bị ứ đọng làm bốc mùi hôi thối.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 132, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Vệt keo dán gạch thay thế hồ dầu',
    content: 'Ốp gạch tường phòng tắm và mặt tiền bắt buộc dùng keo dán gạch chuyên dụng trộn sẵn, kéo răng cưa 100% diện tích gạch để gạch không bị rơi rụng.',
    tag: 'Quan trọng'
  },
  {
    id: 133, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Đèn LED chiếu sáng chỉ số hoàn màu CRI > 80',
    content: 'Đèn âm trần trong nhà nên chọn nhiệt độ màu 3000K-4000K (vàng ấm đến trung tính) và độ hoàn màu CRI > 80 để tôn lên màu sắc đồ nội thất và da người.',
    tag: 'Mẹo hay'
  },
  {
    id: 134, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Gạch thông gió bánh ú chắn mưa',
    content: 'Xây tường lấy sáng thông gió mặt tiền nên dùng gạch bánh ú hoặc gạch hạ u ban công vừa thông gió tự nhiên vừa ngăn mưa tạt vào trong nhà.',
    tag: 'Mẹo hay'
  },
  {
    id: 135, step: 3, category: 'Kiến trúc & Hoàn thiện',
    title: 'Hèm cửa có ron cao su giảm chấn',
    content: 'Mọi khung cửa gỗ, nhôm kính đều phải có rãnh cài ron cao su EPDM để khi đóng cửa không phát ra tiếng va đập "cạch" ồn ào.',
    tag: 'Tiêu chuẩn'
  },

  // ==========================================
  // BƯỚC 5: KẾT CẤU & CƠ ĐIỆN M&E (ID: 136 - 175)
  // ==========================================
  {
    id: 136, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Bảo dưỡng bê tông sàn 7 ngày đầu',
    content: 'Sàn bê tông sau khi đổ 4-6h phải phủ bao bố hoặc nilon giữ ẩm, tưới nước liên tục 3 lần/ngày trong 7 ngày đầu để bê tông phát triển tối đa cường độ.',
    tag: 'Quan trọng'
  },
  {
    id: 137, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Chiều dài đoạn nối thép dầm cột',
    content: 'Thép chủ nối buộc phải có chiều dài đoạn nối tối thiểu 30d đến 40d (với d là đường kính thép) và vị trí nối phải so le, không nối tại vùng chịu lực uốn tối đa.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 138, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Con kê bê tông đúc sẵn đảm bảo cữ bảo vệ',
    content: 'Bắt buộc dùng con kê bê tông mác cao chuyên dụng (kê 20mm, 25mm, 30mm) để cố định thép sàn dầm, tuyệt đối không dùng gạch vỡ hay sỏi đá kê thép.',
    tag: 'Quan trọng'
  },
  {
    id: 139, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Thời gian dỡ ván khuôn cốp pha dầm sàn',
    content: 'Cốp pha đáy dầm sàn nhịp dưới 4m chỉ được dỡ sau 10-14 ngày; nhịp trên 4m chỉ được dỡ sau 21-28 ngày hoặc khi có cây chống điểm chuyển tải an toàn.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 140, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Mác bê tông dầm sàn nhà phố',
    content: 'Bê tông dầm sàn nhà phố nên dùng mác M250 (đá 1x2, độ sụt 12+-2cm) đối với nhà dưới 4 tầng, và mác M300 cho nhà từ 5 tầng trở lên.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 141, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Khoảng cách đai thép dầm cột (a100/a200)',
    content: 'Khu vực đầu dầm và chân cột (khoảng cách 1.5-2 lần chiều cao dầm) chịu ứng suất cắt lớn, đai thép phải bố trí dày a100mm, giữa dầm dãn ra a200mm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 142, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Dầm giằng tường trên cửa sổ (Lanh-tô)',
    content: 'Tất cả các ô cửa sổ, cửa đi rộng trên 1m phải đổ dầm lanh-tô bê tông cốt thép gác vào tường mỗi bên tối thiểu 20-25cm để đỡ gạch xây phía trên.',
    tag: 'Quan trọng'
  },
  {
    id: 143, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Tách riêng đường ống thoát phân và nước thải sinh hoạt',
    content: 'Ống thoát bồn cầu (ống đen D110/D90) và ống thoát sàn, lavabo, máy giặt (ống xám D90/D60) phải đi riêng biệt, không đấu chung trước bể phốt.',
    tag: 'Quan trọng'
  },
  {
    id: 144, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Độ dốc tối thiểu của ống thoát nước thải',
    content: 'Ống thoát nước ngang phải có độ dốc từ 1% đến 2% (1m ống dốc xuống 1-2cm). Dốc quá nhỏ nước không trôi bã phân; dốc quá lớn nước chảy hết để lại rác.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 145, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Ống thông hơi bể phốt đi thẳng lên nóc mái',
    content: 'Bể phốt bắt buộc phải có ống thông hơi D34-D48 dẫn thẳng lên nóc mái, cao hơn sàn mái ít nhất 1m và bịt chụp nón chống chim muông làm tổ.',
    tag: 'Quan trọng'
  },
  {
    id: 146, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Aptomat chống giật RCBO/ELCB từng tầng',
    content: 'Tủ điện tổng từng tầng bắt buộc phải có 1 Aptomat chống dòng rò (RCBO 30mA) tự ngắt điện trong 0.03 giây khi có sự cố hở điện nguy hiểm.',
    tag: 'Quan trọng'
  },
  {
    id: 147, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Tiếp địa an toàn cho hệ thống điện (PE)',
    content: 'Hệ thống điện nhà phải đóng cọc tiếp địa đồng sâu 2.5m, điện trở đất R < 4 Ohm để nối dây mass (dây vàng sọc xanh) vào vỏ tủ lạnh, bình nóng lạnh.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 148, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Ống luồn dây điện chống cháy âm tường',
    content: 'Dây điện đi âm tường bắt buộc phải luồn trong ống ghen tròn PVC cứng chống cháy hoặc ống xoắn ruột gà chuyên dụng, không chôn dây trần trong vữa.',
    tag: 'Quan trọng'
  },
  {
    id: 149, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Tiết diện dây dẫn điện phù hợp công suất',
    content: 'Dây trục chính từ đồng hồ về tủ tầng tối thiểu Cu 2x10mm2 hoặc 2x16mm2; dây ổ cắm 2.5mm2; dây bình nóng lạnh và bếp từ 4.0mm2 - 6.0mm2; dây đèn 1.5mm2.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 150, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Thử áp lực đường ống nước hàn nhiệt PPR',
    content: 'Trước khi chôn ống nước nóng lạnh vào tường, bắt buộc phải dùng máy bơm thử áp lực tĩnh 8-10 bar ngâm trong 24 giờ để đảm bảo không bị rò rỉ mối hàn.',
    tag: 'Quan trọng'
  },
  {
    id: 151, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Van 1 chiều chống tràn ngược từ cống ngoài đường',
    content: 'Tại hố ga thoát nước cuối cùng trước khi ra cống ngõ, lắp van lật 1 chiều PVC để ngăn chuột bọ và nước thải ngoài đường tràn ngược vào nhà khi mưa to.',
    tag: 'Mẹo hay'
  },
  {
    id: 152, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Vị trí đặt cục nóng điều hòa thoáng mát',
    content: 'Cục nóng điều hòa phải đặt nơi thông thoáng gió, không phơi nắng gắt hướng Tây và có khoảng cách giải nhiệt phía trước quạt tối thiểu 1.5m.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 153, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Bẫy dầu cho đường ống đồng điều hòa',
    content: 'Khi cục nóng điều hòa đặt cao hơn cục lạnh từ 3m trở lên, thợ lắp ống đồng phải uốn bẫy dầu (oil trap) hình chữ U để dầu máy lạnh hồi về lốc máy.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 154, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Bố trí phễu thu sàn chống hôi (Ga thoát sàn)',
    content: 'Chọn phễu thu sàn bằng đồng hoặc inox 304 có nắp lật lò xo hoặc cốc trữ nước chống hôi và lưới lọc tóc chống tắc đường ống.',
    tag: 'Mẹo hay'
  },
  {
    id: 155, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Độ cao ổ cắm điện khu vực bếp và phòng tắm',
    content: 'Ổ cắm bếp đặt cao hơn mặt đá bếp 20-30cm; ổ cắm phòng tắm phải có nắp che chống nước bắn chuẩn IP55 và cách vòi sen tối thiểu 1.2m.',
    tag: 'Quan trọng'
  },
  {
    id: 156, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Đầm dùi bê tông đúng kỹ thuật',
    content: 'Đầm dùi bê tông phải cắm thẳng góc sâu vào lớp dưới 10cm, mỗi điểm đầm từ 15-30 giây cho đến khi mặt bê tông nổi váng bọt, không đầm quá lâu gây phân tầng.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 157, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Đường ống thoát nước ngưng điều hòa',
    content: 'Ống thoát nước ngưng điều hòa (ống PVC D21 hoặc D27) phải bọc xốp bảo ôn chống đọng sương làm ố trần thạch cao và dẫn vào phễu thu, không xả ra sàn mái.',
    tag: 'Quan trọng'
  },
  {
    id: 158, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Bể phốt 3 ngăn tự hoại đúng chuẩn',
    content: 'Bể phốt 3 ngăn gồm: Ngăn chứa (chiếm 1/2 dung tích), ngăn lắng (1/4 dung tích), ngăn lọc (1/4 dung tích). Ống thông giữa các ngăn phải lắp cút cút chữ T chúc xuống.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 159, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Hệ thống chống sét lan truyền cho thiết bị điện tử',
    content: 'Lắp thiết bị cắt sét lan truyền (SPD) trong tủ điện tổng để bảo vệ tivi, máy tính, tủ lạnh không bị cháy vi mạch khi sét đánh gần đường dây điện.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 160, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Bể nước ngầm có lỗ thăm và phao điện tự động',
    content: 'Nắp bể nước ngầm phải có gờ nổi cao hơn sàn gara 10cm để nước rửa xe không chảy vào; lắp rơ-le phao điện 12V an toàn chống giật.',
    tag: 'Quan trọng'
  },
  {
    id: 161, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Ống luồn cáp quang Internet và dây mạng Cat6',
    content: 'Đi dây mạng LAN chuẩn Cat6 âm tường đến từng phòng ngủ và vị trí đặt tivi để đảm bảo kết nối mạng ổn định không phụ thuộc vào sóng wifi.',
    tag: 'Mẹo hay'
  },
  {
    id: 162, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Chống nứt góc cửa sổ bằng thanh thép chéo',
    content: 'Tại 4 góc ô cửa sổ và cửa đi chịu ứng suất tập trung, phải đặt thêm 2 thanh thép phi 10 dài 80cm chéo 45 độ để chống nứt xé tường tại góc.',
    tag: 'Quan trọng'
  },
  {
    id: 163, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Hộp gen kỹ thuật có cửa thăm (Access Door)',
    content: 'Hộp gen kỹ thuật nước phải chừa ô cửa thăm ở từng tầng để sau này dễ dàng luồn dây điện bổ sung hoặc xử lý rò rỉ khớp nối ống nước.',
    tag: 'Mẹo hay'
  },
  {
    id: 164, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Công tắc đảo chiều (công tắc cầu thang) 2 vị trí',
    content: 'Đèn cầu thang và đèn phòng ngủ master nên đấu công tắc 2 chiều: bật ở chân cầu thang và tắt ở đầu cầu thang, hoặc bật ở cửa và tắt ở đầu giường.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 165, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Mạch ngừng bê tông khi đổ ngắt quãng',
    content: 'Nếu phải ngắt quãng khi đổ bê tông dầm sàn, mạch ngừng phải đặt ở vị trí 1/3 nhịp dầm (nơi có mô men uốn và lực cắt nhỏ nhất) và tạo nhám trước khi đổ tiếp.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 166, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Ống cấp nước nóng năng lượng mặt trời',
    content: 'Đường ống nước nóng năng lượng mặt trời phải dùng ống PPR chịu nhiệt bọc lớp nhôm hoặc bọc xốp bạc cách nhiệt để giữ nhiệt độ nước qua đêm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 167, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Hố ga lắng cát trước khi xả ra cống chung',
    content: 'Nước thải sân sau và bếp rửa dầu mỡ phải qua hố ga có ngăn lắng cát và giỏ chặn rác trước khi xả ra đường cống chính.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 168, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Lưới lọc rác quả cầu inox trên phễu thu mái',
    content: 'Phễu thu nước mưa trên sàn mái và sê-nô phải lắp quả cầu chắn rác bằng inox để lá cây và rác không chui vào làm tắc ống thoát đứng.',
    tag: 'Quan trọng'
  },
  {
    id: 169, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Râu thép neo tường gạch vào cột bê tông',
    content: 'Khi đổ cột bê tông phải cấy sẵn râu thép phi 6 dài 50-60cm cứ mỗi khoảng cách 50cm (khoảng 5 hàng gạch) để neo liên kết tường gạch chống đổ.',
    tag: 'Quan trọng'
  },
  {
    id: 170, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Nguồn điện dự phòng cho cổng tự động',
    content: 'Cổng xếp hoặc cửa cuốn gara ô tô nên lắp bộ lưu điện UPS để khi mất điện vẫn có thể mở cửa xe ra vào bình thường.',
    tag: 'Mẹo hay'
  },
  {
    id: 171, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Phân pha cân bằng tải cho điện 3 pha',
    content: 'Nếu nhà dùng điện 3 pha, kỹ sư điện phải tính toán chia đều công suất các tầng vào 3 pha để tránh lệch pha gây sụt áp hoặc nhảy át tổng.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 172, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Khống chế độ võng dầm nhịp lớn',
    content: 'Dầm nhịp trên 5m nên làm độ vồng thi công (camber) hướng lên trên khoảng 1/1000 đến 3/1000 chiều dài nhịp khi ghép ván khuôn đáy dầm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 173, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Vị trí đặt đồng hồ đo nước và áp lực nước',
    content: 'Lắp đồng hồ nước tại vị trí dễ quan sát kiểm tra chỉ số và lắp thêm đồng hồ đo áp suất sau máy bơm để phát hiện sự cố tắc nghẽn sớm.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 174, step: 4, category: 'Kết cấu & Bê tông',
    title: 'Thép mũ sàn chịu mô men âm gối dầm',
    content: 'Lớp thép mũ sàn chịu lực âm tại gối dầm phải có chân chó thép uốn giữ cữ cao độ, tránh bị công nhân giẫm bẹp sát đáy sàn mất tác dụng.',
    tag: 'Quan trọng'
  },
  {
    id: 175, step: 4, category: 'Cơ điện & Cấp thoát nước',
    title: 'Ống thông hơi phụ cho bồn cầu nhà cao tầng',
    content: 'Nhà từ 4 tầng trở lên cần có ống thông hơi phụ D60 chạy song song với ống thoát phân D110 để không bị hiện tượng hút cạn bẫy nước bồn cầu tầng dưới.',
    tag: 'Tiêu chuẩn'
  },

  // ==========================================
  // BƯỚC 6: NGÂN SÁCH, HỢP ĐỒNG & GIÁM SÁT (ID: 176 - 200)
  // ==========================================
  {
    id: 176, step: 5, category: 'Chi phí & Quản lý',
    title: 'Dự trù quỹ phát sinh 5% - 10%',
    content: 'Xây nhà luôn có những phát sinh ngoài ý muốn (nâng cấp thiết bị vệ sinh, đèn chùm, điều chỉnh nội thất), hãy giữ lại 7-10% ngân sách dự phòng.',
    tag: 'Quan trọng'
  },
  {
    id: 177, step: 5, category: 'Chi phí & Quản lý',
    title: 'Bảng bóc tách khối lượng chi tiết (BOQ)',
    content: 'Yêu cầu nhà thầu cung cấp bảng dự toán chi tiết rõ từng mã hiệu vật tư (thương hiệu, xuất xứ, đơn giá) thay vì chỉ ký hợp đồng khoán gọn theo m2.',
    tag: 'Quan trọng'
  },
  {
    id: 178, step: 5, category: 'Chi phí & Quản lý',
    title: 'Tiến độ giải ngân theo giai đoạn nghiệm thu',
    content: 'Chia nhỏ thành 6-8 đợt thanh toán theo công đoạn: móng (15%), đổ sàn các tầng (10%/sàn), xây tô (15%), hoàn thiện (20%), giữ lại 5% bảo hành.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 179, step: 5, category: 'Chi phí & Quản lý',
    title: 'Giữ lại tiền bảo hành công trình',
    content: 'Hợp đồng cần quy định giữ lại 3% - 5% tổng giá trị công trình trong thời gian bảo hành (thường 12 tháng) và trả sau khi nghiệm thu hết bảo hành.',
    tag: 'Quan trọng'
  },
  {
    id: 180, step: 5, category: 'Chi phí & Quản lý',
    title: 'Điều khoản thưởng phạt tiến độ rõ ràng',
    content: 'Quy định phạt nhà thầu chậm tiến độ từ 0.1% - 0.2%/ngày trễ hạn và thưởng nếu bàn giao trước hạn với chất lượng đảm bảo.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 181, step: 5, category: 'Chi phí & Quản lý',
    title: 'Nghiệm thu cốt thép dầm sàn trước khi đổ bê tông',
    content: 'Chủ nhà hoặc giám sát độc lập phải ký biên bản nghiệm thu cốt thép (số lượng cây, đường kính, khoảng cách đai, con kê) trước khi xe bê tông xả hàng.',
    tag: 'Quan trọng'
  },
  {
    id: 182, step: 5, category: 'Chi phí & Quản lý',
    title: 'Ký xác nhận phát sinh bằng văn bản trước khi làm',
    content: 'Mọi thay đổi thiết kế hoặc vật tư phát sinh chi phí bắt buộc phải lập biên bản có chữ ký thỏa thuận đơn giá của hai bên trước khi thợ thi công.',
    tag: 'Quan trọng'
  },
  {
    id: 183, step: 5, category: 'Chi phí & Quản lý',
    title: 'Bảo hành kết cấu 5 năm, thấm dột 2 năm',
    content: 'Hợp đồng thi công trọn gói uy tín phải cam kết bảo hành phần khung kết cấu chịu lực tối thiểu 5 năm và phần chống thấm dột tối thiểu 2 năm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 184, step: 5, category: 'Chi phí & Quản lý',
    title: 'Tận dụng cửa nhôm và thiết bị cũ nếu còn tốt',
    content: 'Nếu cải tạo nhà, có thể bóc giữ lại cửa cuốn, téc nước inox hoặc máy bơm cũ còn dùng tốt để giảm bớt chi phí đầu tư ban đầu.',
    tag: 'Mẹo hay'
  },
  {
    id: 185, step: 5, category: 'Chi phí & Quản lý',
    title: 'Lựa chọn gói Chìa khóa trao tay tiết kiệm thời gian',
    content: 'Gói trọn gói giúp chủ nhà bận rộn không phải tốn hàng trăm giờ đi mua cát, gạch, sơn và tránh được sự đổ lỗi bảo hành giữa các đội thợ.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 186, step: 5, category: 'Chi phí & Quản lý',
    title: 'Mua thiết bị vệ sinh vào các đợt khuyến mãi lớn',
    content: 'Canh các đợt sale cuối năm của các hãng thiết bị (Inax, Toto, Caesar) để mua trước bồn cầu, vòi sen gửi kho nhà phân phối giúp tiết kiệm 15-20%.',
    tag: 'Mẹo hay'
  },
  {
    id: 187, step: 5, category: 'Chi phí & Quản lý',
    title: 'Kiểm tra niêm phong kẹp chì xe bồn bê tông',
    content: 'Khi xe bê tông tươi đến công trình, kiểm tra kẹp chì thùng trộn và phiếu giao nhận (đúng mác M250/M300, đúng giờ xuất xưởng dưới 2 tiếng).',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 188, step: 5, category: 'Chi phí & Quản lý',
    title: 'Khảo sát giá vật liệu xây dựng địa phương',
    content: 'Tham khảo giá cát xây tô, gạch nung Tuynel của 2-3 cửa hàng VLXD gần nhà để nắm mặt bằng giá chung tránh bị mua hớ.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 189, step: 5, category: 'Chi phí & Quản lý',
    title: 'Hợp đồng thuê tư vấn giám sát độc lập',
    content: 'Nếu không am hiểu kỹ thuật và không có thời gian túc trực, chủ nhà nên thuê 1 kỹ sư giám sát độc lập bán thời gian kiểm tra các thời điểm then chốt.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 190, step: 5, category: 'Chi phí & Quản lý',
    title: 'Thời gian thi công nhà phố tiêu chuẩn',
    content: 'Nhà phố 3-4 tầng diện tích sàn 200-300m2 có tiến độ thi công hợp lý từ 3.5 đến 5 tháng. Quá ép tiến độ sẽ làm giảm chất lượng bảo dưỡng bê tông và vữa.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 191, step: 5, category: 'Chi phí & Quản lý',
    title: 'Thỏa thuận chi phí điện nước thi công',
    content: 'Hợp đồng cần ghi rõ tiền điện nước phục vụ thi công do nhà thầu hay chủ nhà chi trả để tránh thắc mắc khi nhận hóa đơn hàng tháng.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 192, step: 5, category: 'Chi phí & Quản lý',
    title: 'Kiểm soát hao hụt gạch ốp lát',
    content: 'Định mức hao hụt gạch ốp lát do cắt góc cắt chéo thường từ 5% đến 7%. Cần đặt dư số lượng gạch cùng một lô sản xuất để tránh lệch màu khi chắp vá.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 193, step: 5, category: 'Chi phí & Quản lý',
    title: 'Biên bản bàn giao mặt bằng thi công',
    content: 'Ghi rõ ranh giới mốc, hiện trạng tài sản trên đất và ngày bàn giao mặt bằng sạch cho nhà thầu để làm căn cứ tính thời hạn hợp đồng.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 194, step: 5, category: 'Chi phí & Quản lý',
    title: 'Cắt giảm các chi tiết đắp vẽ rườm rà',
    content: 'Nếu ngân sách eo hẹp, hãy chọn phong cách hiện đại đường nét thẳng phẳng, giảm bớt phào chỉ cổ điển đắp tay vừa tốn công thợ vừa khó lau chùi.',
    tag: 'Mẹo hay'
  },
  {
    id: 195, step: 5, category: 'Chi phí & Quản lý',
    title: 'Lập file Excel theo dõi thu chi hàng ngày',
    content: 'Ghi chép toàn bộ chi tiêu từ những khoản nhỏ nhất (tiền nước nôi thợ, tiền mua ốc vít, tiền bồi dưỡng) để không bị hụt hẫng khi tổng kết.',
    tag: 'Mẹo hay'
  },

  // ==========================================
  // BƯỚC 7: MẶT BẰNG, NGHIỆM THU & BÀN GIAO (ID: 196 - 225)
  // ==========================================
  {
    id: 196, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Nghiệm thu ngâm nước sàn vệ sinh 48 giờ',
    content: 'Sau khi quét chống thấm sàn WC, bơm nước ngập 5-10cm ngâm trong 48 giờ và xuống tầng dưới kiểm tra xem có giọt nước nào thấm trần không.',
    tag: 'Quan trọng'
  },
  {
    id: 197, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Kiểm tra độ cân bằng của các ổ cắm điện',
    content: 'Dùng thước thủy nivo kiểm tra mặt công tắc, ổ cắm phải ngay ngắn thẳng hàng, khoảng cách giữa các mặt công tắc liền kề đều đặn 2mm.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 198, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Xả thử tải đồng thời toàn bộ vòi nước',
    content: 'Mở xả nước cùng lúc tất cả các vòi sen, bồn rửa ở các tầng để kiểm tra áp lực nước và đảm bảo đường cống thoát kịp thời không bị trào.',
    tag: 'Quan trọng'
  },
  {
    id: 199, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Kiểm tra độ kín khít của cửa nhôm kính khi mưa gió',
    content: 'Dùng vòi xịt nước áp lực cao phun trực tiếp vào các khe cửa sổ nhôm kính từ bên ngoài để kiểm tra xem có giọt nước nào thấm qua ron cao su không.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 200, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Vệ sinh công nghiệp trước khi dọn về ở',
    content: 'Thuê đội vệ sinh công nghiệp chuyên nghiệp tẩy sạch vết sơn bả, xi măng bám trên kính và sàn gạch bằng máy đánh sàn chuyên dụng.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 201, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Bàn giao bản vẽ hoàn công và sơ đồ điện nước âm',
    content: 'Yêu cầu nhà thầu bàn giao bản vẽ hoàn công chỉ rõ đường đi của ống nước và dây điện âm tường để tránh khoan trúng khi treo tranh, tivi sau này.',
    tag: 'Quan trọng'
  },
  {
    id: 202, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Thử nghiệm hệ thống ngắt rò ELCB của bình nước nóng',
    content: 'Bấm nút "Test" trên cục rơ-le chống giật của bình nóng lạnh để kiểm tra đèn báo ngắt nguồn điện còn hoạt động nhạy bén hay không.',
    tag: 'Quan trọng'
  },
  {
    id: 203, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Kiểm tra độ phẳng và dốc sàn ban công',
    content: 'Đổ 1 xô nước ra sàn ban công, nước phải rút kiệt về phía lỗ thoát sàn trong vòng 2 phút, không để sót vũng đọng nước làm ố gạch.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 204, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Hồ sơ bảo hành thiết bị chính hãng',
    content: 'Thu thập đầy đủ phiếu bảo hành, sách hướng dẫn sử dụng của máy bơm, bình nóng lạnh, bếp từ, khóa điện tử và thang máy vào 1 cặp hồ sơ.',
    tag: 'Mẹo hay'
  },
  {
    id: 205, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Kiểm tra tiếng kêu cót két của cánh cửa gỗ',
    content: 'Đóng mở thử cánh cửa nhiều lần, kiểm tra độ êm của bản lề và khóa gạt, tra thêm mỡ bò hoặc siết chặt vít bản lề nếu cánh bị xệ chạm sàn.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 206, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Nghiệm thu bề mặt sơn dưới ánh sáng đèn',
    content: 'Dùng đèn cao áp hoặc đèn rọi chiếu xiên vào mặt tường để phát hiện các vết gợn sóng bả matit hoặc vết chân chim trước khi ký bàn giao.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 207, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Đăng ký kiểm định an toàn thang máy',
    content: 'Thang máy bắt buộc phải được trung tâm kiểm định kỹ thuật an toàn độc lập dán tem kiểm định chất lượng trước khi đưa vào vận hành chở người.',
    tag: 'Quan trọng'
  },
  {
    id: 208, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Lắp bình chữa cháy mini tại từng tầng',
    content: 'Trang bị ít nhất 1 bình chữa cháy bột hoặc bọt CO2 mini (loại 2-4kg) tại chân cầu thang mỗi tầng để sẵn sàng ứng phó cháy nổ.',
    tag: 'Quan trọng'
  },
  {
    id: 209, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Kiểm tra phao chống tràn téc nước trên nóc',
    content: 'Kiểm tra phao cơ và phao điện bồn nước inox trên mái đảm bảo nước bơm đầy téc tự ngắt điện, không tràn qua lỗ thông hơi làm ướt mái.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 210, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Lưu số điện thoại khẩn cấp của đội thợ',
    content: 'Lưu số điện thoại của thợ điện nước, thợ sửa khóa, thợ nhôm kính và công ty thang máy dán ngay cạnh tủ điện tổng để gọi khi gặp sự cố.',
    tag: 'Mẹo hay'
  },
  {
    id: 211, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Thủ tục hoàn công công trình nhà ở',
    content: 'Nộp hồ sơ hoàn công bao gồm GPXD, bản vẽ hoàn công, hợp đồng thi công và biên bản nghiệm thu cho văn phòng đăng ký đất đai để cập nhật sổ hồng.',
    tag: 'Quan trọng'
  },
  {
    id: 212, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Lễ cúng nhập trạch về nhà mới',
    content: 'Chọn ngày giờ hoàng đạo nhập trạch; khi dọn vào nhà mới gia chủ nên tự tay mang bếp lửa, ấm nước đun sôi và bài vị gia tiên vào trước.',
    tag: 'Mẹo hay'
  },
  {
    id: 213, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Khử mùi sơn nhà mới bằng than hoạt tính',
    content: 'Đặt các đĩa chứa than hoạt tính, bã cà phê hoặc hành tây cắt lát ở các góc phòng đóng kín cửa trong 48h để hấp thụ hết mùi sơn độc hại.',
    tag: 'Mẹo hay'
  },
  {
    id: 214, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Đánh số dây trong tủ điện điều khiển',
    content: 'Yêu cầu thợ điện đánh số thẻ hoặc dán nhãn ghi rõ từng aptomat điều khiển phòng nào (VD: Đèn T1, Bếp, Ổ cắm T2) để dễ cúp điện sửa chữa.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 215, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Chống kẹt rác tại phễu thu sàn sân sau',
    content: 'Sân sau và ban công nên lắp phễu thoát sàn có vòm chắn rác nổi cao để khi có lá rụng che đáy thì nước vẫn thoát qua các khe hông.',
    tag: 'Kinh nghiệm'
  },
  {
    id: 216, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Bàn giao chìa khóa gốc và chìa khóa công trường',
    content: 'Khi nhận bàn giao nhà, thay lõi khóa cửa chính hoặc hủy quyền chìa thợ xây (chìa master chìa công trình) để bảo đảm an ninh tài sản gia đình.',
    tag: 'Quan trọng'
  },
  {
    id: 217, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Kiểm tra độ ồn của quạt hút mùi bếp',
    content: 'Đường ống thoát mùi bếp từ nên đi ống cứng PVC D110 hoặc D140 thay vì ống mềm ruột gà nhôm để gió thoát êm, không bị rung ồn rít.',
    tag: 'Mẹo hay'
  },
  {
    id: 218, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Lối thoát nạn thứ hai trên mái tum',
    content: 'Cửa tum hoặc lồng sắt chuồng cọp trên mái bắt buộc phải có 1 cửa thoát hiểm mở bằng chốt trong kèm thang dây hoặc thang sắt dự phòng.',
    tag: 'Quan trọng'
  },
  {
    id: 219, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Kiểm tra đèn sạc sự cố chiếu sáng khẩn cấp',
    content: 'Hành lang và cầu thang nên trang bị 1-2 đèn sạc tự động phát sáng khi mất điện lưới để gia đình di chuyển an toàn trong đêm tối.',
    tag: 'Tiêu chuẩn'
  },
  {
    id: 220, step: 6, category: 'Nghiệm thu & An toàn',
    title: 'Chụp hình kỷ niệm ngày bàn giao nhà',
    content: 'Tổ chức buổi lễ bàn giao ấm cúng cùng đội ngũ kỹ sư, giám sát và thợ thi công để ghi dấu cột mốc quan trọng trong cuộc đời gia chủ.',
    tag: 'Mẹo hay'
  }
];

/**
 * Lấy ngẫu nhiên N lưu ý kỹ thuật (ưu tiên phù hợp với bước hiện tại, kèm lưu ý chung)
 */
export function getRandomTipsForStep(step: number, count = 3, excludeIds: number[] = []): ConstructionTip[] {
  // Lọc các lưu ý của bước này
  const stepPool = CONSTRUCTION_TIPS.filter((t) => t.step === step && !excludeIds.includes(t.id));
  const generalPool = CONSTRUCTION_TIPS.filter((t) => !excludeIds.includes(t.id));

  const result: ConstructionTip[] = [];
  const chosenIds = new Set<number>(excludeIds);

  // Chọn 2 lưu ý từ bước hiện tại nếu có
  const shuffledStep = [...stepPool].sort(() => 0.5 - Math.random());
  for (const item of shuffledStep) {
    if (result.length >= Math.min(2, count)) break;
    result.push(item);
    chosenIds.add(item.id);
  }

  // Chọn thêm từ kho chung cho đủ số lượng
  const shuffledGeneral = [...generalPool].filter((t) => !chosenIds.has(t.id)).sort(() => 0.5 - Math.random());
  for (const item of shuffledGeneral) {
    if (result.length >= count) break;
    result.push(item);
    chosenIds.add(item.id);
  }

  return result;
}
