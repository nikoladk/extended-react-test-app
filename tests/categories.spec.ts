import { test, expect } from '@playwright/test';

test.describe('Feature: Category Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('login-page')).toBeVisible();
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });

  test('Sidebar menu is visible', async ({ page }) => {
    await expect(page.getByTestId('sidebar-menu')).toBeVisible();
  });

  test('Dashboard menu item is visible', async ({ page }) => {
    await expect(page.getByTestId('menu-dashboard')).toBeVisible();
  });

  test('Profile menu item is visible', async ({ page }) => {
    await expect(page.getByTestId('menu-profile')).toBeVisible();
  });

  test('Orders menu item is visible', async ({ page }) => {
    await expect(page.getByTestId('menu-orders')).toBeVisible();
  });

  test('Settings menu item is visible', async ({ page }) => {
    await expect(page.getByTestId('menu-settings')).toBeVisible();
  });

  test('Logout button is visible', async ({ page }) => {
    await expect(page.getByTestId('logout-button')).toBeVisible();
  });
});