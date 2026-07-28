import React from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';

interface RegistrationCounterProps {
  regs: number;
  onRegsChange: (newVal: number) => void;
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
  onReset: () => void;
}

export const RegistrationCounter: React.FC<RegistrationCounterProps> = ({
  regs,
  onRegsChange,
  isAutoplay,
  onToggleAutoplay,
  onReset,
}) => {
  // Current tier
  let currentIdx = 0;
  for (let i = 0; i < LADDER_RUNGS.length; i++) {
    if (regs >= LADDER_RUNGS[i].threshold) currentIdx = i;
  }

  const currentRung = LADDER_RUNGS[currentIdx];
  const nextRung    = LADDER_RUNGS[currentIdx + 1];

  // Status text
  let statusText = '';
  if (currentIdx === LADDER_RUNGS.length - 1) {
    statusText = "👑 Founding Team — you've reached the top!";
  } else if (nextRung) {
    const diff = nextRung.threshold - Math.floor(regs);
    statusText = `${diff} more reg${diff === 1 ? '' : 's'} to unlock "${nextRung.title}"`;
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRegsChange(Number(e.target.value));
  };

  const handlePresetClick = (amount: number) => {
    onRegsChange(Math.min(200, regs + amount));
  };

  // Slider fill %
  const sliderPct = (regs / 200) * 100;

  return (
    <div className="bg-[#111111] border border-[#242424] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#C4F62E]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono-stats uppercase tracking-widest text-[#8A8A85]">
          Your Registrations
        </div>

        <div className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#262626] rounded-lg p-1">
          <button
            onClick={onToggleAutoplay}
            id="autoplay-toggle-btn"
            className={`flex items-center gap-1 text-[11px] font-mono-stats font-bold px-2.5 py-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4F62E] cursor-pointer ${
              isAutoplay
                ? 'bg-[#C4F62E] text-[#0A0A0A]'
                : 'text-[#F5F3EF] hover:bg-[#232323]'
            }`}
            title={isAutoplay ? 'Pause auto-climb' : 'Auto-play 0→200'}
          >
            {isAutoplay ? (
              <><Pause className="w-3 h-3 fill-current" /><span>Climbing…</span></>
            ) : (
              <><Play className="w-3 h-3 fill-current" /><span>Auto Climb</span></>
            )}
          </button>

          <button
            onClick={onReset}
            id="reset-btn"
            className="p-1 text-[#8A8A85] hover:text-[#F5F3EF] transition-colors rounded hover:bg-[#232323] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4F62E] cursor-pointer"
            title="Reset to 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Big count + current tier label */}
      <div className="text-center space-y-1.5">
        <div className="font-mono-stats text-5xl sm:text-6xl font-extrabold text-[#C4F62E] tracking-tight drop-shadow-[0_0_24px_rgba(196,246,46,0.4)]">
          {Math.round(regs)}
        </div>

        {/* Current tier badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-stats font-bold"
          style={{
            color: currentRung.color,
            backgroundColor: `${currentRung.color}15`,
            border: `1px solid ${currentRung.color}30`,
          }}
        >
          <span>{currentRung.icon}</span>
          <span>{currentRung.title}</span>
        </div>

        <div className="text-xs sm:text-sm text-[#8A8A85] font-sans min-h-[20px]">
          {statusText}
        </div>
      </div>

      {/* Range Slider */}
      <div className="space-y-2 pt-1">
        <input
          type="range"
          id="regs-slider"
          min="0"
          max="200"
          value={regs}
          onChange={handleSliderChange}
          onPointerDown={() => { if (isAutoplay) onToggleAutoplay(); }}
          style={{
            background: `linear-gradient(to right, #C4F62E ${sliderPct}%, #242424 ${sliderPct}%)`,
          }}
          aria-label="Registrations count slider"
        />

        {/* Tick marks */}
        <div className="flex justify-between font-mono-stats text-[9px] text-[#4A4640] px-1 font-semibold">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
          <span>200</span>
        </div>
      </div>

      {/* Quick Add Chips */}
      <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-[#1E1E1E]">
        <span className="text-[10px] font-mono-stats text-[#4A4640] uppercase tracking-wider">Quick Add:</span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[5, 10, 25, 50].map((amt) => (
            <button
              key={amt}
              id={`quick-add-${amt}`}
              onClick={() => handlePresetClick(amt)}
              className="inline-flex items-center gap-0.5 text-[10px] font-mono-stats font-semibold bg-[#1A1A1A] hover:bg-[#C4F62E]/15 hover:text-[#C4F62E] border border-[#262626] hover:border-[#C4F62E]/40 px-2.5 py-1 rounded-md transition-all text-[#F5F3EF] cursor-pointer"
            >
              <Plus className="w-2.5 h-2.5" />
              <span>{amt}</span>
            </button>
          ))}
          <button
            id="max-regs-btn"
            onClick={() => onRegsChange(200)}
            className="text-[10px] font-mono-stats font-bold bg-[#C4F62E]/10 hover:bg-[#C4F62E]/20 text-[#C4F62E] border border-[#C4F62E]/30 px-2.5 py-1 rounded-md transition-all cursor-pointer"
          >
            Max (200)
          </button>
        </div>
      </div>
    </div>
  );
};
