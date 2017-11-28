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
  const branch = matchRoutes(routes, typeof location === 'string' ? location : location.pathname);

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
