import { assetUrl } from './format';

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
    summary: 'Hình khối vuông vức, đường nét dứt khoát, mảng kính lớn và lam chắn nắng của các công trình thực tế tại Việt Nam.',
    pinterestQuery: 'phối cảnh 3D nhà hiện đại việt nam mặt tiền đẹp',
    slides: [
      {
        id: 'hd-1',
        angle: 'Mặt tiền chính diện',
        title: 'Biệt thự hiện đại 3 tầng mái chéo sang trọng tại Hà Nội',
        desc: 'Hình khối giật cấp mạnh mẽ, ốp đá tự nhiên và lam nhôm cao cấp tạo nên diện mạo bề thế nổi bật.',
        imageUrl: assetUrl('images/vietnam/styles/hd-1.jpg'),
        tag: '3 tầng · Hà Nội'
      },
      {
        id: 'hd-2',
        angle: 'Góc nghiêng 45°',
        title: 'Góc nghiêng 45° đón nắng & lam trang trí ban công',
        desc: 'Sảnh đón rộng kết nối trực tiếp với khuôn viên sân vườn cây xanh và đường dạo lát đá tự nhiên.',
        imageUrl: assetUrl('images/vietnam/styles/hd-2.jpg'),
        tag: 'Nghiêng 45° · Mái chéo'
      },
      {
        id: 'hd-3',
        angle: 'Mặt tiền nhà phố 4 tầng',
        title: 'Nhà phố 4 tầng hiện đại mặt tiền 5m tại Hưng Yên',
        desc: 'Thiết kế tối ưu ánh sáng và thông gió, ban công kính tràn viền kết hợp bồn cây xanh mát.',
        imageUrl: assetUrl('images/vietnam/styles/hd-3.jpg'),
        tag: '4 tầng · Hưng Yên'
      }
    ]
  },

  'indochine': {
    styleId: 'indochine',
    name: 'Indochine (Đông Dương)',
    summary: 'Giao thoa tinh tế giữa nét lãng mạn nước Pháp và hồn truyền thống Á Đông của các công trình tại Hà Nội, Đà Lạt, Hội An.',
    pinterestQuery: 'phối cảnh 3D phong cách indochine đông dương việt nam',
    slides: [
      {
        id: 'indo-1',
        angle: 'Không gian phòng khách Indochine',
        title: 'Phòng khách phong cách Đông Dương với vòm cong & quạt trần',
        desc: 'Vòm cong mềm mại, cửa lá sách gỗ và gạch bông hoa văn cổ điển mang đậm chất hoài niệm sang trọng.',
        imageUrl: assetUrl('images/vietnam/styles/indo-1.jpg'),
        tag: 'Đông Dương · Vòm cong'
      },
      {
        id: 'indo-2',
        angle: 'Sảnh đón & Chi tiết gỗ',
        title: 'Sảnh đón với nội thất gỗ tự nhiên kết hợp mây đan mắt cáo',
        desc: 'Vật liệu truyền thống Việt Nam như gỗ gõ, mây tre đan tạo nên sự ấm cúng, thư thái tuyệt đối.',
        imageUrl: assetUrl('images/vietnam/styles/indo-2.jpg'),
        tag: 'Gỗ & Mây đan · Quý phái'
      },
      {
        id: 'indo-3',
        angle: 'Biệt thự vườn Indochine',
        title: 'Biệt thự vườn phong cách Đông Dương giữa cảnh quan xanh mát',
        desc: 'Hàng hiên sâu đón gió lành, mái ngói dốc và tiểu cảnh hồ cá mang lại không gian sống an yên.',
        imageUrl: assetUrl('images/vietnam/styles/indo-3.jpg'),
        tag: 'Hiên sâu · Tiểu cảnh'
      }
    ]
  },

  'tan-co-dien': {
    styleId: 'tan-co-dien',
    name: 'Tân cổ điển',
    summary: 'Bố cục cân đối đăng đối, phào chỉ chắt lọc tinh tế của các căn biệt thự Pháp mặt tiền 10m tại Việt Nam.',
    pinterestQuery: 'phối cảnh 3D biệt thự tân cổ điển việt nam mặt tiền 10m',
    slides: [
      {
        id: 'tcd-1',
        angle: 'Mặt tiền Pháp 10m',
        title: 'Biệt thự Pháp 3 tầng tân cổ điển mặt tiền 10m bề thế',
        desc: 'Bố cục cân xứng tuyệt đối, hệ cột ionic thanh nhã và các đường phào chỉ nhẹ nhàng tôn lên vẻ quý tộc.',
        imageUrl: assetUrl('images/vietnam/styles/tcd-1.jpg'),
        tag: 'Mặt tiền 10m · Kiểu Pháp'
      },
      {
        id: 'tcd-2',
        angle: 'Dinh thự Bình Dương',
        title: 'Thiết kế dinh thự 3 tầng tân cổ điển tại Bình Dương',
        desc: 'Ban công bán nguyệt uốn cong duyên dáng, lan can sắt mỹ thuật sơn tĩnh điện ánh kim sang trọng.',
        imageUrl: assetUrl('images/vietnam/styles/tcd-2.jpg'),
        tag: 'Dinh thự 3 tầng · Bình Dương'
      },
      {
        id: 'tcd-3',
        angle: 'Biệt thự Phú Mỹ Hưng',
        title: 'Biệt thự lâu đài tân cổ điển 3 tầng tại Phú Mỹ Hưng (TP.HCM)',
        desc: 'Khuôn viên sân vườn phong cách châu Âu với mái Mansard kiêu hãnh và sảnh đón nguy nga.',
        imageUrl: assetUrl('images/vietnam/styles/tcd-3.jpg'),
        tag: 'Mái Mansard · Phú Mỹ Hưng'
      }
    ]
  },

  'lau-dai': {
    styleId: 'lau-dai',
    name: 'Cổ điển / Lâu đài',
    summary: 'Quy mô đồ sộ, hoa văn đắp nổi thủ công cầu kỳ của các dinh thự lâu đài thực tế tại Hà Nội, Thái Bình, Ninh Bình.',
    pinterestQuery: 'phối cảnh 3D lâu đài dinh thự ninh bình hà nội',
    slides: [
      {
        id: 'ld-1',
        angle: 'Lâu đài 3 tầng Hà Nội',
        title: 'Lâu đài dinh thự cổ điển 3 tầng tráng lệ tại Hà Nội',
        desc: 'Quy mô đồ sộ với phù điêu đắp nổi tinh xảo, vòm mái lâu đài uy nghi khẳng định vị thế gia tộc.',
        imageUrl: assetUrl('images/vietnam/styles/ld-1.jpg'),
        tag: '3 tầng tráng lệ · Hà Nội'
      },
      {
        id: 'ld-2',
        angle: 'Dinh thự Thái Bình',
        title: 'Biệt thự lâu đài 3 tầng cổ điển Pháp tại Thái Bình',
        desc: 'Cổng nhôm đúc nguyên khối, thức cột Corinthian hoa lệ và khuôn viên đài phun nước phong thủy vượng khí.',
        imageUrl: assetUrl('images/vietnam/styles/ld-2.jpg'),
        tag: 'Cổ điển Pháp · Thái Bình'
      },
      {
        id: 'ld-3',
        angle: 'Lâu đài Ninh Bình',
        title: 'Biệt thự lâu đài tân cổ điển nguy nga tại Ninh Bình',
        desc: 'Vòm mái Mansard lợp ngói đá đen đặc trưng, hệ phào chỉ đắp vẽ thủ công cầu kỳ từng đường nét.',
        imageUrl: assetUrl('images/vietnam/styles/ld-3.jpg'),
        tag: 'Mái Mansard · Ninh Bình'
      }
    ]
  },

  'nhat': {
    styleId: 'nhat',
    name: 'Mái Nhật / Wabi-sabi',
    summary: 'Độ dốc mái nhẹ nhàng, ngói sóng Fuji, hiên rộng và tiểu cảnh Zen thanh tịnh thực tế tại Việt Nam.',
    pinterestQuery: 'phối cảnh 3D nhà mái nhật việt nam đẹp',
    slides: [
      {
        id: 'nhat-1',
        angle: 'Mặt tiền mái Nhật 1 tầng',
        title: 'Mẫu nhà 1 tầng mái Nhật 130m² (3 phòng ngủ) thanh bình',
        desc: 'Hệ mái ngói dốc thoải thoát nước mưa nhanh, tỷ lệ công trình cân đối và hàng hiên rộng thoáng mát.',
        imageUrl: assetUrl('images/vietnam/styles/nhat-1.jpg'),
        tag: '130m² · 3 Phòng ngủ'
      },
      {
        id: 'nhat-2',
        angle: 'Biệt thự vườn 2 tầng',
        title: 'Biệt thự nhà vườn 2 tầng phong cách Nhật Bản tại Vĩnh Phúc',
        desc: 'Sự kết hợp giữa mái ngói trầm ấm và khuôn viên sân vườn xanh mướt đem lại cảm giác an nhiên.',
        imageUrl: assetUrl('images/vietnam/styles/nhat-2.jpg'),
        tag: '2 tầng · Vĩnh Phúc'
      },
      {
        id: 'nhat-3',
        angle: 'Nhà vườn mái dốc',
        title: 'Biệt thự vườn cấp 4 mái ngói đẹp tại Đồng Tháp',
        desc: 'Hàng hiên rộng kê bàn trà thưởng ngoạn thiên nhiên, đón trọn gió lành từ khuôn viên cây trái.',
        imageUrl: assetUrl('images/vietnam/styles/nhat-3.jpg'),
        tag: 'Hiên rộng · Đồng Tháp'
      }
    ]
  },

  'nhiet-doi': {
    styleId: 'nhiet-doi',
    name: 'Nhiệt đới (Tropical)',
    summary: 'Kiến trúc mở đón nắng gió, mái hiên vươn sâu và cây xanh che mát của các biệt thự nghỉ dưỡng tại Đà Nẵng, Nha Trang.',
    pinterestQuery: 'phối cảnh 3D biệt thự nhiệt đới đà nẵng tropical house',
    slides: [
      {
        id: 'trop-1',
        angle: 'Biệt thự 2 tầng nhiệt đới',
        title: 'Biệt thự 2 tầng phong cách nhiệt đới Tropical tại Đà Nẵng',
        desc: 'Mái hiên vươn sâu kết hợp rèm cây xanh che mát nắng gắt hướng Tây, đón trọn gió biển mát rượi.',
        imageUrl: assetUrl('images/vietnam/styles/trop-1.jpg'),
        tag: '2 tầng · Đà Nẵng'
      },
      {
        id: 'trop-2',
        angle: 'Góc nghiêng cảnh quan',
        title: 'Góc nghiêng phân khối với mảng tường đá ong xám tự nhiên',
        desc: 'Vật liệu mộc mạc như đá ong xám, gỗ tự nhiên và thảm thực vật nhiệt đới tựa như resort nghỉ dưỡng.',
        imageUrl: assetUrl('images/vietnam/styles/trop-2.jpg'),
        tag: 'Đá ong xám · Sinh thái'
      },
      {
        id: 'trop-3',
        angle: 'Sân vườn nghỉ dưỡng',
        title: 'Khuôn viên sân vườn hồ cá và cây xanh bản địa Việt Nam',
        desc: 'Mặt nước và cây xanh giúp điều hòa vi khí hậu mát mẻ tự nhiên quanh năm.',
        imageUrl: assetUrl('images/vietnam/styles/trop-3.jpg'),
        tag: 'Hồ nước · Cây xanh'
      }
    ]
  },

  'luxury': {
    styleId: 'luxury',
    name: 'Hiện đại sang trọng',
    summary: 'Đá tự nhiên nguyên tấm, vách kính vô cực và kiến trúc đẳng cấp của các dinh thự tại Hải Phòng, Ecopark.',
    pinterestQuery: 'phối cảnh 3D biệt thự luxury sang trọng việt nam',
    slides: [
      {
        id: 'lux-1',
        angle: 'Dinh thự 4 tầng',
        title: 'Thiết kế dinh thự 4 tầng bề thế sang trọng tại Hải Phòng',
        desc: 'Hệ kính khổ lớn tràn viền mang lại tầm nhìn panorama ngoạn mục, khẳng định đẳng cấp gia chủ.',
        imageUrl: assetUrl('images/vietnam/styles/lux-1.jpg'),
        tag: '4 tầng · Hải Phòng'
      },
      {
        id: 'lux-2',
        angle: 'Biệt thự 3 tầng Hà Nội',
        title: 'Biệt thự hiện đại 3 tầng mái chéo cao cấp tại Hà Nội',
        desc: 'Sự phối hợp tinh tế giữa vật liệu đá marble tự nhiên, kính cản nhiệt và chiếu sáng kiến trúc rực rỡ.',
        imageUrl: assetUrl('images/vietnam/styles/lux-2.jpg'),
        tag: '3 tầng · Hà Nội'
      },
      {
        id: 'lux-3',
        angle: 'Biệt thự Phú Mỹ Hưng',
        title: 'Biệt thự lâu đài tân cổ điển 3 tầng tại Phú Mỹ Hưng (TP.HCM)',
        desc: 'Khuôn viên tư gia biệt lập với cảnh quan đắt giá, thể hiện vị thế và tầm vóc của chủ nhân.',
        imageUrl: assetUrl('images/vietnam/styles/lux-3.jpg'),
        tag: 'Thượng lưu · Phú Mỹ Hưng'
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
