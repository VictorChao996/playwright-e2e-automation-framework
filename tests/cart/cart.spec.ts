import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { CartPage } from '../../pages/cart.page';
import { InventoryPage } from '../../pages/inventory.page';

const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const cartPageUrl = 'https://www.saucedemo.com/cart.html';
const checkoutPageUrl = 'https://www.saucedemo.com/checkout-step-one.html';

const account = 'standard_user';
const password = 'secret_sauce';

const itemsToAdd = [
	{ title: 'Sauce Labs Backpack', testIdSuffix: 'sauce-labs-backpack' },
	{ title: 'Sauce Labs Bike Light', testIdSuffix: 'sauce-labs-bike-light' },
];

test.describe('Cart Functionality', () => {
	let cartPage: CartPage;
	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.login(account, password);
		const inventoryPage = new InventoryPage(page);
		await inventoryPage.addProductToCart(itemsToAdd[0].testIdSuffix);
		await inventoryPage.addProductToCart(itemsToAdd[1].testIdSuffix);
		expect(inventoryPage.cartBadge).toHaveText('2');
		await inventoryPage.gotoCartPage();

		cartPage = new CartPage(page);
		await cartPage.goto();
		await expect(page).toHaveURL(cartPageUrl);
	});

	test('check cart functionality', async ({ page }) => {
		const items = cartPage.getInventoryItems();
		await expect(items).toHaveCount(itemsToAdd.length);
		const itemLocators = await items.all();
		//比較 itemLocators 與 itemsToAdd 內容是否相符 （無序）
		for (const itemLocator of itemLocators) {
			const itemText = await itemLocator.textContent();
			const match = itemsToAdd.find((item) => item.title === itemText);
			expect(match).toBeDefined();
		}
	});

	test('chekout cart items', async ({ page }) => {
		await cartPage.gotoCheckout();
		await expect(page).toHaveURL(checkoutPageUrl);
	});

	test('Back to inventory page', async ({ page }) => {
		await cartPage.backToInventory();
		await expect(page).toHaveURL(inventoryPageUrl);
	});

	test('remove products from cart', async ({ page }) => {
		for (const item of itemsToAdd) {
			await cartPage.removeProductFromCart(item.testIdSuffix);
		}
		expect(cartPage.getCartBadge()).not.toBeVisible();
		await expect(cartPage.getInventoryItems()).toHaveCount(0);
	});
});
