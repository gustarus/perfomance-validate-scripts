const request = require('request-promise');
const merge = require('lodash.merge');

const { getQueryString } = require('./../helpers');
const Base = require('./base');

module.exports = class extends Base {

  request(path, method, data = null, custom = null) {
    // compile url with runtime query params
    const params = getQueryString(this.params);
    const query = params ? (path.includes('?') ? '&' : '?') + params : '';
    const url = `${this.url}${path}${query}`;

    // merge all request options
    const options = merge({}, {
      url,
      method,
      json: true,
      form: data
    }, this.options, custom);

    // trace message
    if (this.verbose) {
      console.log('Sending request...', options);
    }

    // send request with passed options
    return request(options).then((response) => {
      // trace message
      if (this.verbose) {
        console.log('Response received.', response);
      }

      return response;
    });
  }

  get(path = '', data = null, options = null) {
    const query = getQueryString(data);
    const append = query ? `?${query}` : '';
    const url = `${path}${append}`;
    return this.request(url, 'get', null, options);
  }

  post(path, data, options = null) {
    return this.request(path, 'post', data, options);
  }
};
