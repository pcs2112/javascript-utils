'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

/**
 * Converts a flat list into a hierarchy tree.
 *
 * @param {Array} list
 * @param {String} keyAttr
 * @param {String} parentAttr
 * @param {String} childrenAttr
 * @returns {Array}
 */
var treeify = exports.treeify = function treeify(list) {
  var keyAttr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var parentAttr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'parent';
  var childrenAttr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';

  var treeList = [];
  var lookup = {};

  list.forEach(function (obj) {
    lookup[obj[keyAttr]] = obj;
    obj[childrenAttr] = []; // eslint-disable-line
  });

  list.forEach(function (obj) {
    if (obj[parentAttr] !== null) {
      lookup[obj[parentAttr]][childrenAttr].push(obj);
    } else {
      treeList.push(obj);
    }
  });

  return treeList;
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
var findObjIndexByValue = exports.findObjIndexByValue = function findObjIndexByValue(list, value) {
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
var replaceObjByValue = exports.replaceObjByValue = function replaceObjByValue(list, item, value) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'id';

  var index = findObjIndexByValue(list, value, key);
  if (index < 0) {
    return [].concat(_toConsumableArray(list));
  }

  var newList = [].concat(_toConsumableArray(list));
  newList[index] = item;

  return newList;
};