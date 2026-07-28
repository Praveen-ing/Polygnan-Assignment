import React, { useState } from 'react';
import { Bot, Sparkles, Zap, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

interface AIResult {
  feasibilityScore: number;
  potentialEstimate: string;
  verdict: string;
  tips: string[];
}

const PRESET_IDEAS = [
  'Freelance Web Design & Development for Local Businesses',
  'Building Custom AI Automation Workflows for Local Clinics',
  'Selling Digital Notion & Canva Templates to College Peers',
  'Social Media Content Creation & Video Editing for Brands',
];

export const AIEvaluatorSimulator: React.FC = () => {
  const [ideaInput, setIdeaInput] = useState<string>(PRESET_IDEAS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AIResult | null>(null);

  const handleAnalyze = () => {
    if (!ideaInput.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        feasibilityScore: Math.floor(Math.random() * 12) + 87, // 87% - 98%
        potentialEstimate: '₹8,000 – ₹35,000 in 30 Days',
        verdict: 'HIGH POTENTIAL · EXCELLENT DOING-BY-LEARNING FIT',
        tips: [
          'Reach out to 5 target clients on Day 1 using a direct video pitch.',
          'Deliver an initial MVP within 48 hours to build trust and get testimonials.',
          'Document your journey on LinkedIn to attract incoming campus referrals.',
        ],
      });
    }, 1200);
  };

  return (
    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 noise-overlay">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4 text-[#C4F62E]" />
          EYFI AI Agent Auto-Evaluator (Preview)
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
          Test Your <span className="text-[#C4F62E]">30-Day Earning Idea</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl mx-auto font-sans">
          Preview Polygnan's upcoming AI evaluator agent. Type any idea to get instant feasibility feedback and execution tips.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Input & Presets */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              placeholder="Describe your student earning idea..."
              className="w-full bg-[#121212] border border-[#262626] rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-[#4A4640] focus:border-[#C4F62E] focus:outline-none transition-all font-sans"
            />
          </div>

          {/* Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono-stats text-[#6A6A65] uppercase">Preset Ideas:</span>
            {PRESET_IDEAS.map((preset, i) => (
              <button
                key={i}
                onClick={() => setIdeaInput(preset)}
                className="text-[11px] font-mono-stats px-2.5 py-1 rounded-lg bg-[#141414] border border-[#222] hover:border-[#C4F62E]/40 hover:text-[#C4F62E] text-[#8A8A85] transition-all cursor-pointer"
              >
                {preset.slice(0, 24)}…
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="rounded-full bg-[#C4F62E] text-[#0A0A0A] font-display font-extrabold text-xs sm:text-sm px-6 py-3 hover:bg-[#b0eb18] transition-all shadow-[0_2px_16px_rgba(196,246,46,0.35)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isAnalyzing ? 'AI Agent Analyzing…' : 'Evaluate with AI Agent'}</span>
              <Bot className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Output Card */}
        {result && (
          <div className="bg-[#121212] border border-[#C4F62E]/40 rounded-2xl p-6 space-y-5 animate-slide-in shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#202020] pb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#C4F62E]" />
                <span className="font-display font-extrabold text-sm text-white">AI EVALUATION VERDICT</span>
              </div>
              <span className="text-xs font-mono-stats font-bold text-[#C4F62E] bg-[#C4F62E]/10 border border-[#C4F62E]/30 px-3 py-1 rounded-full">
                {result.verdict}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0A0A] border border-[#1E1E1E] p-4 rounded-xl text-center">
                <p className="text-[10px] font-mono-stats text-[#8A8A85] uppercase">Feasibility Score</p>
                <p className="font-display font-extrabold text-3xl text-[#C4F62E] mt-1">
                  {result.feasibilityScore}%
                </p>
              </div>

              <div className="bg-[#0A0A0A] border border-[#1E1E1E] p-4 rounded-xl text-center">
                <p className="text-[10px] font-mono-stats text-[#8A8A85] uppercase">30-Day Earnings Estimate</p>
                <p className="font-display font-extrabold text-lg sm:text-xl text-[#E8B923] mt-2">
                  {result.potentialEstimate}
                </p>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#1E1E1E] p-4 rounded-xl space-y-2.5">
              <p className="text-[10px] font-mono-stats uppercase tracking-widest text-[#C4F62E] font-bold">
                AI EXECUTION RECOMMENDATIONS:
              </p>
              <ul className="space-y-2">
                {result.tips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-[#F5F3EF] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C4F62E] flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
