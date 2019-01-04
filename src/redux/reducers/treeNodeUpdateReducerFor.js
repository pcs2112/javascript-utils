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
  UPDATE
}) => (state = initialState, action) => {
  switch (action.type) {
    case UPDATE: {
      const {
        nodes, node, prop, value
      } = action.payload;

      const newNodes = nodes.map((existingNode) => {
        if (existingNode.id === node.id) {
          return {
            ...existingNode,
            state: {
              ...(existingNode.state || {}),
              [prop]: value
            }
          };
        }

        return existingNode;
      });

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
