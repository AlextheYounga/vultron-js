module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				extraResources: [
					'app',
					'database',
					'vultron.db'
				]
			},
			externals: ['sqlite3', 'knex', 'bookshelf'],
		},
	},
};