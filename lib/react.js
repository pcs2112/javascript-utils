"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisplayName = void 0;

/**
 * Returns the display name of a React components.
 * @param {Object} WrappedComponent
 * @returns {String}
 */
var getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

exports.getDisplayName = getDisplayName;