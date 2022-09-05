const Channels = [
	// Auth
	{
		name: 'auth.login',
		controller: 'AuthController',
		action: 'login'
	},
	{
		name: 'auth.register',
		controller: 'AuthController',
		action: 'register'
	},
	// Accounts
	{
		name: 'accounts.all',
		controller: 'AccountsController',
		action: 'fetchAll'
	},
	{
		name: 'account.create',
		controller: 'AccountsController',
		action: 'create'
	},
	// Users
	{
		name: 'users.create',
		controller: 'UsersController',
		action: 'create'
	},
	//Controller
	{
		name: 'controller.ping',
		controller: 'Controller',
		action: 'ping'
	},
]


module.exports = Channels