const validateJoiSchema = require('feathers-joi');
const Joi = require('joi');
const _ = require('lodash');
const errors = require('feathers-errors');
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html



const whole = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    const schema = this.Model.schema.joiSchema;

    return validateJoiSchema({ schema })(hook)
      .catch(err => {
        // wrap error to make feathers give the correct error code and format
        throw new errors.Unprocessable(err);
      });
  };
};

const patch = function () { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    const schema = this.Model.schema.joiSchema;

    // find keys used in schema to slice them from original database document
    // and merge them with user input then validate the new document
    const originalSliceKeys = schema._inner.children.map(c => c.key);
    // debugger;
    let originals = [];
    let promise = null;
    if (hook.id) {
      // single entry
      promise = hook.service.get(hook.id);
    } else {
      promise = hook.service.find(hook.params.query);
    }
    return promise.then(res => {
      if (hook.id) {
        originals.push(res);
      } else {
        originals = res.data;
      }
      originals = originals.map(obj => _.pick(obj, originalSliceKeys));
      for (let i = 0; i < originals.length; i++) {
        const result = Joi.validate(Object.assign({}, originals[i], hook.data), schema);
        if (result.error) { // bad input data, reject
          return Promise.reject(result.error);
        }
      }
      return Promise.resolve(hook);
    });
  };
};

module.exports = { whole, patch };