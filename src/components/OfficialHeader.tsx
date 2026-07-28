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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0A0A0A]/70 border-b border-[#242424]/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Official EYFI Logo Image */}
        <a href="#top" className="flex items-center active">
          <img
            src="/eyfi_orange_nobg_fv1.png"
            alt="EYFI — Earn Your First Income"
            className="h-14 sm:h-16 w-auto"
          />
        </a>

        {/* Nav */}
        <nav className="flex items-center gap-3 sm:gap-7 font-open-sans text-sm sm:text-base font-semibold">
          <button
            onClick={() => onTabClick?.('ladder')}
            className="text-[#F5F3EF]/80 hover:text-[#FF6B2C] transition hidden sm:inline cursor-pointer"
          >
            Reward Ladder
          </button>

          <a
            href="https://ambassador.eyfichallenge.com/how-it-works"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F3EF]/80 hover:text-[#FF6B2C] transition hidden sm:inline"
          >
            How it works
          </a>

          <a
            href="https://ambassador.eyfichallenge.com/faq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F3EF]/80 hover:text-[#FF6B2C] transition hidden sm:inline"
          >
            FAQs
          </a>

          <a
            href="https://eyfichallenge.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F3EF]/80 hover:text-[#FF6B2C] transition hidden sm:inline"
          >
            EYFI Challenge
          </a>

          <button
            id="header-apply-btn"
            onClick={onApplyClick}
            type="button"
            className="rounded-full bg-[#FF6B2C] text-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-sm sm:text-base font-bold hover:opacity-90 transition cursor-pointer"
          >
            Apply Now
          </button>
        </nav>
      </div>
    </header>
  );
};
