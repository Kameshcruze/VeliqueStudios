import React, { useState, useEffect } from 'react';
import { TestimonialItem } from '../types';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto sliding every 5 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const activeReview = testimonials[activeIndex];

  return (
    <section id="testimonials-section" className="py-20 bg-[#F4FEFF]/80 select-none relative overflow-hidden">
      
      {/* Dynamic background aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#A9C0E0]/10 blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Editorial Heading */}
        <div className="mb-12 max-w-xl mx-auto text-center space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#5A7EBA] uppercase font-sans">Verified Recommendations</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2F76] font-medium tracking-tight">
            WHAT OUR CLIENTS SAY
          </h2>
          <div className="w-12 h-[1px] bg-[#A9C0E0] mx-auto mt-4" />
        </div>

        {/* Big Luxury Glass Card */}
        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-xl border border-white max-w-3xl mx-auto min-h-[300px] flex flex-col justify-between items-center transition-all duration-500">
          
          <div className="absolute top-6 left-8 text-[#A9C0E0]/30 select-none pointer-events-none hidden sm:block">
            <MessageSquareQuote className="h-20 w-20 transform -scale-x-100" />
          </div>

          <div className="space-y-6 max-w-xl mx-auto relative z-10 text-center flex flex-col items-center">
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1.5 text-amber-500">
              {Array.from({ length: activeReview.rating || 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500 stroke-amber-500" />
              ))}
            </div>

            {/* Editorial Quote review */}
            <blockquote className="text-sm sm:text-base md:text-lg text-[#0E2F76] font-sans font-medium italic leading-relaxed prose prose-neutral">
              &ldquo;{activeReview.review}&rdquo;
            </blockquote>

            {/* Client Avatar and Signature */}
            <div className="flex items-center gap-3 pt-4 justify-center">
              <img
                src={activeReview.photoUrl}
                alt={activeReview.name}
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-full object-cover shadow-md border-2 border-[#A9C0E0]"
              />
              <div className="text-left">
                <span className="text-xs font-bold text-[#0E2F76] tracking-[0.1em] font-mono uppercase block">{activeReview.name}</span>
                <span className="text-[9px] text-[#5A7EBA] uppercase font-bold tracking-widest block -mt-0.5">Verified Styling Client</span>
              </div>
            </div>

          </div>

          {/* Interactive Slide Controllers underneath */}
          <div className="flex items-center justify-between w-full pt-8 relative z-10 border-t border-neutral-100 mt-6">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="p-2 cursor-pointer rounded-full text-[#0E2F76] hover:bg-[#A9C0E0]/15 hover:scale-105 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-5 bg-[#0E2F76]' : 'w-1.5 bg-[#A9C0E0]/40'
                  }`}
                  aria-label={`Go to slide reviews ${idx}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="p-2 cursor-pointer rounded-full text-[#0E2F76] hover:bg-[#A9C0E0]/15 hover:scale-105 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
