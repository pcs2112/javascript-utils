'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReduxObjectPagination = exports.getReduxObjectArray = exports.getReduxObject = exports.createAction = exports.createReducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxObject = require('redux-object');

var _reduxObject2 = _interopRequireDefault(_reduxObject);

var _pagination = require('./pagination');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Function used to create a reducer function.
 *
 * @param {Object} initialState - Reducer's initial state
 * @param {Object} handlers - Handling function indexed by action type name
 * @returns {Function}
 */
var createReducer = exports.createReducer = function createReducer(initialState, handlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

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
var createAction = exports.createAction = function createAction(type) {
  for (var _len = arguments.length, argNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argNames[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var action = Array.isArray(type) ? { types: [].concat(_toConsumableArray(type)) } : { type: type };
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
var getReduxObject = exports.getReduxObject = function getReduxObject(data, key) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!data || !data.loaded || !data[key]) {
    return null;
  }

  var keys = Object.keys(data[key]);
  return (0, _reduxObject2.default)(data, key, keys[index]);
};

/**
 * Converts a JSON API object to an array of objects using redux-object.
 *
 * @param {Object} data
 * @param {String} key
 * @param {String|Boolean} meta
 * @returns {Array}
 */
var getReduxObjectArray = exports.getReduxObjectArray = function getReduxObjectArray(data, key) {
  var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!data || !data[key]) {
    return [];
  }

  var normalizedMeta = void 0;
  if (typeof meta === 'boolean') {
    if (meta) {
      normalizedMeta = Object.keys(data.meta)[0]; // eslint-disable-line
    }
  } else if (meta) {
    normalizedMeta = meta;
  }

  return (0, _reduxObject2.default)(data, key, normalizedMeta ? data.meta[normalizedMeta].data.map(function (item) {
    return item.id;
  }) : null);
};

/**
 * Returns the JSON API pagination info.
 * @param {Object} data
 * @returns {Object|null}
 */
var getReduxObjectPagination = exports.getReduxObjectPagination = function getReduxObjectPagination(data) {
  if (!data || !data.meta) {
    return null;
  }

  var pageKey = Object.keys(data.meta)[0];
  if (!data.meta[pageKey].links) {
    return null;
  }

  var linksMeta = _extends({}, data.meta[pageKey].links);

  linksMeta.totalPages = (0, _pagination.getTotalPagesFromLimit)(linksMeta.limit, linksMeta.size);
  linksMeta.currentPage = (0, _pagination.getCurrentPageFromOffset)(linksMeta.offset, linksMeta.size);

  return linksMeta;
};