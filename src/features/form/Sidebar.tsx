import { Note, Row, Tag } from '../../components/ui';
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
}

export function Sidebar({ fs, couple, facing, est, notes }: Props) {
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
          </>
        ) : (
          <p className="hint">Nhập kích thước lô đất ở bước 2 để ước tính chi phí.</p>
        )}
        <p className="hint" style={{ fontSize: 12 }}>Đơn giá tham khảo thị trường, sẽ được chốt sau khi bóc khối lượng từ hồ sơ thiết kế.</p>
      </section>

      <section className="card">
        <h2 className="card-h">Lưu ý kỹ thuật</h2>
        {notes.map((t) => <Note key={t.t} bad={t.bad}>{t.t}</Note>)}
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
