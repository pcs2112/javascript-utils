"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = exports.objectHasOwnProperty = exports.isPromise = exports.classNames = exports.isUndefined = exports.isEmpty = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks the specified value is empty.
 *
 * @param {String|undefined|null} value
 * @returns {Boolean}
 */
var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};
/**
 * Checks the specified value is undefined.
 *
 * @param {String|Number|Object|undefined|null} value
 * @returns {Boolean}
 */


exports.isEmpty = isEmpty;

var isUndefined = function isUndefined(value) {
  return typeof value === 'undefined' || value === null;
};
/**
 * Joins an array of css class names and returns the concatenated class name.
 *
 * @param {Array} names
 * @returns {String}
 */


exports.isUndefined = isUndefined;

var classNames = function classNames(names) {
  return names.filter(function (className) {
    return !!className;
  }).join(' ');
};
/**
 * Tells us if input looks like promise or not.
 *
 * @param {Object} obj
 * @returns {Boolean}
 */


exports.classNames = classNames;

var isPromise = function isPromise(obj) {
  return _typeof(obj) === 'object' && obj && obj.then instanceof Function;
};
/**
 * Checks the obj has the specified property.
 *
 * @param {Object} obj
 * @param {String} prop
 * @returns {Boolean}
 */


exports.isPromise = isPromise;

var objectHasOwnProperty = function objectHasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
/**
 * Delays execution of code by the specified amount of microseconds.
 *
 * @param {Number} ms
 * @returns {Promise}
 */


exports.objectHasOwnProperty = objectHasOwnProperty;

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

exports.sleep = sleep;