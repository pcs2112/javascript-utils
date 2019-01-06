import { replaceNodeFromTree } from 'react-virtualized-tree/lib/selectors/nodes';

export const initialState = {
  nodes: false
};

const selectNodes = (nodes, selected) => (
  nodes.map(n => ({
    ...n,
    children: n.children ? selectNodes(n.children, selected) : [],
    state: {
      ...n.state,
      selected
    }
  }))
);

export const nodeSelectionHandler = (nodes, updatedNode) => (
  nodes.map((node) => {
    if (node.id === updatedNode.id) {
      return {
        ...updatedNode,
        children: node.children ? selectNodes(node.children, updatedNode.state.selected) : [],
      };
    }

    if (node.children) {
      return { ...node, children: nodeSelectionHandler(node.children, updatedNode) };
    }

    return node;
  })
);

/**
 * Reusable factory reducer to mark a tree node and all its children as selected.
 *
 * @param {Object} actionTypes
 * @returns {Function}
 */
const treeNodeSelectReducerFor = ({
  SELECT_NODE, SINGLE_SELECT_NODE
}) => (state = initialState, action) => {
  switch (action.type) {
    case SELECT_NODE: {
      const { nodes, node } = action.payload;
      const newNodes = nodeSelectionHandler(nodes, node);
      return {
        ...state,
        nodes: newNodes
      };
    }
    case SINGLE_SELECT_NODE: {
      const { nodes, node } = action.payload;
      const newNodes = replaceNodeFromTree(nodes, node);
      return {
        ...state,
        nodes: newNodes
      };
    }
    default:
      return state;
  }
};

export default treeNodeSelectReducerFor;
