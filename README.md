# Diet Soda - Premium Product Landing Page

A high-performance, accessible, and immersive 3D product landing page for a fictional premium zero-sugar beverage brand. Built with modern web technologies including Web Components, GSAP animations, and `<model-viewer>` for 3D/AR experiences.

## 🚀 Features

- **Immersive 3D Hero**: Interactive 3D product model with mouse parallax, flavor switching animations
- **Flavor Switching**: Seamless transition between "Diet Classic" (green) and "Zero Lime" (blue) themes
- **Dynamic Background**: Floating 3D berries, leaves, and bubble particles with physics-based animations
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Accessibility First**: WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly
- **Performance Optimized**: Code splitting, lazy loading, service worker, asset optimization
- **PWA Ready**: Installable, offline-capable with Workbox
- **Analytics Ready**: GA4 integration with custom events
- **TypeScript**: Full type safety throughout

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Build | Vite 5.x |
| Language | TypeScript 5.x |
| Components | Lit 3.x (Web Components) |
| 3D/AR | `<model-viewer>` 4.x (Google) |
| Animation | GSAP 3.x + ScrollTrigger |
| Styling | CSS Custom Properties + CSS Modules |
| Testing | Vitest (unit), Playwright (E2E + a11y) |
| PWA | Workbox + vite-plugin-pwa |
| Deployment | Cloudflare Pages / Vercel |

## 📁 Project Structure

```
diet-soda/
├── public/
│   ├── assets/
│   │   ├── models/          # .glb files (Draco compressed)
│   │   ├── textures/        # .webp texture maps
│   │   ├── images/          # .webp/.avif images
│   │   └── fonts/           # .woff2 self-hosted fonts
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── soda-header/     # Navigation header
│   │   ├── soda-hero/       # 3D hero section
│   │   ├── soda-carousel/   # Flavor carousel
│   │   ├── soda-story/      # Brand story
│   │   ├── soda-features/   # Feature grid
│   │   ├── soda-reviews/    # Testimonials
│   │   ├── soda-cta/        # Call to action
│   │   ├── soda-footer/     # Footer
│   │   ├── soda-berries/    # 3D berry particles
│   │   ├── soda-leaves/     # 3D leaf particles
│   │   └── soda-bubbles/    # Bubble particle system
│   ├── composables/
│   │   ├── useFlavorStore.ts    # Flavor state machine
│   │   ├── useModelViewer.ts    # Model viewer controller
│   │   ├── useParallax.ts       # Mouse parallax (Web Worker)
│   │   ├── useBubbles.ts        # Bubble particle system
│   │   └── useAnalytics.ts      # GA4 analytics
│   ├── content/
│   │   ├── config.ts      # TypeScript interfaces
│   │   └── data.ts        # Site content (CMS-ready)
│   ├── styles/
│   │   ├── tokens.css     # Design tokens
│   │   ├── global.css     # Global styles
│   │   └── animations.css # Keyframes & utilities
│   ├── utils/
│   │   ├── asset-loader.ts   # Asset loading utilities
│   │   ├── gsap-utils.ts     # GSAP helpers
│   │   ├── a11y.ts           # Accessibility helpers
│   │   └── analytics.ts      # Analytics events
│   └── main.ts            # App entry point
├── tests/
│   ├── unit/              # Vitest unit tests
│   ├── e2e/               # Playwright E2E tests
│   └── a11y/              # Playwright accessibility tests
├── .github/workflows/     # CI/CD pipeline
├── vite.config.ts
├── tsconfig.json
├── playwright.config.ts
├── vitest.config.ts
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd diet-soda

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run preview          # Preview production build

# Building
npm run build            # Production build

# Testing
npm run test             # Run unit tests
npm run test:ui          # Run tests with UI
npm run test:e2e         # Run E2E tests
npm run test:a11y        # Run accessibility tests

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Analysis
npm run analyze          # Bundle analysis
```

## 🎨 Customization

### Adding New Flavors

1. Add flavor data to `src/content/data.ts`:

```typescript
{
  id: 'berry',
  name: 'Berry Blast',
  tagline: 'Berrylicious',
  price: 2.99,
  modelUrl: '/assets/models/diet_soda2.glb',
  textureUrl: '/assets/textures/berry_base_color.webp',
  posterUrl: '/assets/images/berry_soda.webp',
  accentColor: '#ff6b9d',
  bgGradient: {
    inner: '#8b1538',
    mid: '#4a0a1e',
    outer: '#1a0308',
  },
  berryModelUrl: '/assets/models/berry.glb',
}
```

2. Add corresponding assets to `public/assets/`

3. The flavor will automatically appear in the carousel and work with the switching system.

### Modifying Colors

Edit CSS custom properties in `src/styles/tokens.css`:

```css
:root {
  --color-bg-inner: #0b8a78;
  --color-bg-mid: #044e3b;
  --color-bg-outer: #011411;
  --color-accent: #fbcfe8;
  /* ... */
}
```

### Content Management

All content is centralized in `src/content/data.ts` - ready for CMS integration. Replace with API calls for dynamic content.

## ♿ Accessibility

This project targets **WCAG 2.1 AA** compliance:

- ✅ Semantic HTML5 landmarks
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Focus visible styles on all interactive elements
- ✅ ARIA labels and live regions
- ✅ Keyboard navigation for all components
- ✅ Color contrast ≥ 4.5:1 (text), ≥ 3:1 (UI)
- ✅ `prefers-reduced-motion` support
- ✅ `prefers-contrast` support
- ✅ Skip to main content link
- ✅ Screen reader announcements for dynamic changes

Run accessibility tests:
```bash
npm run test:a11y
```

## ⚡ Performance

### Targets

| Metric | Target |
|--------|--------|
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| INP | ≤ 200ms |
| JS Bundle | ≤ 100 KB gz |
| CSS Bundle | ≤ 20 KB gz |
| Lighthouse Performance | ≥ 90 |

### Optimizations

- **3D Models**: Draco compression (~60-80% size reduction)
- **Textures**: WebP/AVIF with fallbacks
- **Code Splitting**: Vendor chunks for 3D, animation, UI libraries
- **Lazy Loading**: Non-critical assets loaded on demand
- **Service Worker**: Precaches critical assets, runtime caches others
- **Resource Hints**: Preload, prefetch, DNS prefetch
- **Font Optimization**: Self-hosted WOFF2 with `font-display: swap`

## 🧪 Testing

### Unit Tests (Vitest)
```bash
npm run test
```

### E2E Tests (Playwright)
```bash
npm run test:e2e
```

### Accessibility Tests (axe-core + Playwright)
```bash
npm run test:a11y
```

### Visual Regression
```bash
npm run test:e2e -- --update-snapshots
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

Output in `dist/` directory.

### Deploy to Cloudflare Pages
```bash
# Connect repository to Cloudflare Pages
# Build command: npm run build
# Output directory: dist
```

### Deploy to Vercel
```bash
vercel --prod
```

### Environment Variables

Create `.env` file:
```env
VITE_GA_ID=G-XXXXXXXXXX
```

## 🔧 Configuration

### Vite Config (`vite.config.ts`)
- PWA configuration
- Build optimization
- Asset handling
- Aliases

### TypeScript Config (`tsconfig.json`)
- Strict mode enabled
- Path aliases (`@/*` → `src/*`)
- DOM types included

### ESLint Config (`.eslintrc.cjs`)
- TypeScript ESLint
- Lit plugin
- Prettier integration

### Prettier Config (`.prettierrc`)
- 2 spaces
- Single quotes
- Trailing commas

## 📊 Analytics Events

Track custom events in GA4:

```typescript
// Flavor switching
trackFlavorSwitch('classic', 'lime');

// CTA clicks
trackCTAClick('Shop Now', 'lime', 'hero');

// Carousel interactions
trackCarouselInteraction('next', 'lime');

// Model interactions
trackModelInteraction('rotate');
```

## 🐛 Troubleshooting

### Model Viewer Not Loading
- Check GLB file paths in `public/assets/models/`
- Verify CORS headers on asset server
- Check browser console for WebGL errors

### Animations Not Smooth
- Ensure `prefers-reduced-motion` is not enabled
- Check for main thread blocking
- Verify GSAP is loaded before components mount

### Build Errors
- Run `npm run lint` to catch type errors
- Check `tsc` output for TypeScript errors
- Verify all imports have correct extensions

## 📝 License

MIT License - feel free to use for your own projects!

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For questions or issues, please open a GitHub issue.

---

Built with ❤️ using modern web standards.