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
import api from './server/api'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require("path")
const fs = require("fs");
const environment = process.env.ENVIRONMENT || 'development';
const dbconfig = require('../knexfile')[environment];
const knex = require('./database/knex')

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
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
		}
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
		api.load() // load custom api endpoints

	} else {
		createProtocol('app')
		// Load the index.html when not in development
		mainWindow.loadURL('app://./index.html')
		api.load() // load custom api endpoints

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

// Creating database if db does not exist.
if (fs.existsSync(dbconfig.connection.filename) == false) {
	console.log('Creating DB...');
	try {
		const sqlite3 = require("sqlite3").verbose();
		new sqlite3.Database(dbconfig.connection.filename,
			sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
		)
		// Migrate files
		knex.migrate.latest()
	} catch (err) {
		console.log(err);
	}
}

// TODO: Error check this

// Retrieves columns from a table
async function getColumns(table) {
	return knex.raw(`PRAGMA table_info(${table.name});`).then(function (columns) {
		let tableColumns = []

		function translate(column) {
			let types = {
				"varchar(255)": "string"
			}
			let requiredCol = column.notnull == 1 ? true : false
			let colType = Object.keys(types).includes(column.type) ? types[column.type] : column.type

			return {
				name: column.name,
				default: column.dflt_value,
				type: colType,
				required: requiredCol
			}
		}
		if (columns && columns.length !== 0) {
			for (let column of columns) {
				tableColumns.push(translate(column))
			}
		}

		return tableColumns
	})
}

// Retrieves tables and table columns
async function getSchema() {
	var schema = {}
	var tables = await knex.raw(`SELECT * FROM sqlite_master where type='table'`)
	if (tables && tables.length !== 0) {
		for (let table of tables) {
			if (['sqlite_sequence', 'migrations_lock', 'migrations'].includes(table.name)) {
				continue
			}
			schema[table.name] = await getColumns(table)
		}
	}
	return schema
}

// Writes schema.json file
async function buildSchema() {
	const schema = await getSchema()
	if (schema && Object.keys(schema).length !== 0) {
		fs.writeFile(path.resolve('src/database/schema.json'), JSON.stringify(schema), function (err) {
			if (err) throw err;
			console.log('Schema built successfully');
		});
	}
}

if (fs.existsSync(dbconfig.connection.filename)) {
	// Build Schema
	try {
		buildSchema()
	} catch (err) {
		console.log(err)
	}
}