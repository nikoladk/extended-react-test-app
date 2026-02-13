import { test, expect } from '@playwright/test';

test.describe('Feature: User Profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('login-page')).toBeVisible();
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });

  test('Profile menu item is visible', async ({ page }) => {
    await expect(page.getByTestId('menu-profile')).toBeVisible();
  });

  test('Can navigate to Profile via sidebar menu', async ({ page }) => {
    await page.getByTestId('menu-profile').click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });
});