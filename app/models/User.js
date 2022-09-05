const DBConnection = require('../../framework/Database/dbconnection')
const bookshelf = DBConnection.bookshelf()
const encryptOnSave = require('../../framework/Database/encrypt-on-save')

const User = bookshelf.model('User', {
	tableName: 'users',
	hidden: ['password', 'pin'],
	hashable: ['password', 'pin'],
	initialize: function () {
		this.on('saving', this.hashAttributes, this);
	},
	hashAttributes: function (model) {
		return encryptOnSave(model, this.hashable)
	},
	accounts: function () {
		return this.hasMany(require('./Account'));
	},
})

module.exports = User