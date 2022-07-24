const {
	describe,
	it,
} = require('mocha')
const Account = require('../app/models/Account')
const AccountsController = require('../app/server/controllers/accounts_controller.js')
const assert = require('chai').assert;
require('../app/helpers/prototypes.js')
require('should')

describe('accounts', () => {
	it('account model fetches all records', () => {
		return Account.fetchAll().then((accounts) => {
            assert.isArray(accounts.toJSON())
		})
	})
	it('accounts controller fetches user accounts', () => {
		AccountsController.fetchAll().then((accounts) => {
            assert.isArray(accounts)
        })
	})
})
