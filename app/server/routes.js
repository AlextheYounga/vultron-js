/*
* Place your API routes here using the prefix in the controller name as the keys.
* Your controllers should be named like {yourname}_controller.js
* You can add custom names to the routes that you can call on the front end. 
* The action will correspond to a particular function in your controller. 
*/
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