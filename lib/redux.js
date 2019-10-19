"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReduxObjectPagination = exports.getReduxObjectArray = exports.getReduxObject = exports.createAction = exports.createReducer = void 0;

var _reduxObject = _interopRequireDefault(require("redux-object"));

var _pagination = require("./pagination");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Function used to create a reducer function.
 *
 * @param {Object} initialState - Reducer's initial state
 * @param {Object} handlers - Handling function indexed by action type name
 * @returns {Function}
 */
var createReducer = function createReducer(initialState, handlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
};
/**
 * Creates a redux action function.
 *
 * @param {String|Array} type - 4Action types
 * @param {Array} argNames - Argument names used by the action
 */


exports.createReducer = createReducer;

var createAction = function createAction(type) {
  for (var _len = arguments.length, argNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argNames[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var action = Array.isArray(type) ? {
      types: _toConsumableArray(type)
    } : {
      type: type
    };
    argNames.forEach(function (arg, index) {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};
/**
 * Converts a JSON API object to an object using redux-object.
 *
 * @param {Object} data
 * @param {String} key
 * @param {Number} index
 * @returns {Object}
 */


exports.createAction = createAction;

var getReduxObject = function getReduxObject(data, key) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!data || !data.loaded || !data[key]) {
    return null;
  }

  var keys = Object.keys(data[key]);
  return (0, _reduxObject["default"])(data, key, keys[index]);
};
/**
 * Converts a JSON API object to an array of objects using redux-object.
 *
 * @param {Object} data
 * @param {String} key
 * @param {String|Boolean} meta
 * @returns {Array}
 */


exports.getReduxObject = getReduxObject;

var getReduxObjectArray = function getReduxObjectArray(data, key) {
  var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!data || !data[key]) {
    return [];
  }

  var normalizedMeta;

  if (typeof meta === 'boolean') {
    if (meta) {
      normalizedMeta = Object.keys(data.meta)[0]; // eslint-disable-line
    }
  } else if (meta) {
    normalizedMeta = meta;
  }

  return (0, _reduxObject["default"])(data, key, normalizedMeta ? data.meta[normalizedMeta].data.map(function (item) {
    return item.id;
  }) : null);
};
/**
 * Returns the JSON API pagination info.
 * @param {Object} data
 * @returns {Object|null}
 */


exports.getReduxObjectArray = getReduxObjectArray;

var getReduxObjectPagination = function getReduxObjectPagination(data) {
  if (!data || !data.meta) {
    return null;
  }

  var pageKey = Object.keys(data.meta)[0];

  if (!data.meta[pageKey].links) {
    return null;
  }

  var linksMeta = _objectSpread({}, data.meta[pageKey].links);

  linksMeta.totalPages = (0, _pagination.getTotalPagesFromLimit)(linksMeta.limit, linksMeta.size);
  linksMeta.currentPage = (0, _pagination.getCurrentPageFromOffset)(linksMeta.offset, linksMeta.size);
  return linksMeta;
};

exports.getReduxObjectPagination = getReduxObjectPagination;