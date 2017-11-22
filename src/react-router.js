import { matchRoutes } from 'react-router-config';

export const reactRouterFetch = (routes, location, options) => {
  const branch = matchRoutes(routes, location.pathname);

  if (branch.length < 1) {
    return Promise.resolve();
  }

  const promises = branch
    .filter(({ route }) => route.component && route.component.fetch)
    .map(({ route, match }) => route.component.fetch(match, location, options));

  if (promises && promises.length > 0) {
    return Promise.all(promises);
  }

  return Promise.resolve();
};
