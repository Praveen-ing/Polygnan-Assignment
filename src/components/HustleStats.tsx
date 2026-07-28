import React from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { Trophy, Zap, ShieldCheck, Flame } from 'lucide-react';

interface HustleStatsProps {
  regs: number;
}

export const HustleStats: React.FC<HustleStatsProps> = ({ regs }) => {
  const unlockedRungs = LADDER_RUNGS.filter((r) => regs >= r.threshold);
  const highestRung = unlockedRungs[unlockedRungs.length - 1] || LADDER_RUNGS[0];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-[#141414] border border-[#232323] rounded-xl p-3.5 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] font-mono-stats uppercase text-[#A39E93]">
          <Flame className="w-3.5 h-3.5 text-[#FF6B2C]" />
          <span>Current Rank</span>
        </div>
        <div className="font-heading font-bold text-base text-[#F5F3EF] truncate">
          {highestRung.title}
        </div>
      </div>

      <div className="bg-[#141414] border border-[#232323] rounded-xl p-3.5 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] font-mono-stats uppercase text-[#A39E93]">
          <Trophy className="w-3.5 h-3.5 text-[#C4F62E]" />
          <span>Unlocked Value</span>
        </div>
        <div className="font-mono-stats font-bold text-base text-[#C4F62E]">
          {highestRung.estimatedValue}
        </div>
      </div>

      <div className="bg-[#141414] border border-[#232323] rounded-xl p-3.5 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] font-mono-stats uppercase text-[#A39E93]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B2C]" />
          <span>Perks Unlocked</span>
        </div>
        <div className="font-mono-stats font-bold text-base text-[#F5F3EF]">
          {unlockedRungs.reduce((acc, r) => acc + r.perks.length, 0)} Perks
        </div>
      </div>

      <div className="bg-[#141414] border border-[#232323] rounded-xl p-3.5 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] font-mono-stats uppercase text-[#A39E93]">
          <Zap className="w-3.5 h-3.5 text-[#FFC857]" />
          <span>Campus Standing</span>
        </div>
        <div className="font-heading font-bold text-base text-[#F5F3EF]">
          {regs >= 100 ? 'Top 1%' : regs >= 50 ? 'Top 5%' : regs >= 25 ? 'Top 15%' : 'Scout'}
        </div>
      </div>
    </div>
  );
};
