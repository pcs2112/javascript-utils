'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns true is the DOM is available. Returns
 * false when called in the server.
 *
 * @returns {Boolean}
 */
var isDOMAvailable = exports.isDOMAvailable = function isDOMAvailable() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

/**
 * Returns the window's height.
 *
 * @returns {Number}
 */
var getWindowHeight = exports.getWindowHeight = function getWindowHeight() {
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
var getWindowWidth = exports.getWindowWidth = function getWindowWidth() {
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
var documentHiddenPropertyName = exports.documentHiddenPropertyName = function documentHiddenPropertyName() {
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