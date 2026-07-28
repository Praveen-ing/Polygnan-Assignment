import React, { useEffect, useState, useRef } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { CheckCircle2, Lock, Zap, Check, ArrowDown, Sparkles, Trophy, Gift, Award, Briefcase, Crown, Compass } from 'lucide-react';
import { RupeeCoinBurst } from './RupeeCoinBurst';
import { SpotlightCard } from './SpotlightCard';
import { BadgeCoinSVG } from './BadgeCoinSVG';

interface RiverLadderProps {
  currentRegs: number;
  unlockedSet: Set<number>;
  onUnlockNewRung?: (rungId: number) => void;
}

// Level themes & icons
const LEVEL_METADATA = [
  {
    themeColor: '#C4F62E', // Lime
    glowClass: 'shadow-[0_0_24px_rgba(196,246,46,0.4)]',
    icon: <Compass className="w-5 h-5 text-[#C4F62E]" />,
    badgeLabel: 'SCOUT TITLE',
  },
  {
    themeColor: '#38BDF8', // Cyan
    glowClass: 'shadow-[0_0_24px_rgba(56,189,248,0.4)]',
    icon: <Award className="w-5 h-5 text-[#38BDF8]" />,
    badgeLabel: 'AMBASSADOR KIT',
  },
  {
    themeColor: '#E8B923', // Gold
    glowClass: 'shadow-[0_0_24px_rgba(232,185,35,0.4)]',
    icon: <Gift className="w-5 h-5 text-[#E8B923]" />,
    badgeLabel: 'SWAG DROPS',
  },
  {
    themeColor: '#FF6B2C', // Flame Orange
    glowClass: 'shadow-[0_0_24px_rgba(255,107,44,0.4)]',
    icon: <Zap className="w-5 h-5 text-[#FF6B2C]" />,
    badgeLabel: 'FOUNDER GRANTS',
  },
  {
    themeColor: '#A855F7', // Neon Violet
    glowClass: 'shadow-[0_0_24px_rgba(168,85,247,0.4)]',
    icon: <Briefcase className="w-5 h-5 text-[#A855F7]" />,
    badgeLabel: 'PAID STIPENDS',
  },
  {
    themeColor: '#F59E0B', // Imperial Gold
    glowClass: 'shadow-[0_0_32px_rgba(245,158,11,0.6)]',
    icon: <Crown className="w-5 h-5 text-[#F59E0B]" />,
    badgeLabel: 'FOUNDING TEAM',
  },
];

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
    <div ref={containerRef} className="space-y-16 relative">

      {/* ── Interactive Level Quest Hub Bar ── */}
      <div className="border border-[#262626] rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-6 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#C4F62E]" />
            <span className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
              Scout Milestone Quest Tree
            </span>
          </div>

          <div className="text-xs font-mono-stats text-[#8A8A85]">
            Progress: <strong className="text-[#C4F62E]">{Math.round(flowPct)}%</strong> Unlocked
          </div>
        </div>

        {/* 6 Level Node Buttons Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {LADDER_RUNGS.map((rung, idx) => {
            const isUnlocked = flowPct >= (rung.threshold / 200) * 100;
            const meta = LEVEL_METADATA[idx] || LEVEL_METADATA[0];

            return (
              <button
                key={rung.id}
                onClick={() => scrollToLevel(rung.id)}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center text-center space-y-2 cursor-pointer relative group ${
                  isUnlocked
                    ? `border-[${meta.themeColor}] ${meta.glowClass} scale-[1.02]`
                    : 'border-[#222222] text-[#6A6A65] hover:border-[#444] hover:text-white'
                }`}
                style={{
                  borderColor: isUnlocked ? meta.themeColor : '#222222',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: isUnlocked ? `${meta.themeColor}15` : '#0A0A0A',
                    borderColor: isUnlocked ? `${meta.themeColor}50` : '#262626',
                  }}
                >
                  {meta.icon}
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono-stats uppercase font-bold block" style={{ color: isUnlocked ? meta.themeColor : '#6A6A65' }}>
                    Level {idx + 1}
                  </span>
                  <span className="font-display font-extrabold text-xs text-white truncate max-w-[110px] block">
                    {rung.title}
                  </span>
                </div>

                <span className="text-[9px] font-mono-stats text-[#8A8A85]">
                  {rung.threshold} Regs
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 6 Full-Screen Height Level Reward Sections (One Card Per Viewport Page) ── */}
      <div className="relative space-y-16 sm:space-y-24">
        {LADDER_RUNGS.map((rung, idx) => {
          const isUnlocked = flowPct >= (rung.threshold / 200) * 100;
          const isBouncing = bouncingRungId === rung.id;
          const meta = LEVEL_METADATA[idx] || LEVEL_METADATA[0];

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
                {/* 3D Gold Coin Badge Header */}
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`relative transition-transform duration-300 ${isBouncing ? 'animate-value-pop scale-125' : ''}`}>
                    <div
                      className="absolute inset-0 rounded-full blur-2xl animate-pulse"
                      style={{ backgroundColor: `${meta.themeColor}30` }}
                    />
                    <BadgeCoinSVG badgeIndex={idx} size={120} isUnlocked={isUnlocked} />
                  </div>


                </div>

                {/* Single Unobstructed Reward Card */}
                <SpotlightCard
                  spotlightColor={isUnlocked ? `${meta.themeColor}35` : 'rgba(255, 255, 255, 0.05)'}
                  className={`p-6 sm:p-10 rounded-3xl border transition-all duration-500 shadow-2xl ${
                    isUnlocked
                      ? 'shadow-[0_16px_56px_rgba(0,0,0,0.8)]'
                      : 'border-[#262626] opacity-85'
                  }`}
                  style={{
                    borderColor: isUnlocked ? `${meta.themeColor}70` : '#262626',
                  }}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#242424] pb-4 flex-wrap gap-3">
                      <div>
                        <span className="text-xs font-mono-stats uppercase tracking-wider font-bold block" style={{ color: isUnlocked ? meta.themeColor : '#8A8A85' }}>
                          Level {idx + 1} Milestone Title
                        </span>
                        <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                          {rung.title}
                        </h3>
                      </div>

                      {/* Lock Status */}
                      {isUnlocked ? (
                        <div
                          className="flex items-center gap-1.5 border px-4 py-1.5 rounded-full text-xs font-mono-stats font-bold"
                          style={{
                            color: meta.themeColor,
                            backgroundColor: `${meta.themeColor}15`,
                            borderColor: `${meta.themeColor}40`,
                          }}
                        >
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
                      <span className="text-xs font-mono-stats font-bold uppercase tracking-wider" style={{ color: isUnlocked ? meta.themeColor : '#8A8A85' }}>
                        Milestone Requirement:
                      </span>
                      <p className="text-sm sm:text-base font-display font-extrabold text-white">
                        {rung.milestoneText}
                      </p>
                    </div>

                    {/* Active Privileges */}
                    <div className="border border-[#222222] rounded-2xl p-5 space-y-3">
                      <div className="text-xs font-mono-stats uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: isUnlocked ? meta.themeColor : '#8A8A85' }}>
                        <Zap className="w-4 h-4" />
                        LEVEL UNLOCKS & REWARDS:
                      </div>

                      <ul className="space-y-2.5">
                        {rung.unlocks.map((benefit, bIdx) => (
                          <li key={bIdx} className="text-xs sm:text-sm text-[#F5F3EF] flex items-start gap-3 font-sans font-medium">
                            <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" style={{ color: meta.themeColor }} />
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
                          className="inline-flex items-center gap-2 text-xs font-mono-stats font-bold text-[#8A8A85] hover:text-[#C4F62E] transition-colors cursor-pointer py-1.5 px-5 rounded-full border border-[#262626] hover:border-[#C4F62E]/40"
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
