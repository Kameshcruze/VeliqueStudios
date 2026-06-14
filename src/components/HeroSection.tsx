import React from 'react';
import { HeroConfig } from '../types';
import { ChevronRight, Calendar, ArrowRight, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  hero: HeroConfig;
  onExploreClick: () => void;
  onBookStylingClick: () => void;
}

export default function HeroSection({ hero, onExploreClick, onBookStylingClick }: HeroSectionProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen bg-[#F4FEFF] pt-24 pb-16 flex items-center overflow-hidden select-none"
    >
      {/* Editorial Watermark background */}
      <div className="absolute top-10 left-10 text-[18vw] font-bold text-[#E5F7FA]/70 tracking-widest font-sans select-none pointer-events-none -z-0">
        V Q
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Editorial Layout: Brand Typography & Actions */}
        <div className="lg:col-span-6 space-y-8 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A9C0E0]/20 rounded-full border border-[#A9C0E0]/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0E2F76] animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.3em] text-[#0E2F76] uppercase">NEW COLLECTION Drop</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0E2F76] leading-[1.1] tracking-tight font-medium">
            {hero.title}
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-xl">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 bg-[#0E2F76] text-white text-xs font-bold tracking-[0.2em] rounded-md shadow-lg shadow-[#0E2F76]/10 hover:bg-[#1a4497] transition-all hover:translate-x-1 flex items-center gap-2 cursor-pointer uppercase"
            >
              <span>{hero.mainButtonText}</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              onClick={onBookStylingClick}
              className="px-8 py-4 bg-transparent text-[#0E2F76] text-xs font-bold tracking-[0.2em] rounded-md border border-[#0E2F76]/40 hover:bg-[#0E2F76]/5 transition-all flex items-center gap-2 cursor-pointer uppercase font-sans"
            >
              <Calendar className="h-4 w-4" />
              <span>{hero.secondaryButtonText}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[#5A7EBA] pt-8 animate-bounce mt-4 text-xs font-bold tracking-widest uppercase">
            <span className="h-9 w-6 border-2 border-[#5A7EBA]/30 rounded-full flex justify-center py-2">
              <span className="h-1.5 w-[3px] bg-[#5A7EBA] rounded-md" />
            </span>
            <span className="opacity-80">SCROLL DOWN TO EXPLORE</span>
          </div>
        </div>

        {/* Right Editorial Layout: Large Model & Floating Product Card */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          
          {/* Main Fashion Model Frame */}
          <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
            <img
              src={hero.imageUrl}
              alt="Velique Studio Fashion Model"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform scale-102 transition-transform duration-1000 group-hover:scale-108"
            />
            {/* Elegant vignette shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floater Accent Decoratives (Santorini Blue Tiles Circle background) */}
          <div className="absolute -top-6 -right-6 h-36 w-36 rounded-full border border-[#A9C0E0]/30 -z-10 pointer-events-none animate-spin-slow opacity-60" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[#A9C0E0]/10 -z-10 pointer-events-none" />

          {/* Floating Luxury Featured Product Card */}
          <div
            id="hero-floating-card"
            className="absolute -bottom-4 right-2 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-neutral-100 max-w-[210px] transform hover:scale-105 transition-all duration-300 select-none cursor-pointer"
            onClick={onExploreClick}
          >
            <div className="relative group overflow-hidden rounded-xl aspect-[3/4] mb-3 bg-neutral-100">
              <span className="absolute top-2 left-2 z-10 bg-[#0E2F76] text-white text-[8px] font-bold font-mono px-2 py-0.5 rounded-full tracking-wider">
                {hero.floatingProduct.tag}
              </span>
              <img
                src={hero.floatingProduct.imageUrl}
                alt={hero.floatingProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <h4 className="text-xs font-bold text-[#0E2F76] uppercase tracking-wider line-clamp-1">{hero.floatingProduct.name}</h4>
            <div className="flex items-center justify-between mt-1 pt-1 border-t border-neutral-100">
              <span className="text-[11px] font-black text-neutral-800 font-mono">{hero.floatingProduct.price}</span>
              <span className="text-[9px] font-bold text-[#5A7EBA] uppercase flex items-center gap-0.5 hover:text-[#0E2F76]">
                SHOP NOW <ArrowRight className="h-2.5 w-2.5" />
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
