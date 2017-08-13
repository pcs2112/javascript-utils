"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Executes a list of onEnter hook functions in parallel.
 *
 * @param {Array} hooks - Array of hook functions
 */
var composeEnterHooksParallel = exports.composeEnterHooksParallel = function composeEnterHooksParallel(hooks) {
  var callbacksRequired = hooks.reduce(function (totalCallbacks, hook) {
    if (hook.length >= 3) {
      totalCallbacks++; // eslint-disable-line no-param-reassign
    }
    return totalCallbacks;
  }, 0);

  return function onEnter(nextState, replace, next) {
    var _this = this;

    var callbacksInvoked = 0;
    hooks.forEach(function (hook) {
      hook.call(_this, nextState, replace, function () {
        if (++callbacksInvoked === callbacksRequired) {
          next();
        }
      });
    });

    if (!callbacksRequired) {
      next();
    }
  };
};

/**
 * Executes a list of onEnter hook functions.
 *
 * @param {Array} hooks - Array of hook functions
 */
var composeEnterHooksSeries = exports.composeEnterHooksSeries = function composeEnterHooksSeries(hooks) {
  return function (nextState, replace, next) {
    (function executeHooksSynchronously(remainingHooks) {
      if (!remainingHooks.length) {
        return next();
      }

      var nextHook = remainingHooks[0];
      if (nextHook.length >= 3) {
        nextHook.call(this, nextState, replace, function () {
          executeHooksSynchronously(remainingHooks.slice(1));
        });
      } else {
        nextHook.call(this, nextState, replace);
        executeHooksSynchronously(remainingHooks.slice(1));
      }
    })(hooks);
  };
};