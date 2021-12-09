const User = require('../../models/User')

const TestController = {
	/* Specify which functions here will be included in Electron's ipcMain module. 
	 * This is what you will query on the frontend. 
	 */
	endpoints: [
		{ name: 'api.ping', prop: 'pingApi' },
		{ name: 'db.ping', prop: 'pingDB' },
	],

	pingApi: function (event, arg) {
		event.reply('api.ping', 'pong') //send reply back
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