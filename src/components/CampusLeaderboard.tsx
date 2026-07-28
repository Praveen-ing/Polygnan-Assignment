import React, { useState } from 'react';
import { CAMPUSES } from '../data/ladderData';
import { Search, MapPin, Users, Flame, ShieldAlert, Sparkles } from 'lucide-react';

export const CampusLeaderboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCampuses = CAMPUSES.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E1E1E] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-[#C4F62E]" />
            Live College Scout Leaderboard
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Top Participating <span className="text-[#C4F62E]">Colleges</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl">
            Only 1 to 2 scout spots reserved per college in Wave 01. Check your campus status below.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A6A65]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search college or city..."
            className="w-full bg-[#121212] border border-[#262626] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-[#4A4640] focus:border-[#C4F62E] focus:outline-none transition-all font-sans"
          />
        </div>
      </div>

      {/* Grid of Colleges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCampuses.map((campus, idx) => (
          <div
            key={campus.id}
            className="bg-[#121212] border border-[#1E1E1E] hover:border-[#C4F62E]/40 rounded-2xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-lg relative overflow-hidden group"
          >
            {/* Rank Tag */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-stats font-extrabold text-[#C4F62E] bg-[#C4F62E]/10 border border-[#C4F62E]/30 px-2.5 py-0.5 rounded-md">
                #{idx + 1}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono-stats text-[#8A8A85]">
                <MapPin className="w-3 h-3 text-[#6A6A65]" />
                {campus.city}
              </span>
            </div>

            {/* Name */}
            <div>
              <h4 className="font-display font-extrabold text-base text-white group-hover:text-[#C4F62E] transition-colors">
                {campus.name}
              </h4>
              <p className="text-xs text-[#8A8A85] font-mono-stats mt-1">
                {campus.ambassadorsCount} Scouts Active
              </p>
            </div>

            {/* Stats Bar */}
            <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-[#8A8A85] font-mono-stats">
                <Users className="w-3.5 h-3.5 text-[#C4F62E]" />
                <span>{campus.topRegistrations} Regs</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[10px] font-mono-stats font-bold text-[#E8B923]">
                <ShieldAlert className="w-3 h-3" />
                {campus.remainingSpots} Spots Left
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Callout */}
      <div className="bg-[#141414] border border-[#222222] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-[#8A8A85] font-sans">
          <Sparkles className="w-5 h-5 text-[#C4F62E] flex-shrink-0" />
          <span>
            Don't see your college? You can still apply as the <strong className="text-white">Founding Scout</strong> for your campus!
          </span>
        </div>
        <a
          href="https://ambassador.eyfichallenge.com/#apply"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-[#C4F62E] text-[#0A0A0A] font-display font-extrabold text-xs hover:bg-[#b0eb18] transition-all cursor-pointer shadow-[0_2px_12px_rgba(196,246,46,0.3)]"
        >
          Claim Campus Spot →
        </a>
      </div>
    </div>
  );
};
