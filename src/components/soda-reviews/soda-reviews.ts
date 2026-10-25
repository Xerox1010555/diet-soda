import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { SodaElement } from '../base-element';
import type { Review } from '../../content/config';

export class SodaReviews extends SodaElement {
  static override styles = css`
    :host {
      display: block;
    }

    .reviews-grid {
      padding: 50px 0 100px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
      width: min(var(--container-max), calc(100% - 48px));
      margin: 0 auto;
    }

    .review-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 26px;
      padding: 1.5rem;
      transition: all var(--transition-slow);
    }

    .review-card:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .review-stars {
      color: var(--color-star);
      letter-spacing: 0.18em;
      font-size: var(--fs-xs);
      margin-bottom: 1rem;
    }

    .review-card p {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .review-author {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-avatar-gradient-start), var(--color-avatar-gradient-end));
      display: grid;
      place-items: center;
      color: var(--color-avatar-text);
      font-weight: 700;
      font-size: var(--fs-sm);
    }

    .review-author strong {
      display: block;
      font-size: var(--fs-sm);
    }

    .review-author span {
      color: var(--color-text-dim);
      font-size: var(--fs-xs);
    }

    @media (max-width: 768px) {
      .reviews-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  @property({ type: Array })
  reviews: Review[] = [];

  override render() {
    return html`
      <section class="section" aria-labelledby="reviews-title">
        <h2 id="reviews-title" class="sr-only">Customer Reviews</h2>
        <div class="reviews-grid" role="list" aria-label="Customer reviews">
          ${this.reviews.map((review) => html`
            <article class="review-card" role="listitem" itemprop="review" itemscope itemtype="https://schema.org/Review">
              <div class="review-stars" aria-label="${review.stars} out of 5 stars">
                ${'★'.repeat(review.stars)}
              </div>
              <p itemprop="reviewBody">"${review.quote}"</p>
              <div class="review-author" itemprop="author" itemscope itemtype="https://schema.org/Person">
                <div class="avatar" aria-hidden="true">${review.author.initial}</div>
                <div>
                  <strong itemprop="name">${review.author.name}</strong>
                  <span itemprop="jobTitle">${review.author.role}</span>
                </div>
              </div>
              <meta itemprop="ratingValue" content="${review.stars}">
              <meta itemprop="bestRating" content="5">
            </article>
          `)}
        </div>
      </section>
    `;
  }
}

customElements.define('soda-reviews', SodaReviews);