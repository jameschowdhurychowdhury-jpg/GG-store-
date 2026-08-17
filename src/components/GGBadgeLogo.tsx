import React from 'react';

interface GGBadgeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const GGBadgeLogo: React.FC<GGBadgeLogoProps> = ({ size = 'md', className = '' }) => {
  if (size === 'hero') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Ambient Glows */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-amber-600/30 blur-3xl rounded-full scale-125 animate-pulse" />
        <div className="absolute -inset-4 bg-amber-500/10 rounded-full blur-2xl" />

        {/* Fiery Golden Ring */}
        <svg
          viewBox="0 0 400 400"
          className="w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 relative drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]"
        >
          <defs>
            <linearGradient id="heroGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="heroCrownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="40%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE047" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.95" />
            </linearGradient>
            <filter id="goldenGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Energy Ring */}
          <circle
            cx="200"
            cy="200"
            r="165"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="5"
            strokeDasharray="12 8"
            className="animate-spin"
            style={{ animationDuration: '40s' }}
          />

          {/* Inner Flaming Ring */}
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="#0F0C08"
            fillOpacity="0.85"
            stroke="url(#heroGoldGrad)"
            strokeWidth="7"
            filter="drop-shadow(0 0 15px rgba(245, 158, 11, 0.8))"
          />

          {/* Crown */}
          <g transform="translate(140, 52)">
            {/* Crown Base & Points */}
            <path
              d="M 10,48 L 22,12 L 60,34 L 98,12 L 110,48 Z"
              fill="url(#heroCrownGrad)"
              stroke="#FFF"
              strokeWidth="1.5"
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))"
            />
            {/* Crown Jewels */}
            <circle cx="22" cy="12" r="5" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
            <circle cx="60" cy="32" r="6" fill="#3B82F6" stroke="#FFF" strokeWidth="1.2" />
            <circle cx="98" cy="12" r="5" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
            <ellipse cx="60" cy="46" rx="20" ry="3" fill="#FDE047" opacity="0.6" />
          </g>

          {/* 3D GG Letters */}
          <g transform="translate(68, 130)" filter="url(#goldenGlow)">
            {/* First G */}
            <path
              d="M 120,40 C 95,15 50,15 25,45 C -2,75 -2,125 25,155 C 52,185 100,185 125,155 C 138,140 142,120 142,105 L 85,105 L 85,125 L 115,125 C 105,145 70,155 50,135 C 30,115 30,85 50,65 C 70,45 100,50 112,65 Z"
              fill="url(#heroGoldGrad)"
              stroke="#FFF"
              strokeWidth="2"
            />

            {/* Second G (Interlocking & Offset) */}
            <path
              d="M 235,40 C 210,15 165,15 140,45 C 113,75 113,125 140,155 C 167,185 215,185 240,155 C 253,140 257,120 257,105 L 200,105 L 200,125 L 230,125 C 220,145 185,155 165,135 C 145,115 145,85 165,65 C 185,45 215,50 227,65 Z"
              fill="url(#heroGoldGrad)"
              stroke="#FDE047"
              strokeWidth="2.5"
            />
          </g>

          {/* Sparkles / Stars */}
          <path d="M 70,120 Q 80,120 80,110 Q 80,120 90,120 Q 80,120 80,130 Q 80,120 70,120" fill="#FFF" />
          <path d="M 310,100 Q 320,100 320,90 Q 320,100 330,100 Q 320,100 320,110 Q 320,100 310,100" fill="#FFF" />
          <path d="M 320,270 Q 326,270 326,264 Q 326,270 332,270 Q 326,270 326,276 Q 326,270 320,270" fill="#FDE047" />
          <path d="M 80,280 Q 86,280 86,274 Q 86,280 92,280 Q 86,280 86,286 Q 86,280 80,280" fill="#FDE047" />
        </svg>
      </div>
    );
  }

  const dimension = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-12 h-12' : 'w-9 h-9';

  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${dimension} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]">
        <defs>
          <linearGradient id="badgeGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="badgeCrown" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Shield / Outer Crest */}
        <polygon
          points="50,4 92,18 84,72 50,96 16,72 8,18"
          fill="#13110E"
          stroke="url(#badgeGold)"
          strokeWidth="3.5"
        />

        {/* Inner Border Accent */}
        <polygon
          points="50,10 84,22 78,66 50,88 22,66 16,22"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1"
          strokeOpacity="0.6"
        />

        {/* Mini Crown */}
        <path
          d="M 34,26 L 40,16 L 50,22 L 60,16 L 66,26 Z"
          fill="url(#badgeCrown)"
          stroke="#D97706"
          strokeWidth="0.8"
        />

        {/* Bold GG Crest Letters */}
        <text
          x="50"
          y="62"
          fontSize="30"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          fill="url(#badgeGold)"
          textAnchor="middle"
          stroke="#000"
          strokeWidth="1"
          letterSpacing="-1"
        >
          GG
        </text>

        {/* Sparkle Accent */}
        <circle cx="68" cy="22" r="1.5" fill="#FFF" />
      </svg>
    </div>
  );
};
