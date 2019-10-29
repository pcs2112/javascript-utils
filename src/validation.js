import moment from 'moment';
import _ from 'lodash';
import { parseFullName } from 'parse-full-name';
import { isEmpty } from './utils';
import { isNumber } from './number';
import { isMaxLength, isMinLength, hasNumbers, hasSpecialChars, replaceArray } from './string';

/**
 * Default validation messages.
 */
const defaultMessages = {
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
  passwordValidator: `Must have {specialCharsLength} special character(s), at least {numbersLength} 
  number(s), and needs to be a minimum length of {passwordLength} character(s) or longer.`
};

const join = rules => (value, data) =>
  rules.map(rule => rule(value, data)).filter(error => !!error)[0];

const isAllowEmpty = (allowEmpty, value) => allowEmpty && isEmpty(value);

const getErrorMessage = (type, msg) => (msg || defaultMessages[type]);

/**
 * Required value validation function.
 *
 * @param {String|undefined} msg
 */
export const required = (msg = undefined) => (value) => {
  let error = '';

  const isArray = Array.isArray(value);
  if ((isArray && value.length < 1) || (!isArray && isEmpty(value))) {
    error = getErrorMessage('required', msg);
  }

  return error;
};

/**
 * Email validation function.
 *
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const email = (msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = getErrorMessage('email', msg);
  }

  return error;
};

/**
 * String min length validation function.
 *
 * @param {Number} min - Minimum number of characters required
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const minLength = (min, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !isMinLength(value, min)) {
    error = getErrorMessage('minLength', msg).replace('{min}', `${min}`);
  }

  return error;
};

/**
 * String max length validation function.
 *
 * @param {Number} max - Max number of characters allowed
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const maxLength = (max, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !isMaxLength(value, max)) {
    error = getErrorMessage('maxLength', msg).replace('{max}', `${max}`);
  }

  return error;
};

/**
 * Integer validation function.
 *
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const integer = (msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !Number.isInteger(Number(value))) {
    error = getErrorMessage('integer', msg);
  }

  return error;
};

/**
 * Number validator.
 *
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const numeric = (msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !isNumber(value)) {
    error = getErrorMessage('numeric', msg);
  }

  return error;
};

/**
 * Checks the value matches the specified pattern.
 *
 * @param {RegExp} regex
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const pattern = (regex, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !regex.test(value)) {
    error = getErrorMessage('pattern', msg);
  }

  return error;
};

/**
 * Validate the value is one of the valid values.
 *
 * @param {Array} enumeration - Array of valid values allowed
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const oneOf = (enumeration, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !~enumeration.indexOf(value)) { // eslint-disable-line
    error = getErrorMessage('oneOf', msg).replace('{values}', enumeration.join(', '));
  }

  return error;
};

/**
 * Validates the values matches the value of the specified field.
 *
 * @param {String} field
 * @param {String} msg
 */
export const match = (field, msg) => (value, data) => {
  let error = '';

  if (data && value !== data[field]) {
    error = getErrorMessage('match', msg);
  }

  return error;
};

/**
 * Validates a name contains first name and last name.
 *
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const fullName = (msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  const name = parseFullName(value || '');
  if (isEmpty(name.first) || isEmpty(name.last)) {
    error = getErrorMessage('fullName', msg);
  }

  return error;
};

/**
 * Validates a date is valid.
 *
 * @param {String} dateFormat
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const validDate = (dateFormat, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !moment(value, dateFormat).isValid()) {
    error = getErrorMessage('validateDate', msg);
  }

  return error;
};

/**
 * Validates a date range is valid.
 *
 * @param {String} field
 * @param {String} dateFormat
 * @param {String} msg
 */
export const validDateRange = (field, dateFormat, msg) => (value, data) => {
  let error = '';

  if (data && !isEmpty(data[field]) && !isEmpty(value)
    && !moment(value, dateFormat).isAfter(moment(data[field], dateFormat))) {
    error = getErrorMessage('validDateRange', msg);
  }

  return error;
};

/**
 * Validates a date is not before the min date.
 *
 * @param {String} minDateValue
 * @param {String} dateFormat
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const minDate = (minDateValue, dateFormat, msg = undefined, allowEmpty = false) =>
  (value) => {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    if (isEmpty(value)) {
      return 'Enter a valid date.';
    }

    const date = moment(value, dateFormat);
    if (!date.isValid()) {
      return 'Enter a valid date.';
    }

    const min = moment(minDateValue, dateFormat);
    if (date.diff(moment(min, dateFormat), 'days') < 0) {
      return getErrorMessage('minDate', msg).replace('{min}', min.format(dateFormat));
    }

    return '';
  };

/**
 * Validates a date is not after the max date.
 *
 * @param {String} maxDateValue
 * @param {String} dateFormat
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const maxDate = (maxDateValue, dateFormat, msg = undefined, allowEmpty = false) =>
  (value) => {
    if (isAllowEmpty(allowEmpty, value)) {
      return '';
    }

    if (isEmpty(value)) {
      return 'Enter a valid date.';
    }

    const date = moment(value, dateFormat);
    if (!date.isValid()) {
      return 'Enter a valid date.';
    }

    const max = moment(maxDateValue, dateFormat);
    if (date.diff(moment(max, dateFormat), 'days') > 0) {
      return getErrorMessage('maxDate', msg).replace('{min}', max.format(dateFormat));
    }

    return '';
  };

/**
 * Validate a string is a numeric value of X characters long.
 *
 * @param {Number} length
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const numericLength = (length, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  const normalizedValue = isEmpty(value) ? '' : `${value}`;
  if (isEmpty(normalizedValue) || !isNumber(normalizedValue) || normalizedValue.length !== length) {
    error = getErrorMessage('numericLength', msg).replace('{length}', `${length}`);
  }

  return error;
};

/**
 * Validate a value is greater or equal to min.
 *
 * @param {Number} min
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const minNumber = (min, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  if (isEmpty(value) || !isNumber(value)) {
    return 'Please enter a number';
  }

  if (value < min) {
    return getErrorMessage('minNumber', msg).replace('{min}', `${min}`);
  }

  return '';
};

/**
 * Validate a value is less or equal to max.
 *
 * @param {Number} max
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const maxNumber = (max, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  if (isEmpty(value) || !isNumber(value)) {
    return 'Please enter a number';
  }

  if (value > max) {
    return getErrorMessage('maxNumber', msg).replace('{max}', `${max}`);
  }

  return '';
};

/**
 * Checks a value has at least the amount of numbers specified by length.
 *
 * @param {Number} length
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const numbersRequired = (length, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !hasNumbers(value, length)) {
    error = getErrorMessage('numbersRequired', msg).replace('{length}', `${length}`);
  }

  return error;
};

/**
 * Checks a value has at least the amount of special characters specified by length.
 *
 * @param {Number} length
 * @param {String|undefined} msg
 * @param {Boolean} allowEmpty
 */
export const specialCharsRequired = (length, msg = undefined, allowEmpty = false) => (value) => {
  if (isAllowEmpty(allowEmpty, value)) {
    return '';
  }

  let error = '';
  if (isEmpty(value) || !hasSpecialChars(value, length)) {
    error = getErrorMessage('specialCharsRequired', msg).replace('{length}', `${length}`);
  }

  return error;
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
export const validPassword =
  (specialCharsLength, numbersLength, passwordLength, msg = undefined, allowEmpty = false) => {
    const specialCharsValidation = specialCharsRequired(specialCharsLength, undefined, allowEmpty);
    const numbersLengthValidation = numbersRequired(numbersLength, undefined, allowEmpty);
    const passwordLengthValidation = minLength(passwordLength, undefined, allowEmpty);
    return (value) => {
      if (isAllowEmpty(allowEmpty, value)) {
        return '';
      }

      let error = '';
      if (isEmpty(value)
        || specialCharsValidation(value)
        || numbersLengthValidation(value)
        || passwordLengthValidation(value)) {
        error = replaceArray(
          getErrorMessage('passwordValidator', msg),
          ['{specialCharsLength}', '{numbersLength}', '{passwordLength}'],
          [specialCharsLength, numbersLength, passwordLength]
        );
      }

      return error;
    };
  };

/**
 * Creates a validation function using the specified rules.
 *
 * @param {Object} rules
 */
export const createValidator = rules => (data = {}) => {
  const errors = {};
  Object.keys(rules).forEach((key) => {
    const rule = join([].concat(rules[key]));
    const error = rule(_.get(data, key), data);
    if (!isEmpty(error)) {
      _.set(errors, key, error);
    }
  });

  return errors;
};
