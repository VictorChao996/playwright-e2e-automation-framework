/**
 * @fileoverview End-to-End Shopping Process Test
 * 1.POM
 * 2.fixture
 * 3.fixture options
 * 4.test data.
 * 5. Confix data import
 */

import { test, expect } from '@playwright/test';
import {
	LoginPage,
	InventoryPage,
	CartPage,
	CheckoutPage,
	Checkout2Page,
	CheckoutCompletePage,
} from '../../pages/page-index';
import { USERS, PRODUCTS } from '../../test-data/data-index';
import { HOSTS, URLS } from '../../config/config-index';

const URL = URLS.SAUCEDEMO;

test('Main Process', async ({ page }) => {
	const rootUrl = HOSTS.SAUCEDEMO.root;

	// Login
	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
	await expect(page).toHaveURL(URL.inventoryPathUrl);

	// Inventory - add products
	const inventoryPage = new InventoryPage(page);
	// Add backpack and bolt t-shirt
	await inventoryPage.addProductToCart(PRODUCTS.BACKPACK.testIdSuffix);
	await inventoryPage.addProductToCart(PRODUCTS.BOLT_T_SHIRT.testIdSuffix);
	await inventoryPage.gotoCartPage();
	await expect(page).toHaveURL(URL.cartPathUrl);

	// Cart - go to checkout
	const cartPage = new CartPage(page);
	await cartPage.gotoCheckout();
	await expect(page).toHaveURL(URL.checkoutStepOnePathUrl);

	// Checkout step one
	const checkoutPage = new CheckoutPage(page);
	await checkoutPage.fillCheckoutInformation(
		USERS.STANDARD_USER.firstName,
		USERS.STANDARD_USER.lastName,
		USERS.STANDARD_USER.postalCode,
	);
	await checkoutPage.continueToNextStep();

	// Checkout step two
	const checkout2Page = new Checkout2Page(page);
	await checkout2Page.finishCheckout();

	// Checkout complete
	const checkoutCompletePage = new CheckoutCompletePage(page);
	await checkoutCompletePage.backToHome();
	await expect(page).toHaveURL(URL.inventoryPathUrl);
});
