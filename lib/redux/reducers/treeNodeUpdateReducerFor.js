"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = void 0;

var _nodes3 = require("react-virtualized-tree/lib/selectors/nodes");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  nodes: false
};
/**
 * Reusable factory reducer to update the prop in a tree node.
 *
 * @param {Object} actionTypes
 * @returns {Function}
 */

exports.initialState = initialState;

var treeNodeUpdateReducerFor = function treeNodeUpdateReducerFor(_ref) {
  var ADD_NODE = _ref.ADD_NODE,
      UPDATE_NODE = _ref.UPDATE_NODE,
      DELETE_NODE = _ref.DELETE_NODE;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case ADD_NODE:
        {
          var nodes = state.nodes;
          var _action$payload = action.payload,
              node = _action$payload.node,
              parentNodeId = _action$payload.parentNodeId;
          var flattenedTree = (0, _nodes3.getFlattenedTree)(nodes);
          var parentNode = flattenedTree.find(function (flattenedTreeNode) {
            return flattenedTreeNode.id === parentNodeId;
          });

          if (!parentNode.state) {
            parentNode.state = {};
          }

          parentNode.state.expanded = true;

          var newNode = _objectSpread({}, node, {
            children: []
          });

          parentNode.children.push(newNode);
          var newNodes = (0, _nodes3.replaceNodeFromTree)(nodes, parentNode);
          return _objectSpread({}, state, {
            nodes: newNodes
          });
        }

      case UPDATE_NODE:
        {
          var _action$payload2 = action.payload,
              _nodes = _action$payload2.nodes,
              _node = _action$payload2.node;

          var _newNodes = (0, _nodes3.replaceNodeFromTree)(_nodes, _node);

          return _objectSpread({}, state, {
            nodes: _newNodes
          });
        }

      case DELETE_NODE:
        {
          var _action$payload3 = action.payload,
              _nodes2 = _action$payload3.nodes,
              _node2 = _action$payload3.node;

          var _newNodes2 = (0, _nodes3.deleteNodeFromTree)(_nodes2, _node2);

          return _objectSpread({}, state, {
            nodes: _newNodes2
          });
        }

      default:
        return state;
    }
  };
};

var _default = treeNodeUpdateReducerFor;
exports.default = _default;