import type { Flavor } from '../content/config';
import type { ModelViewerElement as HTMLModelViewerElement } from '@google/model-viewer';

export interface ModelViewerController {
  modelViewer: HTMLModelViewerElement | null;
  currentTexture: string | null;
  loadModel: (url: string) => Promise<void>;
  swapTexture: (textureUrl: string) => Promise<void>;
  setExposure: (value: number) => void;
  setOrbit: (orbit: string) => void;
}

export function createModelViewerElement(flavor: Flavor): HTMLModelViewerElement {
  const mv = document.createElement('model-viewer') as HTMLModelViewerElement;
  mv.src = flavor.modelUrl;
  mv.alt = `${flavor.name} 3D Model`;
  mv.cameraControls = true;
  mv.disableZoom = true;
  mv.disablePan = true;
  mv.shadowIntensity = 0;
  mv.environmentImage = 'neutral';
  mv.exposure = 1.5;
  mv.interactionPrompt = 'none';
  mv.cameraOrbit = '0deg 90deg 380%';
  mv.fieldOfView = '30deg';
  mv.classList.add('hero-model');
  mv.setAttribute('aria-label', `Interactive 3D model of ${flavor.name} can`);
  return mv;
}

export async function loadModel(mv: HTMLModelViewerElement, url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Model load timeout')), 15000);
    const onLoad = () => {
      clearTimeout(timeout);
      mv.removeEventListener('load', onLoad);
      mv.removeEventListener('error', onError);
      resolve();
    };
    const onError = (e: Event) => {
      clearTimeout(timeout);
      mv.removeEventListener('load', onLoad);
      mv.removeEventListener('error', onError);
      reject(new Error(`Model load failed: ${(e as ErrorEvent).message}`));
    };
    mv.addEventListener('load', onLoad, { once: true });
    mv.addEventListener('error', onError, { once: true });
    mv.src = url;
  });
}

export async function swapTexture(mv: HTMLModelViewerElement, textureUrl: string): Promise<void> {
  if (!mv.model) return;

  try {
    const texture = await mv.createTexture(textureUrl);
    mv.model.materials.forEach((material) => {
      if (material.pbrMetallicRoughness?.baseColorTexture) {
        material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
      }
    });
  } catch (error) {
    console.error('Texture swap failed:', error);
  }
}

export function setExposure(mv: HTMLModelViewerElement, value: number): void {
  mv.exposure = value;
}

export function setOrbit(mv: HTMLModelViewerElement, orbit: string): void {
  mv.cameraOrbit = orbit;
}