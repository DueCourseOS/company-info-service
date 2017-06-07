import joi = require('joi');
import * as helper from './helper';
import logger = require('../../lib/logger');

const directorResponse = joi.object({
	name: joi.string().required(),
	role: joi.string().required(),
	appointed: joi.date().optional(),
	resigned: joi.date().optional(),
	isResigned: joi.bool().required(),
	nationality: joi.string().optional(),
	countryOfResidence: joi.string().optional(),
	dateOfBirth: joi.object({
		year: joi.number().required(),
		month: joi.number().required()
	}).optional(),
	address: joi.object({
		locality: joi.string().required(),
		addressLine1: joi.string().required(),
		region: joi.string().optional(),
		postcode: joi.string().required()
	}).optional()
});

interface IDirectorModel {
	name: string;
	role: string;
	appointed?: Date;
	resigned?: Date;
	isResigned: boolean;
	dateOfBirth?: { year: number, month: number };
	nationality?: string;
	countryOfResidence?: string;
	address?: {
		locality: string;
		addressLine1: string;
		region?: string;
		postcode: string;
	};
}

function createModel(data: any): IDirectorModel[] {
	if (!(data.items instanceof Array)) {
		logger.error('unexpected director response');
		return [];
	}

	return data.items.map(item => {
		const director: IDirectorModel = {
			name: item.name,
			role: item.officer_role,
			appointed: item.appointed_on && new Date(item.appointed_on),
			resigned: item.resigned_on && new Date(item.resigned_on),
			isResigned: !!item.resigned_on,
			nationality: item.nationality,
			countryOfResidence: item.country_of_residence,
		};

		if (item.date_of_birth) {
			director.dateOfBirth = {
				year: item.date_of_birth.year,
				month: item.date_of_birth.month
			};
		}

		if (item.address) {
			director.address = {
				locality: item.address.locality,
				addressLine1: item.address.address_line_1,
				region: item.address.region,
				postcode: item.address.postal_code
			};
		}

		return director;
	});
}

export const successResponse = joi.array().items(directorResponse).label('CompanyDirectorsSuccessResponse');

export function fetch(companyNumber: string): Promise<IDirectorModel[]> {
	const url = `/company/${companyNumber}/officers`;

	return helper.createRequest().get(url).then(res => {
		return createModel(res.data);
	});
}
