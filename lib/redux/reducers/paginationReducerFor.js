"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = void 0;
var initialState = {
  startId: 0,
  pageSize: 100,
  count: 0
};
/**
 * Reusable factory reducer to set pagination data in a state.
 *
 * @param {String} actionType
 * @returns {Function}
 */

exports.initialState = initialState;

var paginationReducerFor = function paginationReducerFor(actionType) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var type = action.type,
        payload = action.payload;

    if (type === actionType) {
      var startElement = payload.startElement,
          pageSize = payload.pageSize,
          count = payload.count;
      return Object.assign({}, state, {
        startElement: startElement,
        pageSize: pageSize,
        count: count
      });
    }

    return state;
  };
};

var _default = paginationReducerFor;
exports.default = _default;