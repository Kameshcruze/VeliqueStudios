import React, { useState } from 'react';
import { CollectionCard } from '../types';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface FeaturedCollectionsProps {
  collections: CollectionCard[];
}

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % collections.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length);
  };

  return (
    <section id="featured-collections-section" className="py-20 bg-white select-none overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header and Slide Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#5A7EBA] uppercase font-sans">The Editorial Edit</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2F76] font-medium tracking-tight">
              FEATURED COLLECTIONS
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide Collection"
              className="p-2.5 rounded-full border border-[#0E2F76]/20 text-[#0E2F76] hover:bg-[#0E2F76] hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {collections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-6 bg-[#0E2F76]' : 'w-2 bg-[#A9C0E0]/40 hover:bg-[#A9C0E0]'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              aria-label="Next Slide Collection"
              className="p-2.5 rounded-full border border-[#0E2F76]/20 text-[#0E2F76] hover:bg-[#0E2F76] hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Collections Cards Overlay Slide Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700">
          {collections.map((card, idx) => {
            // Determine active distance for visual highlight
            const isSlideFocused = currentIndex === idx;
            
            return (
              <div
                key={card.id}
                className={`group flex flex-col bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 shadow-md relative transform transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                  isSlideFocused ? 'ring-2 ring-[#0E2F76] scale-[1.01]' : 'opacity-90'
                }`}
              >
                {/* 3D-feel tilt and scaling image */}
                <div className="relative aspect-[4/5] bg-neutral-200 overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-102 transition-transform duration-1000 group-hover:scale-108 group-hover:rotate-1"
                  />
                  
                  {/* Subtle dark filter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:via-black/20 transition-all" />

                  {/* High Couture Overlay text */}
                  <div className="absolute bottom-6 left-6 right-6 text-left space-y-1.5 text-[#F4FEFF]">
                    <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wider leading-tight drop-shadow-sm uppercase">
                      {card.title}
                    </h3>
                    <p className="text-[10px] font-mono tracking-widest text-[#A9C0E0] uppercase line-clamp-1">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Hover Eye indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-[#0E2F76] text-white">
                    <Eye className="h-4 w-4" />
                  </div>
                </div>

                {/* Sub-footer detail section */}
                <div className="p-4 bg-white flex items-center justify-between text-[#0E2F76]">
                  <span className="text-[10px] font-bold tracking-widest uppercase">VIEW DROP DESIGN</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
