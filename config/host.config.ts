import { ProjectKey, HostConfig } from './project-types';

// Define host configurations for different projects
export const HOSTS = {
	SAUCEDEMO: {
		name: 'saucedemo',
		root: 'https://www.saucedemo.com',
	},
	// Add more project host configurations as needed
} satisfies Record<ProjectKey, HostConfig>;
