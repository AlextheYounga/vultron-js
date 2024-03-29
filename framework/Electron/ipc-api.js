const {
	ipcMain
} = require("electron")
const Channels = require("../../app/config/channels")

function loadApi() {
	//Dynamically import controllers for each channel
	for (let channel of Channels) { //loop through route groupings
		import(`../../app/controllers/${channel.controller}`).then(function (controller) {
			ipcMain.handle(channel.name, async (_event, params) => {
				return controller.default[channel.action](params) // dynamically call controller endpoints
			})
		})
	}
}

export default {
	load: loadApi
}