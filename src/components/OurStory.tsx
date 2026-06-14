import React from 'react';
import { OurStoryConfig } from '../types';
import { History, Compass, Milestone } from 'lucide-react';

interface OurStoryProps {
  story: OurStoryConfig;
}

export default function OurStory({ story }: OurStoryProps) {
  return (
    <section id="our-story-section" className="py-20 bg-white select-none scroll-mt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Boutique storytelling images with elegant double frames */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden border-[6px] border-[#F4FEFF] shadow-2xl bg-neutral-100 z-10 group">
              <img
                src={story.imageUrl}
                alt="Velique Boutique Showroom interior design"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform scale-102 transition-transform duration-1000 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-[#0E2F76]/10 pointer-events-none" />
            </div>

            {/* Background offset shape decoration in powder blue */}
            <div className="absolute -bottom-6 -left-6 h-full w-full max-w-[420px] translate-x-3 translate-y-3 rounded-3xl border-2 border-[#A9C0E0]/40 -z-0 pointer-events-none" />
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-[#A9C0E0]/15 -z-10 pointer-events-none" />
          </div>

          {/* Right Side: Editorial narrative and timeline roadmap */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#5A7EBA] uppercase block">THE PARISIAN & INDIAN SPIRIT</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2F76] font-medium leading-tight">
                {story.title || "OUR STORY"}
              </h2>
              <div className="w-12 h-[1px] bg-[#0E2F76] mt-4" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans prose prose-neutral">
              {story.description}
            </p>

            {/* Milestones timeline list */}
            <div className="pt-6 space-y-6 border-t border-neutral-100">
              <span className="text-[9px] font-bold text-[#0E2F76] tracking-widest block uppercase flex items-center gap-1">
                <Milestone className="h-4 w-4" /> BESPOKE LANDMARK TIMELINE
              </span>

              <div className="relative pl-6 space-y-6 border-l border-[#A9C0E0]/40">
                {story.timeline.map((point) => (
                  <div key={point.year} className="relative group select-none">
                    
                    {/* Glowing timeline node dot */}
                    <span className="absolute -left-[29px] top-1.5 h-3.5 w-3.5 rounded-full bg-white border-2 border-[#0E2F76] group-hover:bg-[#0E2F76] transition-colors shadow-sm" />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#0E2F76] bg-[#A9C0E0]/20 px-2 py-0.5 rounded">
                          {point.year}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0E2F76] tracking-wide uppercase">
                          {point.title}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-500 font-sans leading-relaxed max-w-xl">
                        {point.description}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
