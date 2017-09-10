'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createValidator = exports.maxNumber = exports.minNumber = exports.numericLength = exports.maxDate = exports.minDate = exports.validDateRange = exports.validDate = exports.fullName = exports.match = exports.oneOf = exports.pattern = exports.numeric = exports.integer = exports.maxLength = exports.minLength = exports.required = exports.email = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('./utils');

var _number = require('./number');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = function join(rules) {
  return function (value, data) {
    return rules.map(function (rule) {
      return rule(value, data);
    }).filter(function (error) {
      return !!error;
    })[0 /* first error */];
  };
};

/**
 * Default validation messages
 */
var validationMessages = {
  email: 'Invalid email address',
  required: 'Required',
  minLength: 'Must be at least {min} characters',
  maxLength: 'Must be no more than {max} characters',
  integer: 'Must be an integer',
  oneOf: 'Must be one of: {values}',
  match: 'Do not match',
  fullName: 'The name is invalid',
  validateDate: 'The date is invalid',
  validDateRange: 'The date must be a date after the starting date.',
  numericLength: 'Must be a number of {length} characters',
  numeric: 'Must be a valid number',
  pattern: 'The value does not match the pattern',
  minNumber: 'Must be greater or equal to {min}',
  maxNumber: 'Must be less or equal to {max}',
  minDate: 'Must be after or on {min}',
  maxDate: 'Must be before or on {min}'
};

/**
 * Email validation function.
 * @param {String} msg
 */
var email = exports.email = function email(msg) {
  return function (value) {
    if (!(0, _utils.isEmpty)(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return msg || validationMessages.email;
    }
  };
};

/**
 * Required value validation function.
 * @param {String} msg
 */
var required = exports.required = function required(msg) {
  return function (value) {
    var isArray = Array.isArray(value);
    if (isArray && value.length < 1 || !isArray && (0, _utils.isEmpty)(value)) {
      return msg || validationMessages.required;
    }
  };
};

/**
 * String min length validation function.
 * @param {Number} min - Minimum number of characters required
 * @param {String} msg
 */
var minLength = exports.minLength = function minLength(min, msg) {
  return function (value) {
    if (!(0, _utils.isEmpty)(value) && value.length < min) {
      return (msg || validationMessages.minLength).replace('{min}', min);
    }
  };
};

/**
 * String max length validation function.
 * @param {Number} max - Max number of characters allowed
 * @param {String} msg
 */
var maxLength = exports.maxLength = function maxLength(max, msg) {
  return function (value) {
    if (!(0, _utils.isEmpty)(value) && value.length > max) {
      return (msg || validationMessages.maxLength).replace('{max}', max);
    }
  };
};

/**
 * Integer validation function.
 * @param {String} msg
 */
var integer = exports.integer = function integer(msg) {
  return function (value) {
    if (!Number.isInteger(Number(value))) {
      return msg || validationMessages.integer;
    }
  };
};

/**
 * Number validator.
 * @param {String} msg
 */
var numeric = exports.numeric = function numeric(msg) {
  return function (value) {
    if (!(0, _number.isNumber)(value)) {
      return msg || validationMessages.numeric;
    }
  };
};

/**
 * Checks the value matches the specified pattern.
 * @param {RegExp} regex
 * @param {String} msg
 */
var pattern = exports.pattern = function pattern(regex, msg) {
  return function (value) {
    if (!regex.test(value)) {
      return msg || validationMessages.pattern;
    }
  };
};

/**
 * Validate the value is one of the valid values.
 * @param {Array} enumeration - Array of valid values allowed
 * @param {String} msg
 */
var oneOf = exports.oneOf = function oneOf(enumeration, msg) {
  return function (value) {
    if (!~enumeration.indexOf(value)) {
      return (msg || validationMessages.oneOf).replace('{values}', enumeration.join(', '));
    }
  };
};

/**
 * Validates the values matches the value of the specified field.
 * @param {String} field
 * @param {String} msg
 */
var match = exports.match = function match(field, msg) {
  return function (value, data) {
    if (data && value !== data[field]) {
      return msg || validationMessages.match;
    }
  };
};

/**
 * Validates a name contains first name and last name.
 * @param {String} msg
 */
var fullName = exports.fullName = function fullName(msg) {
  return function (value) {
    if (!/^[A-z ]+$/.test(value)) {
      return msg || validationMessages.fullName;
    }
  };
};

/**
 * Validates a date is valid.
 * @param {String} dateFormat
 * @param {String} msg
 */
var validDate = exports.validDate = function validDate(dateFormat, msg) {
  return function (value) {
    if (!(0, _utils.isEmpty)(value) && !(0, _moment2.default)(value, dateFormat).isValid()) {
      return msg || validationMessages.validateDate;
    }
  };
};

/**
 * Validates a date range is valid.
 * @param {String} field
 * @param {String} dateFormat
 * @param {String} msg
 */
var validDateRange = exports.validDateRange = function validDateRange(field, dateFormat, msg) {
  return function (value, data) {
    if (data && !(0, _utils.isEmpty)(data[field]) && !(0, _utils.isEmpty)(value) && !(0, _moment2.default)(value, dateFormat).isAfter((0, _moment2.default)(data[field], dateFormat))) {
      return msg || validationMessages.validDateRange;
    }
  };
};

/**
 * Validates a date is not before the min date.
 * @param {String} minDateValue
 * @param {String} dateFormat
 * @param {String} msg
 */
var minDate = exports.minDate = function minDate(minDateValue, dateFormat, msg) {
  return function (value) {
    if ((0, _utils.isEmpty)(value)) {
      return 'Enter a valid date';
    }

    var date = (0, _moment2.default)(value, dateFormat);
    if (!date.isValid()) {
      return 'Enter a valid date';
    }

    var min = (0, _moment2.default)(minDateValue, dateFormat);
    if (date.diff((0, _moment2.default)(min, dateFormat), 'days') < 0) {
      return (msg || validationMessages.minDate).replace('{min}', min.format(dateFormat));
    }
  };
};

/**
 * Validates a date is not after the max date.
 * @param {String} maxDateValue
 * @param {String} dateFormat
 * @param {String} msg
 */
var maxDate = exports.maxDate = function maxDate(maxDateValue, dateFormat, msg) {
  return function (value) {
    if ((0, _utils.isEmpty)(value)) {
      return 'Enter a valid date';
    }

    var date = (0, _moment2.default)(value, dateFormat);
    if (!date.isValid()) {
      return 'Enter a valid date';
    }

    var max = (0, _moment2.default)(maxDateValue, dateFormat);
    if (date.diff((0, _moment2.default)(max, dateFormat), 'days') > 0) {
      return (msg || validationMessages.minDate).replace('{min}', max.format(dateFormat));
    }
  };
};

/**
 * Validate a string is a numeric value of X characters long.
 * @param {Number} length
 * @param {String} msg
 */
var numericLength = exports.numericLength = function numericLength(length, msg) {
  return function (value) {
    var normalizedValue = value + '';
    if ((0, _utils.isEmpty)(normalizedValue) || !(0, _number.isNumber)(normalizedValue) || normalizedValue.length !== length) {
      return (msg || validationMessages.numericLength).replace('{length}', numericLength);
    }
  };
};

/**
 * Validate a value is greater or equal to min.
 * @param {Number} min
 * @param {String} msg
 */
var minNumber = exports.minNumber = function minNumber(min, msg) {
  return function (value) {
    if ((0, _utils.isEmpty)(value) || !(0, _number.isNumber)(value)) {
      return 'Please enter a number';
    }

    if (value < min) {
      return (msg || validationMessages.minNumber).replace('{min}', min);
    }
  };
};

/**
 * Validate a value is less or equal to max.
 * @param {Number} max
 * @param {String} msg
 */
var maxNumber = exports.maxNumber = function maxNumber(max, msg) {
  return function (value) {
    if ((0, _utils.isEmpty)(value) || !(0, _number.isNumber)(value)) {
      return 'Please enter a number';
    }

    if (value > max) {
      return (msg || validationMessages.maxNumber).replace('{max}', max);
    }
  };
};

var createValidator = exports.createValidator = function createValidator(rules) {
  return function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var errors = {};
    Object.keys(rules).forEach(function (key) {
      var rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      var error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
};