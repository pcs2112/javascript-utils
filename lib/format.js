'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullName = exports.formatCreditCardNumber = exports.truncateText = exports.textToHtml = exports.linkify = exports.formatPhoneNumber = exports.formatSecondsToTime = exports.formatBytes = exports.formatAddress = exports.formatCurrency = exports.formatNumber = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('./utils');

/**
 * Formats the specified number.
 * @param {Number} num
 * @returns {String}
 */
var formatNumber = exports.formatNumber = function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

/**
 * Formats the specified number to currency.
 *
 * @param {Number} num
 * @returns {String}
 */
var formatCurrency = exports.formatCurrency = function formatCurrency(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

/**
 * Returns the location from and address.
 *
 * @param {Object} address
 * @returns {String}
 */
var formatAddress = exports.formatAddress = function formatAddress(address) {
  if ((typeof address === 'undefined' ? 'undefined' : _typeof(address)) !== 'object') {
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
var formatBytes = exports.formatBytes = function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (bytes === 0) {
    return '0 Bytes';
  }

  var k = 1000;
  var dm = decimals + 1 || 3;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Converts the specified seconds to a time format (hh:mm:ss).
 *
 * @param {Number} originalSeconds
 * @returns {String}
 */
var formatSecondsToTime = exports.formatSecondsToTime = function formatSecondsToTime(originalSeconds) {
  var seconds = originalSeconds;
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  var time = '';

  if (hours !== 0) {
    time = hours + ':';
  }

  if (minutes !== 0 || time !== '') {
    minutes = minutes < 10 && time !== '' ? '0' + minutes : String(minutes);
    time += minutes + ':';
  }

  if (time === '') {
    var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    time = '0:' + formattedSeconds;
  } else {
    time += seconds < 10 ? '0' + seconds : String(seconds);
  }

  return time;
};

/**
 * Formats a phone number value.
 * @param {String} value
 * @returns {String}
 */
var formatPhoneNumber = exports.formatPhoneNumber = function formatPhoneNumber(value) {
  var numbers = value.replace(/\D/g, '');
  var char = { 0: '(', 3: ') ', 6: ' - ' };

  var formattedValue = '';
  for (var i = 0; i < numbers.length; i++) {
    formattedValue += (char[i] || '') + numbers[i];
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
var linkify = exports.linkify = function linkify(str) {
  // http://, https://, ftp://
  var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim;

  // www. sans http:// or https://
  var pseudoUrlPattern = /(^|[^/])(www\.[\S]+(\b|$))/gim;

  // Email addresses
  var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

  return str.replace(urlPattern, '<a href="$&">$&</a>').replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>').replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
};

/**
 * Converts the specified string to html.
 *
 * @param {String} str
 * @returns {String}
 */
var textToHtml = exports.textToHtml = function textToHtml(str) {
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
var truncateText = exports.truncateText = function truncateText(str) {
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
var formatCreditCardNumber = exports.formatCreditCardNumber = function formatCreditCardNumber(creditCardNumber) {
  var lastFour = (' ' + creditCardNumber).trim().slice(-4);
  if (lastFour.length !== 4) {
    return '';
  }

  return 'xxxx-xxxx-xxxx-' + lastFour;
};

/**
 * Returns a person's full name base on the
 * firstName and lastName arguments.
 *
 * @param {String} firstName
 * @param {String} lastName
 * @returns {String}
 */
var getFullName = exports.getFullName = function getFullName(firstName, lastName) {
  var fullName = firstName;
  if (!(0, _utils.isEmpty)(lastName)) {
    fullName += ' ' + lastName;
  }

  return fullName;
};