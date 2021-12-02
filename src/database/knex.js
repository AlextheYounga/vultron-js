// https://knexjs.org/

const environment = process.env.ENVIRONMENT || 'development';
const config = require('../../knexfile')[environment];
const fs = require('fs');

const knex = require('knex')(config)

module.exports = knex