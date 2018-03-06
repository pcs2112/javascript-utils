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
 * @param {String} string
 * @param {Integer} number
 * @returns {boolean}
 */
export const hasNumber = (string, number) => {
  let count = 0;
  [...string].forEach((char) => {
    if (isNumber(char)) {
      count++;
    }
  });
  return count >= number;
};


/**
 * Converts String to slug
 * @param {String} string
 *
 * @returns slug
 */

export const convertToSlug = (value) => {
  return value
    .toLowerCase()
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-');
};

export const decodeHtmlEntity = (str) => {
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });
};

export const encodeHtmlEntity = (str) => {
  const buf = [];
  for (let i = str.length - 1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
};

/**
 * Checks to see if string has at least n amount of numbers
 * @param {String} string
 * @param {Integer} number
 * @returns boolean
 */

export const hasSpecialChar = (string, number) => {
  let count = 0;
  const specialCharacters = [...'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'];
  specialCharacters.forEach((symbol) => {
    if (string.includes(symbol)) {
      count++;
    }
  });
  return count >= number;
}

/**
 * Checks to see if strings length is at least n
 * @param {String} string
 * @param {String} string
 * @returns boolean
 */

export const isMinLength = (string, number) => string.length >= number;

/**
 * Checks to see if string has a Capital letter in it
 * @param {String} string
 * @returns boolean
 */

export const hasCapital = string => string.toLowerCase() !== string;
