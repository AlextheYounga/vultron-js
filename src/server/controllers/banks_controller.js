const Bank = require('../../models/Bank')

const BanksController = {
	endpoints: ['banks_all'],

	banks_all: function (event, arg) {
		Bank.model.fetchAll().then((banks) => {
			event.returnValue = banks.toJSON()
			return event
		})
		return event.returnValue;
	}
}

export default BanksController