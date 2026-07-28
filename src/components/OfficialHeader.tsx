import React from 'react';
import { ExternalLink } from 'lucide-react';

interface OfficialHeaderProps {
  onNavClick?: (sectionId: string) => void;
}

export const OfficialHeader: React.FC<OfficialHeaderProps> = ({ onNavClick }) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0A0A0A]/85 border-b border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* EYFI Brand Logo */}
        <a href="#top" className="flex items-center gap-2 font-display font-black text-2xl tracking-tighter text-white">
          <div className="w-9 h-9 rounded-xl bg-[#C4F62E] text-[#0A0A0A] flex items-center justify-center font-extrabold text-lg">
            EY
          </div>
          <span>EYFI<span className="text-[#C4F62E]">.</span></span>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-8 font-sans text-xs sm:text-sm font-semibold">
          <button
            onClick={() => onNavClick?.('how-it-works')}
            className="text-[#8A8A85] hover:text-[#C4F62E] transition-colors cursor-pointer hidden sm:inline"
          >
            How It Works
          </button>

          <button
            onClick={() => onNavClick?.('ladder')}
            className="text-[#8A8A85] hover:text-[#C4F62E] transition-colors cursor-pointer hidden sm:inline"
          >
            6 River Levels
          </button>

          <button
            onClick={() => onNavClick?.('leaderboard')}
            className="text-[#8A8A85] hover:text-[#C4F62E] transition-colors cursor-pointer hidden sm:inline"
          >
            College Leaderboard
          </button>

          <button
            onClick={() => onNavClick?.('pass-studio')}
            className="text-[#8A8A85] hover:text-[#C4F62E] transition-colors cursor-pointer hidden sm:inline"
          >
            Pass Studio
          </button>

          <a
            href="https://ambassador.eyfichallenge.com/#apply"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#C4F62E] text-[#0A0A0A] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-display font-black hover:bg-[#b0eb18] transition-all shadow-[0_2px_12px_rgba(196,246,46,0.3)] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
};
