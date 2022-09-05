const fs = require("fs");
const path = require("path")
const electron_env = process.env.ENVIRONMENT

const Schema = {
    collectColumns: async function (knex, table) {
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
    collectTables: async function (knex) {
        // Retrieves tables and table columns
        var schema = {}
        var tables = await knex.raw(`SELECT * FROM sqlite_master where type='table'`)
        if (tables && tables.length !== 0) {
            for (let table of tables) {
                if (['sqlite_sequence', 'migrations_lock', 'migrations'].includes(table.name)) {
                    continue
                }
                schema[table.name] = await this.collectColumns(knex, table)
            }
        }
        return schema
    },
    build: async function (env = electron_env || 'development') {
        // Writes schema.json file
        const config = require('../../knexfile')[env];
        const knex = require('knex')(config)
        const schema = await this.collectTables(knex)
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

module.exports = Schema 