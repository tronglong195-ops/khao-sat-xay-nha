import { Timestamp } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Note, Row, Tag } from '../../components/ui';
import { buildDocument } from '../../domain/document';
import { LEAD_STATUSES, STATUS_LABEL } from '../../domain/options';
import type { LeadStatus } from '../../domain/types';
import { listLeads, updateLeadNote, updateLeadStatus, type Lead } from '../../services/leads';
import { downloadBlob } from '../../utils/download';
import { DocPreview } from '../form/DocPreview';
import { makeDocxBlob } from '../form/submit';
import { fmtDate, leadsToCsv } from './csv';

const PAGE = 25;
const digits = (s: string) => s.replace(/\D/g, '');

function rebuildDoc(l: Lead) {
  return buildDocument(l.form, { now: l.createdAt?.toDate() ?? new Date(), fileNames: l.fileNames ?? [], code: l.code });
}

export function LeadsView({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [loadErr, setLoadErr] = useState('');
  const [filter, setFilter] = useState<LeadStatus | ''>('');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoadErr('');
    try {
      setLeads(await listLeads());
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : String(e));
    }
  }, []);
  useEffect(() => { void reload(); }, [reload]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    (leads ?? []).forEach((l) => { c[l.status] = (c[l.status] ?? 0) + 1; });
    return c;
  }, [leads]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const sd = digits(s);
    return (leads ?? []).filter((l) => (!filter || l.status === filter) &&
      (!s || l.name.toLowerCase().includes(s) || l.code.toLowerCase().includes(s) || (sd.length >= 3 && digits(l.phone).includes(sd))));
  }, [leads, filter, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const shown = filtered.slice(page * PAGE, page * PAGE + PAGE);
  const open = leads?.find((l) => l.id === openId) ?? null;

  const patchLocal = (id: string, patch: Partial<Lead>) => setLeads((ls) => (ls ?? []).map((l) => (l.id === id ? { ...l, ...patch } : l)));

  if (open) {
    return <LeadDetail lead={open} email={email} onBack={() => setOpenId(null)} onPatch={(p) => patchLocal(open.id, p)} />;
  }

  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="adm-bar">
        <h1 style={{ fontSize: 26 }}>Hồ sơ khách hàng</h1>
        <div className="nav-r">
          <button type="button" className="btn ghost sm" onClick={() => void reload()}>Tải lại</button>
          <button type="button" className="btn ghost sm" disabled={!filtered.length}
            onClick={() => downloadBlob(new Blob([leadsToCsv(filtered)], { type: 'text/csv;charset=utf-8' }), 'ho-so-khach-hang.csv')}>Xuất CSV</button>
          <button type="button" className="btn ghost sm" onClick={onSignOut}>Đăng xuất</button>
        </div>
      </div>
      <p className="hint">Đăng nhập: {email}</p>

      <div className="counts" role="group" aria-label="Lọc theo trạng thái">
        <button type="button" className={'count' + (filter === '' ? ' on' : '')} aria-pressed={filter === ''} onClick={() => { setFilter(''); setPage(0); }}>
          <b>{leads?.length ?? 0}</b><span>Tất cả</span>
        </button>
        {LEAD_STATUSES.map(([v, label]) => (
          <button key={v} type="button" className={'count' + (filter === v ? ' on' : '')} aria-pressed={filter === v} onClick={() => { setFilter(v); setPage(0); }}>
            <b>{counts[v] ?? 0}</b><span>{label}</span>
          </button>
        ))}
      </div>

      <div className="adm-filters">
        <input className="in" type="search" placeholder="Tìm theo tên, số điện thoại, mã hồ sơ" aria-label="Tìm hồ sơ" value={q}
          onChange={(e) => { setQ(e.target.value); setPage(0); }} />
      </div>

      {loadErr && <Note bad role="alert">Không tải được danh sách: {loadErr}</Note>}
      {!leads && !loadErr && <p className="hint">Đang tải…</p>}
      {leads && !filtered.length && <p className="hint">Chưa có hồ sơ phù hợp.</p>}

      {shown.length > 0 && (
        <>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr><th>Ngày gửi</th><th>Mã</th><th>Tên</th><th>SĐT</th><th>Kiểu nhà</th><th>Tầng</th><th>Ngân sách</th><th>Dự toán</th><th>Trạng thái</th><th>Thông báo</th></tr>
              </thead>
              <tbody>
                {shown.map((l) => (
                  <tr key={l.id} onClick={() => setOpenId(l.id)}>
                    <td className="nw">{fmtDate(l)}</td>
                    <td className="nw"><button type="button" className="link-btn" style={{ minHeight: 0, color: 'var(--accent)' }} onClick={() => setOpenId(l.id)}>{l.code}</button></td>
                    <td>{l.name}</td>
                    <td className="nw"><a href={'tel:' + l.phone} onClick={(e) => e.stopPropagation()}>{l.phone}</a></td>
                    <td>{l.type}</td>
                    <td>{l.floors}</td>
                    <td className="nw">{l.budget}</td>
                    <td className="nw">{l.estimateText || '—'}</td>
                    <td className="nw">{STATUS_LABEL[l.status] ?? l.status}</td>
                    <td className="nw"><Tag bad={l.notify?.status !== 'sent'}>{l.notify?.status === 'sent' ? 'Email OK' : 'Lỗi'}</Tag></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lead-cards">
            {shown.map((l) => (
              <button key={l.id} type="button" className="lead-card" onClick={() => setOpenId(l.id)}>
                <span className="lead-card-t"><b>{l.name}</b><span className="hint">{fmtDate(l)}</span></span>
                <span className="hint">{l.code} · {l.phone}</span>
                <span>{l.type} {l.floors} tầng · {l.budget}{l.estimateText ? ' · ' + l.estimateText : ''}</span>
                <span className="chips"><Tag>{STATUS_LABEL[l.status] ?? l.status}</Tag><Tag bad={l.notify?.status !== 'sent'}>{l.notify?.status === 'sent' ? 'Email OK' : 'Lỗi email'}</Tag></span>
              </button>
            ))}
          </div>
          {pages > 1 && (
            <div className="pager">
              <button type="button" className="btn ghost sm" disabled={page === 0} onClick={() => setPage(page - 1)}>← Trước</button>
              <span>Trang {page + 1}/{pages}</span>
              <button type="button" className="btn ghost sm" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>Sau →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function LeadDetail({ lead, email, onBack, onPatch }: { lead: Lead; email: string; onBack: () => void; onPatch: (p: Partial<Lead>) => void }) {
  const [note, setNote] = useState(lead.adminNote ?? '');
  const [msg, setMsg] = useState<{ t: string; bad?: boolean } | null>(null);
  const doc = useMemo(() => rebuildDoc(lead), [lead]);
  const phone = digits(lead.phone);

  const changeStatus = async (status: LeadStatus) => {
    try {
      await updateLeadStatus(lead.id, status, email);
      onPatch({ status, statusLog: [...(lead.statusLog ?? []), { status, at: Timestamp.now(), by: email }] });
      setMsg({ t: 'Đã đổi trạng thái: ' + STATUS_LABEL[status] });
    } catch (e) {
      setMsg({ t: 'Lỗi: ' + (e as Error).message, bad: true });
    }
  };
  const saveNote = async () => {
    try {
      await updateLeadNote(lead.id, note);
      onPatch({ adminNote: note });
      setMsg({ t: 'Đã lưu ghi chú nội bộ.' });
    } catch (e) {
      setMsg({ t: 'Lỗi: ' + (e as Error).message, bad: true });
    }
  };

  return (
    <div className="layout" style={{ padding: 0 }}>
      <div className="card main-card" style={{ gap: 20 }}>
        <div className="adm-bar">
          <button type="button" className="btn ghost sm" onClick={onBack}>← Danh sách</button>
          <Tag>{lead.code}</Tag>
        </div>
        <h1 style={{ fontSize: 24 }}>{lead.name}</h1>
        <div className="detail-actions">
          <a className="btn sm" href={'tel:' + lead.phone}>Gọi {lead.phone}</a>
          <a className="btn ghost sm" href={'https://zalo.me/' + phone} target="_blank" rel="noopener noreferrer">Zalo</a>
          {lead.email && <a className="btn ghost sm" href={'mailto:' + lead.email}>Email</a>}
          <button type="button" className="btn ghost sm" onClick={async () => downloadBlob(await makeDocxBlob(doc, lead.name), doc.fileName)}>Tải lại Word</button>
          {lead.notify?.folderUrl && <a className="btn ghost sm" href={lead.notify.folderUrl} target="_blank" rel="noopener noreferrer">Thư mục Drive</a>}
          {lead.notify?.docUrl && <a className="btn ghost sm" href={lead.notify.docUrl} target="_blank" rel="noopener noreferrer">File Word trên Drive</a>}
        </div>
        <DocPreview doc={doc} ownerName={lead.name} />
      </div>
      <aside className="side">
        <section className="card">
          <h2 className="card-h">Tóm tắt</h2>
          <div>
            <Row k="Ngày gửi">{fmtDate(lead)}</Row>
            <Row k="Liên hệ qua">{lead.contact} – {lead.time.toLowerCase()}</Row>
            <Row k="Dự toán">{lead.estimateText || '—'}</Row>
            <Row k="Thông báo email">{lead.notify?.status === 'sent' ? <Tag>Đã gửi</Tag> : <Tag bad>Lỗi</Tag>}</Row>
          </div>
          {lead.notify?.error && <Note bad>{lead.notify.error}</Note>}
          {lead.fengShui && <Note bad={!lead.fengShui.verdict.includes('đẹp tuổi')}>{lead.fengShui.verdict}</Note>}
        </section>
        <section className="card">
          <h2 className="card-h">Trạng thái</h2>
          <label className="fld">
            <span className="lb">Trạng thái hồ sơ</span>
            <select className="in" value={lead.status} onChange={(e) => void changeStatus(e.target.value as LeadStatus)}>
              {LEAD_STATUSES.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
            </select>
          </label>
          {(lead.statusLog ?? []).length > 0 && (
            <ul className="log" aria-label="Lịch sử trạng thái">
              {[...(lead.statusLog ?? [])].reverse().map((s, i) => (
                <li key={i}>{fmtDate({ createdAt: s.at })} · {STATUS_LABEL[s.status] ?? s.status} · {s.by}</li>
              ))}
            </ul>
          )}
        </section>
        <section className="card">
          <h2 className="card-h">Ghi chú nội bộ</h2>
          <textarea className="in" value={note} onChange={(e) => setNote(e.target.value)} aria-label="Ghi chú nội bộ" placeholder="Chỉ quản trị viên thấy" />
          <button type="button" className="btn sm" onClick={() => void saveNote()} disabled={note === (lead.adminNote ?? '')}>Lưu ghi chú</button>
          {msg && <Note bad={msg.bad} role="status">{msg.t}</Note>}
        </section>
      </aside>
    </div>
  );
}
