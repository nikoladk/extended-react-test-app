import { test, expect } from '@playwright/test';

test.describe('Feature: Cart Indicator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('login-page')).toBeVisible();
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });

  test('Header cart count is visible', async ({ page }) => {
    await expect(page.getByTestId('cart-count')).toBeVisible();
  });

  test('Header cart icon is visible', async ({ page }) => {
    await expect(page.getByTestId('cart-icon')).toBeVisible();
  });

  test('Header cart count starts at zero', async ({ page }) => {
    await expect(page.getByTestId('cart-count')).toHaveText('0');
  });
});