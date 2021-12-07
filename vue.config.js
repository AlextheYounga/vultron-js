module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				extraResources: [
					'src/database',
					'src/models',
					'src/server',
					'vultron.db'
				]
			},
			externals: ['sqlite3', 'knex', 'bookshelf'],
		},
	},
};