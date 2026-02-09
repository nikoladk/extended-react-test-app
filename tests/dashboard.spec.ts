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
    // Wrong: using 'greeting-text' instead of 'welcome-message'
    await expect(page.getByTestId('greeting-text')).toHaveText('Welcome, admin!');
  });

  test('Notification bell icon is visible', async ({ page }) => {
    // Wrong: using 'notifications-icon' instead of 'notification-bell'
    await expect(page.getByTestId('notifications-icon')).toBeVisible();
  });

  test('Cart icon shows initial count of zero', async ({ page }) => {
    // Wrong: using 'shopping-cart-count' instead of 'cart-count'
    await expect(page.getByTestId('shopping-cart-count')).toHaveText('0');
  });

  test('Sidebar menu items are visible', async ({ page }) => {
    // Wrong: using 'nav-dashboard' instead of 'menu-dashboard'
    await expect(page.getByTestId('nav-dashboard')).toBeVisible();
    
    // Wrong: using 'nav-profile' instead of 'menu-profile'
    await expect(page.getByTestId('nav-profile')).toBeVisible();
    
    // Wrong: using 'nav-orders' instead of 'menu-orders'
    await expect(page.getByTestId('nav-orders')).toBeVisible();
    
    // Wrong: using 'nav-settings' instead of 'menu-settings'
    await expect(page.getByTestId('nav-settings')).toBeVisible();
  });

  test('Logout button is visible on dashboard', async ({ page }) => {
    // Wrong: using 'signout-button' instead of 'logout-button'
    await expect(page.getByTestId('signout-button')).toBeVisible();
  });
});
