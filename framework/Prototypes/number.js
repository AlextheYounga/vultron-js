

/**
 * Transforms number into formatted string.
 * @return   {String}        Reformatted string.
 */
Number.prototype.formatNumber = function () {
	return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
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
