import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

const loginPageUrl = 'https://www.saucedemo.com/';
const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const account = 'standard_user';
const password = 'secret_sauce';
const errorMsgString = 'Epic sadface: Username and password do not match any user in this service';

test.describe('Login Validation', () => {
	let loginPage: LoginPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		await loginPage.goto();
		expect(loginPage.page.url()).toBe(loginPageUrl);
	});

	test('login with validate credentials', async ({ page }) => {
		await loginPage.login(account, password);
		await expect(page).toHaveURL(inventoryPageUrl);
	});

	test('login with error credentials', async ({ page }) => {
		await loginPage.login('invalid_user', 'invalid_password');
		await expect(loginPage.errorMsg).toHaveText(errorMsgString);
	});
});
