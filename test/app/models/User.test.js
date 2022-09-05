const User = require('../../../app/models/User')

describe('Users', () => {
    it('user model fetches all records', () => {
        return User.fetchAll().then((users) => {
            return expect(users.toJSON()).toBeInstanceOf(Array)
        })
    })
    it('user model can be found by email', async () => {
        let user_email = 'alex@test.com'
        let user = await User.where({ email: user_email }).fetch({ require: false })
        expect(user.get('email')).toEqual(user_email)
    })
    describe('when fetching user relationships', () => {
        it('returns all user accounts relations', () => {
            let user_email = 'alex@test.com'
            return User.where({
                email: user_email
            }).fetch({
                withRelated: ['accounts']
            }).then((user) => {
                expect(user.get('email')).toEqual(user_email)
                return expect(user.related('accounts').toJSON()).toBeInstanceOf(Array)
            })
        })
        it('returns all user transaction relations', () => {
            let user_email = 'alex@test.com'
            return User.where({
                email: user_email
            }).fetch({
                withRelated: ['transactions']
            }).then((user) => {
                expect(user.get('email')).toEqual(user_email)
                return expect(user.related('transactions').toJSON()).toBeInstanceOf(Array)
            })
        })
        it('returns all user upload relations', () => {
            let user_email = 'alex@test.com'
            return User.where({
                email: user_email
            }).fetch({
                withRelated: ['uploads']
            }).then((user) => {
                expect(user.get('email')).toEqual(user_email)
                return expect(user.related('uploads').toJSON()).toBeInstanceOf(Array)
            })
        })
    })
})