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

/**
 * Reformats object key string from database friendly stirng into user-friendly form field title.
 * @return   {String}        Reformatted string.
 */
String.prototype.formatFieldName = function () {
    // Reformats data keys to remove underscores and correct casing.
    if (this) {
        let separators = ['_', '-']
        for (let sep of separators) {
            if (this.includes(sep)) {
                let words = this.split(sep)
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
}

String.prototype.caseVariator = function () {
    return [
        this,
        this.toUpperCase(),
        this.toLowerCase(),
        this.toTitleCase(),
    ]
}

String.prototype.removeWhiteSpace = function () {
    if (!this) return null
    return this.replace(/\s+/g, ' ').trim()
}

