import { useEffect, useState } from 'react';
import {
  DEFAULT_SAMPLE_DOSSIER,
  getSampleDossier,
  saveSampleDossier,
  type SampleDossier,
  type SamplePerspective
} from '../../domain/sampleDossier';

interface Props {
  onBack?: () => void;
}

export function SampleDossierManager({ onBack }: Props) {
  const [dossier, setDossier] = useState<SampleDossier>(DEFAULT_SAMPLE_DOSSIER);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; bad?: boolean } | null>(null);

  // Load hồ sơ hiện tại từ Firestore
  useEffect(() => {
    getSampleDossier()
      .then((data) => {
        setDossier(data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await saveSampleDossier(dossier);
      setMsg({ text: '✅ Đã lưu hồ sơ mẫu và cập nhật thành công lên hệ thống!' });
    } catch (err) {
      setMsg({ text: '❌ Lỗi khi lưu: ' + ((err as Error)?.message || String(err)), bad: true });
    } finally {
      setSaving(false);
    }
  };

  const updatePerspective = (index: number, patch: Partial<SamplePerspective>) => {
    setDossier((prev) => {
      const list = [...prev.perspectives];
      list[index] = { ...list[index], ...patch };
      return { ...prev, perspectives: list };
    });
  };

  const removePerspective = (index: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa ảnh phối cảnh này?')) return;
    setDossier((prev) => ({
      ...prev,
      perspectives: prev.perspectives.filter((_, i) => i !== index)
    }));
  };

  const addPerspective = () => {
    const newP: SamplePerspective = {
      id: 'p-' + Date.now(),
      title: 'Phối cảnh góc mới',
      url: '/images/samples/phoi-canh-chinh-ngay.jpg',
      tag: 'Chi tiết kiến trúc',
      description: 'Mô tả chi tiết góc phối cảnh 3D.'
    };
    setDossier((prev) => ({
      ...prev,
      perspectives: [...prev.perspectives, newP]
    }));
  };

  const resetToDefault = () => {
    if (!window.confirm('Khôi phục toàn bộ thông tin và ảnh phối cảnh Gemini AI mặc định ban đầu?')) return;
    setDossier({ ...DEFAULT_SAMPLE_DOSSIER });
    setMsg({ text: 'Đã nạp lại bộ dữ liệu mẫu mặc định (chưa bấm Lưu).' });
  };

  if (loading) {
    return <div className="card" style={{ padding: 24, textAlign: 'center' }}>Đang nạp dữ liệu hồ sơ mẫu…</div>;
  }

  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="adm-bar">
        <div>
          <h1 style={{ fontSize: 24, margin: 0 }}>📁 Quản lý Hồ sơ Thiết kế & Phối cảnh mẫu</h1>
          <p className="hint" style={{ margin: '4px 0 0' }}>
            Hồ sơ này chỉ khách hàng sau khi hoàn tất nộp phiếu khảo sát mới được mở khóa xem (hoặc Admin xem trực tiếp).
          </p>
        </div>
        <div className="nav-r">
          {onBack && (
            <button type="button" className="btn ghost sm" onClick={onBack}>
              ← Quay lại danh sách Leads
            </button>
          )}
          <a
            href="#/ho-so-mau"
            target="_blank"
            rel="noopener noreferrer"
            className="btn ghost sm"
            style={{ textDecoration: 'none' }}
          >
            👁️ Mở giao diện khách xem ↗
          </a>
        </div>
      </div>

      {msg && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            fontSize: 14,
            background: msg.bad ? '#FDEDEC' : '#E8F5E9',
            color: msg.bad ? '#C62828' : '#2E7D32',
            border: `1px solid ${msg.bad ? '#F5C6CB' : '#C8E6C9'}`
          }}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSave} className="stack" style={{ gap: 24 }}>
        {/* Phần 1: Thông tin cơ bản */}
        <div className="card">
          <h2 style={{ fontSize: 18, margin: '0 0 16px', borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
            1. Thông tin chung công trình mẫu
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Tiêu đề hồ sơ</label>
              <input
                className="in"
                value={dossier.title}
                onChange={(e) => setDossier({ ...dossier, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Phụ đề / Kiểu công trình</label>
              <input
                className="in"
                value={dossier.subtitle}
                onChange={(e) => setDossier({ ...dossier, subtitle: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Tên Chủ đầu tư</label>
              <input
                className="in"
                value={dossier.clientName}
                onChange={(e) => setDossier({ ...dossier, clientName: e.target.value })}
              />
            </div>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Địa điểm xây dựng</label>
              <input
                className="in"
                value={dossier.location}
                onChange={(e) => setDossier({ ...dossier, location: e.target.value })}
              />
            </div>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Quy mô & Kích thước</label>
              <input
                className="in"
                value={dossier.scale}
                onChange={(e) => setDossier({ ...dossier, scale: e.target.value })}
              />
            </div>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Kỹ sư thiết kế / Chủ trì</label>
              <input
                className="in"
                value={dossier.designer}
                onChange={(e) => setDossier({ ...dossier, designer: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Mô tả tóm tắt hồ sơ</label>
            <textarea
              className="in"
              rows={3}
              value={dossier.summary}
              onChange={(e) => setDossier({ ...dossier, summary: e.target.value })}
            />
          </div>
        </div>

        {/* Phần 2: Tệp hồ sơ PDF */}
        <div className="card">
          <h2 style={{ fontSize: 18, margin: '0 0 16px', borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
            2. Tệp PDF Bản vẽ Kỹ thuật thi công
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Đường dẫn file PDF (Local hoặc URL Online)</label>
              <input
                className="in"
                value={dossier.pdfUrl}
                onChange={(e) => setDossier({ ...dossier, pdfUrl: e.target.value })}
                placeholder="/samples/ho-so-mau-ket-cau-ha-tinh.pdf"
                required
              />
            </div>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Tên file khi khách tải về (.pdf)</label>
              <input
                className="in"
                value={dossier.pdfFileName}
                onChange={(e) => setDossier({ ...dossier, pdfFileName: e.target.value })}
              />
            </div>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Dung lượng hiển thị (VD: 8.9 MB)</label>
              <input
                className="in"
                value={dossier.pdfFileSize}
                onChange={(e) => setDossier({ ...dossier, pdfFileSize: e.target.value })}
              />
            </div>
            <div>
              <label className="hint" style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Tổng số trang bản vẽ</label>
              <input
                className="in"
                type="number"
                value={dossier.pdfPageCount}
                onChange={(e) => setDossier({ ...dossier, pdfPageCount: Number(e.target.value) || 1 })}
              />
            </div>
          </div>
          <p className="hint" style={{ marginTop: 8, fontSize: 12.5 }}>
            💡 Mẹo: File mặc định <code>/samples/ho-so-mau-ket-cau-ha-tinh.pdf</code> (35 trang kết cấu chi tiết) đã được đặt sẵn trong thư mục mã nguồn.
          </p>
        </div>

        {/* Phần 3: Danh sách ảnh phối cảnh 3D Gemini AI */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, margin: 0 }}>
              3. Bộ ảnh phối cảnh 3D kiến trúc (Tạo từ mặt bằng)
            </h2>
            <button type="button" className="btn ghost sm" onClick={addPerspective}>
              ➕ Thêm ảnh góc phối cảnh
            </button>
          </div>

          <div className="stack" style={{ gap: 16 }}>
            {dossier.perspectives.map((p, idx) => (
              <div
                key={p.id || idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr auto',
                  gap: 16,
                  alignItems: 'start',
                  padding: 12,
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  background: 'var(--accent-soft)'
                }}
              >
                <div style={{ width: 120, height: 85, borderRadius: 6, overflow: 'hidden', background: '#ccc' }}>
                  <img
                    src={p.url}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="70"><text y="35" x="20">No image</text></svg>';
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                  <div>
                    <label className="hint" style={{ display: 'block', fontSize: 12, marginBottom: 2 }}>Tiêu đề góc</label>
                    <input
                      className="in sm"
                      value={p.title}
                      onChange={(e) => updatePerspective(idx, { title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="hint" style={{ display: 'block', fontSize: 12, marginBottom: 2 }}>Phân loại (Tag)</label>
                    <select
                      className="in sm"
                      value={p.tag}
                      onChange={(e) => updatePerspective(idx, { tag: e.target.value as SamplePerspective['tag'] })}
                    >
                      <option value="Mặt tiền chính">Mặt tiền chính</option>
                      <option value="Góc sân vườn & Sảnh phụ">Góc sân vườn & Sảnh phụ</option>
                      <option value="Hoàng hôn & Ban đêm">Hoàng hôn & Ban đêm</option>
                      <option value="Mặt bằng 3D">Mặt bằng 3D</option>
                      <option value="Chi tiết kiến trúc">Chi tiết kiến trúc</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label className="hint" style={{ display: 'block', fontSize: 12, marginBottom: 2 }}>Đường dẫn ảnh (URL hoặc đường dẫn nội bộ)</label>
                    <input
                      className="in sm"
                      value={p.url}
                      onChange={(e) => updatePerspective(idx, { url: e.target.value })}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label className="hint" style={{ display: 'block', fontSize: 12, marginBottom: 2 }}>Mô tả góc kiến trúc</label>
                    <input
                      className="in sm"
                      value={p.description}
                      onChange={(e) => updatePerspective(idx, { description: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn ghost sm"
                    style={{ color: '#C62828', borderColor: '#F5C6CB' }}
                    onClick={() => removePerspective(idx)}
                    title="Xóa ảnh này"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút hành động */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn ghost" onClick={resetToDefault}>
            🔄 Nạp lại dữ liệu gốc mặc định
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            {onBack && (
              <button type="button" className="btn ghost" onClick={onBack}>
                Hủy bỏ
              </button>
            )}
            <button type="submit" className="btn" disabled={saving} style={{ minWidth: 160 }}>
              {saving ? 'Đang lưu lên Firestore…' : '💾 Lưu cập nhật Hồ sơ'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
