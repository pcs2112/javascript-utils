"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.initialState = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  isFetching: false,
  fetchingError: false,
  dataLoaded: false,
  data: false
};
/**
 * Reusable factory reducer to set async fetched data in a state.
 *
 * @param {Object} actionTypes
 * @returns {Function}
 */

exports.initialState = initialState;

var itemListReducerFor = function itemListReducerFor(_ref) {
  var FETCH_BEGIN = _ref.FETCH_BEGIN,
      FETCH_SUCCESS = _ref.FETCH_SUCCESS,
      FETCH_FAIL = _ref.FETCH_FAIL,
      RESET = _ref.RESET;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case FETCH_BEGIN:
        return _objectSpread({}, state, {
          isFetching: true
        });

      case FETCH_SUCCESS:
        return _objectSpread({}, state, {
          isFetching: false,
          dataLoaded: true,
          data: action.response,
          fetchingError: initialState.fetchingError
        });

      case FETCH_FAIL:
        return _objectSpread({}, state, {
          isFetching: false,
          fetchingError: action.error
        });

      case RESET:
        return _objectSpread({}, state, {}, initialState);

      default:
        return state;
    }
  };
};

var _default = itemListReducerFor;
exports["default"] = _default;