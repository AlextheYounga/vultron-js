const User = require('../../models/User')
const CustomApi = require('./custom_api')
const Encrypt = require('../encryption')

const Auth = {
	login: async function (params) {
		let response = await CustomApi.authenticate(params) // Custom API request
		if (!response.access_token) {
			return await this.offlineLogin(params)
		}
		// Try to create new user based on credentials
		var creds = {
			name: response.user ? response.user.name : null,
			username: response.user ? response.user.username : null,
			email: params.email,
			password: params.password,
			api_token: response.access_token,
		}
		// See if user exists in database
		return User.where({ email: params.email }).fetch({
			require: false
		}).then((user) => {
			if (!user) {
				// If no user in local database yet, create one.
				return User.new(creds).save().then(function (new_user) {
					console.log('New user has been saved');
					return new_user.toJSON()
				}).catch(function (error) {
					return error
				})
			}
			// If user exists, update api token with new access token from response.
			return user.save({
				api_token: creds.api_token
			}).then((user) => {
				console.log('User API token updated')
				return user.toJSON()
			})
		})
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