const User = require('../../models/User')

const TestController = {
	/* Specify which functions here will be included in Electron's ipcMain module. 
	 * This is what you will query on the frontend. 
	 */
	endpoints: ['pingApi', 'pingDB'],

	pingApi: function (event, arg) {
		event.reply('pingApi', 'pong') //send reply back
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
				event.reply('pingdB', user.toJSON()) //send reply back
			})
			return
		}

		User.model.fetchAll().then((users) => {
			if (users.toJSON().length === 0) {
				createUser()
				return
			}
			event.reply('pingDB', users.toJSON()) //send reply back
			return

		})


	}
}

export default TestController