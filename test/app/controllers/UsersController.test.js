const UsersController = require('../../../app/controllers/UsersController.js')

describe('UsersController', () => {
    describe('when creating a test user', () => {
        it('returns newly created user', () => {
            return UsersController.create().then((user) => {
                return expect(user).toHaveProperty('id')
            })
        })
    })
})
