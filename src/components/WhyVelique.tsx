import React from 'react';
import { WhyFeature } from '../types';
import { Sparkles, Compass, Flame, Gift, Award } from 'lucide-react';

interface WhyVeliqueProps {
  features: WhyFeature[];
}

export default function WhyVelique({ features }: WhyVeliqueProps) {
  
  // Dynamic Lucide icon helper
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="h-7 w-7 text-[#0E2F76] stroke-[1.5]" />;
      case 'Compass':
        return <Compass className="h-7 w-7 text-[#0E2F76] stroke-[1.5]" />;
      case 'Flame':
        return <Flame className="h-7 w-7 text-[#0E2F76] stroke-[1.5]" />;
      case 'Gift':
        return <Gift className="h-7 w-7 text-[#0E2F76] stroke-[1.5]" />;
      default:
        return <Award className="h-7 w-7 text-[#0E2F76] stroke-[1.5]" />;
    }
  };

  return (
    <section id="why-velique-section" className="py-20 bg-[#A9C0E0]/30 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="mb-14 text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#0E2F76] uppercase">Bespoke Excellence</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2F76] font-medium tracking-tight">
            WHY VELIQUE?
          </h2>
          <div className="w-12 h-[1px] bg-[#0E2F76]/30 mx-auto mt-4" />
          <p className="text-xs text-neutral-600 max-w-md mx-auto pt-1 font-sans">
            Timeless fabrics, custom silhouettes, and a dedicated styling concierge ecosystem built for luxury lovers.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-[#F4FEFF]/95 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-md border border-white hover:-translate-y-2 hover:shadow-xl hover:bg-white transition-all duration-500 group select-none"
            >
              <div className="p-4 rounded-full bg-[#A9C0E0]/15 group-hover:bg-[#0E2F76]/10 transition-colors mb-6 flex items-center justify-center">
                {renderIcon(item.iconName)}
              </div>

              <h3 className="font-serif text-md sm:text-lg text-[#0E2F76] font-bold tracking-wider uppercase mb-3">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500 font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
