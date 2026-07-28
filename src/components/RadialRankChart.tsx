import React from 'react';
import { Target, Zap, Shield, Sparkles } from 'lucide-react';
import { LADDER_RUNGS } from '../data/ladderData';

interface RadialRankChartProps {
  currentRegs: number;
}

export const RadialRankChart: React.FC<RadialRankChartProps> = ({ currentRegs }) => {
  // Current active tier
  let activeIdx = 0;
  for (let i = 0; i < LADDER_RUNGS.length; i++) {
    if (currentRegs >= LADDER_RUNGS[i].threshold) activeIdx = i;
  }

  const activeRung = LADDER_RUNGS[activeIdx];
  const maxRegs    = 200;
  const overallPct = Math.min(100, Math.round((currentRegs / maxRegs) * 100));

  // SVG Gauge metrics
  const radius = 90;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPct / 100) * circumference;

  return (
    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 noise-overlay">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
          <Target className="w-4 h-4 text-[#C4F62E]" />
          CF-Lens Visual Analytics · Radial Level Gauge
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
          Progress <span className="text-[#C4F62E]">Radial Gauge</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl mx-auto font-sans">
          Real-time circular progress gauge measuring current campus registrations against the Level 6 milestone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Radial Circular Gauge */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
              {/* Background Ring Track */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#181818"
                strokeWidth={stroke}
              />

              {/* Glowing Active Ring Fill */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#C4F62E"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-700 ease-out river-line-glow"
              />

              {/* Inner Accent Ring */}
              <circle
                cx="110"
                cy="110"
                r={radius - 18}
                fill="none"
                stroke="#E8B923"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                className="opacity-40"
              />
            </svg>

            {/* Inner Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-[10px] font-mono-stats uppercase tracking-widest text-[#8A8A85] font-bold">
                REGISTRATIONS
              </span>
              <span className="font-mono-stats font-extrabold text-4xl sm:text-5xl text-[#C4F62E]">
                {Math.round(currentRegs)}
              </span>
              <span className="text-xs font-mono-stats font-bold text-white bg-[#1A1A1A] border border-[#262626] px-3 py-0.5 rounded-full">
                {overallPct}% COMPLETE
              </span>
            </div>
          </div>
        </div>

        {/* Level Ring Metrics Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#121212] border border-[#222222] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-stats text-[#8A8A85] uppercase tracking-wider font-bold">
                CURRENT LEVEL STATUS
              </span>
              <span className="text-xs font-mono-stats text-[#C4F62E] font-bold">
                LEVEL {activeIdx + 1} OF 6
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#C4F62E]/10 border border-[#C4F62E]/30 flex items-center justify-center text-[#C4F62E] font-display font-black text-xl">
                {activeIdx + 1}
              </div>
              <div>
                <h4 className="font-display font-extrabold text-lg text-white">
                  {activeRung.title}
                </h4>
                <p className="text-xs text-[#8A8A85] font-mono-stats">
                  {activeRung.milestoneText}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1C1C1C] space-y-2">
              <p className="text-[10px] font-mono-stats uppercase tracking-widest text-[#8A8A85] font-bold">
                ACTIVE UNLOCKS:
              </p>
              <ul className="space-y-1">
                {activeRung.unlocks.map((u, i) => (
                  <li key={i} className="text-xs text-[#F5F3EF] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C4F62E] flex-shrink-0" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
