import React from 'react';
import { UserCheck, Share2, TrendingUp } from 'lucide-react';

export const HowItWorksSteps: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: <UserCheck className="w-6 h-6 text-[#C4F62E]" />,
      title: 'Apply & Get Verified',
      description: 'Fill out the scout application. Selected candidates receive an official welcome kit and badge.',
    },
    {
      number: '02',
      icon: <Share2 className="w-6 h-6 text-[#C4F62E]" />,
      title: 'Spread EYFI on Campus',
      description: 'Invite students to join the Earn Your First Income 30-day challenge using your unique referral code.',
    },
    {
      number: '03',
      icon: <TrendingUp className="w-6 h-6 text-[#C4F62E]" />,
      title: 'Unlock Levels & Rewards',
      description: 'As your registration count grows from 0 to 200+, automatically unlock swag, grants, stipends & founding roles.',
    },
  ];

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/30 text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
          Simple 3-Step Journey
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
          How the <span className="text-[#C4F62E]">Program Works</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl mx-auto font-sans">
          Start as a Scout and flow down the 6-level river pathway step-by-step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="border border-[#262626] rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:border-[#C4F62E]/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#C4F62E]/10 border border-[#C4F62E]/30 flex items-center justify-center">
                {step.icon}
              </div>
              <span className="font-display font-extrabold text-3xl text-[#333] group-hover:text-[#C4F62E]/40 transition-colors">
                {step.number}
              </span>
            </div>

            <div>
              <h4 className="font-display font-extrabold text-lg text-white group-hover:text-[#C4F62E] transition-colors">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#8A8A85] leading-relaxed mt-2 font-sans">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
