import { HttpOpts } from '../client/types';
import api from '../client/api';
import { getQuerystring } from '../utils';

export type Account = {
	email: {
		address: string;
	};
	person: {
		name: string;
		lastName: string;
		taxDocument: {
			type: string;
			number: string;
		};
		identityDocument: {
			type: string;
			number: string;
			issuer: string;
			issueDate: string;
		};
		birthDate: string;
		phone: {
			countryCode: string;
			areaCode: string;
			number: string;
		};
		address: {
			street: string;
			streetNumber: string;
			district: string;
			zipCode: string;
			city: string;
			state: string;
			country: string;
		};
	};
	type: 'MERCHANT';
	transparentAccount: boolean;
};

const create = (opts: HttpOpts, account: Account) =>
	api.post(opts, '/accounts', account);

const getOne = (opts: HttpOpts, _id: string) => api.get(opts, '/accounts', _id);

const exists = (opts: HttpOpts, _query: Record<string, any>) =>
	api.get(opts, '/accounts/exists', null, null, getQuerystring(_query));

export default {
	create: create,
	getOne: getOne,
	exists: exists,
};
