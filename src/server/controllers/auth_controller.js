const User = require('../../models/User')

const AuthController = {
	endpoints: ['login'],
	
	login: function (event, arg) {
		User.verify(arg.username, arg.password).then(function (user) {
			event.returnValue = user.toJSON()
			return event

		})
		return event.returnValue
	},

}

export default AuthController