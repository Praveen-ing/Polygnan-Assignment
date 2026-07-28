import React, { useEffect, useState, useRef } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { CheckCircle2, Lock, Zap, Check } from 'lucide-react';
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
  const [riverTheme, setRiverTheme]       = useState<'gradient' | 'cyan' | 'lime' | 'orange'>('gradient');
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

  // Determine stroke color
  let strokeColor = 'url(#riverMultiGradient)';
  if (riverTheme === 'cyan') strokeColor = '#00F0FF';
  if (riverTheme === 'lime') strokeColor = '#C4F62E';
  if (riverTheme === 'orange') strokeColor = '#FF6B2C';

  return (
    <div ref={containerRef} className="space-y-12 relative">

      {/* ── Fixed Vertical Right Dock Navigation Bar ── */}
      <aside className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2 sm:p-3 border border-[#262626] rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="text-[10px] font-mono-stats text-[#8A8A85] uppercase tracking-wider px-2 py-1 flex items-center gap-1 font-bold">
          <Zap className="w-3 h-3 text-[#C4F62E]" />
          <span className="hidden md:inline">Milestones</span>
        </div>

        {LADDER_RUNGS.map((rung, idx) => {
          const isUnlocked = flowPct >= (rung.threshold / 200) * 100;
          return (
            <button
              key={rung.id}
              onClick={() => scrollToLevel(rung.id)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono-stats font-bold transition-all flex items-center gap-2 cursor-pointer border text-left ${
                isUnlocked
                  ? 'bg-[#C4F62E] text-[#0A0A0A] border-[#C4F62E] shadow-[0_2px_12px_rgba(196,246,46,0.4)] scale-[1.02]'
                  : 'border-[#222] text-[#8A8A85] hover:border-[#444] hover:text-white'
              }`}
            >
              <span className="w-5 h-5 rounded-full border border-[#333] flex items-center justify-center text-[10px] font-black flex-shrink-0">
                L{idx + 1}
              </span>
              <span className="hidden md:inline truncate max-w-[140px]">
                {rung.title}
              </span>
            </button>
          );
        })}

        {/* River Color Selector */}
        <div className="pt-2 mt-1 border-t border-[#222] space-y-1 text-center">
          <span className="text-[9px] font-mono-stats text-[#6A6A65] uppercase block">River Color</span>
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => setRiverTheme('gradient')}
              title="Liquid Gradient Flow"
              className={`w-4 h-4 rounded-full bg-gradient-to-b from-[#FF6B2C] via-[#C4F62E] to-[#00F0FF] border cursor-pointer ${riverTheme === 'gradient' ? 'border-white scale-110' : 'border-transparent opacity-70'}`}
            />
            <button
              onClick={() => setRiverTheme('cyan')}
              title="Electric Luminous Cyan"
              className={`w-4 h-4 rounded-full bg-[#00F0FF] border cursor-pointer ${riverTheme === 'cyan' ? 'border-white scale-110' : 'border-transparent opacity-70'}`}
            />
            <button
              onClick={() => setRiverTheme('lime')}
              title="EYFI Lime Green"
              className={`w-4 h-4 rounded-full bg-[#C4F62E] border cursor-pointer ${riverTheme === 'lime' ? 'border-white scale-110' : 'border-transparent opacity-70'}`}
            />
            <button
              onClick={() => setRiverTheme('orange')}
              title="Flame Orange"
              className={`w-4 h-4 rounded-full bg-[#FF6B2C] border cursor-pointer ${riverTheme === 'orange' ? 'border-white scale-110' : 'border-transparent opacity-70'}`}
            />
          </div>
        </div>
      </aside>

      {/* ── Massive Flowing River Container (Full Screen Scroll per Level) ── */}
      <div className="relative py-12 px-2 sm:px-6">

        {/* ── Background SVG Winding River Path ── */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* SVG Gradient Definition */}
            <defs>
              <linearGradient id="riverMultiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6B2C" />
                <stop offset="25%" stopColor="#E8B923" />
                <stop offset="60%" stopColor="#C4F62E" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>
            </defs>

            {/* Base river bed */}
            <path
              d="M 50 2 C 85 8, 85 16, 50 20 C 15 24, 15 32, 50 36 C 85 40, 85 48, 50 52 C 15 56, 15 64, 50 68 C 85 72, 85 80, 50 84 C 15 88, 15 96, 50 99"
              fill="none"
              stroke="#181818"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Unlocked river stroke with custom gradient/color */}
            <path
              d="M 50 2 C 85 8, 85 16, 50 20 C 15 24, 15 32, 50 36 C 85 40, 85 48, 50 52 C 15 56, 15 64, 50 68 C 85 72, 85 80, 50 84 C 15 88, 15 96, 50 99"
              fill="none"
              stroke={strokeColor}
              strokeWidth="4"
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
              className="opacity-50 animate-marquee"
            />
          </svg>
        </div>

        {/* ── 6 Full-Screen Height Level Sections ── */}
        <div className="relative space-y-12">
          {LADDER_RUNGS.map((rung, idx) => {
            const isUnlocked = flowPct >= (rung.threshold / 200) * 100;
            const isBouncing = bouncingRungId === rung.id;
            const isEven     = idx % 2 === 0;

            return (
              <div
                key={rung.id}
                id={`level-station-${rung.id}`}
                className="min-h-screen flex flex-col justify-center items-center py-16 relative transition-all duration-500"
              >
                <div
                  className={`w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 sm:gap-12 ${
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
                      <BadgeCoinSVG badgeIndex={idx} size={96} isUnlocked={isUnlocked} />
                    </div>

                    {/* Level Tag under coin */}
                    <span
                      className={`mt-3 font-mono-stats font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full border shadow-lg ${
                        isUnlocked
                          ? 'bg-[#C4F62E] text-[#0A0A0A] border-[#C4F62E]'
                          : 'text-[#6A6A65] border-[#222222]'
                      }`}
                    >
                      Level {idx + 1} of 6
                    </span>
                  </div>

                  {/* Station Card Content */}
                  <div className="flex-1 w-full relative z-20">
                    <SpotlightCard
                      spotlightColor={isUnlocked ? 'rgba(196, 246, 46, 0.25)' : 'rgba(255, 255, 255, 0.05)'}
                      className={`p-6 sm:p-10 rounded-3xl border transition-all duration-300 ${
                        isUnlocked
                          ? 'border-[#C4F62E]/50 shadow-[0_12px_48px_rgba(196,246,46,0.15)]'
                          : 'border-[#202020] opacity-85'
                      }`}
                    >
                      <div className="space-y-5">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#242424] pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono-stats text-[#8A8A85] uppercase tracking-wider font-bold">
                                Milestone Station {idx + 1}
                              </span>
                              <span className="text-xs font-mono-stats text-[#C4F62E] font-bold">
                                ({rung.threshold} Regs Required)
                              </span>
                            </div>
                            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                              {rung.title}
                            </h3>
                          </div>

                          {/* Status Icon */}
                          {isUnlocked ? (
                            <div className="w-10 h-10 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/40 flex items-center justify-center text-[#C4F62E]">
                              <Check className="w-5 h-5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full border border-[#262626] flex items-center justify-center text-[#6A6A65]">
                              <Lock className="w-5 h-5" />
                            </div>
                          )}
                        </div>

                        {/* Milestone Requirement */}
                        <div className="text-xs sm:text-sm font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
                          Requirement: {rung.milestoneText}
                        </div>

                        {/* Unlocked Privileges */}
                        <div className="border border-[#1E1E1E] rounded-2xl p-5 space-y-3">
                          <div className="text-xs font-mono-stats uppercase tracking-widest text-[#C4F62E] font-bold flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-[#C4F62E]" />
                            ACTIVE LEVEL UNLOCKS & REWARDS:
                          </div>
                          <ul className="space-y-2">
                            {rung.unlocks.map((benefit, bIdx) => (
                              <li key={bIdx} className="text-xs sm:text-sm text-[#F5F3EF] flex items-start gap-2.5 font-sans font-medium">
                                <CheckCircle2 className="w-4.5 h-4.5 text-[#C4F62E] flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </SpotlightCard>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
