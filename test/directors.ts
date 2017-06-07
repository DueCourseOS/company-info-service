import chai = require('chai');
import * as supertest from 'supertest';
import {server} from '../src/server';

const expect = chai.expect;

describe('company info service', () => {
	let request;

	before(() => {
		request = supertest(server.listener);
	});

	it('should be running', () => {
		return request.get('/healthcheck').expect(200);
	});

	describe('fetch directors', () => {
		it('should return 404 if company not found', () => {
			return request.get('/company/09205274123456789/directors').expect(404);
		});

		it('should return directors if company is found', () => {
			return request
				.get('/company/09205274/directors')
				.expect(200)
				.then(response => {
					expect(response.body.length).to.equal(3);
				});
		});
	});
});
