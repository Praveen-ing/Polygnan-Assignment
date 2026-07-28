import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Compass,
  Award,
  Gift,
  Zap,
  Briefcase,
  Crown,
  Lock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { RupeeCoinBurst } from './RupeeCoinBurst';
import { SpotlightCard } from './SpotlightCard';
import { BadgeCoinSVG } from './BadgeCoinSVG';

interface RiverLadderProps {
  currentRegs: number;
  unlockedSet: Set<number>;
  onUnlockNewRung?: (rungId: number) => void;
  onRegsChange?: (newVal: number) => void;
}

export interface QuestStepData {
  stepId: number;
  levelNumber: string;
  title: string;
  milestoneText: string;
  threshold: number; // Regs required
  themeColor: string;
  bgGlow: string;
  icon: React.ReactNode;
  badgeLabel: string;
  unlocks: string[];
}

const QUEST_STEPS: QuestStepData[] = [
  {
    stepId: 0,
    levelNumber: 'Step 0',
    title: 'Apply & Get Verified',
    milestoneText: 'Fill Scout Application & Receive Official Welcome Kit',
    threshold: 0,
    themeColor: '#10B981', // Emerald
    bgGlow: 'shadow-[0_0_30px_rgba(16,185,129,0.35)]',
    icon: <UserCheck className="w-5 h-5 text-[#10B981]" />,
    badgeLabel: 'VERIFICATION STEP',
    unlocks: [
      'Official EYFI Scout Badge & Verified Ambassador Title',
      'Direct Access to EYFI Founder Mentorship Group',
      'Personalized Campus Referral Invite Code & QR Pass Studio',
    ],
  },
  {
    stepId: 1,
    levelNumber: 'Level 1',
    title: 'Scout Leadership',
    milestoneText: '0 Registrations (Initial Scout Rank)',
    threshold: 0,
    themeColor: '#C4F62E', // EYFI Lime
    bgGlow: 'shadow-[0_0_30px_rgba(196,246,46,0.35)]',
    icon: <Compass className="w-5 h-5 text-[#C4F62E]" />,
    badgeLabel: 'SCOUT RANK',
    unlocks: [
      'Verified EYFI Scout Title on LinkedIn & Resume',
      'Access to Level 1 Scout Dashboard & Live Leaderboard Tracking',
      'Exclusive Wave 01 Ambassador Starter Toolkit',
    ],
  },
  {
    stepId: 2,
    levelNumber: 'Level 2',
    title: 'Campus Ambassador',
    milestoneText: '25 Campus Registrations',
    threshold: 25,
    themeColor: '#38BDF8', // Luminous Cyan
    bgGlow: 'shadow-[0_0_30px_rgba(56,189,248,0.35)]',
    icon: <Award className="w-5 h-5 text-[#38BDF8]" />,
    badgeLabel: 'AMBASSADOR KIT',
    unlocks: [
      'Official EYFI Ambassador Certificate of Excellence',
      'Exclusive EYFI Swag Drop: Premium Hoodie & Cap',
      'Feature Spotlight on EYFI Official Campus Wall of Fame',
    ],
  },
  {
    stepId: 3,
    levelNumber: 'Level 3',
    title: 'Level Up & Swag Kit',
    milestoneText: '50 Campus Registrations',
    threshold: 50,
    themeColor: '#F59E0B', // Radiant Gold
    bgGlow: 'shadow-[0_0_30px_rgba(245,158,11,0.35)]',
    icon: <Gift className="w-5 h-5 text-[#F59E0B]" />,
    badgeLabel: 'SWAG DROPS',
    unlocks: [
      'Customized Tech Swag Box (Powerbank, Stickers, Journal)',
      'VIP Priority Access to EYFI National Hackathons & Workshops',
      'Exclusive Invite to Regional Founder Networking Dinners',
    ],
  },
  {
    stepId: 4,
    levelNumber: 'Level 4',
    title: 'Go Further & Event Grants',
    milestoneText: '75 Campus Registrations',
    threshold: 75,
    themeColor: '#FF6B2C', // Flame Orange
    bgGlow: 'shadow-[0_0_30px_rgba(255,107,44,0.35)]',
    icon: <Zap className="w-5 h-5 text-[#FF6B2C]" />,
    badgeLabel: 'EVENT GRANTS',
    unlocks: [
      '₹15,000 Official Sponsorship Grant for your Campus Club/Event',
      'Direct 1-on-1 Mentorship Sessions with Top Startup Founders',
      'Fast-track Consideration for High-Growth Paid Internships',
    ],
  },
  {
    stepId: 5,
    levelNumber: 'Level 5',
    title: 'Paid Internships & Stipends',
    milestoneText: '100 Campus Registrations',
    threshold: 100,
    themeColor: '#A855F7', // Neon Violet
    bgGlow: 'shadow-[0_0_30px_rgba(168,85,247,0.35)]',
    icon: <Briefcase className="w-5 h-5 text-[#A855F7]" />,
    badgeLabel: 'PAID STIPEND',
    unlocks: [
      'Guaranteed Monthly Performance Stipend + Performance Bonuses',
      'Direct Hiring Referral to Top Partner Tech Companies & VC Startups',
      'Official EYFI Regional Scout Director Badge',
    ],
  },
  {
    stepId: 6,
    levelNumber: 'Level 6',
    title: 'Founding Team Role',
    milestoneText: '200 Campus Registrations',
    threshold: 200,
    themeColor: '#EAB308', // Diamond Imperial Gold
    bgGlow: 'shadow-[0_0_40px_rgba(234,179,8,0.6)]',
    icon: <Crown className="w-5 h-5 text-[#EAB308]" />,
    badgeLabel: 'FOUNDING TEAM',
    unlocks: [
      'Full Equity & Core Founding Team Role Consideration at Polygnan EYFI',
      'All-Expenses-Paid Trip to EYFI National Founders Retreat',
      'Lifetime Membership in EYFI Executive Council',
    ],
  },
];

export const RiverLadder: React.FC<RiverLadderProps> = ({
  currentRegs,
  onRegsChange,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [burstKey, setBurstKey] = useState<number | null>(null);
  const [birdPos, setBirdPos] = useState({ t: 0, direction: 1 });

  useEffect(() => {
    let animFrame: number;
    let t = 0;
    let direction = 1;
    const NUM_NODES = QUEST_STEPS.length;

    const flightLoop = () => {
      t += 0.005 * direction;
      if (t >= NUM_NODES - 1) {
        direction = -1;
      } else if (t <= 0) {
        direction = 1;
      }
      setBirdPos({ t, direction });
      animFrame = requestAnimationFrame(flightLoop);
    };

    animFrame = requestAnimationFrame(flightLoop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const activeStep = QUEST_STEPS[activeStepIndex];

  const handleQuickUnlock = (threshold: number) => {
    onRegsChange?.(threshold);
    setBurstKey(threshold);
    setTimeout(() => setBurstKey(null), 1200);
  };

  const handlePrev = () => {
    setActiveStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveStepIndex((prev) => Math.min(QUEST_STEPS.length - 1, prev + 1));
  };

  return (
    <div className="space-y-10 relative select-none">
      {/* Burst Effect */}
      {burstKey !== null && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <RupeeCoinBurst triggerKey={burstKey} />
        </div>
      )}

      {/* ── Top Level Progress Track Navigator ── */}
      <div className="border border-[#262626] rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">

        {/* Alternating Horizontal Stepper Timeline */}
        <div className="relative w-full py-12 overflow-x-auto no-scrollbar">
          <div className="min-w-[800px] relative h-32 flex items-center justify-between px-12">
            {/* Main Horizontal Progress Line */}
            <div className="absolute top-1/2 left-12 right-12 h-[2px] bg-[#222] -translate-y-1/2 z-0">
              <div 
                className="h-full transition-all duration-700 ease-out"
                style={{ 
                  width: `${(activeStepIndex / (QUEST_STEPS.length - 1)) * 100}%`,
                  background: 'linear-gradient(90deg, #10B981, #C4F62E, #38BDF8)'
                }}
              />

              {/* The Traveling Bird */}
              <div
                className="absolute z-50 pointer-events-none"
                style={{
                  left: `${(birdPos.t / (QUEST_STEPS.length - 1)) * 100}%`,
                  top: `${Math.cos(birdPos.t * Math.PI) * -60}px`,
                  transform: `translate(-50%, -50%) scaleX(${birdPos.direction})`,
                }}
              >
                <div className="relative flex items-center justify-center">
                  <svg
                    width="50"
                    height="35"
                    viewBox="0 0 100 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_0_12px_rgba(196,246,46,0.8)]"
                  >
                    <path d="M 50 40 C 60 38, 75 35, 85 32 C 90 31, 95 29, 98 32 C 95 36, 88 42, 80 44 C 65 48, 45 46, 30 42 C 20 40, 10 32, 5 28 C 12 32, 22 36, 32 38 Z" fill="#C4F62E" />
                    <path d="M 45 40 C 40 20, 25 5, 10 0 C 18 14, 32 28, 42 38 Z" fill="#C4F62E" className="animate-bird-wing" />
                    <path d="M 52 40 C 58 20, 72 4, 90 0 C 80 14, 64 27, 54 38 Z" fill="#A9E015" className="animate-bird-wing" />
                    <path d="M 5 28 L 0 20 L 8 26 L 2 15 L 12 30 Z" fill="#C4F62E" />
                  </svg>
                  <span className="text-[12px] text-[#C4F62E] font-bold animate-ping absolute -left-2 top-0">
                    ✨
                  </span>
                </div>
              </div>
            </div>
            
            {QUEST_STEPS.map((step, idx) => {
              const isUnlocked = currentRegs >= step.threshold;
              const isSelected = activeStepIndex === idx;
              const isUp = idx % 2 === 0;

              return (
                <div key={step.stepId} className="relative z-10 flex flex-col items-center justify-center">
                  
                  {/* Node Dot on the main line */}
                  <div 
                    className={`w-5 h-5 rounded-full border-[3px] bg-[#0D0D0D] z-10 transition-colors cursor-pointer hover:scale-125 ${isSelected ? 'scale-125' : ''}`}
                    onClick={() => setActiveStepIndex(idx)}
                    style={{
                      borderColor: isSelected ? step.themeColor : isUnlocked ? step.themeColor : '#333',
                      boxShadow: isUnlocked ? `0 0 15px ${step.themeColor}60` : 'none'
                    }}
                  />

                  {/* Vertical Connector Line */}
                  <div 
                    className={`absolute w-[2px] bg-[#333] transition-colors ${
                      isUp ? 'bottom-3 h-8' : 'top-3 h-8'
                    }`} 
                    style={{ backgroundColor: isUnlocked ? `${step.themeColor}50` : '#333' }}
                  />

                  {/* The interactive Node Card */}
                  <button
                    onClick={() => setActiveStepIndex(idx)}
                    className={`absolute w-28 p-2.5 rounded-2xl border transition-all flex flex-col items-center text-center space-y-1 cursor-pointer ${
                      isUp ? 'bottom-11' : 'top-11'
                    } ${
                      isSelected
                        ? `scale-110 z-20 shadow-2xl`
                        : 'opacity-70 hover:opacity-100 hover:scale-105 border-[#222222]'
                    }`}
                    style={{
                      borderColor: isSelected ? step.themeColor : isUnlocked ? `${step.themeColor}50` : '#222222',
                      backgroundColor: isSelected ? `${step.themeColor}12` : '#0D0D0D',
                    }}
                  >
                    {/* Lock or Icon badge */}
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center border transition-transform"
                      style={{
                        backgroundColor: isUnlocked ? `${step.themeColor}15` : '#141414',
                        borderColor: isUnlocked ? `${step.themeColor}40` : '#262626',
                      }}
                    >
                      {isUnlocked ? React.cloneElement(step.icon as React.ReactElement<any>, { className: 'w-3.5 h-3.5' }) : <Lock className="w-3 h-3 text-[#6A6A65]" />}
                    </div>

                    <div className="w-full space-y-0.5">
                      <span
                        className="text-[8px] font-mono-stats uppercase font-bold block"
                        style={{ color: isUnlocked ? step.themeColor : '#6A6A65' }}
                      >
                        {step.levelNumber}
                      </span>
                      <span className="font-display font-extrabold text-[9px] text-white truncate block w-full">
                        {step.title}
                      </span>
                    </div>
                  </button>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3D Swiping Horizontal Card Carousel ── */}
      <div className="relative max-w-3xl mx-auto px-2">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          disabled={activeStepIndex === 0}
          className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#111] border-2 border-[#262626] hover:border-[#C4F62E] text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 shadow-2xl cursor-pointer"
          title="Previous Level"
        >
          <ChevronLeft className="w-6 h-6 text-[#C4F62E]" />
        </button>

        <button
          onClick={handleNext}
          disabled={activeStepIndex === QUEST_STEPS.length - 1}
          className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#111] border-2 border-[#262626] hover:border-[#C4F62E] text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 shadow-2xl cursor-pointer"
          title="Next Level"
        >
          <ChevronRight className="w-6 h-6 text-[#C4F62E]" />
        </button>

        {/* Card Display Deck */}
        <div className="overflow-hidden py-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeStepIndex * 100}%)` }}
          >
            {QUEST_STEPS.map((step, idx) => {
              const isUnlocked = currentRegs >= step.threshold;

              return (
                <div key={step.stepId} className="w-full flex-shrink-0 px-2">
                  <div className="relative">
                    {/* Locked Blurred Overlay */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-md rounded-3xl z-30 flex flex-col items-center justify-center space-y-4 p-6 text-center border border-[#262626]">
                        <div
                          className="w-16 h-16 rounded-2xl border flex items-center justify-center shadow-2xl animate-pulse"
                          style={{
                            backgroundColor: `${step.themeColor}15`,
                            borderColor: `${step.themeColor}40`,
                          }}
                        >
                          <Lock className="w-8 h-8" style={{ color: step.themeColor }} />
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-display font-extrabold text-xl text-white">
                            {step.levelNumber}: {step.title} is Locked
                          </h4>
                          <p className="text-xs text-[#8A8A85] max-w-sm mx-auto font-sans leading-relaxed">
                            Set your registration slider to <strong style={{ color: step.themeColor }}>{step.threshold} Regs</strong> to unblur and unlock these level privileges!
                          </p>
                        </div>

                        <button
                          onClick={() => handleQuickUnlock(step.threshold)}
                          className="px-6 py-3 rounded-full text-xs font-mono-stats font-extrabold text-[#0A0A0A] transition-transform hover:scale-105 shadow-xl cursor-pointer"
                          style={{ backgroundColor: step.themeColor }}
                        >
                          Quick Unlock ({step.threshold} Regs)
                        </button>
                      </div>
                    )}

                    {/* Unlocked / Display Card */}
                    <SpotlightCard
                      spotlightColor={`${step.themeColor}30`}
                      className={`p-6 sm:p-10 rounded-3xl border transition-all duration-500 shadow-2xl relative ${
                        isUnlocked ? step.bgGlow : 'opacity-40 filter blur-[2px]'
                      }`}
                      style={{
                        borderColor: isUnlocked ? `${step.themeColor}60` : '#242424',
                      }}
                    >
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#242424] pb-4 flex-wrap gap-3">
                          <div className="space-y-1">
                            <span
                              className="text-xs font-mono-stats uppercase tracking-wider font-bold block"
                              style={{ color: step.themeColor }}
                            >
                              {step.levelNumber} · {step.badgeLabel}
                            </span>
                            <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                              {step.title}
                            </h3>
                          </div>

                          {/* 3D Badge Coin or Verification Emblem */}
                          {step.stepId === 0 ? (
                            <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
                              <UserCheck className="w-8 h-8" />
                            </div>
                          ) : (
                            <div className="flex-shrink-0">
                              <BadgeCoinSVG badgeIndex={idx - 1} size={84} isUnlocked={isUnlocked} />
                            </div>
                          )}
                        </div>

                        {/* Milestone Requirement */}
                        <div className="space-y-1">
                          <span className="text-xs font-mono-stats font-bold uppercase tracking-wider" style={{ color: step.themeColor }}>
                            Requirement:
                          </span>
                          <p className="text-sm sm:text-base font-display font-extrabold text-white">
                            {step.milestoneText}
                          </p>
                        </div>

                        {/* Privileges Unlocked */}
                        <div className="border border-[#222222] rounded-2xl p-5 space-y-3">
                          <div
                            className="text-xs font-mono-stats uppercase tracking-widest font-bold flex items-center gap-2"
                            style={{ color: step.themeColor }}
                          >
                            <Zap className="w-4 h-4" />
                            LEVEL PRIVILEGES & REWARDS:
                          </div>

                          <ul className="space-y-2.5">
                            {step.unlocks.map((benefit, bIdx) => (
                              <li key={bIdx} className="text-xs sm:text-sm text-[#F5F3EF] flex items-start gap-3 font-sans font-medium">
                                <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" style={{ color: step.themeColor }} />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA / Action Button */}
                        <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                          {step.stepId === 0 ? (
                            <a
                              href="https://ambassador.eyfichallenge.com/#apply"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-display font-black text-[#0A0A0A] bg-[#10B981] hover:bg-[#059669] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                            >
                              <span>Apply for Verification Now</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          ) : (
                            <div className="flex items-center gap-2 text-xs font-mono-stats text-[#8A8A85]">
                              <span>Status:</span>
                              <strong style={{ color: isUnlocked ? step.themeColor : '#6A6A65' }}>
                                {isUnlocked ? 'Unlocked & Active' : 'Requires Slider Boost'}
                              </strong>
                            </div>
                          )}

                          {idx < QUEST_STEPS.length - 1 && (
                            <button
                              onClick={handleNext}
                              className="text-xs font-mono-stats font-bold text-[#8A8A85] hover:text-white transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                            >
                              <span>Next Card →</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center gap-2 pt-4">
          {QUEST_STEPS.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                activeStepIndex === idx ? 'scale-125' : 'opacity-40 hover:opacity-80'
              }`}
              style={{
                backgroundColor: activeStepIndex === idx ? step.themeColor : '#444',
              }}
              title={step.levelNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
