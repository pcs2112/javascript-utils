'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAfterToday = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks the specified date is equal to today or after.
 * @param {String} date
 * @returns {boolean}
 */
var isAfterToday = exports.isAfterToday = function isAfterToday(date) {
  var valid = false;
  if (date) {
    var startDate = (0, _moment2.default)(date);
    if (startDate.diff((0, _moment2.default)(), 'days') >= 0) {
      valid = true;
    }
  }

  return valid;
};