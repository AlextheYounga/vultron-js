const User = require('../../models/User')

const AuthController = {
	/* Specify which actions here will be included in Electron's ipcMain module. 
	 * The 'action' prop specifies which function to call, while the 'name' prop
	 * sets the custom name of the endpoint, which is what you will call on the front-end.
	 */
	endpoints: [
		{name: 'login', action: 'login'},
	],

	login: function (event, arg) {
		User.verify(arg.username, arg.password).then(function (verified) {
			event.reply('login', verified.toJSON()) // Send reply back using name of endpoint event
		})
	},
}

export default AuthController