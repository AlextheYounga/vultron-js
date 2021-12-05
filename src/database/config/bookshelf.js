// https://bookshelfjs.org/

const knex = require('./knex')
const bookshelf = require('bookshelf')(knex)
module.exports = bookshelf;