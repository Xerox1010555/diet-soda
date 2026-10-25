interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

let initialized = false;

export function initAnalytics(id: string): void {
  if (initialized) return;
  initialized = true;

  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, {
    send_page_view: true,
    anonymize_ip: true,
  });
}

export function trackEvent(eventName: string, params?: EventParams): void {
  if (!initialized || typeof window === 'undefined' || !window.gtag) {
    console.debug('[Analytics] Not initialized, queuing event:', eventName, params);
    return;
  }

  window.gtag('event', eventName, {
    ...params,
    timestamp: Date.now(),
  });
}

export function trackPageView(pagePath: string, pageTitle: string): void {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

export function trackFlavorSwitch(fromFlavor: string, toFlavor: string): void {
  trackEvent('flavor_switch', {
    from_flavor: fromFlavor,
    to_flavor: toFlavor,
  });
}

export function trackCTAClick(ctaName: string, flavor?: string, location?: string): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    flavor: flavor || 'unknown',
    location: location || 'unknown',
  });
}

export function trackCarouselInteraction(action: 'prev' | 'next' | 'card_click', flavor: string): void {
  trackEvent('carousel_interaction', {
    action,
    flavor,
  });
}

export function trackModelInteraction(action: 'rotate' | 'zoom' | 'ar_launch'): void {
  trackEvent('model_interaction', {
    action,
  });
}

export function trackScrollDepth(percentage: number): void {
  trackEvent('scroll_depth', {
    percentage: Math.round(percentage / 10) * 10,
  });
}

export function trackError(error: Error, context?: string): void {
  trackEvent('error', {
    error_message: error.message,
    error_stack: error.stack?.slice(0, 500),
    context: context || 'unknown',
  });
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function isAnalyticsReady(): boolean {
  return initialized && typeof window !== 'undefined' && !!window.gtag;
}