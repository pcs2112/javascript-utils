"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceObjByValue = exports.findObjIndexByValue = exports.untreeify = exports.treeify = exports.arrayUnique = void 0;

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Returns an array out duplicate values.
 *
 * @param {Array} arrArg
 */
var arrayUnique = function arrayUnique(arrArg) {
  return arrArg.filter(function (elem, pos, arr) {
    return arr.indexOf(elem) === pos;
  });
};
/**
 * Converts a flat list into a hierarchy tree.
 *
 * @param {Array} list
 * @param {String} keyAttr
 * @param {String} parentAttr
 * @param {String} childrenAttr
 * @returns {Array}
 */


exports.arrayUnique = arrayUnique;

var treeify = function treeify(list) {
  var keyAttr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var parentAttr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'parent';
  var childrenAttr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
  var treeList = [];
  var newList = [];
  var lookup = {};
  list.forEach(function (obj) {
    var newObj = (0, _cloneDeep.default)(obj);
    lookup[newObj[keyAttr]] = newObj;
    newObj[childrenAttr] = [];
    newList.push(newObj);
  });
  newList.forEach(function (obj) {
    var parentId = obj[parentAttr];

    if (!(0, _utils.isEmpty)(parentId) && parentId > 0) {
      lookup[parentId][childrenAttr].push(obj);
    } else {
      treeList.push(obj);
    }
  });
  return treeList;
};
/**
 * Flattens a tree.
 * @param {Array} list
 * @returns {Array}
 */


exports.treeify = treeify;

var untreeify = function untreeify(list) {
  var result = [];
  list.forEach(function (obj) {
    result.push(obj.children);

    if (Array.isArray(obj.children)) {
      result = result.concat(untreeify(obj.children));
    }
  });
  return result;
};
/**
 * Finds the index of an object in a list. -1 is
 * returned if the object is not found.
 *
 * @param {Array<Object>} list
 * @param {String|Number} value
 * @param {String} key
 * @returns {Number}
 */


exports.untreeify = untreeify;

var findObjIndexByValue = function findObjIndexByValue(list, value) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  return list.findIndex(function (item) {
    return item[key] === value;
  });
};
/**
 * Replaces an object in a list and returns the new list.
 *
 * @param {Array<Object>} list
 * @param {Object} item
 * @param {String|Number} value
 * @param {String} key
 * @returns {undefined|Array<Object>}
 */


exports.findObjIndexByValue = findObjIndexByValue;

var replaceObjByValue = function replaceObjByValue(list, item, value) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'id';
  var index = findObjIndexByValue(list, value, key);

  if (index < 0) {
    return _toConsumableArray(list);
  }

  var newList = _toConsumableArray(list);

  newList[index] = item;
  return newList;
};

exports.replaceObjByValue = replaceObjByValue;