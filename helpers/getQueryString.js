/**
 * Encode data object as query string.
 * Recursion used inside.
 * For example:
 *  {first: 1, object: {second: 2}}
 * Will be converted to:
 *  first=1&object%5Bsecond%5D=2
 * @param obj
 * @param prefix
 * @returns {*}
 */
function serialize(obj, prefix) {
  if (!obj) {
    return '';
  }

  const str = Object.keys(obj).map((p) => {
    const k = prefix ? `${prefix}[${p}]` : p;
    const v = obj[p];
    if (v !== null && typeof v === 'object') {
      return serialize(v, k);
    }

    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
  });

  return str.join('&');
}

module.exports = serialize;
