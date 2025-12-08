import { ProjectKey } from './project-types';
import { HOSTS } from './host.config';
import { PATHS } from './path.config';

const URLS = {
	SAUCEDEMO: {
		loginPathUrl: `${HOSTS.SAUCEDEMO.root}${PATHS.SAUCEDEMO.loginPath}`,
		inventoryPathUrl: `${HOSTS.SAUCEDEMO.root}${PATHS.SAUCEDEMO.inventoryPath}`,
		cartPathUrl: `${HOSTS.SAUCEDEMO.root}${PATHS.SAUCEDEMO.cartPath}`,
		checkoutStepOnePathUrl: `${HOSTS.SAUCEDEMO.root}${PATHS.SAUCEDEMO.checkoutStepOnePath}`,
		checkoutStepTwoPathUrl: `${HOSTS.SAUCEDEMO.root}${PATHS.SAUCEDEMO.checkoutStepTwoPath}`,
		checkoutCompletePathUrl: `${HOSTS.SAUCEDEMO.root}${PATHS.SAUCEDEMO.checkoutCompletePath}`,
	},
} satisfies Record<ProjectKey, Record<string, string>>;

export { HOSTS, PATHS, URLS };
