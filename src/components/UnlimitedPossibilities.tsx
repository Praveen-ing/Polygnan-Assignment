import React from 'react';

export const UnlimitedPossibilities: React.FC = () => {
  const row1 = [
    'Web development',
    'Home-cooked meals',
    'Consulting',
    'Reels editing',
    'Pet & plant sitting',
    'SEO automation pipelines',
    'Handmade jewellery',
    'Career counselling',
    'Drop shipping',
    'Fitness coaching',
    'Newsletter writing',
    'Thrift reselling',
    'App development',
    'Language translation',
  ];

  const row2 = [
    'Tutoring',
    'Print-on-demand merch',
    'Bug bounty hunting',
    'Baking & desserts',
    'Podcast editing',
    'Virtual assistance',
    'No-code app building',
    'Food stalls',
    'Affiliate marketing',
    'Resume & LinkedIn writing',
    'Home-made products',
    'AI chatbot building',
    'Event management for fests',
    'Photography for events',
  ];

  const row3 = [
    'Start your own venture',
    'Course creation',
    'Data entry & research',
    'Freelance tech gigs',
    'Social media partnerships',
    'Notes & study material selling',
    'Videography & reels',
    'Tailoring & customisation',
    'Digital templates',
    'Topmate mentoring',
    'AI-generated videos',
    'Voiceover work',
    'Prompt engineering services',
    'Portfolio building for clients',
  ];

  return (
    <section className="py-12 sm:py-16 border-t border-[#232323]/60 bg-[#0A0A0A] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 text-center mb-8">
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#F5F3EF] font-extrabold tracking-tight">
          <span className="text-[#C4F62E]">Unlimited</span> Possibilities
        </h2>
        <p className="mt-3 font-open-sans text-sm sm:text-base md:text-lg text-[#A39E93] max-w-2xl mx-auto">
          Freelance, sell, build, teach, perform... Hustle & earn however you want. You've got{' '}
          <span className="font-bold text-[#C4F62E]">30 days</span> to make it happen.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Row 1 */}
        <div className="overflow-hidden py-1">
          <div className="flex w-max items-center gap-6 sm:gap-8 eyfi-track-left select-none">
            {[...row1, ...row1].map((item, idx) => (
              <span key={idx} className="flex items-center gap-6 sm:gap-8 whitespace-nowrap">
                <span className="font-display font-extrabold text-base sm:text-xl md:text-2xl text-[#C4F62E] tracking-tight">
                  {item}
                </span>
                <span className="text-[#C4F62E]/40 text-xs sm:text-sm">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden py-1">
          <div className="flex w-max items-center gap-6 sm:gap-8 eyfi-track-right select-none">
            {[...row2, ...row2].map((item, idx) => (
              <span key={idx} className="flex items-center gap-6 sm:gap-8 whitespace-nowrap">
                <span className="font-display font-extrabold text-base sm:text-xl md:text-2xl text-[#FF6B2C] tracking-tight">
                  {item}
                </span>
                <span className="text-[#FF6B2C]/40 text-xs sm:text-sm">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="overflow-hidden py-1">
          <div className="flex w-max items-center gap-6 sm:gap-8 eyfi-track-left select-none">
            {[...row3, ...row3].map((item, idx) => (
              <span key={idx} className="flex items-center gap-6 sm:gap-8 whitespace-nowrap">
                <span className="font-display font-extrabold text-base sm:text-xl md:text-2xl text-[#FFC857] tracking-tight">
                  {item}
                </span>
                <span className="text-[#FFC857]/40 text-xs sm:text-sm">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
