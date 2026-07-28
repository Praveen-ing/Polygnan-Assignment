import React, { useState } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { LadderRung } from '../types';
import { CheckCircle, Lock, ChevronRight, ChevronLeft, Zap, ShieldCheck } from 'lucide-react';
import { RupeeCoinBurst } from './RupeeCoinBurst';

interface RiverLadderProps {
  currentRegs: number;
  unlockedSet: Set<number>;
  onUnlockNewRung?: (rungId: number) => void;
}

export const RiverLadder: React.FC<RiverLadderProps> = ({
  currentRegs,
  unlockedSet,
}) => {
  // Active level page index (0 to 5)
  const [activeLevelIdx, setActiveLevelIdx] = useState<number>(() => {
    let idx = 0;
    for (let i = 0; i < LADDER_RUNGS.length; i++) {
      if (currentRegs >= LADDER_RUNGS[i].threshold) idx = i;
    }
    return idx;
  });

  const activeRung = LADDER_RUNGS[activeLevelIdx];
  const isUnlocked = currentRegs >= activeRung.threshold;
  const regsNeeded = activeRung.threshold - Math.floor(currentRegs);

  // River curve node coordinates (x %, y % along SVG canvas)
  const riverNodes = [
    { x: 15, y: 10, label: 'L1: Scout', thresh: 0 },
    { x: 82, y: 26, label: 'L2: Ambassador', thresh: 25 },
    { x: 20, y: 44, label: 'L3: Level Up', thresh: 50 },
    { x: 80, y: 62, label: 'L4: Go Further', thresh: 75 },
    { x: 22, y: 78, label: 'L5: Internship', thresh: 100 },
    { x: 85, y: 92, label: 'L6: Founding', thresh: 200 },
  ];

  return (
    <div className="space-y-8">
      {/* ── 1. Page Step Selector (Level 1 to 6 Tabs) ── */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none border-b border-[#1A1A1A]">
        {LADDER_RUNGS.map((rung, idx) => {
          const unlocked = currentRegs >= rung.threshold;
          const isActive = idx === activeLevelIdx;

          return (
            <button
              key={rung.id}
              onClick={() => setActiveLevelIdx(idx)}
              className={`flex-1 min-w-[100px] sm:min-w-0 py-2.5 px-3 rounded-xl text-center transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#C4F62E] text-[#0A0A0A] border-[#C4F62E] font-bold shadow-[0_2px_12px_rgba(196,246,46,0.3)]'
                  : unlocked
                  ? 'bg-[#141414] text-[#F5F3EF] border-[#242424] hover:border-[#C4F62E]/40 font-semibold'
                  : 'bg-[#0D0D0D] text-[#4A4640] border-[#181818] hover:text-[#8A8A85]'
              }`}
            >
              <div className="text-[10px] font-mono-stats uppercase tracking-wider opacity-80">
                Level {idx + 1}
              </div>
              <div className="text-xs sm:text-sm truncate font-display font-extrabold mt-0.5">
                {rung.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── 2. Curved River Map + Active Level Showcase Page (2-col on desktop) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Winding River S-Curve Canvas */}
        <div className="lg:col-span-5 bg-[#0F0F0F] border border-[#232323] rounded-3xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono-stats font-bold text-[#C4F62E] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-[#C4F62E]" />
              Level River Pathway
            </span>
            <span className="text-[10px] font-mono-stats text-[#6A6A65]">
              Click any level to view page
            </span>
          </div>

          {/* SVG Winding River Container */}
          <div className="relative w-full h-[420px] sm:h-[480px]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Background dark river track */}
              <path
                d="M 15 10 C 85 10, 85 26, 82 26 C 75 26, 18 44, 20 44 C 22 44, 82 62, 80 62 C 78 62, 20 78, 22 78 C 24 78, 87 92, 85 92"
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Glowing active river line */}
              <path
                d="M 15 10 C 85 10, 85 26, 82 26 C 75 26, 18 44, 20 44 C 22 44, 82 62, 80 62 C 78 62, 20 78, 22 78 C 24 78, 87 92, 85 92"
                fill="none"
                stroke="#C4F62E"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="300"
                strokeDashoffset={300 - (Math.min(200, currentRegs) / 200) * 300}
                className="transition-all duration-700 ease-out shadow-[0_0_12px_#C4F62E]"
              />
            </svg>

            {/* 6 Checkpoint Level Nodes positioned along river */}
            {riverNodes.map((node, idx) => {
              const rung = LADDER_RUNGS[idx];
              const unlocked = currentRegs >= rung.threshold;
              const isSelected = idx === activeLevelIdx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveLevelIdx(idx)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 cursor-pointer ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                  }`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {/* Node outer ring */}
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                      isSelected
                        ? 'bg-[#C4F62E] text-[#0A0A0A] border-white shadow-[0_0_16px_rgba(196,246,46,0.8)]'
                        : unlocked
                        ? 'bg-[#141414] text-[#C4F62E] border-[#C4F62E] shadow-[0_0_8px_rgba(196,246,46,0.3)]'
                        : 'bg-[#0D0D0D] text-[#4A4640] border-[#242424]'
                    }`}
                  >
                    <span className="text-lg">{rung.icon}</span>
                  </div>

                  {/* Level label tooltip below node */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap px-2 py-0.5 rounded-full text-[9px] font-mono-stats font-bold transition-all ${
                      isSelected
                        ? 'bg-[#C4F62E] text-[#0A0A0A]'
                        : unlocked
                        ? 'bg-[#1A1A1A] text-[#F5F3EF] border border-[#2E2E2E]'
                        : 'bg-[#111111] text-[#4A4640]'
                    }`}
                  >
                    L{idx + 1}: {rung.reqText}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1E1E1E] flex items-center justify-between text-xs font-mono-stats text-[#6A6A65]">
            <span>Start: 0 Regs</span>
            <span className="text-[#C4F62E] font-bold">Winding Level River</span>
            <span>Goal: 200 Regs</span>
          </div>
        </div>

        {/* Right Col: Active Level Showcase Page (Step Card) */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#242424] rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
          {/* Top Level Banner */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#C4F62E]/10 border border-[#C4F62E]/30 text-[#C4F62E] text-xs font-mono-stats font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Level {activeLevelIdx + 1} of 6
              </span>
              <span className="text-xs font-mono-stats text-[#8A8A85]">
                {activeRung.reqText}
              </span>
            </div>

            {/* Status Badge */}
            {isUnlocked ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono-stats font-bold text-[#C4F62E] bg-[#C4F62E]/10 border border-[#C4F62E]/30 px-3 py-1 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                UNLOCKED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono-stats text-[#6A6A65] bg-[#1A1A1A] border border-[#262626] px-3 py-1 rounded-full">
                <Lock className="w-3.5 h-3.5 text-[#6A6A65]" />
                Requires {regsNeeded} more regs
              </span>
            )}
          </div>

          {/* Level Header Title & Description */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 shadow-inner">
              {activeRung.icon}
            </div>
            <div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                {activeRung.title}
              </h3>
              <p className="text-sm text-[#8A8A85] mt-1 font-sans leading-relaxed">
                {activeRung.description}
              </p>
              <p className="text-xs text-[#C4F62E] font-mono-stats mt-2 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-[#C4F62E]" />
                Estimated time: {activeRung.timeToEarn}
              </p>
            </div>
          </div>

          {/* Unlocked Rewards List for this Level */}
          <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-5 space-y-4">
            <div className="text-xs font-mono-stats uppercase tracking-widest text-[#C4F62E] font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C4F62E]" />
              Rewards & Privileges Unlocked at Level {activeLevelIdx + 1}
            </div>

            <div className="space-y-3">
              {activeRung.perksDetailed.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#121212] border border-[#1E1E1E] p-3.5 rounded-xl">
                  <span className="text-xl flex-shrink-0">{perk.emoji}</span>
                  <p className="text-xs sm:text-sm text-[#F5F3EF] font-sans leading-relaxed">
                    {perk.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Level Page Navigation Footer Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1E1E1E] flex-wrap gap-3">
            <button
              onClick={() => setActiveLevelIdx(prev => Math.max(0, prev - 1))}
              disabled={activeLevelIdx === 0}
              className="inline-flex items-center gap-1.5 text-xs font-mono-stats font-bold text-[#F5F3EF] bg-[#1A1A1A] hover:bg-[#232323] disabled:opacity-30 disabled:pointer-events-none px-4 py-2.5 rounded-xl border border-[#2A2A2A] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Level
            </button>

            <span className="text-xs font-mono-stats text-[#6A6A65]">
              Level {activeLevelIdx + 1} / 6
            </span>

            <button
              onClick={() => setActiveLevelIdx(prev => Math.min(5, prev + 1))}
              disabled={activeLevelIdx === 5}
              className="inline-flex items-center gap-1.5 text-xs font-mono-stats font-bold text-[#0A0A0A] bg-[#C4F62E] hover:bg-[#b0eb18] disabled:opacity-30 disabled:pointer-events-none px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Next Level
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
