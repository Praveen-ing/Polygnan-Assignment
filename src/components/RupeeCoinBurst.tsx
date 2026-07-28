import React, { useMemo } from 'react';

interface Particle {
  id: number;
  dx: string;
  dy: string;
  sc: string;
  dur: string;
  delay: string;
}

export const RupeeCoinBurst: React.FC<{ triggerKey: number | string }> = ({ triggerKey }) => {
  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 360 + (Math.random() * 20 - 10);
      const rad = (angle * Math.PI) / 180;
      const distance = 30 + Math.random() * 50;
      const dx = Math.cos(rad) * distance;
      const dy = Math.sin(rad) * distance + 20;

      list.push({
        id: i,
        dx: `${Math.round(dx)}px`,
        dy: `${Math.round(dy)}px`,
        sc: (0.6 + Math.random() * 0.4).toFixed(2),
        dur: `${(0.7 + Math.random() * 0.3).toFixed(2)}s`,
        delay: `${(i * 0.02).toFixed(2)}s`,
      });
    }
    return list;
  }, [triggerKey]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {particles.map((p) => (
        <span
          key={`${triggerKey}-${p.id}`}
          className="rupee-coin-particle font-mono-stats font-extrabold text-[#C4F62E] text-xs select-none"
          style={
            {
              '--dx': p.dx,
              '--dy': p.dy,
              '--sc': p.sc,
              '--dur': p.dur,
              '--delay': p.delay,
            } as React.CSSProperties
          }
        >
          ✦
        </span>
      ))}
    </div>
  );
};
