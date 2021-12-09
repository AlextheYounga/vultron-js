module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				extraResources: [
					'app',
					'vultron.db'
				]
			},
			externals: ['sqlite3', 'knex', 'bookshelf'],
		},
	},
};