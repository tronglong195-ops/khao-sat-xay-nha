import { useState, useRef, useCallback } from 'react';
import { MATERIAL_SHOWCASE, type MaterialItem } from '../domain/materialShowcase';

interface MaterialShowcaseSliderProps {
  currentMaterials?: string;
  onAddMaterial?: (matName: string) => void;
}

export function MaterialShowcaseSlider({
  currentMaterials = '',
  onAddMaterial
}: MaterialShowcaseSliderProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lọc vật liệu theo nhóm nếu cần
  const filteredItems = filterCategory === 'all'
    ? MATERIAL_SHOWCASE
    : MATERIAL_SHOWCASE.filter((m) => m.category.includes(filterCategory));

  const scrollToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('.material-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cards = container.querySelectorAll<HTMLElement>('.material-card');
    if (cards.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;
    const containerCenter = scrollLeft + container.clientWidth / 2;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % filteredItems.length;
    scrollToSlide(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
    scrollToSlide(prevIdx);
  };

  const handleToggle = (item: MaterialItem) => {
    if (!onAddMaterial) return;
    onAddMaterial(item.name);
  };

  return (
    <div style={{
      background: '#FAFAF8',
      border: '1px solid var(--line)',
      borderRadius: 16,
      padding: '16px 14px',
      margin: '14px 0 16px',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      {/* Tiêu đề mục vật liệu */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10
      }}>
        <div>
          <h4 style={{
            margin: '0 0 4px',
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <span>🧱</span>
            <span>Bộ sưu tập vật liệu hoàn thiện thịnh hành</span>
          </h4>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.4 }}>
            Hình ảnh ứng dụng thực tế các vật liệu hoàn thiện cao cấp: đá tự nhiên, nhôm kính Low-E, gỗ nhựa, gạch khổ lớn...
          </p>
        </div>

        {/* Nút tìm ý tưởng vật liệu trên Pinterest */}
        <a
          href="https://www.pinterest.com/search/pins/?q=v%E1%BA%ADt%20li%E1%BB%87u%20ho%C3%A0n%20thi%E1%BB%87n%20nh%C3%A0%20ph%E1%BB%91%20bi%E1%BB%87t%20th%E1%BB%B1%20hi%E1%BB%87n%20%C4%91%E1%BA%A1i"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#E60023',
            background: '#FDF0F2',
            border: '1px solid #F9CFD5',
            borderRadius: 20,
            padding: '5px 12px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            whiteSpace: 'nowrap'
          }}
        >
          <span>📌</span>
          <span>Xem vật liệu trên Pinterest ↗</span>
        </a>
      </div>

      {/* Lọc nhanh danh mục vật liệu */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        padding: '2px 0 10px',
        WebkitOverflowScrolling: 'touch'
      }}>
        {[
          { id: 'all', label: 'Tất cả (8)' },
          { id: 'Mặt tiền', label: 'Mặt tiền & Cột' },
          { id: 'Cửa', label: 'Cửa nhôm kính' },
          { id: 'Ban công', label: 'Gỗ nhựa & Lam' },
          { id: 'Sàn', label: 'Gạch khổ lớn' },
          { id: 'Trần', label: 'Trần thạch cao' }
        ].map((tab) => {
          const isSelected = filterCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setFilterCategory(tab.id);
                setActiveIndex(0);
                if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }}
              style={{
                fontSize: 12,
                fontWeight: isSelected ? 700 : 500,
                padding: '5px 12px',
                borderRadius: 999,
                border: isSelected ? '1px solid var(--accent)' : '1px solid var(--line)',
                background: isSelected ? 'var(--accent)' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : 'var(--ink)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Slider vuốt ngang các thẻ vật liệu */}
      <div style={{ position: 'relative' }}>
        {filteredItems.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Vật liệu trước"
            style={{
              position: 'absolute',
              left: 4,
              top: '40%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.92)',
              border: '1px solid var(--line)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--ink)',
              fontSize: 18,
              lineHeight: 1
            }}
          >
            ‹
          </button>
        )}

        {filteredItems.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Vật liệu tiếp theo"
            style={{
              position: 'absolute',
              right: 4,
              top: '40%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.92)',
              border: '1px solid var(--line)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--ink)',
              fontSize: 18,
              lineHeight: 1
            }}
          >
            ›
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            padding: '2px 2px 8px'
          }}
        >
          {filteredItems.map((item, idx) => {
            const isAdded = currentMaterials.toLowerCase().includes(item.name.toLowerCase());

            return (
              <div
                key={item.id}
                className="material-card"
                style={{
                  flex: '0 0 calc(100% - 16px)',
                  maxWidth: 380,
                  scrollSnapAlign: 'center',
                  background: '#FFFFFF',
                  borderRadius: 14,
                  border: isAdded ? '2px solid var(--accent)' : '1px solid var(--line)',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box'
                }}
              >
                {/* Ảnh vật liệu thực tế */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  background: '#E9E7E2',
                  overflow: 'hidden'
                }}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    referrerPolicy="no-referrer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  <span style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'rgba(27, 31, 29, 0.78)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 6
                  }}>
                    {item.category}
                  </span>

                  <span style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(4px)',
                    color: 'var(--ink)',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 6
                  }}>
                    {item.tag}
                  </span>
                </div>

                {/* Nội dung chi tiết */}
                <div style={{
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h5 style={{
                      margin: '0 0 4px',
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--ink)',
                      lineHeight: 1.35
                    }}>
                      {item.name}
                    </h5>
                    <p style={{
                      margin: '0 0 8px',
                      fontSize: 12,
                      color: 'var(--muted)',
                      lineHeight: 1.4
                    }}>
                      {item.desc}
                    </p>
                    <div style={{
                      fontSize: 11.5,
                      color: '#1E5A4C',
                      background: '#EBF5F0',
                      padding: '6px 10px',
                      borderRadius: 6,
                      lineHeight: 1.35,
                      marginBottom: 10
                    }}>
                      💡 <strong>Ưu điểm:</strong> {item.pros}
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    paddingTop: 8,
                    borderTop: '1px dashed var(--line)'
                  }}>
                    <button
                      type="button"
                      onClick={() => handleToggle(item)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        border: isAdded ? '1px solid #A3CFBB' : '1px solid var(--accent)',
                        background: isAdded ? 'var(--accent)' : '#FFFFFF',
                        color: isAdded ? '#FFFFFF' : 'var(--accent)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{isAdded ? '✓' : '+'}</span>
                      <span>{isAdded ? 'Đã thêm vào vật liệu' : 'Chọn vật liệu này'}</span>
                    </button>

                    <a
                      href={`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(item.pinterestQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 12,
                        color: '#E60023',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      <span>📌</span>
                      <span>Pinterest ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chấm chỉ báo */}
      {filteredItems.length > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
          marginTop: 10
        }}>
          {filteredItems.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToSlide(dotIdx)}
              aria-label={`Chuyển tới vật liệu ${dotIdx + 1}`}
              style={{
                width: activeIndex === dotIdx ? 18 : 6,
                height: 6,
                borderRadius: 4,
                background: activeIndex === dotIdx ? 'var(--accent)' : 'var(--line-input)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            />
          ))}
        </div>
      )}

      <p style={{
        margin: '8px 0 0',
        fontSize: 11.5,
        color: 'var(--muted)',
        textAlign: 'center'
      }}>
        👉 Vuốt ngang sang hai bên để khám phá 8 vật liệu hoàn thiện ngoại thất & nội thất cao cấp.
      </p>
    </div>
  );
}
