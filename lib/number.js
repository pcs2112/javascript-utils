'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomNumber = exports.calculateEarnings = exports.calculateCubicFeet = exports.calculateSquareFeet = exports.almostEqual = exports.normalizeInputToFloat = exports.normalizeInputToInteger = exports.isNumber = undefined;

var _utils = require('./utils');

var DBL_EPSILON = 2.2204460492503131e-16;

/**
 * Checks the specified value is a number.
 *
 * @param {String|Number} value
 * @returns {Boolean}
 */
var isNumber = exports.isNumber = function isNumber(value) {
  return !(0, _utils.isEmpty)(value) && !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Converts numerical string to a Number.
 *
 * @param {String|Number} value
 * @returns {Number}
 */
var normalizeInputToInteger = exports.normalizeInputToInteger = function normalizeInputToInteger(value) {
  return isNumber(value) ? parseInt(value, 10) : value;
};

/**
 * Converts numerical string to a Number.
 *
 * @param {String|Number} value
 * @returns {Number}
 */
var normalizeInputToFloat = exports.normalizeInputToFloat = function normalizeInputToFloat(value) {
  return isNumber(value) ? parseFloat(value) : value;
};

/**
 * Compares two floats for equality.
 * @param {Number} a
 * @param {Number} b
 * @param {Number|undefined} absoluteError
 * @param {Number|undefined} relativeError
 * @returns {boolean}
 */
var almostEqual = exports.almostEqual = function almostEqual(a, b) {
  var absoluteError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var relativeError = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var d = Math.abs(a - b);
  var normalizedAbsoluteError = absoluteError;
  var normalizedRelativeError = relativeError;

  if (normalizedAbsoluteError === undefined) {
    normalizedAbsoluteError = DBL_EPSILON;
  }

  if (relativeError === undefined) {
    normalizedRelativeError = normalizedAbsoluteError;
  }

  if (d <= normalizedAbsoluteError) {
    return true;
  }

  if (d <= normalizedRelativeError * Math.min(Math.abs(a), Math.abs(b))) {
    return true;
  }

  return a === b;
};

/**
 * Returns the calculated square feet based on the specified length and width.
 *
 * @param {Number} length
 * @param {Number} width
 * @returns {Number}
 */
var calculateSquareFeet = exports.calculateSquareFeet = function calculateSquareFeet(length, width) {
  return isNumber(length) && isNumber(width) ? length * width : 0;
};

/**
 * Returns the calculated cubic feet based on the specified length, width and height.
 *
 * @param {Number} length
 * @param {Number} width
 * @param {Number} height
 * @returns {Number}
 */
var calculateCubicFeet = exports.calculateCubicFeet = function calculateCubicFeet(length, width, height) {
  return isNumber(length) && isNumber(width) && isNumber(height) ? length * width * height : 0;
};

/**
 * Calculates a listing's cost.
 *
 * @param {Number} sqrFeetCost
 * @param {Number} length
 * @param {Number} width
 */
var calculateEarnings = exports.calculateEarnings = function calculateEarnings(sqrFeetCost, length, width) {
  return calculateSquareFeet(length, width) * sqrFeetCost;
};

/**
 * Returns a random number of the specified digit length.
 * @param {Number} length
 * @returns {Number}
 */
var getRandomNumber = exports.getRandomNumber = function getRandomNumber(length) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}; // eslint-disable-line