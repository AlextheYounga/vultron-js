const Routes = {
	auth: [{ //grouping should match prefix of controller
		name: 'login',
		action: 'login'
	}],
	banks: [{
		name: 'banks.all', // what you will call on the front-end
		action: 'banksAll' // name of the function to call
	}],
	test: [{
			name: 'api.ping', // what you will call on the front-end
			action: 'pingApi' //name of action
		},
		{
			name: 'db.ping',
			action: 'pingDB'
		},
	],
}

module.exports = Routes