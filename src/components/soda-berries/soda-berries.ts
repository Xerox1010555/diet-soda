import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { SodaElement } from '../base-element';
import { useBerryParallax } from '../../composables/useParallax';

export class SodaBerries extends SodaElement {
  static override styles = css`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: var(--z-content);
    }

    .berries-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .berry {
      position: absolute;
      pointer-events: none;
      will-change: transform;
      outline: none;
      --progress-bar-color: transparent;
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
    }

    .berry.b1 { top: 25%; left: 30%; width: 220px; height: 220px; }
    .berry.b2 { top: 60%; left: 42%; width: 100px; height: 100px; }
    .berry.b3 { top: 30%; left: 62%; width: 250px; height: 250px; }
    .berry.b4 { top: 15%; left: 48%; width: 140px; height: 140px; }
    .berry.b5 { top: 75%; left: 20%; width: 120px; height: 120px; }
    .berry.b6 { top: 45%; left: 75%; width: 180px; height: 180px; }
    .berry.b7 { top: 15%; left: 40%; width: 80px; height: 80px; opacity: 0.7; }
    .berry.b8 { top: 50%; left: 55%; width: 70px; height: 70px; opacity: 0.6; }
    .berry.b9 { top: 80%; left: 35%; width: 75px; height: 75px; opacity: 0.7; }

    @media (prefers-reduced-motion: reduce) {
      .berry {
        animation: none !important;
        transition: none !important;
      }
    }
  `;

  @property({ type: String })
  modelUrl = '/assets/models/cherry.glb';

  @property({ type: String })
  containerClass = 'berries-container';

  @state()
  private parallax: { destroy: () => void } | null = null;

  override firstUpdated(): void {
    this.initParallax();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.parallax?.destroy();
  }

  private initParallax(): void {
    const berries = this.shadowRoot?.querySelectorAll('.berry');
    if (berries && berries.length > 0) {
      this.parallax = useBerryParallax(Array.from(berries) as HTMLElement[]);
    }
  }

  override render() {
    return html`
      <div class=${this.containerClass}>
        ${Array.from({ length: 9 }, (_, i) => html`
          <model-viewer
            class="berry b${i + 1}"
            src=${this.modelUrl}
            environment-image="neutral"
            exposure="1.2"
            interaction-prompt="none"
            camera-orbit=${this.getOrbit(i)}
          ></model-viewer>
        `)}
      </div>
    `;
  }

  private getOrbit(index: number): string {
    const orbits = [
      '45deg 120deg 105%',
      '-120deg 45deg 105%',
      '200deg 90deg 105%',
      '-45deg 120deg 105%',
      '-45deg 160deg 105%',
      '80deg 75deg 105%',
      '-20deg 110deg 105%',
      '160deg 45deg 105%',
      '45deg 20deg 105%',
    ];
    return orbits[index] || '45deg 120deg 105%';
  }
}

customElements.define('soda-berries', SodaBerries);