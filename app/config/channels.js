const Channels = [
	// Auth
	{
		name: 'auth.login',
		controller: 'AuthController',
		action: 'login'
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
	//Controller
	{
		name: 'controller.ping',
		controller: 'Controller',
		action: 'ping'
	},
]


module.exports = Channels