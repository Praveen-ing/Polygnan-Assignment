import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AmbassadorHeroProps {
  onApplyClick?: () => void;
  onExploreClick?: () => void;
}

export const AmbassadorHero: React.FC<AmbassadorHeroProps> = ({
  onApplyClick,
  onExploreClick,
}) => {
  return (
    <section id="top" className="relative pt-12 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Floating ambient coins */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Desktop coins — exact sizes & rotations from official EYFI HTML */}
        <div className="hidden sm:block absolute top-8 left-[2vw] opacity-50">
          <CoinSVG size={100} rotX={72} rotY={-32} rotZ={-24} delay="0s" />
        </div>
        <div className="hidden sm:block absolute top-2 right-[3vw] opacity-50">
          <CoinSVG size={140} rotX={-62} rotY={38} rotZ={18} delay="1s" />
        </div>
        <div className="hidden sm:block absolute top-[38%] right-[1vw] opacity-50">
          <CoinSVG size={82} rotX={78} rotY={22} rotZ={36} delay="2s" />
        </div>
        <div className="hidden sm:block absolute top-[42%] left-[1vw] opacity-50">
          <CoinSVG size={78} rotX={18} rotY={30} rotZ={-16} delay="0.7s" />
        </div>
        <div className="hidden sm:block absolute bottom-24 left-[4vw] opacity-50">
          <CoinSVG size={86} rotX={-68} rotY={-34} rotZ={-14} delay="1.5s" />
        </div>
        <div className="hidden sm:block absolute bottom-8 right-[4vw] opacity-50">
          <CoinSVG size={120} rotX={64} rotY={42} rotZ={-28} delay="0.5s" />
        </div>
        {/* Mobile coins */}
        <div className="sm:hidden absolute top-[90px] left-[2vw] opacity-50">
          <CoinSVG size={72} rotX={62} rotY={-14} rotZ={-18} delay="0s" />
        </div>
        <div className="sm:hidden absolute top-[200px] right-[1vw] opacity-50">
          <CoinSVG size={66} rotX={20} rotY={72} rotZ={-6} delay="0.8s" />
        </div>
      </div>

      {/* Wave 01 pill */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-xs font-mono-stats font-bold text-[#FF6B2C] uppercase tracking-wider">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B2C] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF6B2C]" />
          </span>
          Wave 01 · Applications Open
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-4 text-3xl sm:text-5xl md:text-6xl">
        <span className="block text-2xl sm:text-3xl text-[#E8E8E4] font-bold mb-2">
          Someone is going to
        </span>
        <span className="block my-1">
          build{' '}
          <span className="inline-block text-[#FF6B2C] -rotate-2 font-black tracking-tight hover:rotate-0 transition-transform duration-300">
            EYFI
          </span>
        </span>
        <span className="block text-2xl sm:text-4xl text-[#E8E8E4] font-bold mt-2">
          on your{' '}
          <span className="text-[#FF6B2C] font-extrabold text-3xl sm:text-5xl md:text-6xl">
            campus.
          </span>
        </span>
      </h1>

      {/* Gold italic tagline */}
      <p className="font-serif italic text-2xl sm:text-3xl text-[#FFD700] my-8 sm:my-10 leading-tight">
        Why shouldn't it be you?
      </p>

      {/* Sub description */}
      <p className="text-base sm:text-lg text-[#C8C8C4] max-w-xl mx-auto mb-8 leading-relaxed font-sans">
        Join the first wave of scouts helping launch India's first student income challenge.
        Earn real rewards as you bring in more registrations.
      </p>

      {/* Social proof inline */}
      <p className="text-sm text-[#6A6A65] font-sans mb-8">
        <span className="text-[#FF6B2C] font-bold font-mono-stats">2,847</span> scouts from{' '}
        <span className="text-[#F5F3EF]">300+ colleges</span> have already applied
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <button
          id="hero-apply-btn"
          onClick={onApplyClick}
          className="rounded-full bg-[#FF6B2C] text-white font-display font-black text-base sm:text-lg px-8 py-4 hover:bg-[#e85a1a] transition-all cursor-pointer shadow-[0_4px_24px_rgba(255,107,44,0.4)] hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <span>Apply as Scout</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          id="hero-explore-btn"
          onClick={onExploreClick}
          className="rounded-full border border-[#2A2A2A] bg-transparent text-[#C8C8C4] font-display font-semibold text-sm px-6 py-3.5 hover:border-[#FF6B2C]/40 hover:text-[#F5F3EF] transition-all cursor-pointer"
        >
          See the Reward Ladder ↓
        </button>
      </div>

      {/* 3-col stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-8 border-t border-[#1E1E1E]">
        <div className="text-center border-r border-[#1E1E1E] pr-2 sm:pr-4">
          <p className="font-display font-extrabold text-xl sm:text-2xl text-[#FF6B2C] mb-1">
            WAVE 01
          </p>
          <p className="text-xs text-[#6A6A65]">First-ever cohort</p>
        </div>

        <div className="text-center border-r border-[#1E1E1E] px-2 sm:px-4">
          <p className="font-display font-extrabold text-xl sm:text-2xl text-[#FF6B2C] mb-1">
            1 or 2
          </p>
          <p className="text-xs text-[#6A6A65]">Spots per college</p>
        </div>

        <div className="text-center pl-2 sm:pl-4">
          <p className="font-display font-extrabold text-xl sm:text-2xl text-[#FF6B2C] mb-1">
            ₹15L+
          </p>
          <p className="text-xs text-[#6A6A65]">Total rewards up for grabs</p>
        </div>
      </div>
    </section>
  );
};

/* 3D Rupee Coin — exact match to official EYFI site: lime-green stack + DFF864 face */
function CoinSVG({ size, rotX = 60, rotY = -20, rotZ = -20, delay = '0s' }: {
  size: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  delay?: string;
}) {
  const layers = Math.round(size / 7);
  return (
    <div
      className="inline-block select-none animate-float"
      style={{ width: size, height: size, perspective: size * 6, animationDelay: delay }}
      aria-hidden="true"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
          position: 'relative',
        }}
      >
        {/* Side layers — green hue 130 oklch stack */}
        {Array.from({ length: layers }).map((_, i) => {
          const l = 0.42 + (i / layers) * 0.18;
          return (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                background: `oklch(${l.toFixed(4)} 0.18 130)`,
                transform: `translateZ(-${i + 1}px)`,
                border: '1px solid oklch(0.30 0.12 130)',
              }}
            />
          );
        })}
        {/* Back face (hidden) */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 70% 25%, #F4FFB8 0%, #DFF864 30%, #A9D91A 65%, #6E8E10 100%)',
            border: '1.5px solid #3f5208',
            transform: `translateZ(-${layers + 1}px) rotateY(180deg)`,
            boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.22), inset 0 4px 10px rgba(255,255,255,0.35)',
          }}
        >
          <div className="absolute rounded-full" style={{ inset: size * 0.08, border: '1px dashed rgba(30,45,5,0.55)' }} />
        </div>
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 30% 25%, #F4FFB8 0%, #DFF864 30%, #A9D91A 65%, #6E8E10 100%)',
            border: '1.5px solid #3f5208',
            boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.22), inset 0 4px 10px rgba(255,255,255,0.35)',
          }}
        >
          <div className="absolute rounded-full" style={{ inset: size * 0.08, border: '1px dashed rgba(30,45,5,0.55)' }} />
          <span
            className="font-display font-extrabold"
            style={{
              color: '#3a2506',
              fontSize: size * 0.45,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textShadow: '0 1px 0 rgba(255,255,255,0.4)',
              transform: 'translateY(-2%)',
            }}
          >
            ₹
          </span>
        </div>
      </div>
    </div>
  );
}

