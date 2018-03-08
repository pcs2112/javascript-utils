/**
 * Returns an array out duplicate values.
 *
 * @param {Array} arrArg
 */
export const arrayUnique = arrArg => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
