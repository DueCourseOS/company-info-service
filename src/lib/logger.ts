import winston = require('winston');
import conf = require('../config');

let consoleOpts = {};

if (conf.get('env') === 'development') {
	consoleOpts = {
		colorize: true
	};
}

const logger = new (winston.Logger)({
	level: conf.get('logger:level'),
	transports: [
		new (winston.transports.Console)(consoleOpts)
	]
});

const shouldDisableLogs = (process.argv.indexOf('--disable-logger') !== -1);
if (shouldDisableLogs) {
	logger.clear();
}

export = logger;
