import { useState, useRef, useEffect, useCallback } from 'react';
import { getPerspectivesForStyle, type StyleSlide } from '../domain/stylePerspectives';

interface StylePerspectivesSliderProps {
  styleId: string;
  savedRef?: string;
  onSaveRef?: (refText: string) => void;
}

export function StylePerspectivesSlider({
  styleId,
  savedRef = '',
  onSaveRef
}: StylePerspectivesSliderProps) {
  const data = getPerspectivesForStyle(styleId);
  const [activeIndex, setActiveIndex] = useState(0);
  const [justSavedId, setJustSavedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Khi người dùng chọn phong cách khác, reset về ảnh đầu tiên
  useEffect(() => {
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [styleId]);

  const scrollToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('.style-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cards = container.querySelectorAll<HTMLElement>('.style-card');
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
    const nextIdx = (activeIndex + 1) % data.slides.length;
    scrollToSlide(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + data.slides.length) % data.slides.length;
    scrollToSlide(prevIdx);
  };

  const handleSaveIdea = (slide: StyleSlide) => {
    if (!onSaveRef) return;
    const note = `Phong cách ${data.name} - ${slide.angle}: "${slide.title}"`;
    onSaveRef(note);
    setJustSavedId(slide.id);
    setTimeout(() => {
      setJustSavedId(null);
    }, 2500);
  };

  const pinterestUrl = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(data.pinterestQuery)}`;

  return (
    <div style={{
      background: '#FAFAF8',
      border: '1px solid var(--line)',
      borderRadius: 16,
      padding: '16px 14px',
      margin: '12px 0 16px',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      {/* Tiêu đề & Giới thiệu phong cách */}
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
            <span>🎨</span>
            <span>Phối cảnh đặc trưng: <strong>{data.name}</strong></span>
          </h4>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.4 }}>
            {data.summary}
          </p>
        </div>

        {/* Nút xem Pinterest */}
        <a
          href={pinterestUrl}
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
          <span>Xem 100+ mẫu trên Pinterest ↗</span>
        </a>
      </div>

      {/* Thanh chọn nhanh góc phối cảnh */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        padding: '2px 0 10px',
        WebkitOverflowScrolling: 'touch'
      }}>
        {data.slides.map((s, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToSlide(idx)}
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
              {s.angle}
            </button>
          );
        })}
      </div>

      {/* Khung Slider chứa các slide (Vuốt ngang hai bên) */}
      <div style={{ position: 'relative' }}>
        {data.slides.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Xem góc trước"
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

        {data.slides.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Xem góc tiếp theo"
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
          {data.slides.map((slide, idx) => {
            const isSaved = savedRef.includes(slide.title) || justSavedId === slide.id;

            return (
              <div
                key={slide.id}
                className="style-card"
                style={{
                  flex: '0 0 calc(100% - 16px)',
                  maxWidth: 380,
                  scrollSnapAlign: 'center',
                  background: '#FFFFFF',
                  borderRadius: 14,
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  background: '#E9E7E2',
                  overflow: 'hidden'
                }}>
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
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
                    borderRadius: 6,
                    letterSpacing: 0.2
                  }}>
                    {slide.angle}
                  </span>

                  <span style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(4px)',
                    color: 'var(--ink)',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 6
                  }}>
                    {slide.tag}
                  </span>
                </div>

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
                      {slide.title}
                    </h5>
                    <p style={{
                      margin: '0 0 10px',
                      fontSize: 12,
                      color: 'var(--muted)',
                      lineHeight: 1.4
                    }}>
                      {slide.desc}
                    </p>
                  </div>

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
                      onClick={() => handleSaveIdea(slide)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        border: isSaved ? '1px solid #A3CFBB' : '1px solid var(--accent)',
                        background: isSaved ? '#EBF5F0' : '#FFFFFF',
                        color: isSaved ? '#1E5A4C' : 'var(--accent)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{isSaved ? '✓' : '⭐'}</span>
                      <span>{isSaved ? 'Đã lưu vào mẫu yêu thích' : 'Lưu góc này vào ý tưởng'}</span>
                    </button>

                    <a
                      href={slide.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 12,
                        color: 'var(--muted)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                      title="Xem ảnh phóng to độ phân giải cao"
                    >
                      <span>🔍</span>
                      <span>Phóng to</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chấm chỉ báo slide */}
      {data.slides.length > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
          marginTop: 10
        }}>
          {data.slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToSlide(dotIdx)}
              aria-label={`Chuyển tới ảnh ${dotIdx + 1}`}
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
        👉 Vuốt ngang sang hai bên để xem các góc mặt tiền, ban đêm và chi tiết phong cách {data.name}.
      </p>
    </div>
  );
}
