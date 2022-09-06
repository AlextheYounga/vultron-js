/* eslint-env jest */
const Account = require('../../../app/models/Account')
const AccountsController = require('../../../app/controllers/AccountsController')
const User = require('../../../app/models/User')
import { faker } from '@faker-js/faker';

describe('AccountsController', () => {
	var testUser = {
		name: `${faker.name.firstName()} ${faker.name.lastName()}`,
		username: faker.internet.userName(),
		password: faker.internet.password(),
		email: faker.internet.email()
	}

	var testAccount1 = {
		name: faker.company.bsBuzz(),
		institution: faker.company.name(),
		last_four: '1234',
		type: 'checking',
		currency: 'USD',
	}
    var testAccount2 = {
		name: faker.company.bsBuzz(),
		institution: faker.company.name(),
		last_four: '1234',
		type: 'checking',
		currency: 'USD',
	}

	beforeAll(async () => {
		let user = await User.forge(testUser).save()
		testAccount1.user_id = user.get('id')
        return await Account.forge(testAccount1).save()
	})

	afterAll(async () => {
		await User.where({ email: testUser.email }).destroy()
		await Account.where({ name: testAccount1.name }).destroy()
        return await Account.where({ name: testAccount2.name }).destroy()
	})

    it('can create a new account', () => {
        return AccountsController.create(testAccount2).then((account) => {
            return expect(account).toHaveProperty('id')
        })
    })

    it('can fetch all accounts from a user id', () => {
        return User.where({email: testUser.email}).fetch().then((user) => {
            return AccountsController.fetchAll(user.get('id')).then((accounts) => {
                return expect(accounts).toBeTruthy()
            })
        })
    })
})