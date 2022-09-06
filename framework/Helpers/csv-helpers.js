const Papa = require('papaparse')
const fs = require("fs")

const Csv = {
	parse: function(file) {
		let readFile = fs.readFileSync(file.path, "utf8")
		return Papa.parse(readFile, {
			header: true,
			encoding: "utf-8",
			complete: function (results) {
				return results
			}
		})
	},
	parseAsync: async function(file) {
		let readFile = fs.readFileSync(file.path, "utf8")
		return Papa.parse(readFile, {
			header: true,
			encoding: "utf-8",
			complete: function (results) {
				return results
			}
		})
	},
}

module.exports = Csv