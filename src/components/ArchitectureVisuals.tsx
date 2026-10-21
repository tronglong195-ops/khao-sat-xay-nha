/** Icon SVG trực quan cho kiểu mái */
export function RoofIcon({ type }: { type: string }) {
  if (type.includes('Mái bằng')) {
    return (
      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="3" y="10" width="34" height="4" rx="1" fill="currentColor" fillOpacity="0.15" />
        <line x1="8" y1="14" x2="8" y2="24" />
        <line x1="32" y1="14" x2="32" y2="24" />
        <line x1="16" y1="6" x2="16" y2="10" strokeDasharray="2 2" />
        <rect x="14" y="3" width="8" height="4" rx="1" />
      </svg>
    );
  }
  if (type.includes('Mái Thái')) {
    return (
      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M20 3L4 16H36L20 3Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M20 3L20 16" strokeDasharray="2 2" opacity="0.6" />
        <line x1="8" y1="16" x2="8" y2="25" />
        <line x1="32" y1="16" x2="32" y2="25" />
      </svg>
    );
  }
  if (type.includes('Mái Nhật')) {
    return (
      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M12 5H28L38 15H2L12 5Z" fill="currentColor" fillOpacity="0.15" />
        <line x1="7" y1="15" x2="7" y2="25" />
        <line x1="33" y1="15" x2="33" y2="25" />
      </svg>
    );
  }
  // Mái tôn
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M3 11L37 7" strokeWidth="2.5" />
      <path d="M4 11C6 10 8 12 10 11C12 10 14 12 16 11C18 10 20 12 22 11C24 10 26 12 28 11C30 10 32 12 34 11" opacity="0.7" />
      <line x1="8" y1="12" x2="8" y2="25" />
      <line x1="32" y1="9" x2="32" y2="25" />
    </svg>
  );
}

/** Icon SVG trực quan cho phương án móng */
export function FoundationIcon({ type }: { type: string }) {
  if (type.includes('đơn')) {
    return (
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="2" x2="18" y2="16" strokeWidth="3" />
        <path d="M10 24L14 16H22L26 24H10Z" fill="currentColor" fillOpacity="0.2" />
        <line x1="4" y1="26" x2="32" y2="26" strokeWidth="2" strokeDasharray="3 2" />
      </svg>
    );
  }
  if (type.includes('băng')) {
    return (
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="10" y1="2" x2="10" y2="16" strokeWidth="2.5" />
        <line x1="26" y1="2" x2="26" y2="16" strokeWidth="2.5" />
        <rect x="4" y="16" width="28" height="8" rx="1" fill="currentColor" fillOpacity="0.2" />
        <line x1="2" y1="26" x2="34" y2="26" strokeWidth="2" strokeDasharray="3 2" />
      </svg>
    );
  }
  if (type.includes('cọc')) {
    return (
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="24" height="6" rx="1" fill="currentColor" fillOpacity="0.2" />
        <path d="M10 10L10 26L12 28L14 26L14 10" fill="currentColor" fillOpacity="0.3" strokeWidth="1.2" />
        <path d="M22 10L22 26L24 28L26 26L26 10" fill="currentColor" fillOpacity="0.3" strokeWidth="1.2" />
        <line x1="2" y1="12" x2="34" y2="12" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    );
  }
  // Kỹ sư đề xuất
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="14" r="10" strokeDasharray="3 3" />
      <path d="M18 9V14L22 16" />
    </svg>
  );
}

/** Component hiển thị giải thích phụ nhỏ gọn bên dưới lựa chọn */
export function TechTip({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>
      💡 {text}
    </p>
  );
}
