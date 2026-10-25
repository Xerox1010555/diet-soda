export interface Flavor {
  id: 'classic' | 'lime';
  name: string;
  tagline: string;
  price: number;
  modelUrl: string;
  textureUrl: string;
  posterUrl: string;
  accentColor: string;
  bgGradient: {
    inner: string;
    mid: string;
    outer: string;
  };
  berryModelUrl: string;
}

export interface Review {
  id: string;
  stars: 5;
  quote: string;
  author: {
    name: string;
    role: string;
    initial: string;
  };
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CTAConfig {
  primary: string;
  secondary: string;
  shopUrl: string;
  contactUrl: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  ogImage: string;
  twitterCard: 'summary_large_image';
}

export interface BrandConfig {
  name: string;
  logoSvg: string;
  tagline: string;
}

export interface SiteConfig {
  brand: BrandConfig;
  flavors: Flavor[];
  features: Feature[];
  reviews: Review[];
  cta: CTAConfig;
  seo: SEOConfig;
}

export type FlavorState = 'idle' | 'preloading' | 'transitioning' | 'ready';

export type FlavorEvent =
  | { type: 'SWITCH'; flavorId: string }
  | { type: 'MODEL_READY' }
  | { type: 'TEXTURES_READY' }
  | { type: 'ANIMATION_COMPLETE' };

export interface FlavorContext {
  currentFlavor: Flavor;
  targetFlavor: Flavor | null;
  textures: Map<string, unknown>;
}