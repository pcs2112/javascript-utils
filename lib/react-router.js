'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactRouterFetch = undefined;

var _reactRouterConfig = require('react-router-config');

/**
 * Loads async data for react-router routes.
 *
 * @param {Object} routes
 * @param {Object} location
 * @returns {Promise}
 */

var reactRouterFetch = exports.reactRouterFetch = function reactRouterFetch(routes, location) {
  var branch = (0, _reactRouterConfig.matchRoutes)(routes, location.pathname);

  if (branch.length < 1) {
    return Promise.resolve();
  }

  var promises = branch.filter(function (_ref) {
    var route = _ref.route;
    return route && route.fetch;
  }).map(function (_ref2) {
    var route = _ref2.route,
        match = _ref2.match;
    return route.fetch(match, location);
  });

  if (promises && promises.length > 0) {
    return Promise.all(promises);
  }

  return Promise.resolve();
};