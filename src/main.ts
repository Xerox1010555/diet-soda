import '@google/model-viewer';
import './styles/global.css';
import './styles/animations.css';
import './components/soda-header/soda-header.ts';
import './components/soda-hero/soda-hero.ts';
import './components/soda-carousel/soda-carousel.ts';
import './components/soda-story/soda-story.ts';
import './components/soda-features/soda-features.ts';
import './components/soda-reviews/soda-reviews.ts';
import './components/soda-cta/soda-cta.ts';
import './components/soda-footer/soda-footer.ts';
import './components/soda-berries/soda-berries.ts';
import './components/soda-leaves/soda-leaves.ts';
import './components/soda-bubbles/soda-bubbles.ts';
import { initAnalyticsOnce } from './composables/useAnalytics';
import { announceToScreenReader, initSkipLink } from './utils/a11y';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initApp(): void {
  initSkipLink('main-content');

  const gaId = import.meta.env.VITE_GA_ID;
  if (gaId) {
    initAnalyticsOnce(gaId);
  }

  setupScrollAnimations();
  setupReducedMotionListener();
  handleHashNavigation();

  console.log('[Diet Soda] App initialized');
}

function setupScrollAnimations(): void {
  const sections = document.querySelectorAll('section.section');
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        section.classList.add('is-visible');
      },
      onLeaveBack: () => {
        section.classList.remove('is-visible');
      },
    });
  });
}

function setupReducedMotionListener(): void {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handleChange = (e: MediaQueryListEvent) => {
    document.documentElement.style.setProperty('--transition-base', e.matches ? '0ms' : '250ms');
    document.documentElement.style.setProperty('--transition-slow', e.matches ? '0ms' : '400ms');
    document.documentElement.style.setProperty('--transition-theme', e.matches ? '0ms' : '1.5s');

    if (e.matches) {
      gsap.globalTimeline.timeScale(0);
    } else {
      gsap.globalTimeline.timeScale(1);
    }
  };

  mediaQuery.addEventListener('change', handleChange);
  handleChange(mediaQuery as unknown as MediaQueryListEvent);
}

function handleHashNavigation(): void {
  const handleHashChange = (): void => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus();
        announceToScreenReader(`Navigated to ${hash}`);
      }
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

export {};