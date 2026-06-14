export interface FloatingProduct {
  name: string;
  price: string;
  imageUrl: string;
  tag: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  mainButtonText: string;
  secondaryButtonText: string;
  imageUrl: string;
  floatingProduct: FloatingProduct;
}

export interface CategoryCard {
  id: string;
  title: string;
  count: string;
  imageUrl: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isNew: boolean;
  category: string;
}

export interface WhyFeature {
  id: string;
  title: string;
  description: string;
  iconName: string; // matches Lucide icon names
}

export interface ParallaxBannerConfig {
  text: string;
  subText: string;
  imageUrl: string;
  buttonText: string;
}

export interface CollectionCard {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface LookbookItem {
  id: string;
  imageUrl: string;
  type: 'photo' | 'video';
  title: string;
}

export interface LimitedEditionConfig {
  title: string;
  subtitle: string;
  countdownDate: string; // format: YYYY-MM-DDTHH:mm:ss OR some date
  imageUrl: string;
  buttonText: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  review: string;
  photoUrl: string;
  rating: number;
}

export interface StoryTimelinePoint {
  year: string;
  title: string;
  description: string;
}

export interface OurStoryConfig {
  title: string;
  description: string;
  imageUrl: string;
  timeline: StoryTimelinePoint[];
}

export interface BrandConfig {
  phone: string;
  address: string;
  email: string;
  instagram: string;
  whatsapp: string;
  offerTickerTexts: string[];
}

export interface StudioConfig {
  hero: HeroConfig;
  categories: CategoryCard[];
  products: ProductItem[];
  features: WhyFeature[];
  parallaxBanner: ParallaxBannerConfig;
  collections: CollectionCard[];
  lookbookList: LookbookItem[];
  limitedEdition: LimitedEditionConfig;
  testimonials: TestimonialItem[];
  story: OurStoryConfig;
  brand: BrandConfig;
}
