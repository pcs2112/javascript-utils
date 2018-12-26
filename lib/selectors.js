"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetItemByIdSelector = exports.createGetItemsSelector = exports.createGetPropertySelector = exports.createFetchingErrorSelector = exports.createDataSelector = void 0;

var _reselect = require("reselect");

/**
 * Creates a selector function to get the data property from a state slice.
 *
 * @param {String} stateName State slice name
 * @param {String} dataLoadedProp Property indicating the data has been loaded
 * @param {String} dataProp Property containing the data
 */
var createDataSelector = function createDataSelector(stateName, dataLoadedProp, dataProp) {
  return function (state) {
    return state[stateName][dataLoadedProp] ? state[stateName][dataProp] : [];
  };
};
/**
 * Creates a selector function to return the fetching error property from a state slice.
 *
 * @param {String} stateName State slice name
 * @param {String} errorProp Property indicating the error
 * @param {String} errorPayloadProp Property indicating the error's payload
 */


exports.createDataSelector = createDataSelector;

var createFetchingErrorSelector = function createFetchingErrorSelector(stateName, errorProp, errorPayloadProp) {
  return function (state) {
    return state[stateName][errorProp] && state[stateName][errorProp][errorPayloadProp] ? state[stateName][errorProp][errorPayloadProp] : false;
  };
};
/**
 * Creates selector to return the value of a property in a state slice.
 *
 * @param {String} stateName
 * @param {String} propertyName
 */


exports.createFetchingErrorSelector = createFetchingErrorSelector;

var createGetPropertySelector = function createGetPropertySelector(stateName, propertyName) {
  return function (state) {
    return state[stateName][propertyName];
  };
};
/**
 * Creates selector to return data.
 *
 * @param {Function} getDataSelector
 */


exports.createGetPropertySelector = createGetPropertySelector;

var createGetItemsSelector = function createGetItemsSelector(getDataSelector) {
  return (0, _reselect.createSelector)([getDataSelector], function (data) {
    return data;
  });
};
/**
 * Creates a selector to get an item by Id.
 *
 * @param {Function} getItemsSelector
 * @param {Function} getItemIdSelector
 */


exports.createGetItemsSelector = createGetItemsSelector;

var createGetItemByIdSelector = function createGetItemByIdSelector(getItemsSelector, getItemIdSelector) {
  return (0, _reselect.createSelector)([getItemsSelector, getItemIdSelector], function (items, itemId) {
    return itemId ? items.find(function (item) {
      return item.id === itemId;
    }) : undefined;
  });
};

exports.createGetItemByIdSelector = createGetItemByIdSelector;