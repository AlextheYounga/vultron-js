const fs = require("fs");
const path = require("path")
const sqlite3 = require("sqlite3").verbose();
const electron_env = process.env.ENVIRONMENT

async function runMigrations(env = electron_env || 'development') {
    const config = require('../../knexfile')[env];
    const knex = require('knex')(config)
    // Migrate files
    try {
        knex.migrate.latest()
    } catch (err) {
        console.log(err);
    }
}

async function setup(env = electron_env || 'development') {
    // Creating database if db does not exist.
    const config = require('../../knexfile')[env];
    const dbPath = path.join(path.dirname(__dirname), config.connection.filename)

    if (fs.existsSync(dbPath) == false) {
        console.log('Creating DB...');
        try {
            new sqlite3.Database(dbPath,
                sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            )
        } catch (err) {
            console.log(err);
        }
        runMigrations(env)
    }
}

module.exports = setup