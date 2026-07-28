import React from 'react';

export const ToolsSection: React.FC = () => {
  const tools = [
    { text: 'clubs and societies', rotate: '-rotate-2', highlight: true },
    { text: 'small meetups', rotate: 'rotate-[1.5deg]', highlight: false },
    { text: 'a word with your professor', rotate: 'rotate-2', highlight: true },
    { text: 'coffee and a pitch', rotate: '-rotate-[1.5deg]', highlight: false },
    { text: 'your WhatsApp groups', rotate: 'rotate-1', highlight: true },
    { text: 'a hallway conversation', rotate: '-rotate-2', highlight: false },
    { text: "or something nobody's tried yet", rotate: 'rotate-[2.5deg]', highlight: true },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-[#232323]">
      <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mb-4 leading-tight tracking-tight">
        We'll hand you the tools.<br />
        You bring <span className="font-serif-italic text-[#C4F62E]">the twist.</span>
      </h2>

      <p className="text-sm sm:text-base text-[#C8C8C4] max-w-xl mx-auto mb-10 leading-relaxed font-sans">
        Templates, scripts, ideas that have worked before, to get you started. But your campus isn't like every other campus, so there's plenty of room to bring on that creative hat.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
        {tools.map((item, idx) => (
          <span
            key={idx}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-transform duration-200 hover:scale-105 cursor-default ${item.rotate} ${
              item.highlight
                ? 'border border-[#C4F62E]/40 text-[#C4F62E] bg-[#C4F62E]/10 shadow-[0_2px_10px_rgba(196,246,46,0.15)]'
                : 'border border-[#2A2A2A] text-[#C8C8C4] bg-transparent'
            }`}
          >
            {item.text}
          </span>
        ))}
      </div>
    </section>
  );
};
