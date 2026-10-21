import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Page } from '../../components/Layout';
import { QRCodeView } from '../../components/QRCodeView';
import { Note, Tag } from '../../components/ui';
import { COMPANY } from '../../config/company';
import { buildDocument } from '../../domain/document';
import { calcEstimate } from '../../domain/estimate';
import { calcFS, coupleText, facingNote } from '../../domain/fengshui';
import { DEFAULT_FORM, STEP_LABELS } from '../../domain/options';
import { techNotes } from '../../domain/techNotes';
import type { FormState } from '../../domain/types';
import { validateForm, type ValidationError } from '../../domain/validate';
import { downloadBlob } from '../../utils/download';
import { DocPreview } from './DocPreview';
import { clearDraft, loadDraft, saveDraft } from './draft';
import { FormContext } from './formContext';
import { Sidebar } from './Sidebar';
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7 } from './Steps';
import { makeDocxBlob, submitLead, type SubmitResult } from './submit';

type View = 'form' | 'preview' | 'done';
const STEP_COMPONENTS = [Step1, Step2, Step3, Step4, Step5, Step6];

export default function FormPage() {
  const initial = useMemo(loadDraft, []);
  const [form, setForm] = useState<FormState>(initial.form);
  const [step, setStep] = useState(initial.step);
  const [view, setView] = useState<View>('form');
  const [files, setFiles] = useState<File[]>([]);
  const [honey, setHoney] = useState('');
  const [err, setErr] = useState<ValidationError | null>(null);
  const [docDate, setDocDate] = useState(() => new Date());
  const [busy, setBusy] = useState<'' | 'word' | 'send'>('');
  const [notice, setNotice] = useState('');
  const [sendErr, setSendErr] = useState('');
  const [result, setResult] = useState<SubmitResult | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  const lastPos = useRef<string | null>(null);

  const set = useCallback((patch: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...patch }));
    setErr(null);
  }, []);
  const ctx = useMemo(() => ({ f: form, set }), [form, set]);

  // Lưu nháp (debounce) — không lưu tệp đính kèm
  useEffect(() => {
    if (view === 'done') return;
    const t = setTimeout(() => saveDraft({ form, step }), 400);
    return () => clearTimeout(t);
  }, [form, step, view]);

  // Đổi bước / màn → cuộn lên đầu thẻ form (không cuộn lúc mới mở trang)
  useEffect(() => {
    const key = view + step;
    if (lastPos.current !== null && lastPos.current !== key) cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    lastPos.current = key;
  }, [step, view]);

  const fs = useMemo(() => calcFS(form.year, form.gender, form.buildYear), [form.year, form.gender, form.buildYear]);
  const fs2 = useMemo(() => calcFS(form.year2, form.gender2, form.buildYear), [form.year2, form.gender2, form.buildYear]);
  const est = useMemo(() => calcEstimate(form), [form]);
  const notes = useMemo(() => techNotes(form), [form]);
  const doc = useMemo(
    () => (view === 'form' ? null : buildDocument(form, { now: docDate, fileNames: files.map((f) => f.name), code: result?.code })),
    [view, form, docDate, files, result]
  );

  const goStep = (i: number) => {
    setStep(i);
    setErr(null);
    setView('form');
    setSendErr('');
  };

  const openPreview = () => {
    const e = validateForm(form);
    if (e) {
      setErr(e);
      return;
    }
    setDocDate(new Date());
    setNotice('');
    setSendErr('');
    setView('preview');
  };

  const downloadWord = async () => {
    if (!doc) return;
    setBusy('word');
    setNotice('');
    try {
      downloadBlob(await makeDocxBlob(doc, form.name), doc.fileName);
    } catch {
      setNotice('Không tạo được file Word trên trình duyệt này. Anh/chị vẫn có thể bấm “Xác nhận & gửi”.');
    } finally {
      setBusy('');
    }
  };

  const submit = async () => {
    if (!doc || busy) return;
    if (honey) {
      // bot điền ô ẩn → giả vờ thành công, không gửi
      setResult({ ok: true, code: doc.code, notifyOk: true, savedOk: true });
      setView('done');
      return;
    }
    setBusy('send');
    setSendErr('');
    try {
      const r = await submitLead(form, doc, files);
      if (r.ok) {
        setResult(r);
        clearDraft();
        setView('done');
      } else {
        setSendErr(r.error ?? 'Không gửi được.');
      }
    } catch (e) {
      setSendErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy('');
    }
  };

  const resetDraft = () => {
    if (!window.confirm('Xóa toàn bộ thông tin đã nhập và điền lại từ đầu?')) return;
    clearDraft();
    setForm({ ...DEFAULT_FORM });
    setFiles([]);
    goStep(0);
  };

  const StepView = step < 6 ? STEP_COMPONENTS[step] : null;
  const zalo = COMPANY.hotlineDigits;

  return (
    <Page>
      <section className="wrap hero">
        <p className="eyebrow">Phiếu thông tin thiết kế nhà</p>
        <h1 className="hero-h">Kể cho chúng tôi về ngôi nhà anh/chị mong muốn</h1>
        <p className="hero-p">7 bước, khoảng 10 phút. Câu nào chưa rõ cứ để mặc định hoặc chọn “Kỹ sư đề xuất”. Thông tin này giúp kỹ sư xem tuổi làm nhà, lên mặt bằng công năng, chọn phương án kết cấu – điện nước và lập dự toán sát thực tế trước buổi khảo sát.</p>
      </section>

      <nav className="wrap steps-nav" aria-label="Các bước khảo sát">
        <ol className="steps">
          {STEP_LABELS.map((label, i) => {
            const on = view !== 'done' && i === step;
            return (
              <li key={label}>
                <button type="button" className={'stp' + (on ? ' on' : '') + (i < step ? ' done' : '')} aria-current={on ? 'step' : undefined} onClick={() => goStep(i)}>
                  <span className="n">{i + 1}</span><span>{label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="wrap layout">
        <main ref={cardRef} className="card main-card">
          <FormContext.Provider value={ctx}>
            {view === 'done' && result && (
              <div className="sent" role="status">
                <Tag>Đã gửi thành công</Tag>
                <h2>Cảm ơn anh/chị {form.name}!</h2>
                <p>
                  Mã hồ sơ của anh/chị là <strong>{result.code}</strong>. Kỹ sư phụ trách sẽ liên hệ qua <strong>{form.contact}</strong> ({form.time.toLowerCase()}) để trao đổi phương án và hẹn lịch khảo sát hiện trạng lô đất.
                  {result.notifyOk
                    ? ' Phiếu thông tin (file Word) đã được gửi tới kỹ sư' + (form.email ? ', bản sao gửi về ' + form.email : '') + '.'
                    : ' Hồ sơ đã được lưu, kỹ sư sẽ xem trên hệ thống quản lý.'}
                </p>

                {/* Khối chia sẻ và mã QR hồ sơ */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 24,
                  flexWrap: 'wrap',
                  padding: '16px',
                  background: '#FAF9F5',
                  borderRadius: 14,
                  border: '1px solid var(--line)',
                  margin: '16px 0'
                }}>
                  <QRCodeView value={window.location.origin + window.location.pathname + '#/?code=' + result.code} size={140} />
                  <div style={{ maxWidth: 360, textAlign: 'left' }}>
                    <h3 style={{ fontSize: 16, margin: '0 0 6px', color: 'var(--ink)' }}>
                      Lưu và chia sẻ hồ sơ khảo sát
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
                      Quét mã QR trên điện thoại để mở lại thông tin bất cứ lúc nào, hoặc chia sẻ cho người thân cùng xem.
                    </p>
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={() => {
                        const text = `Phiếu khảo sát xây nhà của ${form.name} (${result.code}) - ${form.type} ${form.floors} tầng, dự toán: ${est.totalText}`;
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(text);
                          alert('Đã sao chép thông tin hồ sơ vào bộ nhớ tạm: ' + text);
                        }
                      }}
                    >
                      📋 Sao chép tóm tắt hồ sơ
                    </button>
                  </div>
                </div>

                <div className="nav-r">
                  {zalo && <a className="btn" href={'https://zalo.me/' + zalo} target="_blank" rel="noopener noreferrer">Chat Zalo với kỹ sư</a>}
                  <button type="button" className="btn ghost" onClick={downloadWord} disabled={busy === 'word'}>Tải file Word (.docx)</button>
                  <button type="button" className="btn ghost" onClick={() => { setResult(null); goStep(0); }}>Xem lại / sửa thông tin</button>
                </div>
              </div>
            )}

            {view === 'preview' && doc && (
              <div className="stack" style={{ gap: 20 }}>
                <div className="prev-h">
                  <div className="step-h">
                    <h2>Xem trước phiếu thông tin</h2>
                    <p className="hint">Đây là nội dung file Word sẽ gửi cho kỹ sư. Anh/chị kiểm tra lại, có thể tải về để lưu.</p>
                  </div>
                  <Tag>{doc.fileName}</Tag>
                </div>
                <DocPreview doc={doc} ownerName={form.name} />
                {notice && <Note bad role="status">{notice}</Note>}
                {busy === 'send' && <Note role="status">Đang tạo file Word và gửi…</Note>}
                {sendErr && (
                  <div className="err-box" role="alert">
                    <Note bad>
                      Chưa gửi được phiếu ({sendErr}). Anh/chị bấm “Thử lại”, hoặc tải file Word rồi gửi qua Zalo/hotline {COMPANY.hotline} để kỹ sư nhận ngay.
                    </Note>
                  </div>
                )}
                <div className="nav">
                  <button type="button" className="btn ghost" onClick={() => setView('form')} disabled={busy === 'send'}>← Sửa lại thông tin</button>
                  <div className="nav-r">
                    <button type="button" className="btn ghost" onClick={downloadWord} disabled={busy !== ''}>
                      {busy === 'word' ? 'Đang tạo file…' : 'Tải file Word (.docx)'}
                    </button>
                    <button type="button" className="btn" onClick={submit} disabled={busy !== ''}>
                      {busy === 'send' ? 'Đang gửi…' : sendErr ? 'Thử lại' : 'Xác nhận & gửi cho kỹ sư'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === 'form' && (
              <>
                {StepView ? <StepView /> : <Step7 files={files} onFiles={setFiles} honey={honey} onHoney={setHoney} />}
                {err && (
                  <div className="err-box" role="alert">
                    <Note bad>{err.message}</Note>
                    {err.step !== step && <button type="button" className="btn ghost sm" onClick={() => goStep(err.step)}>Về bước có lỗi</button>}
                  </div>
                )}
                <div className="nav">
                  {step > 0 ? <button type="button" className="btn ghost" onClick={() => goStep(step - 1)}>← Quay lại</button> : <span />}
                  {step < 6
                    ? <button type="button" className="btn" onClick={() => goStep(step + 1)}>Tiếp tục →</button>
                    : <button type="button" className="btn" onClick={openPreview}>Xem trước phiếu Word →</button>}
                </div>
                {step === 6 && <button type="button" className="link-btn" onClick={resetDraft}>Xóa nháp, điền lại</button>}
              </>
            )}
          </FormContext.Provider>
        </main>

        <Sidebar fs={fs} couple={coupleText(fs, fs2)} facing={facingNote(fs, form.facing)} est={est} notes={notes} />
      </div>
    </Page>
  );
}
