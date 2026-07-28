import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Zap, CheckCircle2 } from 'lucide-react';

const RECENT_ACTIVITIES = [
  { name: 'Rohan Sharma', college: 'IIT Delhi', action: 'applied as Scout for Wave 01', time: 'Just now' },
  { name: 'Priya Verma', college: 'BITS Pilani', action: 'reached Level 3 (Go Further)', time: '2m ago' },
  { name: 'Arjun Nair', college: 'IIIT Hyderabad', action: 'unlocked Campus Ambassador title', time: '4m ago' },
  { name: 'Ananya Gupta', college: 'Delhi University', action: 'claimed spot #1 for DU', time: '6m ago' },
  { name: 'Vikram Singh', college: 'IIT Bombay', action: 'reached Level 5 (Paid Internship)', time: '8m ago' },
  { name: 'Kavya Rao', college: 'VIT Vellore', action: 'generated official Scout Pass', time: '11m ago' },
];

export const LiveActivityToast: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [visible, setVisible]       = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
        setVisible(true);
      }, 400);
    }, 6000); // switch every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const activity = RECENT_ACTIVITIES[currentIdx];

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ease-out transform ${
        visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95'
      }`}
    >
      <div className="bg-[#121212]/95 border border-[#C4F62E]/30 backdrop-blur-md rounded-2xl p-3.5 pr-5 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center gap-3 max-w-sm">
        {/* Pulsing Avatar Node */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#C4F62E]/10 border border-[#C4F62E]/40 flex items-center justify-center text-[#C4F62E]">
            <Zap className="w-5 h-5 fill-[#C4F62E]" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4F62E] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C4F62E]" />
          </span>
        </div>

        {/* Text Details */}
        <div className="space-y-0.5 font-sans">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display font-extrabold text-xs text-white">
              {activity.name}
            </span>
            <span className="text-[10px] font-mono-stats text-[#6A6A65]">
              {activity.time}
            </span>
          </div>
          <p className="text-[11px] text-[#8A8A85] leading-tight">
            {activity.action}
          </p>
          <p className="text-[10px] text-[#C4F62E] font-mono-stats flex items-center gap-1 font-bold">
            <MapPin className="w-2.5 h-2.5" />
            {activity.college}
          </p>
        </div>
      </div>
    </div>
  );
};
