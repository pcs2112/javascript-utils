import { replaceNodeFromTree, deleteNodeFromTree } from 'react-virtualized-tree/lib/selectors/nodes';

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
  UPDATE_NODE, DELETE_NODE
}) => (state = initialState, action) => {
  switch (action.type) {
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
