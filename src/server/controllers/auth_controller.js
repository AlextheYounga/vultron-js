const User = require('../../models/User')

const AuthController = {
	/* Specify which functions here will be included in Electron's ipcMain module. 
	* This is what you will query on the frontend. 
	* Vue example: 
		this.$api.sendSync('login', {
			username: this.$data.form.username, 
			password: this.$data.form.password }
		)
	*/
	endpoints: ['login'], 

	login: function (event, arg) {
		User.verify(arg.username, arg.password).then(function (user) {
			event.returnValue = user.toJSON()
			return event

		})
		return event.returnValue
	},
}

export default AuthController