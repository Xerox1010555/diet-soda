import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFlavorStore } from '../../src/composables/useFlavorStore';
import { siteConfig } from '../../src/content/data';

describe('Flavor Store', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should have initial flavor as classic', () => {
    const store = useFlavorStore();
    expect(store.getCurrentFlavor().id).toBe('classic');
  });

  it('should return idle state initially', () => {
    const store = useFlavorStore();
    expect(store.getState()).toBe('idle');
  });

  it('should switch flavor when dispatched', () => {
    const store = useFlavorStore();
    store.switchFlavor('lime');
    expect(store.getCurrentFlavor().id).toBe('lime');
  });

  it('should not switch to same flavor', () => {
    const store = useFlavorStore();
    const initialFlavor = store.getCurrentFlavor();
    store.switchFlavor('classic');
    expect(store.getCurrentFlavor()).toBe(initialFlavor);
  });

  it('should notify subscribers on flavor change', () => {
    const store = useFlavorStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.switchFlavor('lime');
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'lime' }),
      'idle'
    );

    unsubscribe();
    listener.mockClear();
    store.switchFlavor('classic');
    expect(listener).not.toHaveBeenCalled();
  });

  it('should have correct flavor data', () => {
    expect(siteConfig.flavors).toHaveLength(2);
    expect(siteConfig.flavors[0].id).toBe('classic');
    expect(siteConfig.flavors[1].id).toBe('lime');
  });

  it('should have all required flavor properties', () => {
    siteConfig.flavors.forEach((flavor) => {
      expect(flavor).toHaveProperty('id');
      expect(flavor).toHaveProperty('name');
      expect(flavor).toHaveProperty('tagline');
      expect(flavor).toHaveProperty('price');
      expect(flavor).toHaveProperty('modelUrl');
      expect(flavor).toHaveProperty('textureUrl');
      expect(flavor).toHaveProperty('posterUrl');
      expect(flavor).toHaveProperty('accentColor');
      expect(flavor).toHaveProperty('bgGradient');
      expect(flavor).toHaveProperty('berryModelUrl');
    });
  });
});