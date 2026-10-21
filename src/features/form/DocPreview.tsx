import { COMPANY } from '../../config/company';
import type { FormDocument } from '../../domain/types';

/** Trang giấy A4 giả lập — dùng chung cho màn xem trước và trang quản trị. */
export function DocPreview({ doc, ownerName }: { doc: FormDocument; ownerName: string }) {
  return (
    <div className="paper-bg">
      <article className="paper" aria-label="Xem trước phiếu Word">
        <div className="paper-hd">
          <div>
            <span className="paper-co">{COMPANY.name}</span>
            <span className="paper-sm">{COMPANY.tagline}</span>
            <span className="paper-sm">Hotline: {COMPANY.hotline}</span>
          </div>
          <div className="paper-r">
            <span>Mã hồ sơ: <strong>{doc.code}</strong></span>
            <i>{doc.dateLine}</i>
          </div>
        </div>
        <h1>PHIẾU THÔNG TIN THIẾT KẾ NHÀ</h1>
        <p className="paper-sub">(Gia chủ cung cấp làm cơ sở lập phương án thiết kế – thi công)</p>
        {doc.sections.map((sec) => (
          <div className="paper-sec" key={sec.title}>
            <h2>{sec.title}</h2>
            <table>
              <tbody>
                {sec.rows.map((r, i) => <tr key={r.k + i}><td>{r.k}</td><td>{r.v}</td></tr>)}
              </tbody>
            </table>
          </div>
        ))}
        <div className="paper-sign">
          <div><strong>CHỦ NHÀ</strong><i>(Ký, ghi rõ họ tên)</i><span className="paper-owner">{ownerName}</span></div>
          <div><strong>ĐẠI DIỆN {COMPANY.name}</strong><i>(Ký, ghi rõ họ tên)</i></div>
        </div>
      </article>
    </div>
  );
}
