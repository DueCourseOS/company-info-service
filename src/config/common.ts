const config: any = {};

config.server = {
	host: '0.0.0.0',
	port: 3000,
	routes: {
		cors: {
			credentials: true,
			origin: ['*']
		}
	}
};

config.rollbar = {
	token: '...'
};

export = config;
