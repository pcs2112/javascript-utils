"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.nodeSelectionHandler = exports.initialState = void 0;

var _nodes2 = require("react-virtualized-tree/lib/selectors/nodes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  nodes: false
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
  var SELECT_NODE = _ref.SELECT_NODE,
      SINGLE_SELECT_NODE = _ref.SINGLE_SELECT_NODE;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case SELECT_NODE:
        {
          var _action$payload = action.payload,
              nodes = _action$payload.nodes,
              node = _action$payload.node;
          var newNodes = nodeSelectionHandler(nodes, node);
          return _objectSpread({}, state, {
            nodes: newNodes
          });
        }

      case SINGLE_SELECT_NODE:
        {
          var _action$payload2 = action.payload,
              _nodes = _action$payload2.nodes,
              _node = _action$payload2.node;

          var _newNodes = (0, _nodes2.replaceNodeFromTree)(_nodes, _node);

          return _objectSpread({}, state, {
            nodes: _newNodes
          });
        }

      default:
        return state;
    }
  };
};

var _default = treeNodeSelectReducerFor;
exports["default"] = _default;