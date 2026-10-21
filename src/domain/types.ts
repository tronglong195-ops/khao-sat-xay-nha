export type Gender = 'nam' | 'nu';
export type DirCode = 'B' | 'DB' | 'D' | 'DN' | 'N' | 'TN' | 'T' | 'TB';

/** Toàn bộ dữ liệu khách điền (không gồm tệp đính kèm). */
export interface FormState {
  // Bước 1
  name: string;
  phone: string;
  zalo: string;
  email: string;
  addr: string;
  dob: string;
  concerns: string[];
  year: string;
  gender: Gender;
  year2: string;
  gender2: Gender;
  buildYear: string;
  // Bước 2
  siteAddr: string;
  type: string;
  w: string;
  d: string;
  road: string;
  fronts: string;
  facing: DirCode | '';
  facingDeg: string;
  status: string;
  legal: string[];
  permit: string;
  // Bước 3
  floors: number;
  mezz: string;
  tum: string;
  basement: string;
  roof: string;
  sxdIn: string;
  sudung: string;
  kichthuoc: string;
  balc: string;
  balcDua: string;
  cos: string;
  adults: number;
  kids: number;
  elders: number;
  beds: number;
  wcs: number;
  cars: number;
  floorRooms: Record<string, string[]>;
  floorNote: Record<string, string>;
  floorH: Record<string, string>;
  altar: string;
  kitchen: string;
  well: string;
  business: string;
  lift: string;
  liftType: string;
  spaces: string[];
  // Bước 4
  style: string;
  colors: string;
  refs: string;
  materials: string;
  doorMain: string;
  doorRoom: string;
  windowT: string;
  stair: string;
  stairDir: string;
  stairW: string;
  railIn: string;
  railOut: string;
  ceil: string;
  ceilScope: string;
  floorMat: string;
  tile: string;
  wallOut: string;
  wallIn: string;
  // Bước 5
  soil: string;
  found: string;
  neighbor: string;
  waterIn: string;
  waterPos: string;
  waterOut: string;
  drainCos: string;
  tank: string;
  septic: string;
  pole: string;
  ac: string[];
  vrv: string;
  solar: string;
  cam: string;
  gen: string;
  sys: string[];
  // Bước 6
  budget: string;
  pkg: string;
  level: string;
  start: string;
  dongtho: string;
  // Bước 7
  siteNote: string;
  contact: string;
  time: string;
  notes: string;
  agree: boolean;
}

export interface DocRow {
  k: string;
  v: string;
}
export interface DocSection {
  title: string;
  rows: DocRow[];
}
/** Nội dung phiếu — dùng chung cho xem trước, file Word, Firestore và email. */
export interface FormDocument {
  code: string;
  fileName: string;
  dateLine: string;
  sections: DocSection[];
}

export type LeadStatus = 'moi' | 'da_lien_he' | 'hen_khao_sat' | 'da_khao_sat' | 'bao_gia' | 'ky_hd' | 'tu_choi';
