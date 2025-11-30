/**
 * @fileoverview Inventory page tests
 * @description This file contains tests for the inventory page functionality using POM and fixtures.
 */

import { test } from '../../fixture/base.fixture';
import { expect } from '@playwright/test';

const cartPageUrl = 'https://www.saucedemo.com/cart.html';
const ProductsTestIdSuffix = {
	backpack: 'sauce-labs-backpack',
	bikeLight: 'sauce-labs-bike-light',
};

test.describe('Inventory Functionality', () => {
	test('add product & remove product from cart', async ({ inventoryPage }) => {
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

	test('add product & go to cart', async ({ inventoryPage, page }) => {
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
