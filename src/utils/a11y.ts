export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcer = getOrCreateAnnouncer(priority);
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = message;
  }, 100);
}

function getOrCreateAnnouncer(priority: 'polite' | 'assertive'): HTMLElement {
  const id = `a11y-announcer-${priority}`;
  let announcer = document.getElementById(id);
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = id;
    announcer.setAttribute('role', priority === 'polite' ? 'status' : 'alert');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }
  return announcer;
}

export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleTab(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }

  element.addEventListener('keydown', handleTab);
  firstElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleTab);
  };
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: more)').matches;
}

export function onReducedMotionChange(callback: (reduced: boolean) => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}

export function onContrastChange(callback: (high: boolean) => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-contrast: more)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}

export function setFocusVisible(element: HTMLElement): void {
  element.style.outline = '3px solid var(--color-focus)';
  element.style.outlineOffset = '2px';
}

export function removeFocusVisible(element: HTMLElement): void {
  element.style.outline = '';
  element.style.outlineOffset = '';
}

export function createSkipLink(targetId: string, label: string = 'Skip to main content'): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = `#${targetId}`;
  link.textContent = label;
  link.className = 'skip-link';
  return link;
}

export function initSkipLink(targetId: string = 'main-content'): void {
  const existing = document.querySelector('.skip-link');
  if (existing) return;

  const skipLink = createSkipLink(targetId);
  document.body.insertBefore(skipLink, document.body.firstChild);
}

export function addKeyboardNavigation(
  container: HTMLElement,
  selector: string,
  options: {
    loop?: boolean;
    vertical?: boolean;
    onSelect?: (element: HTMLElement, index: number) => void;
  } = {}
): () => void {
  const items = Array.from(container.querySelectorAll<HTMLElement>(selector));
  let currentIndex = -1;

  function handleKeydown(e: KeyboardEvent): void {
    const isVertical = options.vertical ?? false;
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

    if (e.key === nextKey || e.key === prevKey) {
      e.preventDefault();
      const direction = e.key === nextKey ? 1 : -1;
      currentIndex = (currentIndex + direction + items.length) % items.length;
      items[currentIndex]?.focus();
      options.onSelect?.(items[currentIndex], currentIndex);
    }
  }

  container.addEventListener('keydown', handleKeydown);
  return () => container.removeEventListener('keydown', handleKeydown);
}

export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function setAriaBusy(element: HTMLElement, busy: boolean): void {
  element.setAttribute('aria-busy', String(busy));
}

export function setAriaExpanded(element: HTMLElement, expanded: boolean): void {
  element.setAttribute('aria-expanded', String(expanded));
}

export function setAriaSelected(element: HTMLElement, selected: boolean): void {
  element.setAttribute('aria-selected', String(selected));
}

export function setAriaControls(element: HTMLElement, controlId: string): void {
  element.setAttribute('aria-controls', controlId);
}

export function setAriaLabel(element: HTMLElement, label: string): void {
  element.setAttribute('aria-label', label);
}

export function setAriaDescribedBy(element: HTMLElement, id: string): void {
  element.setAttribute('aria-describedby', id);
}