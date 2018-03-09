'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeState = exports.saveState = exports.loadState = exports.removeItem = exports.setItem = exports.getItem = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATE_KEY_NAME = 'state';

/**
 * Returns an item from localStorage. undefined is returned if the item
 * is not found.
 *
 * @param {String} name
 * @returns {undefined|Object|Number|String|Boolean}
 */
var getItem = exports.getItem = function getItem(name) {
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
var setItem = exports.setItem = function setItem(name, value) {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (err) {
    // Ignore write error
  }
};

var removeItem = exports.removeItem = function removeItem(name) {
  try {
    localStorage.removeItem(name);
  } catch (err) {
    // Ignore write error
  }
};

/**
 * Loads the redux state from localStorage.
 * @returns {Object|undefined}
 */
var loadState = exports.loadState = function loadState() {
  return getItem(STATE_KEY_NAME);
};

/**
 * Saves the redux state into the localStorage.
 * @param {Object} state
 */
var saveState = exports.saveState = function saveState(state) {
  if (state && (typeof state === 'undefined' ? 'undefined' : _typeof(state)) === 'object') {
    var currentState = getItem(STATE_KEY_NAME);
    var newState = void 0;

    if (currentState) {
      newState = (0, _merge2.default)(currentState, state);
    } else {
      newState = (0, _cloneDeep2.default)(state);
    }

    setItem(STATE_KEY_NAME, newState);
  }
};

/**
 * Removes the state from the local storage.
 * @param {Array} stateSlices
 */
var removeState = exports.removeState = function removeState(stateSlices) {
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