import React from 'react';
import { ArrowRight, Users, MapPin, Clock } from 'lucide-react';

interface AmbassadorHeroProps {
  onApplyClick?: () => void;
  onExploreClick?: () => void;
}

export const AmbassadorHero: React.FC<AmbassadorHeroProps> = ({
  onApplyClick,
  onExploreClick,
}) => {
  return (
    <section
      id="top"
      className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center overflow-hidden hero-gradient noise-overlay"
    >
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C4F62E]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-[#E8B923]/5 rounded-full blur-[60px]" />
      </div>

      {/* Floating ambient coins */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hidden sm:block absolute top-8 left-[2vw] opacity-40">
          <CoinSVG size={100} rotX={72} rotY={-32} rotZ={-24} delay="0s" />
        </div>
        <div className="hidden sm:block absolute top-2 right-[3vw] opacity-40">
          <CoinSVG size={140} rotX={-62} rotY={38} rotZ={18} delay="1s" />
        </div>
        <div className="hidden sm:block absolute top-[38%] right-[1vw] opacity-30">
          <CoinSVG size={82} rotX={78} rotY={22} rotZ={36} delay="2s" />
        </div>
        <div className="hidden sm:block absolute top-[42%] left-[1vw] opacity-30">
          <CoinSVG size={78} rotX={18} rotY={30} rotZ={-16} delay="0.7s" />
        </div>
        <div className="hidden sm:block absolute bottom-24 left-[4vw] opacity-35">
          <CoinSVG size={86} rotX={-68} rotY={-34} rotZ={-14} delay="1.5s" />
        </div>
        <div className="hidden sm:block absolute bottom-8 right-[4vw] opacity-40">
          <CoinSVG size={120} rotX={64} rotY={42} rotZ={-28} delay="0.5s" />
        </div>
        <div className="sm:hidden absolute top-[90px] left-[2vw] opacity-40">
          <CoinSVG size={72} rotX={62} rotY={-14} rotZ={-18} delay="0s" />
        </div>
        <div className="sm:hidden absolute top-[200px] right-[1vw] opacity-35">
          <CoinSVG size={66} rotX={20} rotY={72} rotZ={-6} delay="0.8s" />
        </div>
      </div>


      {/* Main Headline — bold massive typography */}
      <h1 className="font-display font-extrabold text-white leading-[1.05] tracking-tight mb-6">
        <span className="block text-xl sm:text-2xl text-[#8A8A85] font-semibold mb-3 uppercase tracking-[0.2em]">
          Someone is going to
        </span>
        <span className="block text-5xl sm:text-7xl md:text-8xl leading-none">
          build{' '}
          <span className="animate-text-shimmer inline-block -rotate-1 hover:rotate-0 transition-transform duration-500 cursor-default">
            EYFI
          </span>
        </span>
        <span className="block text-3xl sm:text-5xl md:text-6xl text-[#C8C8C4] font-bold mt-3">
          on your campus.
        </span>
      </h1>

      {/* Gold italic tagline — larger, more impact */}
      <p className="font-serif-italic text-2xl sm:text-4xl md:text-5xl text-[#E8B923] my-8 sm:my-10 leading-tight">
        Why shouldn't it be you?
      </p>

      {/* Sub description */}
      <p className="text-base sm:text-lg text-[#8A8A85] max-w-xl mx-auto mb-6 leading-relaxed font-sans">
        Join India's first student income movement as a founding campus scout.
        Unlock exclusive perks, grants, and career opportunities as you grow.
      </p>

      {/* Social proof inline */}
      <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-mono-stats">
          <Users className="w-4 h-4 text-[#C4F62E]" />
          <span className="text-[#C4F62E] font-bold">2,847</span>
          <span className="text-[#6A6A65]">scouts applied</span>
        </div>
        <div className="w-px h-4 bg-[#2A2A2A]" />
        <div className="flex items-center gap-2 text-sm font-mono-stats">
          <MapPin className="w-4 h-4 text-[#C4F62E]" />
          <span className="text-[#F5F3EF]">300+ colleges</span>
        </div>
        <div className="w-px h-4 bg-[#2A2A2A]" />
        <div className="flex items-center gap-2 text-sm font-mono-stats">
          <Clock className="w-4 h-4 text-[#C4F62E]" />
          <span className="text-[#F5F3EF]">1–2 spots/college</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
        <button
          id="hero-apply-btn"
          onClick={onApplyClick}
          className="relative rounded-full bg-[#C4F62E] text-[#0A0A0A] font-display font-extrabold text-base sm:text-lg px-10 py-4 transition-all cursor-pointer shadow-[0_4px_32px_rgba(196,246,46,0.4)] hover:shadow-[0_6px_48px_rgba(196,246,46,0.6)] hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden group"
        >
          {/* Button shimmer */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          <span>Apply as Scout</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          id="hero-explore-btn"
          onClick={onExploreClick}
          className="rounded-full border border-[#2A2A2A] bg-transparent text-[#C8C8C4] font-display font-semibold text-sm px-8 py-4 hover:border-[#C4F62E]/40 hover:text-[#C4F62E] transition-all cursor-pointer"
        >
          Explore the 6 Levels ↓
        </button>
      </div>

      {/* 3-col stats — bigger and bolder */}
      <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#1E1E1E]">
        <div className="text-center border-r border-[#1E1E1E] pr-4">
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-[#C4F62E] mb-1 tabular-nums">
            01
          </p>
          <p className="text-[11px] uppercase tracking-widest text-[#6A6A65] font-mono-stats">First-ever wave</p>
        </div>

        <div className="text-center border-r border-[#1E1E1E] px-4">
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-[#C4F62E] mb-1 tabular-nums">
            6
          </p>
          <p className="text-[11px] uppercase tracking-widest text-[#6A6A65] font-mono-stats">Reward levels</p>
        </div>

        <div className="text-center pl-4">
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-[#E8B923] mb-1">
            Real
          </p>
          <p className="text-[11px] uppercase tracking-widest text-[#6A6A65] font-mono-stats">Perks & career opp.</p>
        </div>
      </div>
    </section>
  );
};

/* 3D Rupee Coin */
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
