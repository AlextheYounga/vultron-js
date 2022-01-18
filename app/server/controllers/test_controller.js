const User = require('../../models/User')

const TestController = {
	pingApi: function (event, params) {
		event.reply(event.routeName, 'pong') // Send reply back using name of endpoint event
	},
	pingDB: function (event, params) {
		function createUser() {
			User.model.forge({
				name: 'Alex Younger',
				username: 'alex',
				password: 'password',
				email: 'alex@alextheyounger.me'
			}).save().then(function (user) {
				console.log('User model has been saved');
				event.reply(event.routeName, user.toJSON()) //send reply back
			})
		}

		User.model.fetchAll().then((users) => {
			if (users.toJSON().length === 0) {
				createUser()
				return
			}
			event.reply(event.routeName, users.toJSON()) //send reply back
			return
		})


	}
}

export default TestController