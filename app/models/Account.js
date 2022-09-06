const DBConnection = require('../../framework/Database/dbconnection')
const bookshelf = DBConnection.bookshelf()


const Account = bookshelf.model('Account', {
	tableName: 'accounts',
	user: function () {
		return this.belongsTo(require('./User'));
	},
})

module.exports = Account