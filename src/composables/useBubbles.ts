interface BubbleConfig {
  container: HTMLElement;
  imageUrl: string;
  spawnRate?: number;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  minOpacity?: number;
  maxOpacity?: number;
}

interface Bubble {
  element: HTMLImageElement;
  duration: number;
  startTime: number;
}

let bubbleRafId: number | null = null;
let spawnIntervalId: number | null = null;
let activeBubbles: Bubble[] = [];
let currentConfig: BubbleConfig | null = null;

function createBubbleElement(config: BubbleConfig): HTMLImageElement {
  const bubble = document.createElement('img');
  bubble.src = config.imageUrl;
  bubble.className = 'bubble-img';
  bubble.alt = '';
  bubble.setAttribute('aria-hidden', 'true');

  const size = Math.random() * (config.maxSize! - config.minSize!) + config.minSize!;
  bubble.style.width = `${size}px`;
  bubble.style.height = 'auto';
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.bottom = '-50px';
  bubble.style.opacity = String(Math.random() * (config.maxOpacity! - config.minOpacity!) + config.minOpacity!);

  const duration = Math.random() * (config.maxDuration! - config.minDuration!) + config.minDuration!;
  bubble.style.animation = `floatUp ${duration}s linear forwards`;

  return bubble;
}

function spawnBubble(config: BubbleConfig): void {
  const bubble = createBubbleElement(config);
  const duration = parseFloat(bubble.style.animation.split(' ')[1]) * 1000;

  config.container.appendChild(bubble);

  activeBubbles.push({
    element: bubble,
    duration,
    startTime: Date.now(),
  });

  setTimeout(() => {
    const index = activeBubbles.findIndex((b) => b.element === bubble);
    if (index !== -1) {
      activeBubbles.splice(index, 1);
    }
    bubble.remove();
  }, duration);
}

function animateBubbles(): void {
  bubbleRafId = requestAnimationFrame(animateBubbles);
}

export function useBubbles(config: BubbleConfig): { destroy: () => void } {
  const defaultConfig: Required<BubbleConfig> = {
    container: config.container,
    imageUrl: config.imageUrl,
    spawnRate: config.spawnRate ?? 400,
    minSize: config.minSize ?? 10,
    maxSize: config.maxSize ?? 30,
    minDuration: config.minDuration ?? 4,
    maxDuration: config.maxDuration ?? 10,
    minOpacity: config.minOpacity ?? 0.2,
    maxOpacity: config.maxOpacity ?? 0.6,
  };

  currentConfig = defaultConfig;

  spawnIntervalId = window.setInterval(() => {
    if (currentConfig && document.visibilityState === 'visible') {
      spawnBubble(currentConfig);
    }
  }, defaultConfig.spawnRate);

  animateBubbles();

  function handleVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      activeBubbles.forEach((b) => {
        b.element.style.animationPlayState = 'paused';
      });
    } else {
      activeBubbles.forEach((b) => {
        b.element.style.animationPlayState = 'running';
      });
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);

  function destroy(): void {
    if (spawnIntervalId) {
      clearInterval(spawnIntervalId);
      spawnIntervalId = null;
    }
    if (bubbleRafId) {
      cancelAnimationFrame(bubbleRafId);
      bubbleRafId = null;
    }
    activeBubbles.forEach((b) => b.element.remove());
    activeBubbles = [];
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    currentConfig = null;
  }

  return { destroy };
}

export function createBubbleCanvas(
  container: HTMLElement,
  imageUrl: string,
  options: {
    count?: number;
    minSize?: number;
    maxSize?: number;
    minSpeed?: number;
    maxSpeed?: number;
  } = {}
): { destroy: () => void; canvas: HTMLCanvasElement } {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  const bubbles: Array<{
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    angle: number;
  }> = [];

  const img = new Image();
  img.src = imageUrl;

  function resize(): void {
    canvas.width = container.clientWidth * window.devicePixelRatio;
    canvas.height = container.clientHeight * window.devicePixelRatio;
    canvas.style.width = `${container.clientWidth}px`;
    canvas.style.height = `${container.clientHeight}px`;
  }

  function initBubbles(): void {
    const count = options.count ?? 30;
    for (let i = 0; i < count; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        size: (Math.random() * (options.maxSize ?? 40) + (options.minSize ?? 10)) * window.devicePixelRatio,
        speed: (Math.random() * (options.maxSpeed ?? 2) + (options.minSpeed ?? 0.5)) * window.devicePixelRatio,
        opacity: Math.random() * 0.4 + 0.2,
        angle: Math.random() * Math.PI * 2,
      });
    }
  }

  let rafId: number;

  function animate(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!img.complete) {
      rafId = requestAnimationFrame(animate);
      return;
    }

    bubbles.forEach((bubble) => {
      bubble.y -= bubble.speed;
      bubble.x += Math.sin(bubble.angle) * 0.5;
      bubble.angle += 0.01;

      if (bubble.y < -bubble.size) {
        bubble.y = canvas.height + bubble.size;
        bubble.x = Math.random() * canvas.width;
      }

      ctx.globalAlpha = bubble.opacity;
      ctx.drawImage(
        img,
        bubble.x - bubble.size / 2,
        bubble.y - bubble.size / 2,
        bubble.size,
        bubble.size
      );
    });

    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(animate);
  }

  img.onload = () => {
    resize();
    initBubbles();
    animate();
  };

  window.addEventListener('resize', resize);

  function destroy(): void {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    canvas.remove();
  }

  return { destroy, canvas };
}