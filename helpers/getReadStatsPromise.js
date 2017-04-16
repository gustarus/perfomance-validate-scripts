const fs = require('fs');

module.exports = function (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) {
        reject(error);
      }

      resolve(stats);
    });
  });
};
