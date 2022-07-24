const Database = require('../../database/database')
const bookshelf = Database.bookshelf()


const Account = bookshelf.model('Account', {
	tableName: 'accounts',
	user: function () {
		return this.belongsTo(require('./User'));
	},
})

module.exports = Account