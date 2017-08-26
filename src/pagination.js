/**
 * Returns the current page number from the
 * specified offset.
 *
 * @param {Number} offset - Pagination offset
 * @param {Number} limit - Items per page
 * @return {Number}
 */
export const getCurrentPageFromOffset = (offset, limit) => offset + limit / limit;

/**
 * Returns the number of pages from a limit per page.
 *
 * @param {Number} limit - Items pear page
 * @param {Number} total - Total items
 * @return {Number}
 */
export const getTotalPagesFromLimit = (limit, total) => total < 1 ? 0 : Math.ceil(total / limit);

/**
 * Returns the offset from the specified page number.
 *
 * @param {Number} page - Page number
 * @param {Number} limit - Items per page
 */
export const getOffsetFromPageNumber = (page, limit) => (page - 1) * limit;
