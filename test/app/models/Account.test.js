/* eslint-env jest */
const Account = require('../../../app/models/Account')
const User = require('../../../app/models/User')
import { faker } from '@faker-js/faker';

describe('Accounts', () => {
	var testUser = {
		name: `${faker.name.firstName()} ${faker.name.lastName()}`,
		username: faker.internet.userName(),
		password: faker.internet.password(),
		email: faker.internet.email()
	}

	var testAccount = {
		name: faker.company.bsBuzz(),
		institution: faker.company.name(),
		last_four: '1234',
		type: 'checking',
		currency: 'USD',
	}

	beforeAll(async () => {
		let user = await User.forge(testUser).save()
		testAccount.user_id = user.get('id')
		return await Account.forge(testAccount).save()
	})

	afterAll(async () => {
		await User.where({ email: testUser.email }).destroy()
		return await Account.where({ name: testAccount.name }).destroy()
	})

	describe('when fetching', () => {
		it('can fetch all accounts', () => {
			return Account.fetchAll().then((accounts) => {
				return expect(accounts.toJSON()).toBeTruthy()
			})
		})
	})
})