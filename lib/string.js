'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shorten = exports.isMaxLength = exports.isMinLength = exports.hasSpecialChars = exports.encodeHtmlEntity = exports.decodeHtmlEntities = exports.convertToSlug = exports.hasNumbers = exports.ucwords = exports.replaceArray = exports.rtrim = exports.ltrim = exports.trim = exports.ucfirst = undefined;

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
 * @param {String} value
 * @param {Integer} number
 * @returns {boolean}
 */
var hasNumbers = exports.hasNumbers = function hasNumbers(value, number) {
  var count = 0;
  [].concat(_toConsumableArray(value)).forEach(function (char) {
    if ((0, _number.isNumber)(char)) {
      count++;
    }
  });
  return count >= number;
};

/**
 * Converts the specifed value to a slug.
 *
 * @param {String} value
 * @returns {String}
 */
var convertToSlug = exports.convertToSlug = function convertToSlug(value) {
  return value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};

/**
 * Decodes all the html entities in the specified value.
 *
 * @param {String} value
 * @returns {String}
 */
var decodeHtmlEntities = exports.decodeHtmlEntities = function decodeHtmlEntities(value) {
  return value.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

/**
 * Encodes all the html entities in the specified value.
 *
 * @param {String} value
 * @returns {String}
 */
var encodeHtmlEntity = exports.encodeHtmlEntity = function encodeHtmlEntity(value) {
  var buf = [];
  for (var i = value.length - 1; i >= 0; i--) {
    buf.unshift(['&#', value[i].charCodeAt(0), ';'].join(''));
  }

  return buf.join('');
};

/**
 * Checks to see if value has at least n amount of numbers.
 *
 * @param {String} value
 * @param {Number} number
 * @returns boolean
 */
var hasSpecialChars = exports.hasSpecialChars = function hasSpecialChars(value, number) {
  var count = 0;
  var specialCharacters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  var stringArray = [].concat(_toConsumableArray(value));
  stringArray.forEach(function (char) {
    if (specialCharacters.includes(char)) {
      count++;
    }
  });
  return count >= number;
};

/**
 * Checks the specified value's length is greater or equal than
 * the specified length.
 *
 * @param {String} value
 * @param {Number} minLength
 * @returns {Boolean}
 */
var isMinLength = exports.isMinLength = function isMinLength(value, minLength) {
  return value.length >= minLength;
};

/**
 * Checks the specified value's is less or equal than
 * the specified length.
 *
 * @param {String} value
 * @param {Number} maxLength
 * @returns {Boolean}
 */
var isMaxLength = exports.isMaxLength = function isMaxLength(value, maxLength) {
  return value.length <= maxLength;
};

/**
 * Shorten a string to less than maxLen characters without truncating words.
 *
 * @param {String} value
 * @param {Number} maxLength
 * @param {String} ellipsis
 * @param {String} separator
 * @returns {*}
 */
var shorten = exports.shorten = function shorten(value, maxLength) {
  var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';
  var separator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ' ';

  if (value.length <= maxLength) {
    return value;
  }

  return value.substr(0, value.lastIndexOf(separator, maxLength)) + ellipsis;
};