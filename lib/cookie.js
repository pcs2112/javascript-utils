"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  var str = "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(value));

  var opts = _objectSpread({}, options);

  if (value === null) {
    opts.maxage = -1;
  }

  if (opts.maxage) {
    var date = new Date();
    date.setTime(date.getTime() + opts.maxage * 24 * 60 * 60 * 1000);
    opts.expires = date;
  }

  if (opts.path) {
    str += "; path=".concat(opts.path);
  }

  if (opts.domain) {
    str += "; domain=".concat(opts.domain);
  }

  if (opts.expires) {
    str += "; expires=".concat(opts.expires.toUTCString());
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

var _default = function _default(name, value, options) {
  if (typeof value === 'undefined') {
    return get(name);
  }

  return set(name, value, options);
};

exports["default"] = _default;
module.exports = exports.default;