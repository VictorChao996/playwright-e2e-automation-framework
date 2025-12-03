import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import DATA_INDEX from '../../test-data/data-index';

const loginPageUrl = 'https://www.saucedemo.com/';
const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const account = DATA_INDEX.USERS.STANDARD_USER.username;
const password = DATA_INDEX.USERS.STANDARD_USER.password;
const errorMsgString = DATA_INDEX.MESSAGE.loginMessage.invalidCredentials;

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
