"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeState = exports.saveState = exports.loadState = exports.removeItem = exports.setItem = exports.getItem = void 0;

var _merge = _interopRequireDefault(require("lodash/merge"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var STATE_KEY_NAME = 'state';
/**
 * Returns an item from localStorage. undefined is returned if the item
 * is not found.
 *
 * @param {String} name
 * @returns {undefined|Object|Number|String|Boolean}
 */

var getItem = function getItem(name) {
  try {
    var serializedItem = localStorage.getItem(name);

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


exports.getItem = getItem;

var setItem = function setItem(name, value) {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (err) {// Ignore write error
  }
};

exports.setItem = setItem;

var removeItem = function removeItem(name) {
  try {
    localStorage.removeItem(name);
  } catch (err) {// Ignore write error
  }
};
/**
 * Loads the redux state from localStorage.
 * @returns {Object|undefined}
 */


exports.removeItem = removeItem;

var loadState = function loadState() {
  return getItem(STATE_KEY_NAME);
};
/**
 * Saves the redux state into the localStorage.
 * @param {Object} state
 */


exports.loadState = loadState;

var saveState = function saveState(state) {
  if (state && _typeof(state) === 'object') {
    var currentState = getItem(STATE_KEY_NAME);
    var newState;

    if (currentState) {
      newState = (0, _merge["default"])(currentState, state);
    } else {
      newState = (0, _cloneDeep["default"])(state);
    }

    setItem(STATE_KEY_NAME, newState);
  }
};
/**
 * Removes the state from the local storage.
 * @param {Array} stateSlices
 */


exports.saveState = saveState;

var removeState = function removeState(stateSlices) {
  if (stateSlices && Array.isArray(stateSlices) && stateSlices.length > 0) {
    var currentState = getItem(STATE_KEY_NAME);

    for (var i = 0; i < stateSlices.length; i++) {
      var stateSlice = stateSlices[i];

      if (Object.prototype.hasOwnProperty.call(currentState, stateSlice)) {
        delete currentState[stateSlice];
      }

      saveState(currentState);
    }
  } else {
    removeItem(STATE_KEY_NAME);
  }
};

exports.removeState = removeState;