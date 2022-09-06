/* eslint-env jest */
const User = require('../../../app/models/User')
import { faker } from '@faker-js/faker';
const Encryption = require('../../../framework/Encryption/encryption')

describe('Users', () => {
    var testUser = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email()
    }

    beforeAll(async () => {
        return await User.forge(testUser).save()
    })

    afterAll(() => {
        return User.where({ email: testUser.email })
            .destroy()
            .catch((error) => {
                console.log(error)
            })
    })

    describe('when creating users', () => {
        it('encrypts sensitive information', async () => {
            let user = await User.where({email: testUser.email}).fetch()
            let passwordMatch = await Encryption.compare(testUser.password, user.get('password'))
            return expect(passwordMatch).toBe(true)
        })
    })

    describe('when fetching', () => {
        it('user model can fetch all records', () => {
            return User.fetchAll().then((users) => {
                return expect(users.toJSON()).toBeInstanceOf(Array)
            })
        })
        it('user model can be found by email', async () => {
            let user = await User.where({ email: testUser.email }).fetch({ require: false })
            return expect(user.get('email')).toEqual(testUser.email)
        })
        it('hides sensitive information from fetch', async () => {
            let user = await User.where({ email: testUser.email }).fetch({ require: false })
            return expect(user.toJSON()).not.toHaveProperty('password')
        })
    })
})

