import { assetUrl } from './format';

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
    summary: 'Hình ảnh phối cảnh 3D các công trình nhà phố hiện đại thực tế tại Việt Nam: mặt tiền 5m, giật cấp lấy sáng và ban công xanh.',
    pinterestQuery: 'phối cảnh 3D nhà phố hiện đại việt nam mặt tiền 5m',
    slides: [
      {
        id: 'np-1',
        angle: 'Mặt tiền 5m chính diện',
        title: 'Nhà phố 4 tầng mặt tiền 5m hiện đại tại Hưng Yên',
        desc: 'Mặt tiền 5m phân chia khối giật cấp, mảng kính lấy sáng, lam gỗ nhựa ngoài trời và ban công xanh mát.',
        imageUrl: assetUrl('images/vietnam/models/np-1.jpg'),
        tag: '4 tầng · Hưng Yên'
      },
      {
        id: 'np-2',
        angle: 'Mặt tiền có gara ô tô',
        title: 'Nhà phố 3 tầng hiện đại có gara ô tô tại Thái Nguyên',
        desc: 'Tầng 1 bố trí gara ô tô và phòng khách rộng rãi, tầng 2-3 đua ban công kính đón ánh sáng tự nhiên.',
        imageUrl: assetUrl('images/vietnam/models/np-2.jpg'),
        tag: '3 tầng có gara · Thái Nguyên'
      },
      {
        id: 'np-3',
        angle: 'Góc nghiêng 45°',
        title: 'Góc nghiêng 45° nhà phố 3 tầng hiện đại tại Bình Dương',
        desc: 'Khối ban công chữ L vươn ra che chắn mưa nắng hướng Tây, đèn LED âm trần tạo điểm nhấn ấm cúng.',
        imageUrl: assetUrl('images/vietnam/models/np-3.jpg'),
        tag: 'Nghiêng 45° · Bình Dương'
      },
      {
        id: 'np-4',
        angle: 'Phối cảnh liền kề',
        title: 'Nhà phố liền kề 4 tầng kiến trúc hiện đại tối giản',
        desc: 'Mặt tiền hài hòa với quy hoạch đô thị Việt Nam, tối ưu diện tích sử dụng cho gia đình 2-3 thế hệ.',
        imageUrl: assetUrl('images/vietnam/models/np-4.jpg'),
        tag: '4 tầng liền kề · Hiện đại'
      }
    ]
  },

  'Nhà ống': {
    typeName: 'Nhà ống',
    summary: 'Phối cảnh 3D các công trình nhà ống thực tế tại Việt Nam: mặt tiền 4m - 5m, giếng trời trung tâm và thông gió đối lưu.',
    pinterestQuery: 'phối cảnh 3D nhà ống việt nam 5m có giếng trời',
    slides: [
      {
        id: 'no-1',
        angle: 'Mặt tiền 4.5m',
        title: 'Nhà ống 3 tầng có gara ô tô mặt tiền 4.5m tại Thái Nguyên',
        desc: 'Bố trí giếng trời giữa nhà lấy sáng và thông gió đối lưu liên tục, giải quyết triệt để nhược điểm nhà ống hẹp dài.',
        imageUrl: assetUrl('images/vietnam/models/no-1.jpg'),
        tag: 'Mặt tiền 4.5m · Thái Nguyên'
      },
      {
        id: 'no-2',
        angle: 'Góc nghiêng thông gió',
        title: 'Góc nghiêng phân tầng giật cấp tại Bình Dương',
        desc: 'Ban công so le tạo luồng khí đối lưu mát mẻ, giảm bức xạ nhiệt trực tiếp vào các phòng ngủ.',
        imageUrl: assetUrl('images/vietnam/models/no-2.jpg'),
        tag: 'Phân tầng so le · Bình Dương'
      },
      {
        id: 'no-3',
        angle: 'Nhà ống tân cổ điển',
        title: 'Nhà ống 4 tầng phong cách tân cổ điển tại Quảng Ninh',
        desc: 'Mặt tiền thanh lịch với phào chỉ tiết chế nhẹ nhàng, vòm cong ban công tăng thêm vẻ sang trọng bề thế.',
        imageUrl: assetUrl('images/vietnam/models/no-3.jpg'),
        tag: 'Tân cổ điển 4 tầng · Quảng Ninh'
      }
    ]
  },

  'Shophouse': {
    typeName: 'Shophouse',
    summary: 'Mô hình nhà phố thương mại kết hợp ở thực tế tại Việt Nam: tầng 1 kinh doanh sầm uất, tầng trên sinh hoạt biệt lập.',
    pinterestQuery: 'phối cảnh 3D shophouse nhà phố kinh doanh việt nam',
    slides: [
      {
        id: 'sh-1',
        angle: '5 Tầng kinh doanh',
        title: 'Nhà phố 5 tầng kết hợp kinh doanh tại Hải Phòng',
        desc: 'Tầng 1 và lửng ốp đá granite sang trọng, vách kính lớn tối đa nhận diện thương hiệu kinh doanh.',
        imageUrl: assetUrl('images/vietnam/models/sh-1.jpg'),
        tag: '5 tầng kinh doanh · Hải Phòng'
      },
      {
        id: 'sh-2',
        angle: '3 Mặt tiền đắc địa',
        title: 'Căn hộ cho thuê & Shophouse 3 mặt tiền 6 tầng',
        desc: 'Vị trí góc đắc địa, khai thác triệt để 3 mặt thoáng làm căn hộ dịch vụ cao cấp và shophouse thương mại.',
        imageUrl: assetUrl('images/vietnam/models/sh-2.jpg'),
        tag: '6 tầng · 3 Mặt tiền'
      },
      {
        id: 'sh-3',
        angle: 'Mặt tiền thương mại',
        title: 'Nhà liền kề shophouse phố thương mại sầm uất',
        desc: 'Lối đi và cầu thang tách biệt hoàn toàn giữa không gian kinh doanh tầng dưới và sinh hoạt gia đình phía trên.',
        imageUrl: assetUrl('images/vietnam/models/sh-3.jpg'),
        tag: 'Kinh doanh tách biệt · Hiện đại'
      }
    ]
  },

  'Biệt thự': {
    typeName: 'Biệt thự',
    summary: 'Phối cảnh 3D các công trình biệt thự đẳng cấp tại Việt Nam: mái chéo hiện đại, tân cổ điển Pháp và sân vườn cảnh quan.',
    pinterestQuery: 'phối cảnh 3D biệt thự hiện đại việt nam sang trọng',
    slides: [
      {
        id: 'bt-1',
        angle: 'Chính diện bề thế',
        title: 'Biệt thự hiện đại 3 tầng mái chéo sang trọng tại Hà Nội',
        desc: 'Hình khối giật cấp mạnh mẽ, ốp đá tự nhiên và lam nhôm cao cấp tạo nên diện mạo bề thế nổi bật.',
        imageUrl: assetUrl('images/vietnam/models/bt-1.jpg'),
        tag: 'Biệt thự 3 tầng · Hà Nội'
      },
      {
        id: 'bt-2',
        angle: 'Góc nghiêng & Sân vườn',
        title: 'Góc nghiêng sân vườn và sảnh đón biệt thự 3 tầng',
        desc: 'Sảnh đón rộng kết nối trực tiếp với khuôn viên sân vườn cây xanh và đường dạo lát đá tự nhiên.',
        imageUrl: assetUrl('images/vietnam/models/bt-2.jpg'),
        tag: 'Sân vườn rộng · Mái chéo'
      },
      {
        id: 'bt-3',
        angle: 'Tân cổ điển thượng lưu',
        title: 'Biệt thự tân cổ điển 3 tầng tại Phú Mỹ Hưng (TP.HCM)',
        desc: 'Đẳng cấp thượng lưu với thức cột La Mã, vòm mái Mansard kiêu hãnh và ban công nhôm đúc mạ vàng.',
        imageUrl: assetUrl('images/vietnam/models/bt-3.jpg'),
        tag: 'Tân cổ điển Pháp · Phú Mỹ Hưng'
      }
    ]
  },

  'Nhà vườn': {
    typeName: 'Nhà vườn',
    summary: 'Các công trình nhà vườn nghỉ dưỡng thực tế tại nông thôn & ngoại ô Việt Nam: mái Thái, mái Nhật và vườn cây an lành.',
    pinterestQuery: 'phối cảnh 3D nhà vườn mái nhật mái thái việt nam đẹp',
    slides: [
      {
        id: 'nv-1',
        angle: 'Biệt thự vườn cấp 4',
        title: 'Biệt thự vườn cấp 4 mái Thái đẹp tại Đồng Tháp',
        desc: 'Mái ngói dốc thoải thoát nước mưa nhanh, khuôn viên sân vườn rộng rãi rợp bóng mát cây ăn trái miền Tây.',
        imageUrl: assetUrl('images/vietnam/models/nv-1.jpg'),
        tag: 'Mái Thái · Đồng Tháp'
      },
      {
        id: 'nv-2',
        angle: 'Nhà vườn 2 tầng',
        title: 'Biệt thự nhà vườn 2 tầng tân cổ điển tại Vĩnh Phúc',
        desc: 'Sự kết hợp hoàn hảo giữa nét quý phái tân cổ điển và không gian sinh thái thoáng mát miền quê.',
        imageUrl: assetUrl('images/vietnam/models/nv-2.jpg'),
        tag: 'Nhà vườn 2 tầng · Vĩnh Phúc'
      },
      {
        id: 'nv-3',
        angle: 'Nhà 1 tầng 130m²',
        title: 'Mẫu nhà vườn 1 tầng 130m² (3 phòng ngủ) thanh bình',
        desc: 'Bố trí 3 phòng ngủ tiện nghi trên một mặt sàn, hàng hiên rộng kê bàn trà thưởng ngoạn thiên nhiên.',
        imageUrl: assetUrl('images/vietnam/models/nv-3.jpg'),
        tag: '130m² · 3 Phòng ngủ'
      }
    ]
  },

  'Nhà cấp 4': {
    typeName: 'Nhà cấp 4',
    summary: 'Hình ảnh phối cảnh nhà cấp 4 mái Thái, mái Nhật chữ L thực tế tại các vùng quê Việt Nam: tiết kiệm, bền đẹp và kiên cố.',
    pinterestQuery: 'phối cảnh 3D nhà cấp 4 chữ L mái thái việt nam',
    slides: [
      {
        id: 'c4-1',
        angle: 'Mái Thái chữ L',
        title: 'Nhà cấp 4 mái Thái chữ L đẹp nông thôn Việt Nam',
        desc: 'Thiết kế chữ L tạo sân đỗ ô tô và phơi nông sản rộng rãi, tiết kiệm chi phí xây dựng tối đa.',
        imageUrl: assetUrl('images/vietnam/models/c4-1.jpg'),
        tag: 'Mái Thái chữ L · Nông thôn'
      },
      {
        id: 'c4-2',
        angle: 'Mặt tiền 3 phòng ngủ',
        title: 'Nhà cấp 4 hiện đại 3 phòng ngủ tiện nghi cho gia đình',
        desc: 'Chân tường ốp đá chống ẩm mốc mùa mưa lũ, công năng khoa học phù hợp gia đình 2-3 thế hệ.',
        imageUrl: assetUrl('images/vietnam/models/c4-2.jpg'),
        tag: 'Chống ẩm mốc · 3 Phòng ngủ'
      },
      {
        id: 'c4-3',
        angle: 'Mái dốc thanh lịch',
        title: 'Biệt thự vườn 1 tầng mái dốc thanh lịch, ấm cúng',
        desc: 'Đơn giản, hiện đại và kiên cố, thời gian thi công nhanh chóng chỉ từ 2.5 – 3 tháng hoàn thiện.',
        imageUrl: assetUrl('images/vietnam/models/c4-3.jpg'),
        tag: 'Thi công nhanh · Mái dốc'
      }
    ]
  },

  'Lâu đài': {
    typeName: 'Lâu đài',
    summary: 'Các công trình lâu đài, dinh thự cổ điển Pháp tráng lệ thực tế tại Ninh Bình, Hà Nội, Thái Bình, Hải Phòng.',
    pinterestQuery: 'phối cảnh 3D lâu đài dinh thự ninh bình việt nam',
    slides: [
      {
        id: 'ld-1',
        angle: 'Lâu đài 3 tầng Hà Nội',
        title: 'Lâu đài dinh thự cổ điển 3 tầng tráng lệ tại Hà Nội',
        desc: 'Quy mô đồ sộ với phù điêu đắp nổi tinh xảo, vòm mái lâu đài uy nghi khẳng định vị thế gia tộc.',
        imageUrl: assetUrl('images/vietnam/models/ld-1.jpg'),
        tag: '3 tầng tráng lệ · Hà Nội'
      },
      {
        id: 'ld-2',
        angle: 'Dinh thự Thái Bình',
        title: 'Biệt thự lâu đài 3 tầng cổ điển Pháp tại Thái Bình',
        desc: 'Cổng nhôm đúc nguyên khối, thức cột Corinthian hoa lệ và khuôn viên đài phun nước phong thủy vượng khí.',
        imageUrl: assetUrl('images/vietnam/models/ld-2.jpg'),
        tag: 'Cổ điển Pháp · Thái Bình'
      },
      {
        id: 'ld-3',
        angle: 'Lâu đài Ninh Bình',
        title: 'Biệt thự lâu đài tân cổ điển nguy nga tại Ninh Bình',
        desc: 'Vòm mái Mansard lợp ngói đá đen đặc trưng, hệ phào chỉ đắp vẽ thủ công cầu kỳ từng đường nét.',
        imageUrl: assetUrl('images/vietnam/models/ld-3.jpg'),
        tag: 'Mái Mansard · Ninh Bình'
      }
    ]
  },

  'Khác': {
    typeName: 'Khác',
    summary: 'Các công trình kiến trúc độc bản thực tế tại Việt Nam: biệt thự nhiệt đới ven biển Đà Nẵng, dinh thự hoàng gia Bình Dương.',
    pinterestQuery: 'phối cảnh 3D kiến trúc nhà đẹp độc đáo việt nam',
    slides: [
      {
        id: 'kh-1',
        angle: 'Biệt thự nhiệt đới',
        title: 'Biệt thự 2 tầng phong cách nhiệt đới Tropical tại Đà Nẵng',
        desc: 'Kiến trúc mở đón nắng gió biển, mái hiên vươn sâu và rèm cây xanh che mát không gian sống.',
        imageUrl: assetUrl('images/vietnam/models/kh-1.jpg'),
        tag: 'Tropical · Đà Nẵng'
      },
      {
        id: 'kh-2',
        angle: 'Dinh thự Bình Dương',
        title: 'Dinh thự 3 tầng tân cổ điển hoàng gia tại Bình Dương',
        desc: 'Dành cho những gia chủ sở hữu quỹ đất lớn, yêu cầu dấu ấn kiến trúc độc bản và trường tồn.',
        imageUrl: assetUrl('images/vietnam/models/kh-2.jpg'),
        tag: 'Hoàng gia · Bình Dương'
      },
      {
        id: 'kh-3',
        angle: 'Biệt thự Indochine',
        title: 'Biệt thự phong cách Đông Dương Indochine hoài niệm tại Hội An',
        desc: 'Sự kết hợp tinh tế giữa nét đẹp truyền thống Việt Nam và kiến trúc Pháp cổ điển, vòm cong mềm mại và gạch bông cổ.',
        imageUrl: assetUrl('images/vietnam/styles/indo-1.jpg'),
        tag: 'Indochine · Hội An'
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
