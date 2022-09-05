const Account = require('../../../app/models/Account')

describe('Accounts', () => {
	it('model is set up correctly and fetches all accounts', () => {
		return Account.fetchAll().then((accounts) => {
            return expect(accounts.toJSON()).toBeTruthy()
		})
	})
})