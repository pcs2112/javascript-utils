"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offsetPoint = exports.getRandomNumber = exports.calculateEarnings = exports.calculateCubicFeet = exports.calculateSquareFeet = exports.almostEqual = exports.normalizeInputToFloat = exports.normalizeInputToInteger = exports.isNumber = void 0;

var _utils = require("./utils");

var DBL_EPSILON = 2.2204460492503131e-16;
/**
 * Checks the specified value is a number.
 *
 * @param {String|Number} value
 * @returns {Boolean}
 */

var isNumber = function isNumber(value) {
  return !(0, _utils.isEmpty)(value) && !isNaN(parseFloat(value)) && isFinite(value);
};
/**
 * Converts numerical string to a Number.
 *
 * @param {String|Number} value
 * @returns {Number}
 */


exports.isNumber = isNumber;

var normalizeInputToInteger = function normalizeInputToInteger(value) {
  return isNumber(value) ? parseInt(value, 10) : value;
};
/**
 * Converts numerical string to a Number.
 *
 * @param {String|Number} value
 * @returns {Number}
 */


exports.normalizeInputToInteger = normalizeInputToInteger;

var normalizeInputToFloat = function normalizeInputToFloat(value) {
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


exports.normalizeInputToFloat = normalizeInputToFloat;

var almostEqual = function almostEqual(a, b) {
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


exports.almostEqual = almostEqual;

var calculateSquareFeet = function calculateSquareFeet(length, width) {
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


exports.calculateSquareFeet = calculateSquareFeet;

var calculateCubicFeet = function calculateCubicFeet(length, width, height) {
  return isNumber(length) && isNumber(width) && isNumber(height) ? length * width * height : 0;
};
/**
 * Calculates a listing's cost.
 *
 * @param {Number} sqrFeetCost
 * @param {Number} length
 * @param {Number} width
 */


exports.calculateCubicFeet = calculateCubicFeet;

var calculateEarnings = function calculateEarnings(sqrFeetCost, length, width) {
  return calculateSquareFeet(length, width) * sqrFeetCost;
};
/**
 * Returns a random number of the specified digit length.
 * @param {Number} length
 * @returns {Number}
 */


exports.calculateEarnings = calculateEarnings;

var getRandomNumber = function getRandomNumber(length) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}; // eslint-disable-line

/**
 * Returns the coordinates of a random point near the specified coordinates and distance.
 * @source https://stackoverflow.com/questions/2187657/calculate-second-point-knowing-the-starting-point-and-distance
 *
 * @param {Number} lat
 * @param {Number} lng
 * @param {Number} r
 * @returns {{lat: Number, lng: Number}}
 */


exports.getRandomNumber = getRandomNumber;

var offsetPoint = function offsetPoint(lat, lng) {
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var theta = 135;
  var dx = r * Math.cos(theta);
  var dy = r * Math.sin(theta);
  var deltaLat = dy / 110540;
  var deltaLng = dx / (111320 * Math.cos(lat));
  return {
    lat: lat + deltaLat,
    lng: lng + deltaLng
  };
};

exports.offsetPoint = offsetPoint;