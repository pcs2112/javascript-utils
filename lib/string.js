'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasCapital = exports.isMinLength = exports.hasSpecialChar = exports.encodeHtmlEntity = exports.decodeHtmlEntity = exports.convertToSlug = exports.hasNumber = exports.ucwords = exports.replaceArray = exports.rtrim = exports.ltrim = exports.trim = exports.ucfirst = undefined;

var _number = require('./number');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

/**
 * Checks to see if string has at least n amount of numbers
 * @param {String} string
 * @param {Integer} number
 * @returns {boolean}
 */
var hasNumber = exports.hasNumber = function hasNumber(string, number) {
  var count = 0;
  [].concat(_toConsumableArray(string)).forEach(function (char) {
    if ((0, _number.isNumber)(char)) {
      count++;
    }
  });
  return count >= number;
};

/**
 * Converts String to slug
 * @param {String} string
 *
 * @returns slug
 */

var convertToSlug = exports.convertToSlug = function convertToSlug(value) {
  return value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};

var decodeHtmlEntity = exports.decodeHtmlEntity = function decodeHtmlEntity(str) {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

var encodeHtmlEntity = exports.encodeHtmlEntity = function encodeHtmlEntity(str) {
  var buf = [];
  for (var i = str.length - 1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
};

/**
 * Checks to see if string has at least n amount of numbers
 * @param {String} string
 * @param {Integer} number
 * @returns boolean
 */

var hasSpecialChar = exports.hasSpecialChar = function hasSpecialChar(string, number) {
  var count = 0;
  var specialCharacters = [].concat(_toConsumableArray('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'));
  specialCharacters.forEach(function (symbol) {
    if (string.includes(symbol)) {
      count++;
    }
  });
  return count >= number;
};

/**
 * Checks to see if strings length is at least n
 * @param {String} string
 * @param {String} string
 * @returns boolean
 */

var isMinLength = exports.isMinLength = function isMinLength(string, number) {
  return string.length >= number;
};

/**
 * Checks to see if string has a Capital letter in it
 * @param {String} string
 * @returns boolean
 */

var hasCapital = exports.hasCapital = function hasCapital(string) {
  return string.toLowerCase() !== string;
};