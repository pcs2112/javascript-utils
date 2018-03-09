"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns the current page number from the
 * specified offset.
 *
 * @param {Number} offset - Pagination offset
 * @param {Number} limit - Items per page
 * @return {Number}
 */
var getCurrentPageFromOffset = exports.getCurrentPageFromOffset = function getCurrentPageFromOffset(offset, limit) {
  return Math.ceil((offset + limit) / limit);
};

/**
 * Returns the number of pages from a limit per page.
 *
 * @param {Number} limit - Items pear page
 * @param {Number} total - Total items
 * @return {Number}
 */
var getTotalPagesFromLimit = exports.getTotalPagesFromLimit = function getTotalPagesFromLimit(limit, total) {
  return total < 1 ? 0 : Math.ceil(total / limit);
};

/**
 * Returns the offset from the specified page number.
 *
 * @param {Number} page - Page number
 * @param {Number} limit - Items per page
 */
var getOffsetFromPageNumber = exports.getOffsetFromPageNumber = function getOffsetFromPageNumber(page, limit) {
  return (page - 1) * limit;
};