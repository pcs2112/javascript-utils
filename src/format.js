import { isEmpty } from './utils';

/**
 * Formats the specified number.
 * @param {Number} num
 * @returns {String}
 */
export const formatNumber = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

/**
 * Formats the specified number to currency.
 *
 * @param {Number} num
 * @returns {String}
 */
export const formatCurrency = (num) => '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

/**
 * Returns the location from and address.
 *
 * @param {Object} address
 * @returns {String}
 */
export const formatAddress = (address) => {
  if (typeof address !== 'object') {
    return '';
  }

  let result = '';
  if (address.addressLine1) {
    result += address.addressLine1 + ', ';
  }

  if (address.addressLine2) {
    result += address.addressLine2 + ', ';
  }

  if (address.city) {
    result += address.city + ', ';
  }

  if (address.state) {
    result += address.state + ' ';
  }

  if (address.zip) {
    result += address.zip + '';
  }

  return result;
};

/**
 * Converts a file size in bytes to a readable human format.
 *
 * @param {Number} bytes
 * @param {Number} decimals
 * @returns {String}
 */
export const formatBytes = (bytes, decimals = 0) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1000;
  const dm = decimals + 1 || 3;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Converts the specified seconds to a time format (hh:mm:ss).
 *
 * @param {Number} originalSeconds
 * @returns {String}
 */
export const formatSecondsToTime = (originalSeconds) => {
  let seconds = originalSeconds;
  const hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - (hours * 3600)) / 60);
  seconds = seconds - (hours * 3600) - (minutes * 60);
  let time = '';

  if (hours !== 0) {
    time = hours + '+';
  }

  if (minutes !== 0 || time !== '') {
    minutes = (minutes < 10 && time !== '') ? '0' + minutes : String(minutes);
    time += minutes + ':';
  }

  if (time === '') {
    time = '0:' + (seconds < 10 ? '0' + seconds : seconds);
  } else {
    time += (seconds < 10) ? '0' + seconds : String(seconds);
  }

  return time;
};

/**
 * Formats a phone number value.
 * @param {String} value
 * @returns {String}
 */
export const formatPhoneNumber = (value) => {
  const numbers = value.replace(/\D/g, '');
  const char = {0: '(', 3: ') ', 6: ' - '};

  let formattedValue = '';
  for (let i = 0; i < numbers.length; i++) {
    formattedValue += (char[i] || '') + numbers[i];
  }

  return formattedValue;
};

/**
 * Converts to anchor tags urls found in the
 * specified string.
 *
 * @param {String} str
 * @returns {String}
 */
export const linkify = (str) => {
  // http://, https://, ftp://
  const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim;

  // www. sans http:// or https://
  const pseudoUrlPattern = /(^|[^/])(www\.[\S]+(\b|$))/gim;

  // Email addresses
  const emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

  return str
    .replace(urlPattern, '<a href="$&">$&</a>')
    .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
    .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
};

/**
 * Converts the specified string to html.
 *
 * @param {String} str
 * @returns {String}
 */
export const textToHtml = (str) => !isEmpty(str) ? linkify(str.replace(/(?:\r\n|\r|\n)/g, '<br />')) : '';

/**
 * Truncates a string and appends an ellipsis at the end of the string.
 *
 * @param {String} str
 * @param {Number} limit
 * @param {String} ellipsis
 * @returns {String}
 */
export const truncateText = (str, limit = 50, ellipsis = '...') =>
  str.length > limit ? str.substring(0, limit) + ellipsis : str;

/**
 * Formats a credit card number to only show the last
 * four digits.
 *
 * @param {String|Number} creditCardNumber
 * @returns {String}
 */
export const formatCreditCardNumber = (creditCardNumber) => {
  const result = ('' + creditCardNumber).trim().slice(-4);
  if (result.length !== 4) {
    return '';
  }

  return `xxxx-xxxx-xxxx-${result}`;
};

/**
 * Returns a person's full name base on the
 * firstName and lastName arguments.
 *
 * @param {String} firstName
 * @param {String} lastName
 * @returns {String}
 */
export const getFullName = (firstName, lastName) => {
  let fullName = firstName;
  if (isEmpty(lastName)) {
    fullName += ' ' + lastName;
  }

  return fullName;
};
