/* eslint consistent-return: 0 */
import moment from 'moment';
import { parseFullName } from 'parse-full-name';
import { isEmpty } from './utils';
import { isNumber } from './number';

const join = rules => (value, data) =>
  rules.map(rule => rule(value, data)).filter(error => !!error)[0/* first error */];

/**
 * Default validation messages
 */
const validationMessages = {
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
export const email = msg => (value) => {
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return msg || validationMessages.email;
  }
};

/**
 * Required value validation function.
 * @param {String} msg
 */
export const required = msg => (value) => {
  const isArray = Array.isArray(value);
  if ((isArray && value.length < 1) || (!isArray && isEmpty(value))) {
    return msg || validationMessages.required;
  }
};

/**
 * String min length validation function.
 * @param {Number} min - Minimum number of characters required
 * @param {String} msg
 */
export const minLength = (min, msg) => (value) => {
  if (!isEmpty(value) && value.length < min) {
    return (msg || validationMessages.minLength).replace('{min}', min);
  }
};

/**
 * String max length validation function.
 * @param {Number} max - Max number of characters allowed
 * @param {String} msg
 */
export const maxLength = (max, msg) => (value) => {
  if (!isEmpty(value) && value.length > max) {
    return (msg || validationMessages.maxLength).replace('{max}', max);
  }
};

/**
 * Integer validation function.
 * @param {String} msg
 */
export const integer = msg => (value) => {
  if (!Number.isInteger(Number(value))) {
    return msg || validationMessages.integer;
  }
};

/**
 * Number validator.
 * @param {String} msg
 */
export const numeric = msg => (value) => {
  if (!isNumber(value)) {
    return msg || validationMessages.numeric;
  }
};

/**
 * Checks the value matches the specified pattern.
 * @param {RegExp} regex
 * @param {String} msg
 */
export const pattern = (regex, msg) => (value) => {
  if (!regex.test(value)) {
    return msg || validationMessages.pattern;
  }
};

/**
 * Validate the value is one of the valid values.
 * @param {Array} enumeration - Array of valid values allowed
 * @param {String} msg
 */
export const oneOf = (enumeration, msg) => (value) => {
  if (!~enumeration.indexOf(value)) { // eslint-disable-line
    return (msg || validationMessages.oneOf).replace('{values}', enumeration.join(', '));
  }
};

/**
 * Validates the values matches the value of the specified field.
 * @param {String} field
 * @param {String} msg
 */
export const match = (field, msg) => (value, data) => {
  if (data && value !== data[field]) {
    return msg || validationMessages.match;
  }
};

/**
 * Validates a name contains first name and last name.
 * @param {String} msg
 */
export const fullName = msg => (value) => {
  if (isEmpty(value)) {
    return msg || validationMessages.fullName;
  }

  const name = parseFullName(value || '');
  if (isEmpty(name.first) || isEmpty(name.last)) {
    return msg || validationMessages.fullName;
  }
};

/**
 * Validates a date is valid.
 * @param {String} dateFormat
 * @param {String} msg
 */
export const validDate = (dateFormat, msg) => (value) => {
  if (!isEmpty(value) && !moment(value, dateFormat).isValid()) {
    return msg || validationMessages.validateDate;
  }
};

/**
 * Validates a date range is valid.
 * @param {String} field
 * @param {String} dateFormat
 * @param {String} msg
 */
export const validDateRange = (field, dateFormat, msg) => (value, data) => {
  if (data && !isEmpty(data[field]) && !isEmpty(value)
    && !moment(value, dateFormat).isAfter(moment(data[field], dateFormat))) {
    return msg || validationMessages.validDateRange;
  }
};

/**
 * Validates a date is not before the min date.
 * @param {String} minDateValue
 * @param {String} dateFormat
 * @param {String} msg
 */
export const minDate = (minDateValue, dateFormat, msg) => (value) => {
  if (isEmpty(value)) {
    return 'Enter a valid date';
  }

  const date = moment(value, dateFormat);
  if (!date.isValid()) {
    return 'Enter a valid date';
  }

  const min = moment(minDateValue, dateFormat);
  if (date.diff(moment(min, dateFormat), 'days') < 0) {
    return (msg || validationMessages.minDate).replace('{min}', min.format(dateFormat));
  }
};

/**
 * Validates a date is not after the max date.
 * @param {String} maxDateValue
 * @param {String} dateFormat
 * @param {String} msg
 */
export const maxDate = (maxDateValue, dateFormat, msg) => (value) => {
  if (isEmpty(value)) {
    return 'Enter a valid date';
  }

  const date = moment(value, dateFormat);
  if (!date.isValid()) {
    return 'Enter a valid date';
  }

  const max = moment(maxDateValue, dateFormat);
  if (date.diff(moment(max, dateFormat), 'days') > 0) {
    return (msg || validationMessages.minDate).replace('{min}', max.format(dateFormat));
  }
};

/**
 * Validate a string is a numeric value of X characters long.
 * @param {Number} length
 * @param {String} msg
 */
export const numericLength = (length, msg) => (value) => {
  const normalizedValue = `${value}`;
  if (isEmpty(normalizedValue) || !isNumber(normalizedValue) || normalizedValue.length !== length) {
    return (msg || validationMessages.numericLength).replace('{length}', numericLength);
  }
};

/**
 * Validate a value is greater or equal to min.
 * @param {Number} min
 * @param {String} msg
 */
export const minNumber = (min, msg) => (value) => {
  if (isEmpty(value) || !isNumber(value)) {
    return 'Please enter a number';
  }

  if (value < min) {
    return (msg || validationMessages.minNumber).replace('{min}', min);
  }
};

/**
 * Validate a value is less or equal to max.
 * @param {Number} max
 * @param {String} msg
 */
export const maxNumber = (max, msg) => (value) => {
  if (isEmpty(value) || !isNumber(value)) {
    return 'Please enter a number';
  }

  if (value > max) {
    return (msg || validationMessages.maxNumber).replace('{max}', max);
  }
};

export const createValidator = rules => (data = {}) => {
  const errors = {};
  Object.keys(rules).forEach((key) => {
    const rule = join([].concat(rules[key]));
    const error = rule(data[key], data);
    if (error) {
      errors[key] = error;
    }
  });
  return errors;
};
