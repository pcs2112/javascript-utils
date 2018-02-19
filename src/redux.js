import build from 'redux-object';
import { getTotalPagesFromLimit, getCurrentPageFromOffset } from './pagination';

/**
 * Function used to create a reducer function.
 *
 * @param {Object} initialState - Reducer's initial state
 * @param {Object} handlers - Handling function indexed by action type name
 * @returns {Function}
 */
export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
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
  const action = Array.isArray(type) ? { types: [...type] } : { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

/**
 * Converts a JSON API object to an object using redux-object.
 *
 * @param {Object} data
 * @param {String} key
 * @param {Number} index
 * @returns {Object}
 */
export const getReduxObject = (data, key, index = 0) => {
  if (!data || !data.loaded || !data[key]) {
    return null;
  }

  const keys = Object.keys(data[key]);
  return build(data, key, keys[index]);
};

/**
 * Converts a JSON API object to an array of objects using redux-object.
 *
 * @param {Object} data
 * @param {String} key
 * @param {String|Boolean} meta
 * @returns {Array}
 */
export const getReduxObjectArray = (data, key, meta = false) => {
  if (!data || !data[key]) {
    return [];
  }

  let normalizedMeta;
  if (typeof meta === 'boolean') {
    if (meta) {
      normalizedMeta = Object.keys(data.meta)[0]; // eslint-disable-line
    }
  } else if (meta) {
    normalizedMeta = meta;
  }

  return build(data, key, normalizedMeta
    ? data.meta[normalizedMeta].data.map(item => item.id) : null);
};

/**
 * Returns the JSON API pagination info.
 * @param {Object} data
 * @returns {Object|null}
 */
export const getReduxObjectPagination = (data) => {
  if (!data || !data.meta) {
    return null;
  }

  const pageKey = Object.keys(data.meta)[0];
  if (!data.meta[pageKey].links) {
    return null;
  }

  const linksMeta = {
    ...data.meta[pageKey].links
  };

  linksMeta.totalPages = getTotalPagesFromLimit(linksMeta.limit, linksMeta.size);
  linksMeta.currentPage = getCurrentPageFromOffset(linksMeta.offset, linksMeta.size);

  return linksMeta;
};
