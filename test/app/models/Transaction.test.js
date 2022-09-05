const User = require('../../../app/models/User')
const Transaction = require('../../../app/models/Transaction')
var testUserEmail = 'alex@test.com'
var transactions = require('../../fixtures/test_transactions.json')

describe('Transaction', () => {
    beforeAll(() => {
        return Transaction.collection()
            .add(transactions)
            .invokeThen('save')
            .catch((error) => {
                console.error(error)
            })
    });

    afterAll(() => {
        return User.where({ email: testUserEmail }).fetch().then((user) => {
            return Transaction.where({ user_id: user.get('id') })
                .destroy()
                .catch((error) => {
                    console.error(error)
                })
        })
    });

    it('model is set up correctly and fetches all records', () => {
        return User.where({ email: testUserEmail }).fetch().then((user) => {
            return Transaction.where({ user_id: user.get('id') }).fetchAll().then((trxs) => {
                expect(trxs).toHaveLength(transactions.length)
            })
        })
    })
})