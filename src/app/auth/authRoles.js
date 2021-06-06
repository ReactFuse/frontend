/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	staff: ['admin', 'manager'],
	user: ['admin', 'manager', 'user'],
	onlyGuest: []
};

export default authRoles;
