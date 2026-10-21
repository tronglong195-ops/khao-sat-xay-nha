export interface StyleSlide {
  id: string;
  angle: string;
  title: string;
  desc: string;
  imageUrl: string;
  tag: string;
}

export interface StylePerspectiveData {
  styleId: string;
  name: string;
  summary: string;
  pinterestQuery: string;
  slides: StyleSlide[];
}

export const STYLE_PERSPECTIVES: Record<string, StylePerspectiveData> = {
  'hien-dai': {
    styleId: 'hien-dai',
    name: 'Biệt thự / nhà phố hiện đại',
    summary: 'Hình khối vuông vức, đường nét dứt khoát, mảng kính lớn và lam chắn nắng tối ưu chi phí thi công.',
    pinterestQuery: 'phối cảnh 3D nhà hiện đại tối giản mặt tiền đẹp',
    slides: [
      {
        id: 'hd-1',
        angle: 'Mặt tiền chính diện',
        title: 'Mặt tiền hiện đại khỏe khoắn, hình khối tối giản',
        desc: 'Mặt tiền phân mảng khối chữ C và chữ L vươn ra che nắng mưa, ban công kính mở rộng tầm nhìn.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        tag: 'Hình khối tối giản · Kính lớn'
      },
      {
        id: 'hd-2',
        angle: 'Góc nghiêng 45°',
        title: 'Góc nghiêng 45° đón nắng & lam nhôm trang trí',
        desc: 'Hệ lam che nắng thông minh vừa đảm bảo thông gió tự nhiên vừa tạo nhịp điệu kiến trúc thanh thoát.',
        imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
        tag: 'Lam trang trí · Đón nắng'
      },
      {
        id: 'hd-3',
        angle: 'Ban đêm lên đèn',
        title: 'Phối cảnh ánh sáng hắt viền lung linh về đêm',
        desc: 'Đèn LED âm trần ban công và đèn hắt khe tường tạo điểm nhấn ấm áp, nổi bật nhất con phố.',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        tag: 'Đèn LED viền · Ánh sáng ấm'
      }
    ]
  },

  'indochine': {
    styleId: 'indochine',
    name: 'Indochine (Đông Dương)',
    summary: 'Giao thoa tinh tế giữa nét lãng mạn nước Pháp và hồn truyền thống Á Đông, ấm cúng và hoài niệm.',
    pinterestQuery: 'phối cảnh 3D phong cách indochine đông dương đẹp',
    slides: [
      {
        id: 'indo-1',
        angle: 'Mặt tiền Indochine',
        title: 'Mặt tiền vòm cong mềm mại & cửa chớp lá sách',
        desc: 'Hệ vòm cong cổ điển kết hợp cửa sổ chớp gỗ và lan can sắt mỹ thuật đúc hoa văn truyền thống.',
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        tag: 'Vòm cong · Cửa lá sách'
      },
      {
        id: 'indo-2',
        angle: 'Không gian mở',
        title: 'Góc sảnh đón lát gạch bông mỹ thuật cổ điển',
        desc: 'Sự kết hợp hoàn hảo giữa gạch bông hoa văn, quạt trần cánh gỗ và màu sơn vàng kem đặc trưng Đông Dương.',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        tag: 'Gạch bông · Màu vàng kem'
      },
      {
        id: 'indo-3',
        angle: 'Chi tiết nội ngoại thất',
        title: 'Vật liệu mây tre đan & gỗ tự nhiên mộc mạc',
        desc: 'Đồ nội thất gỗ tối màu phối mây đan mắt cáo mang đến cảm giác thư thái, tĩnh lặng đậm chất quý phái.',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
        tag: 'Mây tre đan · Gỗ tối màu'
      }
    ]
  },

  'tan-co-dien': {
    styleId: 'tan-co-dien',
    name: 'Tân cổ điển',
    summary: 'Bố cục cân đối đăng đối, phào chỉ chắt lọc tinh tế, sang trọng vượt thời gian.',
    pinterestQuery: 'phối cảnh 3D nhà tân cổ điển mặt tiền đẹp sang trọng',
    slides: [
      {
        id: 'tcd-1',
        angle: 'Mặt tiền đăng đối',
        title: 'Mặt tiền tỷ lệ vàng với thức cột và phù điêu thanh nhã',
        desc: 'Bố cục cân xứng tuyệt đối, các đường phào chỉ nhẹ nhàng tôn lên vẻ quý phái mà không rườm rà.',
        imageUrl: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80',
        tag: 'Tỷ lệ vàng · Cột đăng đối'
      },
      {
        id: 'tcd-2',
        angle: 'Góc nghiêng 45°',
        title: 'Hệ mái Mansard kết hợp ban công nhôm đúc',
        desc: 'Khối ban công bán nguyệt uốn cong duyên dáng, lan can sắt mỹ thuật sơn tĩnh điện ánh kim sang trọng.',
        imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80',
        tag: 'Mái Mansard · Ban công vòm'
      },
      {
        id: 'tcd-3',
        angle: 'Sân vườn cảnh quan',
        title: 'Không gian biệt thự tân cổ điển bên thảm cỏ xanh',
        desc: 'Khuôn viên sân vườn phong cách châu Âu với tượng điêu khắc và lối đi dạo lát đá tự nhiên.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        tag: 'Sân vườn Châu Âu · Bề thế'
      }
    ]
  },

  'lau-dai': {
    styleId: 'lau-dai',
    name: 'Cổ điển / Lâu đài',
    summary: 'Quy mô đồ sộ, hoa văn đắp nổi thủ công cầu kỳ, biểu tượng quyền uy và vị thế gia tộc.',
    pinterestQuery: 'phối cảnh 3D lâu đài cổ điển dinh thự tráng lệ',
    slides: [
      {
        id: 'ld-1',
        angle: 'Chính diện uy nghi',
        title: 'Dinh thự lâu đài tráng lệ chuẩn kiến trúc hoàng gia',
        desc: 'Hệ cột La Mã cao thông tầng đỡ mái sảnh tam giác (Pediment) đắp hoa văn phù điêu tinh xảo.',
        imageUrl: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80',
        tag: 'Kiến trúc hoàng gia · Phù điêu'
      },
      {
        id: 'ld-2',
        angle: 'Cổng & Đài phun nước',
        title: 'Đài phun nước phong thủy và lối vào bề thế',
        desc: 'Cổng nhôm đúc mạ đồng cao cấp mở ra khuôn viên trang trọng với đài phun nước kích tài lộc.',
        imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
        tag: 'Cổng nhôm đúc · Đài phun nước'
      },
      {
        id: 'ld-3',
        angle: 'Toàn cảnh khuôn viên',
        title: 'Quần thể dinh thự nguy nga giữa cảnh quan thiên nhiên',
        desc: 'Không gian sống biệt lập, đẳng cấp khẳng định dấu ấn trường tồn qua nhiều thế hệ.',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
        tag: 'Quần thể biệt lập · Trường tồn'
      }
    ]
  },

  'nhat': {
    styleId: 'nhat',
    name: 'Mái Nhật / Wabi-sabi',
    summary: 'Độ dốc mái nhẹ nhàng, màu sắc gỗ ấm áp, kết nối tiểu cảnh Zen thanh tịnh và bình yên.',
    pinterestQuery: 'phối cảnh 3D nhà mái nhật phong cách wabi sabi đẹp',
    slides: [
      {
        id: 'nhat-1',
        angle: 'Mặt tiền mái Nhật',
        title: 'Mặt tiền mái Nhật đua rộng thanh thoát, nhẹ nhàng',
        desc: 'Hệ mái ngói dốc thoải 30° - 35° vươn dài che chắn mưa nắng, tỷ lệ công trình cân đối và gần gũi.',
        imageUrl: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=800&q=80',
        tag: 'Mái ngói dốc · Cột ốp gỗ'
      },
      {
        id: 'nhat-2',
        angle: 'Hiên nhà & Tiểu cảnh Zen',
        title: 'Hàng hiên gỗ kết nối vườn sỏi và hồ cá Koi',
        desc: 'Không gian thưởng trà ngoài hiên đón trọn gió lành, hòa quyện triết lý Wabi-sabi tìm về an yên.',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        tag: 'Tiểu cảnh Zen · Hồ cá Koi'
      },
      {
        id: 'nhat-3',
        angle: 'Ánh sáng dịu ấm',
        title: 'Chiếu sáng tự nhiên & vật liệu gỗ sồi sáng màu',
        desc: 'Cửa lùa Shoji cách điệu bằng nhôm kính và ánh sáng vàng dịu tạo cảm giác thư giãn tuyệt đối.',
        imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        tag: 'Gỗ sáng màu · Cửa trượt'
      }
    ]
  },

  'nhiet-doi': {
    styleId: 'nhiet-doi',
    name: 'Nhiệt đới (Tropical)',
    summary: 'Tối đa hóa bóng mát, gạch thông gió, hàng hiên sâu và cây xanh tự nhiên rất hợp khí hậu Việt Nam.',
    pinterestQuery: 'phối cảnh 3D kiến trúc nhiệt đới tropical house đẹp',
    slides: [
      {
        id: 'trop-1',
        angle: 'Mặt tiền Tropical',
        title: 'Nhà nhiệt đới tràn ngập mảng xanh & nắng gió',
        desc: 'Hàng hiên vươn sâu kết hợp rèm cây leo che nắng gắt hướng Tây, giảm nhiệt độ trong nhà từ 3 - 5°C.',
        imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
        tag: 'Hiên sâu · Giảm nhiệt'
      },
      {
        id: 'trop-2',
        angle: 'Hồ nước & Sân trong',
        title: 'Hồ nước cảnh quan điều hòa vi khí hậu mát mẻ',
        desc: 'Mặt nước phản chiếu ánh sáng và hơi nước bốc lên giúp ngôi nhà luôn mát rượi vào mùa hè.',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        tag: 'Hồ nước · Điều hòa vi khí hậu'
      },
      {
        id: 'trop-3',
        angle: 'Không gian mở đón gió',
        title: 'Vật liệu đá tự nhiên, gỗ mộc và thảm thực vật',
        desc: 'Sự giao hòa trọn vẹn giữa con người và thiên nhiên nhiệt đới qua những ô cửa sổ lớn sát trần.',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        tag: 'Đá ong xám · Cây nhiệt đới'
      }
    ]
  },

  'luxury': {
    styleId: 'luxury',
    name: 'Hiện đại sang trọng',
    summary: 'Đá tự nhiên nguyên tấm, vách kính vô cực, kim loại mạ PVD và chiếu sáng kiến trúc đẳng cấp.',
    pinterestQuery: 'phối cảnh 3D biệt thự hiện đại luxury sang trọng',
    slides: [
      {
        id: 'lux-1',
        angle: 'Chính diện Luxury',
        title: 'Biệt thự hiện đại siêu sang với vách kính vô cực',
        desc: 'Hệ kính khổ lớn tràn viền mang lại tầm nhìn panorama ngoạn mục, khẳng định phong cách sống thượng lưu.',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        tag: 'Kính vô cực · Siêu sang'
      },
      {
        id: 'lux-2',
        angle: 'Ban đêm rực sáng',
        title: 'Nghệ thuật chiếu sáng kiến trúc ngoại thất ấn tượng',
        desc: 'Hệ thống đèn LED tuyến tính và đèn rọi tán cây biến ngôi nhà thành một kiệt tác kiến trúc khi về đêm.',
        imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        tag: 'Chiếu sáng tuyến tính · Đẳng cấp'
      },
      {
        id: 'lux-3',
        angle: 'Hồ bơi vô cực & Sky Lounge',
        title: 'Khu vực giải trí ngoài trời kết hợp hồ bơi tràn bờ',
        desc: 'Không gian đón tiếp bạn bè và dạ tiệc cuối tuần chuẩn resort 5 sao ngay trong khuôn viên tư gia.',
        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        tag: 'Hồ bơi tràn bờ · Resort 5 sao'
      }
    ]
  }
};

export function getPerspectivesForStyle(styleId: string): StylePerspectiveData {
  if (STYLE_PERSPECTIVES[styleId]) {
    return STYLE_PERSPECTIVES[styleId];
  }
  return STYLE_PERSPECTIVES['hien-dai'];
}
