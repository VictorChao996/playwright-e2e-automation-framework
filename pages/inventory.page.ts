import { Locator, Page } from '@playwright/test';

export class InventoryPage {
	readonly page: Page;
	readonly pageUrl: string;
	readonly cartBadge: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = 'https://www.saucedemo.com/inventory.html';
		this.cartBadge = page.getByTestId('shopping-cart-badge');
	}

	async goto() {
		await this.page.goto(this.pageUrl);
	}

	getAddToCartButton(productTestIdSuffix: string): Locator {
		return this.page.getByTestId(`add-to-cart-${productTestIdSuffix}`);
	}

	getRemoveFromCartButton(productTestIdSuffix: string): Locator {
		return this.page.getByTestId(`remove-${productTestIdSuffix}`);
	}

	async addProductToCart(productTestIdSuffix: string) {
		const locator = this.getAddToCartButton(productTestIdSuffix);
		await locator.click();
	}

	async removeProductFromCart(productTestIdSuffix: string) {
		const locator = this.getRemoveFromCartButton(productTestIdSuffix);
		await locator.click();
	}

	async getCartBadge(): Promise<Locator> {
		return this.cartBadge;
	}

	async gotoCartPage() {
		await this.page.getByTestId('shopping-cart-link').click();
	}
}
