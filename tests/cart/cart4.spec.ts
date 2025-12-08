/**
 * @fileoverview Cart Functionality Tests
 * @description This file contains tests for the cart page functionality using
 * 1.POM
 * 2.fixture
 * 3.fixture options
 * 4.test data.
 * 5. Confix data import
 */

import { expect } from '@playwright/test';
import { test } from '../../fixture/base.fixture';
import { URLS } from '../../config/config-index';
import { PRODUCTS } from '../../test-data/data-index';

const URL = URLS.SAUCEDEMO;
//NOTE: 可隨時調整加入購物車的商品
const itemsToAdd = [PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT, PRODUCTS.FLEECE_JACKET];

test.describe('Cart Functionality', () => {
	//NOTE: fixture options 傳入 itemsToAdd
	test.use({
		itemsToAddOptions: [itemsToAdd, { scope: 'test' }],
	});

	test('check cart functionality', async ({ cartPage }) => {
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

	test('chekout cart items', async ({ cartPage, page }) => {
		await cartPage.gotoCheckout();
		await expect(page).toHaveURL(URL.checkoutStepOnePathUrl);
	});

	test('Back to inventory page', async ({ cartPage, page }) => {
		await cartPage.backToInventory();
		await expect(page).toHaveURL(URL.inventoryPathUrl);
	});

	test('remove products from cart', async ({ cartPage }) => {
		for (const item of itemsToAdd) {
			await cartPage.removeProductFromCart(item.testIdSuffix);
		}
		expect(cartPage.getCartBadge()).not.toBeVisible();
		await expect(cartPage.getInventoryItems()).toHaveCount(0);
	});
});
