import { test, expect } from '@playwright/test';

test.describe('Feature: Logout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('login-page')).toBeVisible();
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });

  test('Logout resets application state', async ({ page }) => {
    await page.getByTestId('logout-button').click();

    await expect(page.getByTestId('logout-message')).toHaveText('GoodBuy.');
    await expect(page.getByTestId('login-page')).toBeVisible();
  });
});