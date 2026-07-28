import React from 'react';
import { LADDER_RUNGS } from '../data/ladderData';

interface TierProgressBarProps {
  currentRegs: number;
}

export const TierProgressBar: React.FC<TierProgressBarProps> = ({ currentRegs }) => {
  // Find current tier index
  let currentIdx = 0;
  for (let i = 0; i < LADDER_RUNGS.length; i++) {
    if (currentRegs >= LADDER_RUNGS[i].threshold) currentIdx = i;
  }

  const currentTier = LADDER_RUNGS[currentIdx];
  const nextTier    = LADDER_RUNGS[currentIdx + 1];
  const isMaxed     = currentIdx === LADDER_RUNGS.length - 1;

  const pct = isMaxed
    ? 100
    : Math.round(((currentRegs - currentTier.threshold) / (nextTier.threshold - currentTier.threshold)) * 100);

  const regsNeeded = nextTier ? nextTier.threshold - currentRegs : 0;

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 space-y-3">
      {/* Labels */}
      <div className="flex items-center justify-between text-xs font-mono-stats">
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: currentTier.color }}
          />
          <span className="text-[#F5F3EF] font-semibold">{currentTier.title}</span>
        </span>
        {!isMaxed && (
          <span className="flex items-center gap-1.5">
            <span className="text-[#8A8A85]">{nextTier.title}</span>
            <span
              className="w-2.5 h-2.5 rounded-full opacity-40"
              style={{ backgroundColor: nextTier.color }}
            />
          </span>
        )}
        {isMaxed && (
          <span className="text-[#FFD700] font-semibold">👑 MAX TIER</span>
        )}
      </div>

      {/* XP bar */}
      <div className="relative h-3 bg-[#1A1A1A] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out relative"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${currentTier.color}99, ${currentTier.color})`,
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Status text */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono-stats text-[#FF6B2C] font-bold">{pct}% to next tier</span>
        {!isMaxed && (
          <span className="text-[#8A8A85]">
            <span className="text-[#F5F3EF] font-semibold">{regsNeeded}</span> more regs →{' '}
            <span style={{ color: nextTier.color }}>{nextTier.title}</span>
          </span>
        )}
        {isMaxed && (
          <span className="text-[#FFD700] text-xs">Founding Team unlocked 🎉</span>
        )}
      </div>
    </div>
  );
};
