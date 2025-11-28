import { expect, test } from '@playwright/test';

const loginPage = 'https://www.saucedemo.com';
const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const cartPageUrl = 'https://www.saucedemo.com/cart.html';
const checkoutPageUrl = 'https://www.saucedemo.com/checkout-step-one.html';

const account = 'standard_user';
const password = 'secret_sauce';

const itemsToAdd = [
	{ title: 'Sauce Labs Backpack', testId: 'add-to-cart-sauce-labs-backpack' },
	{ title: 'Sauce Labs Bike Light', testId: 'add-to-cart-sauce-labs-bike-light' },
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

	await page.getByTestId('shopping-cart-link').click();
	await expect(page).toHaveURL(cartPageUrl);
});

test('check cart functionality', async ({ page }) => {
	await test.step('verify products in cart', async () => {
		const items = page.getByTestId('inventory-item-name');
		await expect(items).toHaveCount(itemsToAdd.length);
		const itemLocators = await items.all();
		//比較 itemLocators 與 itemsToAdd 內容是否相符 （無序）
		for (const itemLocator of itemLocators) {
			const itemText = await itemLocator.textContent();
			const match = itemsToAdd.find((item) => item.title === itemText);
			expect(match).toBeDefined();
		}

		console.log(await items.allTextContents());
	});
});

test('chekout cart items', async ({ page }) => {
	await test.step('proceed to checkout', async () => {
		await page.getByTestId('checkout').click();
		await expect(page).toHaveURL(checkoutPageUrl);
	});
});

test('remove products from cart and go back to inventory page', async ({ page }) => {
	await test.step('remove products and verify cart is empty', async () => {
		//點擊每一個 remove 按鈕
		for (const item of itemsToAdd) {
			await page.getByTestId(item.testId.replace('add-to-cart', 'remove')).click();
		}

		expect(page.getByTestId('shopping-cart-link')).toHaveText('');
		const items = page.getByTestId('inventory-item-name');
		await expect(items).toHaveCount(0);
	});

	await test.step('go back to inventory page', async () => {
		await page.getByTestId('continue-shopping').click();
		await expect(page).toHaveURL(inventoryPageUrl);
	});
});
