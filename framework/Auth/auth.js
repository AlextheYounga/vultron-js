const User = require('../../app/models/User')
const Encrypt = require('../Encryption/encryption')
// const CustomApi = require('./api')

const Auth = {
	login: async function () {
		// Custom external API authentication might be made here
	},

	offlineLogin: async function (params) {
		// Authenticate based on user and password from database.
		return User.where({ email: params.email }).fetch({
			require: false
		}).then(async (user) => {
			if (!user) throw new Error('Email not found');
			if (await Encrypt.compare(params.password, user.get('password'))) {
				return user.toJSON()
			}
			throw new Error('Password is incorrect');
		}).catch((error) => {
			return error.message
		})
	},
}

module.exports = Auth