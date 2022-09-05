const { session } = require('brownies');
const { generateRandom } = require('../Helpers/string-helpers')
const FileSessionHandler = require('./file-session-handler')

const SessionManager = {
    brownies: session,
    user: function () { return session.user },
    set: function (user_id, data) {
        let session_data = {
            id: user_id,
            token: generateRandom(40),
            last_activity: Date.now(),
            ...data,
        }
        session.user = session_data
        if (session.user.id) {
            FileSessionHandler.store(session_data)
            return session.user
        }
        return false
    },
    update: function (data) {
        if (session.user.id) {
            session.user = {
                ...session.user,
                ...data,
                last_activity: Date.now(),
            }
            return session.user
        }
        return null
    },
    validate: function () {
        if (session.user) {
            let session_data = FileSessionHandler.read(session.user.token)
            if (session_data && session_data.id == session.user.id) {
                return session_data
            }
        }
        return false
    },
    destroy: function () {
        delete session.user
    }
}

module.exports = SessionManager