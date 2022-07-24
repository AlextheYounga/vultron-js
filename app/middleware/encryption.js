const bcrypt = require("bcryptjs");
const Encrypt = {
	hash: async function (value) {
		const SALT_ROUNDS = 10
		return new Promise(function (resolve, reject) {
			bcrypt.hash(value, SALT_ROUNDS, function (err, hash) {
				if (err) reject(err);
				resolve(hash); // data is created only after this occurs
			});
		})
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