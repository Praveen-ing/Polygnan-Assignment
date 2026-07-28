import React, { useRef, useEffect, useState } from 'react';
import { LadderRung } from '../types';
import { MilestoneBadgeType } from './BadgeIcon';
import { Download, Sparkles, Check, X, Share2, Copy, Camera } from 'lucide-react';

interface StoryCardCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  rung: LadderRung;
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


export const StoryCardCanvasModal: React.FC<StoryCardCanvasModalProps> = ({
  isOpen,
  onClose,
  rung,
  regs,
  campusName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Render 1080x1920 Instagram Story Card on canvas
  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure canvas element is mounted in DOM
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1080;
      const height = 1920;

      // 1. Background Fill
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, width, height);

      // Radial Lime Aura in the upper-center
      const aura = ctx.createRadialGradient(width / 2, 680, 80, width / 2, 680, 700);
      aura.addColorStop(0, 'rgba(196, 246, 46, 0.35)');
      aura.addColorStop(0.4, 'rgba(232, 185, 35, 0.18)');
      aura.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      // Subtle Decorative Diagonal Lines in Background
      ctx.strokeStyle = 'rgba(196, 246, 46, 0.05)';
      ctx.lineWidth = 2;
      for (let i = -width; i < width + height; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
      }

      // Outer Frame Border
      ctx.strokeStyle = '#C4F62E';
      ctx.lineWidth = 8;
      ctx.strokeRect(36, 36, width - 72, height - 72);

      ctx.strokeStyle = '#E8B923';
      ctx.lineWidth = 3;
      ctx.strokeRect(48, 48, width - 96, height - 96);

      // 2. Header Section: EYFI Wordmark
      ctx.save();
      ctx.textAlign = 'left';
      
      // "EYFI"
      ctx.fillStyle = '#C4F62E';
      ctx.font = '900 68px "Space Grotesk", sans-serif';
      ctx.fillText('EYFI', 90, 150);

      // "// EARN YOUR FIRST INCOME"
      ctx.fillStyle = '#E8B923';
      ctx.font = '700 24px "Space Mono", monospace';
      ctx.fillText('// EARN YOUR FIRST INCOME', 260, 142);

      // Campus Pill (Top Right)
      const campusText = campusName.toUpperCase();
      ctx.font = '700 22px "Space Mono", monospace';
      const campusWidth = ctx.measureText(campusText).width;
      
      // Draw Pill background
      const pillX = width - 90 - campusWidth - 40;
      const pillY = 105;
      const pillW = campusWidth + 40;
      const pillH = 50;

      ctx.fillStyle = '#1B1B1B';
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 25);
      ctx.fill();
      ctx.strokeStyle = '#C4F62E';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#F5F3EF';
      ctx.fillText(campusText, pillX + 20, pillY + 33);
      ctx.restore();

      // Divider Line below header
      ctx.strokeStyle = 'rgba(196, 246, 46, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(90, 195);
      ctx.lineTo(width - 90, 195);
      ctx.stroke();

      // 3. Central Badge Icon & Rank Emblem
      const centerX = width / 2;
      const centerY = 520;
      const badgeRadius = 130;

      // Outer Glowing Ring
      ctx.save();
      ctx.shadowColor = 'rgba(196, 246, 46, 0.5)';
      ctx.shadowBlur = 40;
      ctx.fillStyle = '#141414';
      ctx.strokeStyle = '#C4F62E';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, badgeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Inner Dashed Accent Ring
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = '#E8B923';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, badgeRadius - 16, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Draw Badge Icon Graphic in Canvas Context
      drawCanvasBadge(ctx, rung.badgeType, centerX, centerY, 140);

      // 4. Milestone Title Banner
      ctx.save();
      ctx.textAlign = 'center';

      // "I JUST BECAME"
      ctx.fillStyle = '#C4F62E';
      ctx.font = '700 34px "Space Mono", monospace';
      ctx.fillText('I JUST BECAME', centerX, 730);

      // Big Bold Milestone Title
      ctx.fillStyle = '#F5F3EF';
      ctx.font = '800 76px "Space Grotesk", sans-serif';
      ctx.shadowColor = 'rgba(196, 246, 46, 0.4)';
      ctx.shadowBlur = 20;
      ctx.fillText(`${rung.title} ${rung.icon}`, centerX, 825);
      ctx.shadowBlur = 0;

      // Description / Privilege
      ctx.fillStyle = '#D8D3CA';
      ctx.font = '500 30px "Space Grotesk", sans-serif';
      ctx.fillText(`"${rung.description}"`, centerX, 885);
      ctx.restore();

      // 5. Giant Registration Stats Card
      const cardX = 90;
      const cardY = 960;
      const cardW = width - 180;
      const cardH = 480;

      ctx.save();
      // Card Background
      const cardGrad = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardH);
      cardGrad.addColorStop(0, '#18200C');
      cardGrad.addColorStop(1, '#101010');
      ctx.fillStyle = cardGrad;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 36);
      ctx.fill();

      ctx.strokeStyle = '#C4F62E';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.textAlign = 'center';

      // Stat Header Label
      ctx.fillStyle = '#C4F62E';
      ctx.font = '700 28px "Space Mono", monospace';
      ctx.fillText('CAMPUS REGISTRATIONS DRIVEN', centerX, cardY + 75);

      // Giant Space Mono Lime Number Style
      ctx.fillStyle = '#C4F62E';
      ctx.font = '800 145px "Space Mono", monospace';
      ctx.shadowColor = 'rgba(196, 246, 46, 0.6)';
      ctx.shadowBlur = 30;
      ctx.fillText(`${Math.round(regs)}`, centerX, cardY + 235);
      ctx.shadowBlur = 0;

      // Value Badge Pill
      ctx.fillStyle = '#1F2A0E';
      ctx.beginPath();
      ctx.roundRect(centerX - 220, cardY + 285, 440, 60, 30);
      ctx.fill();
      ctx.strokeStyle = 'rgba(196, 246, 46, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#C4F62E';
      ctx.font = '700 24px "Space Mono", monospace';
      ctx.fillText(`ESTIMATED VALUE: ${rung.estimatedValue}`, centerX, cardY + 324);

      // Perks summary
      ctx.fillStyle = '#8C8A82';
      ctx.font = '600 22px "Space Grotesk", sans-serif';
      ctx.fillText(`UNLOCKED: ${rung.perks.join(' • ')}`, centerX, cardY + 415);
      ctx.restore();

      // 6. Bottom Tag — "Wave 01 · Campus Ambassador"
      const tagY = 1620;
      ctx.save();
      ctx.textAlign = 'center';

      // Tag Pill Box
      const tagText = 'Wave 01 · Campus Ambassador';
      ctx.font = '700 32px "Space Mono", monospace';
      const tagWidth = ctx.measureText(tagText).width;

      const tagPillW = tagWidth + 70;
      const tagPillH = 76;
      const tagPillX = centerX - tagPillW / 2;

      // Lime Glow behind bottom tag
      ctx.shadowColor = 'rgba(196, 246, 46, 0.4)';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#1A230B';
      ctx.beginPath();
      ctx.roundRect(tagPillX, tagY, tagPillW, tagPillH, 38);
      ctx.fill();
      ctx.strokeStyle = '#C4F62E';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#C4F62E';
      ctx.fillText(tagText, centerX, tagY + 49);

      // Footer Slogan
      ctx.fillStyle = '#726C64';
      ctx.font = '700 22px "Space Mono", monospace';
      ctx.fillText('EYFI.AMBASSADORS — EARNED, NOT HANDED', centerX, 1770);
      ctx.restore();
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, rung, regs, campusName]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setDownloading(true);
    try {
      const imageUri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `EYFI-StoryCard-${rung.title.replace(/\s+/g, '')}-${regs}Regs.png`;
      link.href = imageUri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error exporting story card image:', err);
    } finally {
      setDownloading(false);
    }
  };

  const shareCaption = `I just reached ${rung.title} on the EYFI Campus Ambassador Ladder at ${campusName} with ${Math.round(regs)} registrations! 🚀 #EarnYourFirstIncome #Wave01 #EYFI`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(shareCaption);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-[#141414] border border-[#232323] rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-5 relative shadow-2xl my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#726C64] hover:text-[#F5F3EF] p-2 rounded-full hover:bg-[#232323] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 text-left pr-8">
          <div className="flex items-center gap-1.5 text-xs font-mono-stats uppercase text-[#C4F62E] font-bold">
            <InstagramIcon className="w-4 h-4 text-[#C4F62E]" />
            <span>Instagram Story Progress Card</span>
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#F5F3EF]">
            Share Your Ambassador Milestone
          </h2>
        </div>

        {/* Scaled Preview of the 1080x1920 Story Canvas */}
        <div className="relative mx-auto bg-[#0A0A0A] border-2 border-[#C4F62E]/40 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(196,246,46,0.15)] group max-w-[280px] sm:max-w-[310px] aspect-[9/16]">
          {/* Canvas Element (Rendered at full 1080x1920, scaled down via CSS for sharp crisp export) */}
          <canvas
            ref={canvasRef}
            width={1080}
            height={1920}
            className="w-full h-full object-contain block"
          />

          <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md text-[#C4F62E] text-[10px] font-mono-stats px-2 py-0.5 rounded-md border border-[#C4F62E]/30">
            1080 × 1920 PNG
          </div>
        </div>

        {/* Download & Copy Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full bg-[#C4F62E] hover:bg-[#b0eb18] text-[#0A0A0A] font-heading font-extrabold text-sm py-3.5 px-5 rounded-2xl transition-all shadow-[0_4px_20px_rgba(196,246,46,0.35)] flex items-center justify-center gap-2 cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Downloaded PNG Image!</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>Download Story Card (1080x1920 PNG)</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyCaption}
            className="w-full bg-[#1B1B1B] hover:bg-[#232323] border border-[#262626] text-[#F5F3EF] font-mono-stats text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copiedText ? (
              <>
                <Check className="w-4 h-4 text-[#C4F62E]" />
                <span>Caption Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#726C64]" />
                <span>Copy Instagram Story Caption</span>
              </>
            )}
          </button>
        </div>

        {/* Wave 01 Tag Note */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-3 text-center text-[11px] font-mono-stats text-[#726C64]">
          <span className="text-[#C4F62E] font-bold">Tag @eyfi.in</span> on Instagram Stories to get featured on the official campus ambassador leaderboard!
        </div>
      </div>
    </div>
  );
};

// Canvas Helper function to draw vector badge icons onto Canvas 2D Context
function drawCanvasBadge(
  ctx: CanvasRenderingContext2D,
  type: MilestoneBadgeType,
  cx: number,
  cy: number,
  scale: number
) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = scale / 64; // Base vector design was on 64x64 grid
  ctx.scale(s, s);

  const primary = '#C4F62E';
  const accent = '#E8B923';

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (type === 'scout') {
    // Compass
    ctx.strokeStyle = primary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = accent;
    ctx.strokeStyle = primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(6, 0);
    ctx.lineTo(0, 14);
    ctx.lineTo(-6, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'ambassador') {
    // Ribbon Medallion
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(-10, 10);
    ctx.lineTo(-16, 26);
    ctx.lineTo(-8, 22);
    ctx.lineTo(0, 26);
    ctx.lineTo(-8, 10);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(16, 26);
    ctx.lineTo(8, 22);
    ctx.lineTo(0, 26);
    ctx.lineTo(8, 10);
    ctx.fill();

    ctx.fillStyle = '#141414';
    ctx.strokeStyle = primary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -6, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(3, -8);
    ctx.lineTo(9, -7);
    ctx.lineTo(4, -2);
    ctx.lineTo(6, 4);
    ctx.lineTo(0, 1);
    ctx.lineTo(-6, 4);
    ctx.lineTo(-4, -2);
    ctx.lineTo(-9, -7);
    ctx.lineTo(-3, -8);
    ctx.closePath();
    ctx.fill();
  } else if (type === 'levelup') {
    // Upward Arrow through Ring
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 6, 20, 8, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = primary;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(0, -18);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-12, -8);
    ctx.lineTo(0, -20);
    ctx.lineTo(12, -8);
    ctx.stroke();
  } else if (type === 'gofurther') {
    // Mountain Peak with Path
    ctx.fillStyle = '#1F1F1F';
    ctx.strokeStyle = primary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-18, 18);
    ctx.lineTo(0, -18);
    ctx.lineTo(18, 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(5, -8);
    ctx.lineTo(0, -5);
    ctx.lineTo(-5, -8);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.bezierCurveTo(6, 13, -6, 5, 0, -2);
    ctx.stroke();
  } else if (type === 'internship') {
    // Briefcase with Rupee
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-8, -12);
    ctx.lineTo(-8, -16);
    ctx.arcTo(-8, -18, 0, -18, 4);
    ctx.arcTo(8, -18, 8, -16, 4);
    ctx.lineTo(8, -12);
    ctx.stroke();

    ctx.fillStyle = '#1A1A1A';
    ctx.strokeStyle = primary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-22, -12, 44, 30, 6);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = primary;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-6, -1);
    ctx.lineTo(4, -1);
    ctx.moveTo(-6, 3);
    ctx.lineTo(4, 3);
    ctx.moveTo(-6, -1);
    ctx.lineTo(-6, 10);
    ctx.bezierCurveTo(0, 10, 2, 7, 2, 5);
    ctx.moveTo(-6, 5);
    ctx.lineTo(3, 10);
    ctx.stroke();
  } else if (type === 'founding') {
    // Star inside Shield
    ctx.fillStyle = '#1A1A1A';
    ctx.strokeStyle = primary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(18, -14);
    ctx.bezierCurveTo(18, 8, 9, 18, 0, 22);
    ctx.bezierCurveTo(-9, 18, -18, 8, -18, -14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(3, -3);
    ctx.lineTo(10, -2);
    ctx.lineTo(5, 3);
    ctx.lineTo(6, 10);
    ctx.lineTo(0, 6);
    ctx.lineTo(-6, 10);
    ctx.lineTo(-5, 3);
    ctx.lineTo(-10, -2);
    ctx.lineTo(-3, -3);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}
