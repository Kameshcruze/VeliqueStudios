import React, { useState } from 'react';
import VeliqueLogo from './VeliqueLogo';
import { Mail, Phone, MapPin, Instagram, Facebook, Send, Check } from 'lucide-react';
import { BrandConfig } from '../types';

interface FooterProps {
  brand: BrandConfig;
}

export default function Footer({ brand }: FooterProps) {
  const [emailSub, setEmailSub] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub || !emailSub.includes('@')) return alert('Please enter a valid email address.');
    setSuccess(true);
    setEmailSub('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <footer id="footer-section" className="bg-[#0E2F76] text-[#F4FEFF] pt-16 pb-8 select-none relative overflow-hidden">
      
      {/* Visual background lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#A9C0E0]/20" />

      {/* Floating particles */}
      <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full border border-white/5" />
      <div className="absolute right-10 bottom-10 h-60 w-60 rounded-full border border-white/5" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start relative z-10">
        
        {/* Col 1: Brand Signature */}
        <div className="space-y-6 text-left">
          <VeliqueLogo className="h-10 text-white" showText={true} />
          
          <p className="text-[11px] sm:text-xs text-[#A9C0E0] leading-relaxed font-sans font-medium">
            Velique Studios is an international luxury boutique dressing modern women in unyielding comfort, delicate linens, and hand-tailored custom couture.
          </p>

          <div className="flex items-center gap-3 text-white">
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Page"
              className="p-2 bg-white/10 hover:bg-white/20 transition rounded-full flex items-center justify-center cursor-pointer"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook Page"
              className="p-2 bg-white/10 hover:bg-white/20 transition rounded-full flex items-center justify-center cursor-pointer"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-4 text-left">
          <h4 className="text-[10px] font-mono font-bold tracking-[0.35em] text-[#A9C0E0] uppercase">QUICK LINKS</h4>
          <ul className="space-y-2.5 text-xs font-semibold text-[#F4FEFF]">
            <li><a href="#hero-section" className="hover:text-[#A9C0E0] hover:underline transition">Home Landing</a></li>
            <li><a href="#categories-section" className="hover:text-[#A9C0E0] hover:underline transition">Categories Couture</a></li>
            <li><a href="#new-arrivals-section" className="hover:text-[#A9C0E0] hover:underline transition">Shop New Drops</a></li>
            <li><a href="#lookbook-section" className="hover:text-[#A9C0E0] hover:underline transition">Inspiration Lookbook</a></li>
            <li><a href="#our-story-section" className="hover:text-[#A9C0E0] hover:underline transition">Our Atelier Story</a></li>
          </ul>
        </div>

        {/* Col 3: Customer Care & Policy */}
        <div className="space-y-4 text-left">
          <h4 className="text-[10px] font-mono font-bold tracking-[0.35em] text-[#A9C0E0] uppercase">CUSTOMER CARE</h4>
          <ul className="space-y-2.5 text-xs text-[#A9C0E0]">
            <li><a href="#new-arrivals-section" className="hover:text-white transition">Size Assistances</a></li>
            <li><a href="#why-velique-section" className="hover:text-white transition">Styling Consultations</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping &amp; Return Policies</a></li>
            <li><a href="#" className="hover:text-white transition">Fabric Care Guide</a></li>
            <li><a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition font-bold text-white flex items-center gap-1.5 font-sans">Chat Personal Stylist</a></li>
          </ul>
        </div>

        {/* Col 4: Newsletter Subscription */}
        <div className="space-y-4 text-left">
          <h4 className="text-[10px] font-mono font-bold tracking-[0.35em] text-[#A9C0E0] uppercase">NEWSLETTER SIGNUP</h4>
          <p className="text-[11px] sm:text-xs text-[#A9C0E0] leading-relaxed">
            Subscribe to receive exclusive invitations to private seasonal drops, catalog books, and member events.
          </p>

          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={emailSub}
              onChange={(e) => setEmailSub(e.target.value)}
              className="w-full py-3.5 pl-4 pr-12 text-xs bg-white/10 rounded-lg text-white placeholder-white/40 focus:bg-white/15 outline-none font-sans font-semibold border border-white/15"
            />
            <button
              type="submit"
              aria-label="Submit Email"
              className="absolute right-1.5 top-1.5 p-2 bg-[#F4FEFF] text-[#0E2F76] hover:bg-[#A9C0E0] transition-colors rounded-md flex items-center justify-center cursor-pointer"
            >
              {success ? <Check className="h-3.5 w-3.5 text-emerald-600 font-bold" /> : <Send className="h-3.5 w-3.5" />}
            </button>
          </form>

          {success && (
            <p className="text-[10px] font-bold text-[#A9C0E0] mt-1 uppercase">
              ✨ Invitation request submitted successfully.
            </p>
          )}
        </div>

      </div>

      {/* Boutique Location & Contact metadata horizontal strip */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] text-[#A9C0E0] text-left">
        <div className="flex items-center gap-2.5">
          <MapPin className="h-4 w-4 text-[#A9C0E0] shrink-0" />
          <span>{brand.address}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone className="h-4 w-4 text-[#A9C0E0] shrink-0" />
          <span>{brand.phone}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Mail className="h-4 w-4 text-[#A9C0E0] shrink-0" />
          <span>{brand.email}</span>
        </div>
      </div>

      {/* Legal terms footer */}
      <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[9px] text-[#A9C0E0]/60 uppercase tracking-[0.2em] gap-4 font-mono font-bold">
        <span>© {new Date().getFullYear()} VELIQUE STUDIOS. ALL BESPOKE SILHOUETTES RESERVED.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white">Terms of Drop</a>
        </div>
      </div>

    </footer>
  );
}
