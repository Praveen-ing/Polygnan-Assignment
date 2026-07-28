import React, { useState } from 'react';
import { Shield, Sparkles, Download, Share2, CheckCircle, Zap, Award, Building, User } from 'lucide-react';
import { LADDER_RUNGS } from '../data/ladderData';

interface ScoutBadgeGeneratorProps {
  currentRegs: number;
}

export const ScoutBadgeGenerator: React.FC<ScoutBadgeGeneratorProps> = ({ currentRegs }) => {
  const [name, setName] = useState<string>('Alex Sharma');
  const [college, setCollege] = useState<string>('IIT Delhi');
  const [selectedRole, setSelectedRole] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculate tier based on currentRegs or manual selector
  const activeRung = LADDER_RUNGS[selectedRole] || LADDER_RUNGS[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden noise-overlay">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-[#C4F62E]/5 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-[#E8B923]/5 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] uppercase tracking-wider font-bold">
            <Sparkles className="w-4 h-4 text-[#C4F62E]" />
            Interactive Scout Pass Studio
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Preview Your Official <span className="text-[#C4F62E]">EYFI Campus Pass</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl mx-auto">
            Customize your personalized ambassador badge. See how your badge evolves as you unlock higher levels down the river.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Form */}
          <div className="lg:col-span-6 space-y-5 bg-[#121212] border border-[#222222] rounded-2xl p-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono-stats uppercase tracking-widest text-[#8A8A85] font-bold">
                Your Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A6A65]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-[#4A4640] focus:border-[#C4F62E] focus:outline-none transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono-stats uppercase tracking-widest text-[#8A8A85] font-bold">
                Campus / College Name
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A6A65]" />
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Enter college name"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-[#4A4640] focus:border-[#C4F62E] focus:outline-none transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono-stats uppercase tracking-widest text-[#8A8A85] font-bold">
                Preview Level Rank
              </label>
              <div className="grid grid-cols-3 gap-2">
                {LADDER_RUNGS.map((rung, idx) => (
                  <button
                    key={rung.id}
                    onClick={() => setSelectedRole(idx)}
                    className={`py-2 px-2 rounded-xl text-xs font-mono-stats font-bold transition-all text-center border cursor-pointer ${
                      selectedRole === idx
                        ? 'bg-[#C4F62E] text-[#0A0A0A] border-[#C4F62E] shadow-[0_2px_10px_rgba(196,246,46,0.3)]'
                        : 'bg-[#0A0A0A] text-[#8A8A85] border-[#222222] hover:border-[#333333]'
                    }`}
                  >
                    L{idx + 1}: {rung.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#6A6A65] border-t border-[#1E1E1E]">
              <span className="flex items-center gap-1.5 font-mono-stats">
                <Zap className="w-3.5 h-3.5 text-[#C4F62E]" />
                Live Requirement: {activeRung.milestoneText}
              </span>
              <button
                onClick={handleCopyLink}
                className="text-[#C4F62E] hover:underline font-mono-stats flex items-center gap-1 cursor-pointer"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-[#C4F62E]" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Link Copied!' : 'Share Pass'}
              </button>
            </div>
          </div>

          {/* 3D Holographic Pass Card Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm bg-gradient-to-b from-[#181818] via-[#111111] to-[#0A0A0A] border-2 border-[#C4F62E]/40 rounded-3xl p-6 space-y-6 shadow-[0_12px_48px_rgba(0,0,0,0.8)] relative group transition-transform duration-300 hover:scale-[1.02]">
              {/* Top Bar / Chip */}
              <div className="flex items-center justify-between border-b border-[#242424] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C4F62E] flex items-center justify-center font-display font-black text-[#0A0A0A] text-sm">
                    EY
                  </div>
                  <div>
                    <p className="font-display font-black text-white text-xs tracking-wider">EYFI SCOUT PASS</p>
                    <p className="text-[9px] font-mono-stats text-[#8A8A85]">WAVE 01 · OFFICIAL COHORT</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/30 text-[10px] font-mono-stats font-bold text-[#C4F62E] uppercase">
                  VERIFIED
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {/* Hologram Avatar Box */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#C4F62E]/20 to-[#E8B923]/20 border border-[#C4F62E]/40 flex items-center justify-center relative overflow-hidden">
                    <User className="w-8 h-8 text-[#C4F62E]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div>
                    <h4 className="font-display font-extrabold text-lg text-white leading-tight">
                      {name || 'Alex Sharma'}
                    </h4>
                    <p className="text-xs text-[#8A8A85] font-sans flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3 text-[#C4F62E]" />
                      {college || 'IIT Delhi'}
                    </p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#1E1E1E] text-[10px] font-mono-stats text-[#C4F62E] font-bold">
                      <Award className="w-3 h-3" />
                      {activeRung.title}
                    </div>
                  </div>
                </div>

                {/* Level Perks Unlocked */}
                <div className="bg-[#080808] border border-[#1C1C1C] rounded-xl p-3.5 space-y-2">
                  <p className="text-[10px] font-mono-stats uppercase tracking-widest text-[#8A8A85] font-bold">
                    ACTIVE LEVEL PRIVILEGES:
                  </p>
                  <ul className="space-y-1">
                    {activeRung.unlocks.map((u, i) => (
                      <li key={i} className="text-xs text-[#F5F3EF] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4F62E]" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Code / Pass Details */}
              <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono-stats text-[#6A6A65]">
                <span>ID: EYFI-SCOUT-2026</span>
                <span className="text-[#C4F62E] font-bold">LEVEL {selectedRole + 1} OF 6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
