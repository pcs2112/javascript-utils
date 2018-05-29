'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks the specified value is empty.
 *
 * @param {String|undefined|null} value
 * @returns {Boolean}
 */
var isEmpty = exports.isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

/**
 * Checks the specified value is undefined.
 *
 * @param {String|Number|Object|undefined|null} value
 * @returns {Boolean}
 */
var isUndefined = exports.isUndefined = function isUndefined(value) {
  return typeof value === 'undefined';
};

/**
 * Joins an array of css class names and returns the concatenated class name.
 *
 * @param {Array} names
 * @returns {String}
 */
var classNames = exports.classNames = function classNames(names) {
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
var isPromise = exports.isPromise = function isPromise(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj && obj.then instanceof Function;
};

/**
 * Checks the obj has the specified property.
 *
 * @param {Object} obj
 * @param {String} prop
 * @returns {Boolean}
 */
var objectHasOwnProperty = exports.objectHasOwnProperty = function objectHasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

/**
 * Delays execution of code by the specified amount of microseconds.
 *
 * @param {Number} ms
 * @returns {Promise}
 */
var sleep = exports.sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};