import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { SodaElement } from '../base-element';
import type { Flavor } from '../../content/config';

export class SodaCarousel extends SodaElement {
  static override styles = css`
    :host {
      display: block;
    }

    .product-carousel {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: flex-end;
    }

    .carousel-cards {
      display: flex;
      gap: 1rem;
    }

    .carousel-card {
      background: var(--color-glass-bg);
      border: 1px solid var(--color-glass-border);
      padding: 1rem;
      padding-top: 5rem;
      border-radius: 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      cursor: pointer;
      transition: all var(--transition-slow);
      width: 135px;
      position: relative;
      backdrop-filter: blur(10px);
      text-align: center;
    }

    .carousel-card:hover:not([aria-disabled="true"]) {
      background: var(--color-glass-hover-bg);
      border-color: var(--color-glass-hover-border);
    }

    .carousel-card[aria-selected="true"] {
      border-color: var(--color-accent);
      border-width: 1px;
    }

    .carousel-card[aria-disabled="true"] {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .carousel-card__image {
      width: 140px;
      height: auto;
      margin-top: -8rem;
      filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.5));
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      display: block;
      will-change: transform;
      pointer-events: none;
    }

    .carousel-card:hover:not([aria-disabled="true"]) .carousel-card__image {
      transform: translateY(-30px) rotate(-12deg) scale(1.15) !important;
    }

    .carousel-card__info {
      display: flex;
      flex-direction: column;
      font-size: var(--fs-xs);
      width: 100%;
      word-wrap: break-word;
    }

    .carousel-card__info span:first-child {
      font-weight: 600;
    }

    .carousel-card__info span:last-child {
      color: var(--color-text-muted);
    }

    .carousel-nav {
      display: flex;
      gap: 1rem;
    }

    .nav-arrow {
      background: var(--color-glass-bg);
      border: 1px solid var(--color-glass-border);
      color: var(--color-text);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background var(--transition-base);
    }

    .nav-arrow:hover:not([aria-disabled="true"]) {
      background: var(--color-glass-hover-bg);
    }

    .nav-arrow[aria-disabled="true"] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .product-carousel {
        align-items: center;
      }

      .carousel-cards {
        justify-content: center;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .carousel-card,
      .carousel-card__image,
      .nav-arrow {
        transition: none;
      }

      .carousel-card:hover .carousel-card__image {
        transform: none !important;
      }
    }
  `;

  @property({ type: Array })
  flavors: Flavor[] = [];

  @property({ type: String })
  activeFlavor = '';

  @property({ type: Boolean })
  disabled = false;

  @state()
  private currentIndex = 0;

  override willUpdate(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('activeFlavor')) {
      this.currentIndex = this.flavors.findIndex((f) => f.id === this.activeFlavor);
    }
  }

  private selectFlavor(flavorId: string): void {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('select-flavor', {
      detail: flavorId,
      bubbles: true,
      composed: true,
    }));
  }

  private navigate(direction: 'prev' | 'next'): void {
    if (this.disabled) return;
    const newIndex = direction === 'next'
      ? (this.currentIndex + 1) % this.flavors.length
      : (this.currentIndex - 1 + this.flavors.length) % this.flavors.length;
    this.selectFlavor(this.flavors[newIndex].id);
  }

  override render() {
    return html`
      <div class="product-carousel" role="group" aria-label="Flavor selection">
        <div class="carousel-cards" role="listbox" aria-label="Available flavors">
          ${this.flavors.map((flavor, index) => html`
            <article
              class="carousel-card"
              role="option"
              aria-selected=${flavor.id === this.activeFlavor}
              aria-disabled=${this.disabled}
              @click=${() => this.selectFlavor(flavor.id)}
              tabindex=${this.disabled ? -1 : 0}
              @keydown=${(e: KeyboardEvent) => {
                if (!this.disabled && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  this.selectFlavor(flavor.id);
                }
              }}
            >
              <img
                class="carousel-card__image"
                src=${flavor.posterUrl}
                alt=${flavor.name}
                loading="lazy"
              />
              <div class="carousel-card__info">
                <span>${flavor.name}</span>
                <span>$${flavor.price.toFixed(2)}</span>
              </div>
            </article>
          `)}
        </div>
        <div class="carousel-nav">
          <button
            class="nav-arrow"
            aria-label="Previous flavor"
            aria-disabled=${this.disabled}
            @click=${() => this.navigate('prev')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            class="nav-arrow"
            aria-label="Next flavor"
            aria-disabled=${this.disabled}
            @click=${() => this.navigate('next')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('soda-carousel', SodaCarousel);