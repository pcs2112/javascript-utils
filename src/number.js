import { isEmpty } from './utils';

const DBL_EPSILON = 2.2204460492503131e-16;

/**
 * Checks the specified value is a number.
 *
 * @param {String|Number} value
 * @returns {Boolean}
 */
export const isNumber = (value) => !isEmpty(value) && !isNaN(parseFloat(value)) && isFinite(value);

/**
 * Converts numerical string to a Number.
 *
 * @param {String|Number} value
 * @returns {Number}
 */
export const normalizeInputToInteger = (value) => isNumber(value) ? parseInt(value, 10) : value;

/**
 * Converts numerical string to a Number.
 *
 * @param {String|Number} value
 * @returns {Number}
 */
export const normalizeInputToFloat = (value) => isNumber(value) ? parseFloat(value) : value;

/**
 * Compares two floats for equality.
 * @param {Number} a
 * @param {Number} b
 * @param {Number|undefined} absoluteError
 * @param {Number|undefined} relativeError
 * @returns {boolean}
 */
export const almostEqual = (a, b, absoluteError = undefined, relativeError = undefined) => {
  const d = Math.abs(a - b);
  let normalizedAbsoluteError = absoluteError;
  let normalizedRelativeError = relativeError;

  if (normalizedAbsoluteError === undefined) {
    normalizedAbsoluteError = DBL_EPSILON;
  }

  if (relativeError === undefined) {
    normalizedRelativeError = normalizedAbsoluteError;
  }

  if (d <= normalizedAbsoluteError) {
    return true;
  }

  if (d <= normalizedRelativeError * Math.min(Math.abs(a), Math.abs(b))) {
    return true;
  }

  return a === b;
};

/**
 * Returns the calculated square feet based on the specified length and width.
 *
 * @param {Number} length
 * @param {Number} width
 * @returns {Number}
 */
export const calculateSquareFeet = (length, width) =>
  isNumber(length) && isNumber(width) ? length * width : 0;

/**
 * Returns the calculated cubic feet based on the specified length, width and height.
 *
 * @param {Number} length
 * @param {Number} width
 * @param {Number} height
 * @returns {Number}
 */
export const calculateCubicFeet = (length, width, height) =>
  isNumber(length) && isNumber(width) && isNumber(height) ? length * width * height : 0;

/**
 * Calculates a listing's cost.
 *
 * @param {Number} sqrFeetCost
 * @param {Number} length
 * @param {Number} width
 */
export const calculateEarnings = (sqrFeetCost, length, width) => calculateSquareFeet(length, width) * sqrFeetCost;

/**
 * Returns a random number of the specified digit length.
 * @param {Number} length
 * @returns {Number}
 */
export const getRandomNumber = (length) =>
  Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

/**
 * Returns the current page number from the
 * specified offset.
 *
 * @param {Number} offset
 * @param {Number} total
 * @return {Number}
 */
export const getCurrentPageFromOffset = (offset, total) => total < 1 ? 1 : Math.ceil(offset / total);
