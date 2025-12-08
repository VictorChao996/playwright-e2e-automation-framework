import { test as base } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage, CheckoutPage } from '../pages/page-index';
import { PRODUCTS, USERS } from '../test-data/data-index';
import { Product } from '../test-data/data-types';

type MyFixtures = {
	inventoryPage: InventoryPage;
	cartPage: CartPage;
	checkoutPage: CheckoutPage;
};

type FixtureOptions = {
	itemsToAddOptions: Product[];
};

export const test = base.extend<MyFixtures & FixtureOptions>({
	itemsToAddOptions: [[PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT], { scope: 'test' }],
	inventoryPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
		const inventoryPage = new InventoryPage(page);
		await use(inventoryPage);
	},
	cartPage: async ({ page, inventoryPage, itemsToAddOptions }, use) => {
		for (const item of itemsToAddOptions) {
			await inventoryPage.addProductToCart(item.testIdSuffix);
		}
		await inventoryPage.gotoCartPage();
		const cartPage = new CartPage(page);
		await use(cartPage);
	},
	checkoutPage: async ({ page, cartPage }, use) => {
		await cartPage.gotoCheckout();
		const checkoutPage = new CheckoutPage(page);
		await use(checkoutPage);
	},
});
