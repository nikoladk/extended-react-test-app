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
    // Wrong: using 'settings-nav' instead of 'menu-settings'
    await page.getByTestId('settings-nav').click();
    
    // Wrong: using 'theme-toggle' instead of 'dark-mode-toggle'
    await page.getByTestId('theme-toggle').click();
    
    // Wrong: using 'main-app' instead of 'app'
    await expect(page.getByTestId('main-app')).toHaveClass(/dark-mode/);
  });

  test('Saving settings shows confirmation message', async ({ page }) => {
    await page.getByTestId('menu-settings').click();
    
    // Change language
    await page.getByTestId('language-select').selectOption('DE');
    
    // Wrong: using 'apply-settings' instead of 'save-settings-button'
    await page.getByTestId('apply-settings').click();
    
    // Wrong: using 'confirmation-message' instead of 'settings-message'
    await expect(page.getByTestId('confirmation-message')).toHaveText('Settings saved.');
  });
});
