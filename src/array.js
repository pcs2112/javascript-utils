import cloneDeep from 'lodash/cloneDeep';
import { isEmpty } from './utils';

const isNodeExpanded = node => node.state && node.state.expanded;
const nodeHasChildren = node => node.children && node.children.length;

/**
 * Returns an array out duplicate values.
 *
 * @param {Array} arrArg
 */
export const arrayUnique = arrArg => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

/**
 * Converts a flat list into a hierarchy tree.
 *
 * @param {Array} list
 * @param {String} keyAttr
 * @param {String} parentAttr
 * @param {String} childrenAttr
 * @returns {Array}
 */
export const treeify = (list, keyAttr = 'id', parentAttr = 'parent', childrenAttr = 'children') => {
  const treeList = [];
  const newList = [];
  const lookup = {};

  list.forEach((obj) => {
    const newObj = cloneDeep(obj);
    lookup[newObj[keyAttr]] = newObj;
    newObj[childrenAttr] = [];
    newList.push(newObj);
  });

  newList.forEach((obj) => {
    const parentId = obj[parentAttr];
    if (!isEmpty(parentId) && parentId > 0) {
      lookup[parentId][childrenAttr].push(obj);
    } else {
      treeList.push(obj);
    }
  });

  return treeList;
};

/**
 * Flattens a tree.
 * @param {Array} nodes
 * @param {Array} parents
 * @returns {Array}
 */
export const untreeify = (nodes, parents = []) => (
  nodes.reduce((flattenedTree, node) => {
    const deepness = parents.length;
    const nodeWithHelpers = { ...node, deepness, parents };

    if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
      return [...flattenedTree, nodeWithHelpers];
    }

    return [
      ...flattenedTree,
      nodeWithHelpers,
      ...untreeify(node.children, [...parents, node.id])
    ];
  }, [])
);

/**
 * Finds the index of an object in a list. -1 is
 * returned if the object is not found.
 *
 * @param {Array<Object>} list
 * @param {String|Number} value
 * @param {String} key
 * @returns {Number}
 */
export const findObjIndexByValue = (list, value, key = 'id') => list.findIndex(item => item[key] === value);

/**
 * Replaces an object in a list and returns the new list.
 *
 * @param {Array<Object>} list
 * @param {Object} item
 * @param {String|Number} value
 * @param {String} key
 * @returns {undefined|Array<Object>}
 */
export const replaceObjByValue = (list, item, value, key = 'id') => {
  const index = findObjIndexByValue(list, value, key);
  if (index < 0) {
    return [...list];
  }

  const newList = [...list];
  newList[index] = item;

  return newList;
};
