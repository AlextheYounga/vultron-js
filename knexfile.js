const path = require("path")

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve('./src/database/vultron.db')
		},
		migrations: {
			directory: path.resolve('./src/database/migrations'),
			tableName: 'migrations',
		},
		seeds: {
			directory: path.resolve('./src/database/seeds'),
		},
		useNullAsDefault: true,
	},

	staging: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve('./src/database/vultron.db')
		},
		migrations: {
			directory: path.resolve('./src/database/migrations'),
			tableName: 'migrations',
		},
		seeds: {
			directory: path.resolve('./src/database/seeds'),
		},
		useNullAsDefault: true,
	},
	production: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve('./src/database/vultron.db')
		},
		migrations: {
			directory: path.resolve('./src/database/migrations'),
			tableName: 'migrations',
		},
		seeds: {
			directory: path.resolve('./src/database/seeds'),
		},
		useNullAsDefault: true,
	}
}