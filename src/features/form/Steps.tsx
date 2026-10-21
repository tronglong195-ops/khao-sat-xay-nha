import { Counter, MultiChipGroup, Note, Sec } from '../../components/ui';
import { COMPANY } from '../../config/company';
import { calcEstimate, levelPrices } from '../../domain/estimate';
import { DIRS, STARS, calcFS, canChiOf, colorHint, facingHint } from '../../domain/fengshui';
import { fmt } from '../../domain/format';
import { BUILD_YEARS, OPTS, ROOMS, STYLES, floorHeightPlaceholder, floorNames, suggestRooms } from '../../domain/options';
import type { FormState } from '../../domain/types';
import { Input, Many, One, TextArea } from './fields';
import { useForm } from './formContext';
import { FileField } from './FileField';

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
  return (
    <div className="stack">
      <StepHead title="1. Thông tin chủ nhà & tuổi làm nhà" hint="Năm sinh dùng để xem cung mệnh (Bát trạch), hướng hợp và tuổi động thổ." />
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
  const { f } = useForm();
  const fs = calcFS(f.year, f.gender, f.buildYear);
  const facingOpts = DIRS.map(([v, label]) => ({ v, label, sub: fs ? STARS[fs.s.indexOf(v)] : '' }));
  return (
    <div className="stack">
      <StepHead title="2. Khu đất & pháp lý" hint="Kích thước lô đất cho phép tính mật độ xây dựng và diện tích sàn sơ bộ." />
      <Input k="siteAddr" label="Địa chỉ lô đất xây dựng" placeholder="Số thửa/tờ bản đồ, đường, phường/xã, tỉnh/thành" />
      <One k="type" title="Kiểu công trình" opts={OPTS.type} />
      <div className="grid3">
        <Input k="w" label="Chiều rộng mặt tiền (m)" type="number" inputMode="decimal" step="0.1" placeholder="VD: 5" />
        <Input k="d" label="Chiều sâu lô đất (m)" type="number" inputMode="decimal" step="0.1" placeholder="VD: 20" />
        <Input k="road" label="Đường trước nhà rộng (m)" type="number" inputMode="decimal" step="0.1" placeholder="VD: 6" />
      </div>
      <One k="fronts" title="Số mặt tiếp giáp đường" aria="Số mặt tiền" opts={OPTS.fronts} />
      <Sec title="Hướng mặt tiền gia chủ định làm">
        <One k="facing" title="Hướng nhà" opts={facingOpts} className="dir" bare />
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
      <One k="roof" title="Kiểu mái" opts={OPTS.roof} />
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
      <One k="cos" title="Cos nền tầng 1 cao hơn mặt sân / đường" aria="Cos nền tầng 1" opts={OPTS.cos} />
      <Sec title="Thành viên & số phòng">
        <div className="grid3">
          {COUNTERS.map((c) => (
            <Counter key={c.k} label={c.label} note={c.note} value={f[c.k]} onChange={(v) => set({ [c.k]: v } as Partial<FormState>)} />
          ))}
        </div>
        <Note>{rooms.text}</Note>
      </Sec>
      <Sec title="Công năng & chiều cao từng tầng">
        <p className="hint">Chọn các phòng mong muốn ở mỗi tầng; ghi số lượng vào ô ghi chú. Chiều cao tầng chỉ điền nếu gia chủ có yêu cầu riêng.</p>
        {floorNames(f).map((nm) => <FloorBox key={nm} name={nm} />)}
      </Sec>
      <div className="grid2">
        <One k="altar" title="Phòng thờ" opts={OPTS.altar} />
        <One k="kitchen" title="Bếp" aria="Kiểu bếp" opts={OPTS.kitchen} />
      </div>
      <p className="hint">Ban thờ không đặt dưới WC/bếp, lưng tựa tường đặc, tránh xà ngang đè – kỹ sư sẽ chọn hướng đặt bàn thờ theo tuổi gia chủ.</p>
      <div className="grid2">
        <One k="well" title="Giếng trời (nhà phố sâu)" aria="Giếng trời" opts={OPTS.well} />
        <One k="business" title="Tầng 1 có kinh doanh?" aria="Kinh doanh tầng 1" opts={OPTS.business} />
      </div>
      <Sec title="Thang máy">
        <One k="lift" title="Thang máy" opts={OPTS.lift} bare />
        {f.lift === 'Có' && <One k="liftType" title="Loại thang máy" opts={OPTS.liftType} bare />}
      </Sec>
      <Many k="spaces" title="Không gian khác mong muốn (chọn nhiều)" aria="Không gian khác" opts={OPTS.spaces} />
    </div>
  );
}

export function Step4() {
  const { f, set } = useForm();
  const fs = calcFS(f.year, f.gender, f.buildYear);
  return (
    <div className="stack">
      <StepHead title="4. Phong cách & vật liệu hoàn thiện" hint="Chọn phong cách gần nhất – kiến trúc sư sẽ tinh chỉnh theo lô đất và ngân sách." />
      <div className="styles" role="group" aria-label="Phong cách kiến trúc">
        {STYLES.map((st) => {
          const on = f.style === st.id;
          return (
            <button key={st.id} type="button" className={'stc' + (on ? ' on' : '')} aria-pressed={on} onClick={() => set({ style: st.id })}>
              <span className="sw-row" aria-hidden="true">{st.colors.map((c) => <span key={c} className="sw" style={{ background: c }} />)}</span>
              <span className="stc-n">{st.name}</span>
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
        <One k="stair" title="Hình dạng cầu thang" opts={OPTS.stair} />
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
  return (
    <div className="stack">
      <StepHead title="5. Kết cấu & điện nước" hint="Không chắc thì chọn “Kỹ sư đề xuất” – kỹ sư sẽ kiểm tra khi khảo sát và tham khảo các công trình lân cận." />
      <div className="grp first">
        <h3 className="grp-h">Kết cấu</h3>
        <One k="soil" title="Địa chất khu đất" aria="Địa chất" opts={OPTS.soil} />
        <One k="found" title="Phương án móng dự kiến" aria="Phương án móng" opts={OPTS.found} />
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
          <div className="est-table">
            <div className="row"><span className="k">Diện tích lô đất</span><span className="v">{est.lotText}</span></div>
            <div className="row"><span className="k">Mật độ XD tối đa (QCVN 01:2021/BXD, tham khảo)</span><span className="v">{est.covText}</span></div>
            <div className="row"><span className="k">{est.sxdLabel}</span><span className="v">{est.sxdText}</span></div>
            {est.partRows.map((p) => <div className="row" key={p.k}><span className="k">{p.k}</span><span className="v">{p.v}</span></div>)}
            <div className="row"><span className="k k-strong">Tổng diện tích tính tiền</span><span className="v">{est.areaText}</span></div>
            <div className="row"><span className="k">Đơn giá tham khảo</span><span className="v">{est.priceText}</span></div>
            <div className="row"><span className="k k-strong">Dự toán sơ bộ</span><span className="v est-total">{est.totalText}</span></div>
          </div>
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
