import React, { useState, useEffect, useRef } from 'react';
import { MarqueeTicker } from './components/MarqueeTicker';
import { OfficialHeader } from './components/OfficialHeader';
import { AmbassadorHero } from './components/AmbassadorHero';
import { SocialProofBanner } from './components/SocialProofBanner';
import { RegistrationCounter } from './components/RegistrationCounter';
import { RiverLadder } from './components/RiverLadder';
import { TierProgressBar } from './components/TierProgressBar';
import { ShareCardModal } from './components/ShareCardModal';
import { Zap, ArrowRight, ExternalLink } from 'lucide-react';

export function App() {
  const [regs, setRegs]               = useState<number>(0);
  const [isAutoplay, setIsAutoplay]   = useState<boolean>(true);
  const [unlockedSet, setUnlockedSet] = useState<Set<number>>(new Set([0]));
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

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
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EF] flex flex-col font-sans selection:bg-[#C4F62E] selection:text-black">

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

        {/* 5. Flowing River Journey Section (Long Scrollable) */}
        <section
          id="ladder"
          className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0C0C0C] border-t border-[#1A1A1A]"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Section header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] uppercase tracking-wider mb-4 font-bold">
                <Zap className="w-4 h-4 fill-[#C4F62E]" />
                Flowing River Level Journey · 6 Levels
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-6xl text-white mb-4 tracking-tight">
                Flow Through The <span className="text-[#C4F62E]">6 Levels</span>
              </h2>
              <p className="text-sm sm:text-lg text-[#8A8A85] max-w-2xl mx-auto font-sans leading-relaxed">
                Scroll down the long winding level river as your campus registrations grow.
                Each level station along the river unlocks exclusive perks, grants, titles, and co-founder opportunities.
              </p>
            </div>

            {/* Registration Controls + Level Progress Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#111111] border border-[#242424] rounded-3xl p-5 sm:p-6 shadow-2xl">
              <div className="md:col-span-7">
                <RegistrationCounter
                  regs={regs}
                  onRegsChange={handleManualRegsChange}
                  isAutoplay={isAutoplay}
                  onToggleAutoplay={handleToggleAutoplay}
                  onReset={handleReset}
                />
              </div>

              <div className="md:col-span-5 space-y-3">
                <TierProgressBar currentRegs={regs} />

                {/* Share rank CTA button */}
                <button
                  id="share-rank-btn"
                  onClick={() => setIsShareOpen(true)}
                  className="w-full bg-[#C4F62E] hover:bg-[#b0eb18] text-[#0A0A0A] font-display font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_2px_12px_rgba(196,246,46,0.35)] cursor-pointer"
                >
                  Share Ambassador Level
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* The 6-Level Flowing River Component */}
            <RiverLadder
              currentRegs={regs}
              unlockedSet={unlockedSet}
              onUnlockNewRung={handleUnlockNewRung}
            />
          </div>
        </section>

        {/* 6. Apply CTA Section */}
        <section
          id="apply-section"
          className="py-16 sm:py-20 px-4 sm:px-6 bg-[#0A0A0A] border-t border-[#1A1A1A]"
        >
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Zap className="w-8 h-8 text-[#C4F62E] mx-auto" />
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Ready to start your level journey?
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
                className="rounded-full bg-[#C4F62E] text-[#0A0A0A] font-display font-black text-base px-8 py-4 hover:bg-[#b0eb18] transition-all shadow-[0_4px_24px_rgba(196,246,46,0.35)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                Apply as Scout
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://eyfichallenge.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6A6A65] hover:text-[#C4F62E] text-sm font-sans transition-colors"
              >
                What is the EYFI Challenge? →
              </a>
            </div>

            {/* Urgency */}
            <p className="text-xs font-mono-stats text-[#4A4640]">
              Wave 01 closing soon · Limited spots per college
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A] py-8 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display font-black text-[#C4F62E] text-xl">
            EYFI<span className="text-white">.</span>
          </div>
          <p className="text-xs text-[#4A4640] font-sans">
            Earn Your First Income Challenge · Polygnan © 2026
          </p>
          <div className="flex items-center gap-4 text-xs text-[#4A4640]">
            <a href="https://eyfichallenge.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4F62E] transition">
              EYFI Challenge ↗
            </a>
            <a href="https://ambassador.eyfichallenge.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4F62E] transition">
              Official Site ↗
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
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
