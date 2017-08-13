/**
 * Function used to create a reducer function.
 *
 * @param {Object} initialState - Reducer's initial state
 * @param {Object} handlers - Handling function indexed by action type name
 * @returns {Function}
 */
export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

/**
 * Creates a redux action function.
 *
 * @param {String|Array} type - 4Action types
 * @param {Array} argNames - Argument names used by the action
 */
export const createAction = (type, ...argNames) => (...args) => {
  const action = Array.isArray(type) ? { types: [ ...type ] } : { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};
