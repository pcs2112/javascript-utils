/**
 * Executes a list of onEnter hook functions in parallel.
 *
 * @param {Array} hooks - Array of hook functions
 */
export const composeEnterHooksParallel = (hooks) => {
  const callbacksRequired = hooks.reduce((totalCallbacks, hook) => {
    if (hook.length >= 3) {
      totalCallbacks++; // eslint-disable-line no-param-reassign
    }
    return totalCallbacks;
  }, 0);

  return function onEnter(nextState, replace, next) {
    let callbacksInvoked = 0;
    hooks.forEach((hook) => {
      hook.call(this, nextState, replace, () => {
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
export const composeEnterHooksSeries = (hooks) => (nextState, replace, next) => {
  (function executeHooksSynchronously(remainingHooks) {
    if (!remainingHooks.length) {
      return next();
    }

    const nextHook = remainingHooks[0];
    if (nextHook.length >= 3) {
      nextHook.call(this, nextState, replace, () => {
        executeHooksSynchronously(remainingHooks.slice(1));
      });
    } else {
      nextHook.call(this, nextState, replace);
      executeHooksSynchronously(remainingHooks.slice(1));
    }
  })(hooks);
};
