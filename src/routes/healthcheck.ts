import joi = require('joi');
import { IRouteConfig } from '../types/hapi';

const route: IRouteConfig = {
	method: 'GET',
	path: '/healthcheck',
	config: {
		description: 'Healthcheck endpoint',
		tags: ['api'],
		response: {
			status: {
				200: joi.string()
			}
		}
	},
	handler: (req, reply) => reply('👌')
};

export = route;
