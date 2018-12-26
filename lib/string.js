"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toCamel = exports.toUnderscore = exports.toDash = exports.shorten = exports.isMaxLength = exports.isMinLength = exports.hasSpecialChars = exports.convertToSlug = exports.hasNumbers = exports.ucwords = exports.replaceArray = exports.rtrim = exports.ltrim = exports.trim = exports.ucfirst = void 0;

var _number = require("./number");

var _utils = require("./utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Converts the first letter of a string to uppercase.
 *
 * @param {String} value
 * @returns {String}
 */
var ucfirst = function ucfirst(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
/**
 * Strip whitespace from the beginning and end of a string.
 *
 * @param {String} value
 * @returns {String}
 */


exports.ucfirst = ucfirst;

var trim = function trim(value) {
  return value.replace(/^\s+|\s+$/g, '');
};
/**
 * Strip whitespace from the beginning of a string.
 *
 * @param {String} value
 * @returns {String}
 */


exports.trim = trim;

var ltrim = function ltrim(value) {
  return value.replace(/^\s+/, '');
};
/**
 * Strip whitespace from the end of a string.
 *
 * @param {String} value
 * @returns {String}
 */


exports.ltrim = ltrim;

var rtrim = function rtrim(value) {
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


exports.rtrim = rtrim;

var replaceArray = function replaceArray(value, search, replace) {
  var replaceString = value;
  var regex;

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


exports.replaceArray = replaceArray;

var ucwords = function ucwords(value) {
  var str = "".concat(value);
  return str.replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase();
  });
};
/**
 * Checks to see if string has at least n amount of numbers
 * @param {String} value
 * @param {Integer} number
 * @returns {Boolean}
 */


exports.ucwords = ucwords;

var hasNumbers = function hasNumbers(value, number) {
  if ((0, _utils.isEmpty)(value)) {
    return false;
  }

  var count = 0;

  _toConsumableArray(value).forEach(function (char) {
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


exports.hasNumbers = hasNumbers;

var convertToSlug = function convertToSlug(value) {
  return value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};
/**
 * Checks to see if value has at least n amount of special Characters.
 *
 * @param {String} value
 * @param {Number} number
 * @returns Boolean
 */


exports.convertToSlug = convertToSlug;

var hasSpecialChars = function hasSpecialChars(value, number) {
  if ((0, _utils.isEmpty)(value)) {
    return false;
  }

  var count = 0;
  var specialCharacters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

  var stringArray = _toConsumableArray(value);

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


exports.hasSpecialChars = hasSpecialChars;

var isMinLength = function isMinLength(value, minLength) {
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


exports.isMinLength = isMinLength;

var isMaxLength = function isMaxLength(value, maxLength) {
  return value.length <= maxLength;
};
/**
 * Shorten a string to less than maxLen characters without truncating words.
 *
 * @param {String} value
 * @param {Number} maxLength
 * @param {String} ellipsis
 * @param {String} separator
 * @returns {String}
 */


exports.isMaxLength = isMaxLength;

var shorten = function shorten(value, maxLength) {
  var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';
  var separator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ' ';

  if (value.length <= maxLength) {
    return value;
  }

  return value.substr(0, value.lastIndexOf(separator, maxLength)) + ellipsis;
};
/**
 * Converts camel case string to dash separated.
 * @param {String} value
 * @returns {String}
 */


exports.shorten = shorten;

var toDash = function toDash(value) {
  return value.replace(/([A-Z])/g, function ($1) {
    return "-".concat($1.toLowerCase());
  });
};
/**
 * Converts camel case string to underscore separated.
 * @param {String} value
 * @returns {String}
 */


exports.toDash = toDash;

var toUnderscore = function toUnderscore(value) {
  return value.replace(/([A-Z])/g, function ($1) {
    return "_".concat($1.toLowerCase());
  });
};
/**
 * Converts string to camel case.
 * @param {String} value
 * @returns {String}
 */


exports.toUnderscore = toUnderscore;

var toCamel = function toCamel(value) {
  return value.replace(/(-[a-z])/g, function ($1) {
    return $1.toUpperCase().replace('-', '');
  });
};

exports.toCamel = toCamel;