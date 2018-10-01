import { createSelector } from 'reselect';

/**
 * Creates a selector function to get the data property from a state slice.
 *
 * @param {String} stateName State slice name
 * @param {String} dataLoadedProp Property indicating the data has been loaded
 * @param {String} dataProp Property containing the data
 */
export const createDataSelector = (stateName, dataLoadedProp, dataProp) => state =>
  (state[stateName][dataLoadedProp] ? state[stateName][dataProp] : []);

/**
 * Creates a selector function to return the fetching error property from a state slice.
 *
 * @param {String} stateName State slice name
 * @param {String} errorProp Property indicating the error
 * @param {String} errorPayloadProp Property indicating the error's payload
 */
export const createFetchingErrorSelector = (stateName, errorProp, errorPayloadProp) => state =>
  (state[stateName][errorProp] && state[stateName][errorProp][errorPayloadProp]
    ? state[stateName][errorProp][errorPayloadProp] : false
  );

/**
 * Creates selector to return the value of a property in a state slice.
 *
 * @param {String} stateName
 * @param {String} propertyName
 */
export const createGetPropertySelector = (stateName, propertyName) => state =>
  state[stateName][propertyName];

/**
 * Creates selector to return data.
 *
 * @param {Function} getDataSelector
 */
export const createGetItemsSelector = getDataSelector => createSelector(
  [getDataSelector],
  data => data
);

/**
 * Creates a selector to get an item by Id.
 *
 * @param {Function} getItemsSelector
 * @param {Function} getItemIdSelector
 */
export const createGetItemByIdSelector = (getItemsSelector, getItemIdSelector) => createSelector(
  [getItemsSelector, getItemIdSelector],
  (items, itemId) => (itemId ? items.find(item => item.id === itemId) : undefined)
);
