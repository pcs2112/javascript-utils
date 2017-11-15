/**
 * Returns true is the DOM is available. Returns
 * false when called in the server.
 *
 * @returns {Boolean}
 */
export const isDOMAvailable = () =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Returns the window's height.
 *
 * @returns {Number}
 */
export const getWindowHeight = () => {
  if (!isDOMAvailable()) {
    return 0;
  }

  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  return w.innerHeight || e.clientHeight || g.clientHeight;
};

/**
 * Returns the window's width.
 *
 * @returns {Number}
 */
export const getWindowWidth = () => {
  if (!isDOMAvailable()) {
    return 0;
  }

  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  return w.innerWidth || e.clientWidth || g.clientWidth;
};


/**
 * Returns the browser's document hidden property name.
 *
 * @returns {String}
 */
export const documentHiddenPropertyName = () => {
  let hidden = null;
  if (!isDOMAvailable()) {
    return hidden;
  }

  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
  }

  return hidden;
};
