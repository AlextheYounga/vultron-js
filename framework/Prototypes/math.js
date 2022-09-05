Math.sum = function (arr) {
	return arr.reduce((partialSum, a) => partialSum + a, 0);
}