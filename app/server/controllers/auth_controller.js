const User = require('../../models/User')

const AuthController = {
	login: function (event, creds) {
		User.verify(creds.username, creds.password).then(function (verified) {
			event.reply(this.$routes.login, verified.toJSON()) // Send reply back using name of endpoint event
		})
	},
}

export default AuthController