import React from 'react';
import { Flag, Award, Flame, Lightbulb, Briefcase, Crown } from 'lucide-react';

interface BadgeCoinSVGProps {
  badgeIndex: number; // 0 to 5
  size?: number;       // e.g. 56, 64, 80
  isUnlocked?: boolean;
  className?: string;
}

export const BadgeCoinSVG: React.FC<BadgeCoinSVGProps> = ({
  badgeIndex,
  size = 64,
  isUnlocked = true,
  className = '',
}) => {
  // Render corresponding icon inside gold coin
  const renderIcon = () => {
    const iconProps = {
      style: { width: size * 0.42, height: size * 0.42 },
      className: isUnlocked ? 'text-[#3A2500] stroke-[2.2]' : 'text-[#6A6A65] stroke-[2]',
    };

    switch (badgeIndex) {
      case 0:
        return <Flag {...iconProps} />;
      case 1:
        return <Award {...iconProps} />;
      case 2:
        return <Flame {...iconProps} />;
      case 3:
        return <Lightbulb {...iconProps} />;
      case 4:
        return <Briefcase {...iconProps} />;
      case 5:
        return <Crown {...iconProps} />;
      default:
        return <Flag {...iconProps} />;
    }
  };

  const layers = Math.round(size / 10);

  return (
    <div
      className={`inline-block select-none relative transition-all duration-300 ${className}`}
      style={{ width: size, height: size, perspective: size * 5 }}
    >
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(15deg) rotateY(-10deg)',
        }}
      >
        {/* 3D Stack side layers for gold coin depth */}
        {isUnlocked &&
          Array.from({ length: layers }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                background: `oklch(${(0.65 + (i / layers) * 0.15).toFixed(3)} 0.18 85)`,
                transform: `translateZ(-${i + 1}px)`,
                border: '1px solid #7A5800',
              }}
            />
          ))}

        {/* Front Coin Face */}
        <div
          className={`absolute inset-0 rounded-full flex items-center justify-center transition-all ${
            isUnlocked
              ? 'border-2 border-[#5A3F00] shadow-[0_4px_20px_rgba(232,185,35,0.4)]'
              : 'border-2 border-[#333333] bg-[#1A1A1A] opacity-60'
          }`}
          style={{
            background: isUnlocked
              ? 'radial-gradient(circle at 32% 28%, #FFF5B8 0%, #FAD02C 35%, #D49E00 70%, #8C6500 100%)'
              : '#161616',
          }}
        >
          {/* Inner Dashed Ring — exact match to official screenshot */}
          {isUnlocked && (
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: size * 0.08,
                border: '1.2px dashed rgba(60, 40, 0, 0.65)',
              }}
            />
          )}

          {/* Icon */}
          <div className="relative z-10">{renderIcon()}</div>
        </div>
      </div>
    </div>
  );
};
