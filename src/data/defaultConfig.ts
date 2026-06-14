import { StudioConfig } from '../types';

export const initialStudioConfig: StudioConfig = {
  hero: {
    title: "ELEVATE YOUR STYLE WITH VELIQUE",
    subtitle: "Luxury boutique collections curated for confidence, elegance, and timeless beauty. Handcrafted silhouettes designed uniquely for your style statement.",
    mainButtonText: "Explore Collection",
    secondaryButtonText: "Book Styling Session",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200",
    floatingProduct: {
      name: "Powder Blue Dress",
      price: "₹4,899",
      imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400",
      tag: "TRENDING"
    }
  },
  categories: [
    {
      id: "cat-1",
      title: "WOMEN'S WEAR",
      count: "120+ Items",
      imageUrl: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-2",
      title: "PARTY WEAR",
      count: "84 Items",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-3",
      title: "ETHNIC",
      count: "65 Items",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-4",
      title: "CASUAL",
      count: "95 Items",
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-5",
      title: "PREMIUM COLLECTION",
      count: "50 Items",
      imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-6",
      title: "BRIDAL",
      count: "40 Items",
      imageUrl: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=600"
    }
  ],
  products: [
    {
      id: "prod-1",
      name: "Floral Breeze Dress",
      price: 3599,
      description: "Breathable powder blue floral dress, featuring hand-pleated details, soft premium fabric, and an elegant waist sash.",
      imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600",
      isNew: true,
      category: "cat-1"
    },
    {
      id: "prod-2",
      name: "Elegant Co-ord Set",
      price: 3299,
      description: "Crisp linen co-ord set in modern neutral slate tones. Includes wide-leg trousers and a structured summer blazer.",
      imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
      isNew: true,
      category: "cat-4"
    },
    {
      id: "prod-3",
      name: "Royal Blue Gown",
      price: 5699,
      description: "Graceful rich royal blue velvet gown with an elegant neckline, dynamic slit, and custom hand embroidery on shoulder accents.",
      imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600",
      isNew: false,
      category: "cat-2"
    },
    {
      id: "prod-4",
      name: "Linen Relaxed Shirt",
      price: 2199,
      description: "Pre-washed premium linen shirt. Oversized, structured fit with shell-button embellishments for standard casual elegance.",
      imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
      isNew: false,
      category: "cat-4"
    },
    {
      id: "prod-5",
      name: "Chic Wrap Dress",
      price: 3099,
      description: "Soft powder blue linen wrap dress with breathable sleeves and adjustable back tie. Extremely elegant and comfortable.",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
      isNew: true,
      category: "cat-1"
    },
    {
      id: "prod-6",
      name: "Embroidered Kurta",
      price: 2799,
      description: "Handcrafted ethnic kurta in ice white, featuring royal blue fine threads, breathable organic cotton, and stylish side slits.",
      imageUrl: "https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=600",
      isNew: false,
      category: "cat-3"
    }
  ],
  features: [
    {
      id: "feat-1",
      title: "PREMIUM FABRICS",
      description: "We use only the finest handpicked silks, linens, and cashmeres for unmatched comfort, luxury, and quality.",
      iconName: "Sparkles"
    },
    {
      id: "feat-2",
      title: "HANDPICKED DESIGNS",
      description: "Every single garment is sourced and curated to bring you a unique, timeless, and limited-edition look.",
      iconName: "Compass"
    },
    {
      id: "feat-3",
      title: "TREND FORWARD FASHION",
      description: "Stay ahead of seasonal luxury styles with new limited drops curated by global fashion specialists.",
      iconName: "Flame"
    },
    {
      id: "feat-4",
      title: "PERSONAL STYLING",
      description: "Work directly with our concierge style specialists to complete coordinate ensembles and personalized sizes.",
      iconName: "Gift"
    }
  ],
  parallaxBanner: {
    text: "WE DON'T FOLLOW TRENDS\nWE DEFINE THEM",
    subText: "Discover high couture defined by premium craftsmanship and modern details.",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
    buttonText: "DISCOVER MORE"
  },
  collections: [
    {
      id: "coll-1",
      title: "SUMMER LUXE",
      subtitle: "LIGHT, BREEZY & TIMELESS SILHOUETTES",
      imageUrl: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "coll-2",
      title: "WEDDING COLLECTION",
      subtitle: "ELEGANCE IN EVERY SINGLE THREAD",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "coll-3",
      title: "PREMIUM CASUAL",
      subtitle: "COMFORT MEETS LUXURY RESORTWEAR",
      imageUrl: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "coll-4",
      title: "DESIGNER PICKS",
      subtitle: "CURATED FOR YOU BY INTERNATIONAL EXPERTS",
      imageUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600"
    }
  ],
  lookbookList: [
    {
      id: "look-1",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
      type: "photo",
      title: "Azure Breeze Co-Ord Look"
    },
    {
      id: "look-2",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
      type: "video",
      title: "Symphony Couture Collection Reel"
    },
    {
      id: "look-3",
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
      type: "photo",
      title: "Sunkissed Linen Summer Style"
    },
    {
      id: "look-4",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      type: "photo",
      title: "Onyx Evening Gala Elegance"
    }
  ],
  limitedEdition: {
    title: "EXCLUSIVE PIECES AVAILABLE FOR A LIMITED TIME",
    subtitle: "Own our custom hand-crafted regal velvet evening gown at premium release price. Only 5 pieces manufactured worldwide.",
    countdownDate: "2026-10-31T23:59:59",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200",
    buttonText: "SHOP LIMITED EDITION"
  },
  testimonials: [
    {
      id: "test-1",
      name: "PRIYA MEHTA",
      review: "Velique Studios never disappoints! The drape and weight of their silk fabrics are completely premier. The customer service and custom fitting process took my styling experience to a brand new level.",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      rating: 5
    },
    {
      id: "test-2",
      name: "NEHA SHARMA",
      review: "Absolutely loved my purchase! The custom embroidery thread-work is stunningly delicate and the fitting feels like actual haute couture. Highly recommended boutique!",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      rating: 5
    },
    {
      id: "test-3",
      name: "ANANYA SINGH",
      review: "My go-to boutique for custom styling or party events. Love their unique palette and commitment to high-end sustainable linen fabrics. A pristine shopping experience.",
      photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150",
      rating: 5
    }
  ],
  story: {
    title: "OUR STORY",
    description: "Velique Studios was founded with a profound vision: to bridge premium, stylish, and timeless bespoke fashion for modern women. From initial sketch to physical tailoring, every collection blend classic elegance, premium modern minimalism, and the dynamic spirit of organic linens, luxurious silks, and rich cottons.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    timeline: [
      {
        year: "2020",
        title: "THE GENESIS",
        description: "Founded with a passion for custom styling and premium linen tailoring on a slow-fashion retreat."
      },
      {
        year: "2021",
        title: "FIRST COUTURE DROPS",
        description: "Launched exclusive limited seasonal collections, receiving remarkable acclaim for high-fashion elegance."
      },
      {
        year: "2022",
        title: "GLOBO PRESTIGE",
        description: "Opened our physical design atelier, trusted by thousands of happy styling customers worldwide."
      },
      {
        year: "2024",
        title: "THE SUSTAINABLE STEP",
        description: "Continuing to redefine luxury boutique wear with 100% natural fabrics and ethical production."
      }
    ]
  },
  brand: {
    phone: "+91 88765 43210",
    address: "123, Fashion Street, Colaba, Mumbai, India - 400001",
    email: "hello@velique.studio",
    instagram: "https://instagram.com/velique.studio",
    whatsapp: "https://wa.me/918876543210",
    offerTickerTexts: [
      "FREE STYLING SESSIONS",
      "EXCLUSIVE ARRIVALS ONLINE NOW",
      "FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹4,999",
      "HANDMADE LIMITED DROPS"
    ]
  }
};
