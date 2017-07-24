const request = require('request-promise');
const path = require('path');
const fs = require('fs');
const uglify = require('uglify-js');

const { getWriteFilePromise, getReadStatsPromise, getFormattedBytes } = require('./../helpers');
const { log, pathToScripts } = require('./../env');

const pathToSource = path.join(pathToScripts, 'source.js');
const pathToCompressed = path.join(pathToScripts, 'compressed.js');
const compressor = uglify.Compressor();

module.exports = function(src, logLevel) {
  return new Promise((resolve, reject) => {
    // clean up target folder
    if (fs.existsSync(pathToScripts)) {
      fs.readdirSync(pathToScripts).forEach((file) => {
        fs.unlinkSync(`${pathToScripts}/${file}`);
      });
    } else {
      fs.mkdirSync(pathToScripts);
    }

    request.get(src).then((source) => {
      const ast = uglify.parse(source);
      ast.figure_out_scope();
      const transformed = ast.transform(compressor);
      const compressed = transformed.print_to_string();
      return { source, compressed };
    }).then((unit) => {
      return Promise.all([
        getWriteFilePromise(pathToSource, unit.source),
        getWriteFilePromise(pathToCompressed, unit.compressed)
      ]);
    }).then(() => {
      return Promise.all([
        getReadStatsPromise(pathToSource),
        getReadStatsPromise(pathToCompressed)
      ]);
    }).then((stats) => {
      const source = stats[0].size;
      const compressed = stats[1].size;
      const diff = source - compressed;
      const percents = Math.round(100 - (compressed * (100 / source)));
      log.info(`Original file size: ${getFormattedBytes(source)}; compressed file size: ${getFormattedBytes(compressed)}.`, logLevel);
      log.success(`Saved after compression: ${getFormattedBytes(diff)} (${percents}%).`, logLevel);
      resolve({ source, compressed });
    }).catch((error) => {
      reject(error);
    });
  });
};
