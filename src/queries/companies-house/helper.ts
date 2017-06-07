import axios from 'axios';
import conf = require('../../config');

function getAuthHeader() {
	const key = Buffer.from(conf.get('companiesHouse:apiKey')).toString('base64');
	return { Authorization: `Basic ${key}` };
}

export function createRequest() {
	return axios.create({
		baseURL: conf.get('companiesHouse:apiUrl'),
		timeout: 3000,
		headers: getAuthHeader()
	});
}
