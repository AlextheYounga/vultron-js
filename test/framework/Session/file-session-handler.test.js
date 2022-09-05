const fs = require("fs");
const path = require("path")
const FileSessionHandler = require('../../../framework/Session/file-session-handler')

describe('FileSessionHandler', () => {
    function createMockSessionFileSync(data) {
        return fs.writeFileSync(
            path.resolve(`storage/sessions/${data.token}`),
            JSON.stringify(data)
        );
    }

    var user_id = 1
    var token = 'z9uY86sJ7OrMtuGr1rsqdL4tbg4rAhL9dn6kSXiZ'
    var expected_file_path = path.resolve(`storage/sessions/${token}`)
    var session_data = { id: user_id, token: token, last_activity: Date.now() }

    beforeAll(() => {
        createMockSessionFileSync(session_data)
    });

    afterAll(() => {
        let sessions = fs.readdirSync(path.resolve('storage/sessions'))
        sessions.forEach(function (file) {
            fs.unlinkSync(path.resolve(`storage/sessions/${file}`));
        });
    });

    describe('when creating a new session file', () => {
        describe('when creation is successful', () => {
            FileSessionHandler.store(session_data)
            it('it is saved in the appropriate path', () => {
                return expect(fs.existsSync(expected_file_path)).toBeTruthy()
            })
        })
        describe('when creation is unsuccessful', () => {
            it('throws an error', () => {
                return expect(() => {
                    FileSessionHandler.store('invalid_session_data')
                }).toThrow('Session data is invalid')
            })
        })
    })

    describe('when a session file is already present', () => {
        it('can read a session file given a token', () => {
            return expect(FileSessionHandler.read(token)).toMatchObject(session_data)
        })
    })

    describe('when there are multiple session files', () => {
        const token2 = 'z9uY86sJ7OrMtuGr1rsqdL4tbg4rAhL9dn6kSXiA'
        var session_data_2 = { id: 2, token: token2, last_activity: Date.now() + 1 }
        createMockSessionFileSync(session_data_2)

        it('can find the most recent session file', () => {
            return expect(FileSessionHandler.getLast()).toMatchObject(session_data_2)
        })
    })
})



