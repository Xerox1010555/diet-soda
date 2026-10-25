import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { SodaElement } from '../base-element';
import { siteConfig } from '../../content/data';
import { trackCTAClick } from '../../utils/analytics';

export class SodaCTA extends SodaElement {
  static override styles = css`
    :host {
      display: block;
    }

    .cta-panel {
      padding: 40px 0 120px;
      width: min(var(--container-max), calc(100% - 48px));
      margin: 0 auto;
    }

    .cta-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(251, 207, 232, 0.08));
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 34px;
      padding: 2.1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .cta-card h3 {
      font-family: var(--font-heading);
      font-size: var(--fs-cta-title);
      line-height: 1;
    }

    .cta-card p {
      color: var(--color-text-muted);
      margin-top: 0.5rem;
    }

    .cta-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-shrink: 0;
    }

    .btn-secondary {
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      color: var(--color-text);
      padding: 1rem 1.5rem;
      border-radius: var(--radius-pill);
      cursor: pointer;
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: var(--fs-sm);
      transition: all var(--transition-base);
    }

    .btn-secondary:hover {
      background: var(--color-glass-hover-bg);
      border-color: var(--color-glass-hover-border);
    }

    @media (max-width: 768px) {
      .cta-card {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
      }

      .cta-actions {
        width: 100%;
        justify-content: flex-start;
      }
    }
  `;

  @property({ type: String })
  eyebrow = 'Fresh drop';

  @property({ type: String })
  title = 'Ready for a cleaner sip?';

  @property({ type: String })
  description = 'Discover the brighter side of zero sugar.';

  @property({ type: String })
  primaryText = 'Shop Now';

  @property({ type: String })
  secondaryText = 'Explore flavors';

  @property({ type: String })
  primaryUrl = siteConfig.cta.shopUrl;

  @property({ type: String })
  secondaryUrl = '#flavors';

  private handlePrimaryClick(): void {
    trackCTAClick(this.primaryText, 'unknown', 'cta-panel');
  }

  private handleSecondaryClick(): void {
    trackCTAClick(this.secondaryText, 'unknown', 'cta-panel');
  }

  override render() {
    return html`
      <section class="section cta-panel" aria-labelledby="cta-title">
        <div class="cta-card">
          <div>
            <span class="eyebrow">${this.eyebrow}</span>
            <h2 id="cta-title" class="cta-title">${this.title}</h2>
            <p>${this.description}</p>
          </div>
          <div class="cta-actions">
            <a
              href=${this.secondaryUrl}
              class="btn-secondary"
              @click=${this.handleSecondaryClick}
            >
              ${this.secondaryText}
            </a>
            <a
              href=${this.primaryUrl}
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              @click=${this.handlePrimaryClick}
            >
              ${this.primaryText}
              <span class="plus-icon">+</span>
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('soda-cta', SodaCTA);