import React, { useState } from 'react';
import { Bot, Send, Sparkles, X, MessageSquare, Zap, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'poly';
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  '🚀 What is the EYFI Challenge?',
  '🏆 How do I unlock Level 6 rewards?',
  '💡 Give me a 30-day student earning idea!',
  '🎓 How do I become an EYFI Scout?',
];

export const PolyAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'poly',
      text: "Hey! I'm Poly 🤖, your AI Guide at Polygnan. Ask me anything about the EYFI 30-Day Challenge or how to level up your campus scout journey!",
      timestamp: 'Just now',
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    // Dynamic Poly AI response logic
    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('eyfi') || q.includes('challenge') || q.includes('what is')) {
        reply = "The EYFI (Earn Your First Income) Challenge is a 30-day sprint for college students across India! We believe in 'Learning By Doing' — so you challenge yourself to launch your first income stream using skills you love (coding, design, content, AI automation, etc.).";
      } else if (q.includes('level') || q.includes('reward') || q.includes('founding')) {
        reply = "The level pathway has 6 stations: L1 (Scout Title), L2 (Ambassador Kit & Swag), L3 (Event Sponsorship), L4 (Founder Mentorship), L5 (Paid Internships & Stipends), and L6 (Founding Team Role + Equity consideration)!";
      } else if (q.includes('idea') || q.includes('earning') || q.includes('student')) {
        reply = "Here's a hot 30-day idea: Build custom AI automation workflows for local clinics/businesses or offer rapid Figma-to-Webflow site builds for campus startups! You can easily generate your first ₹5,000–₹25,000 stream.";
      } else if (q.includes('scout') || q.includes('apply') || q.includes('campus')) {
        reply = "We select 1 to 2 official scouts per campus for Wave 01! Click the 'Apply as Scout Now' button to claim your campus spot before applications close.";
      } else {
        reply = `Awesome question! At Polygnan, our ethos is inspired by the Rancho builder mindset: curiosity over credentials and execution over theory. Keep building and climbing the EYFI levels! 🚀`;
      }

      const polyMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'poly',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, polyMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Poly AI Agent Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">


        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#111111] border-2 border-[#C4F62E] shadow-[0_0_24px_rgba(196,246,46,0.5)] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 relative group"
          title="Open Poly AI Agent"
        >
          <div className="relative">
            <Bot className="w-7 h-7 text-[#C4F62E] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C4F62E] rounded-full border-2 border-[#0A0A0A]" />
          </div>
        </button>
      </div>

      {/* Poly AI Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-[#0D0D0D] border-2 border-[#C4F62E]/60 rounded-3xl p-5 shadow-[0_16px_50px_rgba(0,0,0,0.9)] space-y-4 animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C4F62E]/15 border border-[#C4F62E]/40 flex items-center justify-center text-[#C4F62E]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display font-extrabold text-sm text-white">Poly</h4>
                  <span className="text-[10px] font-mono-stats text-[#0A0A0A] bg-[#C4F62E] font-extrabold px-2 py-0.5 rounded-full">
                    AI AGENT
                  </span>
                </div>
                <p className="text-[10px] font-mono-stats text-[#8A8A85]">EYFI Assistant · Online</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8A8A85] hover:text-white p-1 rounded-lg hover:bg-[#222] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="h-64 overflow-y-auto space-y-3 pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs font-sans leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#C4F62E] text-[#0A0A0A] font-medium rounded-br-none'
                      : 'bg-[#181818] text-[#F5F3EF] border border-[#262626] rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] font-mono-stats text-[#6A6A65] mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-mono-stats text-[#C4F62E] bg-[#181818] p-2.5 rounded-2xl w-fit border border-[#262626]">
                <Bot className="w-3.5 h-3.5 animate-spin" />
                <span>Poly is thinking…</span>
              </div>
            )}
          </div>

          {/* Presets */}
          <div className="space-y-1.5 pt-1 border-t border-[#1E1E1E]">
            <span className="text-[10px] font-mono-stats text-[#6A6A65] uppercase block">Suggested Prompts:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {PRESET_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[10px] font-mono-stats px-2.5 py-1 rounded-lg border border-[#262626] hover:border-[#C4F62E] hover:text-[#C4F62E] text-[#8A8A85] whitespace-nowrap transition-all cursor-pointer flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              placeholder="Ask Poly anything..."
              className="flex-1 bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#555] focus:border-[#C4F62E] focus:outline-none transition-all font-sans"
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-[#C4F62E] hover:bg-[#b0eb18] text-[#0A0A0A] p-2.5 rounded-xl transition-all cursor-pointer shadow-[0_2px_10px_rgba(196,246,46,0.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
