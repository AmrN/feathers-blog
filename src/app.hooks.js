// Application hooks that run for every service
const logger = require('./hooks/logger');

// for transforming mongodb ids from '_id' to 'id'
// const transformId = require('./hooks/transform-id');
const transformOutputKeys = require('./hooks/transform-output-keys');
const transformInputKeys = require('./hooks/transform-input-keys');

module.exports = {
  before: {
    all: [logger(), transformInputKeys({ map: { id: '_id' } })],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      logger(),
      transformOutputKeys({
        map: { _id: 'id' },
        shouldRun: (hook) => {
          console.log(!hook.app.inAuth ? 'running transform output' : 'not running transform output');
          return !hook.app.inAuth;
        }
      })],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};