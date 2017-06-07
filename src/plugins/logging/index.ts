const pkg = require('../../../package.json');
const logger = require('../../lib/logger');

const getLogger = (tags: string[]) => {
	const levels = ['error', 'warn', 'verbose', 'debug', 'silly'];

	for (const level of levels) {
		if (tags[level]) {
			return logger[level];
		}
	}

	return logger.info;
};

const register: any = (server, options, next) => {
	server.on('log', (event, tags) => {
		getLogger(tags)(event);
	});

	server.on('request', (req, event, tags) => {
		getLogger(tags)(event);
	});

	server.on('request-error', (req, err) => {
		logger.error(err);
	});

	next();
};

register.attributes = {
	name: `${pkg.name}-logging`,
	version: pkg.version
};

export = { register };
