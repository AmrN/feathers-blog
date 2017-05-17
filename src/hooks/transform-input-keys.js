// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const recursiveTransformKeys = require('../utils/recursive-transform-keys');

module.exports = function ({ map, shouldRun }) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if (shouldRun && !shouldRun(hook)) {
      return Promise.resolve(hook);
    }
    const mapPredicate = (key) => map[key] ? map[key] : key;
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.params.query) {
      hook.params.query = recursiveTransformKeys(hook.params.query, mapPredicate);
    }
    if (hook.data) {
      hook.data = recursiveTransformKeys(hook.data, mapPredicate);
    }
    return Promise.resolve(hook);
  };
};
