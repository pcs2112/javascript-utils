import { untreeify } from '../../array';

export const initialState = {
  data: false,
  dataLoaded: false
};

/**
 * Reusable factory reducer to update the prop in a tree node.
 *
 * @param {Object} actionTypes
 * @returns {Function}
 */
const treeNodeUpdateReducerFor = ({
  SELECT
}) => (state = initialState, action) => {
  switch (action.type) {
    case SELECT: {
      const {
        nodes, node, prop, value
      } = action.payload;

      const newNodes = untreeify(nodes).map((existingNode) => {
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
        data: newNodes
      };
    }
    default:
      return state;
  }
};

export default treeNodeUpdateReducerFor;
