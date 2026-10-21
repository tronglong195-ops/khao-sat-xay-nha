import { useEffect, useState } from 'react';
import { Note } from '../../components/ui';
import { MAX_FILES, pickFiles } from '../../services/files';

export function FileField({ files, onChange }: { files: File[]; onChange: (f: File[]) => void }) {
  const [rejected, setRejected] = useState<string[]>([]);
  const [previews, setPreviews] = useState<{ [name: string]: string }>({});

  // Tạo và dọn dẹp URL xem trước cho các file ảnh
  useEffect(() => {
    const urls: { [name: string]: string } = {};
    files.forEach((f) => {
      if (f.type.startsWith('image/')) {
        urls[f.name + f.size] = URL.createObjectURL(f);
      }
    });
    setPreviews(urls);

    return () => {
      Object.values(urls).forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  const fmtSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="sec">
      <label className="file">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E5A4C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
        </svg>
        <span className="file-t">Tải lên sơ đồ hiện trạng, ảnh sổ đỏ, ảnh lô đất</span>
        <span className="hint">
          {files.length ? 'Đã chọn ' + files.length + '/' + MAX_FILES + ' tệp' : 'Ảnh (JPG, PNG) hoặc PDF – có thể chọn nhiều tệp, tối đa ' + MAX_FILES + ' tệp'}
        </span>
        <input type="file" multiple accept="image/*,application/pdf"
          onChange={(e) => {
            const r = pickFiles([...files, ...Array.from(e.target.files ?? [])]);
            setRejected(r.rejected);
            onChange(r.files);
            e.target.value = '';
          }} />
      </label>

      {files.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
            Danh sách tệp đã chọn ({files.length}/{MAX_FILES}):
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 12
          }}>
            {files.map((f, i) => {
              const key = f.name + f.size;
              const imgUrl = previews[key];
              const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf');

              return (
                <div
                  key={key + i}
                  style={{
                    position: 'relative',
                    border: '1px solid var(--line)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: 'var(--surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                  }}
                >
                  {/* Nút xóa góc phải */}
                  <button
                    type="button"
                    onClick={() => onChange(files.filter((_, j) => j !== i))}
                    aria-label={'Xóa tệp ' + f.name}
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#FFF',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: 14,
                      lineHeight: 1,
                      zIndex: 2
                    }}
                  >
                    ×
                  </button>

                  {/* Thumbnail */}
                  <div style={{
                    width: '100%',
                    height: 85,
                    background: '#F0EFEA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={f.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : isPdf ? (
                      <div style={{ textAlign: 'center', color: '#D32F2F' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v1.5h1.5v1h-1.5V16H6v-6h3.5c.8 0 1.5.7 1.5 1.5v2c0 .8-.7 1.5-1.5 1.5zm5 2c0 .8-.7 1.5-1.5 1.5h-2.5v-6H13c.8 0 1.5.7 1.5 1.5v3zm4-3.5h-3v6h1.5v-2h1.5v-1h-1.5v-1.5h1.5v-1.5z" />
                        </svg>
                        <span style={{ display: 'block', fontSize: 10, fontWeight: 700, marginTop: 2 }}>PDF</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: 24 }}>📄</span>
                    )}
                  </div>

                  {/* Tên tệp & kích thước */}
                  <div style={{ padding: '6px 8px', fontSize: 11 }}>
                    <div style={{
                      fontWeight: 500,
                      color: 'var(--ink)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }} title={f.name}>
                      {f.name}
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: 10, marginTop: 2 }}>
                      {fmtSize(f.size)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {rejected.length > 0 && <Note bad role="status">Không nhận: {rejected.join('; ')}.</Note>}
    </div>
  );
}
