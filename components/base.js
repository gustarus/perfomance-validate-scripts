const merge = require('lodash.merge');

module.exports = class {

  constructor(options) {
    this.configure(options);
  }

  configure(options) {
    if (!options) {
      return this;
    }

    Object.keys(options).forEach((name) => {
      const value = options[name];
      if (this[name] && options[name] instanceof Object) {
        const defaults = this[name];
        this[name] = merge({}, defaults, value);
      } else {
        this[name] = value;
      }
    });

    return this;
  }
};
