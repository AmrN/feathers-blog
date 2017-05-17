const { authenticate } = require('feathers-authentication').hooks;
const dauria = require('dauria');
const path = require('path');

const host = 'http://localhost:3030';
const uploadsPath = `${host}/uploads`;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      function (hook) {
        if (!hook.data.uri && hook.params.file) {
          const file = hook.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          hook.data = { uri: uri };
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      (hook) => {
        hook.result = {url: `${uploadsPath}/${hook.result.id}`};
        return hook;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
