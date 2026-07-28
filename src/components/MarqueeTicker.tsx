import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: 'Wave 01 Scouts', color: 'text-black' },
    { text: 'Applications Open', color: 'text-white' },
    { text: 'Build EYFI on your Campus', color: 'text-black' },
    { text: 'Limited Spots per College', color: 'text-white' },
    { text: 'Paid Internships', color: 'text-black' },
  ];

  // Repeat for smooth infinite marquee
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-[#FF6B2C] border-b-[3px] border-[#0A0A0A] overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee py-2.5 font-display font-bold text-[13px] tracking-[0.08em] uppercase">
        {repeated.map((item, idx) => (
          <span key={idx} className={`mx-6 ${item.color}`}>
            ✦ {item.text}
          </span>
        ))}
      </div>
    </div>
  );
};
