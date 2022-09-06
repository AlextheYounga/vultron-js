const ArrayHelpers = {
    unique: function (array) {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        return array.filter(onlyUnique);
    },

    arrayRemove: function (array, listToRemove) {
        return array.filter(function (ele) {
            return !listToRemove.includes(ele)
        })
    },
    
    containsNoneFrom: function (array1, array2) {
        // Returns true if no needles are in haystack array
        for (let item of array2) {
            if (array1.includes(item)) {
                return false
            }
        }
        return true
    },
    
    compareArray: function (array1, array2) {
        if (array1 === array2) return true;
        if (array1 == null || array2 == null) return false;
        if (array1.length !== array2.length) return false;
    
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.
    
        for (var i = 0; i < array1.length; ++i) {
            if (array1[i] !== array2[i]) return false;
        }
        return true;
    }
}

module.exports = ArrayHelpers