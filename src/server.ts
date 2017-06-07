import * as hapi from 'hapi';
import glob = require('glob');
import conf = require('./config');
import logger = require('./lib/logger');

export const server = new hapi.Server();
server.connection(conf.get('server'));

const plugins = [
	require('blipp'),
	require('vision'),
	require('inert'),
	require('./plugins/force-https'),
	require('./plugins/logging'),
	require('./plugins/rollbar'),
	require('./plugins/swagger')
];

server.register(plugins).then(() => {
	const routes = glob.sync(`${__dirname}/routes/**/*.js`).map(require);
	routes.forEach(route => server.route(route));

	return server.start();
}).catch(logger.error);
