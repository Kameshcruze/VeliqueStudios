import React from 'react';

interface MovingOfferBarProps {
  texts: string[];
}

export default function MovingOfferBar({ texts }: MovingOfferBarProps) {
  // If texts is empty, use standard fallbacks
  const displayTexts = texts && texts.length > 0 ? texts : [
    "FREE STYLING ON PRE-BOOKED LUXURY DROPS",
    "NEW SUMMER LUXE ARRIVALS ONLINE NOW",
    "COMPLIMENTARY EXPRESS DELIVERY ON ORDERS OVER ₹4,999",
    "HANDPICKED BESPOKE TEXTURES"
  ];

  return (
    <div id="moving-offer-bar" className="w-full bg-[#0E2F76] text-white py-3.5 overflow-hidden border-b border-[#A9C0E0]/30 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repeating text block for seamless infinite scrolling */}
        <div className="flex shrink-0 items-center justify-around gap-16 min-w-full px-4">
          {displayTexts.map((txt, index) => (
            <div key={`set1-${index}`} className="flex items-center gap-3 text-xs font-mono font-medium tracking-[0.3em] uppercase text-[#F4FEFF]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#A9C0E0] animate-pulse" />
              <span>{txt}</span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-around gap-16 min-w-full px-4" aria-hidden="true">
          {displayTexts.map((txt, index) => (
            <div key={`set2-${index}`} className="flex items-center gap-3 text-xs font-mono font-medium tracking-[0.3em] uppercase text-[#F4FEFF]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#A9C0E0] animate-pulse" />
              <span>{txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
