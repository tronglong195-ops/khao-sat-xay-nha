import { useState } from 'react';
import { FoundationIcon, RoofIcon, TechTip } from '../../components/ArchitectureVisuals';
import { BuildingPerspectivesSlider } from '../../components/BuildingPerspectivesSlider';
import { FengShuiCompass } from '../../components/FengShuiCompass';
import { Counter, MultiChipGroup, Note, Sec } from '../../components/ui';
import { COMPANY } from '../../config/company';
import { covOf } from '../../domain/density';
import { calcEstimate, levelPrices } from '../../domain/estimate';
import { calcFS, canChiOf, colorHint, facingHint } from '../../domain/fengshui';
import { fmt, numOf } from '../../domain/format';
import { parseSolarDateToLunar } from '../../domain/lunar';
import { BUILD_YEARS, OPTS, ROOMS, STYLES, floorHeightPlaceholder, floorNames, suggestRooms } from '../../domain/options';
import { PRESET_TEMPLATES } from '../../domain/presets';
import { TECH_EXPLANATIONS } from '../../domain/techExpl';
import type { DirCode, FormState } from '../../domain/types';
import { FileField } from './FileField';
import { Input, Many, One, TextArea } from './fields';
import { useForm } from './formContext';

const AGREE_TEXT = 'Tôi đồng ý để ' + COMPANY.name + ' lưu trữ và xử lý thông tin trên nhằm mục đích tư vấn thiết kế – thi công, theo quy định pháp luật về bảo vệ dữ liệu cá nhân.';

function StepHead({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="step-h">
      <h2>{title}</h2>
      <p className="hint">{hint}</p>
    </div>
  );
}

export function Step1() {
  const { f, set } = useForm();
  const [appliedPreset, setAppliedPreset] = useState<string>('');

  const applyPreset = (id: string) => {
    const p = PRESET_TEMPLATES.find((t) => t.id === id);
    if (!p) return;
    set(p.patch);
    setAppliedPreset(p.title);
  };

  // Tính âm lịch từ ngày sinh dương lịch
  const lunar = parseSolarDateToLunar(f.dob);

  return (
    <div className="stack">
      <StepHead title="1. Thông tin chủ nhà & tuổi làm nhà" hint="Năm sinh dùng để xem cung mệnh (Bát trạch), hướng hợp và tuổi động thổ." />

      {/* Thanh gợi ý mẫu nhà điền sẵn */}
      <div style={{
        background: '#FAF9F6',
        border: '1px solid var(--line)',
        borderRadius: 14,
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚡ Điền nhanh theo mẫu nhà gợi ý phổ biến
          </span>
          {appliedPreset && <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>✓ Đã áp dụng: {appliedPreset}</span>}
        </div>
        <p style={{ margin: '0 0 12px', fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.4 }}>
          Nếu chưa chắc chắn về số phòng hoặc quy mô, anh/chị có thể bấm chọn 1 mẫu bên dưới để tự động điền cấu hình tối ưu nhất:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
          {PRESET_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => applyPreset(tmpl.id)}
              style={{
                textAlign: 'left',
                padding: '12px',
                borderRadius: 10,
                border: '1px solid var(--line)',
                background: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className="preset-btn"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 20 }}>{tmpl.icon}</span>
                <strong style={{ fontSize: 13.5, color: 'var(--ink)' }}>{tmpl.title}</strong>
              </div>
              <p style={{ margin: 0, fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.35 }}>
                {tmpl.tagline}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid2">
        <Input k="name" label="Tên gia chủ (đầy đủ) *" autoComplete="name" placeholder="VD: Nguyễn Văn An" />
        <Input k="phone" label="Số điện thoại *" type="tel" autoComplete="tel" inputMode="tel" placeholder="09xx xxx xxx" />
        <Input k="zalo" label="Zalo (nếu khác số trên)" type="tel" inputMode="tel" />
        <Input k="email" label="Email" type="email" autoComplete="email" inputMode="email" />
      </div>
      <Input k="addr" label="Địa chỉ liên hệ hiện tại" autoComplete="street-address" placeholder="Số nhà, phường/xã, tỉnh/thành" />
      <Many k="concerns" title="Điều anh/chị quan tâm nhất (chọn nhiều)" aria="Vấn đề quan tâm nhất" opts={OPTS.concerns} />

      <Sec title="Gia chủ (người đứng tuổi làm nhà)">
        <div className="grid3">
          <Input k="dob" label="Ngày sinh (dương lịch)" type="date" />
          <Input k="year" label="Năm sinh âm lịch" type="number" inputMode="numeric" min="1920" max="2012" placeholder="VD: 1985" />
          <div className="fld"><span className="lb">Giới tính</span><One k="gender" title="Giới tính" aria="Giới tính gia chủ" opts={OPTS.gender} bare /></div>
        </div>

        {/* Thông báo tự động chuyển đổi Dương lịch -> Âm lịch */}
        {lunar && (
          <div style={{
            background: 'var(--accent-soft)',
            border: '1px solid var(--accent-soft-line)',
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 12.5,
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 4
          }}>
            <span>
              💡 Ngày <strong>{f.dob}</strong> (Dương lịch) ứng với ngày <strong>{lunar.day}/{lunar.month}{lunar.isLeap ? ' (nhuận)' : ''} năm {lunar.canChiYear} ({lunar.year} Âm lịch)</strong>.
            </span>
            {f.year !== String(lunar.year) && (
              <button
                type="button"
                className="btn sm"
                style={{ fontSize: 12, padding: '4px 10px', minHeight: 32 }}
                onClick={() => set({ year: String(lunar.year) })}
              >
                Áp dụng năm {lunar.year}
              </button>
            )}
          </div>
        )}

        <p className="hint">Sinh trước Tết Nguyên đán thì năm âm lịch là năm liền trước (VD: sinh 20/01/1985 dương lịch → năm Giáp Tý 1984).</p>
      </Sec>

      <Sec title="Vợ/chồng (không bắt buộc)">
        <div className="grid2">
          <Input k="year2" label="Năm sinh âm lịch" type="number" inputMode="numeric" min="1920" max="2012" placeholder="VD: 1988" />
          <div className="fld"><span className="lb">Giới tính</span><One k="gender2" title="Giới tính" aria="Giới tính vợ hoặc chồng" opts={OPTS.gender} bare /></div>
        </div>
      </Sec>
      <One k="buildYear" title="Năm dự kiến động thổ" aria="Năm động thổ" opts={BUILD_YEARS.map((y) => ({ v: y, label: 'Năm ' + y, sub: canChiOf(parseInt(y, 10)) }))} />
    </div>
  );
}

export function Step2() {
  const { f, set } = useForm();
  const fs = calcFS(f.year, f.gender, f.buildYear);

  const W = numOf(f.w);
  const D = numOf(f.d);
  const lot = W * D;
  const cov = lot > 0 ? covOf(lot) : 0;
  const sxdProp = lot > 0 ? Math.round(lot * cov * 10) / 10 : 0;

  return (
    <div className="stack">
      <StepHead title="2. Khu đất & pháp lý" hint="Kích thước lô đất cho phép tính mật độ xây dựng và diện tích sàn sơ bộ." />
      <Input k="siteAddr" label="Địa chỉ lô đất xây dựng" placeholder="Số thửa/tờ bản đồ, đường, phường/xã, tỉnh/thành" />
      <One k="type" title="Kiểu công trình" opts={OPTS.type} />

      {/* Slide ảnh phối cảnh minh họa các góc công trình vuốt sang hai bên */}
      <BuildingPerspectivesSlider
        buildingType={f.type}
        savedRef={f.refs}
        onSaveRef={(refText: string) => {
          const current = f.refs ? f.refs.trim() : '';
          if (!current) {
            set({ refs: refText });
          } else if (!current.includes(refText)) {
            set({ refs: current + ' ; ' + refText });
          }
        }}
      />
      <div className="grid3">
        <Input k="w" label="Chiều rộng mặt tiền (m)" type="number" inputMode="decimal" step="0.1" placeholder="VD: 5" />
        <Input k="d" label="Chiều sâu lô đất (m)" type="number" inputMode="decimal" step="0.1" placeholder="VD: 20" />
        <Input k="road" label="Đường trước nhà rộng (m)" type="number" inputMode="decimal" step="0.1" placeholder="VD: 6" />
      </div>

      {/* Hiển thị tính toán nhanh diện tích lô đất */}
      {lot > 0 && (
        <div style={{
          background: '#F6F5F1',
          border: '1px solid var(--line)',
          borderRadius: 10,
          padding: '10px 14px',
          fontSize: 13,
          color: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10
        }}>
          <div>
            📐 Diện tích lô đất: <strong>{fmt(lot, 1)} m²</strong> · Mật độ XD tối đa: <strong>{fmt(cov * 100, 0)}%</strong> (QCVN 01:2021/BXD)
            <span style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
              Diện tích xây dựng tầng 1 tối đa theo mật độ: <strong>{fmt(sxdProp, 1)} m²</strong>
            </span>
          </div>
          {f.sxdIn !== String(sxdProp) && (
            <button
              type="button"
              className="btn ghost sm"
              style={{ fontSize: 12, padding: '4px 10px', minHeight: 32 }}
              onClick={() => set({ sxdIn: String(sxdProp) })}
            >
              Áp dụng {fmt(sxdProp, 1)} m²
            </button>
          )}
        </div>
      )}

      <One k="fronts" title="Số mặt tiếp giáp đường" aria="Số mặt tiền" opts={OPTS.fronts} />

      <Sec title="Hướng mặt tiền gia chủ định làm">
        {/* La bàn phong thủy Bát Quái trực quan & cảm biến điện thoại */}
        <FengShuiCompass
          fs={fs}
          facing={f.facing}
          onSelect={(dir: DirCode, degStr?: string) => {
            if (degStr) {
              set({ facing: dir, facingDeg: degStr });
            } else {
              set({ facing: dir });
            }
          }}
        />

        <Input k="facingDeg" label="Số độ cụ thể (nếu có, đo bằng la bàn)" placeholder="VD: 135° Đông Nam" />
        <p className="hint">{facingHint(fs)}</p>
      </Sec>

      <One k="status" title="Hiện trạng" aria="Hiện trạng lô đất" opts={OPTS.status} />
      <Many k="legal" title="Giấy tờ đã có (chọn nhiều)" aria="Pháp lý" opts={OPTS.legal} />
      <One k="permit" title="Vị trí xây dựng có cần xin giấy phép?" aria="Xin phép xây dựng" opts={OPTS.permit} />
    </div>
  );
}

const COUNTERS: { k: 'adults' | 'kids' | 'elders' | 'beds' | 'wcs' | 'cars'; label: string; note: string }[] = [
  { k: 'adults', label: 'Người lớn', note: 'Kể cả vợ chồng' },
  { k: 'kids', label: 'Trẻ em', note: 'Dưới 18 tuổi' },
  { k: 'elders', label: 'Người cao tuổi', note: 'Ông bà ở cùng' },
  { k: 'beds', label: 'Phòng ngủ', note: 'Mong muốn' },
  { k: 'wcs', label: 'WC', note: 'Mong muốn' },
  { k: 'cars', label: 'Chỗ để ô tô', note: 'Trong nhà' }
];

function FloorBox({ name }: { name: string }) {
  const { f, set } = useForm();
  return (
    <div className="box">
      <div className="box-h">
        <h4>{name}</h4>
        <label>
          <span className="lb">Cao tầng (m)</span>
          <input className="in" type="number" inputMode="decimal" step="0.1" value={f.floorH[name] || ''} placeholder={floorHeightPlaceholder(name)}
            onChange={(e) => set({ floorH: { ...f.floorH, [name]: e.target.value } })} />
        </label>
      </div>
      <MultiChipGroup label={'Các phòng ' + name} options={ROOMS} value={f.floorRooms[name] || []}
        onChange={(v) => set({ floorRooms: { ...f.floorRooms, [name]: v } })} />
      <input className="in" type="text" value={f.floorNote[name] || ''} aria-label={'Ghi chú ' + name}
        placeholder="Ghi chú: VD 2 phòng ngủ, 1 WC chung, phòng ngủ ông bà gần WC…"
        onChange={(e) => set({ floorNote: { ...f.floorNote, [name]: e.target.value } })} />
    </div>
  );
}

export function Step3() {
  const { f, set } = useForm();
  const est = calcEstimate(f);
  const rooms = suggestRooms(f.adults, f.kids, f.elders);

  return (
    <div className="stack">
      <StepHead title="3. Quy mô & công năng từng tầng" hint="Nhu cầu sinh hoạt thực tế của gia đình quyết định mặt bằng – hãy chọn đúng số người và thói quen." />
      <One k="floors" title="Số tầng nổi (kể cả tầng 1, chưa kể lửng – tum)" aria="Số tầng" opts={OPTS.floors} />
      <div className="grid3">
        <One k="mezz" title="Tầng lửng" opts={OPTS.mezz} />
        <One k="tum" title="Tum thang" opts={OPTS.tum} />
        <One k="basement" title="Tầng hầm" opts={OPTS.basement} />
      </div>

      {/* Lựa chọn Kiểu mái với Icon trực quan */}
      <div className="sec">
        <span className="sec-h">Kiểu mái</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
          {OPTS.roof.map((rf) => {
            const on = f.roof === rf;
            return (
              <button
                key={rf}
                type="button"
                onClick={() => set({ roof: rf })}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: on ? '2px solid var(--accent)' : '1px solid var(--line)',
                  background: on ? 'var(--accent-soft)' : '#FFFFFF',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ color: on ? 'var(--accent)' : 'var(--muted)', marginTop: 2 }}>
                  <RoofIcon type={rf} />
                </div>
                <div>
                  <strong style={{ fontSize: 13.5, display: 'block', color: on ? 'var(--accent)' : 'var(--ink)' }}>{rf}</strong>
                  <TechTip text={TECH_EXPLANATIONS[rf]} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid3">
        <Input k="sxdIn" label="Diện tích xây dựng ước tính / sàn (m²)" type="number" inputMode="decimal"
          placeholder={est.lot > 0 ? 'Tự tính: ' + fmt(est.lot * est.cov, 1) : 'VD: 85'} />
        <Input k="sudung" label="Diện tích sử dụng ước tính / sàn (m²)" type="number" inputMode="decimal" />
        <Input k="kichthuoc" label="Kích thước xây dựng (dài × rộng)" placeholder="VD: 5 × 17 m" />
      </div>
      <p className="hint">Để trống diện tích xây dựng thì hệ thống tự tính theo mật độ tối đa của lô đất.</p>
      <div className="grid2">
        <One k="balc" title="Đua ban công ngoài kích thước XD (nhà phố)" aria="Đua ban công" opts={OPTS.balc} />
        {f.balc === 'Có đua ban công' && <Input k="balcDua" label="Đua ra khoảng (m)" type="number" inputMode="decimal" step="0.1" placeholder="VD: 1,2" />}
      </div>

      <div className="sec">
        <One k="cos" title="Cos nền tầng 1 cao hơn mặt sân / đường" aria="Cos nền tầng 1" opts={OPTS.cos} />
        <TechTip text={TECH_EXPLANATIONS[f.cos]} />
      </div>

      <Sec title="Thành viên & số phòng">
        <div className="grid3">
          {COUNTERS.map((c) => (
            <Counter key={c.k} label={c.label} note={c.note} value={f[c.k]} onChange={(v) => set({ [c.k]: v } as Partial<FormState>)} />
          ))}
        </div>
        <div className="hint" style={{ marginTop: 8 }}>
          {rooms.text}
        </div>
      </Sec>

      <Sec title="Bố trí công năng & chiều cao từng tầng">
        <div className="stack" style={{ gap: 14 }}>
          {floorNames(f).map((name) => (
            <FloorBox key={name} name={name} />
          ))}
        </div>
      </Sec>

      <div className="grid2">
        <One k="altar" title="Vị trí phòng thờ" opts={OPTS.altar} />
        <One k="kitchen" title="Bếp" opts={OPTS.kitchen} />
      </div>
      <div className="grid2">
        <One k="well" title="Giếng trời lấy sáng & thông gió" opts={OPTS.well} />
        <One k="business" title="Tầng 1 có kinh doanh không?" opts={OPTS.business} />
      </div>
      <div className="grid2">
        <One k="lift" title="Thang máy" opts={OPTS.lift} />
        {f.lift === 'Có' && <One k="liftType" title="Loại thang máy" opts={OPTS.liftType} />}
      </div>
      <Many k="spaces" title="Không gian chức năng khác (chọn nhiều)" aria="Không gian khác" opts={OPTS.spaces} />
    </div>
  );
}

export function Step4() {
  const { f, set } = useForm();
  const fs = calcFS(f.year, f.gender, f.buildYear);

  return (
    <div className="stack">
      <StepHead title="4. Phong cách kiến trúc & vật liệu" hint="Định hình ngôn ngữ mặt tiền và các vật liệu hoàn thiện chính." />
      <div className="styles" role="group" aria-label="Phong cách kiến trúc">
        {STYLES.map((st) => {
          const on = f.style === st.id;
          return (
            <button key={st.id} type="button" className={'stc' + (on ? ' on' : '')} aria-pressed={on} onClick={() => set({ style: st.id })}>
              <span className="stc-sw">
                {st.colors.map((c) => <span key={c} style={{ background: c }} />)}
              </span>
              <strong className="stc-n">{st.name}</strong>
              <span className="stc-d">{st.desc}</span>
            </button>
          );
        })}
      </div>
      <div className="grid2">
        <Input k="colors" label="Màu sắc yêu cầu (hay theo phong thủy?)" placeholder="VD: thích trắng – gỗ, tránh màu đỏ" />
        <Input k="refs" label="Link mẫu nhà gia chủ thích" type="url" inputMode="url" placeholder="Pinterest, Facebook, Zalo…" />
      </div>
      <Note>{colorHint(fs)}</Note>

      <div className="grp">
        <h3 className="grp-h">Cửa</h3>
        <One k="doorMain" title="Cửa đi chính" opts={OPTS.doorMain} />
        <One k="doorRoom" title="Cửa thông phòng" opts={OPTS.doorRoom} />
        <One k="windowT" title="Cửa sổ" opts={OPTS.windowT} />
      </div>

      <div className="grp">
        <h3 className="grp-h">Cầu thang bộ & lan can</h3>
        <div className="sec">
          <One k="stair" title="Hình dạng cầu thang" opts={OPTS.stair} />
          <TechTip text={TECH_EXPLANATIONS[f.stair]} />
        </div>
        <div className="grid2">
          <One k="stairDir" title="Chiều đi lên" aria="Chiều cầu thang" opts={OPTS.stairDir} />
          <One k="stairW" title="Chiều rộng bản thang" opts={OPTS.stairW} />
        </div>
        <One k="railIn" title="Tay vịn cầu thang trong nhà" aria="Tay vịn trong nhà" opts={OPTS.railIn} />
        <One k="railOut" title="Lan can ngoài trời (ban công, sân thượng)" aria="Lan can ngoài trời" opts={OPTS.railOut} />
      </div>

      <div className="grp">
        <h3 className="grp-h">Trần, sàn, tường</h3>
        <Sec title="Trần trang trí">
          <One k="ceil" title="Loại trần" opts={OPTS.ceil} bare />
          {f.ceil !== 'Không làm trần' && <One k="ceilScope" title="Phạm vi làm trần" opts={OPTS.ceilScope} bare />}
        </Sec>
        <Sec title="Sàn nhà">
          <One k="floorMat" title="Loại sàn" opts={OPTS.floorMat} bare />
          {f.floorMat === 'Sàn gạch' && <One k="tile" title="Kích thước gạch" opts={OPTS.tile} bare />}
        </Sec>
        <div className="grid2">
          <One k="wallOut" title="Tường bao ngoài nhà" aria="Tường bao" opts={OPTS.wall} />
          <One k="wallIn" title="Tường ngăn trong nhà" aria="Tường ngăn" opts={OPTS.wall} />
        </div>
        <p className="hint">Tường bao 220 cách nhiệt, chống thấm tốt hơn (nên dùng cho mặt hướng Tây); tường ngăn 110 tiết kiệm diện tích và tải trọng.</p>
        <Input k="materials" label="Vật liệu khác mong muốn" placeholder="VD: đá ốp mặt tiền, kính Low-E, gỗ óc chó" />
      </div>
    </div>
  );
}

export function Step5() {
  const { f, set } = useForm();
  return (
    <div className="stack">
      <StepHead title="5. Kết cấu & điện nước" hint="Không chắc thì chọn “Kỹ sư đề xuất” – kỹ sư sẽ kiểm tra khi khảo sát và tham khảo các công trình lân cận." />
      <div className="grp first">
        <h3 className="grp-h">Kết cấu</h3>
        <One k="soil" title="Địa chất khu đất" aria="Địa chất" opts={OPTS.soil} />

        {/* Phương án móng với Icon & giải thích trực quan */}
        <div className="sec">
          <span className="sec-h">Phương án móng dự kiến</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
            {OPTS.found.map((fd) => {
              const on = f.found === fd;
              return (
                <button
                  key={fd}
                  type="button"
                  onClick={() => set({ found: fd })}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: on ? '2px solid var(--accent)' : '1px solid var(--line)',
                    background: on ? 'var(--accent-soft)' : '#FFFFFF',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{ color: on ? 'var(--accent)' : 'var(--muted)', marginTop: 2 }}>
                    <FoundationIcon type={fd} />
                  </div>
                  <div>
                    <strong style={{ fontSize: 13.5, display: 'block', color: on ? 'var(--accent)' : 'var(--ink)' }}>{fd}</strong>
                    <TechTip text={TECH_EXPLANATIONS[fd]} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <Input k="neighbor" label="Công trình lân cận làm móng gì? (nếu biết)" placeholder="VD: nhà bên cạnh 4 tầng ép cọc 250×250, sâu 18 m" />
      </div>
      <div className="grp">
        <h3 className="grp-h">Cấp – thoát nước</h3>
        <Sec title="Nguồn nước đầu vào">
          <One k="waterIn" title="Nguồn nước" opts={OPTS.waterIn} bare />
          <Input k="waterPos" label="Vị trí đầu chờ nước" hiddenLabel placeholder="Vị trí đầu chờ nước so với công trình (VD: góc trái mặt tiền)" />
        </Sec>
        <div className="grid2">
          <One k="waterOut" title="Thoát nước ra phía" aria="Hướng thoát nước" opts={OPTS.waterOut} />
          <Input k="drainCos" label="Cos rãnh thoát thấp hơn cos nhà hiện trạng (cm)" type="number" inputMode="decimal" placeholder="VD: 40" />
        </div>
        <div className="grid2">
          <One k="tank" title="Bể chứa nước ngầm" aria="Bể nước ngầm" opts={OPTS.tank} />
          <One k="septic" title="Bể phốt" opts={OPTS.septic} />
        </div>
      </div>
      <div className="grp">
        <h3 className="grp-h">Điện & hệ thống kỹ thuật</h3>
        <One k="pole" title="Cột điện đi vào công trình từ phía" aria="Vị trí cột điện" opts={OPTS.pole} />
        <Many k="ac" title="Điều hòa cục bộ lắp ở (chọn nhiều)" aria="Phòng lắp điều hòa" opts={OPTS.ac} />
        <div className="grid2">
          <One k="vrv" title="Điều hòa trung tâm" opts={OPTS.yesNo} />
          <One k="solar" title="Năng lượng mặt trời" opts={OPTS.solar} />
          <One k="cam" title="Camera an ninh" opts={OPTS.cam} />
          <One k="gen" title="Máy phát điện dự phòng" aria="Máy phát điện" opts={OPTS.yesNo} />
        </div>
        <Many k="sys" title="Hệ thống khác (chọn nhiều)" aria="Hệ thống khác" opts={OPTS.sys} />
      </div>
    </div>
  );
}

export function Step6() {
  const { f } = useForm();
  const est = calcEstimate(f);
  const lp = levelPrices();

  return (
    <div className="stack">
      <StepHead title="6. Ngân sách & tiến độ" hint="Tổng mức đầu tư tối đa sau khi hoàn thiện – gồm cửa, thiết bị, sơn bả; chưa gồm nội thất rời." />
      <One k="budget" title="Tổng mức đầu tư tối đa" aria="Ngân sách" opts={OPTS.budget} />
      <One k="pkg" title="Gói dịch vụ" opts={OPTS.pkg} />
      {f.pkg === 'Trọn gói chìa khóa trao tay' && (
        <One k="level" title="Mức hoàn thiện" opts={['Cơ bản', 'Khá', 'Cao cấp'].map((v) => ({ v, label: v, sub: fmt(lp[v], 1) + ' tr/m²' }))} />
      )}
      <div className="grid2">
        <One k="start" title="Thời điểm muốn khởi công" aria="Thời điểm khởi công" opts={OPTS.start} />
        <Input k="dongtho" label="Ngày dự kiến động thổ (nếu đã chọn)" type="date" />
      </div>
      <Sec title="Bảng tính diện tích sàn tính tiền (sơ bộ)">
        {est.hasLot ? (
          <>
            <div className="est-table">
              <div className="row"><span className="k">Diện tích lô đất</span><span className="v">{est.lotText}</span></div>
              <div className="row"><span className="k">Mật độ XD tối đa (QCVN 01:2021/BXD, tham khảo)</span><span className="v">{est.covText}</span></div>
              <div className="row"><span className="k">{est.sxdLabel}</span><span className="v">{est.sxdText}</span></div>
              {est.partRows.map((p) => <div className="row" key={p.k}><span className="k">{p.k}</span><span className="v">{p.v}</span></div>)}
              <div className="row"><span className="k k-strong">Tổng diện tích tính tiền</span><span className="v">{est.areaText}</span></div>
              <div className="row"><span className="k">Đơn giá tham khảo</span><span className="v">{est.priceText}</span></div>
              <div className="row"><span className="k k-strong">Dự toán sơ bộ</span><span className="v est-total">{est.totalText}</span></div>
            </div>

            {/* Chi tiết phân bổ chi phí trong bảng tính */}
            {est.breakdown && est.breakdown.length > 0 && (
              <div style={{
                marginTop: 14,
                padding: '14px 16px',
                background: '#F9F8F5',
                borderRadius: 10,
                border: '1px solid var(--line)'
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: 8 }}>
                  📊 Dự trù bóc tách tỷ trọng chi phí:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 10 }}>
                  {est.breakdown.map((b) => (
                    <div key={b.name} style={{ background: '#FFF', padding: 10, borderRadius: 8, border: '1px solid var(--line)' }}>
                      <span style={{ fontSize: 12, color: 'var(--muted)', display: 'block' }}>{b.name} ({b.pct}%)</span>
                      <strong style={{ fontSize: 15, color: 'var(--ink)', display: 'block', margin: '4px 0' }}>{b.tyText}</strong>
                      <span style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.3, display: 'block' }}>{b.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <Note bad>Nhập kích thước lô đất (bước 2) hoặc diện tích xây dựng (bước 3) để xem bảng tính.</Note>
        )}
        <p className="hint">{est.excl}</p>
      </Sec>
    </div>
  );
}

interface Step7Props {
  files: File[];
  onFiles: (files: File[]) => void;
  honey: string;
  onHoney: (v: string) => void;
}

export function Step7({ files, onFiles, honey, onHoney }: Step7Props) {
  const { f, set } = useForm();
  return (
    <div className="stack">
      <StepHead title="7. Tổng mặt bằng & xác nhận" hint="Ảnh sổ đỏ, sơ đồ hiện trạng vẽ tay hoặc ảnh chụp lô đất giúp kỹ sư lên phương án nhanh và chính xác hơn." />
      <FileField files={files} onChange={onFiles} />
      <TextArea k="siteNote" label="Mô tả tổng mặt bằng" placeholder="Giữ/phá phần nào của hiện trạng, vị trí đặt nhà mới, kích thước chi tiết, vị trí sảnh chính – sảnh phụ, cổng, hướng chính…" />
      <div className="grid2">
        <One k="contact" title="Liên hệ qua" aria="Kênh liên hệ" opts={OPTS.contact} />
        <One k="time" title="Thời gian thuận tiện" aria="Thời gian liên hệ" opts={OPTS.time} />
      </div>
      <TextArea k="notes" label="Ghi chú thêm cho kiến trúc sư" placeholder="VD: cần sân phơi kín, nuôi chó, hay tụ họp gia đình đông người…" />
      <div className="honey" aria-hidden="true">
        <label>Website<input type="text" tabIndex={-1} autoComplete="off" name="website" value={honey} onChange={(e) => onHoney(e.target.value)} /></label>
      </div>
      <label className="chk">
        <input type="checkbox" checked={f.agree} onChange={() => set({ agree: !f.agree })} />
        <span>{AGREE_TEXT}</span>
      </label>
    </div>
  );
}
