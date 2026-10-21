import type { FormState } from './types';

export interface PresetTemplate {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  patch: Partial<FormState>;
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'nha-pho-4-tang',
    title: 'Nhà phố 4 tầng tiêu chuẩn',
    icon: '🏠',
    tagline: 'Phổ biến nhất · Gia đình 2 thế hệ (4–5 người)',
    description: '4 tầng + tum, mái bằng BTCT, 4 phòng ngủ, 4 WC, gara ô tô tầng 1, phòng thờ sân thượng.',
    patch: {
      type: 'Nhà phố',
      floors: 4,
      mezz: 'Không lửng',
      tum: 'Có tum',
      basement: 'Không',
      roof: 'Mái bằng BTCT',
      adults: 2,
      kids: 2,
      elders: 0,
      beds: 4,
      wcs: 4,
      cars: 1,
      altar: 'Tầng trên cùng',
      kitchen: 'Bếp mở liên thông phòng khách',
      well: 'Có giếng trời',
      business: 'Không',
      lift: 'Không',
      style: 'hien-dai',
      floorRooms: {
        'Tầng 1': ['Phòng khách', 'Bếp + bàn ăn', 'WC chung', 'Gara ô tô'],
        'Tầng 2': ['Phòng ngủ master', 'Phòng ngủ', 'WC master', 'WC chung'],
        'Tầng 3': ['Phòng ngủ', 'Phòng làm việc', 'WC chung', 'Sinh hoạt chung'],
        'Tầng 4': ['Phòng ngủ', 'Kho', 'WC chung'],
        'Tum / sân thượng': ['Phòng thờ', 'Giặt – phơi', 'Sân thượng']
      },
      budget: '2,5 – 4 tỷ',
      pkg: 'Trọn gói chìa khóa trao tay',
      level: 'Khá'
    }
  },
  {
    id: 'biet-thu-vuon',
    title: 'Biệt thự mini / Nhà vườn',
    icon: '🏡',
    tagline: 'Sang trọng · Thoáng đãng · Có người cao tuổi',
    description: '2–3 tầng, mái Nhật, phòng ngủ tầng 1 tiện lợi cho ông bà, sân vườn cây xanh xung quanh.',
    patch: {
      type: 'Biệt thự',
      floors: 3,
      mezz: 'Không lửng',
      tum: 'Không tum',
      basement: 'Không',
      roof: 'Mái Nhật (kèo thép lợp ngói)',
      adults: 2,
      kids: 2,
      elders: 1,
      beds: 4,
      wcs: 4,
      cars: 1,
      altar: 'Phòng thờ riêng',
      kitchen: 'Bếp có đảo',
      well: 'Có giếng trời',
      business: 'Không',
      lift: 'Để chờ hố thang',
      style: 'luxury',
      spaces: ['Sân vườn', 'Ban công trồng cây'],
      floorRooms: {
        'Tầng 1': ['Phòng khách', 'Bếp + bàn ăn', 'Phòng ngủ', 'WC master', 'Sân thượng'],
        'Tầng 2': ['Phòng ngủ master', 'Phòng ngủ', 'WC master', 'Sinh hoạt chung'],
        'Tầng 3': ['Phòng thờ', 'Phòng làm việc', 'Giặt – phơi', 'Sân thượng']
      },
      budget: '4 – 6 tỷ',
      pkg: 'Trọn gói chìa khóa trao tay',
      level: 'Cao cấp'
    }
  },
  {
    id: 'nha-pho-kinh-doanh',
    title: 'Nhà phố kết hợp kinh doanh',
    icon: '🏢',
    tagline: 'Đa năng · Tầng 1 buôn bán/cho thuê · Thang máy',
    description: '5 tầng + tum, có thang máy, tầng 1 kinh doanh mở, các tầng trên sinh hoạt gia đình.',
    patch: {
      type: 'Shophouse',
      floors: 5,
      mezz: 'Có lửng',
      tum: 'Có tum',
      basement: 'Không',
      roof: 'Mái bằng BTCT',
      adults: 2,
      kids: 2,
      elders: 0,
      beds: 4,
      wcs: 5,
      cars: 1,
      altar: 'Tầng trên cùng',
      kitchen: 'Bếp mở liên thông phòng khách',
      well: 'Có giếng trời',
      business: 'Tự kinh doanh',
      lift: 'Có',
      liftType: 'Không phòng máy (MRL)',
      style: 'hien-dai',
      floorRooms: {
        'Tầng 1': ['Kinh doanh', 'WC chung', 'Gara ô tô'],
        'Tầng lửng': ['Phòng làm việc', 'Sinh hoạt chung'],
        'Tầng 2': ['Phòng khách', 'Bếp + bàn ăn', 'WC chung'],
        'Tầng 3': ['Phòng ngủ master', 'Phòng ngủ', 'WC master', 'WC chung'],
        'Tầng 4': ['Phòng ngủ', 'Phòng ngủ', 'WC chung', 'Giặt – phơi'],
        'Tầng 5': ['Phòng thờ', 'Kho', 'Sân thượng']
      },
      budget: '4 – 6 tỷ',
      pkg: 'Trọn gói chìa khóa trao tay',
      level: 'Khá'
    }
  }
];
