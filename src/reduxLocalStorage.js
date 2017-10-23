import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

const STATE_KEY_NAME = 'state';

/**
 * Returns an item from localStorage. undefined is returned if the item
 * is not found.
 *
 * @param {String} name
 * @returns {undefined|Object|Number|String|Boolean}
 */
export const getItem = (name) => {
  try {
    const serializedItem = localStorage.getItem(name);
    if (serializedItem === null) {
      return undefined;
    }

    return JSON.parse(serializedItem);
  } catch (err) {
    return undefined;
  }
};

/**
 * Saves item into localStorage.
 *
 * @param {String} name
 * @param {Object|Number|String|Boolean} value
 */
export const setItem = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (err) {
    // Ignore write error
  }
};

export const removeItem = (name) => {
  try {
    localStorage.removeItem(name);
  } catch (err) {
    // Ignore write error
  }
};

/**
 * Loads the redux state from localStorage.
 * @returns {Object|undefined}
 */
export const loadState = () => getItem(STATE_KEY_NAME);

/**
 * Saves the redux state into the localStorage.
 * @param {Object} state
 */
export const saveState = (state) => {
  if (state && typeof state === 'object') {
    const currentState = getItem(STATE_KEY_NAME);
    let newState;

    if (currentState) {
      newState = merge(currentState, state);
    } else {
      newState = cloneDeep(state);
    }

    setItem(STATE_KEY_NAME, newState);
  }
};

/**
 * Removes the state from the local storage.
 * @param {Array} stateSlices
 */
export const removeState = (stateSlices) => {
  if (stateSlices && Array.isArray(stateSlices) && stateSlices.length > 0) {
    const currentState = getItem(STATE_KEY_NAME);
    for (let i = 0; i < stateSlices.length; i++) {
      const stateSlice = stateSlices[i];
      if (Object.prototype.hasOwnProperty.call(currentState, stateSlice)) {
        delete (currentState[stateSlice]);
      }

      saveState(currentState);
    }
  } else {
    removeItem(STATE_KEY_NAME);
  }
};
