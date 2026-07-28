import React from 'react';
import { CAMPUSES } from '../data/ladderData';
import { MapPin } from 'lucide-react';

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#232323] text-xs font-mono-stats uppercase tracking-widest text-[#A39E93]">
          <span className="w-2 h-2 rounded-full bg-[#C4F62E] animate-pulse-glow shadow-[0_0_8px_#C4F62E]" />
          <span>WAVE 01 · CAMPUS AMBASSADOR LADDER</span>
        </div>

        {/* Campus Selector */}
        <div className="relative inline-flex items-center gap-1.5 bg-[#141414] border border-[#232323] hover:border-[#3A3A3A] rounded-full px-3 py-1 text-xs text-[#F5F3EF] transition-all focus-within:ring-2 focus-within:ring-[#C4F62E] focus-within:ring-offset-2 focus-within:ring-offset-[#0A0A0A]">
          <MapPin className="w-3.5 h-3.5 text-[#C4F62E]" />
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

      {/* Main Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#F5F3EF] leading-[1.2] tracking-tight">
          Every registration <br className="hidden sm:inline" />
          moves you <span className="text-[#C4F62E]">up the ladder.</span>
        </h1>
        <p className="text-sm text-[#A39E93] leading-relaxed max-w-xl">
          Drag the counter slider and watch what you unlock. Nothing here is handed to you — you climb it with real registrations.
        </p>
      </div>
    </header>
  );
};
