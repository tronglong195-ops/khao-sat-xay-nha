// Chuẩn bị tệp đính kèm: ảnh nén cạnh dài 1600 px JPEG 0.82; PDF ≤ 10 MB; tối đa 8 tệp.
export const MAX_FILES = 8;
export const MAX_PDF_BYTES = 10 * 1024 * 1024;
const MAX_EDGE = 1600;
const JPEG_Q = 0.82;

export interface EncodedFile {
  name: string;
  type: string;
  data: string;
}

/** Lọc tệp hợp lệ, trả về danh sách nhận + thông báo các tệp bị bỏ. */
export function pickFiles(list: File[]): { files: File[]; rejected: string[] } {
  const files: File[] = [];
  const rejected: string[] = [];
  for (const f of list) {
    const isImg = f.type.startsWith('image/');
    const isPdf = f.type === 'application/pdf';
    if (!isImg && !isPdf) rejected.push(f.name + ' (không phải ảnh/PDF)');
    else if (isPdf && f.size > MAX_PDF_BYTES) rejected.push(f.name + ' (PDF quá 10 MB)');
    else if (files.length >= MAX_FILES) rejected.push(f.name + ' (quá 8 tệp)');
    else files.push(f);
  }
  return { files, rejected };
}

function blobToBase64(b: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] ?? '');
    r.onerror = () => reject(r.error);
    r.readAsDataURL(b);
  });
}

async function compressImage(f: File): Promise<EncodedFile> {
  const bmp = await createImageBitmap(f);
  const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Trình duyệt không hỗ trợ nén ảnh');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bmp, 0, 0, w, h);
  bmp.close();
  const blob = await new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('Không nén được ảnh'))), 'image/jpeg', JPEG_Q));
  return { name: f.name.replace(/\.[^.]+$/, '') + '.jpg', type: 'image/jpeg', data: await blobToBase64(blob) };
}

export async function encodeFiles(files: File[]): Promise<EncodedFile[]> {
  const out: EncodedFile[] = [];
  for (const f of files) {
    if (f.type.startsWith('image/')) {
      try {
        out.push(await compressImage(f));
        continue;
      } catch {
        // định dạng ảnh trình duyệt không đọc được (VD: HEIC) → gửi nguyên bản
      }
    }
    out.push({ name: f.name, type: f.type || 'application/octet-stream', data: await blobToBase64(f) });
  }
  return out;
}
