const Auth = require('../middleware/auth/auth')

const AuthController = {
	login: async function (params) {
		return Auth.login(params)
	},
}

module.exports = AuthController