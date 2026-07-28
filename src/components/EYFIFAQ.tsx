import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    question: 'How do I participate, solo or as a team? Should all join the waitlist?',
    answer:
      'Either works. Go solo, or team up with up to 2 friends (max team size: 3). Yes, everyone on the team can join the waitlist separately and when we open up for registration can form a team. Also, all of you on the team needs to meet the eligibility bar: an undergrad college student, no full-time job.',
  },
  {
    id: '2',
    question: 'Do I need to earn money every single day for 30 days?',
    answer:
      'No! You can earn anytime within the 30-day window. Whether it is one big gig or multiple smaller sales, all verifiable income counts towards your challenge score and ladder ranking.',
  },
  {
    id: '3',
    question: 'Do I need to start the challenge on Day 1 itself?',
    answer:
      'You can join anytime during Wave 01, but starting on Day 1 gives you maximum runway to build traction, leverage community feedback, and maximize your total registrations and earnings.',
  },
  {
    id: '4',
    question: 'What happens if I can\'t earn money in 30 days?',
    answer:
      'Zero penalty! The EYFI Challenge is all about experimenting and taking initiative. Even if you don\'t hit your financial targets, you gain real skills, network, and eligibility for future waves.',
  },
  {
    id: '5',
    question: 'How will the EYFI team support us to earn money in 30 days?',
    answer:
      'We provide curated resource blueprints, daily peer check-ins, mentor office hours, spotlight promotion for high hustlers, and mini-challenges with instant reward payouts.',
  },
  {
    id: '6',
    question: 'What happens if payment can only happen after 30 days? Will it still count?',
    answer:
      'Yes! Official client invoices, signed service contracts, or verified client purchase orders issued within the 30-day window count towards your challenge total.',
  },
  {
    id: '7',
    question: 'Can I sell services?',
    answer:
      'Absolutely. Tech freelance, web design, video editing, tutoring, social media management, event photography, or handmade goods — any legal service or product is valid.',
  },
  {
    id: '8',
    question: 'What is the minimum amount I need to earn to be eligible for goodies?',
    answer:
      'Every milestone unlocked on the EYFI Ambassador Ladder grants instant digital perks, swag badges, or physical reward boxes starting from your very first registrations.',
  },
];

export const EYFIFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 px-5 bg-[#0A0A0A] border-t border-[#232323]">
      <div className="mx-auto max-w-[680px]">
        <div className="flex items-center gap-2 text-xs font-mono-stats uppercase tracking-widest text-[#A39E93] mb-3">
          <HelpCircle className="w-4 h-4 text-[#C4F62E]" />
          <span>FAQ</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F3EF] mb-8">
          Questions? <span className="text-[#C4F62E]">We've got</span> you.
        </h2>

        <div className="space-y-3">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`border rounded-xl bg-[#141414]/60 px-5 transition-all duration-200 ${
                  isOpen
                    ? 'border-[#C4F62E]/60 bg-[#141414] shadow-[0_0_15px_rgba(196,246,46,0.1)]'
                    : 'border-[#232323] hover:border-[#333]'
                }`}
              >
                <button
                  onClick={() => toggle(item.id)}
                  type="button"
                  className="w-full flex items-center justify-between py-4 text-left font-display text-sm sm:text-base font-semibold text-[#F5F3EF] cursor-pointer focus:outline-none"
                >
                  <span className="pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C4F62E]' : 'text-[#A39E93]'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-4 pt-1 font-sans text-xs sm:text-sm text-[#A39E93] leading-relaxed border-t border-[#232323]/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-[#232323] text-center font-sans text-xs sm:text-sm text-[#A39E93]">
          Don't see your question? Write to us at{' '}
          <a
            href="mailto:info@eyfichallenge.com"
            className="font-semibold text-[#C4F62E] hover:underline inline-flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>info@eyfichallenge.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};
