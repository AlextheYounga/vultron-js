const Bank = require('../../models/Bank')

const BanksController = {
	banksAll: function (event, params) {
		Bank.model.fetchAll().then((banks) => {
			event.reply(this.$routes.banksAll, banks.toJSON()) // Send reply back using name of endpoint event
		})
	}
}

export default BanksController