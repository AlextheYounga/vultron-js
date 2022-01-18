const User = require('../../models/User')

const AuthController = {
	login: function (event, creds) {
		User.verify(creds.username, creds.password).then(function (verified) {
			event.reply(event.routeName, verified.toJSON()) // Send reply back using name of endpoint event
		})
	},
}

export default AuthController