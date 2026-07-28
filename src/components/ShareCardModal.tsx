import React, { useState } from 'react';
import { LADDER_RUNGS } from '../data/ladderData';
import { BadgeIcon } from './BadgeIcon';
import { StoryCardCanvasModal } from './StoryCardCanvasModal';
import { Share2, Copy, Check, X, Zap, Award, ExternalLink, Download, Camera } from 'lucide-react';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  regs: number;
  campusName: string;
}

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  regs,
  campusName,
}) => {
  const [copied, setCopied] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  if (!isOpen) return null;

  const unlockedRungs = LADDER_RUNGS.filter((r) => regs >= r.threshold);
  const currentRung = unlockedRungs[unlockedRungs.length - 1] || LADDER_RUNGS[0];

  const shareText = `I just became ${currentRung.title} 🎖️ with ${Math.round(
    regs
  )} registrations on the EYFI Campus Ambassador Ladder at ${campusName}! Wave 01 · Campus Ambassador #EarnYourFirstIncome #EYFI`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://eyfi.in')}`;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
        <div className="bg-[#141414] border border-[#232323] rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#726C64] hover:text-[#F5F3EF] p-1.5 rounded-full hover:bg-[#232323] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1 text-left">
            <div className="flex items-center gap-1.5 text-xs font-mono-stats uppercase text-[#FF6B2C] font-bold">
              <Zap className="w-4 h-4 fill-current" />
              <span>EYFI Ambassador Progress</span>
            </div>
            <h2 className="font-heading font-bold text-xl text-[#F5F3EF]">
              Share Your Progress Card
            </h2>
          </div>

          {/* Share Preview Card */}
          <div className="bg-gradient-to-br from-[#1C1610] via-[#141414] to-[#0D0D0D] border-2 border-[#FFC857]/40 rounded-2xl p-5 space-y-4 shadow-[0_0_24px_rgba(255,200,87,0.12)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Award className="w-24 h-24 text-[#FFC857]" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-stats text-[#FF6B2C] uppercase tracking-wider font-bold">
                {campusName}
              </span>
              <span className="text-xs font-mono-stats text-[#FFC857] font-extrabold bg-[#FFC857]/10 px-2.5 py-0.5 rounded-full border border-[#FFC857]/30">
                {Math.round(regs)} REGS
              </span>
            </div>

            <div>
              <div className="text-[11px] text-[#726C64] uppercase font-mono-stats mb-1">
                Current Ambassador Rank
              </div>
              <div className="font-heading text-2xl font-extrabold text-[#F5F3EF] flex items-center gap-3">
                <BadgeIcon type={currentRung.badgeType} isUnlocked={true} size={44} />
                <span>{currentRung.title}</span>
              </div>
            </div>

            <div className="text-xs text-[#D8D3CA] border-t border-[#232323] pt-3 italic">
              "{currentRung.description}"
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#A39E93] font-mono-stats pt-1 border-t border-[#232323]/50">
              <span className="text-[#FFC857] font-bold">Wave 01 · Campus Ambassador</span>
              <span>EYFI.IN</span>
            </div>
          </div>

          {/* Primary Action: Download Instagram Story Canvas (1080x1920 PNG) */}
          <button
            onClick={() => setIsStoryModalOpen(true)}
            className="w-full bg-gradient-to-r from-[#FF6B2C] via-[#FF8542] to-[#FFC857] hover:brightness-110 text-[#0A0A0A] font-heading font-extrabold text-sm py-3.5 px-4 rounded-2xl transition-all shadow-[0_4px_16px_rgba(255,107,44,0.35)] flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
          >
            <InstagramIcon className="w-5 h-5" />
            <span>Generate Story Card (1080x1920 PNG)</span>
          </button>

          {/* Secondary Copy Text */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 bg-[#1B1B1B] hover:bg-[#232323] border border-[#262626] text-[#F5F3EF] font-mono-stats text-xs py-2.5 px-4 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#FFC857] stroke-[3]" />
                <span>Caption Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#A39E93]" />
                <span>Copy Progress Message</span>
              </>
            )}
          </button>

          {/* Social Links */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-[#1B1B1B] hover:bg-[#232323] border border-[#262626] text-[11px] font-mono-stats py-2 px-2 rounded-xl transition-colors text-[#F5F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
            >
              <span>WhatsApp</span>
              <ExternalLink className="w-3 h-3 text-[#A39E93]" />
            </a>
            <a
              href={xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-[#1B1B1B] hover:bg-[#232323] border border-[#262626] text-[11px] font-mono-stats py-2 px-2 rounded-xl transition-colors text-[#F5F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
            >
              <span>X / Twitter</span>
              <ExternalLink className="w-3 h-3 text-[#A39E93]" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-[#1B1B1B] hover:bg-[#232323] border border-[#262626] text-[11px] font-mono-stats py-2 px-2 rounded-xl transition-colors text-[#F5F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC857] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-[#A39E93]" />
            </a>
          </div>
        </div>
      </div>

      {/* 1080x1920 Story Card Modal */}
      <StoryCardCanvasModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        rung={currentRung}
        regs={regs}
        campusName={campusName}
      />
    </>
  );
};

