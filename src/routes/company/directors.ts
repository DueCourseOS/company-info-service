import joi = require('joi');
import boom = require('boom');

import * as routes from '../../lib/routes';
import * as directors from '../../queries/companies-house/directors';
import { IRouteConfig } from '../../types/hapi';

const schemas: any = {};

schemas.CompanyDirectorsSuccessResponse = directors.successResponse;
schemas.CompanyDirectorsFailedResponse = routes.schemas.ErrorResponse;

const route: IRouteConfig = {
	method: 'GET',
	path: '/company/{number}/directors',
	config: {
		description: 'Fetches company director information',
		tags: ['api'],
		validate: {
			params: {
				number: joi.string().required()
			}
		},
		response: {
			status: {
				200: schemas.CompanyDirectorsSuccessResponse,
				404: schemas.CompanyDirectorsFailedResponse
			}
		}
	},
	handler: (req, reply) => {
		const responder = routes.createResponder(req, reply, 'request failed');

		return directors.fetch(req.params.number)
										.then(responder.success())
										.catch(responder.error(404));
	}
};

export = route;
