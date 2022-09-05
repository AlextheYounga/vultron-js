/* eslint-env jest */
const Controller = require('../../../app/controllers/Controller.js')

describe('Controller', () => {
    describe('when pinging electron controller', () => {
        it('returns pong', () => {
            return Controller.ping().then((pinged) => {
                return expect(pinged).toEqual('pong')
            })
        })
    })
})
