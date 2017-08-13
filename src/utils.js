/**
 * Checks the specified value is empty.
 *
 * @param {String|undefined|null} value
 * @returns {Boolean}
 */
export const isEmpty = (value) => value === undefined || value === null || value === '';

/**
 * Checks the specified value is undefined.
 *
 * @param {String|Number|Object|undefined|null} value
 * @returns {Boolean}
 */
export const isUndefined = (value) => typeof value === 'undefined';

/**
 * Joins an array of css class names and returns the concatenated class name.
 *
 * @param {Array} names
 * @returns {String}
 */
export const classNames = (names) => names.filter((className) => !!className).join(' ');
