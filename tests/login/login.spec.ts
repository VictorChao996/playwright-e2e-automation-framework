import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { USERS, MESSAGE } from '../../test-data/data-index';
import { URLS } from '../../config/config-index';

const URL = URLS.SAUCEDEMO;

const validUsers = [
	USERS.STANDARD_USER,
	USERS.PROBLEM_USER,
	USERS.PERFORMANCE_GLITCH_USER,
	USERS.ERROR_USER,
	USERS.VISUAL_USER,
];

const invalidUsers = [
	{ username: null, password: null, errorMsg: MESSAGE.loginMessage.emptyUsername },
	{
		username: 'invalid_user',
		password: 'invalid_password',
		errorMsg: MESSAGE.loginMessage.invalidCredentials,
	},
	{
		username: 'standard_user_with_empty_password',
		password: null,
		errorMsg: MESSAGE.loginMessage.emptyPassword,
	},
	{
		username: USERS.LOCKED_OUT_USER.username,
		password: USERS.LOCKED_OUT_USER.password,
		errorMsg: MESSAGE.loginMessage.lockedOutUser,
	},
];

test.describe('Login Validation', () => {
	let loginPage: LoginPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		await loginPage.goto();
		expect(loginPage.page.url()).toBe(URL.loginPathUrl);
	});

	validUsers.forEach((user) => {
		test(`login with valid user: ${user.username}`, async ({ page }) => {
			await loginPage.login(user.username, user.password);
			await expect(page).toHaveURL(URL.inventoryPathUrl);
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
