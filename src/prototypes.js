// Helper Prototypes

import {
	format
} from 'light-date'


/**
 * Reformats string to title case.
 * @return   {String}        Reformatted string.
 */
String.prototype.toTitleCase = function () {
	// Transforms string to title case
	return this.replace(/\w\S*/g, function (str) {
		return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
	})
}

/**
 * Transforms string into formatted date.
 * @return   {String}        Reformatted string.
 */
String.prototype.formattedDate = function () {
	if ((this !== null) && (this !== '') && (typeof this !== 'undefined')) {
		try {
			let date = new Date(this)
			return format(date, `{yyyy}-{MM}-{dd}`)
		} catch (RangeError) {
			console.log(this + ' ' + 'Invalid date')
			return null
		}
	}
	return null
}

/**
 * Transforms number into formatted string.
 * @return   {String}        Reformatted string.
 */
Number.prototype.formatNumber = function () {
	return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

/**
 * Formats phone number
 * @return {String} Cleaned, formatted phone number
 */
String.prototype.formatPhoneNumber = function () {
	var cleaned = ("" + this).replace(/\D/g, "")
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		return "(" + match[1] + ") " + match[2] + "-" + match[3]
	}
	return null
}

Number.prototype.formatCurrency = function () {
	var formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		//These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	})
	return formatter.format(this)
}

Array.prototype.arrayRemove = function (listToRemove) {
	return this.filter(function (ele) {
		return !listToRemove.includes(ele)
	})
}

/**
 * Reformats object key string from database friendly stirng into user-friendly form field title.
 * @return   {String}        Reformatted string.
 */
String.prototype.formatFieldName = function () {
	// Reformats data keys to remove underscores and correct casing.
	let separators = ['_', '-']
	for (let i in separators) {
		if (this.includes(separators[i])) {
			let words = this.split(separators[i])
			let newfield = ""

			for (let i = 0; i < words.length; i++) {
				newfield +=
					i != words.length ?
					words[i].toTitleCase() + " " :
					words[i].toTitleCase()
			}
			return newfield
		}
	}
	let field = this.charAt(0).toUpperCase() + this.slice(1)
	return field
}

String.prototype.findRowInObject = function (obj, key) {
	// Finds row in object that contains a particular string.
	for (let i in obj) {
		if (obj[i][key] == this) {
			return obj[i]
		}
	}
	return false
}

Object.prototype.except = function (keys) {
	// Removes specific keys
	var target = {};
	for (var i in this) {
		if (keys.indexOf(i) >= 0) continue;
		if (!Object.prototype.hasOwnProperty.call(this, i)) continue;
		target[i] = this[i];
	}
	return target;
}

Object.prototype.keyThatContains = function (contains) {
	if (typeof this != 'undefined' && typeof this == 'object') {
		for (let key of Object.keys(this)) {
			if (typeof contains == 'object') {
				for (let word of contains) {
					if (key.includes(word)) {
						return this[key]
					}
				}
			}
			if (key.includes(contains)) {
				return this[key]
			}
		}
	}


}