export interface PerspectiveSlide {
  id: string;
  angle: string;
  title: string;
  desc: string;
  imageUrl: string;
  tag: string;
}

export interface BuildingTypePerspectives {
  typeName: string;
  summary: string;
  pinterestQuery: string;
  slides: PerspectiveSlide[];
}

export const BUILDING_PERSPECTIVES: Record<string, BuildingTypePerspectives> = {
  'Nhà phố': {
    typeName: 'Nhà phố',
    summary: 'Kiến trúc nhà phố hiện đại, hình khối vuông vắn, tối ưu mặt tiền và mảng xanh ban công.',
    pinterestQuery: 'phối cảnh 3D nhà phố hiện đại mặt tiền đẹp',
    slides: [
      {
        id: 'np-1',
        angle: 'Mặt tiền chính diện',
        title: 'Nhà phố hiện đại 3 tầng hình khối tối giản',
        desc: 'Mặt tiền 5m với mảng kính lấy sáng lớn, lam chắn nắng composite và ban công tràn ngập mảng xanh.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        tag: '3 tầng · Mặt tiền 5m'
      },
      {
        id: 'np-2',
        angle: 'Góc nghiêng 45°',
        title: 'Góc nghiêng 45° đón nắng & khoe khối ban công',
        desc: 'Hệ lam nhôm trang trí tạo hiệu ứng đổ bóng sinh động, ban công kính cường lực mở rộng tầm nhìn.',
        imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
        tag: 'Nghiêng 45° · Lam che nắng'
      },
      {
        id: 'np-3',
        angle: 'Ban đêm lên đèn',
        title: 'Phối cảnh hoàng hôn lung linh ánh đèn LED',
        desc: 'Hệ đèn hắt khe trần ban công và đèn rọi cột tạo chiều sâu sang trọng, ấm cúng khi màn đêm buông xuống.',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        tag: 'Đèn LED âm trần · Ánh sáng ấm'
      },
      {
        id: 'np-4',
        angle: 'Sân thượng & Giếng trời',
        title: 'Không gian tầng tum kết hợp sân thượng xanh',
        desc: 'Khu vực nướng BBQ ngoài trời, giàn pergola che mưa nắng và vườn cây mini trên mái nhà phố.',
        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        tag: 'Sân thượng xanh · Giếng trời'
      }
    ]
  },

  'Nhà ống': {
    typeName: 'Nhà ống',
    summary: 'Giải pháp kiến trúc cho lô đất mặt tiền hẹp, chiều sâu dài, chú trọng giếng trời và thông gió.',
    pinterestQuery: 'phối cảnh 3D nhà ống 5m đẹp giếng trời',
    slides: [
      {
        id: 'no-1',
        angle: 'Mặt tiền 4m - 5m',
        title: 'Nhà ống hiện đại với mảng gạch bông gió',
        desc: 'Bố trí gạch thông gió mỹ thuật và cửa nhôm kính giúp lấy sáng tự nhiên và đối lưu gió liên tục.',
        imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80',
        tag: 'Mặt tiền hẹp · Gạch bông gió'
      },
      {
        id: 'no-2',
        angle: 'Góc nghiêng giật cấp',
        title: 'Góc nghiêng tạo cảm giác nhà rộng thoáng',
        desc: 'Thiết kế phân tầng so le tạo điểm nhấn thị giác, che nắng hướng Tây và giảm bớt cảm giác đơn điệu.',
        imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
        tag: 'Khối giật cấp · Chống nóng'
      },
      {
        id: 'no-3',
        angle: 'Ban đêm lên đèn',
        title: 'Mặt tiền nhà ống nổi bật với đèn hắt viền',
        desc: 'Đèn rọi điểm nhấn vào mảng tường gạch và bồn cây ban công mang lại nét thanh lịch giữa phố thị.',
        imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
        tag: 'Ánh sáng ấm · Nổi bật'
      },
      {
        id: 'no-4',
        angle: 'Giếng trời thông tầng',
        title: 'Lõi giếng trời trung tâm đón ánh sáng tự nhiên',
        desc: 'Khoảng thông tầng giữa nhà kết hợp tiểu cảnh hồ cá hoặc cây xanh giúp ngôi nhà luôn mát mẻ và vượng khí.',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        tag: 'Giếng trời · Tiểu cảnh xanh'
      }
    ]
  },

  'Shophouse': {
    typeName: 'Shophouse',
    summary: 'Nhà phố thương mại kết hợp ở: tầng 1 cao thoáng kinh doanh, các tầng trên sinh hoạt biệt lập.',
    pinterestQuery: 'phối cảnh shophouse nhà phố kinh doanh đẹp',
    slides: [
      {
        id: 'sh-1',
        angle: 'Tầng 1 kinh doanh',
        title: 'Mặt tiền kinh doanh kính tràn viền sang trọng',
        desc: 'Tầng 1 cao thoáng (3.9m – 4.2m) với vách kính cường lực tối đa diện tích trưng bày và nhận diện thương hiệu.',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        tag: 'Kính tràn viền · Kinh doanh'
      },
      {
        id: 'sh-2',
        angle: 'Góc nghiêng tổng thể',
        title: 'Góc nghiêng phân tách rõ khu ở và kinh doanh',
        desc: 'Lối đi và thang bộ riêng biệt cho gia đình, các tầng trên có ban công cây xanh thoáng đãng và cách âm tốt.',
        imageUrl: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?auto=format&fit=crop&w=800&q=80',
        tag: 'Lối đi riêng · Cách âm'
      },
      {
        id: 'sh-3',
        angle: 'Phố thương mại ban đêm',
        title: 'Phối cảnh shophouse về đêm rực rỡ biển hiệu',
        desc: 'Hệ thống đèn biển bảng và đèn viền kiến trúc thu hút khách hàng, tạo giá trị thương mại vượt trội.',
        imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
        tag: 'Ánh sáng thương mại · Sầm uất'
      }
    ]
  },

  'Biệt thự': {
    typeName: 'Biệt thự',
    summary: 'Không gian sống đẳng cấp, biệt lập, hài hòa giữa kiến trúc bề thế và sân vườn cảnh quan resort.',
    pinterestQuery: 'phối cảnh 3D biệt thự hiện đại sang trọng',
    slides: [
      {
        id: 'bt-1',
        angle: 'Chính diện bề thế',
        title: 'Biệt thự hiện đại 3 tầng không gian mở đẳng cấp',
        desc: 'Hình khối vươn dài thanh thoát, ốp đá tự nhiên marble kết hợp hệ kính Low-E cản nhiệt cao cấp.',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        tag: 'Biệt thự 3 tầng · Đá Marble'
      },
      {
        id: 'bt-2',
        angle: 'Góc nghiêng hồ bơi',
        title: 'Góc nghiêng nhìn ra hồ bơi & sảnh đón rộng',
        desc: 'Khoảng hiên rộng kết nối phòng khách với hồ bơi vô cực, tạo không gian nghỉ dưỡng chuẩn resort.',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        tag: 'Hồ bơi · Sân vườn resort'
      },
      {
        id: 'bt-3',
        angle: 'Ban đêm dạ tiệc',
        title: 'Biệt thự về đêm với ánh sáng nghệ thuật',
        desc: 'Đèn hắt tường, đèn âm nước hồ bơi và đèn rọi tán cây tạo khung cảnh dạ tiệc ngoài trời sang trọng.',
        imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        tag: 'Đèn nghệ thuật · Dạ tiệc'
      },
      {
        id: 'bt-4',
        angle: 'Cảnh quan sân vườn',
        title: 'Sân vườn sinh thái bao bọc quanh khối nhà',
        desc: 'Mật độ cây xanh cao, thảm cỏ nhật và đồi cỏ nhân tạo mang đến không gian sống an lành, hòa hợp thiên nhiên.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        tag: 'Cảnh quan sinh thái · Xanh mát'
      }
    ]
  },

  'Nhà vườn': {
    typeName: 'Nhà vườn',
    summary: 'Nhà ở gắn liền với thiên nhiên, mái dốc Nhật hoặc Thái, hàng hiên rộng và vườn cây ăn trái bình yên.',
    pinterestQuery: 'phối cảnh nhà vườn mái nhật đẹp nông thôn hiện đại',
    slides: [
      {
        id: 'nv-1',
        angle: 'Mặt tiền mái Nhật',
        title: 'Nhà vườn 1 tầng mái Nhật thanh bình, gần gũi',
        desc: 'Mái ngói dốc nhẹ thoát nước nhanh, hàng hiên rộng có cột ốp đá và bậc tam cấp bề thế kết nối sân trước.',
        imageUrl: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=800&q=80',
        tag: '1 tầng mái Nhật · Hiên rộng'
      },
      {
        id: 'nv-2',
        angle: 'Góc nghiêng hiên trà',
        title: 'Khoảng hiên rộng kê bàn trà ngắm cảnh vườn',
        desc: 'Không gian thư giãn lý tưởng cho người lớn tuổi và trẻ nhỏ, đón trọn gió mát từ khu vườn xung quanh.',
        imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
        tag: 'Bàn trà ngoài hiên · Gió tự nhiên'
      },
      {
        id: 'nv-3',
        angle: 'Hoàng hôn ấm áp',
        title: 'Ánh hoàng hôn buông xuống nhà vườn bình yên',
        desc: 'Không khí ấm cúng, thư thái sau những giờ làm việc căng thẳng nơi phố thị, đưa thiên nhiên vào cuộc sống.',
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
        tag: 'Bình yên · Nghỉ dưỡng'
      },
      {
        id: 'nv-4',
        angle: 'Lối dạo & Hồ cá',
        title: 'Lối dạo lát đá phiến giữa thảm cỏ xanh mướt',
        desc: 'Bố trí chòi nghỉ chân, hồ cá Koi phong thủy và các loại cây ăn trái mang lại may mắn và tài lộc.',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        tag: 'Hồ cá Koi · Lối dạo đá'
      }
    ]
  },

  'Nhà cấp 4': {
    typeName: 'Nhà cấp 4',
    summary: 'Nhà 1 tầng tiện nghi, chi phí hợp lý, công năng tập trung thuận tiện cho gia đình đa thế hệ.',
    pinterestQuery: 'phối cảnh nhà cấp 4 chữ L mái thái mái nhật đẹp',
    slides: [
      {
        id: 'c4-1',
        angle: 'Chính diện hiện đại',
        title: 'Nhà cấp 4 mái dốc hiện đại tối ưu chi phí',
        desc: 'Thiết kế chữ L tạo sân đậu ô tô rộng rãi, mặt tiền ốp gạch giả đá chân tường chống ẩm mốc bền đẹp.',
        imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
        tag: 'Chữ L · Tiết kiệm chi phí'
      },
      {
        id: 'c4-2',
        angle: 'Góc nghiêng mái Thái',
        title: 'Góc nghiêng thể hiện sự bề thế của hệ mái',
        desc: 'Sảnh phụ dẫn thẳng vào khu vực bếp nấu giúp lưu thông thuận tiện mà không ảnh hưởng phòng khách chính.',
        imageUrl: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=800&q=80',
        tag: 'Sảnh phụ tiện lợi · Mái Thái'
      },
      {
        id: 'c4-3',
        angle: 'Chiều tà ấm cúng',
        title: 'Căn nhà cấp 4 ấm cúng cho gia đình 2-3 thế hệ',
        desc: 'Bố trí công năng 3 - 4 phòng ngủ trên 1 mặt sàn, thuận tiện cho việc chăm sóc người cao tuổi và trẻ nhỏ.',
        imageUrl: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80',
        tag: 'Công năng 3PN · 1 Mặt sàn'
      }
    ]
  },

  'Lâu đài': {
    typeName: 'Lâu đài',
    summary: 'Kiến trúc cổ điển Pháp và Tân cổ điển châu Âu nguy nga, lộng lẫy, biểu tượng của sự thịnh vượng vĩnh cửu.',
    pinterestQuery: 'phối cảnh 3D lâu đài dinh thự tân cổ điển Pháp',
    slides: [
      {
        id: 'ld-1',
        angle: 'Chính diện uy nghi',
        title: 'Dinh thự tân cổ điển Pháp với thức cột La Mã',
        desc: 'Hệ cột Corinthian đồ sộ, vòm mái uốn lượn và hoa văn đắp nổi thủ công tinh xảo toát lên quyền uy gia chủ.',
        imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80',
        tag: 'Tân cổ điển Pháp · Thức cột'
      },
      {
        id: 'ld-2',
        angle: 'Vòm mái Mansard',
        title: 'Vòm mái Mansard lợp ngói đá đen đặc trưng',
        desc: 'Ban công nhôm đúc mạ vàng nghệ thuật, cửa sổ vòm cung mềm mại tạo tỷ lệ vàng hoàn mỹ trong kiến trúc.',
        imageUrl: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80',
        tag: 'Mái Mansard · Nhôm đúc nghệ thuật'
      },
      {
        id: 'ld-3',
        angle: 'Đêm hoàng gia',
        title: 'Hệ thống chiếu sáng kiến trúc lộng lẫy về đêm',
        desc: 'Đèn rọi phù điêu và đường viền phào chỉ làm nổi bật từng chi tiết điêu khắc nghệ thuật như bảo tàng.',
        imageUrl: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80',
        tag: 'Chiếu sáng nghệ thuật · Lộng lẫy'
      },
      {
        id: 'ld-4',
        angle: 'Cổng & Đài phun nước',
        title: 'Đài phun nước phong thủy và lối vào uy nghi',
        desc: 'Cổng tự động nguyên khối cao 4m, đài phun nước đa tầng kích hoạt tài lộc và sinh khí cho gia tộc.',
        imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
        tag: 'Đài phun nước · Phong thủy'
      }
    ]
  },

  'Khác': {
    typeName: 'Khác',
    summary: 'Kiến trúc đương đại, phong cách nhiệt đới Tropical hoặc Đông Dương Indochine độc bản, phá cách.',
    pinterestQuery: 'phối cảnh kiến trúc nhà đẹp độc đáo phá cách',
    slides: [
      {
        id: 'kh-1',
        angle: 'Phong cách Tropical',
        title: 'Kiến trúc nhiệt đới mở hòa quyện cây xanh và nắng gió',
        desc: 'Sử dụng vật liệu mộc mạc như gỗ, đá ong xám, kính lớn và cây xanh vùng nhiệt đới tựa khu resort.',
        imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
        tag: 'Tropical · Nghỉ dưỡng'
      },
      {
        id: 'kh-2',
        angle: 'Phong cách Indochine',
        title: 'Nét đẹp hoài niệm Đông Dương giao thoa Á - Âu',
        desc: 'Gạch bông hoa văn cổ, vòm cong mềm mại và tông màu trầm ấm tạo chiều sâu văn hóa cho không gian sống.',
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        tag: 'Indochine · Hoài niệm Á Âu'
      },
      {
        id: 'kh-3',
        angle: 'Không gian mở',
        title: 'Kiến trúc đương đại với các mảng khối tự do',
        desc: 'Dành cho những gia chủ yêu thích sự độc bản, sáng tạo và không theo khuôn mẫu truyền thống.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        tag: 'Đương đại · Độc bản'
      }
    ]
  }
};

export function getPerspectivesForType(type: string): BuildingTypePerspectives {
  if (BUILDING_PERSPECTIVES[type]) {
    return BUILDING_PERSPECTIVES[type];
  }
  return BUILDING_PERSPECTIVES['Nhà phố'];
}
