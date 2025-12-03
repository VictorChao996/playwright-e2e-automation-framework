/**
 * @fileoverview End-to-End Shopping Process Test
 * @description This file contains an end-to-end test for the shopping process using POM, test-data
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { Checkout2Page } from '../../pages/checkout2.page';
import { CheckoutCompletePage } from '../../pages/checkoutComplete.page';
import DATA_INDEX from '../../test-data/data-index';

test('Main Process', async ({ page }) => {
	const rootUrl = 'https://www.saucedemo.com';

	// Login
	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.login(
		DATA_INDEX.USERS.STANDARD_USER.username,
		DATA_INDEX.USERS.STANDARD_USER.password,
	);
	await expect(page).toHaveURL(`${rootUrl}/inventory.html`);

	// Inventory - add products
	const inventoryPage = new InventoryPage(page);
	// Add backpack and bolt t-shirt
	await inventoryPage.addProductToCart(DATA_INDEX.PRODUCTS.BACKPACK.testIdSuffix);
	await inventoryPage.addProductToCart(DATA_INDEX.PRODUCTS.BOLT_T_SHIRT.testIdSuffix);
	await inventoryPage.gotoCartPage();
	await expect(page).toHaveURL(`${rootUrl}/cart.html`);

	// Cart - go to checkout
	const cartPage = new CartPage(page);
	await cartPage.gotoCheckout();
	await expect(page).toHaveURL(`${rootUrl}/checkout-step-one.html`);

	// Checkout step one
	const checkoutPage = new CheckoutPage(page);
	await checkoutPage.fillCheckoutInformation(
		DATA_INDEX.USERS.STANDARD_USER.firstName,
		DATA_INDEX.USERS.STANDARD_USER.lastName,
		DATA_INDEX.USERS.STANDARD_USER.postalCode,
	);
	await checkoutPage.continueToNextStep();

	// Checkout step two
	const checkout2Page = new Checkout2Page(page);
	await checkout2Page.finishCheckout();

	// Checkout complete
	const checkoutCompletePage = new CheckoutCompletePage(page);
	await checkoutCompletePage.backToHome();
	await expect(page).toHaveURL(`${rootUrl}/inventory.html`);
});
