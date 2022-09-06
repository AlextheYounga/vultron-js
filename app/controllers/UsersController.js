const User = require('../models/User')

const UsersController = {
	create: function () {
		return User.where({ email: 'alex@alextheyounger.me' })
			.fetch({ require: false })
			.then((user) => {
				if (user) return user.toJSON()
				return new User({
					name: 'Alex Younger',
					username: 'alex',
					password: 'password',
					email: 'alex@alextheyounger.me'
				}).save()
				.then(function (user) {
					console.log('User model has been saved');
					return user.toJSON()
				}).catch((error) => {
					console.error(error)
				})
			})
	}
}

module.exports = UsersController