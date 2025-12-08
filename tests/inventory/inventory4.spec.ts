/**
 * @fileoverview Inventory page tests
 * @description This file contains tests for the inventory page functionality using
 * 1.POM
 * 2.fixture
 * 3.fixture options
 * 4.test data.
 * 5. Confix data import
 */

import { test } from '../../fixture/base.fixture';
import { expect } from '@playwright/test';
import { PRODUCTS } from '../../test-data/data-index';
import { URLS } from '../../config/config-index';

const URL = URLS.SAUCEDEMO;

test.describe('Inventory Functionality', () => {
	test('add product & remove product from cart', async ({ inventoryPage }) => {
		await test.step('add product to cart', async () => {
			await inventoryPage.addProductToCart(PRODUCTS.BACKPACK.testIdSuffix);
			await inventoryPage.addProductToCart(PRODUCTS.BIKE_LIGHT.testIdSuffix);
			expect(
				inventoryPage.getRemoveFromCartButton(PRODUCTS.BACKPACK.testIdSuffix),
			).toBeVisible();
			expect(
				inventoryPage.getRemoveFromCartButton(PRODUCTS.BIKE_LIGHT.testIdSuffix),
			).toBeVisible();
			expect(inventoryPage.cartBadge).toHaveText('2');
		});

		await test.step('remove product from cart', async () => {
			await inventoryPage.removeProductFromCart(PRODUCTS.BACKPACK.testIdSuffix);
			await inventoryPage.removeProductFromCart(PRODUCTS.BIKE_LIGHT.testIdSuffix);
			expect(inventoryPage.getAddToCartButton(PRODUCTS.BACKPACK.testIdSuffix)).toBeVisible();
			expect(
				inventoryPage.getAddToCartButton(PRODUCTS.BIKE_LIGHT.testIdSuffix),
			).toBeVisible();
			expect(await inventoryPage.getCartBadge()).not.toBeVisible();
		});
	});

	test('add product & go to cart', async ({ inventoryPage, page }) => {
		await test.step('add product to cart', async () => {
			await inventoryPage.addProductToCart(PRODUCTS.BACKPACK.testIdSuffix);
			expect(
				inventoryPage.getRemoveFromCartButton(PRODUCTS.BACKPACK.testIdSuffix),
			).toBeVisible();
			expect(inventoryPage.cartBadge).toHaveText('1');
		});

		await test.step('go to cart page', async () => {
			await inventoryPage.gotoCartPage();
			await expect(page).toHaveURL(URL.cartPathUrl);
		});
	});
});
