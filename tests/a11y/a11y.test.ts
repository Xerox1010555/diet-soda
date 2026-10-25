import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = await Promise.all(
      headings.map(async (h) => {
        const tag = await h.evaluate((el) => el.tagName.toLowerCase());
        return parseInt(tag.charAt(1), 10);
      })
    );

    expect(headingLevels[0]).toBe(1);
    for (let i = 1; i < headingLevels.length; i++) {
      expect(headingLevels[i]).toBeLessThanOrEqual(headingLevels[i - 1] + 1);
    }
  });

  test('should have skip link', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveCount(1);
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('should have proper landmark regions', async ({ page }) => {
    await expect(page.locator('header[role="banner"]')).toHaveCount(1);
    await expect(page.locator('main[role="main"]')).toHaveCount(1);
    await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);
    await expect(page.locator('nav[role="navigation"]')).toHaveCount(1);
  });

  test('should have focus visible styles', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = await page.locator(':focus-visible').first();
    await expect(focused).toBeVisible();
  });

  test('model-viewer should have aria-label', async ({ page }) => {
    const modelViewer = page.locator('model-viewer[aria-label]');
    await expect(modelViewer).toHaveCount(1);
  });

  test('images should have alt text', async ({ page }) => {
    const images = page.locator('img:not([aria-hidden="true"])');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('color contrast should meet WCAG AA', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag21aa'])
      .include('body')
      .analyze();

    const contrastViolations = results.violations.filter(
      (v) => v.id === 'color-contrast'
    );
    expect(contrastViolations).toEqual([]);
  });

  test('should respect prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload({ waitUntil: 'networkidle' });

    const animations = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--transition-base');
    });

    expect(animations.trim()).toBe('0ms');
  });
});