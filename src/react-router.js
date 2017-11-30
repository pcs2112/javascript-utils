import { matchRoutes } from 'react-router-config';

/**
 * Loads async data for react-router routes.
 *
 * @param {Object} routes
 * @param {String|Object} location
 * @param {Object} options
 * @returns {Promise}
 */

export const reactRouterFetch = (routes, location, options) => {
  let pathname;
  if (typeof location === 'string') {
    pathname = location.indexOf('?') > -1 ? location.split('?')[0] : location;
  } else {
    pathname = location.pathname; // eslint-disable-line
  }

  const branch = matchRoutes(routes, pathname);

  if (branch.length < 1) {
    return Promise.resolve();
  }

  const promises = branch
    .filter(({ route }) => route && route.fetch)
    .map(({ route, match }) => route.fetch(match, location, options));

  if (promises && promises.length > 0) {
    return Promise.all(promises);
  }

  return Promise.resolve();
};
