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
 * Returns true if a string contains at least one number
 * @param {String} string
 *
 * @returns {boolean}
 */
export const hasNumber = (string) => {
  let result = false;
  const numbers = [...Array(10).keys()];
  numbers.forEach((num) => {
    if (string.includes(num)) {
      result = true;
    }
  });
  return result;
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

