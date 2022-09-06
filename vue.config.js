module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				extraResources: [
					'app',
					'database',
					'framework'
				]
			},
			externals: ['sqlite3', 'knex', 'bookshelf'],
		},
	},
};