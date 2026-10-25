import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { SodaElement } from '../base-element';
import { siteConfig } from '../../content/data';
import { flavorStore } from '../../composables/useFlavorStore';
import { useBerryParallax, useLeafParallax } from '../../composables/useParallax';
import { useBubbles } from '../../composables/useBubbles';
import { useAnalytics } from '../../composables/useAnalytics';
import { gsap } from 'gsap';
import type { HTMLModelViewerElement } from '../../types/model-viewer';

export class SodaHero extends SodaElement {
  static override styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .hero {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4%;
      padding-top: 5rem;
      position: relative;
    }

    .hero-content {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      width: 100%;
      max-width: 100%;
      height: 100%;
      position: relative;
    }

    .hero-left {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 6rem 0;
      gap: 2rem;
      z-index: 100;
    }

    .main-title {
      font-family: var(--font-heading);
      font-size: clamp(5rem, 10vw, 12rem);
      line-height: 0.8;
      font-weight: 400;
      white-space: nowrap;
      color: var(--color-text);
      letter-spacing: normal;
    }

    .description {
      color: var(--color-text-muted);
      font-size: var(--fs-lg);
      line-height: 1.6;
      max-width: 400px;
    }

    .cta-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .award-badge {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: auto;
    }

    .award-icon {
      width: 48px;
      height: 48px;
      background: var(--color-glass-bg);
      border: 1px solid var(--color-glass-border);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .award-text {
      display: flex;
      flex-direction: column;
    }

    .award-title {
      font-size: var(--fs-xs);
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
    }

    .award-subtitle {
      font-size: var(--fs-sm);
      font-weight: 600;
    }

    .hero-center {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
      animation: fadeIn 1.5s ease-out 0.3s forwards, float 6s ease-in-out infinite;
      pointer-events: none;
      background: radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
    }

    .hero-model {
      width: 80vw;
      height: 80vh;
      outline: none;
      --progress-bar-color: transparent;
      --poster-color: transparent;
      z-index: 1;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(25deg);
      pointer-events: none;
    }

    .hero-model[camera-controls] {
      pointer-events: auto;
    }

    .hero-model.switching {
      filter: blur(15px);
    }

    .hero-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      text-align: right;
      height: 100%;
      padding: 6rem 0;
      z-index: 100;
      width: 450px;
      pointer-events: none;
    }

    .product-carousel {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: flex-end;
      pointer-events: auto;
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

    .carousel-card:hover {
      background: var(--color-glass-hover-bg);
      border-color: var(--color-glass-hover-border);
    }

    .carousel-card[aria-selected="true"] {
      border-color: var(--color-accent);
      border-width: 1px;
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

    .carousel-card:hover .carousel-card__image {
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

    .nav-arrow:hover {
      background: var(--color-glass-hover-bg);
    }

    .side-title {
      font-family: var(--font-heading);
      font-size: clamp(5rem, 10vw, 12rem);
      line-height: 0.8;
      font-weight: 400;
      white-space: nowrap;
      color: var(--color-text);
      letter-spacing: normal;
      align-self: flex-end;
      text-align: right;
    }

    .berries-container,
    .berries-container-bg,
    .leaves-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      transition: transform 0.1s ease-out;
    }

    .berries-container {
      z-index: 110;
    }

    .berries-container-bg {
      z-index: 0;
    }

    .leaves-container {
      z-index: -1;
    }

    .berry,
    .leaf {
      position: absolute;
      pointer-events: none;
      will-change: transform;
    }

    .berry {
      width: 120px;
      height: 120px;
      outline: none;
      --progress-bar-color: transparent;
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
    }

    .leaf {
      width: 60px;
      height: 60px;
      filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
    }

    /* Berry positions */
    .berry.b1 { top: 25%; left: 30%; width: 220px; height: 220px; }
    .berry.b2 { top: 60%; left: 42%; width: 100px; height: 100px; }
    .berry.b3 { top: 30%; left: 62%; width: 250px; height: 250px; }
    .berry.b4 { top: 15%; left: 48%; width: 140px; height: 140px; }
    .berry.b5 { top: 75%; left: 20%; width: 120px; height: 120px; }
    .berry.b6 { top: 45%; left: 75%; width: 180px; height: 180px; }
    .berry.b7 { top: 15%; left: 40%; width: 80px; height: 80px; opacity: 0.7; }
    .berry.b8 { top: 50%; left: 55%; width: 70px; height: 70px; opacity: 0.6; }
    .berry.b9 { top: 80%; left: 35%; width: 75px; height: 75px; opacity: 0.7; }

    /* Leaf positions */
    .leaf.l1 { top: 10%; left: 15%; }
    .leaf.l2 { top: 40%; left: 80%; width: 140px; height: 140px; opacity: 0.4; }
    .leaf.l3 { top: 70%; left: 75%; width: 80px; height: 80px; }
    .leaf.l4 { top: 85%; left: 20%; width: 120px; height: 120px; opacity: 0.3; }

    /* Bubbles container */
    #bubbles-container {
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

    @keyframes fadeIn {
      to { opacity: 1; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
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

    @media (max-width: 1200px) {
      .hero-model {
        width: 100vw;
        height: 60vh;
        top: 40%;
      }

      .hero-content {
        flex-direction: column;
        padding-top: 8rem;
      }

      .hero-center {
        order: -1;
      }

      .main-title,
      .side-title {
        font-size: 5rem;
      }

      .hero-right {
        align-items: center;
        text-align: center;
        width: 100%;
      }

      .side-title {
        align-self: center;
        text-align: center;
      }

      .carousel-cards {
        justify-content: center;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .hero-center,
      .hero-model,
      .berry,
      .leaf,
      .bubble-img {
        animation: none !important;
        transition: none !important;
      }

      .hero-center {
        opacity: 1;
      }
    }
  `;

  @property({ type: Boolean })
  loaded = false;

  @state()
  private currentFlavor = siteConfig.flavors[0];

  @state()
  private isSwitching = false;

  private modelViewerEl: HTMLModelViewerElement | null = null;
  private modelLoaded = false;
  private berryParallax: { destroy: () => void } | null = null;
  private leafParallax: { destroy: () => void } | null = null;
  private bubbles: { destroy: () => void } | null = null;
  private analytics = useAnalytics({ measurementId: '' });

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();

    this.flavorStore.subscribe((flavor) => {
      this.currentFlavor = flavor;
      this.requestUpdate();
    });

    this.setupAnimations();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.cleanup();
  }

  private setupAnimations(): void {
    this.initBubbles();
  }

  private initBubbles(): void {
    const bubblesContainer = this.shadowRoot?.getElementById('bubbles-container');
    if (bubblesContainer) {
      this.bubbles = useBubbles({
        container: bubblesContainer,
        imageUrl: '/assets/images/bubble.svg',
        spawnRate: 400,
        minSize: 10,
        maxSize: 30,
        minDuration: 4,
        maxDuration: 10,
        minOpacity: 0.2,
        maxOpacity: 0.6,
      });
    }
  }

  private cleanup(): void {
    this.berryParallax?.destroy();
    this.leafParallax?.destroy();
    this.bubbles?.destroy();
  }

  private handleModelLoad = async (flavor: typeof siteConfig.flavors[0]): Promise<void> => {
    if (!this.modelViewerEl) return;

    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Model load timeout')), 15000);
        const onLoad = () => {
          clearTimeout(timeout);
          this.modelViewerEl!.removeEventListener('load', onLoad);
          this.modelViewerEl!.removeEventListener('error', onError);
          resolve();
        };
        const onError = (e: Event) => {
          clearTimeout(timeout);
          this.modelViewerEl!.removeEventListener('load', onLoad);
          this.modelViewerEl!.removeEventListener('error', onError);
          reject(new Error(`Model load failed: ${(e as ErrorEvent).message}`));
        };
        this.modelViewerEl!.addEventListener('load', onLoad, { once: true });
        this.modelViewerEl!.addEventListener('error', onError, { once: true });
        this.modelViewerEl!.src = flavor.modelUrl;
      });

      this.modelLoaded = true;

      const texture = await this.modelViewerEl.createTexture(flavor.textureUrl);
      this.modelViewerEl.model?.materials.forEach((material) => {
        if (material.pbrMetallicRoughness?.baseColorTexture) {
          material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
        }
      });

      this.loaded = true;
      this.requestUpdate();
    } catch (error) {
      console.error('Model load failed:', error);
    }
  };

  private async switchFlavor(flavorId: string): Promise<void> {
    if (this.isSwitching) return;

    const targetFlavor = siteConfig.flavors.find((f) => f.id === flavorId);
    if (!targetFlavor || targetFlavor === this.currentFlavor) return;

    this.isSwitching = true;
    this.announce(`Switching to ${targetFlavor.name}`);

    if (this.modelViewerEl) {
      this.modelViewerEl.classList.add('switching');
    }

    const targetColors = targetFlavor.id === 'lime'
      ? {
          '--color-bg-inner': '#0b4f8a',
          '--color-bg-mid': '#04294e',
          '--color-bg-outer': '#010c14',
        }
      : {
          '--color-bg-inner': '#0b8a78',
          '--color-bg-mid': '#044e3b',
          '--color-bg-outer': '#011411',
        };

    const body = document.body;
    const tl = gsap.timeline();

    tl.to(body, {
      ...targetColors,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    const spinObj = { val: 0, blur: 0 };
    tl.to(spinObj, {
      val: 360,
      blur: 15,
      duration: 0.6,
      ease: 'power2.in',
      onUpdate: () => {
        if (this.modelViewerEl) {
          this.modelViewerEl.style.filter = `blur(${spinObj.blur}px)`;
        }
      },
    });

    await this.swapTexture(targetFlavor.textureUrl);

    if (targetFlavor.id === 'lime') {
      body.classList.add('blue-theme');
    } else {
      body.classList.remove('blue-theme');
    }

    await this.swapBerries(targetFlavor);

    tl.to(spinObj, {
      val: 720,
      blur: 0,
      duration: 1.5,
      ease: 'back.out(0.7)',
      onUpdate: () => {
        if (this.modelViewerEl) {
          this.modelViewerEl.style.filter = `blur(${spinObj.blur}px)`;
        }
      },
      onComplete: () => {
        if (this.modelViewerEl) {
          this.modelViewerEl.style.filter = 'none';
          this.modelViewerEl.classList.remove('switching');
        }
      },
    });

    flavorStore.switchFlavor(flavorId);
    this.analytics.trackFlavorSwitch(this.currentFlavor.id, flavorId);

    this.isSwitching = false;
  }

  private async swapTexture(textureUrl: string): Promise<void> {
    if (!this.modelViewerEl?.model) return;

    try {
      const texture = await this.modelViewerEl.createTexture(textureUrl);
      this.modelViewerEl.model.materials.forEach((material) => {
        if (material.pbrMetallicRoughness?.baseColorTexture) {
          material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
        }
      });
    } catch (error) {
      console.error('Texture swap failed:', error);
    }
  }

  private async swapBerries(targetFlavor: typeof siteConfig.flavors[0]): Promise<void> {
    const berries = this.shadowRoot?.querySelectorAll('.berry');
    if (!berries) return;

    const heroCenter = this.shadowRoot?.querySelector('.hero-center');

    const promises = Array.from(berries).map((berry) => {
      return new Promise<void>((resolve) => {
        const berryEl = berry as HTMLElement;
        const bW = berryEl.offsetWidth / 2;
        const bH = berryEl.offsetHeight / 2;
        const centerX = (window.innerWidth / 2 - berryEl.offsetLeft - bW);
        const centerY = (window.innerHeight / 2 - berryEl.offsetTop - bH);

        const startAngle = 0;
        const nextBaseX = (Math.random() - 0.5) * 200;
        const nextBaseY = (Math.random() - 0.5) * 200;

        const tl = gsap.timeline();

        tl.to(berryEl, {
          x: centerX,
          y: centerY,
          rotation: startAngle + 45,
          scale: 0.1,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            const mv = berryEl.querySelector('model-viewer');
            if (mv) {
              mv.src = targetFlavor.berryModelUrl;
            }
            if (heroCenter) {
              (heroCenter as HTMLElement).style.zIndex = '50';
            }
          },
        })
          .to(berryEl, { duration: 0.3 })
          .to(berryEl, {
            onStart: () => {
              if (heroCenter) {
                (heroCenter as HTMLElement).style.zIndex = '1';
              }
            },
            x: nextBaseX,
            y: nextBaseY,
            rotation: startAngle + 90,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'back.out(1.5)',
            onComplete: resolve,
          });
      });
    });

    await Promise.all(promises);
  }

  private handleCarouselSelect = (flavorId: string): void => {
    this.switchFlavor(flavorId);
  };

  private handleCTAClick = (ctaName: string): void => {
    this.analytics.trackCTA(ctaName, this.currentFlavor.id, 'hero');
  };

  private handleModelViewerReady = (e: Event): void => {
    const mv = e.target as HTMLModelViewerElement;
    this.modelViewerEl = mv;

    if (!this.modelLoaded) {
      this.handleModelLoad(this.currentFlavor);
    }
  };

  override render() {
    const flavor = this.currentFlavor;

    return html`
      <div id="bubbles-container"></div>

      <main class="hero" role="main" id="main-content">
        <div class="hero-content">
          <div class="leaves-container">
            <model-viewer class="leaf l1" src="/assets/models/leaves.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="45deg 75deg 105%"></model-viewer>
            <model-viewer class="leaf l2" src="/assets/models/leaves.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="-30deg 60deg 105%"></model-viewer>
            <model-viewer class="leaf l3" src="/assets/models/leaves.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="120deg 85deg 105%"></model-viewer>
            <model-viewer class="leaf l4" src="/assets/models/leaves.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="10deg 45deg 105%"></model-viewer>
          </div>

          <div class="hero-left">
            <h1 class="main-title">
              <span>${flavor.tagline.split(' ')[0]}</span><br />
              ${flavor.tagline.split(' ').slice(1).join(' ')}
            </h1>
            <p class="description">
              Unleash the crisp taste of zero sugar. <br />
              Refreshment redefined in every bubble — <br />
              all in one sleek design.
            </p>
            <div class="cta-group">
              <button
                class="btn btn-primary"
                @click=${() => this.handleCTAClick(this.currentFlavor.name)}
              >
                ${siteConfig.cta.primary}
                <span class="plus-icon">+</span>
              </button>
            </div>
            <div class="award-badge">
              <div class="award-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15L15 18L19 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="award-text">
                <span class="award-title">DESIGN AWARDS</span>
                <span class="award-subtitle">PREMIUM BEVERAGE 2025</span>
              </div>
            </div>
          </div>

          <div class="berries-container-bg">
            <model-viewer class="berry b7" src="${flavor.id === 'lime' ? '/assets/models/blueberry.glb' : '/assets/models/cherry.glb'}" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="-20deg 110deg 105%"></model-viewer>
            <model-viewer class="berry b8" src="${flavor.id === 'lime' ? '/assets/models/blueberry.glb' : '/assets/models/cherry.glb'}" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="160deg 45deg 105%"></model-viewer>
            <model-viewer class="berry b9" src="${flavor.id === 'lime' ? '/assets/models/blueberry.glb' : '/assets/models/cherry.glb'}" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="45deg 20deg 105%"></model-viewer>
          </div>

          <div class="hero-center">
            <model-viewer
              @load=${this.handleModelViewerReady}
              class="hero-model"
              aria-label="Interactive 3D model of ${flavor.name} can"
            ></model-viewer>
          </div>

          <div class="berries-container">
            <model-viewer class="berry b1" src="${flavor.id === 'lime' ? '/assets/models/blueberry.glb' : '/assets/models/cherry.glb'}" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="45deg 120deg 105%"></model-viewer>
            <model-viewer class="berry b2" src="${flavor.id === 'lime' ? '/assets/models/blueberry.glb' : '/assets/models/cherry.glb'}" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="-120deg 45deg 105%"></model-viewer>
            <model-viewer class="berry b3" src="${flavor.id === 'lime' ? '/assets/models/blueberry.glb' : '/assets/models/cherry.glb'}" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="200deg 90deg 105%"></model-viewer>
            <model-viewer class="berry b4" src="${flavor.id === 'lime' ? '/assets/models/blueberry.glb' : '/assets/models/cherry.glb'}" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="-45deg 120deg 105%"></model-viewer>
            <model-viewer class="berry b5" src="${flavor.id === 'lime' ? '/assets/models/blueberry.glb' : '/assets/models/cherry.glb'}" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="-45deg 160deg 105%"></model-viewer>
            <model-viewer class="berry b6" src="${flavor.id === 'lime' ? '/assets/models/blueberry.glb' : '/assets/models/cherry.glb'}" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="80deg 75deg 105%"></model-viewer>
          </div>

          <div class="hero-right">
            <soda-carousel
              .flavors=${siteConfig.flavors}
              .activeFlavor=${flavor.id}
              .disabled=${this.isSwitching}
              @select-flavor=${(e: CustomEvent) => this.handleCarouselSelect(e.detail)}
            ></soda-carousel>

            <h2 class="side-title">
              <span>${flavor.tagline.split(' ').slice(0, -1).join(' ')}</span><br />
              ${flavor.tagline.split(' ').slice(-1)[0]}
            </h2>
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define('soda-hero', SodaHero);