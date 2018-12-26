"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPath = exports.parsePath = exports.stripTrailingSlash = exports.stripBasename = exports.hasBasename = exports.stripLeadingSlash = exports.addLeadingSlash = exports.getAllUrlParams = exports.removeURLParameter = exports.createUrl = exports.getQueryString = exports.getUrlPath = exports.addProtocol = void 0;

var _utils = require("./utils");

var addProtocol = function addProtocol(url) {
  var protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'http';

  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    return "".concat(protocol, "://").concat(url);
  }

  return url;
};
/**
 * Removes the protocol and hostname from a url.
 *
 * @param {String} url
 * @returns {String}
 */


exports.addProtocol = addProtocol;

var getUrlPath = function getUrlPath(url) {
  return url.replace(/^.*\/\/[^/]+/, '');
};
/**
 * Turns an object's keys into a query string.
 *
 * @param {object} params
 * @returns {string}
 */


exports.getUrlPath = getUrlPath;

var getQueryString = function getQueryString(params) {
  var str = '';
  Object.keys(params).forEach(function (key) {
    if (!(0, _utils.isEmpty)(params[key])) {
      if (str !== '') {
        str += '&';
      }

      str += "".concat(key, "=").concat(encodeURIComponent(params[key]));
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


exports.getQueryString = getQueryString;

var createUrl = function createUrl(path, params) {
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


exports.createUrl = createUrl;

var removeURLParameter = function removeURLParameter(url, parameter) {
  var urlParts = url.split('?');

  if (urlParts.length >= 2) {
    var prefix = "".concat(encodeURIComponent(parameter), "=");
    var pars = urlParts[1].split(/[&;]/g); // Reverse iteration as may be destructive

    for (var i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    return urlParts[0] + (pars.length > 0 ? "?".concat(pars.join('&')) : '');
  }

  return url;
};
/**
 * Parses params from url and returns and object.
 *
 * @param {String} url
 * @returns {Object|null}
 */


exports.removeURLParameter = removeURLParameter;

var getAllUrlParams = function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url.split('?')[1]; // we'll store the parameters here

  var obj = null; // if query string exists

  if (queryString) {
    obj = {}; // stuff after # is not part of query string, so get rid of it

    queryString = queryString.split('#')[0]; // eslint-disable-line
    // split our query string into its component parts

    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('='); // in case params look like: list[]=thing1&list[]=thing2

      var paramNum = null;
      var paramName = a[0].replace(/\[\d*\]/, function (v) {
        paramNum = v.slice(1, -1);
        return '';
      }); // set parameter value (use 'true' if empty)

      var paramValue = typeof a[1] === 'undefined' ? true : a[1]; // if parameter name already exists

      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        } // if no array index number specified...


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
/**
 * Adds a leading slash to the specified path.
 *
 * @param {String} path
 * @returns {String}
 */


exports.getAllUrlParams = getAllUrlParams;

var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : "/".concat(path);
};
/**
 * Removes the leading slash to the specified path.
 *
 * @param {String} path
 * @returns {String}
 */


exports.addLeadingSlash = addLeadingSlash;

var stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};
/**
 * Checks if the specified path has the specified prefix.
 *
 * @param {String} path
 * @param {String} prefix
 * @returns {String}
 */


exports.stripLeadingSlash = stripLeadingSlash;

var hasBasename = function hasBasename(path, prefix) {
  return new RegExp("^".concat(prefix, "(\\/|\\?|#|$)"), 'i').test(path);
};
/**
 * Removes the specified prefix from the specified path.
 *
 * @param {String} path
 * @param {String} prefix
 * @returns {String}
 */


exports.hasBasename = hasBasename;

var stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};
/**
 * Removes the trailing slash
 *
 * @param {String} path
 * @returns {String}
 */


exports.stripBasename = stripBasename;

var stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};
/**
 * Parses a url and returns its pathname, search and hash.
 *
 * @param {String} path
 * @returns {{pathname: (*|string), search: string, hash: string}}
 */


exports.stripTrailingSlash = stripTrailingSlash;

var parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};
/**
 * Creates a url from the specified location data.
 *
 * @param {Object} location
 * @returns {string}
 */


exports.parsePath = parsePath;

var createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';

  if (search && search !== '?') {
    path += search.charAt(0) === '?' ? search : "?".concat(search);
  }

  if (hash && hash !== '#') {
    path += hash.charAt(0) === '#' ? hash : "#".concat(hash);
  }

  return path;
};

exports.createPath = createPath;