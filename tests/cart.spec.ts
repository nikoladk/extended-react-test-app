import { test, expect } from '@playwright/test';

test.describe('Feature: Cart Indicator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login first
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await page.waitForSelector('[data-testid="dashboard"]');
  });

  test('Adding an item increases cart count', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();
    
    const cartCountBefore = await page.getByTestId('cart-count').textContent();
    
    await page.getByTestId('add-to-cart-button').first().click();
    
    await expect(page.getByTestId('cart-count')).toHaveText((parseInt(cartCountBefore || '0') + 1).toString());
  });

  test('Toast message appears when item is added', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();
    
    await page.getByTestId('add-to-cart-button').first().click();
    
    await expect(page.getByTestId('notification-toast')).toHaveText('Item added to cart.');
  });

  test('Cart count persists across category navigation', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();
    await page.getByTestId('add-to-cart-button').first().click();
    
    await page.getByTestId('category-btn-clothes').click();
    
    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });
});