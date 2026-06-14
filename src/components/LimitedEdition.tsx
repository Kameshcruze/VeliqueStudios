import React, { useState, useEffect } from 'react';
import { LimitedEditionConfig } from '../types';
import { Clock, Zap } from 'lucide-react';

interface LimitedEditionProps {
  limited: LimitedEditionConfig;
  onShopClick: () => void;
}

export default function LimitedEdition({ limited, onShopClick }: LimitedEditionProps) {
  // Parsed Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: '02',
    hours: '14',
    minutes: '37',
    seconds: '58'
  });

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date(limited.countdownDate || '2026-10-31T23:59:59').getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        // Fallback to static values representing lookbook screenshot
        setTimeLeft({
          days: '02',
          hours: '14',
          minutes: '37',
          seconds: '58'
        });
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0')
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [limited.countdownDate]);

  return (
    <section id="limited-edition-section" className="py-20 bg-white select-none relative overflow-hidden">
      
      {/* Decorative background glow circles */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#A9C0E0]/15 blur-3xl -z-10" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0E2F76]/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Glow Blue Container Envelope */}
        <div className="relative bg-[#0E2F76] rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl border border-white/10">
          
          {/* Subtle neon luxury gradient reflections */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0E2F76]/20 via-white/5 to-[#A9C0E0]/10 opacity-70 pointer-events-none" />

          {/* Left Side: Text and Timer */}
          <div className="flex-1 space-y-6 text-left relative z-10 text-white">
            
            <div className="flex items-center gap-2 text-[#A9C0E0] text-[9px] font-mono tracking-[0.45em] uppercase font-bold">
              <Zap className="h-3 w-3 text-[#A9C0E0] animate-pulse" />
              <span>LIMITED QUANTITY DROP</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-wide font-medium leading-tight max-w-xl">
              {limited.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#A9C0E0] leading-relaxed max-w-lg">
              {limited.subtitle}
            </p>

            {/* Glowing Digital luxury Timer Flex */}
            <div className="pt-6 flex flex-wrap items-center gap-2 sm:gap-4 select-none">
              
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-mono font-bold tracking-widest text-[#F4FEFF] drop-shadow-[0_0_12px_rgba(244,254,255,0.4)]">
                  {timeLeft.days}
                </span>
                <span className="text-[9px] font-bold text-[#A9C0E0] tracking-widest uppercase mt-1">DAYS</span>
              </div>

              <div className="text-xl sm:text-2xl font-bold font-mono text-[#A9C0E0] self-start mt-1">:</div>

              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-mono font-bold tracking-widest text-[#F4FEFF] drop-shadow-[0_0_12px_rgba(244,254,255,0.4)]">
                  {timeLeft.hours}
                </span>
                <span className="text-[9px] font-bold text-[#A9C0E0] tracking-widest uppercase mt-1">HOURS</span>
              </div>

              <div className="text-xl sm:text-2xl font-bold font-mono text-[#A9C0E0] self-start mt-1">:</div>

              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-mono font-bold tracking-widest text-[#F4FEFF] drop-shadow-[0_0_12px_rgba(244,254,255,0.4)]">
                  {timeLeft.minutes}
                </span>
                <span className="text-[9px] font-bold text-[#A9C0E0] tracking-widest uppercase mt-1">MINUTES</span>
              </div>

              <div className="text-xl sm:text-2xl font-bold font-mono text-[#A9C0E0] self-start mt-1">:</div>

              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-mono font-bold tracking-widest text-[#F4FEFF] drop-shadow-[0_0_12px_rgba(244,254,255,0.4)]">
                  {timeLeft.seconds}
                </span>
                <span className="text-[9px] font-bold text-[#A9C0E0] tracking-widest uppercase mt-1">SECONDS</span>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="pt-6">
              <button
                onClick={onShopClick}
                className="px-8 py-4 bg-[#F4FEFF] text-[#0E2F76] text-xs font-bold tracking-[0.25em] rounded-md shadow-xl transition-all hover:scale-105 hover:bg-[#A9C0E0] uppercase cursor-pointer"
              >
                {limited.buttonText || "SHOP LIMITED EDITION"}
              </button>
            </div>

          </div>

          {/* Right Side: Portrait Image with glowing borders */}
          <div className="relative max-w-[280px] sm:max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 select-none hidden md:block">
            <img
              src={limited.imageUrl}
              alt="Limited drop catalog"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
            />
            
            {/* Soft gold tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2F76]/60 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
