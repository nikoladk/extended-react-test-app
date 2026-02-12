import { test, expect } from '@playwright/test';

test.describe('Feature: Category Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    await page.waitForSelector('[data-testid="dashboard"]');
  });

  test('Shoes category opens successfully', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();
    await expect(page.getByTestId('category-message')).toHaveText('Welcome to Shoes section.');
  });

  test('Clothes category opens successfully', async ({ page }) => {
    await page.getByTestId('category-btn-clothes').click();
    await expect(page.getByTestId('category-message')).toHaveText('Welcome to Clothes section.');
  });

  test('Accessories category opens successfully', async ({ page }) => {
    await page.getByTestId('category-btn-accessories').click();
    await expect(page.getByTestId('category-message')).toHaveText('Welcome to Accessories section.');
  });

  test('Only one category section is visible at a time', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();
    await expect(page.getByTestId('category-shoes')).toBeVisible();

    await page.getByTestId('category-btn-clothes').click();

    await expect(page.getByTestId('category-shoes')).not.toBeVisible();
    await expect(page.getByTestId('category-clothes')).toBeVisible();
  });

  test('Category item counter is displayed', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();
    await expect(page.getByTestId('item-counter')).toBeVisible();
  });

  test('Add to cart button is disabled by default', async ({ page }) => {
    await page.getByTestId('category-btn-shoes').click();

    const addButton = page.getByTestId('add-to-cart-button').first();
    await expect(addButton).toBeDisabled();
  });
});