/* eslint-env jest */
const fs = require("fs");
const path = require("path")
const SessionManager = require('../../../framework/Session/session-manager')

jest.mock('brownies', () => jest.fn())

describe('SessionManager', () => {
    function createMockSessionFileSync(data) {
        return fs.writeFileSync(
            path.resolve(`storage/sessions/${data.token}`),
            JSON.stringify(data)
        );
    }

    var user_id = 1
    var token_1 = 'z9uY86sJ7OrMtuGr1rsqdL4tbg4rAhL9dn6kSXiZ'
    var token_2 = 'z9uY86sJ7OrMtuGr1rsqdL4tbg4rAhL9dn6kSXiA'
    var session_data_1 = { id: user_id, token: token_1, last_activity: Date.now() }
    var session_data_2 = { id: user_id, token: token_2, last_activity: Date.now() + 1 }

    beforeAll(() => {
        createMockSessionFileSync(session_data_1);
        createMockSessionFileSync(session_data_2);
    });

    afterAll(() => {
        let sessions = fs.readdirSync(path.resolve('storage/sessions'))
        sessions.forEach(function (file) {
            fs.unlinkSync(path.resolve(`storage/sessions/${file}`));
        });
    });

    describe('when the browser cannot find a current session', () => {
        describe('when there are previous session files', () => {
            describe('when the session has not expired', () => {
                it('can restore a previous session', () => {
                    return expect(SessionManager.restore()).toMatchObject(session_data_2)
                })
            })
            describe('when the sessions have expired', () => {
                var expired_session_1 = { id: user_id, token: token_1, last_activity: Date.now() - 4330000000 }
                var expired_session_2 = { id: user_id, token: token_2, last_activity: Date.now() - 4380000000 }

                beforeAll(() => {
                    createMockSessionFileSync(expired_session_1);
                    createMockSessionFileSync(expired_session_2);
                });

                it('does not restore the session', () => {
                    return expect(SessionManager.restore()).toBe(false)
                })
            })
        })
    })


})