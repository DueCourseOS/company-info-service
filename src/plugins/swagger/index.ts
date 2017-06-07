const pkg = require('../../../package.json');

const register = require('hapi-swagger');
const options = {
	info: {
		title: pkg.name,
		version: pkg.version
	}
};

export = { register, options };
