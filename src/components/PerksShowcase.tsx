import React from 'react';
import { ShieldCheck, Award, Gift, Users, Briefcase, Crown, Sparkles } from 'lucide-react';

export const PerksShowcase: React.FC = () => {
  const perks = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C4F62E]" />,
      title: 'Official Ambassador Title',
      description: 'Gain verified campus ambassador credentials to highlight on LinkedIn & resume.',
    },
    {
      icon: <Gift className="w-6 h-6 text-[#C4F62E]" />,
      title: 'Exclusive Swag Drops',
      description: 'Receive custom EYFI hoodies, tees, caps, stickers, and tech accessories.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#C4F62E]" />,
      title: 'Campus Event Grants',
      description: 'Unlock official sponsorship funding & merchandise grants for campus events.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#C4F62E]" />,
      title: 'Private Founder Network',
      description: 'Connect directly with top startup founders, mentors, and student leaders across India.',
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#C4F62E]" />,
      title: 'Paid Internships & Stipends',
      description: 'Fast-track access to high-growth paid internships and performance stipends.',
    },
    {
      icon: <Crown className="w-6 h-6 text-[#E8B923]" />,
      title: 'Founding Team Role',
      description: 'Top-performing level 6 scouts are considered for equity & core team roles at EYFI.',
    },
  ];

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-3">

        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
          Why Become an <span className="text-[#C4F62E]">EYFI Scout</span>?
        </h3>
        <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl mx-auto font-sans">
          Every level you achieve unlocks real-world benefits designed to propel your campus reputation and career forward.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {perks.map((perk, idx) => (
          <div
            key={idx}
            className="border border-[#242424] hover:border-[#C4F62E]/50 rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-lg group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-[#C4F62E]/10 border border-[#C4F62E]/30 flex items-center justify-center group-hover:border-[#C4F62E] transition-colors">
              {perk.icon}
            </div>
            <div>
              <h4 className="font-display font-extrabold text-lg text-white group-hover:text-[#C4F62E] transition-colors">
                {perk.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#8A8A85] leading-relaxed mt-2 font-sans">
                {perk.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
