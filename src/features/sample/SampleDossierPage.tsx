import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Page } from '../../components/Layout';
import { COMPANY } from '../../config/company';
import {
  DEFAULT_SAMPLE_DOSSIER,
  getSampleDossier,
  type SampleDossier,
  type SamplePerspective
} from '../../domain/sampleDossier';
import { auth, isFirebaseConfigured } from '../../services/firebase';
import { isAdmin } from '../../services/leads';
import { SampleDossierManager } from '../admin/SampleDossierManager';

type ActiveTab = 'perspectives' | 'pdf' | 'specs';

export default function SampleDossierPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [dossier, setDossier] = useState<SampleDossier>(DEFAULT_SAMPLE_DOSSIER);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<ActiveTab>('perspectives');
  const [activePIndex, setActivePIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<SamplePerspective | null>(null);
  const [pdfPage, setPdfPage] = useState(1);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showAdminEditor, setShowAdminEditor] = useState(false);

  // Kiểm tra quyền vào xem (chỉ khi gửi submit thì mới được vào, hoặc là admin)
  const isUnlocked = useMemo(() => {
    if (params.get('lead') || params.get('unlocked') === 'true') return true;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('khao_sat_submitted_lead');
      if (stored) return true;
    }
    return false;
  }, [params]);

  // Kiểm tra trạng thái admin
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const user = auth().currentUser;
    if (user?.email) {
      isAdmin(user.email).then(setIsUserAdmin);
    }
  }, []);

  // Nạp dữ liệu hồ sơ mẫu
  useEffect(() => {
    document.title = 'Hồ sơ thiết kế kỹ thuật & Phối cảnh 3D mẫu – DS DESIGN';
    getSampleDossier()
      .then((data) => {
        setDossier(data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const activePerspective = dossier.perspectives[activePIndex] || dossier.perspectives[0];

  // Nếu chưa hoàn tất khảo sát và không phải Admin -> Khóa truy cập
  if (!loading && !isUnlocked && !isUserAdmin) {
    return (
      <Page>
        <div className="wrap" style={{ paddingTop: 60, paddingBottom: 80 }}>
          <div className="card center" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', padding: '40px 24px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
            <h1 style={{ fontSize: 24, margin: '0 0 12px', color: 'var(--ink)' }}>
              Bộ hồ sơ thiết kế mẫu dành riêng cho khách hàng đã khảo sát
            </h1>
            <p style={{ margin: '0 0 20px', color: 'var(--muted)', lineHeight: 1.6, fontSize: 15 }}>
              Để xem trọn bộ <strong>35 bản vẽ kỹ thuật thi công chi tiết</strong> (kết cấu móng cọc, khung cột, dầm sàn, vì kèo mái Nhật) cùng <strong>bộ ảnh phối cảnh 3D sắc nét</strong> được dựng từ mặt bằng, quý khách vui lòng dành 3 phút hoàn tất phiếu khảo sát nhu cầu xây nhà.
            </p>

            <div style={{
              background: 'var(--accent-soft)',
              border: '1px solid var(--accent-soft-line)',
              borderRadius: 8,
              padding: '16px 20px',
              textAlign: 'left',
              marginBottom: 24,
              fontSize: 13.5,
              lineHeight: 1.5
            }}>
              <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: 6 }}>
                🎁 Đặc quyền sau khi gửi phiếu khảo sát:
              </strong>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Mở khóa toàn quyền truy cập bộ hồ sơ mẫu này không giới hạn.</li>
                <li>Xem và tải file PDF kỹ thuật thi công tiêu chuẩn 8.9 MB.</li>
                <li>Xem chi tiết các góc phối cảnh 3D kiến trúc ngoại thất & sân vườn.</li>
                <li>Nhận tư vấn phương án mặt bằng và dự toán miễn phí từ Kỹ sư trưởng.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn"
                style={{ minHeight: 46, fontSize: 15, padding: '0 24px' }}
                onClick={() => navigate('/')}
              >
                📋 Bắt đầu khảo sát nhu cầu ngay
              </button>
              <button
                type="button"
                className="btn ghost"
                style={{ minHeight: 46 }}
                onClick={() => navigate('/admin')}
              >
                🔑 Đăng nhập Quản trị viên (Admin)
              </button>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  // Chế độ chỉnh sửa của Admin
  if (showAdminEditor && isUserAdmin) {
    return (
      <Page>
        <div className="wrap" style={{ paddingTop: 32, paddingBottom: 60 }}>
          <SampleDossierManager onBack={() => setShowAdminEditor(false)} />
        </div>
      </Page>
    );
  }

  const zaloHref = COMPANY.hotlineDigits ? `https://zalo.me/${COMPANY.hotlineDigits}` : undefined;

  return (
    <Page>
      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 60 }}>
        {/* Thanh công cụ quản trị (chỉ hiện khi Admin xem) */}
        {isUserAdmin && (
          <div
            style={{
              background: '#FFF8E1',
              border: '1px solid #FFE082',
              borderRadius: 8,
              padding: '10px 16px',
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10
            }}
          >
            <span style={{ fontSize: 13, color: '#8D6E63', fontWeight: 600 }}>
              🛡️ Chế độ Quản trị viên: Bạn đang xem trước giao diện của khách hàng.
            </span>
            <button
              type="button"
              className="btn sm"
              style={{ fontSize: 13, minHeight: 34 }}
              onClick={() => setShowAdminEditor(true)}
            >
              ⚙️ Chỉnh sửa hồ sơ mẫu này
            </button>
          </div>
        )}

        {/* Header thông tin hồ sơ mẫu */}
        <section className="card" style={{ padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  padding: '3px 8px',
                  borderRadius: 4
                }}>
                  Hồ sơ thiết kế mẫu tiêu chuẩn
                </span>
                <span style={{
                  background: '#E8F5E9',
                  color: '#2E7D32',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 4
                }}>
                  ✅ 35 Bản vẽ kỹ thuật thi công
                </span>
                <span style={{
                  background: '#EDE7F6',
                  color: '#512DA8',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 4
                }}>
                  ✨ Phối cảnh 3D Gemini AI
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(20px, 3.5vw, 28px)', margin: '0 0 6px', color: 'var(--ink)' }}>
                {dossier.title}
              </h1>
              <p style={{ margin: '0 0 12px', fontSize: 15, color: 'var(--accent)', fontWeight: 600 }}>
                {dossier.subtitle}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--muted)' }}>
                <span>👤 <strong>Chủ đầu tư:</strong> {dossier.clientName}</span>
                <span>📍 <strong>Địa điểm:</strong> {dossier.location}</span>
                <span>📐 <strong>Quy mô:</strong> {dossier.scale}</span>
                <span>👷 <strong>Chủ trì:</strong> {dossier.designer}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                href={dossier.pdfUrl}
                download={dossier.pdfFileName}
                className="btn"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <span>⬇️</span>
                <span>Tải trọn bộ PDF ({dossier.pdfFileSize})</span>
              </a>
              {zaloHref && (
                <a
                  href={zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <span>💬</span>
                  <span>Tư vấn mẫu này qua Zalo</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Thanh chọn Tab */}
        <div style={{
          display: 'flex',
          gap: 8,
          borderBottom: '2px solid var(--line)',
          marginBottom: 20,
          overflowX: 'auto',
          paddingBottom: 2
        }}>
          <button
            type="button"
            className={'btn ' + (tab === 'perspectives' ? '' : 'ghost')}
            style={{ borderRadius: '8px 8px 0 0', minHeight: 42, fontSize: 14 }}
            onClick={() => setTab('perspectives')}
          >
            🏛️ Phối cảnh 3D AI từ Mặt bằng ({dossier.perspectives.length})
          </button>
          <button
            type="button"
            className={'btn ' + (tab === 'pdf' ? '' : 'ghost')}
            style={{ borderRadius: '8px 8px 0 0', minHeight: 42, fontSize: 14 }}
            onClick={() => setTab('pdf')}
          >
            📐 Trình xem Bản vẽ PDF (35 trang)
          </button>
          <button
            type="button"
            className={'btn ' + (tab === 'specs' ? '' : 'ghost')}
            style={{ borderRadius: '8px 8px 0 0', minHeight: 42, fontSize: 14 }}
            onClick={() => setTab('specs')}
          >
            📋 Thông số kết cấu & Danh mục bản vẽ
          </button>
        </div>

        {/* TAB 1: PHỐI CẢNH 3D GEMINI AI */}
        {tab === 'perspectives' && (
          <div className="stack" style={{ gap: 20 }}>
            {activePerspective && (
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', maxHeight: 620, background: '#1B1F1D', textAlign: 'center' }}>
                  <img
                    src={activePerspective.url}
                    alt={activePerspective.title}
                    style={{
                      width: '100%',
                      maxHeight: 620,
                      objectFit: 'contain',
                      display: 'block',
                      cursor: 'zoom-in'
                    }}
                    onClick={() => setLightboxImg(activePerspective)}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(6px)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    🏷️ {activePerspective.tag}
                  </div>
                  <button
                    type="button"
                    style={{
                      position: 'absolute',
                      bottom: 14,
                      right: 14,
                      background: 'rgba(0,0,0,0.7)',
                      backdropFilter: 'blur(6px)',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: 6,
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                    onClick={() => setLightboxImg(activePerspective)}
                  >
                    🔍 Phóng to ảnh
                  </button>
                </div>

                <div style={{ padding: '16px 20px', borderTop: '1px solid var(--line)' }}>
                  <h3 style={{ margin: '0 0 6px', fontSize: 18, color: 'var(--ink)' }}>
                    {activePerspective.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
                    {activePerspective.description}
                  </p>
                </div>
              </div>
            )}

            {/* Danh sách thumbnails phối cảnh */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 14
            }}>
              {dossier.perspectives.map((p, idx) => {
                const isSelected = idx === activePIndex;
                return (
                  <button
                    key={p.id || idx}
                    type="button"
                    style={{
                      background: 'var(--card-bg)',
                      border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--line)'}`,
                      borderRadius: 10,
                      overflow: 'hidden',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(27,77,62,0.15)' : 'none'
                    }}
                    onClick={() => setActivePIndex(idx)}
                  >
                    <div style={{ height: 140, background: '#e0e0e0', overflow: 'hidden' }}>
                      <img
                        src={p.url}
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '10px 12px' }}>
                      <span style={{
                        display: 'inline-block',
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--accent)',
                        marginBottom: 4
                      }}>
                        {p.tag}
                      </span>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--ink)',
                        lineHeight: 1.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {p.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TRÌNH XEM BẢN VẼ PDF */}
        {tab === 'pdf' && (
          <div className="stack" style={{ gap: 16 }}>
            <div className="card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ fontSize: 14 }}>
                📄 Đang mở: <strong>{dossier.pdfFileName}</strong> ({dossier.pdfPageCount} trang bản vẽ kết cấu chi tiết)
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <a
                  href={dossier.pdfUrl}
                  download={dossier.pdfFileName}
                  className="btn sm"
                  style={{ textDecoration: 'none' }}
                >
                  ⬇️ Tải file về máy ({dossier.pdfFileSize})
                </a>
                <a
                  href={dossier.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost sm"
                  style={{ textDecoration: 'none' }}
                >
                  ↗ Mở tab riêng
                </a>
              </div>
            </div>

            {/* Trình xem PDF nhúng trực tiếp */}
            <div className="card" style={{ padding: 0, height: '78vh', minHeight: 600, overflow: 'hidden' }}>
              <iframe
                src={`${dossier.pdfUrl}#page=${pdfPage}&toolbar=1&navpanes=1`}
                title="Bản vẽ kỹ thuật thi công PDF"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>

            {/* Danh mục lật trang nhanh theo bản vẽ */}
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ fontSize: 16, margin: '0 0 12px' }}>📑 Lật nhanh đến trang bản vẽ quan trọng:</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {dossier.drawingSheets.slice(0, 12).map((s) => (
                  <button
                    key={s.sheetNo}
                    type="button"
                    className="btn ghost sm"
                    style={{ fontSize: 12.5 }}
                    onClick={() => {
                      setPdfPage(s.page);
                      // Force update iframe src with anchor
                      const iframe = document.querySelector('iframe');
                      if (iframe) iframe.src = `${dossier.pdfUrl}#page=${s.page}`;
                    }}
                  >
                    <strong>{s.sheetNo}</strong>: {s.title.split('—')[0].slice(0, 24)} (Trang {s.page})
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THÔNG SỐ KẾT CẤU & DANH MỤC */}
        {tab === 'specs' && (
          <div className="stack" style={{ gap: 20 }}>
            {/* Tóm tắt */}
            <div className="card">
              <h3 style={{ fontSize: 18, margin: '0 0 10px', color: 'var(--ink)' }}>
                📖 Tổng quan giải pháp kỹ thuật
              </h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted)' }}>
                {dossier.summary}
              </p>
            </div>

            {/* Bảng thông số */}
            <div className="card">
              <h3 style={{ fontSize: 18, margin: '0 0 14px', color: 'var(--ink)' }}>
                ⚙️ Các chỉ tiêu kỹ thuật chính của công trình
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                {dossier.structureSpecs.map((sp) => (
                  <div
                    key={sp.label}
                    style={{
                      background: 'var(--accent-soft)',
                      border: '1px solid var(--accent-soft-line)',
                      borderRadius: 8,
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 4 }}>
                      {sp.label}
                    </div>
                    <div style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.4 }}>
                      {sp.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Danh mục 35 bản vẽ */}
            <div className="card">
              <h3 style={{ fontSize: 18, margin: '0 0 14px', color: 'var(--ink)' }}>
                📑 Danh mục 35 bản vẽ chi tiết trong hồ sơ
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="tbl" style={{ width: '100%', fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ width: 100 }}>Ký hiệu</th>
                      <th>Tên bản vẽ chi tiết</th>
                      <th style={{ width: 160 }}>Hạng mục</th>
                      <th style={{ width: 90, textAlign: 'center' }}>Trang</th>
                      <th style={{ width: 100, textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dossier.drawingSheets.map((s) => (
                      <tr key={s.sheetNo}>
                        <td style={{ fontWeight: 600, color: 'var(--accent)' }}>{s.sheetNo}</td>
                        <td>{s.title}</td>
                        <td><span className="badge">{s.category}</span></td>
                        <td style={{ textAlign: 'center' }}>Trang {s.page}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="link-btn"
                            style={{ fontSize: 12 }}
                            onClick={() => {
                              setPdfPage(s.page);
                              setTab('pdf');
                            }}
                          >
                            Xem trang →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Khối kêu gọi hành động (CTA) */}
        <section
          className="card"
          style={{
            marginTop: 32,
            background: 'linear-gradient(135deg, #1B4D3E 0%, #0F2D24 100%)',
            color: '#fff',
            padding: '30px 24px',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: 'clamp(18px, 3vw, 24px)', margin: '0 0 10px', color: '#fff' }}>
            Anh/Chị muốn sở hữu bộ hồ sơ thiết kế chi tiết & tối ưu chi phí như công trình này?
          </h2>
          <p style={{ margin: '0 auto 20px', maxWidth: 640, fontSize: 14.5, opacity: 0.9, lineHeight: 1.5 }}>
            Đội ngũ Kỹ sư & Kiến trúc sư DS DESIGN sẽ liên hệ tư vấn phương án mặt bằng, phong thủy và bóc tách dự toán sơ bộ sát với ngân sách thực tế của gia đình anh/chị.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {zaloHref && (
              <a
                href={zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  background: '#fff',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  minHeight: 44,
                  padding: '0 22px'
                }}
              >
                💬 Nhắn Zalo Kỹ sư trưởng ({COMPANY.hotline})
              </a>
            )}
            <button
              type="button"
              className="btn ghost"
              style={{
                borderColor: 'rgba(255,255,255,0.4)',
                color: '#fff',
                minHeight: 44
              }}
              onClick={() => navigate('/')}
            >
              🔄 Khảo sát thêm một phương án khác
            </button>
          </div>
        </section>

        {/* Modal phóng to ảnh (Lightbox) */}
        {lightboxImg && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.9)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20
            }}
            onClick={() => setLightboxImg(null)}
          >
            <div style={{ maxWidth: 1100, width: '100%', maxHeight: '90vh', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <img
                src={lightboxImg.url}
                alt={lightboxImg.title}
                style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }}
              />
              <div style={{ color: '#fff', marginTop: 12, textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: 16 }}>{lightboxImg.title}</h4>
                <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>{lightboxImg.description}</p>
              </div>
              <button
                type="button"
                style={{
                  position: 'absolute',
                  top: -12,
                  right: -12,
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  fontSize: 18,
                  cursor: 'pointer',
                  fontWeight: 700
                }}
                onClick={() => setLightboxImg(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
