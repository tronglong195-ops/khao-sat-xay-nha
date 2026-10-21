import type { FengShui } from '../domain/fengshui';
import { STARS } from '../domain/fengshui';
import type { DirCode } from '../domain/types';

interface CompassProps {
  fs: FengShui | null;
  facing: DirCode | '';
  onSelect: (dir: DirCode) => void;
}

// 8 hướng sắp xếp theo góc độ (0° ở trên cùng = Bắc)
const DIR_ITEMS: { code: DirCode; name: string; deg: number }[] = [
  { code: 'B', name: 'Bắc', deg: 0 },
  { code: 'DB', name: 'Đông Bắc', deg: 45 },
  { code: 'D', name: 'Đông', deg: 90 },
  { code: 'DN', name: 'Đông Nam', deg: 135 },
  { code: 'N', name: 'Nam', deg: 180 },
  { code: 'TN', name: 'Tây Nam', deg: 225 },
  { code: 'T', name: 'Tây', deg: 270 },
  { code: 'TB', name: 'Tây Bắc', deg: 315 }
];

export function FengShuiCompass({ fs, facing, onSelect }: CompassProps) {
  if (!fs) {
    return (
      <div style={{
        padding: '24px 16px',
        textAlign: 'center',
        background: 'var(--accent-soft)',
        borderRadius: 12,
        color: 'var(--ink)'
      }}>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>🧭 La bàn Bát Trạch phong thủy</p>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
          Nhập năm sinh gia chủ ở Bước 1 để hiển thị la bàn định hướng tốt – xấu theo cung mệnh.
        </p>
      </div>
    );
  }

  // Góc xoay của kim la bàn nếu đã chọn hướng
  const activeItem = DIR_ITEMS.find((d) => d.code === facing);
  const needleAngle = activeItem ? activeItem.deg : null;

  return (
    <div style={{
      background: '#FAFAF8',
      border: '1px solid var(--line)',
      borderRadius: 16,
      padding: '20px 16px',
      margin: '16px 0'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 16, color: 'var(--ink)' }}>
          🧭 La bàn Bát Quái — Cung {fs.cung} ({fs.cungHanh}) · {fs.group}
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
          Bấm trực tiếp vào các hướng trên la bàn hoặc chip bên dưới để chọn hướng nhà:
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '8px 0 20px' }}>
        <div style={{ position: 'relative', width: 280, height: 280, maxWidth: '100%' }}>
          {/* Vòng tròn nền Bát quái SVG */}
          <svg viewBox="0 0 280 280" width="100%" height="100%">
            {/* Vòng ngoài */}
            <circle cx="140" cy="140" r="136" fill="white" stroke="var(--line)" strokeWidth="2" />
            <circle cx="140" cy="140" r="128" fill="#F8F6F2" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="140" cy="140" r="82" fill="white" stroke="var(--line)" strokeWidth="1.5" />

            {/* Các đường chia 8 cung */}
            {[0, 45, 90, 135].map((angle) => (
              <line
                key={angle}
                x1={140 + 82 * Math.sin((angle * Math.PI) / 180)}
                y1={140 - 82 * Math.cos((angle * Math.PI) / 180)}
                x2={140 + 136 * Math.sin((angle * Math.PI) / 180)}
                y2={140 - 136 * Math.cos((angle * Math.PI) / 180)}
                stroke="var(--line)"
                strokeWidth="1"
              />
            ))}
            {[0, 45, 90, 135].map((angle) => (
              <line
                key={'opp-' + angle}
                x1={140 - 82 * Math.sin((angle * Math.PI) / 180)}
                y1={140 + 82 * Math.cos((angle * Math.PI) / 180)}
                x2={140 - 136 * Math.sin((angle * Math.PI) / 180)}
                y2={140 + 136 * Math.cos((angle * Math.PI) / 180)}
                stroke="var(--line)"
                strokeWidth="1"
              />
            ))}

            {/* Kim la bàn */}
            {needleAngle !== null && (
              <g transform={`rotate(${needleAngle} 140 140)`} style={{ transition: 'transform 0.4s ease' }}>
                {/* Mũi kim màu đỏ trỏ hướng đã chọn */}
                <polygon points="140,55 146,140 134,140" fill="#D32F2F" />
                <polygon points="140,225 146,140 134,140" fill="#9E9E9E" />
                <circle cx="140" cy="140" r="6" fill="#1B1F1D" />
              </g>
            )}

            {/* Tâm la bàn */}
            <circle cx="140" cy="140" r="50" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
            <text x="140" y="132" textAnchor="middle" fontSize="16" fontWeight="bold" fill="var(--ink)">
              {fs.cung}
            </text>
            <text x="140" y="150" textAnchor="middle" fontSize="11" fill="var(--muted)">
              {fs.cungHanh}
            </text>
          </svg>

          {/* 8 Nút bấm tương tác trên vòng la bàn */}
          {DIR_ITEMS.map((item) => {
            const rad = ((item.deg - 90) * Math.PI) / 180;
            const r = 108;
            const cx = 140 + r * Math.cos(rad);
            const cy = 140 + r * Math.sin(rad);

            const starIndex = fs.s.indexOf(item.code);
            const starName = starIndex >= 0 ? STARS[starIndex] : '';
            const isGood = starIndex >= 0 && starIndex < 4;
            const isSelected = facing === item.code;

            return (
              <button
                key={item.code}
                type="button"
                onClick={() => onSelect(item.code)}
                aria-label={`Chọn hướng ${item.name} (${starName})`}
                style={{
                  position: 'absolute',
                  left: `${cx}px`,
                  top: `${cy}px`,
                  transform: 'translate(-50%, -50%)',
                  width: 58,
                  height: 40,
                  borderRadius: 8,
                  border: isSelected ? '2px solid var(--accent)' : '1px solid ' + (isGood ? '#A3CFBB' : '#E8B99D'),
                  background: isSelected
                    ? 'var(--accent)'
                    : isGood
                    ? '#EBF5F0'
                    : '#FDF1EB',
                  color: isSelected ? '#FFFFFF' : isGood ? '#1E5A4C' : '#8A3F0C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 2,
                  zIndex: 2,
                  boxShadow: isSelected ? '0 2px 8px rgba(30, 90, 76, 0.35)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.1 }}>
                  {item.name}
                </span>
                <span style={{ fontSize: 9, opacity: 0.9, lineHeight: 1, marginTop: 2 }}>
                  {starName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chú giải tốt/xấu */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        fontSize: 12,
        paddingTop: 8,
        borderTop: '1px dashed var(--line)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1E5A4C' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#2E7D32' }} />
          4 hướng tốt: Sinh Khí, Thiên Y, Diên Niên, Phục Vị
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8A3F0C' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#D84315' }} />
          4 hướng xấu: Họa Hại, Lục Sát, Ngũ Quỷ, Tuyệt Mệnh
        </span>
      </div>
    </div>
  );
}
