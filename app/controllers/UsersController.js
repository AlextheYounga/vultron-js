const User = require('../models/User')

const UsersController = {
	create: function () {
		return User.model.forge({
			name: 'Alex Younger',
			username: 'alex',
			password: 'password',
			email: 'alex@alextheyounger.me'
		}).save().then(function (user) {
			console.log('User model has been saved');
			return user.toJSON()
		}).catch((error) => {
			console.error(error)
		})
	}
}

export default UsersController