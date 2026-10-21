import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export function QRCodeView({ value, size = 150 }: { value: string; size?: number }) {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    if (!value) return;
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: {
        dark: '#1B1F1D',
        light: '#FFFFFF'
      }
    })
      .then(setDataUrl)
      .catch(() => setDataUrl(''));
  }, [value, size]);

  if (!dataUrl) return null;

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10,
      background: '#FFFFFF',
      borderRadius: 12,
      border: '1px solid var(--line)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <img src={dataUrl} alt="Mã QR hồ sơ" width={size} height={size} style={{ display: 'block' }} />
      <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, fontWeight: 500 }}>
        Quét mã lưu hồ sơ
      </span>
    </div>
  );
}
