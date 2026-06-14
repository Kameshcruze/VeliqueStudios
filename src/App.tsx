import React, { useState, useEffect } from 'react';
import { initialStudioConfig } from './data/defaultConfig';
import { StudioConfig, ProductItem } from './types';

// Components Imports
import Navbar from './components/Navbar';
import MovingOfferBar from './components/MovingOfferBar';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import NewArrivals from './components/NewArrivals';
import WhyVelique from './components/WhyVelique';
import ParallaxBanner from './components/ParallaxBanner';
import FeaturedCollections from './components/FeaturedCollections';
import Lookbook from './components/Lookbook';
import LimitedEdition from './components/LimitedEdition';
import Testimonials from './components/Testimonials';
import OurStory from './components/OurStory';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

// Icons
import { ShoppingBag, Heart, Trash2, X, Plus, Minus, Calendar, Check, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

export default function App() {
  // 1. Instantiante dynamic luxury boutique layout state
  const [config, setConfig] = useState<StudioConfig>(() => {
    try {
      const saved = localStorage.getItem('velique_store_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load local storage boutique config", e);
    }
    return initialStudioConfig;
  });

  const handleUpdateConfig = (newConfig: StudioConfig) => {
    setConfig(newConfig);
    localStorage.setItem('velique_store_config', JSON.stringify(newConfig));
  };

  const handleResetConfig = () => {
    localStorage.removeItem('velique_store_config');
    setConfig(initialStudioConfig);
  };

  // 2. Interactive state managers (Cart, Wishlist, Booking Modals)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<{ product: ProductItem; size: string; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  
  const [bookingDate, setBookingDate] = useState('2026-06-25');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [bookingConsultant, setBookingConsultant] = useState('Alexandra Thorne (Paris Lead)');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Cart operations
  const handleAddToCart = (product: ProductItem, size: string) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.product.id === product.id && item.size === size);
      if (exists) {
        return prevCart.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, size, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.size === size) {
          const nextQ = item.quantity + delta;
          return { ...item, quantity: nextQ > 0 ? nextQ : 1 };
        }
        return item;
      })
    );
  };

  // Wishlist operations
  const handleToggleWishlist = (product: ProductItem) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const handleMoveToCart = (product: ProductItem) => {
    handleAddToCart(product, 'M');
    // Remove from wishlist
    setWishlist((prev) => prev.filter((id) => id !== product.id));
    setWishlistOpen(false);
  };

  // Cart values calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Simulated Booking flow
  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEmail || !bookingName) {
      alert('Kindly fill in all required private concierge text blocks.');
      return;
    }
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingOpen(false);
      setBookingName('');
      setBookingEmail('');
    }, 4500);
  };

  // Simulated Checkout sequence
  const [checkingOut, setCheckingOut] = useState(false);
  const handleCheckoutSubmit = () => {
    if (cart.length === 0) return;
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setCart([]);
      setCartOpen(false);
      alert('🌟 Your order matches successfully! Our Velique Studio concierge has sent a detailed billing breakdown to your email. Thank you for choosing custom luxury.');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#F4FEFF] font-sans antialiased text-neutral-850 select-none selection:bg-[#0E2F76]/10 scroll-smooth">
      
      {/* SECTION 11 — ANNOUNCEMENT OFFER TICKER AT TOP */}
      <MovingOfferBar texts={config.brand.offerTickerTexts} />

      {/* STICKY CLASS HEADER GLOBAL NAVBAR */}
      <Navbar
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        cartCount={totalItemsCount}
        wishlistCount={wishlist.length}
      />

      {/* ======================= MAIN SECTIONS LOOP ======================= */}
      <main className="relative">
        
        {/* SECTION 1 — HERO LANDING */}
        <HeroSection
          hero={config.hero}
          onExploreClick={() => {
            const el = document.getElementById('categories-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookStylingClick={() => setBookingOpen(true)}
        />

        {/* SECTION 2 — SHOP BY CATEGORY */}
        <Categories
          categories={config.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => {
            setSelectedCategory(id);
            // Auto scroll down to product grid so they see current filtered results
            const el = document.getElementById('new-arrivals-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* SECTION 3 — NEW ARRIVALS */}
        <NewArrivals
          products={config.products}
          categories={config.categories}
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist}
        />

        {/* SECTION 4 — WHY VELIQUE */}
        <WhyVelique features={config.features} />

        {/* SECTION 5 — PARALLAX TEXT LUXURY BANNER */}
        <ParallaxBanner
          parallax={config.parallaxBanner}
          onCtaClick={() => {
            const el = document.getElementById('featured-collections-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* SECTION 6 — FEATURED COLLECTIONS */}
        <FeaturedCollections collections={config.collections} />

        {/* SECTION 7 — LOOKBOOK */}
        <Lookbook
          lookbookList={config.lookbookList}
          fallbackProducts={config.products}
          onAddToCart={handleAddToCart}
        />

        {/* SECTION 8 — LIMITED EDITION */}
        <LimitedEdition
          limited={config.limitedEdition}
          onShopClick={() => {
            setSelectedCategory('cat-2'); // Party Wear ideally
            const el = document.getElementById('new-arrivals-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* SECTION 9 — TESTIMONIALS */}
        <Testimonials testimonials={config.testimonials} />

        {/* SECTION 10 — OUR STORY AND TIMELINE */}
        <OurStory story={config.story} />

      </main>

      {/* SECTION 12 — OUR BRAND PREMIUM FOOTER */}
      <Footer brand={config.brand} />


      {/* ======================= INTERACTIVE MODAL OVERLAYS & SHEETS ======================= */}

      {/* A. DESIGN/ADMIN ACTIVE DRAWER (PERSISTENT BUTTON AT BOTTOM CORNER) */}
      <AdminPanel
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onReset={handleResetConfig}
      />

      {/* B. SHOPPING BAG SLIDEOUT DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs select-none">
          <div className="absolute inset-0 -z-10" onClick={() => setCartOpen(false)} />

          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-100 relative">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-[#F4FEFF] border-b border-neutral-200">
              <div className="flex items-center gap-2 text-[#0E2F76]">
                <ShoppingBag className="h-5 w-5" />
                <h3 className="text-sm font-bold tracking-[0.2em] font-sans uppercase">Your Shopping Bag ({totalItemsCount})</h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1 rounded-full text-[#0E2F76] hover:bg-neutral-100 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${item.size}`} className="flex items-start gap-4 p-3 rounded-xl border border-neutral-100 bg-neutral-50/50">
                  <img
                    src={item.product.imageUrl}
                    alt=""
                    className="h-20 w-16 object-cover rounded-md shadow-sm border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 text-left space-y-1">
                    <h4 className="text-xs font-bold text-neutral-800 line-clamp-1">{item.product.name}</h4>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Size: {item.size}</p>
                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity multipliers */}
                      <div className="flex items-center gap-2.5 border border-neutral-200 rounded-lg p-1 bg-white">
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.size, -1)}
                          className="p-1 text-neutral-500 hover:text-black cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold font-mono w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.size, 1)}
                          className="p-1 text-neutral-500 hover:text-black cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-neutral-800 font-mono">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.product.id, item.size)}
                    className="text-red-400 hover:text-red-650 p-1 rounded-full cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="text-center py-20">
                  <ShoppingBag className="h-10 w-10 mx-auto text-neutral-300 mb-2" />
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Your Bag Is EMPTY</span>
                  <p className="text-xs text-neutral-500 mt-1">Browse our Pinterest New Arrivals or use Categories to add select models.</p>
                </div>
              )}
            </div>

            {/* Calculations and Actions */}
            <div className="p-6 border-t border-neutral-100 space-y-4 bg-[#F4FEFF]/80 backdrop-blur-xs">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-medium text-neutral-500">
                  <span>Shipping Concierge:</span>
                  <span className="text-emerald-600 font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between font-black text-neutral-800 text-sm pt-2">
                  <span>TOTAL ESTIMATED:</span>
                  <span className="font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  disabled={cart.length === 0 || checkingOut}
                  onClick={handleCheckoutSubmit}
                  className={`w-full py-4 rounded-xl text-white font-bold text-xs tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    cart.length === 0 ? 'bg-neutral-300 cursor-not-allowed' : 'bg-[#0E2F76] hover:bg-[#1a4497]'
                  }`}
                >
                  {checkingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>SECURE BILLING ESCROW ONLINE...</span>
                    </>
                  ) : (
                    <>
                      <span>PROCEED TO SECURE COUTURE BILLING</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-[10px] font-bold text-[#5A7EBA] uppercase tracking-widest py-1 block hover:underline cursor-pointer"
                >
                  Continue Selecting Gowns
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* C. WISHLIST SLIDEOUT DRAWER */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs select-none">
          <div className="absolute inset-0 -z-10" onClick={() => setWishlistOpen(false)} />

          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-100">
            
            <div className="flex items-center justify-between p-6 bg-[#F4FEFF] border-b border-neutral-200">
              <div className="flex items-center gap-2 text-[#0E2F76]">
                <Heart className="h-5 w-5 fill-[#0E2F76]" />
                <h3 className="text-sm font-bold tracking-[0.2em] font-sans uppercase">Your Curated Wishlist ({wishlist.length})</h3>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="p-1 rounded-full text-[#0E2F76] hover:bg-neutral-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.map((id) => {
                const prod = config.products.find((p) => p.id === id);
                if (!prod) return null;

                return (
                  <div key={prod.id} className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-neutral-15 hover:bg-neutral-50/50">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.imageUrl}
                        alt=""
                        className="h-16 w-12 object-cover rounded shadow-sm border shrink-0"
                      />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-neutral-800 line-clamp-1">{prod.name}</h4>
                        <span className="text-[11px] font-bold font-mono text-neutral-500">₹{prod.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleMoveToCart(prod)}
                        className="p-1.5 py-2 px-3 bg-[#0E2F76] text-white text-[9px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        <span>Add Bag</span>
                      </button>
                      <button
                        onClick={() => handleToggleWishlist(prod)}
                        className="p-2 border border-neutral-200 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {wishlist.length === 0 && (
                <div className="text-center py-20">
                  <Heart className="h-10 w-10 mx-auto text-neutral-300 mb-2" />
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Wishlist is empty</span>
                  <p className="text-xs text-neutral-500 mt-1">Pin your favorite items and dresses on our drops catalog grid.</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-neutral-100 bg-neutral-50">
              <button
                onClick={() => setWishlistOpen(false)}
                className="w-full py-4 border border-[#0E2F76]/40 text-[#0E2F76] font-bold rounded-lg text-xs tracking-widest uppercase hover:bg-[#0E2F76]/5 cursor-pointer"
              >
                Close Wishlist Curator
              </button>
            </div>

          </div>
        </div>
      )}

      {/* D. PERSONAL LUXURY STYLING SESSION MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <div className="absolute inset-0 -z-10" onClick={() => setBookingOpen(false)} />

          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
            {/* Close */}
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-[#0E2F76] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6 space-y-2">
              <Sparkles className="h-6 w-6 text-[#0E2F76] mx-auto animate-pulse" />
              <h3 className="font-serif text-xl sm:text-2xl text-[#0E2F76] font-medium tracking-wide">
                BOOK STYLING SESSION
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto pt-1 font-sans">
                Reserve a bespoke digital preview modeling session with one of our global fashion curators.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-md font-bold text-[#0E2F76] uppercase">Session Requested!</h4>
                  <p className="text-xs text-neutral-500 font-sans max-w-xs mx-auto leading-relaxed">
                    Our luxury concierge team is coordinating with {bookingConsultant}. An invitation has been requested for {bookingDate} at {bookingTime}. Look out for custom styles in your inbox soon!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookSession} className="space-y-4 text-left">
                
                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full text-xs border border-neutral-300 rounded-md p-3 outline-none focus:ring-1 focus:ring-[#0E2F76] bg-neutral-50 font-semibold"
                    placeholder="e.g. Eleanor Vance"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    className="w-full text-xs border border-neutral-300 rounded-md p-3 outline-none focus:ring-1 focus:ring-[#0E2F76] bg-neutral-50 font-semibold"
                    placeholder="e.g. eleanor@vogue.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Select date</label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full text-xs border border-neutral-300 rounded-md p-3 outline-none bg-neutral-50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Preferred Time</label>
                    <input
                      type="time"
                      required
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full text-xs border border-neutral-300 rounded-md p-3 outline-none bg-neutral-50 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Personal Stylist Associate</label>
                  <select
                    value={bookingConsultant}
                    onChange={(e) => setBookingConsultant(e.target.value)}
                    className="w-full text-xs border border-neutral-300 rounded-md p-3 outline-none bg-neutral-50 font-semibold"
                  >
                    <option>Alexandra Thorne (Paris Lead)</option>
                    <option>Julian Pierce (Milan Atelier Curator)</option>
                    <option>Isabella Rao (London Linen Specialist)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0E2F76] hover:bg-[#1a4497] text-white text-xs font-bold tracking-widest rounded-lg uppercase mt-4 transition-transform hover:scale-[1.01] shadow-lg cursor-pointer"
                >
                  Confirm Styling Sessions Booking
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
