export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  desc: string;
  pros: string;
  imageUrl: string;
  pinterestQuery: string;
}

export const MATERIAL_SHOWCASE: MaterialItem[] = [
  {
    id: 'da-mat-tien',
    name: 'Đá tự nhiên Granite & Marble ốp mặt tiền',
    category: 'Mặt tiền & Cột',
    tag: 'Sang trọng · Bền vĩnh cửu',
    desc: 'Ốp đá tự nhiên nguyên tấm cho khối đế tầng 1, cột sảnh và viền ban công chống bám rêu mốc và bụi bẩn.',
    pros: 'Chống thấm nước tuyệt đối, không phai màu theo thời gian, nâng tầm đẳng cấp ngôi nhà.',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    pinterestQuery: 'đá tự nhiên ốp mặt tiền nhà phố biệt thự đẹp'
  },
  {
    id: 'kinh-low-e',
    name: 'Hệ cửa nhôm cao cấp & Kính hộp Low-E cản nhiệt',
    category: 'Cửa & Vách kính',
    tag: 'Cách âm · Tiết kiệm điện',
    desc: 'Hệ nhôm rãnh C tiêu chuẩn châu Âu kết hợp kính hộp 2 lớp cách âm, chặn 99% tia UV và chống nóng.',
    pros: 'Giảm 30% chi phí điều hòa, triệt tiêu tiếng ồn phố thị lên đến 40dB, đóng mở êm ái nhẹ nhàng.',
    imageUrl: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=800&q=80',
    pinterestQuery: 'cửa nhôm kính hộp low-e cách âm biệt thự nhà phố'
  },
  {
    id: 'go-nhua-composite',
    name: 'Gỗ nhựa Composite ốp trần & Lam chắn nắng',
    category: 'Ban công & Trần ngoài trời',
    tag: 'Chống nắng mưa · Thẩm mỹ cao',
    desc: 'Thanh lam và tấm ốp gỗ nhựa ngoài trời chịu thời tiết khắc nghiệt, chống mối mọt và không cong vênh.',
    pros: 'Màu vân gỗ ấm áp tự nhiên, nhẹ tải trọng công trình, bền bỉ trên 15 năm dưới nắng mưa.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    pinterestQuery: 'gỗ nhựa composite ốp trần ban công ngoài trời đẹp'
  },
  {
    id: 'gach-bong-gio',
    name: 'Gạch bông gió mỹ thuật chắn nắng lấy gió',
    category: 'Mặt đứng & Giếng trời',
    tag: 'Thông gió tự nhiên · Nghệ thuật',
    desc: 'Mảng tường gạch bông gió che chắn tầm nhìn trực diện từ ngoài đường nhưng gió và ánh sáng vẫn lưu thông tự do.',
    pros: 'Tạo hiệu ứng bóng đổ nghệ thuật vào ban ngày, giải nhiệt hiệu quả cho nhà hướng Tây.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80',
    pinterestQuery: 'gạch bông gió mỹ thuật mặt tiền nhà ống đẹp'
  },
  {
    id: 'gach-kho-lon',
    name: 'Gạch ốp lát khổ lớn 80×80 / 60×120 vân mây',
    category: 'Sàn & Tường phòng khách',
    tag: 'Ít đường ron · Mở rộng không gian',
    desc: 'Gạch porcelain vi tinh thể xương đá cứng cáp, bề mặt men vi tinh bóng hoặc mờ chống trầy xước cao cấp.',
    pros: 'Ít mạch ghép nối tạo cảm giác sàn nhà liền mạch rộng mênh mông, lau chùi cực kỳ dễ dàng.',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    pinterestQuery: 'gạch lát nền khổ lớn 60x120 80x80 vân mây phòng khách'
  },
  {
    id: 'tran-thach-cao',
    name: 'Trần thạch cao giật cấp kết hợp LED viền âm trần',
    category: 'Trần trang trí',
    tag: 'Chiều sâu không gian · Đèn hắt gián tiếp',
    desc: 'Tấm thạch cao chống ẩm Vĩnh Tường tạo rãnh nhôm định hình hắt LED gián tiếp không gây chói mắt.',
    pros: 'Giấu kín hệ thống dây điện, ống gió điều hòa âm trần; cách nhiệt trần bê tông hiệu quả.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    pinterestQuery: 'trần thạch cao giật cấp đèn led hắt phòng khách hiện đại'
  },
  {
    id: 'lan-can-kinh',
    name: 'Lan can kính cường lực 12mm tay vịn Gỗ / Inox',
    category: 'Cầu thang & Ban công',
    tag: 'Thanh thoát tầm nhìn · An toàn',
    desc: 'Kính tôi nhiệt cường lực dày 12mm chịu lực va đập cực lớn, chân trụ inox 304 không rỉ sét.',
    pros: 'Tối đa hóa diện tích thị giác, đón trọn ánh sáng tự nhiên cho giếng trời và cầu thang bộ.',
    imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
    pinterestQuery: 'lan can kính cường lực cầu thang ban công hiện đại'
  },
  {
    id: 'da-bep-vicostone',
    name: 'Đá nhân tạo thạch anh gốc Vicostone cho bếp',
    category: 'Mặt bàn bếp & Đảo bếp',
    tag: 'Chống thấm ố · Kháng khuẩn',
    desc: 'Chứa hơn 90% cốt thạch anh tự nhiên kết dính polymer cao phân tử, độ cứng chỉ sau kim cương.',
    pros: 'Không ngấm dầu mỡ hay nước tương, an toàn khi tiếp xúc trực tiếp với thực phẩm.',
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    pinterestQuery: 'đá thạch anh vicostone ốp bàn bếp đảo bếp đẹp'
  }
];
