import React, { useState } from 'react';
import { LookbookItem, ProductItem } from '../types';
import { Play, Heart, MessageCircle, Instagram, ShoppingBag, X, Volume2 } from 'lucide-react';

interface LookbookProps {
  lookbookList: LookbookItem[];
  fallbackProducts: ProductItem[];
  onAddToCart: (item: ProductItem, selectedSize: string) => void;
}

export default function Lookbook({ lookbookList, fallbackProducts, onAddToCart }: LookbookProps) {
  const [activeReel, setActiveReel] = useState<LookbookItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    'look-1': 1420,
    'look-2': 3892,
    'look-3': 951,
    'look-4': 2404
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setHasLiked(prev => {
      const likedState = !prev[id];
      setLikes(prevLikes => ({
        ...prevLikes,
        [id]: likedState ? prevLikes[id] + 1 : prevLikes[id] - 1
      }));
      return { ...prev, [id]: likedState };
    });
  };

  return (
    <section id="lookbook-section" className="py-20 bg-white select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Gallery Header */}
        <div className="text-center mb-12 max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#5A7EBA] uppercase">Social Muse Lookbook</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2F76] font-medium tracking-tight">
            LOOKBOOK INSPIRATION
          </h2>
          <div className="w-12 h-[1px] bg-[#A9C0E0] mx-auto mt-4" />
          <p className="text-xs text-neutral-500 max-w-sm mx-auto font-sans">
            Real looks, real people. Tap any look to shop the exact coordinate pieces or watch the fashion reel.
          </p>
        </div>

        {/* Asymmetrical Mixed Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lookbookList.map((item, index) => {
            
            // Generate some fake comment count indicators
            const commentsCount = (index + 2) * 11;
            const isLiked = !!hasLiked[item.id];

            return (
              <div
                key={item.id}
                onClick={() => setActiveReel(item)}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-100 shadow-md cursor-pointer transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {/* Lookbook main cover photo */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform scale-102 transition-transform duration-700 group-hover:scale-108"
                />

                {/* Video Play badge */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className="p-4 rounded-full bg-white/95 text-[#0E2F76] shadow-xl transform group-hover:scale-110 transition-transform flex items-center justify-center">
                      <Play className="h-5 w-5 fill-[#0E2F76] ml-0.5" />
                    </span>
                  </div>
                )}

                {/* Premium Royal Blue Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E2F76]/95 via-[#0E2F76]/70 to-[#0E2F76]/40 text-[#F4FEFF] p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end space-y-3 z-20">
                  
                  <div className="flex items-center gap-1.5 text-[#A9C0E0] text-[9px] font-mono tracking-widest uppercase">
                    <Instagram className="h-3 w-3" />
                    <span>@velique.studios</span>
                  </div>

                  <h3 className="font-serif text-sm font-bold tracking-wide uppercase line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Social Action metrics */}
                  <div className="flex items-center gap-4 text-xs font-semibold pt-1 border-t border-[#A9C0E0]/20">
                    <span className="flex items-center gap-1 hover:text-red-400">
                      <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-red-500 stroke-red-500' : ''}`} />
                      <span>{likes[item.id]?.toLocaleString() || 120}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{commentsCount}</span>
                    </span>
                  </div>

                  {/* Call to action button */}
                  <div className="pt-2">
                    <span className="inline-block w-full text-center py-2 bg-white text-[#0E2F76] rounded-lg text-[10px] font-bold tracking-widest uppercase hover:bg-[#F4FEFF]">
                      SHOP THE LOOK
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* LOOKBOOK INTERACTIVE PLAYER MODAL */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
          <div className="absolute inset-0 -z-10" onClick={() => setActiveReel(null)} />

          <div className="relative w-full max-w-4xl bg-[#0E2F76] text-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[85vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video Player Display left side */}
            <div className="relative md:col-span-7 bg-black flex items-center justify-center overflow-hidden h-[400px] md:h-[600px]">
              <img
                src={activeReel.imageUrl}
                alt=""
                className="w-full h-full object-cover opacity-90 blur-sm absolute inset-0"
              />
              {/* Sharp foreground image mimicking interactive viewport */}
              <div className="relative w-full max-w-[340px] h-full overflow-hidden border-x border-white/5 shadow-2xl flex flex-col justify-end p-6">
                <img
                  src={activeReel.imageUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Simulated video playback indicators */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Audio waves visual simulation */}
                {activeReel.type === 'video' && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 p-2 rounded-full bg-black/40 text-white animate-pulse">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-[8px] font-bold tracking-widest font-sans uppercase">Reel Sound</span>
                  </div>
                )}

                {/* Simulated playback seek tracker */}
                <div className="absolute bottom-2 left-4 right-4 h-1 bg-white/30 rounded overflow-hidden">
                  <div className="h-full w-2/3 bg-[#A9C0E0] animate-pulse" />
                </div>
              </div>
            </div>

            {/* Lookbook products coordinates list on the right */}
            <div className="p-6 sm:p-8 md:col-span-5 flex flex-col justify-between overflow-y-auto bg-[#0E2F76] h-full">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#A9C0E0]/20 text-[#A9C0E0] text-[9px] font-bold font-mono px-3 py-1 rounded-full uppercase tracking-wider">
                    {activeReel.type === 'video' ? 'ACTIVE REEL' : 'STUDIO EDIT'}
                  </span>
                  <span className="text-white/40 text-xs font-mono font-bold uppercase">Shop coordinates</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif tracking-wider font-medium uppercase text-white leading-tight">
                  {activeReel.title}
                </h3>

                <p className="text-xs text-[#A9C0E0] leading-relaxed">
                  Inspired by clean premium Zara aesthetics, pairing light powder blue threads with raw organic textures of linen coordinates.
                </p>

                {/* Highlight Product Pick section */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <span className="text-[9px] font-bold text-[#A9C0E0] tracking-widest block uppercase">PAIRING ITEMS</span>
                  
                  {fallbackProducts.slice(0, 2).map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-3 bg-[#F4FEFF]/10 rounded-xl hover:bg-white/15 transition relative group">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="h-14 w-11 object-cover rounded shadow-md"
                        />
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{prod.name}</h4>
                          <span className="text-[11px] font-bold font-mono text-[#A9C0E0]">₹{prod.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart(prod, 'M');
                          alert(`Added Size M of ${prod.name} successfully! See your Shopping Bag at the top right.`);
                        }}
                        className="py-1.5 px-3 bg-white text-[#0E2F76] hover:bg-[#A9C0E0] transition text-[10px] font-bold rounded-md tracking-wider flex items-center gap-1 uppercase cursor-pointer"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        <span>QUICK BUY</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feed metrics */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleLike(activeReel.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold hover:text-red-400 cursor-pointer"
                  >
                    <Heart className={`h-4 w-4 ${hasLiked[activeReel.id] ? 'fill-red-500 stroke-red-500' : ''}`} />
                    <span>{likes[activeReel.id]?.toLocaleString()} Hearts</span>
                  </button>
                </div>
                
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">ASK CONCIERGE</span>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
