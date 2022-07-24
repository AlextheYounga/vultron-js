const Channels = [
	// Auth
	{
		name: 'auth.login',
		controller: 'auth_controller',
		action: 'login'
	},
	{
		name: 'auth.register',
		controller: 'auth_controller',
		action: 'register'
	},
	{
		name: 'auth.loggedIn',
		controller: 'auth_controller',
		action: 'loggedIn'
	},
	// Accounts
	{
		name: 'accounts.all',
		controller: 'accounts_controller',
		action: 'fetchAll'
	},
	{
		name: 'account.create',
		controller: 'accounts_controller',
		action: 'create'
	},
]


module.exports = Channels