import React, { useState } from 'react';
import { StudioConfig, CategoryCard, ProductItem, TestimonialItem, StoryTimelinePoint } from '../types';
import { X, Settings, Image as ImageIcon, Plus, Trash2, Edit, Save, RefreshCw, Layers, FileJson, ShoppingBag, Award, Heart, MessageSquare } from 'lucide-react';

interface AdminPanelProps {
  config: StudioConfig;
  onUpdateConfig: (newConfig: StudioConfig) => void;
  onReset: () => void;
}

export default function AdminPanel({ config, onUpdateConfig, onReset }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'categories' | 'products' | 'why' | 'countdown' | 'lookbook' | 'testimonials' | 'story' | 'json'>('hero');
  const [newText, setNewText] = useState('');

  // Local temp edits for add operations
  const [tempProduct, setTempProduct] = useState<Partial<ProductItem>>({
    name: '',
    price: 3000,
    category: 'cat-1',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400',
    isNew: true
  });

  const [tempReview, setTempReview] = useState<Partial<TestimonialItem>>({
    name: '',
    review: '',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  });

  const handleFieldChange = (section: keyof StudioConfig, field: string, value: any) => {
    onUpdateConfig({
      ...config,
      [section]: {
        ...(config[section] as any),
        [field]: value
      }
    });
  };

  const handleHeroNestedChange = (field: string, value: any) => {
    onUpdateConfig({
      ...config,
      hero: {
        ...config.hero,
        [field]: value
      }
    });
  };

  const handleFloatingProductChange = (field: string, value: any) => {
    onUpdateConfig({
      ...config,
      hero: {
        ...config.hero,
        floatingProduct: {
          ...config.hero.floatingProduct,
          [field]: value
        }
      }
    });
  };

  // Products CRUD
  const handleAddProduct = () => {
    if (!tempProduct.name) return alert('Please enter product name.');
    const newItem: ProductItem = {
      id: `prod-${Date.now()}`,
      name: tempProduct.name,
      price: Number(tempProduct.price) || 0,
      description: tempProduct.description || '',
      imageUrl: tempProduct.imageUrl || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400',
      isNew: !!tempProduct.isNew,
      category: tempProduct.category || 'cat-1'
    };

    onUpdateConfig({
      ...config,
      products: [newItem, ...config.products]
    });

    setTempProduct({
      name: '',
      price: 3000,
      category: 'cat-1',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400',
      isNew: true
    });
  };

  const handleDeleteProduct = (id: string) => {
    onUpdateConfig({
      ...config,
      products: config.products.filter(p => p.id !== id)
    });
  };

  // Categories edit
  const handleCategoryChange = (index: number, field: keyof CategoryCard, value: string) => {
    const updated = [...config.categories];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateConfig({ ...config, categories: updated });
  };

  // Collections edit
  const handleCollectionChange = (index: number, field: string, value: string) => {
    const updated = [...config.collections];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateConfig({ ...config, collections: updated });
  };

  // Features edit
  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updated = [...config.features];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateConfig({ ...config, features: updated });
  };

  // Timeline edit
  const handleTimelineChange = (index: number, field: keyof StoryTimelinePoint, value: string) => {
    const updatedTimeline = [...config.story.timeline];
    updatedTimeline[index] = { ...updatedTimeline[index], [field]: value };
    onUpdateConfig({
      ...config,
      story: {
        ...config.story,
        timeline: updatedTimeline
      }
    });
  };

  // Testimonial Add / Delete
  const handleAddReview = () => {
    if (!tempReview.name || !tempReview.review) return alert('Name and review content are required.');
    const newItem: TestimonialItem = {
      id: `test-${Date.now()}`,
      name: tempReview.name,
      review: tempReview.review,
      rating: Number(tempReview.rating) || 5,
      photoUrl: tempReview.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    };

    onUpdateConfig({
      ...config,
      testimonials: [...config.testimonials, newItem]
    });

    setTempReview({
      name: '',
      review: '',
      rating: 5,
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    });
  };

  const handleDeleteReview = (id: string) => {
    onUpdateConfig({
      ...config,
      testimonials: config.testimonials.filter(t => t.id !== id)
    });
  };

  // Import / Export JSON
  const [jsonText, setJsonText] = useState(JSON.stringify(config, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleJsonApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      // safety checks
      if (!parsed.hero || !parsed.categories || !parsed.products) {
        throw new Error("Invalid structure. Missing hero, categories, or products.");
      }
      onUpdateConfig(parsed);
      setJsonError(null);
      alert('Boutique layout updated successfully!');
    } catch (e: any) {
      setJsonError(e.message || 'Invalid JSON format');
    }
  };

  // Preset Layout Picker for quick luxury variations!
  const loadPreset = (theme: 'original' | 'serene' | 'regal') => {
    if (theme === 'original') {
      onReset();
      setJsonText(JSON.stringify(config, null, 2));
      alert('Loaded default "Velique Classic Blue" lookbook!');
      return;
    }

    const baseConfig = JSON.parse(JSON.stringify(config));
    if (theme === 'serene') {
      // Warm Earthy Linen look
      baseConfig.hero.title = "SERENE LUXURY FOR THE MIND & SOUL";
      baseConfig.hero.subtitle = "Unbleached and breathable certified eco-organic linen dresses and coordinates designed to flow through summer afternoons.";
      baseConfig.hero.imageUrl = "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=1200";
      baseConfig.hero.floatingProduct.name = "Oyster Resort Gown";
      baseConfig.hero.floatingProduct.price = "₹6,499";
      baseConfig.hero.floatingProduct.imageUrl = "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=400";
      baseConfig.parallaxBanner.text = "SLOW LIVING IS REAL COUTURE";
      baseConfig.parallaxBanner.buttonText = "THE EARTHY EDIT";
    } else if (theme === 'regal') {
      // Midnight Velvet Gala
      baseConfig.hero.title = "REGAL SILHOUETTES BY ROYAL DROP";
      baseConfig.hero.subtitle = "High-contrasting rich evening gown drapes, velvet structured coats, and exquisite gold-thread embroidery.";
      baseConfig.hero.imageUrl = "https://images.unsplash.com/photo-1518049368024-1f251c42eeaa?auto=format&fit=crop&q=80&w=1200";
      baseConfig.hero.floatingProduct.name = "Velvet Empress Slit Gown";
      baseConfig.hero.floatingProduct.price = "₹12,800";
      baseConfig.hero.floatingProduct.imageUrl = "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=400";
      baseConfig.parallaxBanner.text = "WE SHAPE NIGHTS AND DREAMS";
    }

    onUpdateConfig(baseConfig);
    setJsonText(JSON.stringify(baseConfig, null, 2));
    alert(`Successfully loaded the ${theme.toUpperCase()} luxury theme preset!`);
  };

  return (
    <>
      {/* Floating Manager Badge */}
      <button
        id="btn-admin-config"
        onClick={() => {
          setIsOpen(true);
          setJsonText(JSON.stringify(config, null, 2));
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#0E2F76] px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#1a4497] border border-[#A9C0E0]/30 cursor-pointer"
      >
        <Settings className="h-4 w-4 animate-spin-slow" />
        <span>Boutique Control Panel</span>
      </button>

      {/* Slide-out Edit Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs select-none">
          {/* Backdrop Click */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-neutral-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-[#F4FEFF]">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#0E2F76]" />
                <div>
                  <h2 className="text-md font-bold text-[#0E2F76] tracking-wider font-sans">VELIQUE STUDIOS ADM</h2>
                  <p className="text-xs text-[#5A7EBA] -mt-0.5">Live Boutique Customizer & State Manager</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Themes Presets */}
            <div className="px-6 py-3 bg-neutral-50 grid grid-cols-3 gap-2 border-b border-neutral-100">
              <button
                onClick={() => loadPreset('original')}
                className="text-xs font-semibold py-1.5 px-2 text-[#0E2F76] bg-white border border-[#0E2F76]/20 rounded-md shadow-xs hover:bg-neutral-50 text-center cursor-pointer"
              >
                Classic Powder Blue
              </button>
              <button
                onClick={() => loadPreset('serene')}
                className="text-xs font-semibold py-1.5 px-2 text-amber-900 bg-amber-50 border border-amber-900/20 rounded-md shadow-xs hover:bg-amber-100 text-center cursor-pointer"
              >
                Serene Pure Linen
              </button>
              <button
                onClick={() => loadPreset('regal')}
                className="text-xs font-semibold py-1.5 px-2 text-indigo-900 bg-indigo-50 border border-indigo-900/20 rounded-md shadow-xs hover:bg-indigo-100 text-center cursor-pointer"
              >
                Regal Midnight Gowns
              </button>
            </div>

            {/* Sub Tabs Navigation */}
            <div className="flex bg-neutral-100 border-b border-neutral-200 overflow-x-auto text-[11px] font-bold text-neutral-600 uppercase scrollbar-none whitespace-nowrap">
              <button
                onClick={() => setActiveTab('hero')}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'hero' ? 'border-[#0E2F76] text-[#0E2F76] bg-white' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
              >
                Hero & Brand
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'categories' ? 'border-[#0E2F76] text-[#0E2F76] bg-white' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'products' ? 'border-[#0E2F76] text-[#0E2F76] bg-white' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
              >
                Inventory ({config.products.length})
              </button>
              <button
                onClick={() => setActiveTab('why')}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'why' ? 'border-[#0E2F76] text-[#0E2F76] bg-white' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('countdown')}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'countdown' ? 'border-[#0E2F76] text-[#0E2F76] bg-white' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
              >
                Promo Timer
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'testimonials' ? 'border-[#0E2F76] text-[#0E2F76] bg-white' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('story')}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'story' ? 'border-[#0E2F76] text-[#0E2F76] bg-white' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
              >
                Story
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'json' ? 'border-[#0E2F76] text-[#0E2F76] bg-white' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
              >
                JSON IO
              </button>
            </div>

            {/* Config Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB — HERO */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0E2F76] uppercase tracking-wider mb-2">Section 1: Hero Landing Configurations</h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">Large Luxury Heading</label>
                    <textarea
                      value={config.hero.title}
                      onChange={(e) => handleHeroNestedChange('title', e.target.value)}
                      className="w-full text-sm border border-neutral-300 rounded-md p-2 focus:ring-1 focus:ring-[#0E2F76] outline-none"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">Premium Subtitle</label>
                    <textarea
                      value={config.hero.subtitle}
                      onChange={(e) => handleHeroNestedChange('subtitle', e.target.value)}
                      className="w-full text-sm border border-neutral-300 rounded-md p-2 focus:ring-1 focus:ring-[#0E2F76] outline-none"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">Primary CTA Button</label>
                      <input
                        type="text"
                        value={config.hero.mainButtonText}
                        onChange={(e) => handleHeroNestedChange('mainButtonText', e.target.value)}
                        className="w-full text-sm border border-neutral-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">Secondary CTA Button</label>
                      <input
                        type="text"
                        value={config.hero.secondaryButtonText}
                        onChange={(e) => handleHeroNestedChange('secondaryButtonText', e.target.value)}
                        className="w-full text-sm border border-neutral-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">Hero Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.hero.imageUrl}
                        onChange={(e) => handleHeroNestedChange('imageUrl', e.target.value)}
                        className="w-full text-sm border border-neutral-300 rounded-md p-2 outline-none text-[11px]"
                      />
                      <span className="flex items-center justify-center bg-neutral-100 p-2 border border-neutral-300 rounded-md">
                        <ImageIcon className="h-4 w-4 text-neutral-600" />
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">Provide an Unsplash web link or reference to change the main hero visual.</p>
                  </div>

                  {/* Floating Product Card Settings */}
                  <div className="p-4 border border-[#A9C0E0]/30 bg-[#F4FEFF] rounded-lg mt-4 space-y-3">
                    <h4 className="text-xs font-bold text-[#0E2F76] tracking-wider uppercase flex items-center gap-1">
                      <ShoppingBag className="h-3 w-3" /> Floating Featured Product Overlay
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-neutral-600">Product Name</label>
                        <input
                          type="text"
                          value={config.hero.floatingProduct.name}
                          onChange={(e) => handleFloatingProductChange('name', e.target.value)}
                          className="w-full text-xs border border-neutral-300 rounded p-1"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-neutral-600">Price tag</label>
                        <input
                          type="text"
                          value={config.hero.floatingProduct.price}
                          onChange={(e) => handleFloatingProductChange('price', e.target.value)}
                          className="w-full text-xs border border-neutral-300 rounded p-1"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-neutral-600">Highlight Tag</label>
                        <input
                          type="text"
                          value={config.hero.floatingProduct.tag}
                          onChange={(e) => handleFloatingProductChange('tag', e.target.value)}
                          className="w-full text-xs border border-neutral-300 rounded p-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-neutral-600">Image URL</label>
                      <input
                        type="text"
                        value={config.hero.floatingProduct.imageUrl}
                        onChange={(e) => handleFloatingProductChange('imageUrl', e.target.value)}
                        className="w-full text-xs border border-neutral-300 rounded p-1 text-[10px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB — CATEGORIES */}
              {activeTab === 'categories' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0E2F76] uppercase tracking-wider mb-2">Section 2: Shop By Category</h3>
                  <p className="text-xs text-neutral-500 mb-2">Edit matching rounded category images, labels, and stock counters smoothly.</p>
                  
                  <div className="space-y-4">
                    {config.categories.map((cat, i) => (
                      <div key={cat.id} className="p-3 border border-neutral-100 rounded-lg bg-neutral-50/50 space-y-2">
                        <div className="flex gap-2 justify-between">
                          <span className="text-xs font-bold text-[#0E2F76]">Category #{i + 1}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-neutral-500 uppercase">Category Title</label>
                            <input
                              type="text"
                              value={cat.title}
                              onChange={(e) => handleCategoryChange(i, 'title', e.target.value)}
                              className="w-full text-xs border border-neutral-300 rounded p-1 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-neutral-500 uppercase">Item Count/Label</label>
                            <input
                              type="text"
                              value={cat.count}
                              onChange={(e) => handleCategoryChange(i, 'count', e.target.value)}
                              className="w-full text-xs border border-neutral-300 rounded p-1"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-neutral-500 uppercase">Image URL (portrait 3:4 ideally)</label>
                          <input
                            type="text"
                            value={cat.imageUrl}
                            onChange={(e) => handleCategoryChange(i, 'imageUrl', e.target.value)}
                            className="w-full text-[10px] border border-neutral-300 rounded p-1 text-neutral-600 focus:bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB — PRODUCTS */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-[#0E2F76] uppercase tracking-wider mb-2">Section 3: Product Inventory drop-list</h3>
                    <p className="text-xs text-neutral-500">Insert custom premium clothing or edit pricing below to test interactive checkout filters!</p>
                  </div>

                  {/* Add New Product Form */}
                  <div className="p-4 border border-[#0E2F76]/20 bg-[#F4FEFF] rounded-xl space-y-3">
                    <h4 className="text-xs font-bold text-[#0E2F76] uppercase flex items-center gap-1">
                      <Plus className="h-4 w-4" /> Add Premium Gown/Item To Drop
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-600">Product Name</label>
                        <input
                          type="text"
                          value={tempProduct.name}
                          onChange={(e) => setTempProduct({ ...tempProduct, name: e.target.value })}
                          className="w-full text-xs border border-neutral-300 rounded p-1.5 bg-white"
                          placeholder="e.g. Amber Silk Wrap Gown"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-600">Price (INR ₹)</label>
                        <input
                          type="number"
                          value={tempProduct.price}
                          onChange={(e) => setTempProduct({ ...tempProduct, price: Number(e.target.value) })}
                          className="w-full text-xs border border-neutral-300 rounded p-1.5 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-600">Category Tag</label>
                        <select
                          value={tempProduct.category}
                          onChange={(e) => setTempProduct({ ...tempProduct, category: e.target.value })}
                          className="w-full text-xs border border-neutral-300 rounded p-1.5 bg-white"
                        >
                          {config.categories.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 mt-4 pl-1">
                        <input
                          type="checkbox"
                          id="is-new-chk"
                          checked={tempProduct.isNew}
                          onChange={(e) => setTempProduct({ ...tempProduct, isNew: e.target.checked })}
                          className="rounded border-neutral-300"
                        />
                        <label htmlFor="is-new-chk" className="text-[10px] font-bold text-neutral-600 uppercase">Apply &quot;New Arrival&quot; Ribbon</label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-600">Item Image URL</label>
                      <input
                        type="text"
                        value={tempProduct.imageUrl}
                        onChange={(e) => setTempProduct({ ...tempProduct, imageUrl: e.target.value })}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5 bg-white text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-600">Boutique Description</label>
                      <textarea
                        value={tempProduct.description}
                        onChange={(e) => setTempProduct({ ...tempProduct, description: e.target.value })}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5 bg-white"
                        placeholder="Tell a luxury fashion story about fabrics or drape..."
                        rows={2}
                      />
                    </div>

                    <button
                      onClick={handleAddProduct}
                      className="w-full text-xs py-2 bg-[#0E2F76] text-white hover:bg-[#1a4497] font-bold rounded-lg transition-transform hover:scale-[1.02] cursor-pointer"
                    >
                      Publish Item To Catalog
                    </button>
                  </div>

                  {/* Active List with simple delete/edit overview */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-neutral-700 uppercase">Currently Live Drops ({config.products.length})</h4>
                    
                    <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-lg overflow-hidden bg-white shadow-xs">
                      {config.products.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 group">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.imageUrl}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="h-12 w-10 object-cover rounded shadow-xs"
                            />
                            <div>
                              <h5 className="text-xs font-bold text-neutral-800">{p.name}</h5>
                              <p className="text-[10px] text-neutral-500">₹{p.price.toLocaleString('en-IN')} | Cat: {config.categories.find(c => c.id === p.category)?.title || 'Custom'}</p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1 px-2.5 rounded-md hover:bg-red-50 text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB — FEATURES */}
              {activeTab === 'why' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0E2F76] uppercase tracking-wider mb-2">Section 4 — Why Velique Trust Points</h3>
                  <p className="text-xs text-neutral-500 mb-2">Customize core quality descriptors representing fabrications or style concierge perks.</p>
                  
                  {config.features.map((feat, idx) => (
                    <div key={feat.id} className="p-4 border border-neutral-100 rounded-lg bg-neutral-50 space-y-2">
                      <span className="text-xs font-bold text-[#0E2F76]">Point Key: {feat.title}</span>
                      <div>
                        <label className="block text-[9px] uppercase text-neutral-500 font-bold mb-1">Title</label>
                        <input
                          type="text"
                          value={feat.title}
                          onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                          className="w-full text-xs font-bold border border-neutral-300 rounded p-1"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase text-neutral-500 font-bold mb-1">Description</label>
                        <textarea
                          value={feat.description}
                          onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                          className="w-full text-xs border border-neutral-300 rounded p-1"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB — PROMO COUNTDOWN */}
              {activeTab === 'countdown' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0E2F76] uppercase tracking-wider mb-2">Banners &amp; Time Limit configuration</h3>
                  
                  {/* Parallax Content */}
                  <div className="p-4 border border-[#A9C0E0]/30 rounded-lg bg-[#F4FEFF] space-y-3">
                    <h4 className="text-xs font-bold text-[#0E2F76] uppercase">Section 5 Parallax Highlight Text</h4>
                    <div>
                      <label className="block text-[10px] text-neutral-500">Main Banner Quote</label>
                      <textarea
                        value={config.parallaxBanner.text}
                        onChange={(e) => handleFieldChange('parallaxBanner', 'text', e.target.value)}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5 focus:bg-white"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500">Highlight statement</label>
                      <input
                        type="text"
                        value={config.parallaxBanner.subText}
                        onChange={(e) => handleFieldChange('parallaxBanner', 'subText', e.target.value)}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500">Action Button text</label>
                      <input
                        type="text"
                        value={config.parallaxBanner.buttonText}
                        onChange={(e) => handleFieldChange('parallaxBanner', 'buttonText', e.target.value)}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500">Image URL</label>
                      <input
                        type="text"
                        value={config.parallaxBanner.imageUrl}
                        onChange={(e) => handleFieldChange('parallaxBanner', 'imageUrl', e.target.value)}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5 text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Section 8 Countdown */}
                  <div className="p-4 border border-[#0E2F76]/15 rounded-lg bg-white space-y-3">
                    <h4 className="text-xs font-bold text-[#0E2F76] uppercase">Section 8: Limited Drops Countdown configuration</h4>
                    <div>
                      <label className="block text-[10px] text-neutral-500">Heading Title</label>
                      <input
                        type="text"
                        value={config.limitedEdition.title}
                        onChange={(e) => handleFieldChange('limitedEdition', 'title', e.target.value)}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500 font-semibold mb-0.5">Target Countdown Date (ISO String or YYYY-MM-DDTHH:mm:ss)</label>
                      <input
                        type="text"
                        value={config.limitedEdition.countdownDate}
                        onChange={(e) => handleFieldChange('limitedEdition', 'countdownDate', e.target.value)}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5 font-mono"
                        placeholder="2026-12-31T23:59:59"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500">Image Gown URL</label>
                      <input
                        type="text"
                        value={config.limitedEdition.imageUrl}
                        onChange={(e) => handleFieldChange('limitedEdition', 'imageUrl', e.target.value)}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5 text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500">Description text</label>
                      <textarea
                        value={config.limitedEdition.subtitle}
                        onChange={(e) => handleFieldChange('limitedEdition', 'subtitle', e.target.value)}
                        className="w-full text-xs border border-neutral-300 rounded p-1.5 focus:bg-white"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB — TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0E2F76] uppercase tracking-wider mb-2">Section 9: Reviews</h3>
                  
                  {/* Reviews Add Form */}
                  <div className="p-3 border border-neutral-200 rounded-lg bg-neutral-50 space-y-2">
                    <span className="text-xs font-bold text-[#0E2F76]">Add a custom verified styling comment</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={tempReview.name}
                        onChange={(e) => setTempReview({ ...tempReview, name: e.target.value })}
                        className="text-xs border border-neutral-300 rounded p-1 bg-white"
                      />
                      <input
                        type="number"
                        placeholder="Stars (1 to 5)"
                        max={5}
                        min={1}
                        value={tempReview.rating}
                        onChange={(e) => setTempReview({ ...tempReview, rating: Number(e.target.value) })}
                        className="text-xs border border-neutral-300 rounded p-1 bg-white"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Verified review message..."
                        value={tempReview.review}
                        onChange={(e) => setTempReview({ ...tempReview, review: e.target.value })}
                        className="w-full text-xs border border-neutral-300 rounded p-1 bg-white"
                        rows={2}
                      />
                    </div>
                    <button
                      onClick={handleAddReview}
                      className="w-full text-xs py-1.5 bg-[#0E2F76] text-white hover:bg-[#1a4497] rounded font-semibold cursor-pointer"
                    >
                      Post Review
                    </button>
                  </div>

                  <div className="space-y-2">
                    {config.testimonials.map(item => (
                      <div key={item.id} className="p-3 border border-neutral-100 rounded-md bg-white shadow-xs flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-neutral-800">{item.name}</span>
                            <span className="text-amber-500 text-[10px]">{'★'.repeat(item.rating)}</span>
                          </div>
                          <p className="text-[10px] text-neutral-500 line-clamp-1 italic">“{item.review}”</p>
                        </div>
                        <button
                          onClick={() => handleDeleteReview(item.id)}
                          className="p-1 px-2.5 rounded hover:bg-neutral-50 text-red-500 transition cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB — STORY AND TIMELINE */}
              {activeTab === 'story' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0E2F76] uppercase tracking-wider mb-2">Section 10: Our Luxury story and Timeline</h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700">Studio Narrative Heading</label>
                    <input
                      type="text"
                      value={config.story.title}
                      onChange={(e) => handleFieldChange('story', 'title', e.target.value)}
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700">Biography Paragraph</label>
                    <textarea
                      value={config.story.description}
                      onChange={(e) => handleFieldChange('story', 'description', e.target.value)}
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-md focus:bg-white"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700">Featured Atelier Image</label>
                    <input
                      type="text"
                      value={config.story.imageUrl}
                      onChange={(e) => handleFieldChange('story', 'imageUrl', e.target.value)}
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-md font-mono"
                    />
                  </div>

                  {/* Timeline Edit */}
                  <div className="space-y-3 pt-2 border-t border-neutral-100">
                    <span className="text-xs font-bold text-[#0E2F76] uppercase">Bespoke Timeline Milestones</span>
                    {config.story.timeline.map((point, idx) => (
                      <div key={point.year} className="p-3 bg-neutral-50 rounded-lg space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-neutral-400">Year:</span>
                          <input
                            type="text"
                            value={point.year}
                            onChange={(e) => handleTimelineChange(idx, 'year', e.target.value)}
                            className="w-16 text-xs font-bold text-center border border-neutral-300 rounded"
                          />
                          <input
                            type="text"
                            value={point.title}
                            onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)}
                            className="flex-1 text-xs font-bold border border-neutral-300 rounded p-0.5"
                          />
                        </div>
                        <input
                          type="text"
                          value={point.description}
                          onChange={(e) => handleTimelineChange(idx, 'description', e.target.value)}
                          className="w-full text-xs text-neutral-500 border border-neutral-200 rounded p-0.5"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB — JSON EXPORTS */}
              {activeTab === 'json' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0E2F76] uppercase tracking-wider mb-2">Raw JSON Import & Export</h3>
                  <p className="text-xs text-neutral-500">
                    You can copy this JSON snapshot to share the boutique configuration, or paste code to load previous work!
                  </p>

                  {jsonError && (
                    <div className="text-xs bg-red-50 text-red-600 p-2 border border-red-200 rounded">
                      <strong>Format Error:</strong> {jsonError}
                    </div>
                  )}

                  <textarea
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    className="w-full h-80 text-[11px] font-mono border border-neutral-300 rounded p-2 focus:ring-1 focus:ring-[#0E2F76] outline-none"
                    rows={12}
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleJsonApply}
                      className="flex-1 text-xs py-2 bg-[#0E2F76] font-bold text-white rounded hover:bg-[#1a4497]"
                    >
                      Apply Layout Changes
                    </button>
                    <button
                      onClick={() => setJsonText(JSON.stringify(config, null, 2))}
                      className="px-3 text-xs py-2 bg-neutral-100 border border-neutral-300 rounded-md hover:bg-neutral-200 flex items-center justify-center gap-1 cursor-pointer font-bold"
                    >
                      <RefreshCw className="h-3 w-3" /> Sync Raw Code
                    </button>
                  </div>

                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-4 text-[11px] text-amber-900 leading-relaxed">
                    <strong>Note:</strong> Changes are cached in client-side local storage and persist instantly during your interactive sessions.
                  </div>
                </div>
              )}

            </div>

            {/* Footer buttons */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (confirm('Are you absolutely sure you want to restore original Velique boutique layout assets? All custom items will be cleared.')) {
                    onReset();
                    setJsonText(JSON.stringify(config, null, 2));
                    alert('Boutique resetting processed successfully!');
                  }
                }}
                className="text-xs py-2 px-4 border border-dashed border-red-300 text-red-500 hover:bg-red-50 hover:text-red-700 font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset Boutique Original</span>
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs py-2 px-6 bg-[#0E2F76] text-white hover:bg-[#1a4497] font-bold rounded-lg flex items-center gap-1 shadow-md cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Close &amp; View Luxury Live</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
