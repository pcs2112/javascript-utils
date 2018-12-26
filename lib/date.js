"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAfterToday = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks the specified date is equal to today or after.
 * @param {String} date
 * @param {String} dateFormat
 * @returns {boolean}
 */
var isAfterToday = function isAfterToday(date) {
  var dateFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD';
  var valid = false;

  if (date) {
    var startDate = (0, _moment.default)(date, dateFormat);

    if (startDate.diff((0, _moment.default)(), 'days') >= 0) {
      valid = true;
    }
  }

  return valid;
};

exports.isAfterToday = isAfterToday;