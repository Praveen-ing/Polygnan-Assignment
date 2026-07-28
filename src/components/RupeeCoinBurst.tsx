import React, { useMemo } from 'react';

interface RupeeCoinBurstProps {
  triggerKey: number | string;
}

interface Particle {
  id: number;
  dx: string;
  dy: string;
  sc: string;
  rot: string;
  dur: string;
  delay: string;
}

export const RupeeCoinBurst: React.FC<RupeeCoinBurstProps> = ({ triggerKey }) => {
  // Generate 9 falling gold Rupee glyph particles with random trajectory angles & forces
  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    const count = 9; // 8-10 particles
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 360 + (Math.random() * 20 - 10);
      const rad = (angle * Math.PI) / 180;
      const distance = 40 + Math.random() * 70; // 40px to 110px outward spread
      const dx = Math.cos(rad) * distance;
      const dy = Math.sin(rad) * distance + 35; // Downward bias for falling effect

      list.push({
        id: i,
        dx: `${Math.round(dx)}px`,
        dy: `${Math.round(dy)}px`,
        sc: (0.9 + Math.random() * 0.5).toFixed(2),
        rot: `${Math.round((Math.random() - 0.5) * 180)}deg`,
        dur: `${(0.85 + Math.random() * 0.45).toFixed(2)}s`,
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
          className="rupee-coin-particle font-mono-stats font-extrabold text-[#FFC857] text-sm sm:text-base select-none"
          style={
            {
              '--dx': p.dx,
              '--dy': p.dy,
              '--sc': p.sc,
              '--rot': p.rot,
              '--dur': p.dur,
              '--delay': p.delay,
            } as React.CSSProperties
          }
        >
          ₹
        </span>
      ))}
    </div>
  );
};
