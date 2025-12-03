/**
 * @fileoverview Inventory page tests
 * @description This file contains tests for the inventory page functionality using POM, fixtures and test data.
 */

import { test } from '../../fixture/base.fixture';
import { expect } from '@playwright/test';
import DATA_INDEX from '../../test-data/data-index';

const cartPageUrl = 'https://www.saucedemo.com/cart.html';

test.describe('Inventory Functionality', () => {
	test('add product & remove product from cart', async ({ inventoryPage }) => {
		await test.step('add product to cart', async () => {
			await inventoryPage.addProductToCart(DATA_INDEX.PRODUCTS.BACKPACK.testIdSuffix);
			await inventoryPage.addProductToCart(DATA_INDEX.PRODUCTS.BIKE_LIGHT.testIdSuffix);
			expect(
				inventoryPage.getRemoveFromCartButton(DATA_INDEX.PRODUCTS.BACKPACK.testIdSuffix),
			).toBeVisible();
			expect(
				inventoryPage.getRemoveFromCartButton(DATA_INDEX.PRODUCTS.BIKE_LIGHT.testIdSuffix),
			).toBeVisible();
			expect(inventoryPage.cartBadge).toHaveText('2');
		});

		await test.step('remove product from cart', async () => {
			await inventoryPage.removeProductFromCart(DATA_INDEX.PRODUCTS.BACKPACK.testIdSuffix);
			await inventoryPage.removeProductFromCart(DATA_INDEX.PRODUCTS.BIKE_LIGHT.testIdSuffix);
			expect(
				inventoryPage.getAddToCartButton(DATA_INDEX.PRODUCTS.BACKPACK.testIdSuffix),
			).toBeVisible();
			expect(
				inventoryPage.getAddToCartButton(DATA_INDEX.PRODUCTS.BIKE_LIGHT.testIdSuffix),
			).toBeVisible();
			expect(await inventoryPage.getCartBadge()).not.toBeVisible();
		});
	});

	test('add product & go to cart', async ({ inventoryPage, page }) => {
		await test.step('add product to cart', async () => {
			await inventoryPage.addProductToCart(DATA_INDEX.PRODUCTS.BACKPACK.testIdSuffix);
			expect(
				inventoryPage.getRemoveFromCartButton(DATA_INDEX.PRODUCTS.BACKPACK.testIdSuffix),
			).toBeVisible();
			expect(inventoryPage.cartBadge).toHaveText('1');
		});

		await test.step('go to cart page', async () => {
			await inventoryPage.gotoCartPage();
			await expect(page).toHaveURL(cartPageUrl);
		});
	});
});
