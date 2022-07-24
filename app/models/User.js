const Database = require('../../database/database')
const bookshelf = Database.bookshelf()

const User = bookshelf.model('User', {
	tableName: 'users',
	hidden: ['password', 'pin'],
	hashable: ['password', 'pin'],
	initialize: function () {
		this.on('saving', this.hashAttributes, this);
	},
	hashAttributes: function (model) {
		return Database.encryptOnSave(model, this.hashable)
	},
	accounts: function () {
		return this.hasMany(require('./Account'));
	},
})

module.exports = User