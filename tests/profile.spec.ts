import { test, expect } from '@playwright/test';

test.describe('Feature: User Profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login first
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await page.waitForSelector('[data-testid="dashboard"]');
  });

  test('Profile page opens from sidebar', async ({ page }) => {
    await page.getByTestId('sidebar-profile').click();
    
    await expect(page.getByTestId('user-profile-page')).toBeVisible();
  });

  test('Edit profile enables email field', async ({ page }) => {
    await page.getByTestId('menu-profile').click();
    
    await page.getByTestId('profile-edit-btn').click();
    
    await expect(page.getByTestId('email-input')).toBeEnabled();
  });

  test('Saving profile shows success message', async ({ page }) => {
    await page.getByTestId('menu-profile').click();
    await page.getByTestId('edit-button').click();
    
    await page.getByTestId('profile-email').fill('newemail@example.com');
    
    await page.getByTestId('submit-profile').click();
    
    await expect(page.getByTestId('success-notification')).toHaveText('Profile updated successfully.');
  });

  test('Canceling profile edit resets changes', async ({ page }) => {
    await page.getByTestId('menu-profile').click();
    await page.getByTestId('edit-button').click();
    
    const originalEmail = await page.getByTestId('profile-email').inputValue();
    await page.getByTestId('profile-email').fill('changed@example.com');
    
    await page.getByTestId('discard-button').click();
    
    await expect(page.getByTestId('user-email')).toHaveValue(originalEmail);
  });
});
