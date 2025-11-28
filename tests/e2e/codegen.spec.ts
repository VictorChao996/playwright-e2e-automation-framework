import { test, expect } from '@playwright/test';

// NOTE: This is a sample test file record by Playwright Codegen tool & smallest modifications made for better readability

test('Main Process', async ({ page }) => {
	const rootUrl = 'https://www.saucedemo.com';

	await page.goto(rootUrl);

	await page.locator('[data-test="username"]').click();
	await page.locator('[data-test="username"]').fill('standard_user');
	await page.locator('[data-test="username"]').press('Tab');
	await page.locator('[data-test="password"]').fill('secret_sauce');
	await page.locator('[data-test="login-button"]').click();
	await expect(page).toHaveURL(`${rootUrl}/inventory.html`); //login successful check

	await page.goto('https://www.saucedemo.com/inventory.html');

	const addToCartButtons = await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
	await addToCartButtons.click();
	await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

	await page.locator('[data-test="shopping-cart-link"]').click();
	await expect(page).toHaveURL(`${rootUrl}/cart.html`); //cart page check

	await page.locator('[data-test="checkout"]').click();
	await expect(page).toHaveURL(`${rootUrl}/checkout-step-one.html`); //checkout step one page check

	await page.locator('[data-test="firstName"]').click();
	await page.locator('[data-test="firstName"]').fill('hello');
	await page.locator('[data-test="firstName"]').press('Tab');
	await page.locator('[data-test="lastName"]').fill('world');
	await page.locator('[data-test="lastName"]').press('Tab');
	await page.locator('[data-test="postalCode"]').fill('111');
	await page.locator('[data-test="continue"]').click();
	await page.locator('[data-test="finish"]').click();
	await page.locator('[data-test="back-to-products"]').click();

	expect(page).toHaveURL(`${rootUrl}/inventory.html`);
});
