import React, { useEffect, useState, useRef } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { Lock, ChevronDown, ChevronUp, CheckCircle, Zap, Star } from 'lucide-react';
import { RupeeCoinBurst } from './RupeeCoinBurst';

interface RewardLadderProps {
  currentRegs: number;
  unlockedSet: Set<number>;
  onUnlockNewRung?: (rungId: number) => void;
}

export const RewardLadder: React.FC<RewardLadderProps> = ({
  currentRegs,
  unlockedSet,
  onUnlockNewRung,
}) => {
  const [expandedRung, setExpandedRung]   = useState<number>(0);
  const [bouncingRungId, setBouncingRungId] = useState<number | null>(null);
  const [burstRungId, setBurstRungId]     = useState<number | null>(null);
  const burstRef = useRef<Record<number, { x: number; y: number }>>({});

  // Find overall progress percentage along the full ladder (0–200 regs)
  const totalRange = LADDER_RUNGS[LADDER_RUNGS.length - 1].threshold;
  const overallPct = Math.min(100, (currentRegs / totalRange) * 100);

  useEffect(() => {
    LADDER_RUNGS.forEach((rung) => {
      if (currentRegs >= rung.threshold && !unlockedSet.has(rung.id)) {
        onUnlockNewRung?.(rung.id);

        // Bounce
        setBouncingRungId(rung.id);
        const isMajor = rung.threshold >= 100;
        setTimeout(() => setBouncingRungId(null), isMajor ? 900 : 550);

        // Coin burst
        setBurstRungId(rung.id);
        setTimeout(() => setBurstRungId(null), 1200);

        // Auto-expand newly unlocked tier
        setExpandedRung(rung.id);
      }
    });
  }, [currentRegs, unlockedSet, onUnlockNewRung]);

  const handleToggleExpand = (rungId: number) => {
    setExpandedRung(prev => prev === rungId ? -1 : rungId);
  };

  // Position of each tier along the vertical bar (percentages)
  const getTierVerticalPct = (idx: number) => {
    if (LADDER_RUNGS.length <= 1) return 0;
    return (idx / (LADDER_RUNGS.length - 1)) * 100;
  };

  return (
    <div className="relative">
      {/* ── Vertical Timeline ── */}
      <div className="flex gap-4 sm:gap-6">

        {/* Left: Vertical line + nodes */}
        <div className="flex-shrink-0 w-8 sm:w-10 flex flex-col items-center relative">
          {/* Background line (full height) */}
          <div className="absolute top-3 bottom-3 w-0.5 bg-[#232323] left-1/2 -translate-x-1/2 rounded-full" />

          {/* Green fill line */}
          <div
            className="absolute top-3 w-0.5 bg-gradient-to-b from-[#C4F62E] to-[#E8B923] left-1/2 -translate-x-1/2 rounded-full transition-all duration-500 ease-out"
            style={{ height: `calc(${overallPct}% - 24px)` }}
          />

          {/* Animated climbing dot */}
          {currentRegs < LADDER_RUNGS[LADDER_RUNGS.length - 1].threshold && (
            <div
              className="absolute w-4 h-4 rounded-full border-2 border-[#C4F62E] bg-[#0A0A0A] left-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-10"
              style={{ top: `calc(${overallPct}% - 8px)` }}
            >
              <span className="absolute inset-0.5 rounded-full bg-[#C4F62E] animate-pulse" />
            </div>
          )}

          {/* Tier nodes — positioned evenly */}
          {LADDER_RUNGS.map((rung, idx) => {
            const isUnlocked = currentRegs >= rung.threshold;
            const nodeTopPct = getTierVerticalPct(idx);

            return (
              <div
                key={rung.id}
                className="absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-300"
                style={{ top: `calc(${nodeTopPct}% * (100% - 24px) / 100 + 3px)` }}
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    isUnlocked
                      ? 'bg-[#0A0A0A] border-[--tier-color] shadow-[0_0_8px_var(--tier-color)]'
                      : 'bg-[#111111] border-[#2A2A2A]'
                  }`}
                  style={{ '--tier-color': rung.color } as React.CSSProperties}
                >
                  {isUnlocked ? (
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: rung.color }}
                    />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#2A2A2A]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Tier cards */}
        <div className="flex-1 flex flex-col gap-3 sm:gap-4">
          {LADDER_RUNGS.map((rung) => {
            const isUnlocked = currentRegs >= rung.threshold;
            const isBouncing = bouncingRungId === rung.id;
            const isExpanded = expandedRung === rung.id;
            const regsToGo   = rung.threshold - Math.floor(currentRegs);

            return (
              <div key={rung.id} className="relative">
                {/* Coin burst */}
                {burstRungId === rung.id && (
                  <div className="absolute inset-0 pointer-events-none z-30">
                    <RupeeCoinBurst triggerKey={rung.id} />
                  </div>
                )}

                <div
                  className={`
                    rounded-2xl border transition-all duration-300 overflow-hidden
                    ${isBouncing ? 'animate-scale-bounce' : ''}
                    ${isUnlocked
                      ? 'border-[--tier-color]/40 bg-gradient-to-br from-[--tier-color]/5 via-[#111111] to-[#111111] hover:border-[--tier-color]/60 cursor-pointer'
                      : 'border-[#1E1E1E] bg-[#0D0D0D] opacity-60'
                    }
                    ${isBouncing ? 'animate-unlock-glow' : ''}
                  `}
                  style={{ '--tier-color': rung.color } as React.CSSProperties}
                  onClick={() => isUnlocked && handleToggleExpand(rung.id)}
                  role={isUnlocked ? 'button' : 'article'}
                  aria-expanded={isUnlocked ? isExpanded : undefined}
                  tabIndex={isUnlocked ? 0 : -1}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') isUnlocked && handleToggleExpand(rung.id); }}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 p-4 sm:p-5">
                    {/* Tier badge */}
                    <div
                      className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 ${
                        isUnlocked ? 'opacity-100' : 'opacity-25 grayscale'
                      }`}
                      style={{
                        background: isUnlocked
                          ? `radial-gradient(circle at 35% 30%, ${rung.color}40, ${rung.color}15)`
                          : '#1A1A1A',
                        border: `1.5px solid ${isUnlocked ? rung.color + '40' : '#2A2A2A'}`,
                      }}
                    >
                      {rung.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[10px] font-mono-stats font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            color: isUnlocked ? rung.color : '#4A4640',
                            backgroundColor: isUnlocked ? `${rung.color}15` : '#1A1A1A',
                          }}
                        >
                          {rung.reqText}
                        </span>
                        {isUnlocked && (
                          <span className="text-[10px] font-mono-stats text-[#4A4640] flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" style={{ color: rung.color }} />
                            UNLOCKED
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-extrabold text-sm sm:text-base text-[#F5F3EF] mt-0.5 leading-snug">
                        {rung.title}
                      </h3>
                      <p className="text-xs text-[#6A6A65] mt-0.5 leading-relaxed font-sans">
                        {rung.description}
                      </p>
                    </div>

                    {/* Right: expand icon or lock */}
                    <div className="flex-shrink-0 flex flex-col items-end gap-1">
                      {isUnlocked ? (
                        <>
                          <div
                            className="text-xs font-mono-stats font-bold"
                            style={{ color: rung.color }}
                          >
                            {rung.estimatedValue}
                          </div>
                          <div style={{ color: rung.color }} className="opacity-60">
                            {isExpanded
                              ? <ChevronUp className="w-4 h-4" />
                              : <ChevronDown className="w-4 h-4" />
                            }
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-end gap-1">
                          <Lock className="w-4 h-4 text-[#3A3A3A]" />
                          <span className="text-[9px] font-mono-stats text-[#3A3A3A] text-right">
                            {regsToGo} more regs
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded perk list */}
                  {isExpanded && isUnlocked && (
                    <div className="animate-tier-slide-in border-t border-[--tier-color]/15 px-4 sm:px-5 pb-5 pt-4 space-y-3">
                      {rung.perksDetailed.map((perk, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-3">
                          <span className="text-base flex-shrink-0 mt-0.5">{perk.emoji}</span>
                          <p className="text-xs sm:text-sm text-[#C8C8C4] font-sans leading-relaxed">
                            {perk.text}
                          </p>
                        </div>
                      ))}

                      {/* Value footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-[--tier-color]/10 mt-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono-stats text-[#8A8A85]">
                          <Zap className="w-3 h-3" style={{ color: rung.color }} />
                          {rung.timeToEarn}
                        </div>
                        <div className="font-mono-stats font-black text-sm" style={{ color: rung.color }}>
                          {rung.estimatedValue} value
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Locked overlay hint */}
                  {!isUnlocked && (
                    <div className="px-4 sm:px-5 pb-3">
                      <div className="inline-flex items-center gap-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-3 py-1 text-[10px] font-mono-stats text-[#4A4640]">
                        <Star className="w-2.5 h-2.5" />
                        Unlock at {rung.threshold} regs — {rung.estimatedValue} waiting
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
