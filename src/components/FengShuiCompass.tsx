import { useState, useEffect, useCallback } from 'react';
import type { FengShui } from '../domain/fengshui';
import { STARS, DN } from '../domain/fengshui';
import type { DirCode } from '../domain/types';

interface CompassProps {
  fs: FengShui | null;
  facing: DirCode | '';
  onSelect: (dir: DirCode, degStr?: string) => void;
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

function degToDir(deg: number): { code: DirCode; name: string } {
  const d = ((deg % 360) + 360) % 360;
  if (d >= 337.5 || d < 22.5) return { code: 'B', name: DN.B };
  if (d >= 22.5 && d < 67.5) return { code: 'DB', name: DN.DB };
  if (d >= 67.5 && d < 112.5) return { code: 'D', name: DN.D };
  if (d >= 112.5 && d < 157.5) return { code: 'DN', name: DN.DN };
  if (d >= 157.5 && d < 202.5) return { code: 'N', name: DN.N };
  if (d >= 202.5 && d < 247.5) return { code: 'TN', name: DN.TN };
  if (d >= 247.5 && d < 292.5) return { code: 'T', name: DN.T };
  return { code: 'TB', name: DN.TB };
}

export function FengShuiCompass({ fs, facing, onSelect }: CompassProps) {
  // Trạng thái cảm biến la bàn số trên điện thoại
  const [liveHeading, setLiveHeading] = useState<number | null>(null);
  const [sensorActive, setSensorActive] = useState<boolean>(false);
  const [sensorMsg, setSensorMsg] = useState<string | null>(null);

  // Dừng cảm biến la bàn khi unmount
  useEffect(() => {
    if (!sensorActive) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;
      const anyEvt = e as unknown as { webkitCompassHeading?: number };
      if (typeof anyEvt.webkitCompassHeading === 'number' && !isNaN(anyEvt.webkitCompassHeading)) {
        heading = anyEvt.webkitCompassHeading;
      } else if (e.alpha !== null && !isNaN(e.alpha)) {
        heading = (360 - e.alpha) % 360;
      }
      if (heading !== null) {
        setLiveHeading(Math.round(heading));
      }
    };

    window.addEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
    window.addEventListener('deviceorientation', handleOrientation as EventListener, true);

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
      window.removeEventListener('deviceorientation', handleOrientation as EventListener, true);
    };
  }, [sensorActive]);

  // Bật/tắt cảm biến điện thoại
  const toggleSensor = useCallback(async () => {
    if (sensorActive) {
      setSensorActive(false);
      setLiveHeading(null);
      setSensorMsg(null);
      return;
    }

    try {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
      ) {
        const res = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
        if (res !== 'granted') {
          setSensorMsg('Cần cấp quyền truy cập cảm biến hướng trên thiết bị.');
          return;
        }
      }

      setSensorActive(true);
      setSensorMsg(null);
    } catch {
      setSensorMsg('Trình duyệt không hỗ trợ cảm biến la bàn số.');
    }
  }, [sensorActive]);

  // Góc xoay của kim la bàn: ưu tiên cảm biến thời gian thực nếu đang bật, ngược lại theo hướng đã chọn
  const activeItem = DIR_ITEMS.find((d) => d.code === facing);
  const needleAngle = sensorActive && liveHeading !== null ? liveHeading : activeItem ? activeItem.deg : null;

  const currentSensorDir = liveHeading !== null ? degToDir(liveHeading) : null;

  return (
    <div style={{
      background: '#FAFAF8',
      border: '1px solid var(--line)',
      borderRadius: 16,
      padding: '16px 12px',
      margin: '14px 0',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Tiêu đề la bàn */}
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
          {fs ? `🧭 La bàn Bát Quái — Cung ${fs.cung} (${fs.cungHanh}) · ${fs.group}` : '🧭 La bàn Bát Quái định hướng nhà'}
        </h3>
        <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.4 }}>
          {fs
            ? 'Bấm trực tiếp vào các hướng trên la bàn để xem sao chiếu mệnh:'
            : '💡 Nhập năm sinh ở Bước 1 để hiển thị sao Bát Trạch (Sinh Khí, Diên Niên...) theo cung mệnh của bạn.'}
        </p>
      </div>

      {/* VÒNG TRÒN LA BÀN VECTOR SVG (100% RESPONSIVE TRÊN MỌI MÀN HÌNH DI ĐỘNG) */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: '6px 0 12px'
      }}>
        <svg
          viewBox="0 0 320 320"
          style={{
            width: '100%',
            maxWidth: 290,
            height: 'auto',
            display: 'block',
            userSelect: 'none',
            touchAction: 'manipulation'
          }}
        >
          {/* Vòng nền ngoài cùng */}
          <circle cx="160" cy="160" r="154" fill="#FFFFFF" stroke="var(--line)" strokeWidth="2" />
          <circle cx="160" cy="160" r="146" fill="#F8F6F2" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="160" cy="160" r="82" fill="#FFFFFF" stroke="var(--line)" strokeWidth="1.5" />

          {/* Các đường chia 8 cung Bát Trạch */}
          {[0, 45, 90, 135].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 160 + 82 * Math.sin(rad);
            const y1 = 160 - 82 * Math.cos(rad);
            const x2 = 160 + 154 * Math.sin(rad);
            const y2 = 160 - 154 * Math.cos(rad);
            const ox1 = 160 - 82 * Math.sin(rad);
            const oy1 = 160 + 82 * Math.cos(rad);
            const ox2 = 160 - 154 * Math.sin(rad);
            const oy2 = 160 + 154 * Math.cos(rad);
            return (
              <g key={angle} stroke="var(--line)" strokeWidth="1">
                <line x1={x1} y1={y1} x2={x2} y2={y2} />
                <line x1={ox1} y1={oy1} x2={ox2} y2={oy2} />
              </g>
            );
          })}

          {/* Kim la bàn chỉ hướng */}
          {needleAngle !== null && (
            <g transform={`rotate(${needleAngle} 160 160)`} style={{ transition: 'transform 0.3s ease' }}>
              {/* Mũi kim màu đỏ trỏ hướng */}
              <polygon points="160,52 167,160 153,160" fill="#D32F2F" />
              {/* Đuôi kim màu xám trỏ hướng đối diện */}
              <polygon points="160,268 167,160 153,160" fill="#9E9E9E" />
              <circle cx="160" cy="160" r="7" fill="#1B1F1D" />
            </g>
          )}

          {/* Tâm la bàn hiển thị Cung mệnh hoặc biểu tượng */}
          <circle cx="160" cy="160" r="48" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
          <text x="160" y={fs ? 152 : 156} textAnchor="middle" fontSize={fs ? 16 : 14} fontWeight="bold" fill="var(--ink)">
            {fs ? fs.cung : 'Bát Quái'}
          </text>
          <text x="160" y={fs ? 170 : 172} textAnchor="middle" fontSize={fs ? 11 : 10} fill="var(--muted)">
            {fs ? fs.cungHanh : '8 Hướng'}
          </text>

          {/* 8 Nút bấm vector tương tác trực tiếp bên trong SVG */}
          {DIR_ITEMS.map((item) => {
            const rad = (item.deg * Math.PI) / 180;
            const x = 160 + 110 * Math.sin(rad);
            const y = 160 - 110 * Math.cos(rad);

            const starIndex = fs ? fs.s.indexOf(item.code) : -1;
            const starName = starIndex >= 0 ? STARS[starIndex] : '';
            const isGood = starIndex >= 0 && starIndex < 4;
            const isSelected = facing === item.code;

            const bgFill = isSelected
              ? '#1E5A4C'
              : !fs
              ? '#FFFFFF'
              : isGood
              ? '#EBF5F0'
              : '#FDF1EB';

            const strokeColor = isSelected
              ? '#123B31'
              : !fs
              ? 'var(--line)'
              : isGood
              ? '#A3CFBB'
              : '#E8B99D';

            const textColor = isSelected
              ? '#FFFFFF'
              : !fs
              ? 'var(--ink)'
              : isGood
              ? '#1E5A4C'
              : '#8A3F0C';

            return (
              <g
                key={item.code}
                onClick={() => onSelect(item.code)}
                style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                role="button"
                aria-label={`Chọn hướng ${item.name} ${starName ? '(' + starName + ')' : ''}`}
              >
                <rect
                  x={x - 27}
                  y={y - 19}
                  width="54"
                  height="38"
                  rx="7"
                  fill={bgFill}
                  stroke={strokeColor}
                  strokeWidth={isSelected ? '2' : '1'}
                />
                <text
                  x={x}
                  y={starName ? y - 4 : y + 4}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="bold"
                  fill={textColor}
                  pointerEvents="none"
                >
                  {item.name}
                </text>
                {starName && (
                  <text
                    x={x}
                    y={y + 11}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="500"
                    fill={textColor}
                    opacity="0.95"
                    pointerEvents="none"
                  >
                    {starName}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Grid 8 nút bấm nhanh thân thiện cho ngón tay trên điện thoại */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 6,
        margin: '8px 0'
      }}>
        {DIR_ITEMS.map((item) => {
          const starIndex = fs ? fs.s.indexOf(item.code) : -1;
          const starName = starIndex >= 0 ? STARS[starIndex] : '';
          const isGood = starIndex >= 0 && starIndex < 4;
          const isSelected = facing === item.code;

          return (
            <button
              key={item.code}
              type="button"
              onClick={() => onSelect(item.code)}
              style={{
                minHeight: 44,
                padding: '6px 2px',
                borderRadius: 8,
                border: isSelected ? '2px solid var(--accent)' : '1px solid ' + (fs ? (isGood ? '#A3CFBB' : '#E8B99D') : 'var(--line)'),
                background: isSelected ? 'var(--accent)' : fs ? (isGood ? '#EBF5F0' : '#FDF1EB') : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : fs ? (isGood ? '#1E5A4C' : '#8A3F0C') : 'var(--ink)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.1 }}>{item.name}</span>
              {starName ? (
                <span style={{ fontSize: 9.5, marginTop: 2, opacity: 0.9 }}>{starName}</span>
              ) : (
                <span style={{ fontSize: 9, marginTop: 2, opacity: 0.6 }}>{item.code}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Thanh công cụ cảm biến la bàn thực tế trên điện thoại */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--line)',
        borderRadius: 10,
        padding: '10px 12px',
        margin: '10px 0 6px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={toggleSensor}
            className="btn ghost sm"
            style={{
              fontSize: 12,
              padding: '6px 12px',
              minHeight: 34,
              borderColor: sensorActive ? 'var(--accent)' : undefined,
              color: sensorActive ? 'var(--accent)' : undefined,
              fontWeight: 600
            }}
          >
            {sensorActive ? '🛑 Tắt la bàn cảm biến' : '📱 Bật la bàn cảm biến xoay theo điện thoại'}
          </button>

          {sensorActive && liveHeading !== null && currentSensorDir && (
            <button
              type="button"
              className="btn sm"
              style={{ fontSize: 12, padding: '6px 12px', minHeight: 34 }}
              onClick={() => onSelect(currentSensorDir.code, `${liveHeading}° ${currentSensorDir.name}`)}
            >
              Lấy góc {liveHeading}° ({currentSensorDir.name})
            </button>
          )}
        </div>

        {sensorActive && (
          <div style={{ fontSize: 12, color: 'var(--ink)' }}>
            {liveHeading !== null && currentSensorDir ? (
              <span>
                📍 Hướng điện thoại đang trỏ: <strong>{liveHeading}° ({currentSensorDir.name})</strong>
              </span>
            ) : (
              <span style={{ color: 'var(--muted)' }}>
                Đang đọc cảm biến con quay... (Hãy cầm điện thoại nằm ngang và xoay về hướng khu đất)
              </span>
            )}
          </div>
        )}

        {sensorMsg && (
          <span style={{ fontSize: 11.5, color: '#C62828' }}>{sensorMsg}</span>
        )}
      </div>

      {/* Chú giải tốt/xấu */}
      {fs && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 14,
          fontSize: 11.5,
          paddingTop: 8,
          borderTop: '1px dashed var(--line)',
          flexWrap: 'wrap'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#1E5A4C' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2E7D32' }} />
            Hướng tốt: Sinh Khí, Thiên Y, Diên Niên, Phục Vị
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#8A3F0C' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#D84315' }} />
            Hướng xấu: Họa Hại, Lục Sát, Ngũ Quỷ, Tuyệt Mệnh
          </span>
        </div>
      )}
    </div>
  );
}
