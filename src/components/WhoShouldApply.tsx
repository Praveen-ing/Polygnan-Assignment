import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface WhoShouldApplyProps {
  onApplyClick?: () => void;
}

export const WhoShouldApply: React.FC<WhoShouldApplyProps> = ({ onApplyClick }) => {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#232323]">
      {/* Checklist */}
      <div className="text-center mb-16">
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mb-3 tracking-tight">
          Who should apply
        </h2>
        <p className="text-sm sm:text-base text-[#C8C8C4] mb-8 font-sans">
          A quick gut check before you hit apply.
        </p>

        <div className="max-w-xl mx-auto text-left space-y-4">
          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 border-2 border-[#C4F62E] rounded-md flex items-center justify-center shrink-0 text-[#C4F62E] mt-0.5 font-bold">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span className="text-sm sm:text-base text-[#C8C8C4] leading-snug font-sans">
              Currently a student, any year, any college
            </span>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 border-2 border-[#C4F62E] rounded-md flex items-center justify-center shrink-0 text-[#C4F62E] mt-0.5 font-bold">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span className="text-sm sm:text-base text-[#C8C8C4] leading-snug font-sans">
              Active in at least one campus community, a club, a class, a group chat that actually listens to you
            </span>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 border-2 border-[#C4F62E] rounded-md flex items-center justify-center shrink-0 text-[#C4F62E] mt-0.5 font-bold">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span className="text-sm sm:text-base text-[#C8C8C4] leading-snug font-sans">
              Can realistically commit time before, during, and after Wave 01 launches
            </span>
          </div>

          <p className="text-xs text-[#8A8A85] pt-2 pl-9">
            Both the first and the third need to be true. The second one just makes you more likely to succeed.
          </p>
        </div>
      </div>

      {/* Final Application CTA Banner */}
      <div id="apply" className="border border-[#2A2A2A] rounded-2xl p-8 sm:p-12 text-center bg-[#111111]/80 backdrop-blur-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4F62E]/5 rounded-full blur-3xl pointer-events-none" />

        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mb-6 leading-tight tracking-tight">
          Ready to build this on <span className="text-[#C4F62E]">your campus?</span>
        </h2>

        <button
          onClick={onApplyClick}
          className="inline-flex items-center gap-2 rounded-full bg-[#C4F62E] text-[#0A0A0A] font-display font-extrabold text-base sm:text-lg px-8 py-4 hover:bg-[#b0eb18] transition-all cursor-pointer shadow-[0_4px_20px_rgba(196,246,46,0.35)] hover:scale-105 active:scale-95"
        >
          <span>Apply for Wave 01</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <p className="text-xs sm:text-sm text-[#8A8A85] mt-4 font-sans">
          Applications for Wave 01 are limited, once we've filled our spots for your region, this closes.
        </p>
      </div>
    </section>
  );
};
