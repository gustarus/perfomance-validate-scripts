const fs = require('fs');

module.exports = function (path, resolveIfNotExists = true) {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists) => {
      if (exists) {
        fs.readFile(path, 'utf8', (error, data) => {
          if (error) {
            return reject(error);
          }

          return resolve(data);
        });
      } else if (resolveIfNotExists) {
        return resolve(null);
      }

      return reject('Unable to read file.');
    });
  });
};
