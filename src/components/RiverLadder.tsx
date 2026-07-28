import React, { useEffect, useState } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { CheckCircle2, Lock, Zap, ArrowDown, Check } from 'lucide-react';
import { RupeeCoinBurst } from './RupeeCoinBurst';
import { SpotlightCard } from './SpotlightCard';
import { BadgeCoinSVG } from './BadgeCoinSVG';

interface RiverLadderProps {
  currentRegs: number;
  unlockedSet: Set<number>;
  onUnlockNewRung?: (rungId: number) => void;
}

export const RiverLadder: React.FC<RiverLadderProps> = ({
  currentRegs,
  unlockedSet,
  onUnlockNewRung,
}) => {
  const [bouncingRungId, setBouncingRungId] = useState<number | null>(null);
  const [burstRungId, setBurstRungId]     = useState<number | null>(null);

  // Auto unlock check
  useEffect(() => {
    LADDER_RUNGS.forEach((rung) => {
      if (currentRegs >= rung.threshold && !unlockedSet.has(rung.id)) {
        onUnlockNewRung?.(rung.id);
        setBouncingRungId(rung.id);
        setBurstRungId(rung.id);
        setTimeout(() => setBouncingRungId(null), 800);
        setTimeout(() => setBurstRungId(null), 1200);
      }
    });
  }, [currentRegs, unlockedSet, onUnlockNewRung]);

  const scrollToLevel = (levelId: number) => {
    document.getElementById(`level-station-${levelId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const flowPct = Math.min(100, (currentRegs / 200) * 100);

  return (
    <div className="space-y-12 relative">

      {/* ── Level Jump Navigation Bar ── */}
      <div className="sticky top-20 z-30 bg-[#0A0A0A]/90 backdrop-blur-md py-3 border-y border-[#1E1E1E]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-mono-stats text-[#8A8A85] flex-shrink-0 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#C4F62E]" />
            Jump to Milestone:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {LADDER_RUNGS.map((rung, idx) => {
              const isUnlocked = currentRegs >= rung.threshold;
              return (
                <button
                  key={rung.id}
                  onClick={() => scrollToLevel(rung.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono-stats font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    isUnlocked
                      ? 'bg-[#C4F62E]/10 border-[#C4F62E]/40 text-[#C4F62E] hover:bg-[#C4F62E] hover:text-[#0A0A0A]'
                      : 'bg-[#141414] border-[#222] text-[#4A4640] hover:text-[#8A8A85]'
                  }`}
                >
                  L{idx + 1}: {rung.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Massive Flowing River Container (Long Vertical Scroll) ── */}
      <div className="relative min-h-[1800px] sm:min-h-[2200px] py-12 px-2 sm:px-6">

        {/* ── Background SVG Winding River Path with Flowing Current Effect ── */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Base river bed */}
            <path
              d="M 50 2 C 85 8, 85 16, 50 20 C 15 24, 15 32, 50 36 C 85 40, 85 48, 50 52 C 15 56, 15 64, 50 68 C 85 72, 85 80, 50 84 C 15 88, 15 96, 50 99"
              fill="none"
              stroke="#181818"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Unlocked green fill river stroke */}
            <path
              d="M 50 2 C 85 8, 85 16, 50 20 C 15 24, 15 32, 50 36 C 85 40, 85 48, 50 52 C 15 56, 15 64, 50 68 C 85 72, 85 80, 50 84 C 15 88, 15 96, 50 99"
              fill="none"
              stroke="#C4F62E"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset={600 - (flowPct / 100) * 600}
              className="transition-all duration-700 ease-out river-line-glow"
            />

            {/* Flowing animated light water pulses along path */}
            <path
              d="M 50 2 C 85 8, 85 16, 50 20 C 15 24, 15 32, 50 36 C 85 40, 85 48, 50 52 C 15 56, 15 64, 50 68 C 85 72, 85 80, 50 84 C 15 88, 15 96, 50 99"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="8 24"
              className="opacity-40 animate-marquee"
            />
          </svg>
        </div>

        {/* ── 6 Level Stations Spread Out Down the River ── */}
        <div className="relative space-y-24 sm:space-y-32">
          {LADDER_RUNGS.map((rung, idx) => {
            const isUnlocked = currentRegs >= rung.threshold;
            const isBouncing = bouncingRungId === rung.id;
            const regsToGo   = rung.threshold - Math.floor(currentRegs);
            const isEven     = idx % 2 === 0;

            return (
              <div
                key={rung.id}
                id={`level-station-${rung.id}`}
                className={`relative flex flex-col md:flex-row items-center gap-6 sm:gap-10 transition-all duration-500 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Starburst Effect */}
                {burstRungId === rung.id && (
                  <div className="absolute inset-0 pointer-events-none z-40">
                    <RupeeCoinBurst triggerKey={rung.id} />
                  </div>
                )}

                {/* Exact 3D Gold Coin Badge Node from official screenshot */}
                <div className="flex-shrink-0 relative z-20 flex flex-col items-center">
                  <div className={`transition-all duration-500 ${isBouncing ? 'animate-bounce' : ''}`}>
                    <BadgeCoinSVG badgeIndex={idx} size={76} isUnlocked={isUnlocked} />
                  </div>

                  {/* Level Tag under node */}
                  <div className="mt-2 bg-[#0A0A0A] border border-[#242424] px-3 py-1 rounded-full text-[10px] font-mono-stats font-bold text-[#C4F62E]">
                    {rung.milestoneText}
                  </div>
                </div>

                {/* Level Station Card Details */}
                <div className="flex-1 max-w-xl w-full">
                  <SpotlightCard
                    spotlightColor={isUnlocked ? 'rgba(196, 246, 46, 0.2)' : 'rgba(255, 255, 255, 0.05)'}
                    className={`rounded-3xl p-6 sm:p-8 space-y-5 transition-all duration-500 relative shadow-2xl border ${
                      isUnlocked
                        ? 'border-[#C4F62E]/50 bg-gradient-to-br from-[#C4F62E]/10 via-[#111111] to-[#0A0A0A] shadow-[0_4px_40px_rgba(196,246,46,0.2)]'
                        : 'border-[#1E1E1E] bg-[#0C0C0C] opacity-75'
                    }`}
                  >
                    {/* Station Header */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono-stats font-extrabold text-[#C4F62E] uppercase tracking-wider bg-[#C4F62E]/10 border border-[#C4F62E]/30 px-3 py-1 rounded-full">
                          Level {idx + 1}
                        </span>
                        <span className="text-xs font-mono-stats text-[#8A8A85]">
                          {rung.milestoneText}
                        </span>
                      </div>

                      {isUnlocked ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono-stats font-bold text-[#C4F62E] bg-[#C4F62E]/10 border border-[#C4F62E]/30 px-3 py-1 rounded-full animate-glow-pulse">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          UNLOCKED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono-stats text-[#6A6A65] bg-[#1A1A1A] border border-[#262626] px-3 py-1 rounded-full">
                          <Lock className="w-3.5 h-3.5" />
                          {regsToGo} more regs
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                        {rung.title}
                      </h3>
                    </div>

                    {/* Unlocked Rewards List for this Level */}
                    <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-4 sm:p-5 space-y-3">
                      <div className="text-xs font-mono-stats uppercase tracking-widest text-[#C4F62E] font-bold">
                        WHAT YOU UNLOCK:
                      </div>

                      <div className="space-y-2.5">
                        {rung.unlocks.map((unlockText, uIdx) => (
                          <div key={uIdx} className="flex items-start gap-3 bg-[#121212] border border-[#1E1E1E] p-3.5 rounded-xl transition-transform hover:translate-x-1">
                            <Check className="w-4 h-4 text-[#C4F62E] flex-shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm text-[#F5F3EF] font-sans font-medium leading-relaxed">
                              {unlockText}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flow Arrow down to next level */}
                    {idx < LADDER_RUNGS.length - 1 && (
                      <div className="pt-2 flex justify-end text-xs font-mono-stats text-[#6A6A65]">
                        <button
                          onClick={() => scrollToLevel(rung.id + 1)}
                          className="inline-flex items-center gap-1.5 hover:text-[#C4F62E] transition-colors cursor-pointer"
                        >
                          <span>Flow to {LADDER_RUNGS[idx + 1].title}</span>
                          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C4F62E]" />
                        </button>
                      </div>
                    )}
                  </SpotlightCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
