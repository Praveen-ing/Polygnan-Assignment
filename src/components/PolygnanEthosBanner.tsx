import React from 'react';
import { Lightbulb, Rocket, Sparkles, Award } from 'lucide-react';

export const PolygnanEthosBanner: React.FC = () => {
  return (
    <div className="py-8 space-y-10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">


          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            "You Learn By <span className="text-[#C4F62E]">Doing</span>"
          </h3>

          <p className="text-sm sm:text-lg text-[#8A8A85] max-w-2xl mx-auto font-sans leading-relaxed">
            At Polygnan, we want India's youth to become the kind of builders who don't just prepare for the future of work — but help shape it.
            Earn however you want in under 30 days.
          </p>
        </div>

        {/* 3 Pillars (Transparent floating cards without solid background boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[#262626] rounded-2xl p-6 space-y-3 hover:border-[#C4F62E]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#C4F62E]/10 border border-[#C4F62E]/30 flex items-center justify-center text-[#C4F62E]">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h4 className="font-display font-extrabold text-lg text-white">Rancho Mindset</h4>
            <p className="text-xs sm:text-sm text-[#8A8A85] font-sans leading-relaxed">
              Curiosity over credentials. Execution over theory. Solve real problems and create tangible value from day one.
            </p>
          </div>

          <div className="border border-[#262626] rounded-2xl p-6 space-y-3 hover:border-[#C4F62E]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#C4F62E]/10 border border-[#C4F62E]/30 flex items-center justify-center text-[#C4F62E]">
              <Rocket className="w-5 h-5" />
            </div>
            <h4 className="font-display font-extrabold text-lg text-white">30-Day Income Sprint</h4>
            <p className="text-xs sm:text-sm text-[#8A8A85] font-sans leading-relaxed">
              Challenge yourself to generate your first income stream in under 30 days using skills you love.
            </p>
          </div>

          <div className="border border-[#262626] rounded-2xl p-6 space-y-3 hover:border-[#E8B923]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/30 flex items-center justify-center text-[#E8B923]">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-display font-extrabold text-lg text-white">India Earning Movement</h4>
            <p className="text-xs sm:text-sm text-[#8A8A85] font-sans leading-relaxed">
              Lead the movement on your campus as a verified Scout. Unlock stipends, merch, and founding team roles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
