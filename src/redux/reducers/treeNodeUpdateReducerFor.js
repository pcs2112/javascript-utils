import { replaceNodeFromTree, deleteNodeFromTree, getFlattenedTree } from 'react-virtualized-tree/lib/selectors/nodes';

export const initialState = {
  nodes: false
};

/**
 * Reusable factory reducer to update the prop in a tree node.
 *
 * @param {Object} actionTypes
 * @returns {Function}
 */
const treeNodeUpdateReducerFor = ({
  ADD_NODE, UPDATE_NODE, DELETE_NODE
}) => (state = initialState, action) => {
  switch (action.type) {
    case ADD_NODE: {
      const { nodes } = state;
      const { node, parentNodeId } = action.payload;
      const flattenedTree = getFlattenedTree(nodes);
      const parentNode = flattenedTree.find(
        flattenedTreeNode => flattenedTreeNode.id === parentNodeId
      );
      const newNode = {
        ...node,
        children: []
      };
      parentNode.children.push(newNode);
      const newNodes = replaceNodeFromTree(nodes, parentNode);
      return {
        ...state,
        nodes: newNodes
      };
    }
    case UPDATE_NODE: {
      const { nodes, node } = action.payload;

      const newNodes = replaceNodeFromTree(nodes, node);

      return {
        ...state,
        nodes: newNodes
      };
    }
    case DELETE_NODE: {
      const { nodes, node } = action.payload;

      const newNodes = deleteNodeFromTree(nodes, node);

      return {
        ...state,
        nodes: newNodes
      };
    }
    default:
      return state;
  }
};

export default treeNodeUpdateReducerFor;
