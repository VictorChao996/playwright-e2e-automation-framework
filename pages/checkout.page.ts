import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
	readonly page: Page;
	readonly pageUrl: string;
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly postalCodeInput: Locator;
	readonly continueBtn: Locator;
	readonly cancelBtn: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = 'https://www.saucedemo.com/checkout-step-one.html';
		this.firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
		this.lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
		this.postalCodeInput = this.page.getByRole('textbox', { name: 'Postal Code' });
		this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
		this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
	}

	async goto() {
		await this.page.goto(this.pageUrl);
	}

	async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
		await this.firstNameInput.fill(firstName);
		await this.lastNameInput.fill(lastName);
		await this.postalCodeInput.fill(postalCode);
	}

	async continueToNextStep() {
		await this.continueBtn.click();
	}

	async cancelCheckout() {
		await this.cancelBtn.click();
	}
}
