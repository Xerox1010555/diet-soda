import * as THREE from 'three';

export interface LoadResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

export async function loadTexture(url: string): Promise<LoadResult<THREE.Texture>> {
  return new Promise((resolve) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        resolve({ success: true, data: texture });
      },
      undefined,
      () => resolve({ success: false, error: new Error(`Failed to load texture: ${url}`) })
    );
  });
}

export async function preloadAssets(urls: string[]): Promise<Map<string, LoadResult<unknown>>> {
  const results = new Map<string, LoadResult<unknown>>();
  const promises = urls.map(async (url) => {
    let result: LoadResult<unknown>;
    if (url.match(/\.(webp|png|jpg|jpeg|svg)$/i)) {
      result = await loadTexture(url);
    } else {
      result = { success: false, error: new Error(`Unsupported asset type: ${url}`) };
    }
    results.set(url, result);
  });

  await Promise.all(promises);
  return results;
}

export function createFallbackTexture(color: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function disposeTexture(texture: THREE.Texture | null): void {
  if (texture) {
    texture.dispose();
  }
}

export function disposeMaterial(material: THREE.Material | null): void {
  if (material) {
    if (Array.isArray(material)) {
      material.forEach(disposeMaterial);
    } else {
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) {
          disposeTexture(value);
        }
      });
      material.dispose();
    }
  }
}

export function disposeObject3D(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      disposeMaterial(child.material);
      child.geometry?.dispose();
    }
  });
}