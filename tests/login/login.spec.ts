import { expect, test } from '@playwright/test';

const loginPageUrl = 'https://www.saucedemo.com/';
const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const account = 'standard_user';
const password = 'secret_sauce';
const errorMsg = 'Epic sadface: Username and password do not match any user in this service';

test.beforeEach(async ({ page }) => {
	await page.goto(loginPageUrl);
	expect(page.url()).toBe(loginPageUrl);
});

test('login with validate credentials', async ({ page }) => {
	await page.getByRole('textbox', { name: 'Username' }).fill(account);
	await page.getByRole('textbox', { name: 'password' }).fill(password);
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page).toHaveURL(inventoryPageUrl);
});

test('login with error credentials', async ({ page }) => {
	await page.getByRole('textbox', { name: 'Username' }).fill(account);
	await page.getByRole('textbox', { name: 'password' }).fill(password + 'e');
	await page.getByRole('button', { name: 'Login' }).click();
	await expect(page.getByTestId('error')).toHaveText(errorMsg);
});
