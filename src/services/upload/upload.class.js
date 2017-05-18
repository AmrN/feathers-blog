const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../public/uploads'));
  },
  filename: function (req, file, cb) {
    const originalNameArr = file.originalname.split('.');
    const filename = [
      originalNameArr.slice(0, -1).join('.') + '-' + Date.now(),
      originalNameArr.slice(-1),
    ].join('.');
    // cb(null, file.fieldname + '-' + Date.now());
    cb(null, filename);
  }
});

const multipartMiddleware = multer({ storage });


/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create(data, params) {
    // if (Array.isArray(data)) {
    //   return Promise.all(data.map(current => this.create(current)));
    // }

    const { req, res } = params.expressEnv;

    return new Promise((resolve, reject) => {
      const cb = (err) => {
        if (err) {
          return reject(err);
        }
        const res = req.files.map(f => (
          { url: `http://localhost:3030/uploads/${f.filename}`, }
        ));
        resolve(res);
      };

      multipartMiddleware.array('files', 10)(req, res, cb);
    });
  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
