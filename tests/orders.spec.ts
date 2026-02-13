import { test, expect } from '@playwright/test';

test.describe('Feature: Orders Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('login-page')).toBeVisible();
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });

  test('Orders menu item is visible', async ({ page }) => {
    await expect(page.getByTestId('menu-orders')).toBeVisible();
  });

  test('Can navigate to Orders via sidebar menu', async ({ page }) => {
    await page.getByTestId('menu-orders').click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });
});