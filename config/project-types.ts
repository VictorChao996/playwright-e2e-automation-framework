//NOTE: Define project types and configurations (ex. SAUCEDEMO | A1 | B2 etc.)
export type ProjectKey = 'SAUCEDEMO';

// Host configuration interface
export interface HostConfig {
	name: string;
	root: string;
	[Key: string]: string;
}

//Path configuration interface
//（Too wide, do not need to defined, fallback to use JS for object suggestions）
export interface PathConfig {
	[pathName: string]: string;
}
