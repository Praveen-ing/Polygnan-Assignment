import React, { useState } from 'react';
import { Filter, Sparkles, TrendingUp, Info } from 'lucide-react';

interface FunnelStage {
  id: string;
  level: string;
  title: string;
  regs: string;
  count: number;
  pct: number;
  color: string;
  perks: string;
}

const FUNNEL_DATA: FunnelStage[] = [
  { id: 'l0', level: 'Level 1', title: 'Scout', regs: 'Selected', count: 2847, pct: 100, color: '#C4F62E', perks: 'Private community, starter kit, part of the movement' },
  { id: 'l1', level: 'Level 2', title: 'Campus Ambassador', regs: '25 regs', count: 1420, pct: 49.8, color: '#B6EE1F', perks: 'Official title and badge, first swag drop, cash challenge' },
  { id: 'l2', level: 'Level 3', title: 'Level up', regs: '50 regs', count: 840, pct: 29.5, color: '#A8E512', perks: 'Event grants for your campus, exclusive merch' },
  { id: 'l3', level: 'Level 4', title: 'Go further', regs: '75 regs', count: 410, pct: 14.4, color: '#E8B923', perks: 'Mentorship access, Campus event grants' },
  { id: 'l4', level: 'Level 5', title: 'Paid internship Opportunity', regs: '100 regs', count: 180, pct: 6.3, color: '#F0C835', perks: 'Internship opportunities, invite to ambassador events' },
  { id: 'l5', level: 'Level 6', title: 'Founding Team', regs: '200 regs', count: 45, pct: 1.58, color: '#FFD700', perks: 'Consideration for the Founding Team, next wave' },
];

export const ScoutFunnelChart: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const selected = FUNNEL_DATA[activeStage];

  return (
    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 noise-overlay">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
          <Filter className="w-4 h-4 text-[#C4F62E]" />
          CF-Lens Analytics · Scout Conversion Funnel
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
          Ambassador <span className="text-[#C4F62E]">Level Funnel</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl mx-auto font-sans">
          Interactive conversion metrics showing scout progression rates across all 6 levels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Stacked Funnel Chart */}
        <div className="lg:col-span-7 space-y-3">
          {FUNNEL_DATA.map((stage, idx) => {
            const isSelected = activeStage === idx;
            // Width proportion for funnel shape
            const widthPct = Math.max(22, stage.pct);

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`relative group cursor-pointer transition-all duration-300 p-3.5 rounded-2xl border ${
                  isSelected
                    ? 'border-[#C4F62E] bg-[#161616] shadow-[0_4px_20px_rgba(196,246,46,0.25)] scale-[1.02]'
                    : 'border-[#1E1E1E] bg-[#111111] hover:border-[#333333]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono-stats mb-1.5 z-10 relative">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#1F1F1F] text-[#C4F62E] flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    {stage.title}
                  </span>
                  <span className="text-[#8A8A85] font-semibold">
                    <strong className="text-[#C4F62E]">{stage.count.toLocaleString()}</strong> scouts ({stage.pct}%)
                  </span>
                </div>

                {/* Progress Bar Fill */}
                <div className="w-full bg-[#181818] h-3 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: stage.color,
                      boxShadow: isSelected ? `0 0 12px ${stage.color}` : 'none',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Inspector */}
        <div className="lg:col-span-5 bg-[#121212] border border-[#222222] rounded-2xl p-6 space-y-5 shadow-xl relative">
          <div className="flex items-center justify-between border-b border-[#202020] pb-4">
            <div>
              <span className="text-[10px] font-mono-stats uppercase tracking-widest text-[#C4F62E] font-bold">
                STAGE DETAILS
              </span>
              <h4 className="font-display font-black text-xl text-white mt-0.5">
                {selected.title}
              </h4>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/30 text-xs font-mono-stats text-[#C4F62E] font-bold">
              {selected.regs}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] p-3.5 rounded-xl text-center">
              <p className="text-[10px] font-mono-stats text-[#8A8A85] uppercase">Active Scouts</p>
              <p className="font-display font-extrabold text-2xl text-[#C4F62E] mt-1">
                {selected.count.toLocaleString()}
              </p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] p-3.5 rounded-xl text-center">
              <p className="text-[10px] font-mono-stats text-[#8A8A85] uppercase">Cohort Funnel Rate</p>
              <p className="font-display font-extrabold text-2xl text-[#E8B923] mt-1">
                {selected.pct}%
              </p>
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-[#1E1E1E] p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono-stats text-[#C4F62E] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Stage Unlocks
            </div>
            <p className="text-xs text-[#F5F3EF] leading-relaxed font-sans">
              {selected.perks}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#6A6A65] font-mono-stats">
            <Info className="w-3.5 h-3.5 text-[#C4F62E]" />
            <span>Click any funnel stage to inspect cohort conversion statistics.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
