const Bank = require('../../models/Bank')

const BanksController = {
	banksAll: function (event, params) {
		Bank.model.fetchAll().then((banks) => {
			event.reply(event.routeName, banks.toJSON()) // Send reply back using name of endpoint event
		})
	}
}

export default BanksController