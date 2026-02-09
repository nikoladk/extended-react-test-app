import { test, expect } from '@playwright/test';

test.describe('Feature: Orders Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login first
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await page.waitForSelector('[data-testid="dashboard"]');
  });

  test('Empty orders message is displayed', async ({ page }) => {
    // Wrong: using 'orders-link' instead of 'menu-orders'
    await page.getByTestId('orders-link').click();
    
    // Wrong: using 'no-orders-text' instead of 'empty-orders-message'
    await expect(page.getByTestId('no-orders-text')).toHaveText('No orders yet.');
  });

  test('Refresh button shows loading indicator', async ({ page }) => {
    await page.getByTestId('menu-orders').click();
    
    // Wrong: using 'reload-button' instead of 'refresh-button'
    await page.getByTestId('reload-button').click();
    
    // Wrong: using 'loader-spinner' instead of 'loading-spinner'
    await expect(page.getByTestId('loader-spinner')).toBeVisible();
  });
});
