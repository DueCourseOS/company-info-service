import { merge } from 'lodash';
import nconf = require('nconf');

nconf
.use('memory')
.env()
.argv();

// workaround for cases where NODE_ENV is coerced to the string 'undefined'
if (nconf.get('NODE_ENV') === 'undefined' || nconf.get('NODE_ENV') === undefined) {
	nconf.set('NODE_ENV', null);
}

const env = (
	nconf.get('env')
	|| nconf.get('environment')
	|| nconf.get('NODE_ENV')
	|| 'development'
).toLowerCase();

nconf.overrides(merge(
	{ env, environment: env },
	require('./common'),
	require(`./${env}`)
));

export = nconf;
