const Auth = require('../../framework/Auth/auth')

const AuthController = {
	login: async function (params) {
		return Auth.login(params)
	},
}

module.exports = AuthController