const User = require('../../models/User')

const AuthController = {
	/* Specify which functions here will be included in Electron's ipcMain module. 
	* This is what you will query on the frontend. 
	*/
	endpoints: ['login'], 

	login: function (arg) {
		User.verify(arg.username, arg.password).then(function (verified) {
			return verified.toJSON()
		})
	},
}

export default AuthController