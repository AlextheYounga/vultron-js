const bcrypt = require("bcryptjs");

async function encryptOnSave(model, hashable) {
	const SALT_ROUNDS = 10
	if (!Object.keys(model.attributes).some(r => hashable.includes(r))) return
	return new Promise(function (resolve, reject) {
		for (let attr of hashable) {
			let modelValue = model.attributes[attr]
			if (typeof modelValue != 'undefined' && modelValue) {
				bcrypt.hash(modelValue, SALT_ROUNDS, function (err, hash) {
					if (err) reject(err);
					model.set(attr, hash);
					resolve(hash); // data is created only after this occurs
				});
			}
		}
	});
}

module.exports = encryptOnSave