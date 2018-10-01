'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var settings = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no';

var getPopupOffset = function getPopupOffset(_ref) {
  var width = _ref.width,
      height = _ref.height;

  var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  var wTop = window.screenTop ? window.screenTop : window.screenY;

  var left = wLeft + window.innerWidth / 2 - width / 2; // eslint-disable-line
  var top = wTop + window.innerHeight / 2 - height / 2; // eslint-disable-line

  return { top: top, left: left };
};

var getPopupSize = function getPopupSize(provider) {
  switch (provider) {
    case 'facebook':
      return { width: 580, height: 400 };
    case 'google':
      return { width: 452, height: 633 };
    case 'twitter':
      return { width: 495, height: 645 };
    case 'instagram':
      return { width: 500, height: 560 };
    default:
      return { width: 1020, height: 618 };
  }
};

var getPopupDimensions = function getPopupDimensions(provider) {
  var _getPopupSize = getPopupSize(provider),
      width = _getPopupSize.width,
      height = _getPopupSize.height;

  var _getPopupOffset = getPopupOffset({ width: width, height: height }),
      top = _getPopupOffset.top,
      left = _getPopupOffset.left;

  return 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
};

exports.default = function (provider, url) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '_blank';
  return window.open(url, name, provider !== 'newTab' ? settings + ',' + getPopupDimensions(provider) : '');
};

module.exports = exports.default;