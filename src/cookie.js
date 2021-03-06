const parse = (str) => {
  const obj = {};
  const pairs = str.split(/ *; */);

  if (!pairs[0]) {
    return obj;
  }

  pairs.forEach((pair) => {
    const pairParts = pair.split('=');
    obj[decodeURIComponent(pairParts[0])] = decodeURIComponent(pairParts[1]);
  });

  return obj;
};

const set = (name, value, options = {}) => {
  let str = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  const opts = { ...options };
  if (value === null) {
    opts.maxage = -1;
  }

  if (opts.maxage) {
    const date = new Date();
    date.setTime(date.getTime() + (opts.maxage * 24 * 60 * 60 * 1000));
    opts.expires = date;
  }

  if (opts.path) {
    str += `; path=${opts.path}`;
  }

  if (opts.domain) {
    str += `; domain=${opts.domain}`;
  }

  if (opts.expires) {
    str += `; expires=${opts.expires.toUTCString()}`;
  }

  if (opts.secure) {
    str += '; secure';
  }

  document.cookie = str;
};

const get = (name) => {
  const cookies = parse(document.cookie);
  return !name ? cookies : cookies[name];
};

export default (name, value, options) => {
  if (typeof value === 'undefined') {
    return get(name);
  }

  return set(name, value, options);
};
