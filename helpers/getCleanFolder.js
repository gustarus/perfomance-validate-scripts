const fs = require('fs');

module.exports = function (path) {
  return new Promise((resolve) => {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file) => {
        fs.unlinkSync(`${path}/${file}`);
      });
    } else {
      fs.mkdirSync(path);
    }

    resolve();
  });
};
