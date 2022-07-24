const {
	describe,
	it,
} = require('mocha')
const User = require('../app/models/User')
const assert = require('chai').assert;

describe('users', () => {
	it('user model fetches all records', () => {
		return User.fetchAll().then((users) => {
			assert.isArray(users.toJSON())
		})
	})
	it('user model fetches all user accounts relations', () => {
		var user_id = 1
		return User.where({
			id: user_id
		}).fetch({
			withRelated: ['accounts']
		}).then((user) => {
			assert.isArray(user.related('accounts').toJSON())
		})
	})
})