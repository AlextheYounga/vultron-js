exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('accounts').del().then(function () {
		const Account = require('../../app/models/Account')
		const User = require('../../app/models/User')
		// Fetching user id
		return User.where({email: 'alex@alextheyounger.me'}).fetch({
			require: false
		}).then((user) => {
			// Inserts seed entries
			return Account.forge({
				user_id: user.id,
				name: 'Chase Checkings',
				institution: 'Chase',
				last_four: '1234',
				type: 'checking',
				currency: 'USD',
			}).save().then(function () {
				console.log('Account model has been saved');
			}).catch((error) => {
				console.log(error)
			})
		})
	});
};