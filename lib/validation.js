"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createValidator = exports.validPassword = exports.specialCharsRequired = exports.numbersRequired = exports.maxNumber = exports.minNumber = exports.numericLength = exports.maxDate = exports.minDate = exports.validDateRange = exports.validDate = exports.fullName = exports.match = exports.oneOf = exports.pattern = exports.numeric = exports.integer = exports.maxLength = exports.minLength = exports.email = exports.required = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _parseFullName = require("parse-full-name");

var _utils = require("./utils");

var _number = require("./number");

var _string = require("./string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default validation messages.
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
  specialCharsRequired: 'Must have at least {length} special character(s).',
  passwordValidator: "Must have {specialCharsLength} special character(s), at least {numbersLength} \n  number(s), and needs to be a minimum length of {passwordLength} character(s) or longer."
};

var join = function join(rules) {
  return function (value, data) {
    return rules.map(function (rule) {
      return rule(value, data);
    }).filter(function (error) {
      return !!error;
    })[0];
  };
};

var isAllowEmpty = function isAllowEmpty(allowEmpty, value) {
  return allowEmpty && (0, _utils.isEmpty)(value);
};

var getErrorMessage = function getErrorMessage(type, msg) {
  return msg || defaultMessages[type];
};
/**
 * Required value validation function.
 *
 * @param {String|undefined} msg
 */


var required = function required() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  return function (value) {
    var error = '';
    var isArray = Array.isArray(value);

    if (isArray && value.length < 1 || !isArray && (0, _utils.isEmpty)(value)) {
      error = getErrorMessage('required', msg);
    }

    return error;
  };
};
/**
 * Email validation function.
 *
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.required = required;

var email = function email() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var allowEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = getErrorMessage('email', msg);
    }

    return error;
  };
};
/**
 * String min length validation function.
 *
 * @param {Number} min - Minimum number of characters required
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.email = email;

var minLength = function minLength(min) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !(0, _string.isMinLength)(value, min)) {
      error = getErrorMessage('minLength', msg).replace('{min}', "".concat(min));
    }

    return error;
  };
};
/**
 * String max length validation function.
 *
 * @param {Number} max - Max number of characters allowed
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.minLength = minLength;

var maxLength = function maxLength(max) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !(0, _string.isMaxLength)(value, max)) {
      error = getErrorMessage('maxLength', msg).replace('{max}', "".concat(max));
    }

    return error;
  };
};
/**
 * Integer validation function.
 *
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.maxLength = maxLength;

var integer = function integer() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var allowEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !Number.isInteger(Number(value))) {
      error = getErrorMessage('integer', msg);
    }

    return error;
  };
};
/**
 * Number validator.
 *
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.integer = integer;

var numeric = function numeric() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var allowEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !(0, _number.isNumber)(value)) {
      error = getErrorMessage('numeric', msg);
    }

    return error;
  };
};
/**
 * Checks the value matches the specified pattern.
 *
 * @param {RegExp} regex
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.numeric = numeric;

var pattern = function pattern(regex) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !regex.test(value)) {
      error = getErrorMessage('pattern', msg);
    }

    return error;
  };
};
/**
 * Validate the value is one of the valid values.
 *
 * @param {Array} enumeration - Array of valid values allowed
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.pattern = pattern;

var oneOf = function oneOf(enumeration) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !~enumeration.indexOf(value)) {
      // eslint-disable-line
      error = getErrorMessage('oneOf', msg).replace('{values}', enumeration.join(', '));
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


exports.oneOf = oneOf;

var match = function match(field, msg) {
  return function (value, data) {
    var error = '';

    if (data && value !== data[field]) {
      error = getErrorMessage('match', msg);
    }

    return error;
  };
};
/**
 * Validates a name contains first name and last name.
 *
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.match = match;

var fullName = function fullName() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var allowEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';
    var name = (0, _parseFullName.parseFullName)(value || '');

    if ((0, _utils.isEmpty)(name.first) || (0, _utils.isEmpty)(name.last)) {
      error = getErrorMessage('fullName', msg);
    }

    return error;
  };
};
/**
 * Validates a date is valid.
 *
 * @param {String} dateFormat
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.fullName = fullName;

var validDate = function validDate(dateFormat) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !(0, _moment.default)(value, dateFormat).isValid()) {
      error = getErrorMessage('validateDate', msg);
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


exports.validDate = validDate;

var validDateRange = function validDateRange(field, dateFormat, msg) {
  return function (value, data) {
    var error = '';

    if (data && !(0, _utils.isEmpty)(data[field]) && !(0, _utils.isEmpty)(value) && !(0, _moment.default)(value, dateFormat).isAfter((0, _moment.default)(data[field], dateFormat))) {
      error = getErrorMessage('validDateRange', msg);
    }

    return error;
  };
};
/**
 * Validates a date is not before the min date.
 *
 * @param {String} minDateValue
 * @param {String} dateFormat
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.validDateRange = validDateRange;

var minDate = function minDate(minDateValue, dateFormat) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var allowEmpty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    if ((0, _utils.isEmpty)(value)) {
      return 'Enter a valid date.';
    }

    var date = (0, _moment.default)(value, dateFormat);

    if (!date.isValid()) {
      return 'Enter a valid date.';
    }

    var min = (0, _moment.default)(minDateValue, dateFormat);

    if (date.diff((0, _moment.default)(min, dateFormat), 'days') < 0) {
      return getErrorMessage('minDate', msg).replace('{min}', min.format(dateFormat));
    }

    return '';
  };
};
/**
 * Validates a date is not after the max date.
 *
 * @param {String} maxDateValue
 * @param {String} dateFormat
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.minDate = minDate;

var maxDate = function maxDate(maxDateValue, dateFormat) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var allowEmpty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    if ((0, _utils.isEmpty)(value)) {
      return 'Enter a valid date.';
    }

    var date = (0, _moment.default)(value, dateFormat);

    if (!date.isValid()) {
      return 'Enter a valid date.';
    }

    var max = (0, _moment.default)(maxDateValue, dateFormat);

    if (date.diff((0, _moment.default)(max, dateFormat), 'days') > 0) {
      return getErrorMessage('maxDate', msg).replace('{min}', max.format(dateFormat));
    }

    return '';
  };
};
/**
 * Validate a string is a numeric value of X characters long.
 *
 * @param {Number} length
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.maxDate = maxDate;

var numericLength = function numericLength(length) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';
    var normalizedValue = (0, _utils.isEmpty)(value) ? '' : "".concat(value);

    if ((0, _utils.isEmpty)(normalizedValue) || !(0, _number.isNumber)(normalizedValue) || normalizedValue.length !== length) {
      error = getErrorMessage('numericLength', msg).replace('{length}', "".concat(length));
    }

    return error;
  };
};
/**
 * Validate a value is greater or equal to min.
 *
 * @param {Number} min
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.numericLength = numericLength;

var minNumber = function minNumber(min) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    if ((0, _utils.isEmpty)(value) || !(0, _number.isNumber)(value)) {
      return 'Please enter a number';
    }

    if (value < min) {
      return getErrorMessage('minNumber', msg).replace('{min}', "".concat(min));
    }

    return '';
  };
};
/**
 * Validate a value is less or equal to max.
 *
 * @param {Number} max
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.minNumber = minNumber;

var maxNumber = function maxNumber(max) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    if ((0, _utils.isEmpty)(value) || !(0, _number.isNumber)(value)) {
      return 'Please enter a number';
    }

    if (value > max) {
      return getErrorMessage('maxNumber', msg).replace('{max}', "".concat(max));
    }

    return '';
  };
};
/**
 * Checks a value has at least the amount of numbers specified by length.
 *
 * @param {Number} length
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.maxNumber = maxNumber;

var numbersRequired = function numbersRequired(length) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !(0, _string.hasNumbers)(value, length)) {
      error = getErrorMessage('numbersRequired', msg).replace('{length}', "".concat(length));
    }

    return error;
  };
};
/**
 * Checks a value has at least the amount of special characters specified by length.
 *
 * @param {Number} length
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.numbersRequired = numbersRequired;

var specialCharsRequired = function specialCharsRequired(length) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || !(0, _string.hasSpecialChars)(value, length)) {
      error = getErrorMessage('specialCharsRequired', msg).replace('{length}', "".concat(length));
    }

    return error;
  };
};
/**
 * Creates a validation function using the specified rules.
 *
 * @param {Integer} specialCharsLength
 * @param {Integer} numbersLength
 * @param {Integer} passwordLength
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */


exports.specialCharsRequired = specialCharsRequired;

var validPassword = function validPassword(specialCharsLength, numbersLength, passwordLength) {
  var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var allowEmpty = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var specialCharsValidation = specialCharsRequired(specialCharsLength, undefined, allowEmpty);
  var numbersLengthValidation = numbersRequired(numbersLength, undefined, allowEmpty);
  var passwordLengthValidation = minLength(passwordLength, undefined, allowEmpty);
  return function (value) {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    var error = '';

    if ((0, _utils.isEmpty)(value) || specialCharsValidation(value) || numbersLengthValidation(value) || passwordLengthValidation(value)) {
      error = (0, _string.replaceArray)(getErrorMessage('passwordValidator', msg), ['{specialCharsLength}', '{numbersLength}', '{passwordLength}'], [specialCharsLength, numbersLength, passwordLength]);
    }

    return error;
  };
};
/**
 * Creates a validation function using the specified rules.
 *
 * @param {Object} rules
 */


exports.validPassword = validPassword;

var createValidator = function createValidator(rules) {
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

exports.createValidator = createValidator;