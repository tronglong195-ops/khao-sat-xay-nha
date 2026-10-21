import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../services/firebase';
import { assetUrl } from './format';

export interface SamplePerspective {
  id: string;
  title: string;
  url: string;
  tag: 'Mặt tiền chính' | 'Góc sân vườn & Sảnh phụ' | 'Hoàng hôn & Ban đêm' | 'Mặt bằng 3D' | 'Chi tiết kiến trúc';
  description: string;
}

export interface SampleDrawingSheet {
  sheetNo: string; // ví dụ: 'KC-00', 'KC-01-01'
  title: string;
  page: number;
  category: 'Quy chuẩn & Chỉ dẫn' | 'Móng & Cọc' | 'Bể ngầm' | 'Cột & Giằng tường' | 'Dầm sàn' | 'Hệ mái vì kèo';
}

export interface SampleDossier {
  id: string;
  title: string;
  subtitle: string;
  clientName: string;
  location: string;
  scale: string;
  designer: string;
  checker: string;
  year: number;
  pdfUrl: string;
  pdfFileName: string;
  pdfFileSize: string;
  pdfPageCount: number;
  summary: string;
  structureSpecs: { label: string; value: string }[];
  perspectives: SamplePerspective[];
  drawingSheets: SampleDrawingSheet[];
  updatedAt?: string;
}

// Hồ sơ mẫu mặc định lấy từ bộ hồ sơ kỹ thuật thi công thực tế tại Hà Tĩnh
export const DEFAULT_SAMPLE_DOSSIER: SampleDossier = {
  id: 'ha-tinh-nha-vuon-mai-nhat',
  title: 'Hồ sơ thiết kế kỹ thuật thi công & Phối cảnh 3D',
  subtitle: 'Biệt thự nhà vườn 1 tầng mái Nhật hiện đại — Kích thước 11.3m × 8.95m',
  clientName: 'Chị Nguyễn Thị Ánh Nguyệt',
  location: 'Nam Hồng, Thị xã Hồng Lĩnh, Tỉnh Hà Tĩnh',
  scale: '1 tầng · Kích thước phủ bì 12.2m × 8.95m · Diện tích sàn ~105 m²',
  designer: 'Hằng A Lao & Đội ngũ Kỹ sư DS DESIGN',
  checker: 'Nguyễn Tất Hội',
  year: 2026,
  pdfUrl: '/samples/ho-so-mau-ket-cau-ha-tinh.pdf',
  pdfFileName: 'Ho-so-thiet-ke-ky-thuat-thi-cong-Ha-Tinh.pdf',
  pdfFileSize: '8.9 MB',
  pdfPageCount: 35,
  summary: 'Hồ sơ thiết kế kỹ thuật thi công hoàn chỉnh bao gồm 35 bản vẽ kết cấu chi tiết: Hệ móng cọc BTCT 200×200 đài giằng kiên cố, khung cột BTCT chịu lực, dầm sàn sảnh, sàn mái bê tông và hệ vì kèo thép nhẹ C75 lợp ngói sóng Nhật Bản độ dốc 30°. Phối cảnh 3D kiến trúc được render bằng công nghệ Gemini AI chuẩn xác từ chính hệ trục mặt bằng kết cấu.',
  structureSpecs: [
    { label: 'Giải pháp móng', value: 'Móng cọc BTCT 200×200 đài đơn & đài đôi kết hợp giằng móng 300×500' },
    { label: 'Khung chịu lực', value: 'Khung bê tông cốt thép toàn khối, cột C1 (220×220) & C2 (220×220)' },
    { label: 'Sàn & Giằng', value: 'Giằng chân tường GCT1 (220×300), sàn sảnh & sàn mái dày 120mm bê tông Mác 250' },
    { label: 'Hệ vì kèo mái', value: 'Hệ giàn thép nhẹ mạ nhôm kẽm C75/75, lito/mè TS35 lợp ngói sóng Nhật cao cấp' },
    { label: 'Độ dốc mái ngói', value: 'Độ dốc tiêu chuẩn 30° thoát nước mưa cực nhanh, chống đọng nước và chống dột' },
    { label: 'Sảnh chính & phụ', value: 'Sảnh chính ngũ cấp 5 bậc đá Granite hổ phách, sảnh phụ 3 bậc tam cấp kết nối sân vườn' }
  ],
  perspectives: [
    {
      id: 'p-1',
      title: 'Mặt tiền chính ban ngày (Góc chính diện 3/4)',
      url: '/images/samples/phoi-canh-chinh-ngay.jpg',
      tag: 'Mặt tiền chính',
      description: 'Phối cảnh 3D mặt tiền biệt thự nhà vườn 1 tầng mái Nhật rendered từ mặt bằng 11.3m × 9m. Hệ mái Nhật đa tầng màu xám ghi sang trọng, sảnh chính ngũ cấp ốp đá Granite hổ phách, cột vuông ốp đá chân cột, cửa kính Xingfa đón sáng tự nhiên.'
    },
    {
      id: 'p-2',
      title: 'Góc nghiêng sảnh phụ & Sân vườn thư giãn',
      url: '/images/samples/phoi-canh-sanh-phu.jpg',
      tag: 'Góc sân vườn & Sảnh phụ',
      description: 'Phối cảnh góc nhìn từ sân vườn vào sảnh phụ bên phải ngôi nhà. Sảnh phụ tam cấp kết nối trực tiếp phòng bếp ăn, lam gỗ nhựa ngoài trời che mát, đường dạo lát đá sỏi tự nhiên giữa thảm cỏ xanh mướt.'
    },
    {
      id: 'p-3',
      title: 'Phối cảnh hoàng hôn & Ban đêm lung linh',
      url: '/images/samples/phoi-canh-dem.jpg',
      tag: 'Hoàng hôn & Ban đêm',
      description: 'Căn nhà rực sáng trong ánh đèn hoàng hôn. Hệ thống đèn LED âm trần 3000K hắt tường và hắt mái, đèn rọi cây sân vườn tạo không gian sống ấm áp, sang trọng và đẳng cấp.'
    }
  ],
  drawingSheets: [
    { sheetNo: 'KC-00', title: 'Bìa hồ sơ & Ghi chú chung, tiêu chuẩn thi công', page: 1, category: 'Quy chuẩn & Chỉ dẫn' },
    { sheetNo: 'KC-01-01', title: 'Mặt bằng định vị cọc BTCT 200×200', page: 5, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-02', title: 'Chi tiết đoạn cọc C1, C2 & Mối nối cọc', page: 6, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-03', title: 'Mặt bằng móng & Giằng móng GM1 – GM8', page: 7, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-04', title: 'Mặt bằng định vị cổ cột', page: 8, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-05', title: 'Mặt bằng giằng chân tường GCT1, GCT2', page: 9, category: 'Cột & Giằng tường' },
    { sheetNo: 'KC-01-06', title: 'Mặt bằng thép sàn nền tầng 1', page: 10, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-07', title: 'Chi tiết đài móng M1, M2', page: 11, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-08', title: 'Chi tiết đài móng M3, M4', page: 12, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-09', title: 'Chi tiết cổ cột CC', page: 13, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-10', title: 'Chi tiết dầm móng GM1 – GM8 (300×500)', page: 14, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-11', title: 'Chi tiết ngũ cấp sảnh chính và sảnh phụ', page: 15, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-12', title: 'Bảng thống kê cốt thép móng (Phần 1)', page: 16, category: 'Móng & Cọc' },
    { sheetNo: 'KC-01-13', title: 'Bảng thống kê cốt thép móng (Phần 2)', page: 17, category: 'Móng & Cọc' },
    { sheetNo: 'KC-02-01', title: 'Mặt bằng & Mặt cắt bể phốt 3 ngăn tự hoại', page: 18, category: 'Bể ngầm' },
    { sheetNo: 'KC-02-02', title: 'Thống kê cốt thép bể phốt', page: 19, category: 'Bể ngầm' },
    { sheetNo: 'KC-02-03', title: 'Chi tiết bể nước sinh hoạt ngầm', page: 20, category: 'Bể ngầm' },
    { sheetNo: 'KC-03-01', title: 'Mặt bằng định vị cột tầng 1', page: 21, category: 'Cột & Giằng tường' },
    { sheetNo: 'KC-03-02', title: 'Chi tiết cột C1, C2 & Thống kê thép cột', page: 22, category: 'Cột & Giằng tường' },
    { sheetNo: 'KC-04-01', title: 'Mặt bằng kết cấu sàn sảnh tầng 1', page: 23, category: 'Dầm sàn' },
    { sheetNo: 'KC-04-02', title: 'Mặt bằng kết cấu sàn mái (+4.200)', page: 24, category: 'Dầm sàn' },
    { sheetNo: 'KC-04-03', title: 'Chi tiết dầm sàn D1 – D4 & DM1 – DM6', page: 25, category: 'Dầm sàn' },
    { sheetNo: 'KC-04-04', title: 'Bảng thống kê cốt thép dầm sàn', page: 26, category: 'Dầm sàn' },
    { sheetNo: 'KC-05-01', title: 'Mặt bằng thép sàn sảnh', page: 27, category: 'Dầm sàn' },
    { sheetNo: 'KC-05-02', title: 'Mặt bằng thép sàn mái — Lớp dưới', page: 28, category: 'Dầm sàn' },
    { sheetNo: 'KC-05-03', title: 'Mặt bằng thép sàn mái — Lớp trên', page: 29, category: 'Dầm sàn' },
    { sheetNo: 'KC-05-04', title: 'Mặt bằng thép tăng cường sàn mái', page: 30, category: 'Dầm sàn' },
    { sheetNo: 'KC-05-05', title: 'Thống kê cốt thép sàn mái', page: 31, category: 'Dầm sàn' },
    { sheetNo: 'KC-06-01', title: 'Chi tiết vật tư & liên kết hệ vì kèo mái Nhật', page: 32, category: 'Hệ mái vì kèo' },
    { sheetNo: 'KC-06-02', title: 'Sơ đồ vì kèo điển hình & Nút liên kết 01 – 06', page: 33, category: 'Hệ mái vì kèo' },
    { sheetNo: 'KC-06-03', title: 'Thông số chi tiết hệ vì kèo thép nhẹ C75', page: 34, category: 'Hệ mái vì kèo' },
    { sheetNo: 'KC-06-04', title: 'Chi tiết liên kết chân kèo, dầm bê tông & thanh mè', page: 35, category: 'Hệ mái vì kèo' }
  ]
};

// Chuẩn hóa đường dẫn tài nguyên (tương thích GitHub Pages base URL và Firebase Hosting)
export function resolveDossierAssets(d: SampleDossier): SampleDossier {
  return {
    ...d,
    pdfUrl: assetUrl(d.pdfUrl),
    perspectives: (d.perspectives || []).map((p) => ({
      ...p,
      url: assetUrl(p.url)
    }))
  };
}

// Lấy hồ sơ mẫu từ Firestore hoặc fallback mặc định
export async function getSampleDossier(): Promise<SampleDossier> {
  if (!isFirebaseConfigured) {
    return resolveDossierAssets(DEFAULT_SAMPLE_DOSSIER);
  }
  try {
    const snap = await getDoc(doc(db(), 'config', 'sampleDossier'));
    if (snap.exists()) {
      const data = snap.data() as Partial<SampleDossier>;
      const merged: SampleDossier = {
        ...DEFAULT_SAMPLE_DOSSIER,
        ...data,
        perspectives: data.perspectives && data.perspectives.length > 0 ? data.perspectives : DEFAULT_SAMPLE_DOSSIER.perspectives,
        drawingSheets: data.drawingSheets && data.drawingSheets.length > 0 ? data.drawingSheets : DEFAULT_SAMPLE_DOSSIER.drawingSheets
      };
      return resolveDossierAssets(merged);
    }
  } catch (err) {
    console.warn('Không thể đọc sampleDossier từ Firestore, sử dụng mặc định:', err);
  }
  return resolveDossierAssets(DEFAULT_SAMPLE_DOSSIER);
}

// Lưu hồ sơ mẫu lên Firestore (chỉ Admin)
export async function saveSampleDossier(dossier: SampleDossier): Promise<void> {
  if (!isFirebaseConfigured) {
    throw new Error('Chưa cấu hình Firebase');
  }
  const clean: SampleDossier = {
    ...dossier,
    updatedAt: new Date().toISOString()
  };
  await setDoc(doc(db(), 'config', 'sampleDossier'), clean);
}
