import React, { useState } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { Share2, Copy, Check, X, Award } from 'lucide-react';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  regs: number;
  campusName: string;
}

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  regs,
  campusName,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const unlockedRungs = LADDER_RUNGS.filter((r) => regs >= r.threshold);
  const currentRung   = unlockedRungs[unlockedRungs.length - 1] || LADDER_RUNGS[0];
  const tierColor     = currentRung.color;

  const shareText = `Just unlocked "${currentRung.title}" on the EYFI Campus Ambassador Ladder with ${Math.round(regs)} registrations!\n\nWave 01 is open — limited spots per college.\n#EarnYourFirstIncome #EYFI #CampusAmbassador`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl  = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const xUrl         = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const linkedinUrl  = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://ambassador.eyfichallenge.com')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111111] border border-[#232323] rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6A6A65] hover:text-[#F5F3EF] p-1.5 rounded-full hover:bg-[#232323] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#C4F62E]" />
          <h2 className="font-display font-extrabold text-[#F5F3EF] text-lg">Share Your Rank</h2>
        </div>

        {/* Rank Card Preview */}
        <div
          className="relative rounded-2xl p-5 text-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${tierColor}20, #0A0A0A, ${tierColor}10)`,
            border: `1.5px solid ${tierColor}40`,
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 opacity-10 rounded-2xl"
            style={{ background: `radial-gradient(circle at 50% 30%, ${tierColor}, transparent 70%)` }}
          />

          <div className="relative space-y-2">
            <Award className="w-8 h-8 text-[#C4F62E] mx-auto" />
            <div className="font-mono-stats text-3xl font-black text-[#C4F62E]">
              {Math.round(regs)}{' '}
              <span className="text-sm font-normal text-[#6A6A65]">regs</span>
            </div>
            <div className="font-display font-extrabold text-lg text-[#F5F3EF]">
              {currentRung.title}
            </div>
            <div className="text-xs text-[#6A6A65] font-mono-stats">
              EYFI Campus Ambassador · Wave 01
            </div>

            {/* Tier chips */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {LADDER_RUNGS.map((r) => (
                <span
                  key={r.id}
                  className="text-[9px] px-2 py-0.5 rounded-full font-mono-stats font-bold"
                  style={{
                    backgroundColor: regs >= r.threshold ? `${r.color}25` : '#1A1A1A',
                    color: regs >= r.threshold ? r.color : '#3A3A3A',
                    border: `1px solid ${regs >= r.threshold ? r.color + '40' : '#2A2A2A'}`,
                  }}
                >
                  {r.milestoneText}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Share text preview */}
        <div className="bg-[#0E0E0E] border border-[#1E1E1E] rounded-xl p-3 text-xs text-[#8A8A85] font-sans leading-relaxed whitespace-pre-line">
          {shareText}
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          {/* Copy text */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] hover:bg-[#222222] text-[#F5F3EF] font-display font-bold text-sm transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Caption'}
          </button>

          {/* Social share row */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-[#075E54]/20 border border-[#075E54]/30 hover:bg-[#075E54]/30 text-[#25D366] transition-all text-xs font-semibold cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href={xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#222222] text-[#F5F3EF] transition-all text-xs font-semibold cursor-pointer"
            >
              <XIcon className="w-5 h-5" />
              Twitter/X
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-[#0A66C2]/20 border border-[#0A66C2]/30 hover:bg-[#0A66C2]/30 text-[#0A66C2] transition-all text-xs font-semibold cursor-pointer"
            >
              <Award className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
