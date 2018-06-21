'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var parse = function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);

  if (!pairs[0]) {
    return obj;
  }

  pairs.forEach(function (pair) {
    var pairParts = pair.split('=');
    obj[decodeURIComponent(pairParts[0])] = decodeURIComponent(pairParts[1]);
  });

  return obj;
};

var set = function set(name, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  var opts = _extends({}, options);
  if (value === null) {
    opts.maxage = -1;
  }

  if (opts.maxage) {
    var date = new Date();
    date.setTime(date.getTime() + opts.maxage * 24 * 60 * 60 * 1000);
    opts.expires = date;
  }

  if (opts.path) {
    str += '; path=' + opts.path;
  }

  if (opts.domain) {
    str += '; domain=' + opts.domain;
  }

  if (opts.expires) {
    str += '; expires=' + opts.expires.toUTCString();
  }

  if (opts.secure) {
    str += '; secure';
  }

  document.cookie = str;
};

var get = function get(name) {
  var cookies = parse(document.cookie);
  return !name ? cookies : cookies[name];
};

exports.default = function (name, value, options) {
  if (typeof value === 'undefined') {
    return get(name);
  }

  return set(name, value, options);
};

module.exports = exports['default'];