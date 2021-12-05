const User = require('../../models/User')

const AuthController = {
	/* Specify which functions here will be included in Electron's ipcMain module. 
	* This is what you will query on the frontend. 
	*/
	endpoints: ['login'], 

	login: function (event, arg) {
		User.verify(arg.username, arg.password).then(function (verified) {
			event.reply('login', verified.toJSON()) // Send reply back
		})
	},
}

export default AuthController