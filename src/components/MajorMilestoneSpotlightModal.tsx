import React, { useEffect, useState } from 'react';
import { LadderRung } from '../types';
import { BadgeIcon } from './BadgeIcon';
import { StoryCardCanvasModal } from './StoryCardCanvasModal';
import { Trophy, Gift, ArrowRight, Sparkles, Check, X, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MajorMilestoneSpotlightModalProps {
  rung: LadderRung | null;
  onClose: () => void;
  campusName: string;
}

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


export const MajorMilestoneSpotlightModal: React.FC<MajorMilestoneSpotlightModalProps> = ({
  rung,
  onClose,
  campusName,
}) => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  useEffect(() => {
    if (rung) {
      // Big celebratory gold burst for major milestone
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 12,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#FFC857', '#FF6B2C', '#FFFFFF'],
        });
        confetti({
          particleCount: 12,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#FFC857', '#FF6B2C', '#FFFFFF'],
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [rung]);

  if (!rung) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
        {/* Background Spotlight Radial Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,87,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-lg w-full bg-gradient-to-b from-[#1C1610] via-[#141414] to-[#0A0A0A] border-2 border-[#FFC857] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_80px_rgba(255,200,87,0.4)] animate-scale-bounce-major text-center overflow-hidden my-auto">
          {/* Top Gold Ribbon Banner */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#FF6B2C] via-[#FFC857] to-[#FF6B2C] text-[#0A0A0A] font-heading font-extrabold text-xs uppercase tracking-widest py-1.5 flex items-center justify-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-[#0A0A0A]" />
            <span>Major Milestone Unlocked · {rung.threshold} Registrations</span>
            <Sparkles className="w-3.5 h-3.5 fill-[#0A0A0A]" />
          </div>

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#726C64] hover:text-[#F5F3EF] p-1.5 rounded-full hover:bg-[#232323] transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="pt-4 space-y-3">
            {/* Large Animated Icon Badge */}
            <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center filter drop-shadow-[0_0_24px_rgba(255,200,87,0.6)] animate-pulse">
              <BadgeIcon type={rung.badgeType} isUnlocked={true} size={96} />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono-stats uppercase tracking-widest text-[#FFC857]">
                {campusName} Ambassador Tier
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#F5F3EF]">
                {rung.title}
              </h2>
            </div>

            <p className="text-sm text-[#D8D3CA] max-w-sm mx-auto leading-relaxed">
              {rung.description}
            </p>
          </div>

          {/* Perks Grid */}
          <div className="bg-[#1B1B1B] border border-[#262626] rounded-2xl p-4 text-left space-y-2.5">
            <div className="text-xs font-mono-stats uppercase text-[#FFC857] font-semibold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>Unlocked Milestone Privileges</span>
            </div>
            <div className="space-y-1.5">
              {rung.perks.map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F3EF] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#FFC857]/20 text-[#FFC857] flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Value */}
          <div className="flex items-center justify-between px-2 font-mono-stats text-xs">
            <span className="text-[#726C64]">Total Perks Value:</span>
            <span className="text-[#FFC857] font-extrabold text-sm">{rung.estimatedValue}</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={() => setIsStoryModalOpen(true)}
              className="w-full bg-gradient-to-r from-[#FF6B2C] via-[#FF8542] to-[#FFC857] hover:brightness-110 text-[#0A0A0A] font-heading font-extrabold text-sm py-3 px-6 rounded-2xl transition-all shadow-[0_4px_20px_rgba(255,107,44,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <InstagramIcon className="w-5 h-5" />
              <span>Download Story Card (1080x1920 PNG)</span>
            </button>

            <button
              onClick={onClose}
              className="w-full bg-[#1B1B1B] hover:bg-[#232323] border border-[#262626] text-[#F5F3EF] font-heading font-bold text-xs py-3 px-6 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <span>Continue Climbing</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      <StoryCardCanvasModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        rung={rung}
        regs={rung.threshold}
        campusName={campusName}
      />
    </>
  );
};

