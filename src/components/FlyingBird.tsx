import React, { useEffect, useState, useRef } from 'react';

export const FlyingBird: React.FC = () => {
  const [pos, setPos] = useState({ x: 100, y: 150 });
  const [angle, setAngle] = useState(0);
  const targetRef = useRef({ x: 300, y: 200 });
  const currentPosRef = useRef({ x: 100, y: 150 });
  const speedRef = useRef(2.5);

  useEffect(() => {
    // Generate new random waypoint inside viewport
    const pickNewTarget = () => {
      const margin = 80;
      const maxX = Math.max(300, window.innerWidth - margin);
      const maxY = Math.max(300, window.innerHeight - margin);
      targetRef.current = {
        x: Math.random() * (maxX - margin) + margin,
        y: Math.random() * (maxY - margin) + margin,
      };
      // Randomize flight speed per leg
      speedRef.current = Math.random() * 2 + 2; // 2px - 4px per frame
    };

    pickNewTarget();

    let animFrame: number;
    const updateFlight = () => {
      const curr = currentPosRef.current;
      const target = targetRef.current;

      const dx = target.x - curr.x;
      const dy = target.y - curr.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 30) {
        // Reached destination, pick next random waypoint
        pickNewTarget();
      } else {
        // Smoothly steer toward target
        const moveAngle = Math.atan2(dy, dx);
        const speed = speedRef.current;

        curr.x += Math.cos(moveAngle) * speed;
        curr.y += Math.sin(moveAngle) * speed;

        setPos({ x: curr.x, y: curr.y });
        setAngle(moveAngle * (180 / Math.PI));
      }

      animFrame = requestAnimationFrame(updateFlight);
    };

    animFrame = requestAnimationFrame(updateFlight);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) rotate(${angle}deg)`,
      }}
    >
      {/* Small Flying Bird Vector */}
      <div className="relative flex items-center">
        <svg
          width="42"
          height="32"
          viewBox="0 0 100 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_14px_rgba(196,246,46,0.8)]"
        >
          {/* Bird Body */}
          <path
            d="M 50 40 C 60 38, 75 35, 85 32 C 90 31, 95 29, 98 32 C 95 36, 88 42, 80 44 C 65 48, 45 46, 30 42 C 20 40, 10 32, 5 28 C 12 32, 22 36, 32 38 Z"
            fill="#C4F62E"
          />

          {/* Left Wing Flap */}
          <path
            d="M 45 40 C 40 25, 30 8, 15 2 C 22 15, 35 28, 42 38 Z"
            fill="#C4F62E"
            className="animate-bird-wing origin-bottom-right"
          />

          {/* Right Wing Flap */}
          <path
            d="M 52 40 C 58 24, 70 6, 88 0 C 78 14, 62 27, 54 38 Z"
            fill="#A9E015"
            className="animate-bird-wing origin-bottom-left"
          />

          {/* Tail */}
          <path
            d="M 5 28 L 0 20 L 8 26 L 2 15 L 12 30 Z"
            fill="#C4F62E"
          />
        </svg>

        {/* Trail Glow Sparkle */}
        <span className="text-[10px] text-[#C4F62E] font-bold animate-ping absolute -left-2">
          ✦
        </span>
      </div>
    </div>
  );
};
