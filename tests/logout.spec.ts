import { test, expect } from '@playwright/test';

test.describe('Feature: Logout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login first
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await page.waitForSelector('[data-testid="dashboard"]');
  });

  test('Logout resets application state', async ({ page }) => {
    // Wrong: using 'signout-btn' instead of 'logout-button'
    await page.getByTestId('signout-btn').click();
    
    // Wrong: using 'goodbye-message' instead of 'logout-message'
    await expect(page.getByTestId('goodbye-message')).toHaveText('GoodBuy.');
    
    // Wrong: using 'auth-page' instead of 'login-page'
    await expect(page.getByTestId('auth-page')).toBeVisible();
  });
});
