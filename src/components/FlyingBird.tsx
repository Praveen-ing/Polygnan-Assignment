import React from 'react';

export const FlyingBird: React.FC = () => {
  return (
    <div className="fixed top-24 left-0 w-full pointer-events-none z-30 overflow-hidden h-32">
      {/* Animated Flying Bird Container */}
      <div className="animate-bird-flight absolute flex items-center gap-2">
        <svg
          width="48"
          height="36"
          viewBox="0 0 100 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_12px_rgba(196,246,46,0.6)]"
        >
          {/* Bird Body & Beak */}
          <path
            d="M 50 40 C 60 38, 75 35, 85 32 C 90 31, 95 29, 98 32 C 95 36, 88 42, 80 44 C 65 48, 45 46, 30 42 C 20 40, 10 32, 5 28 C 12 32, 22 36, 32 38 Z"
            fill="#C4F62E"
          />

          {/* Left Wing (Flapping) */}
          <path
            d="M 45 40 C 40 25, 30 8, 15 2 C 22 15, 35 28, 42 38 Z"
            fill="#C4F62E"
            className="animate-bird-wing origin-bottom-right"
          />

          {/* Right Wing (Flapping) */}
          <path
            d="M 52 40 C 58 24, 70 6, 88 0 C 78 14, 62 27, 54 38 Z"
            fill="#A9E015"
            className="animate-bird-wing origin-bottom-left"
          />

          {/* Tail Feathers */}
          <path
            d="M 5 28 L 0 20 L 8 26 L 2 15 L 12 30 Z"
            fill="#C4F62E"
          />
        </svg>

        {/* Small Trail Sparkles */}
        <span className="text-[10px] font-mono-stats text-[#C4F62E]/70 font-bold animate-pulse">
          ✨
        </span>
      </div>
    </div>
  );
};
