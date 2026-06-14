import React from 'react';
import { ParallaxBannerConfig } from '../types';
import { Sparkles } from 'lucide-react';

interface ParallaxBannerProps {
  parallax: ParallaxBannerConfig;
  onCtaClick: () => void;
}

export default function ParallaxBanner({ parallax, onCtaClick }: ParallaxBannerProps) {
  return (
    <section id="parallax-banner" className="relative h-[450px] flex items-center justify-center overflow-hidden select-none">
      
      {/* Background Image with Parallax / Fixed CSS effect */}
      <div 
        className="absolute inset-0 bg-fixed bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url("${parallax.imageUrl}")` 
        }}
      />

      {/* Royal Blue aesthetic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E2F76]/90 via-[#0E2F76]/80 to-[#0E2F76]/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0E2F76]/30 to-[#0E2F76]/80 pointer-events-none" />

      {/* Floating particles decorative */}
      <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full border border-white/10" />
      <div className="absolute -right-12 -bottom-12 h-44 w-44 rounded-full border border-white/10" />

      {/* Content Layout */}
      <div className="relative z-10 text-center max-w-2xl px-6 space-y-6">
        
        <div className="flex items-center justify-center gap-1.5 text-[#A9C0E0] text-[9px] font-mono tracking-[0.4em] uppercase font-bold">
          <Sparkles className="h-3 w-3 animate-pulse" />
          <span>Velique Signature Manifesto</span>
        </div>

        {/* Big high couture quote */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4FEFF] font-medium leading-[1.25] tracking-tight whitespace-pre-line drop-shadow-md">
          {parallax.text}
        </h2>

        <p className="text-xs sm:text-sm text-[#A9C0E0] max-w-md mx-auto leading-relaxed drop-shadow-sm font-sans pt-1">
          {parallax.subText || "Discover high couture defined by premium craftsmanship and modern details."}
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <button
            onClick={onCtaClick}
            className="px-8 py-3.5 bg-[#F4FEFF] text-[#0E2F76] text-xs font-bold tracking-[0.25em] rounded-md shadow-lg hover:shadow-cyan-500/10 hover:bg-[#A9C0E0] hover:text-[#0E2F76] transition-all hover:scale-105 uppercase cursor-pointer"
          >
            {parallax.buttonText || "DISCOVER MORE"}
          </button>
        </div>

      </div>

    </section>
  );
}
