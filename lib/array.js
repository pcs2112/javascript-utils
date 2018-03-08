"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns an array out duplicate values.
 *
 * @param {Array} arrArg
 */
var arrayUnique = exports.arrayUnique = function arrayUnique(arrArg) {
  return arrArg.filter(function (elem, pos, arr) {
    return arr.indexOf(elem) === pos;
  });
};