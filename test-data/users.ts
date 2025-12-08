import { User } from '../test-data/data-types';

const USERS: Record<string, User> = {
	STANDARD_USER: {
		username: 'standard_user',
		password: 'secret_sauce',
		firstName: 'John',
		lastName: 'Doe',
		postalCode: '12345',
	},
	LOCKED_OUT_USER: {
		username: 'locked_out_user',
		password: 'secret_sauce',
		firstName: 'Locked',
		lastName: 'Out',
		postalCode: '00000',
	},
	PROBLEM_USER: {
		username: 'problem_user',
		password: 'secret_sauce',
		firstName: 'Problem',
		lastName: 'User',
		postalCode: '11111',
	},
	PERFORMANCE_GLITCH_USER: {
		username: 'performance_glitch_user',
		password: 'secret_sauce',
		firstName: 'Performance',
		lastName: 'Glitch',
		postalCode: '22222',
	},
	ERROR_USER: {
		username: 'error_user',
		password: 'secret_sauce',
		firstName: 'Error',
		lastName: 'User',
		postalCode: '33333',
	},
	VISUAL_USER: {
		username: 'visual_user',
		password: 'secret_sauce',
		firstName: 'Visual',
		lastName: 'User',
		postalCode: '44444',
	},
};
export default USERS;
