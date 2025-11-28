import { expect, Locator, Page } from '@playwright/test';

export class Checkout2Page {
	readonly inventoryPageUrl = 'https://www.saucedemo.com/inventory.html'; //這個可以拉出去

	readonly page: Page;
	readonly pageUrl: string;
	readonly cancelBtn: Locator;
	readonly finishBtn: Locator;
	readonly itemNames: Locator;
	readonly subTotalLabel: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = 'https://www.saucedemo.com/checkout-step-two.html';
		this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
		this.finishBtn = this.page.getByRole('button', { name: 'Finish' });
		this.itemNames = this.page.getByTestId('inventory-item-name');
		this.subTotalLabel = this.page.getByTestId('subtotal-label');
	}

	async goto() {
		await this.page.goto(this.pageUrl);
	}

	async cancelCheckout() {
		await this.cancelBtn.click();
	}

	async finishCheckout() {
		await this.finishBtn.click();
	}

	getItemNames(): Locator {
		return this.itemNames;
	}

	getSubTotalLabel(): Locator {
		return this.subTotalLabel;
	}
}
