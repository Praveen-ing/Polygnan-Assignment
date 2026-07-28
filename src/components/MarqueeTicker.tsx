import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: 'Wave 01 Scouts', dark: true },
    { text: 'Applications Open', dark: false },
    { text: 'Build EYFI on your Campus', dark: true },
    { text: 'Limited Spots per College', dark: false },
    { text: 'Paid Internships', dark: true },
  ];

  // Repeat for smooth infinite scroll
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-[#FF6B2C] border-b-[3px] border-[#0A0A0A] overflow-hidden whitespace-nowrap py-2.5 z-50">
      <div className="inline-block animate-marquee font-display font-bold text-xs sm:text-[13px] tracking-[0.08em] uppercase select-none">
        {repeatedItems.map((item, idx) => (
          <span key={idx} className={`mx-4 sm:mx-6 ${item.dark ? 'text-[#0A0A0A]' : 'text-white'}`}>
            ✦ {item.text}
          </span>
        ))}
      </div>
    </div>
  );
};

