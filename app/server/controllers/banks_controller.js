const Bank = require('../../models/Bank')

const BanksController = {
	endpoints: [
		{ name: 'banks.all', prop: 'banksAll' },
	],

	banksAll: function (event, arg) {
		Bank.model.fetchAll().then((banks) => {
			event.reply('banks.all', banks.toJSON()) // send reply to named endpoint
		})
	}
}

export default BanksController