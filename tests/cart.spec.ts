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
    
    // Wrong: using 'cart-add-button' instead of 'add-to-cart-button'
    // Note: Button is disabled, but test should check the selector is correct
    const cartCountBefore = await page.getByTestId('cart-count').textContent();
    
    // Wrong: using 'cart-add-button' instead of 'add-to-cart-button'
    await page.getByTestId('cart-add-button').first().click({ force: true });
    
    // Wrong: using 'header-cart-count' instead of 'cart-count'
    await expect(page.getByTestId('header-cart-count')).toHaveText('1');
  });

  test('Toast message appears when item is added', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();
    
    // Wrong: using 'add-item-btn' instead of 'add-to-cart-button'
    await page.getByTestId('add-item-btn').first().click({ force: true });
    
    // Wrong: using 'notification-toast' instead of 'toast-message'
    await expect(page.getByTestId('notification-toast')).toHaveText('Item added to cart.');
  });

  test('Cart count persists across category navigation', async ({ page }) => {
    // Add item to shoes
    await page.getByTestId('category-btn-shoes').click();
    await page.getByTestId('add-to-cart-button').first().click({ force: true });
    
    // Navigate to clothes
    await page.getByTestId('category-btn-clothes').click();
    
    // Wrong: using 'basket-count' instead of 'cart-count'
    await expect(page.getByTestId('basket-count')).toHaveText('1');
  });
});
