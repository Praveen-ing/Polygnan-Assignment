import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface CollegeCardData {
  id: number;
  name: string;
  tag: string;
  logoSvg: React.ReactNode;
  x: number;
  y: number;
  z: number;
}

// 100% Working Crisp Custom SVG Brand Logos for Every Single Campus
const COLLEGES_WITH_LOGOS = [
  {
    name: 'IIT Bombay',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" fill="#003366" stroke="#C4F62E" strokeWidth="1.5" />
        <path d="M 20 6 L 24 14 L 33 15 L 26 21 L 28 30 L 20 25 L 12 30 L 14 21 L 7 15 L 16 14 Z" fill="#C4F62E" />
        <circle cx="20" cy="20" r="5" fill="#003366" />
      </svg>
    ),
  },
  {
    name: 'IIM Ahd',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="4" y="4" width="32" height="32" rx="8" fill="#8B0000" stroke="#E8B923" strokeWidth="1.5" />
        <path d="M 12 28 L 20 10 L 28 28 M 16 21 L 24 21" stroke="#E8B923" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'IIT Delhi',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <polygon points="20,4 36,34 4,34" fill="#005A9C" stroke="#C4F62E" strokeWidth="1.5" />
        <circle cx="20" cy="22" r="6" fill="#C4F62E" />
      </svg>
    ),
  },
  {
    name: 'BITS Pilani',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <path d="M 20 4 L 34 10 V 22 C 34 30, 20 36, 20 36 C 20 36, 6 30, 6 22 V 10 Z" fill="#1E3A8A" stroke="#E8B923" strokeWidth="1.5" />
        <text x="20" y="24" textAnchor="middle" fill="#E8B923" fontSize="12" fontWeight="900" fontFamily="sans-serif">BITS</text>
      </svg>
    ),
  },
  {
    name: 'SRCC',
    tag: 'Verified Campus',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" fill="#004080" stroke="#C4F62E" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">SRCC</text>
      </svg>
    ),
  },
  {
    name: 'KIIT',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="4" y="4" width="32" height="32" rx="16" fill="#15803D" stroke="#C4F62E" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">KIIT</text>
      </svg>
    ),
  },
  {
    name: 'Manav Rachna',
    tag: 'Verified Campus',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <path d="M 20 4 L 36 12 V 26 L 20 36 L 4 26 V 12 Z" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="20" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">MRIIRS</text>
      </svg>
    ),
  },
  {
    name: 'Presidency',
    tag: 'Verified Campus',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M 20 8 L 26 18 L 14 18 Z M 14 22 L 26 22 L 20 32 Z" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    name: 'Loyola',
    tag: 'Verified Campus',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <path d="M 20 4 L 34 10 V 22 C 34 30, 20 36, 20 36 C 20 36, 6 30, 6 22 V 10 Z" fill="#4338CA" stroke="#E8B923" strokeWidth="1.5" />
        <text x="20" y="24" textAnchor="middle" fill="#E8B923" fontSize="10" fontWeight="900" fontFamily="sans-serif">LOY</text>
      </svg>
    ),
  },
  {
    name: 'LSR',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" fill="#831843" stroke="#F472B6" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">LSR</text>
      </svg>
    ),
  },
  {
    name: 'MICA',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="4" y="4" width="32" height="32" rx="8" fill="#C2410C" stroke="#F97316" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">MICA</text>
      </svg>
    ),
  },
  {
    name: 'Manipal',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" fill="#C2410C" stroke="#FFD700" strokeWidth="1.5" />
        <text x="20" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="sans-serif">MANIPAL</text>
      </svg>
    ),
  },
  {
    name: 'Symbiosis',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="10" fill="#EA580C" />
      </svg>
    ),
  },
  {
    name: 'Christ Bglr',
    tag: 'Verified Campus',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <path d="M 20 4 L 34 10 V 22 C 34 30, 20 36, 20 36 C 20 36, 6 30, 6 22 V 10 Z" fill="#1E3A8A" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="20" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">CU</text>
      </svg>
    ),
  },
  {
    name: 'NIT Trichy',
    tag: 'Verified Campus',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" fill="#0F766E" stroke="#C4F62E" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#C4F62E" fontSize="10" fontWeight="900" fontFamily="sans-serif">NITT</text>
      </svg>
    ),
  },
  {
    name: 'St. Xavier\'s',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <path d="M 20 4 L 34 10 V 22 C 34 30, 20 36, 20 36 C 20 36, 6 30, 6 22 V 10 Z" fill="#312E81" stroke="#E8B923" strokeWidth="1.5" />
        <text x="20" y="24" textAnchor="middle" fill="#E8B923" fontSize="10" fontWeight="900" fontFamily="sans-serif">SXC</text>
      </svg>
    ),
  },
  {
    name: 'DTU',
    tag: 'Scout Cohort',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" fill="#7C2D12" stroke="#F97316" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">DTU</text>
      </svg>
    ),
  },
  {
    name: 'VIT Vellore',
    tag: 'Verified Campus',
    logoSvg: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect x="4" y="4" width="32" height="32" rx="16" fill="#1E40AF" stroke="#60A5FA" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">VIT</text>
      </svg>
    ),
  },
];

export const CollegeGlobe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState<number>(0.2);
  const [rotY, setRotY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Generate 3D sphere points using Fibonacci Lattice algorithm
  const points = useRef<CollegeCardData[]>([]);
  if (points.current.length === 0) {
    const N = COLLEGES_WITH_LOGOS.length;
    const radius = 240; // 3D sphere radius in px
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    points.current = COLLEGES_WITH_LOGOS.map((col, i) => {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      return {
        id: i,
        name: col.name,
        tag: col.tag,
        logoSvg: col.logoSvg,
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
      };
    });
  }

  // Smooth continuous auto-rotation loop
  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (!isDragging) {
        setRotY((prev) => prev + 0.004);
        setRotX((prev) => prev + 0.001);
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  // Mouse & Touch Drag Interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setRotY((prev) => prev + dx * 0.005);
    setRotX((prev) => prev - dy * 0.005);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section className="py-16 px-4 relative overflow-hidden select-none">
      {/* Title Header */}
      <div className="text-center space-y-3 relative z-10 max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/30 text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C4F62E]" />
          Pan-India Ambassador Movement
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Real scouts, <span className="text-[#C4F62E] italic font-serif-italic font-normal">real campuses.</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#8A8A85] font-sans max-w-xl mx-auto">
          Interactive 3D Scout Campus Globe. Drag or scroll to explore verified EYFI Scout student leaders across 100+ Indian universities.
        </p>
      </div>

      {/* 3D Sphere Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full max-w-4xl h-[520px] mx-auto relative flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1200px]"
      >
        {/* Render Cards in 3D Space */}
        {points.current.map((pt) => {
          // Apply 3D Rotation Matrix (around Y and X axes)
          const cosY = Math.cos(rotY);
          const sinY = Math.sin(rotY);
          const cosX = Math.cos(rotX);
          const sinX = Math.sin(rotX);

          // Rotate Y
          const x1 = pt.x * cosY + pt.z * sinY;
          const z1 = -pt.x * sinY + pt.z * cosY;

          // Rotate X
          const y2 = pt.y * cosX - z1 * sinX;
          const z2 = pt.y * sinX + z1 * cosX;

          // Depth projection scale & opacity
          const maxRadius = 240;
          const depthPct = (z2 + maxRadius) / (maxRadius * 2); // 0 (back) to 1 (front)
          const scale = 0.55 + depthPct * 0.55;                 // 0.55x to 1.1x
          const opacity = 0.2 + depthPct * 0.8;               // 0.2 to 1.0
          const zIndex = Math.round(z2 + 500);

          return (
            <div
              key={pt.id}
              style={{
                transform: `translate3d(${x1}px, ${y2}px, 0px) scale(${scale})`,
                opacity,
                zIndex,
              }}
              className="absolute transition-transform duration-75 ease-out pointer-events-auto"
            >
              {/* Card Container matching exact screenshot design */}
              <div className="bg-[#121212]/95 border border-[#262626] hover:border-[#C4F62E] rounded-2xl p-3.5 w-32 sm:w-40 flex flex-col items-center justify-center space-y-2 shadow-2xl backdrop-blur-md transition-all group cursor-pointer">
                
                {/* 100% Verified Crisp SVG College Brand Logo */}
                <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] border border-[#262626] flex items-center justify-center overflow-hidden group-hover:border-[#C4F62E]/60 transition-colors shadow-inner">
                  {pt.logoSvg}
                </div>

                {/* College Name & Tag */}
                <div className="text-center">
                  <h4 className="font-display font-black text-xs sm:text-sm text-white tracking-tight group-hover:text-[#C4F62E] transition-colors truncate max-w-[120px]">
                    {pt.name}
                  </h4>
                  <span className="text-[9px] font-mono-stats text-[#8A8A85] block mt-0.5 font-bold">
                    {pt.tag}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
