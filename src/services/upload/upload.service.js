// Initializes the `upload` service on path `/upload`
// const hooks = require('./upload.hooks');
// const filters = require('./upload.filters');
// const blobService = require('feathers-blob');
// const fs = require('fs-blob-store');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../public/uploads'));
  },
  filename: function (req, file, cb) {
    const originalNameArr = file.originalname.split('.');
    const filename = [
      originalNameArr.slice(0,-1).join('.') + '-' + Date.now(),
      originalNameArr.slice(-1),
    ].join('.');
    // cb(null, file.fieldname + '-' + Date.now());
    cb(null, filename);
  }
});

const multipartMiddleware = multer({ storage });
// const blogStorage = fs(path.join(__dirname, '../../../public/uploads'));

module.exports = function () {
  const app = this;

  // const options = {
  //   Model: blogStorage,
  // };

  // Initialize our service with any options it requires
  app.use('/upload',
    (req, res, next) => {
      next();
    },
    multipartMiddleware.single('file'),
    (req, res, next) => {
      res.status(201).json({
        url: `http://localhost:3030/uploads/${req.file.filename}`,
      });
      // req.feathers.file = req.file;
      // next();
    }
    // blobService(options)
  );

  // Get our initialized service so that we can register hooks and filters
  // const service = app.service('upload');

  // service.hooks(hooks);

  // if (service.filter) {
  //   service.filter(filters);
  // }
};
