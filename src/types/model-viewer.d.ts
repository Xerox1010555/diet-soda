interface ModelViewerElement extends HTMLElement {
  src: string;
  alt: string;
  cameraControls: boolean;
  disableZoom: boolean;
  disablePan: boolean;
  shadowIntensity: string;
  environmentImage: string;
  exposure: string;
  interactionPrompt: string;
  cameraOrbit: string;
  fieldOfView: string;
  model: THREE.Object3D | null;
  createTexture(url: string): Promise<THREE.Texture>;
  addEventListener(type: 'load', listener: (this: ModelViewerElement, ev: Event) => void, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: 'error', listener: (this: ModelViewerElement, ev: ErrorEvent) => void, options?: boolean | AddEventListenerOptions): void;
  removeEventListener(type: 'load', listener: (this: ModelViewerElement, ev: Event) => void, options?: boolean): void;
  removeEventListener(type: 'error', listener: (this: ModelViewerElement, ev: ErrorEvent) => void, options?: boolean): void;
  style: CSSStyleDeclaration;
  classList: DOMTokenList;
  setAttribute(name: string, value: string): void;
  getAttribute(name: string): string | null;
  querySelector<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
  querySelector<K extends keyof HTMLElementTagNameMap>(selector: string): Element | null;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'disable-zoom'?: boolean;
        'disable-pan'?: boolean;
        'shadow-intensity'?: string;
        'environment-image'?: string;
        exposure?: string;
        'interaction-prompt'?: string;
        'camera-orbit'?: string;
        'field-of-view'?: string;
        'reveal'?: string;
        'poster'?: string;
        'ar'?: boolean;
        'ar-modes'?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'touch-action'?: string;
      }, HTMLElement>;
    }
  }
}

declare const HTMLModelViewerElement: {
  prototype: ModelViewerElement;
  new(): ModelViewerElement;
};

type HTMLModelViewerElement = ModelViewerElement;