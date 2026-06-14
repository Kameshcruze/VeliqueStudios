import React, { useState } from 'react';
import { ProductItem, CategoryCard } from '../types';
import { Heart, ShoppingBag, Eye, X, Star, Share2 } from 'lucide-react';

interface NewArrivalsProps {
  products: ProductItem[];
  categories: CategoryCard[];
  selectedCategory: string | null;
  onAddToCart: (item: ProductItem, selectedSize: string) => void;
  onToggleWishlist: (item: ProductItem) => void;
  wishlistIds: string[];
}

export default function NewArrivals({
  products,
  categories,
  selectedCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}: NewArrivalsProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [size, setSize] = useState<string>('M');
  const [justAdded, setJustAdded] = useState<string | null>(null);

  // Filter products by active category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const handleAddToCartClick = (prod: ProductItem, sizeChoice: string) => {
    onAddToCart(prod, sizeChoice);
    setJustAdded(prod.id);
    setTimeout(() => setJustAdded(null), 1800);
  };

  return (
    <section id="new-arrivals-section" className="py-20 bg-[#F4FEFF]/40 scroll-mt-10 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#5A7EBA] uppercase">Pinterest Style Drop</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2F76] font-medium tracking-tight">
              NEW ARRIVALS
            </h2>
            <p className="text-xs text-neutral-500 max-w-sm font-sans pt-1">
              Handpicked pieces designed for absolute comfort, elegance, and premium boutique beauty.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-neutral-400 uppercase">Showing ({filteredProducts.length}) Items</span>
          </div>
        </div>

        {/* Product Pinterest Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const isWishlisted = wishlistIds.includes(p.id);
            const activeCategoryTitle = categories.find((c) => c.id === p.category)?.title || "PREMIUM";

            return (
              <div
                key={p.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-md group transform transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl relative"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden">
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                    {p.isNew && (
                      <span className="bg-[#0E2F76] text-[#F4FEFF] text-[8px] font-black font-mono tracking-widest px-3 py-1 rounded-full uppercase shadow-sm">
                        NEW DROP
                      </span>
                    )}
                    <span className="bg-white/90 text-[#0E2F76] text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase shadow-neutral-100/40">
                      {activeCategoryTitle.replace(' WOMEN\'S WEAR', '')}
                    </span>
                  </div>

                  {/* Wishlist Trigger */}
                  <button
                    onClick={() => onToggleWishlist(p)}
                    aria-label="Add to Wishlist"
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 text-[#0E2F76] hover:bg-[#0E2F76] hover:text-white transition-all shadow-md cursor-pointer"
                  >
                    <Heart
                      className={`h-4 w-4 stroke-[2] ${
                        isWishlisted ? 'fill-red-500 stroke-red-500 animate-scale' : 'hover:scale-110'
                      }`}
                    />
                  </button>

                  {/* Real Image */}
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-101 transition-transform duration-1000 group-hover:scale-[1.07]"
                  />

                  {/* Hover Luxury Action Overlay */}
                  <div className="absolute inset-0 bg-[#0E2F76]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3">
                    
                    {/* Quick view button */}
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setSize('M');
                      }}
                      className="p-3 bg-white text-[#0E2F76] rounded-full hover:bg-[#F4FEFF] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg cursor-pointer flex items-center gap-1 text-xs font-bold font-sans uppercase"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Quick View</span>
                    </button>

                    {/* Add to Cart Directly (Size M default) */}
                    <button
                      onClick={() => handleAddToCartClick(p, 'M')}
                      className="px-6 py-2.5 bg-white text-[#0E2F76] rounded-full hover:bg-[#0E2F76] hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 shadow-lg cursor-pointer text-[10px] font-bold font-sans tracking-wider uppercase flex items-center gap-1.5"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>{justAdded === p.id ? 'ADDED TO BAG' : 'ADD SIZE M'}</span>
                    </button>
                  </div>
                </div>

                {/* Product Detail Footer */}
                <div className="p-5 flex flex-col flex-1 bg-white justify-between relative">
                  <div>
                    <h3 className="font-serif text-lg text-[#0E2F76] font-medium tracking-tight group-hover:text-[#5A7EBA] transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 mt-1.5 leading-relaxed font-sans">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                    <span className="text-md font-bold text-neutral-800 font-mono">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                    
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setSize('M');
                      }}
                      className="text-[10px] font-bold text-[#5A7EBA] group-hover:text-[#0E2F76] uppercase tracking-widest flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>DETAILS & ASSISTANCE</span>
                    </button>
                  </div>

                  {/* Added notification indicator overlay */}
                  {justAdded === p.id && (
                    <div className="absolute inset-0 bg-emerald-500/90 text-white flex items-center justify-center text-xs font-bold tracking-widest uppercase transition-opacity duration-300 rounded-b-2xl">
                      <ShoppingBag className="h-4 w-4 mr-2 animate-bounce" /> Correctly Added to Luxury Bag
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Catalog Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-neutral-200">
            <ShoppingBag className="h-10 w-10 mx-auto text-neutral-300 mb-3" />
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">No Drops Available In This Category Currently</span>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">Click &quot;ALL COUTURE&quot; or replace items using the Boutique customizer.</p>
          </div>
        )}

      </div>

      {/* QUICK VIEW DETAILS MODAL overlay */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedProduct(null)} />

          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
            
            {/* Modal Image */}
            <div className="relative aspect-[3/4] md:aspect-auto bg-neutral-100">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {selectedProduct.isNew && (
                <span className="absolute top-4 left-4 bg-[#0E2F76] text-white text-[8px] font-black font-mono tracking-widest px-3 py-1 rounded-full uppercase shadow-sm">
                  NEW DROP
                </span>
              )}
            </div>

            {/* Modal details information */}
            <div className="p-6 sm:p-8 flex flex-col justify-between relative bg-[#F4FEFF]/40">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-[#0E2F76] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-[#5A7EBA] uppercase">Velique Premium Atelier</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#0E2F76] font-medium leading-tight">
                  {selectedProduct.name}
                </h3>
                
                <span className="inline-block text-xl font-bold font-mono text-neutral-800">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>

                <div className="flex items-center gap-1 text-xs text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <span className="text-[10px] text-neutral-400 font-bold ml-1.5 uppercase font-mono">(5.0 Verifed Clients)</span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed font-sans pt-2">
                  {selectedProduct.description}
                </p>

                {/* Fabric Information Tag list */}
                <div className="pt-2">
                  <span className="text-[9px] font-bold text-[#5A7EBA] uppercase tracking-widest block mb-2">COMPOSITION DETAILS</span>
                  <div className="flex gap-1.5 flex-wrap italic text-[11px] text-neutral-500">
                    <span className="px-2.5 py-1 bg-[#A9C0E0]/15 rounded-md border border-[#A9C0E0]/20">100% Organic Fibers</span>
                    <span className="px-2.5 py-1 bg-[#A9C0E0]/15 rounded-md border border-[#A9C0E0]/20">Hand Embroidery</span>
                    <span className="px-2.5 py-1 bg-[#A9C0E0]/15 rounded-md border border-[#A9C0E0]/20">Pre-washed Softness</span>
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-neutral-700 tracking-wider">
                    <span>SELECTION SIZE</span>
                    <span className="text-[#5A7EBA] underline cursor-pointer">SIZE ASSISTANCE</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['S', 'M', 'L', 'XL'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`py-2 text-xs font-mono font-bold rounded-lg transition border cursor-pointer ${
                          size === s
                            ? 'bg-[#0E2F76] text-white border-[#0E2F76] shadow-sm'
                            : 'bg-white text-[#0E2F76] border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add To Cart */}
              <div className="pt-6 space-y-2.5">
                <button
                  onClick={() => {
                    handleAddToCartClick(selectedProduct, size);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-4 bg-[#0E2F76] text-white hover:bg-[#1a4497] rounded-xl font-bold text-xs tracking-widest uppercase transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>ADD SIZE {size} TO COUTURE BAG</span>
                </button>
                
                <div className="flex justify-center gap-5 text-[10px] font-bold text-[#5A7EBA] uppercase tracking-widest pt-1">
                  <button
                    onClick={() => {
                      onToggleWishlist(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex items-center gap-1 hover:text-[#0E2F76] cursor-pointer"
                  >
                    <Heart className="h-3 w-3" />
                    <span>Wishlist Item</span>
                  </button>
                  <span className="text-neutral-200">|</span>
                  <button className="flex items-center gap-1 hover:text-[#0E2F76] cursor-pointer">
                    <Share2 className="h-3 w-3" />
                    <span>Concierge Assistance</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
