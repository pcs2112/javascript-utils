import { isNumber } from './number';

/**
 * Converts the first letter of a string to uppercase.
 *
 * @param {String} value
 * @returns {String}
 */
export const ucfirst = value => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Strip whitespace from the beginning and end of a string.
 *
 * @param {String} value
 * @returns {String}
 */
export const trim = value => value.replace(/^\s+|\s+$/g, '');

/**
 * Strip whitespace from the beginning of a string.
 *
 * @param {String} value
 * @returns {String}
 */
export const ltrim = value => value.replace(/^\s+/, '');

/**
 * Strip whitespace from the end of a string.
 *
 * @param {String} value
 * @returns {String}
 */
export const rtrim = value => value.replace(/\s+$/, '');

/**
 * Replace all occurrences of the values in the search array with the replacement values
 * from the replace array.
 *
 * @param {String} value
 * @param {Array} search
 * @param {Array} replace
 * @returns {String}
 */
export const replaceArray = (value, search, replace) => {
  let replaceString = value;
  let regex;
  for (let i = 0; i < search.length; i++) {
    regex = new RegExp(search[i], 'g');
    replaceString = replaceString.replace(regex, replace[i]);
  }

  return replaceString;
};

/**
 * Uppercase the first character of each word in a string
 * @param {String} value
 *
 * @returns {String}
 */
export const ucwords = (value) => {
  const str = `${value}`;
  return str.replace(/^(.)|\s+(.)/g, $1 => $1.toUpperCase());
};

/**
 * Checks to see if string has at least n amount of numbers
 * @param {String} value
 * @param {Integer} number
 * @returns {boolean}
 */
export const hasNumbers = (value, number) => {
  let count = 0;
  [...value].forEach((char) => {
    if (isNumber(char)) {
      count++;
    }
  });
  return count >= number;
};

/**
 * Converts the specifed value to a slug.
 *
 * @param {String} value
 * @returns {String}
 */
export const convertToSlug = value => value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

/**
 * Checks to see if value has at least n amount of special Characters.
 *
 * @param {String} value
 * @param {Number} number
 * @returns boolean
 */
export const hasSpecialChars = (value, number) => {
  let count = 0;
  const specialCharacters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  const stringArray = [...value];
  stringArray.forEach((char) => {
    if (specialCharacters.includes(char)) {
      count++;
    }
  });
  return count >= number;
};

/**
 * Checks the specified value's length is greater or equal than
 * the specified length.
 *
 * @param {String} value
 * @param {Number} minLength
 * @returns {Boolean}
 */
export const isMinLength = (value, minLength) => value.length >= minLength;

/**
 * Checks the specified value's is less or equal than
 * the specified length.
 *
 * @param {String} value
 * @param {Number} maxLength
 * @returns {Boolean}
 */
export const isMaxLength = (value, maxLength) => value.length <= maxLength;

/**
 * Shorten a string to less than maxLen characters without truncating words.
 *
 * @param {String} value
 * @param {Number} maxLength
 * @param {String} ellipsis
 * @param {String} separator
 * @returns {*}
 */
export const shorten = (value, maxLength, ellipsis = '...', separator = ' ') => {
  if (value.length <= maxLength) {
    return value;
  }

  return value.substr(0, value.lastIndexOf(separator, maxLength)) + ellipsis;
};
