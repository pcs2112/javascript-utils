'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUrlParams = exports.removeURLParameter = exports.createUrl = exports.getQueryString = exports.getUrlPath = exports.addProtocol = undefined;

var _utils = require('./utils');

var addProtocol = exports.addProtocol = function addProtocol(url) {
  var protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'http';

  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    return protocol + '://' + url;
  }

  return url;
};

/**
 * Removes the protocol and hostname from a url.
 *
 * @param {String} url
 * @returns {String}
 */
var getUrlPath = exports.getUrlPath = function getUrlPath(url) {
  return url.replace(/^.*\/\/[^/]+/, '');
};

/**
 * Turns an object's keys into a query string.
 *
 * @param {object} params
 * @returns {string}
 */
var getQueryString = exports.getQueryString = function getQueryString(params) {
  var str = '';
  for (var key in params) {
    if (!(0, _utils.isEmpty)(params[key])) {
      if (str !== '') {
        str += '&';
      }

      str += key + '=' + encodeURIComponent(params[key]);
    }
  }

  return str;
};

/**
 * Creates a url using the specified path and params.
 *
 * @param {string} path
 * @param {object} params
 * @returns {string}
 */
var createUrl = exports.createUrl = function createUrl(path, params) {
  var query = '';
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
var removeURLParameter = exports.removeURLParameter = function removeURLParameter(url, parameter) {
  var urlParts = url.split('?');
  if (urlParts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlParts[1].split(/[&;]/g);

    // Reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    return urlParts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }

  return url;
};

/**
 * Parses params from url and returns and object.
 *
 * @param {String} url
 * @returns {Object|null}
 */
var getAllUrlParams = exports.getAllUrlParams = function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url.split('?')[1];

  // we'll store the parameters here
  var obj = null;

  // if query string exists
  if (queryString) {
    obj = {};

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = null;
      var paramName = a[0].replace(/\[\d*\]/, function (v) {
        paramNum = v.slice(1, -1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof a[1] === 'undefined' ? true : a[1];

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
        } else {
          // if array index number specified...
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      } else {
        // if param name doesn't exist yet, set it
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
};