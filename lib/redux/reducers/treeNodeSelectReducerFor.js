"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.nodeSelectionHandler = exports.initialState = void 0;

var _array = require("../../array");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  data: false,
  dataLoaded: false
};
exports.initialState = initialState;

var selectNodes = function selectNodes(nodes, selected) {
  return nodes.map(function (n) {
    return _objectSpread({}, n, {
      children: n.children ? selectNodes(n.children, selected) : [],
      state: _objectSpread({}, n.state, {
        selected: selected
      })
    });
  });
};

var nodeSelectionHandler = function nodeSelectionHandler(nodes, updatedNode) {
  return nodes.map(function (node) {
    if (node.id === updatedNode.id) {
      return _objectSpread({}, updatedNode, {
        children: node.children ? selectNodes(node.children, updatedNode.state.selected) : []
      });
    }

    if (node.children) {
      return _objectSpread({}, node, {
        children: nodeSelectionHandler(node.children, updatedNode)
      });
    }

    return node;
  });
};
/**
 * Reusable factory reducer to mark a tree node and all its children as selected.
 *
 * @param {Object} actionTypes
 * @returns {Function}
 */


exports.nodeSelectionHandler = nodeSelectionHandler;

var treeNodeSelectReducerFor = function treeNodeSelectReducerFor(_ref) {
  var SELECT = _ref.SELECT;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case SELECT:
        {
          var _action$payload = action.payload,
              nodes = _action$payload.nodes,
              node = _action$payload.node;
          var new1 = nodeSelectionHandler(nodes, node);
          console.log(new1);
          var newData = (0, _array.untreeify)(new1);
          console.log(newData);
          return _objectSpread({}, state, {
            data: newData
          });
        }

      default:
        return state;
    }
  };
};

var _default = treeNodeSelectReducerFor;
exports.default = _default;