"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = void 0;

var _array = require("../../array");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  data: false,
  dataLoaded: false
};
/**
 * Reusable factory reducer to update the prop in a tree node.
 *
 * @param {Object} actionTypes
 * @returns {Function}
 */

exports.initialState = initialState;

var treeNodeUpdateReducerFor = function treeNodeUpdateReducerFor(_ref) {
  var SELECT = _ref.SELECT;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case SELECT:
        {
          var _action$payload = action.payload,
              nodes = _action$payload.nodes,
              node = _action$payload.node,
              prop = _action$payload.prop,
              value = _action$payload.value;
          var newNodes = (0, _array.untreeify)(nodes).map(function (existingNode) {
            if (existingNode.id === node.id) {
              return _objectSpread({}, existingNode, {
                state: _objectSpread({}, existingNode.state || {}, _defineProperty({}, prop, value))
              });
            }

            return existingNode;
          });
          return _objectSpread({}, state, {
            data: newNodes
          });
        }

      default:
        return state;
    }
  };
};

var _default = treeNodeUpdateReducerFor;
exports.default = _default;