// https://bookshelfjs.org/
const database = require('./database')
const knex = database.knex
const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf;