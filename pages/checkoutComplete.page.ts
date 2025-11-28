import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
	readonly page: Page;
	readonly pageUrl: string;
	readonly backHomeBtn: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = 'https://www.saucedemo.com/checkout-complete.html';
		this.backHomeBtn = this.page.getByRole('button', { name: 'Back Home' });
	}

	async goto() {
		await this.page.goto(this.pageUrl);
	}

	async backToHome() {
		await this.backHomeBtn.click();
	}
}
