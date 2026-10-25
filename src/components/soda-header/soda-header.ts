import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { SodaElement } from '../base-element';
import { siteConfig } from '../../content/data';
import { announceToScreenReader } from '../../utils/a11y';

export class SodaHeader extends SodaElement {
  static override styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--z-header);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 4%;
      max-width: var(--container-max);
      margin: 0 auto;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-heading);
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-text);
      text-decoration: none;
    }

    .logo:hover {
      color: var(--color-accent);
    }

    .nav {
      display: flex;
      gap: 0.5rem;
      background: var(--color-glass-bg);
      border: 1px solid var(--color-glass-border);
      padding: 0.4rem;
      border-radius: var(--radius-pill);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .nav-item {
      font-family: var(--font-ui);
      color: var(--color-text-muted);
      text-decoration: none;
      font-size: var(--fs-sm);
      font-weight: 500;
      padding: 0.5rem 1.2rem;
      border-radius: var(--radius-pill);
      transition: all var(--transition-base);
    }

    .nav-item:hover,
    .nav-item[aria-current="page"] {
      background: var(--color-accent);
      color: var(--color-bg-outer);
    }

    .contact-btn {
      background: var(--color-button-bg);
      color: var(--color-text);
      border: none;
      padding: 0.9rem 2rem;
      border-radius: var(--radius-pill);
      font-weight: 600;
      font-size: var(--fs-sm);
      cursor: pointer;
      transition: all var(--transition-base);
    }

    .contact-btn:hover {
      background: var(--color-button-hover);
      transform: translateY(-2px);
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--color-text);
      font-size: 1.5rem;
      cursor: pointer;
      padding: var(--space-2);
    }

    @media (max-width: 768px) {
      .header {
        padding: 1rem 4%;
      }

      .nav {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        flex-direction: column;
        padding: var(--space-4);
        gap: var(--space-2);
        background: var(--color-bg-outer);
        border: 1px solid var(--color-glass-border);
        border-top: none;
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-slow);
        box-shadow: var(--shadow-lg);
      }

      .nav.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .nav-item {
        width: 100%;
        text-align: center;
      }

      .mobile-menu-btn {
        display: block;
      }

      .contact-btn {
        width: 100%;
        margin-top: var(--space-2);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .nav,
      .nav-item,
      .contact-btn {
        transition: none;
      }
    }
  `;

  @property({ type: Boolean })
  scrolled = false;

  @state()
  private mobileMenuOpen = false;

  private navItems = [
    { href: '#', label: 'Home', current: true },
    { href: '#ingredients', label: 'Ingredients' },
    { href: '#taste', label: 'Taste' },
    { href: '#eco', label: 'Eco' },
    { href: '#reviews', label: 'Reviews' },
  ];

  override render() {
    return html`
      <header class="header" role="banner">
        <a href="/" class="logo" aria-label="${siteConfig.brand.name} - ${siteConfig.brand.tagline}">
          ${siteConfig.brand.logoSvg}
          <span>${siteConfig.brand.name}</span>
        </a>

        <nav class="nav" role="navigation" aria-label="Main navigation" ?open=${this.mobileMenuOpen}>
          ${this.navItems.map(
            (item) => html`
              <a
                href=${item.href}
                class="nav-item"
                ?aria-current=${item.current ? 'page' : undefined}
                @click=${() => this.closeMobileMenu()}
              >
                ${item.label}
              </a>
            `
          )}
          <a
            href=${siteConfig.cta.contactUrl}
            class="contact-btn btn btn-primary"
            @click=${() => this.closeMobileMenu()}
          >
            Contact Us
          </a>
        </nav>

        <button
          class="mobile-menu-btn"
          @click=${this.toggleMobileMenu}
          aria-expanded=${this.mobileMenuOpen}
          aria-controls="main-nav"
          aria-label=${this.mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          ${this.mobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>
    `;
  }

  private toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    announceToScreenReader(this.mobileMenuOpen ? 'Menu opened' : 'Menu closed');
  }

  private closeMobileMenu(): void {
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }

  setScrolled(scrolled: boolean): void {
    this.scrolled = scrolled;
  }
}

customElements.define('soda-header', SodaHeader);