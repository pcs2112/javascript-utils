"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
        return _objectSpread({}, state, initialState);

      default:
        return state;
    }
  };
};

var _default = itemListReducerFor;
exports.default = _default;