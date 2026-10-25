import {
  initAnalytics,
  trackEvent,
  trackFlavorSwitch,
  trackCTAClick,
  trackCarouselInteraction,
  trackModelInteraction,
  trackScrollDepth,
  trackError,
  isAnalyticsReady,
} from '../utils/analytics';

interface AnalyticsConfig {
  measurementId: string;
  debug?: boolean;
}

let analyticsInitialized = false;

export function useAnalytics(config: AnalyticsConfig): {
  track: (event: string, params?: Record<string, unknown>) => void;
  trackFlavorSwitch: (from: string, to: string) => void;
  trackCTA: (name: string, flavor?: string, location?: string) => void;
  trackCarousel: (action: 'prev' | 'next' | 'card_click', flavor: string) => void;
  trackModel: (action: 'rotate' | 'zoom' | 'ar_launch') => void;
  trackScroll: (percentage: number) => void;
  trackError: (error: Error, context?: string) => void;
  ready: boolean;
} {
  if (!analyticsInitialized && config.measurementId) {
    initAnalytics(config.measurementId);
    analyticsInitialized = true;
  }

  const debug = config.debug ?? false;

  function log(event: string, params?: Record<string, unknown>): void {
    if (debug) {
      console.log(`[Analytics] ${event}`, params);
    }
  }

  return {
    track: (event: string, params?: Record<string, unknown>) => {
      log(event, params);
      trackEvent(event, params as Record<string, string | number | boolean>);
    },
    trackFlavorSwitch: (from: string, to: string) => {
      log('flavor_switch', { from, to });
      trackFlavorSwitch(from, to);
    },
    trackCTA: (name: string, flavor?: string, location?: string) => {
      log('cta_click', { name, flavor, location });
      trackCTAClick(name, flavor, location);
    },
    trackCarousel: (action: 'prev' | 'next' | 'card_click', flavor: string) => {
      log('carousel_interaction', { action, flavor });
      trackCarouselInteraction(action, flavor);
    },
    trackModel: (action: 'rotate' | 'zoom' | 'ar_launch') => {
      log('model_interaction', { action });
      trackModelInteraction(action);
    },
    trackScroll: (percentage: number) => {
      log('scroll_depth', { percentage });
      trackScrollDepth(percentage);
    },
    trackError: (error: Error, context?: string) => {
      log('error', { error: error.message, context });
      trackError(error, context);
    },
    get ready() {
      return isAnalyticsReady();
    },
  };
}

export function initAnalyticsOnce(measurementId: string): void {
  if (!analyticsInitialized && measurementId) {
    initAnalytics(measurementId);
    analyticsInitialized = true;
  }
}