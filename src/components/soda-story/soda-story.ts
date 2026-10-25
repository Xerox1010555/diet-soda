import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { SodaElement } from '../base-element';

export class SodaStory extends SodaElement {
  static override styles = css`
    :host {
      display: block;
    }

    .story-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 2rem;
      align-items: center;
      padding: 110px 0 70px;
      width: min(var(--container-max), calc(100% - 48px));
      margin: 0 auto;
    }

    .story-copy {
      padding: 2rem 0;
    }

    .eyebrow {
      display: inline-block;
      font-family: var(--font-ui);
      font-size: var(--fs-xs);
      font-weight: 600;
      letter-spacing: 0.17em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin-bottom: var(--space-4);
    }

    .story-title {
      font-family: var(--font-heading);
      font-size: var(--fs-story-title);
      line-height: 0.9;
      margin-bottom: 1rem;
    }

    .story-copy p {
      color: var(--color-text-muted);
      max-width: 520px;
      font-size: var(--fs-base);
      line-height: 1.8;
    }

    .story-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 30px;
      min-height: 340px;
      padding: 1.5rem;
      box-shadow: var(--shadow-xl);
      backdrop-filter: blur(14px);
    }

    .story-visual {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 26px;
      background: radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02) 45%, transparent 65%);
    }

    .mini-can {
      width: 230px;
      height: 320px;
      border-radius: 24px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06));
      border: 1px solid rgba(255, 255, 255, 0.18);
      position: relative;
      box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.14), 0 20px 30px rgba(0, 0, 0, 0.22);
      overflow: hidden;
    }

    .mini-can::before {
      content: "";
      position: absolute;
      inset: 0 20px 0 20px;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.15));
      border-radius: 18px;
    }

    .mini-can::after {
      content: "";
      position: absolute;
      width: 30px;
      height: 65%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 28px;
      background: radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.12) 30%, rgba(255, 255, 255, 0.04) 62%, rgba(255, 255, 255, 0.02) 100%);
    }

    @media (max-width: 768px) {
      .story-grid {
        grid-template-columns: 1fr;
        padding-top: 90px;
      }

      .story-copy {
        text-align: center;
      }

      .story-copy p {
        max-width: 100%;
      }
    }
  `;

  @property({ type: String })
  eyebrow = 'Our promise';

  @property({ type: String })
  title = 'Pure flavor. Zero compromise.';

  @property({ type: String })
  description = 'Crafted for people who want a bright, refreshing sip without the sugar rush. Soda delivers a crisp finish, smooth carbonation, and a premium look that feels as good as it tastes.';

  override render() {
    return html`
      <section class="section" aria-labelledby="story-title">
        <div class="story-grid">
          <div class="story-copy">
            <span class="eyebrow">${this.eyebrow}</span>
            <h2 id="story-title" class="story-title">${this.title}</h2>
            <p>${this.description}</p>
          </div>
          <div class="story-card">
            <div class="story-visual">
              <div class="mini-can" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('soda-story', SodaStory);