// const path = require("path")

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: 'vultron.db'
		},
		migrations: {
			directory: './src/database/migrations',
			tableName: 'migrations',
		},
		seeds: {
			directory: './src/database/seeds',
		},
		useNullAsDefault: true,
	},

	staging: {
		client: 'sqlite3',
		connection: {
			filename: 'vultron.db'
		},
		migrations: {
			directory: './src/database/migrations',
			tableName: 'migrations',
		},
		seeds: {
			directory: './src/database/seeds',
		},
		useNullAsDefault: true,
	},
	production: {
		client: 'sqlite3',
		connection: {
			filename: 'vultron.db'
		},
		migrations: {
			directory: './src/database/migrations',
			tableName: 'migrations',
		},
		seeds: {
			directory: './src/database/seeds',
		},
		useNullAsDefault: true,
	}
}