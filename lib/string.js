'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Converts the first letter of a string to uppercase.
 *
 * @param {String} value
 * @returns {String}
 */
var ucfirst = exports.ucfirst = function ucfirst(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Strip whitespace from the beginning and end of a string.
 *
 * @param {String} value
 * @returns {String}
 */
var trim = exports.trim = function trim(value) {
  return value.replace(/^\s+|\s+$/g, '');
};

/**
 * Strip whitespace from the beginning of a string.
 *
 * @param {String} value
 * @returns {String}
 */
var ltrim = exports.ltrim = function ltrim(value) {
  return value.replace(/^\s+/, '');
};

/**
 * Strip whitespace from the end of a string.
 *
 * @param {String} value
 * @returns {String}
 */
var rtrim = exports.rtrim = function rtrim(value) {
  return value.replace(/\s+$/, '');
};

/**
 * Replace all occurrences of the values in the search array with the replacement values
 * from the replace array.
 *
 * @param {String} value
 * @param {Array} search
 * @param {Array} replace
 * @returns {String}
 */
var replaceArray = exports.replaceArray = function replaceArray(value, search, replace) {
  var replaceString = value;
  var regex = void 0;
  for (var i = 0; i < search.length; i++) {
    regex = new RegExp(search[i], 'g');
    replaceString = replaceString.replace(regex, replace[i]);
  }

  return replaceString;
};

/**
 * Uppercase the first character of each word in a string
 * @param {String} value
 *
 * @returns {String}
 */
var ucwords = exports.ucwords = function ucwords(value) {
  var str = '' + value;
  return str.replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase();
  });
};