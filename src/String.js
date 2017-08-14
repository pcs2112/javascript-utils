/* eslint no-extend-native: 0 */
/**
 * Module used to extend the String prototype.
 */
if (!String.prototype.replaceArray) {
  /**
   * Replace all occurrences of the values in the search array with the replacement values
   * from the replace array.
   *
   * @param {Array} search
   * @param {Array} replace
   * @returns {String}
   */
  String.prototype.replaceArray = function replaceArray(search, replace) {
    let replaceString = this;
    let regex;
    for (let i = 0; i < search.length; i++) {
      regex = new RegExp(search[i], 'g');
      replaceString = replaceString.replace(regex, replace[i]);
    }

    return replaceString;
  };
}

if (!String.prototype.trim) {
  /**
   * Strip whitespace from the beginning and end of a string.
   */
  String.prototype.trim = function trim() {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

if (!String.prototype.ltrim) {
  /**
   * Strip whitespace from the beginning of a string.
   */
  String.prototype.ltrim = function ltrim() {
    return this.replace(/^\s+/, '');
  };
}

if (!String.prototype.rtrim) {
  /**
   * Strip whitespace from the end of a string.
   */
  String.prototype.rtrim = function rtrim() {
    return this.replace(/\s+$/, '');
  };
}

if (!String.prototype.ucfirst) {
  /**
   * Make a string's first character uppercase.
   */
  String.prototype.ucfirst = function ucfirst() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
}