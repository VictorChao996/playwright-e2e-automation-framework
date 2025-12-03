import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import DATA_INDEX from '../test-data/data-index';

const itemToAdd = [DATA_INDEX.PRODUCTS.BACKPACK, DATA_INDEX.PRODUCTS.BIKE_LIGHT];

type MyFixtures = {
	inventoryPage: InventoryPage;
	cartPage: CartPage;
	checkoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures>({
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
	cartPage: async ({ page, inventoryPage }, use) => {
		for (const item of itemToAdd) {
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
