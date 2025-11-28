import { Locator, Page } from '@playwright/test';

export class LoginPage {
	readonly page: Page;
	readonly pageUrl: string;
	readonly userNameInput: Locator;
	readonly passwordInput: Locator;
	readonly loginBtn: Locator;
	readonly errorMsg: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = 'https://www.saucedemo.com/';
		this.userNameInput = page.getByRole('textbox', { name: 'Username' });
		this.passwordInput = page.getByRole('textbox', { name: 'password' });
		this.loginBtn = page.getByRole('button', { name: 'Login' });
		this.errorMsg = page.getByTestId('error');
	}

	async goto() {
		await this.page.goto(this.pageUrl);
	}

	async login(username: string, password: string) {
		await this.userNameInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginBtn.click();
	}
}
