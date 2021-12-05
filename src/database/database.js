const fs = require("fs");
const path = require("path")
const knex = require('./config/knex')
const sqlite3 = require("sqlite3").verbose();

export const environment = process.env.ENVIRONMENT || 'development';
export const dbConfig = require('../../knexfile')[environment]

// Creating database if db does not exist.
export async function setup() {
	if (fs.existsSync(dbConfig.connection.filename) == false) {
		console.log('Creating DB...');
		try {
			new sqlite3.Database(dbConfig.connection.filename,
				sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
			)
		} catch (err) {
			console.log(err);
		}
	}
}

export async function runMigrations() {
	// Migrate files
	try {
		knex.migrate.latest()
	} catch (err) {
		console.log(err);
	}

}

// Retrieves columns from a table
export async function getColumns(table) {
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
export async function getSchema() {
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
export async function buildSchema() {
	const schema = await getSchema()
	if (schema && Object.keys(schema).length !== 0) {
		fs.writeFile(path.resolve('src/database/schema.json'), JSON.stringify(schema), function (err) {
			if (err) throw err;
			console.log('Schema built successfully');
		});
	}
}