import { useEffect, useState } from 'react';
import { TipsLibraryModal } from '../../components/TipsLibraryModal';
import { Note, Row, Tag } from '../../components/ui';
import { getRandomTipsForStep, type ConstructionTip } from '../../domain/constructionTips';
import type { Estimate } from '../../domain/estimate';
import type { FengShui } from '../../domain/fengshui';
import { PROCESS } from '../../domain/options';
import type { TechNote } from '../../domain/techNotes';

interface Props {
  fs: FengShui | null;
  couple: string;
  facing: { text: string; bad: boolean } | null;
  est: Estimate;
  notes: TechNote[];
  currentStep?: number;
}

export function Sidebar({ fs, couple, facing, est, notes, currentStep = 0 }: Props) {
  const [randomTips, setRandomTips] = useState<ConstructionTip[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Đổi các lưu ý kỹ thuật ngẫu nhiên khi người dùng chuyển bước
  useEffect(() => {
    setRandomTips(getRandomTipsForStep(currentStep, 2));
  }, [currentStep]);

  const rollNewTips = () => {
    setRandomTips(getRandomTipsForStep(currentStep, 2, randomTips.map((t) => t.id)));
  };

  return (
    <aside className="side" aria-label="Kết quả sơ bộ">
      <section className="card">
        <h2 className="card-h">Phong thủy gia chủ</h2>
        {!fs ? (
          <p className="hint">Nhập năm sinh âm lịch ở bước 1 để xem mệnh, cung phi, hướng hợp và tuổi làm nhà.</p>
        ) : (
          <>
            <div>
              <Row k="Tuổi">{fs.yearText}</Row>
              <Row k="Mệnh (nạp âm)">{fs.napam}</Row>
              <Row k="Cung phi">{fs.cungText}</Row>
              <Row k="Nhóm">{fs.group}</Row>
            </div>
            <div className="dirs">
              {fs.goodDirs.map((g) => (
                <div className="dir-c" key={g.star}><div className="dir-s">{g.star}</div><div className="dir-d">{g.dir}</div></div>
              ))}
            </div>
            {facing && <Note bad={facing.bad}>{facing.text}</Note>}
            <div>
              <Row k={'Tuổi mụ năm ' + fs.by + ' (' + fs.byCanChi + ')'}>{fs.mu}</Row>
              <Row k="Kim Lâu"><Tag bad={fs.klBad}>{fs.klText}</Tag></Row>
              <Row k="Hoang Ốc"><Tag bad={fs.hoBad}>{fs.hoText}</Tag></Row>
              <Row k="Tam Tai"><Tag bad={fs.ttBad}>{fs.ttText}</Tag></Row>
            </div>
            <Note bad={fs.verdictBad}>{fs.verdict}</Note>
            {couple && <p className="hint">{couple}</p>}
          </>
        )}
      </section>

      <section className="card">
        <h2 className="card-h">Dự toán sơ bộ</h2>
        {est.hasLot ? (
          <>
            <div className="stack" style={{ gap: 4 }}>
              <span className="big">{est.totalText}</span>
              <span className="hint">{est.areaText} sàn tính tiền × {est.priceText}</span>
            </div>
            <Note bad={est.budgetBad}>{est.budgetText}</Note>

            {est.breakdown && est.breakdown.length > 0 && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                  Phân bổ chi phí dự tính:
                </p>
                {/* Thanh biểu đồ tỷ lệ phân bổ */}
                <div style={{
                  display: 'flex',
                  height: 10,
                  borderRadius: 5,
                  overflow: 'hidden',
                  background: 'var(--line)',
                  marginBottom: 10
                }}>
                  {est.breakdown.map((item) => (
                    <div
                      key={item.name}
                      title={`${item.name}: ${item.pct}%`}
                      style={{
                        width: `${item.pct}%`,
                        background: item.color
                      }}
                    />
                  ))}
                </div>
                {/* Danh sách từng phần */}
                <div className="stack" style={{ gap: 8 }}>
                  {est.breakdown.map((item) => (
                    <div key={item.name} style={{ fontSize: 12, lineHeight: 1.35 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink)' }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                          {item.name} ({item.pct}%)
                        </span>
                        <strong style={{ color: 'var(--ink)', marginLeft: 8 }}>{item.tyText}</strong>
                      </div>
                      <p style={{ margin: '2px 0 0 14px', fontSize: 11, color: 'var(--muted)' }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="hint">Nhập kích thước lô đất ở bước 2 để ước tính chi phí.</p>
        )}
        <p className="hint" style={{ fontSize: 12 }}>Đơn giá tham khảo thị trường, sẽ được chốt sau khi bóc khối lượng từ hồ sơ thiết kế.</p>
      </section>

      {/* BẢNG LƯU Ý KỸ THUẬT VỚI 200+ MẸO THỰC CHIẾN CHẠY NGẪU NHIÊN THEO BƯỚC */}
      <section className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="card-h">Lưu ý kỹ thuật</h2>
          <button
            type="button"
            className="link-btn"
            style={{ fontSize: 12, padding: 0, minHeight: 0, color: 'var(--accent)' }}
            onClick={rollNewTips}
            title="Đổi lưu ý ngẫu nhiên khác cho bước này"
          >
            🔄 Đổi lưu ý
          </button>
        </div>

        {/* 1. Các cảnh báo nguy cơ thực sự (bad: true) hoặc lưu ý riêng khi đang ở Bước 5 kết cấu điện nước */}
        {notes.filter((t) => t.bad || currentStep === 4).map((t) => (
          <Note key={t.t} bad={t.bad}>{t.t}</Note>
        ))}

        {/* 2. Các mẹo kỹ thuật xây nhà thực chiến ngẫu nhiên theo từng bước */}
        {randomTips.length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              💡 Mẹo thi công Bước {currentStep + 1}:
            </span>
            {randomTips.map((tip) => (
              <div
                key={tip.id}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: tip.tag === 'Quan trọng' ? '#FDF8F5' : 'var(--accent-soft)',
                  border: tip.tag === 'Quan trọng' ? '1px solid #E8B99D' : '1px solid var(--accent-soft-line)',
                  fontSize: 12.5,
                  lineHeight: 1.45,
                  color: 'var(--ink)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <strong style={{ fontSize: 12.5, color: tip.tag === 'Quan trọng' ? '#8A3F0C' : '#123B31' }}>{tip.title}</strong>
                  {tip.tag && (
                    <span style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: tip.tag === 'Quan trọng' ? '#8A3F0C' : 'var(--accent)',
                      background: '#FFF',
                      padding: '1px 6px',
                      borderRadius: 4
                    }}>
                      {tip.tag}
                    </span>
                  )}
                </div>
                <div>{tip.content}</div>
              </div>
            ))}
          </div>
        )}

        {/* Nút mở thư viện cẩm nang đầy đủ 220 lưu ý kỹ thuật */}
        <button
          type="button"
          className="btn ghost sm"
          style={{ width: '100%', fontSize: 12, marginTop: 4, minHeight: 34 }}
          onClick={() => setShowModal(true)}
        >
          📖 Xem cẩm nang 220 lưu ý kỹ thuật
        </button>

        <TipsLibraryModal isOpen={showModal} onClose={() => setShowModal(false)} currentStep={currentStep} />
      </section>

      <section className="card">
        <h2 className="card-h">Sau khi gửi thông tin</h2>
        {PROCESS.map((t, i) => (
          <div className="proc" key={t}><span className="proc-n">{i + 1}</span><span>{t}</span></div>
        ))}
      </section>
    </aside>
  );
}
