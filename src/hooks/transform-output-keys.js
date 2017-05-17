// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const recursiveTransformKeys = require('../utils/recursive-transform-keys');

module.exports = function ({ map, shouldRun }) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (shouldRun && !shouldRun(hook)) {
      return Promise.resolve(hook);
    }

    hook.result = recursiveTransformKeys(hook.result, (k) => map[k] ? map[k] : k);
    return Promise.resolve(hook);
  };
};
