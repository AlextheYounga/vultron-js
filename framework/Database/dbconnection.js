const path = require("path")
const electron_env = process.env.ENVIRONMENT

const DatabaseConnection = {
	instance: function (env = electron_env || 'development') {
		const config = require('../../knexfile')[env];
		const dbPath = path.join(path.dirname(__dirname), config.connection.filename)
		const knex = require('knex')(config)

		return {
			knex: knex,
			dbPath: dbPath,
		}
	},
	bookshelf: function (env = electron_env || 'development') {
		const {
			knex
		} = this.instance(env) // Import knex with default env
		const bookshelf = require('bookshelf')(knex)

		// Import plugins
		const upsert = require('bookshelf-upsert')
		const uuid = require('bookshelf-uuid')
		var jsonColumns = require('bookshelf-json-columns');

		// Use plugins
		bookshelf.plugin(upsert)
		bookshelf.plugin(uuid)
		bookshelf.plugin(jsonColumns);

		return bookshelf
	},
}

module.exports = DatabaseConnection