import React from 'react';
import { BadgeCoinSVG } from './BadgeCoinSVG';

interface BadgeCapSVGProps {
  badgeIndex?: number;
  size?: number;
  isUnlocked?: boolean;
}

export const BadgeCapSVG: React.FC<BadgeCapSVGProps> = ({
  badgeIndex = 0,
  size = 200,
  isUnlocked = true,
}) => {
  return (
    <div className="relative inline-flex items-center justify-center select-none group">
      {/* SVG Outlined Cap Silhouette matching screenshot */}
      <svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Top button of cap */}
        <path
          d="M 148 20 C 148 15, 162 15, 162 20 Z"
          stroke="#C4F62E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Back Panel Seam */}
        <path
          d="M 155 20 Q 185 60 206 120"
          stroke="#C4F62E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Mid Panel Seam */}
        <path
          d="M 155 20 Q 165 70 170 118"
          stroke="#C4F62E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Front Crown Dome */}
        <path
          d="M 155 20 C 100 20, 68 60, 68 110 L 206 120 C 208 70, 190 20, 155 20 Z"
          stroke="#C4F62E"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Cap Visor / Brim */}
        <path
          d="M 28 150 C 20 145, 20 135, 40 128 C 70 118, 120 116, 170 118 C 120 138, 70 162, 28 150 Z"
          stroke="#C4F62E"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Visor Under-curve */}
        <path
          d="M 28 150 C 25 156, 35 168, 55 168 C 75 168, 65 156, 45 150"
          stroke="#C4F62E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* 3D Yellow Gold Coin Badge Centered on Front Panel */}
      <div
        className="absolute"
        style={{
          top: `${size * 0.16}px`,
          left: `${size * 0.44}px`,
        }}
      >
        <BadgeCoinSVG badgeIndex={badgeIndex} size={size * 0.38} isUnlocked={isUnlocked} />
      </div>
    </div>
  );
};
