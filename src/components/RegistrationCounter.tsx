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
  // Find current and next stage
  let currentIdx = 0;
  for (let i = 0; i < LADDER_RUNGS.length; i++) {
    if (regs >= LADDER_RUNGS[i].threshold) {
      currentIdx = i;
    }
  }

  const currentRung = LADDER_RUNGS[currentIdx];
  const nextRung = LADDER_RUNGS[currentIdx + 1];

  let statusText = '';
  if (currentIdx === LADDER_RUNGS.length - 1) {
    statusText = "🏆 You've reached Founding Team consideration. Top of the ladder!";
  } else if (nextRung) {
    const diff = nextRung.threshold - regs;
    statusText = `${diff} more registration${diff === 1 ? '' : 's'} to unlock "${nextRung.title}"`;
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRegsChange(Number(e.target.value));
  };

  const handlePresetClick = (amount: number) => {
    const target = Math.min(200, regs + amount);
    onRegsChange(target);
  };

  return (
    <div className="bg-[#141414] border border-[#232323] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B2C]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header row & Auto-play controls */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono-stats uppercase tracking-widest text-[#726C64]">
          Your Registrations
        </div>

        <div className="flex items-center gap-1.5 bg-[#1B1B1B] border border-[#262626] rounded-lg p-1">
          <button
            onClick={onToggleAutoplay}
            className={`flex items-center gap-1 text-[11px] font-mono-stats font-semibold px-2.5 py-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414] ${
              isAutoplay
                ? 'bg-[#FF6B2C] text-[#0A0A0A]'
                : 'text-[#F5F3EF] hover:bg-[#232323]'
            }`}
            title={isAutoplay ? 'Pause auto-climb' : 'Auto-play climb (0 → 200)'}
          >
            {isAutoplay ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>Climbing...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Auto Climb</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="p-1 text-[#A39E93] hover:text-[#F5F3EF] transition-colors rounded hover:bg-[#232323] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
            title="Reset to 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Counter number and status */}
      <div className="text-center space-y-1">
        <div className="font-mono-stats text-5xl sm:text-6xl font-extrabold text-[#FFC857] tracking-tight drop-shadow-[0_0_24px_rgba(255,200,87,0.3)]">
          {Math.round(regs)}
        </div>
        <div className="text-xs sm:text-sm text-[#F5F3EF] font-medium min-h-[22px]">
          {statusText}
        </div>
      </div>

      {/* Range Slider */}
      <div className="space-y-2 pt-1">
        <input
          type="range"
          min="0"
          max="200"
          value={regs}
          onChange={handleSliderChange}
          onPointerDown={() => {
            if (isAutoplay) onToggleAutoplay();
          }}
          className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
          aria-label="Campus registrations count slider"
        />

        {/* Slider ticks */}
        <div className="flex justify-between font-mono-stats text-[10px] text-[#A39E93] px-1 font-semibold">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
          <span>200</span>
        </div>
      </div>

      {/* Quick Add Preset Chips */}
      <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-[#232323]">
        <span className="text-[11px] font-mono-stats text-[#A39E93]">Quick Add:</span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[5, 10, 25, 50].map((amt) => (
            <button
              key={amt}
              onClick={() => handlePresetClick(amt)}
              className="inline-flex items-center gap-0.5 text-[11px] font-mono-stats font-semibold bg-[#1B1B1B] hover:bg-[#FF6B2C]/20 hover:text-[#FF6B2C] border border-[#262626] hover:border-[#FF6B2C]/40 px-2.5 py-1 rounded-md transition-all text-[#F5F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
            >
              <Plus className="w-2.5 h-2.5" />
              <span>{amt}</span>
            </button>
          ))}
          <button
            onClick={() => onRegsChange(200)}
            className="text-[11px] font-mono-stats font-semibold bg-[#FFC857]/10 hover:bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30 px-2.5 py-1 rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
          >
            Max (200)
          </button>
        </div>
      </div>
    </div>
  );
};
