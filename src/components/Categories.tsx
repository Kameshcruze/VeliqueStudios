import React from 'react';
import { CategoryCard } from '../types';

interface CategoriesProps {
  categories: CategoryCard[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

export default function Categories({ categories, selectedCategory, onSelectCategory }: CategoriesProps) {
  return (
    <section id="categories-section" className="py-20 bg-white select-none relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Editorial Heading */}
        <div className="mb-12 max-w-xl mx-auto text-center space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#5A7EBA] uppercase">The Palette Edit</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2F76] font-medium tracking-tight">
            SHOP BY CATEGORY
          </h2>
          <div className="w-12 h-[1px] bg-[#A9C0E0] mx-auto mt-4" />
          <p className="text-xs text-neutral-500 max-w-md mx-auto pt-1 font-sans">
            Explore carefully curated drops, crafted with premium natural fabrics and modern details.
          </p>
        </div>

        {/* Global Catalog Selector Toggle bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              selectedCategory === null
                ? 'bg-[#0E2F76] text-white shadow-md'
                : 'bg-[#F4FEFF] text-[#0E2F76] border border-[#A9C0E0]/30 hover:bg-[#A9C0E0]/10'
            }`}
          >
            ALL COUTURE
          </button>
          
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[#0E2F76] text-white shadow-md'
                  : 'bg-[#F4FEFF] text-[#0E2F76] border border-[#A9C0E0]/30 hover:bg-[#A9C0E0]/10'
              }`}
            >
              {c.title.replace(' WOMEN\'S WEAR', '')}
            </button>
          ))}
        </div>

        {/* Arched Grid Items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                className={`flex flex-col items-center group cursor-pointer transition-all duration-300 transform ${
                  isSelected ? 'scale-105' : 'hover:-translate-y-1'
                }`}
              >
                {/* Stunning Arched Window Silhouette matched to lookbook template */}
                <div
                  className={`relative w-full aspect-[2/3] rounded-t-[100px] rounded-b-[20px] overflow-hidden bg-neutral-100 border-2 transition-all duration-300 shadow-md ${
                    isSelected ? 'border-[#0E2F76] shadow-lg ring-4 ring-[#0E2F76]/10' : 'border-[#A9C0E0]/20'
                  }`}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-102 transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle royal blue fog filter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E2F76]/40 via-[#0E2F76]/5 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Item counter badge */}
                  <div className="absolute bottom-4 left-0 w-full text-center">
                    <span className="text-[9px] font-bold font-mono text-white tracking-[0.1em] bg-[#0E2F76]/80 px-2.5 py-1 rounded-full uppercase">
                      {cat.count}
                    </span>
                  </div>
                </div>

                {/* Arched bottom Caption label */}
                <h3 className="text-xs font-bold text-[#0E2F76] mt-4 tracking-[0.15em] text-center uppercase group-hover:text-[#5A7EBA] transition-colors">
                  {cat.title}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
