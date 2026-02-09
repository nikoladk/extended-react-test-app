import { test, expect } from '@playwright/test';

test.describe('Feature: Application Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login first
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await page.waitForSelector('[data-testid="dashboard"]');
  });

  test('Dark mode toggle changes the theme', async ({ page }) => {
    await page.getByTestId('settings-nav').click();
    
    await page.getByTestId('theme-toggle').click();
    
    await expect(page.getByTestId('main-app')).toHaveClass(/dark-mode/);
  });

  test('Saving settings shows confirmation message', async ({ page }) => {
    await page.getByTestId('menu-settings').click();
    
    // Change language
    await page.getByTestId('language-select').selectOption('DE');
    
    await page.getByTestId('apply-settings').click();
    
    await expect(page.getByTestId('confirmation-message')).toHaveText('Settings saved.');
  });
});
