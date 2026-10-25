import { LitElement, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class SodaElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none !important;
    }
  `;

  protected generateId(prefix: string = 'soda'): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  }

  protected announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.getElementById(`a11y-announcer-${priority}`) || this.createAnnouncer(priority);
    announcer.textContent = '';
    setTimeout(() => {
      announcer.textContent = message;
    }, 100);
  }

  private createAnnouncer(priority: 'polite' | 'assertive'): HTMLElement {
    const announcer = document.createElement('div');
    announcer.id = `a11y-announcer-${priority}`;
    announcer.setAttribute('role', priority === 'polite' ? 'status' : 'alert');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    document.body.appendChild(announcer);
    return announcer;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'soda-header': SodaHeader;
    'soda-hero': SodaHero;
    'soda-carousel': SodaCarousel;
    'soda-story': SodaStory;
    'soda-features': SodaFeatures;
    'soda-reviews': SodaReviews;
    'soda-cta': SodaCTA;
    'soda-footer': SodaFooter;
    'soda-berries': SodaBerries;
    'soda-leaves': SodaLeaves;
    'soda-bubbles': SodaBubbles;
  }
}

class SodaHeader extends SodaElement {}
class SodaHero extends SodaElement {}
class SodaCarousel extends SodaElement {}
class SodaStory extends SodaElement {}
class SodaFeatures extends SodaElement {}
class SodaReviews extends SodaElement {}
class SodaCTA extends SodaElement {}
class SodaFooter extends SodaElement {}
class SodaBerries extends SodaElement {}
class SodaLeaves extends SodaElement {}
class SodaBubbles extends SodaElement {}