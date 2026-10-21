/**
 * NGUỒN CHUẨN NGHIỆP VỤ — trích nguyên văn từ bản thiết kế (reference/design/Main.dc.html).
 * Gồm: bảng tra phong thủy, mật độ QCVN 01:2021/BXD, dự toán, lưu ý kỹ thuật, nội dung phiếu (biến doc).
 * Lớp Component dùng runtime Design Component (DCLogic ~ React.Component): renderVals() trả mọi giá trị cho giao diện.
 * Khi port sang TypeScript: tách hàm thuần vào src/domain/*, giữ nguyên công thức và câu chữ.
 */
const CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
const CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const NAPAM = ['Hải Trung Kim','Lư Trung Hỏa','Đại Lâm Mộc','Lộ Bàng Thổ','Kiếm Phong Kim','Sơn Đầu Hỏa','Giản Hạ Thủy','Thành Đầu Thổ','Bạch Lạp Kim','Dương Liễu Mộc','Tuyền Trung Thủy','Ốc Thượng Thổ','Tích Lịch Hỏa','Tùng Bách Mộc','Trường Lưu Thủy','Sa Trung Kim','Sơn Hạ Hỏa','Bình Địa Mộc','Bích Thượng Thổ','Kim Bạch Kim','Phú Đăng Hỏa','Thiên Hà Thủy','Đại Trạch Thổ','Thoa Xuyến Kim','Tang Đố Mộc','Đại Khê Thủy','Sa Trung Thổ','Thiên Thượng Hỏa','Thạch Lựu Mộc','Đại Hải Thủy'];
const DIRS = [['B','Bắc'],['DB','Đông Bắc'],['D','Đông'],['DN','Đông Nam'],['N','Nam'],['TN','Tây Nam'],['T','Tây'],['TB','Tây Bắc']];
const DN = {}; DIRS.forEach(function (d) { DN[d[0]] = d[1]; });
const STARS = ['Sinh Khí','Thiên Y','Diên Niên','Phục Vị','Họa Hại','Lục Sát','Ngũ Quỷ','Tuyệt Mệnh'];
const CUNG = {
  1: ['Khảm','Thủy',['DN','D','N','B','T','TB','DB','TN']],
  2: ['Khôn','Thổ',['DB','T','TB','TN','D','N','DN','B']],
  3: ['Chấn','Mộc',['N','B','DN','D','TN','DB','TB','T']],
  4: ['Tốn','Mộc',['B','N','D','DN','TB','T','TN','DB']],
  6: ['Càn','Kim',['T','DB','TN','TB','DN','B','D','N']],
  7: ['Đoài','Kim',['TB','TN','DB','T','B','DN','N','D']],
  8: ['Cấn','Thổ',['TN','TB','T','DB','N','D','B','DN']],
  9: ['Ly','Hỏa',['D','DN','B','N','DB','TN','T','TB']]
};
const EAST = [1,3,4,9];
const COLORS = {
  'Kim': 'Trắng, ghi, xám bạc, vàng ánh kim; vàng – nâu đất (Thổ sinh Kim). Hạn chế đỏ, hồng (Hỏa khắc Kim).',
  'Mộc': 'Xanh lá, màu gỗ tự nhiên; đen – xanh dương (Thủy sinh Mộc). Hạn chế trắng, ghi (Kim khắc Mộc).',
  'Thủy': 'Đen, xanh dương, xanh than; trắng – ghi (Kim sinh Thủy). Hạn chế vàng đất, nâu (Thổ khắc Thủy).',
  'Hỏa': 'Đỏ, cam, hồng, tím; xanh lá – gỗ (Mộc sinh Hỏa). Hạn chế đen, xanh dương (Thủy khắc Hỏa).',
  'Thổ': 'Vàng, nâu đất, be; đỏ – cam – hồng (Hỏa sinh Thổ). Hạn chế xanh lá (Mộc khắc Thổ).'
};
const HOANG = ['Nhất Cát','Nhì Nghi','Tam Địa Sát','Tứ Tấn Tài','Ngũ Thọ Tử','Lục Hoang Ốc'];
const KIMLAU = {1:'Kim Lâu Thân',3:'Kim Lâu Thê',6:'Kim Lâu Tử',8:'Kim Lâu Lục Súc'};
const TAMTAI = {0:[2,3,4],1:[11,0,1],2:[8,9,10],3:[5,6,7]};
const COV = [[90,1],[100,0.9],[200,0.7],[300,0.6],[500,0.5],[1000,0.4]];
const BUDGETS = [['Dưới 1,5 tỷ',1.5],['1,5 – 2,5 tỷ',2.5],['2,5 – 4 tỷ',4],['4 – 6 tỷ',6],['6 – 10 tỷ',10],['Trên 10 tỷ',0]];
const ROOMS = ['Phòng khách','Bếp + bàn ăn','Phòng thờ','Phòng ngủ','Phòng ngủ master','WC chung','WC master','Gara ô tô','Kinh doanh','Sinh hoạt chung','Phòng làm việc','Giặt – phơi','Sân thượng','Kho'];
const FOUND = { 'Móng đơn': [0.3, false], 'Móng băng': [0.5, false], 'Móng ép cọc BTCT': [0.35, true], 'Móng cọc khoan nhồi': [0.35, true], 'Kỹ sư đề xuất': [0.5, false] };
const STYLES = [
  {id:'hien-dai',name:'Biệt thự / nhà phố hiện đại',desc:'Khối vuông vức, kính lớn, lam chắn nắng, ít chi tiết – dễ thi công, tối ưu chi phí.',colors:['#F2F2F0','#BFC3C2','#3A3F42','#B98E5E']},
  {id:'indochine',name:'Indochine (Đông Dương)',desc:'Gạch bông, mây tre, cửa chớp, vòm cong nhẹ – hồn Việt, nét Pháp.',colors:['#F3EBDD','#2F5D50','#C9A66B','#1E1E1E']},
  {id:'tan-co-dien',name:'Tân cổ điển',desc:'Phào chỉ tiết chế, bố cục đối xứng, sang trọng – hợp biệt thự mặt tiền rộng.',colors:['#FAF7F0','#E4D7BF','#A88B5B','#5B5047']},
  {id:'lau-dai',name:'Cổ điển / Lâu đài',desc:'Mái vòm, cột thức, phù điêu, phào chỉ dày – bề thế, cần lô đất lớn và ngân sách cao.',colors:['#F6F0E4','#D9C29A','#8E6E3E','#3F3A34']},
  {id:'nhat',name:'Mái Nhật / Wabi-sabi',desc:'Mái dốc, gỗ sáng màu, tiểu cảnh, ánh sáng dịu – tĩnh và ấm.',colors:['#EFE8DD','#C6A27A','#6B6F5A','#2B2B2B']},
  {id:'nhiet-doi',name:'Nhiệt đới (Tropical)',desc:'Mái đua sâu, gạch thông gió, nhiều cây xanh – mát tự nhiên, hợp khí hậu Việt Nam.',colors:['#E9E4D6','#8A9A5B','#B5643C','#3E4A3D']},
  {id:'luxury',name:'Hiện đại sang trọng',desc:'Đá tự nhiên, kim loại, ánh sáng gián tiếp – điểm nhấn cho biệt thự cao cấp.',colors:['#F4F1EC','#1F2326','#C8B08A','#8C8F91']}
];

function canChiOf(y) { var i = ((y - 4) % 60 + 60) % 60; return CAN[i % 10] + ' ' + CHI[i % 12]; }
function fmt(n, d) { return Number(n).toLocaleString('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d }); }
function numOf(v) { return parseFloat(String(v || '').replace(',', '.')) || 0; }
function covOf(lot) {
  if (lot <= 90) return 1;
  if (lot >= 1000) return 0.4;
  for (var i = 0; i < COV.length - 1; i++) {
    var a = COV[i], b = COV[i + 1];
    if (lot >= a[0] && lot <= b[0]) return a[1] + (b[1] - a[1]) * (lot - a[0]) / (b[0] - a[0]);
  }
  return 1;
}
function calcFS(yStr, g, byStr) {
  var y = parseInt(yStr, 10);
  if (!(y >= 1920 && y <= 2012)) return null;
  var by = parseInt(byStr, 10) || 2027;
  var i60 = ((y - 4) % 60 + 60) % 60;
  var chiI = i60 % 12;
  var napam = NAPAM[Math.floor(i60 / 2)];
  var hanh = napam.split(' ').pop();
  var r = y % 9, c;
  if (g === 'nu') { c = (r + 4) % 9; if (c === 0) c = 9; if (c === 5) c = 8; }
  else { c = (11 - r) % 9; if (c === 0) c = 9; if (c === 5) c = 2; }
  var cu = CUNG[c];
  var mu = by - y + 1;
  var kl = KIMLAU[mu % 9] || '';
  var hoI = (Math.floor(mu / 10) - 1 + mu % 10) % 6;
  var hoBad = hoI === 2 || hoI === 4 || hoI === 5;
  var byChi = ((by - 4) % 12 + 12) % 12;
  var tt = TAMTAI[chiI % 4].indexOf(byChi) >= 0;
  var faults = [];
  if (kl) faults.push(kl);
  if (hoBad) faults.push(HOANG[hoI]);
  if (tt) faults.push('Tam Tai');
  return {
    y: y, by: by, mu: mu, hanh: hanh, cungNo: c, cung: cu[0], cungHanh: cu[1], s: cu[2],
    canChi: canChiOf(y), byCanChi: canChiOf(by),
    yearText: y + ' – ' + canChiOf(y) + (g === 'nu' ? ' (nữ)' : ' (nam)'),
    napam: napam + ' (' + hanh + ')',
    cungText: cu[0] + ' ' + cu[1],
    group: EAST.indexOf(c) >= 0 ? 'Đông tứ mệnh' : 'Tây tứ mệnh',
    goodDirs: [0,1,2,3].map(function (i) { return { star: STARS[i], dir: DN[cu[2][i]] }; }),
    klText: kl ? 'Phạm ' + kl : 'Không phạm', klCls: kl ? 'tag bad' : 'tag good',
    hoText: HOANG[hoI], hoCls: hoBad ? 'tag bad' : 'tag good',
    ttText: tt ? 'Phạm' : 'Không phạm', ttCls: tt ? 'tag bad' : 'tag good',
    verdict: faults.length
      ? 'Năm ' + by + ' gia chủ phạm ' + faults.join(', ') + '. Nên mượn tuổi người hợp (nam giới, đẹp tuổi) đứng ra động thổ – cất nóc, hoặc cân nhắc lùi năm khởi công.'
      : 'Năm ' + by + ' gia chủ đẹp tuổi làm nhà: không phạm Kim Lâu, Hoang Ốc, Tam Tai.',
    verdictCls: faults.length ? 'note bad' : 'note good'
  };
}

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      step: 0, submitted: false, err: '', preview: false, notice: '',
      name: '', phone: '', zalo: '', email: '', addr: '', dob: '', concerns: [],
      year: '', gender: 'nam', year2: '', gender2: 'nu', buildYear: '2027',
      siteAddr: '', type: 'Nhà phố', w: '', d: '', road: '', fronts: '1 mặt tiền', facing: '', facingDeg: '', status: 'Đất trống', legal: ['Sổ đỏ / sổ hồng'], permit: 'Cần xin phép – nhờ công ty làm hồ sơ',
      floors: 4, mezz: 'Không lửng', tum: 'Có tum', basement: 'Không', roof: 'Mái bằng BTCT',
      sxdIn: '', sudung: '', kichthuoc: '', balc: 'Không đua', balcDua: '', cos: '3 bậc',
      adults: 2, kids: 2, elders: 0, beds: 4, wcs: 4, cars: 1,
      floorRooms: { 'Tầng 1': ['Phòng khách', 'Bếp + bàn ăn', 'WC chung'] }, floorNote: {}, floorH: {},
      altar: 'Tầng trên cùng', kitchen: 'Bếp mở liên thông phòng khách', business: 'Không', well: 'Có giếng trời', lift: 'Không', liftType: 'Kỹ sư đề xuất', spaces: ['Ban công trồng cây'],
      style: 'hien-dai', colors: '', materials: '', refs: '',
      doorMain: 'Nhôm hệ', doorRoom: 'Nhựa lõi thép', windowT: 'Nhôm hệ',
      stair: 'Bản trượt vuông có chiếu nghỉ', stairDir: 'Kỹ sư đề xuất', stairW: '1000', railIn: 'Gỗ – kính', railOut: 'Inox – kính',
      ceil: 'Trần thạch cao', ceilScope: 'Toàn nhà', floorMat: 'Sàn gạch', tile: '800×800 mm', wallOut: '220 mm', wallIn: '110 mm',
      soil: 'Đất liền thổ', found: 'Kỹ sư đề xuất', neighbor: '',
      waterIn: 'Nước máy', waterPos: '', waterOut: 'Trước nhà', drainCos: '', tank: 'Có – sau nhà', septic: 'Trong nhà',
      pole: 'Trước nhà', ac: ['Phòng ngủ', 'Phòng khách'], vrv: 'Không', solar: 'Để chờ', cam: 'Camera IP', gen: 'Không', sys: ['Chuông cổng', 'Cáp quang internet + truyền hình', 'Chống sét'],
      budget: '2,5 – 4 tỷ', pkg: 'Trọn gói chìa khóa trao tay', level: 'Khá', start: '3 – 6 tháng', dongtho: '',
      siteNote: '', files: [],
      contact: 'Zalo', time: 'Buổi tối', notes: '', agree: false
    };
  }

  renderVals() {
    var self = this, s = this.state, P = this.props;
    var set = function (o) { self.setState(o); };
    var on = {};
    ['name','phone','zalo','email','addr','dob','year','year2','siteAddr','w','d','road','facingDeg','sxdIn','sudung','kichthuoc','balcDua','colors','materials','refs','neighbor','waterPos','drainCos','dongtho','siteNote','notes'].forEach(function (k) {
      on[k] = function (e) { var o = { err: '' }; o[k] = e.target.value; set(o); };
    });
    var one = function (key, opts) {
      return opts.map(function (o) {
        var v = typeof o === 'object' ? o.v : o;
        var label = typeof o === 'object' ? o.label : String(o);
        var sel = s[key] === v;
        return { label: label, sub: (typeof o === 'object' && o.sub) || '', cls: 'chip' + (sel ? ' on' : ''), pressed: sel ? 'true' : 'false', pick: function () { var x = {}; x[key] = v; set(x); } };
      });
    };
    var toggle = function (arr, o) { return arr.indexOf(o) >= 0 ? arr.filter(function (z) { return z !== o; }) : arr.concat([o]); };
    var many = function (key, opts) {
      return opts.map(function (o) {
        var sel = s[key].indexOf(o) >= 0;
        return { label: o, sub: '', cls: 'chip' + (sel ? ' on' : ''), pressed: sel ? 'true' : 'false', pick: function () { var x = {}; x[key] = toggle(s[key], o); set(x); } };
      });
    };

    var fs = calcFS(s.year, s.gender, s.buildYear);
    var fs2 = calcFS(s.year2, s.gender2, s.buildYear);

    var facingIdx = fs && s.facing ? fs.s.indexOf(s.facing) : -1;
    var facingText = '', facingCls = 'note good';
    if (facingIdx >= 0) {
      var good = facingIdx < 4;
      facingCls = good ? 'note good' : 'note bad';
      facingText = 'Hướng ' + DN[s.facing] + ' là cung ' + STARS[facingIdx] + (good
        ? ' – hướng tốt với gia chủ.'
        : ' – hướng xấu với gia chủ. Kiến trúc sư sẽ xử lý bằng cách xoay cửa chính, bố trí sảnh – cổng theo hướng tốt và đặt bếp “tọa hung hướng cát”.');
    }
    var facingHint = fs
      ? 'Dòng chữ nhỏ dưới mỗi hướng là cung Bát trạch theo tuổi gia chủ (' + fs.cung + ' – ' + fs.group + ').'
      : 'Nhập năm sinh ở bước 1 để xem hướng nào hợp tuổi.';

    var coupleText = '';
    if (fs && fs2) {
      coupleText = 'Vợ/chồng: ' + fs2.yearText + ', cung ' + fs2.cungText + ' – ' + fs2.group + '. ' + (fs.group === fs2.group
        ? 'Cùng nhóm mệnh nên hướng nhà, hướng bếp dễ hợp cả hai.'
        : 'Khác nhóm mệnh: hướng nhà theo gia chủ, phòng ngủ và hướng giường bố trí bổ trợ cho người còn lại.');
    }

    // ---- Dự toán sơ bộ
    var W = numOf(s.w), D = numOf(s.d), sxdIn = numOf(s.sxdIn);
    var lot = W * D, cov = covOf(lot);
    var sxd = sxdIn > 0 ? sxdIn : lot * cov;
    var roofC = { 'Mái bằng BTCT': 0.5, 'Mái Thái (BTCT dán ngói)': 0.85, 'Mái Nhật (kèo thép lợp ngói)': 0.7, 'Mái tôn': 0.3 }[s.roof] || 0.5;
    var bC = { 'Không': 0, 'Bán hầm': 1.5, 'Hầm': 2.0 }[s.basement] || 0;
    var fd = FOUND[s.found] || [0.5, false];
    var parts = [{ k: s.found === 'Kỹ sư đề xuất' ? 'Móng (tạm tính 50%)' : s.found + ' (' + Math.round(fd[0] * 100) + '%)', a: sxd * fd[0] }, { k: 'Sàn ' + s.floors + ' tầng (100%)', a: sxd * s.floors }];
    if (s.mezz === 'Có lửng') parts.push({ k: 'Tầng lửng (≈ 60% sàn)', a: sxd * 0.6 });
    var dua = numOf(s.balcDua);
    if (s.balc === 'Có đua ban công' && dua > 0 && W > 0 && s.floors > 1) parts.push({ k: 'Ban công đua ' + fmt(dua, 1) + ' m × ' + (s.floors - 1) + ' tầng', a: W * dua * (s.floors - 1) });
    if (s.tum === 'Có tum') parts.push({ k: 'Tum thang (≈ 50% sàn)', a: sxd * 0.5 });
    parts.push({ k: s.roof + ' (' + Math.round(roofC * 100) + '%)', a: sxd * roofC });
    if (bC) parts.push({ k: s.basement + ' (' + Math.round(bC * 100) + '%)', a: sxd * bC });
    var area = parts.reduce(function (t, p) { return t + p.a; }, 0);
    var num = function (v, d) { var n = parseFloat(v); return isNaN(n) ? d : n; };
    var levelPrice = { 'Cơ bản': num(P.priceCoBan, 6.3), 'Khá': num(P.priceKha, 7.5), 'Cao cấp': num(P.priceCaoCap, 9.5) };
    var price = s.pkg === 'Chỉ thiết kế' ? num(P.designFee, 0.18) : s.pkg === 'Thiết kế + thi công phần thô' ? num(P.priceTho, 4.2) : levelPrice[s.level];
    var totalTy = area * price / 1000;
    var bMax = 0; BUDGETS.forEach(function (b) { if (b[0] === s.budget) bMax = b[1]; });
    var budgetText, budgetCls;
    if (s.pkg === 'Chỉ thiết kế') { budgetText = 'Chi phí thiết kế. Dự toán thi công sẽ lập kèm hồ sơ thiết kế.'; budgetCls = 'note good'; }
    else if (!bMax || totalTy <= bMax) { budgetText = 'Phù hợp ngân sách ' + s.budget + '.'; budgetCls = 'note good'; }
    else { budgetText = 'Vượt ngân sách ' + s.budget + ' khoảng ' + Math.round((totalTy / bMax - 1) * 100) + '%. Có thể giảm 1 tầng, bỏ tum/hầm/lửng hoặc hạ mức hoàn thiện.'; budgetCls = 'note bad'; }
    var totalText = s.pkg === 'Chỉ thiết kế'
      ? fmt(area * price, 0) + ' triệu'
      : (totalTy >= 1 ? '≈ ' + fmt(totalTy, 2) + ' tỷ' : '≈ ' + fmt(area * price, 0) + ' triệu');
    var excl = 'Chưa gồm: ' + (fd[1] ? 'chi phí ép/khoan cọc (tính theo md cọc), ' : 'cọc (nếu địa chất yếu phải chuyển móng cọc), ') + 'nội thất rời, thiết bị điện lạnh, phí xin phép, phá dỡ nhà cũ. Con số chính xác chỉ có sau khảo sát và bóc khối lượng từ hồ sơ thiết kế.';
    var est = {
      lot: lot > 0 ? fmt(lot, 1) + ' m²' : '—', cov: lot > 0 ? fmt(cov * 100, 0) + '%' : '—',
      sxdLabel: sxdIn > 0 ? 'Diện tích xây dựng / sàn (gia chủ nhập)' : 'Diện tích xây dựng / sàn (theo mật độ)',
      sxd: fmt(sxd, 1) + ' m²',
      parts: parts.map(function (p) { return { k: p.k, v: fmt(p.a, 1) + ' m²' }; }),
      area: fmt(area, 1) + ' m²', price: fmt(price, 2) + ' tr/m²', total: totalText,
      budgetText: budgetText, budgetCls: budgetCls, excl: excl
    };

    var suggestBeds = Math.max(1, Math.ceil(s.adults / 2)) + Math.ceil(s.kids / 2) + (s.elders > 0 ? 1 : 0) + 1;
    var roomHint = 'Gợi ý cho ' + (s.adults + s.kids + s.elders) + ' người: khoảng ' + suggestBeds + ' phòng ngủ (gồm 1 phòng khách) và ' + (suggestBeds + 1) + ' WC.' + (s.elders > 0 ? ' Có người cao tuổi: nên bố trí phòng ngủ ở tầng 1, WC khép kín, sàn chống trơn, cân nhắc thang máy gia đình.' : '');

    // ---- Công năng từng tầng
    var floorNames = ['Tầng 1'];
    if (s.mezz === 'Có lửng') floorNames.push('Tầng lửng');
    for (var i = 2; i <= s.floors; i++) floorNames.push('Tầng ' + i);
    if (s.tum === 'Có tum') floorNames.push('Tum / sân thượng');
    var floorsList = floorNames.map(function (nm) {
      var cur = s.floorRooms[nm] || [];
      return {
        name: nm, aria: 'Các phòng ' + nm, noteAria: 'Ghi chú ' + nm,
        h: s.floorH[nm] || '', hPh: nm === 'Tầng 1' ? '3,6 – 3,9' : nm === 'Tầng lửng' ? '2,7 – 3,0' : '3,3 – 3,6',
        note: s.floorNote[nm] || '',
        onH: function (e) { var o = Object.assign({}, s.floorH); o[nm] = e.target.value; set({ floorH: o }); },
        onNote: function (e) { var o = Object.assign({}, s.floorNote); o[nm] = e.target.value; set({ floorNote: o }); },
        rooms: ROOMS.map(function (r) {
          var sel = cur.indexOf(r) >= 0;
          return { label: r, cls: 'chip' + (sel ? ' on' : ''), pressed: sel ? 'true' : 'false', pick: function () { var o = Object.assign({}, s.floorRooms); o[nm] = toggle(cur, r); set({ floorRooms: o }); } };
        })
      };
    });

    var styleName = '';
    var styles = STYLES.map(function (st) {
      var sel = s.style === st.id; if (sel) styleName = st.name;
      return { name: st.name, desc: st.desc, colors: st.colors, cls: 'stc' + (sel ? ' on' : ''), pressed: sel ? 'true' : 'false', pick: function () { set({ style: st.id }); } };
    });
    var colorHint = fs ? 'Màu hợp mệnh ' + fs.hanh + ' của gia chủ: ' + COLORS[fs.hanh] : 'Nhập năm sinh ở bước 1 để xem màu hợp mệnh gia chủ.';

    // ---- Lưu ý kỹ thuật
    var tn = [];
    if (s.soil === 'Đất ruộng' || s.soil === 'Đất ao lấp') {
      tn.push({ t: 'Nền đất yếu (' + s.soil.toLowerCase() + '): cần khoan khảo sát địa chất; nhà từ 3 tầng thường phải dùng móng cọc BTCT. Ao lấp phải vét bùn, đắp cát đầm chặt từng lớp trước khi thi công.', cls: 'note bad' });
      if (s.found === 'Móng đơn' || s.found === 'Móng băng') tn.push({ t: s.found + ' trên nền yếu có nguy cơ lún lệch, nứt tường – nên để kỹ sư kiểm tra lại phương án móng.', cls: 'note bad' });
    }
    if (s.soil === 'Đất đồi') tn.push({ t: 'Đất đồi: kiểm tra độ dốc, kè chống trượt và thoát nước mặt; có thể gặp đá phải khoan phá.', cls: 'note bad' });
    if (s.cos === '1 bậc') tn.push({ t: 'Cos nền 1 bậc (~15 cm) dễ ngập khi đường nâng cốt sau này; nhà phố thường chọn từ 3 bậc (~45 cm).', cls: 'note bad' });
    if (s.floors >= 5 && s.lift === 'Không') tn.push({ t: 'Nhà từ 5 tầng nên để sẵn hố thang máy để sau này lắp, tránh đục phá kết cấu.', cls: 'note bad' });
    if (s.stairW === '900' && (s.floors >= 4 || s.elders > 0)) tn.push({ t: 'Bản thang 900 mm hơi hẹp cho nhà nhiều tầng hoặc có người cao tuổi – nên cân nhắc 1000–1100 mm.', cls: 'note bad' });
    if (s.septic === 'Trong nhà') tn.push({ t: 'Bể phốt trong nhà: đặt dưới gara/WC tầng 1, có ống thông hơi lên mái, nắp thăm ngoài khu sinh hoạt.', cls: 'note good' });
    if (s.drainCos && numOf(s.drainCos) < 30) tn.push({ t: 'Rãnh thoát thấp hơn cos nhà dưới 30 cm: độ dốc ống thoát hạn chế, cần nâng cos nền hoặc bố trí hố ga – bơm.', cls: 'note bad' });
    if (s.solar !== 'Không') tn.push({ t: 'Năng lượng mặt trời: để sẵn ống luồn, vị trí bồn/pin trên mái và tính thêm tải trọng mái.', cls: 'note good' });
    if (!tn.length) tn.push({ t: 'Chưa có lưu ý đặc biệt – kỹ sư sẽ xác nhận khi khảo sát hiện trạng.', cls: 'note good' });

    var LABELS = ['Chủ nhà & tuổi', 'Khu đất', 'Công năng', 'Kiến trúc & vật liệu', 'Kết cấu & điện nước', 'Ngân sách', 'Mặt bằng & gửi'];
    var steps = LABELS.map(function (l, i) {
      return { n: i + 1, label: l, cls: 'stp' + (i === s.step ? ' on' : '') + (i < s.step ? ' done' : ''), cur: i === s.step ? 'step' : 'false', go: function () { set({ step: i, err: '', preview: false }); } };
    });

    var dt = new Date();

    var ctr = function (key, label, note) {
      return { label: label, note: note, val: s[key],
        dec: function () { var x = {}; x[key] = Math.max(0, s[key] - 1); set(x); },
        inc: function () { var x = {}; x[key] = Math.min(20, s[key] + 1); set(x); },
        decLabel: 'Giảm ' + label.toLowerCase(), incLabel: 'Tăng ' + label.toLowerCase() };
    };

    var code = 'KH-' + String(dt.getFullYear()).slice(2) + ('0' + (dt.getMonth() + 1)).slice(-2) + ('0' + dt.getDate()).slice(-2) + '-' + (s.phone.replace(/\D/g, '').slice(-3) || '000');
    var facingChips = DIRS.map(function (x) { return { v: x[0], label: x[1], sub: fs ? STARS[fs.s.indexOf(x[0])] : '' }; });

    // ---- Nội dung phiếu Word (dùng chung cho xem trước, file .docx và Google Sheet)
    var dmy = function (iso) { return iso ? iso.split('-').reverse().join('/') : ''; };
    var R = function (k, v) { return { k: k, v: (v === undefined || v === null || v === '') ? '—' : String(v) }; };
    var floorRows = floorNames.map(function (nm) {
      var parts2 = [(s.floorRooms[nm] || []).join(', ')];
      if (s.floorH[nm]) parts2.push('Cao tầng ' + s.floorH[nm] + ' m');
      if (s.floorNote[nm]) parts2.push('Ghi chú: ' + s.floorNote[nm]);
      return R('Công năng ' + nm.toLowerCase(), parts2.filter(Boolean).join('\n'));
    });
    var doc = {
      code: code,
      fileName: 'Phieu_khao_sat_' + code + '.docx',
      dateLine: 'Ngày ' + dt.getDate() + ' tháng ' + (dt.getMonth() + 1) + ' năm ' + dt.getFullYear(),
      sections: [
        { title: 'I. THÔNG TIN CHỦ NHÀ', rows: [
          R('Tên gia chủ', s.name), R('Số điện thoại', s.phone), R('Zalo', s.zalo), R('Email', s.email),
          R('Ngày sinh (dương lịch)', dmy(s.dob)), R('Năm sinh âm lịch', fs ? fs.yearText : s.year), R('Vợ/chồng', fs2 ? fs2.yearText : ''),
          R('Địa chỉ liên hệ', s.addr), R('Vấn đề quan tâm nhất', s.concerns.join(', ')),
          R('Mệnh – cung phi', fs ? fs.napam + '; cung ' + fs.cungText + ' – ' + fs.group : ''),
          R('Hướng hợp tuổi', fs ? fs.goodDirs.map(function (g) { return g.star + ': ' + g.dir; }).join('; ') : ''),
          R('Tuổi làm nhà', fs ? 'Tuổi mụ ' + fs.mu + ' năm ' + fs.by + ' (' + fs.byCanChi + '). ' + fs.verdict : '')
        ] },
        { title: 'II. THÔNG TIN KIẾN TRÚC CÔNG TRÌNH', rows: [
          R('Kiểu công trình', s.type), R('Phong cách kiến trúc', styleName), R('Địa chỉ lô đất', s.siteAddr),
          R('Kích thước lô đất', lot ? fmt(W, 1) + ' × ' + fmt(D, 1) + ' m = ' + fmt(lot, 1) + ' m²' : ''),
          R('Đường trước nhà', s.road ? s.road + ' m' : ''), R('Số mặt tiền', s.fronts),
          R('Hướng mặt tiền', s.facing ? DN[s.facing] + (s.facingDeg ? ' (' + s.facingDeg + ')' : '') + (facingIdx >= 0 ? ' – cung ' + STARS[facingIdx] : '') : ''),
          R('Hiện trạng', s.status), R('Giấy tờ đã có', s.legal.join(', ')), R('Xin phép xây dựng', s.permit),
          R('Quy mô', s.floors + ' tầng' + (s.mezz === 'Có lửng' ? ' + lửng' : '') + (s.tum === 'Có tum' ? ' + tum' : '') + (s.basement !== 'Không' ? ' + ' + s.basement.toLowerCase() : '')),
          R('Kiểu mái', s.roof),
          R('Diện tích xây dựng ước tính/sàn', sxdIn > 0 ? fmt(sxdIn, 1) + ' m²' : (sxd > 0 ? fmt(sxd, 1) + ' m² (tự tính theo mật độ)' : '')),
          R('Diện tích sử dụng ước tính/sàn', s.sudung ? s.sudung + ' m²' : ''), R('Kích thước xây dựng', s.kichthuoc),
          R('Đua ban công', s.balc + (s.balc === 'Có đua ban công' && s.balcDua ? ' ' + s.balcDua + ' m' : '')),
          R('Cos nền tầng 1 so với sân', s.cos),
          R('Thành viên', s.adults + ' người lớn, ' + s.kids + ' trẻ em, ' + s.elders + ' người cao tuổi'),
          R('Số phòng mong muốn', s.beds + ' phòng ngủ, ' + s.wcs + ' WC, ' + s.cars + ' chỗ để ô tô')
        ].concat(floorRows).concat([
          R('Phòng thờ', s.altar), R('Bếp', s.kitchen), R('Giếng trời', s.well), R('Kinh doanh tầng 1', s.business),
          R('Thang máy', s.lift === 'Có' ? 'Có – ' + s.liftType : s.lift), R('Không gian khác', s.spaces.join(', ')),
          R('Màu sắc yêu cầu', s.colors), R('Mẫu nhà tham khảo', s.refs),
          R('Cửa đi chính', s.doorMain), R('Cửa thông phòng', s.doorRoom), R('Cửa sổ', s.windowT),
          R('Cầu thang bộ', s.stair + '; chiều: ' + s.stairDir.toLowerCase() + '; bản rộng: ' + (s.stairW === 'Kỹ sư đề xuất' ? 'theo phương án' : s.stairW + ' mm')),
          R('Tay vịn cầu thang trong nhà', s.railIn), R('Lan can ngoài trời', s.railOut),
          R('Trần trang trí', s.ceil + (s.ceil !== 'Không làm trần' ? ' – ' + s.ceilScope.toLowerCase() : '')),
          R('Sàn nhà', s.floorMat + (s.floorMat === 'Sàn gạch' ? ' ' + s.tile : '')),
          R('Tường bao / tường ngăn', s.wallOut + ' / ' + s.wallIn), R('Vật liệu khác', s.materials)
        ]) },
        { title: 'III. THÔNG TIN KẾT CẤU', rows: [
          R('Địa chất khu đất', s.soil), R('Phương án móng dự kiến', s.found), R('Công trình lân cận', s.neighbor)
        ] },
        { title: 'IV. THÔNG TIN ĐIỆN NƯỚC', rows: [
          R('Nguồn nước đầu vào', s.waterIn + (s.waterPos ? '; đầu chờ: ' + s.waterPos : '')),
          R('Thoát nước', s.waterOut + (s.drainCos ? '; rãnh thấp hơn cos nhà ' + s.drainCos + ' cm' : '')),
          R('Bể nước ngầm', s.tank), R('Bể phốt', s.septic), R('Cột điện', s.pole),
          R('Điều hòa cục bộ', s.ac.length ? s.ac.join(', ') : 'Không'), R('Điều hòa trung tâm', s.vrv),
          R('Năng lượng mặt trời', s.solar), R('Camera an ninh', s.cam), R('Máy phát điện', s.gen),
          R('Hệ thống khác', s.sys.join(', '))
        ] },
        { title: 'V. NGÂN SÁCH & TIẾN ĐỘ', rows: [
          R('Tổng mức đầu tư tối đa', s.budget + ' (gồm cửa, thiết bị, sơn; chưa gồm nội thất)'),
          R('Gói dịch vụ', s.pkg + (s.pkg === 'Trọn gói chìa khóa trao tay' ? ' – hoàn thiện ' + s.level.toLowerCase() : '')),
          R('Thời điểm khởi công', s.start), R('Ngày dự kiến động thổ', dmy(s.dongtho)),
          R('Diện tích sàn tính tiền (sơ bộ)', sxd > 0 ? est.area : ''),
          R('Dự toán sơ bộ', sxd > 0 ? est.total + ' (đơn giá ' + est.price + ', tham khảo)' : '')
        ] },
        { title: 'VI. TỔNG MẶT BẰNG & GHI CHÚ', rows: [
          R('Mô tả tổng mặt bằng', s.siteNote), R('Tệp đính kèm', s.files.join(', ')),
          R('Ghi chú thêm', s.notes), R('Liên hệ qua', s.contact + ' – ' + s.time.toLowerCase())
        ] }
      ]
    };

    return {
      f: s, on: on, steps: steps, code: code, err: s.err, hasErr: !!s.err,
      submitted: s.submitted, form: !s.submitted && !s.preview, preview: !s.submitted && s.preview,
      doc: doc, notice: s.notice, hasNotice: !!s.notice, mailNote: s.email ? ', bản sao gửi về ' + s.email : '',
      s0: s.step === 0, s1: s.step === 1, s2: s.step === 2, s3: s.step === 3, s4: s.step === 4, s5: s.step === 5, s6: s.step === 6,
      isFirst: s.step === 0, notFirst: s.step > 0, isLast: s.step === 6, notLast: s.step < 6,
      prev: function () { set({ step: Math.max(0, s.step - 1), err: '' }); },
      next: function () { set({ step: Math.min(6, s.step + 1), err: '' }); },
      openPreview: function () {
        if (!s.name.trim() || !s.phone.trim()) { set({ err: 'Vui lòng nhập họ tên và số điện thoại ở bước 1.' }); return; }
        if (!s.agree) { set({ err: 'Vui lòng tích đồng ý cho phép xử lý thông tin để kỹ sư liên hệ tư vấn.' }); return; }
        set({ preview: true, err: '', notice: '' });
      },
      closePreview: function () { set({ preview: false, notice: '' }); },
      downloadWord: function () { set({ notice: 'Bản thiết kế trên canvas không tải file được – nút này hoạt động ở bản form triển khai.' }); },
      submit: function () { set({ submitted: true, preview: false, notice: '' }); },
      edit: function () { set({ submitted: false, preview: false, step: 0 }); },
      toggleAgree: function () { set({ agree: !s.agree, err: '' }); },
      onFiles: function (e) { var fl = e.target.files ? Array.prototype.map.call(e.target.files, function (x) { return x.name; }) : []; set({ files: fl }); },
      fileText: s.files.length ? 'Đã chọn ' + s.files.length + ' tệp: ' + s.files.join(', ') : 'Ảnh (JPG, PNG) hoặc PDF – có thể chọn nhiều tệp',

      concernChips: many('concerns', ['Chi phí', 'Thẩm mỹ', 'Phong thủy', 'Nhu cầu sử dụng']),
      genderChips: one('gender', [{ v: 'nam', label: 'Nam' }, { v: 'nu', label: 'Nữ' }]),
      gender2Chips: one('gender2', [{ v: 'nam', label: 'Nam' }, { v: 'nu', label: 'Nữ' }]),
      yearChips: one('buildYear', ['2026', '2027', '2028'].map(function (y) { return { v: y, label: 'Năm ' + y, sub: canChiOf(parseInt(y, 10)) }; })),
      typeChips: one('type', ['Nhà phố', 'Nhà ống', 'Shophouse', 'Biệt thự', 'Nhà vườn', 'Nhà cấp 4', 'Lâu đài', 'Khác']),
      frontChips: one('fronts', ['1 mặt tiền', '2 mặt tiền (lô góc)', '3 mặt thoáng']),
      facingChips: one('facing', facingChips),
      facingHint: facingHint,
      statusChips: one('status', ['Đất trống', 'Có nhà cũ cần phá dỡ', 'Cải tạo / nâng tầng']),
      legalChips: many('legal', ['Sổ đỏ / sổ hồng', 'Thông tin quy hoạch', 'Giấy phép xây dựng']),
      permitChips: one('permit', ['Cần xin phép – nhờ công ty làm hồ sơ', 'Cần xin phép – tự làm', 'Không cần / chưa rõ']),
      floorChips: one('floors', [1, 2, 3, 4, 5, 6].map(function (n) { return { v: n, label: n + ' tầng' }; })),
      mezzChips: one('mezz', ['Không lửng', 'Có lửng']),
      tumChips: one('tum', ['Có tum', 'Không tum']),
      basementChips: one('basement', ['Không', 'Bán hầm', 'Hầm']),
      roofChips: one('roof', ['Mái bằng BTCT', 'Mái Thái (BTCT dán ngói)', 'Mái Nhật (kèo thép lợp ngói)', 'Mái tôn']),
      sxdPh: lot > 0 ? 'Tự tính: ' + fmt(lot * cov, 1) : 'VD: 85',
      balcChips: one('balc', ['Không đua', 'Có đua ban công']), hasBalc: s.balc === 'Có đua ban công',
      cosChips: one('cos', [{ v: '1 bậc', label: '1 bậc', sub: '~15 cm' }, { v: '3 bậc', label: '3 bậc', sub: '~45 cm' }, { v: '5 bậc', label: '5 bậc', sub: '~75 cm' }, { v: 'Khác', label: 'Khác', sub: 'theo khảo sát' }]),
      counters: [ctr('adults', 'Người lớn', 'Kể cả vợ chồng'), ctr('kids', 'Trẻ em', 'Dưới 18 tuổi'), ctr('elders', 'Người cao tuổi', 'Ông bà ở cùng'), ctr('beds', 'Phòng ngủ', 'Mong muốn'), ctr('wcs', 'WC', 'Mong muốn'), ctr('cars', 'Chỗ để ô tô', 'Trong nhà')],
      roomHint: roomHint, floorsList: floorsList,
      altarChips: one('altar', ['Tầng trên cùng', 'Phòng thờ riêng', 'Kết hợp phòng khách', 'Không cần']),
      kitchenChips: one('kitchen', ['Bếp mở liên thông phòng khách', 'Bếp kín riêng', 'Bếp có đảo']),
      wellChips: one('well', ['Có giếng trời', 'Không', 'Kỹ sư đề xuất']),
      bizChips: one('business', ['Không', 'Cho thuê mặt bằng', 'Tự kinh doanh']),
      liftChips: one('lift', ['Không', 'Có', 'Để chờ hố thang']), hasLift: s.lift === 'Có',
      liftTypeChips: one('liftType', ['Có phòng máy', 'Không phòng máy (MRL)', 'Thủy lực', 'Kỹ sư đề xuất']),
      spaceChips: many('spaces', ['Phòng làm việc', 'Phòng gym', 'Phòng giải trí / karaoke', 'Phòng giúp việc', 'Sân vườn', 'Hồ bơi', 'Ban công trồng cây', 'Kho']),
      styles: styles, colorHint: colorHint,
      doorMainChips: one('doorMain', ['Cửa gỗ', 'Thép vân gỗ', 'Nhôm hệ', 'Kính cường lực', 'Khác']),
      doorRoomChips: one('doorRoom', ['Cửa gỗ', 'Nhựa lõi thép', 'Nhôm hệ', 'Nhựa vân gỗ', 'Khác']),
      windowChips: one('windowT', ['Cửa gỗ', 'Thép vân gỗ', 'Nhôm hệ', 'Khác']),
      stairChips: one('stair', ['Bản trượt vuông có chiếu nghỉ', 'Bản cong lượn', 'Bản trượt áp sát tường', 'Khác']),
      stairDirChips: one('stairDir', ['Xuôi kim đồng hồ', 'Ngược kim đồng hồ', 'Kỹ sư đề xuất']),
      stairWChips: one('stairW', [{ v: '900', label: '900' }, { v: '1000', label: '1000' }, { v: '1100', label: '1100' }, { v: '1200', label: '1200' }, { v: 'Kỹ sư đề xuất', label: 'Theo P/A' }]),
      railInChips: one('railIn', ['Gỗ – kính', 'Lan can sắt', 'Gỗ con tiện', 'Sắt nghệ thuật', 'Khác']),
      railOutChips: one('railOut', ['Inox', 'Inox – kính', 'Sắt nghệ thuật', 'Thép / gang đúc', 'Khác']),
      ceilChips: one('ceil', ['Trần thạch cao', 'Trần gỗ', 'Trần BT đắp phào chỉ', 'Không làm trần']), hasCeil: s.ceil !== 'Không làm trần',
      ceilScopeChips: one('ceilScope', ['Phòng khách', 'Toàn nhà']),
      floorMatChips: one('floorMat', ['Sàn gạch', 'Sàn gỗ', 'Sàn nhựa SPC']), isTile: s.floorMat === 'Sàn gạch',
      tileChips: one('tile', ['600×600 mm', '800×800 mm', '600×1200 mm', 'Khác']),
      wallOutChips: one('wallOut', ['220 mm', '110 mm', 'Khác']),
      wallInChips: one('wallIn', ['220 mm', '110 mm', 'Khác']),
      soilChips: one('soil', ['Đất liền thổ', 'Đất ruộng', 'Đất ao lấp', 'Đất đồi', 'Chưa rõ']),
      foundChips: one('found', ['Móng đơn', 'Móng băng', 'Móng ép cọc BTCT', 'Móng cọc khoan nhồi', 'Kỹ sư đề xuất']),
      waterInChips: one('waterIn', ['Nước máy', 'Nước máy + giếng khoan', 'Giếng khoan']),
      waterOutChips: one('waterOut', ['Trước nhà', 'Sau nhà', 'Hông nhà']),
      tankChips: one('tank', ['Có – trước nhà', 'Có – sau nhà', 'Có – vị trí khác', 'Không']),
      septicChips: one('septic', ['Trong nhà', 'Ngoài nhà', 'Tận dụng bể cũ', 'Kỹ sư đề xuất']),
      poleChips: one('pole', ['Trước nhà', 'Hông nhà', 'Sau nhà', 'Khác']),
      acChips: many('ac', ['Phòng ngủ', 'Phòng khách', 'Phòng bếp', 'Để chờ tất cả các phòng']),
      vrvChips: one('vrv', ['Có', 'Không']),
      solarChips: one('solar', ['Có', 'Để chờ', 'Không']),
      camChips: one('cam', ['Camera IP', 'Camera Analog', 'Không']),
      genChips: one('gen', ['Có', 'Không']),
      sysChips: many('sys', ['Chuông cổng', 'Cáp quang internet + truyền hình', 'Chống sét', 'Khóa cửa thông minh', 'Nhà thông minh (smarthome)']),
      budgetChips: one('budget', BUDGETS.map(function (b) { return b[0]; })),
      pkgChips: one('pkg', ['Chỉ thiết kế', 'Thiết kế + thi công phần thô', 'Trọn gói chìa khóa trao tay']),
      showLevel: s.pkg === 'Trọn gói chìa khóa trao tay',
      levelChips: one('level', [{ v: 'Cơ bản', label: 'Cơ bản', sub: fmt(levelPrice['Cơ bản'], 1) + ' tr/m²' }, { v: 'Khá', label: 'Khá', sub: fmt(levelPrice['Khá'], 1) + ' tr/m²' }, { v: 'Cao cấp', label: 'Cao cấp', sub: fmt(levelPrice['Cao cấp'], 1) + ' tr/m²' }]),
      startChips: one('start', ['Trong 3 tháng', '3 – 6 tháng', '6 – 12 tháng', 'Chưa xác định']),
      contactChips: one('contact', ['Gọi điện', 'Zalo', 'Email']),
      timeChips: one('time', ['Giờ hành chính', 'Buổi tối', 'Cuối tuần']),
      techNotes: tn,

      fs: fs || { goodDirs: [] }, hasFs: !!fs, noFs: !fs, hasFs2: !!(fs && fs2), coupleText: coupleText,
      hasFacing: facingIdx >= 0, facingText: facingText, facingCls: facingCls,
      est: est, hasLot: sxd > 0, noLot: !(sxd > 0),
      process: [
        { n: 1, t: 'Kỹ sư gọi lại tư vấn, xem tuổi và hướng chi tiết.' },
        { n: 2, t: 'Khảo sát hiện trạng, đo đạc lô đất, kiểm tra quy hoạch và địa chất.' },
        { n: 3, t: 'Lên phương án mặt bằng công năng và phối cảnh 3D.' },
        { n: 4, t: 'Triển khai hồ sơ kiến trúc – kết cấu – điện nước, hồ sơ xin phép.' },
        { n: 5, t: 'Dự toán chi tiết theo BOQ, ký hợp đồng thi công trọn gói.' }
      ]
    };
  }
}
