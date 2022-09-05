Array.prototype.unique = function () {
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}
	return this.filter(onlyUnique);
}

Array.prototype.remove = function (listToRemove) {
	return this.filter(function (ele) {
		return !listToRemove.includes(ele)
	})
}

Array.prototype.containsNoneFrom = function (array) {
	// Returns true if no needles are in haystack array
	for (let item of array) {
		if (this.includes(item)) {
			return false
		}
	}
	return true
}

Array.prototype.compareArray = function (array) {
	if (this === array) return true;
	if (this == null || array == null) return false;
	if (this.length !== array.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.

	for (var i = 0; i < this.length; ++i) {
		if (this[i] !== array[i]) return false;
	}
	return true;
}
