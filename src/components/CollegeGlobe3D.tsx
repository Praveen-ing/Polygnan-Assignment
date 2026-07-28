import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Building2 } from 'lucide-react';

interface CollegeCardData {
  id: number;
  name: string;
  tag: string;
  logoUrl: string;
  initials: string;
  x: number;
  y: number;
  z: number;
}

const COLLEGES_LIST = [
  {
    name: 'IIT Bombay',
    tag: 'Scout Cohort',
    initials: 'IITB',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg',
  },
  {
    name: 'IIM Ahd',
    tag: 'Scout Cohort',
    initials: 'IIMA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Indian_Institute_of_Management_Ahmedabad_logo.svg',
  },
  {
    name: 'Manav Rachna',
    tag: 'Verified Campus',
    initials: 'MRIIRS',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Manav_Rachna_Educational_Institutions_logo.png',
  },
  {
    name: 'KIIT',
    tag: 'Scout Cohort',
    initials: 'KIIT',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ef/KIIT_logo.png',
  },
  {
    name: 'Presidency',
    tag: 'Verified Campus',
    initials: 'PRES',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Presidency_University_Kolkata_Logo.svg',
  },
  {
    name: 'Loyola',
    tag: 'Verified Campus',
    initials: 'LOY',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9d/Loyola_College_Chennai_logo.png',
  },
  {
    name: 'LSR',
    tag: 'Scout Cohort',
    initials: 'LSR',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Lady_Shri_Ram_College_for_Women_logo.png',
  },
  {
    name: 'MICA',
    tag: 'Scout Cohort',
    initials: 'MICA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9c/MICA_logo.png',
  },
  {
    name: 'SRCC',
    tag: 'Verified Campus',
    initials: 'SRCC',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/8/87/Shri_Ram_College_of_Commerce_logo.png',
  },
  {
    name: 'Manipal',
    tag: 'Scout Cohort',
    initials: 'MAHE',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/75/Manipal_Academy_of_Higher_Education_logo.png',
  },
  {
    name: 'Symbiosis',
    tag: 'Scout Cohort',
    initials: 'SIU',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Symbiosis_International_University_logo.png',
  },
  {
    name: 'Christ Bglr',
    tag: 'Verified Campus',
    initials: 'CU',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/36/Christ_University_logo.png',
  },
  {
    name: 'IIT Delhi',
    tag: 'Scout Cohort',
    initials: 'IITD',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg',
  },
  {
    name: 'BITS Pilani',
    tag: 'Scout Cohort',
    initials: 'BITS',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg',
  },
  {
    name: 'NIT Trichy',
    tag: 'Verified Campus',
    initials: 'NITT',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b3/National_Institute_of_Technology_Tiruchirappalli_logo.svg',
  },
  {
    name: 'St. Xavier\'s',
    tag: 'Scout Cohort',
    initials: 'SXC',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/54/St._Xavier%27s_College_Autonomous_Mumbai_logo.png',
  },
  {
    name: 'DTU',
    tag: 'Scout Cohort',
    initials: 'DTU',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Delhi_Technological_University_logo.png',
  },
  {
    name: 'VIT Vellore',
    tag: 'Verified Campus',
    initials: 'VIT',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Vellore_Institute_of_Technology_seal.svg',
  },
];

export const CollegeGlobe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState<number>(0.2);
  const [rotY, setRotY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [failedLogos, setFailedLogos] = useState<Record<number, boolean>>({});
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
        logoUrl: col.logoUrl,
        initials: col.initials,
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

  const handleImageError = (id: number) => {
    setFailedLogos((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden select-none">
      {/* Title Header */}
      <div className="text-center space-y-3 relative z-10 max-w-3xl mx-auto mb-10">

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
          const isFailed = failedLogos[pt.id];

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
              <div className="bg-[#121212]/95 border border-[#262626] hover:border-[#C4F62E] rounded-2xl p-4 w-32 sm:w-40 flex flex-col items-center justify-center space-y-2.5 shadow-2xl backdrop-blur-md transition-all group cursor-pointer">
                
                {/* College Logo Container */}
                <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#262626] p-2 flex items-center justify-center overflow-hidden group-hover:border-[#C4F62E]/60 transition-colors shadow-inner">
                  {!isFailed && pt.logoUrl ? (
                    <img
                      src={pt.logoUrl}
                      alt={pt.name}
                      onError={() => handleImageError(pt.id)}
                      className="w-full h-full object-contain filter brightness-110 group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <Building2 className="w-4 h-4 text-[#C4F62E]" />
                      <span className="text-[8px] font-mono-stats font-bold text-[#C4F62E] mt-0.5">
                        {pt.initials}
                      </span>
                    </div>
                  )}
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
