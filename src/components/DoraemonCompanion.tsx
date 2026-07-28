import React, { useState } from 'react';
import { Sparkles, Compass, Rocket, BookOpen, X, Volume2 } from 'lucide-react';

interface DoraemonCompanionProps {
  onFlyToLevel?: () => void;
  onOpenPassStudio?: () => void;
}

export const DoraemonCompanion: React.FC<DoraemonCompanionProps> = ({
  onFlyToLevel,
  onOpenPassStudio,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeGadgetMsg, setActiveGadgetMsg] = useState<string | null>(null);

  const handleGadgetClick = (gadgetName: string, action?: () => void) => {
    if (gadgetName === 'takecopter') {
      setActiveGadgetMsg('🚁 Take-copter Activated! Flying down the EYFI Level River!');
      action?.();
    } else if (gadgetName === 'anywheredoor') {
      setActiveGadgetMsg('🚪 Anywhere Door Opened! Teleporting to Scout Pass Studio!');
      action?.();
    } else if (gadgetName === 'memorybread') {
      setActiveGadgetMsg('🍞 Memory Bread Consumed! Rancho Mindset Activated: "Learn By Doing!"');
    }
    setTimeout(() => setActiveGadgetMsg(null), 3500);
  };

  return (
    <>
      {/* Floating Doraemon Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Speech Bubble */}
        {!isOpen && (
          <div className="bg-[#111] border border-[#C4F62E]/40 text-white text-xs font-mono-stats px-3 py-1.5 rounded-2xl shadow-2xl flex items-center gap-1.5 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-[#C4F62E]" />
            <span>4D Gadget Pocket</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-[#00A0E9] border-2 border-white shadow-[0_0_24px_rgba(0,160,233,0.6)] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 relative overflow-hidden group"
          title="Open Doraemon's 4D Builder Pocket"
        >
          {/* Vector Doraemon Face */}
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            {/* Blue Head */}
            <circle cx="50" cy="50" r="45" fill="#00A0E9" stroke="#000" strokeWidth="3" />
            {/* White Face Oval */}
            <ellipse cx="50" cy="58" rx="36" ry="30" fill="#FFFFFF" stroke="#000" strokeWidth="2.5" />
            {/* Eyes */}
            <ellipse cx="40" cy="35" rx="7" ry="11" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
            <ellipse cx="60" cy="35" rx="7" ry="11" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
            {/* Pupils */}
            <circle cx="42" cy="37" r="2.5" fill="#000" />
            <circle cx="58" cy="37" r="2.5" fill="#000" />
            {/* Red Nose */}
            <circle cx="50" cy="46" r="6" fill="#E60012" stroke="#000" strokeWidth="1.5" />
            <circle cx="48" cy="44" r="2" fill="#FFF" />
            {/* Nose to mouth vertical line */}
            <line x1="50" y1="52" x2="50" y2="74" stroke="#000" strokeWidth="2" />
            {/* Smile Mouth */}
            <path d="M 28 64 Q 50 85 72 64" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
            {/* Whiskers Left */}
            <line x1="16" y1="48" x2="34" y2="52" stroke="#000" strokeWidth="2" />
            <line x1="14" y1="58" x2="34" y2="58" stroke="#000" strokeWidth="2" />
            <line x1="16" y1="68" x2="34" y2="64" stroke="#000" strokeWidth="2" />
            {/* Whiskers Right */}
            <line x1="84" y1="48" x2="66" y2="52" stroke="#000" strokeWidth="2" />
            <line x1="86" y1="58" x2="66" y2="58" stroke="#000" strokeWidth="2" />
            <line x1="84" y1="68" x2="66" y2="64" stroke="#000" strokeWidth="2" />
            {/* Red Collar & Golden Bell */}
            <rect x="25" y="84" width="50" height="7" rx="3.5" fill="#E60012" stroke="#000" strokeWidth="1.5" />
            <circle cx="50" cy="92" r="5" fill="#FFD700" stroke="#000" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {/* 4D Pocket Modal / Popover */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-[#0F0F0F] border-2 border-[#00A0E9] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,160,233,0.35)] space-y-4 animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#222] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00A0E9] animate-pulse" />
              <span className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
                Doraemon's 4D Builder Pocket
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8A8A85] hover:text-white p-1 rounded-lg hover:bg-[#222] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#8A8A85] font-sans">
            Choose a 22nd-century gadget to boost your EYFI 30-Day Earning Challenge:
          </p>

          {/* Active Toast Notification */}
          {activeGadgetMsg && (
            <div className="bg-[#00A0E9]/15 border border-[#00A0E9]/40 text-[#00A0E9] text-xs font-mono-stats p-3 rounded-xl animate-fade-in font-bold flex items-center gap-2">
              <Volume2 className="w-4 h-4 flex-shrink-0" />
              <span>{activeGadgetMsg}</span>
            </div>
          )}

          {/* Gadget Buttons Grid */}
          <div className="space-y-2.5">
            {/* Take-copter */}
            <button
              onClick={() => handleGadgetClick('takecopter', onFlyToLevel)}
              className="w-full p-3 rounded-2xl border border-[#262626] hover:border-[#00A0E9] bg-[#141414] hover:bg-[#00A0E9]/10 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00A0E9]/20 border border-[#00A0E9]/40 flex items-center justify-center text-[#00A0E9]">
                  <Rocket className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </div>
                <div>
                  <h5 className="font-display font-extrabold text-xs text-white group-hover:text-[#00A0E9]">
                    🚁 Take-copter (タケコプター)
                  </h5>
                  <p className="text-[10px] text-[#8A8A85]">Fly directly down the Level River</p>
                </div>
              </div>
            </button>

            {/* Anywhere Door */}
            <button
              onClick={() => handleGadgetClick('anywheredoor', onOpenPassStudio)}
              className="w-full p-3 rounded-2xl border border-[#262626] hover:border-[#FF6B2C] bg-[#141414] hover:bg-[#FF6B2C]/10 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 flex items-center justify-center text-[#FF6B2C]">
                  <Compass className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h5 className="font-display font-extrabold text-xs text-white group-hover:text-[#FF6B2C]">
                    🚪 Anywhere Door (どこでもドア)
                  </h5>
                  <p className="text-[10px] text-[#8A8A85]">Teleport to Scout Pass Studio</p>
                </div>
              </div>
            </button>

            {/* Memory Bread */}
            <button
              onClick={() => handleGadgetClick('memorybread')}
              className="w-full p-3 rounded-2xl border border-[#262626] hover:border-[#C4F62E] bg-[#141414] hover:bg-[#C4F62E]/10 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C4F62E]/20 border border-[#C4F62E]/40 flex items-center justify-center text-[#C4F62E]">
                  <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h5 className="font-display font-extrabold text-xs text-white group-hover:text-[#C4F62E]">
                    🍞 Memory Bread (アンキパン)
                  </h5>
                  <p className="text-[10px] text-[#8A8A85]">Rancho Builder Mindset cheat code</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
