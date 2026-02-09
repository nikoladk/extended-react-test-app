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
    await page.getByTestId('menu-orders').click();
    
    await expect(page.getByTestId('empty-orders-message')).toHaveText('No orders yet.');
  });

  test('Refresh button shows loading indicator', async ({ page }) => {
    await page.getByTestId('menu-orders').click();
    
    await page.getByTestId('refresh-button').click();
    
    await expect(page.getByTestId('loading-spinner')).toBeVisible();
  });
});