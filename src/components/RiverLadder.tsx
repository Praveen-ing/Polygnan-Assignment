import React, { useEffect, useState, useRef } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { CheckCircle2, Lock, Zap, Check, ArrowDown, Sparkles } from 'lucide-react';
import { RupeeCoinBurst } from './RupeeCoinBurst';
import { SpotlightCard } from './SpotlightCard';
import { BadgeCoinSVG } from './BadgeCoinSVG';
import { BadgeCapSVG } from './BadgeCapSVG';

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

  // Sync scroll progress as user scrolls down the section
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

  // Combine manual slider registrations with scroll progress
  const regPct = Math.min(100, (currentRegs / 200) * 100);
  const flowPct = Math.max(regPct, scrollProgress);

  // Auto unlock check
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

      {/* ── 6 Full-Screen Height Level Reward Sections (One Card Per Viewport Page) ── */}
      <div className="relative space-y-16 sm:space-y-24">
        {LADDER_RUNGS.map((rung, idx) => {
          const isUnlocked = flowPct >= (rung.threshold / 200) * 100;
          const isBouncing = bouncingRungId === rung.id;

          return (
            <section
              key={rung.id}
              id={`level-station-${rung.id}`}
              className="min-h-screen flex flex-col justify-center items-center py-12 px-4 relative snap-start"
            >
              {/* Starburst Effect */}
              {burstRungId === rung.id && (
                <div className="absolute inset-0 pointer-events-none z-40">
                  <RupeeCoinBurst triggerKey={rung.id} />
                </div>
              )}

              <div className="w-full max-w-2xl mx-auto space-y-8 relative z-20">
                {/* 3D Gold Coin Badge & Outlined Cap Header */}
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`relative transition-transform duration-300 ${isBouncing ? 'animate-value-pop scale-125' : ''}`}>
                    <div className="absolute inset-0 rounded-full bg-[#FAD02C]/20 blur-2xl animate-pulse" />
                    
                    <BadgeCoinSVG badgeIndex={idx} size={110} isUnlocked={isUnlocked} />
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-stats font-bold uppercase tracking-wider border"
                    style={{
                      color: isUnlocked ? '#C4F62E' : '#6A6A65',
                      borderColor: isUnlocked ? 'rgba(196, 246, 46, 0.4)' : '#262626',
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Level {idx + 1} of 6 Milestone
                  </div>
                </div>

                {/* Single Unobstructed Reward Card */}
                <SpotlightCard
                  spotlightColor={isUnlocked ? 'rgba(196, 246, 46, 0.25)' : 'rgba(255, 255, 255, 0.05)'}
                  className={`p-6 sm:p-10 rounded-3xl border transition-all duration-500 shadow-2xl ${
                    isUnlocked
                      ? 'border-[#C4F62E]/60 shadow-[0_16px_56px_rgba(196,246,46,0.2)]'
                      : 'border-[#262626] opacity-85'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#242424] pb-4 flex-wrap gap-3">
                      <div>
                        <span className="text-xs font-mono-stats text-[#8A8A85] uppercase tracking-wider font-bold block">
                          Level {idx + 1} Title
                        </span>
                        <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                          {rung.title}
                        </h3>
                      </div>

                      {/* Lock Status */}
                      {isUnlocked ? (
                        <div className="flex items-center gap-1.5 bg-[#C4F62E]/10 border border-[#C4F62E]/40 px-4 py-1.5 rounded-full text-xs font-mono-stats font-bold text-[#C4F62E]">
                          <Check className="w-4 h-4 stroke-[3]" />
                          UNLOCKED
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 border border-[#262626] px-4 py-1.5 rounded-full text-xs font-mono-stats text-[#6A6A65]">
                          <Lock className="w-4 h-4" />
                          Requires {rung.threshold} Regs
                        </div>
                      )}
                    </div>

                    {/* Milestone Requirement */}
                    <div className="space-y-1">
                      <span className="text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
                        Milestone Requirement:
                      </span>
                      <p className="text-sm sm:text-base font-display font-extrabold text-white">
                        {rung.milestoneText}
                      </p>
                    </div>

                    {/* Active Privileges */}
                    <div className="border border-[#222222] rounded-2xl p-5 space-y-3">
                      <div className="text-xs font-mono-stats uppercase tracking-widest text-[#C4F62E] font-bold flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#C4F62E]" />
                        LEVEL UNLOCKS & REWARDS:
                      </div>

                      <ul className="space-y-2.5">
                        {rung.unlocks.map((benefit, bIdx) => (
                          <li key={bIdx} className="text-xs sm:text-sm text-[#F5F3EF] flex items-start gap-3 font-sans font-medium">
                            <CheckCircle2 className="w-4.5 h-4.5 text-[#C4F62E] flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Flow Prompt to Next Level */}
                    {idx < LADDER_RUNGS.length - 1 && (
                      <div className="pt-2 flex justify-center">
                        <button
                          onClick={() => scrollToLevel(rung.id + 1)}
                          className="inline-flex items-center gap-2 text-xs font-mono-stats font-bold text-[#8A8A85] hover:text-[#C4F62E] transition-colors cursor-pointer py-1 px-4 rounded-full border border-[#262626] hover:border-[#C4F62E]/40"
                        >
                          <span>Scroll to Level {idx + 2}: {LADDER_RUNGS[idx + 1].title}</span>
                          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C4F62E]" />
                        </button>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
