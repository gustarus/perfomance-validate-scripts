const fs = require('fs');

module.exports = function (path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        return reject(error);
      }

      return resolve(path);
    });
  });
};
