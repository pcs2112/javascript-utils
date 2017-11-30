import { matchRoutes } from 'react-router-config';

/**
 * Loads async data for react-router routes.
 *
 * @param {Object} routes
 * @param {Object} location
 * @returns {Promise}
 */

export const reactRouterFetch = (routes, location) => {
  const branch = matchRoutes(routes, location.pathname);

  if (branch.length < 1) {
    return Promise.resolve();
  }

  const promises = branch
    .filter(({ route }) => route && route.fetch)
    .map(({ route, match }) => route.fetch(match, location));

  if (promises && promises.length > 0) {
    return Promise.all(promises);
  }

  return Promise.resolve();
};
