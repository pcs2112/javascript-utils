"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentHiddenPropertyName = exports.getWindowWidth = exports.getWindowHeight = exports.isDOMAvailable = void 0;

/**
 * Returns true is the DOM is available. Returns
 * false when called in the server.
 *
 * @returns {Boolean}
 */
var isDOMAvailable = function isDOMAvailable() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};
/**
 * Returns the window's height.
 *
 * @returns {Number}
 */


exports.isDOMAvailable = isDOMAvailable;

var getWindowHeight = function getWindowHeight() {
  if (!isDOMAvailable()) {
    return 0;
  }

  var w = window;
  var d = document;
  var e = d.documentElement;
  var g = d.getElementsByTagName('body')[0];
  return w.innerHeight || e.clientHeight || g.clientHeight;
};
/**
 * Returns the window's width.
 *
 * @returns {Number}
 */


exports.getWindowHeight = getWindowHeight;

var getWindowWidth = function getWindowWidth() {
  if (!isDOMAvailable()) {
    return 0;
  }

  var w = window;
  var d = document;
  var e = d.documentElement;
  var g = d.getElementsByTagName('body')[0];
  return w.innerWidth || e.clientWidth || g.clientWidth;
};
/**
 * Returns the browser's document hidden property name.
 *
 * @returns {String}
 */


exports.getWindowWidth = getWindowWidth;

var documentHiddenPropertyName = function documentHiddenPropertyName() {
  var hidden = null;

  if (!isDOMAvailable()) {
    return hidden;
  }

  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
  }

  return hidden;
};

exports.documentHiddenPropertyName = documentHiddenPropertyName;