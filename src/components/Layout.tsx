import type { ReactNode } from 'react';
import { COMPANY } from '../config/company';

export function Header() {
  return (
    <header className="hdr">
      <div className="wrap">
        <a className="brand" href="#/">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <path d="M4 18 18 6l14 12" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 15v15h18V15" stroke="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M15 30v-8h6v8" stroke="#9FCBBB" strokeWidth="2.2" strokeLinejoin="round" />
          </svg>
          <span>
            <span className="brand-n">{COMPANY.name}</span>
            <span className="brand-t">{COMPANY.tagline}</span>
          </span>
        </a>
        <a className="hotline" href={'tel:' + (COMPANY.hotlineDigits || '')}>Hotline {COMPANY.hotline}</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <span>© {COMPANY.name} · {COMPANY.address}</span>
        <span>Kết quả phong thủy và dự toán trên trang mang tính tham khảo.</span>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
