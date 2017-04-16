const path = require('path');
const getConfig = require('./config');
const Api = require('./components/api');
const Log = require('./components/log');

const config = getConfig();
module.exports.config = config;
module.exports.log = new Log();
module.exports.client = new Api(config.client);
module.exports.pathToScripts = path.join(__dirname, 'runtime', 'scripts');
