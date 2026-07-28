import React, { useState } from 'react';
import { TrendingUp, Trophy, Sparkles } from 'lucide-react';

interface CollegeSeries {
  id: string;
  name: string;
  color: string;
  ranks: number[]; // Ranks for Week 1, 2, 3, 4
}

const COLLEGES_BUMP_DATA: CollegeSeries[] = [
  { id: 'iit-delhi', name: 'IIT Delhi', color: '#C4F62E', ranks: [1, 2, 1, 1] },
  { id: 'bits-pilani', name: 'BITS Pilani', color: '#E8B923', ranks: [3, 1, 2, 2] },
  { id: 'iit-bombay', name: 'IIT Bombay', color: '#38BDF8', ranks: [2, 3, 4, 3] },
  { id: 'du', name: 'Delhi University', color: '#F472B6', ranks: [5, 4, 3, 4] },
  { id: 'iiit-h', name: 'IIIT Hyderabad', color: '#A78BFA', ranks: [4, 5, 5, 5] },
];

const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

export const CampusRankBumpChart: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // SVG coordinate calculations
  const width = 600;
  const height = 260;
  const paddingX = 80;
  const paddingY = 40;

  const getX = (weekIdx: number) => paddingX + (weekIdx / (WEEKS.length - 1)) * (width - 2 * paddingX);
  const getY = (rank: number) => paddingY + ((rank - 1) / 4) * (height - 2 * paddingY);

  return (
    <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 noise-overlay">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E1E1E] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4F62E]/10 border border-[#C4F62E]/20 text-xs font-mono-stats text-[#C4F62E] font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-[#C4F62E]" />
            CF-Lens Visual Analytics · Bump Rank Trajectory
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Campus <span className="text-[#C4F62E]">Leaderboard Trajectory</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8A85] max-w-xl font-sans">
            Weekly rank movements of leading campuses competing in the Wave 01 ambassador cohort.
          </p>
        </div>

        {/* Legend buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {COLLEGES_BUMP_DATA.map((c) => (
            <button
              key={c.id}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`px-3 py-1 rounded-full text-xs font-mono-stats font-bold transition-all border cursor-pointer ${
                hoveredId === c.id
                  ? 'border-white text-white scale-105'
                  : 'border-[#262626] text-[#8A8A85] bg-[#121212]'
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: c.color }} />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Bump Chart Canvas */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            {/* Horizontal Rank Lines */}
            {[1, 2, 3, 4, 5].map((rank) => (
              <g key={rank}>
                <line
                  x1={paddingX - 20}
                  y1={getY(rank)}
                  x2={width - paddingX + 20}
                  y2={getY(rank)}
                  stroke="#1A1A1A"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 35}
                  y={getY(rank) + 4}
                  fill="#6A6A65"
                  fontSize="11"
                  fontFamily="Space Grotesk"
                  fontWeight="bold"
                  textAnchor="end"
                >
                  #{rank}
                </text>
              </g>
            ))}

            {/* Vertical Week Labels */}
            {WEEKS.map((w, idx) => (
              <text
                key={w}
                x={getX(idx)}
                y={height - 10}
                fill="#8A8A85"
                fontSize="11"
                fontFamily="Space Grotesk"
                fontWeight="bold"
                textAnchor="middle"
              >
                {w}
              </text>
            ))}

            {/* College Rank Curves */}
            {COLLEGES_BUMP_DATA.map((c) => {
              const isHovered = hoveredId === c.id;
              const isAnyHovered = hoveredId !== null;
              const opacity = isHovered ? 1 : isAnyHovered ? 0.2 : 0.8;
              const strokeWidth = isHovered ? 4 : 2.5;

              // Build smooth cubic bezier curve
              let d = `M ${getX(0)} ${getY(c.ranks[0])}`;
              for (let i = 0; i < c.ranks.length - 1; i++) {
                const x1 = getX(i);
                const y1 = getY(c.ranks[i]);
                const x2 = getX(i + 1);
                const y2 = getY(c.ranks[i + 1]);
                const cp1x = x1 + (x2 - x1) / 2;
                const cp2x = cp1x;
                d += ` C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
              }

              return (
                <g key={c.id} className="transition-opacity duration-300" style={{ opacity }}>
                  {/* Glowing Stroke Path */}
                  <path
                    d={d}
                    fill="none"
                    stroke={c.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />

                  {/* Nodes along curve */}
                  {c.ranks.map((r, idx) => (
                    <circle
                      key={idx}
                      cx={getX(idx)}
                      cy={getY(r)}
                      r={isHovered ? 6 : 4.5}
                      fill="#0A0A0A"
                      stroke={c.color}
                      strokeWidth={isHovered ? 3 : 2}
                      className="transition-all duration-300 cursor-pointer"
                    />
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
