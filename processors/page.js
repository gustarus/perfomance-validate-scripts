const { getCleanFolder } = require('./../helpers');
const { config, client, log, pathToScripts } = require('./../env');
const script = require('./script');

module.exports = function(relativeUrl, params = {}, logLevel = 0) {
  let totalSource = 0;
  let totalCompressed = 0;
  return new Promise((resolve, reject) => {
    getCleanFolder(pathToScripts).then(() => {
      log.notice('Fetching page body...', logLevel);
      return client.get(relativeUrl, params);
    }).then((response) => {
      log.notice('Detecting script tags and applying filters...', logLevel);

      const scripts = response
        .replace(/(\r\n|\n|\r)/gm, '')
        .match(/<script[^>]*?src=[^>]*?>[^<]*?<\/script>/g);

      const urls = scripts.map(tag =>
        tag.replace(/^<script[^>]*?src=['"]([^'"]+)['"].*?$/, '$1'));

      const inners = config.filters.reduce((stack, filter) => {
        return stack.filter(filter);
      }, urls);

      log.notice(`Processing the scripts (total found: ${inners.length})...`, logLevel);
      const mock = new Promise(a => a());
      return inners.reduce((stack, src) => {
        return stack.then(() => {
          log.notice(src, logLevel);
          return script(src, logLevel + 1).then((sizes) => {
            totalSource += sizes.source;
            totalCompressed += sizes.compressed;
          });
        });
      }, mock);
    }).then(() => {
      resolve({
        source: totalSource,
        compressed: totalCompressed
      });
    }).catch(reject);
  });
};
