import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { SodaElement } from '../base-element';
import type { Feature } from '../../content/config';

export class SodaFeatures extends SodaElement {
  static override styles = css`
    :host {
      display: block;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
      padding: 30px 0 90px;
      width: min(var(--container-max), calc(100% - 48px));
      margin: 0 auto;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 26px;
      padding: 2rem 1.6rem;
      min-height: 220px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all var(--transition-slow);
    }

    .feature-card:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .feature-icon {
      width: 54px;
      height: 54px;
      display: grid;
      place-items: center;
      border-radius: 16px;
      background: rgba(251, 207, 232, 0.12);
      border: 1px solid rgba(251, 207, 232, 0.34);
      font-size: 1.4rem;
    }

    .feature-card h3 {
      margin-top: 1.2rem;
      margin-bottom: 0.65rem;
      font-size: var(--fs-xl);
      font-family: var(--font-heading);
    }

    .feature-card p {
      color: var(--color-text-muted);
      line-height: 1.8;
    }

    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  @property({ type: Array })
  features: Feature[] = [];

  private getIcon(iconName: string): string {
    const icons: Record<string, string> = {
      sparkle: '✦',
      leaf: '❋',
      award: '◎',
    };
    return icons[iconName] || '✦';
  }

  override render() {
    return html`
      <section class="section" aria-labelledby="features-title">
        <div class="features-grid">
          ${this.features.map((feature) => html`
            <article class="feature-card">
              <div class="feature-icon" aria-hidden="true">${this.getIcon(feature.icon)}</div>
              <div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
              </div>
            </article>
          `)}
        </div>
      </section>
    `;
  }
}

customElements.define('soda-features', SodaFeatures);