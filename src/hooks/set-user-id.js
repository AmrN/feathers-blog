const errors = require('feathers-errors');


// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options) { // eslint-disable-line no-unused-vars
  options = Object.assign({
    idField: 'id',
    as: 'userId'
  }, options);

  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    const user = hook.params.user;
    if (!user) {
      throw new errors.NotAuthenticated('no authenticated user');
    }
    hook.data[options.as] = user[options.idField].toString();
    return hook;
  };
};
