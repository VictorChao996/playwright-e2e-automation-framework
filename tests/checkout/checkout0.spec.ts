/**
 * @fileoverview Checkout Page Tests
 * @description This file contains tests for the checkout page functionality using direct Playwright API.
 */
import { expect, test } from '@playwright/test';

const loginPage = 'https://www.saucedemo.com';
const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const cartPageUrl = 'https://www.saucedemo.com/cart.html';
const checkoutPage1Url = 'https://www.saucedemo.com/checkout-step-one.html';
const checkoutPage2Url = 'https://www.saucedemo.com/checkout-step-two.html';
const checkoutCompleteUrl = 'https://www.saucedemo.com/checkout-complete.html';

const account = 'standard_user';
const password = 'secret_sauce';

const itemsToAdd = [
	{ title: 'Sauce Labs Backpack', testId: 'add-to-cart-sauce-labs-backpack', price: 29.99 },
	{ title: 'Sauce Labs Bike Light', testId: 'add-to-cart-sauce-labs-bike-light', price: 9.99 },
];

test.beforeEach(async ({ page }) => {
	await page.goto(loginPage);
	await page.getByRole('textbox', { name: 'Username' }).fill(account);
	await page.getByRole('textbox', { name: 'password' }).fill(password);
	await page.getByRole('button', { name: 'Login' }).click();

	// await page.goto(inventoryPageUrl);
	expect(page.url()).toBe(inventoryPageUrl);

	// add products to cart before tests
	await page.getByTestId(itemsToAdd[0].testId).click();
	await page.getByTestId(itemsToAdd[1].testId).click();
	expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
	expect(page.getByTestId('remove-sauce-labs-bike-light')).toBeVisible();
	expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');

	await page.waitForTimeout(1000);

	//go to cart page before each test
	await page.getByTestId('shopping-cart-link').click();
	await expect(page).toHaveURL(cartPageUrl);

	//got to checkout page before each test
	await test.step('proceed to checkout', async () => {
		await page.getByTestId('checkout').click();
		await expect(page).toHaveURL(checkoutPage1Url);
	});
});

test('Cancel checkout', async ({ page }) => {
	await page.getByRole('button', { name: 'Cancel' }).click();
	await expect(page).toHaveURL(cartPageUrl);
});

test('Enter checkout information and continue', async ({ page }) => {
	//NOTE: 這邊的數據可以拉出去管理
	await test.step('fill in checkout information', async () => {
		await page.getByRole('textbox', { name: 'First Name' }).fill('John');
		await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
		await page.getByRole('textbox', { name: 'Postal Code' }).fill('12345');
	});

	await test.step('continue to next checkout step', async () => {
		await page.getByRole('button', { name: 'Continue' }).click();
		await expect(page).toHaveURL(checkoutPage2Url);
	});
});

test('Checkout overview and finish', async ({ page }) => {
	await test.step('fill in checkout information and continue', async () => {
		await page.getByRole('textbox', { name: 'First Name' }).fill('John');
		await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
		await page.getByRole('textbox', { name: 'Postal Code' }).fill('12345');
		await page.getByRole('button', { name: 'Continue' }).click();
		await expect(page).toHaveURL(checkoutPage2Url);
	});

	await test.step('final checkout', async () => {
		//確認商品清單正確
		const items = page.getByTestId('inventory-item-name');
		await expect(items).toHaveCount(itemsToAdd.length);
		const itemLocators = await items.all();
		for (const itemLocator of itemLocators) {
			const itemText = await itemLocator.textContent();
			const match = itemsToAdd.find((item) => item.title === itemText);
			expect(match).toBeDefined();
		}
		//確認總金額正確
		const subtotalLocator = page.getByTestId('subtotal-label');
		const expectedSubtotal = itemsToAdd.reduce((sum, item) => sum + item.price, 0);
		await expect(subtotalLocator).toHaveText(`Item total: $${expectedSubtotal.toFixed(2)}`);
	});

	await test.step('finish checkout', async () => {
		await page.getByRole('button', { name: 'Finish' }).click();
		await expect(page).toHaveURL(checkoutCompleteUrl);

		await page.getByRole('button', { name: 'Back Home' }).click();
		await expect(page).toHaveURL(inventoryPageUrl);
	});
});
