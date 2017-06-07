import Rollbar = require('rollbar');

const pkg = require('../../../package.json');
const conf = require('../../config');
const logger = require('../../lib/logger');

const register: any = (server, options, next) => {
	const environment = conf.get('env');
	const isDev = (environment === 'development');
	const accessToken = conf.get('rollbar:token');

	console.log('ACCESS TOKEN = ', accessToken);

	if (isDev) {
		return next();
	}

	if (!accessToken) {
		logger.warn('rollbar not enabled (access token not provided)');
		return next();
	}

	const opts = Object.assign({
		accessToken,
		environment,
		exitOnUncaughtException: true,
		handleUncaughtExceptions: true,
		handleUnhandledRejections: true
	}, options.rollbar);

	const rollbar = new Rollbar(opts);
	return next();
};

register.attributes = {
	name: `${pkg.name}-rollbar`,
	version: pkg.version
};

export = { register };
