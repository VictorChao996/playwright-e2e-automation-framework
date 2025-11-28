import { Locator, Page } from '@playwright/test';

export class CartPage {
	readonly page: Page;
	readonly pageUrl: string;
	readonly backToInventoryButton: Locator;
	readonly checkoutButton: Locator;
	readonly cartBadge: Locator;
	readonly inventoryItems: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = 'https://www.saucedemo.com/cart.html';
		this.backToInventoryButton = page.getByTestId('continue-shopping');
		this.checkoutButton = page.getByTestId('checkout');
		this.cartBadge = page.getByTestId('shopping-cart-badge');
		this.inventoryItems = page.getByTestId('inventory-item-name');
	}

	async goto() {
		await this.page.goto(this.pageUrl);
	}

	async backToInventory() {
		await this.backToInventoryButton.click();
	}

	async gotoCheckout() {
		await this.checkoutButton.click();
	}

	async removeProductFromCart(productTestIdSuffix: string) {
		const locator = this.page.getByTestId(`remove-${productTestIdSuffix}`);
		await locator.click();
	}

	getCartBadge(): Locator {
		return this.cartBadge;
	}

	getInventoryItems(): Locator {
		return this.inventoryItems;
	}
}
