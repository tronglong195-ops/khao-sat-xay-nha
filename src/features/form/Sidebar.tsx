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

      {/* BẢNG LƯU Ý KỸ THUẬT: 100% NGẪU NHIÊN THEO BƯỚC TỪ KHO 220 LƯU Ý */}
      <section className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h2 className="card-h">Lưu ý kỹ thuật</h2>
          <button
            type="button"
            className="link-btn"
            style={{ fontSize: 12, padding: 0, minHeight: 0, color: 'var(--accent)' }}
            onClick={rollNewTips}
            title="Bấm để đổi 2 lưu ý ngẫu nhiên khác"
          >
            🔄 Đổi ngẫu nhiên
          </button>
        </div>

        {/* 1. Cảnh báo nguy cơ nứt lún thực sự theo điều kiện form (nếu có) */}
        {notes.filter((t) => t.bad).map((t) => (
          <Note key={t.t} bad={t.bad}>{t.t}</Note>
        ))}

        {/* 2. Các thẻ lưu ý kỹ thuật CHẠY NGẪU NHIÊN (dùng thẻ Note màu xanh chuẩn như ảnh mẫu) */}
        {randomTips.map((tip) => (
          <Note key={tip.id} bad={tip.tag === 'Quan trọng'}>
            <strong>{tip.title}:</strong> {tip.content}
          </Note>
        ))}

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
