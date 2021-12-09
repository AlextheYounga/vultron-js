import {
	format
} from 'light-date'

const Helpers = {
	/**
	 * Determines whether element has been scrolled to the bottom of its height.
	 * Very useful in creating infinite scrolls.
	 * @return   {Bool}
	 */
	scrollIsAtBottom: function (element) {
		return element.scrollHeight - element.scrollTop === element.clientHeight
	},
	/**
	 * Reformats string to title case.
	 * @return   {String}        Reformatted string.
	 */
	toTitleCase: function (word) {
		// Transforms string to title case
		return word.replace(/\w\S*/g, function (str) {
			return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
		})
	},
	/**
	 * Transforms string into formatted date.
	 * @return   {String}        Reformatted string.
	 */
	formattedDate: function (string) {
		if ((string !== null) && (string !== '') && (typeof string !== 'undefined')) {
			try {
				let date = new Date(string)
				return format(date, `{yyyy}-{MM}-{dd}`)
			} catch (RangeError) {
				console.log(string + ' ' + 'Invalid date')
				return null
			}
		}
		return null
	},
	/**
	 * Transforms number into formatted string.
	 * @return   {String}        Reformatted string.
	 */
	formatNumber: function (number) {
		return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	},
	/**
	 * Formats phone number
	 * @return {String} Cleaned, formatted phone number
	 */
	formatPhoneNumber: function (string) {
		var cleaned = ("" + string).replace(/\D/g, "")
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
		if (match) {
			return "(" + match[1] + ") " + match[2] + "-" + match[3]
		}
		return null
	},
	formatCurrency: function (number) {
		var formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			//These options are needed to round to whole numbers if that's what you want.
			//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
			//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
		})
		return formatter.format(number)
	},
	/**
	 * Reformats object key string from database friendly stirng into user-friendly form field title.
	 * @return   {String}        Reformatted string.
	 */
	formatFieldName: function (string) {
		// Reformats data keys to remove underscores and correct casing.
		let separators = ['_', '-']
		for (let i in separators) {
			if (string.includes(separators[i])) {
				let words = string.split(separators[i])
				let newfield = ""

				for (let i = 0; i < words.length; i++) {
					newfield +=
						i != words.length ?
						this.toTitleCase(words[i]) + " " :
						this.toTitleCase(words[i])
				}
				return newfield
			}
		}
		let field = string.charAt(0).toUpperCase() + string.slice(1)
		return field
	},
	findRowInObject: function (string, obj, key) {
		// Finds row in object that contains a particular string.
		for (let i in obj) {
			if (obj[i][key] == string) {
				return obj[i]
			}
		}
		return false
	},
	except: function (obj, keys) {
		// Removes specific keys
		var target = {};
		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}
		return target;
	},
	keyThatContains: function (obj, contains) {
		if (typeof obj != 'undefined' && typeof obj == 'object') {
			for (let key of Object.keys(obj)) {
				if (typeof contains == 'object') {
					for (let word of contains) {
						if (key.includes(word)) {
							return obj[key]
						}
					}
				}
				if (key.includes(contains)) {
					return obj[key]
				}
			}
		}


	},

}

export default Helpers