import { expect, test } from '@playwright/test';

const loginPage = 'https://www.saucedemo.com';
const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const account = 'standard_user';
const password = 'secret_sauce';

test.beforeEach(async ({ page }) => {
	await page.goto(loginPage);
	await page.getByRole('textbox', { name: 'Username' }).fill(account);
	await page.getByRole('textbox', { name: 'password' }).fill(password);
	await page.getByRole('button', { name: 'Login' }).click();

	await page.goto(inventoryPageUrl);
	expect(page.url()).toBe(inventoryPageUrl);
});

test('add product & remove product from cart', async ({ page }) => {
	await expect(page).toHaveURL(inventoryPageUrl);
	await test.step('add product to cart', async () => {
		await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
		await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
		expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
		expect(page.getByTestId('remove-sauce-labs-bike-light')).toBeVisible();
		expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');

		await page.waitForTimeout(1000);
	});

	await test.step('remove product from cart', async () => {
		await page.getByTestId('remove-sauce-labs-backpack').click();
		await page.getByTestId('remove-sauce-labs-bike-light').click();
		expect(page.getByTestId('add-to-cart-sauce-labs-backpack')).toBeVisible();
		expect(page.getByTestId('add-to-cart-sauce-labs-bike-light')).toBeVisible();
		expect(page.getByTestId('shopping-cart-link')).toHaveText('');
	});
});
