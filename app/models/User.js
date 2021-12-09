const bcrypt = require("bcryptjs");
const Bank = require('./Bank.js');
const bookshelf = require('../../database/bookshelf')

const User = {
	model: bookshelf.Model.extend({
		tableName: 'users',
		hidden: ['password'],
		hashable: ['password'],
		initialize: function () {
			this.on('creating', this.hashAttributes, this);
		},
		hashAttributes: function (model) {
			var hashAttrs = this.hashable
			return new Promise(function (resolve, reject) {
				for (var attr of hashAttrs) {
					bcrypt.hash(model.attributes[attr], 10, function (err, hash) {
						if (err) reject(err);
						model.set(attr, hash);
						resolve(hash); // data is created only after this occurs
					});
				}
			});
		},
		banks: function () {
			return this.hasMany(Bank);
		},
	}),
	verify: async function (username, password) {
		try {
			return await this.model.where('username', username).fetch({
				require: false
			}).then((user) => {
				if (!user) throw new Error('Username does not match');
				if (user) {
					if (bcrypt.compareSync(password, user.get('password'))) { //compare password
						return user.toJSON()
					}
					throw new Error('Password does not match');
				}
				return
			})
		} catch (err) {
			return err
		}
	},
}

module.exports = User