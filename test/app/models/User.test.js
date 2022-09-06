/* eslint-env jest */
//TODO: Figure out why new users aren't being encrypted
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

    afterEach(() => {
        return User.where({ email: testUser.email })
            .destroy()
            .catch((error) => {
                console.log(error)
            })
    })

    describe('when creating users', () => {
        it('encrypts sensitive information', async () => {
            let newUser = await User.forge(testUser).save()
            let passwordMatch = await Encryption.compare(testUser.password, newUser.get('password'))

            return expect(passwordMatch).toBe(true)
        })
    })

    it('user model fetches all records', () => {
        return User.forge(testUser).save()
        .then(() => {
            return User.fetchAll().then((users) => {
                return expect(users.toJSON()).toBeInstanceOf(Array)
            })
        })
    })
    it('user model can be found by email', async () => {
        await User.forge(testUser).save()

        let user = await User.where({ email: testUser.email }).fetch({ require: false })
        return expect(user.get('email')).toEqual(testUser.email)
    })
})

