import React, { useEffect, useRef, useState } from 'react';
import { Camera, Building2, Sparkles } from 'lucide-react';

interface CollegeCardData {
  id: number;
  name: string;
  tag: string;
  photoPlaceholder: string;
  x: number;
  y: number;
  z: number;
}

const COLLEGES_LIST = [
  { name: 'IIT Bombay', tag: 'Scout Cohort' },
  { name: 'IIM Ahd', tag: 'Scout Cohort' },
  { name: 'Manav Rachna', tag: 'Verified Campus' },
  { name: 'KIIT', tag: 'Scout Cohort' },
  { name: 'Presidency', tag: 'Verified Campus' },
  { name: 'Loyola', tag: 'Verified Campus' },
  { name: 'LSR', tag: 'Scout Cohort' },
  { name: 'MICA', tag: 'Scout Cohort' },
  { name: 'SRCC', tag: 'Verified Campus' },
  { name: 'Manipal', tag: 'Scout Cohort' },
  { name: 'Symbiosis', tag: 'Scout Cohort' },
  { name: 'Christ Bglr', tag: 'Verified Campus' },
  { name: 'IIT Delhi', tag: 'Scout Cohort' },
  { name: 'BITS Pilani', tag: 'Scout Cohort' },
  { name: 'NIT Trichy', tag: 'Verified Campus' },
  { name: 'St. Xavier\'s', tag: 'Scout Cohort' },
  { name: 'DTU', tag: 'Scout Cohort' },
  { name: 'VIT Vellore', tag: 'Verified Campus' },
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
    const N = COLLEGES_LIST.length;
    const radius = 240; // 3D sphere radius in px
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    points.current = COLLEGES_LIST.map((col, i) => {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      return {
        id: i,
        name: col.name,
        tag: col.tag,
        photoPlaceholder: '[photo]',
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
              <div className="bg-[#121212]/90 border border-[#262626] hover:border-[#C4F62E] rounded-2xl p-4 w-32 sm:w-40 flex flex-col items-center justify-center space-y-2 shadow-2xl backdrop-blur-md transition-colors group cursor-pointer">
                {/* Photo Placeholder Box */}
                <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-[#222] flex flex-col items-center justify-center text-[#6A6A65] group-hover:text-[#C4F62E] group-hover:border-[#C4F62E]/40 transition-colors">
                  <Camera className="w-4 h-4" />
                  <span className="text-[8px] font-mono-stats text-[#6A6A65] uppercase mt-0.5">
                    {pt.photoPlaceholder}
                  </span>
                </div>

                {/* College Name */}
                <div className="text-center">
                  <h4 className="font-display font-black text-xs sm:text-sm text-white tracking-tight group-hover:text-[#C4F62E] transition-colors truncate max-w-[120px]">
                    {pt.name}
                  </h4>
                  <span className="text-[9px] font-mono-stats text-[#8A8A85] block mt-0.5">
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
