const Bank = require('../../models/Bank')

const BanksController = {
	endpoints: ['banksAll'],

	banksAll: function (event, arg) {
		Bank.model.fetchAll().then((banks) => {
			event.reply('banksAll', banks.toJSON())
		})
	}
}

export default BanksController