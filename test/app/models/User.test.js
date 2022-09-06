/* eslint-env jest */
//TODO: Figure out why new users aren't being encrypted
const User = require('../../../app/models/User')
import { faker } from '@faker-js/faker';
const Encryption = require('../../../framework/Encryption/encryption')

describe('Users', () => {
    var testUserEmail = 'alex@alextheyounger.me'

    it('user model fetches all records', () => {
        return User.fetchAll().then((users) => {
            return expect(users.toJSON()).toBeInstanceOf(Array)
        })
    })
    it('user model can be found by email', async () => {
        let user = await User.where({ email: testUserEmail }).fetch({ require: false })
        return expect(user.get('email')).toEqual(testUserEmail)
    })
    describe('when fetching user relationships', () => {
        it('returns all user accounts relations', () => {
            return User.where({
                email: testUserEmail
            }).fetch({
                withRelated: ['accounts']
            }).then((user) => {
                expect(user.get('email')).toEqual(testUserEmail)
                return expect(user.related('accounts').toJSON()).toBeInstanceOf(Array)
            })
        })
    })
    describe('when creating users', () => {
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

        it('encrypts sensitive information', async () => {
            let newUser = await User.forge(testUser).save()
            let passwordMatch = await Encryption.compare(testUser.password, newUser.get('password'))

            return expect(passwordMatch).toBe(true)
        })
    })
})

