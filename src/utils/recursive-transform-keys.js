const _ = require('lodash');

module.exports = function recursiveTransformKeys(thing, transform, keepOriginal = false) {
  if (_.isArray(thing)) {
    return thing.map(_thing => recursiveTransformKeys(_thing, transform));
  } else if (_.isPlainObject(thing)) {
    const newObj = {};
    Object.keys(thing).forEach(key => {
      const newKey = transform(key);
      const val = recursiveTransformKeys(thing[key], transform);
      if (newKey !== key && keepOriginal) {
        newObj[key] = val;
      }
      newObj[newKey] = val;
    });
    return newObj;
  } else {
    return thing;
  }
};