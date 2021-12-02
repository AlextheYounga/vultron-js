const bookshelf = require('../database/bookshelf');
const User = require('./User.js');

const Bank = {
	model: bookshelf.Model.extend({
		tableName: 'banks',
		user: function () {
			return this.belongsTo(User);
		},
	}),
}

module.exports = Bank;