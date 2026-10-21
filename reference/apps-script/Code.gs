/**
 * NHẬN PHIẾU KHẢO SÁT → Google Sheet + Google Drive + Email kèm file Word
 * Dán toàn bộ file này vào: Google Sheet > Tiện ích mở rộng > Apps Script
 * Triển khai: Triển khai > Tùy chọn triển khai mới > Ứng dụng web
 *   - Thực thi với tư cách: Tôi      - Người có quyền truy cập: Bất kỳ ai
 */

// ===== CẤU HÌNH =====
const EMAIL_NHAN   = 'tronglong195@gmail.com';     // email nhận phiếu (thêm nhiều email, cách nhau dấu phẩy)
const TEN_CONG_TY  = '[TÊN CÔNG TY]';
const HOTLINE      = '[SỐ ĐIỆN THOẠI]';
const FOLDER_ID    = '';                            // để trống: tự tạo thư mục "HO SO KHACH HANG KHAO SAT" trong Drive
const SHEET_NAME   = 'KhachHang';
const GUI_BAN_SAO_CHO_KHACH = true;                 // gửi email xác nhận + file Word cho khách (nếu khách nhập email)
const GHI_SHEET    = true;                          // false khi đã dùng Firestore làm nơi lưu chính
const ADMIN_URL    = '';                            // VD: https://<github-user>.github.io/khao-sat-xay-nha/#/admin
const TELEGRAM_BOT_TOKEN = '';                      // Tùy chọn: token Bot Telegram (VD: 123456:ABC-DEF...) để nhận báo ngay
const TELEGRAM_CHAT_ID   = '';                      // Tùy chọn: Chat ID nhận tin (cá nhân hoặc nhóm kỹ sư)

const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.name || !d.phone || !d.docx) throw new Error('Thiếu dữ liệu bắt buộc');

    // 1) Lưu file Word + ảnh vào Drive (mỗi khách 1 thư mục)
    const root = FOLDER_ID ? DriveApp.getFolderById(FOLDER_ID) : layThuMucGoc_();
    const folder = root.createFolder(d.code + ' - ' + d.name);
    const docBlob = Utilities.newBlob(Utilities.base64Decode(d.docx), DOCX_MIME, d.fileName);
    const docFile = folder.createFile(docBlob);
    const fileLinks = (d.files || []).map(function (f) {
      return folder.createFile(Utilities.newBlob(Utilities.base64Decode(f.data), f.type, f.name)).getUrl();
    });

    // 2) Ghi 1 dòng vào Google Sheet (tự thêm cột khi form có trường mới)
    if (GHI_SHEET) ghiSheet_(d, docFile.getUrl(), folder.getUrl(), fileLinks);

    // 3) Email cho kỹ sư, đính kèm file Word
    guiMailKySu_(d, docBlob, folder.getUrl(), fileLinks);

    // 4) Email xác nhận cho khách (kèm bản Word)
    if (GUI_BAN_SAO_CHO_KHACH && d.email && /@/.test(d.email)) guiMailKhach_(d, docBlob);

    // 5) Thông báo Telegram Bot cho kỹ sư (nếu có cấu hình)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        guiTelegramKySu_(d, docFile.getUrl(), folder.getUrl());
      } catch (eTele) {
        console.error('Lỗi gửi Telegram: ' + eTele);
      }
    }

    return json_({ ok: true, code: d.code, folderUrl: folder.getUrl(), docUrl: docFile.getUrl() });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return json_({ ok: true, msg: 'Form khảo sát đang hoạt động' }); }

function ghiSheet_(d, docUrl, folderUrl, fileLinks) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  const record = {
    'Thời gian gửi': new Date(), 'Mã hồ sơ': d.code, 'File Word': docUrl, 'Thư mục hồ sơ': folderUrl,
    'Ảnh / tệp đính kèm': fileLinks.join('\n'), 'Dự toán sơ bộ (web)': d.estimate || '', 'Trạng thái': 'Mới'
  };
  (d.rows || []).forEach(function (r) { record[r[1]] = r[2]; });

  const lastCol = sh.getLastColumn();
  const headers = lastCol ? sh.getRange(1, 1, 1, lastCol).getValues()[0] : [];
  Object.keys(record).forEach(function (k) { if (headers.indexOf(k) < 0) headers.push(k); });
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold').setBackground('#E3EEE9');
  sh.setFrozenRows(1);
  sh.appendRow(headers.map(function (h) { return record[h] !== undefined ? record[h] : ''; }));
}

function guiMailKySu_(d, docBlob, folderUrl, fileLinks) {
  const sdt = String(d.phone).replace(/\D/g, '');
  const rows = (d.rows || []).filter(function (r) { return r[2] && r[2] !== '—'; }).map(function (r) {
    return '<tr><td style="padding:5px 10px;border:1px solid #ddd;color:#555;vertical-align:top">' + esc_(r[1]) +
           '</td><td style="padding:5px 10px;border:1px solid #ddd"><b>' + esc_(r[2]) + '</b></td></tr>';
  }).join('');
  const html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#1B1F1D">' +
    '<h2 style="color:#1E5A4C;margin:0 0 8px">Khách mới – ' + esc_(d.code) + '</h2>' +
    '<p style="font-size:15px;margin:0 0 12px"><b>' + esc_(d.name) + '</b> · ' + esc_(d.type) + ' ' + esc_(d.floors) + ' tầng · NS ' + esc_(d.budget) +
      (d.estimate ? ' · ước tính ' + esc_(d.estimate) : '') + '</p>' +
    '<p style="margin:0 0 16px"><a href="tel:' + sdt + '">📞 Gọi ' + esc_(d.phone) + '</a> &nbsp;·&nbsp; ' +
      '<a href="https://zalo.me/' + sdt + '">💬 Nhắn Zalo cho khách</a> &nbsp;·&nbsp; ' +
      'Khách muốn liên hệ qua <b>' + esc_(d.contact) + '</b> (' + esc_(d.time) + ')</p>' +
    '<p style="margin:0 0 16px">📄 Phiếu Word đính kèm email này · <a href="' + folderUrl + '">Mở thư mục hồ sơ trên Drive</a>' +
      (fileLinks.length ? ' · ' + fileLinks.length + ' ảnh/tệp khách gửi' : '') +
      (ADMIN_URL ? ' · <a href="' + ADMIN_URL + '">Mở trang quản trị</a>' : (GHI_SHEET ? ' · <a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '">Mở Google Sheet</a>' : '')) + '</p>' +
    '<table style="border-collapse:collapse">' + rows + '</table></div>';

  MailApp.sendEmail({
    to: EMAIL_NHAN,
    subject: '[KHÁCH MỚI] ' + d.name + ' – ' + d.type + ' ' + d.floors + ' tầng – NS ' + d.budget + ' – ' + d.code,
    htmlBody: html,
    attachments: [docBlob],
    replyTo: (d.email && /@/.test(d.email)) ? d.email : EMAIL_NHAN,
    name: 'Form khảo sát ' + TEN_CONG_TY
  });
}

function guiMailKhach_(d, docBlob) {
  MailApp.sendEmail({
    to: d.email,
    subject: TEN_CONG_TY + ' đã nhận phiếu thông tin thiết kế – mã ' + d.code,
    htmlBody:
      '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">' +
      '<p>Kính gửi anh/chị <b>' + esc_(d.name) + '</b>,</p>' +
      '<p>' + TEN_CONG_TY + ' đã nhận phiếu thông tin thiết kế nhà của anh/chị (mã hồ sơ <b>' + esc_(d.code) + '</b>). ' +
      'Bản phiếu Word được đính kèm email này để anh/chị lưu lại.</p>' +
      '<p>Kỹ sư phụ trách sẽ liên hệ qua ' + esc_(d.contact) + ' trong thời gian sớm nhất để trao đổi phương án và hẹn lịch khảo sát hiện trạng.</p>' +
      '<p>Trân trọng,<br><b>' + TEN_CONG_TY + '</b><br>Hotline: ' + HOTLINE + '</p></div>',
    attachments: [docBlob],
    name: TEN_CONG_TY,
    replyTo: EMAIL_NHAN.split(',')[0]
  });
}

function guiTelegramKySu_(d, docUrl, folderUrl) {
  const sdt = String(d.phone).replace(/\D/g, '');
  const msg =
    '🔔 *CÓ KHÁCH HÀNG MỚI KHẢO SÁT NHÀ!*\n' +
    '───────────────────\n' +
    '👤 *Khách hàng:* ' + d.name + '\n' +
    '📞 *Điện thoại:* [' + d.phone + '](tel:' + sdt + ') · [Nhắn Zalo](https://zalo.me/' + sdt + ')\n' +
    '📍 *Địa chỉ đất:* ' + (d.siteAddr || 'Chưa nhập') + '\n' +
    '🏠 *Nhu cầu:* ' + d.type + ' ' + d.floors + ' tầng\n' +
    '💰 *Ngân sách:* ' + d.budget + (d.estimate ? ' (Ước tính: ' + d.estimate + ')' : '') + '\n' +
    '⏰ *Liên hệ qua:* ' + d.contact + ' (' + d.time + ')\n' +
    '🔖 *Mã hồ sơ:* `' + d.code + '`\n' +
    '───────────────────\n' +
    '📄 [Mở File Word hồ sơ](' + docUrl + ') | 📁 [Thư mục Drive](' + folderUrl + ')' +
    (ADMIN_URL ? ' | 🛠 [Trang quản trị](' + ADMIN_URL + ')' : '');

  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: msg,
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  };

  UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

function layThuMucGoc_() {
  const name = 'HO SO KHACH HANG KHAO SAT';
  const it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}
function esc_(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>'); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/** Chạy hàm này 1 lần bằng nút ▶ để cấp quyền Gmail/Drive/Sheet và kiểm tra gửi mail. */
function kiemTraCapQuyen() {
  MailApp.sendEmail(EMAIL_NHAN, 'Kiểm tra form khảo sát', 'Apps Script đã được cấp quyền gửi mail. Hạn mức còn lại hôm nay: ' + MailApp.getRemainingDailyQuota());
  layThuMucGoc_();
  SpreadsheetApp.getActiveSpreadsheet();
}
