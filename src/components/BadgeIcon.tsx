import React from 'react';

export type MilestoneBadgeType = 'scout' | 'ambassador' | 'levelup' | 'gofurther' | 'internship' | 'founding';

interface BadgeIconProps {
  type: MilestoneBadgeType;
  className?: string;
  isUnlocked?: boolean;
  size?: number;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({
  type,
  className = '',
  isUnlocked = true,
  size = 48,
}) => {
  const primaryColor = isUnlocked ? '#FFC857' : '#726C64';
  const accentColor = isUnlocked ? '#FF6B2C' : '#4A4640';
  const glowColor = isUnlocked ? 'rgba(255, 200, 87, 0.35)' : 'transparent';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-300 ${className}`}
      style={{
        filter: isUnlocked ? `drop-shadow(0 0 8px ${glowColor})` : 'none',
      }}
    >
      {/* Outer Dark Circular Badge Base */}
      <circle cx="32" cy="32" r="30" fill="#141414" stroke={accentColor} strokeWidth="2" />
      <circle cx="32" cy="32" r="26" fill="#1B1B1B" stroke={primaryColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

      {/* Concept 1: Scout — Compass */}
      {type === 'scout' && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Compass Outer Ring */}
          <circle cx="32" cy="32" r="14" stroke={primaryColor} strokeWidth="2" />
          {/* Compass Dial Tick Marks */}
          <line x1="32" y1="15" x2="32" y2="17" stroke={accentColor} strokeWidth="2" />
          <line x1="32" y1="47" x2="32" y2="49" stroke={accentColor} strokeWidth="2" />
          <line x1="15" y1="32" x2="17" y2="32" stroke={accentColor} strokeWidth="2" />
          <line x1="47" y1="32" x2="49" y2="32" stroke={accentColor} strokeWidth="2" />
          {/* Needle */}
          <path d="M32 20 L36 32 L32 44 L28 32 Z" fill={accentColor} stroke={primaryColor} strokeWidth="1.5" />
          <circle cx="32" cy="32" r="2.5" fill={primaryColor} />
        </g>
      )}

      {/* Concept 2: Campus Ambassador — Ribbon Medallion */}
      {type === 'ambassador' && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Ribbon Tails */}
          <path d="M25 38 L21 49 L27 46 L32 49 L27 38" fill={accentColor} opacity="0.8" />
          <path d="M39 38 L43 49 L37 46 L32 49 L37 38" fill={accentColor} opacity="0.8" />
          {/* Medallion Outer Circle */}
          <circle cx="32" cy="27" r="12" fill="#141414" stroke={primaryColor} strokeWidth="2" />
          <circle cx="32" cy="27" r="8" stroke={accentColor} strokeWidth="1.5" />
          {/* Center Crown / Flame Accent */}
          <path d="M32 22 L34 26 L38 27 L35 30 L36 34 L32 32 L28 34 L29 30 L26 27 L30 26 Z" fill={primaryColor} />
        </g>
      )}

      {/* Concept 3: Level Up — Upward Arrow through a Ring */}
      {type === 'levelup' && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Ring Ellipse */}
          <ellipse cx="32" cy="35" rx="14" ry="6" stroke={accentColor} strokeWidth="2" fill="none" />
          {/* Arrow Body & Head */}
          <path d="M32 46 L32 18" stroke={primaryColor} strokeWidth="3.5" />
          <path d="M23 26 L32 17 L41 26" stroke={primaryColor} strokeWidth="3" fill="none" />
          {/* Motion Swirl Lines */}
          <path d="M19 32 C 22 28, 42 28, 45 32" stroke={primaryColor} strokeWidth="1.5" opacity="0.6" fill="none" />
        </g>
      )}

      {/* Concept 4: Go Further — Mountain Peak with a Path */}
      {type === 'gofurther' && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Background Mountain */}
          <path d="M18 44 L28 28 L35 38 L46 44 Z" fill="#232323" stroke={accentColor} strokeWidth="1.5" />
          {/* Main Peak */}
          <path d="M22 44 L32 20 L44 44 Z" fill="#1B1B1B" stroke={primaryColor} strokeWidth="2" />
          {/* Snow Cap Accent */}
          <path d="M32 20 L35 27 L32 29 L29 27 Z" fill={primaryColor} />
          {/* Winding Path */}
          <path d="M32 44 C 36 41, 28 36, 32 31" stroke={accentColor} strokeWidth="2" fill="none" />
        </g>
      )}

      {/* Concept 5: Paid Internship — Briefcase with a small Rupee mark */}
      {type === 'internship' && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Briefcase Handle */}
          <path d="M27 22 C 27 19, 37 19, 37 22" stroke={accentColor} strokeWidth="2" fill="none" />
          {/* Briefcase Main Body */}
          <rect x="18" y="22" width="28" height="20" rx="3" fill="#1B1B1B" stroke={primaryColor} strokeWidth="2" />
          {/* Horizontal Strap */}
          <line x1="18" y1="30" x2="46" y2="30" stroke={accentColor} strokeWidth="1.5" />
          {/* Centered Rupee Symbol */}
          <path d="M30 33 H35 M30 35.5 H35 M30 33 V40 C 33 40, 34 38, 34 36.5 M30 36.5 L34.5 40" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        </g>
      )}

      {/* Concept 6: Founding Team — Star inside a Shield */}
      {type === 'founding' && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Shield Outline */}
          <path d="M32 16 L44 21 C 44 33, 38 42, 32 46 C 26 42, 20 33, 20 21 Z" fill="#1B1B1B" stroke={primaryColor} strokeWidth="2" />
          {/* Inner Shield Accent */}
          <path d="M32 19 L41 23 C 41 32, 36 39, 32 42 C 28 39, 23 32, 23 23 Z" stroke={accentColor} strokeWidth="1" fill="none" />
          {/* Centered Star */}
          <path d="M32 25 L33.8 29.2 L38.3 29.5 L34.9 32.5 L36 36.9 L32 34.5 L28 36.9 L29.1 32.5 L25.7 29.5 L30.2 29.2 Z" fill={primaryColor} stroke={primaryColor} strokeWidth="0.5" />
        </g>
      )}
    </svg>
  );
};
