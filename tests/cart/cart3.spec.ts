/**
 * @fileoverview Cart Functionality Tests
 * @description This file contains tests for the cart page functionality using POM ,fixtures, and test data.
 */

import { expect } from '@playwright/test';
import { test } from '../../fixture/base.fixture';
import DATA_INDEX from '../../test-data/data-index';

const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const checkoutPageUrl = 'https://www.saucedemo.com/checkout-step-one.html';

//NOTE: 可隨時調整加入購物車的商品
const itemsToAdd = [DATA_INDEX.PRODUCTS.BACKPACK, DATA_INDEX.PRODUCTS.BIKE_LIGHT];

test.describe('Cart Functionality', () => {
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
		await expect(page).toHaveURL(checkoutPageUrl);
	});

	test('Back to inventory page', async ({ cartPage, page }) => {
		await cartPage.backToInventory();
		await expect(page).toHaveURL(inventoryPageUrl);
	});

	test('remove products from cart', async ({ cartPage }) => {
		for (const item of itemsToAdd) {
			await cartPage.removeProductFromCart(item.testIdSuffix);
		}
		expect(cartPage.getCartBadge()).not.toBeVisible();
		await expect(cartPage.getInventoryItems()).toHaveCount(0);
	});
});
