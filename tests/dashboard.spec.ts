import { test, expect } from '@playwright/test';

test.describe('Feature: Dashboard & Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login first
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    // Wait for dashboard
    await page.waitForSelector('[data-testid="dashboard"]');
  });

  test('Welcome message is displayed on dashboard', async ({ page }) => {
    await expect(page.getByTestId('welcome-message')).toHaveText('Welcome, admin!');
  });

  test('Notification bell icon is visible', async ({ page }) => {
    await expect(page.getByTestId('notification-bell')).toBeVisible();
  });

  test('Cart icon shows initial count of zero', async ({ page }) => {
    await expect(page.getByTestId('cart-count')).toHaveText('0');
  });

  test('Sidebar menu items are visible', async ({ page }) => {
    await expect(page.getByTestId('menu-dashboard')).toBeVisible();
    
    await expect(page.getByTestId('menu-profile')).toBeVisible();
    
    await expect(page.getByTestId('menu-orders')).toBeVisible();
    
    await expect(page.getByTestId('menu-settings')).toBeVisible();
  });

  test('Logout button is visible on dashboard', async ({ page }) => {
    await expect(page.getByTestId('logout-button')).toBeVisible();
  });
});