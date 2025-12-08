/**
 * @fileoverview Checkout Functionality Tests
 * @description This file contains tests for the checkout page functionality using
 * 1.POM
 * 2.fixture
 * 3.fixture options
 * 4.test data.
 * 5. Confix data import
 */

import { expect } from '@playwright/test';
import { test } from '../../fixture/base.fixture';
import { Checkout2Page, CheckoutCompletePage } from '../../pages/page-index';
import { PRODUCTS, USERS } from '../../test-data/data-index';
import { URLS } from '../../config/config-index';

const URL = URLS.SAUCEDEMO;
const checkInfo = {
	firstName: USERS.STANDARD_USER.firstName,
	lastName: USERS.STANDARD_USER.lastName,
	postalCode: USERS.STANDARD_USER.postalCode,
};
const itemsToAdd = [
	PRODUCTS.BACKPACK,
	PRODUCTS.BIKE_LIGHT,
	PRODUCTS.RED_TSHIRT,
	PRODUCTS.FLEECE_JACKET,
];

test.describe('Checkout Functionality', () => {
	let checkout2Page: Checkout2Page;
	let checkoutCompletePage: CheckoutCompletePage;

	test.use({
		itemsToAddOptions: [itemsToAdd, { scope: 'test' }],
	});

	test('Cancel checkout 1', async ({ checkoutPage, page }) => {
		await checkoutPage.cancelCheckout();
		await expect(page).toHaveURL(URL.cartPathUrl);
	});

	test('Cancel checkout 2', async ({ checkoutPage, page }) => {
		await checkoutPage.fillCheckoutInformation(
			checkInfo.firstName,
			checkInfo.lastName,
			checkInfo.postalCode,
		);
		await checkoutPage.continueToNextStep();
		checkout2Page = new Checkout2Page(page);
		await checkout2Page.goto();
		await expect(page).toHaveURL(URL.checkoutStepTwoPathUrl);

		await checkout2Page.cancelCheckout();
		await expect(page).toHaveURL(URL.inventoryPathUrl);
	});

	test('Checkout overview and finish', async ({ checkoutPage, page }) => {
		await test.step('Enter checkout information and continue', async ({}) => {
			await checkoutPage.fillCheckoutInformation(
				checkInfo.firstName,
				checkInfo.lastName,
				checkInfo.postalCode,
			);
			checkoutPage.continueToNextStep();
			checkout2Page = new Checkout2Page(page);
			await expect(page).toHaveURL(URL.checkoutStepTwoPathUrl);
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
			await expect(subtotalLocator).toHaveText(`Item total: $${expectedSubtotal}`);
		});

		await test.step('finish checkout', async () => {
			await checkout2Page.finishCheckout();
			checkoutCompletePage = new CheckoutCompletePage(page);
			await expect(page).toHaveURL(URL.checkoutCompletePathUrl);
		});

		await test.step('Back to home', async () => {
			await checkoutCompletePage.backToHome();
			await expect(page).toHaveURL(URL.inventoryPathUrl);
		});
	});
});
