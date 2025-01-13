const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && object[key]) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
export { pick };
