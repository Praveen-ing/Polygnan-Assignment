import React, { useState } from 'react';
import { Sparkles, Share2, CheckCircle, Zap, Building, User, QrCode, Cpu } from 'lucide-react';
import { LADDER_RUNGS } from '../data/ladderData';
import { BadgeCoinSVG } from './BadgeCoinSVG';
import { SpotlightCard } from './SpotlightCard';

interface ScoutBadgeGeneratorProps {
  currentRegs: number;
}

export const ScoutBadgeGenerator: React.FC<ScoutBadgeGeneratorProps> = ({ currentRegs }) => {
  const [name, setName] = useState<string>('Alex Sharma');
  const [college, setCollege] = useState<string>('IIT Delhi');
  const [selectedRole, setSelectedRole] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const activeRung = LADDER_RUNGS[selectedRole] || LADDER_RUNGS[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden py-6">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-[#C4F62E]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-[#E8B923]/10 rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] uppercase tracking-wider font-bold">
            <Sparkles className="w-4 h-4 text-[#C4F62E]" />
            Interactive Scout Pass Studio
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-5xl text-white tracking-tight">
            Preview Your Official <span className="text-[#C4F62E]">EYFI Campus Pass</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl mx-auto font-sans">
            Customize your personalized ambassador badge. See how your pass evolves as you unlock higher levels down the river.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Form */}
          <div className="lg:col-span-6 space-y-5 bg-[#121212]/80 border border-[#222222] rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
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
                  className="w-full bg-[#0A0A0A]/90 border border-[#2A2A2A] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-[#4A4640] focus:border-[#C4F62E] focus:outline-none transition-all font-sans"
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
                  className="w-full bg-[#0A0A0A]/90 border border-[#2A2A2A] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-[#4A4640] focus:border-[#C4F62E] focus:outline-none transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono-stats uppercase tracking-widest text-[#8A8A85] font-bold">
                Select Level Rank Preview
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {LADDER_RUNGS.map((rung, idx) => {
                  const isSelected = selectedRole === idx;
                  return (
                    <button
                      key={rung.id}
                      onClick={() => setSelectedRole(idx)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-mono-stats font-bold transition-all text-left border cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#C4F62E] text-[#0A0A0A] border-[#C4F62E] shadow-[0_4px_16px_rgba(196,246,46,0.35)] scale-[1.02]'
                          : 'bg-[#0A0A0A]/90 text-[#8A8A85] border-[#222222] hover:border-[#444444] hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] opacity-75">L{idx + 1}</span>
                      <span className="truncate font-extrabold">{rung.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs text-[#6A6A65] border-t border-[#1E1E1E]">
              <span className="flex items-center gap-1.5 font-mono-stats">
                <Zap className="w-3.5 h-3.5 text-[#C4F62E]" />
                Requirement: <strong className="text-white">{activeRung.milestoneText}</strong>
              </span>
              <button
                onClick={handleCopyLink}
                className="text-[#C4F62E] hover:underline font-mono-stats flex items-center gap-1 cursor-pointer font-bold"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-[#C4F62E]" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Pass Link Copied!' : 'Share Pass'}
              </button>
            </div>
          </div>

          {/* Pass Card Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <SpotlightCard
              spotlightColor="rgba(196, 246, 46, 0.25)"
              className="w-full max-w-sm bg-gradient-to-b from-[#1C1C1C]/90 via-[#121212]/90 to-[#080808]/90 border-2 border-[#C4F62E]/50 rounded-3xl p-6 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative group backdrop-blur-md"
            >
              {/* Simulated Lanyard Slot */}
              <div className="w-12 h-1.5 rounded-full bg-[#050505] border border-[#2A2A2A] mx-auto -mt-2 opacity-80" />

              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[#262626] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#C4F62E] text-[#0A0A0A] flex items-center justify-center font-display font-black text-sm shadow-[0_0_12px_rgba(196,246,46,0.5)]">
                    EY
                  </div>
                  <div>
                    <p className="font-display font-black text-white text-xs tracking-wider">EYFI SCOUT PASS</p>
                    <p className="text-[9px] font-mono-stats text-[#8A8A85]">WAVE 01 · OFFICIAL COHORT</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-[#C4F62E]/10 border border-[#C4F62E]/40 px-3 py-1 rounded-full text-[10px] font-mono-stats font-bold text-[#C4F62E]">
                  <Cpu className="w-3 h-3 text-[#C4F62E]" />
                  VERIFIED
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  {/* 3D Gold Badge Coin */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-[#FAD02C]/20 blur-xl animate-pulse" />
                    <BadgeCoinSVG badgeIndex={selectedRole} size={72} isUnlocked={true} />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-black text-xl text-white leading-tight">
                      {name || 'Alex Sharma'}
                    </h4>
                    <p className="text-xs text-[#8A8A85] font-sans flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#C4F62E]" />
                      {college || 'IIT Delhi'}
                    </p>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#1E1E1E] border border-[#2E2E2E] text-[10px] font-mono-stats text-[#C4F62E] font-bold">
                      {activeRung.title}
                    </div>
                  </div>
                </div>

                {/* Level Perks Unlocked */}
                <div className="bg-[#070707]/90 border border-[#1E1E1E] rounded-2xl p-4 space-y-2.5">
                  <p className="text-[10px] font-mono-stats uppercase tracking-widest text-[#C4F62E] font-bold">
                    ACTIVE LEVEL PRIVILEGES:
                  </p>
                  <ul className="space-y-1.5">
                    {activeRung.unlocks.map((u, i) => (
                      <li key={i} className="text-xs text-[#F5F3EF] flex items-center gap-2 font-sans font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4F62E] flex-shrink-0" />
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Code & QR */}
              <div className="pt-3 border-t border-[#202020] flex items-center justify-between text-[10px] font-mono-stats">
                <div>
                  <p className="text-[#6A6A65]">ID: EYFI-SCOUT-2026</p>
                  <p className="text-[#C4F62E] font-bold mt-0.5">LEVEL {selectedRole + 1} OF 6</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-[#8A8A85]">
                  <QrCode className="w-5 h-5 text-[#C4F62E]" />
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
};
