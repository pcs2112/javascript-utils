/**
 * Checks the specified value is empty.
 *
 * @param {String|undefined|null} value
 * @returns {Boolean}
 */
export const isEmpty = value => value === undefined || value === null || value === '';

/**
 * Checks the specified value is undefined.
 *
 * @param {String|Number|Object|undefined|null} value
 * @returns {Boolean}
 */
export const isUndefined = value => typeof value === 'undefined' || value === null;

/**
 * Joins an array of css class names and returns the concatenated class name.
 *
 * @param {Array} names
 * @returns {String}
 */
export const classNames = names => names.filter(className => !!className).join(' ');

/**
 * Tells us if input looks like promise or not.
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
export const isPromise = obj => typeof obj === 'object' && obj && obj.then instanceof Function;

/**
 * Checks the obj has the specified property.
 *
 * @param {Object} obj
 * @param {String} prop
 * @returns {Boolean}
 */
export const objectHasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
 * Delays execution of code by the specified amount of microseconds.
 *
 * @param {Number} ms
 * @returns {Promise}
 */
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
