'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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