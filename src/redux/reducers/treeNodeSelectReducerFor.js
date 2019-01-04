import { untreeify } from '../../array';

export const initialState = {
  data: false,
  dataLoaded: false
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
  SELECT
}) => (state = initialState, action) => {
  switch (action.type) {
    case SELECT: {
      const { nodes, node } = action.payload;
      const new1 = nodeSelectionHandler(nodes, node);
      console.log(new1);
      const newData = untreeify(new1);
      console.log(newData);
      return {
        ...state,
        data: newData
      };
    }
    default:
      return state;
  }
};

export default treeNodeSelectReducerFor;
