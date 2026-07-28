import React from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { BadgeIcon } from './BadgeIcon';
import { Lock, Check, Sparkles } from 'lucide-react';

interface BadgeShelfProps {
  currentRegs: number;
  onRungClick?: (threshold: number) => void;
}

export const BadgeShelf: React.FC<BadgeShelfProps> = ({ currentRegs, onRungClick }) => {
  const unlockedCount = LADDER_RUNGS.filter((r) => currentRegs >= r.threshold).length;
  const progressPct = Math.round((unlockedCount / LADDER_RUNGS.length) * 100);

  return (
    <div className="bg-[#141414] border border-[#232323] rounded-2xl p-4 space-y-3 shadow-md relative overflow-hidden">
      {/* Top Header Row */}
      <div className="flex items-center justify-between text-xs font-mono-stats uppercase tracking-wider px-0.5">
        <div className="flex items-center gap-1.5 text-[#F5F3EF] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#C4F62E]" />
          <span>Badge Shelf</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#C4F62E] font-bold">
            {unlockedCount} / {LADDER_RUNGS.length} Unlocked
          </span>
          <span className="text-[#A39E93]">({progressPct}%)</span>
        </div>
      </div>

      {/* Mini Progress Bar */}
      <div className="w-full h-1 bg-[#232323] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#FF6B2C] to-[#C4F62E] transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* 6 Icon Slots Grid */}
      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {LADDER_RUNGS.map((rung) => {
          const isUnlocked = currentRegs >= rung.threshold;
          const isMajor = rung.threshold >= 100;

          return (
            <button
              key={rung.id}
              onClick={() => onRungClick?.(rung.threshold)}
              title={`${rung.title} (${rung.reqText}) - Click to jump`}
              className={`group relative aspect-square rounded-xl p-1 flex flex-col items-center justify-center transition-all duration-300 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4F62E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414] ${
                isUnlocked
                  ? isMajor
                    ? 'bg-gradient-to-b from-[#1C260B] via-[#141A0B] to-[#141414] border-[#C4F62E] shadow-[0_0_18px_rgba(196,246,46,0.4)] scale-[1.05]'
                    : 'bg-gradient-to-b from-[#161D0C] to-[#12160A] border-[#C4F62E] shadow-[0_0_12px_rgba(196,246,46,0.25)] scale-[1.03]'
                  : 'bg-[#1B1B1B] border-[#262626] opacity-50 hover:opacity-85'
              }`}
            >
              <BadgeIcon
                type={rung.badgeType}
                isUnlocked={isUnlocked}
                size={38}
                className="transition-transform group-hover:scale-110"
              />

              {/* Status Indicator */}
              <span className="absolute -top-1 -right-1 z-10">
                {isUnlocked ? (
                  <span className="w-4 h-4 rounded-full bg-[#C4F62E] text-[#0A0A0A] flex items-center justify-center font-extrabold shadow-sm">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full bg-[#232323] text-[#726C64] flex items-center justify-center">
                    <Lock className="w-2 h-2" />
                  </span>
                )}
              </span>

              {/* Rung Threshold Label */}
              <span
                className={`mt-0.5 text-[9.5px] font-mono-stats font-bold truncate max-w-full text-center ${
                  isUnlocked ? 'text-[#C4F62E]' : 'text-[#726C64] group-hover:text-[#F5F3EF]'
                }`}
              >
                {rung.threshold}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
