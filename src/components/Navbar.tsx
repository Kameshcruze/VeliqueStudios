import React, { useState, useEffect } from 'react';
import VeliqueLogo from './VeliqueLogo';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
  onProfileClick: () => void;
  isAdminLoggedIn: boolean;
}

export default function Navbar({ 
  onOpenCart, 
  onOpenWishlist, 
  cartCount, 
  wishlistCount,
  onProfileClick,
  isAdminLoggedIn
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero-section' },
    { name: 'COLLECTION', href: '#categories-section' },
    { name: 'SHOP', href: '#new-arrivals-section' },
    { name: 'ABOUT', href: '#our-story-section' },
    { name: 'LOOKBOOK', href: '#lookbook-section' },
    { name: 'CONTACT', href: '#footer-section' }
  ];

  return (
    <nav
      id="velique-navbar"
      className={`relative w-full z-40 transition-all duration-500 select-none ${
        isScrolled
          ? 'bg-[#F4FEFF]/80 backdrop-blur-md shadow-sm border-b border-[#A9C0E0]/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo & Signature */}
        <a href="#hero-section" className="flex items-center">
          <VeliqueLogo className="h-9 text-[#0E2F76]" showText={true} />
        </a>

        {/* Desktop Editorial Navigation Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold tracking-[0.25em] text-[#0E2F76] hover:text-[#5A7EBA] transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0E2F76] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Dynamic Action Icons */}
        <div className="flex items-center gap-4 text-[#0E2F76]">
          
          <button
            aria-label="Search Catalog"
            className="p-1.5 hover:bg-[#A9C0E0]/15 rounded-full transition-colors cursor-pointer"
          >
            <Search className="h-[18px] w-[18px] stroke-[1.8]" />
          </button>

          <button
            onClick={onOpenWishlist}
            aria-label="Wishlist View"
            className="p-1.5 hover:bg-[#A9C0E0]/15 rounded-full transition-colors relative cursor-pointer"
          >
            <Heart className={`h-[18px] w-[18px] stroke-[1.8] ${wishlistCount > 0 ? 'fill-red-500 stroke-red-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold font-mono h-[16px] w-[16px] flex items-center justify-center rounded-full border border-white animate-scale">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Shopping Bag and Checkout drawer"
            className="p-1.5 hover:bg-[#A9C0E0]/15 rounded-full transition-colors relative cursor-pointer"
          >
            <ShoppingBag className="h-[18px] w-[18px] stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0E2F76] text-[#F4FEFF] text-[9px] font-bold font-mono h-[16px] w-[16px] flex items-center justify-center rounded-full border border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account Profile Access */}
          <button
            onClick={onProfileClick}
            aria-label={isAdminLoggedIn ? "Boutique Control Panel" : "Login"}
            className="p-1.5 hover:bg-[#A9C0E0]/15 rounded-full transition-colors inline-block cursor-pointer font-sans"
          >
            <User className={`h-[18px] w-[18px] stroke-[1.8] ${isAdminLoggedIn ? 'text-[#0E2F76] fill-[#0E2F76]/20' : ''}`} />
          </button>

          {/* Mobile Collapse Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="p-1.5 hover:bg-[#A9C0E0]/15 rounded-full lg:hidden transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Over */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#F4FEFF] border-b border-[#A9C0E0]/20 shadow-lg py-6 flex flex-col items-center gap-4 z-40">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[12px] font-black tracking-[0.25em] text-[#0E2F76] hover:text-[#5A7EBA] transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col items-center gap-4 border-t border-neutral-100 pt-4 w-full justify-center px-6">
            <div className="flex gap-4">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenWishlist(); }}
                className="text-xs font-bold text-[#0E2F76] flex items-center gap-1.5 cursor-pointer"
              >
                <Heart className="h-4 w-4" /> Wishlist ({wishlistCount})
              </button>
              <span className="text-neutral-200">|</span>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenCart(); }}
                className="text-xs font-bold text-[#0E2F76] flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" /> Bag ({cartCount})
              </button>
            </div>
            <button
              onClick={() => { setMobileMenuOpen(false); onProfileClick(); }}
              className="w-full text-xs font-black text-[#0E2F76] flex items-center justify-center gap-1.5 cursor-pointer border border-[#0E2F76]/30 rounded-md py-3 bg-[#F4FEFF] uppercase"
            >
              <User className="h-4 w-4" /> {isAdminLoggedIn ? 'Boutique Control Panel' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
