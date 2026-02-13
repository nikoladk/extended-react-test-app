import { test, expect } from '@playwright/test';

test.describe('Feature: Application Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('login-page')).toBeVisible();
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });

  test('App root is visible', async ({ page }) => {
    await expect(page.getByTestId('app')).toBeVisible();
  });

  test('Settings menu item is visible', async ({ page }) => {
    await expect(page.getByTestId('menu-settings')).toBeVisible();
  });
});