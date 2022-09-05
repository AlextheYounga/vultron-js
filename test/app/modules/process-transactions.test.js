const fs = require("fs")
const ProcessTransactions = require('../../../app/modules/process-transactions')
require('../../../framework/Prototypes/string')

describe('ProcessTransactions', () => {
    describe('when csv transactions are uploaded', () => {
        var columnMap = require('../../fixtures/column_map.json')
        var form = require('../../fixtures/form.json')
        var payload = ProcessTransactions.run(columnMap, form)

        afterAll(async () => {
            fs.unlinkSync(payload.saved_path) // Delete upload file
            // let user = await User.where({ email: testUserEmail }).fetch()
            // await Upload.where({ user_id: user.get('id') }).destroy()
            // return await Transaction.where({ user_id: user.get('id') }).destroy()
        });

        it('transactions are mapped according to input fields', () => {
            var expectedPayload = require('../../fixtures/payload.json')
            expect(Object.keys(payload)).toEqual(expect.arrayContaining(Object.keys(expectedPayload)));

        })
        it('creates a backup file of processed transactions', () => {
            expect(fs.existsSync(payload.saved_path)).toBe(true)
        })

    })
})