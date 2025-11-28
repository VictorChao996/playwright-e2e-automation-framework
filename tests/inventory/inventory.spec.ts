import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';

const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const cartPageUrl = 'https://www.saucedemo.com/cart.html';
const account = 'standard_user';
const password = 'secret_sauce';
const ProductsTestIdSuffix = {
	backpack: 'sauce-labs-backpack',
	bikeLight: 'sauce-labs-bike-light',
};

test.describe('Inventory Functionality', () => {
	let inventoryPage: InventoryPage;

	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.login(account, password);
		await expect(page).toHaveURL(inventoryPageUrl);
		inventoryPage = new InventoryPage(page);
	});

	test('add product & remove product from cart', async ({ page }) => {
		await test.step('add product to cart', async () => {
			await inventoryPage.addProductToCart(ProductsTestIdSuffix.backpack);
			await inventoryPage.addProductToCart(ProductsTestIdSuffix.bikeLight);
			expect(
				inventoryPage.getRemoveFromCartButton(ProductsTestIdSuffix.backpack),
			).toBeVisible();
			expect(
				inventoryPage.getRemoveFromCartButton(ProductsTestIdSuffix.bikeLight),
			).toBeVisible();
			expect(inventoryPage.cartBadge).toHaveText('2');
		});

		await test.step('remove product from cart', async () => {
			await inventoryPage.removeProductFromCart(ProductsTestIdSuffix.backpack);
			await inventoryPage.removeProductFromCart(ProductsTestIdSuffix.bikeLight);
			expect(inventoryPage.getAddToCartButton(ProductsTestIdSuffix.backpack)).toBeVisible();
			expect(inventoryPage.getAddToCartButton(ProductsTestIdSuffix.bikeLight)).toBeVisible();
			expect(await inventoryPage.getCartBadge()).not.toBeVisible();
		});
	});

	test('add product & go to cart', async ({ page }) => {
		await test.step('add product to cart', async () => {
			await inventoryPage.addProductToCart(ProductsTestIdSuffix.backpack);
			expect(
				inventoryPage.getRemoveFromCartButton(ProductsTestIdSuffix.backpack),
			).toBeVisible();
			expect(inventoryPage.cartBadge).toHaveText('1');
		});

		await test.step('go to cart page', async () => {
			await inventoryPage.gotoCartPage();
			await expect(page).toHaveURL(cartPageUrl);
		});
	});
});
