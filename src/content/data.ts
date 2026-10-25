import type { SiteConfig } from './config';

export const siteConfig: SiteConfig = {
  brand: {
    name: 'Soda',
    logoSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    tagline: 'Pure Zero Refreshment',
  },
  flavors: [
    {
      id: 'classic',
      name: 'Diet Classic',
      tagline: 'Pure Zero',
      price: 2.99,
      modelUrl: '/assets/models/diet_soda2.glb',
      textureUrl: '/assets/textures/green_base_color.webp',
      posterUrl: '/assets/images/green_soda.webp',
      accentColor: '#fbcfe8',
      bgGradient: {
        inner: '#0b8a78',
        mid: '#044e3b',
        outer: '#011411',
      },
      berryModelUrl: '/assets/models/cherry.glb',
    },
    {
      id: 'lime',
      name: 'Zero Lime',
      tagline: 'Refreshingly Clean',
      price: 2.99,
      modelUrl: '/assets/models/diet_soda2.glb',
      textureUrl: '/assets/textures/blue_base_color.webp',
      posterUrl: '/assets/images/blue_soda.webp',
      accentColor: '#a5d8ff',
      bgGradient: {
        inner: '#0b4f8a',
        mid: '#04294e',
        outer: '#010c14',
      },
      berryModelUrl: '/assets/models/blueberry.glb',
    },
  ],
  features: [
    {
      id: 'zero-sugar',
      icon: 'sparkle',
      title: 'Zero Sugar',
      description: 'Light, crisp taste without the heaviness of traditional soda.',
    },
    {
      id: 'natural-citrus',
      icon: 'leaf',
      title: 'Natural Citrus',
      description: 'Bright fruit notes balanced with clean carbonation and a premium finish.',
    },
    {
      id: 'premium-design',
      icon: 'award',
      title: 'Premium Design',
      description: 'Minimal lines, rich color, and a refined silhouette built for modern shelves.',
    },
  ],
  reviews: [
    {
      id: 'r1',
      stars: 5,
      quote: "The cleanest tasting zero-sugar soda I've had. It feels premium from the first sip.",
      author: { name: 'Ariana L.', role: 'Flavor reviewer', initial: 'A' },
    },
    {
      id: 'r2',
      stars: 5,
      quote: 'Refreshing, elegant, and so smooth. It has that boutique energy without trying too hard.',
      author: { name: 'Jonah M.', role: 'Product tester', initial: 'J' },
    },
    {
      id: 'r3',
      stars: 5,
      quote: 'A beautifully balanced soda that looks gorgeous and tastes even better than it looks.',
      author: { name: 'Kiera S.', role: 'Wellness editor', initial: 'K' },
    },
  ],
  cta: {
    primary: 'Shop Now',
    secondary: 'Explore Flavors',
    shopUrl: 'https://shop.example.com',
    contactUrl: 'mailto:hello@example.com?subject=Diet%20Soda%20Inquiry',
  },
  seo: {
    title: 'Diet Soda | Pure Zero Refreshment',
    description: 'Experience the crisp, clean taste of Diet Soda. Zero sugar, zero compromise.',
    ogImage: '/assets/images/og-default.webp',
    twitterCard: 'summary_large_image',
  },
};