const {
	ipcMain
} = require("electron")
const Routes = require("./routes")

function loadApi() {
	//Dynamically import controllers. List endpoints you wish to be included in the api in the 'endpoints' property of each controller.
	for (let group of Object.keys(Routes)) { //loop through route groupings
		import(`./controllers/${group}_controller`).then(function (controller) {
			for (let endpoint of Routes[group]) {
				ipcMain.on(endpoint.name, (event, params) => {
					event.routeAction = endpoint.action
					event.routeName = endpoint.name
					controller.default[endpoint.action](event, params) // dynamically call controller endpoints
				})
			}
		})
	}
}

export default {
	load: loadApi
}