const fs = require("fs");
const path = require("path")
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const electron_env = process.env.ENVIRONMENT

const Database = {
	instance: function (env = electron_env || 'development') {
		const config = require('../knexfile')[env];
		const dbPath = path.join(path.dirname(__dirname), config.connection.filename)
		const knex = require('knex')(config)

		return {
			knex: knex,
			dbPath: dbPath,
		}
	},
	bookshelf: function (env = electron_env || 'development') {
		const {
			knex
		} = this.instance(env) // Import knex with default env
		const bookshelf = require('bookshelf')(knex)

		// Import plugins
		const upsert = require('bookshelf-upsert')
		const uuid = require('bookshelf-uuid')
		var jsonColumns = require('bookshelf-json-columns');

		// Use plugins
		bookshelf.plugin(upsert)
		bookshelf.plugin(uuid)
		bookshelf.plugin(jsonColumns);

		return bookshelf
	},
	setup: async function (env = electron_env || 'development') {
		// Creating database if db does not exist.
		const config = require('../knexfile')[env];
		const dbPath = path.join(path.dirname(__dirname), config.connection.filename)

		if (fs.existsSync(dbPath) == false) {
			console.log('Creating DB...');
			try {
				new sqlite3.Database(dbPath,
					sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
				)
			} catch (err) {
				console.log(err);
			}
			this.runMigrations(env)
		}
	},
	runMigrations: async function (env = electron_env || 'development') {
		const config = require('../knexfile')[env];
		const knex = require('knex')(config)
		// Migrate files
		try {
			knex.migrate.latest()
		} catch (err) {
			console.log(err);
		}
	},
	encryptOnSave: async function (model, hashable) {
		const SALT_ROUNDS = 10
		if (Object.keys(model.attributes).some(r=> hashable.includes(r))) return 
		return new Promise(function (resolve, reject) {
			for (let attr of hashable) {
				let modelValue = model.attributes[attr]
				if (typeof modelValue != 'undefined' && modelValue) {
					bcrypt.hash(modelValue, SALT_ROUNDS, function (err, hash) {
						if (err) reject(err);
						model.set(attr, hash);
						resolve(hash); // data is created only after this occurs
					});
				}
			}
		});
	},
	getColumns: async function (knex, table) {
		// Retrieves columns from a table
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
	},
	getSchema: async function (knex) {
		// Retrieves tables and table columns
		var schema = {}
		var tables = await knex.raw(`SELECT * FROM sqlite_master where type='table'`)
		if (tables && tables.length !== 0) {
			for (let table of tables) {
				if (['sqlite_sequence', 'migrations_lock', 'migrations'].includes(table.name)) {
					continue
				}
				schema[table.name] = await this.getColumns(knex, table)
			}
		}
		return schema
	},
	buildSchema: async function (env = electron_env || 'development') {
		// Writes schema.json file
		const config = require('../knexfile')[env];
		const knex = require('knex')(config)
		const schema = await this.getSchema(knex)
		if (schema && Object.keys(schema).length !== 0) {
			fs.writeFile(
				path.join(path.dirname(__dirname), 'database', 'schema.json'),
				JSON.stringify(schema),
				function (err) {
					if (err) throw err;
					console.log('Schema built successfully');
				});
		}
	}

}

module.exports = Database