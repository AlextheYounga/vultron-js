/* eslint-env jest */
const Controller = require('../../../app/controllers/Controller.js')

describe('Controller', () => {
    describe('when pinging electron controller', () => {
        it('returns pong', () => {
            return expect(Controller.ping()).toEqual('pong')
        })
    })
})
