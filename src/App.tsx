import React, { useState, useEffect, useRef } from 'react';
import { MarqueeTicker } from './components/MarqueeTicker';
import { OfficialHeader } from './components/OfficialHeader';
import { AmbassadorHero } from './components/AmbassadorHero';
import { SocialProofBanner } from './components/SocialProofBanner';
import { RegistrationCounter } from './components/RegistrationCounter';
import { RewardLadder } from './components/RewardLadder';
import { TierProgressBar } from './components/TierProgressBar';
import { UnlockValueCounter } from './components/UnlockValueCounter';
import { ShareCardModal } from './components/ShareCardModal';
import { MajorMilestoneSpotlightModal } from './components/MajorMilestoneSpotlightModal';
import { LadderRung } from './types';
import { Zap, ArrowRight, ExternalLink } from 'lucide-react';

export function App() {
  const [regs, setRegs]                   = useState<number>(0);
  const [isAutoplay, setIsAutoplay]       = useState<boolean>(true);
  const [unlockedSet, setUnlockedSet]     = useState<Set<number>>(new Set([0]));
  const [isShareOpen, setIsShareOpen]     = useState<boolean>(false);
  const [spotlightRung, setSpotlightRung] = useState<LadderRung | null>(null);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Auto-play climb (0 → 200 in ~5s)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setRegs(200); setIsAutoplay(false); return; }
    if (!isAutoplay) return;

    const duration = 5000;
    const startVal = regs;
    const targetVal = 200;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed  = timestamp - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      const ease     = 1 - Math.pow(1 - progress, 3);
      const current  = startVal + (targetVal - startVal) * ease;
      setRegs(current);
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setRegs(200);
        setIsAutoplay(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [isAutoplay]);

  const handleManualRegsChange = (newVal: number) => {
    if (isAutoplay) {
      setIsAutoplay(false);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
    setRegs(newVal);
  };

  const handleToggleAutoplay = () => {
    if (isAutoplay) {
      setIsAutoplay(false);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    } else {
      startTimeRef.current = null;
      if (regs >= 200) setRegs(0);
      setIsAutoplay(true);
    }
  };

  const handleReset = () => {
    setIsAutoplay(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setRegs(0);
    setUnlockedSet(new Set([0]));
    setSpotlightRung(null);
  };

  const handleUnlockNewRung = (rungId: number) => {
    setUnlockedSet((prev) => {
      const next = new Set(prev);
      next.add(rungId);
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EF] flex flex-col font-sans selection:bg-[#FF6B2C] selection:text-white">

      {/* 1. Marquee */}
      <MarqueeTicker />

      {/* 2. Sticky Header */}
      <OfficialHeader
        onApplyClick={() => scrollToSection('apply-section')}
        onTabClick={(tab) => {
          if (tab === 'ladder') scrollToSection('ladder');
        }}
      />

      <main className="flex-1">
        {/* 3. Hero */}
        <AmbassadorHero
          onApplyClick={() => scrollToSection('apply-section')}
          onExploreClick={() => scrollToSection('ladder')}
        />

        {/* 4. Social Proof Banner */}
        <SocialProofBanner />

        {/* 5. Reward Ladder — the star of the show */}
        <section
          id="ladder"
          className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0C0C0C] border-t border-[#1A1A1A]"
        >
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/20 text-xs font-mono-stats text-[#FF6B2C] uppercase tracking-wider mb-4">
                <Zap className="w-3 h-3 fill-[#FF6B2C]" />
                Reward Ladder · 6 Tiers
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4 tracking-tight">
                Earned,{' '}
                <span className="text-[#FF6B2C]">not handed.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#8A8A85] max-w-lg mx-auto font-sans">
                Drag the slider to see what you unlock at each milestone.
                Every tier earned = real rewards, real value.
              </p>
            </div>

            {/* Main 2-col layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

              {/* Left: Controls (sticky on desktop) */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24 lg:self-start">
                {/* Value counter */}
                <UnlockValueCounter currentRegs={regs} />

                {/* Tier XP progress bar */}
                <TierProgressBar currentRegs={regs} />

                {/* Registration slider */}
                <RegistrationCounter
                  regs={regs}
                  onRegsChange={handleManualRegsChange}
                  isAutoplay={isAutoplay}
                  onToggleAutoplay={handleToggleAutoplay}
                  onReset={handleReset}
                />

                {/* Share rank card CTA */}
                <div className="bg-gradient-to-r from-[#FF6B2C]/10 via-[#FF6B2C]/5 to-transparent border border-[#FF6B2C]/20 rounded-2xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display font-bold text-sm text-[#F5F3EF]">
                      Show your campus who's climbing.
                    </p>
                    <p className="text-xs text-[#6A6A65] mt-0.5">
                      Share your custom ambassador rank card
                    </p>
                  </div>
                  <button
                    id="share-rank-btn"
                    onClick={() => setIsShareOpen(true)}
                    className="flex-shrink-0 bg-[#FF6B2C] hover:bg-[#e85a1a] text-white font-display font-bold text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-[0_2px_12px_rgba(255,107,44,0.35)] cursor-pointer"
                  >
                    Share Rank
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Right: Vertical Ladder */}
              <div className="lg:col-span-7">
                {/* Live scouts indicator */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono-stats text-[#6A6A65]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B2C] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B2C]" />
                    </span>
                    <span>847 scouts climbing right now</span>
                  </div>
                  <div className="text-xs font-mono-stats text-[#3A3A3A] uppercase tracking-wider">
                    6 reward tiers
                  </div>
                </div>

                <RewardLadder
                  currentRegs={regs}
                  unlockedSet={unlockedSet}
                  onUnlockNewRung={handleUnlockNewRung}
                  onMajorMilestoneTrigger={setSpotlightRung}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Apply CTA Section */}
        <section
          id="apply-section"
          className="py-16 sm:py-20 px-4 sm:px-6 bg-[#0A0A0A] border-t border-[#1A1A1A]"
        >
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-block text-4xl">🚀</div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Ready to start climbing?
            </h2>
            <p className="text-[#8A8A85] font-sans text-sm sm:text-base leading-relaxed">
              Applications are open for Wave 01 scouts. Only 1–2 spots per college.
              Apply before they're gone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                id="final-apply-btn"
                href="https://ambassador.eyfichallenge.com/#apply"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#FF6B2C] text-white font-display font-black text-base px-8 py-4 hover:bg-[#e85a1a] transition-all shadow-[0_4px_24px_rgba(255,107,44,0.4)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                Apply as Scout
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://eyfichallenge.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6A6A65] hover:text-[#FF6B2C] text-sm font-sans transition-colors"
              >
                What is the EYFI Challenge? →
              </a>
            </div>

            {/* Urgency */}
            <p className="text-xs font-mono-stats text-[#4A4640]">
              ⚡ Wave 01 closing soon · Limited spots per college
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A] py-8 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display font-black text-[#FF6B2C] text-xl">
            EYFI<span className="text-white">.</span>
          </div>
          <p className="text-xs text-[#4A4640] font-sans">
            Earn Your First Income Challenge · Polygnan © 2026
          </p>
          <div className="flex items-center gap-4 text-xs text-[#4A4640]">
            <a href="https://eyfichallenge.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B2C] transition">
              EYFI Challenge ↗
            </a>
            <a href="https://ambassador.eyfichallenge.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B2C] transition">
              Official Site ↗
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MajorMilestoneSpotlightModal
        rung={spotlightRung}
        onClose={() => setSpotlightRung(null)}
        campusName="Your Campus"
      />

      <ShareCardModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        regs={Math.round(regs)}
        campusName="Your Campus"
      />
    </div>
  );
}

export default App;
