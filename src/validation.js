import moment from 'moment';
import { parseFullName } from 'parse-full-name';
import { isEmpty } from './utils';
import { isNumber } from './number';
import { isMaxLength, isMinLength, hasNumbers, hasSpecialChars, replaceArray } from './string';

const join = rules => (value, data) =>
  rules.map(rule => rule(value, data)).filter(error => !!error)[0];

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

/**
 * Email validation function.
 *
 * @param {String} msg
 */
export const email = msg => (value) => {
  let error = '';
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = msg || defaultMessages.email;
  }

  return error;
};

/**
 * Required value validation function.
 *
 * @param {String} msg
 */
export const required = msg => (value) => {
  let error = '';

  const isArray = Array.isArray(value);
  if ((isArray && value.length < 1) || (!isArray && isEmpty(value))) {
    error = msg || defaultMessages.required;
  }

  return error;
};

/**
 * String min length validation function.
 *
 * @param {Number} min - Minimum number of characters required
 * @param {String|undefined} msg
 */
export const minLength = (min, msg = undefined) => (value) => {
  let error = '';

  if (!isEmpty(value) && !isMinLength(value, min)) {
    error = (msg || defaultMessages.minLength).replace('{min}', `${min}`);
  }

  return error;
};

/**
 * String max length validation function.
 *
 * @param {Number} max - Max number of characters allowed
 * @param {String} msg
 */
export const maxLength = (max, msg) => (value) => {
  let error = '';

  if (!isEmpty(value) && !isMaxLength(value, max)) {
    error = (msg || defaultMessages.maxLength).replace('{max}', `${max}`);
  }

  return error;
};

/**
 * Integer validation function.
 *
 * @param {String} msg
 */
export const integer = msg => (value) => {
  let error = '';

  if (!Number.isInteger(Number(value))) {
    error = msg || defaultMessages.integer;
  }

  return error;
};

/**
 * Number validator.
 *
 * @param {String} msg
 */
export const numeric = msg => (value) => {
  let error = '';

  if (!isNumber(value)) {
    error = msg || defaultMessages.numeric;
  }

  return error;
};

/**
 * Checks the value matches the specified pattern.
 *
 * @param {RegExp} regex
 * @param {String} msg
 */
export const pattern = (regex, msg) => (value) => {
  let error = '';

  if (!regex.test(value)) {
    error = msg || defaultMessages.pattern;
  }

  return error;
};

/**
 * Validate the value is one of the valid values.
 *
 * @param {Array} enumeration - Array of valid values allowed
 * @param {String} msg
 */
export const oneOf = (enumeration, msg) => (value) => {
  let error = '';

  if (!~enumeration.indexOf(value)) { // eslint-disable-line
    error = (msg || defaultMessages.oneOf).replace('{values}', enumeration.join(', '));
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
    error = msg || defaultMessages.match;
  }

  return error;
};

/**
 * Validates a name contains first name and last name.
 *
 * @param {String} msg
 */
export const fullName = msg => (value) => {
  let error = '';

  const name = parseFullName(value || '');
  if (isEmpty(name.first) || isEmpty(name.last)) {
    error = msg || defaultMessages.fullName;
  }

  return error;
};

/**
 * Validates a date is valid.
 *
 * @param {String} dateFormat
 * @param {String} msg
 */
export const validDate = (dateFormat, msg) => (value) => {
  let error = '';

  if (!isEmpty(value) && !moment(value, dateFormat).isValid()) {
    error = msg || defaultMessages.validateDate;
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
    error = msg || defaultMessages.validDateRange;
  }

  return error;
};

/**
 * Validates a date is not before the min date.
 *
 * @param {String} minDateValue
 * @param {String} dateFormat
 * @param {String} msg
 */
export const minDate = (minDateValue, dateFormat, msg) => (value) => {
  if (isEmpty(value)) {
    return 'Enter a valid date.';
  }

  const date = moment(value, dateFormat);
  if (!date.isValid()) {
    return 'Enter a valid date.';
  }

  const min = moment(minDateValue, dateFormat);
  if (date.diff(moment(min, dateFormat), 'days') < 0) {
    return (msg || defaultMessages.minDate).replace('{min}', min.format(dateFormat));
  }

  return '';
};

/**
 * Validates a date is not after the max date.
 *
 * @param {String} maxDateValue
 * @param {String} dateFormat
 * @param {String} msg
 */
export const maxDate = (maxDateValue, dateFormat, msg) => (value) => {
  if (isEmpty(value)) {
    return 'Enter a valid date.';
  }

  const date = moment(value, dateFormat);
  if (!date.isValid()) {
    return 'Enter a valid date.';
  }

  const max = moment(maxDateValue, dateFormat);
  if (date.diff(moment(max, dateFormat), 'days') > 0) {
    return (msg || defaultMessages.minDate).replace('{min}', max.format(dateFormat));
  }

  return '';
};

/**
 * Validate a string is a numeric value of X characters long.
 *
 * @param {Number} length
 * @param {String} msg
 */
export const numericLength = (length, msg) => (value) => {
  let error = '';

  const normalizedValue = `${value}`;
  if (isEmpty(normalizedValue) || !isNumber(normalizedValue) || normalizedValue.length !== length) {
    error = (msg || defaultMessages.numericLength).replace('{length}', `${length}`);
  }

  return error;
};

/**
 * Validate a value is greater or equal to min.
 *
 * @param {Number} min
 * @param {String} msg
 */
export const minNumber = (min, msg) => (value) => {
  if (isEmpty(value) || !isNumber(value)) {
    return 'Please enter a number';
  }

  if (value < min) {
    return (msg || defaultMessages.minNumber).replace('{min}', `${min}`);
  }

  return '';
};

/**
 * Validate a value is less or equal to max.
 *
 * @param {Number} max
 * @param {String} msg
 */
export const maxNumber = (max, msg) => (value) => {
  if (isEmpty(value) || !isNumber(value)) {
    return 'Please enter a number';
  }

  if (value > max) {
    return (msg || defaultMessages.maxNumber).replace('{max}', `${max}`);
  }

  return '';
};

/**
 * Checks a value has at least the amount of numbers specified by length.
 *
 * @param {Number} length
 * @param {String|undefined} msg
 */
export const numbersRequired = (length, msg = undefined) => (value) => {
  let error = '';

  if (isEmpty(value) || !hasNumbers(value, length)) {
    error = (msg || defaultMessages.numbersRequired).replace('{length}', `${length}`);
  }

  return error;
};

/**
 * Checks a value has at least the amount of special characters specified by length.
 *
 * @param {Number} length
 * @param {String|undefined} msg
 */
export const specialCharsRequired = (length, msg = undefined) => (value) => {
  let error = '';

  if (isEmpty(value) || !hasSpecialChars(value, length)) {
    error = (msg || defaultMessages.specialCharsRequired).replace('{length}', `${length}`);
  }

  return error;
};

/**
 * Creates a validation function using the specified rules.
 *
 * @param {Integer} specialCharsLength
 * @param {Integer} numbersLength
 * @param {Integer} passwordLength
 * @param {String} msg
 */
export const validPassword = (specialCharsLength, numbersLength, passwordLength, msg) => {
  const specialCharsValidation = specialCharsRequired(specialCharsLength);
  const numbersLengthValidation = numbersRequired(numbersLength);
  const passwordLengthValidation = minLength(passwordLength);
  return (value) => {
    let error = '';
    if (specialCharsValidation(value) ||
      numbersLengthValidation(value) ||
      passwordLengthValidation(value)) {
      error = replaceArray(
        (msg || defaultMessages.passwordValidator),
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
    const error = rule(data[key], data);
    if (!isEmpty(error)) {
      errors[key] = error;
    }
  });

  return errors;
};
