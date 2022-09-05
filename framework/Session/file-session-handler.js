const fs = require("fs");
const path = require("path")
require('../Prototypes/object')

const FileSessionHandler = {
    storagePath: function () {
        return path.resolve('storage/sessions')
    },
    buildPath: function (token) {
        if (!token) return
        return path.resolve(`storage/sessions/${token}`)
    },
    read: function (token) {
        let filepath = this.buildPath(token)
        if (!fs.existsSync(filepath)) return null

        let data = fs.readFileSync(filepath, "utf8")
        try {
            let json = JSON.parse(data)
            return json
        } catch (error) {
            console.log(error)
            return null
        }
    },
    store: function (data) {
        if (typeof data !== 'object' && !data.token) {
            throw Error('Session data is invalid')
        }
        return fs.writeFile(
            this.buildPath(data.token),
            JSON.stringify(data),
            function (err) {
                if (err) throw err;
            });
    },
    getLast: function () {
        let files = fs.readdirSync(this.storagePath())
        let session_timestamps = {}
        if (files.length !== 0) {
            for (let file of files) {
                let data = this.read(file)
                if (data && data.last_activity) {
                    session_timestamps[file] = parseInt(data.last_activity)
                }
            }
            let max = Math.max(...Object.values(session_timestamps))
            return this.read(session_timestamps.getKeyByValue(max))
        }
        return null
    }
}

module.exports = FileSessionHandler