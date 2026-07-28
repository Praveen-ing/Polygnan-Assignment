import React from 'react';
import { LadderRung } from '../types';
import { Trophy, ArrowRight, Sparkles, Check, X } from 'lucide-react';

interface MajorMilestoneSpotlightModalProps {
  rung: LadderRung | null;
  onClose: () => void;
  campusName: string;
}

export const MajorMilestoneSpotlightModal: React.FC<MajorMilestoneSpotlightModalProps> = ({
  rung,
  onClose,
  campusName,
}) => {
  if (!rung) return null;

  const tierColor = rung.color || '#FF6B2C';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Radial aura */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${tierColor}15 0%, transparent 70%)`,
        }}
      />

      <div
        className="relative max-w-lg w-full bg-gradient-to-b from-[#161616] via-[#111111] to-[#0A0A0A] rounded-3xl p-6 sm:p-8 space-y-5 animate-scale-bounce-major text-center overflow-hidden my-auto spotlight-glow"
        style={{ borderWidth: 2, borderStyle: 'solid', borderColor: tierColor }}
      >
        {/* Top ribbon */}
        <div
          className="absolute top-0 left-0 right-0 font-display font-extrabold text-xs uppercase tracking-widest py-1.5 flex items-center justify-center gap-1.5 shadow-md text-white"
          style={{ backgroundColor: tierColor }}
        >
          <Sparkles className="w-3.5 h-3.5 fill-white" />
          <span>Major Milestone Unlocked · {rung.threshold} Regs</span>
          <Sparkles className="w-3.5 h-3.5 fill-white" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6A6A65] hover:text-[#F5F3EF] p-1.5 rounded-full hover:bg-[#232323] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-6 space-y-3">
          {/* Big emoji */}
          <div
            className="mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center text-5xl sm:text-6xl"
            style={{
              background: `radial-gradient(circle at 35% 30%, ${tierColor}30, ${tierColor}10)`,
              border: `2px solid ${tierColor}40`,
              filter: `drop-shadow(0 0 24px ${tierColor}60)`,
            }}
          >
            {rung.icon}
          </div>

          <div className="space-y-1">
            <span
              className="text-xs font-mono-stats uppercase tracking-widest font-bold"
              style={{ color: tierColor }}
            >
              {campusName} · {rung.reqText}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F5F3EF]">
              {rung.title}
            </h2>
          </div>

          <p className="text-sm text-[#C8C8C4] max-w-sm mx-auto leading-relaxed">
            "{rung.description}"
          </p>
        </div>

        {/* Perks */}
        <div className="bg-[#1A1A1A] border border-[#232323] rounded-2xl p-4 text-left space-y-2.5">
          <div
            className="text-xs font-mono-stats uppercase font-semibold flex items-center gap-1.5"
            style={{ color: tierColor }}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>What you just unlocked</span>
          </div>

          <div className="space-y-2">
            {rung.perksDetailed.map((perk, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#F5F3EF]">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${tierColor}20`, color: tierColor }}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="leading-relaxed">{perk.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Value */}
        <div className="flex items-center justify-between px-1 font-mono-stats text-xs">
          <span className="text-[#6A6A65]">Est. tier value:</span>
          <span className="font-extrabold text-sm" style={{ color: tierColor }}>
            {rung.estimatedValue}
          </span>
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="w-full font-display font-extrabold text-sm py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer text-white"
          style={{
            background: `linear-gradient(135deg, ${tierColor}, ${tierColor}cc)`,
            boxShadow: `0 4px 20px ${tierColor}40`,
          }}
        >
          <span>Keep Climbing 🚀</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
