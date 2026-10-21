// Tạo file Word (.docx) từ nội dung phiếu — khổ A4, lề trái 30 mm, phải/trên/dưới 20 mm (NĐ 30/2020/NĐ-CP).
import {
  AlignmentType, BorderStyle, Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType
} from 'docx';
import { COMPANY } from '../config/company';
import type { FormDocument } from '../domain/types';

const FONT = 'Times New Roman';
const mm = (x: number) => Math.round(x * 56.7);
const PAGE_W = 11906, PAGE_H = 16838, ML = mm(30), MR = mm(20);
const CONTENT_W = PAGE_W - ML - MR;
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };
const LINE = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const BORDERS = { top: LINE, bottom: LINE, left: LINE, right: LINE, insideHorizontal: LINE, insideVertical: LINE };

interface TextOpts {
  size?: number;
  bold?: boolean;
  italics?: boolean;
  align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  before?: number;
  after?: number;
  line?: number;
}

function runs(text: string, o: TextOpts = {}) {
  return String(text ?? '').split('\n').map((line, i) => new TextRun({
    text: line, break: i ? 1 : undefined, font: FONT, size: o.size || 26, bold: o.bold, italics: o.italics
  }));
}
function P(text: string, o: TextOpts = {}) {
  return new Paragraph({
    alignment: o.align || AlignmentType.LEFT,
    spacing: { before: o.before || 0, after: o.after || 0, line: o.line || 276 },
    children: runs(text, o)
  });
}
function cell(children: Paragraph | Paragraph[], width: number) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: Array.isArray(children) ? children : [children]
  });
}

export function buildDocx(doc: FormDocument, ownerName: string): Document {
  const C1 = Math.round(CONTENT_W * 0.34), C2 = CONTENT_W - C1;
  const half = Math.round(CONTENT_W / 2);

  const header = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [half, CONTENT_W - half], borders: NO_BORDERS,
    rows: [new TableRow({ children: [
      cell([P(COMPANY.name, { bold: true, size: 24 }), P(COMPANY.tagline, { size: 22 }), P('Hotline: ' + COMPANY.hotline, { size: 22 })], half),
      cell([P('Mã hồ sơ: ' + doc.code, { size: 22, align: AlignmentType.RIGHT, bold: true }), P(doc.dateLine, { size: 22, italics: true, align: AlignmentType.RIGHT })], CONTENT_W - half)
    ] })]
  });

  const body: (Paragraph | Table)[] = [header,
    P('PHIẾU THÔNG TIN THIẾT KẾ NHÀ', { bold: true, size: 30, align: AlignmentType.CENTER, before: 360 }),
    P('(Gia chủ cung cấp làm cơ sở lập phương án thiết kế – thi công)', { italics: true, size: 24, align: AlignmentType.CENTER, after: 200 })
  ];

  doc.sections.forEach((sec) => {
    body.push(P(sec.title, { bold: true, before: 240, after: 80 }));
    body.push(new Table({
      width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [C1, C2], borders: BORDERS,
      rows: sec.rows.map((r) => new TableRow({ cantSplit: true, children: [cell(P(r.k, { size: 24 }), C1), cell(P(r.v, { size: 24 }), C2)] }))
    }));
  });

  body.push(P('', { before: 360 }));
  body.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [half, CONTENT_W - half], borders: NO_BORDERS,
    rows: [new TableRow({ children: [
      cell([P('CHỦ NHÀ', { bold: true, align: AlignmentType.CENTER }), P('(Ký, ghi rõ họ tên)', { italics: true, size: 24, align: AlignmentType.CENTER, after: 1200 }), P(ownerName || '', { bold: true, align: AlignmentType.CENTER })], half),
      cell([P('ĐẠI DIỆN ' + COMPANY.name, { bold: true, align: AlignmentType.CENTER }), P('(Ký, ghi rõ họ tên)', { italics: true, size: 24, align: AlignmentType.CENTER })], CONTENT_W - half)
    ] })]
  }));

  return new Document({
    creator: COMPANY.name, title: 'Phiếu thông tin thiết kế nhà – ' + doc.code,
    styles: { default: { document: { run: { font: FONT, size: 26 } } } },
    sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: mm(20), bottom: mm(20), left: ML, right: MR } } }, children: body }]
  });
}

export const docxToBlob = (d: Document) => Packer.toBlob(d);
export const docxToBase64 = (d: Document) => Packer.toBase64String(d);
