import { ProjectKey } from './project-types';

// Define path configurations for different projects
export const PATHS = {
	SAUCEDEMO: {
		loginPath: '/',
		inventoryPath: '/inventory.html',
		cartPath: '/cart.html',
		checkoutStepOnePath: '/checkout-step-one.html',
		checkoutStepTwoPath: '/checkout-step-two.html',
		checkoutCompletePath: '/checkout-complete.html',
	},
} satisfies Record<ProjectKey, Record<string, string>>;
