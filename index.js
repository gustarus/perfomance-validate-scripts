const { getFormattedBytes } = require('./helpers');
const { config, client, log } = require('./env');
const { page } = require('./processors');

log.notice(`\nSamples to process: ${config.samples.length}.`);
const chain = new Promise(resolve => resolve());
config.samples.reduce((stack, sample, i) => {
  return stack.then(() => {
    log.notice(`\nProcess sample #${i}.`);
    log.info(`${client.url}${sample.path.slice(0, 30)}...`);
    return page(sample.path, sample.params, 1).then((sizes) => {
      const diff = getFormattedBytes(sizes.source - sizes.compressed);
      const percents = Math.round(100 - (sizes.compressed * (100 / sizes.source)));
      log.success(`You can save after compression ${diff} (${percents}%).`);
    });
  });
}, chain).then(() => {
  log.success(`\nSamples processed: ${config.samples.length}.\n`);
}).catch((error) => {
  log.error(`\n${error.message}\n`);
});
