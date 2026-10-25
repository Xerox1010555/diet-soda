import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGSAP(): void {
  gsap.config({
    nullTargetWarn: false,
  });

  if (typeof window !== 'undefined') {
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
  }
}

export function createThemeTransition(
  element: HTMLElement,
  targetColors: Record<string, string>,
  duration: number = 1.5
): gsap.core.Timeline {
  const tl = gsap.timeline();
  const cssVars = Object.keys(targetColors);

  tl.to(element, {
    ...Object.fromEntries(cssVars.map((key) => [key, targetColors[key]])),
    duration,
    ease: 'power2.inOut',
  });

  return tl;
}

export function createSpinAnimation(
  element: HTMLElement,
  options: {
    startAngle?: number;
    endAngle?: number;
    startBlur?: number;
    endBlur?: number;
    duration?: number;
    ease?: string;
  } = {}
): gsap.core.Timeline {
  const {
    startAngle = 0,
    endAngle = 360,
    startBlur = 0,
    endBlur = 15,
    duration = 0.6,
    ease = 'power2.in',
  } = options;

  const obj = { angle: startAngle, blur: startBlur };
  const tl = gsap.timeline();

  tl.to(obj, {
    angle: endAngle,
    blur: endBlur,
    duration,
    ease,
    onUpdate: () => {
      element.style.transform = `rotate(${obj.angle}deg)`;
      element.style.filter = `blur(${obj.blur}px)`;
    },
  });

  return tl;
}

export function createStaggeredAnimation<T extends HTMLElement>(
  elements: T[],
  animation: (el: T, index: number) => gsap.core.Timeline,
  stagger: number = 0.1
): gsap.core.Timeline {
  const tl = gsap.timeline();
  elements.forEach((el, i) => {
    tl.add(animation(el, i), i * stagger);
  });
  return tl;
}

export function createScrollReveal(
  selector: string,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    onEnter?: (el: Element) => void;
    onLeave?: (el: Element) => void;
  } = {}
): ScrollTrigger[] {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).map((el) => {
    return ScrollTrigger.create({
      trigger: el,
      start: options.start || 'top 80%',
      end: options.end || 'bottom 20%',
      scrub: options.scrub || false,
      onEnter: () => {
        el.classList.add('is-visible');
        options.onEnter?.(el);
      },
      onLeaveBack: () => {
        el.classList.remove('is-visible');
        options.onLeave?.(el);
      },
    });
  });
}

export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

export function matchMedia(
  queries: Record<string, (context: gsap.Context) => void>
): gsap.MatchMedia {
  const mm = gsap.matchMedia();
  Object.entries(queries).forEach(([query, callback]) => {
    mm.add(query, callback);
  });
  return mm;
}

export function reducedMotionQuery(): string {
  return '(prefers-reduced-motion: reduce)';
}

export function createParallax(
  elements: HTMLElement[],
  speeds: number[],
  container: HTMLElement | Window = window
): () => void {
  let rafId: number;
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container instanceof Window ? null : container.getBoundingClientRect();
    const width = container instanceof Window ? window.innerWidth : rect!.width;
    const height = container instanceof Window ? window.innerHeight : rect!.height;
    const left = container instanceof Window ? 0 : rect!.left;
    const top = container instanceof Window ? 0 : rect!.top;

    mouseX = (e.clientX - left) / width - 0.5;
    mouseY = (e.clientY - top) / height - 0.5;
  };

  const animate = () => {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    elements.forEach((el, i) => {
      const speed = speeds[i] || 1;
      const x = currentX * speed * 60;
      const y = currentY * speed * 60;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });

    rafId = requestAnimationFrame(animate);
  };

  if (container instanceof Window) {
    window.addEventListener('mousemove', handleMouseMove);
  } else {
    container.addEventListener('mousemove', handleMouseMove);
  }

  animate();

  return () => {
    cancelAnimationFrame(rafId);
    if (container instanceof Window) {
      window.removeEventListener('mousemove', handleMouseMove);
    } else {
      container.removeEventListener('mousemove', handleMouseMove);
    }
  };
}