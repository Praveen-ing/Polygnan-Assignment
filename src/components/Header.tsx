import React from 'react';
import { CAMPUSES } from '../data/ladderData';
import { Sparkles, MapPin, Zap } from 'lucide-react';

interface HeaderProps {
  selectedCampus: string;
  onSelectCampus: (campusId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedCampus, onSelectCampus }) => {
  const currentCampus = CAMPUSES.find((c) => c.id === selectedCampus) || CAMPUSES[0];

  return (
    <header className="space-y-4 text-left">
      {/* Eyebrow badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#232323] text-xs font-mono-stats uppercase tracking-widest text-[#726C64]">
          <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse-glow shadow-[0_0_8px_#FF6B2C]" />
          <span>WAVE 01 · CAMPUS AMBASSADOR LADDER</span>
        </div>

        {/* EYFI Brand Logo / Tag */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold font-heading">
          <Zap className="w-3.5 h-3.5 fill-[#FF6B2C]" />
          <span>EYFI // Earn Your First Income</span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F5F3EF] leading-[1.15] tracking-tight">
          Every registration <br className="hidden sm:inline" />
          moves you <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#FF8542] to-[#FFC857]">up the ladder.</span>
        </h1>
        <p className="text-sm text-[#A39E93] leading-relaxed max-w-xl">
          Drag the counter slider and watch what you unlock. Nothing here is handed to you — you climb it with real registrations.
        </p>
      </div>

      {/* Scarcity chip + Campus Selector */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B2C]" />
          <span>🔥 Only {currentCampus.remainingSpots} Ambassador spots left at {currentCampus.name}</span>
        </div>

        <div className="relative inline-flex items-center gap-1.5 bg-[#141414] border border-[#232323] hover:border-[#333] rounded-full px-3 py-1.5 text-xs text-[#F5F3EF] transition-all focus-within:ring-2 focus-within:ring-[#FFC857] focus-within:ring-offset-2 focus-within:ring-offset-[#0A0A0A]">
          <MapPin className="w-3.5 h-3.5 text-[#FFC857]" />
          <select
            value={selectedCampus}
            onChange={(e) => onSelectCampus(e.target.value)}
            className="bg-transparent text-[#F5F3EF] font-medium outline-none cursor-pointer pr-1 focus:outline-none"
          >
            {CAMPUSES.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#141414] text-[#F5F3EF]">
                {c.name} ({c.city})
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
