import { test, expect } from '@playwright/test';

test.describe('Feature: Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login validation - empty username', async ({ page }) => {
    // Wrong: using 'signin-button' instead of 'login-button'
    await page.getByTestId('signin-button').click();
    
    // Wrong: using 'validation-error' instead of 'error-message'
    await expect(page.getByTestId('validation-error')).toHaveText('Username is required.');
  });

  test('Login validation - empty password', async ({ page }) => {
    // Wrong: using 'user-input' instead of 'username-input'
    await page.getByTestId('user-input').fill('admin');
    
    // Wrong: using 'submit-btn' instead of 'login-button'
    await page.getByTestId('submit-btn').click();
    
    // Wrong: using 'form-error' instead of 'error-message'
    await expect(page.getByTestId('form-error')).toHaveText('Password is required.');
  });

  test('Login validation - password too short', async ({ page }) => {
    // Wrong: using 'username-field' instead of 'username-input'
    await page.getByTestId('username-field').fill('admin');
    
    // Wrong: using 'password-field' instead of 'password-input'
    await page.getByTestId('password-field').fill('pass');
    
    // Wrong: using 'login-btn' instead of 'login-button'
    await page.getByTestId('login-btn').click();
    
    await expect(page.getByTestId('error-message')).toHaveText('Password is too short.');
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    
    // Wrong: using 'auth-button' instead of 'login-button'
    await page.getByTestId('auth-button').click();
    
    // Wrong: using 'login-success' instead of 'success-message'
    await expect(page.getByTestId('login-success')).toHaveText('You made it!');
  });

  test('Failed login with invalid password', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('login-button').click();
    
    // Wrong: using 'login-error' instead of 'error-message'
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
    
    // Wrong: using 'submit-button' instead of 'login-button'
    await expect(page.getByTestId('submit-button')).toBeDisabled();
    
    // Wrong: using 'lock-message' instead of 'error-message'
    await expect(page.getByTestId('lock-message')).toHaveText('Account locked.');
  });

  test('Password visibility toggle works on login page', async ({ page }) => {
    await page.getByTestId('password-input').fill('testpassword');
    
    // Wrong: using 'show-password-btn' instead of 'toggle-password'
    await page.getByTestId('show-password-btn').click();
    
    // Wrong: using 'password-field' instead of 'password-input'
    await expect(page.getByTestId('password-field')).toHaveAttribute('type', 'text');
  });
});
