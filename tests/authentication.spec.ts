import { test, expect } from '@playwright/test';

test.describe('Feature: Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login validation - empty username', async ({ page }) => {
    await page.getByTestId('signin-button').click();
    
    await expect(page.getByTestId('validation-error')).toHaveText('Username is required.');
  });

  test('Login validation - empty password', async ({ page }) => {
    await page.getByTestId('user-input').fill('admin');
    
    await page.getByTestId('submit-btn').click();
    
    await expect(page.getByTestId('form-error')).toHaveText('Password is required.');
  });

  test('Login validation - password too short', async ({ page }) => {
    await page.getByTestId('username-field').fill('admin');
    
    await page.getByTestId('password-field').fill('pass');
    
    await page.getByTestId('login-btn').click();
    
    await expect(page.getByTestId('error-message')).toHaveText('Password is too short.');
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    
    await page.getByTestId('auth-button').click();
    
    await expect(page.getByTestId('login-success')).toHaveText('You made it!');
  });

  test('Failed login with invalid password', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('login-button').click();
    
    await expect(page.getByTestId('login-error')).toHaveText('Try again.');
  });

  test('Account lock after three failed login attempts', async ({ page }) => {
    // First failed attempt
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('wrong1');
    await page.getByTestId('login-button').click();
    
    // Second failed attempt
    await page.getByTestId('password-input').fill('wrong2');
    await page.getByTestId('login-button').click();
    
    // Third failed attempt
    await page.getByTestId('password-input').fill('wrong3');
    await page.getByTestId('login-button').click();
    
    await expect(page.getByTestId('submit-button')).toBeDisabled();
    
    await expect(page.getByTestId('lock-message')).toHaveText('Account locked.');
  });

  test('Password visibility toggle works on login page', async ({ page }) => {
    await page.getByTestId('password-input').fill('testpassword');
    
    await page.getByTestId('show-password-btn').click();
    
    await expect(page.getByTestId('password-field')).toHaveAttribute('type', 'text');
  });
});
