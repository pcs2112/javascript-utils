'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createValidator = exports.specialCharsRequired = exports.numbersRequired = exports.maxNumber = exports.minNumber = exports.numericLength = exports.maxDate = exports.minDate = exports.validDateRange = exports.validDate = exports.fullName = exports.match = exports.oneOf = exports.pattern = exports.numeric = exports.integer = exports.maxLength = exports.minLength = exports.required = exports.email = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _parseFullName = require('parse-full-name');

var _utils = require('./utils');

var _number = require('./number');

var _string = require('./string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = function join(rules) {
  return function (value, data) {
    return rules.map(function (rule) {
      return rule(value, data);
    }).filter(function (error) {
      return !!error;
    })[0];
  };
};

/**
 * Default validation messages
 */
var defaultMessages = {
  email: 'Invalid email address.',
  required: 'Required.',
  minLength: 'Must be at least {min} characters.',
  maxLength: 'Must be no more than {max} characters.',
  integer: 'Must be an integer.',
  oneOf: 'Must be one of: {values}.',
  match: 'Do not match.',
  fullName: 'The name is invalid.',
  validateDate: 'The date is invalid.',
  validDateRange: 'The date must be a date after the starting date.',
  numericLength: 'Must be a number of {length} characters.',
  numeric: 'Must be a valid number.',
  pattern: 'The value does not match the pattern.',
  minNumber: 'Must be greater or equal to {min}.',
  maxNumber: 'Must be less or equal to {max}.',
  minDate: 'Must be after or on {min}.',
  maxDate: 'Must be before or on {min}.',
  numbersRequired: 'Must have at least {length} number(s).',
  specialCharsRequired: 'Must have at least {length} special character(s).'
};

/**
 * Email validation function.
 *
 * @param {String} msg
 */
var email = exports.email = function email(msg) {
  return function (value) {
    var error = '';
    if (!(0, _utils.isEmpty)(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = msg || defaultMessages.email;
    }

    return error;
  };
};

/**
 * Required value validation function.
 *
 * @param {String} msg
 */
var required = exports.required = function required(msg) {
  return function (value) {
    var error = '';

    var isArray = Array.isArray(value);
    if (isArray && value.length < 1 || !isArray && (0, _utils.isEmpty)(value)) {
      error = msg || defaultMessages.required;
    }

    return error;
  };
};

/**
 * String min length validation function.
 *
 * @param {Number} min - Minimum number of characters required
 * @param {String} msg
 */
var minLength = exports.minLength = function minLength(min, msg) {
  return function (value) {
    var error = '';

    if (!(0, _utils.isEmpty)(value) && !(0, _string.isMinLength)(value, min)) {
      error = (msg || defaultMessages.minLength).replace('{min}', '' + min);
    }

    return error;
  };
};

/**
 * String max length validation function.
 *
 * @param {Number} max - Max number of characters allowed
 * @param {String} msg
 */
var maxLength = exports.maxLength = function maxLength(max, msg) {
  return function (value) {
    var error = '';

    if (!(0, _utils.isEmpty)(value) && !(0, _string.isMaxLength)(value, max)) {
      error = (msg || defaultMessages.maxLength).replace('{max}', '' + max);
    }

    return error;
  };
};

/**
 * Integer validation function.
 *
 * @param {String} msg
 */
var integer = exports.integer = function integer(msg) {
  return function (value) {
    var error = '';

    if (!Number.isInteger(Number(value))) {
      error = msg || defaultMessages.integer;
    }

    return error;
  };
};

/**
 * Number validator.
 *
 * @param {String} msg
 */
var numeric = exports.numeric = function numeric(msg) {
  return function (value) {
    var error = '';

    if (!(0, _number.isNumber)(value)) {
      error = msg || defaultMessages.numeric;
    }

    return error;
  };
};

/**
 * Checks the value matches the specified pattern.
 *
 * @param {RegExp} regex
 * @param {String} msg
 */
var pattern = exports.pattern = function pattern(regex, msg) {
  return function (value) {
    var error = '';

    if (!regex.test(value)) {
      error = msg || defaultMessages.pattern;
    }

    return error;
  };
};

/**
 * Validate the value is one of the valid values.
 *
 * @param {Array} enumeration - Array of valid values allowed
 * @param {String} msg
 */
var oneOf = exports.oneOf = function oneOf(enumeration, msg) {
  return function (value) {
    var error = '';

    if (!~enumeration.indexOf(value)) {
      // eslint-disable-line
      error = (msg || defaultMessages.oneOf).replace('{values}', enumeration.join(', '));
    }

    return error;
  };
};

/**
 * Validates the values matches the value of the specified field.
 *
 * @param {String} field
 * @param {String} msg
 */
var match = exports.match = function match(field, msg) {
  return function (value, data) {
    var error = '';

    if (data && value !== data[field]) {
      error = msg || defaultMessages.match;
    }

    return error;
  };
};

/**
 * Validates a name contains first name and last name.
 *
 * @param {String} msg
 */
var fullName = exports.fullName = function fullName(msg) {
  return function (value) {
    var error = '';

    var name = (0, _parseFullName.parseFullName)(value || '');
    if ((0, _utils.isEmpty)(name.first) || (0, _utils.isEmpty)(name.last)) {
      error = msg || defaultMessages.fullName;
    }

    return error;
  };
};

/**
 * Validates a date is valid.
 *
 * @param {String} dateFormat
 * @param {String} msg
 */
var validDate = exports.validDate = function validDate(dateFormat, msg) {
  return function (value) {
    var error = '';

    if (!(0, _utils.isEmpty)(value) && !(0, _moment2.default)(value, dateFormat).isValid()) {
      error = msg || defaultMessages.validateDate;
    }

    return error;
  };
};

/**
 * Validates a date range is valid.
 *
 * @param {String} field
 * @param {String} dateFormat
 * @param {String} msg
 */
var validDateRange = exports.validDateRange = function validDateRange(field, dateFormat, msg) {
  return function (value, data) {
    var error = '';

    if (data && !(0, _utils.isEmpty)(data[field]) && !(0, _utils.isEmpty)(value) && !(0, _moment2.default)(value, dateFormat).isAfter((0, _moment2.default)(data[field], dateFormat))) {
      error = msg || defaultMessages.validDateRange;
    }

    return error;
  };
};

/**
 * Validates a date is not before the min date.
 *
 * @param {String} minDateValue
 * @param {String} dateFormat
 * @param {String} msg
 */
var minDate = exports.minDate = function minDate(minDateValue, dateFormat, msg) {
  return function (value) {
    if ((0, _utils.isEmpty)(value)) {
      return 'Enter a valid date.';
    }

    var date = (0, _moment2.default)(value, dateFormat);
    if (!date.isValid()) {
      return 'Enter a valid date.';
    }

    var min = (0, _moment2.default)(minDateValue, dateFormat);
    if (date.diff((0, _moment2.default)(min, dateFormat), 'days') < 0) {
      return (msg || defaultMessages.minDate).replace('{min}', min.format(dateFormat));
    }

    return '';
  };
};

/**
 * Validates a date is not after the max date.
 *
 * @param {String} maxDateValue
 * @param {String} dateFormat
 * @param {String} msg
 */
var maxDate = exports.maxDate = function maxDate(maxDateValue, dateFormat, msg) {
  return function (value) {
    if ((0, _utils.isEmpty)(value)) {
      return 'Enter a valid date.';
    }

    var date = (0, _moment2.default)(value, dateFormat);
    if (!date.isValid()) {
      return 'Enter a valid date.';
    }

    var max = (0, _moment2.default)(maxDateValue, dateFormat);
    if (date.diff((0, _moment2.default)(max, dateFormat), 'days') > 0) {
      return (msg || defaultMessages.minDate).replace('{min}', max.format(dateFormat));
    }

    return '';
  };
};

/**
 * Validate a string is a numeric value of X characters long.
 *
 * @param {Number} length
 * @param {String} msg
 */
var numericLength = exports.numericLength = function numericLength(length, msg) {
  return function (value) {
    var error = '';

    var normalizedValue = '' + value;
    if ((0, _utils.isEmpty)(normalizedValue) || !(0, _number.isNumber)(normalizedValue) || normalizedValue.length !== length) {
      error = (msg || defaultMessages.numericLength).replace('{length}', '' + length);
    }

    return error;
  };
};

/**
 * Validate a value is greater or equal to min.
 *
 * @param {Number} min
 * @param {String} msg
 */
var minNumber = exports.minNumber = function minNumber(min, msg) {
  return function (value) {
    if ((0, _utils.isEmpty)(value) || !(0, _number.isNumber)(value)) {
      return 'Please enter a number';
    }

    if (value < min) {
      return (msg || defaultMessages.minNumber).replace('{min}', '' + min);
    }

    return '';
  };
};

/**
 * Validate a value is less or equal to max.
 *
 * @param {Number} max
 * @param {String} msg
 */
var maxNumber = exports.maxNumber = function maxNumber(max, msg) {
  return function (value) {
    if ((0, _utils.isEmpty)(value) || !(0, _number.isNumber)(value)) {
      return 'Please enter a number';
    }

    if (value > max) {
      return (msg || defaultMessages.maxNumber).replace('{max}', '' + max);
    }

    return '';
  };
};

/**
 * Checks a value has at least the amount of numbers specified by length.
 *
 * @param {Number} length
 * @param {String} msg
 */
var numbersRequired = exports.numbersRequired = function numbersRequired(length, msg) {
  return function (value) {
    var error = '';

    if ((0, _utils.isEmpty)(value) || !(0, _string.hasNumbers)(value, length)) {
      error = (msg || defaultMessages.numbersRequired).replace('{length}', '' + length);
    }

    return error;
  };
};

/**
 * Checks a value has at least the amount of special characters specified by length.
 *
 * @param {Number} length
 * @param {String} msg
 */
var specialCharsRequired = exports.specialCharsRequired = function specialCharsRequired(length, msg) {
  return function (value) {
    var error = '';

    if ((0, _utils.isEmpty)(value) || !(0, _string.hasSpecialChars)(value, length)) {
      error = (msg || defaultMessages.specialCharsRequired).replace('{length}', '' + length);
    }

    return error;
  };
};

/**
 * Creates a validation function using the specified rules.
 *
 * @param {Object} rules
 */
var createValidator = exports.createValidator = function createValidator(rules) {
  return function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var errors = {};
    Object.keys(rules).forEach(function (key) {
      var rule = join([].concat(rules[key]));
      var error = rule(data[key], data);
      if (!(0, _utils.isEmpty)(error)) {
        errors[key] = error;
      }
    });

    return errors;
  };
};