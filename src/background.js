'use strict'

import {
	app,
	screen,
	protocol,
	BrowserWindow,
} from 'electron'
import {
	createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {
	VUEJS3_DEVTOOLS
} from 'electron-devtools-installer'
import ElectronApi from '../framework/Electron/ipc-api'
const isDevelopment = process.env.NODE_ENV !== 'production'
const fs = require("fs");
const DatabaseConnection = require('../framework/Database/dbconnection')
const Schema = require('../framework/Database/schema')

// Load Custom Api Endpoints
ElectronApi.load() 

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
	scheme: 'app',
	privileges: {
		secure: true,
		standard: true
	}
}])


async function createWindow() {
	// Create the browser window.
	const {
		width,
		height
	} = screen.getPrimaryDisplay().workAreaSize
	const mainWindow = new BrowserWindow({
		width: width,
		height: height,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			enableRemoteModule: true,
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
		}
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()

	} else {
		createProtocol('app')
		// Load the index.html when not in development
		mainWindow.loadURL('app://./index.html')
	}
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		try {
			await installExtension(VUEJS3_DEVTOOLS)
		} catch (e) {
			console.error('Vue Devtools failed to install:', e.toString())
		}
	}
	createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}


// Database Functions
const dbPath = DatabaseConnection.instance().dbPath // path to db
if (fs.existsSync(dbPath)) { 
	// Build Schema
	try {
		Schema.build()
	} catch (err) {
		console.log(err)
	}
}