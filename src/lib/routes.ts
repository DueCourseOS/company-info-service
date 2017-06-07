import boom = require('boom');
import joi = require('joi');

export const schemas = {
	// ErrorResponse is the default error format returned by this API
	// and conforms to the boom.BoomError interface spec.
	ErrorResponse: joi.object({
		statusCode: joi.number().required(),
		error: joi.string().required(),
		message: joi.string().required()
	}).label('ErrorResponse')
};

export interface IError {
	statusCode: number;
	statusText?: string;
	message?: string;
}

// Creates a responder utility to standardise formatting of route responses
export function createResponder(req, reply, defaultErrorMessage?: string) {
	// standardise error responses
	const error = (statusCode: number = 500, msg?: string) => {
		return (err: Error) => {
			const stdError: IError = { statusCode, message: err.message };
			msg = msg || defaultErrorMessage || stdError.message;
			req.log('error', { route: req.route.path, method: req.route.method, statusCode, msg, error: stdError });
			return reply(boom.create(stdError.statusCode, stdError.message));
		};
	};

	// standardise data responses
	const success = (statusCode: number = 200) => {
		return (res) => {
			req.log('info', { route: req.route.path, method: req.route.method, statusCode });
			return reply(res).code(statusCode);
		};
	};

	return {
		error,
		success
	};
}
