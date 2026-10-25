import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { SodaElement } from '../base-element';
import { useLeafParallax } from '../../composables/useParallax';

export class SodaLeaves extends SodaElement {
  static override styles = css`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: calc(var(--z-content) - 1);
    }

    .leaves-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .leaf {
      position: absolute;
      pointer-events: none;
      will-change: transform;
      filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
    }

    .leaf.l1 { top: 10%; left: 15%; }
    .leaf.l2 { top: 40%; left: 80%; width: 140px; height: 140px; opacity: 0.4; }
    .leaf.l3 { top: 70%; left: 75%; width: 80px; height: 80px; }
    .leaf.l4 { top: 85%; left: 20%; width: 120px; height: 120px; opacity: 0.3; }

    @media (prefers-reduced-motion: reduce) {
      .leaf {
        animation: none !important;
        transition: none !important;
      }
    }
  `;

  @property({ type: String })
  modelUrl = '/assets/models/leaves.glb';

  @property({ type: String })
  containerClass = 'leaves-container';

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
    const leaves = this.shadowRoot?.querySelectorAll('.leaf');
    if (leaves && leaves.length > 0) {
      this.parallax = useLeafParallax(Array.from(leaves) as HTMLElement[]);
    }
  }

  override render() {
    return html`
      <div class=${this.containerClass}>
        ${Array.from({ length: 4 }, (_, i) => html`
          <model-viewer
            class="leaf l${i + 1}"
            src=${this.modelUrl}
            environment-image="neutral"
            exposure="1.0"
            interaction-prompt="none"
            camera-orbit=${this.getOrbit(i)}
          ></model-viewer>
        `)}
      </div>
    `;
  }

  private getOrbit(index: number): string {
    const orbits = [
      '45deg 75deg 105%',
      '-30deg 60deg 105%',
      '120deg 85deg 105%',
      '10deg 45deg 105%',
    ];
    return orbits[index] || '45deg 75deg 105%';
  }
}

customElements.define('soda-leaves', SodaLeaves);