const Bank = require('../../models/Bank')

const BanksController = {
	/* Specify which actions here will be included in Electron's ipcMain module. 
	 * The 'action' prop specifies which function to call, while the 'name' prop
	 * sets the custom name of the endpoint, which is what you will call on the front-end.
	 */
	endpoints: [{
		name: 'banks.all', // what you will call on the front-end
		action: 'banksAll' // name of the function to call
	}, ],

	banksAll: function (event, arg) {
		Bank.model.fetchAll().then((banks) => {
			event.reply('banks.all', banks.toJSON()) // Send reply back using name of endpoint event
		})
	}
}

export default BanksController