const {
	ipcMain
} = require("electron")
const fs = require("fs");
const path = require("path")

function loadApi() {
	//Dynamically import controllers. List endpoints you wish to be included in the api in the endpoints property of each controller.
	let controllersPath = path.join(path.dirname(__dirname), 'app', 'server', 'controllers')
	let controllerFiles = fs.readdirSync(controllersPath); // Read all controller files

	for (let filename of controllerFiles) {
		import(`./controllers/${filename}`).then(function (controller) { //Dynamic import
			if (Object.keys(controller.default).includes('endpoints')) { //Check if controller has an "endpoints" property
				for (let endpoint of controller.default.endpoints) {
					// Add endpoint to Electron's ipc api.
					ipcMain.on(endpoint, (event, arg) => {
						controller.default[endpoint](event, arg) // dynamically call controller endpoints
						// event.reply(endpoint, response)
					})
				}
			}
			return ipcMain
		});
	}
}

export default {
	load: loadApi
}