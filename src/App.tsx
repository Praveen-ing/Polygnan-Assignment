import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { BadgeShelf } from './components/BadgeShelf';
import { RegistrationCounter } from './components/RegistrationCounter';
import { RewardLadder } from './components/RewardLadder';
import { HustleStats } from './components/HustleStats';
import { ShareCardModal } from './components/ShareCardModal';
import { MajorMilestoneSpotlightModal } from './components/MajorMilestoneSpotlightModal';
import { CAMPUSES } from './data/ladderData';
import { LadderRung } from './types';
import { Zap, ArrowRight } from 'lucide-react';

export function App() {
  const [regs, setRegs] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [selectedCampus, setSelectedCampus] = useState<string>(CAMPUSES[0].id);
  const [unlockedSet, setUnlockedSet] = useState<Set<number>>(new Set([0]));
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [spotlightRung, setSpotlightRung] = useState<LadderRung | null>(null);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Auto-play climb effect on initial load (~4 seconds duration)
  useEffect(() => {
    // Respect prefers-reduced-motion: skip animation and set max state immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRegs(200);
      setIsAutoplay(false);
      return;
    }

    if (!isAutoplay) return;

    const duration = 4000; // 4 seconds
    const startVal = regs;
    const targetVal = 200;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);

      // Ease-out cubic formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = startVal + (targetVal - startVal) * easeProgress;

      setRegs(currentVal);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setRegs(200);
        setIsAutoplay(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoplay]);

  const handleManualRegsChange = (newVal: number) => {
    // Halt autoplay immediately on manual input
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

  const handleMajorMilestoneTrigger = (rung: LadderRung) => {
    setSpotlightRung(rung);
  };

  const handleRungClick = (threshold: number) => {
    handleManualRegsChange(threshold);
  };

  const currentCampusObj = CAMPUSES.find((c) => c.id === selectedCampus) || CAMPUSES[0];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EF] py-6 sm:py-8 px-3 sm:px-6">
      {/* Container: 1 column on mobile/small tablet, 2 columns on desktop/large tablet (lg) */}
      <div className="w-full max-w-xl lg:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (Desktop/Tablet Controls) - Sticky on Desktop */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-6 lg:self-start">
          {/* Header Section */}
          <Header selectedCampus={selectedCampus} onSelectCampus={setSelectedCampus} />

          {/* Counter and Slider Control Box */}
          <RegistrationCounter
            regs={regs}
            onRegsChange={handleManualRegsChange}
            isAutoplay={isAutoplay}
            onToggleAutoplay={handleToggleAutoplay}
            onReset={handleReset}
          />

          {/* Badge / Trophy Shelf */}
          <BadgeShelf currentRegs={regs} onRungClick={handleRungClick} />

          {/* Hustle Stats Summary */}
          <HustleStats regs={regs} />
        </div>

        {/* Right Column (The Ambassador Ladder & Action Area) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top-left aligned product UI chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-xs font-medium text-[#FFE8A3] shadow-sm">
              <span>🔥 Only 2 Ambassador spots left at {currentCampusObj.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono-stats text-[#A39E93]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B2C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B2C]"></span>
              </span>
              <span>847 scouts climbing right now</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono-stats text-[#A39E93] uppercase tracking-wider px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FF6B2C]" />
              <span>Ambassador Ladder</span>
            </span>
            <span>6 Reward Tiers</span>
          </div>

          <RewardLadder
            currentRegs={regs}
            unlockedSet={unlockedSet}
            onUnlockNewRung={handleUnlockNewRung}
            onMajorMilestoneTrigger={handleMajorMilestoneTrigger}
          />

          {/* Share Banner Prompt */}
          <div className="bg-gradient-to-r from-[#FF6B2C]/15 via-[#FFC857]/10 to-[#141414] border border-[#FF6B2C]/30 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-lg">
            <div className="space-y-0.5">
              <div className="font-heading font-bold text-sm sm:text-base text-[#F5F3EF]">
                Show your campus you're climbing.
              </div>
              <div className="text-xs text-[#A39E93]">
                Share your custom ambassador rank card with peers
              </div>
            </div>

            <button
              onClick={() => setIsShareOpen(true)}
              className="flex-shrink-0 bg-[#FF6B2C] hover:bg-[#FF8542] text-[#0A0A0A] font-heading font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              <span>Share</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Footer Note */}
          <footer className="text-center text-xs font-mono-stats text-[#4A4640] pt-4 pb-8 space-y-1">
            <div>EYFI.AMBASSADORS — EARNED, NOT HANDED</div>
            <div className="text-[10px] text-[#333]">Built for student hustlers across India</div>
          </footer>
        </div>
      </div>

      {/* Major Milestone Spotlight Modal */}
      <MajorMilestoneSpotlightModal
        rung={spotlightRung}
        onClose={() => setSpotlightRung(null)}
        campusName={currentCampusObj.name}
      />

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        regs={Math.round(regs)}
        campusName={currentCampusObj.name}
      />
    </div>
  );
}

export default App;
