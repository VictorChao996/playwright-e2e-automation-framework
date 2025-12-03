import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import DATA_INDEX from '../../test-data/data-index';

const loginPageUrl = 'https://www.saucedemo.com/';
const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';

const validUsers = [
	DATA_INDEX.USERS.STANDARD_USER,
	DATA_INDEX.USERS.PROBLEM_USER,
	DATA_INDEX.USERS.PERFORMANCE_GLITCH_USER,
	DATA_INDEX.USERS.ERROR_USER,
	DATA_INDEX.USERS.VISUAL_USER,
];

const invalidUsers = [
	{ username: null, password: null, errorMsg: DATA_INDEX.MESSAGE.loginMessage.emptyUsername },
	{
		username: 'invalid_user',
		password: 'invalid_password',
		errorMsg: DATA_INDEX.MESSAGE.loginMessage.invalidCredentials,
	},
	{
		username: 'standard_user_with_empty_password',
		password: null,
		errorMsg: DATA_INDEX.MESSAGE.loginMessage.emptyPassword,
	},
	{
		username: DATA_INDEX.USERS.LOCKED_OUT_USER.username,
		password: DATA_INDEX.USERS.LOCKED_OUT_USER.password,
		errorMsg: DATA_INDEX.MESSAGE.loginMessage.lockedOutUser,
	},
];

test.describe('Login Validation', () => {
	let loginPage: LoginPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		await loginPage.goto();
		expect(loginPage.page.url()).toBe(loginPageUrl);
	});

	validUsers.forEach((user) => {
		test(`login with valid user: ${user.username}`, async ({ page }) => {
			await loginPage.login(user.username, user.password);
			await expect(page).toHaveURL(inventoryPageUrl);
		});
	});

	invalidUsers.forEach((user) => {
		test(`login with invalid user: ${user.username ?? '<empty>'}`, async ({ page }) => {
			const username = user.username ?? '';
			const password = user.password ?? '';
			await loginPage.login(username, password);
			await expect(loginPage.errorMsg).toHaveText(user.errorMsg);
		});
	});
});
