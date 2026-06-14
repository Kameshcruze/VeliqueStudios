import React from 'react';

interface LogoProps {
  className?: string; // Optional styling
  showText?: boolean; // Toggle displaying the Brand typography
}

export default function VeliqueLogo({ className = 'h-10 text-[#0E2F76]', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Elegantly drawn Custom Stylized 'V' Logo based on the user's uploaded design */}
      <svg
        viewBox="0 0 200 160"
        fill="currentColor"
        className="h-full w-auto drop-shadow-sm transition-transform duration-500 hover:scale-105"
      >
        <path
          d="M 120 20 
             C 105 10, 85 10, 70 25
             C 50 45, 30 80, 45 105
             C 55 120, 80 120, 95 100
             C 110 80, 115 50, 102 32
             C 98 25, 95 15, 105 18
             C 118 20, 132 45, 125 70
             C 120 90, 108 115, 98 128
             L 135 128
             C 142 110, 155 75, 168 45
             L 178 45
             L 142 128"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Swelling details on the stylized V loops */}
        <path
          d="M 130 128 L 90 128 C 96 123, 106 112, 110 106"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 142 128 L 130 133 L 115 133"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right side tail accents */}
        <path
          d="M 118 22 L 140 18 L 165 24 M 150 20 L 138 25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {showText && (
        <div className="flex flex-col tracking-widest text-left">
          <span className="font-sans text-lg font-bold tracking-[0.25em] text-[#0E2F76]">VELIQUE</span>
          <span className="font-mono text-[9px] tracking-[0.55em] text-[#5A7EBA] -mt-1 font-semibold">STUDIO</span>
        </div>
      )}
    </div>
  );
}
