"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffsetFromPageNumber = exports.getTotalPagesFromLimit = exports.getCurrentPageFromOffset = void 0;

/**
 * Returns the current page number from the
 * specified offset.
 *
 * @param {Number} offset - Pagination offset
 * @param {Number} limit - Items per page
 * @return {Number}
 */
var getCurrentPageFromOffset = function getCurrentPageFromOffset(offset, limit) {
  return Math.ceil((offset + limit) / limit);
};
/**
 * Returns the number of pages from a limit per page.
 *
 * @param {Number} limit - Items pear page
 * @param {Number} total - Total items
 * @return {Number}
 */


exports.getCurrentPageFromOffset = getCurrentPageFromOffset;

var getTotalPagesFromLimit = function getTotalPagesFromLimit(limit, total) {
  return total < 1 ? 0 : Math.ceil(total / limit);
};
/**
 * Returns the offset from the specified page number.
 *
 * @param {Number} page - Page number
 * @param {Number} limit - Items per page
 */


exports.getTotalPagesFromLimit = getTotalPagesFromLimit;

var getOffsetFromPageNumber = function getOffsetFromPageNumber(page, limit) {
  return (page - 1) * limit;
};

exports.getOffsetFromPageNumber = getOffsetFromPageNumber;