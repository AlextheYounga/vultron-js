const {
	ipcMain
} = require("electron")
const fs = require("fs");
const path = require("path")

function loadApi() {
	//Dynamically import controllers. List endpoints you wish to be included in the api in the 'endpoints' property of each controller.
	let controllersPath = path.join(path.dirname(__dirname), 'app', 'server', 'controllers')
	let controllerFiles = fs.readdirSync(controllersPath); // Read all controller files

	for (let filename of controllerFiles) {
		import(`./controllers/${filename}`).then(function (controller) { //Dynamic import
			if (Object.keys(controller.default).includes('endpoints')) {
				for (let endpoint of controller.default.endpoints) {
					ipcMain.on(endpoint.name, (event, arg) => { // ipcMain listens on event endpoint.name
						controller.default[endpoint.prop](event, arg) // dynamically call controller endpoints
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