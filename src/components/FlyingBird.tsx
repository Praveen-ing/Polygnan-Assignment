import React, { useEffect, useState } from 'react';

export const FlyingBird: React.FC = () => {
  const [posX, setPosX] = useState<number>(-60);
  const [baseY, setBaseY] = useState<number>(180);
  const [sinOffset, setSinOffset] = useState<number>(0);
  const [pitchAngle, setPitchAngle] = useState<number>(0);

  useEffect(() => {
    let animFrame: number;
    let t = 0;
    let currentX = -60;
    let currentBaseY = Math.random() * (window.innerHeight * 0.4) + 80;

    setBaseY(currentBaseY);

    const flightLoop = () => {
      t += 0.04;
      currentX += 2.5; // Flight speed across screen

      const waveY = Math.sin(t) * 25; // Gentle sine wave swoop
      const computedY = currentBaseY + waveY;
      const angle = Math.cos(t) * 12; // Pitch angle based on slope

      // If bird flies off right edge of screen, loop back to left edge with new altitude
      if (currentX > window.innerWidth + 80) {
        currentX = -80;
        currentBaseY = Math.random() * (window.innerHeight * 0.5) + 60;
        setBaseY(currentBaseY);
      }

      setPosX(currentX);
      setSinOffset(waveY);
      setPitchAngle(angle);

      animFrame = requestAnimationFrame(flightLoop);
    };

    animFrame = requestAnimationFrame(flightLoop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${posX}px, ${baseY + sinOffset}px, 0px) rotate(${pitchAngle}deg)`,
      }}
    >
      {/* Animated Flying Bird Vector */}
      <div className="relative flex items-center">
        <svg
          width="54"
          height="40"
          viewBox="0 0 100 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_16px_rgba(196,246,46,0.9)]"
        >
          {/* Bird Main Body */}
          <path
            d="M 50 40 C 60 38, 75 35, 85 32 C 90 31, 95 29, 98 32 C 95 36, 88 42, 80 44 C 65 48, 45 46, 30 42 C 20 40, 10 32, 5 28 C 12 32, 22 36, 32 38 Z"
            fill="#C4F62E"
          />

          {/* Left Wing Flapping */}
          <path
            d="M 45 40 C 40 20, 25 5, 10 0 C 18 14, 32 28, 42 38 Z"
            fill="#C4F62E"
            className="animate-bird-wing"
          />

          {/* Right Wing Flapping */}
          <path
            d="M 52 40 C 58 20, 72 4, 90 0 C 80 14, 64 27, 54 38 Z"
            fill="#A9E015"
            className="animate-bird-wing"
          />

          {/* Tail Feathers */}
          <path
            d="M 5 28 L 0 20 L 8 26 L 2 15 L 12 30 Z"
            fill="#C4F62E"
          />
        </svg>

        {/* Trail Glow Sparkle */}
        <span className="text-xs text-[#C4F62E] font-bold animate-ping absolute -left-3 top-2">
          ✨
        </span>
      </div>
    </div>
  );
};
