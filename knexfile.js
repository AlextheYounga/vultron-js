const path = require("path")

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: path.join(path.dirname(__dirname), 'vultron.db')
		},
		migrations: {
			directory: path.join(path.dirname(__dirname), 'src', 'database', 'migrations'),
			tableName: 'migrations',
		},
		seeds: {
			directory: path.join(path.dirname(__dirname), 'src', 'database', 'seeds'),
		},
		useNullAsDefault: true,
	},

	staging: {
		client: 'sqlite3',
		connection: {
			filename: path.join(path.dirname(__dirname), 'vultron.db')
		},
		migrations: {
			directory: path.join(path.dirname(__dirname), 'src', 'database', 'migrations'),
			tableName: 'migrations',
		},
		seeds: {
			directory: path.join(path.dirname(__dirname), 'src', 'database', 'seeds'),
		},
		useNullAsDefault: true,
	},
	production: {
		client: 'sqlite3',
		connection: {
			filename: path.join(path.dirname(__dirname), 'vultron.db')
		},
		migrations: {
			directory: path.join(path.dirname(__dirname), 'src', 'database', 'migrations'),
			tableName: 'migrations',
		},
		seeds: {
			directory: path.join(path.dirname(__dirname), 'src', 'database', 'seeds'),
		},
		useNullAsDefault: true,
	}
}