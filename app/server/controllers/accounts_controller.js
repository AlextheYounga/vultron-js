const Account = require('../../models/Account')
const User = require('../../models/User')

const AccountsController = {
	fetchAll: function (user_id) {
		return User.where({
			id: user_id
		}).fetch({
			withRelated: ['accounts']
		}).then((user) => {
			return user.related('accounts').toJSON() 
		})
	},
	create: function (data) {
		return Account.new(data).save().then(function (account) {
			console.log('Account model has been saved');
			return account.toJSON()
		}).catch(function (error) {
			return error
		})
	},
}

module.exports = AccountsController