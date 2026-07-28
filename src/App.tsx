import React, { useState, useEffect, useRef } from 'react';
import { MarqueeTicker } from './components/MarqueeTicker';
import { OfficialHeader } from './components/OfficialHeader';
import { AmbassadorHero } from './components/AmbassadorHero';
import { SocialProofBanner } from './components/SocialProofBanner';
import { HowItWorksSteps } from './components/HowItWorksSteps';
import { RegistrationCounter } from './components/RegistrationCounter';
import { RiverLadder } from './components/RiverLadder';
import { TierProgressBar } from './components/TierProgressBar';
import { ScoutBadgeGenerator } from './components/ScoutBadgeGenerator';
import { CampusLeaderboard } from './components/CampusLeaderboard';
import { PerksShowcase } from './components/PerksShowcase';
import { FaqAccordion } from './components/FaqAccordion';
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

      {/* 1. Announcement Ticker (Orange background) */}
      <MarqueeTicker />

      {/* 2. Official Header Navigation */}
      <OfficialHeader onNavClick={scrollToSection} />

      <main className="flex-1 space-y-16 sm:space-y-24">
        {/* 3. Ambassador Hero Section */}
        <AmbassadorHero
          onApplyClick={() => scrollToSection('apply-section')}
          onExploreClick={() => scrollToSection('ladder')}
        />

        {/* 4. Social Proof Banner (300+ colleges ticker) */}
        <SocialProofBanner />

        {/* 5. How It Works Section */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6">
          <HowItWorksSteps />
        </section>

        {/* 6. Flowing River Level Journey Section (Long Scrollable) */}
        <section
          id="ladder"
          className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0C0C0C] border-y border-[#1A1A1A] relative"
        >
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] uppercase tracking-wider font-bold">
                <Zap className="w-4 h-4 fill-[#C4F62E]" />
                6-Level Flowing River Pathway
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-6xl text-white tracking-tight">
                Flow Through The <span className="text-[#C4F62E]">6 Reward Levels</span>
              </h2>
              <p className="text-sm sm:text-lg text-[#8A8A85] max-w-2xl mx-auto font-sans leading-relaxed">
                Scroll down the winding river map as your campus registrations climb.
                Each station unlocks verified titles, swag drops, event grants, paid internships, and founding team roles.
              </p>
            </div>

            {/* Live Registration Controls + Tier Progress Bar */}
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

                {/* Share Rank Button */}
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

            {/* The 6-Level Flowing River Pathway Component */}
            <RiverLadder
              currentRegs={regs}
              unlockedSet={unlockedSet}
              onUnlockNewRung={handleUnlockNewRung}
            />
          </div>
        </section>

        {/* 7. Pass Studio Generator */}
        <section id="pass-studio" className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScoutBadgeGenerator currentRegs={regs} />
        </section>

        {/* 8. Campus Leaderboard */}
        <section id="leaderboard" className="max-w-6xl mx-auto px-4 sm:px-6">
          <CampusLeaderboard />
        </section>

        {/* 9. Perks & Privileges Showcase Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <PerksShowcase />
        </section>

        {/* 10. FAQ Accordion */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <FaqAccordion />
        </section>

        {/* 11. Final Apply CTA Section */}
        <section
          id="apply-section"
          className="py-20 px-4 sm:px-6 bg-gradient-to-b from-[#0C0C0C] to-[#050505] border-t border-[#1A1A1A] relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#C4F62E]/10 border border-[#C4F62E]/30 flex items-center justify-center mx-auto text-[#C4F62E]">
              <Zap className="w-8 h-8 fill-[#C4F62E]" />
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Ready to build EYFI on <span className="text-[#C4F62E]">your campus</span>?
            </h2>

            <p className="text-[#8A8A85] font-sans text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Applications are open for Wave 01 scouts. Only 1 to 2 spots per college.
              Apply before your campus spot is taken.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                id="final-apply-btn"
                href="https://ambassador.eyfichallenge.com/#apply"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full bg-[#C4F62E] text-[#0A0A0A] font-display font-black text-base px-10 py-4 hover:bg-[#b0eb18] transition-all shadow-[0_4px_32px_rgba(196,246,46,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply as Scout Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://eyfichallenge.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8A85] hover:text-[#C4F62E] text-sm font-sans transition-colors py-2"
              >
                What is the EYFI Challenge? →
              </a>
            </div>

            <p className="text-xs font-mono-stats text-[#6A6A65]">
              Wave 01 Applications Open · Limited Spots per College
            </p>
          </div>
        </section>
      </main>

      {/* 12. Footer */}
      <footer className="border-t border-[#1A1A1A] py-10 px-6 text-center bg-[#070707]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#C4F62E] text-[#0A0A0A] flex items-center justify-center font-extrabold text-xs">
              EY
            </div>
            <span className="font-display font-black text-white text-lg">
              EYFI<span className="text-[#C4F62E]">.</span>
            </span>
          </div>

          <p className="text-xs text-[#6A6A65] font-sans">
            Earn Your First Income Challenge · Polygnan © 2026
          </p>

          <div className="flex items-center gap-6 text-xs text-[#8A8A85]">
            <a href="https://eyfichallenge.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4F62E] transition">
              EYFI Challenge ↗
            </a>
            <a href="https://ambassador.eyfichallenge.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4F62E] transition">
              Official Ambassador Site ↗
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
