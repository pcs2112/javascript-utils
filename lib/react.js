'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns the display name of a React components.
 * @param {Object} WrappedComponent
 * @returns {String}
 */
var getDisplayName = exports.getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};