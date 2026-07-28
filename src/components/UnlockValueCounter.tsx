import React, { useEffect, useRef, useState } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';

interface UnlockValueCounterProps {
  currentRegs: number;
}

function formatRupees(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

export const UnlockValueCounter: React.FC<UnlockValueCounterProps> = ({ currentRegs }) => {
  const targetValue = LADDER_RUNGS
    .filter((r) => currentRegs >= r.threshold)
    .reduce((sum, r) => sum + r.xpValue, 0);

  const unlockedCount = LADDER_RUNGS.filter((r) => currentRegs >= r.threshold).length;

  const [displayValue, setDisplayValue] = useState(0);
  const [isPop, setIsPop]               = useState(false);
  const prevTarget                       = useRef(0);
  const animRef                          = useRef<number | null>(null);
  const startRef                         = useRef<number | null>(null);

  useEffect(() => {
    if (targetValue === prevTarget.current) return;

    const from = prevTarget.current;
    const to   = targetValue;
    prevTarget.current = to;

    if (animRef.current) cancelAnimationFrame(animRef.current);
    startRef.current = null;

    const duration = 700;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed  = ts - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      const ease     = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(from + (to - from) * ease));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(to);
        setIsPop(true);
        setTimeout(() => setIsPop(false), 400);
      }
    };
    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [targetValue]);

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B2C]/5 via-transparent to-[#E8B923]/5 pointer-events-none" />

      <p className="text-[10px] font-mono-stats uppercase tracking-widest text-[#8A8A85] mb-2">
        💰 Total Value Unlocked
      </p>

      <div className={`font-mono-stats font-black text-4xl sm:text-5xl text-[#C4F62E] leading-none tracking-tight transition-all ${isPop ? 'animate-value-pop' : ''}`}>
        {formatRupees(displayValue)}
      </div>

      <p className="text-xs text-[#8A8A85] mt-2 font-sans">
        across{' '}
        <span className="text-[#F5F3EF] font-semibold">{unlockedCount} tier{unlockedCount !== 1 ? 's' : ''}</span>{' '}
        unlocked
      </p>

      {/* Shimmer bar */}
      <div className="mt-3 h-1 rounded-full bg-[#1A1A1A] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(100, (unlockedCount / LADDER_RUNGS.length) * 100)}%`,
            background: 'linear-gradient(90deg, #FF6B2C, #E8B923)',
          }}
        />
      </div>
      <p className="text-[9px] text-[#4A4640] font-mono-stats mt-1">
        {unlockedCount}/{LADDER_RUNGS.length} tiers
      </p>
    </div>
  );
};
