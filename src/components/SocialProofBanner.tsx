import React from 'react';
import { SOCIAL_PROOF_CAMPUSES } from '../data/ladderData';

const TOTAL_SCOUTS = 2847;

export const SocialProofBanner: React.FC = () => {
  const repeated = [...SOCIAL_PROOF_CAMPUSES, ...SOCIAL_PROOF_CAMPUSES];

  return (
    <div className="bg-[#0E0E0E] border-y border-[#1E1E1E] py-3 overflow-hidden">
      <div className="flex items-center gap-0 overflow-hidden">
        {/* Static label */}
        <div className="flex-shrink-0 px-4 sm:px-6 flex items-center gap-2 border-r border-[#242424] mr-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4F62E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4F62E]" />
          </span>
          <span className="text-[11px] font-mono-stats font-bold text-[#C4F62E] whitespace-nowrap">
            {TOTAL_SCOUTS.toLocaleString()} Scouts
          </span>
        </div>

        {/* Scrolling campuses */}
        <div className="overflow-hidden flex-1">
          <div className="animate-social-scroll whitespace-nowrap">
            {repeated.map((campus, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 mx-4 text-[11px] font-sans text-[#8A8A85]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4F62E]/40 inline-block" />
                {campus}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
