const path = require("path")

module.exports = {
	testing: {
		client: 'sqlite3',
		connection: {
			directory: path.resolve('test/database'),
			filename: 'vultron_test.db'
		},
		migrations: {
			directory: path.resolve('./database/migrations'),
			tableName: 'migrations',
		},
		seeds: {
			directory: path.resolve('./database/seeds'),
		},
		useNullAsDefault: true,
	},
	development: {
		client: 'sqlite3',
		connection: {
			filename: 'vultron.db'
		},
		migrations: {
			directory: path.resolve('./database/migrations'),
			tableName: 'migrations',
		},
		seeds: {
			directory: path.resolve('./database/seeds'),
		},
		useNullAsDefault: true,
	},
	production: {
		client: 'sqlite3',
		connection: {
			filename: 'vultron.db'
		},
		migrations: {
			directory: path.resolve('./database/migrations'),
			tableName: 'migrations',
		},
		seeds: {
			directory: path.resolve('./database/seeds'),
		},
		useNullAsDefault: true,
	}
}

