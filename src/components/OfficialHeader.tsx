import React from 'react';

interface OfficialHeaderProps {
  onApplyClick?: () => void;
  onTabClick?: (tab: string) => void;
}

export const OfficialHeader: React.FC<OfficialHeaderProps> = ({
  onApplyClick,
  onTabClick,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0A0A0A]/85 border-b border-[#1E1E1E]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* EYFI Logo */}
        <a href="#top" className="flex items-center gap-2 focus:outline-none group">
          <div className="font-display font-black text-2xl sm:text-3xl text-[#FF6B2C] tracking-tight">
            EYFI<span className="text-white">.</span>
            <span className="text-sm font-semibold ml-1.5 text-[#8A8A85] font-sans">
              Ambassadors
            </span>
          </div>
        </a>

        {/* Nav */}
        <nav className="flex items-center gap-3 sm:gap-6 font-sans text-xs sm:text-sm font-semibold">
          <button
            onClick={() => onTabClick?.('ladder')}
            className="text-[#F5F3EF]/70 hover:text-[#FF6B2C] transition cursor-pointer hidden sm:inline"
          >
            Reward Ladder
          </button>

          <a
            href="https://eyfichallenge.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F3EF]/70 hover:text-[#FF6B2C] transition hidden sm:inline"
          >
            EYFI Challenge ↗
          </a>

          <button
            id="header-apply-btn"
            onClick={onApplyClick}
            type="button"
            className="rounded-full bg-[#FF6B2C] text-white px-4 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-display font-extrabold hover:bg-[#e85a1a] transition cursor-pointer shadow-[0_2px_16px_rgba(255,107,44,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C]"
          >
            Apply Now
          </button>
        </nav>
      </div>
    </header>
  );
};
