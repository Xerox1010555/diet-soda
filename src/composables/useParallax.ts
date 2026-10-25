interface ParallaxConfig {
  elements: HTMLElement[];
  speeds: number[];
  container?: HTMLElement | Window;
  intensity?: number;
}

interface ParallaxWorkerMessage {
  type: 'init' | 'mousemove' | 'destroy';
  payload?: {
    mouseX?: number;
    mouseY?: number;
    speeds?: number[];
    containerRect?: DOMRect | null;
  };
}

interface ParallaxWorkerResponse {
  type: 'transforms';
  payload: { x: number; y: number }[];
}

let worker: Worker | null = null;
let animationId: number | null = null;
let currentConfig: ParallaxConfig | null = null;
let mouseX = 0;
let mouseY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
let rafScheduled = false;

function createWorker(): Worker {
  const workerCode = `
    self.onmessage = function(e) {
      const { type, payload } = e.data;
      if (type === 'init') {
        self.speeds = payload.speeds || [];
        self.containerRect = payload.containerRect || null;
      } else if (type === 'mousemove') {
        const { mouseX, mouseY } = payload;
        const transforms = self.speeds.map(speed => ({
          x: mouseX * speed * 60,
          y: mouseY * speed * 60
        }));
        self.postMessage({ type: 'transforms', payload: transforms });
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
}

function initWorker(config: ParallaxConfig): void {
  if (worker) return;

  worker = createWorker();
  const speeds = config.elements.map((_, i) => config.speeds[i] || 1);
  const containerRect = config.container instanceof Window ? null : config.container.getBoundingClientRect();

  worker.postMessage({
    type: 'init',
    payload: { speeds, containerRect },
  });

  worker.onmessage = (e: MessageEvent<ParallaxWorkerResponse>) => {
    if (e.data.type === 'transforms' && currentConfig) {
      e.data.payload.forEach(({ x, y }, i) => {
        const el = currentConfig!.elements[i];
        if (el) {
          el.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    }
  };
}

function animate(): void {
  currentMouseX += (mouseX - currentMouseX) * 0.05;
  currentMouseY += (mouseY - currentMouseY) * 0.05;

  if (worker && currentConfig) {
    worker.postMessage({
      type: 'mousemove',
      payload: { mouseX: currentMouseX, mouseY: currentMouseY },
    });
  }

  if (currentConfig) {
    animationId = requestAnimationFrame(animate);
  } else {
    rafScheduled = false;
  }
}

export function useParallax(config: ParallaxConfig): { destroy: () => void } {
  currentConfig = config;

  function handleMouseMove(e: MouseEvent): void {
    const container = config.container || window;
    const rect = container instanceof Window ? null : container.getBoundingClientRect();
    const width = container instanceof Window ? window.innerWidth : rect!.width;
    const height = container instanceof Window ? window.innerHeight : rect!.height;
    const left = container instanceof Window ? 0 : rect!.left;
    const top = container instanceof Window ? 0 : rect!.top;

    mouseX = (e.clientX - left) / width - 0.5;
    mouseY = (e.clientY - top) / height - 0.5;
  }

  const container = config.container || window;
  container.addEventListener('mousemove', handleMouseMove as EventListener);

  if (!worker) {
    initWorker(config);
  }

  if (!rafScheduled) {
    rafScheduled = true;
    animate();
  }

  function destroy(): void {
    container.removeEventListener('mousemove', handleMouseMove as EventListener);
    if (worker) {
      worker.terminate();
      worker = null;
    }
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    currentConfig = null;
    rafScheduled = false;
  }

  return { destroy };
}

export function useBerryParallax(
  berries: HTMLElement[],
  container: HTMLElement | Window = window
): { destroy: () => void } {
  const speeds = berries.map((_, i) => {
    const dur = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10][i % 9];
    return 1 + (dur / 10) * 2;
  });

  return useParallax({
    elements: berries,
    speeds,
    container,
    intensity: 1,
  });
}

export function useLeafParallax(
  leaves: HTMLElement[],
  container: HTMLElement | Window = window
): { destroy: () => void } {
  const speeds = leaves.map((_, i) => 0.5 + i * 0.1);

  return useParallax({
    elements: leaves,
    speeds,
    container,
    intensity: 0.5,
  });
}

export function useBackgroundParallax(
  elements: HTMLElement[],
  speeds: number[],
  container: HTMLElement | Window = window
): { destroy: () => void } {
  return useParallax({
    elements,
    speeds,
    container,
    intensity: 1,
  });
}