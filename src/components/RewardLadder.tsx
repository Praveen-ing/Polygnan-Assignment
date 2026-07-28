import React, { useEffect, useState, useRef } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { LadderRung } from '../types';
import { RupeeCoinBurst } from './RupeeCoinBurst';
import { BadgeIcon } from './BadgeIcon';
import { Check, Lock, Gift, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RewardLadderProps {
  currentRegs: number;
  unlockedSet: Set<number>;
  onUnlockNewRung?: (rungId: number) => void;
  onMajorMilestoneTrigger?: (rung: LadderRung) => void;
}

export const RewardLadder: React.FC<RewardLadderProps> = ({
  currentRegs,
  unlockedSet,
  onUnlockNewRung,
  onMajorMilestoneTrigger,
}) => {
  // Track recently unlocked rung IDs to trigger coin burst and scale bounce animations
  const [bouncingRungId, setBouncingRungId] = useState<number | null>(null);
  const [activeBurstRungs, setActiveBurstRungs] = useState<Set<number>>(new Set());

  const previousRegs = useRef(currentRegs);

  useEffect(() => {
    LADDER_RUNGS.forEach((rung) => {
      if (currentRegs >= rung.threshold && !unlockedSet.has(rung.id)) {
        onUnlockNewRung?.(rung.id);

        // Set bouncing rung
        setBouncingRungId(rung.id);
        setActiveBurstRungs((prev) => new Set(prev).add(rung.id));

        // Clear bounce animation state after duration
        const isMajor = rung.threshold >= 100;
        setTimeout(() => {
          setBouncingRungId(null);
        }, isMajor ? 1000 : 600);

        // Trigger major milestone spotlight modal if threshold is 100 or 200
        if (rung.threshold >= 100 && onMajorMilestoneTrigger) {
          onMajorMilestoneTrigger(rung);
        } else {
          // Standard confetti trigger for lower thresholds
          confetti({
            particleCount: 22,
            spread: 50,
            origin: { y: 0.65 },
            colors: ['#FFC857', '#FF6B2C', '#FFFFFF'],
          });
        }
      }
    });

    previousRegs.current = currentRegs;
  }, [currentRegs, unlockedSet, onUnlockNewRung, onMajorMilestoneTrigger]);

  // Determine current active rung index
  let currentIdx = 0;
  for (let i = 0; i < LADDER_RUNGS.length; i++) {
    if (currentRegs >= LADDER_RUNGS[i].threshold) {
      currentIdx = i;
    }
  }

  // Calculate vertical spine height percentage (0% at 0 regs, 100% at 200 regs)
  const spinePct = Math.min(100, Math.max(0, (currentRegs / 200) * 100));

  return (
    <div className="relative pl-9 sm:pl-10 space-y-4">
      {/* Vertical Spine Progress Track */}
      <div className="absolute left-2.5 sm:left-3 top-4 bottom-4 w-1 bg-[#232323] rounded-full overflow-hidden">
        <div
          className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-[#FF6B2C] to-[#FFC857] transition-all duration-300 ease-out shadow-[0_0_12px_rgba(255,107,44,0.6)]"
          style={{ height: `${spinePct}%` }}
        />
      </div>

      {/* Floating Spine Marker Node */}
      <div
        className="absolute left-0.5 sm:left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#FFF] via-[#FFC857] to-[#FF6B2C] shadow-[0_0_0_4px_rgba(255,107,44,0.2),0_0_16px_rgba(255,107,44,0.6)] flex items-center justify-center text-xs z-10 transition-all duration-300 ease-out"
        style={{
          bottom: `calc(${spinePct}% - 10px)`,
        }}
      >
        <span className="text-[10px] font-bold text-[#0A0A0A]">₹</span>
      </div>

      {/* The 6 Rung Cards */}
      <div className="space-y-4">
        {LADDER_RUNGS.map((rung, i) => {
          const isUnlocked = currentRegs >= rung.threshold;
          const isCurrentNext = !isUnlocked && i === currentIdx + 1;
          const isCurrentActive = isUnlocked && i === currentIdx;

          const isMajorMilestone = rung.threshold >= 100;
          const isBouncing = bouncingRungId === rung.id;

          // Animation class determination
          let animationClass = '';
          if (isBouncing) {
            animationClass = isMajorMilestone
              ? 'animate-scale-bounce-major spotlight-glow border-[#FFC857] z-30'
              : 'animate-scale-bounce border-[#FFC857] z-20';
          }

          return (
            <div
              key={rung.id}
              className={`relative group rounded-2xl p-4 sm:p-5 transition-all duration-300 border ${animationClass} ${
                isUnlocked
                  ? isMajorMilestone
                    ? 'bg-gradient-to-b from-[#241A0E] via-[#181410] to-[#141414] border-[#FFC857] shadow-[0_4px_28px_rgba(255,200,87,0.22)] opacity-100'
                    : 'bg-gradient-to-b from-[#181512] to-[#141414] border-[#FFC857]/40 shadow-[0_4px_20px_rgba(255,200,87,0.08)] opacity-100 scale-100'
                  : isCurrentNext
                  ? 'bg-[#141414] border-[#FF6B2C] shadow-[0_0_20px_rgba(255,107,44,0.2)] opacity-100 scale-[1.01]'
                  : 'bg-[#141414] border-[#232323] grayscale opacity-45 scale-[0.98]'
              }`}
            >
              {/* Falling Rupee Coin Particle Burst when freshly unlocked */}
              {activeBurstRungs.has(rung.id) && isUnlocked && (
                <RupeeCoinBurst triggerKey={`${rung.id}-${currentRegs}`} />
              )}

              {/* Major Milestone Badge Ribbon */}
              {isMajorMilestone && (
                <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-[#FF6B2C] to-[#FFC857] text-[#0A0A0A] font-mono-stats font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10">
                  <Sparkles className="w-2.5 h-2.5 fill-[#0A0A0A]" />
                  <span>Major Milestone</span>
                </div>
              )}

              {/* Connector line from spine to rung card */}
              <div
                className={`absolute -left-6 sm:-left-7 top-7 w-3.5 h-[2px] transition-colors ${
                  isUnlocked ? 'bg-[#FFC857]' : isCurrentNext ? 'bg-[#FF6B2C]' : 'bg-[#232323]'
                }`}
              />

              <div className="flex items-start gap-3.5 sm:gap-4">
                {/* Rung Badge Icon Artwork */}
                <div
                  className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isUnlocked
                      ? isMajorMilestone
                        ? 'scale-105'
                        : 'scale-100'
                      : 'opacity-70'
                  }`}
                >
                  <BadgeIcon
                    type={rung.badgeType}
                    isUnlocked={isUnlocked}
                    size={48}
                  />
                </div>

                {/* Rung Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#F5F3EF]">
                        {rung.title}
                      </h3>
                      {isCurrentActive && (
                        <span className="text-[10px] font-mono-stats uppercase px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] font-bold">
                          Current Tier
                        </span>
                      )}
                      {isCurrentNext && (
                        <span className="text-[10px] font-mono-stats uppercase px-2 py-0.5 rounded-full bg-[#FF6B2C]/20 text-[#FF6B2C] font-bold animate-pulse">
                          Next Goal
                        </span>
                      )}
                    </div>

                    <span
                      className={`font-mono-stats text-xs font-bold whitespace-nowrap px-2.5 py-1 rounded-md ${
                        isUnlocked
                          ? 'bg-[#FFC857]/10 text-[#FFC857] border border-[#FFC857]/30'
                          : 'bg-[#1B1B1B] text-[#A39E93] border border-[#232323]'
                      }`}
                    >
                      {rung.reqText}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isUnlocked ? 'text-[#D8D3CA]' : isCurrentNext ? 'text-[#F5F3EF]' : 'text-[#A39E93]'
                    }`}
                  >
                    {rung.description}
                  </p>

                  {/* Unlocked Perks Chips */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {rung.perks.map((perk, pIdx) => (
                      <span
                        key={pIdx}
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors ${
                          isUnlocked
                            ? 'bg-[#261E14] text-[#FFE8A3] border border-[#FFC857]/20'
                            : 'bg-[#1B1B1B] text-[#8C877E] border border-[#232323]'
                        }`}
                      >
                        <Gift className="w-3 h-3 text-[#FFC857]" />
                        <span>{perk}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Status Checkmark or Lock */}
                <div className="flex-shrink-0 pt-0.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isUnlocked
                        ? 'bg-[#FFC857] text-[#0A0A0A] shadow-[0_0_10px_rgba(255,200,87,0.5)]'
                        : isCurrentNext
                        ? 'bg-[#1B1B1B] border border-[#FF6B2C] text-[#FF6B2C]'
                        : 'bg-[#1B1B1B] border border-[#262626] text-[#4A4640]'
                    }`}
                  >
                    {isUnlocked ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <Lock className="w-3 h-3" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
