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