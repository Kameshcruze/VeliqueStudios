import React from 'react';
import logoImg from './VeliqueLogo.jpeg';

interface LogoProps {
  className?: string; // Optional styling
  showText?: boolean; // Toggle displaying the Brand typography
}

export default function VeliqueLogo({ className = 'h-10 text-[#0E2F76]', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img
        src={logoImg}
        alt="Velique Logo"
        className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
        referrerPolicy="no-referrer"
      />
      {showText && (
        <div className="flex flex-col tracking-widest text-left">
          <span className="font-sans text-lg font-bold tracking-[0.25em] text-current">VELIQUE</span>
          <span className="font-mono text-[9px] tracking-[0.55em] opacity-80 -mt-1 font-semibold text-current">STUDIO</span>
        </div>
      )}
    </div>
  );
}
