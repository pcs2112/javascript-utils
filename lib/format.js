"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullName = exports.formatCreditCardNumber = exports.truncateText = exports.textToHtml = exports.linkify = exports.formatPhoneNumber = exports.formatSecondsToTime = exports.formatBytes = exports.formatAddress = exports.formatCurrency = exports.formatNumber = exports.toFixed = void 0;

var _utils = require("./utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Formats a number using fixed-point notation.
 *
 * @param {Number} value
 * @param {Number} precision
 * @returns {String}
 */
var toFixed = function toFixed(value, precision) {
  var k = Math.pow(10, precision);
  return "".concat(Math.round(value * k) / k);
};
/**
 * Format a number with grouped thousands and decimal units.
 *
 * @param {Number} number The number being formatted.
 * @param {Number} decimals Sets the number of decimal points.
 * @param {String} decPoint Sets the separator for the decimal point.
 * @param {String} thousandsSep Sets the thousands separator.
 * @returns {String}
 */


exports.toFixed = toFixed;

var formatNumber = function formatNumber(number, decimals) {
  var decPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  var thousandsSep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
  var normalizedNumber = "".concat(number).replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+normalizedNumber) ? 0 : +normalizedNumber;
  var precision = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  var s = ''; // Fix for IE parseFloat(0.55).toFixed(0) = 0;

  s = (precision ? toFixed(n, precision) : "".concat(Math.round(n))).split('.');

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousandsSep);
  }

  if ((s[1] || '').length < precision) {
    s[1] = s[1] || '';
    s[1] += new Array(precision - s[1].length + 1).join('0');
  }

  return s.join(decPoint);
};
/**
 * Formats the specified number to currency.
 *
 * @param {Number} num
 * @returns {String}
 */


exports.formatNumber = formatNumber;

var formatCurrency = function formatCurrency(num) {
  return "$".concat(formatNumber(num, 2));
};
/**
 * Returns the location from and address.
 *
 * @param {Object} address
 * @returns {String}
 */


exports.formatCurrency = formatCurrency;

var formatAddress = function formatAddress(address) {
  if (_typeof(address) !== 'object') {
    return '';
  }

  var addressParts = [];

  if (address.addressLine1) {
    addressParts.push(address.addressLine1);
  }

  if (address.addressLine2) {
    addressParts.push(address.addressLine2);
  }

  if (address.city) {
    addressParts.push(address.city);
  }

  if (address.region) {
    addressParts.push(address.region);
  }

  if (address.postalCode) {
    addressParts.push(address.postalCode);
  }

  return addressParts.join(', ');
};
/**
 * Converts a file size in bytes to a readable human format.
 *
 * @param {Number} bytes
 * @param {Number} decimals
 * @returns {String}
 */


exports.formatAddress = formatAddress;

var formatBytes = function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (bytes === 0) {
    return '0 Bytes';
  }

  var k = 1000;
  var dm = decimals + 1 || 3;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), " ").concat(sizes[i]);
};
/**
 * Converts the specified seconds to a time format (hh:mm:ss).
 *
 * @param {Number} originalSeconds
 * @returns {String}
 */


exports.formatBytes = formatBytes;

var formatSecondsToTime = function formatSecondsToTime(originalSeconds) {
  var seconds = originalSeconds;
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  var time = '';

  if (hours !== 0) {
    time = "".concat(hours, ":");
  }

  if (minutes !== 0 || time !== '') {
    minutes = minutes < 10 && time !== '' ? "0".concat(minutes) : String(minutes);
    time += "".concat(minutes, ":");
  }

  if (time === '') {
    var formattedSeconds = seconds < 10 ? "0".concat(seconds) : seconds;
    time = "0:".concat(formattedSeconds);
  } else {
    time += seconds < 10 ? "0".concat(seconds) : String(seconds);
  }

  return time;
};
/**
 * Formats a phone number value.
 * @param {String} value
 * @returns {String}
 */


exports.formatSecondsToTime = formatSecondsToTime;

var formatPhoneNumber = function formatPhoneNumber(value) {
  var numbers = value.replace(/\D/g, '');
  var _char = {
    0: '(',
    3: ') ',
    6: ' - '
  };
  var formattedValue = '';

  for (var i = 0; i < numbers.length; i++) {
    formattedValue += (_char[i] || '') + numbers[i];
  }

  return formattedValue;
};
/**
 * Converts to anchor tags urls found in the
 * specified string.
 *
 * @param {String} str
 * @returns {String}
 */


exports.formatPhoneNumber = formatPhoneNumber;

var linkify = function linkify(str) {
  // http://, https://, ftp://
  var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim; // www. sans http:// or https://

  var pseudoUrlPattern = /(^|[^/])(www\.[\S]+(\b|$))/gim; // Email addresses

  var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
  return str.replace(urlPattern, '<a href="$&">$&</a>').replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>').replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
};
/**
 * Converts the specified string to html.
 *
 * @param {String} str
 * @returns {String}
 */


exports.linkify = linkify;

var textToHtml = function textToHtml(str) {
  return !(0, _utils.isEmpty)(str) ? linkify(str.replace(/(?:\r\n|\r|\n)/g, '<br />')) : '';
};
/**
 * Truncates a string and appends an ellipsis at the end of the string.
 *
 * @param {String} str
 * @param {Number} limit
 * @param {String} ellipsis
 * @returns {String}
 */


exports.textToHtml = textToHtml;

var truncateText = function truncateText(str) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';
  return str.length > limit ? str.substring(0, limit) + ellipsis : str;
};
/**
 * Formats a credit card number to only show the last
 * four digits.
 *
 * @param {String|Number} creditCardNumber
 * @returns {String}
 */


exports.truncateText = truncateText;

var formatCreditCardNumber = function formatCreditCardNumber(creditCardNumber) {
  var lastFour = " ".concat(creditCardNumber).trim().slice(-4);

  if (lastFour.length !== 4) {
    return '';
  }

  return "xxxx-xxxx-xxxx-".concat(lastFour);
};
/**
 * Returns a person's full name base on the
 * firstName and lastName arguments.
 *
 * @param {String} firstName
 * @param {String} lastName
 * @returns {String}
 */


exports.formatCreditCardNumber = formatCreditCardNumber;

var getFullName = function getFullName(firstName, lastName) {
  var fullName = firstName;

  if (!(0, _utils.isEmpty)(lastName)) {
    fullName += " ".concat(lastName);
  }

  return fullName;
};

exports.getFullName = getFullName;