import type { Flavor, FlavorState, FlavorEvent } from '../content/config';
import { siteConfig } from '../content/data';

type FlavorListener = (flavor: Flavor, state: FlavorState) => void;

class FlavorStore {
  private state: FlavorState = 'idle';
  private currentFlavor: Flavor;
  private targetFlavor: Flavor | null = null;
  private listeners: Set<FlavorListener> = new Set();
  private textures: Map<string, HTMLImageElement> = new Map();
  private preloadPromises: Map<string, Promise<void>> = new Map();

  constructor() {
    this.currentFlavor = siteConfig.flavors[0];
  }

  getState(): FlavorState {
    return this.state;
  }

  getCurrentFlavor(): Flavor {
    return this.currentFlavor;
  }

  getTargetFlavor(): Flavor | null {
    return this.targetFlavor;
  }

  subscribe(listener: FlavorListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.currentFlavor, this.state));
  }

  private transition(event: FlavorEvent): void {
    const prevState = this.state;

    switch (this.state) {
      case 'idle':
        if (event.type === 'SWITCH') {
          const target = siteConfig.flavors.find((f) => f.id === event.flavorId);
          if (target && target !== this.currentFlavor) {
            this.targetFlavor = target;
            this.state = 'preloading';
            this.preloadTargetAssets(target);
          }
        }
        break;

      case 'preloading':
        if (event.type === 'TEXTURES_READY') {
          this.state = 'transitioning';
        }
        break;

      case 'transitioning':
        if (event.type === 'ANIMATION_COMPLETE') {
          if (this.targetFlavor) {
            this.currentFlavor = this.targetFlavor;
            this.targetFlavor = null;
          }
          this.state = 'ready';
          setTimeout(() => {
            this.state = 'idle';
            this.notify();
          }, 0);
        }
        break;

      case 'ready':
        this.state = 'idle';
        break;
    }

    if (prevState !== this.state) {
      this.notify();
    }
  }

  dispatch(event: FlavorEvent): void {
    this.transition(event);
  }

  async preloadTargetAssets(flavor: Flavor): Promise<void> {
    if (this.preloadPromises.has(flavor.id)) {
      await this.preloadPromises.get(flavor.id);
      this.dispatch({ type: 'TEXTURES_READY' });
      return;
    }

    const promise = this.loadAssets(flavor);
    this.preloadPromises.set(flavor.id, promise);

    try {
      await promise;
      this.dispatch({ type: 'TEXTURES_READY' });
    } catch (error) {
      console.error('Failed to preload assets:', error);
      this.dispatch({ type: 'TEXTURES_READY' });
    } finally {
      this.preloadPromises.delete(flavor.id);
    }
  }

  private async loadAssets(flavor: Flavor): Promise<void> {
    const urls = [flavor.textureUrl, flavor.posterUrl, flavor.berryModelUrl];
    await Promise.all(
      urls.map((url) => {
        return new Promise<void>((resolve) => {
          if (url.endsWith('.webp') || url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.svg')) {
            const img = new Image();
            img.src = url;
            img.onload = () => {
              this.textures.set(url, img);
              resolve();
            };
            img.onerror = () => resolve();
          } else {
            resolve();
          }
        });
      })
    );
  }

  getTexture(url: string): HTMLImageElement | undefined {
    return this.textures.get(url);
  }

  switchFlavor(flavorId: string): void {
    if (this.state !== 'idle') return;
    this.dispatch({ type: 'SWITCH', flavorId });
  }
}

export const flavorStore = new FlavorStore();

export function useFlavorStore() {
  return {
    getState: () => flavorStore.getState(),
    getCurrentFlavor: () => flavorStore.getCurrentFlavor(),
    getTargetFlavor: () => flavorStore.getTargetFlavor(),
    switchFlavor: (flavorId: string) => flavorStore.switchFlavor(flavorId),
    subscribe: (listener: FlavorListener) => flavorStore.subscribe(listener),
  };
}