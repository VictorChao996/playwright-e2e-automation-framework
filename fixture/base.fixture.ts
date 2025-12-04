import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import DATA_INDEX from '../test-data/data-index';
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
	itemsToAddOptions: [[], { scope: 'test' }],
	inventoryPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.login(
			DATA_INDEX.USERS.STANDARD_USER.username,
			DATA_INDEX.USERS.STANDARD_USER.password,
		);
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
