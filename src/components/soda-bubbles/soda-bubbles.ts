import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { SodaElement } from '../base-element';
import { useBubbles } from '../../composables/useBubbles';

export class SodaBubbles extends SodaElement {
  static override styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .bubble-img {
      position: absolute;
      pointer-events: none;
    }

    @keyframes floatUpImg {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0;
      }
      10% { opacity: 0.4; }
      90% { opacity: 0.4; }
      100% {
        transform: translateY(-110vh) translateX(30px) rotate(360deg);
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .bubble-img {
        animation: none !important;
        display: none;
      }
    }
  `;

  @property({ type: String })
  imageUrl = '/assets/images/bubble.svg';

  @property({ type: Number })
  spawnRate = 400;

  @property({ type: Number })
  minSize = 10;

  @property({ type: Number })
  maxSize = 30;

  @property({ type: Number })
  minDuration = 4;

  @property({ type: Number })
  maxDuration = 10;

  @property({ type: Number })
  minOpacity = 0.2;

  @property({ type: Number })
  maxOpacity = 0.6;

  @state()
  private bubbles: { destroy: () => void } | null = null;

  override firstUpdated(): void {
    this.initBubbles();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.bubbles?.destroy();
  }

  private initBubbles(): void {
    const container = this.shadowRoot?.getElementById('bubbles-container');
    if (container) {
      this.bubbles = useBubbles({
        container,
        imageUrl: this.imageUrl,
        spawnRate: this.spawnRate,
        minSize: this.minSize,
        maxSize: this.maxSize,
        minDuration: this.minDuration,
        maxDuration: this.maxDuration,
        minOpacity: this.minOpacity,
        maxOpacity: this.maxOpacity,
      });
    }
  }

  override render() {
    return html`
      <div id="bubbles-container"></div>
    `;
  }
}

customElements.define('soda-bubbles', SodaBubbles);