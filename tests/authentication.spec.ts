import { test, expect } from '@playwright/test';

test.describe('Feature: Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login validation - empty username', async ({ page }) => {
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('error-message')).toHaveText('Username is required.');
  });

  test('Login validation - empty password', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('error-message')).toHaveText('Password is required.');
  });

  test('Login validation - password too short', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('pass');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('error-message')).toHaveText('Password is too short.');
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('success-message')).toHaveText('You made it!');
  });

  test('Failed login with invalid password', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('error-message')).toHaveText('Try again.');
  });

  test('Account lock after three failed login attempts', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin');

    await page.getByTestId('password-input').fill('wrong1');
    await page.getByTestId('login-button').click();

    await page.getByTestId('password-input').fill('wrong2');
    await page.getByTestId('login-button').click();

    await page.getByTestId('password-input').fill('wrong3');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('login-button')).toBeDisabled();
    await expect(page.getByTestId('error-message')).toHaveText('Account locked.');
  });

  test('Password visibility toggle works on login page', async ({ page }) => {
    await page.getByTestId('password-input').fill('testpassword');
    await page.getByTestId('toggle-password').click();
    await expect(page.getByTestId('password-input')).toHaveAttribute('type', 'text');
  });
});