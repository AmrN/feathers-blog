// Initializes the `upload` service on path `/upload`
const hooks = require('./upload.hooks');
const filters = require('./upload.filters');

const createService = require('./upload.class');


module.exports = function () {
  const app = this;

  const options = {
  };

  // Initialize our service with any options it requires
  app.use('/upload',
    (req, res, next) => {
      // need to save these references to pass them into multer in our service
      req.feathers.expressEnv = {req, res};
      next();
    },
    createService(options)
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('upload');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
