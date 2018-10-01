'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetItemByIdSelector = exports.createGetItemsSelector = exports.createGetPropertySelector = exports.createFetchingErrorSelector = exports.createDataSelector = undefined;

var _reselect = require('reselect');

/**
 * Creates a selector function to get the data property from a state slice.
 *
 * @param {String} stateName State slice name
 * @param {String} dataLoadedProp Property indicating the data has been loaded
 * @param {String} dataProp Property containing the data
 */
var createDataSelector = exports.createDataSelector = function createDataSelector(stateName, dataLoadedProp, dataProp) {
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
var createFetchingErrorSelector = exports.createFetchingErrorSelector = function createFetchingErrorSelector(stateName, errorProp, errorPayloadProp) {
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
var createGetPropertySelector = exports.createGetPropertySelector = function createGetPropertySelector(stateName, propertyName) {
  return function (state) {
    return state[stateName][propertyName];
  };
};

/**
 * Creates selector to return data.
 *
 * @param {Function} getDataSelector
 */
var createGetItemsSelector = exports.createGetItemsSelector = function createGetItemsSelector(getDataSelector) {
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
var createGetItemByIdSelector = exports.createGetItemByIdSelector = function createGetItemByIdSelector(getItemsSelector, getItemIdSelector) {
  return (0, _reselect.createSelector)([getItemsSelector, getItemIdSelector], function (items, itemId) {
    return itemId ? items.find(function (item) {
      return item.id === itemId;
    }) : undefined;
  });
};