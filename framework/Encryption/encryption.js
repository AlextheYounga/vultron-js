const bcrypt = require("bcryptjs");
const Encrypt = {
	saltRounds: 10,
	hash: async function (value) {
		return new Promise(function (resolve, reject) {
			bcrypt.hash(value, this.saltRounds, function (err, hash) {
				if (err) reject(err);
				resolve(hash); // data is created only after this occurs
			});
		})
	},
	hashSync: function(value) {
		return bcrypt.hashSync(value, this.saltRounds)
	},
	compare: async function (value, hash) {
		return await bcrypt.compare(value, hash).then((res) => {
			if (res === false) return false
			return true
		}, (err) => {
			// throw new Error(err);
			return new Error(err)
		});
	}

}

module.exports = Encrypt