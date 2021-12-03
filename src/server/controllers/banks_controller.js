const Bank = require('../../models/Bank')

const BanksController = {
	endpoints: ['banks_all'],

	banks_all: function (event, arg) {
		Bank.model.fetchAll().then((banks) => {
			return banks.toJSON()
		})
	}
}

export default BanksController