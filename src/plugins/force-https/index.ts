const conf = require('../../config');

let plugin;

const noopRegister: any = (server, options, next) => next();
noopRegister.attributes = {name: 'whatever', version: '0.0.0'};

if (conf.get('env') !== 'development') {
	plugin = {
		register: noopRegister
	};
}
else {
	plugin = {
		register: require('hapi-require-https'),
		options: {}
	};
}

export = plugin;
