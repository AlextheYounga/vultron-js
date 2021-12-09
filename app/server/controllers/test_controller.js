const User = require('../../models/User')

const TestController = {
	/* Specify which actions here will be included in Electron's ipcMain module. 
	 * The 'action' prop specifies which function to call, while the 'name' prop
	 * sets the custom name of the endpoint, which is what you will call on the front-end.
	 */
	endpoints: [{
			name: 'api.ping', // what you will call on the front-end
			action: 'pingApi' //name of action
		},
		{
			name: 'db.ping',
			action: 'pingDB'
		},
	],

	pingApi: function (event, arg) {
		event.reply('api.ping', 'pong') // Send reply back using name of endpoint event
	},
	pingDB: function (event, arg) {
		function createUser() {
			User.model.forge({
				name: 'Alex Younger',
				username: 'alex',
				password: 'password',
				email: 'alex@alextheyounger.me'
			}).save().then(function (user) {
				console.log('User model has been saved');
				event.reply('db.ping', user.toJSON()) //send reply back
			})
		}

		User.model.fetchAll().then((users) => {
			if (users.toJSON().length === 0) {
				createUser()
				return
			}
			event.reply('db.ping', users.toJSON()) //send reply back
			return
		})


	}
}

export default TestController