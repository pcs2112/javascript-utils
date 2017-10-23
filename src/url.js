import { isEmpty } from './utils';

export const addProtocol = (url, protocol = 'http') => {
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    return `${protocol}://${url}`;
  }

  return url;
};

/**
 * Removes the protocol and hostname from a url.
 *
 * @param {String} url
 * @returns {String}
 */
export const getUrlPath = url => url.replace(/^.*\/\/[^/]+/, '');

/**
 * Turns an object's keys into a query string.
 *
 * @param {object} params
 * @returns {string}
 */
export const getQueryString = (params) => {
  let str = '';
  Object.keys(params).forEach((key) => {
    if (!isEmpty(params[key])) {
      if (str !== '') {
        str += '&';
      }

      str += `${key}=${encodeURIComponent(params[key])}`;
    }
  });

  return str;
};

/**
 * Creates a url using the specified path and params.
 *
 * @param {string} path
 * @param {object} params
 * @returns {string}
 */
export const createUrl = (path, params) => {
  let query = '';
  if (params) {
    query = getQueryString(params);
    if (query !== '') {
      query = (path.indexOf('?') > -1 ? '&' : '?') + query;
    }
  }

  return path + query;
};

/**
 * Removes the specified parameter from url.
 *
 * @param {String} url
 * @param {String} parameter
 * @returns {String}
 */
export const removeURLParameter = (url, parameter) => {
  const urlParts = url.split('?');
  if (urlParts.length >= 2) {
    const prefix = `${encodeURIComponent(parameter)}=`;
    const pars = urlParts[1].split(/[&;]/g);

    // Reverse iteration as may be destructive
    for (let i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    return urlParts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '');
  }

  return url;
};

/**
 * Parses params from url and returns and object.
 *
 * @param {String} url
 * @returns {Object|null}
 */
export const getAllUrlParams = (url) => {
  // get query string from url (optional) or window
  let queryString = url.split('?')[1];

  // we'll store the parameters here
  let obj = null;

  // if query string exists
  if (queryString) {
    obj = {};

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0]; // eslint-disable-line

    // split our query string into its component parts
    const arr = queryString.split('&');

    for (let i = 0; i < arr.length; i++) {
      // separate the keys and the values
      const a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      let paramNum = null;
      const paramName = a[0].replace(/\[\d*\]/, (v) => {
        paramNum = v.slice(1, -1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      const paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (paramNum === null) {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        } else { // if array index number specified...
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      } else { // if param name doesn't exist yet, set it
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
};
