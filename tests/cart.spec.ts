import { test, expect } from '@playwright/test';

test.describe('Feature: Cart Indicator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await page.getByTestId('dashboard').waitFor();
  });

  test('Adding an item increases cart count', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();

    await expect(page.getByTestId('cart-count')).toHaveText('0');

    await page.getByTestId('add-to-cart-button').first().click({ force: true });

    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });

  test('Toast message appears when item is added', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();

    await page.getByTestId('add-to-cart-button').first().click({ force: true });

    await expect(page.getByText('Item added to cart.')).toBeVisible();
  });

  test('Cart count persists across category navigation', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();
    await page.getByTestId('add-to-cart-button').first().click({ force: true });

    await page.getByTestId('category-btn-clothes').click();

    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });
});