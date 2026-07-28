import React, { useEffect, useState, useRef } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync river fill with vertical window scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const scrollOffset = windowHeight * 0.5 - rect.top;
      const progress = Math.max(0, Math.min(1, scrollOffset / totalHeight));
      setScrollProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate overall river flow percentage combining slider registrations and scroll progress
  const regPct = Math.min(100, (currentRegs / 200) * 100);
  const flowPct = Math.max(regPct, scrollProgress);

  // Auto unlock check based on current progress
  useEffect(() => {
    LADDER_RUNGS.forEach((rung) => {
      const effectiveRegs = Math.max(currentRegs, (scrollProgress / 100) * 200);
      if (effectiveRegs >= rung.threshold && !unlockedSet.has(rung.id)) {
        onUnlockNewRung?.(rung.id);
        setBouncingRungId(rung.id);
        setBurstRungId(rung.id);
        setTimeout(() => setBouncingRungId(null), 800);
        setTimeout(() => setBurstRungId(null), 1200);
      }
    });
  }, [currentRegs, scrollProgress, unlockedSet, onUnlockNewRung]);

  const scrollToLevel = (levelId: number) => {
    document.getElementById(`level-station-${levelId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div ref={containerRef} className="space-y-12 relative">

      {/* ── Level Jump Navigation Bar ── */}
      <div className="sticky top-4 z-30 bg-[#0A0A0A]/90 backdrop-blur-md py-3 px-4 border border-[#222222] rounded-full shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-mono-stats text-[#8A8A85] flex-shrink-0 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#C4F62E]" />
            Scroll River: <strong className="text-[#C4F62E]">{Math.round(flowPct)}% Filled</strong>
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {LADDER_RUNGS.map((rung, idx) => {
              const isUnlocked = flowPct >= (rung.threshold / 200) * 100;
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

            {/* Unlocked green fill river stroke synced with scrolling */}
            <path
              d="M 50 2 C 85 8, 85 16, 50 20 C 15 24, 15 32, 50 36 C 85 40, 85 48, 50 52 C 15 56, 15 64, 50 68 C 85 72, 85 80, 50 84 C 15 88, 15 96, 50 99"
              fill="none"
              stroke="#C4F62E"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset={600 - (flowPct / 100) * 600}
              className="transition-all duration-300 ease-out river-line-glow"
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
            const isUnlocked = flowPct >= (rung.threshold / 200) * 100;
            const isBouncing = bouncingRungId === rung.id;
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

                {/* 3D Gold Coin Badge Node */}
                <div className="flex-shrink-0 relative z-20 flex flex-col items-center">
                  <div className={`transition-transform duration-300 ${isBouncing ? 'animate-value-pop scale-125' : ''}`}>
                    <BadgeCoinSVG badgeIndex={idx} size={84} isUnlocked={isUnlocked} />
                  </div>

                  {/* Level Tag under coin */}
                  <span
                    className={`mt-2 font-mono-stats font-bold text-xs px-3 py-1 rounded-full border shadow-md ${
                      isUnlocked
                        ? 'bg-[#C4F62E] text-[#0A0A0A] border-[#C4F62E]'
                        : 'bg-[#121212] text-[#6A6A65] border-[#222222]'
                    }`}
                  >
                    Level {idx + 1}
                  </span>
                </div>

                {/* Station Card Content */}
                <div className="flex-1 w-full relative z-20">
                  <SpotlightCard
                    spotlightColor={isUnlocked ? 'rgba(196, 246, 46, 0.2)' : 'rgba(255, 255, 255, 0.05)'}
                    className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 backdrop-blur-md ${
                      isUnlocked
                        ? 'bg-[#121212]/90 border-[#C4F62E]/40 shadow-[0_8px_32px_rgba(196,246,46,0.15)]'
                        : 'bg-[#0E0E0E]/80 border-[#202020] opacity-80'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between border-b border-[#202020] pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono-stats text-[#8A8A85] uppercase tracking-wider font-bold">
                              Station {idx + 1}
                            </span>
                            <span className="text-xs font-mono-stats text-[#C4F62E] font-bold">
                              ({rung.threshold} Regs Required)
                            </span>
                          </div>
                          <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                            {rung.title}
                          </h3>
                        </div>

                        {/* Status Icon */}
                        {isUnlocked ? (
                          <div className="w-9 h-9 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/40 flex items-center justify-center text-[#C4F62E]">
                            <Check className="w-5 h-5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#181818] border border-[#262626] flex items-center justify-center text-[#6A6A65]">
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Milestone Requirement & Description */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
                          Milestone: {rung.milestoneText}
                        </div>

                      </div>

                      {/* Unlocked Benefits & Rewards */}
                      <div className="bg-[#080808]/90 border border-[#1A1A1A] rounded-2xl p-4 space-y-2.5">
                        <div className="text-[10px] font-mono-stats uppercase tracking-widest text-[#C4F62E] font-bold flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-[#C4F62E]" />
                          UNLOCKED PRIVILEGES:
                        </div>
                        <ul className="space-y-1.5">
                          {rung.unlocks.map((benefit, bIdx) => (
                            <li key={bIdx} className="text-xs text-[#F5F3EF] flex items-start gap-2 font-sans font-medium">
                              <CheckCircle2 className="w-4 h-4 text-[#C4F62E] flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
