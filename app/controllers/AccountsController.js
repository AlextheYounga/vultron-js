const Account = require('../models/Account')
const User = require('../models/User')

const AccountsController = {
	fetchAll: function (user_id) {
		return User.where({
			id: user_id
		}).fetch({
			withRelated: ['accounts']
		}).then((user) => {
			return user.related('accounts').toJSON()
		}).catch((error) => {
			console.error(error)
		})
	},
	create: function (data) {
		return Account.forge(data).save().then(function (account) {
			return account.toJSON()
		}).catch(function (error) {
			return error
		})
	},
}

module.exports = AccountsController