import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Who can apply to become an EYFI Campus Scout?',
    a: 'Any enrolled college student in India can apply. Whether you are in 1st year or final year, if you are passionate about building earning mindsets on your campus, you are eligible.',
  },
  {
    q: 'How many scouts are selected per college?',
    a: 'Only 1 to 2 official scouts are selected per campus in Wave 01 to ensure high quality leadership, exclusivity, and direct founder mentorship.',
  },
  {
    q: 'How do I unlock higher levels on the river pathway?',
    a: 'You unlock levels automatically as students from your campus sign up and participate in the EYFI 30-day challenge using your scout invite link.',
  },
  {
    q: 'Is there any monetary requirement or fee to join?',
    a: 'No! Becoming an EYFI Scout is 100% free. All perks, swag drops, event grants, and internship opportunities are fully funded by EYFI.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="py-6 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#C4F62E]" />
          Frequently Asked Questions
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
          Got <span className="text-[#C4F62E]">Questions</span>?
        </h3>
        <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl mx-auto">
          Here is everything you need to know about the EYFI Campus Scout ambassador cohort.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#121212]/80 border border-[#202020] rounded-2xl overflow-hidden transition-all backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-extrabold text-sm sm:text-base text-white hover:text-[#C4F62E] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C4F62E] transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#8A8A85] font-sans leading-relaxed border-t border-[#1C1C1C] pt-3 animate-slide-in">
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
