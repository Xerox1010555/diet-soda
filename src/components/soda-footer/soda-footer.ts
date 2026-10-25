import { html, css } from 'lit';
import { SodaElement } from '../base-element';
import { siteConfig } from '../../content/data';

export class SodaFooter extends SodaElement {
  static override styles = css`
    :host {
      display: block;
      padding: 3rem 4%;
      border-top: 1px solid var(--color-glass-border);
    }

    .footer {
      max-width: var(--container-max);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-heading);
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-text);
    }

    .footer-tagline {
      color: var(--color-text-muted);
      font-size: var(--fs-sm);
    }

    .footer-nav {
      display: flex;
      gap: 2rem;
    }

    .footer-nav a {
      color: var(--color-text-muted);
      text-decoration: none;
      font-size: var(--fs-sm);
      transition: color var(--transition-base);
    }

    .footer-nav a:hover {
      color: var(--color-accent);
    }

    .footer-social {
      display: flex;
      gap: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-glass-bg);
      border: 1px solid var(--color-glass-border);
      color: var(--color-text-muted);
      text-decoration: none;
      transition: all var(--transition-base);
    }

    .social-link:hover {
      background: var(--color-glass-hover-bg);
      border-color: var(--color-glass-hover-border);
      color: var(--color-accent);
    }

    .footer-copyright {
      width: 100%;
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid var(--color-glass-border);
      color: var(--color-text-dim);
      font-size: var(--fs-xs);
    }

    @media (max-width: 768px) {
      .footer {
        flex-direction: column;
        text-align: center;
      }

      .footer-nav {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `;

  private currentYear = new Date().getFullYear();

  override render() {
    return html`
      <footer class="footer" role="contentinfo">
        <div class="footer-brand">
          <div class="footer-logo">
            ${siteConfig.brand.logoSvg}
            <span>${siteConfig.brand.name}</span>
          </div>
          <span class="footer-tagline">${siteConfig.brand.tagline}</span>
        </div>

        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="#ingredients">Ingredients</a>
          <a href="#taste">Taste</a>
          <a href="#eco">Eco</a>
          <a href="#reviews">Reviews</a>
        </nav>

        <div class="footer-social" aria-label="Social links">
          <a href="https://instagram.com" class="social-link" aria-label="Instagram" target="_blank" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://twitter.com" class="social-link" aria-label="Twitter" target="_blank" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a href="https://youtube.com" class="social-link" aria-label="YouTube" target="_blank" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.44 24.12 24.12 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.44 24.12 24.12 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
              <path d="M10 15l5-3-5-3z" />
            </svg>
          </a>
        </div>

        <p class="footer-copyright">
          &copy; ${this.currentYear} ${siteConfig.brand.name}. All rights reserved.
        </p>
      </footer>
    `;
  }
}

customElements.define('soda-footer', SodaFooter);