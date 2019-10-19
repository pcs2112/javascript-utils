"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.initialState = void 0;

var _array = require("../../array");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  data: false
};
/**
 * Reusable factory reducer to handle CRUD operations in list items.
 *
 * @param {Object} actionTypes
 * @returns {Function}
 */

exports.initialState = initialState;

var crudListReducerFor = function crudListReducerFor(_ref) {
  var CREATE_SUCCESS = _ref.CREATE_SUCCESS,
      UPDATE_SUCCESS = _ref.UPDATE_SUCCESS,
      UPDATING_START = _ref.UPDATING_START,
      UPDATING_END = _ref.UPDATING_END;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case CREATE_SUCCESS:
        {
          var newData = state.data.slice();
          newData.push(_objectSpread({}, action.response));
          return _objectSpread({}, state, {
            data: newData
          });
        }

      case UPDATE_SUCCESS:
        return _objectSpread({}, state, {
          data: (0, _array.replaceObjByValue)(state.data, _objectSpread({}, action.response), action.id)
        });

      case UPDATING_START:
        return _objectSpread({}, state, {
          updating: action.id
        });

      case UPDATING_END:
        {
          var newState = _objectSpread({}, state);

          delete newState.updating;
          return newState;
        }

      default:
        return state;
    }
  };
};

var _default = crudListReducerFor;
exports["default"] = _default;