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
    await page.getByTestId('menu-settings').click();
    
    await page.getByTestId('dark-mode-toggle').click();
    
    await expect(page.getByTestId('settings-page')).toHaveClass(/dark-mode/);
  });

  test('Saving settings shows confirmation message', async ({ page }) => {
    await page.getByTestId('menu-settings').click();
    
    await page.getByTestId('language-select').selectOption('DE');
    
    await page.getByTestId('save-settings-button').click();
    
    await expect(page.getByTestId('settings-message')).toHaveText('Settings saved.');
  });
});