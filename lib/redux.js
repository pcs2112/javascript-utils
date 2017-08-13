"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

    if (handlers.hasOwnProperty(action.type)) {
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