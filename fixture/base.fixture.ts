import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

const testData = {
	username: 'standard_user',
	password: 'secret_sauce',
	itemsToAdd: [
		{ title: 'Sauce Labs Backpack', testIdSuffix: 'sauce-labs-backpack' },
		{ title: 'Sauce Labs Bike Light', testIdSuffix: 'sauce-labs-bike-light' },
	],
};

type MyFixtures = {
	inventoryPage: InventoryPage;
	cartPage: CartPage;
	checkoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures>({
	inventoryPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.login(testData.username, testData.password);
		const inventoryPage = new InventoryPage(page);
		await use(inventoryPage);
	},
	cartPage: async ({ page, inventoryPage }, use) => {
		for (const item of testData.itemsToAdd) {
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
