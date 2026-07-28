import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who can apply to become an EYFI Campus Scout?',
      a: 'Any enrolled college student in India can apply! Whether you are an engineering, management, arts, or science student, if you are passionate about driving student income on your campus, you are eligible.',
    },
    {
      q: 'How many scouts are selected per college?',
      a: 'To maintain high selectivity and impact, Wave 01 limits spots to only 1 to 2 scouts per campus.',
    },
    {
      q: 'How are rewards and level unlocks tracked?',
      a: 'Every scout gets a unique referral dashboard link. As students register for the EYFI Challenge using your link, your level counter automatically increases from Level 1 up to Level 6.',
    },
    {
      q: 'What is the time commitment required?',
      a: 'The program is flexible around your college schedule (approx 3–5 hours per week). You work on building community awareness, organizing campus meets, and sharing updates.',
    },
    {
      q: 'Is there any fee to join the program?',
      a: 'No! The EYFI Campus Ambassador Program is 100% free to join for selected scouts.',
    },
  ];

  return (
    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#C4F62E]" />
          Frequently Asked Questions
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
          Got <span className="text-[#C4F62E]">Questions</span>?
        </h3>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#121212] border border-[#202020] rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-white hover:text-[#C4F62E] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C4F62E] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#8A8A85] leading-relaxed font-sans border-t border-[#1C1C1C] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
