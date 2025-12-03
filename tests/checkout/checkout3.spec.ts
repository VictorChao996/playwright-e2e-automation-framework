/**
 * @fileoverview Checkout Functionality Tests
 * @description This file contains tests for the checkout page functionality using POM, fixtures, and test data.
 */

import { expect } from '@playwright/test';
import { test } from '../../fixture/base.fixture';
import { CheckoutPage } from '../../pages/checkout.page';
import { Checkout2Page } from '../../pages/checkout2.page';
import { CheckoutCompletePage } from '../../pages/checkoutComplete.page';
import DATA_INDEX from '../../test-data/data-index';

const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const cartPageUrl = 'https://www.saucedemo.com/cart.html';
const checkoutPage2Url = 'https://www.saucedemo.com/checkout-step-two.html';
const checkoutCompleteUrl = 'https://www.saucedemo.com/checkout-complete.html';

const itemsToAdd = [DATA_INDEX.PRODUCTS.BACKPACK, DATA_INDEX.PRODUCTS.BIKE_LIGHT];

test.describe('Checkout Functionality', () => {
	let checkout2Page: Checkout2Page;
	let checkoutCompletePage: CheckoutCompletePage;

	test('Cancel checkout 1', async ({ checkoutPage, page }) => {
		await checkoutPage.cancelCheckout();
		await expect(page).toHaveURL(cartPageUrl);
	});

	test('Cancel checkout 2', async ({ checkoutPage, page }) => {
		await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
		await checkoutPage.continueToNextStep();
		checkout2Page = new Checkout2Page(page);
		await checkout2Page.goto();
		await expect(page).toHaveURL(checkoutPage2Url);

		await checkout2Page.cancelCheckout();
		await expect(page).toHaveURL(inventoryPageUrl);
	});

	test('Checkout overview and finish', async ({ checkoutPage, page }) => {
		await test.step('Enter checkout information and continue', async ({}) => {
			await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
			checkoutPage.continueToNextStep();
			checkout2Page = new Checkout2Page(page);
			await expect(page).toHaveURL(checkoutPage2Url);
		});

		await test.step('final checkout', async () => {
			//確認商品清單正確
			const items = checkout2Page.getItemNames();
			await expect(items).toHaveCount(itemsToAdd.length);
			const itemLocators = await items.all();
			for (const itemLocator of itemLocators) {
				const itemText = await itemLocator.textContent();
				const match = itemsToAdd.find((item) => item.title === itemText);
				expect(match).toBeDefined();
			}
			//確認總金額正確
			const subtotalLocator = checkout2Page.getSubTotalLabel();
			const expectedSubtotal = itemsToAdd.reduce((sum, item) => sum + item.price, 0);
			await expect(subtotalLocator).toHaveText(`Item total: $${expectedSubtotal.toFixed(2)}`);
		});

		await test.step('finish checkout', async () => {
			await checkout2Page.finishCheckout();
			checkoutCompletePage = new CheckoutCompletePage(page);
			await expect(page).toHaveURL(checkoutCompleteUrl);
		});

		await test.step('Back to home', async () => {
			await checkoutCompletePage.backToHome();
			await expect(page).toHaveURL(inventoryPageUrl);
		});
	});
});
