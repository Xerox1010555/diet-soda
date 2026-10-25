import { test, expect } from '@playwright/test';

test.describe('Diet Soda Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      errors.push(err.message);
    });

    await page.waitForTimeout(2000);
    expect(errors).toHaveLength(0);
  });

  test('should display hero section with title', async ({ page }) => {
    await expect(page.locator('.main-title')).toBeVisible();
    await expect(page.locator('.main-title')).toContainText('Pure Zero');
  });

  test('should display flavor carousel', async ({ page }) => {
    await expect(page.locator('soda-carousel')).toBeVisible();
    await expect(page.locator('.carousel-card')).toHaveCount(2);
  });

  test('should switch flavor when clicking carousel card', async ({ page }) => {
    const limeCard = page.locator('.carousel-card[data-flavor="lime"]');
    await limeCard.click();

    await expect(page.locator('body')).toHaveClass(/blue-theme/);
    await expect(page.locator('.main-title')).toContainText('Refreshingly Clean');
  });

  test('should switch flavor when clicking CTA button', async ({ page }) => {
    const ctaButton = page.locator('.hero-left .btn-primary');
    await ctaButton.click();

    await expect(page.locator('body')).toHaveClass(/blue-theme/);
  });

  test('should have working carousel navigation arrows', async ({ page }) => {
    const nextArrow = page.locator('.nav-arrow').nth(1);
    await nextArrow.click();

    await expect(page.locator('body')).toHaveClass(/blue-theme/);
  });

  test('should display story section', async ({ page }) => {
    await expect(page.locator('section:has-text("Pure flavor. Zero compromise.")')).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await expect(page.locator('section:has-text("Zero Sugar")')).toBeVisible();
    await expect(page.locator('section:has-text("Natural Citrus")')).toBeVisible();
    await expect(page.locator('section:has-text("Premium Design")')).toBeVisible();
  });

  test('should display reviews section', async ({ page }) => {
    await expect(page.locator('section:has-text("Ariana L.")')).toBeVisible();
    await expect(page.locator('section:has-text("Jonah M.")')).toBeVisible();
    await expect(page.locator('section:has-text("Kiera S.")')).toBeVisible();
  });

  test('should display CTA section', async ({ page }) => {
    await expect(page.locator('section:has-text("Ready for a cleaner sip?")')).toBeVisible();
    await expect(page.locator('.cta-card .btn-primary')).toBeVisible();
    await expect(page.locator('.cta-card .btn-secondary')).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer:has-text("2026")')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    const navLinks = page.locator('.nav-item');
    await expect(navLinks).toHaveCount(5);
  });

  test('should have contact button', async ({ page }) => {
    await expect(page.locator('.contact-btn')).toBeVisible();
    await expect(page.locator('.contact-btn')).toHaveAttribute('href', 'mailto:hello@example.com?subject=Diet%20Soda%20Inquiry');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload({ waitUntil: 'networkidle' });

    await expect(page.locator('.main-title')).toBeVisible();
    await expect(page.locator('.hero-model')).toBeVisible();
  });

  test('CTA button should link to shop', async ({ page }) => {
    const ctaButton = page.locator('.cta-card .btn-primary');
    await expect(ctaButton).toHaveAttribute('href', 'https://shop.example.com');
    await expect(ctaButton).toHaveAttribute('target', '_blank');
    await expect(ctaButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have model-viewer loaded', async ({ page }) => {
    const modelViewer = page.locator('model-viewer.hero-model');
    await expect(modelViewer).toBeVisible();
  });

  test('should not have horizontal scroll', async ({ page }) => {
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  });
});