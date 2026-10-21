import { useMemo, useState } from 'react';
import { CONSTRUCTION_TIPS } from '../domain/constructionTips';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentStep?: number;
}

export function TipsLibraryModal({ isOpen, onClose, currentStep }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [filterStep, setFilterStep] = useState<number | 'all'>('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    CONSTRUCTION_TIPS.forEach((t) => set.add(t.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return CONSTRUCTION_TIPS.filter((t) => {
      if (selectedCat !== 'all' && t.category !== selectedCat) return false;
      if (filterStep !== 'all' && t.step !== filterStep) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, selectedCat, filterStep]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px',
      backdropFilter: 'blur(3px)'
    }}>
      <div style={{
        background: '#FFFFFF',
        width: '100%',
        maxWidth: 780,
        maxHeight: '90vh',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FAF9F6'
        }}>
          <div>
            <h2 style={{ fontSize: 18, color: 'var(--ink)', margin: 0 }}>
              📚 Cẩm nang 220 Lưu ý kỹ thuật xây nhà
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>
              Kinh nghiệm thực chiến từ kỹ sư xây dựng giúp chủ nhà tránh rủi ro lún nứt, thấm dột và phát sinh
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '1px solid var(--line)',
              background: '#FFFFFF',
              cursor: 'pointer',
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink)'
            }}
            aria-label="Đóng"
          >
            ×
          </button>
        </div>

        {/* Toolbar: Tìm kiếm và lọc */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <input
              type="search"
              className="in"
              style={{ flex: '1 1 240px', minHeight: 38, fontSize: 14 }}
              placeholder="🔍 Tìm kiếm lưu ý (VD: cọc, bê tông, chống thấm, ngập, bể phốt...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {currentStep !== undefined && (
              <button
                type="button"
                className="btn ghost sm"
                style={{
                  minHeight: 38,
                  fontSize: 13,
                  borderColor: filterStep === currentStep ? 'var(--accent)' : 'var(--line)',
                  background: filterStep === currentStep ? 'var(--accent-soft)' : 'transparent',
                  color: filterStep === currentStep ? 'var(--accent)' : 'var(--ink)'
                }}
                onClick={() => setFilterStep(filterStep === currentStep ? 'all' : currentStep)}
              >
                📍 Lọc theo Bước {currentStep + 1} hiện tại
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
            <button
              type="button"
              onClick={() => setSelectedCat('all')}
              style={{
                padding: '4px 10px',
                borderRadius: 999,
                fontSize: 12,
                border: selectedCat === 'all' ? '1px solid var(--accent)' : '1px solid var(--line)',
                background: selectedCat === 'all' ? 'var(--accent)' : '#FFF',
                color: selectedCat === 'all' ? '#FFF' : 'var(--ink)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Tất cả ({CONSTRUCTION_TIPS.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 12,
                  border: selectedCat === cat ? '1px solid var(--accent)' : '1px solid var(--line)',
                  background: selectedCat === cat ? 'var(--accent)' : '#FFF',
                  color: selectedCat === cat ? '#FFF' : 'var(--ink)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content list */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--muted)' }}>
              Không tìm thấy lưu ý kỹ thuật nào phù hợp với từ khóa "{search}".
            </div>
          ) : (
            filtered.map((tip) => (
              <div
                key={tip.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  background: tip.tag === 'Quan trọng' ? '#FDF8F5' : '#FAFAF8',
                  borderLeft: tip.tag === 'Quan trọng' ? '4px solid #D84315' : '4px solid var(--accent)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', background: '#EAE8E2', padding: '2px 6px', borderRadius: 4 }}>
                      #{tip.id}
                    </span>
                    <strong style={{ fontSize: 14, color: 'var(--ink)' }}>{tip.title}</strong>
                  </div>
                  {tip.tag && (
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: tip.tag === 'Quan trọng' ? '#FCEBE3' : '#E3EEE9',
                      color: tip.tag === 'Quan trọng' ? '#8A3F0C' : '#1E5A4C'
                    }}>
                      {tip.tag}
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                  {tip.content}
                </p>
                <div style={{ marginTop: 6, fontSize: 11, color: 'var(--muted)' }}>
                  📁 {tip.category} · Bước {tip.step + 1}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#FAF9F6',
          fontSize: 13,
          color: 'var(--muted)'
        }}>
          <span>Hiển thị {filtered.length}/{CONSTRUCTION_TIPS.length} lưu ý</span>
          <button type="button" className="btn sm" onClick={onClose}>
            Đóng cẩm nang
          </button>
        </div>
      </div>
    </div>
  );
}
