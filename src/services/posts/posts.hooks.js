const { pluck, removeQuery } = require('feathers-hooks-common');
const setUserId = require('../../hooks/set-user-id');
const validateSchema = require('../../hooks/validate-schema');
const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner } = require('feathers-authentication-hooks');

const restrictToAuthor = [
  authenticate('jwt'),
  restrictToOwner({ idField: 'id', ownerField: 'authorId' })
];

const allowedFields = pluck('title', 'body', 'image');


module.exports = {
  before: {
    all: [],
    find: [
      // (hook) => {
      //   debugger;
      // },
      // removeQuery('text'),
      // (hook) => {
      //   debugger;
      // }
    ],
    get: [],
    create: [
      authenticate('jwt'),
      allowedFields,
      setUserId({ as: 'authorId' }),
      validateSchema.whole()
    ],
    update: [
      ...restrictToAuthor,
      allowedFields,
      setUserId({ as: 'authorId' }),
      validateSchema.whole()
    ],
    patch: [
      ...restrictToAuthor,
      allowedFields,
      validateSchema.patch()
    ],
    remove: [...restrictToAuthor]
  },

  after: {
    all: [(hook) => {
      console.log('here');
    }],
    find: [],
    get: [],
    create: [],
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
