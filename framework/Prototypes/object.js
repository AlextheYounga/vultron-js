Object.prototype.getKeyByValue = function (value) {
    return Object.keys(this).find(key => this[key] === value);
}